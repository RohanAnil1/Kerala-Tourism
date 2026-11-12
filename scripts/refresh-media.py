"""Resolve subject-matched Wikimedia photographs and keep their attribution.

No search-result guessing: only explicit article mappings or exact article titles.
Unresolved, non-free, map and logo images are left out of the public media index.
"""
import concurrent.futures, hashlib, html, json, re, time, urllib.parse, urllib.request
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
CACHE = ROOT / '.qa/media-cache'
CACHE.mkdir(parents=True, exist_ok=True)
OUT = ROOT / 'public/media'
OUT.mkdir(parents=True, exist_ok=True)
CATALOG = json.loads((ROOT / '.qa/catalog.json').read_text(encoding='utf-8'))
CHECKED = '2026-10-26'
UA = 'KeralaFieldGuide/1.0 (independent local portfolio; Wikimedia attribution retained)'

ALIASES = {
 'Athirappilly Falls':'Athirappilly Falls','Athirappilly Waterfalls':'Athirappilly Falls',
 'Munnar':'Munnar','Tea Gardens of Munnar':'Munnar','Fort Kochi':'Fort Kochi',
 'Alappuzha Backwaters':'Alappuzha','Houseboat Cruises':'Alappuzha',
 'Varkala Beach':'Varkala Beach','Kovalam Beach':'Kovalam','Ponmudi Hills':'Ponmudi',
 'Sree Padmanabhaswamy Temple':'Padmanabhaswamy Temple','Guruvayur Temple':'Guruvayur Temple',
 'Jatayu Earth Centre':'Jatayu Earth\'s Center Nature Park','Sabarimala Temple':'Sabarimala',
 'Kumarakom Bird Sanctuary':'Kumarakom Bird Sanctuary','Chinese Fishing Nets':'Fort Kochi',
 'Mattancherry Palace':'Mattancherry Palace','Jewish Synagogue':'Paradesi Synagogue',
 'Periyar Tiger Reserve':'Periyar National Park','Periyar Wildlife Sanctuary':'Periyar National Park',
 'Muzhappilangad Drive-in Beach':'Muzhappilangad Beach','Bekal Fort':'Bekal Fort',
 'Vagamon (Idukki)':'Vagamon','Vagamon':'Vagamon','Kappil Beach (Kasaragod)':'Kappil, Kasaragod',
 'Wayanad Wildlife Sanctuary':'Wayanad Wildlife Sanctuary','Edakkal Caves':'Edakkal caves',
 'Kozhikode Beach':'Kozhikode Beach','Kumarakom':'Kumarakom','Thekkady':'Thekkady',
 'Kerala Sadya':'Sadya','Puttu & Kadala Curry':'Puttu','Appam with Vegetable Stew':'Appam',
 'Idiyappam (String Hoppers)':'Idiyappam','Paal Payasam':'Payasam','Kerala Sambar':'Sambar (dish)',
 'Parippu Curry':'Parippu curry','Pazham Pori (Banana Fritters)':'Pazham pori','Ada Pradhaman':'Pradhaman',
 'Kerala Dosa with Chutney':'Dosa (food)','Kerala Rasam':'Rasam (dish)',
 'Kaaya Varuthathu (Banana Chips)':'Banana chip','Porotta with Veg Kurma':'Parotta',
 'Kappa Puzhukku':'Kappa (food)','Injipuli (Puli Inji)':'Puli inji','Nei Choru (Ghee Rice)':'Neychoru',
 'Sulaimani Chai':'Sulaimani tea','Meen Curry (Kerala Fish Curry)':'Fish curry',
 'Malabar Biryani':'Thalassery biryani','Nadan Kozhi Curry':'Chicken curry',
 'Kerala Beef Fry (Ularthiyathu)':'Beef fry','Chemmeen Curry (Prawn Curry)':'Prawn curry',
 'Meen Moilee':'Fish moilee','Tharavu Roast (Duck Roast)':'Duck roast',
 'Njandu Masala (Crab Masala)':'Crab curry','Kerala Mutton Stew':'Mutton stew',
 'Mutta Roast (Egg Roast)':'Egg roast','Kerala Chicken 65':'Chicken 65',
 'Koonthal Roast (Squid Roast)':'Squid roast','Chicken Mappas':'Chicken mappas',
 'Kallummakkaya (Stuffed Mussels)':'Kallummakkaya nirachathu','Chattichoru (Clay Pot Rice)':'Chattichoru',
}
EXPERIENCE_ARTICLES = {
 'alleppey-houseboat-cruise':'Alappuzha','munnar-tea-trek':'Munnar',
 'periyar-wildlife-safari':'Periyar National Park','kathakali-performance':'Kathakali',
 'chembra-peak-trek':'Chembra Peak','snake-boat-race':'Nehru Trophy Boat Race',
 'fort-kochi-heritage-walk':'Fort Kochi','athirappilly-waterfall-day-trip':'Athirappilly Falls',
 'theyyam-cultural-night':'Theyyam','wayanad-wildlife-jeep-safari':'Wayanad Wildlife Sanctuary',
 'kumarakom-birding-canoe':'Kumarakom Bird Sanctuary','vagamon-paragliding-adventure':'Vagamon',
}

def request(url, binary=False):
    key = hashlib.sha256(url.encode()).hexdigest()
    dest = CACHE / (key + ('.bin' if binary else '.json'))
    if dest.exists(): return dest.read_bytes() if binary else json.loads(dest.read_text(encoding='utf-8'))
    for attempt in range(3):
        try:
            time.sleep(1.5)
            response = urllib.request.urlopen(urllib.request.Request(url, headers={'User-Agent':UA}), timeout=35)
            data = response.read(15_000_000)
            if binary: dest.write_bytes(data); return data
            value = json.loads(data); dest.write_text(json.dumps(value), encoding='utf-8'); return value
        except Exception:
            if attempt == 2: raise
            time.sleep(5 + attempt * 6)

def api(host, params):
    return request('https://' + host + '/w/api.php?' + urllib.parse.urlencode({'action':'query','format':'json',**params}))

def clean(value): return re.sub(r'\s+', ' ', html.unescape(re.sub('<[^>]+>', '', value or ''))).strip()

resources = []
for kind, values in CATALOG.items():
    if kind == 'districts': continue
    for item in values:
        slug = item.get('slug', item['id'])
        name = item.get('name', item.get('title',''))
        article = None
        if kind in ('events','stories') and 'en.wikipedia.org/wiki/' in item.get('sourceUrl',''):
            article = urllib.parse.unquote(item['sourceUrl'].split('/wiki/')[1]).replace('_',' ')
        elif kind == 'experiences': article = EXPERIENCE_ARTICLES.get(slug)
        elif kind == 'stays': article = {'kumarakom-lake-resort':'Kumarakom Lake Resort','brunton-boatyard':'Brunton Boatyard'}.get(slug)
        else: article = ALIASES.get(name, re.sub(r'\s*\([^)]*\)', '', name))
        if article: resources.append({'key':kind+'/'+slug, 'name':name, 'article':article, 'kind':kind})

titles = sorted(set(item['article'] for item in resources))
pages = {}
for offset in range(0,len(titles),20):
    chunk = titles[offset:offset+20]
    try:
        data = api('en.wikipedia.org', {'prop':'pageimages|coordinates','piprop':'original','redirects':'1','titles':'|'.join(chunk)})
        query = data.get('query',{})
        redirects = {item['from']:item['to'] for item in query.get('normalized',[]) + query.get('redirects',[])}
        lookup = {p['title']:p for p in query.get('pages',{}).values() if 'missing' not in p}
        for title in chunk:
            resolved = title
            for _ in range(6): resolved = redirects.get(resolved,resolved)
            if resolved in lookup: pages[title] = lookup[resolved]
    except Exception as error: print('Article batch unavailable:',offset,str(error),flush=True)
    print('Article references',min(offset+20,len(titles)),'/',len(titles),flush=True)

filenames = sorted(set(urllib.parse.unquote(p['original']['source'].split('?')[0].split('/')[-1]) for p in pages.values() if 'original' in p and '/commons/' in p['original']['source']))
files = {}
for offset in range(0,len(filenames),20):
    try:
        data = api('commons.wikimedia.org', {'prop':'imageinfo','iiprop':'url|extmetadata|mime','iiurlwidth':'960','titles':'|'.join('File:'+name for name in filenames[offset:offset+20])})
        for page in data.get('query',{}).get('pages',{}).values():
            if page.get('imageinfo'): files[page['title'][5:].replace('_',' ')] = page['imageinfo'][0]
    except Exception as error: print('File batch unavailable:',str(error),flush=True)

index, manifest, pending = {}, {}, []
for resource in resources:
    page = pages.get(resource['article'],{})
    original = page.get('original',{}).get('source','')
    filename = urllib.parse.unquote(original.split('?')[0].split('/')[-1]).replace('_',' ')
    info = files.get(filename,{})
    meta = info.get('extmetadata',{})
    text = lambda key: clean(meta.get(key,{}).get('value',''))
    license = text('LicenseShortName')
    description = text('ImageDescription')
    rejected = ('commons/' not in original or not license or not re.search(r'CC|Public domain|CC0',license,re.I) or info.get('mime') not in ('image/jpeg','image/png','image/webp') or re.search(r'\b(map|logo|flag|emblem|coat of arms|locator|painting|portrait)\b',filename+' '+text('Categories'),re.I))
    if rejected:
        pending.append({**resource,'reason':'No reusable subject photograph from the explicit reference article'}); continue
    url = info.get('thumburl', info.get('url'))
    asset = hashlib.sha256(info['url'].encode()).hexdigest()[:14]
    ext = {'image/jpeg':'jpg','image/png':'png','image/webp':'webp'}[info['mime']]
    src = f'/media/{asset}.{ext}'
    index[resource['key']] = [src]
    if asset not in manifest:
        manifest[asset] = {'src':src,'alt':description[:240] or page.get('title',resource['name']),'credit':text('Artist') or text('Attribution') or 'Wikimedia Commons contributor','license':license,'licenseUrl':text('LicenseUrl'),'source':info.get('descriptionurl'),'reference':'https://en.wikipedia.org/wiki/'+urllib.parse.quote(page.get('title',resource['article']).replace(' ','_')),'original':info['url'],'download':url,'verifiedAt':CHECKED,'subjects':[]}
    manifest[asset]['subjects'].append({'key':resource['key'],'name':resource['name'],'article':page.get('title')})

def download(pair):
    asset,item = pair
    try:
        destination = ROOT / 'public' / item['src'].lstrip('/')
        if not destination.exists():
            data = request(item['download'],binary=True)
            if not (data.startswith(b'\xff\xd8') or data.startswith(b'\x89PNG') or data[:4] == b'RIFF'): raise ValueError('Not a raster photograph')
            destination.write_bytes(data)
        return asset,True
    except Exception as error: print('Photo unavailable',asset,str(error),flush=True);return asset,False

with concurrent.futures.ThreadPoolExecutor(max_workers=2) as pool:
    results = dict(pool.map(download,manifest.items()))
for key in list(index):
    if not results.get(Path(index[key][0]).stem): del index[key]
manifest = {key:value for key,value in manifest.items() if results.get(key)}
(ROOT/'src/data/media-index.json').write_text(json.dumps(index,ensure_ascii=False,indent=2),encoding='utf-8')
(OUT/'manifest.json').write_text(json.dumps({'checkedAt':CHECKED,'method':'Explicit reference-article image and Commons license metadata; see subject mappings.','images':list(manifest.values())},ensure_ascii=False,indent=2),encoding='utf-8')
(ROOT/'.qa/media-pending.json').write_text(json.dumps(pending,ensure_ascii=False,indent=2),encoding='utf-8')
(ROOT/'.qa/media-pages.json').write_text(json.dumps(pages,ensure_ascii=False),encoding='utf-8')
print('Media refresh complete:',json.dumps({'indexedSubjects':len(index),'photographs':len(manifest),'unresolved':len(pending)}),flush=True)

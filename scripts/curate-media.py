"""Human-selected subject files supplement the reference-article collection."""
from pathlib import Path
import json,hashlib,html,re,time,urllib.parse,urllib.request,sys
sys.stdout.reconfigure(encoding='utf-8')
ROOT=Path(__file__).resolve().parent.parent
namespace={'__file__':str(ROOT/'scripts/refresh-media.py')}
exec((ROOT/'scripts/refresh-media.py').read_text(encoding='utf-8').split('resources = []')[0],namespace)
api=namespace['api'];request=namespace['request'];clean=namespace['clean']
# Every filename was selected from the corresponding article or Commons subject search.
selected={
 'Munnar - Tea Plantations.jpg':['destinations/munnar','destinations/tea-gardens-munnar','experiences/munnar-tea-trek','editorial/hills'],
 'Varkala Beach, Varkala, Kerala.jpg':['destinations/varkala-beach','editorial/coast'],
 'Kumarkom.jpg':['destinations/kumarakom','editorial/backwaters'],
 'Sabarimala Garbhagudi.jpg':['destinations/sabarimala-temple'],
 'Travancore Cheera Thoran.JPG':['dishes/thoran'],
 'Banana Chips in Palakkad.jpg':['dishes/kaaya-varuthathu'],
 'Thalassery biryani -1.jpg':['dishes/malabar-biryani'],
 'Kerala spicy Fish Curry.jpg':['dishes/meen-curry'],
 'Kerala Chicken Curry 2024.jpg':['dishes/nadan-kozhi-curry'],
 'Kerala Beef Curry.jpg':['dishes/naadan-beef-curry'],
 'Meen Varuthathu.jpg':['dishes/fish-fry-meen-varuthathu'],
 'Sardine fried in coconut oil.jpg':['dishes/sardine-fry-mathi-varuthathu'],
 'Arikkadukka (Stuffed Mussels) from Muzhappilangad.jpeg':['dishes/kallummakkaya-nirachathu'],
 'Beetroot pachadi - PXL 20200901 193803127.PORTRAIT-01.cover.jpg':['dishes/pachadi'],
 'Puttu with kadalai curry, Kerala cuisine.jpeg':['dishes/puttu-kadala-curry'],
 'Kerala crab curry.jpg':['dishes/crab-masala-njandu'],
 'Chatti Chor- A traditional kerala dish.jpg':['dishes/chattichoru'],
 'Masala Dosa at New Swagath Cafe, Kottappadi, Malappuram.jpg':['dishes/Kerala-dosa-chutney'],
}
# Remove audited mismatches, non-Kerala regional variants, and geographic redirects.
rejected={'destinations/jewish-synagogue','destinations/bison-valley','destinations/punnamada-lake','destinations/moonnilavu','destinations/priyadarshini-planetarium','destinations/canoly-canal','destinations/vypeen-island','destinations/kollam-beach','dishes/paal-payasam','dishes/kerala-porotta-veg-kurma','dishes/chicken-65-kerala','stories/kozhikode-sm-city-zamboanga'}
index=json.loads((ROOT/'src/data/media-index.json').read_text(encoding='utf-8'))
manifest=json.loads((ROOT/'public/media/manifest.json').read_text(encoding='utf-8'))
for key in rejected:index.pop(key,None)
files={}
names=list(selected)
for offset in range(0,len(names),10):
 d=api('commons.wikimedia.org',{'prop':'imageinfo','iiprop':'url|extmetadata|mime','iiurlwidth':'960','titles':'|'.join('File:'+n for n in names[offset:offset+10])})
 for page in d.get('query',{}).get('pages',{}).values():
  if page.get('imageinfo'):files[page['title'][5:]]=page['imageinfo'][0]
for filename,keys in selected.items():
 try:
  info=files.get(filename.replace('_',' '),files.get(filename))
  if not info:print('Missing',filename,flush=True);continue
  meta=info.get('extmetadata',{});get=lambda k:clean(meta.get(k,{}).get('value',''))
  license=get('LicenseShortName')
  if not re.search(r'CC|Public domain|CC0',license,re.I):print('License unavailable',filename,flush=True);continue
  url=info.get('thumburl',info['url']);asset=hashlib.sha256(info['url'].encode()).hexdigest()[:14];ext='png' if info['mime']=='image/png' else 'jpg';src='/media/'+asset+'.'+ext;dest=ROOT/'public'/src.lstrip('/')
  if not dest.exists():dest.write_bytes(request(url,binary=True))
  for key in keys:index[key]=[src]
  image={'src':src,'alt':get('ImageDescription')[:240] or filename,'credit':get('Artist'),'license':license,'licenseUrl':get('LicenseUrl'),'source':info['descriptionurl'],'reference':info['descriptionurl'],'original':info['url'],'download':url,'verifiedAt':'2026-10-26','subjects':[{'key':k,'name':k.split('/')[-1].replace('-',' '),'article':filename} for k in keys]}
  manifest['images']=[x for x in manifest['images'] if x['src']!=src]+[image]
  print('Curated',filename,license,flush=True)
 except Exception as e:print('Unavailable',filename,str(e),flush=True)
aliases={
 'destinations/varkala-cliff-beach':'editorial/coast',
 'destinations/kumarakom-backwaters':'editorial/backwaters',
 'destinations/jatayu-earths-center':'stories/kollam-jatayu-earth-s-center-nature-park',
 'destinations/gavi-eco-tourism':'stories/pathanamthitta-gavi-kerala',
 'destinations/elaveezhapoonchira':'stories/kottayam-ilaveezha-poonchira',
 'destinations/anamudi-peak':'stories/idukki-anamudi',
 'destinations/idukki-arch-dam':'stories/idukki-idukki-dam',
 'destinations/nelliyampathy-hills':'stories/palakkad-nelliampathi',
 'destinations/beypore-beach':'stories/kozhikode-beypore',
 'destinations/chandragiri-fort':'stories/kasaragod-chandragiri-fort-kerala',
 'destinations/theyyam-performances':'experiences/theyyam-cultural-night',
 'destinations/thekkady':'experiences/periyar-wildlife-safari',
}
for key,source in aliases.items():
 if source in index:index[key]=index[source]
# Rebuild attribution associations from the final mapping; rejected images cannot leak back in.
used={src for values in index.values() for src in values}
manifest['images']=[x for x in manifest['images'] if x['src'] in used]
for image in manifest['images']:
 image['subjects']=[{'key':key,'name':key.split('/')[-1].replace('-',' ')} for key,values in index.items() if image['src'] in values]
manifest['method']='Reference-article photographs plus manually selected Commons subject files. Known mismatches rejected. Unresolved subjects have no image.'
(ROOT/'src/data/media-index.json').write_text(json.dumps(index,ensure_ascii=False,indent=2),encoding='utf-8')
(ROOT/'public/media/manifest.json').write_text(json.dumps(manifest,ensure_ascii=False,indent=2),encoding='utf-8')
print('FINAL',len(index),'subjects',len(manifest['images']),'photographs',flush=True)

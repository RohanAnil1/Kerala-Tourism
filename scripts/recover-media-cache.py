"""Rebuild successful reference matches from cached metadata after a partial API outage."""
from pathlib import Path
import json,urllib.parse
ROOT=Path(__file__).resolve().parent.parent
ns={'__file__':str(ROOT/'scripts/refresh-media.py')}
s=(ROOT/'scripts/refresh-media.py').read_text(encoding='utf-8')
exec(s.split('titles = sorted')[0],ns)
ns['pages']=json.loads((ROOT/'.qa/media-pages.json').read_text(encoding='utf-8'))
files={}
for path in (ROOT/'.qa/media-cache').glob('*.json'):
 try:
  for page in json.loads(path.read_text(encoding='utf-8')).get('query',{}).get('pages',{}).values():
   if page.get('imageinfo'):files[page['title'][5:].replace('_',' ')]=page['imageinfo'][0]
 except Exception:pass
ns['files']=files
exec('index, manifest, pending = {}, {}, []'+s.split('index, manifest, pending = {}, {}, []')[1].split('def download')[0],ns)
idx=ns['index'];manifest=ns['manifest']
idx={k:v for k,v in idx.items() if (ROOT/'public'/v[0].lstrip('/')).exists()}
used={v[0] for v in idx.values()}
manifest=[x for x in manifest.values() if x['src'] in used]
(ROOT/'src/data/media-index.json').write_text(json.dumps(idx,ensure_ascii=False,indent=2),encoding='utf-8')
(ROOT/'public/media/manifest.json').write_text(json.dumps({'checkedAt':'2026-10-26','method':'Subject-matched reference files','images':manifest},ensure_ascii=False,indent=2),encoding='utf-8')
print(len(idx),'recovered subjects')

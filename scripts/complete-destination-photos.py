"""Fetch candidates, then import explicitly reviewed destination or food photos.

Candidate search never changes the public index. Import requires a file selection,
subject-specific alt text and a matching note in the selected review JSON file.
"""
import argparse
import hashlib
import html
import json
from pathlib import Path
import re
import sys
import time
import urllib.parse
import urllib.request

sys.stdout.reconfigure(encoding="utf-8")
ROOT = Path(__file__).resolve().parent.parent
CACHE = ROOT / ".qa/destination-photo-cache"
CACHE.mkdir(parents=True, exist_ok=True)
UA = "KeralaFieldGuide/1.1 (https://github.com/RohanAnil1/Kerala-Tourism; photographic attribution audit)"
CHECKED = "2026-10-29"

def clean(value):
    return re.sub(r"\s+", " ", html.unescape(re.sub("<[^>]+>", "", value or ""))).strip()

def request(url, binary=False):
    target = CACHE / (hashlib.sha256(url.encode()).hexdigest() + (".bin" if binary else ".json"))
    if target.exists():
        return target.read_bytes() if binary else json.loads(target.read_text(encoding="utf-8"))
    for attempt in range(3):
        try:
            time.sleep(1.1 + attempt * 4)
            with urllib.request.urlopen(urllib.request.Request(url, headers={"User-Agent": UA}), timeout=35) as response:
                data = response.read(25_000_000)
            if binary:
                target.write_bytes(data)
                return data
            value = json.loads(data)
            if "error" in value:
                raise ValueError(value["error"])
            target.write_text(json.dumps(value, ensure_ascii=False), encoding="utf-8")
            return value
        except Exception:
            if attempt == 2:
                raise

def api(params):
    return request("https://commons.wikimedia.org/w/api.php?" + urllib.parse.urlencode({"action": "query", "format": "json", **params}))

def candidates(query):
    data = api({"generator": "search", "gsrsearch": query, "gsrnamespace": 6, "gsrlimit": 8,
                "prop": "imageinfo", "iiprop": "url|extmetadata|mime|size", "iiurlwidth": 1280})
    return file_rows(data)

def file_rows(data):
    result = []
    for page in sorted(data.get("query", {}).get("pages", {}).values(), key=lambda p: p.get("index", 100)):
        if not page.get("imageinfo"):
            continue
        info = page["imageinfo"][0]
        meta = info.get("extmetadata", {})
        get = lambda key: clean(meta.get(key, {}).get("value", ""))
        if info.get("mime") not in ("image/jpeg", "image/png", "image/webp") or not re.search(r"CC|Public domain", get("LicenseShortName"), re.I):
            continue
        result.append({"file": page["title"][5:], "description": get("ImageDescription"),
                       "categories": get("Categories"), "latitude": get("GPSLatitude"), "longitude": get("GPSLongitude"),
                       "credit": get("Artist"), "license": get("LicenseShortName"), "licenseUrl": get("LicenseUrl"),
                       "source": info["descriptionurl"], "original": info["url"],
                       "download": info.get("thumburl", info["url"]), "width": info["width"], "height": info["height"], "mime": info["mime"]})
    return result

def fetch_all():
    pending = json.loads((ROOT / ".qa/destination-photo-pending.json").read_text(encoding="utf-8"))
    query_file = ROOT / "scripts/destination-photo-queries.json"
    queries = json.loads(query_file.read_text(encoding="utf-8")) if query_file.exists() else {}
    out = ROOT / ".qa/destination-photo-candidates.json"
    collected = json.loads(out.read_text(encoding="utf-8")) if out.exists() else {}
    for number, place in enumerate(pending, 1):
        slug = place["slug"]
        query = queries.get(slug, place["name"])
        if collected.get(slug, {}).get("query") == query:
            continue
        try:
            rows = candidates(query)
            collected[slug] = {"name": place["name"], "district": place["district"], "query": query, "candidates": rows}
            out.write_text(json.dumps(collected, ensure_ascii=False, indent=2), encoding="utf-8")
            print(f"{number}/{len(pending)} {slug}: {len(rows)} | " + " / ".join(row["file"] for row in rows[:3]), flush=True)
        except Exception as error:
            print("Unavailable", slug, str(error), flush=True)

def import_reviewed(collection="destinations"):
    selection_name = {"dishes": "food-photos", "destinations": "destination-photos", "subjects": "editorial-photos"}[collection]
    selected = json.loads((ROOT / f"scripts/{selection_name}.json").read_text(encoding="utf-8"))
    index_file = ROOT / "src/data/media-index.json"
    manifest_file = ROOT / "public/media/manifest.json"
    index = json.loads(index_file.read_text(encoding="utf-8"))
    manifest = json.loads(manifest_file.read_text(encoding="utf-8"))
    candidates_path = ROOT / {"dishes": ".qa/food-photo-candidates.json", "destinations": ".qa/destination-photo-candidates.json", "subjects": ".qa/editorial-photo-candidates.json"}[collection]
    all_candidates = json.loads(candidates_path.read_text(encoding="utf-8")) if candidates_path.exists() else {}
    captions_path = ROOT / "src/data/photo-captions.json"
    captions = json.loads(captions_path.read_text(encoding="utf-8")) if captions_path.exists() else {}
    for slug, selection in selected.items():
        assert selection["alt"] and selection["match"], slug
        assert selection.get("reviewed") is True, f"Visual review required: {slug}"
        row = selection.get("external") or next((row for entry in all_candidates.values() for row in entry["candidates"] if row["file"] == selection["file"]), None)
        if selection.get("external"):
            assert all(row.get(key) for key in ("source", "original", "download", "credit", "license", "licenseUrl", "mime")), slug
            assert selection.get("rightsNote"), f"External source requires a rights review: {slug}"
        if not row:
            rows = file_rows(api({"titles": "File:" + selection["file"], "prop": "imageinfo", "iiprop": "url|extmetadata|mime|size", "iiurlwidth": 1280}))
            row = next((row for row in rows if row["file"].replace("_", " ") == selection["file"].replace("_", " ")), None)
            if not row:
                raise ValueError(f"No reusable photo metadata for {slug}: {selection['file']}")
        # Public download endpoints may identify the file in their query string.
        # Commons adds tracking parameters, which are not part of that file's identity.
        identity = row["original"] if selection.get("external") else row["original"].split("?")[0]
        asset = hashlib.sha256(identity.encode()).hexdigest()[:14]
        ext = {"image/jpeg": "jpg", "image/png": "png", "image/webp": "webp"}[row["mime"]]
        src = f"/media/{asset}.{ext}"
        existing = next((image for image in manifest["images"] if image["original"] == identity or (not selection.get("external") and image["original"].split("?")[0] == identity)), None)
        if existing:
            src = existing["src"]
        target = ROOT / "public" / src.lstrip("/")
        if not target.exists():
            data = request(row["download"], binary=True)
            if "pdfPage" in row:
                import pymupdf
                with pymupdf.open(stream=data, filetype="pdf") as document:
                    page = document[row["pdfPage"]]
                    data = document.extract_image(page.get_images()[row["pdfImage"]][0])["image"]
            if not (data.startswith(b"\xff\xd8") or data.startswith(b"\x89PNG") or data[:4] == b"RIFF"):
                raise ValueError("Expected a real raster image: " + slug)
            target.write_bytes(data)
        key = slug if collection == "subjects" else collection + "/" + slug
        # A changed selection must not leave the old photograph credited to this place.
        for previous in manifest["images"]:
            if previous["src"] != src:
                previous["subjects"] = [subject for subject in previous["subjects"] if subject["key"] != key]
        index[key] = [src]
        captions[src] = {"alt": selection["alt"], "focalPosition": selection.get("focalPosition", "50% 50%")}
        if selection.get("note"):
            captions[src]["note"] = selection["note"]
        if selection.get("requiredCredit"):
            captions[src]["requiredCredit"] = selection["requiredCredit"]
        image = next((image for image in manifest["images"] if image["src"] == src), None)
        if image is None:
            image = {"src": src, "alt": selection["alt"], "credit": row["credit"], "license": row["license"],
                     "licenseUrl": row["licenseUrl"], "source": row["source"], "reference": selection.get("reference", row["source"]),
                     "original": identity, "download": row["download"], "verifiedAt": CHECKED, "subjects": []}
            manifest["images"].append(image)
        image["alt"] = selection["alt"]
        if selection.get("rightsNote"):
            image["rightsNote"] = selection["rightsNote"]
        image["subjects"] = [subject for subject in image["subjects"] if subject["key"] != key]
        image["subjects"].append({"key": key, "name": selection.get("name", all_candidates.get(slug, {}).get("name", slug)), "match": selection["match"], "alt": selection["alt"]})
        print("Imported", slug, selection["file"], row["license"], flush=True)
    if collection == "subjects":
        aliases = json.loads((ROOT / "scripts/editorial-photo-aliases.json").read_text(encoding="utf-8"))
        for key, alias in aliases.items():
            sources = index.get(alias["sourceKey"], [])
            assert sources and alias["match"], f"A reviewed source is required: {key}"
            for image in manifest["images"]:
                image["subjects"] = [subject for subject in image["subjects"] if subject["key"] != key]
                if image["src"] in sources:
                    image["subjects"].append({"key": key, "name": alias["name"], "match": alias["match"], "alt": captions.get(image["src"], {}).get("alt", image["alt"])})
            index[key] = list(sources)
            print("Matched subject", key, alias["sourceKey"], flush=True)
    manifest["checkedAt"] = CHECKED
    manifest["method"] = "Explicitly reviewed subject photographs from Commons, photographer-published Creative Commons files, and government reproduction policies. Captions, location references, rights reviews, creator and source are retained."
    index_file.write_text(json.dumps(index, ensure_ascii=False, indent=2), encoding="utf-8")
    manifest_file.write_text(json.dumps(manifest, ensure_ascii=False, indent=2), encoding="utf-8")
    captions_path.write_text(json.dumps(captions, ensure_ascii=False, indent=2), encoding="utf-8")

def review_sheets(cached_only=False):
    from PIL import Image, ImageDraw, ImageFont, ImageOps
    from io import BytesIO
    selections = json.loads((ROOT / "scripts/destination-photos.json").read_text(encoding="utf-8"))
    collected = json.loads((ROOT / ".qa/destination-photo-candidates.json").read_text(encoding="utf-8"))
    rows = {row["file"]: row for entry in collected.values() for row in entry["candidates"]}
    font = ImageFont.truetype("C:/Windows/Fonts/arial.ttf", 15)
    cards = []
    for slug, selection in selections.items():
        try:
            row = selection.get("external") or rows[selection["file"]]
            cached = CACHE / (hashlib.sha256(row["download"].encode()).hexdigest() + ".bin")
            if cached_only and not cached.exists():
                continue
            data = cached.read_bytes() if cached_only else request(row["download"], binary=True)
            if "pdfPage" in row:
                import pymupdf
                with pymupdf.open(stream=data, filetype="pdf") as document:
                    data = document.extract_image(document[row["pdfPage"]].get_images()[row["pdfImage"]][0])["image"]
            photo = Image.open(BytesIO(data))
            photo = ImageOps.exif_transpose(photo).convert("RGB")
            card = Image.new("RGB", (320, 240), "#f4f0e7")
            thumb = ImageOps.contain(photo, (312, 190))
            card.paste(thumb, ((320 - thumb.width) // 2, 4 + (190 - thumb.height) // 2))
            draw = ImageDraw.Draw(card)
            draw.text((6, 198), slug, font=font, fill="#173c32")
            draw.text((6, 219), selection["file"][:42], font=font, fill="#202822")
            cards.append(card)
            if len(cards) % 10 == 0: print("Review images downloaded:", len(cards), flush=True)
        except Exception as error:
            print("Review unavailable", slug, str(error), flush=True)
            raise
    for page in range((len(cards) + 39) // 40):
        sheet = Image.new("RGB", (1600, 1920), "#d5d0c5")
        for number, card in enumerate(cards[page * 40:(page + 1) * 40]):
            sheet.paste(card, ((number % 5) * 320, (number // 5) * 240))
        path = ROOT / f".qa/destination-photos-review-{page + 1}.jpg"
        sheet.save(path, quality=90)
        print("Review sheet", str(path), flush=True)

if __name__ == "__main__":
    parser = argparse.ArgumentParser()
    parser.add_argument("--import-reviewed", action="store_true")
    parser.add_argument("--review-sheets", action="store_true")
    parser.add_argument("--cached-only", action="store_true")
    parser.add_argument("--collection", choices=("destinations", "dishes", "subjects"), default="destinations")
    args = parser.parse_args()
    if args.import_reviewed:
        import_reviewed(args.collection)
    elif args.review_sheets:
        review_sheets(args.cached_only)
    else:
        fetch_all()

// Verify local provenance and both responsive image delivery sizes.
const fs = require("node:fs");
const path = require("node:path");
const assert = require("node:assert/strict");
const { load } = require("./catalog-loader.cjs");
const foods = process.argv.includes('--foods');
const collection = foods ? 'dishes' : 'destinations';
const destinations = foods
  ? load('src/data/gods-own-flavours.ts').allDishes.map(dish => ({ ...dish, images: Array.from(new Set([dish.image, ...dish.gallery].filter(Boolean))) }))
  : load('src/data/destinations.ts').destinations;
const manifest = require("../public/media/manifest.json");
const reviewed = require(foods ? './food-photos.json' : './destination-photos.json');
const captions = require("../src/data/photo-captions.json");
const origin = process.env.SITE_CHECK_ORIGIN || "http://localhost:3000";
const failures = [];
const sources = new Set();
for (const place of destinations) {
  for (const src of place.images) {
    assert.ok(src.startsWith("/media/"), `Local media required: ${place.slug}`);
    assert.ok(fs.existsSync(path.join(__dirname, "../public", src)));
    const credit = manifest.images.find((image) => image.src === src);
    assert.ok(credit?.source && credit?.license && credit?.credit, `Attribution required: ${place.slug}`);
    assert.ok(credit.subjects.some((subject) => subject.key === `${collection}/${place.slug}`), `Subject reference required: ${place.slug}`);
    sources.add(src);
  }
}
for (const [slug, selection] of Object.entries(reviewed)) {
  assert.equal(selection.reviewed, true, `Visual review required: ${slug}`);
  const place = destinations.find((place) => place.slug === slug);
  assert.ok(place?.images[0], `Reviewed image not connected: ${slug}`);
  assert.equal(captions[place.images[0]]?.alt, selection.alt, `Descriptive caption required: ${slug}`);
  const credit = manifest.images.find((image) => image.src === place.images[0]);
  if (selection.external) {
    assert.equal(credit.source, selection.external.source, `Reviewed source must match: ${slug}`);
    assert.equal(credit.licenseUrl, selection.external.licenseUrl, `Reuse policy must match: ${slug}`);
    assert.ok(credit.rightsNote, `External rights review required: ${slug}`);
  } else {
    const sourceFile = decodeURIComponent(new URL(credit.source).pathname.split("/wiki/File:")[1] || "").replaceAll("_", " ");
    assert.equal(sourceFile, selection.file.replaceAll("_", " "), `Reviewed source must match: ${slug}`);
  }
}
const jobs = [...sources].flatMap((src) => [640, 1920].map((width) => ({ src, width })));
let cursor = 0;
async function worker() {
  while (cursor < jobs.length) {
    const { src, width } = jobs[cursor++];
    try {
      const response = await fetch(`${origin}/_next/image?url=${encodeURIComponent(src)}&w=${width}&q=75`, { signal: AbortSignal.timeout(45000) });
      const bytes = new Uint8Array(await response.arrayBuffer());
      const raster = (bytes[0] === 0xff && bytes[1] === 0xd8) || (bytes[0] === 0x89 && bytes[1] === 0x50) || Buffer.from(bytes.slice(0, 4)).toString() === "RIFF";
      if (!response.ok || !response.headers.get("content-type")?.startsWith("image/") || !raster || bytes.length < 100)
        failures.push({ src, width, status: response.status, error: "Responsive image unavailable" });
    } catch (error) { failures.push({ src, width, error: error.message }); }
  }
}
(async () => {
  await Promise.all(Array.from({ length: 3 }, worker));
  const report = { checkedAt: new Date().toISOString(), origin, collection, entries: destinations.length, reviewed: Object.keys(reviewed).length, photographedEntries: destinations.filter((place) => place.images.length).length, unresolved: destinations.filter((place) => !place.images.length).map(({ slug, name }) => ({ slug, name })), uniqueImages: sources.size, responsiveRequests: jobs.length, failures };
  fs.mkdirSync(path.join(__dirname, "../.qa"), { recursive: true });
  fs.writeFileSync(path.join(__dirname, foods ? '../.qa/food-images.json' : '../.qa/destination-images.json'), JSON.stringify(report, null, 2));
  console.log(JSON.stringify({ ...report, unresolved: report.unresolved.map((place) => place.slug) }, null, 2));
  if (failures.length) process.exitCode = 1;
})();

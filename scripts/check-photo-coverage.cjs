// Keep exact subject photographs distinct from explicitly labelled context.
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { load } = require('./catalog-loader.cjs');
const { photoContext, contextSelections } = load('src/data/photo-context.ts');
const { destinations, districts } = load('src/data/destinations.ts');
const { experiences } = load('src/data/experiences.ts');
const { accommodations } = load('src/data/accommodations.ts');
const { allDishes } = load('src/data/gods-own-flavours.ts');
const { festivalEvents } = load('src/data/festivals.ts');
const { blogPosts } = load('src/data/blog.ts');
const { itineraries } = load('src/data/itineraries.ts');
const { verifiedCover } = load('src/data/media.ts');
const manifest = require('../public/media/manifest.json');
const records = new Map(manifest.images.map(record => [record.src, record]));
const selections = require('./editorial-photos.json');
const aliases = require('./editorial-photo-aliases.json');
const entries = [
  ...destinations.map(place => ({ key: `destinations/${place.slug}`, image: place.images[0] })),
  ...experiences.map(item => ({ key: `experiences/${item.slug}`, image: item.images[0] })),
  ...allDishes.map(item => ({ key: `dishes/${item.slug}`, image: item.image })),
  ...festivalEvents.map(item => ({ key: `events/${item.id}`, image: item.image })),
  ...accommodations.map(item => ({ key: `stays/${item.slug}`, image: item.images[0] })),
  ...blogPosts.map(item => ({ key: `stories/${item.slug}`, image: item.image })),
  ...districts.map(item => ({ key: `districts/${item.slug}`, image: item.image })),
  ...itineraries.map(item => ({ key: `itineraries/${item.id}`, image: item.image })),
];
const contexts = [];
for (const entry of entries) {
  const context = photoContext(entry.key);
  const display = entry.image || context?.src;
  assert.ok(display, `Every listing needs a real photo: ${entry.key}`);
  assert.ok(display.startsWith('/media/'), `Use local images: ${entry.key}`);
  assert.ok(fs.existsSync(path.resolve(__dirname, '../public' + display)), `Image file required: ${entry.key}`);
  const record = records.get(display);
  assert.ok(record?.credit && record.source && record.license, `Creator, source and reuse terms required: ${entry.key}`);
  if (context) {
    assert.ok(context.subject && context.sourceKey && context.label && /context/i.test(context.label), `Explicit context scope required: ${entry.key}`);
    assert.equal(context.src, verifiedCover(context.sourceKey));
    assert.ok(context.alt.includes(context.label), `Alt text must disclose context: ${entry.key}`);
    assert.ok(!entry.image || entry.image === context.src, `Do not label a different source: ${entry.key}`);
    contexts.push({ key: entry.key, source: context.sourceKey, caption: context.caption });
  } else if (!/^(districts|itineraries)\//.test(entry.key)) {
    assert.ok(record.subjects.some(subject => subject.key === entry.key), `Exact subject association required: ${entry.key}`);
  }
}
for (const [key, selected] of Object.entries(selections)) {
  assert.equal(selected.reviewed, true);
  const record = records.get(verifiedCover(key));
  const file = decodeURIComponent(new URL(record.source).pathname.split('/wiki/File:')[1] || '').replaceAll('_', ' ');
  assert.equal(file, selected.file.replaceAll('_', ' '), `Retain the reviewed original: ${key}`);
  assert.ok(record.subjects.some(subject => subject.key === key && subject.match === selected.match));
}
for (const [key, alias] of Object.entries(aliases)) {
  assert.equal(verifiedCover(key), verifiedCover(alias.sourceKey));
  assert.ok(alias.match);
}
for (const place of destinations.filter(place => place.locationReview?.status === 'unverified')) {
  assert.equal(place.images.length, 0, 'Context never becomes an exact attraction photograph');
  assert.equal(place.coordinates, undefined, 'Context never verifies a map pin');
  assert.ok(photoContext(`destinations/${place.slug}`));
}
for (const [key, selection] of Object.entries(contextSelections).filter(([key]) => key.startsWith('destinations/'))) {
  const entry = destinations.find(place => `destinations/${place.slug}` === key);
  const pictured = destinations.find(place => `destinations/${place.slug}` === selection.sourceKey);
  assert.equal(entry.districtSlug, pictured.districtSlug, `Area context must remain in the listed district: ${key}`);
}
assert.match(records.get(verifiedCover('destinations/silent-valley-national-park')).source, /Evergreen_forest_of_Silent_Valley/);
assert.ok(!verifiedCover('destinations/silent-valley-national-park').includes('030c4f87ecae92'));
assert.equal(destinations.find(place => place.slug === 'thoovanam-waterfalls').districtSlug, 'idukki');
assert.equal(destinations.find(place => place.slug === 'kozhippara-waterfalls').districtSlug, 'malappuram');
assert.doesNotMatch(destinations.find(place => place.slug === 'kozhippara-waterfalls').description, /cliff.jump/i);
const report = { checkedAt: new Date().toISOString(), entries: entries.length, displayedPhotos: entries.length, exactOrSubjectPhotos: entries.length - contexts.length, labelledContexts: contexts.length, contexts, failures: [] };
fs.mkdirSync(path.resolve(__dirname, '../.qa'), { recursive: true });
fs.writeFileSync(path.resolve(__dirname, '../.qa/photo-coverage.json'), JSON.stringify(report, null, 2));
console.log(`Photo coverage passed: ${entries.length} listings, ${contexts.length} explicitly labelled context photos, no missing photographs.`);
if (process.argv.includes('--delivery')) {
  const origin = process.env.SITE_CHECK_ORIGIN || 'http://localhost:3000';
  const jobs = [...new Set(entries.map(entry => entry.image || photoContext(entry.key).src))].flatMap(src => [640, 1920].map(width => ({ src, width })));
  const failures = [];
  let cursor = 0;
  async function worker() {
    while (cursor < jobs.length) {
      const job = jobs[cursor++];
      try {
        const response = await fetch(`${origin}/_next/image?url=${encodeURIComponent(job.src)}&w=${job.width}&q=75`, { signal: AbortSignal.timeout(45000) });
        const bytes = Buffer.from(await response.arrayBuffer());
        assert.ok(response.ok && response.headers.get('content-type')?.startsWith('image/') && bytes.length > 100);
        await require('sharp')(bytes).metadata();
      } catch (error) { failures.push({ ...job, error: error.message }); }
    }
  }
  Promise.all(Array.from({ length: 3 }, worker)).then(() => {
    const delivery = { checkedAt: new Date().toISOString(), origin, uniquePhotos: jobs.length / 2, requests: jobs.length, failures };
    fs.writeFileSync(path.resolve(__dirname, '../.qa/complete-photo-delivery.json'), JSON.stringify(delivery, null, 2));
    console.log(JSON.stringify(delivery, null, 2));
    if (failures.length) process.exitCode = 1;
  }).catch(error => { console.error(error); process.exitCode = 1; });
}

const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { load } = require('./catalog-loader.cjs');
const { destinations, districts } = load('src/data/destinations.ts');
const { experiences } = load('src/data/experiences.ts');
const { allDishes } = load('src/data/gods-own-flavours.ts');
const { getDestinationReferences, getDishGuide } = load('src/data/catalog-guides.ts');
const { festivalEvents } = load('src/data/festivals.ts');
const { photoContext } = load('src/data/photo-context.ts');
const placeSlugs = new Set(destinations.map(place => place.slug));
const eventSlugs = new Set(festivalEvents.map(event => event.slug));
const jobs = [
  ...destinations.map(place => ({ path: `/destinations/${place.slug}`, title: place.name, subject: `destinations/${place.slug}`, unverified: place.locationReview?.status === 'unverified' })),
  ...allDishes.map(dish => ({ path: `/gods-own-flavours/${dish.slug}`, title: dish.name, subject: `dishes/${dish.slug}`, unverified: false })),
  ...experiences.map(item => ({ path: `/experiences/${item.slug}`, title: item.title, subject: `experiences/${item.slug}`, unverified: false })),
].map(job => ({ ...job, context: !!photoContext(job.subject) }));
assert.deepEqual([destinations.length, allDishes.length, experiences.length], [281, 60, 14]);
assert.equal(new Set(jobs.map(job => job.path)).size, jobs.length);
for (const place of destinations) {
  assert.ok(place.longDescription && place.highlights.length && place.travelTips.length, place.slug);
  assert.ok(getDestinationReferences(place.slug).length, `References: ${place.slug}`);
  if (place.locationReview?.status === 'unverified') {
    assert.equal(place.coordinates, undefined, `No guessed pin: ${place.slug}`);
    assert.ok(photoContext(`destinations/${place.slug}`), `Labelled context: ${place.slug}`);
  }
}
for (const dish of allDishes) {
  const guide = getDishGuide(dish);
  assert.ok(guide.kitchenNote?.length > 100 && guide.sources.length, `Culinary notes and references: ${dish.slug}`);
  assert.ok(dish.ingredients.length && dish.cookingMethod && dish.servingStyle, `Recipe outline: ${dish.slug}`);
}
for (const item of experiences) {
  const guide = item.guide;
  assert.ok(guide.overview.length >= 2 && guide.overview.join(' ').length > 400, item.slug);
  assert.ok(guide.stages.length >= 3 && guide.arrangements.length >= 3 && guide.visitingNotes.length >= 3, item.slug);
  assert.ok(guide.sources.length >= 2, item.slug);
  for (const slug of guide.relatedPlaces) assert.ok(placeSlugs.has(slug), `Related place: ${slug}`);
  if (guide.relatedFestival) assert.ok(eventSlugs.has(guide.relatedFestival), `Festival handoff: ${guide.relatedFestival}`);
  assert.ok(!/almost guaranteed|world's highest organic|over 200,000|birthplace of Ayurveda/i.test(item.longDescription + item.highlights.join(' ')), `Remove unsupported archive claims: ${item.slug}`);
}
fs.mkdirSync(path.resolve(__dirname, '../.qa'), { recursive: true });
fs.writeFileSync(path.resolve(__dirname, '../.qa/catalog-detail-jobs.json'), JSON.stringify(jobs, null, 2));
console.log('Catalog detail checks passed: 281 destinations, 60 dishes, 14 experiences; local route data, sources and unverified-location handling.');

if (process.argv.includes('--http')) (async () => {
  const origin = process.env.SITE_CHECK_ORIGIN || 'http://localhost:3000';
  const failures = [];
  const collections = [
    ...districts.map(district => ({ route: `/destinations?district=${district.slug}&page=2`, paths: destinations.filter(place => place.districtSlug === district.slug).map(place => `/destinations/${place.slug}`) })),
    { route: '/gods-own-flavours?page=4', paths: allDishes.map(dish => `/gods-own-flavours/${dish.slug}`) },
    { route: '/experiences', paths: experiences.map(item => `/experiences/${item.slug}`) },
  ];
  for (const collection of collections) {
    const response = await fetch(origin + collection.route, { redirect: 'manual' });
    const html = await response.text();
    const cards = [...html.matchAll(/<a\b[^>]*>/g)].map(match => match[0]).filter(tag => /class="[^"]*\bdiscovery-card\b/.test(tag));
    const hrefs = cards.map(tag => /href="([^"]+)"/.exec(tag)?.[1]);
    if (response.status !== 200 || hrefs.length !== collection.paths.length || hrefs.some(href => !collection.paths.includes(href))) failures.push({ route: collection.route, error: 'Collection must expose its exact local detail links', cards: hrefs.length, expected: collection.paths.length });
  }
  let cursor = 0;
  await Promise.all(Array.from({ length: 4 }, async () => {
    while (cursor < jobs.length) {
      const job = jobs[cursor++];
      try {
        const response = await fetch(origin + job.path, { redirect: 'manual', signal: AbortSignal.timeout(30000) });
        const html = await response.text();
        if (response.status !== 200 || response.headers.has('location') || !/<h1\b/.test(html) || !html.includes('id="sources"')) failures.push({ route: job.path, status: response.status, error: 'Missing local detail page or unexpected redirect' });
        if (/Something went wrong|Internal Server Error|The road needs a moment\./.test(html)) failures.push({ route: job.path, error: 'Error page' });
        const ids = new Set([...html.matchAll(/\bid="([^"]+)"/g)].map(match => match[1]));
        for (const match of html.matchAll(/href="#([^"]+)"/g)) if (!ids.has(match[1])) failures.push({ route: job.path, anchor: match[1], error: 'Broken section link' });
        for (const tag of [...html.matchAll(/<a\b[^>]*>/g)].map(match => match[0])) {
          if (/class="[^"]*\bstory-card\b/.test(tag) && !/href="\/(?:destinations|experiences|gods-own-flavours)\//.test(tag)) failures.push({ route: job.path, error: 'Related card must open locally' });
        }
        if (job.unverified && (!html.includes('LOCATION UNVERIFIED') || /href="https:\/\/www\.openstreetmap\.org\//.test(html))) failures.push({ route: job.path, error: 'Unverified entry lost its warning or publishes a pin' });
        if (job.context && !html.includes('data-photo-context="true"')) failures.push({ route: job.path, error: 'Missing context-photo label' });
      } catch (error) { failures.push({ route: job.path, error: error.message }); }
    }
  }));
  for (const route of ['/destinations/no-such-place', '/gods-own-flavours/no-such-dish', '/experiences/no-such-experience']) {
    const response = await fetch(origin + route, { redirect: 'manual' });
    if (response.status !== 404) failures.push({ route, status: response.status, error: 'Unknown slug must return 404' });
  }
  const report = { checkedAt: new Date().toISOString(), guides: jobs.length, collections: collections.length, failures };
  fs.writeFileSync(path.resolve(__dirname, '../.qa/catalog-details-http.json'), JSON.stringify(report, null, 2));
  console.log(JSON.stringify(report, null, 2));
  if (failures.length) process.exitCode = 1;
})().catch(error => { console.error(error); process.exitCode = 1; });

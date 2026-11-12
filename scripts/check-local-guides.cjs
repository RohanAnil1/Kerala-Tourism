const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { load } = require('./catalog-loader.cjs');
const { festivalEvents, getFestivalBySlug, getEventsForMonth } = load('src/data/festivals.ts');
const { accommodations, getAccommodationBySlug } = load('src/data/accommodations.ts');
const { destinations } = load('src/data/destinations.ts');
const { GUIDE_REVIEWED_AT } = load('src/data/guide-types.ts');
const knownPlaces = new Set(destinations.map(place => place.slug));
assert.equal(festivalEvents.length, 15);
assert.equal(accommodations.length, 5);
assert.equal(new Set(festivalEvents.map(event => event.slug)).size, festivalEvents.length);
for (const item of [...festivalEvents, ...accommodations]) {
  assert.match(item.slug, /^[a-z0-9]+(?:-[a-z0-9]+)*$/);
  const guide = item.guide;
  assert.ok(guide.overview.length >= 2 && guide.overview.join(' ').length > 400, `Substantive local content: ${item.slug}`);
  assert.ok(guide.sources.length >= 2, `Primary references required: ${item.slug}`);
  for (const source of guide.sources) assert.ok(source.label && new URL(source.url).protocol === 'https:');
  for (const slug of guide.relatedPlaces) assert.ok(knownPlaces.has(slug), `Valid local destination: ${slug}`);
}
for (const event of festivalEvents) {
  assert.equal(getFestivalBySlug(event.slug), event);
  assert.ok(event.guide.venue && event.guide.admission && event.guide.scheduleNote);
  assert.equal(new Set(event.months).size, event.months.length);
  for (const month of event.months) {
    assert.ok(Number.isInteger(month) && month >= 1 && month <= 12);
    assert.ok(getEventsForMonth(month).includes(event));
  }
  assert.ok(event.guide.visitTips.length >= 3 && event.guide.highlights.length >= 3);
  if (event.guide.lastEdition) assert.match(event.guide.lastEdition.label, /past/i, 'Past dates must not be promoted as upcoming');
}
assert.ok(getEventsForMonth(11).some(event => event.id === 'f6'), 'Arattu includes its Alpasi season');
assert.ok(getEventsForMonth(3).some(event => event.id === 'f6'), 'Arattu includes its Painkuni season');
assert.ok(!getEventsForMonth(2).some(event => event.id === 'f5'), 'Parumala is not a February feast');
for (const stay of accommodations) {
  assert.equal(getAccommodationBySlug(stay.slug), stay);
  assert.ok(stay.guide.roomTypes.length && stay.guide.dining.length && stay.guide.facilities.length);
  assert.ok(stay.guide.access && stay.guide.bookingNotes.length >= 3);
}
assert.equal(getFestivalBySlug('not-a-festival'), undefined);
assert.equal(getAccommodationBySlug('not-a-stay'), undefined);
console.log('Local guide checks passed: 15 festivals, 5 stays, primary sources, seasonal filters, historical dates and internal related places.');

if (process.argv.includes('--http')) (async () => {
  const origin = process.env.SITE_CHECK_ORIGIN || 'http://localhost:3000';
  const failures = [];
  const routes = [...festivalEvents.map(event => `/events/${event.slug}`), ...accommodations.map(stay => `/accommodation/${stay.slug}`)];
  for (const [collection, expected] of [['/events', festivalEvents.map(event => `/events/${event.slug}`)], ['/accommodation', accommodations.map(stay => `/accommodation/${stay.slug}`)]]) {
    const response = await fetch(origin + collection, { redirect: 'manual' });
    const html = await response.text();
    const cards = [...html.matchAll(/<a\b[^>]*>/g)].map(match => match[0]).filter(tag => /class="[^"]*\bdiscovery-card\b/.test(tag));
    const hrefs = cards.map(tag => /href="([^"]+)"/.exec(tag)?.[1]);
    if (response.status !== 200 || hrefs.length !== expected.length || hrefs.some(href => !expected.includes(href))) failures.push({ collection, hrefs, error: 'Every card must open its own local guide' });
  }
  for (const route of routes) {
    const response = await fetch(origin + route, { redirect: 'manual' });
    const html = await response.text();
    if (response.status !== 200 || response.headers.has('location') || !html.includes('id="sources"') || !html.includes(GUIDE_REVIEWED_AT) || !html.includes('<h1')) failures.push({ route, status: response.status, error: 'Missing local guide or unexpected redirect' });
  }
  for (const route of ['/events/not-a-festival', '/accommodation/not-a-stay']) {
    const response = await fetch(origin + route, { redirect: 'manual' });
    if (response.status !== 404) failures.push({ route, status: response.status, error: 'Unknown guide must return 404' });
  }
  fs.mkdirSync(path.resolve(__dirname, '../.qa'), { recursive: true });
  fs.writeFileSync(path.resolve(__dirname, '../.qa/local-guides-http.json'), JSON.stringify({ checkedAt: new Date().toISOString(), routes: routes.length, collections: 2, failures }, null, 2));
  console.log(JSON.stringify({ guides: routes.length, failures }, null, 2));
  if (failures.length) process.exitCode = 1;
})().catch(error => { console.error(error); process.exitCode = 1; });

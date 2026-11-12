const fs = require('node:fs');
const path = require('node:path');
const assert = require('node:assert/strict');
const ts = require('typescript');
const { load } = require('./catalog-loader.cjs');
const { itineraries, matchItinerary } = load('src/data/itineraries.ts');
const { destinations, districts } = load('src/data/destinations.ts');
const { destinationLocationReviews } = load('src/data/destination-locations.ts');
assert.equal(Object.keys(destinationLocationReviews).length, 18, 'All remaining locations must receive a review');
for (const [slug, review] of Object.entries(destinationLocationReviews)) {
  const place = destinations.find(place => place.slug === slug);
  assert.ok(place, `Keep the original URL: ${slug}`);
  assert.equal(place.locationReview.status, review.status);
  if (review.status === 'unverified') {
    assert.equal(place.coordinates, undefined, `Never publish a guessed pin: ${slug}`);
    assert.equal(place.images.length, 0, `Never assign a different place's photograph: ${slug}`);
  } else {
    assert.ok(review.references.length, `Published location evidence required: ${slug}`);
  }
}
const northernKappil = destinations.find(place => place.slug === 'kappil-beach-kasaragod');
assert.doesNotMatch([northernKappil.description, northernKappil.longDescription, ...northernKappil.travelTips].join(' '), /swim|float|sand barrier|Kappil River/i, 'Do not reuse the southern Kappil sandbar/swimming copy');
assert.doesNotMatch(destinations.find(place => place.slug === 'charalkunnu-hills').howToReach.rail, /Pathanamthitta Station/i, 'Use the documented Thiruvalla rail connection');
const { landscapeChapters, editorialStories } = load('src/data/editorial.ts');
const { blogPosts, blogRedirects } = load('src/data/blog.ts');
assert.ok(blogPosts.every(post => !/Zamboanga|Philippines/i.test(`${post.title} ${post.content}`)), 'Foreign source mismatches must not appear as Kerala stories');
for (const target of Object.values(blogRedirects)) assert.ok(blogPosts.some(post => post.slug === target), 'Corrected archive URLs must resolve');
for (const route of itineraries) {
  const match = matchItinerary(route.days, route.style, route.budget);
  assert.equal(match.exact, true); assert.equal(match.itinerary.id, route.id);
  assert.equal(route.dayPlans.length, route.days);
}
const approximate = matchItinerary(10, 'family', 'budget');
assert.equal(approximate.exact, false);
assert.equal(approximate.differences.length, 3);
assert.equal(approximate.itinerary.dayPlans.length, approximate.itinerary.days);
assert.equal(matchItinerary(NaN, 'family', 'budget'), null);
assert.equal(matchItinerary(0, 'family', 'budget'), null);
assert.equal(matchItinerary(5, '', 'budget'), null);
assert.equal(matchItinerary(5, 'unknown', 'budget'), null);
assert.equal(matchItinerary(3.5, 'relax', 'budget'), null);
assert.equal(matchItinerary(22, 'relax', 'budget'), null);
for (const chapter of landscapeChapters) {
  const type = new URL(chapter.href, 'http://localhost').searchParams.get('type');
  assert.ok(destinations.some(place => place.type.includes(type)), `${chapter.name} must link to results`);
}
for (const story of editorialStories) assert.ok(blogPosts.some(post => post.slug === story.slug));
assert.equal(new Set(destinations.map(place => place.slug)).size, destinations.length);
assert.equal(new Set(blogPosts.map(post => post.slug)).size, blogPosts.length);
assert.equal(districts.length, 14);
assert.ok(destinations.every(place => districts.some(district => district.slug === place.districtSlug)));
const sabarimala = destinations.find(place => place.slug === 'sabarimala-temple');
const guruvayur = destinations.find(place => place.slug === 'guruvayur-temple');
assert.notEqual(sabarimala.images[0], guruvayur.images[0]);
const { projectKeralaPoint, KERALA_MAP_BOUNDS, KERALA_BOUNDARY_PATH } = load('src/data/kerala-map.ts');
const boundary = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../public/maps/kerala.geojson'), 'utf8'));
assert.equal(boundary.properties.shapeISO, 'IN-KL');
assert.ok(boundary.geometry.coordinates[0].length > 500, 'The map must retain geographic boundary detail');
assert.ok(KERALA_BOUNDARY_PATH.startsWith('M') && KERALA_BOUNDARY_PATH.endsWith('Z'));
for (const district of districts) {
  assert.ok(district.coordinates.lat >= KERALA_MAP_BOUNDS.south && district.coordinates.lat <= KERALA_MAP_BOUNDS.north);
  assert.ok(district.coordinates.lng >= KERALA_MAP_BOUNDS.west && district.coordinates.lng <= KERALA_MAP_BOUNDS.east);
}
const pin = slug => projectKeralaPoint(districts.find(district => district.slug === slug).coordinates);
assert.ok(pin('alappuzha').x < pin('kottayam').x, 'Alappuzha must be west of Kottayam');
assert.ok(pin('wayanad').x > pin('kannur').x, 'Wayanad must be inland from Kannur');
assert.ok(pin('kasaragod').y < pin('thiruvananthapuram').y, 'North must be at the top of the map');
console.log('Editorial checks passed: journey matching, route links, unique slugs, district references, geographic boundary and map pin positions.');
if (process.argv.includes('--audit-images')) {
  const grouped = new Map();
  let awaitingVerifiedPhotograph = 0;
  for (const place of destinations) {
    if (!place.images[0]) { awaitingVerifiedPhotograph++; continue; }
    const image = place.images[0].split('?')[0];
    grouped.set(image, [...(grouped.get(image) || []), place.name]);
  }
  const duplicates = [...grouped].filter(([, names]) => names.length > 1);
  console.log(JSON.stringify({ destinations: destinations.length, uniqueCoverImages: grouped.size, awaitingVerifiedPhotograph, reusedCoverImages: duplicates.length, largestReuse: duplicates.sort((a,b) => b[1].length-a[1].length).slice(0,5).map(([image, names]) => ({ image, count: names.length })) }, null, 2));
}

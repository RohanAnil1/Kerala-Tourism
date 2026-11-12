const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const { load } = require("./catalog-loader.cjs");
const {
  buildTrip,
  parseTrip,
  budgetTotal,
  dateForDay,
  validDate,
  tripCalendar,
  readSharedTrip,
  shareTrip,
  routeStops,
} = load("src/lib/trip-planner.ts");
const { travelBases, tripSeeds } = load("src/data/travel-guide.ts");
const { destinations } = load("src/data/destinations.ts");
const defaults = {
  name: "A Kerala journey",
  days: 5,
  startDate: "2026-12-30",
  travellers: 3,
  pace: "balanced",
  transport: "car",
  stops: ["kochi", "munnar", "alappuzha"],
};
for (let days = 1; days <= 21; days++) {
  const plan = buildTrip({
    ...defaults,
    days,
    stops: days < 3 ? ["kochi"] : defaults.stops,
  });
  assert.equal(plan.dayPlans.length, days);
  assert.deepEqual(routeStops(plan), plan.stops);
  assert.ok(plan.dayPlans.every((day) => day.activities.length <= 2));
}
for (const invalid of [0, 22, 3.5, NaN])
  assert.throws(() => buildTrip({ ...defaults, days: invalid }));
for (const invalid of [0, 13, 2.5])
  assert.throws(() => buildTrip({ ...defaults, travellers: invalid }));
assert.throws(() => buildTrip({ ...defaults, days: 2 }));
assert.throws(() => buildTrip({ ...defaults, stops: ["kochi", "kochi"] }));
assert.throws(() => buildTrip({ ...defaults, stops: ["made-up-place"] }));
assert.throws(() => buildTrip({ ...defaults, pace: "teleport" }));
assert.equal(validDate("2026-02-30"), false);
assert.equal(validDate("not a date"), false);
assert.equal(validDate("9999-99-99"), false);
assert.equal(dateForDay("2026-12-30", 3), "2027-01-02");
assert.equal(dateForDay("2028-02-28", 1), "2028-02-29");
const plan = buildTrip(defaults);
plan.costs = { room: 4000, food: 800, transport: 12000, activities: 3000 };
assert.deepEqual(budgetTotal(plan), {
  nights: 4,
  rooms: 2,
  stay: 32000,
  food: 12000,
  total: 59000,
  perPerson: 59000 / 3,
});
assert.equal(
  budgetTotal(buildTrip({ ...defaults, days: 1, stops: ["kochi"] })).nights,
  0,
);
plan.dayPlans[0].notes = "Coffee, sunset; café\nBring a hat";
assert.deepEqual(readSharedTrip(shareTrip(plan)), plan);
assert.deepEqual(readSharedTrip(decodeURIComponent(shareTrip(plan))), plan);
assert.equal(readSharedTrip("%not-json"), null);
assert.equal(parseTrip({ ...plan, version: 99 }), null);
assert.equal(parseTrip({ ...plan, costs: { ...plan.costs, room: -1 } }), null);
assert.equal(parseTrip({ ...plan, dayPlans: [] }), null);
assert.equal(
  parseTrip({
    ...plan,
    dayPlans: [
      { base: "unknown", activities: [], notes: "" },
      ...plan.dayPlans.slice(1),
    ],
  }),
  null,
);
const calendar = tripCalendar(plan);
assert.equal((calendar.match(/BEGIN:VEVENT/g) || []).length, plan.days);
assert.ok(calendar.includes("DTSTART;VALUE=DATE:20261230"));
assert.ok(
  calendar
    .replace(/\r\n /g, "")
    .includes("Coffee\\, sunset\\; café\\nBring a hat"),
);
assert.ok(
  calendar.split("\r\n").every((line) => Buffer.byteLength(line, "utf8") <= 75),
);
assert.throws(() => tripCalendar({ ...plan, startDate: "" }));
for (const seed of tripSeeds)
  assert.equal(
    buildTrip({ ...defaults, ...seed, name: seed.title }).dayPlans.length,
    seed.days,
  );
for (const base of travelBases)
  if (base.href.startsWith("/destinations/"))
    assert.ok(
      destinations.some((d) => base.href === `/destinations/${d.slug}`),
      base.href,
    );
const manifest = JSON.parse(
  fs.readFileSync(
    path.resolve(__dirname, "../public/media/manifest.json"),
    "utf8",
  ),
);
const index = JSON.parse(
  fs.readFileSync(
    path.resolve(__dirname, "../src/data/media-index.json"),
    "utf8",
  ),
);
const media = new Map(manifest.images.map((image) => [image.src, image]));
const reviewedPhotos = require('./destination-photos.json');
for (const [subject, images] of Object.entries(index))
  for (const src of images) {
    const record = media.get(src);
    assert.ok(record, subject);
    if (record.source.startsWith("https://commons.wikimedia.org/wiki/File:")) {
      assert.match(record.license, /CC|Public domain/i);
    } else {
      const review = Object.values(reviewedPhotos).find(item => item.external?.source === record.source);
      assert.ok(review?.reviewed && review.rightsNote, `Explicit external rights review: ${subject}`);
      assert.equal(record.license, review.external.license);
      assert.equal(record.licenseUrl, review.external.licenseUrl);
      assert.equal(record.original, review.external.original);
      if (!/CC|Public domain/i.test(record.license)) {
        if (record.license === 'Kerala Tourism royalty-free collection') {
          assert.equal(new URL(record.source).hostname, 'www.keralatourism.org');
          assert.ok(new URL(record.source).pathname.startsWith('/highresolutionimages/'), 'The royalty-free collection must identify the source');
          assert.equal(record.licenseUrl, 'https://www.keralatourism.org/highresolutionimages/');
        } else {
          assert.ok(new URL(record.source).hostname.endsWith('.gov.in'), 'Government policy source required');
        }
        assert.ok(review.requiredCredit, 'Government source acknowledgement must be displayed');
      }
    }
    assert.ok(fs.existsSync(path.resolve(__dirname, "../public" + src)));
  }
const { allDishes } = load("src/data/gods-own-flavours.ts");
const foodReviews = require('./food-photos.json');
const foodCaptions = require('../src/data/photo-captions.json');
assert.ok(allDishes.every(dish => dish.image && dish.gallery.length), 'Every food entry must retain its reviewed photograph');
for (const dish of allDishes) {
  if (!dish.image) continue;
  assert.ok(foodReviews[dish.slug]?.reviewed, `Food subject review required: ${dish.slug}`);
  assert.equal(foodCaptions[dish.image]?.alt, foodReviews[dish.slug].alt);
}
const idiyappam = allDishes.find(dish => dish.slug === 'idiyappam-egg-curry');
assert.equal(idiyappam.category, 'veg');
assert.doesNotMatch(media.get(idiyappam.image).source, /Egg_Masala_Curry/i, 'The vegetarian idiyappam page must not show egg curry');
assert.match(media.get(allDishes.find(dish => dish.slug === 'appam-vegetable-stew').image).source, /Appam_and_stew/, 'Use the reviewed vegetable-stew pairing');
assert.ok(
  allDishes.every(
    (d) =>
      !d.gallery.length ||
      d.gallery.every((image) => index[`dishes/${d.slug}`]?.includes(image)),
  ),
  "Food galleries may not mix different dishes",
);
console.log(
  `Planner checks passed: 1–21 days, validation, date rollover, budgets, sharing, import schema, calendar, all base links, and ${media.size} attributed photographs.`,
);

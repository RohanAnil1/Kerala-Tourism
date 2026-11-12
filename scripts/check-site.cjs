// HTTP verification of every public catalog route and every referenced image.
// Responsive and interactive browser checks are recorded separately in REDESIGN.md.
const fs = require("node:fs");
const path = require("node:path");
const { load } = require("./catalog-loader.cjs");
const origin = process.env.SITE_CHECK_ORIGIN || "http://localhost:3000";
const { destinations } = load("src/data/destinations.ts");
const { experiences } = load("src/data/experiences.ts");
const { allDishes } = load("src/data/gods-own-flavours.ts");
const { blogPosts, blogRedirects } = load("src/data/blog.ts");
const { festivalEvents } = load("src/data/festivals.ts");
const { accommodations } = load("src/data/accommodations.ts");
const known = new Set([
  "/",
  "/destinations",
  "/experiences",
  "/gods-own-flavours",
  "/foods",
  "/events",
  "/accommodation",
  "/blog",
  "/trip-planner",
  "/monsoon-mode",
  "/credits",
  "/admin",
  ...destinations.map((x) => "/destinations/" + x.slug),
  ...experiences.map((x) => "/experiences/" + x.slug),
  ...allDishes.map((x) => "/gods-own-flavours/" + x.slug),
  ...blogPosts.map((x) => "/blog/" + x.slug),
  ...festivalEvents.map((x) => "/events/" + x.slug),
  ...accommodations.map((x) => "/accommodation/" + x.slug),
]);
const failures = [],
  internalLinks = new Set(),
  discoveryShortcuts = new Set(["/destinations?type=backwater"]),
  frontendAssets = new Set(),
  images = new Set();
const manifest = JSON.parse(
  fs.readFileSync(
    path.resolve(__dirname, "../public/media/manifest.json"),
    "utf8",
  ),
);
manifest.images.forEach((x) => images.add(x.src));
let completed = 0;
async function pool(values, worker, concurrency = 4) {
  let cursor = 0;
  await Promise.all(
    Array.from({ length: concurrency }, async () => {
      while (cursor < values.length) {
        const value = values[cursor++];
        await worker(value);
      }
    }),
  );
}
async function checkPage(route) {
  try {
    const response = await fetch(origin + route, {
      signal: AbortSignal.timeout(30000),
    });
    const html = await response.text();
    if (response.status !== 200)
      failures.push({ route, status: response.status });
    const place = route.startsWith('/destinations/') ? destinations.find(place => route === '/destinations/' + place.slug) : undefined;
    if (place?.locationReview?.status === 'unverified') {
      if (!html.includes('LOCATION UNVERIFIED')) failures.push({ route, error: 'Missing location verification notice' });
      if (/href="https:\/\/www\.openstreetmap\.org\/(?:\?|node)/.test(html)) failures.push({ route, error: 'Unverified location must not publish a map pin' });
    }
    const expectedRedirect =
      route === "/foods" &&
      html.includes("NEXT_REDIRECT;replace;/gods-own-flavours;307;");
    if (!/<h1\b/.test(html) && !expectedRedirect)
      failures.push({ route, error: "Missing page heading" });
    for (const match of html.matchAll(/data-msg="([^"]+)"/g))
      if (!expectedRedirect) failures.push({ route, error: match[1] });
    if (
      /Something went wrong|Internal Server Error|The road needs a moment\./.test(html)
    )
      failures.push({ route, error: "Error page content" });
    for (const match of html.matchAll(/(?:src|href)="(\/_next\/static\/[^"<>]+\.(?:js|css)(?:\?[^"<>]*)?)"/g))
      frontendAssets.add(match[1].replace(/&amp;/g, "&"));
    for (const match of html.matchAll(/href="(\/[^"<>]*)"/g)) {
      const url = new URL(match[1].replace(/&amp;/g, "&"), origin);
      if (
        !url.pathname.startsWith("/_next/") &&
        !/\.[a-z0-9]+$/i.test(url.pathname)
      ) {
        internalLinks.add(url.pathname);
        if (
          url.search &&
          ["/destinations", "/experiences", "/trip-planner"].includes(url.pathname)
        )
          discoveryShortcuts.add(url.pathname + url.search);
      }
    }
    for (const match of html.matchAll(/<img\b[^>]*\bsrc="([^"]*)"/g)) {
      const src = match[1].replace(/&amp;/g, "&");
      if (!src) failures.push({ route, error: "Empty image source" });
      if (src.startsWith("/_next/image")) {
        const url = new URL(src, origin),
          original = url.searchParams.get("url");
        if (!original?.startsWith("/media/"))
          failures.push({
            route,
            error: "Unverified image source",
            src: original,
          });
        images.add(src);
      } else if (src.startsWith("/media/")) images.add(src);
    }
  } catch (error) {
    failures.push({ route, error: error.message });
  }
  completed++;
  if (completed % 75 === 0)
    console.log(`Public page checks completed: ${completed}`);
}
(async () => {
  await pool([...known], checkPage);
  await pool([...discoveryShortcuts], checkPage);
  for (const [oldSlug, newSlug] of Object.entries(blogRedirects)) {
    const route = `/blog/${oldSlug}`;
    const target = `/blog/${newSlug}`;
    const response = await fetch(origin + route, { redirect: "manual" });
    const html = await response.text();
    if (
      !(response.status === 308 && response.headers.get("location") === target) &&
      !html.includes(`NEXT_REDIRECT;replace;${target};308;`)
    ) failures.push({ route, error: "Corrected article redirect failed" });
  }
  await pool([...frontendAssets], async (src) => {
    try {
      const response = await fetch(origin + src, {
        signal: AbortSignal.timeout(30000),
      });
      const contentType = response.headers.get("content-type") || "";
      if (
        !response.ok ||
        !(src.includes(".css") ? /text\/css/ : /javascript/).test(contentType)
      )
        failures.push({ asset: src, status: response.status, contentType });
    } catch (error) {
      failures.push({ asset: src, error: error.message });
    }
  });
  for (const route of internalLinks)
    if (!known.has(route))
      failures.push({
        route,
        error: "Internal link is not in the route catalog",
      });
  const sourceCount = images.size;
  await pool(
    [...images],
    async (src) => {
      try {
        const response = await fetch(new URL(src, origin), {
          signal: AbortSignal.timeout(30000),
        });
        const bytes = await response.arrayBuffer();
        if (
          !response.ok ||
          !response.headers.get("content-type")?.startsWith("image/") ||
          bytes.byteLength < 100
        )
          failures.push({
            image: src,
            status: response.status,
            error: "Image unavailable",
          });
      } catch (error) {
        failures.push({ image: src, error: error.message });
      }
    },
    3,
  );
  for (const route of [
    "/destinations/does-not-exist",
    "/experiences/does-not-exist",
    "/gods-own-flavours/does-not-exist",
    "/blog/does-not-exist",
  ]) {
    const response = await fetch(origin + route),
      html = await response.text();
    // Next may stream the loading shell before notFound resolves, retaining HTTP 200.
    if (
      response.status !== 404 &&
      !(html.includes("NEXT_NOT_FOUND") && html.includes('content="noindex"'))
    )
      failures.push({
        route,
        status: response.status,
        error: "Expected not-found response",
      });
  }
  const report = {
    checkedAt: new Date().toISOString(),
    origin,
    pages: completed,
    discoveryShortcuts: discoveryShortcuts.size,
    frontendAssets: frontendAssets.size,
    archiveRedirects: Object.keys(blogRedirects).length,
    internalLinkPaths: internalLinks.size,
    imageRequests: sourceCount,
    failures,
  };
  fs.mkdirSync(path.resolve(__dirname, "../.qa"), { recursive: true });
  fs.writeFileSync(
    path.resolve(__dirname, "../.qa/site-check.json"),
    JSON.stringify(report, null, 2),
  );
  console.log(JSON.stringify(report, null, 2));
  if (failures.length) process.exitCode = 1;
})();

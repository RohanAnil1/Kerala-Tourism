# 🌴 Kerala Tourism — God's Own Country

A modern, immersive tourism website for Kerala, India — built with Next.js 14, TypeScript, Tailwind CSS, and Framer Motion. Showcasing Kerala's destinations, experiences, cuisine, and culture through rich visuals and smooth animations.

An independent travel and design portfolio concept; not affiliated with Kerala Tourism or the Government of Kerala. The current editorial redesign is in this workspace and has not been deployed by this task. See [REDESIGN.md](REDESIGN.md) for the current implementation and QA record.

**Live:** [kerala-tourism-five.vercel.app](https://kerala-tourism-five.vercel.app)

![Next.js](https://img.shields.io/badge/Next.js-14-black?logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.3-blue?logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-06B6D4?logo=tailwindcss)
![Vercel](https://img.shields.io/badge/Deployed_on-Vercel-000?logo=vercel)

---

## ✨ Features

### 🎬 Cinematic Hero
- Official **Athirappilly** and **Human by Nature** films from Kerala Tourism, with native player controls and direct publisher links
- Muted desktop playback when permitted; poster-first mobile and reduced-motion playback
- Landscape chapters, seasonal stories, and a geographic district explorer

### 🗺️ Destinations
- Start with fourteen square-edged district tiles, then choose a destination within the selected district. Landscape shortcuts, search, filtering and browser Back retain their context.
- **14 districts** of Kerala with detailed pages
- Actual Kerala boundary from geoBoundaries/DataMeet with fourteen geographically projected district pins
- Filterable by category — beaches, hill stations, backwaters, wildlife, heritage

### 🎭 Experiences
- Curated Kerala experiences — backwaters, Ayurveda, wildlife, culture
- Individual experience detail pages with galleries
- Featured experiences on the home page

### 🍛 God's Own Flavours
- **60 authentic Kerala dishes** (30 vegetarian + 30 non-vegetarian)
- Filterable by diet type, meal course, spice level, and region
- Search functionality with real-time filtering
- Individual dish pages with ingredients, recipe steps, and image galleries
- Real, attributed photographs for every public listing; unresolved subjects use explicitly labelled area/venue context, with the pictured place named

### 📝 Blog
- Travel articles and guides about Kerala
- Individual blog post pages with rich content
- Three curated editorial stories on the home page

### 🗓️ Trip Planner
- Editable journeys of 1–21 days across sixteen real planning bases; three featured routes provide starting points
- Ordered stops, pace, travellers, transport, editable daily activities and notes, and a quote-based budget worksheet
- Date changes update the notebook immediately, preserving day edits
- Browser autosave, eight saved trips, compact share links, JSON import/export, print/PDF, and all-day `.ics` calendar export
- OSRM driving estimates and Open-Meteo forecasts with explicit availability/error states and source links; no live traffic, booking availability, transit timetables, or hotel rates

### 🏨 Accommodation
- Hotels, resorts, and homestay listings across Kerala

### 🌐 Multi-language Support
- Navigation supports English, Malayalam, Hindi, and Arabic via Language Context; new editorial copy remains English
- Seamless language switching from the navbar

### 🌓 Dark Mode
- Full dark/light theme toggle
- Powered by `next-themes` with system preference detection

### 📱 Responsive Design
- Mobile-first layout with Tailwind CSS
- Optimized for all screen sizes

---

## 🛠️ Tech Stack

| Layer         | Technology                                   |
|---------------|----------------------------------------------|
| Framework     | [Next.js 14](https://nextjs.org/) (App Router) |
| Language      | [TypeScript](https://www.typescriptlang.org/) |
| Styling       | [Tailwind CSS 3.4](https://tailwindcss.com/) |
| Animations    | [Framer Motion 11](https://www.framer.com/motion/) |
| Icons         | [Lucide React](https://lucide.dev/)          |
| Maps          | Geographic SVG district map + deferred OpenStreetMap embeds |
| PDF Export    | Browser print / save as PDF |
| Theming       | [next-themes](https://github.com/pacocoursey/next-themes) |
| Utilities     | [clsx](https://github.com/lukeed/clsx) + [tailwind-merge](https://github.com/dcastil/tailwind-merge) |
| Deployment    | [Vercel](https://vercel.com/) (Mumbai region) |

---

## 📂 Project Structure

```
kerala-tourism/
├── public/                  # Static assets & manifest
├── src/
│   ├── app/                 # Next.js App Router pages
│   │   ├── page.tsx         # Home — video hero, experiences, destinations
│   │   ├── destinations/    # Destinations listing & [slug] detail
│   │   ├── experiences/     # Experiences listing & [slug] detail
│   │   ├── gods-own-flavours/ # 60 Kerala dishes & [slug] detail
│   │   ├── blog/            # Blog listing & [slug] detail
│   │   ├── trip-planner/    # Itinerary planner with PDF export
│   │   ├── accommodation/   # Accommodation listings
│   │   ├── admin/           # Admin panel
│   │   ├── foods/           # Legacy foods page
│   │   ├── error.tsx        # Error boundary
│   │   ├── loading.tsx      # Loading skeleton
│   │   └── not-found.tsx    # 404 page
│   ├── components/
│   │   ├── KeralaMap.tsx    # Interactive Leaflet map
│   │   ├── ThemeProvider.tsx # Dark/light theme provider
│   │   └── layout/
│   │       ├── Navbar.tsx   # Responsive navigation bar
│   │       └── Footer.tsx   # Site footer
│   ├── contexts/
│   │   └── LanguageContext.tsx # i18n context (EN/ML)
│   ├── data/                # Static data files
│   │   ├── destinations.ts  # 14 districts & destinations
│   │   ├── experiences.ts   # Kerala experiences
│   │   ├── gods-own-flavours.ts # 60 dishes (veg + non-veg)
│   │   ├── blog.ts          # Blog posts
│   │   ├── itineraries.ts   # Trip itineraries
│   │   ├── accommodations.ts # Hotels & resorts
│   │   ├── foods.ts         # Legacy foods data
│   │   └── translations.ts  # EN/ML translations
│   ├── lib/
│   │   └── utils.ts         # Utility functions (cn, etc.)
│   └── types/
│       └── index.ts         # TypeScript type definitions
├── next.config.js           # Next.js configuration
├── tailwind.config.ts       # Tailwind CSS configuration
├── tsconfig.json            # TypeScript configuration
├── vercel.json              # Vercel deployment config
└── package.json
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** 20.9+ (22 or 24 LTS recommended)
- **npm** or **yarn**

### Installation

```bash
# Clone the repository
git clone https://github.com/RohanAnil1/Kerala-Tourism.git
cd Kerala-Tourism

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
npm run build
npm start
```

---

## 📜 Scripts

| Command         | Description                  |
|-----------------|------------------------------|
| `npm run dev`   | Start development server     |
| `npm run build` | Production build             |
| `npm start`     | Start production server      |
| `npm run lint`  | Run ESLint                   |
| `npm run test:editorial` | Check routes, journey links, and geographic pin positions |
| `npm run test:planner` | Check planner validation, dates, budgets, sharing, calendar formatting, and media references |
| `npm run test:guides -- --http` | Verify 15 festival and 5 stay guides, seasonal filters, local card links, source references and unknown-slug 404 responses |
| `npm run test:catalog-details -- --http` | Verify all 281 destination, 60 food and 14 experience detail pages, collection links, section anchors, references and unverified-location handling |
| `npm run audit:images` | Report image coverage and unresolved subjects |
| `npm run test:images` | Verify destination photo provenance and mobile/desktop optimized delivery against the running server |
| `npm run test:food-images` | Verify food photo provenance and mobile/desktop optimized delivery against the running server |
| `npm run test:photo-coverage -- --delivery` | Verify photo coverage, exact/context distinctions, source associations and mobile/desktop delivery across every public collection |
| `node scripts/check-site.cjs` | Check every catalog route and referenced image against the running local server |

Stop the development server before building or running the production server; they share `.next` and port 3000. QA artifacts are written to the ignored `.qa/` folder.

### Festival and stay guides

Festival and accommodation cards open complete guides on this site at `/events/<slug>` and `/accommodation/<slug>`. The 15 festival guides cover the occasion's background, venue, season, highlights, travel and visiting etiquette. The five property guides cover the setting, room categories, dining, facilities and arrival arrangements. Each guide includes related local destinations, photo attribution, primary-source references and a review date.

Content is paraphrased from temple, organiser, tourism and property-operator references, reviewed on 29 October 2026. Annual seasons are distinguished from confirmed edition dates; past programmes are explicitly labelled. Room rates and availability are not live. External references are optional source links that open in a new tab; the main discovery journey stays within the site. Existing photo-context and unverified-location labels remain visible.

### Destination, food and experience details

All 355 destination, food and experience cards open local guides with a unique page title, section navigation, practical information, galleries, references and related local pages. All known detail URLs are generated in the production build; unknown slugs return HTTP 404. Discovery expansion is URL-backed (`page=2`, etc.), so opening a later card and using Back restores the expanded collection. Changing a filter or search resets that expansion.

The 14 experience guides have original, source-reviewed introductions, suggested stages and provider questions, replacing unsupported promises about package inclusions, wildlife sightings and treatments. The 60 food guides include individual kitchen notes, ingredients, preparation and serving context, dietary checks, related dishes and labelled references to exact or related preparations. Named restaurant availability is not inferred from the archive. Destination references distinguish place background, photographic identity and current visitor information; they do not independently verify every historical archive claim. The nine unresolved place identities retain their warnings, labelled area-context photos and withheld map pins.

The 29 October verification covers all 355 guides at phone and desktop widths, plus representative 768/1280 px layouts: 728 browser checks. Collection/detail/Back, mobile filtering and galleries pass. All 348 displayed photographs pass delivery at 640 and 1920 px (696 requests), and the full 488-page/shortcut HTTP sweep has no failures. One optional external OpenStreetMap identity reference was rate-limited during the source-link audit; the site’s local content and image delivery do not depend on it.

---

## 🌍 Deployment

The project is deployed on **Vercel** with the Mumbai (`bom1`) region for low-latency access from India.

Push to the `main` branch to trigger automatic deployment.

---

## 📸 Image & Video Credits

- **Images**: locally stored Wikimedia Commons and photographer-published Creative Commons files, government photographs under explicit reproduction policies, and a named photograph from Kerala Tourism's royalty-free collection. Subject references, creators, reuse terms and adaptations are recorded in `public/media/manifest.json` and displayed on `/credits` and the detail pages.
- **Films**: official Kerala Tourism [Athirappilly](https://www.keralatourism.org/video-gallery/athirappilly-thrissur/1559/) and [Human by Nature](https://www.keralatourism.org/video-gallery/human-nature/981/) films, embedded from the publisher's YouTube channel.
- **Boundary**: geoBoundaries/DataMeet, CC BY 2.5 India; source and downloadable geometry linked on `/credits#kerala-map`.
- Every public listing has a real photo. Exact subject photographs and explicitly labelled context are kept separate; a district or venue photo never verifies a missing attraction photo, a property's rooms, an activity or a map pin.
- The complete coverage check passes for 465 listings: 440 use subject photographs and 25 use labelled area/venue/activity context. All 60 dishes have reviewed photographs. Nine unverified place identities remain labelled, without guessed pins or directions; four confirmed destinations still need exact reusable photographs and display named district context. See [PHOTO_REVIEW.md](PHOTO_REVIEW.md) for sources, limits and mobile/desktop verification.

---

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📄 License

This project is for educational and portfolio purposes.

---

<p align="center">
  Made with ❤️ for <strong>God's Own Country</strong>
</p>

# 🌴 Kerala Tourism — God's Own Country

A modern, immersive tourism website for Kerala, India — built with Next.js 14, TypeScript, Tailwind CSS, and Framer Motion. Showcasing Kerala's destinations, experiences, cuisine, and culture through rich visuals and smooth animations.

**Live:** [keralatourism.vercel.app](https://keralatourism.vercel.app)

![Next.js](https://img.shields.io/badge/Next.js-14-black?logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.3-blue?logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-06B6D4?logo=tailwindcss)
![Vercel](https://img.shields.io/badge/Deployed_on-Vercel-000?logo=vercel)

---

## ✨ Features

### 🎬 Cinematic Hero
- **Athirappilly Waterfalls** video background (landscape, autoplay, looped)
- Parallax scrolling with smooth fade-out on scroll
- Animated call-to-action buttons

### 🗺️ Destinations
- **14 districts** of Kerala with detailed pages
- Interactive Kerala map (Leaflet / React-Leaflet)
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
- Every dish has a unique, verified image

### 📝 Blog
- Travel articles and guides about Kerala
- Individual blog post pages with rich content
- Featured posts on the home page

### 🗓️ Trip Planner
- Pre-built Kerala itineraries (3-day, 5-day, 7-day)
- PDF export with jsPDF + html2canvas

### 🏨 Accommodation
- Hotels, resorts, and homestay listings across Kerala

### 🌐 Multi-language Support
- English and Malayalam translations via Language Context
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
| Maps          | [Leaflet](https://leafletjs.com/) + [React-Leaflet](https://react-leaflet.js.org/) |
| PDF Export    | [jsPDF](https://github.com/parallax/jsPDF) + [html2canvas](https://html2canvas.hertzen.com/) |
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

- **Node.js** 18+ 
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

---

## 🌍 Deployment

The project is deployed on **Vercel** with the Mumbai (`bom1`) region for low-latency access from India.

Push to the `main` branch to trigger automatic deployment.

---

## 📸 Image & Video Credits

- **Photos**: [Unsplash](https://unsplash.com/) & [Pexels](https://www.pexels.com/) (free license)
- **Hero Video**: [Pexels — Athirappilly Waterfalls](https://www.pexels.com/video/a-magnificent-view-of-the-waterfalls-6981411/) (1920×1080, landscape)
- **Dish Images**: Mix of Unsplash & Pexels (all verified, unique per dish)

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

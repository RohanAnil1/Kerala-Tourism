// Sources are linked per place. Coordinates mark a planning base, not an entrance.
export const GUIDE_CHECKED_AT = "2026-10-26";
export type TravelBase = {
  id: string;
  name: string;
  region: string;
  lat: number;
  lng: number;
  interests: string[];
  description: string;
  href: string;
  source: string;
  activities: string[];
  practical?: string;
  booking?: string;
};
export const travelBases: TravelBase[] = [
  {
    id: "kochi",
    name: "Fort Kochi",
    region: "Ernakulam",
    lat: 9.965,
    lng: 76.242,
    interests: ["Culture", "Food", "Coast"],
    description:
      "Old trading streets, fishing nets, and a waterfront made for walking.",
    href: "/destinations/fort-kochi",
    source: "https://www.keralatourism.org/districts/ernakulam/",
    activities: [
      "Walk the Fort Kochi waterfront and Chinese fishing nets",
      "Explore Mattancherry’s trading streets",
      "Visit Mattancherry Palace; check opening days",
      "Attend a Kathakali performance; book with the venue",
    ],
    practical:
      "Museum and performance hours vary. Confirm directly with the venue.",
  },
  {
    id: "athirappilly",
    name: "Athirappilly",
    region: "Thrissur",
    lat: 10.2851,
    lng: 76.5698,
    interests: ["Nature"],
    description: "The Chalakudy River tumbles through the Sholayar landscape.",
    href: "/destinations/athirappilly-waterfalls",
    source: "https://www.dtpcthrissur.com/destination/athirappilly-waterfalls",
    activities: [
      "Visit Athirappilly’s designated waterfall viewpoints",
      "Consider nearby Vazhachal, subject to access",
      "Pause at Thumboormozhi on the Chalakudy River",
    ],
    practical:
      "DTPC lists 08:00–18:00, adult ₹50 / child ₹10, offline tickets. Conditions and access can change; stay out of the river.",
    booking: "https://www.dtpcthrissur.com/destination/athirappilly-waterfalls",
  },
  {
    id: "munnar",
    name: "Munnar",
    region: "Idukki",
    lat: 10.0889,
    lng: 77.0595,
    interests: ["Hills", "Nature"],
    description: "Tea country, mountain light, and the high Western Ghats.",
    href: "/destinations/munnar",
    source: "https://www.keralatourism.org/destination/munnar/202/",
    activities: [
      "Explore the Tea Museum at Nallathanni; confirm hours",
      "Visit Eravikulam National Park with a reserved entry",
      "Take in the scenery around Mattupetty Dam",
      "Arrange a permitted tea estate walk with a local operator",
    ],
    practical:
      "Eravikulam’s booking page lists entry slots 08:00–14:00 and Indian adult entry ₹200; other fees apply. Seasonal closures require an operator check.",
    booking: "https://eravikulamnationalpark.in/axIframeContents.php",
  },
  {
    id: "thekkady",
    name: "Thekkady",
    region: "Idukki",
    lat: 9.603,
    lng: 77.161,
    interests: ["Nature", "Hills"],
    description: "A base at Kumily for the Periyar forest and spice country.",
    href: "/destinations/thekkady",
    source: "https://www.keralatourism.org/film-locations/thekkady",
    activities: [
      "Book an available Periyar nature programme with the reserve",
      "Explore a spice garden near Kumily with its operator",
      "Reserve a Periyar Lake boat trip, subject to availability",
    ],
    practical:
      "Wildlife sightings are never guaranteed. Reserve permits and activities with the official operator.",
    booking: "https://www.periyartigerreserve.org/",
  },
  {
    id: "alappuzha",
    name: "Alappuzha",
    region: "Alappuzha",
    lat: 9.4981,
    lng: 76.3388,
    interests: ["Backwaters", "Food", "Coast"],
    description:
      "Canals, Kuttanad villages, and a slower life beside the water.",
    href: "/destinations/alappuzha-backwaters",
    source: "https://www.keralatourism.org/destination/alappuzha-beach/60/",
    activities: [
      "Arrange a backwater outing with a licensed local operator",
      "Walk Alappuzha Beach in the cooler hours",
      "Explore Kuttanad’s village landscape with a local guide",
    ],
    practical:
      "Confirm the boat, route, mooring time, meals, lifejackets, and total quote before booking.",
  },
  {
    id: "kumarakom",
    name: "Kumarakom",
    region: "Kottayam",
    lat: 9.617,
    lng: 76.429,
    interests: ["Backwaters", "Nature", "Food"],
    description: "Vembanad Lake, birdlife, and village life along the shore.",
    href: "/destinations/kumarakom-backwaters",
    source: "https://www.keralatourism.org/destination/kumarakom-kottayam/112/",
    activities: [
      "Visit Kumarakom Bird Sanctuary; confirm access",
      "Arrange a village or canoe experience with a local operator",
      "Leave an afternoon free beside Vembanad Lake",
    ],
  },
  {
    id: "varkala",
    name: "Varkala",
    region: "Thiruvananthapuram",
    lat: 8.7379,
    lng: 76.7163,
    interests: ["Coast", "Culture"],
    description: "Cliffside walks above Papanasam Beach and the Arabian Sea.",
    href: "/destinations/varkala-cliff-beach",
    source: "https://www.keralatourism.org/destination/varkala-beach/328/",
    activities: [
      "Walk the Varkala cliff path in daylight",
      "Spend time at Papanasam Beach, following lifeguard advice",
      "Visit Janardhana Swamy Temple or Sivagiri, respecting access rules",
    ],
    practical:
      "Sea conditions vary. Follow lifeguards and local beach warnings.",
  },
  {
    id: "kovalam",
    name: "Kovalam",
    region: "Thiruvananthapuram",
    lat: 8.3988,
    lng: 76.982,
    interests: ["Coast"],
    description: "Lighthouse views and the beaches south of the capital.",
    href: "/destinations/kovalam-beach",
    source: "https://www.keralatourism.org/faq/the-five-best-beaches",
    activities: [
      "Walk Lighthouse Beach",
      "Visit Vizhinjam Lighthouse during confirmed opening hours",
      "Leave time for a quiet coastal meal",
    ],
    practical:
      "Check sea conditions and the lighthouse’s current opening days.",
  },
  {
    id: "trivandrum",
    name: "Thiruvananthapuram",
    region: "Thiruvananthapuram",
    lat: 8.5241,
    lng: 76.9366,
    interests: ["Culture", "Food"],
    description: "Museums, traditional architecture, and Kerala’s capital.",
    href: "/destinations?district=thiruvananthapuram",
    source: "https://www.keralatourism.org/districts/thiruvananthapuram/",
    activities: [
      "Explore the Napier Museum precinct; check opening days",
      "Walk the streets around East Fort",
      "Visit Padmanabhaswamy Temple only if eligible under its access rules",
    ],
    practical:
      "Temple entry and dress rules are specific. Confirm them directly before visiting.",
  },
  {
    id: "munroe",
    name: "Munroe Island",
    region: "Kollam",
    lat: 8.9974,
    lng: 76.6113,
    interests: ["Backwaters", "Nature"],
    description: "Narrow canals and village life in the Ashtamudi landscape.",
    href: "/destinations/munroe-island",
    source: "https://www.keralatourism.org/districts/kollam/",
    activities: [
      "Arrange a guided canoe outing through the canals",
      "Walk village lanes, respecting residents’ privacy",
      "Leave time to watch the changing light on the water",
    ],
  },
  {
    id: "vagamon",
    name: "Vagamon",
    region: "Idukki",
    lat: 9.685,
    lng: 76.905,
    interests: ["Hills", "Nature"],
    description:
      "Open hills and a quiet base between the highlands and the coast.",
    href: "/destinations/vagamon-idukki",
    source: "https://www.keralatourism.org/greencarpet/destinations",
    activities: [
      "Explore accessible meadows with local access advice",
      "Take a gentle walk through the hill landscape",
      "Leave a flexible afternoon for the weather",
    ],
    practical:
      "Outdoor access changes with weather. Book guided activities through licensed operators.",
  },
  {
    id: "wayanad",
    name: "Kalpetta / Wayanad",
    region: "Wayanad",
    lat: 11.6103,
    lng: 76.0828,
    interests: ["Hills", "Nature", "Culture"],
    description: "A planning base for Wayanad’s hills, caves, and forests.",
    href: "/destinations?district=wayanad",
    source: "https://www.keralatourism.org/districts/wayanad/",
    activities: [
      "Visit Edakkal Caves if currently open; allow for the climb",
      "Explore the Banasura Sagar Dam area",
      "Reserve an available forest programme with the Forest Department",
    ],
    practical:
      "Check road access, weather, and attraction closures locally before travelling.",
    booking: "https://ecotourism.forest.kerala.gov.in/ecotourismbooking",
  },
  {
    id: "kozhikode",
    name: "Kozhikode",
    region: "Kozhikode",
    lat: 11.2588,
    lng: 75.7804,
    interests: ["Food", "Coast", "Culture"],
    description:
      "Malabar food, the beachfront, and old trading neighbourhoods.",
    href: "/destinations?district=kozhikode",
    source: "https://www.keralatourism.org/districts/kozhikode/",
    activities: [
      "Walk Kozhikode Beach in the cooler hours",
      "Explore the streets around Mananchira and SM Street",
      "Visit Beypore and its boatbuilding waterfront",
    ],
    practical:
      "Working boatyards are workplaces. Ask permission before entering or photographing.",
  },
  {
    id: "kannur",
    name: "Kannur",
    region: "Kannur",
    lat: 11.8745,
    lng: 75.3704,
    interests: ["Coast", "Culture"],
    description: "Fort walls, northern beaches, and a living ritual tradition.",
    href: "/destinations?district=kannur",
    source: "https://www.keralatourism.org/districts/kannur/",
    activities: [
      "Explore St. Angelo Fort during opening hours",
      "Walk Payyambalam Beach",
      "Ask a local host about confirmed Theyyam rituals, if in season",
    ],
    practical:
      "Theyyam dates belong to individual shrines. Confirm the venue, date, and visitor etiquette locally.",
  },
  {
    id: "bekal",
    name: "Bekal",
    region: "Kasaragod",
    lat: 12.3926,
    lng: 75.0321,
    interests: ["Coast", "Culture"],
    description: "A laterite fort looking out over Kerala’s northern coast.",
    href: "/destinations/bekal-fort",
    source: "https://www.keralatourism.org/districts/kasaragod/",
    activities: [
      "Visit Bekal Fort during confirmed opening hours",
      "Walk the shore near the fort, following local guidance",
      "Explore a nearby village with a local host",
    ],
  },
  {
    id: "palakkad",
    name: "Palakkad",
    region: "Palakkad",
    lat: 10.7867,
    lng: 76.6548,
    interests: ["Culture", "Nature"],
    description: "Fort walls, the Palakkad Gap, and a gentler inland rhythm.",
    href: "/destinations/palakkad-fort",
    source: "https://www.keralatourism.org/districts/palakkad/",
    activities: [
      "Explore Palakkad Fort during opening hours",
      "Visit Malampuzha’s dam and garden area",
      "Leave time for a local meal and an unhurried evening",
    ],
  },
];
export const baseById = (id: string) =>
  travelBases.find((base) => base.id === id);
export const tripSeeds = [
  {
    id: "1",
    title: "Kochi to the backwaters",
    days: 3,
    stops: ["kochi", "alappuzha"],
  },
  {
    id: "2",
    title: "Tea, forest & water",
    days: 7,
    stops: ["kochi", "munnar", "thekkady", "alappuzha"],
  },
  {
    id: "3",
    title: "The Malabar coast",
    days: 5,
    stops: ["kozhikode", "kannur", "bekal"],
  },
];

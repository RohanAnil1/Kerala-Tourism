// ============== CORE TYPES ==============

export interface Destination {
  id: string;
  slug: string;
  name: string;
  district: string;
  districtSlug: string;
  type: DestinationType[];
  description: string;
  longDescription: string;
  history: string;
  bestTimeToVisit: string;
  entryFee: string;
  timings: string;
  howToReach: {
    air: string;
    rail: string;
    road: string;
  };
  coordinates: { lat: number; lng: number };
  images: string[];
  rating: number;
  reviews: number;
  crowdLevel: 'low' | 'medium' | 'high';
  budgetRange: 'budget' | 'mid-range' | 'luxury';
  highlights: string[];
  travelTips: string[];
  nearbyAttractions: string[];
  featured: boolean;
}

export type DestinationType = 'nature' | 'beach' | 'hill' | 'spiritual' | 'wildlife' | 'backwater' | 'heritage' | 'urban';

export interface Experience {
  id: string;
  slug: string;
  title: string;
  category: ExperienceCategory;
  description: string;
  longDescription: string;
  duration: string;
  costEstimate: string;
  difficulty: 'easy' | 'moderate' | 'challenging';
  bestSeason: string;
  safetyTips: string[];
  images: string[];
  rating: number;
  reviews: number;
  location: string;
  highlights: string[];
  inclusions: string[];
  featured: boolean;
}

export type ExperienceCategory = 'backwater' | 'houseboat' | 'trekking' | 'ayurveda' | 'festival' | 'wildlife' | 'beach' | 'cultural';

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  authorAvatar: string;
  date: string;
  readTime: string;
  category: string;
  tags: string[];
  image: string;
  featured: boolean;
}

export interface Itinerary {
  id: string;
  title: string;
  days: number;
  style: TripStyle;
  budget: BudgetLevel;
  description: string;
  dayPlans: DayPlan[];
  totalCost: string;
  image: string;
}

export interface DayPlan {
  day: number;
  title: string;
  location: string;
  activities: string[];
  accommodation: string;
  meals: string;
  tips: string;
}

export type TripStyle = 'relax' | 'adventure' | 'family' | 'couple' | 'solo' | 'spiritual';
export type BudgetLevel = 'budget' | 'mid-range' | 'luxury';

export interface Accommodation {
  id: string;
  slug: string;
  name: string;
  type: 'hotel' | 'homestay' | 'houseboat' | 'resort' | 'hostel';
  location: string;
  district: string;
  description: string;
  priceRange: string;
  rating: number;
  reviews: number;
  amenities: string[];
  images: string[];
  coordinates: { lat: number; lng: number };
  featured: boolean;
}

export interface District {
  id: string;
  name: string;
  slug: string;
  description: string;
  coordinates: { lat: number; lng: number };
  image: string;
  attractions: number;
  pathData: string; // SVG path for interactive map
}

export interface Review {
  id: string;
  userName: string;
  userAvatar: string;
  rating: number;
  comment: string;
  date: string;
  destination: string;
  images?: string[];
}

export interface WeatherInfo {
  location: string;
  temperature: number;
  condition: string;
  humidity: number;
  forecast: string;
}

export type Language = 'en' | 'ml' | 'hi' | 'ar';

export interface TranslationStrings {
  [key: string]: string;
}

export interface Season {
  id: string;
  name: string;
  months: string;
  description: string;
  image: string;
  highlights: string[];
}

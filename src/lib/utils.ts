import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(amount: number, currency: string = 'INR'): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency,
    maximumFractionDigits: 0,
  }).format(amount);
}

export function getRandomItems<T>(arr: T[], count: number): T[] {
  const shuffled = [...arr].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w ]+/g, '')
    .replace(/ +/g, '-');
}

export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength).trim() + '...';
}

export function getRatingStars(rating: number): string {
  const full = Math.floor(rating);
  const half = rating % 1 >= 0.5 ? 1 : 0;
  const empty = 5 - full - half;
  return '★'.repeat(full) + (half ? '½' : '') + '☆'.repeat(empty);
}

export function getSeasonalGreeting(): { season: string; message: string } {
  const month = new Date().getMonth();
  if (month >= 5 && month <= 8) {
    return { season: 'monsoon', message: 'Experience the magical monsoon season in Kerala!' };
  } else if (month >= 9 && month <= 11) {
    return { season: 'festival', message: 'Festival season is here! Experience Onam & Christmas in Kerala!' };
  } else if (month >= 0 && month <= 1) {
    return { season: 'winter', message: 'Perfect weather for beaches and backwaters!' };
  } else {
    return { season: 'summer', message: 'Beat the heat with Kerala\'s refreshing hill stations!' };
  }
}

export const DISTRICT_LIST = [
  'Thiruvananthapuram', 'Kollam', 'Pathanamthitta', 'Alappuzha',
  'Kottayam', 'Idukki', 'Ernakulam', 'Thrissur',
  'Palakkad', 'Malappuram', 'Kozhikode', 'Wayanad',
  'Kannur', 'Kasaragod'
];

export const EXPERIENCE_CATEGORIES = [
  { id: 'backwater', label: 'Backwaters', icon: '🛶' },
  { id: 'houseboat', label: 'Houseboats', icon: '🚢' },
  { id: 'trekking', label: 'Trekking & Adventure', icon: '🏔️' },
  { id: 'ayurveda', label: 'Ayurveda & Wellness', icon: '🌿' },
  { id: 'festival', label: 'Festivals & Culture', icon: '🎭' },
  { id: 'wildlife', label: 'Wildlife Safari', icon: '🐘' },
  { id: 'beach', label: 'Beaches', icon: '🏖️' },
  { id: 'cultural', label: 'Cultural Tours', icon: '🏛️' },
];

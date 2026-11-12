import type { Itinerary } from '@/types';
import { tripSeeds, baseById } from './travel-guide';
import { buildTrip } from '@/lib/trip-planner';
import { verifiedCover } from './media';

export const itineraries: Itinerary[] = tripSeeds.map((seed,index)=>{
 const trip=buildTrip({name:seed.title,days:seed.days,startDate:'',travellers:2,pace:'balanced',transport:'car',stops:seed.stops});
 return {id:seed.id,title:seed.title,days:seed.days,style: index===0?'relax':index===1?'adventure':'couple',budget:index===2?'luxury':'mid-range',description:seed.stops.map(id=>baseById(id)!.name).join(' → '),totalCost:'Add your own quotes in the planner',image:verifiedCover(index===0?'destinations/alappuzha-backwaters':index===1?'editorial/hills':'destinations/bekal-fort'),dayPlans:trip.dayPlans.map((day,index)=>({day:index+1,title:baseById(day.base)!.name,location:baseById(day.base)!.name,activities:day.activities,accommodation:'Choose and book your own stay',meals:'Choose locally; confirm dietary needs',tips:day.notes}))};
});

export interface ItineraryMatch {
  itinerary: Itinerary;
  exact: boolean;
  differences: string[];
}

export function matchItinerary(days: number, style: string, budget: string): ItineraryMatch | null {
  if (!Number.isInteger(days) || days < 1 || days > 21 || !['relax', 'adventure', 'family', 'couple', 'solo', 'spiritual'].includes(style) || !['budget', 'mid-range', 'luxury'].includes(budget) || !itineraries.length) return null;
  const ranked = itineraries.map(itinerary => ({ itinerary, score: (itinerary.style === style ? 4 : 0) + (itinerary.budget === budget ? 3 : 0) - Math.abs(itinerary.days - days) }));
  ranked.sort((a, b) => b.score - a.score);
  const itinerary = ranked[0].itinerary;
  const differences: string[] = [];
  if (itinerary.days !== days) differences.push(`This route is ${itinerary.days} days; you requested ${days}.`);
  if (itinerary.style !== style) differences.push(`Its travel style is ${itinerary.style}; you selected ${style}.`);
  if (itinerary.budget !== budget) differences.push(`Its budget is ${itinerary.budget}; you selected ${budget}.`);
  return { itinerary, exact: differences.length === 0, differences };
}

export function generateItinerary(days: number, style: string, budget: string): Itinerary | null {
  return matchItinerary(days, style, budget)?.itinerary || null;
}

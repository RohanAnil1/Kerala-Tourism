export const GUIDE_REVIEWED_AT = '2026-10-29';

export interface ExperienceGuide {
  summary: string;
  overview: string[];
  highlights: string[];
  stages: GuideHighlight[];
  arrangements: string[];
  visitingNotes: string[];
  relatedPlaces: string[];
  relatedFestival?: string;
  duration: string;
  season: string;
  sources: GuideSource[];
}

export interface GuideSource { label: string; url: string }
export interface GuideHighlight { title: string; description: string }

export interface FestivalGuide {
  slug: string;
  name: string;
  summary: string;
  venue: string;
  districtSlug?: string;
  season: string;
  months: number[];
  timeToAllow: string;
  admission: string;
  overview: string[];
  highlights: GuideHighlight[];
  scheduleNote: string;
  lastEdition?: { label: string; dates: string; note: string };
  gettingThere: string;
  visitTips: string[];
  relatedPlaces: string[];
  sources: GuideSource[];
}

export interface StayGuide {
  summary: string;
  operator: string;
  address: string;
  districtSlug: string;
  setting: string;
  overview: string[];
  roomTypes: string[];
  dining: GuideHighlight[];
  facilities: string[];
  experiences: string[];
  access: string;
  bookingNotes: string[];
  relatedPlaces: string[];
  sources: GuideSource[];
}

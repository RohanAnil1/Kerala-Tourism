import index from "./media-index.json";
const media = index as Record<string, string[]>;
/** Empty is deliberate: an unrelated stock photograph is never a fallback. */
export function verifiedPhotos(key: string): string[] {
  return media[key] || [];
}
export function verifiedCover(key: string): string {
  return verifiedPhotos(key)[0] || "";
}
const districtSubjects: Record<string, string> = {
  thiruvananthapuram: "destinations/kovalam-beach",
  kollam: "destinations/munroe-island",
  pathanamthitta: "destinations/aranmula-parthasarathy-temple",
  alappuzha: "destinations/alappuzha-backwaters",
  kottayam: "editorial/backwaters",
  idukki: "editorial/hills",
  ernakulam: "destinations/fort-kochi",
  thrissur: "destinations/athirappilly-waterfalls",
  palakkad: "destinations/palakkad-fort",
  malappuram: "destinations/kottakkunnu",
  kozhikode: "destinations/kozhikode-beach",
  wayanad: "destinations/edakkal-caves",
  kannur: "destinations/muzhappilangad-beach",
  kasaragod: "destinations/bekal-fort",
};
export const districtCover = (slug: string) =>
  verifiedCover(districtSubjects[slug] || "");

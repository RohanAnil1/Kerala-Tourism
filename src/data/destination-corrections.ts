import type { Destination } from "@/types";

// Corrections established while checking the photographic locations. URLs stay stable.
export const destinationCorrections: Record<string, Partial<Destination>> = {
  // https://www.keralatourism.org/kerala-article/2021/thoovanam-waterfalls/1095
  "thoovanam-waterfalls": {
    district: "Idukki", districtSlug: "idukki", coordinates: undefined,
    description: "A waterfall on the Pambar River inside Chinnar Wildlife Sanctuary, reached by a guided forest trek.",
    longDescription: "Thoovanam Waterfalls lies inside Chinnar Wildlife Sanctuary in Idukki, near Marayoor. Kerala Tourism describes a forest-department guided trek starting from Alampetty checkpost. Confirm the current programme and access with the sanctuary before setting out.",
    history: "Kerala Tourism documents Thoovanam as part of the Chinnar landscape and its guided nature programmes.",
    highlights: ["Pambar River waterfall", "Chinnar Wildlife Sanctuary", "Guided forest trek"],
    travelTips: ["Confirm guided access with the sanctuary", "Follow the assigned guide and permitted route"],
    nearbyAttractions: ["Chinnar Wildlife Sanctuary", "Marayoor", "Kanthalloor"],
    howToReach: { air: "Check onward transfers from Cochin or Coimbatore airports.", rail: "Plan onward road connections from Aluva or Ernakulam.", road: "Alampetty checkpost near Marayoor, Idukki. Confirm the guided trek with Chinnar Wildlife Sanctuary." },
    locationReview: { status: "verified", checkedAt: "2026-10-29", note: "Kerala Tourism places Thoovanam Waterfalls in Chinnar Wildlife Sanctuary, Idukki. The inherited Malappuram classification and coordinates have been removed. Confirm the visitor approach with the sanctuary; no guessed entrance pin is published.", references: [{ title: "Kerala Tourism: Thoovanam Waterfalls, Idukki", url: "https://www.keralatourism.org/kerala-article/2021/thoovanam-waterfalls/1095" }] },
  },
  // https://www.keralatourism.org/malabar/waterfalls-malappuram/218
  "kozhippara-waterfalls": {
    district: "Malappuram", districtSlug: "malappuram", coordinates: undefined,
    description: "A waterfall in the Malappuram high ranges, approached from the Nilambur side.",
    longDescription: "Kerala Tourism identifies Kozhippara Waterfalls in the high ranges of Malappuram, near Nilambur. The surrounding landscape includes the Kuthradampuzha River and wooded hills. Confirm the current approach and access locally before visiting.",
    history: "Kozhippara is included in Kerala Tourism's guide to the waterfalls of Malappuram.",
    highlights: ["Kozhippara cascade", "Malappuram high ranges", "Kuthradampuzha River landscape"],
    travelTips: ["Confirm current access locally", "Use permitted paths and follow on-site instructions"],
    nearbyAttractions: ["Nilambur", "Teak Museum", "Adyanpara Falls"],
    howToReach: { air: "Plan an onward road transfer from Calicut International Airport.", rail: "Check trains and onward transport via Nilambur Road.", road: "Confirm the approach to Kozhippara from Nilambur in Malappuram district." },
    locationReview: { status: "verified", checkedAt: "2026-10-29", note: "Kerala Tourism identifies Kozhippara Waterfalls in Malappuram's high ranges near Nilambur. The inherited Kozhikode classification, cliff-jumping claims and coordinates have been removed. A precise visitor entrance pin is withheld.", references: [{ title: "Kerala Tourism: Waterfalls in Malappuram", url: "https://www.keralatourism.org/malabar/waterfalls-malappuram/218" }] },
  },
  // https://www.keralatourism.org/destination/thattekkad-bird-sanctuary/127/
  "thattekad-bird-sanctuary": { district: "Ernakulam", districtSlug: "ernakulam" },
  // https://www.keralatourism.org/destination/beypore/318/
  "beypore-port": { district: "Kozhikode", districtSlug: "kozhikode" },
  // The photographed Kappil at Edava/Varkala is distinct from Kappil in Kasaragod.
  "kappil-beach": { name: "Kappil Beach, Varkala", district: "Thiruvananthapuram", districtSlug: "thiruvananthapuram" },
  "ancharakandi": { name: "Anjarakkandy" },
  // https://www.keralatourism.org/destination/alumkadavu-houseboat/442/
  "alumkadavu-boat-yard": {
    description: "A backwater village in Karunagappally, Kollam, known for traditional houseboat construction and coir work.",
    longDescription: "Alumkadavu's working waterfront is associated with the making of Kerala's kettuvalloms. Kerala Tourism identifies the village in Karunagappally and describes its boat-building and coir traditions. Visits to individual yards depend on their owners and work schedules; arrange access locally rather than expecting a scheduled public demonstration.",
    history: "Kettuvalloms carried cargo before their adaptation for tourism. Alumkadavu is documented as an important village in the houseboat-building tradition.",
    highlights: ["Houseboat-building traditions", "Coir craftsmanship", "Backwater village landscape"],
    travelTips: ["Ask the yard operator before entering or photographing work", "Confirm whether a workshop can be visited on your date"],
    howToReach: { air: "Thiruvananthapuram International Airport; arrange an onward road transfer.", rail: "Check trains to Karunagappally or Kollam and confirm the local transfer.", road: "Alumkadavu village, Karunagappally, Kollam district. Confirm the individual boatyard." },
  },
  // https://www.keralatourism.org/destination/charalkunnu-hill-station/456/
  "charalkunnu-hills": {
    description: "A hill retreat in Pathanamthitta with valley landscapes and walking trails.",
    longDescription: "Charalkunnu is a hill destination in Pathanamthitta, near Ranni. Kerala Tourism highlights its landscapes, trails and camp-house accommodation. Confirm current trail and accommodation arrangements before visiting. The photograph is an older view from the hill, with the original annotation about a proposed Aranmula airport preserved; it does not depict an airport at Charalkunnu.",
    history: "The hill is documented as a retreat and picnic destination by Kerala Tourism. Its landscape is part of the countryside around Kozhencherry and Ranni.",
    highlights: ["Valley landscapes", "Hill walks", "Pathanamthitta countryside"],
    travelTips: ["Confirm camp-house and trail access", "Plan walks in daylight", "Carry water and take litter home"],
    howToReach: { air: "Kerala Tourism lists Thiruvananthapuram International Airport; plan the onward road transfer.", rail: "Thiruvalla railway station, with an onward road transfer.", road: "Charalkunnu in Pathanamthitta district, near Ranni; follow the location reference and confirm local access." },
  },
  // https://www.keralatourism.org/destination/keezharkuth-waterfalls/121//
  "keezharkuthu-waterfalls": {
    description: "A forest waterfall in Idukki known as Rainbow Falls, with rock formations and wooded surroundings.",
    longDescription: "Kerala Tourism documents Keezharkuthu as a waterfall in Idukki, associated with rainbow spray, forest vegetation and outdoor activities. Confirm the current approach, permissions and any guided activity with DTPC Idukki before setting out.",
    history: "Keezharkuthu is included in Kerala Tourism's Idukki and Munnar-area destination guides under the name Rainbow Waterfall.",
    highlights: ["Forest waterfall", "Rainbow spray in suitable light", "Rock formations", "Idukki landscape"],
    travelTips: ["Confirm current access with DTPC Idukki", "Arrange any trek or adventure activity through an authorized operator"],
    howToReach: { air: "Cochin International Airport; confirm your onward transfer.", rail: "Kottayam or Ettumanoor, followed by a road transfer; check your train and approach.", road: "Confirm the Keezharkuthu approach in Idukki with DTPC before travelling." },
  },
  // KCZMA Kozhikode mangrove inventory, location 128 and neighboring patches.
  "elathur-mangroves": {
    description: "Mangrove patches documented in Elathur village, on the northern side of Kozhikode.",
    longDescription: "The coastal authority records several mangrove patches in Elathur rather than one managed attraction. The map identifies one published survey location west of Kuruvakkavu Ayyappa Temple. Visitor access is site-specific; check arrangements with the local authority before planning a visit.",
    history: "The mangrove areas are recorded in the coastal zone inventory for Kozhikode district, with separate locations and survey references.",
    highlights: ["Mangrove habitat", "Elathur's coastal landscape", "Documented coastal survey locations"],
    travelTips: ["Confirm access with the local authority", "The map marks a survey patch, not a visitor entrance"],
    howToReach: { air: "Calicut International Airport; confirm a road transfer.", rail: "Check connections to Elathur or Kozhikode and local transport.", road: "Elathur village, Kozhikode. A specific visitor entrance has not been established." },
  },
  // https://kozhikodecorporation.lsgkerala.gov.in/en/entertainment_and_leisure
  "lions-park-kozhikode": {
    description: "A children's park beside the old lighthouse on Kozhikode's beachfront.",
    longDescription: "Kozhikode Municipal Corporation identifies Lions Park as a children's attraction beside the old lighthouse on Calicut Beach. It is distinct from Mananchira Square. Confirm the current opening arrangements and available play facilities before visiting.",
    history: "The park is recorded among the city's recreational facilities in the corporation's tourism guide and urban master plan.",
    highlights: ["Children's park", "Kozhikode beachfront", "Old lighthouse surroundings"],
    travelTips: ["Confirm current opening arrangements", "Combine with a walk along the beachfront"],
    howToReach: { air: "Calicut International Airport; confirm a city transfer.", rail: "Kozhikode railway station, then local road transport to the beach.", road: "Beach Road, by the old lighthouse in Kozhikode." },
  },
  // https://www.keralatourism.org/destination/chethalayam-falls-wayanad/557//
  "chethalayam-waterfalls": {
    description: "A seasonal forest waterfall near Sulthan Bathery in Wayanad.",
    longDescription: "Chethalayam Falls is documented by Kerala Tourism near Sulthan Bathery in Wayanad. Its wooded surroundings and seasonal cascade are associated with walking and nature visits. Confirm the current approach, forest access and local arrangements before travelling.",
    history: "The falls feature in Kerala Tourism's Wayanad destination collection. Chethalayam village is listed on the Sulthan Bathery–Pulpally route.",
    highlights: ["Seasonal waterfall", "Wooded surroundings", "Wayanad landscape"],
    travelTips: ["Check current forest access before travelling", "Arrange any guided visit locally", "Do not assume a particular trek route is open"],
    howToReach: { air: "Calicut International Airport; arrange the onward journey to Wayanad.", rail: "Kozhikode railway station, followed by a road transfer to Sulthan Bathery.", road: "Near Chethalayam on the Sulthan Bathery–Pulpally route. Confirm the falls approach locally." },
  },
  // https://www.keralatourism.org/bekal/kappil-beach-kasaragod.php
  "kappil-beach-kasaragod": {
    type: ["beach", "nature"],
    description: "A quiet Arabian Sea shoreline near Bekal in Kasaragod, backed by coastal groves and the Kodi cliff landscape.",
    longDescription: "Kappil Beach belongs to the Bekal coastal circuit in Kasaragod. Kerala Tourism describes a broad sandy shoreline, coastal groves and views from the Kodi cliff. This is the northern Kappil, around 6 km from Bekal Fort; it is distinct from the beach and lake landscape at Varkala. Choose established public access points and confirm local arrangements before travelling.",
    history: "Kappil is documented in Kerala Tourism's Bekal circuit and location finder. The same beach name is also used at Varkala in southern Kerala, so checking the district matters when planning a visit.",
    highlights: ["Arabian Sea shoreline", "Coastal groves", "Kodi cliff landscape", "Bekal coastal circuit", "Beach walks"],
    travelTips: ["Confirm that your route is for Kappil near Bekal", "Combine with Bekal Fort, about 6 km away", "Use established public access", "Take litter home"],
    howToReach: { air: "Mangaluru International Airport; confirm the onward road transfer.", rail: "Check coastal rail connections to Kasaragod and local transfers.", road: "In the Bekal circuit, about 6 km from Bekal Fort. Confirm your access point." },
    nearbyAttractions: ["Bekal Fort", "Bekal Beach", "Palakkunnu", "Uduma"],
  },
  // https://aralamfarm.in/about/ and the panchayat's nursery gallery.
  "aralam-farm": {
    description: "A working agricultural farm and central nursery in Kannur, on the approach to Aralam Wildlife Sanctuary.",
    longDescription: "Aralam Farm produces planting materials and plantation crops in Kannur. Its operator, Aralam Farming Corporation (Kerala) Limited, describes the farm's agricultural work and its connection to the welfare of resettled tribal communities. The local panchayat identifies the central nursery shown in the photograph. Confirm nursery visits and farm activities directly with the operator; the farm and the adjoining wildlife sanctuary are separate destinations.",
    history: "The farm operator records its establishment by the Government of India in 1970, with assistance from the former Soviet Union. The present Kerala government company was incorporated in 2010.",
    highlights: ["Central nursery", "Planting materials", "Plantation agriculture", "Aralam's rural landscape"],
    travelTips: ["Confirm visits and activities with the farm operator", "Check farm and wildlife sanctuary arrangements separately", "Respect working areas and local communities"],
    howToReach: { air: "Kannur International Airport; confirm the onward transfer.", rail: "Check rail connections to Kannur or Thalassery and local road transfers.", road: "The operator places the farm about 16 km from Iritty. Confirm the nursery entrance directly." },
  },
  // KCZMA field report: Malappuram, Annexure 3, Plate 1 / printed page 61.
  "vallikunnu-beach": {
    description: "A coconut-lined stretch of the Arabian Sea at Ariyallur in Vallikkunnu Panchayat, Malappuram.",
    longDescription: "Vallikkunnu Beach lies along the Malappuram coast in Ariyallur village. The coastal authority's field survey identifies the shoreline and records the viewpoint shown in the archive photograph. The coastal landscape includes palms, sandy stretches and shoreline structures. Access and shore conditions can change; check the current local arrangements rather than relying on the older survey image.",
    history: "The beach is identified in the Kerala Coastal Zone Management Authority's field photographs for Malappuram district. Ariyallur Beach is also recorded as a ward in Vallikkunnu Panchayat.",
    highlights: ["Arabian Sea shoreline", "Coastal palms", "Ariyallur village", "Vallikkunnu's coastal landscape"],
    travelTips: ["Check current shoreline access locally", "The photograph is an archive field-survey view", "Take litter home"],
    howToReach: { air: "Calicut International Airport; confirm a local road transfer.", rail: "Check rail connections and onward transport to Ariyallur.", road: "Ariyallur village, Vallikkunnu Panchayat, on the Malappuram coast." },
  },
  // https://www.keralatourism.org/photo-gallery/kava-viewpoint/2459/
  "kava-island": {
    name: "Kava Viewpoint",
    description: "Reservoir views, forested hills, and changing clouds behind Malampuzha Dam in Palakkad.",
    longDescription: "Kava is a scenic catchment landscape behind Malampuzha Dam. The reservoir and forested hills make it a place to watch the light and clouds change. Plan a quiet visit on permitted public paths, keep away from restricted reservoir edges, and check local weather before travelling.",
    history: "The landscape forms part of the Malampuzha reservoir catchment. Kerala Tourism describes Kava as a viewpoint and a place to experience the arrival of monsoon clouds.",
    type: ["nature"],
    highlights: ["Malampuzha reservoir landscape", "Forested hills", "Seasonal cloudscapes"],
    travelTips: ["Stay on permitted public paths", "Check weather and local access", "Carry water and take litter home"],
    nearbyAttractions: ["Malampuzha Dam", "Malampuzha Rock Garden", "Palakkad"],
  },
};

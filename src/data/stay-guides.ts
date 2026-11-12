import type { StayGuide } from './guide-types';

// Property facts are paraphrased from operator sources; no live room inventory.
export const stayGuides: Record<string, StayGuide> = {
  'kumarakom-lake-resort': {
    summary: 'A Vembanad lakeside resort with Kerala-style rooms and villas, several dining settings and an Ayurveda spa.',
    operator: 'Kumarakom Lake Resort', address: 'Kumarakom, Kottayam, Kerala', districtSlug: 'kottayam', setting: 'Vembanad Lake / backwaters',
    overview: [
      'Kumarakom Lake Resort sits on the banks of Vembanad Lake in Kottayam district. Its accommodation ranges from pavilion rooms to villas and suites, with Kerala architectural details and different relationships to gardens, water and pools.',
      'Choose the room category carefully: a private pool or a particular view belongs to the named category, not automatically to every booking. The operator also lists houseboats, an Ayurveda spa and several dining venues, allowing a stay to be centred on the property or combined with the wider Kumarakom area.',
    ],
    roomTypes: ['Luxury Pavilion Rooms', 'Meandering Pool Villas', 'Heritage Villas with Private Pool', 'Heritage Lake View Villas with Private Pool', 'Presidential Suites with Private Pool', 'Houseboats — a separate accommodation choice'],
    dining: [
      { title: 'Ettukettu', description: 'The resort’s speciality restaurant in a traditional architectural setting.' },
      { title: 'Vembanad and the lakeside', description: 'The seafood bar and Pool Pavilion offer different waterside dining settings.' },
      { title: 'Thattukada', description: 'A Kerala-style tea-shop setting is among the operator’s listed dining options.' },
    ],
    facilities: ['Swimming pools', 'Ayurmana Ayurveda spa', 'Health club', 'Restaurants and tea shop', 'Wi-Fi'],
    experiences: ['Time beside Vembanad Lake', 'Dining in different resort settings', 'Exploring the Kumarakom backwater landscape'],
    access: 'Arrange the final road transfer to the named resort in Kumarakom. Check the pickup point and timing separately if choosing a houseboat rather than a land-based room.',
    bookingNotes: ['Request a quote for the exact room category, dates and occupancy.', 'Confirm meals, taxes, extra-person charges and transfer costs in the quoted total.', 'Ask about pool access and views for the selected category; these vary between room types.'],
    relatedPlaces: ['kumarakom-backwaters', 'kumarakom-bird-sanctuary', 'vembanad-lake'],
    sources: [{ label: 'Kumarakom Lake Resort · property, room and dining overview', url: 'https://www.kumarakomlakeresort.in/' }, { label: 'Kumarakom Lake Resort · accommodation categories', url: 'https://www.kumarakomlakeresort.in/luxury-accommodation.php' }],
  },
  'brunton-boatyard': {
    summary: 'A CGH Earth waterfront hotel on a former Fort Kochi boatyard site, with harbour views and a heritage-inspired setting.',
    operator: 'CGH Earth', address: '1/498, Calvetty Road, Fort Kochi, Kerala 682001', districtSlug: 'ernakulam', setting: 'Fort Kochi waterfront / harbour',
    overview: [
      'Brunton Boatyard occupies a historic boatyard site on the Fort Kochi waterfront. The hotel’s architectural style and food draw on the area’s layered trading and colonial histories. It is a base for exploring the old town rather than an isolated beach resort.',
      'The operator lists both sea-facing and non-sea-facing accommodation. Select the view and category explicitly when requesting a quote. Harbour activity, heritage walks, dining and time by the waterfront pool give the stay a different rhythm from a conventional city hotel.',
    ],
    roomTypes: ['Sea-facing rooms', 'Sea-facing deluxe suites', 'Non-sea-facing rooms'],
    dining: [
      { title: 'History Restaurant', description: 'A menu shaped by the different cultural influences of Fort Kochi.' },
      { title: 'Armoury Restobar', description: 'The operator’s restaurant and bar option within the property.' },
      { title: 'Terrace and pier settings', description: 'Seafood and waterfront dining are listed; confirm which venues operate on your dates.' },
    ],
    facilities: ['Harbour-side swimming pool', 'Restaurants and tea lounge', 'Wi-Fi', 'Fitness centre', 'Ayurveda centre', 'Bicycles'],
    experiences: ['Cooking demonstrations', 'Sunset cruise, subject to arrangements', 'Fort Kochi heritage exploration', 'Mattancherry markets and galleries'],
    access: 'The property is on Calvetty Road in Fort Kochi. Arrange the transfer to Fort Kochi itself, rather than assuming that an arrival elsewhere in Ernakulam is the final stop.',
    bookingNotes: ['Specify sea-facing or non-sea-facing accommodation.', 'Confirm which activities are included in the selected rate and which are charged separately.', 'Request the full room total including meals, taxes and transfers for your dates.'],
    relatedPlaces: ['fort-kochi', 'mattancherry-palace', 'jewish-synagogue'],
    sources: [{ label: 'CGH Earth · Brunton Boatyard property overview', url: 'https://www.cghearth.com/brunton-boatyard' }, { label: 'CGH Earth · room categories and property facts', url: 'https://www.cghearth.com/brunton-boatyard/factsheet' }],
  },
  'spice-village-thekkady': {
    summary: 'A CGH Earth cottage retreat in Thekkady, with natural materials, spice-focused food and a setting close to Periyar.',
    operator: 'CGH Earth', address: 'Thekkady–Kumily Road, Thekkady, Idukki, Kerala 685509', districtSlug: 'idukki', setting: 'Thekkady highlands / Periyar region',
    overview: [
      'Spice Village is a cottage-based retreat in Thekkady. Its buildings draw on local materials and the dwellings of the region’s Mannan community, with elephant-grass thatch, shaded porches and naturally ventilated spaces rather than conventional air-conditioned rooms.',
      'The operator’s programme connects the stay with spices, food and the surrounding environment. A nature interpretation centre, property walks and cooking demonstrations provide ways to spend time on site. Excursions into Periyar are separate arrangements and remain subject to reserve permissions.',
    ],
    roomTypes: ['Spice Garden Cottage', 'Deluxe Cottage with Private Garden'],
    dining: [
      { title: 'Tamarind Restaurant', description: 'Kerala cuisine with an emphasis on the region’s spices.' },
      { title: '50 Mile Diet restaurant', description: 'The operator’s locally focused dining concept.' },
      { title: 'Wood House Lounge', description: 'A separate lounge setting listed by the property.' },
    ],
    facilities: ['Swimming pool', 'Nature interpretation centre', 'Yoga space', 'Ayurveda centre', 'Wi-Fi', 'Handmade-paper unit'],
    experiences: ['Naturalist-led property walks', 'Cooking demonstrations', 'Organic farm and ecological initiatives', 'Handmade-paper activities'],
    access: 'Plan a hill-road transfer to Thekkady and the property on Thekkady–Kumily Road. Allow time for the final road journey rather than relying on a straight-line distance.',
    bookingNotes: ['Confirm the cottage category and the natural-ventilation arrangement.', 'Ask which property activities operate on your dates and are included in the rate.', 'Book reserve activities through the appropriate operator; a hotel stay does not itself provide a Periyar permit.'],
    relatedPlaces: ['thekkady', 'chinnar-wildlife-sanctuary', 'idukki-arch-dam'],
    sources: [{ label: 'CGH Earth · Spice Village overview', url: 'https://www.cghearth.com/spice-village' }, { label: 'CGH Earth · facilities, dining and activities', url: 'https://www.cghearth.com/Spice-Village/factsheet' }, { label: 'CGH Earth · cottages and ventilation', url: 'https://www.cghearth.com/spice-village/services' }],
  },
  'wayanad-wild-homestay': {
    summary: 'A CGH Earth nature retreat near Lakkidi, with cottage-style rooms, naturalist-led activities and a final off-road approach.',
    operator: 'CGH Earth', address: 'Lakkidi P.O., Vythiri, Wayanad, Kerala 673576', districtSlug: 'wayanad', setting: 'Lakkidi hills / forest-edge landscape',
    overview: [
      'Wayanad Wild is a CGH Earth nature retreat in the Lakkidi area of Wayanad. The accommodation sits among wooded slopes, with balconies and windows directed towards the surrounding greenery. It is a resort-style forest lodge, rather than the family homestay suggested by an old archive name.',
      'Naturalist-led walks, birding and learning about the local environment are central to the operator’s offering. The final approach involves an arranged off-road transfer. This makes arrival planning important, particularly if your flight or road journey reaches the region late in the day.',
    ],
    roomTypes: ['Superior rooms or cottages', 'Deluxe rooms', 'Deluxe category with Jacuzzi — confirm availability'],
    dining: [
      { title: 'Kerala-focused meals', description: 'The property factsheet lists local Kerala cuisine.' },
      { title: 'Plan dietary needs', description: 'Discuss dietary requirements and the meal plan directly when requesting the room quote.' },
    ],
    facilities: ['Swimming pool', 'Nature interpretation centre', 'Wi-Fi', 'Balconies or forest-facing outlooks by category', 'Tea and coffee facilities'],
    experiences: ['Guided walks with a naturalist', 'Birdwatching', 'Nature photography and interpretation', 'Hiking arrangements, subject to programme'],
    access: 'Coordinate arrival at the designated Lakkidi parking/pickup point and the property’s final off-road transfer. Confirm current transfer windows directly before setting your arrival time.',
    bookingNotes: ['Confirm the exact room category, meal plan and final-transfer arrangements.', 'Ask about steps, slopes and room access if mobility is a concern.', 'Naturalist activities and wildlife sightings depend on conditions; confirm the programme rather than expecting a guaranteed sighting.'],
    relatedPlaces: ['lakkidi-viewpoint', 'pookode-lake', 'wayanad-wildlife-sanctuary'],
    sources: [{ label: 'CGH Earth · Wayanad Wild setting and approach', url: 'https://www.cghearth.com/wayanad-wild' }, { label: 'CGH Earth · facilities and activities', url: 'https://www.cghearth.com/wayanad-wild/factsheet' }, { label: 'CGH Earth · room categories and transfer guidance', url: 'https://www.cghearth.com/wayanad-wild/services' }],
  },
  'munnar-tea-county': {
    summary: 'KTDC’s hill resort in Munnar, with several room categories, a multi-cuisine restaurant and a base for exploring tea country.',
    operator: 'Kerala Tourism Development Corporation (KTDC)', address: 'Tea County, Munnar, Idukki, Kerala', districtSlug: 'idukki', setting: 'Munnar hill town / tea country',
    overview: [
      'Tea County is a KTDC hill resort in Munnar, set between hills in the town’s tea-growing landscape. Its location makes it a base for a slower stay in Munnar as well as for separately arranged visits to the wider high ranges.',
      'The operator lists several room categories, a multi-cuisine restaurant, indoor games and wellness facilities. These are property facilities, not promises that excursions or treatments are included in every rate. Choose the accommodation category first and check the actual inclusions for your dates.',
    ],
    roomTypes: ['Avenue', 'Executive', 'Premium', 'Royal Premium', 'Superior', 'Royal Suite'],
    dining: [
      { title: 'Multi-cuisine restaurant', description: 'The operator’s main dining facility at the resort.' },
      { title: 'Meal plan matters', description: 'Ask whether breakfast and other meals are included or charged separately in your room rate.' },
    ],
    facilities: ['Multi-cuisine restaurant', 'Health club', 'Indoor games', 'Ayurveda facilities', 'Conference spaces', 'Laundry and car-hire arrangements'],
    experiences: ['Exploring Munnar town', 'Separately arranged tea-country visits', 'Day-tour arrangements through the property, subject to availability'],
    access: 'Arrange the final road transfer to Tea County in Munnar. Hill-road journeys need a realistic travel allowance, especially when connecting with flights or trains.',
    bookingNotes: ['KTDC’s 2026–27 tariff page lists check-in at 13:00 and checkout at 11:00; reconfirm with the reservation.', 'Ask for the category-specific rate, taxes, meal inclusions and any festive supplements.', 'Confirm excursion arrangements and their charges separately from the room reservation.'],
    relatedPlaces: ['munnar', 'tea-gardens-munnar', 'eravikulam-national-park'],
    sources: [{ label: 'KTDC · Tea County overview', url: 'https://www.ktdc.com/tea-county/' }, { label: 'KTDC · current room categories and facilities', url: 'https://www.ktdc.com/tea-county/facilities' }, { label: 'KTDC · 2026–27 tariff and check-in reference', url: 'https://www.ktdc.com/tea_county/tariff' }],
  },
};

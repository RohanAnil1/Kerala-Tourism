import { verifiedCover } from './media';
import captions from './photo-captions.json';

type ContextSelection = { sourceKey: string; subject: string; label: string };
const area = (sourceKey: string, subject: string): ContextSelection => ({
  sourceKey, subject, label: 'Area context — not this attraction',
});

// Context images are deliberately separate from verified subject photographs.
// They must never become gallery evidence or imply a verified location/pin.
export const contextSelections: Record<string, ContextSelection> = {
  'destinations/chavara-theertham': area('destinations/munroe-island', 'Munroe Island, Kollam district'),
  'destinations/kumbazha-forest': area('destinations/aranmula-parthasarathy-temple', 'Aranmula, Pathanamthitta district'),
  'destinations/seethathodu-dam': area('destinations/gavi-eco-tourism', 'Gavi, Pathanamthitta district'),
  'destinations/pala-hills': area('destinations/kumarakom-backwaters', 'Kumarakom, Kottayam district'),
  'destinations/keezharkuthu-waterfalls': area('destinations/idukki-arch-dam', 'Idukki Dam, Idukki district'),
  'destinations/elathur-mangroves': area('destinations/kozhikode-beach', 'Kozhikode Beach, Kozhikode district'),
  'destinations/lions-park-kozhikode': area('destinations/kozhikode-beach', 'Kozhikode Beach, Kozhikode district'),
  'destinations/chethalayam-waterfalls': area('destinations/edakkal-caves', 'Edakkal Caves, Wayanad district'),
  'destinations/valmeekam': area('destinations/edakkal-caves', 'Edakkal Caves, Wayanad district'),
  'destinations/payyamballi-beach': area('destinations/muzhappilangad-beach', 'Muzhappilangad Beach, Kannur district'),
  'destinations/mallam-hills': area('destinations/bekal-fort', 'Bekal Fort, Kasaragod district'),
  'destinations/kanhiradukkam-forest': area('destinations/bekal-fort', 'Bekal Fort, Kasaragod district'),
  'destinations/oliyara-falls': area('destinations/bekal-fort', 'Bekal Fort, Kasaragod district'),
  'experiences/marari-beach-yoga': { sourceKey: 'destinations/marari-beach', subject: 'Marari Beach, Alappuzha', label: 'Location context — yoga activity not shown' },
  'experiences/ayurveda-panchakarma': { sourceKey: 'context/elephant-pass-ayurveda', subject: 'Elephant Pass Ayurveda retreat grounds, Kerala', label: 'Retreat context — treatment and package not shown' },
  'experiences/wayanad-wildlife-jeep-safari': { sourceKey: 'destinations/wayanad-wildlife-sanctuary', subject: 'Wayanad Wildlife Sanctuary', label: 'Location context — safari activity not shown' },
  'stays/spice-village-thekkady': { sourceKey: 'destinations/thekkady', subject: 'Periyar landscape near Thekkady', label: 'Area context — not this property' },
  'stays/wayanad-wild-homestay': { sourceKey: 'destinations/lakkidi-viewpoint', subject: 'Lakkidi, Wayanad district', label: 'Area context — not this property' },
  'events/f18': { sourceKey: 'destinations/padmanabhaswamy-temple', subject: 'Sree Padmanabhaswamy Temple, Thiruvananthapuram', label: 'Area context — concert venue and performance not shown' },
  'events/f12': { sourceKey: 'destinations/alappuzha-backwaters', subject: 'Alappuzha backwaters', label: 'Area context — Champakulam race not shown' },
  'events/f3': { sourceKey: 'events/f3', subject: 'Mountains around Sabarimala', label: 'Location context — Makaravilakku ritual not shown' },
  'events/f5': { sourceKey: 'events/f5', subject: 'Parumala Church', label: 'Venue context — Perunnal celebration not shown' },
  'events/f6': { sourceKey: 'events/f6', subject: 'Sree Padmanabhaswamy Temple', label: 'Venue context — Arattu procession not shown' },
  'events/f8': { sourceKey: 'events/f8', subject: 'Ikkare Kottiyoor Temple', label: 'Venue context — Utsavam opening not shown' },
  'events/f20': { sourceKey: 'events/f20', subject: 'Mountains around Sabarimala', label: 'Location context — pilgrimage opening not shown' },
};

export function photoContext(key?: string) {
  const selection = key ? contextSelections[key] : undefined;
  if (!selection) return undefined;
  const src = verifiedCover(selection.sourceKey);
  if (!src) return undefined;
  const caption = (captions as Record<string, { alt?: string }>)[src];
  return { ...selection, src, alt: `${caption?.alt || selection.subject}. ${selection.label}.`, caption: `${selection.label}. Pictured: ${selection.subject}.` };
}

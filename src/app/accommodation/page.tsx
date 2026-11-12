import Discovery from '@/components/editorial/Discovery';
import { accommodations } from '@/data/accommodations';

export const dynamic = 'force-dynamic';

export default function AccommodationPage() {
  return <Discovery title="Stay a little longer." label="PLACES TO MAKE YOURSELF AT HOME" description="A lakeside retreat, a heritage hotel, or a forest escape. Read about the rooms, food and setting before choosing your base." items={accommodations.map(stay => ({ id: stay.id, href: `/accommodation/${stay.slug}`, title: stay.name, description: stay.description, image: stay.images[0], photoSubject: `stays/${stay.slug}`, label: `${stay.type} / ${stay.location}`, facts: [stay.priceRange, stay.amenities.slice(0,3).join(' · ')], search: `${stay.name} ${stay.location} ${stay.description}`, filters: { type: stay.type, district: stay.district }, featured: stay.featured }))} filters={[{ key: 'type', label: 'Stays', options: ['hotel','homestay','houseboat','resort','hostel'].map(value => ({ value, label: value.charAt(0).toUpperCase()+value.slice(1) })) }, { key: 'district', label: 'Districts', options: Array.from(new Set(accommodations.map(stay => stay.district))).map(value => ({ value, label: value })) }]} footer="Independent property guides, not booking offers. Photographs identify the property unless clearly labelled as area context. Room rates and availability are not live; each guide includes the operator references and details to confirm."/>;
}

import Home from '@/components/editorial/Home';
import { destinations, districts } from '@/data/destinations';

export default function HomePage() {
  const placesByDistrict = Object.fromEntries(districts.map(district => [district.slug, destinations.filter(place => place.districtSlug === district.slug).slice(0, 3).map(({ name, slug }) => ({ name, slug }))]));
  return <Home geography={{ districts, placesByDistrict }}/>;
}

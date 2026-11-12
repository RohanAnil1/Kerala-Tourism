import Discovery from '@/components/editorial/Discovery';
import DistrictIndex from '@/components/editorial/DistrictIndex';
import { destinations, districts } from '@/data/destinations';

export default function DestinationsPage({ searchParams = {} }: {
  searchParams?: { district?: string; type?: string; q?: string; sort?: string };
}) {
  const selected = districts.find(district => district.slug === searchParams.district);
  // Existing landscape/search shortcuts still open their URL-backed results.
  // The main destination entry point starts with the district collection.
  if (!selected && (searchParams.district || (!searchParams.type && !searchParams.q))) {
    const counts = Object.fromEntries(districts.map(district => [district.slug, destinations.filter(place => place.districtSlug === district.slug).length]));
    return <DistrictIndex districts={districts} counts={counts} invalidDistrict={!!searchParams.district} />;
  }
  return <Discovery
    title={selected ? `Discover ${selected.name}.` : 'Follow your curiosity.'}
    label={selected ? `DESTINATIONS / ${selected.name.toUpperCase()}` : 'THE KERALA COLLECTION / DESTINATIONS'}
    description={selected ? selected.description : 'Waterways, mountain trails, quiet shores, and streets full of stories. Find the Kerala that feels like you.'}
    backLink={{ href: '/destinations', label: 'All districts' }}
    baseFilters={selected ? { district: selected.slug } : undefined}
    items={destinations.map(place => ({
      id: place.id,
      title: place.name,
      description: place.locationReview?.status === 'unverified' ? place.locationReview.note : place.description,
      status: place.locationReview?.status === 'unverified' ? 'Location unverified' : undefined,
      image: place.images[0],
      photoSubject: `destinations/${place.slug}`,
      href: `/destinations/${place.slug}`,
      label: `${place.district} / ${place.type.join(' · ')}`,
      facts: place.locationReview?.status === 'unverified' ? ['Location review in progress'] : [place.bestTimeToVisit, place.budgetRange],
      search: `${place.name} ${place.district} ${place.description}`,
      filters: { district: place.districtSlug, type: place.type },
      featured: ['munnar', 'alappuzha-backwaters', 'fort-kochi', 'varkala-beach', 'athirappilly-waterfalls'].includes(place.slug),
    }))}
    filters={[
      { key: 'type', label: 'Landscapes', options: [{ value: 'backwater', label: 'Backwaters' }, { value: 'hill', label: 'Hills' }, { value: 'beach', label: 'Coast' }, { value: 'heritage', label: 'Heritage & culture' }, { value: 'wildlife', label: 'Wildlife' }, { value: 'nature', label: 'Nature' }, { value: 'spiritual', label: 'Spiritual' }, { value: 'urban', label: 'Cities' }] },
      { key: 'district', label: 'Districts', options: districts.map(district => ({ value: district.slug, label: district.name })) },
    ]}
    footer="Visitor information is a planning reference. Confirm access, opening hours, fees, and local conditions before travelling."
  />;
}

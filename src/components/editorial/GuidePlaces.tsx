import Link from 'next/link';
import { destinations } from '@/data/destinations';
import { Photo, SectionHeading } from './Primitives';

export default function GuidePlaces({ slugs, title = 'Explore the region.' }: { slugs: string[]; title?: string }) {
  const places = slugs.map(slug => destinations.find(place => place.slug === slug)).filter((place): place is (typeof destinations)[number] => !!place && place.locationReview?.status !== 'unverified');
  if (!places.length) return null;
  return <section className="wrap guide-related"><SectionHeading label="KEEP YOUR CURIOSITY CLOSE" title={title} /><div className="story-grid">{places.map(place => <Link href={`/destinations/${place.slug}`} className="story-card" key={place.slug}><Photo src={place.images[0]} subjectKey={`destinations/${place.slug}`} alt={place.name} className="story-photo" /><p className="eyebrow">{place.district}</p><h3>{place.name}</h3><p>{place.description}</p></Link>)}</div></section>;
}

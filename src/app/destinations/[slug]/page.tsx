import { travelBases, GUIDE_CHECKED_AT } from '@/data/travel-guide';
import type { Metadata } from 'next';
import { getDestinationReferences } from '@/data/catalog-guides';
import { photoContext } from '@/data/photo-context';
import GuideSources from '@/components/editorial/GuideSources';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getDestinationBySlug, destinations } from '@/data/destinations';
import { experiences } from '@/data/experiences';
import DetailHero from '@/components/editorial/DetailHero';
import Gallery from '@/components/editorial/Gallery';
import LocationMap from '@/components/editorial/LocationMap';
import { Photo, Eyebrow, SectionHeading, TextLink } from '@/components/editorial/Primitives';

export const generateStaticParams = () => destinations.map(place => ({ slug: place.slug }));
export const dynamicParams = false;

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const place = getDestinationBySlug(params.slug);
  if (!place) notFound();
  const unverified = place.locationReview?.status === 'unverified';
  return { title: `${place.name}${unverified ? ' — location unverified' : ''} | Kerala Field Guide`, description: unverified ? place.locationReview?.note : place.description };
}

export default function DestinationDetailPage({ params }: { params: { slug: string } }) {
  const place = getDestinationBySlug(params.slug);
  if (!place) notFound();
  const review = place.locationReview;
  const unverified = review?.status === 'unverified';
  const source=travelBases.find(base=>base.href===`/destinations/${place.slug}`);
  const references = getDestinationReferences(place.slug);
  const sources = source ? [{ label: 'Visitor planning reference', url: source.booking || source.source }, ...references.filter(item => item.url !== (source.booking || source.source))] : references;
  const nearby = destinations.filter(item => item.districtSlug === place.districtSlug && item.slug !== place.slug && item.locationReview?.status !== 'unverified').slice(0, 3);
  const related = experiences.filter(item => item.location.toLowerCase().includes(place.district.toLowerCase()) || place.type.includes(item.category as typeof place.type[number])).slice(0, 3);
  return <>
    <DetailHero title={place.name} label={`${place.district} / ${unverified ? 'Location unverified' : place.type.join(' · ')}`} description={unverified ? 'This location has not yet been verified. Read the location review before planning a visit.' : place.description} image={place.images[0]} photoSubject={`destinations/${place.slug}`} backHref={`/destinations?district=${place.districtSlug}`} backLabel={`Discover ${place.district}`}/>
    {review && <section className="location-review wrap" aria-label="Location verification"><div><Eyebrow>{unverified ? 'LOCATION UNVERIFIED' : 'LOCATION REFERENCE CHECKED'}</Eyebrow><p>{review.note}</p><ul>{review.references.map(ref => <li key={ref.url}><a href={ref.url} target="_blank" rel="noreferrer">{ref.title} ↗</a></li>)}</ul><small>Reviewed {review.checkedAt}</small></div></section>}
    <nav className="detail-tabs wrap" aria-label="On this page"><a href="#story">The place</a><a href="#gallery">Photographs</a><a href="#visit">Your visit</a><a href="#location">Location</a><a href="#sources">References</a><a href="#nearby">Stay curious</a></nav>
    <div className="detail-layout wrap"><div>
      <section className="detail-section" id="story"><Eyebrow>GET TO KNOW THE PLACE</Eyebrow><h2>A little closer to {place.name}.</h2>{unverified ? <><p>{review.note}</p><p>This archive entry is retained while its identity and location are checked. The labelled area photograph does not identify this attraction. Directions and a precise pin are withheld.</p><details className="archive-description"><summary>Read the unverified archive description</summary><p>{place.longDescription}</p>{place.history && <p>{place.history}</p>}</details></> : <><p>{place.longDescription}</p>{place.history && <><h3 className="mt-8 mb-4">A story in the landscape.</h3><p>{place.history}</p></>}</>}</section>
      <section className="detail-section" id="gallery"><h2>Through a different lens.</h2><Gallery images={Array.from(new Set(place.images))} name={place.name} photoSubject={`destinations/${place.slug}`}/>{place.images.length > 0 && !photoContext(`destinations/${place.slug}`) && <p className="photo-caption">Subject-matched photographs. Source and licence information is available in the image credits.</p>}</section>
      <section className="detail-section" id="visit"><h2>Make the most of your visit.</h2>{unverified ? <p>Directions, access advice and a precise map pin will be published after the location is confirmed.</p> : <><ul>{place.highlights.map(item => <li key={item}>{item}</li>)}</ul><h3 className="mt-8 mb-4">Getting here.</h3>{Object.entries(place.howToReach).map(([mode, info]) => <div className="fact-row" key={mode}><Eyebrow>BY {mode}</Eyebrow><p>{info}</p></div>)}<h3 className="mt-8 mb-4">A few things to know.</h3><ul>{place.travelTips.map(item => <li key={item}>{item}</li>)}</ul></>}</section>
      <section className="detail-section" id="location"><h2>Find your bearings.</h2>{place.coordinates ? <><p className="planner-note">Use this map for orientation. Confirm the public entrance and permitted access before setting out.</p><LocationMap name={place.name} lat={place.coordinates.lat} lng={place.coordinates.lng}/></> : <p>{unverified ? 'Location unverified. A map pin is withheld until this place can be identified.' : 'The place is documented, but its precise public entrance is not yet verified. Use the location references and confirm access locally.'}</p>}</section>
      <GuideSources sources={sources} reviewedAt={null} description={unverified ? 'These are related or district-background references, not confirmation of this attraction. The location review above explains what remains unresolved.' : 'Background, photographic-identity and visitor references are distinguished below. This planning summary is not a live notice of opening hours, fees or access; confirm those with the venue. Historical and regional background may use archive references.'} />
    </div><aside className="detail-sidebar"><h3>Your visit, at a glance.</h3><dl>{(unverified ? [['District in archive', place.district], ['Location', 'Unverified']] : [['District',place.district],['Best time',place.bestTimeToVisit],['Opening hours',place.timings],['Entry',place.entryFee],['Budget',place.budgetRange]]).map(([label,value]) => <div className="fact-row" key={label}><dt>{label}</dt><dd>{value}</dd></div>)}</dl><TextLink href="/trip-planner">Find a journey</TextLink><p className="planner-note mt-5">Planning reference only. Confirm current access, hours, and fees before your visit.</p>{source&&<p className="planner-note mt-5"><a className="text-link" href={source.booking||source.source} target="_blank" rel="noreferrer">Current visitor information ↗</a><br/>Reference checked {GUIDE_CHECKED_AT}.</p>}</aside></div>
    <section id="nearby" className="wrap pb-24"><SectionHeading label="KEEP EXPLORING" title={`More of ${place.district}.`}/><div className="story-grid">{nearby.map(item => <Link key={item.slug} href={`/destinations/${item.slug}`} className="story-card"><Photo src={item.images[0]} subjectKey={`destinations/${item.slug}`} alt={item.name} className="story-photo"/><h3>{item.name}</h3><p>{item.description}</p></Link>)}</div>{related.length > 0 && <><h3 className="mt-16 mb-8">Make a moment of it.</h3><div className="story-grid">{related.map(item => <Link key={item.slug} href={`/experiences/${item.slug}`} className="story-card"><Photo src={item.images[0]} subjectKey={`experiences/${item.slug}`} alt={item.title} className="story-photo"/><h3>{item.title}</h3><p>{item.duration} · {item.location}</p></Link>)}</div></>}</section>
  </>;
}

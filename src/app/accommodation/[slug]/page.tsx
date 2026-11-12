import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { accommodations, getAccommodationBySlug } from '@/data/accommodations';
import { GUIDE_REVIEWED_AT } from '@/data/guide-types';
import DetailHero from '@/components/editorial/DetailHero';
import Gallery from '@/components/editorial/Gallery';
import GuideSources from '@/components/editorial/GuideSources';
import GuidePlaces from '@/components/editorial/GuidePlaces';
import { Eyebrow, TextLink } from '@/components/editorial/Primitives';

export const generateStaticParams = () => accommodations.map(stay => ({ slug: stay.slug }));
export const dynamicParams = false;

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const stay = getAccommodationBySlug(params.slug);
  if (!stay) notFound();
  return { title: `${stay.name} | Kerala Field Guide`, description: stay.description };
}

export default function StayDetailPage({ params }: { params: { slug: string } }) {
  const stay = getAccommodationBySlug(params.slug);
  if (!stay) notFound();
  const guide = stay.guide;
  return (
    <>
      <DetailHero title={stay.name} label={`${stay.location} / ${stay.type}`} description={guide.summary} image={stay.images[0]} photoSubject={`stays/${stay.slug}`} backHref="/accommodation" backLabel="All stays" />
      <nav className="detail-tabs wrap" aria-label="On this page"><a href="#the-stay">The stay</a><a href="#rooms">Rooms & dining</a><a href="#arrange-your-stay">Plan your stay</a><a href="#photographs">Photographs</a><a href="#sources">Sources</a></nav>
      <div className="detail-layout wrap">
        <div>
          <section id="the-stay" className="detail-section"><Eyebrow>A BASE THAT BECOMES PART OF THE JOURNEY</Eyebrow><h2>Settle into the setting.</h2>{guide.overview.map(paragraph => <p key={paragraph}>{paragraph}</p>)}</section>
          <section id="rooms" className="detail-section"><h2>Rooms, tables & time to yourself.</h2><h3>Accommodation choices.</h3><ul className="guide-room-types">{guide.roomTypes.map(room => <li key={room}>{room}</li>)}</ul><p className="planner-note">Category names are published by the operator. Confirm the exact room, view and inclusions in your quote.</p><div className="guide-highlights">{guide.dining.map((item, index) => <article key={item.title}><span aria-hidden="true">{String(index + 1).padStart(2, '0')}</span><div><h3>{item.title}</h3><p>{item.description}</p></div></article>)}</div><h3>Property facilities.</h3><ul className="guide-facilities">{guide.facilities.map(item => <li key={item}>{item}</li>)}</ul><h3>Ways to spend your time.</h3><ul>{guide.experiences.map(item => <li key={item}>{item}</li>)}</ul></section>
          <section id="arrange-your-stay" className="detail-section"><h2>Make the arrival easy.</h2><div className="guide-information"><Eyebrow>THE ADDRESS</Eyebrow><h3>{guide.address}</h3><p>{guide.access}</p></div><h3>Before confirming a room.</h3><ul>{guide.bookingNotes.map(note => <li key={note}>{note}</li>)}</ul><p className="planner-note">This is an independent property guide. Rates and availability are not live, and no reservation is made on this website.</p></section>
          <section id="photographs" className="detail-section"><h2>A closer look.</h2><Gallery images={stay.images} name={stay.name} photoSubject={`stays/${stay.slug}`} /></section>
          <GuideSources sources={guide.sources} />
        </div>
        <aside className="detail-sidebar"><Eyebrow>YOUR STAY NOTES</Eyebrow><h3>A place to pause.</h3><dl>{[['Location', guide.address], ['Setting', guide.setting], ['Operator', guide.operator], ['Stay type', stay.type], ['Price basis', 'Request a dated quote for the selected room, occupancy and meal plan']].map(([label, value]) => <div className="fact-row" key={label}><dt>{label}</dt><dd>{value}</dd></div>)}</dl><TextLink href="/trip-planner">Plan around this stay</TextLink><TextLink href={`/destinations?district=${guide.districtSlug}`}>Explore the district</TextLink><p className="planner-note">Property sources reviewed {GUIDE_REVIEWED_AT}. Confirm room availability, facilities and final terms directly with the operator.</p></aside>
      </div>
      <GuidePlaces slugs={guide.relatedPlaces} />
    </>
  );
}

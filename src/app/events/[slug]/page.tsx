import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { festivalEvents, getFestivalBySlug } from '@/data/festivals';
import { GUIDE_REVIEWED_AT } from '@/data/guide-types';
import DetailHero from '@/components/editorial/DetailHero';
import Gallery from '@/components/editorial/Gallery';
import GuideSources from '@/components/editorial/GuideSources';
import GuidePlaces from '@/components/editorial/GuidePlaces';
import { Eyebrow, Photo, SectionHeading, TextLink } from '@/components/editorial/Primitives';

export const generateStaticParams = () => festivalEvents.map(event => ({ slug: event.slug }));
export const dynamicParams = false;

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const event = getFestivalBySlug(params.slug);
  if (!event) notFound();
  return { title: `${event.name} | Kerala Field Guide`, description: event.summary };
}

export default function FestivalDetailPage({ params }: { params: { slug: string } }) {
  const event = getFestivalBySlug(params.slug);
  if (!event) notFound();
  const guide = event.guide;
  const related = festivalEvents.filter(item => item.id !== event.id && (item.district === event.district || item.category === event.category)).slice(0, 3);
  return (
    <>
      <DetailHero title={event.name} label={`${event.district} / FESTIVALS & GATHERINGS`} description={event.summary} image={event.image} photoSubject={`events/${event.id}`} backHref="/events" backLabel="All festivals" />
      <nav className="detail-tabs wrap" aria-label="On this page"><a href="#tradition">The tradition</a><a href="#highlights">What to experience</a><a href="#plan-your-visit">Plan your visit</a><a href="#photographs">Photographs</a><a href="#sources">Sources</a></nav>
      <div className="detail-layout wrap">
        <div>
          <section id="tradition" className="detail-section">
            <Eyebrow>A PLACE, A COMMUNITY, AN OCCASION</Eyebrow>
            <h2>The story behind the gathering.</h2>
            {guide.overview.map(paragraph => <p key={paragraph}>{paragraph}</p>)}
          </section>
          <section id="highlights" className="detail-section">
            <h2>What to experience.</h2>
            <div className="guide-highlights">{guide.highlights.map((item, index) => <article key={item.title}><span aria-hidden="true">{String(index + 1).padStart(2, '0')}</span><div><h3>{item.title}</h3><p>{item.description}</p></div></article>)}</div>
          </section>
          <section id="plan-your-visit" className="detail-section">
            <h2>Plan around the occasion.</h2>
            <div className="guide-information"><Eyebrow>WHEN & WHERE</Eyebrow><h3>{guide.venue}</h3><p>{guide.season}</p><p>{guide.scheduleNote}</p></div>
            {guide.lastEdition && <aside className="guide-edition" aria-label="Past edition reference"><Eyebrow>{guide.lastEdition.label}</Eyebrow><h3>{guide.lastEdition.dates}</h3><p>{guide.lastEdition.note}</p></aside>}
            <h3>Getting there.</h3><p>{guide.gettingThere}</p>
            <h3>Be a thoughtful guest.</h3><ul>{guide.visitTips.map(tip => <li key={tip}>{tip}</li>)}</ul>
          </section>
          <section id="photographs" className="detail-section"><h2>A glimpse of the occasion.</h2><Gallery images={event.image ? [event.image] : []} name={event.name} photoSubject={`events/${event.id}`} /></section>
          <GuideSources sources={guide.sources} />
        </div>
        <aside className="detail-sidebar">
          <Eyebrow>YOUR FESTIVAL NOTES</Eyebrow><h3>A little planning.</h3>
          <dl>{[['Place', guide.venue], ['Season', guide.season], ['Time to allow', guide.timeToAllow], ['Admission', guide.admission]].map(([label, value]) => <div className="fact-row" key={label}><dt>{label}</dt><dd>{value}</dd></div>)}</dl>
          <TextLink href="/trip-planner">Plan your Kerala journey</TextLink>
          {guide.districtSlug && <TextLink href={`/destinations?district=${guide.districtSlug}`}>Explore this district</TextLink>}
          <p className="planner-note">Seasonal guide, not a confirmed future-year schedule. Sources reviewed {GUIDE_REVIEWED_AT}.</p>
        </aside>
      </div>
      <GuidePlaces slugs={guide.relatedPlaces} />
      {related.length > 0 && <section className="wrap guide-related"><SectionHeading label="ANOTHER TIME, ANOTHER PLACE" title="More reasons to gather." /><div className="story-grid">{related.map(item => <Link href={`/events/${item.slug}`} key={item.id} className="story-card"><Photo src={item.image} subjectKey={`events/${item.id}`} alt={item.name} className="story-photo" /><p className="eyebrow">{item.dateLabel}</p><h3>{item.name}</h3><p>{item.summary}</p></Link>)}</div></section>}
    </>
  );
}

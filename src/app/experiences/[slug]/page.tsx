import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { experiences, getExperienceBySlug } from '@/data/experiences';
import DetailHero from '@/components/editorial/DetailHero';
import Gallery from '@/components/editorial/Gallery';
import GuideSources from '@/components/editorial/GuideSources';
import GuidePlaces from '@/components/editorial/GuidePlaces';
import { Eyebrow, TextLink } from '@/components/editorial/Primitives';

export const generateStaticParams = () => experiences.map(item => ({ slug: item.slug }));
export const dynamicParams = false;

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const item = getExperienceBySlug(params.slug);
  if (!item) notFound();
  return { title: `${item.title} | Kerala Field Guide`, description: item.description };
}

export default function ExperienceDetailPage({ params }: { params: { slug: string } }) {
  const experience = getExperienceBySlug(params.slug);
  if (!experience) notFound();
  const guide = experience.guide;
  return <>
    <DetailHero title={experience.title} label={`${experience.category} / ${experience.location}`} description={guide.summary} image={experience.images[0]} photoSubject={`experiences/${experience.slug}`} backHref={`/experiences?category=${experience.category}`} backLabel="Explore experiences" />
    <nav className="detail-tabs wrap" aria-label="On this page"><a href="#experience">The experience</a><a href="#shape-your-day">Shape your day</a><a href="#practical">Good to know</a><a href="#gallery">Photographs</a><a href="#sources">Sources</a></nav>
    <div className="detail-layout wrap"><div>
      <section id="experience" className="detail-section"><Eyebrow>BE PART OF THE PLACE</Eyebrow><h2>A moment worth making.</h2>{guide.overview.map(paragraph => <p key={paragraph}>{paragraph}</p>)}<h3>What makes it special.</h3><ul>{guide.highlights.map(item => <li key={item}>{item}</li>)}</ul></section>
      <section id="shape-your-day" className="detail-section"><h2>Give the day a shape.</h2><p className="planner-note">A suggested approach, adapted to your provider and the day’s conditions.</p><div className="guide-highlights">{guide.stages.map((stage, index) => <article key={stage.title}><span aria-hidden="true">{String(index + 1).padStart(2, '0')}</span><div><h3>{stage.title}</h3><p>{stage.description}</p></div></article>)}</div></section>
      <section id="practical" className="detail-section"><h2>Before you go.</h2><div className="guide-information"><Eyebrow>ARRANGE IT WITH CARE</Eyebrow><p>This is an experience guide. No activity, ticket, transfer, room or meal is booked by reading this page.</p></div><h3>Confirm with your provider.</h3><ul>{guide.arrangements.map(item => <li key={item}>{item}</li>)}</ul><h3 className="mt-8 mb-4">Travel thoughtfully.</h3><ul>{guide.visitingNotes.map(item => <li key={item}>{item}</li>)}</ul>{guide.relatedFestival && <TextLink href={`/events/${guide.relatedFestival}`}>Read the festival guide</TextLink>}</section>
      <section id="gallery" className="detail-section"><h2>A sense of the setting.</h2><Gallery images={Array.from(new Set(experience.images))} name={experience.title} photoSubject={`experiences/${experience.slug}`} /></section>
      <GuideSources sources={guide.sources} description="Original planning notes based on the references below. Confirm the actual programme, permissions and inclusions with the provider; these are not live booking offers." />
    </div><aside className="detail-sidebar"><Eyebrow>YOUR EXPERIENCE NOTES</Eyebrow><h3>A little planning.</h3><dl>{[['Location', experience.location], ['Time to allow', guide.duration], ['Price basis', experience.costEstimate], ['Activity level', experience.difficulty], ['Season & access', guide.season]].map(([label, value]) => <div className="fact-row" key={label}><dt>{label}</dt><dd>{value}</dd></div>)}</dl><TextLink href="/trip-planner">Plan your Kerala journey</TextLink><TextLink href={`/experiences?category=${experience.category}`}>More {experience.category} ideas</TextLink></aside></div>
    <GuidePlaces slugs={guide.relatedPlaces} />
  </>;
}

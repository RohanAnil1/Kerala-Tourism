import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { allDishes, getDishBySlug } from '@/data/gods-own-flavours';
import { districts } from '@/data/destinations';
import { getDishGuide } from '@/data/catalog-guides';
import DetailHero from '@/components/editorial/DetailHero';
import Gallery from '@/components/editorial/Gallery';
import GuideSources from '@/components/editorial/GuideSources';
import { Eyebrow, Photo, SectionHeading, TextLink } from '@/components/editorial/Primitives';

export const generateStaticParams = () => allDishes.map(dish => ({ slug: dish.slug }));
export const dynamicParams = false;

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const dish = getDishBySlug(params.slug);
  if (!dish) notFound();
  return { title: `${dish.name} | Kerala Field Guide`, description: dish.description };
}

export default function DishDetailPage({ params }: { params: { slug: string } }) {
  const dish = getDishBySlug(params.slug);
  if (!dish) notFound();
  const guide = getDishGuide(dish);
  const related = allDishes.filter(item => item.slug !== dish.slug && item.category === dish.category).sort((a, b) => Number(b.dishType === dish.dishType) - Number(a.dishType === dish.dishType)).slice(0, 3);
  const regions = districts.filter(district => dish.popularIn.some(region => region.toLowerCase() === district.name.toLowerCase())).slice(0, 3);
  return <>
    <DetailHero title={dish.name} label={`${dish.category === 'veg' ? 'Vegetarian' : 'Non-vegetarian'} / ${dish.origin}`} description={`${dish.malayalamName} · ${dish.description}`} image={dish.image} photoSubject={`dishes/${dish.slug}`} backHref="/gods-own-flavours" backLabel="At the Kerala table" />
    <nav className="detail-tabs wrap" aria-label="On this page"><a href="#dish-story">The dish</a><a href="#ingredients">Ingredients</a><a href="#preparation">Preparation</a><a href="#at-the-table">At the table</a><a href="#dish-gallery">Photographs</a><a href="#sources">References</a></nav>
    <div className="detail-layout wrap"><div>
      <section id="dish-story" className="detail-section"><Eyebrow>KERALA, THROUGH ITS KITCHENS</Eyebrow><h2>A little taste of Kerala.</h2><p>{dish.longDescription}</p><p>{guide.kitchenNote}</p><h3>The character of the dish.</h3><ul className="guide-facilities">{dish.taste.map(taste => <li key={taste}>{taste}</li>)}</ul></section>
      <section id="ingredients" className="detail-section"><h2>From the kitchen.</h2><ul className="guide-room-types">{dish.ingredients.map(item => <li key={item}>{item}</li>)}</ul><div className="guide-information"><Eyebrow>ASK THE COOK</Eyebrow><p>These are typical ingredients, not a complete allergen declaration. Tell your host about allergies or dietary needs and check the actual ingredients, cooking fat and shared preparation equipment.</p></div></section>
      <section id="preparation" className="detail-section"><h2>Made with care.</h2><p>{dish.cookingMethod}</p><p className="planner-note">A preparation overview, not a measured recipe. Timing, quantities and techniques vary between kitchens. References may describe a named regional variation, which is identified in the link label.</p></section>
      <section id="at-the-table" className="detail-section"><h2>A place at the table.</h2><h3>How it is served.</h3><p>{dish.servingStyle}</p><h3>Finding a kitchen.</h3><p>{guide.whereToLook}</p><p>Confirm the day’s availability, ingredients and portion directly. No restaurant listing here promises a current menu or a reservation.</p>{regions.length > 0 && <div className="guide-region-links"><Eyebrow>EXPLORE ITS REGIONAL SETTING</Eyebrow>{regions.map(region => <TextLink key={region.slug} href={`/destinations?district=${region.slug}`}>Explore {region.name}</TextLink>)}</div>}</section>
      <section id="dish-gallery" className="detail-section"><h2>Worth a second look.</h2><Gallery name={dish.name} photoSubject={`dishes/${dish.slug}`} images={Array.from(new Set([dish.image, ...dish.gallery]))} /></section>
      <GuideSources sources={guide.sources} description="Culinary background and preparation references are listed below. Related variants are labelled; no one recipe fixes how every Kerala kitchen prepares this dish. Photographs have their own source and licence credits." />
    </div><aside className="detail-sidebar"><Eyebrow>YOUR FOOD NOTES</Eyebrow><h3>In the kitchen.</h3><dl>{[['Regional association', dish.origin], ['Prep outline', dish.prepTime], ['Cooking outline', dish.cookTime], ['Example serving', dish.serves], ['Spice guide', dish.spiceLevel], ['Season', dish.bestSeasonToTry]].map(([label, value]) => <div className="fact-row" key={label}><dt>{label}</dt><dd>{value}</dd></div>)}</dl><p className="planner-note">Times and serving sizes describe the recipe outline, not restaurant waiting times. Spice levels are a guide; ask the kitchen.</p><TextLink href={`/gods-own-flavours?diet=${dish.category}`}>More {dish.category === 'veg' ? 'vegetarian' : 'non-vegetarian'} flavours</TextLink><TextLink href="/trip-planner">Plan a food-minded journey</TextLink></aside></div>
    <section className="wrap guide-related"><SectionHeading label="KEEP A LITTLE APPETITE" title="Something else to taste." /><div className="story-grid">{related.map(item => <Link key={item.slug} href={`/gods-own-flavours/${item.slug}`} className="story-card"><Photo src={item.image} subjectKey={`dishes/${item.slug}`} alt={item.name} className="story-photo" /><p className="eyebrow">{item.dishType.replace('-', ' ')}</p><h3>{item.name}</h3><p>{item.description}</p></Link>)}</div></section>
  </>;
}

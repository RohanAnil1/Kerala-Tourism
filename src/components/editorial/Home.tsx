"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowDown, ArrowUpRight, Compass } from "lucide-react";
import {
  Photo,
  Eyebrow,
  SectionHeading,
  TextLink,
} from "@/components/editorial/Primitives";
import {
  editorialImages,
  landscapeChapters,
  editorialStories,
} from "@/data/editorial";
import type { District } from "@/types";
import KeralaMap from "./KeralaMap";
import OfficialFilms from "./OfficialFilms";

type GeographyData = {
  districts: District[];
  placesByDistrict: Record<string, { name: string; slug: string }[]>;
};
import { itineraries } from "@/data/itineraries";

const seasons = [
  {
    name: "Monsoon",
    months: "June — September",
    title: "Let the rain rewrite the landscape.",
    copy: "Greener hills. Rain on tiled roofs. Time to stay a little longer. Discover a quieter chapter of Kerala, with flexible plans and an eye on local weather.",
    image: editorialImages.waterfall,
    href: "/monsoon-mode",
    link: "Discover the monsoon chapter",
  },
  {
    name: "Winter",
    months: "October — February",
    title: "Long days. Open possibilities.",
    copy: "Walk the coast, explore a heritage neighborhood, or spend the afternoon on the water. Start with the places you love and leave space between them.",
    image: editorialImages.backwaters,
    href: "/destinations?type=backwater",
    link: "Find your winter escape",
  },
  {
    name: "Summer",
    months: "March — May",
    title: "Take the road into the hills.",
    copy: "Trade the coast for tea country. Plan early walks, slow afternoons, and time in the shade. The mountains offer a different rhythm.",
    image: editorialImages.hills,
    href: "/destinations?type=hill",
    link: "Head for the hills",
  },
];

function Hero() {
  return (
    <section className="field-hero" aria-label="Welcome to Kerala">
      <div className="wrap field-hero-top">
        <div className="field-hero-heading">
          <Eyebrow>
            <span className="live-dot" /> A FIELD GUIDE TO A DIFFERENT INDIA
          </Eyebrow>
          <h1>
            A different
            <br />
            <em>state of mind.</em>
          </h1>
        </div>
        <div className="field-hero-aside">
          <span className="place-marker">
            <Compass size={25} strokeWidth={1} />
            <span>
              KERALA, INDIA
              <br />
              10° N / 76° E
            </span>
          </span>
          <p>
            Less rush. More wonder.
            <br />A little further from ordinary.
          </p>
          <Link href="#landscapes" className="round-link">
            Find your Kerala
            <span>
              <ArrowDown size={19} />
            </span>
          </Link>
        </div>
      </div>
      <OfficialFilms />
      <div className="hero-footnote wrap">
        <span>01 — THE ART OF TAKING IT SLOW</span>
        <span>A small corner of India. A whole other feeling.</span>
        <a
          href="#introduction"
          aria-label="Discover what makes Kerala different"
        >
          <ArrowDown size={17} />
        </a>
      </div>
    </section>
  );
}

function Landscapes() {
  const [active, setActive] = useState(0);
  const chapter = landscapeChapters[active];
  return (
    <section id="landscapes" className="landscape-index wrap">
      <SectionHeading label="01 / FOLLOW A FEELING" title="Where do you drift?">
        <p className="muted">
          Four landscapes. Countless ways
          <br />
          to feel a little more yourself.
        </p>
      </SectionHeading>
      <div className="landscape-stage">
        <div className="landscape-visual">
          <Photo
            key={chapter.number}
            src={chapter.image.src}
            alt={chapter.image.alt}
            className="landscape-feature"
            metadata={chapter.image}
          />
          <div className="landscape-image-caption">
            <span>{chapter.place}</span>
            <span>0{active + 1} / 04</span>
          </div>
          <span className="landscape-display" aria-hidden="true">
            {["Water.", "Altitude.", "Salt air.", "Soul."][active]}
          </span>
        </div>
        <div
          className="landscape-selector"
          role="group"
          aria-label="Kerala landscapes"
        >
          {landscapeChapters.map((item, index) => (
            <div
              className={`landscape-option ${active === index ? "is-active" : ""}`}
              key={item.number}
            >
              <button
                id={`landscape-tab-${index}`}
                aria-controls={`landscape-panel-${index}`}
                aria-expanded={active === index}
                onClick={() => setActive(index)}
                onKeyDown={(event) => {
                  let next = active;
                  if (event.key === "ArrowDown" || event.key === "ArrowRight")
                    next = (active + 1) % 4;
                  else if (event.key === "ArrowUp" || event.key === "ArrowLeft")
                    next = (active + 3) % 4;
                  else if (event.key === "Home") next = 0;
                  else if (event.key === "End") next = 3;
                  else return;
                  event.preventDefault();
                  setActive(next);
                  document.getElementById(`landscape-tab-${next}`)?.focus();
                }}
              >
                <span className="index-number">{item.number}</span>
                <span>{item.name.replace("The ", "")}</span>
                <ArrowUpRight size={23} strokeWidth={1} />
              </button>
              <div
                role="region"
                id={`landscape-panel-${index}`}
                aria-labelledby={`landscape-tab-${index}`}
                hidden={active !== index}
              >
                <p>{item.copy}</p>
                <TextLink href={item.href}>
                  Explore {item.name.toLowerCase()}
                </TextLink>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Geography({ districts, placesByDistrict }: GeographyData) {
  const [selected, setSelected] = useState("idukki");
  const district = districts.find((item) => item.slug === selected)!;
  const places = placesByDistrict[selected] || [];
  return (
    <section id="geography" className="geography-section">
      <div className="wrap">
        <SectionHeading
          label="02 / FIND YOUR PLACE"
          title="One state. Many worlds."
        >
          <p className="muted">
            From the Malabar coast to the southern shores.
            <br />
            Choose a district. Follow your curiosity.
          </p>
        </SectionHeading>
        <div className="geography-grid">
          <KeralaMap
            districts={districts}
            selected={selected}
            onSelect={setSelected}
          />
          <div className="district-story">
            <label className="eyebrow" htmlFor="district-select">
              EXPLORE BY DISTRICT
            </label>
            <select
              id="district-select"
              value={selected}
              onChange={(event) => setSelected(event.target.value)}
            >
              {districts.map((item) => (
                <option key={item.slug} value={item.slug}>
                  {item.name}
                </option>
              ))}
            </select>
            <div id="district-preview" aria-live="polite">
              <Photo
                src={district.image}
                alt={`${district.name} landscape`}
                className="district-photo"
              />
              <h3>{district.name}</h3>
              <p className="muted">{district.description}</p>
              <div className="district-places">
                {places.map((place) => (
                  <Link key={place.slug} href={`/destinations/${place.slug}`}>
                    {place.name}
                    <ArrowUpRight size={16} />
                  </Link>
                ))}
              </div>
            </div>
            <TextLink href={`/destinations?district=${selected}`}>
              Explore this district
            </TextLink>
          </div>
        </div>
      </div>
    </section>
  );
}

function Seasons() {
  const [active, setActive] = useState(0);
  const season = seasons[active];
  return (
    <section className="season-section">
      <div className="wrap">
        <SectionHeading
          label="03 / A TIME FOR EVERYTHING"
          title="A place for every season."
        />
        <div className="season-tabs" role="tablist" aria-label="Kerala seasons">
          {seasons.map((item, index) => (
            <button
              key={item.name}
              role="tab"
              id={`season-tab-${index}`}
              aria-selected={active === index}
              aria-controls="season-panel"
              tabIndex={active === index ? 0 : -1}
              onClick={() => setActive(index)}
              onKeyDown={(event) => {
                let next = active;
                if (event.key === "ArrowRight") next = (active + 1) % 3;
                else if (event.key === "ArrowLeft") next = (active + 2) % 3;
                else if (event.key === "Home") next = 0;
                else if (event.key === "End") next = 2;
                else return;
                event.preventDefault();
                setActive(next);
                document.getElementById(`season-tab-${next}`)?.focus();
              }}
            >
              {item.name}
              <span>{item.months}</span>
            </button>
          ))}
        </div>
        <div
          id="season-panel"
          role="tabpanel"
          aria-labelledby={`season-tab-${active}`}
          className="season-grid"
        >
          <Photo
            key={season.name}
            src={season.image.src}
            alt={season.image.alt}
            className="season-photo"
          />
          <div className="season-copy">
            <Eyebrow>{season.months}</Eyebrow>
            <h3>{season.title}</h3>
            <p>{season.copy}</p>
            <TextLink href={season.href}>{season.link}</TextLink>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function HomePage({ geography }: { geography: GeographyData }) {
  return (
    <>
      <Hero />
      <section id="introduction" className="intro-section wrap">
        <div className="intro-margin">
          <Eyebrow>A PLACE APART</Eyebrow>
          <span className="intro-flourish" aria-hidden="true">
            ✳
          </span>
          <p>
            Between the mountains
            <br />
            and the sea, something
            <br />
            wonderful happens.
          </p>
        </div>
        <div className="intro-copy">
          <h2>
            Come for the views.
            <br />
            Stay for <em>the feeling.</em>
          </h2>
          <div className="intro-prose">
            <p>
              Tea on a misty hillside. The hush of a backwater morning. A meal
              that turns into a conversation. Kerala has a way of making room
              for the things you forgot you needed.
            </p>
            <TextLink href="/destinations">Get a little lost</TextLink>
          </div>
        </div>
        <div className="intro-image">
          <Photo
            src={editorialImages.palms.src}
            alt={editorialImages.palms.alt}
            className="intro-portrait"
          />
          <span className="photo-caption">Good things take their time.</span>
        </div>
      </section>
      <Landscapes />
      <Geography {...geography} />
      <Seasons />
      <section className="journeys-section wrap">
        <SectionHeading
          label="04 / TAKE THE LONG WAY"
          title="A route. Not a rule."
        >
          <TextLink href="/trip-planner">Find your own way</TextLink>
        </SectionHeading>
        <div className="journey-grid">
          {itineraries.map((trip, index) => (
            <Link
              className="journey-card"
              key={trip.id}
              href={`/trip-planner?itinerary=${trip.id}`}
            >
              <div className="journey-image-wrap">
                <Photo
                  src={trip.image}
                  alt={trip.title}
                  className="journey-photo"
                  sizes="(max-width: 767px) 100vw, 33vw"
                />
                <span className="journey-badge">
                  {String(trip.days).padStart(2, "0")} SLOW DAYS
                </span>
                <span className="card-arrow">
                  <ArrowUpRight size={23} />
                </span>
              </div>
              <div className="journey-meta">
                <span>JOURNEY NO. 0{index + 1}</span>
                <span>
                  {
                    ["THE FIRST HELLO", "A LITTLE WILDER", "THE FULL PICTURE"][
                      index
                    ]
                  }
                </span>
              </div>
              <h3>{trip.title.replace(/ — \d Days/, "")}</h3>
              <p>
                {Array.from(new Set(trip.dayPlans.map((day) => day.location)))
                  .slice(0, 4)
                  .join(" → ")}
              </p>
              <span className="journey-price">{trip.totalCost}</span>
            </Link>
          ))}
        </div>
      </section>
      <section className="taste-section">
        <div className="wrap taste-grid">
          <div className="taste-image">
            <Photo
              src={editorialStories[2].image}
              alt="Kerala sadya dishes served on a banana leaf"
              className="taste-photo"
            />
            <span className="taste-photo-note">BEST SHARED. ALWAYS.</span>
          </div>
          <div>
            <Eyebrow>05 / THERE’S ALWAYS ROOM</Eyebrow>
            <h2>
              Good food.
              <br />
              Better <em>company.</em>
            </h2>
            <p>
              Coconut. Curry leaves. A little heat. And the kind of hospitality
              that insists you have another helping. This is Kerala, served
              generously.
            </p>
            <TextLink href="/gods-own-flavours">Pull up a chair</TextLink>
            <span className="taste-signature">
              With love, from our kitchen.
            </span>
          </div>
        </div>
      </section>
      <section className="stories-section wrap">
        <SectionHeading
          label="06 / THE KERALA JOURNAL"
          title="Notes from a slower world."
        >
          <TextLink href="/blog">Read the journal</TextLink>
        </SectionHeading>
        <div className="story-grid">
          {editorialStories.map((story) => (
            <Link
              href={`/blog/${story.slug}`}
              key={story.slug}
              className="story-card"
            >
              <Photo
                src={story.image}
                alt={story.title}
                className="story-photo"
                sizes="(max-width: 767px) 100vw, 33vw"
              />
              <Eyebrow>
                {story.category} / {story.readTime}
              </Eyebrow>
              <h3>{story.title}</h3>
              <p>{story.excerpt}</p>
              <span className="text-link">
                Read the story
                <ArrowUpRight size={18} />
              </span>
            </Link>
          ))}
        </div>
      </section>
      <section className="closing-section">
        <div className="wrap closing-inner">
          <div>
            <Eyebrow light>YOUR NEXT CHAPTER STARTS HERE</Eyebrow>
            <h2>
              Leave a little
              <br />
              <em>room for wonder.</em>
            </h2>
          </div>
          <Link className="closing-circle" href="/trip-planner">
            <ArrowUpRight size={38} strokeWidth={1} />
            <span>
              Let’s make
              <br />a little plan.
            </span>
          </Link>
        </div>
      </section>
    </>
  );
}

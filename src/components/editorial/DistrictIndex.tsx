import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import type { District } from '@/types';
import { PageIntro, Photo } from './Primitives';

export default function DistrictIndex({
  districts,
  counts,
  invalidDistrict = false,
}: {
  districts: District[];
  counts: Record<string, number>;
  invalidDistrict?: boolean;
}) {
  return (
    <>
      <div className="district-index-intro"><PageIntro
        label="DESTINATIONS / FOURTEEN DISTRICTS"
        title="Choose your district."
        description="Start with a district. Then follow its waterways, wander its streets, and find the places that make it yours."
      /></div>
      <section className="district-index wrap" aria-labelledby="district-index-title">
        <div className="district-index-heading">
          <div>
            <h2 id="district-index-title">Where shall we begin?</h2>
            <p>Choose a district to explore its destinations.</p>
          </div>
          <ol className="district-browser-steps" aria-label="Your discovery path">
            <li aria-current="step"><span>01</span> Choose a district</li>
            <li><span>02</span> Discover the places</li>
          </ol>
        </div>
        {invalidDistrict && <p className="district-index-notice" role="status">That district could not be found. Choose one of the districts below.</p>}
        <div className="district-index-grid">
          {districts.map((district, index) => (
            <Link
              key={district.slug}
              href={`/destinations?district=${district.slug}`}
              className="district-tile"
              aria-label={`Explore ${district.name} — ${counts[district.slug] || 0} destinations`}
            >
              <div className="district-tile-image">
                <Photo
                  src={district.image}
                  alt={`A glimpse of ${district.name} district`}
                  className="district-tile-photo"
                  sizes={`${index === 0 ? '(max-width: 600px) 100vw,' : '(max-width: 600px) 50vw,'} (max-width: 1000px) 33vw, 25vw`}
                  priority={index < 2}
                />
                <span className="district-tile-number" aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>
              </div>
              <div className="district-tile-content">
                <p className="district-tile-count">{counts[district.slug] || 0} destinations</p>
                <div className="district-tile-title">
                  <h3 className={district.name.length > 12 ? 'district-title-long' : undefined}>{district.name}</h3>
                  <ArrowUpRight size={20} aria-hidden="true" />
                </div>
                <p className="district-tile-description">{district.description}</p>
                <span className="district-tile-action">Explore district <span aria-hidden="true">↗</span></span>
              </div>
            </Link>
          ))}
        </div>
        <p className="planner-note mt-10">Visitor information is a planning reference. Confirm access, opening hours, fees, and local conditions before travelling.</p>
      </section>
    </>
  );
}

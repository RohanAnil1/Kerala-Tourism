import { PageIntro } from "@/components/editorial/Primitives";
import media from "../../../public/media/manifest.json";
import { keralaFilms } from "@/data/films";
export default function CreditsPage() {
  return (
    <>
      <PageIntro
        label="REAL PLACES. REAL PHOTOGRAPHS."
        title="Seen through their lens."
        description="Real photographs, with source credits and documented reuse terms. Where an exact subject photograph is unavailable, area or venue context is clearly labelled."
      />
      <div className="article-body pt-0">
        <h2>The photography collection.</h2>
        <p>
          {media.images.length} photographs, sourced through explicit reference
          articles, manually selected Wikimedia Commons and Flickr files, and
          government sources with explicit reproduction policies and the publisher’s royalty-free collection. Metadata
          checked {media.checkedAt}. Photos are resized and cropped for display;
          adaptations of share-alike images retain their source license. Credits
          and licenses remain with each original file.
        </p>
        <p>
          Context photographs name what is actually pictured. They do not verify
          an unconfirmed attraction, depict a named property’s rooms, or show an
          activity unless the caption explicitly says so. Location warnings and
          withheld map pins remain in place for unverified entries.
        </p>
        <p>
          <a
            className="text-link"
            href="/media/manifest.json"
            target="_blank"
            rel="noreferrer"
          >
            Download the full attribution manifest ↗
          </a>
        </p>
        <details className="media-attributions">
          <summary>Explore all image credits</summary>
          <ul>
            {media.images.map((image) => (
              <li key={image.src}>
                <a href={image.source} target="_blank" rel="noreferrer">
                  {image.subjects[0]?.name || image.alt}
                </a>
                <span>
                  {image.credit} ·{" "}
                  <a
                    href={image.licenseUrl || image.source}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {image.license}
                  </a>
                </span>
                {'rightsNote' in image && typeof image.rightsNote === 'string' && <small className="block mt-2">{image.rightsNote}</small>}
              </li>
            ))}
          </ul>
        </details>{" "}
        <h2 id="kerala-map">The Kerala map.</h2>
        <p>
          Kerala’s geographic outline is adapted from geoBoundaries gbOpen India
          ADM1, based on DataMeet India community and Election Commission of
          India data. The source is licensed under Creative Commons Attribution
          2.5 India and represents the 2011 state boundary. We extracted Kerala,
          rounded the coordinates, and projected the outline and district
          reference locations into a local vector map.
        </p>
        <p>
          <a
            className="text-link"
            href="https://github.com/wmgeolab/geoBoundaries/blob/9469f09/releaseData/gbOpen/IND/ADM1/geoBoundaries-IND-ADM1_simplified.geojson"
            target="_blank"
            rel="noreferrer"
          >
            Geographic boundary source ↗
          </a>
        </p>
        <p>
          <a
            className="text-link"
            href="https://creativecommons.org/licenses/by/2.5/in/"
            target="_blank"
            rel="noreferrer"
          >
            CC BY 2.5 India license ↗
          </a>
        </p>
        <p>
          <a className="text-link" href="/maps/kerala.geojson">
            Download the Kerala boundary ↗
          </a>
        </p>
        <h2>Kerala, in motion.</h2>
        <p>
          Official Kerala Tourism films are embedded from the publisher’s
          YouTube channel. The films remain hosted by their publisher. Desktop
          playback begins muted when permitted; mobile and reduced-motion
          visitors choose when to play.
        </p>
        <ul>
          {keralaFilms.map((film) => (
            <li key={film.id}>
              <a href={film.source} target="_blank" rel="noreferrer">
                {film.name} — official film page ↗
              </a>
            </li>
          ))}
        </ul>
        <h2>Travel information.</h2>
        <p>
          Planning bases link to Kerala Tourism, district tourism offices, or
          the relevant park operator. Road estimates come from OSRM using
          OpenStreetMap; no traffic or closure information is included.
          Forecasts come from Open-Meteo, with retrieval times shown in the
          planner. IMD remains the source for official weather warnings.
        </p>
      </div>
    </>
  );
}

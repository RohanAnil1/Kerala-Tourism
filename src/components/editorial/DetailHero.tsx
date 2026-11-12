import Link from "next/link";
import { Eyebrow, Photo } from "./Primitives";
import photoCaptions from "@/data/photo-captions.json";
import media from "../../../public/media/manifest.json";
import { photoContext } from "@/data/photo-context";

export default function DetailHero({
  title,
  label,
  description,
  image,
  backHref,
  backLabel,
  photoSubject,
}: {
  title: string;
  label: string;
  description: string;
  image?: string | null;
  backHref: string;
  backLabel: string;
  photoSubject?: string;
}) {
  const selectedContext = photoContext(photoSubject);
  const context = !image || image === selectedContext?.src ? selectedContext : undefined;
  const source = image || context?.src;
  const note = (photoCaptions as Record<string, { note?: string }>)[source || ""]?.note;
  const attribution = media.images.find(photo => photo.src === source);
  return (
    <>
    <header className="detail-hero">
      <Photo src={image} subjectKey={photoSubject} alt={title} priority sizes="100vw" />
      <div className="detail-shade" />
      <Link href={backHref} className="detail-back">
        ← {backLabel}
      </Link>
      <div className="detail-hero-note">A PAGE FROM THE KERALA FIELD GUIDE</div>
      <div className="detail-heading wrap">
        <div>
          <Eyebrow light>{label}</Eyebrow>
          <h1>{title}</h1>
        </div>
        <p>{description}</p>
      </div>
    </header>
    {context && <p className="wrap photo-context-explanation">{context.caption}</p>}
    {note && <p className="wrap photo-caption pt-4">{note}</p>}
    {attribution && <p className="wrap photo-caption pt-3 pb-3">Photo: {attribution.credit} · <a href={attribution.source} target="_blank" rel="noreferrer">View source ↗</a> · <a href={attribution.licenseUrl || attribution.source} target="_blank" rel="noreferrer">{attribution.license}</a></p>}
    </>
  );
}

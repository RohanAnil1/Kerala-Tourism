"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState, type ReactNode } from "react";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import type { EditorialImage } from "@/types";
import { editorialImages } from "@/data/editorial";
import photoCaptions from "@/data/photo-captions.json";
import { photoContext } from "@/data/photo-context";

export function Emblem() {
  return (
    <svg
      width="30"
      height="36"
      viewBox="0 0 30 36"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M15 33V12M15 12C9 3 3 5 2 12c6-3 9-2 13 0ZM15 12c6-9 12-7 13 0-6-3-9-2-13 0ZM15 12C8 10 4 15 3 20c5-4 8-6 12-8ZM15 12c7-2 11 3 12 8-5-4-8-6-12-8ZM8 33h14"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function Photo({
  src,
  alt,
  className = "",
  priority = false,
  sizes = "(max-width: 767px) 100vw, 50vw",
  metadata,
  contain = false,
  eager = false,
  subjectKey,
}: {
  src?: string | null;
  alt: string;
  className?: string;
  priority?: boolean;
  sizes?: string;
  metadata?: EditorialImage;
  contain?: boolean;
  eager?: boolean;
  subjectKey?: string;
}) {
  const [failed, setFailed] = useState(false);
  const selectedContext = photoContext(subjectKey);
  const context = !metadata?.src && (!src || src === selectedContext?.src) ? selectedContext : undefined;
  const source = metadata?.src || src || context?.src || "";
  useEffect(() => setFailed(false), [source]);
  const caption = (photoCaptions as Record<string, { alt: string; focalPosition?: string; requiredCredit?: string }>)[source];
  const imageInfo =
    metadata ||
    Object.values(editorialImages).find(
      (item) => source && item.src.split("?")[0] === source.split("?")[0],
    );
  return (
    <div className={`photo ${className}`} data-photo-subject={subjectKey} data-photo-context={context ? "true" : undefined}>
      {failed || !source ? (
        <div className="photo-fallback">
          <Emblem />
          <span>{alt}</span>
          <small>
            {!source
              ? "Verified photograph not yet available"
              : "Image unavailable"}
          </small>
        </div>
      ) : (
        <Image
          src={source}
          alt={context?.alt || imageInfo?.alt || caption?.alt || alt}
          fill
          sizes={sizes}
          quality={priority ? 65 : 75}
          priority={priority}
          loading={eager ? "eager" : undefined}
          className={contain ? "object-contain" : "object-cover"}
          style={{ objectPosition: imageInfo?.focalPosition || caption?.focalPosition || "center" }}
          onError={() => setFailed(true)}
        />
      )}
      {!failed && source && caption?.requiredCredit && <span className="photo-credit">{caption.requiredCredit}</span>}
      {context && <span className="photo-context">{context.caption}</span>}
    </div>
  );
}

export function Eyebrow({
  children,
  light = false,
}: {
  children: ReactNode;
  light?: boolean;
}) {
  return (
    <p className={`eyebrow ${light ? "eyebrow-light" : ""}`}>{children}</p>
  );
}
export function TextLink({
  href,
  children,
  className = "",
}: {
  href: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <Link href={href} className={`text-link ${className}`}>
      {children}
      <ArrowUpRight size={18} aria-hidden="true" />
    </Link>
  );
}
export function SectionHeading({
  label,
  title,
  children,
}: {
  label: string;
  title: string;
  children?: ReactNode;
}) {
  return (
    <div className="section-heading">
      <div>
        <Eyebrow>{label}</Eyebrow>
        <h2>{title}</h2>
      </div>
      {children}
    </div>
  );
}
export function PageIntro({
  label,
  title,
  description,
  backLink,
}: {
  label: string;
  title: string;
  description: string;
  backLink?: { href: string; label: string };
}) {
  return (
    <header className={`page-intro wrap${title.split(/\s+/).some(word => word.length > 12) ? " page-intro-long-word" : ""}`}>
      {backLink && <Link href={backLink.href} className="page-intro-back"><ArrowLeft size={16} aria-hidden="true" />{backLink.label}</Link>}
      <div className="page-intro-kicker">
        <Eyebrow>{label}</Eyebrow>
        <span>THE KERALA FIELD GUIDE</span>
      </div>
      <div className="page-intro-content">
        <h1>{title}</h1>
        <p>{description}</p>
      </div>
      <span className="page-intro-rule" />
    </header>
  );
}

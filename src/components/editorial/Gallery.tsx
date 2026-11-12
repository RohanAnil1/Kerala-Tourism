"use client";

import { useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Modal from "./Modal";
import { Photo } from "./Primitives";
import { photoContext } from "@/data/photo-context";

export default function Gallery({
  images,
  name,
  photoSubject,
}: {
  images: string[];
  name: string;
  photoSubject?: string;
}) {
  const [active, setActive] = useState<number | null>(null);
  const sources = Array.from(
    new Set(images.filter((src) => typeof src === "string" && src.trim())),
  );
  if (!sources.length && photoContext(photoSubject))
    return <figure><Photo subjectKey={photoSubject} alt={name} className="context-gallery-photo" sizes="(max-width: 767px) 100vw, 60vw" contain /><figcaption className="photo-caption mt-4">{photoContext(photoSubject)?.caption} A verified photograph of the exact subject is still needed.</figcaption></figure>;
  if (!sources.length)
    return (
      <p className="photo-caption">
        A verified photograph is not yet available for this subject.
      </p>
    );
  const move = (delta: number) =>
    setActive((value) =>
      value === null ? null : (value + delta + sources.length) % sources.length,
    );
  return (
    <>
      <div className="gallery-grid">
        {sources.map((src, i) => (
          <button
            type="button"
            key={`${src}-${i}`}
            onClick={() => setActive(i)}
            aria-label={`Open ${name} photograph ${i + 1}`}
          >
            <Photo
              src={src}
              subjectKey={photoSubject}
              alt={`${name}, view ${i + 1}`}
              className="gallery-photo"
              sizes="(max-width: 767px) 50vw, 33vw"
            />
            <span className="gallery-caption">
              View photograph {String(i + 1).padStart(2, "0")}
            </span>
          </button>
        ))}
      </div>
      <Modal
        open={active !== null}
        onClose={() => setActive(null)}
        title={`${name} gallery`}
        className="gallery-modal"
        onKeyDown={(event) => {
          if (event.key === "ArrowLeft") {
            event.preventDefault();
            move(-1);
          }
          if (event.key === "ArrowRight") {
            event.preventDefault();
            move(1);
          }
        }}
      >
        <div>
          {active !== null && (
            <Photo
              src={sources[active]}
              subjectKey={photoSubject}
              alt={`${name}, view ${active + 1}`}
              className="lightbox-photo"
              sizes="90vw"
              contain
              eager
            />
          )}
          <div className="gallery-controls">
            <button
              className="icon-button"
              aria-label="Previous photograph"
              onClick={() => move(-1)}
            >
              <ArrowLeft />
            </button>
            <p aria-live="polite">
              {(active ?? 0) + 1} / {sources.length}
            </p>
            <button
              className="icon-button"
              aria-label="Next photograph"
              onClick={() => move(1)}
            >
              <ArrowRight />
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
}

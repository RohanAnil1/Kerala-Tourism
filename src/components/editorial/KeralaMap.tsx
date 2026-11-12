"use client";

import Link from "next/link";
import type { District } from "@/types";
import {
  KERALA_BOUNDARY_PATH,
  KERALA_MAP_VIEWBOX,
  projectKeralaPoint,
} from "@/data/kerala-map";

// Only the callout labels move. Pin tips stay at their geographic coordinates.
const callouts: Record<
  string,
  { dx: number; dy: number; anchor: "start" | "end" }
> = {
  kasaragod: { dx: 27, dy: -28, anchor: "start" },
  kannur: { dx: -26, dy: -20, anchor: "end" },
  wayanad: { dx: 28, dy: -17, anchor: "start" },
  kozhikode: { dx: -28, dy: -20, anchor: "end" },
  malappuram: { dx: 30, dy: -12, anchor: "start" },
  palakkad: { dx: 30, dy: -12, anchor: "start" },
  thrissur: { dx: -28, dy: -17, anchor: "end" },
  ernakulam: { dx: -28, dy: -20, anchor: "end" },
  idukki: { dx: 28, dy: -16, anchor: "start" },
  kottayam: { dx: 30, dy: -20, anchor: "start" },
  alappuzha: { dx: -30, dy: -3, anchor: "end" },
  pathanamthitta: { dx: 28, dy: -5, anchor: "start" },
  kollam: { dx: -28, dy: -12, anchor: "end" },
  thiruvananthapuram: { dx: -18, dy: 30, anchor: "end" },
};

export default function KeralaMap({
  districts,
  selected,
  onSelect,
}: {
  districts: District[];
  selected: string;
  onSelect: (slug: string) => void;
}) {
  const ordered = [...districts].sort(
    (a, b) => b.coordinates.lat - a.coordinates.lat,
  );
  return (
    <div className="kerala-atlas">
      <svg
        viewBox={KERALA_MAP_VIEWBOX}
        role="group"
        aria-label="Kerala map with district location pins"
      >
        <title>Kerala, India</title>
        <desc>
          A geographic outline of Kerala with fourteen district location pins.
          Select a pin or use the district selector to explore.
        </desc>
        <g className="atlas-compass" aria-hidden="true">
          <text x="454" y="39" textAnchor="middle">
            N
          </text>
          <path d="M454 84V50m-5 10 5-10 5 10" />
        </g>
        <text
          x="106"
          y="458"
          className="atlas-sea"
          transform="rotate(-62 106 458)"
          aria-hidden="true"
        >
          ARABIAN SEA
        </text>
        <path
          d={KERALA_BOUNDARY_PATH}
          className="atlas-land"
          fillRule="evenodd"
        />
        <g className="atlas-callouts" aria-hidden="true" pointerEvents="none">
          {ordered.map((district) => {
            const { x, y } = projectKeralaPoint(district.coordinates);
            const { dx, dy, anchor } = callouts[district.slug];
            return (
              <g
                key={district.slug}
                className={selected === district.slug ? "callout-active" : ""}
              >
                <path
                  className="atlas-leader"
                  d={`M${x},${y - 16}L${x + dx + (anchor === "start" ? -6 : 6)},${y + dy - 4}`}
                />
                <text
                  x={x + dx}
                  y={y + dy}
                  textAnchor={anchor}
                  className="atlas-label"
                >
                  {district.name}
                </text>
              </g>
            );
          })}
        </g>
        {ordered.map((district) => {
          const { x, y } = projectKeralaPoint(district.coordinates);
          const active = selected === district.slug;
          return (
            <g
              key={district.slug}
              transform={`translate(${x.toFixed(2)} ${y.toFixed(2)})`}
              role="button"
              tabIndex={0}
              aria-label={`Explore ${district.name}`}
              aria-pressed={active}
              aria-controls="district-preview"
              className={`atlas-pin ${active ? "pin-active" : ""}`}
              onClick={() => onSelect(district.slug)}
              onKeyDown={(event) => {
                if (event.key === "Enter" || event.key === " ") {
                  event.preventDefault();
                  onSelect(district.slug);
                }
              }}
            >
              <circle
                className="atlas-pin-hit"
                cx="0"
                cy="-15"
                r="21"
                fill="transparent"
              />
              <circle className="atlas-pin-halo" cx="0" cy="-16" r="19" />
              <path
                className="atlas-pin-body"
                d="M0 0C-3.4-4.6-10-11.3-10-17a10 10 0 0 1 20 0C10-11.3 3.4-4.6 0 0Z"
              />
              <circle className="atlas-pin-center" cx="0" cy="-17" r="3" />
              <title>{district.name}</title>
            </g>
          );
        })}
        <text
          x="260"
          y="769"
          textAnchor="middle"
          className="atlas-note"
          aria-hidden="true"
        >
          KERALA / 14 DISTRICTS / ONE ENDLESS DISCOVERY
        </text>
      </svg>
      <div className="atlas-source">
        <span>District location pins</span>
        <Link href="/credits#kerala-map">Map source ↗</Link>
      </div>
    </div>
  );
}

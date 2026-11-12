"use client";

import { Suspense, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { Search, SlidersHorizontal, X, ArrowUpRight } from "lucide-react";
import { Eyebrow, PageIntro, Photo } from "./Primitives";
import Modal from "./Modal";
import { photoContext } from "@/data/photo-context";

export interface DiscoveryItem {
  id: string;
  title: string;
  description: string;
  image?: string | null;
  href?: string;
  label: string;
  facts: string[];
  search: string;
  filters: Record<string, string | string[]>;
  featured?: boolean;
  status?: string;
  photoSubject?: string;
}
export interface DiscoveryFilter {
  key: string;
  label: string;
  options: { value: string; label: string }[];
}

function DiscoveryContent({
  title,
  label,
  description,
  items,
  filters,
  footer,
  backLink,
  baseFilters,
}: {
  title: string;
  label: string;
  description: string;
  items: DiscoveryItem[];
  filters: DiscoveryFilter[];
  footer?: string;
  backLink?: { href: string; label: string };
  baseFilters?: Record<string, string>;
}) {
  const params = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const [sheet, setSheet] = useState(false);
  const pageValue = params.get('page') || '1';
  const page = /^\d{1,3}$/.test(pageValue) ? Math.max(1, Math.min(Number(pageValue), Math.ceil(items.length / 18))) : 1;
  const limit = page * 18;
  const query = params.get("q") || "";
  const sort = params.get("sort") === "name" ? "name" : "editorial";
  const update = (key: string, value: string, replace = false) => {
    const next = new URLSearchParams(params.toString());
    if (key !== 'page') next.delete('page');
    if (value) next.set(key, value);
    else next.delete(key);
    const url = `${pathname}${next.size ? `?${next}` : ""}`;
    if (replace) router.replace(url, { scroll: false });
    else router.push(url, { scroll: false });
  };
  const active = filters.filter((filter) => !!params.get(filter.key) && !baseFilters?.[filter.key]);
  const results = items
    .filter(
      (item) =>
        (!query.trim() ||
          item.search.toLowerCase().includes(query.trim().toLowerCase())) &&
        filters.every((filter) => {
          const value = params.get(filter.key);
          if (!value) return true;
          const field = item.filters[filter.key];
          return Array.isArray(field) ? field.includes(value) : field === value;
        }),
    )
    .sort((a, b) =>
      sort === "name"
        ? a.title.localeCompare(b.title)
        : Number(!!b.featured) - Number(!!a.featured),
    );
  const reset = () => {
    const base = new URLSearchParams(baseFilters);
    router.push(`${pathname}${base.size ? `?${base}` : ''}`, { scroll: false });
  };
  const fields = (
    <>
      {filters.map((filter) => (
        <label key={filter.key}>
          {filter.label}
          <select
            aria-label={filter.label}
            value={params.get(filter.key) || ""}
            onChange={(event) => update(filter.key, event.target.value)}
          >
            <option value="">All {filter.label.toLowerCase()}</option>
            {filter.options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </label>
      ))}
      <label>
        Order
        <select
          aria-label="Order"
          value={sort}
          onChange={(event) =>
            update(
              "sort",
              event.target.value === "editorial" ? "" : event.target.value,
            )
          }
        >
          <option value="editorial">Editorial selection</option>
          <option value="name">Name, A–Z</option>
        </select>
      </label>
    </>
  );
  return (
    <>
      <PageIntro label={label} title={title} description={description} backLink={backLink} />
      <section className="discovery wrap" aria-label={title}>
        <div className="discovery-toolbar">
          <label className="search-field">
            <Search size={19} aria-hidden="true" />
            <span className="sr-only">Search {title}</span>
            <input
              type="search"
              value={query}
              onChange={(event) => update("q", event.target.value, true)}
              placeholder="A place, a feeling, a little curiosity…"
            />
          </label>
          <button
            className="button button-outline filter-toggle"
            onClick={() => setSheet(true)}
            aria-label="Open filters"
          >
            <SlidersHorizontal size={17} />
            Filters{active.length > 0 ? ` (${active.length})` : ""}
          </button>
          <Link href="/trip-planner" className="text-link">
            Find a journey
            <ArrowUpRight size={17} />
          </Link>
        </div>
        <div className="discovery-filters">{fields}</div>
        {(active.length > 0 || query || sort !== "editorial") && (
          <div className="active-filters">
            {active.map((filter) => {
              const value = params.get(filter.key)!;
              return (
                <button
                  className="filter-chip"
                  key={filter.key}
                  onClick={() => update(filter.key, "")}
                  aria-label={`Remove ${filter.label} filter`}
                >
                  {filter.options.find((option) => option.value === value)
                    ?.label || value}
                  <X size={13} />
                </button>
              );
            })}
            {query && (
              <button
                className="filter-chip"
                onClick={() => update("q", "")}
                aria-label="Clear search"
              >
                “{query}”<X size={13} />
              </button>
            )}
            <button className="text-link" onClick={reset}>
              Reset all
            </button>
          </div>
        )}
        <div className="results-heading">
          <p className="result-count" role="status">
            <span>{String(results.length).padStart(2, "0")}</span>{" "}
            {results.length === 1 ? "discovery" : "discoveries"}{" "}
            <span className="result-count-note">
              / {sort === "name" ? "A–Z" : "The collection"}
            </span>
          </p>
          <span className="results-hint">A GOOD PLACE TO START WANDERING</span>
        </div>
        {results.length === 0 ? (
          <div className="empty-state">
            <h2>A different path, perhaps?</h2>
            <p>
              No results match these filters. Try a broader search or start
              again.
            </p>
            <button className="button" onClick={reset}>
              Clear filters
            </button>
          </div>
        ) : (
          <div className="discovery-grid">
            {results.slice(0, limit).map((item) => {
              const content = (
                <>
                  <div className="discovery-image">
                    <Photo
                      src={item.image}
                      subjectKey={item.photoSubject}
                      alt={item.title}
                      className="destination-photo"
                      sizes="(max-width: 767px) 100vw, (max-width: 900px) 50vw, 33vw"
                    />
                    {item.featured && !photoContext(item.photoSubject) && (
                      <span className="collection-badge">
                        EDITOR’S NOTEBOOK
                      </span>
                    )}
                    {item.href && (
                      <span className="card-arrow">
                        <ArrowUpRight size={22} />
                      </span>
                    )}
                  </div>
                  <div className="discovery-card-heading">
                    <Eyebrow>{item.label}</Eyebrow>
                    {item.href && <ArrowUpRight size={16} />}
                  </div>
                  <h2>{item.title}</h2>
                  {item.status && <p className="location-label">{item.status}</p>}
                  <p className="card-summary">{item.description}</p>
                  <div className="card-facts">
                    {item.facts.map((fact) => (
                      <span key={fact}>{fact}</span>
                    ))}
                  </div>
                </>
              );
              return item.href ? (
                <Link href={item.href} className="discovery-card" key={item.id}>
                  {content}
                </Link>
              ) : (
                <article className="discovery-card" key={item.id}>
                  {content}
                </article>
              );
            })}
          </div>
        )}
        {limit < results.length && (
          <div className="result-actions">
            <button
              className="button button-outline"
              onClick={() => update('page', String(page + 1), true)}
            >
              Discover more ({results.length - limit} remaining)
            </button>
          </div>
        )}
        {footer && <p className="planner-note mt-10">{footer}</p>}
      </section>
      <Modal
        open={sheet}
        onClose={() => setSheet(false)}
        title="Refine your discoveries"
      >
        <div className="discovery-filters">{fields}</div>
        <div className="result-actions">
          <button className="button" onClick={() => setSheet(false)}>
            Show {results.length} results
          </button>
          <button className="button button-outline" onClick={reset}>
            Reset all
          </button>
        </div>
      </Modal>
    </>
  );
}

export default function Discovery(
  props: Parameters<typeof DiscoveryContent>[0],
) {
  return (
    <Suspense
      fallback={
        <PageIntro
          label={props.label}
          title={props.title}
          description="Preparing your discoveries…"
          backLink={props.backLink}
        />
      }
    >
      <DiscoveryContent {...props} />
    </Suspense>
  );
}

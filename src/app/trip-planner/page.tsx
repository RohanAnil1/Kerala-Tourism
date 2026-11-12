"use client";

import { Suspense, useEffect, useRef, useState, type FormEvent } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import {
  ArrowDown,
  ArrowUp,
  ArrowUpRight,
  Check,
  Download,
  MapPin,
  Plus,
  Printer,
  RotateCcw,
  Save,
  Share2,
  Trash2,
  Upload,
  CloudSun,
  Route,
} from "lucide-react";
import { PageIntro, Eyebrow } from "@/components/editorial/Primitives";
import {
  travelBases,
  baseById,
  tripSeeds,
  GUIDE_CHECKED_AT,
} from "@/data/travel-guide";
import {
  buildTrip,
  budgetTotal,
  dateForDay,
  parseTrip,
  readSharedTrip,
  routeStops,
  shareTrip,
  tripCalendar,
  validDate,
  type Pace,
  type TripPlan,
  type TripDay,
} from "@/lib/trip-planner";

type RoadData = {
  checkedAt: string;
  legs: { from: string; to: string; km: number; minutes: number }[];
  error?: string;
};
type Forecast = {
  date: string;
  high: number | null;
  low: number | null;
  rain: number | null;
  code: number | null;
};
type WeatherData = { checkedAt: string; forecasts: Forecast[]; error?: string };
type SavedTrip = { id: string; plan: TripPlan };
const money = (value: number) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(value);
const showDate = (date: string) =>
  date
    ? new Date(`${date}T12:00:00`).toLocaleDateString("en-IN", {
        day: "numeric",
        month: "short",
      })
    : "";
const download = (filename: string, content: string, type: string) => {
  const url = URL.createObjectURL(new Blob([content], { type }));
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 10000);
};
function getStored(key: string) {
  try {
    return JSON.parse(localStorage.getItem(key) || "null");
  } catch {
    return null;
  }
}

function Planner() {
  const params = useSearchParams();
  const router = useRouter();
  const [days, setDays] = useState(5),
    [travellers, setTravellers] = useState(2),
    [date, setDate] = useState("");
  const [pace, setPace] = useState<Pace>("balanced"),
    [transport, setTransport] = useState<"car" | "public">("car");
  const [stops, setStops] = useState<string[]>([
    "kochi",
    "munnar",
    "alappuzha",
  ]);
  const [interest, setInterest] = useState("All places");
  const [plan, setPlan] = useState<TripPlan | null>(null),
    [loaded, setLoaded] = useState(false);
  const [saved, setSaved] = useState<SavedTrip[]>([]),
    [message, setMessage] = useState(""),
    [formError, setFormError] = useState("");
  const [storageError, setStorageError] = useState(false),
    [shareUrl, setShareUrl] = useState("");
  const [custom, setCustom] = useState<Record<number, string>>({});
  const [roads, setRoads] = useState<RoadData | null>(null),
    [roadLoading, setRoadLoading] = useState(false),
    [refresh, setRefresh] = useState(0);
  const [weatherBase, setWeatherBase] = useState("kochi"),
    [weather, setWeather] = useState<WeatherData | null>(null),
    [weatherLoading, setWeatherLoading] = useState(false);
  const fileInput = useRef<HTMLInputElement>(null),
    result = useRef<HTMLElement>(null);
  const apply = (value: TripPlan) => {
    setPlan(value);
    setDays(value.days);
    setTravellers(value.travellers);
    setDate(value.startDate);
    setPace(value.pace);
    setTransport(value.transport);
    setStops(value.stops);
    setWeatherBase(value.dayPlans[0].base);
    setShareUrl("");
    setFormError("");
  };
  useEffect(() => {
    const library = getStored("kerala-trips-v1");
    if (Array.isArray(library))
      setSaved(
        library
          .filter(
            (item) =>
              item && typeof item.id === "string" && parseTrip(item.plan),
          )
          .slice(0, 8),
      );
    const shared = params.get("plan"),
      seed = tripSeeds.find((item) => item.id === params.get("itinerary"));
    if (shared) {
      const value = readSharedTrip(shared);
      if (value) apply(value);
      else {
        setPlan(null);
        setMessage(
          "This shared trip is invalid or incomplete. Build a new route below.",
        );
      }
    } else if (seed)
      apply(
        buildTrip({
          name: seed.title,
          days: seed.days,
          startDate: "",
          travellers: 2,
          pace: "balanced",
          transport: "car",
          stops: seed.stops,
        }),
      );
    else {
      const draft = parseTrip(getStored("kerala-draft-v1"));
      if (draft) apply(draft);
      else if (params.has("days")) {
        const n = Number(params.get("days"));
        setDays(Number.isInteger(n) && n >= 1 && n <= 21 ? n : 5);
      }
      if (params.get("itinerary") && !seed)
        setMessage(
          "That featured route is unavailable. Choose your own stops.",
        );
    }
    setLoaded(true);
    // URL changes intentionally open the linked trip; edits remain local until shared.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params]);
  useEffect(() => {
    if (loaded && plan)
      try {
        localStorage.setItem("kerala-draft-v1", JSON.stringify(plan));
        setStorageError(false);
        if (params.has("itinerary") || params.has("plan"))
          router.replace("/trip-planner", { scroll: false });
      } catch {
        setStorageError(true);
      }
  }, [plan, loaded, params, router]);
  const route = plan ? routeStops(plan) : [],
    routeKey = route.join(",");
  const hasPlan = !!plan,
    travelMode = plan?.transport;
  useEffect(() => {
    if (!hasPlan || travelMode !== "car") {
      setRoads(null);
      return;
    }
    const controller = new AbortController();
    setRoadLoading(true);
    setRoads(null);
    fetch(`/api/travel?kind=roads&stops=${encodeURIComponent(routeKey)}`, {
      signal: controller.signal,
    })
      .then((r) => r.json())
      .then((data) => {
        if (!controller.signal.aborted) setRoads(data);
      })
      .catch(() => {
        if (!controller.signal.aborted)
          setRoads({
            checkedAt: "",
            legs: [],
            error:
              "Road estimates are unavailable. Use the map link or try again.",
          });
      })
      .finally(() => {
        if (!controller.signal.aborted) setRoadLoading(false);
      });
    return () => controller.abort();
  }, [routeKey, travelMode, hasPlan, refresh]);
  useEffect(() => {
    if (!hasPlan) return;
    const controller = new AbortController();
    setWeatherLoading(true);
    setWeather(null);
    fetch(`/api/travel?kind=weather&stops=${weatherBase}`, {
      signal: controller.signal,
    })
      .then((r) => r.json())
      .then((data) => {
        if (!controller.signal.aborted) setWeather(data);
      })
      .catch(() => {
        if (!controller.signal.aborted)
          setWeather({
            checkedAt: "",
            forecasts: [],
            error:
              "Weather is unavailable. Check the IMD forecast or try again.",
          });
      })
      .finally(() => {
        if (!controller.signal.aborted) setWeatherLoading(false);
      });
    return () => controller.abort();
  }, [weatherBase, hasPlan, refresh]);
  const moveStop = (index: number, delta: number) => {
    const next = [...stops];
    [next[index], next[index + delta]] = [next[index + delta], next[index]];
    setStops(next);
  };
  const updateStartDate = (value: string) => {
    if (!validDate(value)) return;
    setDate(value);
    setPlan((current) =>
      current && current.startDate !== value
        ? { ...current, startDate: value }
        : current,
    );
  };
  const submit = (event: FormEvent) => {
    event.preventDefault();
    try {
      const value = buildTrip({
        name: plan?.name || "My Kerala journey",
        days,
        startDate: date,
        travellers,
        pace,
        transport,
        stops,
      });
      if (plan) value.costs = plan.costs;
      apply(value);
      setMessage("Your route is ready. Edit each day below.");
      requestAnimationFrame(() => result.current?.focus());
    } catch (error) {
      setFormError((error as Error).message);
    }
  };
  const updateDay = (index: number, value: Partial<TripDay>) =>
    setPlan((old) =>
      old
        ? {
            ...old,
            dayPlans: old.dayPlans.map((day, i) =>
              i === index ? { ...day, ...value } : day,
            ),
          }
        : null,
    );
  const moveDay = (index: number, delta: number) =>
    setPlan((old) => {
      if (!old) return old;
      const next = [...old.dayPlans];
      [next[index], next[index + delta]] = [next[index + delta], next[index]];
      return { ...old, dayPlans: next };
    });
  const save = () => {
    if (!plan) return;
    const next = [{ id: String(Date.now()), plan }, ...saved].slice(0, 8);
    try {
      localStorage.setItem("kerala-trips-v1", JSON.stringify(next));
      setSaved(next);
      setMessage("Trip saved in this browser.");
    } catch {
      setMessage(
        "This browser could not save the trip. Download a copy instead.",
      );
    }
  };
  const share = async () => {
    if (!plan) return;
    const payload = shareTrip(plan);
    if (payload.length > 7000) {
      setShareUrl("");
      setMessage(
        "This trip is too detailed for a reliable share link. Download JSON to transfer the complete trip.",
      );
      return;
    }
    const url = `${window.location.origin}/trip-planner?plan=${payload}`;
    setShareUrl(url);
    try {
      await navigator.clipboard.writeText(url);
      setMessage(
        "Share link copied. It includes your route, notes, and budget.",
      );
    } catch {
      setMessage("Your share link is ready. Copy it from the field below.");
    }
  };
  const importTrip = async (file?: File) => {
    if (!file) return;
    try {
      if (file.size > 512000) throw new Error();
      const value = parseTrip(JSON.parse(await file.text()));
      if (!value) throw new Error();
      apply(value);
      setMessage("Trip imported. You can continue editing.");
    } catch {
      setMessage(
        "That file is not a valid Kerala trip. Import a JSON file exported by this planner.",
      );
    }
    if (fileInput.current) fileInput.current.value = "";
  };
  const totals = plan ? budgetTotal(plan) : null;
  const mapUrl =
    route.length > 1
      ? `https://www.google.com/maps/dir/?api=1&origin=${encodeURIComponent(`${baseById(route[0])!.lat},${baseById(route[0])!.lng}`)}&destination=${encodeURIComponent(`${baseById(route[route.length - 1])!.lat},${baseById(route[route.length - 1])!.lng}`)}${
          route.length > 2
            ? `&waypoints=${route
                .slice(1, -1)
                .map((id) => {
                  const b = baseById(id)!;
                  return `${b.lat},${b.lng}`;
                })
                .join("|")}`
            : ""
        }&travelmode=${plan?.transport === "public" ? "transit" : "driving"}`
      : "";
  const weatherDays =
    weather?.forecasts
      ?.filter(
        (item) =>
          !plan?.startDate ||
          plan.dayPlans.some(
            (day, index) =>
              day.base === weatherBase &&
              dateForDay(plan.startDate, index) === item.date,
          ),
      )
      .slice(0, 4) || [];
  return (
    <>
      <PageIntro
        label="THE JOURNEY IS YOURS TO MAKE"
        title="Make room for wonder."
        description="A real route. Space to change your mind. Build a Kerala journey around the places you want to linger."
      />
      <div className="trip-workspace wrap">
        <aside className="trip-builder">
          <Eyebrow>01 / SHAPE YOUR JOURNEY</Eyebrow>
          <h2>What’s your pace?</h2>
          {plan && (
            <a className="trip-mobile-shortcut" href="#travel-notebook">
              View your itinerary <ArrowDown size={15} />
            </a>
          )}
          <form onSubmit={submit}>
            <div className="trip-input-pair">
              <label>
                Days
                <input
                  type="number"
                  min="1"
                  max="21"
                  required
                  value={days}
                  onChange={(e) => setDays(Number(e.target.value))}
                />
              </label>
              <label>
                Travellers
                <input
                  type="number"
                  min="1"
                  max="12"
                  required
                  value={travellers}
                  onChange={(e) => setTravellers(Number(e.target.value))}
                />
              </label>
            </div>
            <label>
              Start date <span className="optional">optional</span>
              <input
                type="date"
                value={date}
                onInput={(e) => updateStartDate(e.currentTarget.value)}
                onChange={(e) => updateStartDate(e.currentTarget.value)}
                aria-describedby="trip-date-help"
              />
              <span id="trip-date-help" className="trip-date-help">
                {plan
                  ? "Updates your journey dates and calendar immediately."
                  : "Add a date to include the journey in your calendar."}
              </span>
            </label>
            <div className="trip-input-pair">
              <label>
                Pace
                <select
                  value={pace}
                  onChange={(e) => setPace(e.target.value as Pace)}
                >
                  <option value="slow">Slow</option>
                  <option value="balanced">Balanced</option>
                  <option value="active">Active</option>
                </select>
              </label>
              <label>
                Getting around
                <select
                  value={transport}
                  onChange={(e) =>
                    setTransport(e.target.value as "car" | "public")
                  }
                >
                  <option value="car">Car / taxi</option>
                  <option value="public">Public transport</option>
                </select>
              </label>
            </div>
            <div className="trip-stops-heading">
              <h3>Your stops, in order</h3>
              <span>{stops.length} places</span>
            </div>
            <p className="trip-hint">
              The first stop is your arrival base. This is a one-way route;
              allow time for your onward journey.
            </p>
            <ol className="chosen-stops">
              {stops.map((id, index) => (
                <li key={id}>
                  <span className="stop-number">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span>{baseById(id)!.name}</span>
                  <div>
                    <button
                      type="button"
                      className="icon-button"
                      disabled={index === 0}
                      aria-label={`Move ${baseById(id)!.name} earlier`}
                      onClick={() => moveStop(index, -1)}
                    >
                      <ArrowUp size={14} />
                    </button>
                    <button
                      type="button"
                      className="icon-button"
                      disabled={index === stops.length - 1}
                      aria-label={`Move ${baseById(id)!.name} later`}
                      onClick={() => moveStop(index, 1)}
                    >
                      <ArrowDown size={14} />
                    </button>
                    <button
                      type="button"
                      className="icon-button"
                      aria-label={`Remove ${baseById(id)!.name}`}
                      onClick={() => setStops(stops.filter((x) => x !== id))}
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </li>
              ))}
            </ol>
            <label>
              Find a place by feeling
              <select
                value={interest}
                onChange={(e) => setInterest(e.target.value)}
              >
                {[
                  "All places",
                  "Backwaters",
                  "Hills",
                  "Coast",
                  "Culture",
                  "Food",
                  "Nature",
                ].map((x) => (
                  <option key={x}>{x}</option>
                ))}
              </select>
            </label>
            <div className="place-picker">
              {travelBases
                .filter(
                  (b) =>
                    interest === "All places" || b.interests.includes(interest),
                )
                .map((base) => (
                  <button
                    key={base.id}
                    type="button"
                    aria-pressed={stops.includes(base.id)}
                    disabled={stops.includes(base.id)}
                    onClick={() => setStops([...stops, base.id])}
                  >
                    <span>
                      {base.name}
                      <small>{base.region}</small>
                    </span>
                    {stops.includes(base.id) ? (
                      <Check size={16} />
                    ) : (
                      <Plus size={16} />
                    )}
                  </button>
                ))}
            </div>
            {formError && (
              <p className="trip-error" role="alert">
                {formError}
              </p>
            )}
            <button className="button trip-build-button" type="submit">
              {plan ? "Rebuild the route" : "Build my journey"}
              <ArrowUpRight size={17} />
            </button>
            <p className="trip-hint">
              {plan
                ? "Rebuilding replaces your day edits. Saved copies stay in your library."
                : "Suggestions use real places and activities from the linked tourism sources. No booking is made."}
            </p>
          </form>
          <div className="trip-seeds">
            <Eyebrow>START WITH A FIELD GUIDE ROUTE</Eyebrow>
            {tripSeeds.map((seed) => (
              <Link key={seed.id} href={`/trip-planner?itinerary=${seed.id}`}>
                <span>
                  {seed.title}
                  <small>
                    {seed.days} days · {seed.stops.length} bases
                  </small>
                </span>
                <ArrowUpRight size={16} />
              </Link>
            ))}
          </div>
        </aside>
        <section
          id="travel-notebook"
          className="trip-canvas"
          ref={result}
          tabIndex={-1}
          aria-label="Your editable itinerary"
        >
          <p
            role="status"
            className={`trip-status ${message ? "has-message" : ""}`}
          >
            {message}
          </p>
          {plan ? (
            <>
              <div className="trip-title">
                <Eyebrow>02 / YOUR TRAVEL NOTEBOOK</Eyebrow>
                <label className="sr-only" htmlFor="trip-name">
                  Trip name
                </label>
                <input
                  id="trip-name"
                  value={plan.name}
                  maxLength={100}
                  onChange={(e) => setPlan({ ...plan, name: e.target.value })}
                />
                <p>
                  {plan.days} days · {plan.travellers}{" "}
                  {plan.travellers === 1 ? "traveller" : "travellers"} ·{" "}
                  {plan.pace} pace
                  {plan.startDate
                    ? ` · ${showDate(plan.startDate)} — ${showDate(dateForDay(plan.startDate, plan.days - 1))}`
                    : ""}
                </p>
                <span className="trip-local-state">
                  {storageError
                    ? "Autosave unavailable; download a copy."
                    : "Draft saved automatically in this browser"}
                </span>
              </div>
              <div className="trip-toolbar">
                <button className="button button-outline" onClick={save}>
                  <Save size={15} />
                  Save trip
                </button>
                <button className="button button-outline" onClick={share}>
                  <Share2 size={15} />
                  Share
                </button>
                <button
                  className="button button-outline"
                  onClick={() => window.print()}
                >
                  <Printer size={15} />
                  Print / PDF
                </button>
                <button
                  className="button button-outline"
                  onClick={() =>
                    download(
                      "kerala-journey.json",
                      JSON.stringify(plan, null, 2),
                      "application/json",
                    )
                  }
                >
                  <Download size={15} />
                  JSON
                </button>
                <button
                  className="button button-outline"
                  onClick={() => {
                    try {
                      download(
                        "kerala-journey.ics",
                        tripCalendar(plan),
                        "text/calendar;charset=utf-8",
                      );
                      setMessage(
                        "Calendar downloaded. Days are all-day events; activity bookings are not confirmed.",
                      );
                    } catch (e) {
                      setMessage((e as Error).message);
                    }
                  }}
                >
                  <Download size={15} />
                  Calendar
                </button>
              </div>
              {shareUrl && (
                <label className="share-field">
                  Share this trip
                  <input
                    readOnly
                    value={shareUrl}
                    onFocus={(e) => e.target.select()}
                  />
                </label>
              )}
              <div className="route-strip" aria-label="Journey route">
                {route.map((id, index) => (
                  <span key={`${index}-${id}`}>
                    <MapPin size={13} />
                    {baseById(id)!.name}
                    {index < route.length - 1 && <ArrowUpRight size={13} />}
                  </span>
                ))}
              </div>
              <div className="route-report">
                <div>
                  <Eyebrow>
                    <Route size={13} /> ROAD NOTES
                  </Eyebrow>
                  {plan.transport === "public" ? (
                    <p>
                      Plan train, bus, and local connections separately.
                      Timetables and fares are not available in this guide.
                    </p>
                  ) : roadLoading ? (
                    <p role="status">Checking the road route…</p>
                  ) : roads?.error ? (
                    <p>{roads.error}</p>
                  ) : roads?.legs?.length ? (
                    <>
                      <ul>
                        {roads.legs.map((leg, index) => (
                          <li key={index}>
                            <span>
                              {baseById(leg.from)!.name} →{" "}
                              {baseById(leg.to)!.name}
                            </span>
                            <strong>
                              {leg.km} km · ~{Math.floor(leg.minutes / 60)}h{" "}
                              {leg.minutes % 60}m
                            </strong>
                          </li>
                        ))}
                      </ul>
                      <p>
                        Driving estimates from{" "}
                        <a
                          href="https://project-osrm.org/"
                          target="_blank"
                          rel="noreferrer"
                        >
                          OSRM
                        </a>{" "}
                        / ©{" "}
                        <a
                          href="https://www.openstreetmap.org/copyright"
                          target="_blank"
                          rel="noreferrer"
                        >
                          OpenStreetMap
                        </a>
                        . Add breaks and weather delays. No live traffic or
                        closure data.
                      </p>
                      {roads.legs.some((leg) => leg.minutes > 240) && (
                        <p className="trip-warning">
                          A leg exceeds four hours. Consider a rest day or
                          another overnight stop.
                        </p>
                      )}
                    </>
                  ) : (
                    <p>One base. More time to settle in.</p>
                  )}
                </div>
                <div>
                  {mapUrl && (
                    <a
                      href={mapUrl}
                      className="text-link"
                      target="_blank"
                      rel="noreferrer"
                    >
                      Open directions
                      <ArrowUpRight size={15} />
                    </a>
                  )}
                  <button
                    className="text-link"
                    onClick={() => setRefresh((n) => n + 1)}
                    disabled={roadLoading || weatherLoading}
                  >
                    <RotateCcw size={14} />
                    Refresh travel data
                  </button>
                </div>
              </div>
              <div className="trip-days">
                {plan.dayPlans.map((day, index) => {
                  const base = baseById(day.base)!;
                  const transfer =
                    index > 0 && plan.dayPlans[index - 1].base !== day.base;
                  return (
                    <article className="trip-day" key={index}>
                      <div className="trip-day-rail">
                        <span>DAY</span>
                        <strong>{String(index + 1).padStart(2, "0")}</strong>
                        <small>
                          {showDate(dateForDay(plan.startDate, index))}
                        </small>
                      </div>
                      <div className="trip-day-content">
                        <div className="trip-day-heading">
                          <label>
                            <span className="sr-only">
                              Base for day {index + 1}
                            </span>
                            <select
                              value={day.base}
                              onChange={(e) =>
                                updateDay(index, {
                                  base: e.target.value,
                                  activities: [],
                                  notes: day.notes,
                                })
                              }
                            >
                              {travelBases.map((b) => (
                                <option key={b.id} value={b.id}>
                                  {b.name}
                                </option>
                              ))}
                            </select>
                          </label>
                          <div>
                            <button
                              className="icon-button"
                              disabled={index === 0}
                              aria-label={`Move day ${index + 1} earlier`}
                              onClick={() => moveDay(index, -1)}
                            >
                              <ArrowUp size={15} />
                            </button>
                            <button
                              className="icon-button"
                              disabled={index === plan.days - 1}
                              aria-label={`Move day ${index + 1} later`}
                              onClick={() => moveDay(index, 1)}
                            >
                              <ArrowDown size={15} />
                            </button>
                          </div>
                        </div>
                        <p className="trip-day-description">
                          {transfer && (
                            <span className="transfer-label">
                              TRAVEL DAY ·{" "}
                            </span>
                          )}
                          {base.description}
                        </p>
                        <ul className="trip-activities">
                          {day.activities.map((activity, i) => (
                            <li key={`${i}-${activity}`}>
                              <span>{activity}</span>
                              <button
                                className="icon-button"
                                aria-label={`Remove activity ${i + 1} from day ${index + 1}`}
                                onClick={() =>
                                  updateDay(index, {
                                    activities: day.activities.filter(
                                      (_, j) => i !== j,
                                    ),
                                  })
                                }
                              >
                                <Trash2 size={14} />
                              </button>
                            </li>
                          ))}
                        </ul>
                        {!day.activities.length && (
                          <p className="trip-hint">
                            An open day. Add something below, or leave room for
                            the unexpected.
                          </p>
                        )}
                        {day.activities.length < 10 && (
                          <>
                            <label className="activity-select">
                              <span className="sr-only">
                                Add a suggested activity to day {index + 1}
                              </span>
                              <select
                                value=""
                                onChange={(e) => {
                                  if (e.target.value)
                                    updateDay(index, {
                                      activities: [
                                        ...day.activities,
                                        e.target.value,
                                      ],
                                    });
                                }}
                              >
                                <option value="">
                                  + Add a local suggestion
                                </option>
                                {base.activities
                                  .filter((a) => !day.activities.includes(a))
                                  .map((a) => (
                                    <option key={a}>{a}</option>
                                  ))}
                              </select>
                            </label>
                            <div className="custom-activity">
                              <label
                                className="sr-only"
                                htmlFor={`custom-${index}`}
                              >
                                Your own activity for day {index + 1}
                              </label>
                              <input
                                id={`custom-${index}`}
                                placeholder="Or add your own activity…"
                                maxLength={300}
                                value={custom[index] || ""}
                                onChange={(e) =>
                                  setCustom({
                                    ...custom,
                                    [index]: e.target.value,
                                  })
                                }
                              />
                              <button
                                className="icon-button"
                                aria-label={`Add your activity to day ${index + 1}`}
                                disabled={!custom[index]?.trim()}
                                onClick={() => {
                                  updateDay(index, {
                                    activities: [
                                      ...day.activities,
                                      custom[index].trim(),
                                    ],
                                  });
                                  setCustom({ ...custom, [index]: "" });
                                }}
                              >
                                <Plus size={17} />
                              </button>
                            </div>
                          </>
                        )}
                        <label className="day-note">
                          Your notes
                          <textarea
                            rows={2}
                            maxLength={2000}
                            value={day.notes}
                            placeholder="A café, a reservation, a small detour…"
                            onChange={(e) =>
                              updateDay(index, { notes: e.target.value })
                            }
                          />
                        </label>
                        {base.practical && (
                          <p className="practical-note">{base.practical}</p>
                        )}
                        <div className="day-sources">
                          <Link className="text-link" href={base.href}>
                            Explore this place
                            <ArrowUpRight size={13} />
                          </Link>
                          <a
                            href={base.source}
                            target="_blank"
                            rel="noreferrer"
                            className="text-link"
                          >
                            Tourism source
                            <ArrowUpRight size={13} />
                          </a>
                          {base.booking && (
                            <a
                              href={base.booking}
                              target="_blank"
                              rel="noreferrer"
                              className="text-link"
                            >
                              Tickets / access
                              <ArrowUpRight size={13} />
                            </a>
                          )}
                        </div>
                      </div>
                    </article>
                  );
                })}
              </div>
              <div className="trip-bottom-grid">
                <section className="budget-sheet">
                  <Eyebrow>03 / KEEP THE NUMBERS REAL</Eyebrow>
                  <h2>Your budget, your quotes.</h2>
                  <p>
                    Add your own quotes in rupees. Blank fields are not
                    included; these are not live market prices.
                  </p>
                  <div className="budget-fields">
                    {(
                      [
                        ["room", "Per room / night"],
                        ["food", "Food per person / day"],
                        ["transport", "Transport total, whole group"],
                        ["activities", "Activities total, whole group"],
                      ] as const
                    ).map(([key, label]) => (
                      <label key={key}>
                        {label}
                        <div>
                          <span aria-hidden="true">₹</span>
                          <input
                            type="number"
                            inputMode="decimal"
                            min="0"
                            max="10000000"
                            placeholder="Add quote"
                            value={plan.costs[key] || ""}
                            onChange={(e) =>
                              setPlan({
                                ...plan,
                                costs: {
                                  ...plan.costs,
                                  [key]: Math.max(
                                    0,
                                    Math.min(
                                      10000000,
                                      Number(e.target.value) || 0,
                                    ),
                                  ),
                                },
                              })
                            }
                          />
                        </div>
                      </label>
                    ))}
                  </div>
                  <p className="trip-hint">
                    {totals!.rooms} {totals!.rooms === 1 ? "room" : "rooms"} ×{" "}
                    {totals!.nights} nights, two people per room. Food covers{" "}
                    {plan.days} days. Add flights, taxes, and extras to your
                    quoted totals.
                  </p>
                  <div className="budget-total">
                    <span>
                      Quoted subtotal<strong>{money(totals!.total)}</strong>
                    </span>
                    <span>
                      Per traveller<strong>{money(totals!.perPerson)}</strong>
                    </span>
                  </div>
                </section>
                <section className="weather-sheet">
                  <Eyebrow>
                    <CloudSun size={14} /> A LOOK AT THE SKY
                  </Eyebrow>
                  <h2>Leave room for weather.</h2>
                  <label>
                    Forecast base
                    <select
                      value={weatherBase}
                      onChange={(e) => setWeatherBase(e.target.value)}
                    >
                      {Array.from(
                        new Set(
                          plan.dayPlans
                            .map((day) => day.base)
                            .concat(weatherBase),
                        ),
                      ).map((id) => (
                        <option key={id} value={id}>
                          {baseById(id)!.name}
                        </option>
                      ))}
                    </select>
                  </label>
                  {weatherLoading ? (
                    <p role="status">Fetching the forecast…</p>
                  ) : weather?.error ? (
                    <p>{weather.error}</p>
                  ) : weatherDays.length ? (
                    <>
                      <p className="trip-hint">
                        {plan.startDate
                          ? "Forecast for your dates at this base"
                          : "Next available days · add a trip date to match your journey"}
                      </p>
                      <div className="forecast-days">
                        {weatherDays.map((day) => (
                          <div key={day.date}>
                            <span>{showDate(day.date)}</span>
                            <strong>
                              {day.high === null
                                ? "—"
                                : `${Math.round(day.high)}°`}
                              <small>
                                {" "}
                                /{" "}
                                {day.low === null
                                  ? "—"
                                  : `${Math.round(day.low)}°`}
                              </small>
                            </strong>
                            <span>
                              {day.rain === null
                                ? "Rain data unavailable"
                                : `${day.rain}% rain chance`}
                            </span>
                          </div>
                        ))}
                      </div>
                    </>
                  ) : (
                    <p>
                      The forecast is not yet available for these trip dates.
                      Open-Meteo provides up to 16 days ahead.
                    </p>
                  )}
                  {weather?.checkedAt && (
                    <p className="trip-hint">
                      Retrieved{" "}
                      {new Date(weather.checkedAt).toLocaleString("en-IN", {
                        timeZone: "Asia/Kolkata",
                      })}{" "}
                      IST ·{" "}
                      <a
                        href="https://open-meteo.com/"
                        target="_blank"
                        rel="noreferrer"
                      >
                        Open-Meteo
                      </a>{" "}
                      · Forecasts can change.
                    </p>
                  )}
                  <a
                    className="text-link"
                    href="https://mausam.imd.gov.in/"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Official IMD warnings
                    <ArrowUpRight size={14} />
                  </a>
                </section>
              </div>
              <p className="trip-source-note">
                Place references checked {GUIDE_CHECKED_AT}. These are flexible
                suggestions, not reservations or confirmed opening dates. Check
                operators before travel. Road estimates and weather are fetched
                separately from the services credited above.
              </p>
            </>
          ) : (
            <div className="trip-empty">
              <span className="trip-empty-mark">ക</span>
              <Eyebrow>A NOTEBOOK, WAITING TO BE FILLED</Eyebrow>
              <h2>
                Less ticking boxes.
                <br />
                <em>More being there.</em>
              </h2>
              <p>
                Choose your stops on the left. We’ll make room for them across
                your days, with local suggestions you can change.
              </p>
              <div>
                <span>16 real planning bases</span>
                <span>1–21 days</span>
                <span>Every day editable</span>
              </div>
            </div>
          )}
          <section className="saved-trips">
            <div>
              <Eyebrow>YOUR LITTLE COLLECTION</Eyebrow>
              <h2>Journeys to come back to.</h2>
            </div>
            <button
              className="text-link"
              onClick={() => fileInput.current?.click()}
            >
              <Upload size={15} />
              Import trip
            </button>
            <input
              className="sr-only"
              ref={fileInput}
              type="file"
              accept="application/json,.json"
              onChange={(e) => importTrip(e.target.files?.[0])}
              aria-label="Import a saved trip JSON file"
            />
            {!saved.length ? (
              <p>
                No saved journeys yet. Save a route above, or import a
                downloaded trip.
              </p>
            ) : (
              <ul>
                {saved.map((item) => (
                  <li key={item.id}>
                    <button
                      onClick={() => {
                        apply(item.plan);
                        setMessage("Saved trip opened.");
                      }}
                    >
                      <strong>{item.plan.name || "Untitled journey"}</strong>
                      <span>
                        {item.plan.days} days · {item.plan.travellers}{" "}
                        travellers
                      </span>
                    </button>
                    <button
                      className="icon-button"
                      aria-label={`Delete saved ${item.plan.name}`}
                      onClick={() => {
                        const next = saved.filter((s) => s.id !== item.id);
                        try {
                          localStorage.setItem(
                            "kerala-trips-v1",
                            JSON.stringify(next),
                          );
                          setSaved(next);
                          setMessage("Saved copy removed.");
                        } catch {
                          setMessage("Could not update the saved collection.");
                        }
                      }}
                    >
                      <Trash2 size={15} />
                    </button>
                  </li>
                ))}
              </ul>
            )}
            <p className="trip-hint">
              Up to eight saved trips in this browser. Download a JSON copy to
              keep or transfer a trip.
            </p>
          </section>
        </section>
      </div>
    </>
  );
}
export default function TripPlannerPage() {
  return (
    <Suspense
      fallback={
        <PageIntro
          label="YOUR KERALA JOURNEY"
          title="Make room for wonder."
          description="Opening your travel notebook…"
        />
      }
    >
      <Planner />
    </Suspense>
  );
}

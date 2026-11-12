import { baseById } from "@/data/travel-guide";

export type Pace = "slow" | "balanced" | "active";
export type TripDay = { base: string; activities: string[]; notes: string };
export type TripCosts = {
  room: number;
  food: number;
  transport: number;
  activities: number;
};
export type TripPlan = {
  version: 1;
  name: string;
  days: number;
  startDate: string;
  travellers: number;
  pace: Pace;
  transport: "car" | "public";
  stops: string[];
  dayPlans: TripDay[];
  costs: TripCosts;
};
export const initialCosts: TripCosts = {
  room: 0,
  food: 0,
  transport: 0,
  activities: 0,
};
export function validDate(value: string): boolean {
  if (value === "") return true;
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
  const date = new Date(`${value}T12:00:00Z`);
  return (
    Number.isFinite(date.getTime()) && date.toISOString().slice(0, 10) === value
  );
}
export function dateForDay(start: string, index: number) {
  if (!start || !validDate(start)) return "";
  const date = new Date(`${start}T12:00:00Z`);
  date.setUTCDate(date.getUTCDate() + index);
  return date.toISOString().slice(0, 10);
}
export function buildTrip(
  input: Omit<TripPlan, "version" | "dayPlans" | "costs">,
): TripPlan {
  if (!Number.isInteger(input.days) || input.days < 1 || input.days > 21)
    throw new Error("Choose a whole number from 1 to 21 days.");
  if (
    !Number.isInteger(input.travellers) ||
    input.travellers < 1 ||
    input.travellers > 12
  )
    throw new Error("Choose 1 to 12 travellers.");
  if (!validDate(input.startDate))
    throw new Error("Choose a valid start date.");
  if (
    !["slow", "balanced", "active"].includes(input.pace) ||
    !["car", "public"].includes(input.transport)
  )
    throw new Error("Choose a valid pace and transport.");
  if (
    !input.stops.length ||
    input.stops.some((id) => !baseById(id)) ||
    new Set(input.stops).size !== input.stops.length
  )
    throw new Error("Choose distinct stops from the guide.");
  if (input.stops.length > input.days)
    throw new Error(
      `You have ${input.stops.length} stops for ${input.days} ${input.days === 1 ? "day" : "days"}. Add days or remove a stop.`,
    );
  const dayPlans: TripDay[] = [];
  input.stops.forEach((id, index) => {
    const nights =
      Math.floor(input.days / input.stops.length) +
      (index < input.days % input.stops.length ? 1 : 0);
    const base = baseById(id)!;
    const perDay = input.pace === "slow" ? 1 : input.pace === "active" ? 3 : 2;
    for (let day = 0; day < nights; day++) {
      const transfer = index > 0 && day === 0;
      const offset = day * perDay;
      dayPlans.push({
        base: id,
        activities: base.activities.slice(
          offset,
          offset + (transfer ? 1 : perDay),
        ),
        notes: transfer
          ? "Allow time to travel here. Adjust activities after checking the road estimate."
          : "",
      });
    }
  });
  return {
    ...input,
    name: input.name.trim().slice(0, 100) || "My Kerala journey",
    version: 1,
    dayPlans,
    costs: { ...initialCosts },
  };
}
export function parseTrip(value: unknown): TripPlan | null {
  try {
    if (!value || typeof value !== "object") return null;
    const p = value as TripPlan;
    if (
      p.version !== 1 ||
      typeof p.name !== "string" ||
      p.name.length > 100 ||
      typeof p.startDate !== "string"
    )
      return null;
    buildTrip(p);
    if (!Array.isArray(p.dayPlans) || p.dayPlans.length !== p.days || !p.costs)
      return null;
    if (
      !p.dayPlans.every(
        (day) =>
          day &&
          baseById(day.base) &&
          Array.isArray(day.activities) &&
          day.activities.length <= 10 &&
          day.activities.every(
            (a) => typeof a === "string" && a.length <= 300,
          ) &&
          typeof day.notes === "string" &&
          day.notes.length <= 2000,
      )
    )
      return null;
    if (
      !Object.values(initialCosts).length ||
      !(["room", "food", "transport", "activities"] as const).every(
        (key) =>
          Number.isFinite(p.costs[key]) &&
          p.costs[key] >= 0 &&
          p.costs[key] <= 10000000,
      )
    )
      return null;
    return {
      version: 1,
      name: p.name,
      days: p.days,
      startDate: p.startDate,
      travellers: p.travellers,
      pace: p.pace,
      transport: p.transport,
      stops: [...p.stops],
      dayPlans: p.dayPlans.map((day) => ({
        base: day.base,
        activities: [...day.activities],
        notes: day.notes,
      })),
      costs: {
        room: p.costs.room,
        food: p.costs.food,
        transport: p.costs.transport,
        activities: p.costs.activities,
      },
    };
  } catch {
    return null;
  }
}
export const routeStops = (plan: TripPlan) =>
  plan.dayPlans
    .map((day) => day.base)
    .filter((id, index, all) => !index || id !== all[index - 1]);
export function budgetTotal(plan: TripPlan) {
  const nights = Math.max(0, plan.days - 1),
    rooms = Math.ceil(plan.travellers / 2);
  const stay = plan.costs.room * nights * rooms,
    food = plan.costs.food * plan.days * plan.travellers;
  const total = stay + food + plan.costs.transport + plan.costs.activities;
  return {
    nights,
    rooms,
    stay,
    food,
    total,
    perPerson: total / plan.travellers,
  };
}
export function shareTrip(plan: TripPlan): string {
  return encodeURIComponent(JSON.stringify(plan));
}
export function readSharedTrip(value: string): TripPlan | null {
  if (value.length > 60000) return null;
  try {
    return parseTrip(JSON.parse(value));
  } catch {
    try {
      return parseTrip(JSON.parse(decodeURIComponent(value)));
    } catch {
      return null;
    }
  }
}
const icsText = (value: string) =>
  value
    .replace(/\\/g, "\\\\")
    .replace(/;/g, "\\;")
    .replace(/,/g, "\\,")
    .replace(/\r?\n/g, "\\n");
export function tripCalendar(plan: TripPlan): string {
  if (!plan.startDate || !validDate(plan.startDate))
    throw new Error("Add a start date before exporting your calendar.");
  const lines = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Kerala Field Guide//Trip Planner//EN",
    "CALSCALE:GREGORIAN",
    `X-WR-CALNAME:${icsText(plan.name || "My Kerala journey")}`,
  ];
  // Keep re-exports stable without making different named trips overwrite each other.
  const identity = Array.from(plan.name).reduce(
    (hash, char) => (Math.imul(hash, 31) + char.codePointAt(0)!) | 0,
    0,
  );
  plan.dayPlans.forEach((day, index) => {
    const date = dateForDay(plan.startDate, index).replace(/-/g, ""),
      end = dateForDay(plan.startDate, index + 1).replace(/-/g, "");
    lines.push(
      "BEGIN:VEVENT",
      `UID:kerala-${Math.abs(identity).toString(36)}-${date}-${index}-${day.base}@fieldguide.local`,
      `DTSTAMP:${new Date()
        .toISOString()
        .replace(/[-:]/g, "")
        .replace(/\.\d+Z/, "Z")}`,
      `DTSTART;VALUE=DATE:${date}`,
      `DTEND;VALUE=DATE:${end}`,
      `SUMMARY:${icsText(`Day ${index + 1} · ${baseById(day.base)!.name}`)}`,
      `LOCATION:${icsText(`${baseById(day.base)!.name}, Kerala, India`)}`,
      `DESCRIPTION:${icsText([...day.activities, day.notes, "Suggested plan; confirm all bookings."].filter(Boolean).join("\n"))}`,
      "END:VEVENT",
    );
  });
  lines.push("END:VCALENDAR");
  // Fold UTF-8 content lines at <=75 octets, as required by RFC 5545.
  return (
    lines
      .flatMap((line) => {
        const parts: string[] = [];
        let part = "";
        for (const char of line) {
          if (new TextEncoder().encode(part + char).length > 73) {
            parts.push(part);
            part = " " + char;
          } else part += char;
        }
        parts.push(part);
        return parts;
      })
      .join("\r\n") + "\r\n"
  );
}

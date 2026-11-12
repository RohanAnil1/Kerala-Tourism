import { NextRequest, NextResponse } from "next/server";
import { baseById } from "@/data/travel-guide";

export const dynamic = "force-dynamic";
export async function GET(request: NextRequest) {
  const kind = request.nextUrl.searchParams.get("kind");
  const ids = (request.nextUrl.searchParams.get("stops") || "")
    .split(",")
    .filter(Boolean);
  if (
    !["roads", "weather"].includes(kind || "") ||
    !ids.length ||
    ids.length > 21 ||
    ids.some((id) => !baseById(id))
  )
    return NextResponse.json(
      { error: "Choose valid places from the Kerala guide." },
      { status: 400 },
    );
  const checkedAt = new Date().toISOString();
  try {
    if (kind === "roads") {
      if (ids.length === 1)
        return NextResponse.json({
          kind,
          checkedAt,
          legs: [],
          source: "https://project-osrm.org/",
        });
      const coordinates = ids
        .map((id) => {
          const b = baseById(id)!;
          return `${b.lng},${b.lat}`;
        })
        .join(";");
      const response = await fetch(
        `https://router.project-osrm.org/route/v1/driving/${coordinates}?overview=false&steps=false`,
        { signal: AbortSignal.timeout(10000), cache: "no-store" },
      );
      if (!response.ok)
        throw new Error("Road estimates are temporarily unavailable.");
      const data = await response.json();
      if (
        data.code !== "Ok" ||
        data.routes?.[0]?.legs?.length !== ids.length - 1
      )
        throw new Error("A road route could not be found for these stops.");
      const legs = data.routes[0].legs.map(
        (leg: { distance: number; duration: number }, index: number) => ({
          from: ids[index],
          to: ids[index + 1],
          km: Math.round(leg.distance / 1000),
          minutes: Math.round(leg.duration / 60),
        }),
      );
      if (
        legs.some(
          (leg: { km: number; minutes: number }) =>
            !Number.isFinite(leg.km) || !Number.isFinite(leg.minutes),
        )
      )
        throw new Error("Road estimates are unavailable.");
      return NextResponse.json({
        kind,
        checkedAt,
        legs,
        source: "https://project-osrm.org/",
        note: "OSRM driving estimates using OpenStreetMap. No live traffic, stops, road closures, or public transport schedules.",
      });
    }
    const base = baseById(ids[0])!;
    const response = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${base.lat}&longitude=${base.lng}&daily=temperature_2m_max,temperature_2m_min,precipitation_probability_max,weather_code&timezone=Asia%2FKolkata&forecast_days=16`,
      { signal: AbortSignal.timeout(10000), cache: "no-store" },
    );
    if (!response.ok)
      throw new Error("The weather service is temporarily unavailable.");
    const data = await response.json(),
      daily = data.daily;
    if (!Array.isArray(daily?.time))
      throw new Error("The weather forecast is unavailable.");
    const forecasts = daily.time.map((date: string, index: number) => ({
      date,
      high: daily.temperature_2m_max?.[index] ?? null,
      low: daily.temperature_2m_min?.[index] ?? null,
      rain: daily.precipitation_probability_max?.[index] ?? null,
      code: daily.weather_code?.[index] ?? null,
    }));
    return NextResponse.json({
      kind,
      checkedAt,
      base: base.id,
      forecasts,
      source: "https://open-meteo.com/",
      note: "Open-Meteo forecast, Asia/Kolkata. Forecasts can change; check IMD for official warnings.",
    });
  } catch (error) {
    return NextResponse.json(
      {
        error:
          error instanceof Error && error.name !== "TimeoutError"
            ? error.message
            : "The travel data service timed out. Try again shortly.",
        checkedAt,
      },
      { status: 502 },
    );
  }
}

'use client';

import { useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, useReducedMotion } from 'framer-motion';
import { CloudRain, ShieldCheck, Umbrella, Route, Zap, MapPin, Download, BarChart3, ExternalLink } from 'lucide-react';
import { destinations, districts } from '@/data/destinations';

const MONSOON_CHECKLIST = [
  'Light rain jacket and quick-dry clothes',
  'Waterproof footwear with grip',
  'Phone pouch and backup power bank',
  'Basic medicines, ORS, and mosquito repellent',
  'Flexible transport and stay bookings',
  'Early-day sightseeing schedule',
  'Offline map backup and emergency contacts',
  'District weather and advisory check every morning',
];

function monsoonSuitabilityScore(destination: (typeof destinations)[number]): number {
  let score = 60;

  if (destination.type.includes('backwater')) score += 18;
  if (destination.type.includes('wildlife')) score += 12;
  if (destination.type.includes('hill')) score += 10;
  if (destination.type.includes('beach')) score -= 10;

  if (destination.crowdLevel === 'low') score += 8;
  if (destination.crowdLevel === 'high') score -= 6;

  return Math.max(35, Math.min(98, score));
}

const DISTRICT_RAINFALL_MM: Record<string, number> = {
  thiruvananthapuram: 1726,
  kollam: 2448,
  pathanamthitta: 3030,
  alappuzha: 2770,
  kottayam: 3175,
  idukki: 3270,
  ernakulam: 3370,
  thrissur: 3155,
  palakkad: 2200,
  malappuram: 2940,
  kozhikode: 3290,
  wayanad: 3450,
  kannur: 3438,
  kasaragod: 3550,
};

function getRainfallBySlug(slug: string): number {
  return DISTRICT_RAINFALL_MM[slug] || 2800;
}

export default function MonsoonModePage() {
  const reduceMotion = useReducedMotion();
  const topMonsoonDestinations = useMemo(() => {
    return [...destinations]
      .map((destination) => ({ destination, score: monsoonSuitabilityScore(destination) }))
      .sort((a, b) => b.score - a.score)
      .slice(0, 8);
  }, []);

  const districtMonsoonIntelligence = useMemo(() => {
    return districts.map((district) => {
      const districtDestinations = destinations.filter((destination) => destination.districtSlug === district.slug);
      const total = districtDestinations.length || 1;
      const avgScore = Math.round(
        districtDestinations.reduce((acc, destination) => acc + monsoonSuitabilityScore(destination), 0) / total
      );
      const lowCrowdPct = Math.round(
        (districtDestinations.filter((destination) => destination.crowdLevel === 'low').length / total) * 100
      );
      const monsoonFriendlyCount = districtDestinations.filter((destination) => {
        return destination.type.includes('backwater') || destination.type.includes('hill') || destination.type.includes('wildlife');
      }).length;

      return {
        slug: district.slug,
        district: district.name,
        rainfallMm: getRainfallBySlug(district.slug),
        avgScore,
        lowCrowdPct,
        monsoonFriendlyCount,
        destinationsCount: districtDestinations.length,
        topDestination: districtDestinations
          .map((destination) => ({ ...destination, score: monsoonSuitabilityScore(destination) }))
          .sort((a, b) => b.score - a.score)[0],
      };
    });
  }, []);

  const downloadChecklistPdf = () => {
    const popup = window.open('', '_blank', 'width=900,height=900');
    if (!popup) return;

    const checklistHtml = MONSOON_CHECKLIST.map((item) => `<li style=\"margin:10px 0;\">${item}</li>`).join('');
    popup.document.write(`
      <html>
        <head>
          <title>Kerala Monsoon Checklist</title>
        </head>
        <body style="font-family: Arial, sans-serif; padding: 32px; color: #0f172a;">
          <h1 style="margin: 0 0 8px 0;">Kerala Monsoon Travel Checklist</h1>
          <p style="margin: 0 0 20px 0; color: #475569;">Save as PDF from the print dialog.</p>
          <ol style="padding-left: 20px; line-height: 1.6;">${checklistHtml}</ol>
          <p style="margin-top: 28px; color: #64748b; font-size: 12px;">Generated from Kerala Tourism Monsoon Mode</p>
        </body>
      </html>
    `);
    popup.document.close();
    popup.focus();
    popup.print();
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <section className="relative h-[50vh] min-h-[400px] md:h-[52vh] md:min-h-[420px] overflow-hidden">
        <Image
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/33/Monsoon_clouds_over_Alappuzha.jpg/1280px-Monsoon_clouds_over_Alappuzha.jpg"
          alt="Kerala monsoon travel"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/45 to-gray-50 dark:to-gray-950" />
        <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-end pb-14">
          <div>
            <span className="inline-flex items-center gap-2 glass rounded-full px-4 py-2 text-white text-sm mb-5">
              <CloudRain size={14} /> Monsoon Travel Mode
            </span>
            <h1 className="font-display text-4xl md:text-6xl text-white font-bold leading-tight">
              Rain-Ready
              <span className="block text-kerala-gold">Kerala Explorer</span>
            </h1>
            <p className="text-white/75 mt-4 max-w-2xl text-base md:text-lg">
              Smart recommendations for safer routes, cozy stays, and high-value experiences during Kerala monsoon.
            </p>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 16 }}
          whileInView={reduceMotion ? {} : { opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={reduceMotion ? { duration: 0 } : { duration: 0.45 }}
          className="grid md:grid-cols-3 gap-5 mb-10"
        >
          <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200/70 dark:border-gray-800/70 p-5">
            <p className="inline-flex items-center gap-2 text-sm font-semibold text-kerala-green mb-2"><ShieldCheck size={14} /> Travel Safety</p>
            <p className="text-sm text-gray-600 dark:text-gray-300">Prioritize routes with low flood risk, morning starts, and backup stays near main roads.</p>
          </div>
          <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200/70 dark:border-gray-800/70 p-5">
            <p className="inline-flex items-center gap-2 text-sm font-semibold text-kerala-green mb-2"><Umbrella size={14} /> Packing Essentials</p>
            <p className="text-sm text-gray-600 dark:text-gray-300">Quick-dry clothes, light rain jacket, anti-slip footwear, waterproof phone pouch, ORS.</p>
          </div>
          <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200/70 dark:border-gray-800/70 p-5">
            <p className="inline-flex items-center gap-2 text-sm font-semibold text-kerala-green mb-2"><Route size={14} /> Route Strategy</p>
            <p className="text-sm text-gray-600 dark:text-gray-300">Keep same-district clusters, avoid late-night hill transfers, and reserve flexible transport.</p>
          </div>
        </motion.div>

        <div className="mb-8 flex justify-end">
          <button
            onClick={downloadChecklistPdf}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-kerala-green text-white text-sm font-semibold hover:bg-emerald-700 transition-colors"
          >
            <Download size={15} /> Download Monsoon Checklist (PDF)
          </button>
        </div>

        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 16 }}
          whileInView={reduceMotion ? {} : { opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={reduceMotion ? { duration: 0 } : { duration: 0.45, delay: 0.05 }}
          className="bg-white dark:bg-gray-900 rounded-3xl border border-gray-200/70 dark:border-gray-800/70 p-6 mb-10"
        >
          <h2 className="font-display text-3xl font-bold text-gray-900 dark:text-white mb-5">Top Monsoon-Suited Destinations</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {topMonsoonDestinations.map(({ destination, score }) => (
              <Link
                key={destination.id}
                href={`/destinations/${destination.slug}`}
                className="group block rounded-2xl overflow-hidden border border-gray-200/70 dark:border-gray-800/70 bg-gray-50 dark:bg-gray-800/30"
              >
                <div className="relative h-40">
                  <Image src={destination.images[0]} alt={destination.name} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 to-transparent" />
                  <div className="absolute bottom-3 left-3 text-white">
                    <p className="font-semibold text-sm">{destination.name}</p>
                    <p className="text-xs text-white/75 inline-flex items-center gap-1"><MapPin size={11} /> {destination.district}</p>
                  </div>
                </div>
                <div className="p-3">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-xs font-semibold text-gray-600 dark:text-gray-300">Monsoon Score</p>
                    <p className="text-sm font-bold text-kerala-green">{score}%</p>
                  </div>
                  <div className="h-2 rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden">
                    <div className="h-full rounded-full bg-gradient-to-r from-kerala-green to-emerald-400" style={{ width: `${score}%` }} />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </motion.div>

        <motion.section
          initial={reduceMotion ? false : { opacity: 0, y: 16 }}
          whileInView={reduceMotion ? {} : { opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={reduceMotion ? { duration: 0 } : { duration: 0.45, delay: 0.1 }}
          className="bg-white dark:bg-gray-900 rounded-3xl border border-gray-200/70 dark:border-gray-800/70 p-6 mb-10"
        >
          <div className="flex items-center justify-between gap-3 mb-5">
            <h2 className="font-display text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">District-wise Monsoon Intelligence</h2>
            <a
              href="https://mausam.imd.gov.in/"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1 text-xs text-kerala-green dark:text-emerald-400 font-medium hover:underline"
            >
              Climate source (IMD) <ExternalLink size={12} />
            </a>
          </div>

          <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-4">
            {districtMonsoonIntelligence.map((item) => (
              <article
                key={item.slug}
                className="rounded-2xl border border-gray-200/70 dark:border-gray-800/70 p-4 bg-gray-50 dark:bg-gray-800/30"
              >
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold text-gray-900 dark:text-white">{item.district}</h3>
                  <span className="text-xs rounded-full bg-kerala-green/10 text-kerala-green px-2.5 py-1 font-semibold">
                    {item.avgScore}% score
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs text-gray-600 dark:text-gray-300 mb-3">
                  <p className="rounded-lg bg-white dark:bg-gray-900 px-2 py-1.5 inline-flex items-center gap-1">
                    <CloudRain size={12} /> {item.rainfallMm} mm rain
                  </p>
                  <p className="rounded-lg bg-white dark:bg-gray-900 px-2 py-1.5 inline-flex items-center gap-1">
                    <BarChart3 size={12} /> {item.lowCrowdPct}% low-crowd
                  </p>
                  <p className="rounded-lg bg-white dark:bg-gray-900 px-2 py-1.5 inline-flex items-center gap-1">
                    <MapPin size={12} /> {item.destinationsCount} spots
                  </p>
                  <p className="rounded-lg bg-white dark:bg-gray-900 px-2 py-1.5 inline-flex items-center gap-1">
                    <Route size={12} /> {item.monsoonFriendlyCount} monsoon-fit
                  </p>
                </div>

                {item.topDestination ? (
                  <Link
                    href={`/destinations/${item.topDestination.slug}`}
                    className="block rounded-xl border border-kerala-green/20 bg-kerala-green/5 p-3 hover:bg-kerala-green/10 transition-colors"
                  >
                    <p className="text-[11px] text-gray-500 dark:text-gray-400 mb-1">Top pick in district</p>
                    <p className="font-semibold text-sm text-gray-900 dark:text-white">{item.topDestination.name}</p>
                    <p className="text-xs text-kerala-green font-medium mt-1">View destination</p>
                  </Link>
                ) : (
                  <p className="text-xs text-gray-500 dark:text-gray-400">Destination-level recommendations will appear as data is added.</p>
                )}
              </article>
            ))}
          </div>
        </motion.section>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white dark:bg-gray-900 rounded-3xl border border-gray-200/70 dark:border-gray-800/70 p-6">
            <h3 className="font-display text-2xl font-bold text-gray-900 dark:text-white mb-4 inline-flex items-center gap-2">
              <Zap size={18} className="text-kerala-gold" /> Rainy-Day Alternatives
            </h3>
            <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
              <li>• Museum loops in Kochi and Thiruvananthapuram</li>
              <li>• Ayurveda and wellness day sessions</li>
              <li>• Culinary trails and spice market walks</li>
              <li>• Indoor performing arts evenings</li>
            </ul>
          </div>
          <div className="bg-white dark:bg-gray-900 rounded-3xl border border-gray-200/70 dark:border-gray-800/70 p-6">
            <h3 className="font-display text-2xl font-bold text-gray-900 dark:text-white mb-4">Monsoon Booking Tips</h3>
            <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
              <li>• Choose stays with cancellation flexibility</li>
              <li>• Keep transport buffers between destinations</li>
              <li>• Check local advisories before hill drives</li>
              <li>• Prioritize early-day sightseeing blocks</li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}

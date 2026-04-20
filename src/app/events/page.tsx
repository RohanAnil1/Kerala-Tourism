'use client';

import { useMemo, useState } from 'react';
import Image from 'next/image';
import { motion, useReducedMotion } from 'framer-motion';
import { CalendarDays, MapPin, Sparkles, Filter, Ticket, ExternalLink } from 'lucide-react';
import { festivalEvents } from '@/data/festivals';

const monthLabels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const categoryLabels: Record<string, string> = {
  cultural: 'Cultural',
  religious: 'Religious',
  food: 'Food',
  'performing-arts': 'Performing Arts',
};

const EVENT_CATEGORY_IMAGE: Record<string, string> = {
  cultural: 'https://images.unsplash.com/photo-1593693397690-362cb9666fc2?w=1200',
  religious: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=1200',
  food: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=1200',
  'performing-arts': 'https://images.unsplash.com/photo-1697216654723-96c045d36ae0?w=1200',
};

const DISTRICT_PIN_POSITIONS: Record<string, { top: string; left: string }> = {
  Kasaragod: { top: '8%', left: '37%' },
  Kannur: { top: '16%', left: '40%' },
  Wayanad: { top: '20%', left: '30%' },
  Kozhikode: { top: '24%', left: '41%' },
  Malappuram: { top: '32%', left: '40%' },
  Palakkad: { top: '38%', left: '33%' },
  Thrissur: { top: '45%', left: '41%' },
  Ernakulam: { top: '54%', left: '44%' },
  Idukki: { top: '58%', left: '33%' },
  Kottayam: { top: '63%', left: '40%' },
  Alappuzha: { top: '69%', left: '44%' },
  Pathanamthitta: { top: '73%', left: '39%' },
  Kollam: { top: '81%', left: '43%' },
  Thiruvananthapuram: { top: '91%', left: '45%' },
};

export default function EventsPage() {
  const reduceMotion = useReducedMotion();
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);
  const [selectedDistrict, setSelectedDistrict] = useState('All Districts');

  const districts = useMemo(
    () => ['All Districts', ...Array.from(new Set(festivalEvents.map((e) => e.district)))],
    []
  );

  const visibleEvents = useMemo(() => {
    const byDistrict = (event: (typeof festivalEvents)[number]) => {
      return selectedDistrict === 'All Districts' || event.district === selectedDistrict || event.district === 'All Districts';
    };

    const exactMonth = festivalEvents.filter((event) => event.month === selectedMonth && byDistrict(event));
    if (exactMonth.length >= 6) {
      return exactMonth.slice(0, 10);
    }

    const withDistance = festivalEvents
      .filter(byDistrict)
      .map((event) => {
        const rawDiff = Math.abs(event.month - selectedMonth);
        const circularDiff = Math.min(rawDiff, 12 - rawDiff);
        return { event, circularDiff };
      })
      .sort((a, b) => a.circularDiff - b.circularDiff);

    return withDistance.slice(0, 10).map((item) => item.event);
  }, [selectedDistrict, selectedMonth]);

  const districtEventCounts = useMemo(() => {
    const counts = new Map<string, number>();
    visibleEvents
      .forEach((event) => {
        if (event.district !== 'All Districts') {
          counts.set(event.district, (counts.get(event.district) || 0) + 1);
        }
      });
    return counts;
  }, [visibleEvents]);

  const upcoming = useMemo(() => {
    return [...festivalEvents]
      .sort((a, b) => a.month - b.month)
      .slice(0, 4);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <section className="relative h-[48vh] min-h-[400px] md:h-[50vh] md:min-h-[420px] overflow-hidden">
        <Image
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/9f/Thrissur_Pooram_Festival_2.jpg/1280px-Thrissur_Pooram_Festival_2.jpg"
          alt="Kerala festival calendar"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/45 to-gray-50 dark:to-gray-950" />
        <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-end pb-14">
          <div>
            <span className="inline-flex items-center gap-2 glass rounded-full px-4 py-2 text-white text-sm mb-5">
              <CalendarDays size={14} /> Live Festival & Events Calendar
            </span>
            <h1 className="font-display text-4xl md:text-6xl text-white font-bold leading-tight">
              Kerala Event
              <span className="block text-kerala-gold">Season Planner</span>
            </h1>
            <p className="text-white/75 mt-4 max-w-2xl text-base md:text-lg">
              Find the best month-by-month festivals, arts events, and food celebrations across Kerala.
            </p>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="bg-white dark:bg-gray-900 rounded-3xl border border-gray-200/70 dark:border-gray-800/70 p-5 md:p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1 overflow-x-auto pb-1">
              <div className="flex gap-2 min-w-max">
                {monthLabels.map((label, idx) => {
                  const month = idx + 1;
                  const active = selectedMonth === month;
                  return (
                    <button
                      key={label}
                      onClick={() => setSelectedMonth(month)}
                      className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                        active
                          ? 'bg-kerala-green text-white shadow-lg shadow-kerala-green/20'
                          : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300'
                      }`}
                    >
                      {label}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto">
              <Filter size={16} className="text-gray-400" />
              <select
                value={selectedDistrict}
                onChange={(e) => setSelectedDistrict(e.target.value)}
                className="w-full sm:w-auto px-3 py-2 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-sm text-gray-700 dark:text-gray-200 outline-none"
              >
                {districts.map((district) => (
                  <option key={district} value={district}>{district}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-900 rounded-3xl border border-gray-200/70 dark:border-gray-800/70 p-6 mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-display text-2xl font-bold text-gray-900 dark:text-white">District Event Pin Map</h2>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              {monthLabels[selectedMonth - 1]} event activity overview
            </p>
          </div>

          <div className="grid lg:grid-cols-[1.2fr_1fr] gap-5">
            <div className="relative rounded-3xl bg-gradient-to-b from-emerald-50 to-cyan-50 dark:from-gray-800 dark:to-gray-900 border border-gray-200/70 dark:border-gray-700/70 overflow-hidden min-h-[420px]">
              <div className="absolute inset-0 opacity-30 bg-[radial-gradient(circle_at_20%_20%,#10b981_0,transparent_45%),radial-gradient(circle_at_80%_75%,#06b6d4_0,transparent_42%)]" />
              <div className="absolute inset-0 flex items-center justify-center p-8">
                <svg viewBox="0 0 300 760" className="h-full w-auto max-h-[360px] md:max-h-[390px]">
                  <path
                    d="M138 18c-9 19-11 39-6 58 6 22 4 38-8 59-12 21-17 38-13 58 3 16-1 31-11 48-14 24-20 41-18 61 2 22-5 41-19 65-13 23-17 42-12 61 4 15 1 30-9 47-14 25-16 46-5 66 12 22 10 39-6 66-13 22-16 41-10 59 8 22 24 37 48 42 21 4 41-1 58-14 17-13 34-21 53-24 19-3 37-12 53-28 15-14 24-32 26-52 2-18 11-34 28-52 15-16 22-33 21-53-1-20 6-37 21-56 15-19 21-37 19-57-2-20 3-39 16-60 12-20 17-38 14-56-3-19 2-37 15-58 12-20 17-38 14-55-4-22-17-37-39-44-20-6-39-3-56 10-18 13-36 20-55 22-18 2-35 10-49 24-14 14-22 31-24 51-2 19-12 37-29 57-16 18-23 36-22 56 1 21-5 39-19 58-15 20-21 39-20 59 1 22-5 42-19 65-15 25-19 45-12 63 7 18 4 35-9 55-12 18-18 34-18 51"
                    fill="rgba(16,185,129,0.28)"
                    stroke="rgba(5,150,105,0.7)"
                    strokeWidth="6"
                    strokeLinejoin="round"
                    strokeLinecap="round"
                  />
                </svg>
              </div>
              <div className="absolute inset-0">
                {Array.from(districtEventCounts.entries()).map(([district, count]) => {
                  const pin = DISTRICT_PIN_POSITIONS[district];
                  if (!pin) return null;
                  const isActiveDistrict = selectedDistrict !== 'All Districts' && selectedDistrict === district;
                  return (
                    <button
                      type="button"
                      key={district}
                      onClick={() => setSelectedDistrict(district)}
                      className="absolute -translate-x-1/2 -translate-y-1/2"
                      style={{ top: pin.top, left: pin.left }}
                    >
                      <div className={`relative ${isActiveDistrict ? 'scale-110' : ''}`}>
                        <span className={`inline-flex items-center justify-center w-8 h-8 rounded-full text-xs font-bold shadow-lg ${
                          isActiveDistrict
                            ? 'bg-kerala-green text-white'
                            : 'bg-white dark:bg-gray-900 text-kerala-green'
                        }`}>
                          {count}
                        </span>
                        <p className="mt-1 text-[11px] font-medium text-gray-700 dark:text-gray-200 whitespace-nowrap -translate-x-1/3">
                          {district}
                        </p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="space-y-2">
              {Array.from(districtEventCounts.entries())
                .sort((a, b) => b[1] - a[1])
                .map(([district, count]) => (
                  <button
                    key={district}
                    onClick={() => setSelectedDistrict(district)}
                    className={`w-full text-left rounded-xl px-3 py-2.5 border transition-all ${
                      selectedDistrict === district
                        ? 'border-kerala-green bg-kerala-green/10 text-kerala-green'
                        : 'border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50 text-gray-700 dark:text-gray-200'
                    }`}
                  >
                    <p className="text-sm font-semibold">{district}</p>
                    <p className="text-xs opacity-75">{count} active event{count > 1 ? 's' : ''}</p>
                  </button>
                ))}
            </div>
          </div>
        </div>

        {visibleEvents.length === 0 ? (
          <div className="text-center py-16 bg-white dark:bg-gray-900 rounded-3xl border border-dashed border-gray-300 dark:border-gray-700">
            <p className="text-5xl mb-4">📅</p>
            <h3 className="text-2xl font-display font-bold text-gray-900 dark:text-white">No events for this filter</h3>
            <p className="text-gray-500 dark:text-gray-400 mt-2">Try another month or district to discover active festivals.</p>
          </div>
        ) : (
          <div className="grid lg:grid-cols-2 gap-6">
            {visibleEvents.map((event, idx) => (
              <motion.article
                key={event.id}
                initial={reduceMotion ? false : { opacity: 0, y: 18 }}
                animate={reduceMotion ? {} : { opacity: 1, y: 0 }}
                transition={reduceMotion ? { duration: 0 } : { delay: idx * 0.06 }}
                className="bg-white dark:bg-gray-900 rounded-3xl overflow-hidden border border-gray-200/70 dark:border-gray-800/70 shadow-sm"
              >
                <div className="relative h-52">
                  <Image
                    src={EVENT_CATEGORY_IMAGE[event.category] || EVENT_CATEGORY_IMAGE.cultural}
                    alt={event.name}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                  <div className="absolute top-4 left-4 inline-flex items-center gap-1 rounded-full px-3 py-1 bg-white/90 text-gray-800 text-xs font-semibold">
                    <Sparkles size={12} /> {categoryLabels[event.category]}
                  </div>
                  <div className="absolute bottom-4 left-4 text-white">
                    <h3 className="font-display text-2xl font-bold">{event.name}</h3>
                    <p className="text-sm text-white/80">{event.dateLabel}</p>
                  </div>
                </div>
                <div className="p-5">
                  <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">{event.summary}</p>
                  <div className="mt-4 flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
                    <span className="inline-flex items-center gap-1"><MapPin size={12} /> {event.district}</span>
                    <span className="inline-flex items-center gap-1"><Ticket size={12} /> Plan Early</span>
                  </div>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {event.highlights.map((item) => (
                      <span key={item} className="px-2.5 py-1 rounded-full bg-gray-100 dark:bg-gray-800 text-xs text-gray-600 dark:text-gray-300">
                        {item}
                      </span>
                    ))}
                  </div>
                  {event.sourceUrl ? (
                    <a
                      href={event.sourceUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="mt-4 inline-flex items-center gap-1 text-xs text-kerala-green dark:text-emerald-400 font-medium hover:underline"
                    >
                      Source <ExternalLink size={12} />
                    </a>
                  ) : null}
                </div>
              </motion.article>
            ))}
          </div>
        )}

        <div className="mt-12 bg-white dark:bg-gray-900 rounded-3xl border border-gray-200/70 dark:border-gray-800/70 p-6">
          <h2 className="font-display text-2xl font-bold text-gray-900 dark:text-white mb-5">Upcoming Highlights</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {upcoming.map((event) => (
              <div key={event.id} className="rounded-2xl bg-gray-50 dark:bg-gray-800/40 p-4 border border-gray-200/60 dark:border-gray-700/60">
                <p className="text-xs text-kerala-green font-semibold mb-1">{monthLabels[event.month - 1]}</p>
                <p className="text-sm font-semibold text-gray-900 dark:text-white">{event.name}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{event.district}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

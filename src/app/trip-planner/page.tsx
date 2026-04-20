'use client';

import { useMemo, useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import { generateItinerary } from '@/data/itineraries';
import { Itinerary, BudgetLevel, TripStyle } from '@/types';
import {
  Sparkles,
  Calendar,
  Wallet,
  Compass,
  MapPin,
  Utensils,
  Bed,
  Lightbulb,
  ChevronDown,
  ChevronRight,
  Download,
  Share2,
  Edit,
  Check,
  Plane,
  Users,
  Car,
  ShieldCheck,
  Route,
  Timer,
  Stars,
  Flame,
  Hotel,
  Sun,
  Mountain,
  Waves,
} from 'lucide-react';

const styleOptions = [
  { id: 'relax' as TripStyle, label: 'Relax & Unwind', icon: '🧘', desc: 'Beaches, backwaters, spa', gradient: 'from-teal-500 to-emerald-500' },
  { id: 'adventure' as TripStyle, label: 'Adventure', icon: '🏔️', desc: 'Trekking, rafting, wildlife', gradient: 'from-orange-500 to-red-500' },
  { id: 'family' as TripStyle, label: 'Family Fun', icon: '👨‍👩‍👧‍👦', desc: 'Kid-friendly, nature, culture', gradient: 'from-blue-500 to-cyan-500' },
  { id: 'couple' as TripStyle, label: 'Romantic', icon: '❤️', desc: 'Houseboats, sunsets, luxury', gradient: 'from-rose-500 to-pink-500' },
  { id: 'solo' as TripStyle, label: 'Solo Explorer', icon: '🎒', desc: 'Budget, culture, freedom', gradient: 'from-violet-500 to-indigo-500' },
  { id: 'spiritual' as TripStyle, label: 'Spiritual', icon: '🕉️', desc: 'Temples, yoga, Ayurveda', gradient: 'from-amber-500 to-yellow-500' },
];

const budgetOptions = [
  { id: 'budget' as BudgetLevel, label: 'Budget', icon: '💰', desc: '₹5K - ₹15K / person', badge: 'Best value' },
  { id: 'mid-range' as BudgetLevel, label: 'Mid-Range', icon: '💰💰', desc: '₹15K - ₹50K / person', badge: 'Most popular' },
  { id: 'luxury' as BudgetLevel, label: 'Luxury', icon: '💰💰💰', desc: '₹50K+ / person', badge: 'Premium comfort' },
];

const travelMonths = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

const transportModes = [
  { id: 'private-car', label: 'Private Car', icon: Car },
  { id: 'public-transport', label: 'Public Transport', icon: Route },
  { id: 'mixed', label: 'Mixed', icon: Plane },
];

function getSeasonByMonth(month: string): string {
  if (['June', 'July', 'August', 'September'].includes(month)) return 'Monsoon';
  if (['October', 'November', 'December', 'January', 'February'].includes(month)) return 'Pleasant Winter';
  return 'Summer';
}

function estimateConfidence(days: number, style: string, budget: string, month: string): number {
  let score = 74;
  if (days >= 5) score += 6;
  if (style) score += 6;
  if (budget) score += 6;
  if (['October', 'November', 'December', 'January', 'February'].includes(month)) score += 4;
  return Math.min(score, 97);
}

export default function TripPlannerPage() {
  const { t } = useLanguage();
  const [step, setStep] = useState(1);
  const [days, setDays] = useState(5);
  const [style, setStyle] = useState<TripStyle | ''>('');
  const [budget, setBudget] = useState<BudgetLevel | ''>('');
  const [month, setMonth] = useState('November');
  const [groupSize, setGroupSize] = useState(2);
  const [pace, setPace] = useState<'slow' | 'balanced' | 'fast'>('balanced');
  const [transport, setTransport] = useState('mixed');
  const [generatedItinerary, setGeneratedItinerary] = useState<Itinerary | null>(null);
  const [expandedDay, setExpandedDay] = useState<number | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const confidence = useMemo(() => estimateConfidence(days, style, budget, month), [days, style, budget, month]);
  const seasonLabel = useMemo(() => getSeasonByMonth(month), [month]);

  const handleGenerate = () => {
    setIsGenerating(true);
    setTimeout(() => {
      const match = generateItinerary(days, style, budget);
      setGeneratedItinerary(match);
      setIsGenerating(false);
      setStep(4);
      setExpandedDay(1);
    }, 2000);
  };

  const exportPDF = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 overflow-x-clip">
      <section className="relative h-[52vh] min-h-[460px] overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1595815771614-ade9d652a65d?w=1920"
          alt="Trip Planner"
          fill
          className="object-cover scale-105"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/45 to-gray-50/95 dark:to-gray-950/95" />
        <div className="absolute top-16 -left-20 w-72 h-72 rounded-full bg-kerala-gold/25 blur-3xl" />
        <div className="absolute bottom-8 -right-10 w-80 h-80 rounded-full bg-kerala-lagoon/20 blur-3xl" />

        <div className="relative z-10 h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-12 flex flex-col justify-between">
          <motion.div
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="max-w-3xl"
          >
            <div className="inline-flex items-center gap-2 mb-4 rounded-full glass px-4 py-2 text-white text-sm">
              <Stars size={14} /> AI Travel Studio
            </div>
            <div className="flex items-center gap-2 mb-3">
            <Sparkles className="text-kerala-gold" size={28} />
            <h1 className="font-display text-3xl md:text-5xl font-bold text-white">
              {t('planner.title')}
            </h1>
          </div>
            <p className="text-white/80 text-lg md:text-xl max-w-2xl">
              {t('planner.subtitle')} Build a day-by-day route with travel style intelligence, season-aware suggestions, and ready-to-share outputs.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-3"
          >
            {[
              { label: 'Planning Confidence', value: `${confidence}%`, icon: ShieldCheck },
              { label: 'Current Season', value: seasonLabel, icon: Sun },
              { label: 'Trip Pace', value: pace, icon: Timer },
              { label: 'Group Size', value: `${groupSize} traveler${groupSize > 1 ? 's' : ''}`, icon: Users },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.label} className="glass rounded-2xl p-3 border border-white/20">
                  <div className="flex items-center gap-2 text-white/85 text-xs mb-1"><Icon size={12} /> {item.label}</div>
                  <p className="text-white font-semibold">{item.value}</p>
                </div>
              );
            })}
          </motion.div>
        </div>
      </section>

      <div className="container-custom px-4 -mt-6 relative z-20">
        <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-elevated-lg p-4 flex items-center justify-center gap-2 md:gap-8 border border-gray-200/70 dark:border-gray-800/70">
          {[
            { num: 1, label: 'Trip Basics' },
            { num: 2, label: 'Style & Budget' },
            { num: 3, label: 'Review & Generate' },
            { num: 4, label: 'Itinerary' },
          ].map((s, i) => (
            <div key={s.num} className="flex items-center gap-2">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all ${
                step >= s.num ? 'bg-kerala-green text-white' : 'bg-gray-200 text-gray-500'
              }`}>
                {step > s.num ? <Check size={16} /> : s.num}
              </div>
              <span className={`text-sm font-medium hidden md:block ${step >= s.num ? 'text-kerala-green' : 'text-gray-400'}`}>
                {s.label}
              </span>
              {i < 3 && <ChevronRight size={16} className="text-gray-300 hidden md:block" />}
            </div>
          ))}
        </div>
      </div>

      <div className="container-custom px-4 py-12">
        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ x: 40, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -40, opacity: 0 }}
              className="max-w-4xl mx-auto"
            >
              <div className="bg-white dark:bg-gray-900 rounded-3xl shadow-elevated-lg p-8 md:p-10 border border-gray-200/70 dark:border-gray-800/70">
                <div className="flex items-start justify-between gap-4 mb-8">
                  <div>
                    <p className="text-sm text-kerala-green font-semibold mb-2">Step 1</p>
                    <h2 className="font-display text-3xl font-bold text-gray-900 dark:text-white mb-2">Trip Basics</h2>
                    <p className="text-gray-500 dark:text-gray-400">Set your travel window, pace, and traveler details before we craft the route.</p>
                  </div>
                  <Calendar size={34} className="text-kerala-green shrink-0" />
                </div>

                <div className="grid md:grid-cols-2 gap-6 mb-8">
                  <div className="rounded-2xl bg-gray-50 dark:bg-gray-800/40 p-5">
                    <p className="text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">Trip Duration</p>
                    <div className="flex items-center justify-between mb-3">
                      <p className="text-4xl font-display font-bold text-kerala-green">{days} days</p>
                      <span className="text-xs px-3 py-1 rounded-full bg-kerala-green/10 text-kerala-green">{pace} pace</span>
                    </div>
                    <input
                      type="range"
                      min={2}
                      max={14}
                      value={days}
                      onChange={(e) => setDays(Number(e.target.value))}
                      className="w-full accent-kerala-green"
                    />
                    <div className="flex justify-between text-xs text-gray-400 mt-1">
                      <span>2 days</span>
                      <span>14 days</span>
                    </div>
                  </div>

                  <div className="rounded-2xl bg-gray-50 dark:bg-gray-800/40 p-5">
                    <p className="text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">Travel Month</p>
                    <select
                      value={month}
                      onChange={(e) => setMonth(e.target.value)}
                      className="w-full rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-3 py-2 text-gray-700 dark:text-gray-200 outline-none"
                    >
                      {travelMonths.map((m) => <option key={m} value={m}>{m}</option>)}
                    </select>
                    <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
                      Expected season: <span className="font-semibold text-kerala-green">{seasonLabel}</span>
                    </p>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6 mb-10">
                  <div className="rounded-2xl bg-gray-50 dark:bg-gray-800/40 p-5">
                    <p className="text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">Group Size</p>
                    <div className="flex items-center justify-between mb-3">
                      <p className="text-2xl font-bold text-gray-900 dark:text-white">{groupSize}</p>
                      <Users size={18} className="text-kerala-green" />
                    </div>
                    <input
                      type="range"
                      min={1}
                      max={8}
                      value={groupSize}
                      onChange={(e) => setGroupSize(Number(e.target.value))}
                      className="w-full accent-kerala-green"
                    />
                  </div>

                  <div className="rounded-2xl bg-gray-50 dark:bg-gray-800/40 p-5">
                    <p className="text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">Preferred Pace</p>
                    <div className="flex gap-2">
                      {(['slow', 'balanced', 'fast'] as const).map((p) => (
                        <button
                          key={p}
                          onClick={() => setPace(p)}
                          className={`flex-1 rounded-xl px-3 py-2 text-sm font-medium capitalize transition-all ${
                            pace === p
                              ? 'bg-kerala-green text-white'
                              : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-700'
                          }`}
                        >
                          {p}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex justify-end">
                  <button onClick={() => setStep(2)} className="btn-primary text-lg px-10 py-4">
                    Continue <ChevronRight size={20} className="inline ml-1" />
                  </button>
                </div>
              </div>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div
              key="step2"
              initial={{ x: 40, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -40, opacity: 0 }}
              className="max-w-5xl mx-auto"
            >
              <div className="bg-white dark:bg-gray-900 rounded-3xl shadow-elevated-lg p-8 md:p-10 border border-gray-200/70 dark:border-gray-800/70">
                <div className="flex items-start justify-between gap-4 mb-8">
                  <div>
                    <p className="text-sm text-kerala-green font-semibold mb-2">Step 2</p>
                    <h2 className="font-display text-3xl font-bold text-gray-900 dark:text-white mb-2">Style & Budget</h2>
                    <p className="text-gray-500 dark:text-gray-400">Tell us how you love to travel and we will align destinations, activity density, and spending profile.</p>
                  </div>
                  <Compass size={34} className="text-kerala-green shrink-0" />
                </div>

                <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
                  {styleOptions.map((opt) => (
                    <button
                      key={opt.id}
                      onClick={() => setStyle(opt.id)}
                      className={`p-5 rounded-2xl border-2 transition-all text-left relative overflow-hidden ${
                        style === opt.id
                          ? 'border-kerala-green bg-kerala-green/5 dark:bg-kerala-green/10 shadow-lg'
                          : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 bg-white dark:bg-gray-800/50'
                      }`}
                    >
                      <div className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${opt.gradient}`} />
                      <span className="text-3xl block mb-2">{opt.icon}</span>
                      <h3 className="font-semibold text-gray-900 dark:text-white">{opt.label}</h3>
                      <p className="text-gray-500 dark:text-gray-400 text-xs mt-1">{opt.desc}</p>
                      {style === opt.id && (
                        <Check size={16} className="text-kerala-green mt-2" />
                      )}
                    </button>
                  ))}
                </div>

                <div className="grid md:grid-cols-2 gap-6 mb-8">
                  <div>
                    <p className="text-sm font-semibold text-gray-700 dark:text-gray-200 mb-3">Budget Profile</p>
                    <div className="space-y-3">
                      {budgetOptions.map((opt) => (
                        <button
                          key={opt.id}
                          onClick={() => setBudget(opt.id)}
                          className={`w-full p-4 rounded-2xl border-2 transition-all text-left ${
                            budget === opt.id
                              ? 'border-kerala-green bg-kerala-green/5 dark:bg-kerala-green/10'
                              : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                          }`}
                        >
                          <div className="flex items-start justify-between gap-3">
                            <div>
                              <p className="font-semibold text-gray-900 dark:text-white">{opt.icon} {opt.label}</p>
                              <p className="text-sm text-gray-500 dark:text-gray-400">{opt.desc}</p>
                            </div>
                            <span className="text-xs rounded-full px-2 py-1 bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400">{opt.badge}</span>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <p className="text-sm font-semibold text-gray-700 dark:text-gray-200 mb-3">Transport Preference</p>
                    <div className="space-y-2 mb-4">
                      {transportModes.map((option) => {
                        const Icon = option.icon;
                        return (
                          <button
                            key={option.id}
                            onClick={() => setTransport(option.id)}
                            className={`w-full flex items-center gap-3 p-3 rounded-xl border transition-all ${
                              transport === option.id
                                ? 'border-kerala-green bg-kerala-green/5 text-kerala-green'
                                : 'border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300'
                            }`}
                          >
                            <Icon size={16} /> {option.label}
                          </button>
                        );
                      })}
                    </div>

                    <div className="rounded-2xl border border-dashed border-kerala-green/30 bg-kerala-green/5 dark:bg-kerala-green/10 p-4">
                      <p className="text-sm font-semibold text-kerala-green mb-1">Planner signal strength</p>
                      <p className="text-sm text-gray-600 dark:text-gray-300">Current configuration confidence: <span className="font-bold">{confidence}%</span>. Selecting style and budget improves recommendation accuracy.</p>
                    </div>
                  </div>
                </div>

                <div className="flex justify-center gap-3">
                  <button onClick={() => setStep(1)} className="btn-secondary">Back</button>
                  <button
                    onClick={() => style && budget && setStep(3)}
                    disabled={!style || !budget}
                    className={`btn-primary text-lg px-10 py-3 ${!style || !budget ? 'opacity-50 cursor-not-allowed' : ''}`}
                  >
                    Continue <ChevronRight size={20} className="inline ml-1" />
                  </button>
                </div>
              </div>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div
              key="step3"
              initial={{ x: 40, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -40, opacity: 0 }}
              className="max-w-5xl mx-auto"
            >
              <div className="bg-white dark:bg-gray-900 rounded-3xl shadow-elevated-lg p-8 md:p-10 border border-gray-200/70 dark:border-gray-800/70">
                <div className="flex items-start justify-between gap-4 mb-8">
                  <div>
                    <p className="text-sm text-kerala-green font-semibold mb-2">Step 3</p>
                    <h2 className="font-display text-3xl font-bold text-gray-900 dark:text-white mb-2">Review & Generate</h2>
                    <p className="text-gray-500 dark:text-gray-400">Finalize your planning profile and generate the route blueprint.</p>
                  </div>
                  <Wallet size={34} className="text-kerala-green shrink-0" />
                </div>

                <div className="grid lg:grid-cols-[1.1fr_1fr] gap-6 mb-8">
                  <div className="rounded-2xl bg-gray-50 dark:bg-gray-800/40 p-6">
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Trip Profile</h3>
                    <div className="grid sm:grid-cols-2 gap-3">
                      {[
                        { label: 'Duration', value: `${days} days`, icon: Calendar },
                        { label: 'Travel Month', value: month, icon: Sun },
                        { label: 'Season', value: seasonLabel, icon: Mountain },
                        { label: 'Group', value: `${groupSize} traveler${groupSize > 1 ? 's' : ''}`, icon: Users },
                        { label: 'Style', value: style || 'Not selected', icon: Compass },
                        { label: 'Budget', value: budget || 'Not selected', icon: Wallet },
                        { label: 'Pace', value: pace, icon: Timer },
                        { label: 'Transport', value: transport, icon: Route },
                      ].map((item) => {
                        const Icon = item.icon;
                        return (
                          <div key={item.label} className="rounded-xl bg-white dark:bg-gray-800 p-3 border border-gray-200/70 dark:border-gray-700/70">
                            <div className="text-xs text-gray-400 flex items-center gap-1 mb-1"><Icon size={12} /> {item.label}</div>
                            <p className="text-sm font-semibold text-gray-800 dark:text-gray-100 capitalize">{item.value}</p>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  <div className="rounded-2xl bg-gradient-to-br from-kerala-green to-emerald-700 p-6 text-white">
                    <p className="text-sm opacity-80 mb-1">Planning Readiness</p>
                    <p className="text-5xl font-bold">{confidence}%</p>
                    <div className="mt-4 space-y-2 text-sm opacity-90">
                      <p className="flex items-center gap-2"><Flame size={14} /> Route intensity will be tuned to {pace} pace</p>
                      <p className="flex items-center gap-2"><Hotel size={14} /> Stay options aligned with {budget || 'selected'} budget</p>
                      <p className="flex items-center gap-2"><Waves size={14} /> Seasonal recommendations adapted for {seasonLabel}</p>
                    </div>
                    <div className="mt-6 h-2 w-full rounded-full bg-white/20 overflow-hidden">
                      <div className="h-full rounded-full bg-kerala-gold" style={{ width: `${confidence}%` }} />
                    </div>
                  </div>
                </div>

                <div className="flex justify-center gap-3">
                  <button onClick={() => setStep(2)} className="btn-secondary">Back</button>
                  <button
                    onClick={handleGenerate}
                    disabled={!style || !budget || isGenerating}
                    className={`btn-primary text-lg px-10 py-3 flex items-center gap-2 ${!style || !budget ? 'opacity-50 cursor-not-allowed' : ''}`}
                  >
                    {isGenerating ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        Generating your route intelligence...
                      </>
                    ) : (
                      <>
                        <Sparkles size={20} /> Generate Itinerary
                      </>
                    )}
                  </button>
                </div>
              </div>
            </motion.div>
          )}

          {step === 4 && generatedItinerary && (
            <motion.div
              key="step4"
              initial={{ y: 24, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="max-w-5xl mx-auto"
            >
              <div className="bg-white dark:bg-gray-900 rounded-3xl shadow-elevated-lg p-6 md:p-8 mb-8 border border-gray-200/70 dark:border-gray-800/70">
                <div className="grid lg:grid-cols-[1.2fr_1fr] gap-6 items-center">
                  <div>
                    <p className="text-sm text-kerala-green font-semibold mb-2">Generated Blueprint</p>
                    <h2 className="font-display text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-2">
                      {generatedItinerary.title}
                    </h2>
                    <p className="text-gray-500 dark:text-gray-400">{generatedItinerary.description}</p>

                    <div className="flex flex-wrap gap-3 mt-4">
                      <span className="bg-kerala-green/10 text-kerala-green px-3 py-1 rounded-full text-sm font-medium">
                        {generatedItinerary.days} Days
                      </span>
                      <span className="bg-kerala-gold/10 text-kerala-gold px-3 py-1 rounded-full text-sm font-medium capitalize">
                        {style} Style
                      </span>
                      <span className="bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 px-3 py-1 rounded-full text-sm font-medium capitalize">
                        {budget} Budget
                      </span>
                      <span className="bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400 px-3 py-1 rounded-full text-sm font-medium">
                        {generatedItinerary.totalCost}
                      </span>
                    </div>
                  </div>

                  <div className="rounded-2xl bg-gray-50 dark:bg-gray-800/40 p-5">
                    <p className="text-sm font-semibold text-gray-700 dark:text-gray-200 mb-3">Plan Quality Signals</p>
                    <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                      <p className="flex items-center gap-2"><ShieldCheck size={14} className="text-emerald-500" /> Confidence score: {confidence}%</p>
                      <p className="flex items-center gap-2"><Route size={14} className="text-emerald-500" /> Day flow optimized for {pace} pace</p>
                      <p className="flex items-center gap-2"><Users size={14} className="text-emerald-500" /> Calibrated for {groupSize} traveler{groupSize > 1 ? 's' : ''}</p>
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 mt-6 no-print">
                  <button onClick={exportPDF} className="flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-800 rounded-xl text-sm font-medium hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
                    <Download size={16} /> Export PDF
                  </button>
                  <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-800 rounded-xl text-sm font-medium hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
                    <Share2 size={16} /> Share Plan
                  </button>
                  <button onClick={() => { setStep(1); setGeneratedItinerary(null); }} className="flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-800 rounded-xl text-sm font-medium hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
                    <Edit size={16} /> Modify Inputs
                  </button>
                </div>
              </div>

              <div className="space-y-4">
                {generatedItinerary.dayPlans.map((day) => (
                  <motion.div
                    key={day.day}
                    initial={{ y: 10, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: day.day * 0.06 }}
                    className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm overflow-hidden border border-gray-200/70 dark:border-gray-800/70"
                  >
                    <button
                      onClick={() => setExpandedDay(expandedDay === day.day ? null : day.day)}
                      className="w-full flex items-center justify-between p-5 hover:bg-gray-50 dark:hover:bg-gray-800/60 transition-colors"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-kerala-green to-emerald-600 text-white flex items-center justify-center font-bold">
                          D{day.day}
                        </div>
                        <div className="text-left">
                          <h3 className="font-semibold text-gray-900 dark:text-white">{day.title}</h3>
                          <p className="text-gray-500 dark:text-gray-400 text-sm flex items-center gap-1">
                            <MapPin size={14} /> {day.location}
                          </p>
                        </div>
                      </div>
                      <ChevronDown
                        size={20}
                        className={`text-gray-400 transition-transform ${expandedDay === day.day ? 'rotate-180' : ''}`}
                      />
                    </button>

                    <AnimatePresence>
                      {expandedDay === day.day && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="overflow-hidden"
                        >
                          <div className="px-5 pb-5 border-t border-gray-100 dark:border-gray-800">
                            <div className="grid md:grid-cols-2 gap-6 pt-5">
                              <div>
                                <h4 className="font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                                  <Compass size={16} className="text-kerala-green" /> Activities
                                </h4>
                                <ul className="space-y-2">
                                  {day.activities.map((activity, i) => (
                                    <li key={i} className="flex items-start gap-2 text-gray-600 dark:text-gray-400 text-sm">
                                      <span className="w-5 h-5 bg-kerala-green/10 text-kerala-green rounded-full flex items-center justify-center text-xs font-bold mt-0.5 shrink-0">
                                        {i + 1}
                                      </span>
                                      {activity}
                                    </li>
                                  ))}
                                </ul>
                              </div>

                              <div className="space-y-4">
                                <div>
                                  <h4 className="font-semibold text-gray-900 dark:text-white mb-1 flex items-center gap-2">
                                    <Bed size={16} className="text-blue-500" /> Stay
                                  </h4>
                                  <p className="text-gray-600 dark:text-gray-400 text-sm">{day.accommodation}</p>
                                </div>
                                <div>
                                  <h4 className="font-semibold text-gray-900 dark:text-white mb-1 flex items-center gap-2">
                                    <Utensils size={16} className="text-orange-500" /> Meals
                                  </h4>
                                  <p className="text-gray-600 dark:text-gray-400 text-sm">{day.meals}</p>
                                </div>
                                <div>
                                  <h4 className="font-semibold text-gray-900 dark:text-white mb-1 flex items-center gap-2">
                                    <Lightbulb size={16} className="text-yellow-500" /> Pro Tip
                                  </h4>
                                  <p className="text-gray-600 dark:text-gray-400 text-sm italic">{day.tips}</p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                ))}
              </div>

              <div className="text-center mt-10 no-print">
                <p className="text-gray-500 dark:text-gray-400 mb-4">Ready to turn this into bookings and confirmations?</p>
                <button className="btn-primary text-lg px-10 py-4 flex items-center gap-2 mx-auto">
                  <Plane size={20} /> Start Booking
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

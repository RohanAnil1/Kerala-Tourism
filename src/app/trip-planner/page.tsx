'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import { itineraries } from '@/data/itineraries';
import { Itinerary, DayPlan } from '@/types';
import {
  Sparkles, Calendar, Wallet, Heart, Mountain, Users, User, Compass,
  MapPin, Utensils, Bed, Lightbulb, ChevronDown, ChevronRight,
  Download, Share2, Edit, Check, Plane
} from 'lucide-react';

const styleOptions = [
  { id: 'relax', label: 'Relax & Unwind', icon: '🧘', desc: 'Beaches, backwaters, spa' },
  { id: 'adventure', label: 'Adventure', icon: '🏔️', desc: 'Trekking, rafting, wildlife' },
  { id: 'family', label: 'Family Fun', icon: '👨‍👩‍👧‍👦', desc: 'Kid-friendly, nature, culture' },
  { id: 'couple', label: 'Romantic', icon: '❤️', desc: 'Houseboats, sunsets, luxury' },
  { id: 'solo', label: 'Solo Explorer', icon: '🎒', desc: 'Budget, culture, freedom' },
  { id: 'spiritual', label: 'Spiritual', icon: '🕉️', desc: 'Temples, yoga, Ayurveda' },
];

const budgetOptions = [
  { id: 'budget', label: 'Budget', icon: '💰', desc: '₹5K - ₹15K / person', color: 'border-green-300 bg-green-50' },
  { id: 'mid-range', label: 'Mid-Range', icon: '💰💰', desc: '₹15K - ₹50K / person', color: 'border-blue-300 bg-blue-50' },
  { id: 'luxury', label: 'Luxury', icon: '💰💰💰', desc: '₹50K+ / person', color: 'border-purple-300 bg-purple-50' },
];

export default function TripPlannerPage() {
  const { t } = useLanguage();
  const [step, setStep] = useState(1);
  const [days, setDays] = useState(5);
  const [style, setStyle] = useState('');
  const [budget, setBudget] = useState('');
  const [generatedItinerary, setGeneratedItinerary] = useState<Itinerary | null>(null);
  const [expandedDay, setExpandedDay] = useState<number | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerate = () => {
    setIsGenerating(true);
    // Simulate AI generation delay
    setTimeout(() => {
      let match = itineraries.find(i => {
        if (days <= 3) return i.days === 3;
        if (days <= 5) return i.days === 5;
        return i.days === 7;
      });

      if (!match) match = itineraries[0];
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
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      {/* Hero */}
      <section className="relative h-64 md:h-72 overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1595815771614-ade9d652a65d?w=1920"
          alt="Trip Planner"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-kerala-green/90 to-kerala-green/70" />
        <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4 pt-16">
          <div className="flex items-center gap-2 mb-3">
            <Sparkles className="text-kerala-gold" size={28} />
            <h1 className="font-display text-3xl md:text-5xl font-bold text-white">
              {t('planner.title')}
            </h1>
          </div>
          <p className="text-white/80 text-lg max-w-xl">
            {t('planner.subtitle')}
          </p>
        </div>
      </section>

      {/* Progress Steps */}
      <div className="container-custom px-4 -mt-6 relative z-20">
        <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg p-4 flex items-center justify-center gap-2 md:gap-8">
          {[
            { num: 1, label: 'Duration' },
            { num: 2, label: 'Style' },
            { num: 3, label: 'Budget' },
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

      {/* Planner Content */}
      <div className="container-custom px-4 py-12">
        <AnimatePresence mode="wait">
          {/* Step 1: Duration */}
          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -50, opacity: 0 }}
              className="max-w-2xl mx-auto"
            >
              <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg p-8 text-center">
                <Calendar size={40} className="text-kerala-green mx-auto mb-4" />
                <h2 className="font-display text-2xl font-bold text-gray-900 dark:text-white mb-2">How many days?</h2>
                <p className="text-gray-500 dark:text-gray-400 mb-8">Choose the duration of your Kerala trip</p>

                <div className="flex items-center justify-center gap-6 mb-8">
                  <button
                    onClick={() => setDays(Math.max(1, days - 1))}
                    className="w-12 h-12 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 text-xl font-bold hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                  >
                    −
                  </button>
                  <div className="text-center">
                    <span className="text-6xl font-display font-bold text-kerala-green">{days}</span>
                    <p className="text-gray-500 text-sm mt-1">days</p>
                  </div>
                  <button
                    onClick={() => setDays(Math.min(14, days + 1))}
                    className="w-12 h-12 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 text-xl font-bold hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                  >
                    +
                  </button>
                </div>

                <div className="flex justify-center gap-3 mb-8">
                  {[3, 5, 7, 10].map(d => (
                    <button
                      key={d}
                      onClick={() => setDays(d)}
                      className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
                        days === d ? 'bg-kerala-green text-white' : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                      }`}
                    >
                      {d} Days
                    </button>
                  ))}
                </div>

                <button onClick={() => setStep(2)} className="btn-primary text-lg px-10 py-4">
                  Continue <ChevronRight size={20} className="inline ml-1" />
                </button>
              </div>
            </motion.div>
          )}

          {/* Step 2: Style */}
          {step === 2 && (
            <motion.div
              key="step2"
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -50, opacity: 0 }}
              className="max-w-3xl mx-auto"
            >
              <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg p-8 text-center">
                <Compass size={40} className="text-kerala-green mx-auto mb-4" />
                <h2 className="font-display text-2xl font-bold text-gray-900 dark:text-white mb-2">What&apos;s your travel style?</h2>
                <p className="text-gray-500 dark:text-gray-400 mb-8">Choose what best describes your ideal trip</p>

                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
                  {styleOptions.map(opt => (
                    <button
                      key={opt.id}
                      onClick={() => setStyle(opt.id)}
                      className={`p-5 rounded-xl border-2 transition-all text-left ${
                        style === opt.id
                          ? 'border-kerala-green bg-kerala-green/5 dark:bg-kerala-green/10'
                          : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                      }`}
                    >
                      <span className="text-3xl block mb-2">{opt.icon}</span>
                      <h3 className="font-semibold text-gray-900 dark:text-white">{opt.label}</h3>
                      <p className="text-gray-500 dark:text-gray-400 text-xs mt-1">{opt.desc}</p>
                      {style === opt.id && (
                        <Check size={16} className="text-kerala-green mt-2" />
                      )}
                    </button>
                  ))}
                </div>

                <div className="flex justify-center gap-3">
                  <button onClick={() => setStep(1)} className="btn-secondary">Back</button>
                  <button
                    onClick={() => style && setStep(3)}
                    disabled={!style}
                    className={`btn-primary text-lg px-10 py-3 ${!style ? 'opacity-50 cursor-not-allowed' : ''}`}
                  >
                    Continue <ChevronRight size={20} className="inline ml-1" />
                  </button>
                </div>
              </div>
            </motion.div>
          )}

          {/* Step 3: Budget */}
          {step === 3 && (
            <motion.div
              key="step3"
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -50, opacity: 0 }}
              className="max-w-2xl mx-auto"
            >
              <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg p-8 text-center">
                <Wallet size={40} className="text-kerala-green mx-auto mb-4" />
                <h2 className="font-display text-2xl font-bold text-gray-900 dark:text-white mb-2">What&apos;s your budget?</h2>
                <p className="text-gray-500 dark:text-gray-400 mb-8">Per person estimate for the entire trip</p>

                <div className="grid gap-4 mb-8">
                  {budgetOptions.map(opt => (
                    <button
                      key={opt.id}
                      onClick={() => setBudget(opt.id)}
                      className={`p-5 rounded-xl border-2 transition-all flex items-center gap-4 text-left ${
                        budget === opt.id
                          ? 'border-kerala-green bg-kerala-green/5 dark:bg-kerala-green/10'
                          : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                      }`}
                    >
                      <span className="text-3xl">{opt.icon}</span>
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900 dark:text-white">{opt.label}</h3>
                        <p className="text-gray-500 dark:text-gray-400 text-sm">{opt.desc}</p>
                      </div>
                      {budget === opt.id && <Check size={20} className="text-kerala-green" />}
                    </button>
                  ))}
                </div>

                <div className="flex justify-center gap-3">
                  <button onClick={() => setStep(2)} className="btn-secondary">Back</button>
                  <button
                    onClick={handleGenerate}
                    disabled={!budget || isGenerating}
                    className={`btn-primary text-lg px-10 py-3 flex items-center gap-2 ${!budget ? 'opacity-50 cursor-not-allowed' : ''}`}
                  >
                    {isGenerating ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        Generating...
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

          {/* Step 4: Generated Itinerary */}
          {step === 4 && generatedItinerary && (
            <motion.div
              key="step4"
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="max-w-4xl mx-auto"
            >
              {/* Summary Card */}
              <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg p-6 md:p-8 mb-8">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                  <div>
                    <h2 className="font-display text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
                      {generatedItinerary.title}
                    </h2>
                    <p className="text-gray-500 dark:text-gray-400 mt-1">{generatedItinerary.description}</p>
                    <div className="flex flex-wrap gap-3 mt-3">
                      <span className="bg-kerala-green/10 text-kerala-green px-3 py-1 rounded-full text-sm font-medium">
                        {generatedItinerary.days} Days
                      </span>
                      <span className="bg-kerala-gold/10 text-kerala-gold px-3 py-1 rounded-full text-sm font-medium capitalize">
                        {style} Style
                      </span>
                      <span className="bg-blue-50 text-blue-600 px-3 py-1 rounded-full text-sm font-medium capitalize">
                        {budget} Budget
                      </span>
                      <span className="bg-purple-50 text-purple-600 px-3 py-1 rounded-full text-sm font-medium">
                        {generatedItinerary.totalCost}
                      </span>
                    </div>
                  </div>

                  <div className="flex gap-2 no-print">
                    <button onClick={exportPDF} className="flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-800 rounded-lg text-sm font-medium hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
                      <Download size={16} /> Export PDF
                    </button>
                    <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-800 rounded-lg text-sm font-medium hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
                      <Share2 size={16} /> Share
                    </button>
                    <button onClick={() => { setStep(1); setGeneratedItinerary(null); }} className="flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-800 rounded-lg text-sm font-medium hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
                      <Edit size={16} /> Modify
                    </button>
                  </div>
                </div>
              </div>

              {/* Day-by-Day Itinerary */}
              <div className="space-y-4">
                {generatedItinerary.dayPlans.map((day) => (
                  <motion.div
                    key={day.day}
                    initial={{ y: 10, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: day.day * 0.1 }}
                    className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm overflow-hidden"
                  >
                    <button
                      onClick={() => setExpandedDay(expandedDay === day.day ? null : day.day)}
                      className="w-full flex items-center justify-between p-5 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-kerala-green text-white flex items-center justify-center font-bold">
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
                          <div className="px-5 pb-5 border-t">
                            <div className="grid md:grid-cols-2 gap-6 pt-5">
                              {/* Activities */}
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

                              {/* Details */}
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

              {/* CTA */}
              <div className="text-center mt-10 no-print">
                <p className="text-gray-500 dark:text-gray-400 mb-4">Love this itinerary? Start planning your dream Kerala trip today!</p>
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

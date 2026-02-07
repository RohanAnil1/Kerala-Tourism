'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { experiences } from '@/data/experiences';
import { useLanguage } from '@/contexts/LanguageContext';
import { Search, Star, Clock, MapPin, IndianRupee, Gauge } from 'lucide-react';
import { EXPERIENCE_CATEGORIES } from '@/lib/utils';
import { ExperienceCategory } from '@/types';

export default function ExperiencesPage() {
  const { t } = useLanguage();
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('');

  const filtered = useMemo(() => {
    let result = experiences;
    if (search) {
      const q = search.toLowerCase();
      result = result.filter(e =>
        e.title.toLowerCase().includes(q) || e.description.toLowerCase().includes(q) || e.location.toLowerCase().includes(q)
      );
    }
    if (selectedCategory) {
      result = result.filter(e => e.category === selectedCategory);
    }
    return result;
  }, [search, selectedCategory]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      {/* Hero */}
      <section className="relative h-72 md:h-80 overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1593693397690-362cb9666fc2?w=1920"
          alt="Kerala Experiences"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-kerala-green/80 to-kerala-water-dark/70" />
        <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4 pt-16">
          <h1 className="font-display text-4xl md:text-5xl font-bold text-white mb-3">
            {t('nav.experiences')}
          </h1>
          <p className="text-white/80 text-lg max-w-xl">
            Unforgettable activities that capture the essence of Kerala
          </p>
        </div>
      </section>

      {/* Search & Category Filter */}
      <section className="container-custom -mt-8 relative z-20 px-4">
        <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl p-6">
          <div className="relative mb-5">
            <Search size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search experiences..."
              className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 dark:bg-gray-800 dark:text-white focus:border-kerala-green focus:ring-2 focus:ring-kerala-green/20 outline-none transition-all"
            />
          </div>

          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setSelectedCategory('')}
              className={`px-4 py-2 rounded-full text-sm transition-all ${
                !selectedCategory ? 'bg-kerala-green text-white' : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
              }`}
            >
              All
            </button>
            {EXPERIENCE_CATEGORIES.map(cat => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(selectedCategory === cat.id ? '' : cat.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm transition-all ${
                  selectedCategory === cat.id ? 'bg-kerala-green text-white' : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                }`}
              >
                <span>{cat.icon}</span> {cat.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Results */}
      <section className="container-custom px-4 py-12">
        <p className="text-gray-500 dark:text-gray-400 mb-6">{filtered.length} experience{filtered.length !== 1 ? 's' : ''} found</p>

        {filtered.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-6xl mb-4">🎭</p>
            <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-2">No experiences found</h3>
            <p className="text-gray-500 dark:text-gray-400">Try a different search or category</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((exp, i) => (
              <motion.div
                key={exp.id}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: i * 0.05 }}
              >
                <Link href={`/experiences/${exp.slug}`} className="card-hover block bg-white dark:bg-gray-900 rounded-2xl overflow-hidden shadow-sm group">
                  <div className="relative h-52 overflow-hidden">
                    <Image
                      src={exp.images[0]}
                      alt={exp.title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    <div className="absolute top-4 left-4 bg-white/20 backdrop-blur-sm text-white text-xs px-3 py-1 rounded-full capitalize">
                      {exp.category}
                    </div>
                    <div className="absolute top-4 right-4">
                      <span className={`text-xs px-3 py-1 rounded-full ${
                        exp.difficulty === 'easy' ? 'bg-green-500/80 text-white' :
                        exp.difficulty === 'moderate' ? 'bg-yellow-500/80 text-white' :
                        'bg-red-500/80 text-white'
                      }`}>
                        {exp.difficulty}
                      </span>
                    </div>
                    <div className="absolute bottom-4 left-4 right-4">
                      <div className="flex items-center gap-2 text-white">
                        <Star size={14} className="text-yellow-400" fill="currentColor" />
                        <span className="text-sm">{exp.rating}</span>
                        <span className="text-white/60 text-sm">· {exp.reviews.toLocaleString()} reviews</span>
                      </div>
                    </div>
                  </div>

                  <div className="p-5">
                    <h3 className="font-display text-lg font-bold text-gray-900 dark:text-white mb-2">{exp.title}</h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-2">{exp.description}</p>
                    
                    <div className="grid grid-cols-2 gap-3 text-sm">
                      <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400">
                        <Clock size={14} className="text-kerala-green" />
                        {exp.duration}
                      </div>
                      <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400">
                        <IndianRupee size={14} className="text-kerala-green" />
                        {exp.costEstimate}
                      </div>
                      <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400">
                        <MapPin size={14} className="text-kerala-green" />
                        {exp.location}
                      </div>
                      <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400">
                        <Gauge size={14} className="text-kerala-green" />
                        {exp.bestSeason}
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

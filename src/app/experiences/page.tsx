'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { experiences } from '@/data/experiences';
import { useLanguage } from '@/contexts/LanguageContext';
import { Search, Star, Clock, MapPin, IndianRupee, Gauge, Filter, Sparkles } from 'lucide-react';
import { EXPERIENCE_CATEGORIES } from '@/lib/utils';

export default function ExperiencesPage() {
  const { t } = useLanguage();
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [selectedDistrict, setSelectedDistrict] = useState<string>('all');
  const [difficulty, setDifficulty] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('rating');

  const districtOptions = useMemo(() => {
    const districts = new Set<string>();
    experiences.forEach((exp) => {
      const parts = exp.location.split(',');
      const district = parts[parts.length - 1]?.trim();
      if (district) {
        districts.add(district);
      }
    });
    return ['all', ...Array.from(districts).sort((a, b) => a.localeCompare(b))];
  }, []);

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

    if (selectedDistrict !== 'all') {
      result = result.filter((e) => {
        const parts = e.location.split(',');
        const district = parts[parts.length - 1]?.trim();
        return district === selectedDistrict;
      });
    }

    if (difficulty !== 'all') {
      result = result.filter(e => e.difficulty === difficulty);
    }

    if (sortBy === 'rating') {
      result = [...result].sort((a, b) => b.rating - a.rating);
    }
    if (sortBy === 'reviews') {
      result = [...result].sort((a, b) => b.reviews - a.reviews);
    }
    if (sortBy === 'duration') {
      result = [...result].sort((a, b) => a.duration.localeCompare(b.duration));
    }

    return result;
  }, [search, selectedCategory, selectedDistrict, difficulty, sortBy]);

  const featuredCount = experiences.filter((exp) => exp.featured).length;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <section className="relative h-[56vh] min-h-[420px] overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1593693397690-362cb9666fc2?w=1920"
          alt="Kerala Experiences"
          fill
          className="object-cover scale-105"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/45 to-gray-50 dark:to-gray-950" />
        <div className="relative z-10 h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-end pb-12">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-2 glass rounded-full px-4 py-2 text-white text-sm mb-4">
              <Sparkles size={14} /> Curated Activities Across Kerala
            </span>
            <h1 className="font-display text-4xl md:text-6xl font-bold text-white mb-3">
              {t('nav.experiences')}
            </h1>
            <p className="text-white/80 text-base md:text-lg max-w-2xl">
              Handpicked cultural, adventure, wellness, and nature experiences with verified timings, costs, and difficulty levels.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-8 max-w-4xl">
            <div className="glass rounded-2xl px-4 py-3 border border-white/15">
              <p className="text-white text-xl font-semibold">{experiences.length}+</p>
              <p className="text-white/65 text-xs">Total Experiences</p>
            </div>
            <div className="glass rounded-2xl px-4 py-3 border border-white/15">
              <p className="text-white text-xl font-semibold">{featuredCount}</p>
              <p className="text-white/65 text-xs">Featured Picks</p>
            </div>
            <div className="glass rounded-2xl px-4 py-3 border border-white/15">
              <p className="text-white text-xl font-semibold">8</p>
              <p className="text-white/65 text-xs">Categories</p>
            </div>
            <div className="glass rounded-2xl px-4 py-3 border border-white/15">
              <p className="text-white text-xl font-semibold">4.6</p>
              <p className="text-white/65 text-xs">Avg Rating</p>
            </div>
          </div>
        </div>
      </section>

      <section className="container-custom -mt-8 relative z-20 px-4">
        <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl p-6 border border-gray-200/70 dark:border-gray-800/70">
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

          <div className="flex flex-wrap gap-2 mb-4">
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

          <div className="mb-4 overflow-x-auto pb-1">
            <div className="flex items-center gap-2 min-w-max">
              <span className="text-xs font-semibold text-gray-500 dark:text-gray-400 pr-1">Districts:</span>
              {districtOptions.map((district) => {
                const active = selectedDistrict === district;
                const label = district === 'all' ? 'All Districts' : district;
                return (
                  <button
                    key={district}
                    onClick={() => setSelectedDistrict(district)}
                    className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                      active
                        ? 'bg-kerala-gold text-white'
                        : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                    }`}
                  >
                    {label}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
              <Filter size={16} /> Advanced Filters
            </div>
            <select
              value={difficulty}
              onChange={(e) => setDifficulty(e.target.value)}
              className="px-3 py-2 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-sm text-gray-700 dark:text-gray-200"
            >
              <option value="all">All Difficulty</option>
              <option value="easy">Easy</option>
              <option value="moderate">Moderate</option>
              <option value="challenging">Challenging</option>
            </select>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-3 py-2 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-sm text-gray-700 dark:text-gray-200"
            >
              <option value="rating">Sort by Rating</option>
              <option value="reviews">Sort by Reviews</option>
              <option value="duration">Sort by Duration</option>
            </select>
          </div>
        </div>
      </section>

      <section className="container-custom px-4 py-12">
        <p className="text-gray-500 dark:text-gray-400 mb-6">
          <span className="font-semibold text-gray-900 dark:text-white">{filtered.length}</span> experience{filtered.length !== 1 ? 's' : ''} found
        </p>

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
                <Link href={`/experiences/${exp.slug}`} className="card-hover block bg-white dark:bg-gray-900 rounded-2xl overflow-hidden shadow-sm border border-gray-200/70 dark:border-gray-800/70 group h-full">
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
                    {exp.featured && (
                      <div className="absolute left-4 bottom-4 text-[11px] px-2.5 py-1 rounded-full bg-kerala-gold text-white font-semibold">
                        Featured
                      </div>
                    )}
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

                  <div className="p-5 flex flex-col h-[calc(100%-13rem)]">
                    <h3 className="font-display text-lg font-bold text-gray-900 dark:text-white mb-2">{exp.title}</h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-2">{exp.description}</p>
                    
                    <div className="grid grid-cols-2 gap-3 text-sm mt-auto">
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

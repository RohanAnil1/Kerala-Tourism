'use client';

import { Suspense, useState, useMemo, useRef } from 'react';
import { useSearchParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { districts, destinations, getDestinationsByDistrict } from '@/data/destinations';
import { DestinationType } from '@/types';
import { Search, SlidersHorizontal, X, Star, MapPin, Users, Wallet } from 'lucide-react';

const DESTINATION_TYPES: { value: DestinationType | 'all'; label: string; icon: string }[] = [
  { value: 'all', label: 'All Types', icon: '✨' },
  { value: 'beach', label: 'Beaches', icon: '🏖️' },
  { value: 'hill', label: 'Hill Stations', icon: '⛰️' },
  { value: 'backwater', label: 'Backwaters', icon: '🛶' },
  { value: 'spiritual', label: 'Spiritual', icon: '🛕' },
  { value: 'heritage', label: 'Heritage', icon: '🏛️' },
  { value: 'wildlife', label: 'Wildlife', icon: '🐘' },
  { value: 'nature', label: 'Nature', icon: '🌿' },
  { value: 'urban', label: 'Urban', icon: '🏙️' },
];

const SORT_OPTIONS = [
  { value: 'popularity', label: 'Most Popular' },
  { value: 'rating', label: 'Highest Rated' },
  { value: 'name', label: 'Name (A-Z)' },
];

/* Reveal animation wrapper */
function Reveal({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: [0.23, 1, 0.32, 1] }}
    >
      {children}
    </motion.div>
  );
}

function DestinationsContent() {
  const searchParams = useSearchParams();
  const districtParam = searchParams.get('district');

  const [selectedDistrict, setSelectedDistrict] = useState<string>(districtParam || 'all');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('popularity');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const filteredDestinations = useMemo(() => {
    let filtered = [...destinations];

    if (selectedDistrict !== 'all') {
      filtered = filtered.filter(d => d.districtSlug === selectedDistrict);
    }

    if (selectedType !== 'all') {
      filtered = filtered.filter(d => d.type.includes(selectedType as DestinationType));
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      filtered = filtered.filter(
        d =>
          d.name.toLowerCase().includes(q) ||
          d.district.toLowerCase().includes(q) ||
          d.description.toLowerCase().includes(q)
      );
    }

    switch (sortBy) {
      case 'popularity':
        filtered.sort((a, b) => b.reviews - a.reviews);
        break;
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case 'name':
        filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
    }

    return filtered;
  }, [selectedDistrict, selectedType, sortBy, searchQuery]);

  return (
    <div className="min-h-screen bg-gray-50/50 dark:bg-gray-950">
      {/* Hero Section */}
      <section className="relative h-[55vh] min-h-[420px] flex items-center justify-center overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=1600"
          alt="Kerala Destinations"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-gray-50/100 dark:to-gray-950/100" />
        <div className="relative z-10 text-center px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
          >
            <span className="inline-flex items-center gap-2 glass rounded-full px-4 py-1.5 mb-6">
              <MapPin size={14} className="text-kerala-gold" />
              <span className="text-white/90 text-sm font-medium">{destinations.length} Destinations</span>
            </span>
            <h1 className="text-4xl md:text-6xl font-display font-bold text-white mb-4 tracking-tight">
              Explore Kerala
            </h1>
            <p className="text-lg md:text-xl text-white/70 max-w-2xl mx-auto font-light">
              All 14 districts, {destinations.length} breathtaking attractions — from pristine beaches to misty hill stations
            </p>
          </motion.div>
        </div>
      </section>

      {/* District Cards */}
      <section className="max-w-7xl mx-auto px-4 -mt-8 relative z-20 mb-8">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-3">
          {districts.map((district) => {
            const count = getDestinationsByDistrict(district.slug).length;
            const isActive = selectedDistrict === district.slug;
            return (
              <motion.button
                key={district.id}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => setSelectedDistrict(isActive ? 'all' : district.slug)}
                className={`relative overflow-hidden rounded-2xl group cursor-pointer transition-all duration-500 ${
                  isActive
                    ? 'ring-2 ring-kerala-green ring-offset-2 dark:ring-offset-gray-950 shadow-glow-green'
                    : 'shadow-elevated hover:shadow-elevated-lg'
                }`}
              >
                <div className="aspect-[4/3] relative">
                  <Image
                    src={district.image}
                    alt={district.name}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-700 ease-spring"
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 14vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-2.5">
                    <p className="text-white text-xs md:text-sm font-semibold leading-tight">
                      {district.name}
                    </p>
                    <p className="text-white/60 text-[10px] md:text-xs mt-0.5">
                      {count} place{count !== 1 ? 's' : ''}
                    </p>
                  </div>
                  {isActive && (
                    <div className="absolute top-1.5 right-1.5 bg-kerala-green text-white rounded-full w-5 h-5 flex items-center justify-center text-xs shadow-lg">
                      ✓
                    </div>
                  )}
                </div>
              </motion.button>
            );
          })}
        </div>
      </section>

      {/* Filters & Search */}
      <section className="max-w-7xl mx-auto px-4 pb-6">
        <div className="glass-card rounded-3xl p-5 md:p-6">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search */}
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-gray-400" size={18} />
                <input
                  type="text"
                  placeholder="Search destinations..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-11 pr-4 py-3 rounded-2xl border border-gray-200/80 dark:border-gray-700/80 bg-white/80 dark:bg-gray-900/80 text-gray-900 dark:text-white placeholder-gray-400 focus:ring-2 focus:ring-kerala-green/30 focus:border-kerala-green/50 outline-none transition-all duration-300 text-sm"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    <X size={16} />
                  </button>
                )}
              </div>
            </div>

            {/* Type Filter */}
            <div className="flex flex-wrap gap-2">
              {DESTINATION_TYPES.map((type) => (
                <button
                  key={type.value}
                  onClick={() => setSelectedType(type.value)}
                  className={`px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 flex items-center gap-1.5 ${
                    selectedType === type.value
                      ? 'bg-gradient-to-r from-kerala-green to-emerald-600 text-white shadow-lg shadow-kerala-green/20'
                      : 'bg-white/80 dark:bg-gray-800/80 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700/80 border border-gray-200/50 dark:border-gray-700/50'
                  }`}
                >
                  <span className="text-xs">{type.icon}</span>
                  {type.label}
                </button>
              ))}
            </div>

            {/* Sort */}
            <div>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-3 rounded-2xl border border-gray-200/80 dark:border-gray-700/80 bg-white/80 dark:bg-gray-900/80 text-gray-900 dark:text-white focus:ring-2 focus:ring-kerala-green/30 outline-none text-sm appearance-none cursor-pointer transition-all duration-300"
              >
                {SORT_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Active Filters */}
          <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-200/50 dark:border-gray-800/50">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              <span className="font-bold text-gray-900 dark:text-white text-base">{filteredDestinations.length}</span>{' '}
              destination{filteredDestinations.length !== 1 ? 's' : ''} found
              {selectedDistrict !== 'all' && (
                <span className="ml-1">
                  in <span className="text-kerala-green dark:text-emerald-400 font-semibold">{districts.find(d => d.slug === selectedDistrict)?.name}</span>
                </span>
              )}
            </p>
            {(selectedDistrict !== 'all' || selectedType !== 'all' || searchQuery) && (
              <button
                onClick={() => {
                  setSelectedDistrict('all');
                  setSelectedType('all');
                  setSearchQuery('');
                }}
                className="text-sm text-kerala-green dark:text-emerald-400 hover:underline font-semibold flex items-center gap-1"
              >
                <X size={14} /> Clear filters
              </button>
            )}
          </div>
        </div>
      </section>

      {/* Destinations Grid */}
      <section className="max-w-7xl mx-auto px-4 pb-24">
        <AnimatePresence mode="wait">
          {filteredDestinations.length === 0 ? (
            <motion.div
              key="empty"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="text-center py-24"
            >
              <div className="w-20 h-20 bg-gray-100 dark:bg-gray-800 rounded-3xl flex items-center justify-center mx-auto mb-6">
                <Search size={32} className="text-gray-400" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">No destinations found</h3>
              <p className="text-gray-500 dark:text-gray-400 mb-8 max-w-md mx-auto">Try adjusting your filters or search query to discover more places</p>
              <button
                onClick={() => {
                  setSelectedDistrict('all');
                  setSelectedType('all');
                  setSearchQuery('');
                }}
                className="btn-primary"
              >
                Show all destinations
              </button>
            </motion.div>
          ) : (
            <motion.div
              key="grid"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6"
            >
              {filteredDestinations.map((destination, index) => (
                <Reveal key={destination.id} delay={(index % 6) * 0.04}>
                  <Link href={`/destinations/${destination.slug}`}>
                    <div className="group bg-white dark:bg-gray-900 rounded-3xl overflow-hidden shadow-elevated hover:shadow-elevated-lg transition-all duration-500 border border-gray-100/80 dark:border-gray-800/80 h-full flex flex-col card-glow">
                      {/* Image */}
                      <div className="relative h-56 overflow-hidden">
                        <Image
                          src={destination.images[0]}
                          alt={destination.name}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-700 ease-spring"
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/5 to-transparent" />

                        {/* Featured badge */}
                        {destination.featured && (
                          <span className="absolute top-3 left-3 bg-gradient-to-r from-kerala-gold to-amber-500 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg flex items-center gap-1">
                            <Star size={11} fill="currentColor" /> Featured
                          </span>
                        )}

                        {/* Rating */}
                        <div className="absolute top-3 right-3 bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl rounded-full px-2.5 py-1 flex items-center gap-1 shadow-lg">
                          <Star size={12} className="text-kerala-gold" fill="currentColor" />
                          <span className="text-sm font-bold text-gray-900 dark:text-white">{destination.rating}</span>
                        </div>

                        {/* District tag */}
                        <div className="absolute bottom-3 left-3">
                          <span className="glass text-white text-xs font-medium px-3 py-1.5 rounded-full flex items-center gap-1.5">
                            <MapPin size={11} /> {destination.district}
                          </span>
                        </div>
                      </div>

                      {/* Content */}
                      <div className="p-5 flex-1 flex flex-col">
                        <h3 className="text-lg font-bold text-gray-900 dark:text-white group-hover:text-kerala-green dark:group-hover:text-emerald-400 transition-colors duration-300">
                          {destination.name}
                        </h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1.5 line-clamp-2 flex-1 leading-relaxed">
                          {destination.description}
                        </p>

                        {/* Tags */}
                        <div className="flex flex-wrap gap-1.5 mt-3">
                          {destination.type.slice(0, 3).map((t) => (
                            <span
                              key={t}
                              className="tag-pill text-xs px-2.5 py-0.5 rounded-full capitalize text-kerala-green dark:text-emerald-400"
                            >
                              {t}
                            </span>
                          ))}
                        </div>

                        {/* Footer */}
                        <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100 dark:border-gray-800">
                          <div className="flex items-center gap-3 text-xs text-gray-400">
                            <span className={`flex items-center gap-1 font-medium ${
                              destination.crowdLevel === 'low' ? 'text-emerald-600 dark:text-emerald-400' :
                              destination.crowdLevel === 'medium' ? 'text-amber-600 dark:text-amber-400' :
                              'text-red-500 dark:text-red-400'
                            }`}>
                              <Users size={12} /> {destination.crowdLevel}
                            </span>
                            <span className="flex items-center gap-1"><Wallet size={12} /> {destination.budgetRange}</span>
                          </div>
                          <span className="text-xs text-gray-400 dark:text-gray-500">
                            {destination.reviews.toLocaleString()} reviews
                          </span>
                        </div>
                      </div>
                    </div>
                  </Link>
                </Reveal>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </section>
    </div>
  );
}

export default function DestinationsPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-950">
          <div className="text-center">
            <div className="relative w-16 h-16 mx-auto mb-6">
              <div className="absolute inset-0 border-4 border-kerala-green/20 rounded-full" />
              <div className="absolute inset-0 border-4 border-kerala-green border-t-transparent rounded-full animate-spin" />
            </div>
            <p className="text-gray-500 dark:text-gray-400 font-medium">Loading destinations...</p>
          </div>
        </div>
      }
    >
      <DestinationsContent />
    </Suspense>
  );
}

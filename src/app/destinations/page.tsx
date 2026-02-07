'use client';

import { Suspense, useState, useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { districts, destinations, getDestinationsByDistrict } from '@/data/destinations';
import { DestinationType } from '@/types';

const DESTINATION_TYPES: { value: DestinationType | 'all'; label: string }[] = [
  { value: 'all', label: 'All Types' },
  { value: 'beach', label: '🏖️ Beaches' },
  { value: 'hill', label: '⛰️ Hill Stations' },
  { value: 'backwater', label: '🛶 Backwaters' },
  { value: 'spiritual', label: '🛕 Spiritual' },
  { value: 'heritage', label: '🏛️ Heritage' },
  { value: 'wildlife', label: '🐘 Wildlife' },
  { value: 'nature', label: '🌿 Nature' },
  { value: 'urban', label: '🏙️ Urban' },
];

const SORT_OPTIONS = [
  { value: 'popularity', label: 'Most Popular' },
  { value: 'rating', label: 'Highest Rated' },
  { value: 'name', label: 'Name (A-Z)' },
];

function DestinationsContent() {
  const searchParams = useSearchParams();
  const districtParam = searchParams.get('district');

  const [selectedDistrict, setSelectedDistrict] = useState<string>(districtParam || 'all');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('popularity');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const filteredDestinations = useMemo(() => {
    let filtered = [...destinations];

    // Filter by district
    if (selectedDistrict !== 'all') {
      filtered = filtered.filter(d => d.districtSlug === selectedDistrict);
    }

    // Filter by type
    if (selectedType !== 'all') {
      filtered = filtered.filter(d => d.type.includes(selectedType as DestinationType));
    }

    // Filter by search
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      filtered = filtered.filter(
        d =>
          d.name.toLowerCase().includes(q) ||
          d.district.toLowerCase().includes(q) ||
          d.description.toLowerCase().includes(q)
      );
    }

    // Sort
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
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      {/* Hero Section */}
      <section className="relative h-[50vh] min-h-[400px] flex items-center justify-center overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=1600"
          alt="Kerala Destinations"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />
        <div className="relative z-10 text-center px-4">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-bold text-white mb-4"
          >
            Explore Kerala&apos;s Destinations
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg md:text-xl text-white/90 max-w-3xl mx-auto"
          >
            All 14 districts, {destinations.length} breathtaking attractions — from pristine beaches to misty hill stations
          </motion.p>
        </div>
      </section>

      {/* District Cards */}
      <section className="max-w-7xl mx-auto px-4 py-12">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-6">
          14 Districts of Kerala
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-3">
          {districts.map((district) => {
            const count = getDestinationsByDistrict(district.slug).length;
            const isActive = selectedDistrict === district.slug;
            return (
              <motion.button
                key={district.id}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedDistrict(isActive ? 'all' : district.slug)}
                className={`relative overflow-hidden rounded-xl shadow-md group cursor-pointer transition-all ${
                  isActive
                    ? 'ring-2 ring-emerald-500 ring-offset-2 dark:ring-offset-gray-950'
                    : 'hover:shadow-lg'
                }`}
              >
                <div className="aspect-[4/3] relative">
                  <Image
                    src={district.image}
                    alt={district.name}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-300"
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 14vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-2">
                    <p className="text-white text-xs md:text-sm font-semibold leading-tight">
                      {district.name}
                    </p>
                    <p className="text-white/80 text-[10px] md:text-xs">
                      {count} attraction{count !== 1 ? 's' : ''}
                    </p>
                  </div>
                  {isActive && (
                    <div className="absolute top-1 right-1 bg-emerald-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
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
        <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-800 p-4 md:p-6">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search */}
            <div className="flex-1">
              <div className="relative">
                <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <input
                  type="text"
                  placeholder="Search destinations..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none"
                />
              </div>
            </div>

            {/* Type Filter */}
            <div className="flex flex-wrap gap-2">
              {DESTINATION_TYPES.map((type) => (
                <button
                  key={type.value}
                  onClick={() => setSelectedType(type.value)}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                    selectedType === type.value
                      ? 'bg-emerald-500 text-white shadow-md'
                      : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                  }`}
                >
                  {type.label}
                </button>
              ))}
            </div>

            {/* Sort */ }
            <div>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-2.5 rounded-xl border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-emerald-500 outline-none text-sm"
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
          <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-200 dark:border-gray-800">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              <span className="font-semibold text-gray-900 dark:text-white">{filteredDestinations.length}</span>{' '}
              destination{filteredDestinations.length !== 1 ? 's' : ''} found
              {selectedDistrict !== 'all' && (
                <span className="ml-1">
                  in <span className="text-emerald-600 dark:text-emerald-400 font-medium">{districts.find(d => d.slug === selectedDistrict)?.name}</span>
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
                className="text-sm text-emerald-600 dark:text-emerald-400 hover:underline font-medium"
              >
                Clear all filters
              </button>
            )}
          </div>
        </div>
      </section>

      {/* Destinations Grid */}
      <section className="max-w-7xl mx-auto px-4 pb-20">
        <AnimatePresence mode="wait">
          {filteredDestinations.length === 0 ? (
            <motion.div
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center py-20"
            >
              <p className="text-6xl mb-4">🔍</p>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">No destinations found</h3>
              <p className="text-gray-500 dark:text-gray-400 mb-6">Try adjusting your filters or search query</p>
              <button
                onClick={() => {
                  setSelectedDistrict('all');
                  setSelectedType('all');
                  setSearchQuery('');
                }}
                className="px-6 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors"
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
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {filteredDestinations.map((destination, index) => (
                <motion.div
                  key={destination.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.03, duration: 0.3 }}
                >
                  <Link href={`/destinations/${destination.slug}`}>
                    <div className="group bg-white dark:bg-gray-900 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-200 dark:border-gray-800 h-full flex flex-col">
                      {/* Image */}
                      <div className="relative h-52 overflow-hidden">
                        <Image
                          src={destination.images[0]}
                          alt={destination.name}
                          fill
                          className="object-cover group-hover:scale-110 transition-transform duration-500"
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />

                        {/* Featured badge */}
                        {destination.featured && (
                          <span className="absolute top-3 left-3 bg-amber-500 text-white text-xs font-bold px-2.5 py-1 rounded-full shadow">
                            ⭐ Featured
                          </span>
                        )}

                        {/* Rating */}
                        <div className="absolute top-3 right-3 bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm rounded-full px-2.5 py-1 flex items-center gap-1 shadow">
                          <span className="text-amber-500 text-sm">★</span>
                          <span className="text-sm font-semibold text-gray-900 dark:text-white">{destination.rating}</span>
                        </div>

                        {/* District tag */}
                        <div className="absolute bottom-3 left-3">
                          <span className="bg-white/20 backdrop-blur-md text-white text-xs font-medium px-2.5 py-1 rounded-full border border-white/30">
                            📍 {destination.district}
                          </span>
                        </div>
                      </div>

                      {/* Content */}
                      <div className="p-4 flex-1 flex flex-col">
                        <h3 className="text-lg font-bold text-gray-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                          {destination.name}
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1 line-clamp-2 flex-1">
                          {destination.description}
                        </p>

                        {/* Tags */}
                        <div className="flex flex-wrap gap-1.5 mt-3">
                          {destination.type.slice(0, 3).map((t) => (
                            <span
                              key={t}
                              className="text-xs bg-emerald-50 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 px-2 py-0.5 rounded-full capitalize"
                            >
                              {t}
                            </span>
                          ))}
                        </div>

                        {/* Footer */}
                        <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-100 dark:border-gray-800">
                          <div className="flex items-center gap-3 text-xs text-gray-500 dark:text-gray-400">
                            <span className={`flex items-center gap-1 ${
                              destination.crowdLevel === 'low' ? 'text-green-600 dark:text-green-400' :
                              destination.crowdLevel === 'medium' ? 'text-amber-600 dark:text-amber-400' :
                              'text-red-600 dark:text-red-400'
                            }`}>
                              👥 {destination.crowdLevel}
                            </span>
                            <span>💰 {destination.budgetRange}</span>
                          </div>
                          <span className="text-xs text-gray-400 dark:text-gray-500">
                            {destination.reviews.toLocaleString()} reviews
                          </span>
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
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
            <div className="w-12 h-12 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
            <p className="text-gray-600 dark:text-gray-400">Loading destinations...</p>
          </div>
        </div>
      }
    >
      <DestinationsContent />
    </Suspense>
  );
}

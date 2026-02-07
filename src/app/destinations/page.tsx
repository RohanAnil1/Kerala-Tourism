'use client';

import { useState, useMemo, Suspense } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useSearchParams } from 'next/navigation';
import { destinations, districts } from '@/data/destinations';
import { useLanguage } from '@/contexts/LanguageContext';
import { Search, Filter, MapPin, Star, Users, ChevronDown, X, SlidersHorizontal } from 'lucide-react';
import { DestinationType } from '@/types';

const typeFilters: { id: DestinationType; label: string; icon: string }[] = [
  { id: 'nature', label: 'Nature', icon: '🌿' },
  { id: 'beach', label: 'Beach', icon: '🏖️' },
  { id: 'hill', label: 'Hill Station', icon: '⛰️' },
  { id: 'spiritual', label: 'Spiritual', icon: '🕉️' },
  { id: 'wildlife', label: 'Wildlife', icon: '🐘' },
  { id: 'backwater', label: 'Backwater', icon: '🛶' },
  { id: 'heritage', label: 'Heritage', icon: '🏛️' },
  { id: 'urban', label: 'Urban', icon: '🏙️' },
];

const crowdFilters = [
  { id: 'low', label: 'Low Crowd', color: 'bg-green-100 text-green-700' },
  { id: 'medium', label: 'Medium', color: 'bg-yellow-100 text-yellow-700' },
  { id: 'high', label: 'Popular', color: 'bg-red-100 text-red-700' },
];

const budgetFilters = [
  { id: 'budget', label: 'Budget', icon: '💰' },
  { id: 'mid-range', label: 'Mid-Range', icon: '💰💰' },
  { id: 'luxury', label: 'Luxury', icon: '💰💰💰' },
];

function DestinationsContent() {
  const { t } = useLanguage();
  const searchParams = useSearchParams();
  const initialDistrict = searchParams.get('district') || '';

  const [search, setSearch] = useState('');
  const [selectedTypes, setSelectedTypes] = useState<DestinationType[]>([]);
  const [selectedDistrict, setSelectedDistrict] = useState(initialDistrict);
  const [selectedCrowd, setSelectedCrowd] = useState('');
  const [selectedBudget, setSelectedBudget] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [sortBy, setSortBy] = useState<'rating' | 'reviews' | 'name'>('rating');

  const filteredDestinations = useMemo(() => {
    let filtered = destinations;

    if (search) {
      const q = search.toLowerCase();
      filtered = filtered.filter(
        d => d.name.toLowerCase().includes(q) || d.district.toLowerCase().includes(q) || d.description.toLowerCase().includes(q)
      );
    }

    if (selectedTypes.length > 0) {
      filtered = filtered.filter(d => d.type.some(t => selectedTypes.includes(t)));
    }

    if (selectedDistrict) {
      filtered = filtered.filter(d => d.district.toLowerCase().replace(/\s/g, '') === selectedDistrict.toLowerCase().replace(/\s/g, ''));
    }

    if (selectedCrowd) {
      filtered = filtered.filter(d => d.crowdLevel === selectedCrowd);
    }

    if (selectedBudget) {
      filtered = filtered.filter(d => d.budgetRange === selectedBudget);
    }

    // Sort
    filtered.sort((a, b) => {
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'reviews') return b.reviews - a.reviews;
      return a.name.localeCompare(b.name);
    });

    return filtered;
  }, [search, selectedTypes, selectedDistrict, selectedCrowd, selectedBudget, sortBy]);

  const toggleType = (type: DestinationType) => {
    setSelectedTypes(prev =>
      prev.includes(type) ? prev.filter(t => t !== type) : [...prev, type]
    );
  };

  const clearFilters = () => {
    setSearch('');
    setSelectedTypes([]);
    setSelectedDistrict('');
    setSelectedCrowd('');
    setSelectedBudget('');
  };

  const activeFilterCount = selectedTypes.length + (selectedDistrict ? 1 : 0) + (selectedCrowd ? 1 : 0) + (selectedBudget ? 1 : 0);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      {/* Hero Banner */}
      <section className="relative h-72 md:h-80 overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=1920"
          alt="Kerala Destinations"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-kerala-green/80 to-kerala-green/60" />
        <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4 pt-16">
          <h1 className="font-display text-4xl md:text-5xl font-bold text-white mb-3">
            {t('nav.destinations')}
          </h1>
          <p className="text-white/80 text-lg max-w-xl">
            From serene backwaters to misty mountains — explore every corner of God&apos;s Own Country
          </p>
        </div>
      </section>

      {/* Search & Filters */}
      <section className="container-custom -mt-8 relative z-20 px-4">
        <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl p-6">
          {/* Search Bar */}
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search destinations, districts..."
                className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 dark:bg-gray-800 dark:text-white focus:border-kerala-green focus:ring-2 focus:ring-kerala-green/20 outline-none transition-all"
              />
            </div>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`flex items-center gap-2 px-5 py-3 rounded-xl border transition-all ${
                showFilters || activeFilterCount > 0
                  ? 'bg-kerala-green text-white border-kerala-green'
                  : 'border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800'
              }`}
            >
              <SlidersHorizontal size={18} />
              Filters
              {activeFilterCount > 0 && (
                <span className="bg-white text-kerala-green text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
                  {activeFilterCount}
                </span>
              )}
            </button>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="px-5 py-3 rounded-xl border border-gray-200 dark:border-gray-700 dark:bg-gray-800 text-gray-700 dark:text-gray-300 focus:outline-none focus:border-kerala-green"
            >
              <option value="rating">Sort by Rating</option>
              <option value="reviews">Most Reviewed</option>
              <option value="name">A-Z</option>
            </select>
          </div>

          {/* Expanded Filters */}
          {showFilters && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="mt-6 pt-6 border-t overflow-hidden"
            >
              {/* Type Filters */}
              <div className="mb-5">
                <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">Type</h3>
                <div className="flex flex-wrap gap-2">
                  {typeFilters.map(type => (
                    <button
                      key={type.id}
                      onClick={() => toggleType(type.id)}
                      className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm transition-all ${
                        selectedTypes.includes(type.id)
                          ? 'bg-kerala-green text-white'
                          : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                      }`}
                    >
                      <span>{type.icon}</span> {type.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* District Filter */}
              <div className="mb-5">
                <h3 className="text-sm font-semibold text-gray-700 mb-3">District</h3>
                <select
                  value={selectedDistrict}
                  onChange={(e) => setSelectedDistrict(e.target.value)}
                  className="px-4 py-2 rounded-xl border border-gray-200 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 text-sm focus:outline-none focus:border-kerala-green"
                >
                  <option value="">All Districts</option>
                  {districts.map(d => (
                    <option key={d.id} value={d.slug}>{d.name}</option>
                  ))}
                </select>
              </div>

              {/* Crowd & Budget */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">Crowd Level</h3>
                  <div className="flex gap-2">
                    {crowdFilters.map(c => (
                      <button
                        key={c.id}
                        onClick={() => setSelectedCrowd(selectedCrowd === c.id ? '' : c.id)}
                        className={`px-4 py-2 rounded-full text-sm transition-all ${
                          selectedCrowd === c.id ? 'bg-kerala-green text-white' : c.color
                        }`}
                      >
                        {c.label}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">Budget Range</h3>
                  <div className="flex gap-2">
                    {budgetFilters.map(b => (
                      <button
                        key={b.id}
                        onClick={() => setSelectedBudget(selectedBudget === b.id ? '' : b.id)}
                        className={`px-4 py-2 rounded-full text-sm transition-all ${
                          selectedBudget === b.id ? 'bg-kerala-green text-white' : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                        }`}
                      >
                        {b.icon} {b.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {activeFilterCount > 0 && (
                <button
                  onClick={clearFilters}
                  className="mt-4 flex items-center gap-2 text-sm text-red-500 hover:text-red-700"
                >
                  <X size={16} /> Clear all filters
                </button>
              )}
            </motion.div>
          )}
        </div>
      </section>

      {/* Results */}
      <section className="container-custom px-4 py-12">
        <p className="text-gray-500 dark:text-gray-400 mb-6">{filteredDestinations.length !== 1 ? 's' : ''} found
        </p>

        {filteredDestinations.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-6xl mb-4">🔍</p>
            <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-2">No destinations found</h3>
            <p className="text-gray-500 dark:text-gray-400 mb-4">Try adjusting your filters or search term</p>
            <button onClick={clearFilters} className="btn-primary">Clear Filters</button>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredDestinations.map((dest, i) => (
              <motion.div
                key={dest.id}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: i * 0.05 }}
              >
                <Link href={`/destinations/${dest.slug}`} className="card-hover block bg-white dark:bg-gray-900 rounded-2xl overflow-hidden shadow-sm group">
                  <div className="relative h-56 overflow-hidden">
                    <Image
                      src={dest.images[0]}
                      alt={dest.name}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    
                    <div className="absolute top-4 left-4 flex gap-2">
                      {dest.type.slice(0, 2).map(type => (
                        <span key={type} className="bg-white/20 backdrop-blur-sm text-white text-xs px-3 py-1 rounded-full capitalize">
                          {type}
                        </span>
                      ))}
                    </div>

                    <div className="absolute top-4 right-4">
                      <span className={`text-xs px-3 py-1 rounded-full ${
                        dest.crowdLevel === 'low' ? 'bg-green-500/80 text-white' :
                        dest.crowdLevel === 'medium' ? 'bg-yellow-500/80 text-white' :
                        'bg-red-500/80 text-white'
                      }`}>
                        <Users size={12} className="inline mr-1" />
                        {dest.crowdLevel}
                      </span>
                    </div>

                    <div className="absolute bottom-4 left-4">
                      <h3 className="text-xl font-display font-bold text-white">{dest.name}</h3>
                      <div className="flex items-center gap-1 text-white/80 text-sm">
                        <MapPin size={14} /> {dest.district}
                      </div>
                    </div>
                  </div>

                  <div className="p-5">
                    <p className="text-gray-600 dark:text-gray-400 text-sm mb-3 line-clamp-2">{dest.description}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="flex items-center gap-1 text-yellow-500">
                          <Star size={14} fill="currentColor" />
                          <span className="text-gray-900 dark:text-white font-semibold text-sm">{dest.rating}</span>
                        </div>
                        <span className="text-gray-400 text-sm">({dest.reviews.toLocaleString()})</span>
                      </div>
                      <span className="text-xs capitalize bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 px-3 py-1 rounded-full">
                        {dest.budgetRange}
                      </span>
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

export default function DestinationsPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex items-center justify-center">
        <div className="animate-pulse text-kerala-green text-xl">Loading destinations...</div>
      </div>
    }>
      <DestinationsContent />
    </Suspense>
  );
}

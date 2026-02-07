'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { accommodations } from '@/data/accommodations';
import { Search, Star, MapPin, Wifi, Car, Coffee, Waves, TreePine, Heart, SlidersHorizontal, X } from 'lucide-react';

const TYPES = [
  { value: 'all', label: 'All Types' },
  { value: 'resort', label: 'Resorts' },
  { value: 'hotel', label: 'Hotels' },
  { value: 'homestay', label: 'Homestays' },
  { value: 'houseboat', label: 'Houseboats' },
  { value: 'hostel', label: 'Hostels' },
];

const AMENITY_ICONS: Record<string, React.ReactNode> = {
  'Wi-Fi': <Wifi size={14} />,
  'Swimming Pool': <Waves size={14} />,
  'Parking': <Car size={14} />,
  'Restaurant': <Coffee size={14} />,
  'Garden': <TreePine size={14} />,
};

export default function AccommodationPage() {
  const [search, setSearch] = useState('');
  const [type, setType] = useState('all');
  const [showFilters, setShowFilters] = useState(false);

  const filtered = accommodations
    .filter(a => type === 'all' || a.type === type)
    .filter(a =>
      search === '' ||
      a.name.toLowerCase().includes(search.toLowerCase()) ||
      a.location.toLowerCase().includes(search.toLowerCase())
    );

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      {/* Hero */}
      <section className="relative h-[35vh] bg-gradient-to-br from-kerala-green via-emerald-700 to-teal-800 flex items-center">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'1\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")' }} />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center w-full pt-16">
          <h1 className="font-display text-4xl md:text-5xl font-bold text-white mb-4">Where to Stay</h1>
          <p className="text-white/80 text-lg max-w-2xl mx-auto">
            From luxury lake resorts to charming homestays, find your perfect Kerala retreat
          </p>
        </div>
      </section>

      {/* Search & Filters */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-10">
        <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg p-4 md:p-6">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search by name or location..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-200 dark:border-gray-700 dark:bg-gray-800 dark:text-white rounded-xl focus:ring-2 focus:ring-kerala-green/30 focus:border-kerala-green outline-none"
              />
            </div>

            {/* Type Tabs */}
            <div className="flex gap-2 overflow-x-auto pb-1">
              {TYPES.map(t => (
                <button
                  key={t.value}
                  onClick={() => setType(t.value)}
                  className={`px-4 py-3 rounded-xl whitespace-nowrap text-sm font-medium transition-all ${
                    type === t.value
                      ? 'bg-kerala-green text-white shadow-md'
                      : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </div>

            {/* Filter Toggle */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 px-4 py-3 rounded-xl bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
            >
              <SlidersHorizontal size={18} />
              Filters
            </button>
          </div>

          {/* Expanded Filters */}
          {showFilters && (
            <div className="mt-4 pt-4 border-t dark:border-gray-700">
              <div className="flex flex-wrap items-center gap-6">
                <button
                  onClick={() => { setType('all'); setSearch(''); }}
                  className="text-sm text-red-500 hover:text-red-600 flex items-center gap-1"
                >
                  <X size={14} /> Clear all filters
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Results */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <p className="text-gray-500 dark:text-gray-400 mb-6">{filtered.length} properties found</p>

        {filtered.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map(acc => (
              <div
                key={acc.id}
                className="bg-white dark:bg-gray-900 rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 group"
              >
                {/* Image */}
                <div className="relative h-52 overflow-hidden">
                  <Image
                    src={acc.images[0]}
                    alt={acc.name}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3">
                    <span className="bg-white/90 dark:bg-gray-800/90 text-kerala-green text-xs font-semibold px-3 py-1 rounded-full capitalize">
                      {acc.type}
                    </span>
                  </div>
                  <button className="absolute top-3 right-3 w-9 h-9 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white hover:text-red-500 transition-colors">
                    <Heart size={16} />
                  </button>
                  <div className="absolute bottom-3 right-3 bg-black/60 text-white text-xs px-2 py-1 rounded-lg backdrop-blur-sm">
                    {acc.images.length} photos
                  </div>
                </div>

                {/* Info */}
                <div className="p-5">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-white text-lg">{acc.name}</h3>
                      <p className="text-gray-500 dark:text-gray-400 text-sm flex items-center gap-1">
                        <MapPin size={14} /> {acc.location}
                      </p>
                    </div>
                    <div className="flex items-center gap-1 bg-kerala-green/10 text-kerala-green px-2 py-1 rounded-lg">
                      <Star size={14} fill="currentColor" />
                      <span className="text-sm font-semibold">{acc.rating}</span>
                    </div>
                  </div>

                  <p className="text-gray-600 dark:text-gray-400 text-sm line-clamp-2 mb-3">{acc.description}</p>

                  {/* Amenities */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {acc.amenities.slice(0, 4).map(amenity => (
                      <span
                        key={amenity}
                        className="bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 text-xs px-2 py-1 rounded-md flex items-center gap-1"
                      >
                        {AMENITY_ICONS[amenity] || null} {amenity}
                      </span>
                    ))}
                    {acc.amenities.length > 4 && (
                      <span className="text-xs text-gray-400">+{acc.amenities.length - 4} more</span>
                    )}
                  </div>

                  {/* Price & CTA */}
                  <div className="flex items-end justify-between pt-3 border-t dark:border-gray-800">
                    <div>
                      <span className="text-lg font-bold text-kerala-green">{acc.priceRange}</span>
                    </div>
                    <button className="bg-kerala-green text-white px-5 py-2 rounded-xl text-sm font-medium hover:bg-kerala-green/90 transition-colors">
                      Book Now
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">🏠</div>
            <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-300">No properties found</h3>
            <p className="text-gray-500 dark:text-gray-400 mt-2">Try adjusting your filters or search terms</p>
          </div>
        )}
      </div>
    </div>
  );
}

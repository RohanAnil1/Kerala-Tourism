'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { allDishes, vegDishes, nonVegDishes, getFeaturedDishes, DishType } from '@/data/gods-own-flavours';
import { UtensilsCrossed, Leaf, Flame, MapPin, ChevronRight, Filter, Clock, Search, Drumstick, X } from 'lucide-react';

const dishTypes: { value: DishType | 'all'; label: string; icon: string }[] = [
  { value: 'all', label: 'All', icon: '🍽️' },
  { value: 'curry', label: 'Curries', icon: '🍛' },
  { value: 'rice', label: 'Rice Dishes', icon: '🍚' },
  { value: 'breakfast', label: 'Breakfast', icon: '🥞' },
  { value: 'snack', label: 'Snacks', icon: '🥨' },
  { value: 'dessert', label: 'Desserts', icon: '🍮' },
  { value: 'seafood', label: 'Seafood', icon: '🦐' },
  { value: 'street-food', label: 'Street Food', icon: '🍢' },
  { value: 'side-dish', label: 'Side Dishes', icon: '🥗' },
  { value: 'beverage', label: 'Beverages', icon: '☕' },
  { value: 'festive', label: 'Festive', icon: '🎊' },
];

const spiceLevels = [
  { value: 'mild', label: 'Mild', color: 'text-green-500', bg: 'bg-green-100 dark:bg-green-900/30' },
  { value: 'medium', label: 'Medium', color: 'text-yellow-500', bg: 'bg-yellow-100 dark:bg-yellow-900/30' },
  { value: 'hot', label: 'Hot', color: 'text-orange-500', bg: 'bg-orange-100 dark:bg-orange-900/30' },
  { value: 'very-hot', label: 'Very Hot', color: 'text-red-500', bg: 'bg-red-100 dark:bg-red-900/30' },
];

function getSpiceCount(level: string): number {
  switch (level) {
    case 'mild': return 1;
    case 'medium': return 2;
    case 'hot': return 3;
    case 'very-hot': return 4;
    default: return 1;
  }
}

export default function GodsOwnFlavoursPage() {
  const [categoryFilter, setCategoryFilter] = useState<'all' | 'veg' | 'non-veg'>('all');
  const [typeFilter, setTypeFilter] = useState<DishType | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [filterOpen, setFilterOpen] = useState(false);

  const filteredDishes = allDishes.filter(dish => {
    if (categoryFilter === 'veg' && dish.category !== 'veg') return false;
    if (categoryFilter === 'non-veg' && dish.category !== 'non-veg') return false;
    if (typeFilter !== 'all' && dish.dishType !== typeFilter) return false;
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      return (
        dish.name.toLowerCase().includes(query) ||
        dish.malayalamName.includes(query) ||
        dish.description.toLowerCase().includes(query) ||
        dish.ingredients.some(i => i.toLowerCase().includes(query))
      );
    }
    return true;
  });

  const featuredDishes = getFeaturedDishes();

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-950 dark:to-gray-900">
      {/* Hero Section */}
      <section className="relative h-[65vh] min-h-[520px] overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1626074353765-517a681e40be?w=1600"
            alt="Kerala Cuisine - Gods Own Flavours"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-gray-50 dark:to-gray-950" />
        </div>

        <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl"
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm text-white text-sm font-semibold mb-6">
              <UtensilsCrossed size={16} />
              Kerala Specialty Dishes
            </span>
            <h1 className="text-5xl md:text-7xl font-display font-bold text-white mb-6">
              God&apos;s Own{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-kerala-gold to-yellow-300">
                Flavours
              </span>
            </h1>
            <p className="text-xl text-gray-200 leading-relaxed max-w-2xl mb-8">
              Explore 60 authentic Kerala specialty dishes — from vegetarian Sadya delicacies to fiery coastal seafood.
              Discover the stories, ingredients, and flavors behind each dish.
            </p>
            <div className="flex flex-wrap gap-4">
              <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-xl px-5 py-3">
                <Leaf size={20} className="text-green-400" />
                <div>
                  <p className="text-white font-bold text-lg">{vegDishes.length}</p>
                  <p className="text-white/70 text-xs">Vegetarian</p>
                </div>
              </div>
              <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-xl px-5 py-3">
                <Drumstick size={20} className="text-orange-400" />
                <div>
                  <p className="text-white font-bold text-lg">{nonVegDishes.length}</p>
                  <p className="text-white/70 text-xs">Non-Vegetarian</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Filter Section */}
      <section className="sticky top-20 z-40 bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border-b border-gray-200/50 dark:border-gray-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between gap-4">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search dishes, ingredients..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white text-sm border-0 focus:ring-2 focus:ring-kerala-green outline-none"
              />
              {searchQuery && (
                <button onClick={() => setSearchQuery('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                  <X size={16} />
                </button>
              )}
            </div>

            {/* Veg/Non-veg Toggle */}
            <div className="hidden sm:flex items-center gap-2">
              {(['all', 'veg', 'non-veg'] as const).map(cat => (
                <button
                  key={cat}
                  onClick={() => setCategoryFilter(cat)}
                  className={`px-4 py-2 rounded-xl text-sm font-medium transition-all flex items-center gap-1.5 ${
                    categoryFilter === cat
                      ? cat === 'veg'
                        ? 'bg-green-500 text-white shadow-lg'
                        : cat === 'non-veg'
                          ? 'bg-red-500 text-white shadow-lg'
                          : 'bg-kerala-green text-white shadow-lg'
                      : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                  }`}
                >
                  {cat === 'veg' && <Leaf size={14} />}
                  {cat === 'non-veg' && <Drumstick size={14} />}
                  {cat === 'all' ? 'All' : cat === 'veg' ? 'Vegetarian' : 'Non-Veg'}
                </button>
              ))}
            </div>

            <button
              onClick={() => setFilterOpen(!filterOpen)}
              className="lg:hidden p-2.5 rounded-xl bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300"
            >
              <Filter size={20} />
            </button>
          </div>

          {/* Dish Type Filters */}
          <div className="hidden lg:flex items-center gap-2 mt-3 flex-wrap">
            {dishTypes.map(type => (
              <button
                key={type.value}
                onClick={() => setTypeFilter(type.value)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all flex items-center gap-1 ${
                  typeFilter === type.value
                    ? 'bg-kerala-green text-white shadow-md'
                    : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'
                }`}
              >
                <span>{type.icon}</span>
                {type.label}
              </button>
            ))}
          </div>

          {/* Mobile Filter */}
          <AnimatePresence>
            {filterOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="lg:hidden mt-4 pt-4 border-t border-gray-200 dark:border-gray-800 space-y-3"
              >
                <div className="flex gap-2">
                  {(['all', 'veg', 'non-veg'] as const).map(cat => (
                    <button
                      key={cat}
                      onClick={() => setCategoryFilter(cat)}
                      className={`px-3 py-2 rounded-xl text-sm font-medium flex-1 ${
                        categoryFilter === cat
                          ? 'bg-kerala-green text-white'
                          : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300'
                      }`}
                    >
                      {cat === 'all' ? 'All' : cat === 'veg' ? '🌿 Veg' : '🍗 Non-Veg'}
                    </button>
                  ))}
                </div>
                <div className="grid grid-cols-3 gap-2">
                  {dishTypes.map(type => (
                    <button
                      key={type.value}
                      onClick={() => {
                        setTypeFilter(type.value);
                        setFilterOpen(false);
                      }}
                      className={`px-2 py-2 rounded-lg text-xs font-medium ${
                        typeFilter === type.value
                          ? 'bg-kerala-green text-white'
                          : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300'
                      }`}
                    >
                      {type.icon} {type.label}
                    </button>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* Featured Dishes */}
      {categoryFilter === 'all' && typeFilter === 'all' && !searchQuery && (
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-display font-bold text-gray-900 dark:text-white mb-4">
                Must-Try Kerala Dishes
              </h2>
              <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                These iconic dishes define the soul of Kerala cooking — start your flavour journey here
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredDishes.slice(0, 6).map((dish, index) => (
                <motion.div
                  key={dish.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link href={`/gods-own-flavours/${dish.slug}`} className="group block">
                    <div className="relative bg-white dark:bg-gray-800 rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500">
                      <div className="relative h-64 overflow-hidden">
                        <Image
                          src={dish.image}
                          alt={dish.name}
                          fill
                          className="object-cover group-hover:scale-110 transition-transform duration-700"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                        <div className="absolute top-4 right-4 flex flex-col gap-2">
                          <span className={`px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1 ${
                            dish.category === 'veg'
                              ? 'bg-green-500 text-white'
                              : 'bg-red-500 text-white'
                          }`}>
                            {dish.category === 'veg' ? <Leaf size={12} /> : <Drumstick size={12} />}
                            {dish.category === 'veg' ? 'Veg' : 'Non-Veg'}
                          </span>
                          <span className="px-3 py-1 bg-kerala-gold text-white rounded-full text-xs font-semibold">
                            Featured
                          </span>
                        </div>
                        <div className="absolute bottom-4 left-4">
                          <h3 className="text-xl font-bold text-white mb-1">{dish.name}</h3>
                          <p className="text-sm text-white/80">{dish.malayalamName}</p>
                        </div>
                      </div>

                      <div className="p-6">
                        <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-2">
                          {dish.description}
                        </p>

                        <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400 mb-4">
                          <span className="flex items-center gap-1">
                            <Clock size={12} />
                            {dish.cookTime}
                          </span>
                          <div className="flex items-center gap-1">
                            {[...Array(getSpiceCount(dish.spiceLevel))].map((_, i) => (
                              <Flame key={i} size={12} className={spiceLevels.find(s => s.value === dish.spiceLevel)?.color} />
                            ))}
                          </div>
                          <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded-full capitalize">
                            {dish.dishType.replace('-', ' ')}
                          </span>
                        </div>

                        <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
                          <div className="flex items-center gap-1 text-xs text-gray-500">
                            <MapPin size={12} />
                            {dish.popularIn[0]}
                          </div>
                          <span className="text-sm font-medium text-kerala-green dark:text-emerald-400 group-hover:underline flex items-center gap-1">
                            View Recipe <ChevronRight size={14} />
                          </span>
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* All Dishes Grid */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl md:text-3xl font-display font-bold text-gray-900 dark:text-white">
              {categoryFilter === 'veg' ? '🌿 Vegetarian Dishes' : categoryFilter === 'non-veg' ? '🍗 Non-Vegetarian Dishes' : 'All Dishes'}
              {typeFilter !== 'all' && ` — ${dishTypes.find(t => t.value === typeFilter)?.label}`}
            </h2>
            <span className="text-gray-500 dark:text-gray-400 text-sm">
              {filteredDishes.length} {filteredDishes.length === 1 ? 'dish' : 'dishes'}
            </span>
          </div>

          {filteredDishes.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-6xl mb-4">🍽️</p>
              <p className="text-gray-500 dark:text-gray-400 text-lg mb-2">
                No dishes found matching your filters.
              </p>
              <button
                onClick={() => {
                  setCategoryFilter('all');
                  setTypeFilter('all');
                  setSearchQuery('');
                }}
                className="text-kerala-green hover:underline text-sm"
              >
                Clear all filters
              </button>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredDishes.map((dish, index) => (
                <motion.div
                  key={dish.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: Math.min(index * 0.03, 0.3) }}
                >
                  <Link href={`/gods-own-flavours/${dish.slug}`} className="group block h-full">
                    <div className="h-full bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                      <div className="relative h-48 overflow-hidden">
                        <Image
                          src={dish.image}
                          alt={dish.name}
                          fill
                          className="object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                        <div className="absolute top-3 left-3">
                          <span className={`px-2 py-1 rounded-full text-xs font-semibold flex items-center gap-1 ${
                            dish.category === 'veg'
                              ? 'bg-green-500 text-white'
                              : 'bg-red-500 text-white'
                          }`}>
                            {dish.category === 'veg' ? <Leaf size={10} /> : <Drumstick size={10} />}
                          </span>
                        </div>
                        <div className="absolute top-3 right-3 flex items-center gap-1">
                          {[...Array(getSpiceCount(dish.spiceLevel))].map((_, i) => (
                            <Flame key={i} size={12} className={`${spiceLevels.find(s => s.value === dish.spiceLevel)?.color} drop-shadow-md`} />
                          ))}
                        </div>
                      </div>

                      <div className="p-4">
                        <div className="flex items-start justify-between mb-1">
                          <h3 className="font-bold text-gray-900 dark:text-white line-clamp-1 group-hover:text-kerala-green transition-colors">
                            {dish.name}
                          </h3>
                        </div>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">
                          {dish.malayalamName}
                        </p>
                        <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-2 mb-3">
                          {dish.description}
                        </p>
                        <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
                          <span className="flex items-center gap-1">
                            <Clock size={11} />
                            {dish.cookTime}
                          </span>
                          <span className="px-2 py-0.5 bg-gray-100 dark:bg-gray-700 rounded-full capitalize">
                            {dish.dishType.replace('-', ' ')}
                          </span>
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-kerala-green to-emerald-600">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-6">
              Plan Your Kerala Food Trail
            </h2>
            <p className="text-xl text-white/90 mb-8">
              From Thalassery biryani to Alleppey fish curry — taste your way through God&apos;s Own Country
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link
                href="/foods"
                className="inline-flex items-center gap-2 px-8 py-4 bg-white text-kerala-green rounded-2xl font-semibold hover:shadow-2xl hover:scale-105 transition-all duration-300"
              >
                <UtensilsCrossed size={20} />
                Explore Kerala Foods
              </Link>
              <Link
                href="/trip-planner"
                className="inline-flex items-center gap-2 px-8 py-4 bg-white/10 text-white border-2 border-white/30 rounded-2xl font-semibold hover:bg-white/20 transition-all duration-300"
              >
                Plan Your Trip
                <ChevronRight size={20} />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

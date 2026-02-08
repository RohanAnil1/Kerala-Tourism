'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { kerallaFoods, getFeaturedFoods, FoodCategory } from '@/data/foods';
import { UtensilsCrossed, Leaf, Flame, MapPin, ChevronRight, Filter } from 'lucide-react';

const categories: { value: FoodCategory; label: string; icon: string }[] = [
  { value: 'main-course', label: 'Main Course', icon: '🍛' },
  { value: 'breakfast', label: 'Breakfast', icon: '🥞' },
  { value: 'snacks', label: 'Snacks', icon: '🥨' },
  { value: 'desserts', label: 'Desserts', icon: '🍮' },
  { value: 'beverages', label: 'Beverages', icon: '☕' },
  { value: 'festive', label: 'Festive', icon: '🎊' },
];

const spiceLevels = [
  { value: 'mild', label: 'Mild', color: 'text-green-500' },
  { value: 'medium', label: 'Medium', color: 'text-yellow-500' },
  { value: 'hot', label: 'Hot', color: 'text-orange-500' },
  { value: 'very-hot', label: 'Very Hot', color: 'text-red-500' },
];

export default function FoodsPage() {
  const [selectedCategory, setSelectedCategory] = useState<FoodCategory | 'all'>('all');
  const [vegetarianOnly, setVegetarianOnly] = useState(false);
  const [filterOpen, setFilterOpen] = useState(false);

  const filteredFoods = kerallaFoods.filter(food => {
    if (selectedCategory !== 'all' && food.category !== selectedCategory) return false;
    if (vegetarianOnly && !food.vegetarian) return false;
    return true;
  });

  const featuredFoods = getFeaturedFoods();

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-950 dark:to-gray-900">
      {/* Hero Section */}
      <section className="relative h-[60vh] min-h-[500px] overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1626074353765-517a681e40be?w=1600"
            alt="Kerala Cuisine"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-gray-50 dark:to-gray-950" />
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
              Kerala Cuisine
            </span>
            <h1 className="text-5xl md:text-7xl font-display font-bold text-white mb-6">
              Kerala&apos;s Special{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-kerala-gold to-yellow-300">
                Foods
              </span>
            </h1>
            <p className="text-xl text-gray-200 leading-relaxed max-w-2xl">
              Discover the rich flavors and aromatic spices of God&apos;s Own Country. From traditional sadya to coastal delicacies, experience Kerala&apos;s culinary heritage.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filter Section */}
      <section className="sticky top-20 z-40 bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border-b border-gray-200/50 dark:border-gray-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between gap-4">
            <div className="hidden md:flex items-center gap-2 flex-wrap">
              <button
                onClick={() => setSelectedCategory('all')}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                  selectedCategory === 'all'
                    ? 'bg-kerala-green text-white shadow-lg'
                    : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                }`}
              >
                All
              </button>
              {categories.map(cat => (
                <button
                  key={cat.value}
                  onClick={() => setSelectedCategory(cat.value)}
                  className={`px-4 py-2 rounded-xl text-sm font-medium transition-all flex items-center gap-1.5 ${
                    selectedCategory === cat.value
                      ? 'bg-kerala-green text-white shadow-lg'
                      : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                  }`}
                >
                  <span>{cat.icon}</span>
                  {cat.label}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => setVegetarianOnly(!vegetarianOnly)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                  vegetarianOnly
                    ? 'bg-green-500 text-white shadow-lg'
                    : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                }`}
              >
                <Leaf size={16} />
                Vegetarian
              </button>

              <button
                onClick={() => setFilterOpen(!filterOpen)}
                className="md:hidden p-2 rounded-xl bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300"
              >
                <Filter size={20} />
              </button>
            </div>
          </div>

          {/* Mobile Filter Menu */}
          {filterOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="md:hidden mt-4 pt-4 border-t border-gray-200 dark:border-gray-800"
            >
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => {
                    setSelectedCategory('all');
                    setFilterOpen(false);
                  }}
                  className={`px-3 py-2 rounded-xl text-sm font-medium ${
                    selectedCategory === 'all'
                      ? 'bg-kerala-green text-white'
                      : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300'
                  }`}
                >
                  All
                </button>
                {categories.map(cat => (
                  <button
                    key={cat.value}
                    onClick={() => {
                      setSelectedCategory(cat.value);
                      setFilterOpen(false);
                    }}
                    className={`px-3 py-2 rounded-xl text-sm font-medium flex items-center justify-center gap-1.5 ${
                      selectedCategory === cat.value
                        ? 'bg-kerala-green text-white'
                        : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300'
                    }`}
                  >
                    <span>{cat.icon}</span>
                    {cat.label}
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </div>
      </section>

      {/* Featured Foods Section */}
      {selectedCategory === 'all' && !vegetarianOnly && (
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-display font-bold text-gray-900 dark:text-white mb-4">
                Must-Try Dishes
              </h2>
              <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                Start your culinary journey with these iconic Kerala delicacies
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredFoods.map((food, index) => (
                <motion.div
                  key={food.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="group relative bg-white dark:bg-gray-800 rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500"
                >
                  <div className="relative h-64 overflow-hidden">
                    <Image
                      src={food.image}
                      alt={food.name}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute top-4 right-4 flex flex-col gap-2">
                      {food.vegetarian && (
                        <span className="px-3 py-1 bg-green-500 text-white rounded-full text-xs font-semibold flex items-center gap-1">
                          <Leaf size={12} />
                          Veg
                        </span>
                      )}
                      {food.featured && (
                        <span className="px-3 py-1 bg-kerala-gold text-white rounded-full text-xs font-semibold">
                          Featured
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="p-6">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">
                          {food.name}
                        </h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          {food.malayalamName}
                        </p>
                      </div>
                      <div className="flex items-center gap-1">
                        {[...Array(getSpiceCount(food.spiceLevel))].map((_, i) => (
                          <Flame key={i} size={14} className={spiceLevels.find(s => s.value === food.spiceLevel)?.color} />
                        ))}
                      </div>
                    </div>

                    <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-2">
                      {food.description}
                    </p>

                    <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400 mb-4">
                      <span className="flex items-center gap-1">
                        <MapPin size={12} />
                        {food.popularIn[0]}
                      </span>
                      <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded-full">
                        {categories.find(c => c.value === food.category)?.label}
                      </span>
                    </div>

                    <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                      <p className="text-xs text-gray-600 dark:text-gray-400 mb-2">Best places to try:</p>
                      <p className="text-sm font-medium text-kerala-green dark:text-emerald-400 line-clamp-1">
                        {food.bestPlacesToTry[0]}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* All Foods Grid */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl md:text-3xl font-display font-bold text-gray-900 dark:text-white">
              {selectedCategory === 'all' ? 'All Dishes' : categories.find(c => c.value === selectedCategory)?.label}
              {vegetarianOnly && ' (Vegetarian)'}
            </h2>
            <span className="text-gray-500 dark:text-gray-400">
              {filteredFoods.length} {filteredFoods.length === 1 ? 'dish' : 'dishes'}
            </span>
          </div>

          {filteredFoods.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-gray-500 dark:text-gray-400 text-lg">
                No dishes found matching your filters.
              </p>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredFoods.map((food, index) => (
                <motion.div
                  key={food.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                  className="group bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300"
                >
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={food.image}
                      alt={food.name}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    {food.vegetarian && (
                      <span className="absolute top-3 right-3 px-2 py-1 bg-green-500 text-white rounded-full text-xs font-semibold flex items-center gap-1">
                        <Leaf size={10} />
                      </span>
                    )}
                  </div>

                  <div className="p-4">
                    <h3 className="font-bold text-gray-900 dark:text-white mb-1 line-clamp-1">
                      {food.name}
                    </h3>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">
                      {food.malayalamName}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-2 mb-3">
                      {food.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1">
                        {[...Array(getSpiceCount(food.spiceLevel))].map((_, i) => (
                          <Flame key={i} size={12} className={spiceLevels.find(s => s.value === food.spiceLevel)?.color} />
                        ))}
                      </div>
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        {categories.find(c => c.value === food.category)?.icon}
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-kerala-green to-emerald-600">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-6">
              Experience Kerala&apos;s Culinary Heritage
            </h2>
            <p className="text-xl text-white/90 mb-8">
              Plan your food trail across Kerala&apos;s diverse regions and taste authentic flavors
            </p>
            <Link
              href="/destinations"
              className="inline-flex items-center gap-2 px-8 py-4 bg-white text-kerala-green rounded-2xl font-semibold hover:shadow-2xl hover:scale-105 transition-all duration-300"
            >
              Explore Destinations
              <ChevronRight size={20} />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

function getSpiceCount(level: string): number {
  switch (level) {
    case 'mild': return 1;
    case 'medium': return 2;
    case 'hot': return 3;
    case 'very-hot': return 4;
    default: return 1;
  }
}

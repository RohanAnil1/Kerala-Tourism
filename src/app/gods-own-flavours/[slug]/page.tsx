'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { getDishBySlug, allDishes } from '@/data/gods-own-flavours';
import { ArrowLeft, Leaf, Flame, MapPin, Clock, Users, ChefHat, Drumstick, Heart, Share2, ChevronRight } from 'lucide-react';
import { notFound } from 'next/navigation';

const spiceLevels: Record<string, { label: string; color: string; bg: string }> = {
  mild: { label: 'Mild', color: 'text-green-500', bg: 'bg-green-100 dark:bg-green-900/30' },
  medium: { label: 'Medium', color: 'text-yellow-500', bg: 'bg-yellow-100 dark:bg-yellow-900/30' },
  hot: { label: 'Hot', color: 'text-orange-500', bg: 'bg-orange-100 dark:bg-orange-900/30' },
  'very-hot': { label: 'Very Hot', color: 'text-red-500', bg: 'bg-red-100 dark:bg-red-900/30' },
};

function getSpiceCount(level: string): number {
  switch (level) {
    case 'mild': return 1;
    case 'medium': return 2;
    case 'hot': return 3;
    case 'very-hot': return 4;
    default: return 1;
  }
}

export default function DishDetailPage({ params }: { params: { slug: string } }) {
  const { slug } = params;
  const dish = getDishBySlug(slug);

  if (!dish) {
    notFound();
  }

  const spice = spiceLevels[dish.spiceLevel];

  // Get related dishes (same type or category, excluding current)
  const relatedDishes = allDishes
    .filter(d => d.id !== dish.id && (d.dishType === dish.dishType || d.category === dish.category))
    .slice(0, 4);

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      {/* Hero */}
      <section className="relative h-[50vh] md:h-[60vh] overflow-hidden">
        <Image
          src={dish.image}
          alt={dish.name}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

        <div className="absolute top-24 left-4 md:left-8 z-10">
          <Link href="/gods-own-flavours" className="flex items-center gap-2 text-white/80 hover:text-white transition-colors backdrop-blur-sm bg-white/10 rounded-full px-4 py-2">
            <ArrowLeft size={18} /> Back to Flavours
          </Link>
        </div>

        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-12">
          <div className="max-w-5xl mx-auto">
            <div className="flex flex-wrap gap-2 mb-4">
              <span className={`px-3 py-1 rounded-full text-sm font-semibold flex items-center gap-1 ${
                dish.category === 'veg' ? 'bg-green-500 text-white' : 'bg-red-500 text-white'
              }`}>
                {dish.category === 'veg' ? <Leaf size={14} /> : <Drumstick size={14} />}
                {dish.category === 'veg' ? 'Vegetarian' : 'Non-Vegetarian'}
              </span>
              <span className="bg-white/20 backdrop-blur-sm text-white text-sm px-3 py-1 rounded-full capitalize">
                {dish.dishType.replace('-', ' ')}
              </span>
            </div>
            <h1 className="font-display text-3xl md:text-5xl font-bold text-white mb-2">
              {dish.name}
            </h1>
            <p className="text-xl text-white/80 mb-3">{dish.malayalamName}</p>
            <p className="text-white/70 max-w-2xl">{dish.description}</p>
          </div>
        </div>
      </section>

      {/* Content */}
      <div className="max-w-5xl mx-auto px-4 md:px-8 py-12">
        <div className="grid lg:grid-cols-3 gap-10">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-10">
            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { icon: Clock, label: 'Prep Time', value: dish.prepTime, color: 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400' },
                { icon: Clock, label: 'Cook Time', value: dish.cookTime, color: 'bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400' },
                { icon: Users, label: 'Serves', value: dish.serves, color: 'bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400' },
                { icon: Flame, label: 'Spice Level', value: spice.label, color: `${spice.bg} ${spice.color}` },
              ].map((stat) => {
                const Icon = stat.icon;
                return (
                  <div key={stat.label} className="bg-gray-50 dark:bg-gray-900 rounded-xl p-4 text-center">
                    <div className={`w-10 h-10 rounded-lg ${stat.color} flex items-center justify-center mx-auto mb-2`}>
                      <Icon size={20} />
                    </div>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{stat.label}</p>
                    <p className="font-semibold text-gray-900 dark:text-white text-sm">{stat.value}</p>
                  </div>
                );
              })}
            </div>

            {/* About */}
            <div>
              <h2 className="text-2xl font-display font-bold text-gray-900 dark:text-white mb-4">
                About This Dish
              </h2>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                {dish.longDescription}
              </p>
            </div>

            {/* Origin */}
            <div className="bg-gradient-to-r from-kerala-green/5 to-emerald-50 dark:from-emerald-900/10 dark:to-gray-900 rounded-2xl p-6">
              <h3 className="font-bold text-gray-900 dark:text-white mb-2 flex items-center gap-2">
                <MapPin size={18} className="text-kerala-green" />
                Origin
              </h3>
              <p className="text-gray-600 dark:text-gray-300">{dish.origin}</p>
            </div>

            {/* Cooking Method */}
            <div>
              <h2 className="text-2xl font-display font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                <ChefHat size={24} className="text-kerala-gold" />
                Cooking Method
              </h2>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                {dish.cookingMethod}
              </p>
            </div>

            {/* Ingredients */}
            <div>
              <h2 className="text-2xl font-display font-bold text-gray-900 dark:text-white mb-4">
                Key Ingredients
              </h2>
              <div className="flex flex-wrap gap-2">
                {dish.ingredients.map((ingredient) => (
                  <span
                    key={ingredient}
                    className="px-4 py-2 bg-gray-100 dark:bg-gray-800 rounded-xl text-sm text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700"
                  >
                    {ingredient}
                  </span>
                ))}
              </div>
            </div>

            {/* Taste Profile */}
            <div>
              <h2 className="text-2xl font-display font-bold text-gray-900 dark:text-white mb-4">
                Taste Profile
              </h2>
              <div className="flex flex-wrap gap-2">
                {dish.taste.map((t) => (
                  <span
                    key={t}
                    className="px-4 py-2 bg-kerala-gold/10 dark:bg-kerala-gold/20 text-kerala-gold rounded-xl text-sm font-medium"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>

            {/* Nutrition */}
            <div>
              <h2 className="text-2xl font-display font-bold text-gray-900 dark:text-white mb-4">
                Nutrition Highlights
              </h2>
              <div className="grid sm:grid-cols-2 gap-3">
                {dish.nutritionHighlights.map((item) => (
                  <div key={item} className="flex items-start gap-3 p-3 bg-gray-50 dark:bg-gray-900 rounded-xl">
                    <span className="text-green-500 mt-0.5">✓</span>
                    <span className="text-sm text-gray-700 dark:text-gray-300">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Gallery */}
            {dish.gallery.length > 1 && (
              <div>
                <h2 className="text-2xl font-display font-bold text-gray-900 dark:text-white mb-4">
                  Gallery
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {dish.gallery.map((img, i) => (
                    <div key={i} className="relative h-40 rounded-xl overflow-hidden">
                      <Image src={img} alt={`${dish.name} ${i + 1}`} fill className="object-cover hover:scale-105 transition-transform duration-300" />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Spice Indicator */}
            <div className="bg-gray-50 dark:bg-gray-900 rounded-2xl p-6">
              <h3 className="font-bold text-gray-900 dark:text-white mb-3">Spice Level</h3>
              <div className="flex items-center gap-2 mb-2">
                {[...Array(4)].map((_, i) => (
                  <Flame
                    key={i}
                    size={24}
                    className={i < getSpiceCount(dish.spiceLevel) ? spice.color : 'text-gray-200 dark:text-gray-700'}
                  />
                ))}
              </div>
              <p className={`font-semibold ${spice.color}`}>{spice.label}</p>
            </div>

            {/* Serving Style */}
            <div className="bg-gray-50 dark:bg-gray-900 rounded-2xl p-6">
              <h3 className="font-bold text-gray-900 dark:text-white mb-3">Serving Style</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">{dish.servingStyle}</p>
            </div>

            {/* Best Places */}
            <div className="bg-gray-50 dark:bg-gray-900 rounded-2xl p-6">
              <h3 className="font-bold text-gray-900 dark:text-white mb-3">Best Places to Try</h3>
              <ul className="space-y-2">
                {dish.bestPlacesToTry.map((place) => (
                  <li key={place} className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-300">
                    <MapPin size={14} className="text-kerala-green mt-0.5 flex-shrink-0" />
                    {place}
                  </li>
                ))}
              </ul>
            </div>

            {/* Popular In */}
            <div className="bg-gray-50 dark:bg-gray-900 rounded-2xl p-6">
              <h3 className="font-bold text-gray-900 dark:text-white mb-3">Popular In</h3>
              <div className="flex flex-wrap gap-2">
                {dish.popularIn.map((region) => (
                  <span key={region} className="px-3 py-1 bg-white dark:bg-gray-800 rounded-lg text-xs text-gray-600 dark:text-gray-400 border border-gray-200 dark:border-gray-700">
                    {region}
                  </span>
                ))}
              </div>
            </div>

            {/* Best Season */}
            <div className="bg-gradient-to-br from-kerala-green to-emerald-600 rounded-2xl p-6 text-white">
              <h3 className="font-bold mb-2">Best Season</h3>
              <p className="text-white/90 text-sm">{dish.bestSeasonToTry}</p>
            </div>

            {/* Actions */}
            <div className="flex gap-3">
              <button className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-gray-100 dark:bg-gray-800 rounded-xl text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
                <Heart size={16} /> Save
              </button>
              <button className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-gray-100 dark:bg-gray-800 rounded-xl text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
                <Share2 size={16} /> Share
              </button>
            </div>
          </div>
        </div>

        {/* Related Dishes */}
        {relatedDishes.length > 0 && (
          <div className="mt-16 pt-12 border-t border-gray-200 dark:border-gray-800">
            <h2 className="text-2xl font-display font-bold text-gray-900 dark:text-white mb-8">
              You May Also Like
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedDishes.map((related) => (
                <Link key={related.id} href={`/gods-own-flavours/${related.slug}`} className="group block">
                  <div className="bg-gray-50 dark:bg-gray-900 rounded-2xl overflow-hidden hover:shadow-lg transition-all duration-300">
                    <div className="relative h-40 overflow-hidden">
                      <Image
                        src={related.image}
                        alt={related.name}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <span className={`absolute top-3 left-3 px-2 py-1 rounded-full text-xs font-semibold ${
                        related.category === 'veg' ? 'bg-green-500 text-white' : 'bg-red-500 text-white'
                      }`}>
                        {related.category === 'veg' ? '🌿' : '🍗'}
                      </span>
                    </div>
                    <div className="p-4">
                      <h3 className="font-bold text-gray-900 dark:text-white text-sm group-hover:text-kerala-green transition-colors">
                        {related.name}
                      </h3>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 line-clamp-2">
                        {related.description}
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

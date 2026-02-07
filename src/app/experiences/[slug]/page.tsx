'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { getExperienceBySlug } from '@/data/experiences';
import { ArrowLeft, Star, Clock, MapPin, IndianRupee, Gauge, Shield, CheckCircle, Calendar, Heart, Share2 } from 'lucide-react';
import { notFound } from 'next/navigation';

export default function ExperienceDetailPage({ params }: { params: { slug: string } }) {
  const { slug } = params;
  const experience = getExperienceBySlug(slug);

  if (!experience) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      {/* Hero */}
      <section className="relative h-[50vh] md:h-[60vh] overflow-hidden">
        <Image
          src={experience.images[0]}
          alt={experience.title}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
        
        <div className="absolute top-24 left-4 md:left-8 z-10">
          <Link href="/experiences" className="flex items-center gap-2 text-white/80 hover:text-white transition-colors glass rounded-full px-4 py-2">
            <ArrowLeft size={18} /> Back to Experiences
          </Link>
        </div>

        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-12">
          <div className="max-w-5xl mx-auto">
            <span className="bg-kerala-green/90 text-white text-sm px-4 py-1 rounded-full capitalize mb-4 inline-block">
              {experience.category}
            </span>
            <h1 className="font-display text-3xl md:text-5xl font-bold text-white mb-3">
              {experience.title}
            </h1>
            <div className="flex flex-wrap items-center gap-4 text-white/80">
              <span className="flex items-center gap-1">
                <Star size={18} className="text-yellow-400" fill="currentColor" />
                {experience.rating} ({experience.reviews.toLocaleString()} reviews)
              </span>
              <span className="flex items-center gap-1">
                <MapPin size={18} /> {experience.location}
              </span>
            </div>
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
                { icon: Clock, label: 'Duration', value: experience.duration, color: 'bg-blue-50 text-blue-600' },
                { icon: IndianRupee, label: 'Cost', value: experience.costEstimate, color: 'bg-green-50 text-green-600' },
                { icon: Gauge, label: 'Difficulty', value: experience.difficulty, color: 'bg-orange-50 text-orange-600' },
                { icon: Calendar, label: 'Best Season', value: experience.bestSeason, color: 'bg-purple-50 text-purple-600' },
              ].map((stat) => {
                const Icon = stat.icon;
                return (
                  <div key={stat.label} className="bg-gray-50 dark:bg-gray-900 rounded-xl p-4 text-center">
                    <div className={`w-10 h-10 rounded-lg ${stat.color} flex items-center justify-center mx-auto mb-2`}>
                      <Icon size={20} />
                    </div>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{stat.label}</p>
                    <p className="font-semibold text-gray-900 dark:text-white text-sm capitalize">{stat.value}</p>
                  </div>
                );
              })}
            </div>

            {/* Description */}
            <motion.section initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }}>
              <h2 className="font-display text-2xl font-bold text-gray-900 dark:text-white mb-4">About This Experience</h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-lg">{experience.longDescription}</p>
            </motion.section>

            {/* Highlights */}
            <motion.section initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.1 }}>
              <h2 className="font-display text-2xl font-bold text-gray-900 dark:text-white mb-4">Highlights</h2>
              <div className="grid gap-3">
                {experience.highlights.map((highlight, i) => (
                  <div key={i} className="flex items-start gap-3 p-3 bg-kerala-green/5 dark:bg-kerala-green/10 rounded-xl">
                    <CheckCircle size={20} className="text-kerala-green mt-0.5 shrink-0" />
                    <span className="text-gray-700 dark:text-gray-300">{highlight}</span>
                  </div>
                ))}
              </div>
            </motion.section>

            {/* Inclusions */}
            <motion.section initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.2 }}>
              <h2 className="font-display text-2xl font-bold text-gray-900 dark:text-white mb-4">What&apos;s Included</h2>
              <div className="grid md:grid-cols-2 gap-3">
                {experience.inclusions.map((item, i) => (
                  <div key={i} className="flex items-center gap-3 text-gray-700 dark:text-gray-300">
                    <CheckCircle size={16} className="text-green-500" />
                    {item}
                  </div>
                ))}
              </div>
            </motion.section>

            {/* Safety Tips */}
            <motion.section initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.3 }}>
              <h2 className="font-display text-2xl font-bold text-gray-900 dark:text-white mb-4">Safety Tips</h2>
              <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-xl p-6">
                <div className="flex items-center gap-2 mb-3">
                  <Shield size={20} className="text-amber-600" />
                  <span className="font-semibold text-amber-800">Important Safety Information</span>
                </div>
                <ul className="space-y-2">
                  {experience.safetyTips.map((tip, i) => (
                    <li key={i} className="flex items-start gap-2 text-amber-900">
                      <span className="text-amber-600 mt-1">•</span>
                      {tip}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.section>

            {/* Gallery */}
            <motion.section initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.4 }}>
              <h2 className="font-display text-2xl font-bold text-gray-900 dark:text-white mb-4">Gallery</h2>
              <div className="grid grid-cols-2 gap-3">
                {experience.images.map((img, i) => (
                  <div key={i} className="relative h-48 rounded-xl overflow-hidden">
                    <Image src={img} alt={`${experience.title} ${i + 1}`} fill className="object-cover hover:scale-110 transition-transform duration-500" />
                  </div>
                ))}
              </div>
            </motion.section>
          </div>

          {/* Sidebar - Booking Card */}
          <div className="space-y-6">
            <div className="bg-gray-50 dark:bg-gray-900 rounded-2xl p-6 sticky top-24">
              <h3 className="font-display text-xl font-bold text-gray-900 dark:text-white mb-2">Book This Experience</h3>
              <p className="text-kerala-green text-2xl font-bold mb-4">{experience.costEstimate}</p>
              
              <div className="space-y-3 mb-6">
                <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400 text-sm">
                  <Clock size={16} /> {experience.duration}
                </div>
                <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400 text-sm">
                  <MapPin size={16} /> {experience.location}
                </div>
                <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400 text-sm">
                  <Calendar size={16} /> Best: {experience.bestSeason}
                </div>
              </div>

              <div className="space-y-3">
                <button className="btn-primary w-full text-center">
                  Book Now
                </button>
                <button className="btn-secondary w-full flex items-center justify-center gap-2">
                  <Heart size={18} /> Add to Wishlist
                </button>
                <button className="w-full text-gray-500 text-sm flex items-center justify-center gap-2 py-2 hover:text-gray-700">
                  <Share2 size={16} /> Share this experience
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import {
  getDestinationBySlug,
  getDestinationsByDistrict,
  destinations,
} from '@/data/destinations';

// ========== TYPE BADGE COLORS ==========
const TYPE_COLORS: Record<string, string> = {
  nature: 'bg-green-100 text-green-800 dark:bg-green-900/40 dark:text-green-300',
  beach: 'bg-cyan-100 text-cyan-800 dark:bg-cyan-900/40 dark:text-cyan-300',
  hill: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-300',
  spiritual: 'bg-purple-100 text-purple-800 dark:bg-purple-900/40 dark:text-purple-300',
  wildlife: 'bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-300',
  backwater: 'bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-300',
  heritage: 'bg-rose-100 text-rose-800 dark:bg-rose-900/40 dark:text-rose-300',
  urban: 'bg-slate-100 text-slate-800 dark:bg-slate-900/40 dark:text-slate-300',
};

const CROWD_COLORS = {
  low: 'text-green-600 dark:text-green-400',
  medium: 'text-yellow-600 dark:text-yellow-400',
  high: 'text-red-600 dark:text-red-400',
};

// ========== PAGE COMPONENT ==========
export default function DestinationDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const [galleryOpen, setGalleryOpen] = useState(false);
  const [activeImage, setActiveImage] = useState(0);

  // Unwrap params (Next.js 15 async params)
  const { slug } = require('react').use(params);

  const destination = getDestinationBySlug(slug);
  if (!destination) notFound();

  const relatedDestinations = getDestinationsByDistrict(
    destination.districtSlug
  )
    .filter((d) => d.slug !== destination.slug)
    .slice(0, 3);

  const openGallery = (index: number) => {
    setActiveImage(index);
    setGalleryOpen(true);
  };

  return (
    <>
      {/* ========== LIGHTBOX GALLERY ========== */}
      {galleryOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
          onClick={() => setGalleryOpen(false)}
        >
          <button
            onClick={() => setGalleryOpen(false)}
            className="absolute top-4 right-4 text-white text-3xl hover:text-gray-300 z-50"
          >
            ✕
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              setActiveImage(
                (prev) =>
                  (prev - 1 + destination.images.length) %
                  destination.images.length
              );
            }}
            className="absolute left-4 text-white text-4xl hover:text-gray-300 z-50"
          >
            ‹
          </button>
          <div
            className="relative w-full max-w-4xl h-[70vh]"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={destination.images[activeImage]}
              alt={`${destination.name} - Image ${activeImage + 1}`}
              fill
              className="object-contain"
              sizes="90vw"
            />
          </div>
          <button
            onClick={(e) => {
              e.stopPropagation();
              setActiveImage(
                (prev) => (prev + 1) % destination.images.length
              );
            }}
            className="absolute right-4 text-white text-4xl hover:text-gray-300 z-50"
          >
            ›
          </button>
          <div className="absolute bottom-6 text-white text-sm">
            {activeImage + 1} / {destination.images.length}
          </div>
        </motion.div>
      )}

      <main className="min-h-screen bg-gray-50 dark:bg-gray-950">
        {/* ========== HERO SECTION ========== */}
        <section className="relative h-[55vh] min-h-[400px]">
          <Image
            src={destination.images[0]}
            alt={destination.name}
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

          {/* Back Button */}
          <Link
            href="/destinations"
            className="absolute top-6 left-6 z-10 flex items-center gap-2 bg-white/20 backdrop-blur-md text-white px-4 py-2 rounded-full hover:bg-white/30 transition-colors text-sm"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            All Destinations
          </Link>

          {/* Hero Text */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="absolute bottom-0 left-0 right-0 p-8 md:p-12"
          >
            {/* Type Badges */}
            <div className="flex flex-wrap gap-2 mb-3">
              {destination.type.map((t) => (
                <span
                  key={t}
                  className={`text-xs font-semibold px-3 py-1 rounded-full ${TYPE_COLORS[t] || 'bg-gray-200 text-gray-700'}`}
                >
                  {t.charAt(0).toUpperCase() + t.slice(1)}
                </span>
              ))}
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-2">
              {destination.name}
            </h1>
            <p className="text-lg text-gray-200 mb-4">
              {destination.district} District, Kerala
            </p>

            {/* Quick Stats */}
            <div className="flex flex-wrap gap-4 text-sm">
              <span className="flex items-center gap-1 bg-white/20 backdrop-blur-sm text-white px-3 py-1.5 rounded-full">
                ⭐ {destination.rating}/5 ({destination.reviews.toLocaleString()}{' '}
                reviews)
              </span>
              <span
                className={`flex items-center gap-1 bg-white/20 backdrop-blur-sm px-3 py-1.5 rounded-full ${CROWD_COLORS[destination.crowdLevel]}`}
              >
                👥{' '}
                {destination.crowdLevel.charAt(0).toUpperCase() +
                  destination.crowdLevel.slice(1)}{' '}
                Crowd
              </span>
              <span className="flex items-center gap-1 bg-white/20 backdrop-blur-sm text-white px-3 py-1.5 rounded-full">
                💰{' '}
                {destination.budgetRange.charAt(0).toUpperCase() +
                  destination.budgetRange.slice(1)}
              </span>
            </div>
          </motion.div>
        </section>

        {/* ========== MAIN CONTENT ========== */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid lg:grid-cols-3 gap-10">
            {/* ---- LEFT: Main Content (2 cols) ---- */}
            <div className="lg:col-span-2 space-y-10">
              {/* About */}
              <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  About {destination.name}
                </h2>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-lg">
                  {destination.longDescription}
                </p>
              </motion.section>

              {/* Image Gallery */}
              {destination.images.length > 1 && (
                <motion.section
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                    Gallery
                  </h2>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {destination.images.map((img, i) => (
                      <div
                        key={i}
                        onClick={() => openGallery(i)}
                        className="relative aspect-[4/3] rounded-xl overflow-hidden cursor-pointer group"
                      >
                        <Image
                          src={img}
                          alt={`${destination.name} - ${i + 1}`}
                          fill
                          className="object-cover group-hover:scale-110 transition-transform duration-300"
                          sizes="(max-width: 768px) 50vw, 33vw"
                        />
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
                      </div>
                    ))}
                  </div>
                </motion.section>
              )}

              {/* History */}
              {destination.history && (
                <motion.section
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-800"
                >
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                    📜 History &amp; Heritage
                  </h2>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                    {destination.history}
                  </p>
                </motion.section>
              )}

              {/* Highlights */}
              <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35 }}
                className="bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-800"
              >
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                  ✨ Highlights
                </h2>
                <div className="grid sm:grid-cols-2 gap-3">
                  {destination.highlights.map((h, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <span className="flex-shrink-0 w-7 h-7 bg-teal-100 dark:bg-teal-900/40 text-teal-700 dark:text-teal-300 rounded-full flex items-center justify-center text-sm font-bold">
                        {i + 1}
                      </span>
                      <span className="text-gray-700 dark:text-gray-300">
                        {h}
                      </span>
                    </div>
                  ))}
                </div>
              </motion.section>

              {/* How to Reach */}
              <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  How to Reach
                </h2>
                <div className="grid sm:grid-cols-3 gap-4">
                  {[
                    {
                      icon: '✈️',
                      title: 'By Air',
                      info: destination.howToReach.air,
                    },
                    {
                      icon: '🚂',
                      title: 'By Rail',
                      info: destination.howToReach.rail,
                    },
                    {
                      icon: '🚗',
                      title: 'By Road',
                      info: destination.howToReach.road,
                    },
                  ].map((transport) => (
                    <div
                      key={transport.title}
                      className="bg-white dark:bg-gray-900 rounded-xl p-5 shadow-sm border border-gray-100 dark:border-gray-800"
                    >
                      <div className="text-2xl mb-2">{transport.icon}</div>
                      <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                        {transport.title}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {transport.info}
                      </p>
                    </div>
                  ))}
                </div>
              </motion.section>

              {/* Map */}
              <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.45 }}
              >
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  Location
                </h2>
                <div className="rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-700">
                  <iframe
                    src={`https://maps.google.com/maps?q=${destination.coordinates.lat},${destination.coordinates.lng}&z=13&output=embed`}
                    width="100%"
                    height="350"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title={`Map of ${destination.name}`}
                  />
                </div>
              </motion.section>
            </div>

            {/* ---- RIGHT: Sidebar (1 col) ---- */}
            <aside className="space-y-6">
              {/* Quick Info Card */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-800 sticky top-24"
              >
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
                  Quick Info
                </h3>
                <div className="space-y-4 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-500 dark:text-gray-400">
                      📍 District
                    </span>
                    <Link
                      href={`/destinations?district=${destination.districtSlug}`}
                      className="text-teal-600 dark:text-teal-400 font-medium hover:underline"
                    >
                      {destination.district}
                    </Link>
                  </div>
                  <hr className="border-gray-100 dark:border-gray-800" />
                  <div className="flex justify-between">
                    <span className="text-gray-500 dark:text-gray-400">
                      🕐 Timings
                    </span>
                    <span className="text-gray-900 dark:text-white font-medium text-right max-w-[60%]">
                      {destination.timings}
                    </span>
                  </div>
                  <hr className="border-gray-100 dark:border-gray-800" />
                  <div className="flex justify-between">
                    <span className="text-gray-500 dark:text-gray-400">
                      🎫 Entry Fee
                    </span>
                    <span className="text-gray-900 dark:text-white font-medium">
                      {destination.entryFee}
                    </span>
                  </div>
                  <hr className="border-gray-100 dark:border-gray-800" />
                  <div className="flex justify-between">
                    <span className="text-gray-500 dark:text-gray-400">
                      🌤️ Best Time
                    </span>
                    <span className="text-gray-900 dark:text-white font-medium text-right max-w-[60%]">
                      {destination.bestTimeToVisit}
                    </span>
                  </div>
                  <hr className="border-gray-100 dark:border-gray-800" />
                  <div className="flex justify-between">
                    <span className="text-gray-500 dark:text-gray-400">
                      ⭐ Rating
                    </span>
                    <span className="text-gray-900 dark:text-white font-medium">
                      {destination.rating}/5
                    </span>
                  </div>
                </div>
              </motion.div>

              {/* Travel Tips */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-gradient-to-br from-teal-50 to-cyan-50 dark:from-teal-950/30 dark:to-cyan-950/30 rounded-2xl p-6 border border-teal-100 dark:border-teal-900/50"
              >
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                  💡 Travel Tips
                </h3>
                <ul className="space-y-3">
                  {destination.travelTips.map((tip, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-2 text-sm text-gray-700 dark:text-gray-300"
                    >
                      <span className="flex-shrink-0 w-5 h-5 bg-teal-200 dark:bg-teal-800 text-teal-800 dark:text-teal-200 rounded-full flex items-center justify-center text-xs font-bold mt-0.5">
                        ✓
                      </span>
                      {tip}
                    </li>
                  ))}
                </ul>
              </motion.div>

              {/* Nearby Attractions */}
              {destination.nearbyAttractions.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 }}
                  className="bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-800"
                >
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3">
                    🏛️ Nearby Attractions
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {destination.nearbyAttractions.map((a) => {
                      // Try to find a matching destination for linking
                      const linked = destinations.find(
                        (d) =>
                          d.name.toLowerCase() === a.toLowerCase() ||
                          a.toLowerCase().includes(d.name.toLowerCase())
                      );
                      return linked ? (
                        <Link
                          key={a}
                          href={`/destinations/${linked.slug}`}
                          className="text-xs bg-gray-100 dark:bg-gray-800 text-teal-700 dark:text-teal-300 px-3 py-1.5 rounded-full hover:bg-teal-100 dark:hover:bg-teal-900/40 transition-colors"
                        >
                          {a}
                        </Link>
                      ) : (
                        <span
                          key={a}
                          className="text-xs bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 px-3 py-1.5 rounded-full"
                        >
                          {a}
                        </span>
                      );
                    })}
                  </div>
                </motion.div>
              )}
            </aside>
          </div>

          {/* ========== RELATED DESTINATIONS ========== */}
          {relatedDestinations.length > 0 && (
            <motion.section
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="mt-16"
            >
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                More in {destination.district}
              </h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {relatedDestinations.map((rd) => (
                  <Link
                    key={rd.slug}
                    href={`/destinations/${rd.slug}`}
                    className="group bg-white dark:bg-gray-900 rounded-2xl overflow-hidden shadow-sm border border-gray-100 dark:border-gray-800 hover:shadow-lg transition-shadow"
                  >
                    <div className="relative h-48">
                      <Image
                        src={rd.images[0]}
                        alt={rd.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                        sizes="(max-width: 768px) 100vw, 33vw"
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold text-gray-900 dark:text-white group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors">
                        {rd.name}
                      </h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 line-clamp-2">
                        {rd.description}
                      </p>
                      <div className="flex items-center gap-2 mt-2">
                        <span className="text-xs text-yellow-600">
                          ⭐ {rd.rating}
                        </span>
                        <span className="text-xs text-gray-400">|</span>
                        <span className="text-xs text-gray-500 capitalize">
                          {rd.type[0]}
                        </span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </motion.section>
          )}

          {/* ========== CTA ========== */}
          <div className="mt-16 text-center">
            <Link
              href="/destinations"
              className="inline-flex items-center gap-2 bg-teal-600 hover:bg-teal-700 text-white px-8 py-3 rounded-full font-medium transition-colors"
            >
              ← Explore All Destinations
            </Link>
          </div>
        </div>
      </main>
    </>
  );
}

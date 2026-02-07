'use client';

import { use } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { getDestinationBySlug, destinations } from '@/data/destinations';
import { MapPin, Star, Clock, Car, Train, Plane, Users, ArrowLeft, Heart, Share2, ChevronRight, Navigation } from 'lucide-react';
import { notFound } from 'next/navigation';

export default function DestinationDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const destination = getDestinationBySlug(slug);

  if (!destination) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="relative h-[60vh] md:h-[70vh] overflow-hidden">
        <Image
          src={destination.images[0]}
          alt={destination.name}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
        
        <div className="absolute top-24 left-4 md:left-8 z-10">
          <Link href="/destinations" className="flex items-center gap-2 text-white/80 hover:text-white transition-colors glass rounded-full px-4 py-2">
            <ArrowLeft size={18} /> Back to Destinations
          </Link>
        </div>

        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-12">
          <div className="max-w-5xl mx-auto">
            <div className="flex flex-wrap items-center gap-2 mb-4">
              {destination.type.map(type => (
                <span key={type} className="bg-white/20 backdrop-blur-sm text-white text-sm px-4 py-1 rounded-full capitalize">
                  {type}
                </span>
              ))}
              <span className={`text-sm px-4 py-1 rounded-full ${
                destination.crowdLevel === 'low' ? 'bg-green-500/80 text-white' :
                destination.crowdLevel === 'medium' ? 'bg-yellow-500/80 text-white' :
                'bg-red-500/80 text-white'
              }`}>
                <Users size={14} className="inline mr-1" />
                {destination.crowdLevel} crowd
              </span>
            </div>

            <h1 className="font-display text-4xl md:text-6xl font-bold text-white mb-3">
              {destination.name}
            </h1>

            <div className="flex flex-wrap items-center gap-4 text-white/80">
              <span className="flex items-center gap-1">
                <MapPin size={18} /> {destination.district}, Kerala
              </span>
              <span className="flex items-center gap-1">
                <Star size={18} className="text-yellow-400" fill="currentColor" />
                {destination.rating} ({destination.reviews.toLocaleString()} reviews)
              </span>
            </div>

            <div className="flex gap-3 mt-6">
              <button className="btn-primary flex items-center gap-2">
                <Navigation size={18} /> Get Directions
              </button>
              <button className="glass text-white px-5 py-3 rounded-xl hover:bg-white/20 transition-colors flex items-center gap-2">
                <Heart size={18} /> Wishlist
              </button>
              <button className="glass text-white px-5 py-3 rounded-xl hover:bg-white/20 transition-colors flex items-center gap-2">
                <Share2 size={18} /> Share
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <div className="max-w-5xl mx-auto px-4 md:px-8 py-12">
        <div className="grid lg:grid-cols-3 gap-10">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-10">
            {/* Description */}
            <motion.section
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
            >
              <h2 className="font-display text-2xl font-bold text-gray-900 mb-4">About {destination.name}</h2>
              <p className="text-gray-700 leading-relaxed text-lg">{destination.longDescription}</p>
            </motion.section>

            {/* History */}
            <motion.section
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.1 }}
            >
              <h2 className="font-display text-2xl font-bold text-gray-900 mb-4">History & Cultural Significance</h2>
              <p className="text-gray-700 leading-relaxed">{destination.history}</p>
            </motion.section>

            {/* Image Gallery */}
            <motion.section
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <h2 className="font-display text-2xl font-bold text-gray-900 mb-4">Gallery</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {destination.images.map((img, i) => (
                  <div key={i} className="relative h-40 md:h-52 rounded-xl overflow-hidden group cursor-pointer">
                    <Image
                      src={img}
                      alt={`${destination.name} ${i + 1}`}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                ))}
              </div>
            </motion.section>

            {/* How to Reach */}
            <motion.section
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <h2 className="font-display text-2xl font-bold text-gray-900 mb-4">How to Reach</h2>
              <div className="grid gap-4">
                {[
                  { icon: Plane, label: 'By Air', info: destination.howToReach.air, color: 'bg-blue-50 text-blue-600' },
                  { icon: Train, label: 'By Rail', info: destination.howToReach.rail, color: 'bg-green-50 text-green-600' },
                  { icon: Car, label: 'By Road', info: destination.howToReach.road, color: 'bg-orange-50 text-orange-600' },
                ].map((item) => {
                  const Icon = item.icon;
                  return (
                    <div key={item.label} className="flex gap-4 p-4 bg-gray-50 rounded-xl">
                      <div className={`w-12 h-12 rounded-xl ${item.color} flex items-center justify-center shrink-0`}>
                        <Icon size={22} />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">{item.label}</h3>
                        <p className="text-gray-600 text-sm mt-1">{item.info}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </motion.section>

            {/* Google Maps Embed */}
            <motion.section
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <h2 className="font-display text-2xl font-bold text-gray-900 mb-4">Location</h2>
              <div className="rounded-xl overflow-hidden h-80 bg-gray-100">
                <iframe
                  src={`https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d50000!2d${destination.coordinates.lng}!3d${destination.coordinates.lat}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sin`}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </motion.section>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Info Card */}
            <div className="bg-gray-50 rounded-2xl p-6 sticky top-24">
              <h3 className="font-display text-xl font-bold text-gray-900 mb-4">Quick Info</h3>
              
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-500 mb-1">Best Time to Visit</p>
                  <p className="font-medium text-gray-900 flex items-center gap-2">
                    <Clock size={16} className="text-kerala-green" />
                    {destination.bestTimeToVisit}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-gray-500 mb-1">Budget Range</p>
                  <p className="font-medium text-gray-900 capitalize">
                    {destination.budgetRange === 'budget' ? '💰 Budget Friendly' :
                     destination.budgetRange === 'mid-range' ? '💰💰 Mid Range' : '💰💰💰 Luxury'}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-gray-500 mb-1">Crowd Level</p>
                  <p className={`font-medium capitalize ${
                    destination.crowdLevel === 'low' ? 'text-green-600' :
                    destination.crowdLevel === 'medium' ? 'text-yellow-600' : 'text-red-600'
                  }`}>
                    <Users size={16} className="inline mr-1" />
                    {destination.crowdLevel}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-gray-500 mb-1">Rating</p>
                  <div className="flex items-center gap-2">
                    <div className="flex">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          size={18}
                          className={i < Math.floor(destination.rating) ? 'text-yellow-400' : 'text-gray-300'}
                          fill={i < Math.floor(destination.rating) ? 'currentColor' : 'none'}
                        />
                      ))}
                    </div>
                    <span className="font-bold text-gray-900">{destination.rating}</span>
                  </div>
                </div>
              </div>

              <div className="mt-6 space-y-3">
                <Link href="/trip-planner" className="btn-primary w-full text-center block">
                  Add to Trip Plan
                </Link>
                <button className="btn-secondary w-full">
                  Book a Guide
                </button>
              </div>
            </div>

            {/* Nearby Attractions */}
            <div className="bg-gray-50 rounded-2xl p-6">
              <h3 className="font-display text-xl font-bold text-gray-900 mb-4">Nearby Attractions</h3>
              <ul className="space-y-3">
                {destination.nearbyAttractions.map((attraction, i) => (
                  <li key={i} className="flex items-center gap-3 text-gray-700">
                    <span className="w-6 h-6 bg-kerala-green/10 text-kerala-green rounded-full flex items-center justify-center text-xs font-bold">
                      {i + 1}
                    </span>
                    {attraction}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import { Play, ChevronRight, Star, Clock, MapPin, ArrowRight, Sparkles, Mountain, Waves, TreePine, Sun } from 'lucide-react';
import { getFeaturedDestinations } from '@/data/destinations';
import { getFeaturedExperiences } from '@/data/experiences';
import { getFeaturedBlogs } from '@/data/blog';
import { itineraries } from '@/data/itineraries';
import { districts } from '@/data/destinations';
import { EXPERIENCE_CATEGORIES } from '@/lib/utils';

const heroSlides = [
  {
    image: 'https://images.unsplash.com/photo-1602158123411-e64e5d76e7c5?w=1920',
    title: 'Backwaters of Alleppey',
    subtitle: 'Cruise through palm-fringed canals on a traditional houseboat',
  },
  {
    image: 'https://images.unsplash.com/photo-1595815771614-ade9d652a65d?w=1920',
    title: 'Misty Munnar',
    subtitle: 'Endless tea plantations draped in clouds',
  },
  {
    image: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=1920',
    title: 'Cultural Heritage',
    subtitle: 'Ancient temples, Kathakali, and vibrant festivals',
  },
  {
    image: 'https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?w=1920',
    title: 'Golden Beaches',
    subtitle: 'Pristine coastline along the Arabian Sea',
  },
];

const seasons = [
  { id: 'monsoon', name: 'Monsoon Magic', months: 'Jun - Sep', icon: '🌧️', color: 'from-blue-500 to-cyan-500', desc: 'Lush green Kerala, Ayurveda at its best, spectacular waterfalls' },
  { id: 'winter', name: 'Winter Bliss', months: 'Oct - Feb', icon: '❄️', color: 'from-emerald-500 to-teal-500', desc: 'Perfect weather, festival season, ideal for beaches & backwaters' },
  { id: 'summer', name: 'Summer Escapes', months: 'Mar - May', icon: '☀️', color: 'from-orange-500 to-yellow-500', desc: 'Hill station retreats, wildlife safaris, temple festivals' },
];

const topExperiences = [
  { name: 'Backwaters', icon: Waves, color: 'bg-blue-500', desc: 'Houseboat cruises through serene canals' },
  { name: 'Ayurveda', icon: Sparkles, color: 'bg-emerald-500', desc: 'Ancient healing & wellness traditions' },
  { name: 'Wildlife', icon: TreePine, color: 'bg-green-700', desc: 'Tiger reserves & elephant sanctuaries' },
  { name: 'Beaches', icon: Sun, color: 'bg-orange-500', desc: 'Pristine shores of the Arabian Sea' },
  { name: 'Hill Stations', icon: Mountain, color: 'bg-indigo-600', desc: 'Misty mountains & tea plantations' },
  { name: 'Culture', icon: Star, color: 'bg-red-600', desc: 'Kathakali, temples & festivals' },
];

export default function HomePage() {
  const { t } = useLanguage();
  const [currentSlide, setCurrentSlide] = useState(0);
  const featuredDestinations = getFeaturedDestinations();
  const featuredExperiences = getFeaturedExperiences();
  const featuredBlogs = getFeaturedBlogs();

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div>
      {/* ==================== HERO SECTION ==================== */}
      <section className="relative h-screen overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5 }}
            className="absolute inset-0"
          >
            <Image
              src={heroSlides[currentSlide].image}
              alt={heroSlides[currentSlide].title}
              fill
              className="object-cover"
              priority
            />
          </motion.div>
        </AnimatePresence>

        <div className="absolute inset-0 hero-gradient hero-pattern" />

        <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4">
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="max-w-4xl"
          >
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-5 py-2 mb-6">
              <span className="text-kerala-gold text-sm font-medium">🌴 Welcome to</span>
            </div>

            <h1 className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-white mb-4 leading-tight">
              {t('hero.title')}
            </h1>

            <AnimatePresence mode="wait">
              <motion.p
                key={currentSlide}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -20, opacity: 0 }}
                className="text-white/80 text-lg md:text-xl font-light mb-3"
              >
                {heroSlides[currentSlide].title}
              </motion.p>
            </AnimatePresence>

            <p className="text-white/70 text-base md:text-lg max-w-2xl mx-auto mb-10">
              {t('hero.subtitle')}
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/trip-planner" className="btn-primary text-lg px-8 py-4 flex items-center gap-2 group">
                <Sparkles size={20} />
                {t('hero.cta.plan')}
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link href="/destinations" className="bg-white/10 backdrop-blur-sm border border-white/30 text-white px-8 py-4 rounded-xl font-semibold hover:bg-white/20 transition-all text-lg flex items-center gap-2">
                <MapPin size={20} />
                {t('hero.cta.explore')}
              </Link>
              <Link href="/experiences" className="btn-gold text-lg px-8 py-4 flex items-center gap-2">
                <Play size={20} />
                {t('hero.cta.book')}
              </Link>
            </div>
          </motion.div>

          {/* Hero Slide Indicators */}
          <div className="absolute bottom-10 flex gap-3">
            {heroSlides.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`h-2 rounded-full transition-all duration-500 ${
                  index === currentSlide ? 'w-10 bg-kerala-gold' : 'w-2 bg-white/40'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white/60 rounded-full mt-2 animate-pulse" />
          </div>
        </div>
      </section>

      {/* ==================== TOP EXPERIENCES ==================== */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="text-center mb-14">
            <h2 className="section-title">{t('section.topExperiences')}</h2>
            <p className="section-subtitle">{t('section.topExperiences.subtitle')}</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6">
            {topExperiences.map((exp, i) => {
              const Icon = exp.icon;
              return (
                <motion.div
                  key={exp.name}
                  initial={{ y: 20, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                >
                  <Link
                    href="/experiences"
                    className="card-hover block text-center p-6 rounded-2xl border border-gray-100 hover:border-kerala-green/20 group"
                  >
                    <div className={`${exp.color} w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform`}>
                      <Icon size={28} className="text-white" />
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-1">{exp.name}</h3>
                    <p className="text-xs text-gray-500">{exp.desc}</p>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ==================== INTERACTIVE MAP SECTION ==================== */}
      <section className="section-padding bg-gradient-to-br from-kerala-green/5 to-kerala-lagoon/5">
        <div className="container-custom">
          <div className="text-center mb-14">
            <h2 className="section-title">{t('section.interactiveMap')}</h2>
            <p className="section-subtitle">{t('section.interactiveMap.subtitle')}</p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-3">
            {districts.map((district, i) => (
              <motion.div
                key={district.id}
                initial={{ scale: 0.9, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
              >
                <Link
                  href={`/destinations?district=${district.slug}`}
                  className="card-hover block p-4 bg-white rounded-xl border border-gray-100 hover:border-kerala-green/30 text-center group"
                >
                  <div className="text-3xl mb-2">📍</div>
                  <h3 className="font-semibold text-sm text-gray-900 group-hover:text-kerala-green transition-colors">
                    {district.name}
                  </h3>
                  <p className="text-xs text-gray-400 mt-1">{district.attractions} attractions</p>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== FEATURED DESTINATIONS ==================== */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="flex items-end justify-between mb-14">
            <div>
              <h2 className="section-title">{t('section.featuredDestinations')}</h2>
              <p className="section-subtitle">{t('section.featuredDestinations.subtitle')}</p>
            </div>
            <Link href="/destinations" className="hidden md:flex items-center gap-2 text-kerala-green font-semibold hover:gap-3 transition-all">
              {t('common.viewAll')} <ChevronRight size={18} />
            </Link>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredDestinations.slice(0, 6).map((dest, i) => (
              <motion.div
                key={dest.id}
                initial={{ y: 30, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <Link href={`/destinations/${dest.slug}`} className="card-hover block group">
                  <div className="relative h-64 rounded-2xl overflow-hidden">
                    <Image
                      src={dest.images[0]}
                      alt={dest.name}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                    
                    <div className="absolute top-4 right-4 flex gap-2">
                      {dest.type.slice(0, 2).map(type => (
                        <span key={type} className="bg-white/20 backdrop-blur-sm text-white text-xs px-3 py-1 rounded-full capitalize">
                          {type}
                        </span>
                      ))}
                    </div>

                    <div className="absolute bottom-0 left-0 right-0 p-5">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="flex items-center gap-1 text-yellow-400">
                          <Star size={14} fill="currentColor" />
                          <span className="text-white text-sm font-medium">{dest.rating}</span>
                        </div>
                        <span className="text-white/60 text-sm">({dest.reviews.toLocaleString()} reviews)</span>
                      </div>
                      <h3 className="text-xl font-display font-bold text-white">{dest.name}</h3>
                      <div className="flex items-center gap-1 text-white/70 text-sm mt-1">
                        <MapPin size={14} />
                        {dest.district}
                      </div>
                    </div>
                  </div>
                  <p className="text-gray-600 text-sm mt-3 line-clamp-2">{dest.description}</p>
                </Link>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-8 md:hidden">
            <Link href="/destinations" className="btn-secondary">
              {t('common.viewAll')} <ChevronRight size={18} className="inline" />
            </Link>
          </div>
        </div>
      </section>

      {/* ==================== FEATURED ITINERARIES ==================== */}
      <section className="section-padding bg-gradient-to-br from-gray-50 to-white">
        <div className="container-custom">
          <div className="text-center mb-14">
            <h2 className="section-title">{t('section.featuredItineraries')}</h2>
            <p className="section-subtitle">{t('section.featuredItineraries.subtitle')}</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {itineraries.map((itin, i) => (
              <motion.div
                key={itin.id}
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
              >
                <Link href="/trip-planner" className="card-hover block bg-white rounded-2xl overflow-hidden border border-gray-100 group">
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={itin.image}
                      alt={itin.title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute top-4 left-4 bg-kerala-green text-white text-sm px-3 py-1 rounded-full font-medium">
                      {itin.days} Days
                    </div>
                    <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm text-white text-sm px-3 py-1 rounded-full capitalize">
                      {itin.style}
                    </div>
                  </div>
                  <div className="p-5">
                    <h3 className="font-display text-xl font-bold text-gray-900 mb-2">{itin.title}</h3>
                    <p className="text-gray-600 text-sm mb-3">{itin.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-kerala-green font-semibold text-sm">{itin.totalCost}</span>
                      <span className="text-kerala-green text-sm flex items-center gap-1 group-hover:gap-2 transition-all">
                        View Details <ArrowRight size={14} />
                      </span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== SEASONS ==================== */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="text-center mb-14">
            <h2 className="section-title">{t('section.seasons')}</h2>
            <p className="section-subtitle">{t('section.seasons.subtitle')}</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {seasons.map((season, i) => (
              <motion.div
                key={season.id}
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className={`card-hover bg-gradient-to-br ${season.color} rounded-2xl p-8 text-white text-center`}
              >
                <div className="text-5xl mb-4">{season.icon}</div>
                <h3 className="font-display text-2xl font-bold mb-1">{season.name}</h3>
                <p className="text-white/80 text-sm mb-3">{season.months}</p>
                <p className="text-white/90 text-sm">{season.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== FEATURED EXPERIENCES ==================== */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="flex items-end justify-between mb-14">
            <div>
              <h2 className="section-title">Unforgettable Experiences</h2>
              <p className="section-subtitle">Curated activities that define the Kerala experience</p>
            </div>
            <Link href="/experiences" className="hidden md:flex items-center gap-2 text-kerala-green font-semibold hover:gap-3 transition-all">
              {t('common.viewAll')} <ChevronRight size={18} />
            </Link>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredExperiences.slice(0, 3).map((exp, i) => (
              <motion.div
                key={exp.id}
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <Link href={`/experiences/${exp.slug}`} className="card-hover block bg-white rounded-2xl overflow-hidden group">
                  <div className="relative h-52 overflow-hidden">
                    <Image
                      src={exp.images[0]}
                      alt={exp.title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute bottom-4 left-4 right-4">
                      <div className="flex items-center gap-2 mb-1">
                        <Star size={14} className="text-yellow-400" fill="currentColor" />
                        <span className="text-white text-sm">{exp.rating}</span>
                        <span className="text-white/60 text-sm">· {exp.location}</span>
                      </div>
                    </div>
                  </div>
                  <div className="p-5">
                    <h3 className="font-display text-lg font-bold text-gray-900 mb-2">{exp.title}</h3>
                    <p className="text-gray-600 text-sm mb-3 line-clamp-2">{exp.description}</p>
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <span className="flex items-center gap-1"><Clock size={14} /> {exp.duration}</span>
                      <span className="text-kerala-green font-semibold">{exp.costEstimate}</span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== BLOG SECTION ==================== */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="flex items-end justify-between mb-14">
            <div>
              <h2 className="section-title">{t('section.latestBlog')}</h2>
              <p className="section-subtitle">{t('section.latestBlog.subtitle')}</p>
            </div>
            <Link href="/blog" className="hidden md:flex items-center gap-2 text-kerala-green font-semibold hover:gap-3 transition-all">
              {t('common.viewAll')} <ChevronRight size={18} />
            </Link>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {featuredBlogs.map((post, i) => (
              <motion.div
                key={post.id}
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <Link href={`/blog/${post.slug}`} className="card-hover block bg-white rounded-2xl overflow-hidden border border-gray-100 group">
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute top-4 left-4 bg-kerala-green/90 text-white text-xs px-3 py-1 rounded-full">
                      {post.category}
                    </div>
                  </div>
                  <div className="p-5">
                    <h3 className="font-display text-lg font-bold text-gray-900 mb-2 line-clamp-2">{post.title}</h3>
                    <p className="text-gray-600 text-sm mb-3 line-clamp-2">{post.excerpt}</p>
                    <div className="flex items-center justify-between text-sm text-gray-400">
                      <span>{post.author}</span>
                      <span>{post.readTime}</span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== CTA SECTION ==================== */}
      <section className="relative py-24 overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1602158123411-e64e5d76e7c5?w=1920"
          alt="Kerala Backwaters"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-kerala-green/90 to-kerala-lagoon/80" />
        
        <div className="relative z-10 text-center px-4">
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
          >
            <h2 className="font-display text-4xl md:text-5xl font-bold text-white mb-4">
              Ready to Explore God&apos;s Own Country?
            </h2>
            <p className="text-white/80 text-lg mb-8 max-w-2xl mx-auto">
              Let our smart trip planner create the perfect Kerala itinerary for you. Just tell us your style, budget, and dates.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/trip-planner" className="bg-white text-kerala-green px-8 py-4 rounded-xl font-bold text-lg hover:bg-gray-100 transition-colors flex items-center gap-2">
                <Sparkles size={20} />
                Plan My Trip Now
              </Link>
              <Link href="/experiences" className="border-2 border-white text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-white/10 transition-colors">
                Browse Experiences
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

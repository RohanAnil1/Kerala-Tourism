'use client';

import { useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import { Play, ChevronRight, Star, Clock, MapPin, ArrowRight, Sparkles, Mountain, Waves, TreePine, Sun, ArrowUpRight } from 'lucide-react';
import { getFeaturedDestinations } from '@/data/destinations';
import { getFeaturedExperiences } from '@/data/experiences';
import { getFeaturedBlogs } from '@/data/blog';
import { itineraries } from '@/data/itineraries';
import { districts } from '@/data/destinations';

/* ---------- SECTION REVEAL WRAPPER ---------- */
function Reveal({ children, className = '', delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay, ease: [0.23, 1, 0.32, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ---------- SECTION HEADER ---------- */
function SectionHeader({ label, title, subtitle, center = true }: { label?: string; title: string; subtitle?: string; center?: boolean }) {
  return (
    <div className={`mb-16 ${center ? 'text-center' : ''}`}>
      {label && (
        <Reveal>
          <span className="inline-flex items-center gap-2 tag-pill text-sm font-semibold px-4 py-1.5 rounded-full text-kerala-green dark:text-emerald-400 mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-kerala-green dark:bg-emerald-400 animate-pulse" />
            {label}
          </span>
        </Reveal>
      )}
      <Reveal delay={0.05}>
        <h2 className="section-title">{title}</h2>
      </Reveal>
      {subtitle && (
        <Reveal delay={0.1}>
          <p className={`section-subtitle ${center ? 'mx-auto' : ''}`}>{subtitle}</p>
        </Reveal>
      )}
    </div>
  );
}

/* ---------- DATA ---------- */
const HERO_VIDEO = 'https://videos.pexels.com/video-files/6981411/6981411-hd_1920_1080_25fps.mp4';
const HERO_POSTER = 'https://images.unsplash.com/photo-1602158123411-e64e5d76e7c5?w=1920';

const seasons = [
  { id: 'monsoon', name: 'Monsoon Magic', months: 'Jun - Sep', icon: '🌧️', color: 'from-blue-600 to-cyan-500', desc: 'Lush green Kerala, Ayurveda at its best, spectacular waterfalls', image: 'https://images.unsplash.com/photo-1580309237429-661ea0f15805?w=800' },
  { id: 'winter', name: 'Winter Bliss', months: 'Oct - Feb', icon: '❄️', color: 'from-emerald-600 to-teal-500', desc: 'Perfect weather, festival season, ideal for beaches & backwaters', image: 'https://images.unsplash.com/photo-1602158123411-e64e5d76e7c5?w=800' },
  { id: 'summer', name: 'Summer Escapes', months: 'Mar - May', icon: '☀️', color: 'from-orange-500 to-amber-500', desc: 'Hill station retreats, wildlife safaris, temple festivals', image: 'https://images.unsplash.com/photo-1595815771614-ade9d652a65d?w=800' },
];

const topExperiences = [
  { name: 'Backwaters', icon: Waves, gradient: 'from-blue-500 to-cyan-400', desc: 'Houseboat cruises through serene canals' },
  { name: 'Ayurveda', icon: Sparkles, gradient: 'from-emerald-500 to-green-400', desc: 'Ancient healing & wellness traditions' },
  { name: 'Wildlife', icon: TreePine, gradient: 'from-green-600 to-emerald-500', desc: 'Tiger reserves & elephant sanctuaries' },
  { name: 'Beaches', icon: Sun, gradient: 'from-orange-500 to-amber-400', desc: 'Pristine shores of the Arabian Sea' },
  { name: 'Hill Stations', icon: Mountain, gradient: 'from-indigo-500 to-purple-400', desc: 'Misty mountains & tea plantations' },
  { name: 'Culture', icon: Star, gradient: 'from-rose-500 to-red-400', desc: 'Kathakali, temples & festivals' },
];

/* ---------- MAIN COMPONENT ---------- */
export default function HomePage() {
  const { t } = useLanguage();
  const featuredDestinations = getFeaturedDestinations();
  const featuredExperiences = getFeaturedExperiences();
  const featuredBlogs = getFeaturedBlogs();
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const heroY = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <div className="bg-white dark:bg-gray-950">
      {/* ==================== HERO SECTION ==================== */}
      <section ref={heroRef} className="relative h-screen overflow-hidden">
        {/* Video Background - Athirappilly Waterfall */}
        <motion.div style={{ y: heroY }} className="absolute inset-0">
          <motion.div
            initial={{ opacity: 0, scale: 1.15 }}
            animate={{ opacity: 1, scale: 1.05 }}
            transition={{ duration: 1.8, ease: [0.23, 1, 0.32, 1] }}
            className="absolute inset-0"
          >
            <video
              autoPlay
              muted
              loop
              playsInline
              poster={HERO_POSTER}
              className="absolute inset-0 w-full h-full object-cover"
            >
              <source src={HERO_VIDEO} type="video/mp4" />
            </video>
          </motion.div>
        </motion.div>

        {/* Cinematic Overlay */}
        <div className="absolute inset-0 hero-gradient hero-pattern" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/20" />

        {/* Content */}
        <motion.div style={{ opacity: heroOpacity }} className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4">
          <motion.div
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 1, ease: [0.23, 1, 0.32, 1] }}
            className="max-w-5xl"
          >
            {/* Badge */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="inline-flex items-center gap-2 glass rounded-full px-5 py-2 mb-8"
            >
              <span className="w-2 h-2 rounded-full bg-kerala-gold animate-pulse" />
              <span className="text-white/90 text-sm font-medium tracking-wide">Welcome to God&apos;s Own Country</span>
            </motion.div>

            <h1 className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-white mb-6 leading-[1.1] tracking-tight">
              {t('hero.title')}
            </h1>

            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="mb-2"
            >
              <p className="text-white/90 text-xl md:text-2xl font-display font-medium italic">
                Athirappilly Waterfalls — The Niagara of India
              </p>
            </motion.div>

            <p className="text-white/60 text-base md:text-lg max-w-2xl mx-auto mb-12 font-light">
              {t('hero.subtitle')}
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/trip-planner" className="group relative">
                <div className="absolute -inset-1 bg-gradient-to-r from-kerala-green to-kerala-lagoon rounded-2xl blur-lg opacity-50 group-hover:opacity-80 transition-opacity duration-500" />
                <span className="relative btn-primary text-lg px-8 py-4 flex items-center gap-2">
                  <Sparkles size={20} />
                  {t('hero.cta.plan')}
                  <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform duration-300" />
                </span>
              </Link>
              <Link href="/destinations" className="glass hover:bg-white/15 text-white px-8 py-4 rounded-2xl font-semibold transition-all duration-500 text-lg flex items-center gap-2 group">
                <MapPin size={20} />
                {t('hero.cta.explore')}
                <ArrowUpRight size={16} className="opacity-0 group-hover:opacity-100 -ml-2 group-hover:ml-0 transition-all duration-300" />
              </Link>
              <Link href="/experiences" className="btn-gold text-lg px-8 py-4 flex items-center gap-2">
                <Play size={20} />
                {t('hero.cta.book')}
              </Link>
            </div>
          </motion.div>

          {/* Location Badge */}
          <div className="absolute bottom-12 flex items-center gap-2">
            <div className="glass rounded-full px-4 py-2 flex items-center gap-2">
              <MapPin size={14} className="text-kerala-gold" />
              <span className="text-white/80 text-xs font-medium tracking-wide">Athirappilly, Thrissur District</span>
            </div>
          </div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
          className="absolute bottom-5 left-1/2 -translate-x-1/2"
        >
          <div className="w-5 h-8 border border-white/25 rounded-full flex justify-center">
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
              className="w-1 h-2 bg-white/50 rounded-full mt-1.5"
            />
          </div>
        </motion.div>
      </section>

      {/* ==================== TOP EXPERIENCES ==================== */}
      <section className="section-padding bg-white dark:bg-gray-950 bg-mesh-gradient relative overflow-hidden">
        {/* Subtle decoration */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-kerala-green/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />

        <div className="container-custom relative">
          <SectionHeader
            label="What Awaits You"
            title={t('section.topExperiences')}
            subtitle={t('section.topExperiences.subtitle')}
          />

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-5">
            {topExperiences.map((exp, i) => {
              const Icon = exp.icon;
              return (
                <Reveal key={exp.name} delay={i * 0.08}>
                  <Link
                    href="/experiences"
                    className="card-hover card-glow block text-center p-6 md:p-7 rounded-3xl bg-white dark:bg-gray-900 border border-gray-100/80 dark:border-gray-800/80 group"
                  >
                    <div className={`bg-gradient-to-br ${exp.gradient} w-14 h-14 md:w-16 md:h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-lg`}>
                      <Icon size={26} className="text-white" />
                    </div>
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-1 text-sm md:text-base">{exp.name}</h3>
                    <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">{exp.desc}</p>
                  </Link>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ==================== DISTRICTS / MAP ==================== */}
      <section className="section-padding bg-gray-50/80 dark:bg-gray-900/50 relative overflow-hidden">
        <div className="absolute inset-0 bg-noise opacity-40" />
        <div className="container-custom relative">
          <SectionHeader
            label="14 Districts"
            title={t('section.interactiveMap')}
            subtitle={t('section.interactiveMap.subtitle')}
          />

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-3">
            {districts.map((district, i) => (
              <Reveal key={district.id} delay={i * 0.04}>
                <Link
                  href={`/destinations?district=${district.slug}`}
                  className="card-hover group relative block overflow-hidden rounded-2xl bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800"
                >
                  <div className="aspect-[4/3] relative">
                    <Image
                      src={district.image}
                      alt={district.name}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-700 ease-spring"
                      sizes="(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 14vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-3">
                      <h3 className="font-semibold text-white text-sm leading-tight group-hover:text-kerala-gold transition-colors duration-300">
                        {district.name}
                      </h3>
                      <p className="text-white/60 text-[10px] mt-0.5">{district.attractions} places</p>
                    </div>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== FEATURED DESTINATIONS ==================== */}
      <section className="section-padding bg-white dark:bg-gray-950 relative overflow-hidden">
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-kerala-lagoon/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

        <div className="container-custom relative">
          <div className="flex items-end justify-between mb-16">
            <SectionHeader
              label="Must Visit"
              title={t('section.featuredDestinations')}
              subtitle={t('section.featuredDestinations.subtitle')}
              center={false}
            />
            <Link href="/destinations" className="hidden md:flex items-center gap-2 text-kerala-green dark:text-emerald-400 font-semibold hover:gap-3 transition-all text-sm group">
              {t('common.viewAll')}
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {/* Bento grid layout */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
            {featuredDestinations.slice(0, 6).map((dest, i) => (
              <Reveal key={dest.id} delay={i * 0.08}>
                <Link href={`/destinations/${dest.slug}`} className="group block">
                  <div className="relative rounded-3xl overflow-hidden bg-gray-100 dark:bg-gray-900">
                    <div className={`relative ${i === 0 ? 'h-80' : 'h-64'} image-reveal`}>
                      <Image
                        src={dest.images[0]}
                        alt={dest.name}
                        fill
                        className="object-cover transition-transform duration-700 ease-spring group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />

                      {/* Tags */}
                      <div className="absolute top-4 right-4 flex gap-2">
                        {dest.type.slice(0, 2).map(type => (
                          <span key={type} className="glass text-white text-xs px-3 py-1 rounded-full capitalize font-medium">
                            {type}
                          </span>
                        ))}
                      </div>

                      {/* Content */}
                      <div className="absolute bottom-0 left-0 right-0 p-6">
                        <div className="flex items-center gap-2 mb-2">
                          <div className="flex items-center gap-1 text-kerala-gold">
                            <Star size={13} fill="currentColor" />
                            <span className="text-white text-sm font-medium">{dest.rating}</span>
                          </div>
                          <span className="text-white/40 text-sm">({dest.reviews.toLocaleString()})</span>
                        </div>
                        <h3 className="text-xl font-display font-bold text-white group-hover:text-kerala-gold transition-colors duration-300">{dest.name}</h3>
                        <div className="flex items-center gap-1.5 text-white/60 text-sm mt-1.5">
                          <MapPin size={13} />
                          {dest.district}
                        </div>
                      </div>
                    </div>
                  </div>
                  <p className="text-gray-500 dark:text-gray-400 text-sm mt-3 line-clamp-2 px-1">{dest.description}</p>
                </Link>
              </Reveal>
            ))}
          </div>

          <div className="text-center mt-10 md:hidden">
            <Link href="/destinations" className="btn-secondary inline-flex items-center gap-2">
              {t('common.viewAll')} <ChevronRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* ==================== FEATURED ITINERARIES ==================== */}
      <section className="section-padding bg-gray-50/80 dark:bg-gray-900/30 relative overflow-hidden">
        <div className="absolute inset-0 bg-mesh-gradient" />

        <div className="container-custom relative">
          <SectionHeader
            label="Curated Trips"
            title={t('section.featuredItineraries')}
            subtitle={t('section.featuredItineraries.subtitle')}
          />

          <div className="grid md:grid-cols-3 gap-6">
            {itineraries.map((itin, i) => (
              <Reveal key={itin.id} delay={i * 0.12}>
                <Link href="/trip-planner" className="card-hover card-glow block bg-white dark:bg-gray-900 rounded-3xl overflow-hidden border border-gray-100/80 dark:border-gray-800/80 group h-full">
                  <div className="relative h-52 overflow-hidden">
                    <Image
                      src={itin.image}
                      alt={itin.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-700 ease-spring"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

                    <div className="absolute top-4 left-4 flex gap-2">
                      <span className="bg-gradient-to-r from-kerala-green to-emerald-500 text-white text-sm px-3.5 py-1 rounded-full font-semibold shadow-lg">
                        {itin.days} Days
                      </span>
                      <span className="glass text-white text-sm px-3.5 py-1 rounded-full capitalize font-medium">
                        {itin.style}
                      </span>
                    </div>

                    <div className="absolute bottom-4 left-4 right-4">
                      <h3 className="font-display text-xl font-bold text-white">{itin.title}</h3>
                    </div>
                  </div>
                  <div className="p-5 md:p-6">
                    <p className="text-gray-500 dark:text-gray-400 text-sm mb-4 line-clamp-2 leading-relaxed">{itin.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-kerala-green dark:text-emerald-400 font-bold text-base">{itin.totalCost}</span>
                      <span className="text-kerala-green dark:text-emerald-400 text-sm flex items-center gap-1.5 font-medium group-hover:gap-2.5 transition-all duration-300">
                        View Details <ArrowRight size={14} />
                      </span>
                    </div>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== SEASONS ==================== */}
      <section className="section-padding bg-white dark:bg-gray-950 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-radial from-kerala-green/5 to-transparent rounded-full blur-3xl" />

        <div className="container-custom relative">
          <SectionHeader
            label="Best Time to Visit"
            title={t('section.seasons')}
            subtitle={t('section.seasons.subtitle')}
          />

          <div className="grid md:grid-cols-3 gap-6">
            {seasons.map((season, i) => (
              <Reveal key={season.id} delay={i * 0.12}>
                <div className="group relative rounded-3xl overflow-hidden h-80">
                  <Image
                    src={season.image}
                    alt={season.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700 ease-spring"
                  />
                  <div className={`absolute inset-0 bg-gradient-to-t ${season.color} opacity-80 mix-blend-multiply`} />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />

                  <div className="relative h-full flex flex-col items-center justify-center text-center p-8">
                    <span className="text-5xl mb-4 drop-shadow-lg">{season.icon}</span>
                    <h3 className="font-display text-2xl md:text-3xl font-bold text-white mb-1">{season.name}</h3>
                    <p className="text-white/80 text-sm font-medium tracking-wide mb-3">{season.months}</p>
                    <p className="text-white/70 text-sm max-w-xs leading-relaxed">{season.desc}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== FEATURED EXPERIENCES ==================== */}
      <section className="section-padding bg-gray-50/80 dark:bg-gray-900/30 relative overflow-hidden">
        <div className="absolute inset-0 bg-noise opacity-30" />

        <div className="container-custom relative">
          <div className="flex items-end justify-between mb-16">
            <SectionHeader
              label="Do & See"
              title="Unforgettable Experiences"
              subtitle="Curated activities that define the Kerala experience"
              center={false}
            />
            <Link href="/experiences" className="hidden md:flex items-center gap-2 text-kerala-green dark:text-emerald-400 font-semibold hover:gap-3 transition-all text-sm group">
              {t('common.viewAll')}
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredExperiences.slice(0, 3).map((exp, i) => (
              <Reveal key={exp.id} delay={i * 0.1}>
                <Link href={`/experiences/${exp.slug}`} className="card-hover card-glow block bg-white dark:bg-gray-900 rounded-3xl overflow-hidden border border-gray-100/80 dark:border-gray-800/80 group h-full">
                  <div className="relative h-56 overflow-hidden">
                    <Image
                      src={exp.images[0]}
                      alt={exp.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-700 ease-spring"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                    <div className="absolute bottom-4 left-4 right-4">
                      <div className="flex items-center gap-2 mb-1">
                        <Star size={14} className="text-kerala-gold" fill="currentColor" />
                        <span className="text-white text-sm font-medium">{exp.rating}</span>
                        <span className="text-white/50 text-sm">· {exp.location}</span>
                      </div>
                    </div>
                  </div>
                  <div className="p-5 md:p-6">
                    <h3 className="font-display text-lg font-bold text-gray-900 dark:text-white mb-2 group-hover:text-kerala-green dark:group-hover:text-emerald-400 transition-colors">{exp.title}</h3>
                    <p className="text-gray-500 dark:text-gray-400 text-sm mb-4 line-clamp-2 leading-relaxed">{exp.description}</p>
                    <div className="flex items-center gap-4 text-sm">
                      <span className="flex items-center gap-1.5 text-gray-400"><Clock size={14} /> {exp.duration}</span>
                      <span className="text-kerala-green dark:text-emerald-400 font-semibold">{exp.costEstimate}</span>
                    </div>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== BLOG SECTION ==================== */}
      <section className="section-padding bg-white dark:bg-gray-950 relative overflow-hidden">
        <div className="container-custom">
          <div className="flex items-end justify-between mb-16">
            <SectionHeader
              label="Stories & Tips"
              title={t('section.latestBlog')}
              subtitle={t('section.latestBlog.subtitle')}
              center={false}
            />
            <Link href="/blog" className="hidden md:flex items-center gap-2 text-kerala-green dark:text-emerald-400 font-semibold hover:gap-3 transition-all text-sm group">
              {t('common.viewAll')}
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {featuredBlogs.map((post, i) => (
              <Reveal key={post.id} delay={i * 0.1}>
                <Link href={`/blog/${post.slug}`} className="card-hover card-glow block bg-white dark:bg-gray-900 rounded-3xl overflow-hidden border border-gray-100/80 dark:border-gray-800/80 group h-full">
                  <div className="relative h-52 overflow-hidden">
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-700 ease-spring"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                    <div className="absolute top-4 left-4">
                      <span className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl text-kerala-green dark:text-emerald-400 text-xs font-semibold px-3 py-1.5 rounded-full shadow-sm">
                        {post.category}
                      </span>
                    </div>
                  </div>
                  <div className="p-5 md:p-6">
                    <h3 className="font-display text-lg font-bold text-gray-900 dark:text-white mb-2 line-clamp-2 group-hover:text-kerala-green dark:group-hover:text-emerald-400 transition-colors">{post.title}</h3>
                    <p className="text-gray-500 dark:text-gray-400 text-sm mb-4 line-clamp-2 leading-relaxed">{post.excerpt}</p>
                    <div className="flex items-center justify-between text-sm text-gray-400 dark:text-gray-500">
                      <span className="font-medium">{post.author}</span>
                      <span>{post.readTime}</span>
                    </div>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== CTA SECTION ==================== */}
      <section className="relative py-32 md:py-40 overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1602158123411-e64e5d76e7c5?w=1920"
          alt="Kerala Backwaters"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-kerala-green/90 via-kerala-green/70 to-kerala-lagoon/80" />
        <div className="absolute inset-0 bg-noise opacity-20" />

        {/* Decorative circles */}
        <div className="absolute top-1/4 left-1/4 w-64 h-64 border border-white/10 rounded-full" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 border border-white/5 rounded-full" />

        <div className="relative z-10 text-center px-4">
          <Reveal>
            <span className="inline-flex items-center gap-2 glass rounded-full px-5 py-2 mb-8">
              <Sparkles size={14} className="text-kerala-gold" />
              <span className="text-white/90 text-sm font-medium">AI-Powered Trip Planner</span>
            </span>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 tracking-tight max-w-3xl mx-auto leading-tight">
              Ready to Explore God&apos;s Own Country?
            </h2>
          </Reveal>
          <Reveal delay={0.15}>
            <p className="text-white/70 text-lg md:text-xl mb-10 max-w-2xl mx-auto font-light leading-relaxed">
              Let our smart trip planner create the perfect Kerala itinerary for you. Just tell us your style, budget, and dates.
            </p>
          </Reveal>
          <Reveal delay={0.2}>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/trip-planner" className="group relative">
                <div className="absolute -inset-1 bg-white/30 rounded-2xl blur-lg opacity-50 group-hover:opacity-80 transition-opacity" />
                <span className="relative bg-white text-kerala-green px-8 py-4 rounded-2xl font-bold text-lg hover:bg-gray-50 transition-all duration-300 flex items-center gap-2 shadow-elevated-lg">
                  <Sparkles size={20} />
                  Plan My Trip Now
                  <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </span>
              </Link>
              <Link href="/experiences" className="glass hover:bg-white/15 text-white px-8 py-4 rounded-2xl font-bold text-lg transition-all duration-300 flex items-center gap-2">
                Browse Experiences
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}

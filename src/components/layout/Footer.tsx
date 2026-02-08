'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/contexts/LanguageContext';
import { MapPin, Phone, Mail, Facebook, Instagram, Twitter, Youtube, Heart, ArrowRight, Send } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="relative bg-gray-950 text-white overflow-hidden">
      {/* Decorative gradient blobs */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-kerala-green/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-kerala-lagoon/5 rounded-full blur-3xl" />

      {/* Wave Separator */}
      <div className="relative -mt-px">
        <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full" preserveAspectRatio="none">
          <path d="M0 30C360 60 720 0 1080 30C1260 45 1350 15 1440 30V60H0V30Z" fill="#030712" />
        </svg>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-10">
          {/* Brand */}
          <div className="space-y-5">
            <Link href="/" className="inline-block">
              <span className="text-2xl font-display font-bold">
                <span className="mr-2">🌴</span>Kerala <span className="text-kerala-gold">Tourism</span>
              </span>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed">
              {t('footer.tagline')}. Explore breathtaking backwaters, misty hill stations, 
              pristine beaches, and ancient cultural traditions in God&apos;s Own Country.
            </p>
            <div className="flex gap-2.5">
              {[
                { Icon: Facebook, label: 'Facebook' },
                { Icon: Instagram, label: 'Instagram' },
                { Icon: Twitter, label: 'Twitter' },
                { Icon: Youtube, label: 'Youtube' },
              ].map(({ Icon, label }) => (
                <a
                  key={label}
                  href="#"
                  aria-label={label}
                  className="w-10 h-10 rounded-xl bg-white/5 border border-white/5 flex items-center justify-center hover:bg-kerala-green hover:border-kerala-green/50 hover:scale-110 transition-all duration-300 text-gray-400 hover:text-white"
                >
                  <Icon size={17} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white mb-5">{t('footer.quickLinks')}</h3>
            <ul className="space-y-3">
              {[
                { href: '/destinations', label: t('nav.destinations') },
                { href: '/experiences', label: t('nav.experiences') },
                { href: '/trip-planner', label: t('nav.tripPlanner') },
                { href: '/blog', label: t('nav.blog') },
                { href: '/accommodation', label: t('nav.accommodation') },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="group text-gray-400 hover:text-white transition-colors duration-300 text-sm flex items-center gap-2"
                  >
                    <ArrowRight size={12} className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 text-kerala-gold" />
                    <span className="group-hover:translate-x-0.5 transition-transform duration-300">{link.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Top Experiences */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white mb-5">{t('footer.experiences')}</h3>
            <ul className="space-y-3">
              {[
                'Backwater Cruises',
                'Houseboat Stays',
                'Ayurveda Retreats',
                'Tea Plantation Treks',
                'Wildlife Safaris',
                'Kathakali Shows',
              ].map((item) => (
                <li key={item}>
                  <Link
                    href="/experiences"
                    className="group text-gray-400 hover:text-white transition-colors duration-300 text-sm flex items-center gap-2"
                  >
                    <ArrowRight size={12} className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 text-kerala-gold" />
                    <span className="group-hover:translate-x-0.5 transition-transform duration-300">{item}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & Newsletter */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white mb-5">{t('footer.support')}</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-kerala-gold/10 flex items-center justify-center shrink-0 mt-0.5">
                  <MapPin size={15} className="text-kerala-gold" />
                </div>
                <span className="text-gray-400 text-sm leading-relaxed">
                  Kerala Tourism Office, Park View, Thiruvananthapuram, Kerala 695033
                </span>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-kerala-gold/10 flex items-center justify-center shrink-0">
                  <Phone size={15} className="text-kerala-gold" />
                </div>
                <span className="text-gray-400 text-sm">+91 471 232 1132</span>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-kerala-gold/10 flex items-center justify-center shrink-0">
                  <Mail size={15} className="text-kerala-gold" />
                </div>
                <span className="text-gray-400 text-sm">info@keralatourism.org</span>
              </li>
            </ul>

            {/* Newsletter */}
            <div className="mt-6">
              <p className="text-sm font-medium text-white mb-3">Stay Updated</p>
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="Your email"
                  className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm placeholder-gray-500 focus:outline-none focus:border-kerala-gold/50 focus:bg-white/[0.07] transition-all duration-300"
                />
                <button className="bg-gradient-to-r from-kerala-gold to-amber-500 text-white px-4 py-2.5 rounded-xl text-sm font-medium hover:shadow-lg hover:shadow-kerala-gold/20 transition-all duration-300 active:scale-95">
                  <Send size={16} />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-500 text-sm">{t('footer.copyright')}</p>
          <div className="flex items-center gap-6">
            <Link href="#" className="text-gray-500 hover:text-gray-300 text-sm transition-colors">{t('footer.privacy')}</Link>
            <span className="text-gray-700">·</span>
            <Link href="#" className="text-gray-500 hover:text-gray-300 text-sm transition-colors">{t('footer.terms')}</Link>
          </div>
          <p className="text-gray-500 text-sm flex items-center gap-1.5">
            Made with <Heart size={13} className="text-red-500 fill-red-500 animate-pulse" /> for God&apos;s Own Country
          </p>
        </div>
      </div>

      {/* Cookie Consent */}
      <CookieConsent />
    </footer>
  );
}

function CookieConsent() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('cookie-consent');
    if (!consent) {
      setTimeout(() => setShow(true), 2000);
    }
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
          className="cookie-banner bg-white/95 dark:bg-gray-900/95 backdrop-blur-2xl text-gray-800 dark:text-gray-200 px-6 py-4 shadow-[0_-4px_30px_rgba(0,0,0,0.1)] border-t border-gray-200/50 dark:border-gray-700/50"
        >
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              🍪 We use cookies to enhance your experience. By continuing to visit this site you agree to our use of cookies.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => {
                  localStorage.setItem('cookie-consent', 'accepted');
                  setShow(false);
                }}
                className="btn-primary text-sm px-5 py-2"
              >
                Accept All
              </button>
              <button
                onClick={() => {
                  localStorage.setItem('cookie-consent', 'essential');
                  setShow(false);
                }}
                className="border border-gray-200 dark:border-gray-600 text-gray-600 dark:text-gray-400 px-5 py-2 rounded-2xl text-sm font-medium hover:bg-gray-50 dark:hover:bg-gray-800 transition-all duration-300"
              >
                Essential Only
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

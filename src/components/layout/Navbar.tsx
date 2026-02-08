'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useLanguage } from '@/contexts/LanguageContext';
import { Menu, X, Globe, MapPin, Compass, Calendar, BookOpen, Home, Hotel, Settings, ChevronDown, Sun, Moon, UtensilsCrossed, Flame } from 'lucide-react';
import { useTheme } from 'next-themes';
import { Language } from '@/types';
import { motion, AnimatePresence } from 'framer-motion';

const languages: { code: Language; label: string; flag: string }[] = [
  { code: 'en', label: 'English', flag: '🇬🇧' },
  { code: 'ml', label: 'മലയാളം', flag: '🇮🇳' },
  { code: 'hi', label: 'हिन्दी', flag: '🇮🇳' },
  { code: 'ar', label: 'العربية', flag: '🇸🇦' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const langRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const { t, language, setLanguage } = useLanguage();
  const { theme, setTheme } = useTheme();

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close language dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (langRef.current && !langRef.current.contains(e.target as Node)) {
        setLangOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const navLinks = [
    { href: '/', label: t('nav.home'), icon: Home },
    { href: '/destinations', label: t('nav.destinations'), icon: MapPin },
    { href: '/experiences', label: t('nav.experiences'), icon: Compass },
    { href: '/gods-own-flavours', label: t('nav.godsOwnFlavours'), icon: UtensilsCrossed },
    { href: '/trip-planner', label: t('nav.tripPlanner'), icon: Calendar },
    { href: '/blog', label: t('nav.blog'), icon: BookOpen },
    { href: '/accommodation', label: t('nav.accommodation'), icon: Hotel },
  ];

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ease-spring ${
        scrolled
          ? 'bg-white/80 dark:bg-gray-950/80 backdrop-blur-2xl backdrop-saturate-[1.8] shadow-[0_1px_0_0_rgba(0,0,0,0.05),0_4px_20px_-4px_rgba(0,0,0,0.08)]'
          : 'bg-gradient-to-b from-black/30 to-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="relative">
              <span className="text-2xl">🌴</span>
            </div>
            <div className={`font-display font-bold text-xl md:text-2xl transition-all duration-500 ${
              scrolled ? 'text-gray-900 dark:text-white' : 'text-white'
            }`}>
              <span>Kerala</span>
              <span className={`ml-1.5 transition-colors duration-500 ${
                scrolled ? 'text-kerala-gold' : 'text-kerala-gold'
              }`}>Tourism</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-0.5">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const active = isActive(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 ${
                    active
                      ? scrolled
                        ? 'text-kerala-green dark:text-emerald-400'
                        : 'text-white'
                      : scrolled
                        ? 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100/80 dark:hover:bg-white/5'
                        : 'text-white/75 hover:text-white hover:bg-white/10'
                  }`}
                >
                  <Icon size={15} className={active ? 'opacity-100' : 'opacity-60'} />
                  {link.label}
                  {active && (
                    <motion.div
                      layoutId="nav-active"
                      className={`absolute -bottom-0.5 left-3 right-3 h-0.5 rounded-full ${
                        scrolled
                          ? 'bg-gradient-to-r from-kerala-green to-kerala-lagoon'
                          : 'bg-white'
                      }`}
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </Link>
              );
            })}

            <div className="w-px h-6 bg-gray-200 dark:bg-gray-700 mx-2 opacity-50" />

            {/* Language Selector */}
            <div className="relative" ref={langRef}>
              <button
                onClick={() => setLangOpen(!langOpen)}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm font-medium transition-all duration-300 ${
                  scrolled
                    ? 'text-gray-600 dark:text-gray-400 hover:bg-gray-100/80 dark:hover:bg-white/5'
                    : 'text-white/75 hover:text-white hover:bg-white/10'
                }`}
              >
                <Globe size={15} />
                {languages.find(l => l.code === language)?.flag}
                <ChevronDown size={13} className={`transition-transform duration-300 ${langOpen ? 'rotate-180' : ''}`} />
              </button>

              <AnimatePresence>
                {langOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.96 }}
                    transition={{ duration: 0.2, ease: [0.23, 1, 0.32, 1] }}
                    className="absolute right-0 mt-2 w-48 bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl rounded-2xl shadow-elevated-lg border border-gray-200/60 dark:border-gray-700/60 py-2 overflow-hidden"
                  >
                    {languages.map((lang) => (
                      <button
                        key={lang.code}
                        onClick={() => {
                          setLanguage(lang.code);
                          setLangOpen(false);
                        }}
                        className={`w-full flex items-center gap-3 px-4 py-2.5 text-sm transition-all duration-200 ${
                          language === lang.code
                            ? 'text-kerala-green dark:text-emerald-400 font-semibold bg-kerala-green/5 dark:bg-emerald-400/5'
                            : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800/50'
                        }`}
                      >
                        <span className="text-lg">{lang.flag}</span>
                        {lang.label}
                        {language === lang.code && (
                          <span className="ml-auto text-xs bg-kerala-green/10 text-kerala-green dark:text-emerald-400 px-2 py-0.5 rounded-full">Active</span>
                        )}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Dark Mode Toggle */}
            {mounted && (
              <button
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                className={`relative p-2.5 rounded-xl transition-all duration-300 ${
                  scrolled
                    ? 'text-gray-600 hover:bg-gray-100/80 dark:text-gray-400 dark:hover:bg-white/5'
                    : 'text-white/75 hover:text-white hover:bg-white/10'
                }`}
                aria-label="Toggle dark mode"
              >
                <AnimatePresence mode="wait" initial={false}>
                  <motion.div
                    key={theme}
                    initial={{ y: -8, opacity: 0, rotate: -90 }}
                    animate={{ y: 0, opacity: 1, rotate: 0 }}
                    exit={{ y: 8, opacity: 0, rotate: 90 }}
                    transition={{ duration: 0.2 }}
                  >
                    {theme === 'dark' ? <Sun size={17} /> : <Moon size={17} />}
                  </motion.div>
                </AnimatePresence>
              </button>
            )}

            {/* Admin Link */}
            <Link
              href="/admin"
              className={`p-2.5 rounded-xl text-sm font-medium transition-all duration-300 ${
                scrolled
                  ? 'text-gray-400 hover:text-gray-600 hover:bg-gray-100/80 dark:text-gray-500 dark:hover:text-gray-300 dark:hover:bg-white/5'
                  : 'text-white/50 hover:text-white/80 hover:bg-white/10'
              }`}
            >
              <Settings size={17} />
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={`lg:hidden p-2.5 rounded-xl transition-all duration-300 ${
              scrolled
                ? 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                : 'text-white hover:bg-white/10'
            }`}
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={isOpen ? 'close' : 'open'}
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.15 }}
              >
                {isOpen ? <X size={22} /> : <Menu size={22} />}
              </motion.div>
            </AnimatePresence>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.35, ease: [0.23, 1, 0.32, 1] }}
            className="lg:hidden overflow-hidden"
          >
            <div className="bg-white/90 dark:bg-gray-950/90 backdrop-blur-2xl border-t border-gray-200/50 dark:border-gray-800/50">
              <div className="px-4 py-5 space-y-1">
                {navLinks.map((link, i) => {
                  const Icon = link.icon;
                  return (
                    <motion.div
                      key={link.href}
                      initial={{ opacity: 0, x: -16 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.05, duration: 0.3 }}
                    >
                      <Link
                        href={link.href}
                        onClick={() => setIsOpen(false)}
                        className={`flex items-center gap-3 px-4 py-3.5 rounded-2xl text-base font-medium transition-all duration-300 ${
                          isActive(link.href)
                            ? 'bg-gradient-to-r from-kerala-green to-emerald-600 text-white shadow-lg shadow-kerala-green/20'
                            : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100/80 dark:hover:bg-white/5'
                        }`}
                      >
                        <Icon size={20} className={isActive(link.href) ? 'opacity-100' : 'opacity-50'} />
                        {link.label}
                      </Link>
                    </motion.div>
                  );
                })}

                <div className="pt-4 mt-4 border-t border-gray-200/50 dark:border-gray-800/50">
                  <p className="px-4 text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">{t('nav.language')}</p>
                  <div className="grid grid-cols-2 gap-2 px-4">
                    {languages.map((lang) => (
                      <button
                        key={lang.code}
                        onClick={() => {
                          setLanguage(lang.code);
                          setIsOpen(false);
                        }}
                        className={`flex items-center gap-2 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 ${
                          language === lang.code
                            ? 'bg-gradient-to-r from-kerala-green to-emerald-600 text-white shadow-md'
                            : 'bg-gray-50 dark:bg-gray-800/50 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                        }`}
                      >
                        <span>{lang.flag}</span>
                        {lang.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex items-center gap-2 px-4 pt-3">
                  {mounted && (
                    <button
                      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                      className="flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/50 hover:bg-gray-100 dark:hover:bg-gray-800 font-medium text-sm transition-all"
                    >
                      {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
                      {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
                    </button>
                  )}
                  <Link
                    href="/admin"
                    onClick={() => setIsOpen(false)}
                    className="flex items-center justify-center p-3 rounded-xl text-gray-400 bg-gray-50 dark:bg-gray-800/50 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all"
                  >
                    <Settings size={18} />
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

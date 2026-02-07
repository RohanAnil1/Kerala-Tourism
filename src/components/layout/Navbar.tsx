'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useLanguage } from '@/contexts/LanguageContext';
import { Menu, X, Globe, MapPin, Compass, Calendar, BookOpen, Home, Hotel, Settings, ChevronDown } from 'lucide-react';
import { Language } from '@/types';

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
  const pathname = usePathname();
  const { t, language, setLanguage } = useLanguage();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: '/', label: t('nav.home'), icon: Home },
    { href: '/destinations', label: t('nav.destinations'), icon: MapPin },
    { href: '/experiences', label: t('nav.experiences'), icon: Compass },
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
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-white/95 backdrop-blur-lg shadow-lg shadow-black/5'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className={`text-2xl md:text-3xl font-display font-bold transition-colors ${
              scrolled ? 'text-kerala-green' : 'text-white'
            }`}>
              <span className="inline-block">🌴</span>
              <span className="ml-1">Kerala</span>
              <span className="text-kerala-gold ml-1">Tourism</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => {
              const Icon = link.icon;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                    isActive(link.href)
                      ? scrolled
                        ? 'bg-kerala-green text-white'
                        : 'bg-white/20 text-white'
                      : scrolled
                        ? 'text-gray-700 hover:bg-gray-100'
                        : 'text-white/90 hover:bg-white/10'
                  }`}
                >
                  <Icon size={16} />
                  {link.label}
                </Link>
              );
            })}

            {/* Language Selector */}
            <div className="relative ml-2">
              <button
                onClick={() => setLangOpen(!langOpen)}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                  scrolled ? 'text-gray-700 hover:bg-gray-100' : 'text-white/90 hover:bg-white/10'
                }`}
              >
                <Globe size={16} />
                {languages.find(l => l.code === language)?.flag}
                <ChevronDown size={14} />
              </button>

              {langOpen && (
                <div className="absolute right-0 mt-2 w-44 bg-white rounded-xl shadow-xl border border-gray-100 py-2 animate-slide-down">
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => {
                        setLanguage(lang.code);
                        setLangOpen(false);
                      }}
                      className={`w-full flex items-center gap-3 px-4 py-2.5 text-sm hover:bg-gray-50 transition-colors ${
                        language === lang.code ? 'text-kerala-green font-semibold bg-kerala-green/5' : 'text-gray-700'
                      }`}
                    >
                      <span className="text-lg">{lang.flag}</span>
                      {lang.label}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Admin Link */}
            <Link
              href="/admin"
              className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                scrolled ? 'text-gray-500 hover:bg-gray-100' : 'text-white/70 hover:bg-white/10'
              }`}
            >
              <Settings size={16} />
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={`lg:hidden p-2 rounded-lg transition-colors ${
              scrolled ? 'text-gray-700 hover:bg-gray-100' : 'text-white hover:bg-white/10'
            }`}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="lg:hidden bg-white border-t shadow-xl animate-slide-down">
          <div className="px-4 py-4 space-y-1">
            {navLinks.map((link) => {
              const Icon = link.icon;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl text-base font-medium transition-all ${
                    isActive(link.href)
                      ? 'bg-kerala-green text-white'
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <Icon size={20} />
                  {link.label}
                </Link>
              );
            })}

            {/* Mobile Language Selection */}
            <div className="pt-3 border-t mt-3">
              <p className="px-4 text-xs font-semibold text-gray-400 uppercase mb-2">{t('nav.language')}</p>
              <div className="grid grid-cols-2 gap-2 px-4">
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => {
                      setLanguage(lang.code);
                      setIsOpen(false);
                    }}
                    className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-colors ${
                      language === lang.code
                        ? 'bg-kerala-green text-white'
                        : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <span>{lang.flag}</span>
                    {lang.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Mobile Admin */}
            <Link
              href="/admin"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-500 hover:bg-gray-50"
            >
              <Settings size={20} />
              {t('nav.admin')}
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}

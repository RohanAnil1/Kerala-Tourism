'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/contexts/LanguageContext';
import { MapPin, Phone, Mail, Facebook, Instagram, Twitter, Youtube, Heart } from 'lucide-react';

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="bg-gray-900 text-white">
      {/* Wave Separator */}
      <div className="relative">
        <svg viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
          <path d="M0 40C240 80 480 0 720 40C960 80 1200 0 1440 40V80H0V40Z" fill="#111827" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="space-y-4">
            <Link href="/" className="text-2xl font-display font-bold">
              🌴 Kerala <span className="text-kerala-gold">Tourism</span>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed">
              {t('footer.tagline')}. Explore breathtaking backwaters, misty hill stations, 
              pristine beaches, and ancient cultural traditions in God&apos;s Own Country.
            </p>
            <div className="flex gap-3">
              {[Facebook, Instagram, Twitter, Youtube].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-kerala-green transition-colors"
                >
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">{t('footer.quickLinks')}</h3>
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
                    className="text-gray-400 hover:text-kerala-gold transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Top Experiences */}
          <div>
            <h3 className="text-lg font-semibold mb-4">{t('footer.experiences')}</h3>
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
                    className="text-gray-400 hover:text-kerala-gold transition-colors text-sm"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-4">{t('footer.support')}</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin size={18} className="text-kerala-gold mt-0.5 shrink-0" />
                <span className="text-gray-400 text-sm">
                  Kerala Tourism Office, Park View, Thiruvananthapuram, Kerala 695033
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={18} className="text-kerala-gold shrink-0" />
                <span className="text-gray-400 text-sm">+91 471 232 1132</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={18} className="text-kerala-gold shrink-0" />
                <span className="text-gray-400 text-sm">info@keralatourism.org</span>
              </li>
            </ul>

            {/* Newsletter */}
            <div className="mt-6">
              <p className="text-sm font-medium mb-2">Subscribe to Newsletter</p>
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="Your email"
                  className="flex-1 bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-kerala-gold"
                />
                <button className="bg-kerala-gold text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-kerala-gold/90 transition-colors">
                  Go
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-500 text-sm">{t('footer.copyright')}</p>
          <div className="flex items-center gap-6">
            <Link href="#" className="text-gray-500 hover:text-gray-300 text-sm">{t('footer.privacy')}</Link>
            <Link href="#" className="text-gray-500 hover:text-gray-300 text-sm">{t('footer.terms')}</Link>
          </div>
          <p className="text-gray-500 text-sm flex items-center gap-1">
            Made with <Heart size={14} className="text-red-500 fill-red-500" /> for God&apos;s Own Country
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

  if (!show) return null;

  return (
    <div className="cookie-banner bg-white text-gray-800 px-6 py-4 shadow-2xl border-t">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-sm text-gray-600">
          🍪 We use cookies to enhance your experience. By continuing to visit this site you agree to our use of cookies.
        </p>
        <div className="flex gap-3">
          <button
            onClick={() => {
              localStorage.setItem('cookie-consent', 'accepted');
              setShow(false);
            }}
            className="bg-kerala-green text-white px-5 py-2 rounded-lg text-sm font-medium hover:bg-kerala-green/90 transition-colors"
          >
            Accept All
          </button>
          <button
            onClick={() => {
              localStorage.setItem('cookie-consent', 'essential');
              setShow(false);
            }}
            className="border border-gray-300 text-gray-600 px-5 py-2 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors"
          >
            Essential Only
          </button>
        </div>
      </div>
    </div>
  );
}

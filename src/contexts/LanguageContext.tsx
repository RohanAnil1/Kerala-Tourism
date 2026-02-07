'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Language } from '@/types';
import { t as translate } from '@/data/translations';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
  isRTL: boolean;
}

const LanguageContext = createContext<LanguageContextType>({
  language: 'en',
  setLanguage: () => {},
  t: (key: string) => key,
  isRTL: false,
});

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>('en');
  const isRTL = language === 'ar';

  useEffect(() => {
    const saved = localStorage.getItem('kerala-lang') as Language;
    if (saved && ['en', 'ml', 'hi', 'ar'].includes(saved)) {
      setLanguage(saved);
    } else {
      // Auto-detect from browser
      const browserLang = navigator.language.split('-')[0];
      if (browserLang === 'ml') setLanguage('ml');
      else if (browserLang === 'hi') setLanguage('hi');
      else if (browserLang === 'ar') setLanguage('ar');
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('kerala-lang', language);
    document.documentElement.dir = isRTL ? 'rtl' : 'ltr';
    document.documentElement.lang = language;
  }, [language, isRTL]);

  const t = (key: string) => translate(key, language);

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, isRTL }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}

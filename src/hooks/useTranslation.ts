import { useState, useEffect } from 'react';

type Language = 'en' | 'hi';

interface TranslationData {
  [key: string]: any;
}

const translations: Record<Language, TranslationData> = {
  en: {},
  hi: {}
};

// Load translations
const loadTranslations = async () => {
  try {
    const [enData, hiData] = await Promise.all([
      import('../locales/en.json'),
      import('../locales/hi.json')
    ]);
    translations.en = enData.default;
    translations.hi = hiData.default;
  } catch (error) {
    console.error('Failed to load translations:', error);
  }
};

// Initialize translations
loadTranslations();

export const useTranslation = () => {
  const [language, setLanguage] = useState<Language>(() => {
    const saved = localStorage.getItem('language');
    return (saved as Language) || 'en';
  });

  useEffect(() => {
    localStorage.setItem('language', language);
  }, [language]);

  const t = (key: string): string => {
    const keys = key.split('.');
    let value: any = translations[language];
    
    for (const k of keys) {
      value = value?.[k];
      if (value === undefined) break;
    }
    
    return value || key;
  };

  const switchLanguage = (lang: Language) => {
    setLanguage(lang);
  };

  return { t, language, switchLanguage };
};
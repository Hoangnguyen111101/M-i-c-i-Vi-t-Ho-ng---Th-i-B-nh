import React, { createContext, useContext, useState, useEffect } from 'react';
import { Language, Translations, translations } from './translations';
import { Globe } from 'lucide-react';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: Translations;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const STORAGE_KEY = 'wedding_language_preference_v1';

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    try {
      // 1. Check URL search param (?lang=ja or ?lang=vi)
      const params = new URLSearchParams(window.location.search);
      const urlLang = params.get('lang')?.toLowerCase();
      if (urlLang === 'ja' || urlLang === 'jp') return 'ja';
      if (urlLang === 'vi' || urlLang === 'vn') return 'vi';

      // 2. Check localStorage
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved === 'ja' || saved === 'vi') return saved;
    } catch {
      // ignore
    }
    return 'vi';
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    try {
      localStorage.setItem(STORAGE_KEY, lang);
      // Update HTML lang attribute
      document.documentElement.lang = lang;
    } catch {
      // ignore
    }
  };

  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  const t = translations[language];

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

interface LanguageToggleProps {
  className?: string;
  variant?: 'light' | 'dark' | 'glass';
}

export const LanguageToggle: React.FC<LanguageToggleProps> = ({
  className = '',
  variant = 'glass',
}) => {
  const { language, setLanguage } = useLanguage();

  const getButtonClass = (lang: Language) => {
    const isActive = language === lang;
    if (variant === 'light') {
      return isActive
        ? 'bg-[#8A4F3D] text-white shadow-xs font-semibold'
        : 'text-[#6E5B4F] hover:text-[#332620] hover:bg-black/5 font-medium';
    }
    if (variant === 'dark') {
      return isActive
        ? 'bg-white/25 text-white font-semibold shadow-xs'
        : 'text-white/70 hover:text-white hover:bg-white/10 font-medium';
    }
    // glass (default for navbar & door)
    return isActive
      ? 'bg-white text-[#8A4F3D] shadow-xs font-bold'
      : 'text-neutral-700 hover:text-neutral-900 font-medium hover:bg-white/40';
  };

  return (
    <div
      className={`inline-flex items-center p-0.5 rounded-full border transition-all ${
        variant === 'light'
          ? 'bg-[#FAF3ED] border-[#E8D4C4]'
          : variant === 'dark'
          ? 'bg-white/10 border-white/20 backdrop-blur-md'
          : 'bg-white/75 backdrop-blur-md border-[#E5D7CC] shadow-xs'
      } ${className}`}
      role="group"
      aria-label="Language selection"
    >
      <button
        type="button"
        onClick={() => setLanguage('vi')}
        className={`flex items-center gap-1 px-2.5 py-1 rounded-full text-xs transition-all active:scale-95 ${getButtonClass(
          'vi'
        )}`}
        title="Tiếng Việt"
      >
        <span className="text-xs">🇻🇳</span>
        <span>VI</span>
      </button>

      <button
        type="button"
        onClick={() => setLanguage('ja')}
        className={`flex items-center gap-1 px-2.5 py-1 rounded-full text-xs transition-all active:scale-95 ${getButtonClass(
          'ja'
        )}`}
        title="日本語 (Japanese)"
      >
        <span className="text-xs">🇯🇵</span>
        <span>JA</span>
      </button>
    </div>
  );
};

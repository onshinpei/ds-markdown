import React, { createContext, useContext, useState, useEffect } from 'react';
import zh from './i18n/zh';
import en from './i18n/en';

export type Lang = 'zh' | 'en';

const LANG_KEY = 'website_lang';

const langMap: Record<string, Record<string, string>> = { zh, en };

interface LanguageContextProps {
  lang: Lang;
  setLang: (lang: Lang) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextProps>({
  lang: 'zh',
  setLang: () => {},
  t: (key) => key,
});

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [lang, setLangState] = useState<Lang>('zh');

  useEffect(() => {
    const saved = localStorage.getItem(LANG_KEY) as Lang | null;
    if (saved && (saved === 'zh' || saved === 'en')) {
      setLangState(saved);
    }
  }, []);

  const setLang = (l: Lang) => {
    setLangState(l);
    localStorage.setItem(LANG_KEY, l);
  };

  const t = (key: string) => {
    return langMap[lang][key] || key;
  };

  return <LanguageContext.Provider value={{ lang, setLang, t }}>{children}</LanguageContext.Provider>;
};

export const useLanguage = () => useContext(LanguageContext);

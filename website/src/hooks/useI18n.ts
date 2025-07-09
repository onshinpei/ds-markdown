import { useLanguage } from '../LanguageContext';

export const useI18n = () => {
  const { t, lang, setLang } = useLanguage();
  return { t, lang, setLang };
};

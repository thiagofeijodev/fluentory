import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import ptBrTraslation from 'languages/ptBr.json';

export const cacheKey = 'TranslationProvider';

// i18next format to local use
export const translationEnumOption = {
  en: 'English',
  ptBr: 'Portugues',
};

// local use to i18next format
export const translationEnumReverseOption = {
  English: 'en',
  Portugues: 'ptBr',
};

const resources = {
  [translationEnumReverseOption[translationEnumOption.ptBr]]: {
    translation: ptBrTraslation,
  },
};

i18n.use(initReactI18next).init({
  lng: localStorage.getItem(cacheKey) || 'en',
  resources,
  ns: ['translation'],
  defaultNS: 'translation',
  fallbackLng: 'en',
  supportedLngs: ['en', 'ptBr'],
  interpolation: {
    escapeValue: false,
  },
  debug: false,
});

export default i18n;

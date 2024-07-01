import React, { createContext, useEffect, useState, useContext } from 'react';
import { useTranslation } from 'react-i18next';
import i18n, {
  translationEnumOption as _translationEnumOption,
  translationEnumReverseOption,
  cacheKey,
} from './utils/i18n';

const TranslationContext = createContext(null);

export const TranslationProvider = ({ children }) => {
  const { t } = useTranslation();
  const [lng, setLng] = useState(_translationEnumOption.en);

  const onTraslation = (language) => {
    setLng(language);
    localStorage.setItem(cacheKey, language);
  };

  useEffect(() => {
    i18n.changeLanguage(translationEnumReverseOption[lng]);
  }, [lng]);

  useEffect(() => {
    const translationInStorage = localStorage.getItem(cacheKey);
    if (translationInStorage) {
      setLng(translationInStorage);
      i18n.changeLanguage(translationEnumReverseOption[lng]);
    }
  }, []);

  return (
    <TranslationContext.Provider value={{ t, lng, onTraslation }}>
      {children}
    </TranslationContext.Provider>
  );
};

export const useLanguage = () => {
  return useContext(TranslationContext);
};

export const translationEnumOption = _translationEnumOption;

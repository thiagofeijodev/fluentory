import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import i18n, {
  translationEnumOption as _translationEnumOption,
  translationEnumReverseOption,
  cacheKey,
} from './utils/i18n';
import { TranslationContext } from './constants';

export const TranslationProvider = ({ children }) => {
  const { t } = useTranslation();
  const [lng, setLng] = useState(_translationEnumOption.en);

  const onTraslationChange = (language) => {
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
    <TranslationContext.Provider value={{ t, lng, onTraslationChange }}>
      {children}
    </TranslationContext.Provider>
  );
};

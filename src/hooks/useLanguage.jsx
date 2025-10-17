import { useContext } from 'react';
import { TranslationContext } from '../contexts/constants';

export const useLanguage = () => {
  return useContext(TranslationContext);
};

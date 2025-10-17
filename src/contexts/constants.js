import { createContext } from 'react';
import { translationEnumOption as _translationEnumOption } from './utils/i18n';

export const AuthContext = createContext(null);
export const ThemeContext = createContext(null);
export const TranslationContext = createContext(null);

export const themeEnumOption = {
  light: 'Web Light',
  dark: 'Web Dark',
  teamLight: 'Light',
  teamDark: 'Dark',
  teamHighContrast: 'High Contrast',
};
export const translationEnumOption = _translationEnumOption;

import { useContext } from 'react';
import { ThemeContext } from '../contexts/constants';

export const useTheme = () => {
  return useContext(ThemeContext);
};

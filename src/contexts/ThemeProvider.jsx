import React, { createContext, useEffect, useState, useContext } from 'react';
import {
  FluentProvider,
  webLightTheme,
  webDarkTheme,
  teamsLightTheme,
  teamsDarkTheme,
  teamsHighContrastTheme,
} from '@fluentui/react-components';

const themeKey = 'ThemeProvider';

const ThemeContext = createContext(null);

export const themeEnumOption = {
  light: 'Web Light',
  dark: 'Web Dark',
  teamLight: 'Light',
  teamDark: 'Dark',
  teamHighContrast: 'High Contrast',
};

const themeOptions = {
  [themeEnumOption.light]: webLightTheme,
  [themeEnumOption.dark]: webDarkTheme,
  [themeEnumOption.teamLight]: teamsLightTheme,
  [themeEnumOption.teamDark]: teamsDarkTheme,
  [themeEnumOption.teamHighContrast]: teamsHighContrastTheme,
};

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(themeEnumOption.light);

  const onTheme = (_theme) => {
    localStorage.setItem(themeKey, _theme);
    setTheme(_theme);
  };

  useEffect(() => {
    const themeInStorage = localStorage.getItem(themeKey);
    if (themeInStorage) setTheme(themeInStorage);
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, onTheme }}>
      <FluentProvider theme={themeOptions[theme] || webLightTheme}>{children}</FluentProvider>
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  return useContext(ThemeContext);
};

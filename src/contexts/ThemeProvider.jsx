import { useEffect, useState } from 'react';
import {
  FluentProvider,
  webLightTheme,
  webDarkTheme,
  teamsLightTheme,
  teamsDarkTheme,
  teamsHighContrastTheme,
} from '@fluentui/react-components';
import { ThemeContext, themeEnumOption } from './constants';

const themeKey = 'ThemeProvider';

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

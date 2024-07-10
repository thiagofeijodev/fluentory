import React from 'react';
import { createRoot } from 'react-dom/client';
import { ThemeProvider } from 'finance-contexts/ThemeProvider';
import { TranslationProvider } from 'finance-contexts/TranslationProvider';
import { AuthProvider } from 'finance-contexts/AuthProvider';
import { App } from './App';

const container = document.getElementById('root');
const root = createRoot(container);
root.render(
  <ThemeProvider>
    <TranslationProvider>
      <AuthProvider>
        <App />
      </AuthProvider>
    </TranslationProvider>
  </ThemeProvider>,
);

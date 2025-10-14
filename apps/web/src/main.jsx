import React from 'react';
import { createRoot } from 'react-dom/client';
import { ThemeProvider } from '@tfr/contexts/ThemeProvider';
import { TranslationProvider } from '@tfr/contexts/TranslationProvider';
import { AuthProvider } from '@tfr/contexts/AuthProvider';
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

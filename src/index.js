import React from 'react';
import { createRoot } from 'react-dom/client';
import { ThemeProvider } from '@/contexts/ThemeProvider';
import App from './App';

const container = document.getElementById('root');
const root = createRoot(container);
root.render(
  <ThemeProvider>
    <App />
  </ThemeProvider>,
);

if (process.env.NODE_ENV != 'development') {
  if ('serviceWorker' in navigator) navigator.serviceWorker.register('service-worker.js');
}

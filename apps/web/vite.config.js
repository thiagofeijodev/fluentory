import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react-swc';
import { VitePWA } from 'vite-plugin-pwa';
import { ViteFaviconsPlugin } from 'vite-plugin-favicon';

const configIcon = {
  logo: '../../.config/public/logo.png',
  favicons: {
    appName: 'Finance',
    appDescription: 'Control your finance',
    developerName: 'thiagofeijor',
    developerURL: 'feijo.dev',
    background: '#333',
    theme_color: '#333',
    icons: {
      coast: false,
      yandex: false,
    },
  },
};

const manifest = {
  id: 'dev.feijo.finance',
  name: 'Finance',
  short_name: 'Finance',
  description: 'Control your finance',
  theme_color: '#ffffff',
  dir: 'ltr',
  orientation: 'any',
  lang: 'en-US',
  display_override: ['minimal-ui', 'window-controls-overlay'],
  display: 'standalone',
  background_color: '#ffffff',
  categories: ['business', 'finance', 'productivity', 'utilities'],
  icons: [
    {
      src: 'favicon.ico',
      sizes: '64x64 32x32 24x24 16x16',
      type: 'image/x-icon',
    },
  ],
};

// https://vitejs.dev/config/
export default ({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');

  const prodPlugins =
    mode === 'development' ? [] : [VitePWA({ manifest }), ViteFaviconsPlugin(configIcon)];

  return defineConfig({
    define: {
      'process.env': env,
    },
    build: {
      outDir: '../../build',
      emptyOutDir: true,
    },
    plugins: [react(), ...prodPlugins],
  });
};

import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react-swc';
import { VitePWA } from 'vite-plugin-pwa';
import { ViteFaviconsPlugin } from 'vite-plugin-favicon';

const configIcon = {
  logo: './.config/public/logo.png',
  favicons: {
    appName: 'Fluentory',
    appDescription:
      "Learn English faster by saving new words, reviewing them, and marking what you've mastered.",
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
  id: 'dev.feijo.fluentory',
  name: 'Fluentory',
  short_name: 'Fluentory',
  description:
    "Learn English faster by saving new words, reviewing them, and marking what you've mastered.",
  theme_color: '#ffffff',
  dir: 'ltr',
  orientation: 'any',
  lang: 'en-US',
  display_override: ['minimal-ui', 'window-controls-overlay'],
  display: 'standalone',
  background_color: '#ffffff',
  categories: ['business', 'productivity', 'utilities'],
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
      outDir: './build',
      emptyOutDir: true,
    },
    plugins: [react(), ...prodPlugins],
  });
};

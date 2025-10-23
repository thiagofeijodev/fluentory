import path from 'path';
import { WebpackAssetsManifest } from 'webpack-assets-manifest';
import WorkboxPlugin from 'workbox-webpack-plugin';
import FaviconsRspackPlugin from 'favicons-rspack-plugin';
import CompressionPlugin from 'compression-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import common from './rspack.common.mjs';

export default () => {
  const config = {
    ...common,
    mode: process.env.NODE_ENV === 'development' ? 'development' : 'production',
    devtool: false,
    output: {
      ...common.output,
      path: path.resolve(process.cwd(), 'docs'),
    },
    plugins: [
      ...common.plugins,
      new HtmlWebpackPlugin({
        favicon: 'public/logo.png',
        template: path.join(process.cwd(), 'public/index.html'),
        filename: path.join(process.cwd(), 'docs/index.html'),
        inject: 'body',
      }),
      new FaviconsRspackPlugin({
        logo: './public/logo.png',
        cache: true,
        inject: true,
        mode: 'webapp',
        manifest: './public/manifest.json',
      }),
      new CompressionPlugin({
        filename: '[path][base].gz',
      }),
      new WebpackAssetsManifest({}),
      new WorkboxPlugin.GenerateSW({
        clientsClaim: true,
        skipWaiting: true,
        cleanupOutdatedCaches: true,
        navigateFallback: '/index.html',
        navigateFallbackDenylist: [/^\/_/, /\/[^/?]+\.[^/]+$/],
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'google-fonts-cache',
              expiration: {
                maxEntries: 10,
                maxAgeSeconds: 60 * 60 * 24 * 365 // 1 year
              }
            }
          },
          {
            urlPattern: /^https:\/\/fonts\.gstatic\.com\/.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'gstatic-fonts-cache',
              expiration: {
                maxEntries: 10,
                maxAgeSeconds: 60 * 60 * 24 * 365 // 1 year
              }
            }
          },
          {
            urlPattern: /\.(?:png|jpg|jpeg|svg|gif|webp)$/,
            handler: 'CacheFirst',
            options: {
              cacheName: 'images-cache',
              expiration: {
                maxEntries: 60,
                maxAgeSeconds: 60 * 60 * 24 * 30 // 30 days
              }
            }
          }
        ]
      }),
    ],
    optimization: {
      splitChunks: {
        chunks: 'all',
      },
    },
  };

  return config;
};

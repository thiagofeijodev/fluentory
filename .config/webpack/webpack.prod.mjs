import path from 'path';
import WebpackAssetsManifest from 'webpack-assets-manifest';
import FaviconsWebpackPlugin from 'favicons-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import WorkboxPlugin from 'workbox-webpack-plugin';
import { entry, output, resolve, optimization, plugins, module } from './webpack.common.mjs';

export default {
  mode: 'production',
  entry,
  output: {
    ...output,
    filename: 'static/[name].[contenthash].js',
    path: path.resolve(process.cwd(), 'build'),
  },
  resolve,
  optimization,
  module,
  plugins: [
    ...plugins,
    new HtmlWebpackPlugin({
      template: path.join(process.cwd(), '.config/public/index.html'),
      filename: path.join(process.cwd(), 'build/index.html'),
    }),
    new FaviconsWebpackPlugin({
      logo: path.join(process.cwd(), '.config/public/logo.png'),
      cache: true,
      inject: true,
      mode: 'webapp',
      manifest: path.join(process.cwd(), '.config/public/manifest.json'),
    }),
    new WebpackAssetsManifest({}),
    new WorkboxPlugin.GenerateSW(),
  ],
};

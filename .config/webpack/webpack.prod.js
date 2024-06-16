const { merge } = require('webpack-merge');
const path = require('path');
const WebpackAssetsManifest = require('webpack-assets-manifest');
const FaviconsWebpackPlugin = require('favicons-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WorkboxPlugin = require('workbox-webpack-plugin');
const common = require('./webpack.common');

module.exports = merge(common, {
  mode: 'production',
  output: {
    filename: 'static/[name].[contenthash].js',
    path: path.resolve(process.cwd(), 'docs'),
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(process.cwd(), '.config/public/index.html'),
      filename: path.join(process.cwd(), 'docs/index.html'),
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
});

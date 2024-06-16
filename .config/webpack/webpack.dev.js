const { merge } = require('webpack-merge');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const common = require('./webpack.common');

module.exports = merge(
  {
    mode: 'development',
    devtool: 'inline-source-map',
    output: {
      path: path.resolve(process.cwd(), 'build'),
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: path.join(process.cwd(), '.config/public/index.html'),
        filename: path.join(process.cwd(), 'build/index.html'),
      }),
    ],
    devServer: {
      port: 3001,
      static: path.join(process.cwd(), '.config/public'),
      historyApiFallback: true,
      host: '0.0.0.0',
    },
  },
  common,
);

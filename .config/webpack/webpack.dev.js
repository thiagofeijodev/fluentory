const { merge } = require('webpack-merge');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const dotenv = require('dotenv');
const common = require('./webpack.common');

dotenv.config({ path: '.env.local' });

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
      open: true,
      port: 3001,
      static: path.join(__dirname, '..', 'public'),
      historyApiFallback: true,
      host: '0.0.0.0',
      client: {
        logging: 'info',
        overlay: true,
      },
      compress: true,
      open: true,
      static: './build',
    },
    stats: {
      errorDetails: true,
    },
  },
  common,
);

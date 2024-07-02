import path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import { config } from 'dotenv';
import { entry, output, resolve, optimization, plugins, module } from './webpack.common.mjs';

config({ path: '.env.local' });

export default {
  mode: 'development',
  devtool: 'inline-source-map',
  entry,
  output: {
    ...output,
    path: path.resolve(process.cwd(), 'build'),
  },
  resolve,
  optimization,
  plugins: [
    ...plugins,
    new HtmlWebpackPlugin({
      template: path.join(process.cwd(), '.config/public/index.html'),
      filename: path.join(process.cwd(), 'build/index.html'),
    }),
  ],
  module,
  devServer: {
    open: true,
    port: 3001,
    static: path.join(process.cwd(), '.config/public'),
    historyApiFallback: true,
    host: '0.0.0.0',
    client: {
      logging: 'info',
      overlay: true,
    },
    compress: true,
  },
  stats: {
    errorDetails: true,
  },
};

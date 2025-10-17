import path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import common from './rspack.common.mjs';

export default () => {
  const config = {
    ...common,
    mode: 'development',
    devtool: 'inline-source-map',
    output: {
      ...common.output,
      path: path.resolve(process.cwd(), 'static'),
      filename: 'static/main.js',
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: path.join(process.cwd(), 'public/index.html'),
        filename: path.join(process.cwd(), 'static/index.html'),
        inject: 'body',
      }),
    ],
    devServer: {
      port: 3001,
      static: path.join(process.cwd(), 'static'),
      historyApiFallback: true,
      host: '0.0.0.0',
      open: true,
      hot: true,
    },
  };

  return config;
};

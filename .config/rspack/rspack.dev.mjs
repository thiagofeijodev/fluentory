import path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import { RspackDevServer } from '@rspack/dev-server';
import rspack from '@rspack/core';
import common from './rspack.common.mjs';

const rspackConfig = {
  ...common,
  mode: 'development',
  devtool: 'inline-source-map',
  output: {
    ...common.output,
    path: path.resolve(process.cwd(), 'static'),
    filename: 'static/main.js',
  },
  plugins: [
    ...common.plugins,
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

async function run() {
  const compiler = rspack(rspackConfig);

  // RspackDevServer expects a dev-server options object (same shape as webpack-dev-server options),
  // not the full rspack config which contains a `devServer` property. Pass `rspackConfig.devServer`.
  const serverOptions = rspackConfig.devServer || {};

  const server = new RspackDevServer(serverOptions, compiler);

  if (typeof server.startCallback === 'function') {
    server.startCallback(() => {
      const port = serverOptions.port || 3001;
      console.log(`Successfully started server on http://localhost:${port}`);
    });
  } else if (typeof server.start === 'function') {
    await server.start();
    const port = serverOptions.port || 3001;
    console.log(`Successfully started server on http://localhost:${port}`);
  } else {
    console.log('Started rspack dev server (no startCallback/start API available on this version)');
  }
}

run();

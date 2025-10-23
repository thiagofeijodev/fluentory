import path from 'path';
import rspack from '@rspack/core';

export default {
  entry: path.resolve(process.cwd(), 'src/index.jsx'),
  output: {
    filename: 'static/[name].[contenthash].js',
    publicPath: 'auto',
    clean: true,
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  plugins: [
    new rspack.EnvironmentPlugin([
      'REACT_APP_API_KEY',
      'REACT_APP_AUTH_DOMAIN',
      'REACT_APP_PROJECT_ID',
      'REACT_APP_STORAGE_BUCKET',
      'REACT_APP_MESSAGING_SENDER_ID',
      'REACT_APP_APPID',
      'REACT_APP_MEASUREMENT_ID',
      'REACT_APP_MERRIAM_WEBSTER_API_KEY',
      'REACT_APP_DEBUG_TOKEN',
      'REACT_APP_RECAPTCHA_SITE_KEY',
    ]),
    new rspack.CopyRspackPlugin({
      patterns: [
        {
          from: path.resolve(process.cwd(), 'public/_redirects'),
        },
        {
          from: path.resolve(process.cwd(), 'public/netlify.toml'),
        },
        {
          from: path.resolve(process.cwd(), 'public/robots.txt'),
        },
        {
          from: path.resolve(process.cwd(), 'public/CNAME'),
        },
      ],
    }),
  ],
  module: {
    rules: [
      {
        test: /\.(jsx|js)$/,
        exclude: /node_modules[\\/]core-js/,
        type: 'javascript/auto',
        use: {
          loader: 'builtin:swc-loader',
          options: {
            env: {
              mode: 'usage',
              coreJs: '3.26.1',
              targets: ['chrome >= 87', 'edge >= 88', 'firefox >= 78', 'safari >= 14'],
            },
            isModule: 'unknown',
            jsc: {
              parser: {
                syntax: 'ecmascript',
                jsx: true,
              },
              transform: {
                react: {
                  runtime: 'automatic',
                  pragma: 'React.createElement',
                  pragmaFrag: 'React.Fragment',
                  throwIfNamespace: false,
                  development: process.env.NODE_ENV === 'development',
                  importSource: 'react',
                  useBuiltins: false,
                },
              },
            },
          },
        },
      },
      {
        test: /\.(png|jp(e*)g|gif)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: 'images/[hash]-[name].[ext]',
            },
          },
        ],
      },
    ],
  },
  experiments: {
    css: true,
  },
};

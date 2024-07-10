import path from 'path';
import webpack from 'webpack';

export const entry = path.resolve(process.cwd(), 'src/index.jsx');

export const output = {
  publicPath: '/',
};

export const resolve = {
  extensions: ['.js', '.jsx'],
};

export const optimization = {
  splitChunks: {
    chunks: 'all',
  },
};

export const plugins = [
  new webpack.ProgressPlugin(),
  new webpack.EnvironmentPlugin([
    'API_KEY',
    'AUTH_DOMAIN',
    'PROJECT_ID',
    'STORAGE_BUCKET',
    'MESSAGING_SENDER_ID',
    'APPID',
    'MEASUREMENT_ID',
  ]),
];

export const module = {
  rules: [
    {
      test: /\.m?js$/,
      resolve: {
        fullySpecified: false,
      },
    },
    {
      test: /\.(js|jsx)$/,
      use: 'babel-loader',
      resolve: {
        fullySpecified: false,
      },
    },
    {
      test: /\.css$/,
      use: [
        {
          loader: 'css-loader',
          options: {
            modules: true,
          },
        },
        'postcss-loader',
      ],
    },
  ],
};

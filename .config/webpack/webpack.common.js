const path = require('path');
const webpack = require('webpack');

module.exports = {
  entry: path.resolve(process.cwd(), 'src/index.jsx'),
  output: {
    publicPath: '/',
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  optimization: {
    splitChunks: {
      chunks: 'all',
    },
  },
  plugins: [
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
  ],
  module: {
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
        exclude: /node_modules/,
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
  },
};

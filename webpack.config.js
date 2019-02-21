const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const NodeExternals = require('webpack-node-externals');

module.exports = {
  entry: path.join(__dirname, 'src', 'index'),
  output: { path: path.join(__dirname, 'dist') },
  externals: [NodeExternals()],
  target: 'node',
  devtool: false,
  mode: 'development',
  resolve: { extensions: ['.js', '.json'] },
  optimization: { minimize: false },
  performance: { hints: false },
  plugins: [
    new CopyWebpackPlugin([
      'package.json',
      'package-lock.json',
    ]),
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'eslint-loader',
        enforce: 'pre',
        exclude: /node_modules/,
        options: {
          fix: true,
          configFile: '.eslintrc.js',
        },
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: __dirname,
        exclude: /node_modules/,
      },
    ],
  },
};

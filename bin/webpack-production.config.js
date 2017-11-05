var webpack = require('webpack')
var HtmlWebpackPlugin = require('html-webpack-plugin')
const merge = require('webpack-merge');
const path = require('path');
const base = require('./webpack.base.config');
const TransferWebpackPlugin = require('transfer-webpack-plugin');

const config = merge(base, {
  plugins: [
    new TransferWebpackPlugin([
          {from: 'assets'},
    ], path.resolve(__dirname, '../src')),
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
    new webpack.optimize.UglifyJsPlugin({
      drop_console: true,
      minimize: true,
      output: {
        comments: false
      }
    }),
  ],
});

module.exports = config;
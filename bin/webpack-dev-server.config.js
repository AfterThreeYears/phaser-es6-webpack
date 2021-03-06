
const webpack = require('webpack');
const merge = require('webpack-merge');
const base = require('./webpack.base.config');

const config = merge(base, {
  plugins: [
    // new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
  ],
});

module.exports = config;

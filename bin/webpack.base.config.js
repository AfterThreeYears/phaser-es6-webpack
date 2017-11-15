const path = require('path');
const webpack = require('webpack');
const isProd = process.env.NODE_ENV === 'production';
const nodeModulesPath = path.resolve(__dirname, '../node_modules');
const buildPath = path.resolve(__dirname, '../build');
const phaserModule = path.join(__dirname, '../node_modules/phaser-ce/');
const phaser = path.join(phaserModule, 'build/custom/phaser-split.js');
const pixi = path.join(phaserModule, 'build/custom/pixi.js');
const p2 = path.join(phaserModule, 'build/custom/p2.js');

const {
  tplList,
  entrys,
} = require('./pages');

const config = {
  entry: {
    vendor: ['pixi', 'p2', 'phaser', 'webfontloader'],
  },
  devtool: isProd ? '' : 'cheap-source-map',
  output: {
    path: buildPath,
    filename: '[name].[hash:8].js',
    chunkFilename: '[name].chunk.[chunkhash:8].js',
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: isProd ? '"production"' : '"dev"',
      },
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      filename: 'vendor.[hash:8].js',
    }),
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        use: ['babel-loader'],
        exclude: [nodeModulesPath],
      },
      {
        test: /pixi\.js/,
        use: ['expose-loader?PIXI'],
      },
      {
        test: /phaser-split\.js$/,
        use: ['expose-loader?Phaser'],
      },
      {
        test: /p2\.js/,
        use: ['expose-loader?p2'],
      },
      {
        test: /\.(eot|ttf|woff|woff2)\w*/,
        loader: 'url-loader?limit=100',
      },
    ],
  },
  node: {
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
  },
  resolve: {
    extensions: ['.js', '.css'],
    alias: {
      '@': path.resolve(__dirname, '../src'),
      phaser,
      pixi,
      p2,
    },
  },
};

config.entry = Object.assign(config.entry, entrys);
config.plugins.push(...tplList);

module.exports = config;


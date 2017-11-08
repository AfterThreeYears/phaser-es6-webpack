const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const isProd = process.env.NODE_ENV === 'production';
const nodeModulesPath = path.resolve(__dirname, '../node_modules');
const buildPath = path.resolve(__dirname, '../build');
const phaserModule = path.join(__dirname, '../node_modules/phaser-ce/')
const phaser = path.join(phaserModule, 'build/custom/phaser-split.js')
const pixi = path.join(phaserModule, 'build/custom/pixi.js')
const p2 = path.join(phaserModule, 'build/custom/p2.js')
const hotMiddlewareScript = 'webpack-hot-middleware/client?overlay=false';

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
        loader: 'url-loader?limit=1000000',
      },
    ]
  },
  node: {
    fs: 'empty',
    net: 'empty',
    tls: 'empty'
  },
  resolve: {
    extensions: ['.js', '.css'],
    alias: {
      '@': path.resolve(__dirname, '../src'),
      phaser,
      pixi,
      p2
    }
  }
}

const flappybird = path.resolve(__dirname, '../src/flappybird/main.js');
const doll = path.resolve(__dirname, '../src/doll/main.js');
const plane = path.resolve(__dirname, '../src/plane/main.js');

const entrys = {
  flappybird: isProd ? flappybird : [flappybird, hotMiddlewareScript],
  doll: isProd ? doll : [doll, hotMiddlewareScript],
  plane: isProd ? plane : [plane, hotMiddlewareScript],
}

config.entry = Object.assign(config.entry, entrys);

config.plugins.push(new HtmlWebpackPlugin({
  filename: 'flappybird.html',
  chunks: ['vendor', 'flappybird'],
  chunkFilename: '[name]?[hash]',
  template: path.join(__dirname, '../src/flappybird/flappybird.html'),
  inject: 'body',
}));
config.plugins.push(new HtmlWebpackPlugin({
  filename: 'doll.html',
  chunks: ['vendor', 'doll'],
  chunkFilename: '[name]?[hash]',
  template: path.join(__dirname, '../src/doll/doll.html'),
  inject: 'body',
}));
config.plugins.push(new HtmlWebpackPlugin({
  filename: 'plane.html',
  chunks: ['vendor', 'plane'],
  chunkFilename: '[name]?[hash]',
  template: path.join(__dirname, '../src/plane/plane.html'),
  inject: 'body',
}));


module.exports = config;

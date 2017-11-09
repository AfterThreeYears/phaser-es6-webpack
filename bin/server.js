const path = require('path');
const fs = require('fs');
const childProcess = require('child_process');
const express = require('express');
const app = express();
const webpack = require('webpack');
const proxy = require('http-proxy-middleware');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const config = require('./webpack-dev-server.config.js');
const contentBase = path.join(__dirname, '../src/assets');
const compiler = webpack(config);

app.use(require('morgan')('short'));

const options = {
  target: process.env.TARGET_ENV,
  changeOrigin: true,
  pathRewrite: {
    '^/proxy/': '/',
  },
  secure: false,
};

app.use('/proxy/**', proxy(options));

app.get('*', express.static(contentBase));

app.use(webpackDevMiddleware(compiler, {
  noInfo: true,
  stats: {
    colors: true,
  },
}));
app.use(webpackHotMiddleware(compiler));

app.listen(5000, (err) => {
  if (err) return console.log(err);
  const cp = childProcess.spawn('open', ['-W', '-a', 'google chrome', 'http://localhost:5000'], {});
  cp.unref();
  console.log('HTTPS Server is running on: http://localhost:5000');
});

const path = require('path');
const fs = require('fs');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const hotMiddlewareScript = 'webpack-hot-middleware/client?overlay=false';
const isProd = process.env.NODE_ENV === 'production';

let list;
try {
  list = fs.readdirSync('./src/assets', 'utf-8');
} catch (error) {
  console.log(`读取项目列表失败, ${error.message}`);
}

const createHtmlTpl = (data) => {
  return data.map((item) => {
    return new HtmlWebpackPlugin({
      filename: `${item}.html`,
      chunks: ['vendor', `${item}`],
      chunkFilename: '[name]?[hash]',
      template: path.join(__dirname, `../src/${item}/${item}.html`),
      inject: 'body',
    });
  });
};

const createEntrys = (data) => {
  return data.reduce((result, current) => {
    if (result[current]) console.log(`${current}文件夹有多个`);
    const main = path.resolve(__dirname, `../src/${current}/main.js`);
    return Object.assign(result, {
      [current]: isProd ? main : [main, hotMiddlewareScript],
    });
  }, {});
};

const tplList = createHtmlTpl(list);
const entrys = createEntrys(list);

console.log(entrys);
module.exports = {
  tplList,
  entrys,
};

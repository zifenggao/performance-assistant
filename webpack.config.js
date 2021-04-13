const chalk = require('chalk');
const path = require('path');
const fs = require('fs');
let HtmlWebpackPlugin = require('html-webpack-plugin');

console.log(chalk.green('> 复制配置及资源文件'));
if (!fs.existsSync('./build')) fs.mkdirSync('./build');
fs.writeFileSync('./build/manifest.json', fs.readFileSync('./src/manifest.json'));
fs.writeFileSync('./build/monitor-icon.png', fs.readFileSync('./src/monitor-icon.png'));
console.log(chalk.green('> 复制文件完成'));
console.log(chalk.green('> 开始打包'));

const pageDirs = fs.readdirSync('./src/pages');
const entry = () => {
  let _entry = {};

  fs.readdirSync('./src').map(file => {
    if (file.includes('.ts')) {
      let name = file.split('.')[0];
      _entry[name] = `./src/${name}.ts`;
    }
  });
  pageDirs.forEach(dir => {
    _entry[dir] = `./src/pages/${dir}/index.tsx`;
  });
  return _entry;
}

const htmlWebpackPlugins = (() => {
  let arr = [];
  pageDirs.forEach(item => {
    arr.push(new HtmlWebpackPlugin({
      filename: `${item}.html`,
      template: `./src/pages/${item}/index.html`,
      chunks: [item],
    }))
  })
  return arr;
})();

module.exports = {
  mode: 'development',
  entry,
  output: {
    filename: "[name].js",
    path: path.join(__dirname, 'build')
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
        exclude: /node_modules/
      },
      {
        test: /.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      },
      {
        test: /.less$/,
        use: [
          'style-loader',
          'css-loader',
          'less-loader'
        ]
      },
    ]
  },
  plugins: [
    ...htmlWebpackPlugins
  ],
  resolve: {
    modules: [
      'node_modules'
    ],
    extensions: ['.js', '.ts', '.tsx'],
    alias: {
      '@': './src',
      react: 'react/cjs/react.production.min.js'
    }
  },
  devServer: {
    port: 9000
  }
}
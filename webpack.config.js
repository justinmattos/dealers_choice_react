const path = require('path');

const webpackConfig = {
  entry: './client/index.js',
  output: {
    path: path.join(__dirname, './public'),
    filename: 'main.js',
  },
  module: {
    rules: [
      {
        test: /.jsx?$/,
        loader: 'babel-loader',
      },
    ],
  },
};

module.exports = webpackConfig;

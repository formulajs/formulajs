var webpack = require('webpack');
const path = require('path');
var filename = '[name].min.js';

module.exports = {
  entry: {
    'formula': './index'
  },
  output: {
    path: path.resolve(__dirname, '../dist/'),
    filename: filename,
    library: 'formulajs',
    libraryTarget: 'umd'
  }
};

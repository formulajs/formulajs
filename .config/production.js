var webpack = require('webpack');
const path = require('path');
var plugins = [
  new webpack.optimize.UglifyJsPlugin()
];
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
  },
  plugins: plugins
};

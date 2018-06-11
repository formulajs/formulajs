const filename = '[name].js';
const path = require('path');

module.exports = {
  entry: {
    'formula': './index'
  },
  output: {
    path: path.resolve(__dirname, './dist/'),
    filename: filename,
    library: 'formulajs',
    libraryTarget: 'umd'
  },
};

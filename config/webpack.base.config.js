const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'character-sheet.js',
    path: path.resolve(__dirname, '../', 'dist'),
    libraryTarget: 'commonjs2',
    libraryExport: 'default'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: { loader: 'babel-loader' }
      }
    ]
  },
  resolveLoader: {
    modules: ['node_modules']
  }
};

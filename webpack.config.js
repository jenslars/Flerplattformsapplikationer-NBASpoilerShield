const path = require('path');

module.exports = {
  entry: {
    popup: './src/scripts/frontend/popupScript.js',
    background: './src/background.js',
    gamefeed: './src/scripts/classes/gamefeed.js',
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react']
          }
        }
      }
    ]
  }
};



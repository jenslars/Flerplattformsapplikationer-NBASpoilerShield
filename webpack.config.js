const path = require('path');

module.exports = {
  entry: {
    app: './src/app/app.js',
    background: './src/app/background.js',
    gamefeed: './src/app/modules/game-schedule-feed.js',
    blockSpoilersYoutubeHomePage: './src/app/content_scripts/block-spoilers-youtube-home-page.js',
    blockSpoilersYoutubeWatchPage: './src/app/content_scripts/block-spoilers-youtube-watch-page.js',
    blockSpoilersYoutubeSearchPage: './src/app/content_scripts/block-spoilers-youtube-search-page.js'
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



const path = require('path');

module.exports = {
  entry: {
    app: './src/app/app.jsx',
    background: './src/app/background.js',
    gamefeed: './src/app/modules/game-schedule-feed.jsx',
    blockSpoilersYoutubeHomePage: './src/app/content_scripts/block-spoilers-youtube-home-page.js',
    blockSpoilersYoutubeWatchPage: './src/app/content_scripts/block-spoilers-youtube-watch-page.js',
    blockSpoilersYoutubeSearchPage: './src/app/content_scripts/block-spoilers-youtube-search-page.js',
    nbaDataFetcher: './src/app/api/nba-data-fetcher.js',
    timeConverter: './src/app/api/time-converter.js',
    dataSplitter: './src/app/modules/data-splitter.js',
    dbHandler: './src/app/modules/db-handler.js',
    gameStructure: './src/app/modules/game-structure.js',
    horizontalDatePicker: './src/app/modules/horizontal-date-picker.js',
    skeleton: './src/app/modules/mui-react-modules/skeleton/skeleton.jsx',
    dateCalendar: './src/app/modules/mui-react-modules/date-calendar/date-calendar.jsx',
    customTheme: './src/app/modules/mui-react-modules/date-calendar/custom-theme/custom-theme.jsx',
    customToolbar: './src/app/modules/mui-react-modules/date-calendar/custom-toolbar/custom-toolbar.jsx'
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react']
          }
        }
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx'],  // Ensures Webpack picks up both JS and JSX files
}
}  

var webpack = require('webpack');
var path = require('path');
var CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  devtool: 'source-map',
  context: path.join(__dirname, 'src'),
  entry: [
    'webpack-dev-server/client?http://127.0.0.1:8080/',
    'webpack/hot/only-dev-server',
    './browser/app.js'
  ],
  output: {
    path: path.join(__dirname, 'public'),
    filename: 'bundle.js'
  },
  resolve: {
    modulesDirectories: ['node_modules', 'browser/app.js'],
    extension: ['', '.js', '.scss']
  },
  module: {
    loaders: [{
      test: /\.js$/,
      exclude: /node_modules/,
      loader: 'babel',
      query: {
        presets: ['es2015']
      }
    }, {
      test: /\.scss$/,
      loaders: [
        'style',
        'css',
        'autoprefixer?browsers=last 3 versions',
        'sass?outputStyle=expanded'
      ]
    }, {
      test: /\.html$/,
      loader: 'raw'
    }]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new CopyWebpackPlugin([{ from: 'images' }])
  ],
  devServer: {
    hot: true,
    proxy: {
      '*': 'http://localhost:3000'
    }
  }
};

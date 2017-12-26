const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const moment = require('moment');

//определяем время сборки
const BUILD_DATETIME = moment().format('DD.MM.YYYY HH:mm');

const plugins = [
  new webpack.optimize.UglifyJsPlugin({
    sourceMap: true,
    comments: false
  }),
  new webpack.DefinePlugin({
    BUILD_DATETIME: JSON.stringify(BUILD_DATETIME),
    'process.env': {
      NODE_ENV: JSON.stringify('production')
    }
  }),
new HtmlWebpackPlugin({
    filename: './index.html',
    minify: false,
    template: 'source/index.html',
    inject: 'body',
    xhtml: true
  }),
  new webpack.optimize.CommonsChunkPlugin({
    name: 'vendor',
    minChunks: function (module) {
      // this assumes your vendor imports exist in the node_modules directory
      return module.context && module.context.indexOf('node_modules') !== -1;
    }
  }),
  new ExtractTextPlugin({
    filename: '[name].css',
  })
];

module.exports = {
  entry: './source/index.js',

  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'public'),
  },

  resolve: {
    alias: {
      Scripts: path.resolve(__dirname, 'src'),
      NPM: path.resolve(__dirname, 'node_modules'),
      App: path.resolve(__dirname, 'src/App'),
      Components: path.resolve(__dirname, 'src/App/components'),
      Utilities: path.resolve(__dirname, 'src/utilities')
    },
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        use: [
          'babel-loader'
        ],
        exclude: /node_modules/
      }
      , {
                test: /\.less?$/,
                use: [
                    'style-loader',
                    'css-loader',
                    'less-loader'
                ]
            }
    ]
  },

  plugins: plugins
};
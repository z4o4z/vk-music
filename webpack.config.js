'use strict';

let path = require('path');
let args = require('yargs').argv;
let webpack = require('webpack');
let HtmlWebpackPlugin = require('html-webpack-plugin');
let ExtractTextPlugin = require('extract-text-webpack-plugin');
let StyleLintPlugin = require('stylelint-webpack-plugin');
let autoprefixer = require('autoprefixer');

const PATH_DIST = path.join(__dirname, 'dist');

const ENV = args.e || args.env || args.environment || 'dev';
const IS_LOC = ENV === 'loc';
const IS_DEV = ENV === 'dev';
const IS_PROD = ENV === 'dev';

let entry = ['babel-polyfill', path.join(__dirname, 'src', 'index.js')];

let output = {
  path: PATH_DIST,
  filename: 'index.js',
  library: 'VKMusic'
};

if (IS_LOC) {
  let WDV_CLIENT = 'webpack-dev-server/client?http://localhost:8080';
  let W_HOT = 'webpack/hot/only-dev-server';

  entry = [WDV_CLIENT, W_HOT, ...entry];
}

module.exports = {
  entry,

  devtool: (IS_DEV || IS_LOC) ? 'cheap-inline-module-source-map' : '',

  watch: IS_LOC,

  watchOptions: {
    aggregateTimeout: 100
  },

  output,

  resolve: {
    modulesDirectories: ['node_modules'],
    extensions: ['', '.js'],
    alias: { }
  },

  module: {
    preLoaders: [{
      test: /\.js$/,
      exclude: /(node_modules)/,
      loader: "eslint-loader"
    }],
    loaders: [{
      test: /\.js$/,
      exclude: /(node_modules)/,
      loader: 'babel',
      query: {
        presets: ['react', 'es2015', 'stage-1', 'react-hmre'],
        plugins: ['transform-runtime']
      }
    }, {
      test: /\.scss$/,
      loader: ExtractTextPlugin.extract('style', 'css?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!postcss-loader!resolve-url!sass')
    }, {
      test: /\.css$/,
      loader: ExtractTextPlugin.extract('style', 'css!autoprefixer!resolve-url')
    }, {
      test: /\.eot/,
      loader: 'file-loader'
    }, {
      test: /\.(woff|woff2)$/,
      loader: 'url?prefix=font/&limit=5000'
    }, {
      test: /\.ttf$/,
      loader: 'url?limit=10000&mimetype=application/octet-stream'
    }, {
      test: /\.svg$/,
      loader: 'url?limit=10000&mimetype=image/svg+xml'
    }, {
      test: /\.gif$/,
      loader: 'url?limit=10000&mimetype=image/gif'
    }, {
      test: /\.jpg$/,
      loader: 'url?limit=10000&mimetype=image/jpg'
    }, {
      test: /\.png$/,
      loader: 'url?limit=10000&mimetype=image/png'
    }]
  },

  eslint: {
    configFile: path.join(__dirname, '.eslintrc.js')
  },

  postcss: () => [autoprefixer],

  plugins: [
    new StyleLintPlugin({
      configFile: '.stylelintrc.js'
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.DefinePlugin({
      IS_DEV: JSON.stringify(IS_DEV),
      IS_LOC: JSON.stringify(IS_LOC),
      IS_PROD: JSON.stringify(IS_LOC)
    }),
    new ExtractTextPlugin('style.css'),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'src', 'index.html'),
      filename: 'index.html'
    })
  ],

  devServer: {
    contentBase: PATH_DIST,
    host: 'localhost', // default
    port: 8080, // default
    hot: true,
    historyApiFallback: {
      index: '/index.html'
    }
  }
};

if (IS_PROD) {
  process.env.NODE_ENV = 'production';

  module.exports.module.loaders[0].query.plugins.push('transform-react-constant-elements');
  module.exports.module.loaders[0].query.plugins.push('transform-react-inline-elements');

  module.exports.plugins.push(
    new webpack.optimize.UglifyJsPlugin({
      minimize: true,
      comments: false
    })
  );
}

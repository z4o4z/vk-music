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
const IS_QA = ENV === 'qa';
const IS_PROD = ENV === 'prod';

let entry = ['babel-polyfill', path.join(__dirname, 'src', 'index.js')];

let output = {
	path: PATH_DIST,
	filename: 'index.js'
};

if (!IS_PROD) {
	output.library = 'VKMusic'
}

if (IS_LOC) {
	let WDV_CLIENT = 'webpack-dev-server/client?http://localhost:8080';
	let W_HOT = 'webpack/hot/only-dev-server';

	entry = [WDV_CLIENT, W_HOT, ...entry];
}

let config = {
	entry,

	devtool: (!IS_PROD) ? 'cheap-inline-module-source-map' : '',

	watch: IS_LOC,

	watchOptions: {
		aggregateTimeout: 100
	},

	output,

	cache: true,
	debug: !IS_PROD,

	stats: {
		colors: true,
		reasons: true
	},

	resolve: {
		modulesDirectories: ['node_modules'],
		extensions: ['', '.js'],
		alias: {}
	},

	module: {
		loaders: [{
			test: /\.js$/,
			exclude: /(node_modules)/,
			loader: 'babel',
			query: {
				presets: ['react', 'es2015', 'stage-1'],
				plugins: ['transform-runtime']
			}
		}, {
			test: /\.(eot|otf)/,
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
		new webpack.DefinePlugin({
			IS_LOC: JSON.stringify(IS_LOC),
			IS_DEV: JSON.stringify(IS_DEV),
			IS_QA: JSON.stringify(IS_QA),
			IS_PROD: JSON.stringify(IS_PROD),
			'process.env.NODE_ENV': JSON.stringify(IS_PROD || IS_QA ? 'production' : 'development')
		}),
		new webpack.optimize.CommonsChunkPlugin({
			children: true,
			async: true
		}),
		new webpack.NoErrorsPlugin(),
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
			index: '/'
		},
		proxy: {
			'/audio-proxy/cs6-1v4.vk-cdn.net/*': {target: 'http://cs6-1v4.vk-cdn.net', rewrite},
			'/audio-proxy/cs6-2v4.vk-cdn.net/*': {target: 'http://cs6-2v4.vk-cdn.net', rewrite},
			'/audio-proxy/cs6-3v4.vk-cdn.net/*': {target: 'http://cs6-3v4.vk-cdn.net', rewrite},
			'/audio-proxy/cs6-4v4.vk-cdn.net/*': {target: 'http://cs6-4v4.vk-cdn.net', rewrite},
			'/audio-proxy/cs6-5v4.vk-cdn.net/*': {target: 'http://cs6-5v4.vk-cdn.net', rewrite},
			'/audio-proxy/cs6-6v4.vk-cdn.net/*': {target: 'http://cs6-6v4.vk-cdn.net', rewrite},
			'/audio-proxy/cs6-7v4.vk-cdn.net/*': {target: 'http://cs6-7v4.vk-cdn.net', rewrite},
			'/audio-proxy/cs6-8v4.vk-cdn.net/*': {target: 'http://cs6-8v4.vk-cdn.net', rewrite},
			'/audio-proxy/cs6-9v4.vk-cdn.net/*': {target: 'http://cs6-9v4.vk-cdn.net', rewrite},
			'/audio-proxy/cs6-10v4.vk-cdn.net/*': {target: 'http://cs6-10v4.vk-cdn.net', rewrite},
			'/audio-proxy/cs6-11v4.vk-cdn.net/*': {target: 'http://cs6-11v4.vk-cdn.net', rewrite},
			'/audio-proxy/cs6-12v4.vk-cdn.net/*': {target: 'http://cs6-12v4.vk-cdn.net', rewrite},
			'/audio-proxy/cs9-1v4.vk.me/*': {target: 'http://cs9-1v4.vk.me', rewrite},
			'/audio-proxy/cs9-2v4.vk.me/*': {target: 'http://cs9-2v4.vk.me', rewrite},
			'/audio-proxy/cs9-3v4.vk.me/*': {target: 'http://cs9-3v4.vk.me', rewrite},
			'/audio-proxy/cs9-4v4.vk.me/*': {target: 'http://cs9-4v4.vk.me', rewrite},
			'/audio-proxy/cs9-5v4.vk.me/*': {target: 'http://cs9-5v4.vk.me', rewrite},
			'/audio-proxy/cs9-6v4.vk.me/*': {target: 'http://cs9-6v4.vk.me', rewrite},
			'/audio-proxy/cs9-7v4.vk.me/*': {target: 'http://cs9-7v4.vk.me', rewrite},
			'/audio-proxy/cs9-8v4.vk.me/*': {target: 'http://cs9-8v4.vk.me', rewrite},
			'/audio-proxy/cs9-9v4.vk.me/*': {target: 'http://cs9-9v4.vk.me', rewrite},
			'/audio-proxy/cs9-10v4.vk.me/*': {target: 'http://cs9-10v4.vk.me', rewrite},
			'/audio-proxy/cs9-11v4.vk.me/*': {target: 'http://cs9-11v4.vk.me', rewrite},
			'/audio-proxy/cs9-12v4.vk.me/*': {target: 'http://cs9-12v4.vk.me', rewrite}
		}
	}
};

if (IS_LOC) {
	config.module.loaders[0].query.presets.unshift('react-hmre');

	config.module.preLoaders = [{
		test: /\.js$/,
		exclude: /(node_modules)/,
		loader: "eslint-loader"
	}];

	config.module.loaders.push({
		test: /\.scss$/,
		loaders: ['style', 'css?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]', 'postcss-loader', 'resolve-url', 'sass']
	});
	config.module.loaders.push({
		test: /\.css$/,
		loaders: ['style', 'css', 'resolve-url']
	});

	config.plugins.push(new webpack.HotModuleReplacementPlugin());
	config.plugins.push(new StyleLintPlugin({
		configFile: './.stylelintrc.js',
		files: '**/*.scss'
	}));
}

if (!IS_LOC) {
	config.module.loaders[0].query.plugins.push('transform-react-remove-prop-types');
	config.module.loaders[0].query.plugins.push('transform-react-constant-elements');
	config.module.loaders[0].query.plugins.push('transform-react-inline-elements');

	config.module.loaders.push({
		test: /\.scss$/,
		loader: ExtractTextPlugin.extract('style', 'css?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!postcss-loader!resolve-url!sass')
	});
	config.module.loaders.push({
		test: /\.css$/,
		loader: ExtractTextPlugin.extract('style', 'css!resolve-url')
	});

	config.plugins.push(new ExtractTextPlugin('[hash].style.css'));
}

if (IS_PROD || IS_QA) {
	config.plugins.push(
		new webpack.optimize.DedupePlugin()
	);
	config.plugins.push(
		new webpack.optimize.UglifyJsPlugin({
			beautify: false,
			comments: false,
			compress: {
				sequences: true,
				booleans: true,
				loops: true,
				unused: true,
				warnings: false,
				drop_console : IS_PROD,
				unsafe: true
			}
		})
	);
}

module.exports = config;


function rewrite(req) {
	let array = req.url.split('/');
	array.splice(0, 3);
	req.url = array.join('/');
}

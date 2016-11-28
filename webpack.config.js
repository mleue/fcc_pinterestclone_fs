path = require('path');
var fs = require('fs');
const webpack = require('webpack');

var nodeModules = {};
fs.readdirSync('node_modules')
	.filter(function(x) {
		return ['.bin'].indexOf(x) === -1;
	})
	.forEach(function(mod) {
		nodeModules[mod] = 'commonjs ' + mod;
	});

module.exports = {
	devtool: 'cheap-module-source-map',
	entry: './src/server.js',
	target: 'node',
	output: {
		path: path.join(__dirname, '/build'),
		filename: 'bundle.js',
		publicPath: '/',
	},
	module: {
		loaders: [
			{
				test: /\.js$/,
				loader: 'babel',
				exclude: /node_modules/,
			}
		],
	},
	externals: nodeModules
};

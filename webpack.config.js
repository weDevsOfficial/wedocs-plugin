const defaultConfig = require( '@wordpress/scripts/config/webpack.config' );
const path = require( 'path' );
const isProduction = process.env.NODE_ENV === 'production';

const updatedConfig = {
	...defaultConfig,
	entry: {
		...defaultConfig.entry,
		index: './src/index',
	},
	output: {
		path: path.resolve(__dirname, 'assets'),
	},
};

if ( ! isProduction ) {
	updatedConfig.devServer = {
		devMiddleware: {
			writeToDisk: true,
		},
		allowedHosts: 'all',
		host: 'localhost',
		port: 8887,
		proxy: {
			'/assets': {
				pathRewrite: {
					'^/assets': '',
				},
			},
		},
	};
}

module.exports = updatedConfig;

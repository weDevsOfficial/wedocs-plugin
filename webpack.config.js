const defaultConfig = require( '@wordpress/scripts/config/webpack.config' );
const path = require( 'path' );
const isProduction = process.env.NODE_ENV === 'production';

const updatedConfig = {
  ...defaultConfig,
  entry: {
    ...defaultConfig.entry,
    index: './src/index',
    // '../css/frontend.css': './assets/css/frontend.less',
    // '../css/print.css': './assets/css/print.less',
    // '../css/admin.css': './assets/css/admin.less',
  },
  output: {
    path: path.resolve( __dirname, 'assets/build' ),
  },
  // module: {
  //   rules: [
  //     {
  //       test: /\.less$/,
  //       use: [ 'style-loader', 'css-loader' ],
  //     },
  //   ],
  // },
};

if ( ! isProduction ) {
  updatedConfig.devServer = {
    devMiddleware: {
      writeToDisk: true,
    },
    allowedHosts: 'all',
    host: 'localhost',
    port: 8886,
    proxy: {
      '/assets/build': {
        pathRewrite: {
          '^/assets/build': '',
        },
      },
    },
  };
}

module.exports = updatedConfig;

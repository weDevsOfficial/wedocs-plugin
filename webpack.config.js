const defaultConfig = require( '@wordpress/scripts/config/webpack.config' );
const path = require( 'path' );
const isProduction = process.env.NODE_ENV === 'production';
const MiniCSSExtractPlugin = require( 'mini-css-extract-plugin' );

const updatedConfig = {
  ...defaultConfig,
  entry: {
    ...defaultConfig.entry(),
    // Add your custom entries while preserving the automatic block detection
    index    : './src/index',
    block    : './src/block.js',
    editor   : './src/editor/index.js',
    store    : './src/data/store.js',
    icons    : './src/icons/index.js',
    print    : './src/assets/less/print.less',
    frontend : './src/assets/less/frontend.less',
  },
  output: {
    path: path.resolve( __dirname, 'assets/build' ),
  },
  module: {
    ...defaultConfig.module,
    rules: [
      ...defaultConfig.module.rules,
      {
        test: /\.less$/,
        use: [
          MiniCSSExtractPlugin.loader,
          'css-loader',
          'less-loader',
        ],
      },
    ],
  },
  plugins: [
    ...defaultConfig.plugins,
    new MiniCSSExtractPlugin( {
      filename: '[name].css',
      chunkFilename: '[id].css',
    } ),
  ],
};

if ( ! isProduction ) {
  updatedConfig.devServer = {
    devMiddleware: {
      writeToDisk: true,
    },
    allowedHosts: 'all',
    host: 'wedocs.test',
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

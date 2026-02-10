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
    assetModuleFilename: 'images/[name][ext]',
  },
  module: {
    ...defaultConfig.module,
    rules: [
      ...defaultConfig.module.rules.filter(
        rule => {
          // Filter out the default image/asset rules
          if (!rule.test) return true;
          const testString = rule.test.toString();
          return !testString.match(/jpg|jpeg|png|gif|svg|bmp|ico/i);
        }
      ),
      {
        test: /\.less$/,
        use: [
          MiniCSSExtractPlugin.loader,
          'css-loader',
          'less-loader',
        ],
      },
      {
        test: /\.(jpg|jpeg|png|gif|bmp|ico)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'images/[name][ext]'
        }
      },
      {
        test: /\.svg$/i,
        type: 'asset/resource',
        generator: {
          filename: (pathData) => {
            // Check if SVG is from fonts directory
            if (pathData.filename.includes('assets/fonts')) {
              return 'fonts/[name][ext]';
            }
            return 'images/[name][ext]';
          }
        }
      },
      {
        test: /\.(woff|woff2|ttf|eot)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'fonts/[name][ext]'
        }
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

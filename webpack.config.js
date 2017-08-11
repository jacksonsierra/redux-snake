const webpack = require('webpack');
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const WebpackNotifierPlugin = require('webpack-bundle-tracker');
const AutoPrefixer = require('autoprefixer');
const PostCSSImport = require('postcss-import');

const devServerPort = 3809;
const outputPath = path.join(__dirname, 'static', 'webpack');
const clientPath = path.join(__dirname, 'client');
const isDev = process.env.NODE_ENV === 'dev';

const config = {
  devtool: 'cheap-module-source-map',
  entry: {
    client: ['./client/index.jsx'],
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: [{
          loader: 'babel-loader',
        }],
        include: [clientPath],
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              sourceMap: true,
              modules: true,
              importLoaders: 1,
              localIdentName: '[name]-[local]-[hash:base64:5]',
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              plugins: () => ([
                AutoPrefixer,
                PostCSSImport,
              ]),
            },
          },
        ],
      },
    ],
  },
  output: {
    path: outputPath,
    filename: isDev ? '[name].js' : '[name]-[chunkhash].js',
    sourceMapFilename: isDev ? '[name].js.map' : '[name]-[chunkhash].js.map',
  },
  plugins: [
    new WebpackNotifierPlugin(),
    new CaseSensitivePathsPlugin(),
    new webpack.DefinePlugin({
      __DEV__: JSON.stringify(isDev),
    }),
  ],
  resolve: {
    modules: [outputPath, 'node_modules'],
    extensions: ['.json', '.js', '.jsx', '*'],
  },
};

// Environment-dependent configuration settings
if (isDev) {
  config.plugins.push(
    new webpack.HotModuleReplacementPlugin(),
  );
  config.devServer = {
    port: devServerPort,
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
    hot: true,
  };
  config.output.publicPath = `http://localhost:${devServerPort}/client/`;
  config.devtool = 'source-map';
} else {
  config.plugins.push(
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compressor: {warnings: false},
      sourceMap: isDev,
      mangle: false,
    }),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new ExtractTextPlugin({
      filename: '[name]-[contenthash].css',
      allChunks: true,
      disable: false,
    }),
  );
  config.module.rules[1].use = ExtractTextPlugin.extract({
    fallback: 'style-loader',
    use: {
      loader: 'css-loader',
      options: {
        modules: true,
        importLoaders: 1,
        localIdentName: '[name]-[local]-[hash:base64:5]',
      },
    },
  });
}

module.exports = config;

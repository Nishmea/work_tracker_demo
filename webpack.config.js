const webpack = require('webpack');
const { resolve } = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackTagsPlugin = require('html-webpack-tags-plugin');


const plugins = [
  new webpack.ProvidePlugin({
    'React': 'react',
    'Redux': 'react-redux',
    'Router': 'react-router-dom',
    'PropTypes': 'prop-types',
  }),
  new HtmlWebpackPlugin({
    title: 'Work Tracker',
    favicon: 'assets/img/favicon.png',
    template: './index.html',
  }),
  new HtmlWebpackTagsPlugin({
    links: [
      { path: 'https://fonts.googleapis.com/css?family=Lexend+Deca&display=swap', type: 'css' },
      { path: 'https://fonts.googleapis.com/icon?family=Material+Icons', type: 'css' },
      { path: 'https://www.gstatic.com/charts/loader.js', type: 'js' },
    ],
    append: false,
    publicPath: '',
  }),
  new HtmlWebpackTagsPlugin({
    links: [
      { path: 'main.css', type: 'css' },
    ],
    append: true,
    publicPath: './',
  }),
  new webpack.DefinePlugin({
    'process.env.NODE_ENV': '"development"',
    TITLE: JSON.stringify(require('./package.json').title),
    VERSION: JSON.stringify(require('./package.json').version),
  }),
  new webpack.HotModuleReplacementPlugin(),
];

const rules = [
  {
    test: /\.(js|jsx)$/,
    exclude: [/node_modules/, /_old.js$/],
    use: [
      'babel-loader', 'eslint-loader',
    ],
  },
  {
    test: /\.(png|jp?g|wav|pdf|mp4|webm)$/,
    use: {
      loader: 'file-loader',
      options: {
        name: '[path][name].[ext]',
        context: './',
      },
    },
  },
  {
    test: /\.php$/,
    use: {
      loader: 'file-loader',
      options: {
        name: '../php/[name].[ext]',
      },
    },
  },
  {
    test: /\.css$/,
    use: {
      loader: 'style-loader',
      options: {
        name: './[name].[ext]',
      },
    },
  },
];


module.exports = {
	devtool: 'inline-source-map',
  context: resolve(__dirname, 'src'),
  mode: 'development',
  entry: {
    app: './index.js',
  },
  output: {
    filename: 'bundle.js',
    path: resolve(__dirname, 'build'),
    publicPath: '',
  },
  module: {
    rules,
  },
  resolve: {
    extensions: ['.js', '.jsx'],
    modules: [
      resolve(__dirname, 'node_modules'),
      resolve(__dirname, './'),
    ],
  },
	plugins,
  optimization: {
    runtimeChunk: true,
    splitChunks: {
      chunks: 'all',
      minSize: 30000,
      minChunks: 1,
      maxAsyncRequests: 5,
      maxInitialRequests: 3,
      automaticNameDelimiter: '~',
      name: true,
      cacheGroups: {
          vendors: {
              test: /[\\/]node_modules[\\/]/,
              name: 'vendors',
              chunks: 'all',
              priority: -10,
          },
      default: {
              minChunks: 2,
              priority: -20,
              reuseExistingChunk: true,
          },
      },
    },
  },
  devServer: {
    hot: true,
    host: 'localhost',
    port: 8080,
    useLocalIp: true,
    contentBase: './src',
    publicPath: '/',
    compress: true,
    inline: true,
    index: 'index.html',
    //open: true,
    overlay: true,
    historyApiFallback: true,
    proxy: {
      '/php/**': {
        target: 'http://localhost/work_tracker',
        secure: false,
      },
      '/api' : {
        target: 'http://localhost:8888',
        secure: false,
      },
    },
    stats: {
      assets: false,
      builtAt: true,
      children: false,
      chunks: false,
      depth: false,
      errors: true,
      hash: true,
      modules: false,
      publicPath: true,
      timings: true,
      version: true,
      warnings: true,
      colors: true,
    },
  },
}

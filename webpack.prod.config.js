const webpack = require('webpack');
const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackTagsPlugin = require('html-webpack-tags-plugin');
const PermissionsOutputPlugin = require('webpack-permissions-plugin');

module.exports = {
  context: path.resolve(__dirname, 'src'),
  mode: 'production',
  entry: [
    './index.js',
    './main.css',
  ],
  output: {
    filename: 'bundle-[hash:6].js',
    path: path.resolve(__dirname, 'build'),
    publicPath: '',
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: [/node_modules/],
        use: [
          'babel-loader',
        ],
      },
      {
        test: /\.(scss|css)$/,
        use: [
          'style-loader',
          'css-loader',
          'sass-loader',
        ],
      },
      {
        test: /\.php$/,
        use: {
          loader: 'file-loader',
          options: {
            context: './',
            outputPath: '../php/',
            name: '[name].[ext]',
          },
        },
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx'],
    modules: [
      path.resolve(__dirname, 'node_modules'),
      path.resolve(__dirname, './'),
    ],
  },
  plugins: [
    new webpack.ProvidePlugin({
      'React': 'react',
      'Redux': 'react-redux',
      'Router': 'react-router-dom',
      'PropTypes': 'prop-types',
    }),
    new HtmlWebpackPlugin({
      title: 'Work Tracker',
      favicon: './assets/img/favicon.png',
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
    new PermissionsOutputPlugin({
      buildFolders: [
        path.resolve(__dirname, 'php'),
      ],
    }),
    new CopyWebpackPlugin(
      [
        {
          from: 'server/',
          to: 'server/',
          toType: 'dir',
        },
        {
          from: 'package.server.json',
          to: 'server/package.json',
          toType: 'file',
        },
        {
          from: 'src/assets/htaccess/.htaccess_ssl',
          to: '.htaccess',
          toType: 'file',
        },
      ],
      {
        context: '../',
        ignore: [
          'test/**',
          '**/Thumbs.db',
          '**.old',
          '**_old**',
          '**.pdf',
        ],
        copyUnmodified: true,
      }
    ),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': '"production"',
      TITLE: JSON.stringify(require('./package.json').title),
      VERSION: JSON.stringify(require('./package.json').version),
    }),
  ],
};

'use strict';

const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');

module.exports = {
  mode: 'development', // Поставь 'production', чтобы всё минифицировалось сразу

  entry: './src/js/script.js',

  output: {
    filename: 'js/bundle.js',
    path: path.resolve(__dirname, 'dist'),
    clean: true,
    assetModuleFilename: (pathData) => {
      const filepath = path.dirname(pathData.filename).split('/').slice(1).join('/');
      if (/fonts/.test(filepath)) return 'assets/fonts/[name][ext]';
      if (/icons/.test(filepath)) return 'assets/icons/[name][ext]';
      if (/img|images/.test(filepath)) return 'assets/img/[name][ext]';
      return 'assets/[name][ext]';
    },
  },

  devtool: 'source-map',

  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [['@babel/preset-env', {
              debug: true,
              corejs: 3,
              useBuiltIns: 'usage'
            }]]
          }
        }
      },
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: [['autoprefixer', { grid: true }]]
              }
            }
          },
          'sass-loader'
        ]
      },
      {
        test: /\.(png|jpe?g|gif|svg|webp|avif)$/i,
        type: 'asset/resource'
      },
      {
        test: /\.(woff2?|ttf|otf|eot)$/i,
        type: 'asset/resource'
      },
      {
        test: /\.html$/,
        loader: 'html-loader'
      }
    ]
  },

  plugins: [
    new MiniCssExtractPlugin({
      filename: 'css/style.min.css', // Папка и имя выходного файла
    }),
    new HtmlWebpackPlugin({
      template: './src/index.html',
      filename: 'index.html'
    })
  ],

  optimization: {
    minimizer: [
      `...`, // Это нужно оставить для других минимизаторов (например, Terser)
      new CssMinimizerPlugin()
    ],
  },

  devServer: {
    static: path.resolve(__dirname, 'dist'),
    port: 3000,
    open: true,
    hot: true
  }
};

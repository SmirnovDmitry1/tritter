const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserWebpuckPlugin = require('terser-webpack-plugin');

const isDev = process.env.MODE === 'development';

const optimizationSetup = () => {
  const config = {
    splitChunks: {
      chunks: 'all'
    }
  }

  if (isDev) {
    config.minimize = true;
    config.minimizer = [
      new TerserWebpuckPlugin(),
    ];
  }

  return config;
};

const bableOptions = (extention) => {
  const options = {
    presets: [
    "@babel/preset-env",
    ],
    plugins: []
  }

  if (extention === 'jsx') {
    options.presets.push("@babel/preset-react");
  }

  return options;
}

const filename = (type) => isDev ? `[name].${type}` : `[name].[fullhash].${type}`;

module.exports = {
  context: path.resolve(__dirname, 'src'),
  mode: 'development',
  entry: {
    main: ['babel-polyfill','./index.js']
  },
  output: {
    filename: filename('js'),
    path: path.resolve(__dirname, 'dist'),
  },
  optimization: optimizationSetup(),
  devtool: isDev ? 'cheap-source-map' : false,
  devServer: {
    port: 4000,
    hot: isDev
  },
  plugins: [
    new HTMLWebpackPlugin({
      template: './assets/index.html',
      minify: {
        collapseWhitespace: !isDev,
      }
    }),
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: filename('css'),
      chunkFilename: "[id].css",
    }),
  ],
  module: {
    rules: [
      {
        test: /\.s[ac]ss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          "css-loader",
          "sass-loader",
        ],
      },
      {
        test:  /\.(png|jpe?g|gif)$/i,
        use: [
          'file-loader'
        ]
      },
      {
        test: /\.(ttf|woff|woff2|eot)$/,
        use: [
          'file-loader'
        ]
      },
      {
        test: /\.svg$/,
        use: [
          'svg-inline-loader'
        ]
      },
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: bableOptions(),
        }
      },
      {
        test: /\.jsx$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: bableOptions('jsx'),
        }
      }
    ],
  }
}
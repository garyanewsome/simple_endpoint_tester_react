const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const MakeDirWebpackPlugin = require('make-dir-webpack-plugin')
const CreateFileWebpack = require('create-file-webpack')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin

const plugins = {
  prod: [
    new MakeDirWebpackPlugin({
      dirs: [{ path: './dist/html' }]
    }),
    new CreateFileWebpack({ path: './dist/html', fileName: 'main.tpl.html', content: '' }),
    new CopyWebpackPlugin([
      {
        from: path.join(__dirname, '/public')
      }
    ]),
    new BundleAnalyzerPlugin({ analyzerMode: 'static' }, true)
  ],
  dev: [
    new HtmlWebpackPlugin({ template: './index.html' }),
    new CopyWebpackPlugin([
      {
        from: path.join(__dirname, '/public')
      }
    ]),
    new BundleAnalyzerPlugin({ analyzerMode: 'server', analyzerPort: '8889' }, true)
  ]
}

module.exports = (env, argv) => {
  return {
    entry: './src/index.tsx',
    stats: { children: false },
    optimization: {
      minimize: true
    },
    resolve: {
      extensions: ['.ts', '.tsx', '.js']
    },
    module: {
      rules: [
        {
          test: /\.ts(x?)$/,
          exclude: /node_modules/,
          use: [
            {
              loader: 'ts-loader'
            }
          ]
        },
        {
          test: /\.js?$/,
          enforce: 'pre',
          loader: 'eslint-loader',
          exclude: /node_modules/,
          options: {
            emitWarning: true,
            configFile: './.eslintrc.json'
          }
        },
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader'
          }
        },
        {
          test: /\.css$/,
          use: [
            {
              loader: MiniCssExtractPlugin.loader,
              options: {
                // you can specify a publicPath here
                // by default it use publicPath in webpackOptions.output
                publicPath: './public'
              }
            },
            'css-loader'
          ]
        },
        {
          test: /\.(svg|png|jpg|gif)(\?v=\d+\.\d+\.\d+)?$/,
          use: [
            {
              loader: 'file-loader',
              options: {
                name: '[name].[ext]',
                outputPath: 'images/'
              }
            }
          ]
        },
        {
          test: /\.(woff(2)?|otf||ttf|eot)(\?v=\d+\.\d+\.\d+)?$/,
          use: [
            {
              loader: 'file-loader',
              options: {
                name: '[name].[ext]',
                outputPath: 'fonts/'
              }
            }
          ]
        },
        {
          type: 'javascript/auto',
          test: /\.json$/,
          use: ['file-loader'],
          include: /\.\/manifest/ // for e.g, but better to only copy particular JSON files (not all)
        },
        {
          test: /\.m?js$/,
          exclude: /(node_modules|bower_components)/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
              plugins: ['date-fns']
            }
          }
        }
      ]
    },
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'assets/js/bundle.js'
    },

    plugins: [
      ...(argv.mode == 'production' ? plugins.prod : plugins.dev),
      new MiniCssExtractPlugin({
        // Options similar to the same options in webpackOptions.output
        // both options are optional
        filename: '[name].css',
        chunkFilename: '[id].css'
      })
    ],
    devServer: {
      stats: {
        modules: false,
        children: false,
        source: false
      }
    }
  }
}

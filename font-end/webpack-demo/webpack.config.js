
const path = require('path')
var HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const webpack = require('webpack');
const bootstrapEntryPoints = require('./webpack.bootstrap.config')


var isProd = process.env.NODE_ENV === 'production'; 
var bootstrapConfig = isProd ? bootstrapEntryPoints.prod : bootstrapEntryPoints.dev;

let pathsToClean = [
    'dist',
  ]
  

module.exports={
    entry: {
        "app.bundle": './src/app.js',
        "bootstrap": bootstrapConfig
      },
    output:{
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].[hash].js'
    },
    devServer:{
        port:9000,
        open:true,
        hot: true
    },
    plugins:[
        new CleanWebpackPlugin(pathsToClean),
        new webpack.NamedModulesPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new HtmlWebpackPlugin({
        template: './src/index.html',
        filename: 'index.html',
        minify: {
            collapseWhitespace: true,
        },
        hash: true,      
     
    }),
    
    new ExtractTextPlugin({
        filename: '[name].css',
        disable: !isProd,
        publicPath: 'css/'
    })
],
    module: {
        loaders: [
        { test: /\.(woff2?|svg)$/, loader: 'url-loader?limit=10000' },
        { test: /\.(ttf|eot)$/, loader: 'file-loader' },
        ],
    },
    module:{         
        rules:[
        {
            test:/\.scss$/,
            use: ['style-loader', 'css-loader', 'sass-loader']
        },{
            test: /\.(gif|png|jpe?g|svg)$/i,
            use: [
              {
                loader: 'file-loader',
                options: {
                    name: '[name].[ext]',
                    outputPath: 'images/'
                  }
              },
              {
                loader: 'image-webpack-loader',
                options: {
                  bypassOnDebug: true,
                }
              }
            ]
          },
          {
            test: /\.html$/,
            use: [ {
              loader: 'html-loader',
              options: {
                minimize: true
              }
            }],
          },
           { test:/bootstrap-sass[\/\\]assets[\/\\]javascripts[\/\\]/, loader: 'imports-loader?jQuery=jquery' },
            {test:/\.js$/,loader:'babel-loader',exclude:/node_modules/},
            {test:/\.jsx$/,loader:'babel-loader',exclude:/node_modules/},
            { test: /\.(woff2?|svg)$/, loader: 'url-loader?limit=10000&name=[name].[ext]&outputPath=fonts/' },
            { test: /\.(ttf|eot)$/, loader: 'file-loader?name=[name].[ext]&outputPath=fonts/' },
        ]   
    }
}
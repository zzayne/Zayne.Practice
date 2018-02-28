
const path = require('path')
var HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const webpack = require('webpack');

var isProd = process.env.NODE_ENV === 'production'; 

let pathsToClean = [
    'dist',
  ]
  

module.exports={
    entry:'./src/app.js',
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
        filename:'style.css',
        disable:!isProd
    })
],
    module:{
        rules:[
        {
            test:/\.scss$/,
            use: ['style-loader', 'css-loader', 'sass-loader']
        },{
            test: /\.png$/,
            use: [
              {
                loader: 'file-loader',
              },
            ]
          },
            {test:/\.js$/,loader:'babel-loader',exclude:/node_modules/},
            {test:/\.jsx$/,loader:'babel-loader',exclude:/node_modules/}
        ]
    }
}
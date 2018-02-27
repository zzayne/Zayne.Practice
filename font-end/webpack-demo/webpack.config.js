var HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
module.exports={
    entry:'./src/app.js',
    output:{
        path:__dirname+'/dist',
        filename:'app.bundle.js'
    },
    plugins:[new HtmlWebpackPlugin({
        template: './src/index.html',
        filename: 'index.html',
        minify: {
            collapseWhitespace: true,
        },
        hash: true,      
    }),
    new ExtractTextPlugin('style.css')
],
    module:{
        rules:[{
            test:/\.scss$/,
            use:ExtractTextPlugin.extract({
                fallback: 'style-loader',
                //resolve-url-loader may be chained before sass-loader if necessary
                use: ['css-loader', 'sass-loader']
              })
        }]
    }
}
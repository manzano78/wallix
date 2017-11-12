const path = require('path');
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WriteFilePlugin = require('write-file-webpack-plugin');

module.exports = function (env) {

    return {
        context: path.resolve(__dirname, './src'),
        entry: ['babel-polyfill', 'raf/polyfill', 'isomorphic-fetch', './js/app', './css/index.less'],
        output: {
            filename: 'js/app.bundle.js',
            path: path.resolve(__dirname, './public'),
            publicPath: '/public/'
        },
        plugins: [
            new webpack.DefinePlugin({
                'process.env': {
                    'NODE_ENV': JSON.stringify(env.build)
                }
            }),
            new CleanWebpackPlugin(['public']),
            new HtmlWebpackPlugin({
                filename: 'index.html',
                template: './index.html',
                favicon: 'img/favicon.ico',
            }),
            new ExtractTextPlugin('css/app.bundle.css'),
            new WriteFilePlugin()
        ],
        module: {
            loaders: [
                {
                    test: /\.jsx?$/,
                    loader: 'babel-loader',
                    exclude: /node_modules/,
                    query: {
                        presets: [
                            'es2015',
                            'react',
                            'stage-0'
                        ],
                        plugins: [
                            'transform-object-rest-spread',
                            'transform-decorators-legacy',
                            'transform-class-properties'
                        ]
                    }
                },
                {
                    test: /\.less$/,
                    loader: ExtractTextPlugin.extract({
                        fallback: 'style-loader',
                        use: 'css-loader!less-loader',
                    })
                },
                {
                    test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                    loader: 'url-loader?name=img/[name].[ext]&limit=10000&minetype=application/font-woff'
                },
                {
                    test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                    loader: 'file-loader?name=img/[name].[ext]'
                },
                {
                    test: /\.(png|jpe?g|gif)$/,
                    loader: 'file-loader?name=img/[name].[ext]'
                }
            ]
        }
    }
};
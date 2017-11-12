const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const commonConfig = require('./webpack.config.base.js');

module.exports = function (env) {
    return webpackMerge(commonConfig(env), {
        plugins: [
            new webpack.optimize.UglifyJsPlugin({
                comments: false,
                mangle: false
            }),
            new webpack.LoaderOptionsPlugin({
                minimize: true
            }),
            new webpack.optimize.OccurrenceOrderPlugin()
        ]
    })
};
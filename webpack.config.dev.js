const webpackMerge = require('webpack-merge');
const commonConfig = require('./webpack.config.base.js');

module.exports = function (env) {
    return webpackMerge(commonConfig(env), {
        devServer: {
            proxy:{
                '/**' : {
                    target: 'http://0.0.0.0:3000/',
                    changeOrigin: true
                }
            }
        }
    })
};
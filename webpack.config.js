var webpack = require('webpack');
module.exports = {
    entry: './assets/index.js',
    output: {
        filename: './assets/index.min.js'
    },
    plugins: [
        new webpack.optimize.UglifyJsPlugin() // minify
    ]
};

var webpack = require('webpack');
module.exports = {
    entry: './assets/unpaired.js',
    output: {
        filename: './assets/unpaired.min.js'
    },
    plugins: [
        new webpack.optimize.UglifyJsPlugin() // minify
    ]
};

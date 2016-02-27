var webpack = require('webpack');
module.exports = {
    entry: {
        unpaired: './assets/unpaired.js',
        paired: './assets/paired.js'
    },
    output: {
        path: './assets',
        filename: "[name].min.js"
    },
    plugins: [
        new webpack.optimize.UglifyJsPlugin() // minify
    ]
};

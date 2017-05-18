var path = require('path');
var nodeExternals = require('webpack-node-externals');
module.exports = {
    // Angular 2 stuff
    entry: {
        //vendor: './bundle/vendor.ts'
        start: './apps/ticket/public/ng2/start.module.ts',
        bundle: './apps/ticket/public/js/index.ts'
    },
    // Amorphic
    //entry: './apps/ticket/public/js/index.ts',
    output: {
        filename: '[name].js',
        //filename: 'bundle.js',
        path: '/'
    },
    module: {
        rules: [
            // Angular 2 stuff
            {
                test: /\.tsx?$/,
                loader: ['ts-loader', 'angular2-template-loader']
            },

            // Amorphic
            //{
            //    test: /\.tsx?$/,
            //    loader: 'ts-loader'
            //},
            {
                enforce: 'pre',
                test: /\.js$/,
                loader: "source-map-loader"
            },
            {
                enforce: 'pre',
                test: /\.tsx?$/,
                use: "source-map-loader"
            },
            {
                test: /\.html$/,
                loader: 'html-loader'
            }
        ]
    },
    resolve: {
        extensions: [".tsx", ".ts", ".js"],
        alias: {
            amorphic: path.resolve(__dirname, './node_modules/semotus/index.js')
        }
    },
    devtool: 'inline-source-map'
};
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const TerserJSPlugin = require('terser-webpack-plugin');
const webpack = require('webpack');
const licenseNotice = require('./src/jwplayer.license.notice');

module.exports = {
    mode: 'none',
    entry: './src/js/index.js',
    output: {
        path: `${__dirname}/app/dist`,
        filename: 'js/jw-tizen.js'
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader'
                ]
            },
            {
                test: /\.js$/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        babelrc: false,
                        presets: [
                            ['@babel/preset-env']
                        ]
                    }
                }
            }
        ]
    },
    optimization: {
        minimizer: [
            new TerserJSPlugin({}),
            new CssMinimizerPlugin()
        ],
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: 'css/jw-tizen.css',
        }),
        new webpack.BannerPlugin({
            banner: `/*!\n${licenseNotice}\n*/`,
            raw: true,
            include: /^.*.js$/
        })
    ]
}

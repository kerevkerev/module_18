const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')


let mode = 'development'
if (process.env.NODE_ENV === 'production') {
    mode = 'production'
}

console.log(mode + ' mode')

module.exports = {
    mode: mode,
    output: {
        assetModuleFilename: "asset/[hash][ext][query]",
        clean: true,
        publicPath: '/',
    },

    devServer: {
        open: true,
        hot: true,
        port: 'auto',
        static: {
            directory: './src',
            watch: true,
        },
    },
    // devtool: 'source-map',
    plugins: [
        new MiniCssExtractPlugin({
            filename: '[name].[contenthash].css'
        }),
        new HtmlWebpackPlugin(
            {
                template: './src/pages/index.pug',
                filename: 'index.html'
            }
        ),
        new HtmlWebpackPlugin(
            {
                template: './src/pages/about.pug',
                filename: 'about.html'

            }
        ),
        new HtmlWebpackPlugin(
            {
                template: './src/pages/contacts.pug',
                filename: 'contacts.html'

            }
        )
    ],

    module: {

        rules: [
            {
                test: /\.html$/i,
                loader: 'html-loader'
            },
            {
                test: /\.(sa|sc|c)ss$/,
                use: [
                    (mode === 'development') ? "style-loader" : MiniCssExtractPlugin.loader,
                    "css-loader",
                    {
                        loader: "postcss-loader",
                        options: {
                            postcssOptions: {
                                plugins: [
                                    [
                                        "postcss-preset-env",
                                        {
                                            // Options
                                        },],],
                            },
                        },
                    }, "sass-loader",],
            },
            {
                test: /\.(png|svg|jpg|gif)$/i,
                type: 'asset/resource',
            },
            {
                test: /\.pug$/,
                loader: 'pug-loader',
                exclude: /(node_modules|bower_components)/,
            },
            {
                test: /\.(?:js|mjs|cjs)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            ['@babel/preset-env', { targets: "defaults" }]
                        ]
                    }
                }
            }
        ]
    },


}
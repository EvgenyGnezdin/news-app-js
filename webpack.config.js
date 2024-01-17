const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const FileManagerPlugin = require('filemanager-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ImageMinimizerPlugin = require('image-minimizer-webpack-plugin')

module.exports = {
    entry: {
        //Путь к файлу из которого берем данные
        main: path.resolve(__dirname, './src/js/index.js'),
    },
    output: {
        //Путь к файлу в который переносятся данные и название файла
        path: path.resolve(__dirname, './dist'),
        filename: '[name].js',
        assetModuleFilename: path.join('images', '[name].[contenthash][ext]'),
    },
    module: {
        rules: [
            {
                test: /\.(png|jpg)$/,
                loader: 'url-loader'
            },
            {
                test: /\.html$/i,
                loader: "html-loader"
            },
            {
                test: /\.js$/,
                use: 'babel-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.(scss|css)$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader', 'sass-loader'],
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                type: 'asset/resource',
            },
            {
                test: /\.svg$/,
                type: 'asset/resource',
                generator: {
                filename: path.join('icons', '[name].[contenthash][ext]'),
                },
            },
            {
                test: /\.(woff2?|eot|ttf|otf)$/i,
                type: 'asset/resource',
            },
        ],
    },
    plugins: [
        //Настройка HTML Webpack для создания чистого HTML
        new HtmlWebpackPlugin({
            template: path.join(__dirname, 'src', 'template.html'),
            filename: 'index.html',
        }),
        //Настройка Файлового менеджера для очистки папки при перезаписи файлов
        new FileManagerPlugin({
            events: {
                onStart: {
                delete: ['dist'],
                },
            },
        }),
        new MiniCssExtractPlugin({
            filename: '[name].[contenthash].css',
        }),
    ],
    //Найctройка DevServer с папкой которую надо просматривать и следить за ней
    devServer: {
        watchFiles: path.join(__dirname, 'src'),
        port: 9000,
    },
    optimization: {
        minimizer: [
            new ImageMinimizerPlugin({
                minimizer: {
                implementation: ImageMinimizerPlugin.imageminMinify,
                options: {
                    plugins: [
                    ['gifsicle', { interlaced: true }],
                    ['jpegtran', { progressive: true }],
                    ['optipng', { optimizationLevel: 5 }],
                    ['svgo', { name: 'preset-default' }],
                    ],
                },
            },
        }),
        ],
    },
}
const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin =  require ( 'html-webpack-plugin' );

const PATHS = {
	source: path.join(__dirname, 'source'),
	build: path.join(__dirname, 'build'),
}

module.exports = {
	entry: [
        'react-hot-loader/patch',
        'webpack-dev-server/client?http://localhost:3000',
        'webpack/hot/only-dev-server',
        PATHS.source + '/index.js',
    ],
    resolve: {
        alias: {
          Store: path.resolve(__dirname, 'source/store')
        },
    },
	output: {
		path: PATHS.build,
		filename: '[name].js'
	},
	plugins: [
        new webpack.HotModuleReplacementPlugin(),
        
        new webpack.NamedModulesPlugin(),
        
        new webpack.NoEmitOnErrorsPlugin(),

		new HtmlWebpackPlugin({
            filename: './index.html',
            minify: false,
            template: 'source/index.html',
            inject: 'body',
            xhtml: true
		})
	],
	devServer: {
		stats: 'errors-only',
        host: 'localhost',
        port: 3000,
        hot: true
	},
	module: {
        rules: [
            {
                test: /\.js?$/,
                use: [
                    'babel-loader',
                ],
                exclude: /node_modules/,
            }, {
                test: /\.less?$/,
                use: [
                    'style-loader',
                    'css-loader',
                    'less-loader'
                ]
            }
        ]
    }
};
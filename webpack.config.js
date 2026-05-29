const HtmlWebpackPlugin = require('html-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const InlineChunkHtmlPlugin = require('react-dev-utils/InlineChunkHtmlPlugin');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const path = require('path');

module.exports = (env, argv) => ({
    mode: argv.mode === 'production' ? 'production' : 'development',
    devtool: argv.mode === 'production' ? false : 'inline-source-map',
    entry: {
        ui: './src/ui/index.tsx',
        code: './src/code/index.ts',
    },
    module: {
        rules: [
            { test: /\.tsx?$/, use: 'ts-loader', exclude: /node_modules/ },
            { test: /\.css$/, use: ['style-loader', { loader: 'css-loader' }] },
            { test: /\.(png|jpg|gif|webp|svg)$/, type: 'asset/inline' },
        ],
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.jsx', '.js'],
        plugins: [new TsconfigPathsPlugin()],
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'dist'),
    },
    watchOptions: {
        ignored: /node_modules|\.git|dist|storybook-static|coverage/,
        aggregateTimeout: 300,
    },
    performance: {
        hints: argv.mode === 'production' ? 'warning' : false,
        maxAssetSize: 400 * 1024,
        maxEntrypointSize: 400 * 1024,
        assetFilter: (name) => name.endsWith('.js'),
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/ui/index.html',
            filename: 'ui.html',
            chunks: ['ui'],
            cache: false,
        }),
        new InlineChunkHtmlPlugin(HtmlWebpackPlugin, [/ui/]),
        process.env.ANALYZE && new BundleAnalyzerPlugin(),
    ].filter(Boolean)
});

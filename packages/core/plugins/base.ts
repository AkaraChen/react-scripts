import Webpack from 'webpack';
import 'webpack-dev-server';
import path from 'node:path';

const cwd = process.cwd();

const config: Webpack.Configuration = {
    mode: 'production',
    entry: path.resolve(cwd, 'src', './main.tsx'),
    devServer: {
        historyApiFallback: true
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js'],
        alias: {
            '@': path.resolve(cwd, './src')
        }
    },
    module: {
        rules: []
    },
    plugins: [],
    infrastructureLogging: {
        level: 'error'
    },
    stats: 'errors-warnings'
};

export default config;

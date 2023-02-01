import Webpack from 'webpack';
import WebpackDevServer from 'webpack-dev-server';

const config: Webpack.Configuration = {
    mode: 'production',
    devServer: {
        historyApiFallback: true
    }
};

const compiler = Webpack(config);
const server = new WebpackDevServer({}, compiler);

server.startCallback(error => {
    if (error !== undefined) throw error;
});

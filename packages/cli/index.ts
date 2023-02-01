import { applyPlugin } from '@miaojs/core';
import Webpack from 'webpack';
import WebpackDevServer from 'webpack-dev-server';

const config: Webpack.Configuration = applyPlugin(['css', 'html'], process.cwd());
const compiler = Webpack(config);

export const dev = () => {
    const server = new WebpackDevServer({}, compiler);
    server.startCallback(() => {
        console.log('Start dev server');
    });
};

export const build = () => {
    compiler.run(() => {});
};

switch (process.argv[1]) {
case 'dev': {
    dev();
    break;
}
case 'build': {
    build();
    break;
}
default: {
    dev();
    break;
}
}

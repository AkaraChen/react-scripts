import { applyPlugin, Env, IConfig } from '@miaojs/core';
import Webpack from 'webpack';
import WebpackDevServer from 'webpack-dev-server';

process.env.NODE_ENV = process.argv[2] === 'build' ? Env.prod : Env.dev;
const currentEnv = process.env.NODE_ENV as Env;

const cwd = process.cwd();

const config: IConfig = applyPlugin(['css', 'html', 'console'], {
    cwd,
    env: currentEnv
});
const compiler = Webpack(config.webpackConfig);

export const dev = () => {
    const server = new WebpackDevServer({port: 3000}, compiler);
    server.startCallback(() => {});
};

export const build = () => {
    compiler.run(() => {});
};

switch (process.argv[2]) {
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

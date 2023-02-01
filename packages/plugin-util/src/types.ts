import Webpack from 'webpack';

export enum Env {
    dev = 'development',
    prod = 'production'
}

export interface IPlugin {
    webpack: (
        config: Webpack.Configuration,
        props: {
            env: Env;
            cwd: string;
        }
    ) => Webpack.Configuration;
    order?: number;
}

import Webpack from 'webpack';

export enum Env {
    dev = 'development',
    prod = 'production'
}

export interface Props {
    env: Env;
    cwd: string;
}

export interface IPlugin {
    name: string;
    webpack: (
        config: Webpack.Configuration,
        props: Props
    ) => Webpack.Configuration;
    order?: number;
    beforeStart?: (props: Props) => void;
}

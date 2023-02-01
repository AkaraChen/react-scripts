import { Props } from '@miaojs/plugin-util';
import Webpack from 'webpack';

export interface IConfig {
    webpackConfig: Webpack.Configuration;
    beforeStart: Array<(props: Props) => void>;
    onStart: Array<(props: Props) => void>;
}

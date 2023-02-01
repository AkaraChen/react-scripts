import { Env, definePlugins } from '@miaojs/plugin-util';
// @ts-ignore
import MiniCSSExtract from 'mini-css-extract-plugin';
import path from 'node:path';
// @ts-ignore
import type Webpack from 'webpack';
import fs from 'node:fs';

const CssPlugin = definePlugins({
    name: 'css',
    webpack(config, { env, cwd }) {
        const getLoaders = () => {
            const postCssConfigDir = path.resolve(cwd, './postcss.config.js');
            const postCssConfig = fs.existsSync(postCssConfigDir)
                ? require(postCssConfigDir)
                : {};
            const loaders: Webpack.RuleSetRule['use'] = [
                {
                    loader: require.resolve('css-loader')
                },
                {
                    loader: require.resolve('postcss-loader'),
                    options: postCssConfig
                }
            ];
            if (env === Env.dev) {
                loaders.unshift(MiniCSSExtract.loader);
            }
            return loaders;
        };

        const getPlugins = (): Array<Webpack.WebpackPluginInstance> => {
            if (env === Env.dev) {
                return [new MiniCSSExtract()];
            }
            return [];
        };
        config.module!.rules!.push({
            test: /\.css$/,
            use: getLoaders()
        });
        config.plugins!.push(...getPlugins());
        return config;
    }
});

export default CssPlugin;

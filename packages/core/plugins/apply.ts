import { getWebpackConfig } from './base';
import path from 'node:path';
import { IPlugin, Props } from '@miaojs/plugin-util';

const resolveModule = (name: string, cwd: string) => {
    const pkgDir = path.resolve(cwd, './node_modules', name);
    return require.resolve(pkgDir);
};

const resolvePlugin = (pluginName: string, cwd: string) => {
    const pluginPackage = `@miaojs/${pluginName}`;
    const pluginDir = resolveModule(pluginPackage, cwd);
    const plugin: IPlugin = require(pluginDir).default;
    if (!plugin) throw new Error(`Plugin ${pluginName} not found.`);
    return plugin;
};

export const applyPlugin = (plugins: string[], props: Props) => {
    const { cwd } = props;
    let webpackConfig = getWebpackConfig(props);
    for (const pluginName of plugins) {
        const plugin = resolvePlugin(pluginName, cwd);
        webpackConfig = plugin.webpack(webpackConfig, props);
    }
    return webpackConfig;
};

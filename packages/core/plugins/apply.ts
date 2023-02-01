import { getWebpackConfig } from './base';
import path from 'node:path';
import { IPlugin, Props } from '@miaojs/plugin-util';
import { IConfig } from '../config';

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

export const applyPlugin = (plugins: string[], props: Props): IConfig => {
    const { cwd } = props;
    let webpackConfig = getWebpackConfig(props);
    const beforeStart: Array<(props: Props) => void> = [];
    const onStart: Array<(props: Props) => void> = [];
    for (const pluginName of plugins) {
        const plugin = resolvePlugin(pluginName, cwd);
        webpackConfig = plugin.webpack(webpackConfig, props);
        if (plugin.beforeStart) beforeStart.push(plugin.beforeStart);
        if (plugin.onStart) onStart.push(plugin.onStart);
    }
    return {
        webpackConfig,
        beforeStart,
        onStart
    };
};

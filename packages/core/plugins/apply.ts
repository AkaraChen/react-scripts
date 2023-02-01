import config from './base';
import path from 'node:path';
import { IPlugin, Env } from '@miaojs/plugin-util';

export const applyPlugin = (plugins: string[], cwd: string) => {
    const resolvePlugin = (pluginName: string) => {
        const pluginPackage = `@miaojs/${pluginName}`;
        const pluginDir = require.resolve(
            path.resolve(cwd, './node_modules', pluginPackage)
        );
        const plugin: IPlugin = require(pluginDir).default;
        if (!plugin) throw new Error(`Plugin ${pluginName} not found.`);
        return plugin;
    };
    let result = config;
    for (const pluginName of plugins) {
        const plugin = resolvePlugin(pluginName);
        result = plugin.webpack(result, {
            env: Env.dev,
            cwd
        });
    }
    return result;
};

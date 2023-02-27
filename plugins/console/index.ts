import { definePlugins, Env } from '@miaojs/plugin-util';
import { Consola } from 'consola'

const ConsolePlugin = definePlugins({
    name: 'console',
    webpack(config, { env }) {
        config.infrastructureLogging = {
            level: 'error',
            // @ts-ignore
            console: Consola
        }
        config.stats = env === Env.dev ? 'errors-warnings': 'summary';
        return config;
    },
});

export default ConsolePlugin;
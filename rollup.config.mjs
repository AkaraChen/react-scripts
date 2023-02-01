import { defineConfig } from 'rollup';
import ts from 'rollup-plugin-ts';
import nodeResolve from '@rollup/plugin-node-resolve';
import summary from 'rollup-plugin-summary';

export default defineConfig({
    input: './src/index.ts',
    output: {
        dir: 'dist'
    },
    plugins: [nodeResolve(), ts(), summary()]
});

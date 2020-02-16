import { join } from 'path';
import json from 'rollup-plugin-json';
import resolve from 'rollup-plugin-node-resolve';
import babel from 'rollup-plugin-babel';

export default {
    input: join('src', 'createSpikklClient.ts'),
    external: [
        ...[ 'fs', 'https', 'path', 'url' ],
        ...Object.keys(require('./package.json').dependencies)
    ],
    output: [
        { file: join('dist', 'spikkl.cjs.js'), format: 'cjs' },
        { file: join('dist', 'spikkl.esm.js'), format: 'es' }
    ],
    plugins: [
        json(),
        resolve({
            extensions: [ '.ts' ],
            customResolveOptions: {
                moduleDirectory: 'src'
            },
            preferBuiltins: true
        }),
        babel({
            extensions: [ '.ts' ]
        })
    ]
};
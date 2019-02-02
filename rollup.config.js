import nodeResolve from 'rollup-plugin-node-resolve';

export default {
  input: 'src/index.js',
  output: {
    file: 'lib/component-register-hooks.js',
    format: 'cjs',
    exports: 'named'
  },
  external: ['augmentor', 'component-register'],
  plugins: [
    nodeResolve({ extensions: ['.js'] })
  ]
};
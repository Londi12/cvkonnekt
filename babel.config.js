module.exports = {
  presets: [
    ['@babel/preset-env', { targets: { node: 'current' } }],
    '@babel/preset-react'
  ],
  plugins: [
    '@babel/plugin-transform-modules-commonjs',
    '@babel/plugin-syntax-import-meta',
    ['babel-plugin-transform-import-meta', {
      moduleRoot: process.cwd()
    }]
  ],
  env: {
    test: {
      plugins: [
        '@babel/plugin-transform-modules-commonjs',
        ['babel-plugin-transform-import-meta', {
          moduleRoot: process.cwd()
        }]
      ]
    }
  }
}; 
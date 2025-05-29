module.exports = {
  presets: [
    ['@babel/preset-env', { 
      targets: { node: 'current' },
      modules: 'auto'
    }],
    ['@babel/preset-react', { runtime: 'automatic' }]
  ],
  plugins: [
    ['@babel/plugin-transform-runtime', { 
      regenerator: true,
      useESModules: true
    }],
    ['@babel/plugin-syntax-import-meta']
  ],
  env: {
    test: {
      plugins: ['@babel/plugin-transform-modules-commonjs']
    }
  }
}; 
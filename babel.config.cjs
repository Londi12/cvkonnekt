module.exports = (api) => {
  // Cache the configuration
  api.cache(true);

  const isTest = api.env('test');
  
  const presets = [
    ['@babel/preset-env', {
      targets: isTest ? { node: 'current' } : '> 0.25%, not dead',
      modules: isTest ? 'commonjs' : false,
      useBuiltIns: 'usage',
      corejs: 3,
    }],
    ['@babel/preset-react', { 
      runtime: 'automatic',
      importSource: '@emotion/react',
    }]
  ];

  const plugins = [
    '@babel/plugin-transform-runtime',
    ['@babel/plugin-transform-modules-commonjs', { loose: true }],
    ['@babel/plugin-proposal-class-properties', { loose: true }],
    ['@babel/plugin-proposal-private-methods', { loose: true }],
    ['@babel/plugin-proposal-private-property-in-object', { loose: true }],
  ];

  if (!isTest) {
    plugins.push(['@babel/plugin-transform-runtime', {
      helpers: true,
      regenerator: true,
      useESModules: true,
    }]);
  }

  return {
    presets,
    plugins,
    assumptions: {
      setPublicClassFields: true,
    },
    env: {
      test: {
        plugins: [
          '@babel/plugin-transform-runtime',
          ['@babel/plugin-transform-modules-commonjs', { loose: true }],
        ]
      }
    }
  };
};
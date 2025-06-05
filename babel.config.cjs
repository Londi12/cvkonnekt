module.exports = (api) => {
  // Cache the configuration
  api.cache(true);

  const presets = [
    ['@babel/preset-env', {
      targets: {
        node: 'current',
      },
      modules: 'commonjs',
    }],
    ['@babel/preset-react', { runtime: 'automatic' }]
  ];

  const plugins = [
    '@babel/plugin-transform-modules-commonjs',
    '@babel/plugin-transform-runtime',
    ['@babel/plugin-transform-react-jsx', { runtime: 'automatic' }]
  ];

  return {
    presets,
    plugins,
    env: {
      test: {
        presets: [
          ['@babel/preset-env', {
            targets: { node: 'current' },
            modules: 'commonjs',
          }],
          '@babel/preset-react'
        ],
        plugins: [
          '@babel/plugin-transform-modules-commonjs',
          '@babel/plugin-transform-runtime'
        ]
      }
    }
  };
};
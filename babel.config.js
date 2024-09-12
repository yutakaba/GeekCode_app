module.exports = function(api) {
  api.cache(true);

  const presets = [
    [
      '@babel/preset-env',
      {
        useBuiltIns: 'entry',
        corejs: 3,
        modules: false,
        targets: '> 0.25%, not dead',
      },
    ],
  ];

  const plugins = [
    '@babel/plugin-syntax-dynamic-import',
    '@babel/plugin-transform-runtime',
    '@babel/plugin-transform-regenerator',
    '@babel/plugin-transform-for-of',
    '@babel/plugin-proposal-private-property-in-object',
  ];

  return {
    presets,
    plugins,
  };
};

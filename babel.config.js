module.exports = function(api) {
  api.cache(false); // 一旦キャッシュを無効にしてから

  api.cache(true); // 再度キャッシュを有効にする

  const presets = [
    [
      '@babel/preset-env',
      {
        useBuiltIns: 'entry',
        corejs: 3,
        modules: false,
        targets: '> 0.25%, not dead'
      }
    ]
  ];

  const plugins = [
    '@babel/plugin-syntax-dynamic-import',
    '@babel/plugin-proposal-class-properties',
    '@babel/plugin-proposal-object-rest-spread',
    '@babel/plugin-proposal-private-methods',
    '@babel/plugin-proposal-private-property-in-object',
    '@babel/plugin-transform-runtime',
    '@babel/plugin-transform-regenerator',
    '@babel/plugin-proposal-nullish-coalescing-operator',
    '@babel/plugin-proposal-optional-chaining',
    '@babel/plugin-transform-for-of'
  ];

  if (api.env('test')) {
    presets.push([
      '@babel/preset-env',
      {
        targets: {
          node: 'current'
        }
      }
    ]);
    plugins.push('babel-plugin-dynamic-import-node');
  }

  return {
    presets,
    plugins
  };
};

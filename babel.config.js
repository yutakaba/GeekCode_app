// babel.config.js

module.exports = function (api) {
  var validEnv = ['development', 'test', 'production']
  var currentEnv = api.env()
  var isDevelopmentEnv = api.env('development')
  var isProductionEnv = api.env('production')
  var isTestEnv = api.env('test')

  if (!validEnv.includes(currentEnv)) {
    throw new Error(
      'Please specify a valid `NODE_ENV` or ' +
        '`BABEL_ENV` environment variables. Valid values are "development", ' +
        '"test", and "production". Instead, received: ' +
        JSON.stringify(currentEnv) +
        '.'
    )
  }

  return {
    presets: [
      isTestEnv && [
        '@babel/preset-env',
        {
          targets: {
            node: 'current',
          },
          // 新しい構文をサポート
          shippedProposals: true,
        },
      ],
      (isProductionEnv || isDevelopmentEnv) && [
        '@babel/preset-env',
        {
          forceAllTransforms: true,
          useBuiltIns: 'entry',
          corejs: 3,
          modules: false,
          exclude: ['transform-typeof-symbol'],
          // 新しい構文をサポート
          shippedProposals: true,
        },
      ],
    ].filter(Boolean),
    plugins: [
      'babel-plugin-macros',
      '@babel/plugin-syntax-dynamic-import',
      isTestEnv && 'babel-plugin-dynamic-import-node',
      '@babel/plugin-transform-destructuring',
      // プラグイン名を修正
      [
        '@babel/plugin-proposal-class-properties',
        {
          loose: true,
        },
      ],
      [
        '@babel/plugin-proposal-object-rest-spread',
        {
          useBuiltIns: true,
        },
      ],
      [
        '@babel/plugin-transform-private-methods',
        {
          loose: true,
        },
      ],
      [
        '@babel/plugin-transform-private-property-in-object',
        {
          loose: true,
        },
      ],
      [
        '@babel/plugin-transform-runtime',
        {
          helpers: false,
        },
      ],
      [
        '@babel/plugin-transform-regenerator',
        {
          async: false,
        },
      ],
      '@babel/plugin-transform-for-of',
      // 必要な新しいプラグインを追加
      '@babel/plugin-proposal-nullish-coalescing-operator',
      '@babel/plugin-proposal-optional-chaining',
      '@babel/plugin-proposal-logical-assignment-operators',
      '@babel/plugin-proposal-numeric-separator',
      '@babel/plugin-proposal-throw-expressions',
      '@babel/plugin-proposal-unicode-property-regex'
    ].filter(Boolean),
  }
}
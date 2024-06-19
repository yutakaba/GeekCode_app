module.exports = function(api) {
  api.cache(true);

  const presets = [
    '@babel/preset-env'
  ];

  const plugins = [
    '@babel/plugin-proposal-class-properties',
    '@babel/plugin-proposal-private-methods',
    '@babel/plugin-proposal-private-property-in-object'
  ];

  return {
    presets,
    plugins
  };
};

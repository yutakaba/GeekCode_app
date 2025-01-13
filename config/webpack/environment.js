// config/webpack/environment.js

const { environment } = require('@rails/webpacker');
const babelLoader = require('./loaders/babel');

babelLoader.exclude = [/node_modules\/monaco-editor/];

// Babel Loader の設定
environment.loaders.prepend('babel', babelLoader);

// 不要な Node.js 関連の設定を無視
environment.config.merge({
  node: {
    dgram: 'empty',
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
    child_process: 'empty',
  },
});

module.exports = environment;

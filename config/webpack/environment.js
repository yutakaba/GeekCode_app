// config/webpack/environment.js

const { environment } = require('@rails/webpacker');
const { VueLoaderPlugin } = require('vue-loader');
const vue = require('./loaders/vue');
const babelLoader = require('./loaders/babel');

babelLoader.exclude = [/node_modules\/monaco-editor/]

// Vue Loader の設定
environment.plugins.prepend('VueLoaderPlugin', new VueLoaderPlugin());
environment.loaders.prepend('vue', vue);
environment.loaders.prepend('babel', babelLoader);

// `vue` のエイリアスを設定
environment.config.set('resolve.alias', {
  'vue$': 'vue/dist/vue.esm.js'
});

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

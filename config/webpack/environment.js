const { environment } = require('@rails/webpacker');
const { VueLoaderPlugin } = require('vue-loader');
const vue = require('./loaders/vue');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

// Vue Loader の設定
environment.plugins.prepend('VueLoaderPlugin', new VueLoaderPlugin());
environment.loaders.prepend('vue', vue);

// mini-css-extract-plugin の設定
environment.plugins.prepend(
  'MiniCssExtractPlugin',
  new MiniCssExtractPlugin({
    filename: '[name].[contenthash].css',
    chunkFilename: '[id].[contenthash].css'
  })
);

environment.config.resolve.alias = {
  'vue$': 'vue/dist/vue.esm.js'
};

// 不要なNode.js関連の設定を削除
environment.config.delete('node.dgram');
environment.config.delete('node.fs');
environment.config.delete('node.net');
environment.config.delete('node.tls');
environment.config.delete('node.child_process');

// カスタム設定の削除
// environment.config.merge(customConfig); // この行を削除

module.exports = environment;

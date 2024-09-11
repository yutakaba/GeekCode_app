const { VueLoaderPlugin } = require('vue-loader');
const webpack = require('webpack');

module.exports = {
  mode: 'production',
  entry: './app/javascript/packs/application.js',
  output: {
    filename: 'bundle.js',
    path: __dirname + '/public/packs',
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
      },
      {
        test: /\.js$/,
        exclude: /node_modules\/monaco-editor/, // よりシンプルな記述に変更
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      },
      {
        test: /\.css$/,
        use: [
          'style-loader', // CSS を DOM に注入する
          'css-loader'   // CSS を JavaScript に変換する
        ]
      },
      {
        test: /\.(png|woff|woff2|eot|ttf|svg)$/,
        use: [
          {
            loader: 'file-loader', // ファイルを出力フォルダーにコピーする
            options: {
              name: '[name].[ext]',
              outputPath: 'fonts/'
            }
          }
        ]
      },
    ],
  },
  plugins: [
    new VueLoaderPlugin(),
    new webpack.ProvidePlugin({
      'hashFunction': 'sha256'
    })
  ],
  resolve: {
    alias: {
      vue: 'vue/dist/vue.esm-bundler.js',
    },
    extensions: ['.js', '.vue'],
  },
};

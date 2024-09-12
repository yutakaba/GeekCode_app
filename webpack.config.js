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
        exclude: /node_modules\/(?!monaco-editor)/,
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
          'style-loader', // CSSをDOMに注入する
          'css-loader'   // CSSをJavaScriptに変換する
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
  node: {
    __dirname: false,
    __filename: false,
    global: true // 必要に応じて変更
  },
};

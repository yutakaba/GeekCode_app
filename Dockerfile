# ベースイメージとして公式のRubyイメージを使用
FROM ruby:3.0.1

# 必要なパッケージのインストール
RUN apt-get update -qq && apt-get install -y nodejs postgresql-client

# ワークディレクトリの設定
WORKDIR /myapp

# ホストのファイルをコンテナにコピー
COPY Gemfile /myapp/Gemfile
COPY Gemfile.lock /myapp/Gemfile.lock

# BundlerでGemをインストール
RUN bundle install

# アプリケーションのソースコードをコピー
COPY . /myapp

# コンテナがリッスンするポート番号を指定
EXPOSE 3000

# データベースのセットアップとRailsサーバーの起動
CMD ["rails", "server", "-b", "0.0.0.0", "-p", "3000"]


ENV DB_HOST=db.example.com
ENV DB_USERNAME=myuser
ENV DB_PASSWORD=mypassword
ENV DB_NAME=mydatabase
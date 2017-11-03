---
title: Step 1. セットアップ
subtitle: "App Toolboxでアプリケーションを作成しよう"
---

<!-- toc -->

[Polymer App Toolbox][toolbox] は、Polymerを用いたプログレッシブウェブアプリ（PWA）構築のための、コンポーネント、ツール、テンプレートを集めたものです。

以下の説明に従って、プロジェクトのインストール、ビルド、デプロイをしていきましょう。App Toolboxテンプレートを使えば、15分とかかりません。

## Polymer CLIのインストール

Polymer CLIは、Polymerプロジェクトのためのオールインワン・コマンドラインツールです。本チュートリアルでは、Polymer CLIを使用して、プロジェクトの初期化、ローカルサーバーを起動しての確認、およびビルドを行っていきます。Polymer CLIは、lintチェックやテストにも使うことができますが、本チュートリアルではこれらのトピックは扱いません。

Polymer CLIは、Node.js、npm、Git、Bowerを必要とします。完全なインストール手順については、[the
Polymer CLI documentation](/{{{polymer_version_dir}}}/docs/tools/polymer-cli)をご覧ください。

下記コマンドで、Polymer CLIをインストールします：

    npm install -g polymer-cli


## テンプレートを用いたプロジェクトの初期化
1. 新しいプロジェクトフォルダを作成して開始します。

        mkdir my-app
        cd my-app

1. アプリケーションテンプレートを使用してプロジェクトを初期化します。

        polymer init

    下矢印キーを押し `polymer-2-starter-kit` がハイライトされたら、enter / return キーを押して選択します。


## プロジェクトをローカルサーバーで確認

App Toolboxテンプレートは、開発を始めるのに、ビルドする手順は必要としません。
Polymer CLIを使用してアプリケーションをローカルサーバーで確認することができ、ファイルの変更はブラウザを更新することによってすぐに表示されます。

下記コマンドで、プロジェクトをローカルサーバーで確認できます：

    polymer serve --open

## プロジェクトの構成

以下の図は、プロジェクト内のファイルとディレクトリの概要です。

```text
bower.json             # bower configuration
bower_components/      # app dependencies
images/
index.html             # main entry point into your app
manifest.json          # app manifest configuration
package.json           # npm metadata file
polymer.json           # Polymer CLI configuration
service-worker.js      # auto-generated service worker
src/                   # app-specific elements
  my-app.html            # top-level element
  my-icons.html          # app icons
  my-view1.html          # sample views or "pages"
  my-view2.html
  my-view3.html
  my-view404.html        # sample 404 page
  shared-styles.html     # sample shared styles
sw-precache-config.js  # service worker pre-cache configuration
test/                  # unit tests
```

## 次のステップ

アプリケーションは、今ローカル環境で稼働しています。次のステップでは、アプリケーションにページを追加する方法を学んでいきます。

<a class="blue-button"
    href="create-a-page">Next step: Create a page</a>

[toolbox]: /2.0/toolbox/
[md]: http://www.google.com/design/spec/material-design/introduction.html

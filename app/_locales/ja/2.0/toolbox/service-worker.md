---
title: Service Workerのプリキャッシュを使ったオフラインキャッシング
---

オフライン環境や不安定なネットワーク環境でより良いエクスペリエンスを提供するため、App Toolboxは*サービスワーカー*を利用することで、重要なリソースのオフラインキャッシュ機能を提供します。サービスワーカーは、特定のWebサイトに関連付けられたスクリプトであり、ネットワークリクエストに対するクライアントサイドでのプロキシとして機能します。サービスワーカーは、ネットワークリクエストをインターセプトし、ネットワーク越しにアクセスする代わりに、ブラウザのキャッシュへアクセスしてそのキャッシュからリクエストに応答します。

誰かが初めてサイトを開くと、ブラウザはそのサイトのサービスワーカーをインストールし、サービスワーカーが重要なリソースをキャッシュします。その後のサイト訪問時は、サービスワーカーはキャッシュからリソースを直接ロードできます。ユーザーが完全にオフラインの場合、サービスワーカーは引き続きサイトを読み込むことができ、必要に応じてキャッシュデータやオフラインメッセージを表示します。

サービスワーカーは、*app shellストラテジー*とうまく連携します。そこでは、アプリケーションのメインUIのビューとロジック(app shell)がキャッシュされるので、それらはキャッシュから提供されます。

App Toolboxでは、オフラインサポートのためにService Worker Precache(`sw-precache`)モジュールを使用します。このモジュールは、キャッシュするファイルのリストを受け取り、ビルド時にサービスワーカーを生成します。そのため独自にサービスワーカーのコードを記述する必要はありません。

サービスワーカーの背景、問題点、およびデバッグのヒントについては、Web Fundamentalsの[Introduction to Service Worker](https://developers.google.com/web/fundamentals/primers/service-worker/)を参照してください。

## 利用条件

サービスワーカーと連携させるには、アプリケーションをHTTPS上で提供する**必要があります**。ただし、ローカルシステム上ではあれば、SSL証明書を使用せずにサービスワーカーをテストすることができます。なぜなら`localhost`はセキュリティオリジンと見なされるからです。

## サービスワーカーの追加

サービスワーカーのプレキャッシュのサポート機能は[Polymer CLI](/{{{polymer_version_dir}}}/docs/tools/polymer-cli)に組み込まれており、サービスワーカーのスクリプトはアプリケーションのビルド時に自動的に生成されます。

ただし、サービスワーカーを利用するためには、サービスワーカーを登録するコードを追加する必要があります：

```js
// Register service worker if supported.
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/service-worker.js');
}
```

サービスワーカーを登録しても、サイトの初回のロード速度が向上することはありませんので、アプリケーションのロードが完了するまでその登録作業を遅延することができます。

## サービスワーカーの設定

ビルドコマンドにオプション設定ファイルを渡すことで、サービスワーカーのプレキャッシュに任意のオプションを指定できます。：

<code>polymer build --sw-precache-config <var>config-file</var>.json</code>

設定ファイルはJavaScriptファイルで、サービスワーカーのプレキャッシュでサポートされているオプション設定をエクスポートします。詳細は、`sw-precache`のREADMEの[Optionsパラメータ](https://github.com/GoogleChrome/sw-precache#options-parameter)を参照してください。

もし`--entrypoint`、`--shell`、`--fragment`引数を使ってリソースを識別した場合には、それらのファイルは`staticFileGlobs`パラメータに追加され、それらが確実にキャッシュされるようになります。

シングルページアプリケーション(SPA)を作成していて、それを完全にオフラインで動作させたい場合は、リクエストされたURLがキャッシュにない場合に提供される**フォールバック**ドキュメントを指定したいかもしれません。シングルページアプリケーション(SPA)の場合、一般的にはエントリポイントと同じものになります。[navigateFallback](https://github.com/GoogleChrome/sw-precache#navigatefallback-string)や[navigateFallbackWhitelist](https://github.com/GoogleChrome/sw-precache#navigatefallbackwhitelist-arrayregexp)パラメータを使用してフォールバックを設定してください。

以下の設定ファイルではいくつかの一般的なオプションを設定しています。これには、オフライン時に`/index.html`ファイルにフォールバックする処理も含まれています。

```js
module.exports = {
  staticFileGlobs: [
    '/index.html',
    '/manifest.json',
    '/bower_components/webcomponentsjs/webcomponents-lite.js',
    '/images/*'
  ],
  navigateFallback: '/index.html',
  navigateFallbackWhitelist: [/^(?!.*\.html$|\/data\/).*/]
}
```

ホワイトリストに一致したパスだけが`/index.html`へフォールバックされます。今回の例では、ホワイトリストには`.html`(HTMLインポート用)で終わるものと、パスに`/data/`が含まれるもの(動的に読み込まれたデータを指す)以外の全てのファイルが指定されています。

## 追加リソース

ライブラリはその他にも、動的に生成されたアプリケーションコンテンツの実行時におけるキャッシングなど、さまざまな機能をサポートしています。

ライブラリの詳細については、[Service Worker Precache入門](https://github.com/GoogleChrome/sw-precache/blob/master/GettingStarted.md)を参照してください。

サービスワーカーの背景については、Web Fundamentalsの[サービスワーカーの紹介](https://developers.google.com/web/fundamentals/primers/service-worker/)を参照してください。

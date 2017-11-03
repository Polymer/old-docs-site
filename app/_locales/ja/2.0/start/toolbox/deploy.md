---
title: Step 4. デプロイ
subtitle: "App Toolboxでアプリケーションを作成しよう"
---

<!-- toc -->

本ステップでは、これまで作成したアプリケーションをWebにデプロイしていきます。

## デプロイビルド

`polymer build`とコマンドを入力を行い、Polymerアプリケーションをビルドし製品版となるファイルを作成します。

異なる機能を持つブラウザ毎に、それぞれ異なるアプリケーションビルドを提供することができます。Polymer Starter Kitは、3つのビルドを作成するように構成されています：

* service workerがバンドルされたminifyビルド。オールドブラウザとの互換性を考慮しEC5でのコンパイル。
* service workerがバンドルされたminifyビルド。ES6コードはそのまま提供。ES6対応ブラウザ向けビルド。
* service workerがバンドルされないminifyビルド。ES6コードはそのまま提供。 HTTP/2 push対応ブラウザ向けビルド。

本手順では、バンドルされたコンパイル済ビルド（`es5-bundled`）をデプロイし、最大限の互換性を確保します。
それ以外のビルドをサーバーへデプロイする場合は、より複雑なセットアップが必要となります。

ビルド設定は、プロジェクトルートフォルダに存在する設定ファイル`polymer.json`内の`builds`オブジェクトで行われています：

polymer.json { .caption}
```
...
"builds": [
  {
    "preset": "es5-bundled"
  },
  {
    "preset": "es6-bundled"
  },
  {
    "preset": "es6-unbundled"
  }
]
...
```

ビルドは`build/`フォルダのサブフォルダへ、次のように出力されます：

    build/
      es5-bundled/
      es6-bundled/
      es6-unbundled/

カスタムビルドを設定するには、コマンドラインオプションを使用するか、`polymer.json`を編集します。使用可能なオプションと、最適化の全項目については、`polymer help build`コマンドを実行してください。また、次のドキュメントも参照してみてください。[polymer.json specification](https://www.polymer-project.org/2.0/docs/tools/polymer-json)、[building your Polymer application for production](https://www.polymer-project.org/2.0/toolbox/build-for-production)。

## サーバーにデプロイ

Polymerのアプリケーションは、どのWebサーバーにもデプロイできます。

本テンプレートでは、`<app-location>`要素を使用してURLベースのルーティングを有効にします。
そのためには、サーバーが、エントリーポイントである`index.html`を全てのルートに対して提供する必要があります。

下のセクションのいずれかを実行すると、このアプリケーションを[Google AppEngine](https://cloud.google.com/appengine)または[Firebase Static Hosting](https://www.firebase.com/docs/hosting/)にデプロイすることができます。これは、Polymerアプリケーションをデプロイするための無料でセキュアな方法です。他のホスティングプロバイダにおいても同様の手順でのデプロイとなります。

### AppEngine によるデプロイ

1.  [Google App Engine SDK](https://cloud.google.com/appengine/downloads)をダウンロードし、ご使用のプラットフォームの手順に従ってインストールします。本チュートリアルでは、Python SDKを使用します。

1.  [AppEngine アカウントに登録します](https://cloud.google.com/appengine)。

1.  [プロジェクトダッシュボードを開き](https://console.cloud.google.com/iam-admin/projects)
、新しいプロジェクトを作成します。

    * [プロジェクトの作成]ボタンをクリックします。
    * プロジェクト名を入力します。
    * [作成]ボタンをクリックします。
    
    App Engineは、プロジェクトの名前に基づいてプロジェクトIDを提供します。
    このIDを書き留めておきます。

1.  `cd`コマンドを使って、アプリのメインフォルダ（たとえば、`my-app/`）に移動します。

1.  次の内容の`app.yaml`ファイルを作成します：

    ```
    runtime: python27
    api_version: 1
    threadsafe: yes

    handlers:
    - url: /bower_components
      static_dir: build/es5-bundled/bower_components
      secure: always

    - url: /images
      static_dir: build/es5-bundled/images
      secure: always

    - url: /src
      static_dir: build/es5-bundled/src
      secure: always

    - url: /manifest.json
      static_files: build/es5-bundled/manifest.json
      upload: build/es5-bundled/manifest.json
      secure: always

    - url: /service-worker.js
      static_files: build/es5-bundled/service-worker.js
      upload: build/es5-bundled/service-worker.js
      secure: always

    - url: /.*
      static_files: build/es5-bundled/index.html
      upload: build/es5-bundled/index.html
      secure: always
    ```

1. プロジェクトIDを、App Engineによってアプリケーションに与えられたIDに設定します。以下は一例です：
   
       gcloud config set project my-app-164409

1. アプリケーションを作成します：
   
       gcloud app create
     
   アプリケーションをデプロイする地域を選択する必要がありますが、これは変更できません。
   
1. アプリケーションをデプロイします：
   
       gcloud app deploy

1. アプリケーションは、指定されたURLにてオンラインで利用できるようになります。以下はURLの一例です：
   
       https://my-app-164409.appspot.com/new-view
   
   以下のコマンドを入力すると、アプリケーションのURLが指定されブラウザが起動します：
   
       gcloud app browse

### Firebase によるデプロイ

以下の手順は、[Firebase hosting quick start guide](https://www.firebase.com/docs/hosting/quickstart.html) に基づいています。

1.  [Firebase アカウントに登録します](https://www.firebase.com/signup/)。

1.  [https://www.firebase.com/account](https://www.firebase.com/account) へ遷移し、新しいアプリケーションを作成します（訳注：[プロジェクトを追加]から新規プロジェクトを作成します）。アプリケーションに関連付けられているプロジェクトIDを書き留めます。

    ![Welcome to Firebase showing Project ID](/images/2.0/toolbox/welcome-firebase.png)

1.  Firebaseコマンドラインツールをインストールします。

        npm install -g firebase-tools

1.  `cd`コマンドを使って、プロジェクトフォルダに移動します。

1.  Firebaseアプリケーションを初期化します。

        firebase login
        firebase init

1.  Firebaseは、アプリケーションに関連付けられているプロジェクトを尋ねてきます。既に作成済のプロジェクトから一つを選択します。

1.  Firebaseはアプリケーションのパブリックフォルダ名を尋ねてきます。`build/es5-bundled/`と入力しenterキーを押します。

1.  firebaseの設定を編集し、URLルーティング情報を追加します。最終的な`firebase.json`ファイルは、次のようになります：
	
    ```
    {
      "hosting": {
        "public": "build/es5-bundled/",
        "rewrites": [
          {
            "source": "**/!(*.*)",
            "destination": "/index.html"
          }
        ]
      }
    }
    ```	

    この設定によって、Firebaseは、ファイル拡張子で終わらないURLに対して、`index.html`を表示するようになります。

1. プロジェクトをデプロイします。
   
       firebase deploy
   
   サイトのURLが出力画面に表示されます。`firebase open hosting:site`コマンドを実行して、デフォルトブラウザにてサイトを表示することもできます。


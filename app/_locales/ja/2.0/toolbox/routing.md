---
title: Routing with <app-route>
---

<!-- toc -->

クライアントサイドにおけるルーティングのために、App Toolboxは、[`<app-route>`](https://www.webcomponents.org/element/PolymerElements/app-route)エレメントを使用して_モジュラールーティング_を提供します。_モジュラールーティング_ とは、アプリケーションのすべてのルートに対して中央リポジトリを用意するのではなく、個々のコンポーネントはルートの一部を管理し、残りを他のコンポーネントに管理を委譲することを意味します。

**なぜモジュラールーティングなのか？** `<app-route>`と*モジュラールーティング*の背景については、[Encapsulated routing with elements](/blog/routing)を参照してください。
{.alert .alert-info}

## app-routeのインストール

Bowerを使って`app-route`パッケージをインストールします。：

    bower install --save PolymerElements/app-route

## ルーティングの追加

初めにすべきことは、あなたのアプリのルートがどのようにエレメントにマップされるか決めることです。例えば、いくつかのメインビューを持つアプリケーションがあるとしましょう。：

| View | Route |
| :--- | :---- |
| User profile view | <code>/profile/<var>:user_id</var></code> |
| Message list | <code>/messages</code> |
| Message view | <code>/detail/<var>:message_id</var></code> |

メインのアプリケーションエレメントと、タブごとに分割されたビューコンポーネントがあったとします。アプリケーションエレメントがトップレベルのルートを管理(表示するビューの一つを選択)し、残りのルートの管理をアクティブなビューに委譲します。`app`エレメントのテンプレートには次のようなマークアップが含まれるでしょう。：

```
<!-- app-location binds to the app's URL -->
<app-location route="{{route}}"></app-location>

<!-- this app-route manages the top-level routes -->
<app-route
    route="{{route}}"
    pattern="/:view"
    data="{{routeData}}"
    tail="{{subroute}}"></app-route>
```

`<app-location>`エレメントは双方向データバインディングを提供する単なる`window.location`のプロキシです。一つの`<app-location>`エレメントが、トップレベルの`<app-route>`エレメントとURLバーのステータスをバインドします。

`<app-route>`エレメントは、現在の`route`と`pattern`（`:view`部分はパラメータを表します）の照合を行います。パターンに一致すると、ルートはアクティブになり、すべてのURLパラメータが`data`オブジェクトに追加されます。今回の例でいうと、パス`/profile/tina`はトップレベルのルートと一致し、`routeData.view`が`profile`に設定されます。残りのルート（`/tina`）が`tail`になります。

ルートに基づき、アプリは`<iron-pages>`を使って表示するビューを選択できます：

```
<!-- iron-pages selects the view based on the active route -->
<iron-pages selected="[[routeData.view]]" attr-for-selected="name">
  <my-profile-view name="profile" route="{{subroute}}"></my-profile-view>
  <my-message-list-view name="messages" route="{{subroute}}"></my-message-list-view>
  <my-detail-view name="detail" route="{{subroute}}"></my-detail-view>
</iron-pages>
```

仮に、現在のURLが`/profile /tina`の場合、ルートが`/tina`に設定された`<my-profile-view>`エレメントが表示されます。このビューには、ルートを処理のため独自の`<app-route>`が組み込まれています。例えば、ユーザーデータをロードする場合には：

```
<app-route
    route="{{route}}"
    pattern="/:user_id"
    data="{{routeData}}"></app-route>
<iron-ajax url="{{_profileUrlForUser(routeData.user_id)}}"
           on-response="handleResponse" auto>
```


## Routeオブジェクト

`route`オブジェクトには二つのプロパティがあります。：

-   `prefix`：上位の`<app-route>`エレメントでマッチしたパス。トップレベルの`<app-route>`エレメントの場合、`prefix`は常に空の文字列になります。
-   `path`：`route`オブジェクトが照合しているパス。
 
`tail`オブジェクトは、ルート内の次の`<app-route>`に渡すルートを表す`route`オブジェクトでもあります。

例えば、現在のURLが`/users/bob/messages`で、トップレベルの`<app-route>`のパターンが`/users/:user`の場合：

`route`オブジェクトは、：

    {
      prefix: '',
      path: '/users/bob/messages'
    }

`tail`オブジェクトは、：

    {
      prefix: '/users/bob',
      path: '/messages'
    }

また、`routeData`オブジェクトは、：

    {
      user: 'bob'
    }

## ルートの変更

`<app-route>`を使用した場合、現在のURLを変更するには二つの方法があります。

-   リンク：リンクをクリックすると、`<app-location>`はナビゲーションイベントをインターセプトし、その`route`プロパティを更新します。主要なナビゲーションにリンクを使用するのは良い考えです。なぜなら、検索エンジンがインデックスを作成する際にアプリケーションの構造の把握に役立つためです。

-   ルートの更新：`route`オブジェクトは読み書き可能なので、双方向データバインディングまたは`this.set`を使用してルートを更新できます。 `route`と`routeData`の両方のオブジェクトはこれらの方法で操作できます。例えば：

    `this.set('route.path', '/search/');`

    Or:

    `this.set('routeData.user', 'mary');`

## ルート変更に応じたアクション

前のセクションでは、ルートとそのデータへのデータバインディングを示しましたが、ルートが変化した際に特定のコードを実行する必要があるかもしれません。オブザーバーを使用すれば、ルートやデータの変更に応た処理を行うことが可能です。：

Rルートオブザーバーの例 {.caption}

```
static get observers() {
  return [
    '_routeChanged(route.*)',
    '_viewChanged(routeData.view)'
  ]
}

_routeChanged(changeRecord) {
  if (changeRecord.path === 'path') {
    console.log('Path changed!');
  }
}
_viewChanged(view) {
  // load data for view
}
```

## 参考情報

-   [Encapsulated routing with elements](/blog/routing)
-   [`<app-route>`
    API reference](https://www.webcomponents.org/element/PolymerElements/app-route)

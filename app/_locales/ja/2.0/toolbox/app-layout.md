---
title: Responsive app layout
---

<!-- toc -->

どんなアプリケーションにもレイアウトが必要です。`app-layout`エレメントは、レスポンシブなレイアウトを簡単に作成するツールを提供します。

前世代のMaterial Designベースのレイアウトエレメント（`paper-header-panel`や`paper-drawer-panel`など）を使って開発していた場合、`app-layout`エレメントはかなり手軽に感じるはずです。これらのエレメントは次のように設計されています。：

- より柔軟で簡易な構築ー幅広いレイアウトパターンをサポートしています。
- より自由にーこれらのエレメントが特定のルック・アンド・フィールを強制することはありません。（ただし、Materila DesignのエフェクトやUIパターンは必要に応じてサポートします）。
- 拡張可能ースクロールエフェクト用に簡易にプラグインできるシステムを新たに採用しました。

## デザインのレイアウト

レイアウトを構築する前に、そのレイアウトを設計する必要があります。

-   コンテンツに合わせてスクロールする単純なアプリケーションヘッダーが必要ですか？または手の込んだスクロールエフェクトを使った折りたたみ式ヘッダーが必要ですか？
-   ユーザーはあなたのアプリ内をどのように移動するでしょうか？タブでしょうか？サイドメニューでしょうか？
-   小さな画面上でアプリケーションのレイアウトはどのように変化するでしょうか？

実装しようとしているデザインのモックアップがすでにあるかもしれません。あるいはあなたが独自にデザインしているかもしれません。必要なものが正確にわからない場合は、アイディアの出発点として、すでに作成されたアプリのレイアウトのテンプレートを参考にできます。：

- [Simple landing page](https://polymerelements.github.io/app-layout/templates/landing-page/)：ヘッダーの付いたシンプルなランディングページです。ページの上部にあるタブでページ内のセクションを移動します。このページの基本的なレイアウトは、すべての画面サイズで同じになります。
- [Getting started](https://polymerelements.github.io/app-layout/templates/getting-started/)：シンプルなヘッダーとレスポンシブなドロワーを備えた基本的なレイアウトです。
- [ZUPERKULBLOG](https://polymerelements.github.io/app-layout/templates/publishing/)：基本的なブログスタイルのレイアウトです。Getting startedに似ていますが、ヘッダーは固定されています。
- [Shrine](https://polymerelements.github.io/app-layout/templates/shrine/)：さまざまなパターンを実装したeコマーススタイルのサイトです。幅の狭い画面上では、タブナビゲーションがドロワーナビゲーションに置き換わったり、下にスクロールした場合マルチツールバーがシングルツールバーに変形したりします。

基本的なデザインを決めたら、実装を開始することができます。画面の上部のツールバーとヘッダーから始めましょう。


## ツールバーとヘッダー

ほとんどすべてのアプリには、上部にヘッダーやツールバーがあります。ヘッダーはコンテンツとともにスクロールしたり、画面の上部に固定したり、あるいはユーザーのスクロールに応じて動的な振る舞いを実装することもできます。必要なエレメントは、期待するものによって異なります。：

-   コンテンツとともにスクロールする単純なヘッダーが必要な場合、`<app-toolbar>`エレメントをそのまま利用できます。`<app-toolbar>`は、コントロールとラベル用のシンプルな水平のコンテナです。複数行のコントロールが必要な場合には、複数のツールバーを使用するだけです。

-   スクロールエフェクト（ユーザーがスクロールするとサイズを変化するようなヘッダー）が必要な場合、`<app-header>`エレメントが必要です。`<app-header>`は一つ以上のツールバーを保持でき、スクロールエフェクトを管理します。

### シンプルなツールバー

ツールバーそのものは、ページコンテンツに合わせてスクロールするシンプルなヘッダーとして機能します。CSSを少し追加するだけで、ページの上部に固定することもできます。次の[サンプル](http://jsbin.com/haroru/edit?html,output)では、​​ツールバーをシンプルなタイトル付きスクロールヘッダーとして利用しています。

`index.html` { .caption }

```
  <head>
    <!-- import latest release version of all components from polygit -->
    <base href="https://polygit.org/components/">
    <script src="webcomponentsjs/webcomponents-lite.js"></script>
    <link rel="import" href="app-layout/app-toolbar/app-toolbar.html">

    <!-- sample-content included for demo purposes only -->
    <link rel="import" href="app-layout/demo/sample-content.html">

    <custom-style>
      <style>
        body {
          /* No margin on body so toolbar can span the screen */
          margin: 0;
        }
        app-toolbar {
          /* Toolbar is the main header, so give it some color */
          background-color: #1E88E5;
          font-family: 'Roboto', Helvetica, sans-serif;
          color: white;
          --app-toolbar-font-size: 24px;
        }
      </style>
    </custom-style>
  </head>
  <body>
    <app-toolbar>
      <div main-title>Spork</div>
    </app-toolbar>
    <sample-content size="10"></sample-content>
  </body>
```

![screenshot of a simple app-toolbar](/images/1.0/toolbox/simple-toolbar.png)

ツールバーは水平なフレックスボックスコンテナなので、通常のフレックスボックスのルールに従い、子のレイアウトを調整できます。`main-title`という属性を持つ子は自動的にフレキシブルにスタイリングされ、コンテナ内の余ったスペースを埋めるように配置されます。タイトルの両側にボタンやアイコンを追加すると、自動的にツールバーの両側にプッシュされます。：

```
  <app-toolbar>
    <paper-icon-button icon="menu"></paper-icon-button>
    <div main-title>Spork</div>
    <paper-icon-button icon="search"></paper-icon-button>
  </app-toolbar>
```

![screenshot of a simple app-toolbar with a menu and search buttons](/images/1.0/toolbox/toolbar-with-buttons.png)


### ダイナミックヘッダー

`<app-header>`エレメントは、スクロールエフェクトに対応するコンテナです。アプリのヘッダーにはあらゆる種類のエレメントを配置することができますが、最も一般的な子はツールバーとタブバーでしょう。複数行をコントロールする場合は複数のツールバーを使用します。

デフォルトでは、シンプルなツールバーとちょうど同じようにページを下にスクロールするとヘッダーも画面外へスクロールされます。ヘッダーに以下の属性を追加することで、デフォルトの動作を変更できます。：

- `fixed`：固定(fixed)ヘッダーとして画面の上部に配置されたままになります。
- `reveals`：リビーリング(revealing)ヘッダーは、ページをどんなに下までスクロールしていたとしても、上に向かってスクロールを開始するとすぐにヘッダーが表示されます。
- `condenses`：コンデンシング(condensing)ヘッダーは通常のヘッダーより高さがありますが、スクロールすると縦に縮みます。コンデンシングヘッダーはたいてい複数のツールバー/タブバーを持ち、どれかひとつ(stickyエレメント)が常時表示されることになります。このモードは、固定ヘッダーやリビーリングヘッダーと組み合わせることもできます。


### コンデンシングヘッダー

複数のツールバーを持つコンデンシングヘッダを使用する場合、次の二つの基本的な方法を選択できます。：

(訳注：以下の文章による説明は分かりづらいので適宜イメージ画像や[デモページ](https://polymerelements.github.io/app-layout/templates/test-drive/)を参照してください。)

-   複数のツールバーはすべて画面上に留まりますが、他のツールバーの上部に畳こむ(collapse)ように納まります。ツールバーのコンテンツが、重なり合わないようにずらす必要があります。（[Material Design](https://material.io/guidelines/patterns/scrolling-techniques.html#)のガイドラインでは、このパターンを「フレキシブルスペース(flexible space)」と呼び、一つ以上のスクロールエフェクトと組み合わされることが多いです。）

    ![screenshot of an expanded, tall, app-toolbar with a menu and shop button, and titled My App](/images/1.0/toolbox/collapsing-headers-open.png)
    ![screenshot of the same toolbar collapsed to a regular, smaller size, with the same title and buttons](/images/1.0/toolbox/collapsing-headers-closed.png)

-   一番上のツールバーはスクリーンの外へ追い出され、下のツールバーが画面上に残ります。（[Material Design](https://material.io/guidelines/)のパターンでは、通常この下のツールバーはタブバーまたは検索バーになります）。

    ![screenshot of an expanded, tall app-toolbar with a back and shop buttons, titled Spork. Below it are three tabs, labelled food, drink, life](/images/1.0/toolbox/spork-tabs-tall.png)
    ![screenshot of the same app-toolbar, but with the title and the buttons gone, and only with the 2 tabs visible](/images/1.0/toolbox/spork-tabs-condensed.png)


セット内の特定ツールバーが、`sticky`として識別されます。ページをスクロールすると、stickyツールバーより上のツールバーは画面外へスクロールされます。stickyツールバーに指定するには、`sticky`属性を設定します。`sticky`属性を持つツールバーがない場合、`<app-header>`の最初の子がstickyになります。

```
  <app-header fixed condenses effects="waterfall">
    <app-toolbar>
      <paper-icon-button icon="menu"></paper-icon-button>
      <div main-title></div>
      <paper-icon-button icon="shopping-cart"></paper-icon-button>
    </app-toolbar>
    <app-toolbar></app-toolbar>
    <app-toolbar>
      <div spacer main-title>My App</div>
    </app-toolbar>
  </app-header>
```

ここでは、最初のツールバー（アイコンボタン付き）がstickyです。他のツールバーが上にずり上がっても画面に残り、重なったツールバーの最上部に表示されます。タイトルの`spacer`属性によって、タイトルの左に`padding`が追加され、ツールバーの左側にあるメニューボタンに重なり合うことはありません。

コンデンシングヘッダの初期の高さは自然に決まります。（つまり、CSSで明示的に高さが設定されていない限り、その内容の高さになります）。そしてstickyエレメントの高さを下限として縮められていきます。

タブバーだけを残したい場合には、タブバーを最後に置き、`sticky`としてマークします。

```
  <app-header id="header" effects="waterfall" fixed condenses>
    <app-toolbar>
      <paper-icon-button icon="arrow-back"></paper-icon-button>
      <div main-title>Spork</div>
      <paper-icon-button icon="shopping-cart"></paper-icon-button>
    </app-toolbar>
    <paper-tabs selected="0" sticky>
      <paper-tab>Food</paper-tab>
      <paper-tab>Drink</paper-tab>
      <paper-tab>Life</paper-tab>
    </paper-tabs>
  </app-header>
```

### スクロールエフェクト

ほとんどのスクロールエフェクトは、コンデンシングヘッダーと一緒に使われます。これらのエフェクトは、ヘッダーが縮む際の見た目を変化させます。

唯一の例外は、固定ヘッダーに必要なウォーターフォールエフェクトですが、`condenses`属性の有無に関わらず利用することができます。このエフェクトは、ユーザーがスクロールを開始すると、ヘッダーがコンテンツの上に浮かんだように見えるようになり、コンテンツがその下をスクロールしていきます。 it.

```
  <app-header fixed effects="waterfall">
    <app-toolbar>
      <div main-title>App name</div>
    </app-toolbar>
  </app-header>
```

全てのスクロールエフェクトを含む、さまざまなヘッダーオプションを試すには、デモページをご覧ください。：
:

<a href="https://polymerelements.github.io/app-layout/templates/test-drive/" class="blue-button">
  Launch Test Drive Demo
</a>

利用可能なスクロールエフェクトのリストについては、[`<app-header>`のリファレンス](https://www.webcomponents.org/element/PolymerElements/app-layout/app-header)を参照してください。独自のスクロールエフェクトを作成する方法については、[AppScrollEffectsBehaviorのリファレンス](https://www.webcomponents.org/element/PolymerElements/app-layout/Polymer.AppScrollEffectsBehavior)を参照してください。

さらなる背景を知りたい場合、様々なスクロールエフェクトの違いについて解説したMaterial Desing仕様の[スクロールテクニック](https://www.google.com/design/spec/patterns/scrolling-techniques.html)を参照してください。

### ドキュメントスクローラーとエレメントスクローラー

`<app-header>`エレメントは、デフォルトでドキュメントスクローラーを使用します。モバイルブラウザでは、ブラウザがページを下にスクロールする際URLバーを非表示にすることができます。しかし、ドキュメントスクローラーは一つしかないので、コンテンツページを切り替える場合は、アプリは各ページのスクロール位置を管理する必要があります。

**複数のスクロール付きビューを管理する。**`<iron-pages>`のような手段を使ってビューを切り替える場合、[`<app-scroll-position>`](https://www.webcomponents.org/element/PolymerElements/app-layout/app-scroll-position)を利用して各ビューのスクロール位置を記録できます。利用例については、APIドキュメントを参照してください。なお、2.0のリリースに伴い`<app-scrollpos-control>`が`<app-scroll-position>`に改名されています。
{.alert .alert-info}

`<app-header>`に`scrollTarget`プロパティを指定することで、**エレメントの**スクローラーを使用することができます：

```
  <div id="scrollingRegion" style="overflow-y: auto;">
    <app-header scroll-target="scrollingRegion">
    </app-header>
  </div>
```

これは、ドロワーのように、サイドパネル上でヘッダースクロールのエフェクトを利用したい場合に便利です。

### ヘッダーレイアウト

[`<app-header-layout>`](https://www.webcomponents.org/element/PolymerElements/app-layout/app-header-layout)エレメントは、`<app-header>`ベースのレイアウトをまとめ上げる簡単な方法です。このエレメントは、コンテンツの周りに必要なパディングを確保してくれるので、コンテンツがヘッダーによって隠れてしまうといったことがなくなります。

使用するには、`<app-header>`といくつかのコンテンツを`<app-header-layout>`の中に置きます。.

```
  <app-header-layout>
    <app-header fixed condenses effects="waterfall" slot="header">
      <app-toolbar>
        <div main-title>App name</div>
      </app-toolbar>
    </app-header>
    <div>
      <!-- content goes here -->
    </div>
  </app-header-layout>
```

Polymer 2.0のApp Layoutでは、`slot="header"`を指定する必要があります。
{.alert .alert-info}

デフォルトでは、レイアウトにドキュメントスクロールを使用します。ページ全体をスクロールしたくない場合は、[APIドキュメント](https://www.webcomponents.org/element/PolymerElements/app-layout/app-header-layout)に示されているように、レイアウトで独自のスクロール領域を定義することができます。

## ドロワー

[`<app-drawer>`](https://www.webcomponents.org/element/PolymerElements/app-layout/app-drawer)エレメントは、画面の左右に配置可能なドロワーです。

```
<app-drawer>
  <paper-menu selected="0">
    <paper-item>Item One</paper-item>
    <paper-item>Item Two</paper-item>
    <paper-item>Item Three</paper-item>
  </paper-menu>
</app-drawer>
```

ドロワーを開閉する方法はいくつかあります。：

-   閉じられたドロワーをスワイプで開く。画面の端でスワイプジェスチャーを検知してドロワーを開くには、[swipeOpen](https://www.webcomponents.org/element/PolymerElements/app-layout/app-drawer#property-swipeOpen)を`true`に設定します。
-   ドロワーをドラッグして半分程度まで閉じれ(開け)ば、ドロワーはそのままひとりでに閉じます(開きます)。高速にスワイプ（フリックまたはスワイプ）した場合も同様の効果があり、ジェスチャーが半分に満たなくても開閉します。
-   [open](https://www.webcomponents.org/element/PolymerElements/app-layout/app-drawer#method-open)、[close](https://www.webcomponents.org/element/PolymerElements/app-layout/app-drawer#method-close)、または[toggle](https://www.webcomponents.org/element/PolymerElements/app-layout/app-drawer#method-toggle)を呼び出すことで、ドロワーをプログラムによって開閉します。あるいは、[opened](https://www.webcomponents.org/element/PolymerElements/app-layout/app-drawer#property-opened)プロパティにバインドします。
-   スワイプ/フリングジェスチャーを無効にする`persistent`プロパティを設定することで、ドロワーを固定サイドバー(persistent sidebar)として機能させることができます。

ドロワーは分割されたコンポーネントなので、さまざまな方法で組み立てることができます。例えば：

-   ドロワーの高さをフルサイズにする場合、ドロワーを`app-header-layout`の外側に配置するか、`app-drawer-layout`内に`app-header-layout`をラップします。
-   ヘッダーの下でドロワーを開く場合、ドロワーまたは`app-drawer-layout`を`app-header-layout`内に配置します。

### ドロワーのスタイリング

`--app-drawer-content-container`ミックスインを使用して、ドロワーのスタイルを設定できます。例えば、背景を設定したり、枠線や影を付けることでドロワーの端を明確にすることができます。

レスポンシブなドロワーが開いているとき、画面の残りの部分は背景幕(backdrop)またはスクリム(scrim)で覆われます。スクリムの背景をカスタムプロパティ`--app-drawer-scrim-background`で設定します。デフォルトのスクリムの背景は、半透明の灰色です。

次のCSSでは、影付きの枠線がドロワーに追加され、色付きのスクリムが設定されます。

```
  app-drawer {
    --app-drawer-content-container: {
      box-shadow: 1px 0 2px 1px rgba(0,0,0,0.18);
    }
    --app-drawer-scrim-background: rgba(179, 157, 219, 0.5);
  }
```

### ドロワーのレイアウト

[`<app-drawer-layout>`](https://www.webcomponents.org/element/PolymerElements/app-layout/app-drawer-layout)エレメントは、一つのドロワーを使用してレスポンシブなレイアウトを作成します。より広い画面では、ドロワーはデフォルトで固定サイドバーとして機能します。サイドバーは常に表示され、スワイプとフリングジェスチャーは無効になります。

ドロワーにトグルボタンを追加するには、`<app-drawer-layout>`の子孫の一つとして`drawer-toggle`属性を持つエレメントを配置します。通常、ドロワーのトグルボタンは、アプリケーションの特定のツールバーの内側に配置します。lbars.

Polymer 2.0のApp Layoutでは、ドロワーが固定された(persistent)場合であっても、`drawer-toggle`エレメントが自動的に非表示にならなくなりました。`drawer-toggle`を非表示にしたい場合、`app-drawer-layout`の`narrow`属性の有無に基づいてスタイルを適用できます。(例：`app-drawer-layout：not（[narrow])``[drawer-toggle] {display：none;}`)
{.alert .alert-info}

`<app-header-layout>`を`<app-drawer-layout>`内にネストすることで、ドロワーとヘッダーを含むレスポンシブなレイアウトを作成できます。

```
  <app-drawer-layout>

    <app-drawer slot="drawer">
      <app-toolbar>Getting Started</app-toolbar>
    </app-drawer>

    <app-header-layout>

      <app-header reveals effects="waterfall" slot="header">
        <app-toolbar>
          <paper-icon-button icon="menu" drawer-toggle></paper-icon-button>
          <div main-title>Title</div>
        </app-toolbar>
      </app-header>

      <div>Content goes here</div>

    </app-header-layout>

  </app-drawer-layout>
```

App Layout 2.0では、`slot="drawer"`を指定する必要があります。
{.alert .alert-info}

## レスポンシブなナビゲーションパターン

多くのケースにおいては、画面サイズに基づいてナビゲーションを切り替えたいかもしれません。汎用的なパターンの一つは、デスクトップ上でナビゲーションタブを使用します。これは、[Shopアプリ](https://shop.polymer-project.org/)のように、モバイル上ではナビゲーションドロワーに置き換えられます。

![screenshot of a nav menu with 5 tabs, displayed horizontally, labelled "item one" through "item four"](/images/1.0/toolbox/app-layout-responsive-nav-tabs.png)
![screenshot of the same menu displayed vertically, after being open from a mobile drawer button ](/images/1.0/toolbox/app-layout-responsive-nav-drawer.png)

このパターンは、いくつかの`app-layout`エレメントを使うことで実現できます。タブとドロワーのナビゲーションの切り替えはデータバインディングを利用します。

[変形するナビゲーションのデモ](https://polymerelements.github.io/app-layout/patterns/transform-navigation/)では、このこのような変形の簡単なバージョンが紹介されています。

```
  <!-- force-narrow prevents the drawer from ever being displayed
       in persistent mode -->
  <app-drawer-layout force-narrow>

    <app-drawer id="drawer" slot="drawer">

      <!-- an empty toolbar in the drawer looks like a
           continuation of the main toolbar. It's optional. -->
      <app-toolbar></app-toolbar>

      <!-- Nav on mobile: side nav menu -->
      <paper-menu selected="{{selected}}" attr-for-selected="name">
        <template is="dom-repeat" items="{{items}}">
          <paper-item name="{{item}}">{{item}}</paper-item>
        </template>
      </paper-menu>

    </app-drawer>

    <app-header-layout>
      <app-header class="main-header" slot="header">

        <app-toolbar>
          <!-- drawer toggle button -->
          <paper-icon-button class="menu-button" icon="menu" drawer-toggle hidden$="{{wideLayout}}"></paper-icon-button>
        </app-toolbar>

        <app-toolbar class="tabs-bar" hidden$="{{!wideLayout}}">
          <!-- Nav on desktop: tabs -->
          <paper-tabs selected="{{selected}}" attr-for-selected="name" bottom-item>
            <template is="dom-repeat" items="{{items}}">
              <paper-tab name="{{item}}">{{item}}</paper-tab>
            </template>
          </paper-tabs>
        </app-toolbar>

      </app-header>
    </app-header-layout>

  </app-drawer-layout>

  <iron-media-query query="min-width: 600px" query-matches="{{wideLayout}}"></iron-media-query>
```

<a href="https://polymerelements.github.io/app-layout/patterns/transform-navigation/" class="blue-button">Launch Demo</a>

<a href="https://github.com/polymerelements/app-layout/blob/master/patterns/transform-navigation/x-app.html" class="blue-button">View full source</a>

[Shopアプリ](https://shop.polymer-project.org/)では、このパターンのやや洗練されたバージョンを使用しています。条件付きテンプレート(dom-if)を使用することで、ナビゲーションエレメントが必要とされるまで生成しないようにしています。つまり、モバイル環境で実行しているときにはタブを生成しなくて済みます。

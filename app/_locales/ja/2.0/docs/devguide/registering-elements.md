---
title: 要素の定義
---

<!-- toc -->


## カスタム要素の定義{#register-element}


カスタム要素を定義するには、`Polymer.Element`の拡張クラスを作成し、そのクラスを`customElements.define`メソッドに渡します。

仕様では、カスタム要素名は、**小文字のASCII文字で始まり、ダッシュ(-)を含まなければなりません。**

例: { .caption }

```
// define the element's class element
class MyElement extends Polymer.Element {

  // Element class can define custom element reactions
  connectedCallback() {
    super.connectedCallback();
    console.log('my-element created!');
  }

  ready() {
    super.ready();
    this.textContent = 'I\'m a custom element!';
  }
}

// Associate the new class with an element name
customElements.define('my-element', MyElement);

// create an instance with createElement:
var el1 = document.createElement('my-element');

// ... or with the constructor:
var el2 = new MyElement();
```

上記の通り、[カスタム要素のライフサイクル](custom-elements#element-lifecycle)で説明したように要素のクラスにはカスタム要素のリアクションとしてコールバックを定義することができる。

## 既存の要素を拡張 {#extend-element}

ES6ではネイティブに提供されるサブクラス化の仕組みを活用することで、ES6の構文を使って定義済みの既存の要素を拡張したりカスタマイズしたりすることができます。：

```js
// Subclass existing element
class MyElementSubclass extends MyElement {
  static get is() { return 'my-element-subclass'; }
  static get properties() { ... }
  constructor() {
    super();
    ...
  }
  ...
}

// Register custom element definition using standard platform API
customElements.define(MyElementSubclass.is, MyElementSubclass);
```

For more information on extending elements, see [Extending other elements](custom-elements#extending-elements)
in Custom element concepts.

サブクラスにテンプレートを指定しない場合、デフォルトでスーパークラスのテンプレートが継承されます。この動作をオーバーライドしたり、スーパークラスのテンプレートを変更したりするには、サブクラスの`template`のgetterメソッドをオーバーライドします。

## Using mixins

You can share code using _mixins_. You use a mixin to add new features on top of a base class:

```js
class MyElementWithMixin extends MyMixin(Polymer.Element) {

}
```

This pattern may be easier to understand if you think of it as two steps:

```js
// Create a new base class that adds MyMixin's features to Polymer.Element
const BaseClassWithMixin = MyMixin(Polymer.Element);

// Extend the new base class
class MyElementWithMixin extends BaseClassWithMixin { ... }
```

Because mixins are simply adding classes to the inheritance chain, all of the usual rules of
inheritance apply.

For information on defining mixins, see [Sharing code with class expression mixins](custom-elements#mixins)
in Custom element concepts.

## HTML ImportsとAPI

There are three main HTML imports for defining Polymer elements:
Polymer要素を定義するのに三つの主要なHTML Importsがあります。：


| インポート | 説明 |
|---|-------|
|`polymer-element.html`|`Polymer.Element`クラスをベースに要素を定義します。|
|`legacy-element.html`|`Polymer.Element`を拡張し、Poymer 1.xと互換性のある`Polymer.LegacyElement`APIが付加された`Polymer.LegacyElement`クラスをベースに要素を定義します。また、レガシーなファクトリメソッド`Polymer()`を利用して、1.xと2.xのハイブリッド要素を定義することもできます(`polymer-element.html`を含んでいます）。|
|`polymer.html`|Polymerの基底クラスに、1.xでpolymer.htmlのバンドルに含まれていたヘルパー要素（`custom-style`、`dom-bind`、`dom-if`、`dom-repeat`など)を加えてインクルードします（`legacy-element.html`を含んでいます）。|

リソースを最小限にしたい場合には、`polymer-element.html`をインポートし、必要なヘルパー要素を個別にインポートして下さい。

1.xの後方互換APIが必要な場合には、2.xのクラススタイルの要素を作成する際の基底クラスとして`Polymer.LegacyElement`を使用できます。また利用するヘルパー要素は個別にインポートする必要があります。

1.xと2.xの両方で実行できるハイブリッド要素を定義するには、`polymer.html`をインポートして使用します。

##クラススタイルの要素でハイブリッドな動作を使用

`Polymer.mixinBehavior`関数を使用して、クラススタイルの要素にハイブリッドな動作(behavior)を追加することができます。：

```
class XClass extends Polymer.mixinBehaviors([MyBehavior, MyBehavior2], Polymer.Element) {

  ...
}
customElements.define('x-class', XClass);
```

この`mixinBehavior`関数は、1.xのレガシーAPIもミックスインするので、`Polymer.LegacyElement`を拡張したのとほとんど同じことです。これらのレガシーAPIが必要とされるのは、ハイブリッドな動作がそれらに依存しているためです。

## メインのHTMLドキュメントで要素を定義 {#main-document-definitions}

試験的な実装においては、メインドキュメントから要素を定義するだけで済むかもしれません。本番環境では、常に要素は分割したファイルに定義した上で、メインドキュメントにインポートする必要があります。

メインのHTMLドキュメントで要素を定義するには、要素は`HTMLImports.whenReady(callback)`で定義します。`callback`はドキュメント内の全てのインポートの読み込み(loading)が完了した時点で呼び出されます。

```
<!DOCTYPE html>
<html>
  <head>
    <script src="bower_components/webcomponentsjs/webcomponents-lite.js">
    </script>
    <link rel="import" href="bower_components/polymer/polymer-element.html">
    <title>Defining a Polymer Element from the Main Document</title>
  </head>
  <body>
    <dom-module id="main-document-element">
      <template>
        <p>
          Hi! I'm a Polymer element that was defined in the
          main document!
        </p>
      </template>
      <script>
        HTMLImports.whenReady(function() {
          class MainDocumentElement extends Polymer.Element {

            static get is() { return 'main-document-element'; }

          }
          window.customElements.define(MainDocumentElement.is, MainDocumentElement);
        });
      </script>
    </dom-module>
    <main-document-element></main-document-element>
  </body>
</html>
```

## レガシー要素を定義する {#legacy-element}

レガシーな要素は、要素の登録に`Polymer`関数が使用できます。関数は新しい要素のプロトタイプを引数に取ります。プロトタイプには、カスタム要素のHTMLタグ名を指定する`is`プロパティが必要です。

仕様では、カスタム要素の名前は**ASCII文字で始まり、ダッシュ(-)を含む必要があります。**

例: { .caption }

```
    // register an element
    MyElement = Polymer({

      is: 'my-element',

      // See below for lifecycle callbacks
      created: function() {
        this.textContent = 'My element!';
      }

    });

    // create an instance with createElement:
    var el1 = document.createElement('my-element');

    // ... or with the constructor:
    var el2 = new MyElement();
```

`Polymer`関数は、要素をブラウザに登録し、コードから要素の新たな要素のインスタンスを生成するコンストラクタを返します。

`Polymer`関数はカスタム要素のプロトタイプチェーンを構築し、それをPolymerの`Base`プロトタイプ（Polymerの付加的な機能を提供）につなぎます。そのため開発者が独自のプロトタイプチェーンを構築することはできません。しかし、[behaviors](#prototype-mixins)プロパティを使用することで要素間でコードを共有することはできます。

## ライフサイクルコールバック {#lifecycle-callbacks}

`Polymer.Element`クラスは、Polymerのビルトイン機能で必須のタスクを実行するため、標準のカスタム要素のライフサイクルコールバックを実装しています。

Polymerは、要素のDOMの生成と初期化が完了した時点で呼び出されれる`ready`という特別なコールバックも用意しています。

<table>
  <tr>
    <th>レガシーコールバック</th>
    <th>説明</th>
  </tr>
  <tr>
    <td><code>created</code></td>
    <td>
      要素の作成後、プロパティ値の設定やローカルDOMの初期化前に呼び出されます。
      <p>プロパティ値が設定される前のワンタイム設定に利用されます。
      </p>
      <p>ネイティブの<code>constructor</code>に相当します。
      </p>
    </td>
  </tr>
  <tr>
    <td><code>ready</code></td>
    <td>プロパティ値が設定され、ローカルDOMが初期化された後に呼び出されます。
      <p>
        ローカルDOMの初期化後に、コンポーネントのワンタイムな設定を行うのに利用されます。（プロパティ値を元に設定する場合は、<a href="observers">オブザーバー</a>の使用を推奨します）。
      </p>
    </td>
  </tr>
  <tr>
    <td><code>attached</code></td>
    <td>
      要素がドキュメントに追加(attached)された後に呼び出されます。要素の存続期間中であれば複数回呼び出すことができます。初回の<code>attached</code>コールバックは<code>ready</code>コールバックが実行されるまで呼び出されないことが保証されています。
      <p>
        ドキュメントレベル(document-level)のイベントリスナーを追加するのにも利用されます。（ローカルな要素に対してイベントリスナーを設定するには、<a href="events.html#annotated-listeners">アノテーション付イベントリスナー</a>や<a href="events#event-listeners">リスナーオブジェクト</a>のような宣言的なイベント処理を利用でき、Polymerはリスナーを自動的に追加します）。
      </p>
     <p>ネイティブの<code>connectedCallback</code>に相当します。</p>
    </td>
  </tr>
  <tr>
    <td><code>detached</code></td>
    <td>
      要素がドキュメントから切り離された(detached)された後に呼び出されます。要素の存続期間中であれば複数回呼び出すことができます。
      <p>
        <code>attached</code>コールバックで追加されたイベントリスナーの削除にも利用されます。
      </p>
      <p>ネイティブの<code>disconnectedCallback</code>に相当します。</p>
      </p>
    </td>
  </tr>
  <tr>
    <td><code>attributeChanged</code></td>
    <td>要素の属性の一つが変更されたときに呼び出されます。
      <p>
        対応するプロパティが宣言<em>されていない</em>属性の変更を扱う場合に利用できます。（対応するプロパティが宣言されている場合は、<a href="properties#attribute-deserialization">属性デシリアライゼーション</a>で説明しているように、Polymerが自動的に属性の変更を処理します）。
      </p>
      <p>ネイティブの<code>attributeChangedCallback</code>相当します。
      </p>
    </td>
  </tr>
</table>

### レガシーなbehaviors {#prototype-mixins}

レガシーな要素においては_behaviors_フォームを利用することで要素間でコードを共有することができます。behaviorにはプロパティ、ライフサイクルコールバック、イベントリスナーやその他の機能を定義することができます。

より詳細なガイドは、Polymer 1.xのドキュメントの[Behaviors](/1.0/docs/devguide/behaviors)のセクションを参照してください。

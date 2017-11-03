---
title: のコンセプト
---

<!-- toc -->

(Custom Elements)は、Webにコンポーネントモデルを提供します。の仕様は次の通りです。：

*   クラスをCustom Elementの名前に関連付けるためのメカニズム。
*   Custom Elementのインスタンスの状態が変化した（例えば、ドキュメントに追加またはドキュメントから削除された）際に呼び出される一連のライフサイクルコールバック。
*   インスタンス上で指定した属性グループのいずれかが変更された際に呼び出されるコールバック。

まとめると、これらの機能を利用することで、状態変化に応じて処理を行う独自のパブリックAPIを持ったエレメントが構築できます。

このドキュメントでは、Polymerに関連するの概要について説明します。のより詳細な概要については、[Custom Elements v1: Reusable Web Components](https://developers.google.com/web/fundamentals/getting-started/primers/customelements)を参照してください。

Custom Elementを定義するには、ES6のクラスを作成し、それをCustom Elementの名前に関連付けます。

```
// Create a class that extends HTMLElement (directly or indirectly)
class MyElement extends HTMLElement { … };

// Associate the new class with an element name
window.customElements.define('my-element', MyElement);
```

標準のエレメントと同じように、Custom Elementを利用できます。：

```html
<my-element></my-element>
```

または：

```js
const myEl = document.createElement('my-element');
```

または：

```js
const myEl = new MyElement();
```

エレメントのクラスには、その動作(behavior)とパブリックAPIを定義します。クラスは、`HTMLElement`クラスまたは、そのサブクラスの一つ（例えば、他のCustom Element）を拡張しなければいけません。

**Custom element names.** 仕様上、**Custom Elementの名前は、小文字のASCII文字で始まり、ダッシュ(-)を含まなければなりません。**既出の名前は短いリストで管理され、それに一致する命名は禁止されています。詳細については、HTML仕様の[Custom elements core concepts](https://html.spec.whatwg.org/multipage/scripting.html#custom-elements-core-concepts)を参照してください。
{.alert .alert-info}

Polymerは、基本的なCustom Elementの仕様に対して付加的な機能群を提供します。これらの機能をエレメントに付加するには、Polymer Elementの基底クラス`Polymer.Element`を拡張します。：

```html
<link rel="import" href="/bower_components/polymer/polymer-element.html">

<script>
  class MyPolymerElement extends Polymer.Element {
    ...
  }

  customElements.define('my-polymer-element', MyPolymerElement);
</script>
```

Polymerは基本的なCustom Elementに対して以下の機能を付与します。：

*   一般的なタスクを処理するためのインスタンスメソッド。
*   対応する属性に応じてプロパティを設定するなど、プロパティと属性を自動的に処理するための機能。
*   `<template>`の記述を元にエレメントのインスタンスにShadow DOMツリーを生成する。
*   データバインディング、プロパティ変更のオブザーバーや算出プロパティをサポートするデータシステム。

## Custom Elementのライフサイクル {#element-lifecycle}

Custom Elementの仕様では、「Custom Elementの反応(reactions)」と呼ばれる一連のコールバックが定義されています。これによって、特定のライフサイクルの変化に応じてユーザーコードを実行することができます。

<table>
  <tr>
   <th>リアクション
   </th>
   <th>説明
   </th>
  </tr>
  <tr>
   <td>constructor
   </td>
   <td>エレメントがアップグレードされたとき（つまり、エレメントが作成されたとき(created)、あるいは以前に作成されたエレメントが定義された(defined)とき）に呼び出されます。
   </td>
  </tr>
  <tr>
   <td>connectedCallback
   </td>
   <td>エレメントがドキュメントに追加されたときに呼び出されます。
   </td>
  </tr>
  <tr>
   <td>disconnectedCallback
   </td>
   <td>エレメントがドキュメントから削除されたときに呼び出されます。
   </td>
  </tr>
  <!-- <tr>
  <td>adoptedCallback
   </td>
   <td>Called when the element is adopted into a new document.
   </td>
  </tr> -->
  <tr>
   <td>attributeChangedCallback
   </td>
   <td>エレメントのいずれかの属性が変更、追加、削除または置換されたときに呼び出されます。
   </td>
  </tr>
</table>

各リアクション(訳注：リアクションはコールバックの仕様上の呼称)は、実装の最初の行で、スーパークラスのコンストラクタまたはリアクションを呼び出す必要があります。`constructor`の場合には、以下のように単に`super()`を呼び出すだけです。

```js
constructor() {
  super();
  // …
}
```

その他リアクションについては、スーパークラスのメソッドを呼び出します。これは、Polymerがエレメントにライフサイクルコールバックを導入するために必要になります。

```js
connectedCallback() {
  super.connectedCallback();
  // …
}
```

エレメントのコンストラクタにはいくつか特別な制限があります。：

*   コンストラクタ本体の最初の行で、`super`メソッドを引数なしで呼び出さなければなりません。
*   単純な早期return（`return`または`return this`）を意図とするのでない限り、コンストラクタにreturn文を含めることはできません。
*   コンストラクタでエレメント自身の属性や子を調べたり追加したりすることはできません。

コンストラクタの制限事項について完全なリストは、WHATWGが公開するHTML仕様の[Requirements for custom element constructors](https://html.spec.whatwg.org/multipage/scripting.html#custom-element-conformance)を参照してください。

可能であれば常に、コンストラクタ内ではなく、`connectedCallback`より後に遅延して実行するようにしてください。

### ワンタイムの初期化

の仕様では、ワンタイムの初期化コールバックは提供されません。そこでPolymerは、エレメントがDOMに初めて追加されたときだけ呼び出される`ready`コールバックを用意しています。

```js
ready() {
  super.ready();
  // When possible, use afterNextRender to defer non-critical
  // work until after first paint.
  Polymer.RenderStatus.afterNextRender(this, function() {
    ...
  });
}
```


`Polymer.Element`クラスは、`ready`コールバックの中でエレメントのテンプレートやデータシステムを初期化します。したがって、`ready`コールバックを上書きする場合には、独自の`ready`のどこかで`super.ready()`呼び出す必要があります。

スーパークラスの`ready`メソッドから戻ると、エレメントのテンプレートはインスタンス化され、初期プロパティ値が設定された状態になります。ただし、Light DOMエレメントは、`ready`が呼び出された時点で割り当てられて(distributed)いないかもしれません。

エレメントのLight DOMの子やプロパティ値のように、動的な値を元にエレメントを初期化する場合には、`ready`コールバックを使用しないでください。代わりに、プロパティの変更であれば[オブザーバー](observers)を設定し、追加・削除される子に対しては`observeNodes`メソッドや`slotChanged`イベントで監視を行ってください。

関連トピック：

*   [DOM templating]()
*   [Data system concepts]()
*   [Observers and computed properties]()
*   [Observe added and removed children]()

- [DOMテンプレート](dom-template)
- [データシステムのコンセプト](data-system)
- [オブザーバーと算出プロパティ](observers)
- [子の追加と削除を監視](shadow-dom#observe-nodes)

## エレメントのアップグレード

仕様によれば、Custom Elementsは定義する前であっても利用することができます。エレメントの定義を追加すると、既存のエレメントのインスタンスはすべてカスタムクラスに*アップグレード*されます。

例として、次のようなコードを考えます。：

```html
<my-element></my-element>
<script>
  class MyElement extends HTMLElement { ... };

  // ...some time much later...
  customElements.define('my-element', MyElement);
</script>
```


このページを解析すると、ブラウザはスクリプトを解析して実行する前に`<my-element>`のインスタンスを作成します。この場合、エレメントは`MyElement`ではなく`HTMLElement`のインスタンスとして生成されます。エレメントが定義されると、`<my-element>`のインスタンスはアップグレードされ適切なクラス(`MyElement`)になります。クラスのコンストラクタは、アップグレードの過程で呼び出され、その後他の待機中のライフサイクルコールバックが続けて呼び出されます。

エレメントをアップグレードさせることで、エレメントの初期化にかかるコストを遅延させながらDOMに追加することができます。これは進歩的な機能の強化といえるでしょう。

エレメントは、次のいずれかの*Custom Elementの状態*を持っています。：

*   "uncustomized"：エレメントには有効な名がありません。これは、ビルトインエレメント(`<p>`、`<input>`)または、Custom Elementになることができない未知のエレメント(`<nonsense>`)のどちらかです。
*   "undefined"：エレメントに有効なCustom Element名(例えば、my-elementのような)はありますが、まだ定義されていません。
*   "custom"：エレメントは有効なCustom Element名を持ち、定義もなされ、アップグレードもされています。
*   "custom". The element has a valid custom element name and has been defined and upgraded.
*   "failed"：エレメントのアップグレードに失敗しました（例えば、クラスが無効な場合）。

*Custom Elementの状態*はプロパティとして公開はされませんが、エレメントが定義済みかどうかに関わらずスタイルを設定することができます。

"custom"及び"uncustomized"状態にあるエレメントは、定義済み(defied)であるとみなされます。定義済みのエレメントに対しては、擬似クラスセレクタ`:defined`を使用することができます。これを利用して、エレメントがアップグレードされる前のプレースホルダ用スタイルを提供できます。：

```
my-element:not(:defined) {
  background-color: blue;
}
```

**`:defined`は、Custom Elementsのポリフィルではサポートされていません。** この問題については[documentation on styling](style-shadow-dom#style-undefined-elements) を参照してください。
{.alert .alert-warning}

## 他のエレメントの拡張 {#extending-elements}

Custom Elementは、HTMLElementだけでなく他のCustom Elementを拡張することもできます。：


```
class ExtendedElement extends MyElement {
  static get is() { return 'extended-element'; }

  static get properties() {
    return {
      thingCount: {
        value: 0,
        observer: '_thingCountChanged'
      }
    }
  }
  _thingCountChanged() {
    console.log(`thing count is ${this.thingCount}`);
  }
};

customElements.define(ExtendedElement.is, ExtendedElement);
```

**Polymerは現在、ビルトインエレメントの拡張をサポートしていません。**の仕様では、`<button>`や`<input>`のようなビルトインエレメントを拡張するためのメカニズムを用意します。仕様では、これらのエレメントを「カスタマイズされたビルトインエレメント(customized built-in elements)」と呼んでいます。*カスタマイズされたビルトインエレメント*には、多くの利点があります。（例えば、`<button>`や`<input>`のようなビルトインUIエレメントでユーザー補助機能(accessibility feature)を利用することができます）しかし、すべてのブラウザベンダーが__カスタマイズされたビルトインエレメント__をサポートすることに同意おらず、現時点でPolymerはそれらをサポートしていません。
{.alert .alert-info}

Custom Elementsを拡張すると、Polymerは `properties`オブジェクトと
配列`observers`は特別な扱いをします。エレメントをインスタンス化するとき、Polymerはプロトタイプチェーンを巡回し
これらのオブジェクトをフラット化します。そうすることで、スーパークラスによって定義されたプロパティやオブザーバーが、サブクラスにも追加されます。
。

サブクラスはスーバークラスからテンプレートを継承することもできます。詳細は、[Inherited templates](dom-template#inherited-templates)を参照してください。

## クラス式のミックスインでコードを共有 {#mixins}

ES6のクラスでは単一継承のみサポートしており、異なるエレメント間でコードを共有するには困難が伴います。クラス式のミックスインを利用すると、エレメント間でコードを共有できるようになります。

クラス式のミックスインは基本的にクラスのファクトリーとして機能する関数です。以下の例のように、スーパークラスを渡すことで、関数はミックスインのメソッドを使いスーパークラスを拡張した新たなクラスを生成します。

```js
const fancyDogClass = FancyMixin(dogClass);
const fancyCatClass = FancyMixin(catClass);
```

### ミックスインの使用

エレメントにミックスインを追加するには以下のように記述します。：

```js
class MyElement extends MyMixin(Polymer.Element) {
  static get is() { return 'my-element' }
}
```

もしわかりにくい場合には、2つのステップに分けて考えるといいかもしれません。：

```js
// Create new base class that adds MyMixin's methods to Polymer.Element
const polymerElementPlusMixin = MyMixin(Polymer.Element);

// Extend the new base class
class MyElement extends polymerElementPlusMixin {
  static get is() { return 'my-element' }
}
```

継承の階層は次のようになります。：

```js
MyElement <= polymerElementPlusMixin <= Polymer.Element
```

`Polymer.Element`だけでなく、任意のエレメントクラスにミックスインを適用することができます：

```js
class MyExtendedElement extends SomeMixin(MyElement) {
  ...
}
```

複数のミックスインを順々に(in sequence)適用することもできます。：

```js
class AnotherElement extends AnotherMixin(MyMixin(Polymer.Element)) { … }
```

### ミックスインの定義

ミックスインはクラスを受け取り、サブクラスを返すシンプルな関数です。：

```js
MyMixin = function(superClass) {
  return class extends superClass {
    constructor() {
      super();
      this.addEventListener('keypress', e => this.handlePress(e));
    }

    static get properties() {
      return {
        bar: {
          type: Object
        }
      };
    }

    static get observers() {
      return [ '_barChanged(bar.*)' ];
    }

    _barChanged(bar) { ... }

    handlePress(e) { console.log('key pressed: ' + e.charCode); }
  }
}
```

以下は、ES6のアロー関数を使った例です。：

```js
MyMixin = (superClass) => class extends superClass {
  ...
}
```

ミックスインは、通常のエレメントのクラスのように、プロパティ、オブザーバーやメソッドを定義することができます。また、他のミックスインと合成することをもできます。：

```js
MyCompositeMixin = (base) => class extends MyMixin2(MyMixin1(base)) {
  ...
}
```


ミックスインは単に継承チェーンにクラスを追加するだけなので、通常の継承に関するルールは全て適用されます。例えば、ミックスインクラスにはコンストラクタを定義でき、`super`を使ってスーパークラスメソッドを呼び出すことができます。

**ミックスインをドキュメント化しましょう** Polymerビルドツールとlintツールには、プロパティが使用するミックスインとエレメントを解析するために追加のドキュメンテーションタグがいくつか必要です。ドキュメンテーションタグがなければ、ツールは警告を記録されます。ミックスインのドキュメント化の詳細は、[Class mixins](../tools/documentation#class-mixins)を参照してください。
{.alert .alert-info}



### ミックスインをパッケージ化してシェアする

作成したミックスインを他のグループと共有したり、公開したりする場合には、以下の手順が推奨されます。：

-   [`Polymer.dedupingMixin`](/{{{polymer_version_dir}}}/docs/api/#function-Polymer.dedupingMixin)関数を使用して、
    一度しか適用できないミックスインを作成する。

-   類似の名前を持つ可能性があるミックスインやクラスが他者のものと衝突をしないように、ミックスインに一意の名前空間を提供します。

`dedupingMixin`関数は、他のミックスインで使用されているミックスインが意図せず複数回適用することを避けることが。例えば、 `MixinA`が`MixinB`と`MixinC`を含んでいて、
`MixinA`だけでなく`MixinB`を直接利用する場合には：

```js
class MyElement extends MixinB(MixinA(Polymer.Element)) { ... }
```

この時点で、あなたのエレメントはそのプロトタイプチェーンには`MixinB`の2つのコピーが存在することになります。`dedupingMixin`
はミックスイン関数を引数にとりますが、返り値のミックスイン関数においては重複が排除されます。：

```js
dedupingMixinB = Polymer.dedupingMixin(mixinB);
```

dedupingミックスインには2つの利点があります。第一に、このミックスインを使用するたびに、生成された
基本クラスが記憶され、繰り返し使用された場合にはこのクラスオブジェクトが返されます。これはオブジェクトAを少しだけ最適化します。

さらに重要なことは、dedupingミックスインは、すでに基底クラスのプロトタイプチェーンのどこかでミックスインが利用されたかどうかをチェックします。そして利用済みの場合には、ミック単に基底クラスを返します。上記の例では、 両方の`mixinB`に変えて`dedupingMixinB`を利用した場合、ミックスインは一度だけ適用されることになります。

次の例は、dedupingミックスインを利用して名前空間を作成する例を示しています。：

```js
// Create my namespace, if it doesn't exist
if (!window.MyNamespace) {
  window.MyNamespace = {};
}

MyNamespace.MyMixin = Polymer.dedupingMixin((base) =>

  // the mixin class
  class extends base {
    ...
  }
);
```

## 参考情報

詳細情報：Web Fundamentals上の[Custom Elements v1：reusable web components](https://developers.google.com/web/fundamentals/primers/customelements/?hl=ja)

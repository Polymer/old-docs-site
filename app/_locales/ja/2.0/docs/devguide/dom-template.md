---
title: DOMテンプレート
---

<!-- toc -->

多くのエレメントは、その機能の実装にDOMエレメントのサブツリーを利用しています。DOMテンプレートを利用することで、エレメントにDOMのサブツリーを簡単に作成することができます。

デフォルトでは、エレメントにDOMテンプレートを追加すると、PolymerはエレメントにShadow Rootを作成し、テンプレートをShadow Tree内部に複製(clone)します。

また、DOMテンプレートによってデータバインディングと宣言型イベントハンドラが利用できるようになります。

## DOMテンプレートの概要

DOMテンプレートを記述するのにPolymerは三つの基本的な方法を提供しています：

-   `<dom-module>`エレメント。これにより、テンプレートをマークアップで完全に記述することができます。
    これはHTML importで定義されたエレメントにとって最も効率的な方法です。
-   文字列のテンプレートを提供しています。これは、JavaScriptによって全体を定義されたエレメント（たとえば、ES6モジュールなど）においてうまく機能します。
-   独自のテンプレートエレメントを取得または生成する。この方法によれば、テンプレートの取得及び構築方法を定義することができます。また、スーパークラスのテンプレートを変更するのに利用できます。

Polymerは、エレメントの`<dom-module>`からテンプレートを取得するデフォルトの`template`のgetterメソッドを用意しています。このgetterメソッドをオーバーライドすることで、文字列テンプレートや生成したテンプレートエレメントを提供することができます。

### dom-moduleを使ってテンプレートを記述

`<dom-module>`を使ってエレメントのDOMテンプレートを記述するには：

1.  エレメントの名前と同名の`id`属性を持つ`<dom-module>`エレメントを作成します。
2.  `<dom-module>`の内部に`<template>`エレメントを作成します。
3.  エレメントの名前と一致する静的な`is`ゲッターをエレメントに与えます。Polymerはこれを利用してエレメントから`<dom-module>`を取得します。

Polymerは、このテンプレートの内容をエレメントのShadow DOM内部に複製(clone)します。

例: { .caption }

```html
<dom-module id="x-foo">

  <template>I am x-foo!</template>

  <script>
    class XFoo extends Polymer.Element {
      static get is() { return  'x-foo' }
    }
    customElements.define(XFoo.is, XFoo);
  </script>

</dom-module>
```

この例では、DOMテンプレートとそのエレメントを定義するJavaScriptが同じファイルにあります。これらを別々のファイルに分割して配置することもできますが、DOMテンプレートの解析はエレメントが定義される前に行われる必要があります。

**注意**：テスト環境を除き、エレメントはメインドキュメントの外で定義すべきです。メインドキュメント内におけるエレメントの定義に関する注意事項は、[main document definitions](registering-elements#main-document-definitions)を参照してください。
{.alert .alert-info}

### 文字列テンプレートを記述

エレメントのテンプレートをマークアップで記述する代わりに、文字列を返す静的な`template`ゲッターを作成することで文字列テンプレートを指定することもできます。

このgetterメソッドは、エレメントのインスタンスが最初にアップグレードされたときに_一度だけ_呼ばれます。

```js
class MyElement extends Polymer.Element {

  static get template() {
    return `<style>:host { color: blue; }</style>
       <h2>String template</h2>
       <div>I've got a string template!</div>`
  }
}
customElements.define('my-element', MyElement);
```

文字列テンプレートを使用する場合、エレメントは `is`getterメソッドを用意する必要はありません（ただし、`customElements.define`の最初の引数としてタグを名渡す必要はあります）。

### 継承されたテンプレート {#inherited-templates}

別のPolymerエレメントを拡張したエレメントは、そのテンプレートを継承することもできます。（ `<dom-module>`または文字列テンプレートのいずれかを使用して）エレメントに独自のDOMテンプレートを用意していない場合、存在する場合にはPolymerはスーパークラスと同じテンプレートを利用します。

変更後のテンプレートエレメントを返す`template`のgetterメソッドを定義することでスーパークラスのテンプレートを変更することもできます。
スーパークラスのテンプレートを変更する場合には、いくつか重要なルールがあります。：

-   スーパークラスのテンプレートを直接変更しないでください。変更する前にコピーを作成してください。
-   既存のテンプレートのコピーや修正など、何か高負荷な作業を行っている場合、変更したテンプレートをメモ化(memoize)してください。
    そうすることで、getterメソッドが呼び出された時にテンプレートを再生成する必要はなくなります。

次の例は、親のテンプレートを基にしたシンプルな変更を示しています。：

```js
(function() {
  let memoizedTemplate;

  class MyExtension extends MySuperClass {
    static get template() {
      if (!memoizedTemplate) {
        // create a clone of superclass template (`true` = "deep" clone)
        memoizedTemplate = MySuperClass.template.cloneNode(true);
        // add a node to the template.
        let div = document.createElement('div');
        div.textContent = 'Hello from an extended template.'
        memoizedTemplate.content.appendChild(div);
      }
      return memoizedTemplate;
    }
  }

})();
```

次の例は、エレメントが自身のテンプレートでスーパークラスのテンプレートをラップする方法を示しています。

```html
<dom-module id="my-ext">
    <template>
      <h2>Extended template</h2>
      <!-- superclass template will go here -->
      <div id="footer">
        Extended template footer.
      </div>
    </template>
  <script>
    (function() {
      let memoizedTemplate;

      class MyExtension extends MySuperClass {

        static get is() { return 'my-ext'}
        static get template() {
          if (!memoizedTemplate) {
            // Retrieve this element's dom-module template
            memoizedTemplate = Polymer.DomModule.import(this.is, 'template');

            // Clone the contents of the superclass template
            let superTemplateContents = document.importNode(MySuperClass.template.content, true);

            // Insert the superclass contents
            let footer = memoizedTemplate.content.querySelector('#footer');
            memoizedTemplate.content.insertBefore(superTemplateContents, footer);
          }
          return memoizedTemplate;
        }
      }
      customElements.define(MyExtension.is, MyExtension);
    })();
  </script>
</dom-module>
```

### Shadow DOMを持たないエレメント

Shadow DOMを持たないエレメントを作成するには、（ `<dom-module>`
や`template`のgetterメソッドのオーバーライドを使って）DOMテンプレートを記述しないようにします。そうすることでShadow Rootを持たないエレメントが作成されます。

エレメントがDOMテンプレートを持つ別のエレメントを拡張していて、DOMテンプレートを必要としない場合には、false値を返す`template`のgetterメソッドを定義します。

### テンプレート内のURL {#urls-in-templates}

テンプレート内の相対URLは、アプリケーションや特定のコンポーネントに関連づける必要があります。例えば、コンポーネントに、エレメントを定義するHTMLのインポートと画像が両方含まれている場合、イメージのURLはインポートに関連付けて解決させる必要があります。しかしながら、アプリケーション固有のエレメントでは、メイン文書を基準にしたURLをリンクに設定する必要があります。

デフォルトでは、Polymerは**テンプレート内のURLを変更しません**。そのためすべての相対URLはメイン文書のURLが基準になります。これは、テンプレートのコンテンツが複製(clone)されメイン文書に追加された際、ブラウザがURLをドキュメントに関連付けて評価するためです。（テンプレートの元の文書に対してではありません）

To ensure URLs resolve properly, Polymer provides two properties that can be used in data bindings:
URLが正しく解決されるように、Polymerはデータバインディングで利用可能な2つのプロパティを提供します。：

| プロパティ | 説明 |
| -------- | ----------- |
| `importPath` | エレメントクラスの静的なgetterメソッドであり、エレメントのHTMLインポートのデフォルトのURLとなりオーバーライドが可能です。エレメントのテンプレートが`<dom-module>`に見当たらない場合や、HTMLインポートを使ってエレメントが定義されていない場合には、`importPath`をオーバーライドすると便利です。 |
| `rootPath` | インスタンスのプロパティは`Polymer.rootPath`の値に設定されています。これはグローバルに設定可能で、デフォルトではメイン文書のURLになります。 クライアントサイドのルーティングを利用する際に、`Polymer.rootPath`を設定して安定したアプリケーションのマウントパスを提供するのに役立つかもしれません。|


スタイル内の相対URLは自動的に`importPath`プロパティに関連付けて書き換えられます。`<style>`エレメントの外のURLは`importPath`または`rootPath`の適切な方にバインドされます。例えば：

```html
<img src$="[[importPath]]checked.jpg">
```

```html
<a href$="[[rootPath]]users/profile">View profile</a>
```

`importPath`と`rootPath`プロパティは、Polymer 1.9以降サポートされているので、ハイブリッドエレメントで利用可能です。


## 静的ノードマップ {#node-finding}

Polymerは、エレメントがDOMテンプレートを初期化する際に、ノードIDの静的マップを作成し、頻繁に使用されるノードに手軽にアクセスできるようにします。手動でクエリを記述する必要はありません。エレメントのテンプレートに`id`付きで記述されたノードはそれぞれ、`id`によってハッシュ化され`this.$`として格納されます。

ハッシュ`this.$`はShadow DOMが初期化された際に生成されます。`ready`コールバック内で`this.$`にアクセスするには事前に`super.ready()`を呼び出す必要があります。

**注意：**データバインディングを使用して動的に作成されたノード(`dom-repeat`テンプレートや`dom-if`テンプレートによるものが含まれます)は、ハッシュ`this.$`には追加されません。ハッシュには、静的に作成されたローカルDOMノード(つまりエレメントの最も外側のテンプレートに定義されたノード)だけが含まれます。
{.alert .alert-info}

例: { .caption }

```html
<dom-module id="x-custom">

  <template>
    Hello World from <span id="name"></span>!
  </template>

  <script>
    class MyElement extends Polymer.Element {
      static get is() { return  'x-custom' }
      ready() {
        super.ready();
        this.$.name.textContent = this.tagName;
      }
    }
  </script>

</dom-module>
```

エレメントのShadow DOM内に動的に生成されたノードを配置する場合、標準DOMの`querySelector`メソッドを利用してください。

<code>this.shadowRoot.querySelector(<var>selector</var>)</code>


## 空のテキストノードを削除 {#strip-whitespace}


ブール属性`strip-whitespace`を追加することでテンプレートのコンテンツから**空の**のテキストノードを全て削除できます。これにより、僅かばかりパフォーマンスの向上がのぞめます。

**空ノードとは何か？** `strip-whitespace`は、テンプレート内のエレメント間に現れる_空の_テキストノードだけを削除します（つまり、ホワイトスペース文字だけが対象になります）。これらのノードは、テンプレート内の2つのエレメントがホワイトスペース(スペースまたは改行)で区切られた際に生成されます。内部のエレメントからホワイトスペースは削除されません。
{.alert .alert-info}

空のテキストノードが存在するケース：

```html
<dom-module id="has-whitespace">
  <template>
    <div>Some Text</div>
    <div>More Text</div>
  </template>
  <script>
    class HasWhitespace extends Polymer.Element {
      static get is() { return  'has-whitespace' }
      ready() {
        super.ready();
        console.log(this.shadowRoot.childNodes.length); // 5
      }
    }
    customElements.define(HasWhitespace.is, HasWhitespace);
  </script>
</dom-module>
```

このエレメントのShdow Treeには5つのノードが存在します。なぜなら、`<div>`エレメントがホワイトスペースに囲まれているからです。5つの子ノードは次の通りです。；
  text node
  `<div>Some Text</div>`
  text node
  `<div>More Text</div>`
  text node

空のテキストノードが存在しないケース：


```html
<dom-module id="no-whitespace">
  <template strip-whitespace>
    <div>Some Text</div>
    <div>More Text</div>
  </template>
  <script>
    class NoWhitespace extends Polymer.Element {
      static get is() { return  'no-whitespace' }
      ready() {
        super.ready();
        console.log(this.shadowRoot.childNodes.length); // 2
      }
    }
    customElements.define(NoWhitespace.is, NoWhitespace);
  </script>
</dom-module>
```

ここでは、Shadow Treeには2つの `<div>`ノードだけが含まれています。：

`<div>Some Text</div><div>More Text</div>`

Note that the whitespace _inside_ the `<div>` elements isn't affected.
`<div>`エレメント_内部_のホワイトスペースは影響を受けないことに注意してください。

## テンプレートのコンテンツを保持(preserve)

PolymerはDOMテンプレートに対して一度だけ処理を実行します。例えば：

-   バインディングアノテーションをパースし削除する
-   マークアップで宣言的に記述したイベントリスナーをパースし削除する
-   パフォーマンス向上のために、ネスとされたテンプレートのコンテンツをキャッシュし削除する

これはかなりまれな使用例です。

この処理によって、テンプレートの元のコンテンツは削除されます（ `content`プロパティは未定義になります）。ネストされたテンプレートの内容にアクセスしたい場合は、テンプレートに`preserve-content`属性を追加できます。

ネストされたテンプレートの内容を保持するということは、デ**ータバインディングや宣言的イベントリスナーといったPolymerの機能は提供されないということです。**あなた自身でテンプレートをコントロールし、Polymerに扱わせたくない場合にだけ利用してください。


```html
<dom-module id="custom-template">
  <template>
    <template id="special-template" preserve-content>
      <div>I am very special.</div>
    </template>
  </template>
  <script>
    class CustomTemplate extends Polymer.Element {

      static get is() { return  'custom-template' }

      ready() {
        super.ready();
        // retrieve the nested template
        let template = this.shadowRoot.querySelector('#special-template');

        //
        for (let i=0; i<10; i++) {
          this.shadowRoot.appendChild(document.importNode(template.content, true));
        }
      }
    }

    customElements.define(CustomTemplate.is, CustomTemplate);
  </script>
</dom-module>
```

## DOMの初期化のカスタマイズ

PolymerがエレメントのDOMをどのように初期化するかカスタマイズする方法がいくつかあります。Shadow Rootを独自に作成することでShadow Rootの生成方法をカスタマイズできます。`_attachDom`メソッドをオーバーライドしてDOMツリーがエレメントにどのように追加されるかを変更できます。例えば、Shadow DOMの代わりにLight DOM内にスタンプします。

### 独自のShadow Rootを作成する


場合によっては、独自のShdow Rootを生成したいかもしれません。これを行うには、`constructor`内のように、`super.ready()`または`ready()`コールバックを呼び出す前にShadow Rootを作成します。

```js
constructor() {
  super();
  this.attachShadow({mode: 'open', delegatesFocus: true});
}
```

`_attachDom`をオーバーライドすることもできます。：

```js
_attachDom(dom) {
  this.attachShadow({mode: 'open', delegatesFocus: true});
  super._attachDom(dom);
}
```

### Light DOM内にテンプレートをスタンプする

`_attachDom`メソッドをオーバーライドすることでDOMをスタンプする方法をカスタマイズできます。このメソッドは、スタンプされるDOMを含む `DocumentFragment`だけ引数として受け取ります。Light DOM内にスタンプしたい場合は、次のようにシンプルにオーバーライドを追加します。：

```js
_attachDom(dom) {
  this.appendChild(dom);
}
```

このようにDOMテンプレートをLight DOMにスタンプした場合、データバインディングや宣言的イベントリスナーは通常どおり動作しますが、`<slot>`やスタイルのカプセル化のようなShadow DOMの機能を使うことはできません。

Light DOMにスタンプされたテンプレートに、`<style>`タグを含めてはいけません。スタイルは、囲まれたホストエレメントから適用することができます。また、エレメントが他のエレメントのShadow DOM内部で利用されていない場合にはドキュメントレベルでスタイリングします。

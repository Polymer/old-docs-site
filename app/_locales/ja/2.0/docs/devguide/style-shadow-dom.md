---
title: Shadow DOMのスタイリング
---

<!-- toc -->

## エレメントのスタイリング

PolymerはDOMテンプレートとShadow DOM APIをサポートしています。Custom ElementにDOMテンプレートを利用すると、Polymerはあなたがエレメントに用意したテンプレートの内容をコピーします。

例:

[Plunkerで動作を確認](http://plnkr.co/edit/TOgaxeSzuQsWFSIpzN7S?p=preview)

`custom-element.html` { .caption }
```html
<!-- Import polymer-element -->
<link rel="import" 
href="https://polygit.org/polymer+:2.0-preview/webcomponentsjs+:v1/shadydom+webcomponents+:master/sh
adycss+webcomponents+:master/custom-elements+webcomponents+:master/components/polymer/polymer-elemen
t.html">

<!-- Create a template for the custom element -->
<dom-module id='custom-element'>
  <template>
    <h1>Heading!</h1>
    <p>We are elements in custom-element's local DOM.</p>
  </template>

  <!-- Register the element -->
  <script>
    class CustomElement extends Polymer.Element {
      static get is() {
        return "custom-element";
      }
    }
    customElements.define(CustomElement.is, CustomElement);
  </script>
</dom-module>
```

`index.html` { .caption }
```html
<!-- Load the polyfills -->
<script 
src="https://polygit.org/polymer+:2.0-preview/webcomponentsjs+:v1/shadydom+webcomponents+:master/sha
dycss+webcomponents+:master/custom-elements+webcomponents+:master/components/webcomponentsjs/webcomp
onents-loader.js"></script>

<!-- Load the custom element -->
<link rel="import" href="custom-element.html">
<!-- Drop the custom element on the page -->
<custom-element></custom-element>
```

テンプレート内のHTMLエレメントは、Custom ElementのShadow DOMの子になります。Shadow DOMは、カプセル化のメカニズムを提供するので、Shadow DOMの内部のエレメントがShadow DOM外部のセレクタにマッチすることはありません。

同様に、Shadow DOM内部のスタイルルールについても、Shadow DOM外部のエレメントにリークして影響を与えることはありません。

Shadow DOMは、Custom Elementsに対するスタイルルールのカプセル化を可能にします。エレメントのスコープ外にスタイルが適用されてしまう心配をせず、フォントやテキスト色、クラスなどのスタイル情報をエレメントに自由に定義できます。

例:

[Plunkerで動作を確認](http://plnkr.co/edit/cHSjdQTa0h6fWXAygkje?p=preview)

`x-foo.html` { .caption}
```html
<dom-module id='x-foo'>
  <template>
    <!-- Encapsulated, element-level stylesheet -->
    <style>
      p {
        color: green;
      }
      .myclass {
        color: red;
      }
    </style>
    <p>I'm a shadow DOM child element of x-foo.</p>
    <p class="myclass">So am I.</p>
  </template>
  ...
</dom-module>
```

`index.html` { .caption }
```html
<link rel="import" href="x-foo.html">
<!-- Document-level stylesheet -->
<style>
  .myclass {
    color: blue;
  }
</style>
<x-foo></x-foo>
<!-- The following paragraph uses the document-level stylesheet. -->
<p class="myclass">I have nothing to do with x-foo. Because of encapsulation, x-foo's styles won't 
leak to me.</p>
```

PolymerにおけるShadow DOMの詳細な解説は、[Shadow DOMのコンセプト](shadow-dom)を参照してください。

Shadow DOM v1のAPIの詳細については、[Shadow DOM v1: Self-Contained Web Components](https://developers.google.com/web/fundamentals/getting-started/primers/shadowdom)を参照してください。

### ドキュメントレベルのスタイルから継承を利用

HTMLドキュメントで使用された場合、エレメントはその親エレメントに適用される全てのスタイル情報を継承します。：

[Plunkerで動作を確認](http://plnkr.co/edit/7ugStflqbexg2dNqmtDQ?p=preview)

`x-foo.html` { .caption}
```html
<dom-module id='x-foo'>
  <template>
    <div>
      I inherit styles from x-foo's parent in the light DOM.
      I'm also sans-serif and blue.
    </div>
  </template>
</dom-module>
```

`index.html` { .caption}
```html
<link rel="import" href="x-foo.html">
<!-- Document-level stylesheet -->
<style>
  p {
    font-family: sans-serif;
    color: blue;
  }
</style>

<!-- This paragraph uses document-level styles: -->
<p>I'm sans-serif and blue.</p>

<!-- And the text within x-foo inherits style from the paragraph element: -->
<p><x-foo></x-foo></p>
```

Shadow DOMの内側で宣言されたスタイルは、その外側で宣言されたスタイルを上書きします：

[Plunkerで動作を確認](http://plnkr.co/edit/0Fid1Gupd0jk9jggAKuv?p=preview)

`x-foo.html` { .caption}
```html
<dom-module id='x-foo'>
  <template>
    <!-- Encapsulated, element-level stylesheet -->
    <style>
      p {
        font-family: sans-serif;
        color: green;
      }
    </style>
    <p>I'm green.</p>
  </template>
</dom-module>
```

`index.html` { .caption}
```html
<link rel="import" href="x-foo.html">
<!-- Document-level stylesheet -->
<style>
  p {
    font-family: sans-serif;
    color: blue;
  }
</style>
<p>I'm blue.</p>
<p><x-foo></x-foo></p>
```

### ホストエレメントのスタイリング

Shadow DOMが追加されたエレメントは、*ホスト*と呼ばれます。ホストにスタイルを設定するには、セレクタ`:host`を使用してください。

ホストエレメントの継承可能なプロパティは、Shadow Treeを下って継承され、Shadowの子にも適用されます。


[Plunkerで動作を確認](http://plnkr.co/edit/7771DvsQ3iPWnn2gEIf8?p=preview)

`x-foo.html` { .caption}
```html
<dom-module id='x-foo'>
  <template>
    <!-- Encapsulated, element-level stylesheet -->
    <style>
      :host {
        font-family: sans-serif;
        color: green;
        display: block;
        border: 1px solid;
      }
    </style>
    <p>I'm green.</p>
    <div>I'm green too.</div>
    <span>We're all green...</span>
  </template>
</dom-module>
```

`index.html` { .caption}
```html
<link rel="import" href="x-foo.html">
<x-foo></x-foo>
```

また、ホストエレメントを外部からスタイリングすることもできます。例えば、*エレメント型セレクタ*を使用したとします。：

[Plunkerで動作を確認](http://plnkr.co/edit/AHXFX0zeQTbO2rGELTbS?p=preview)

```css
x-foo {
	background-color: blue;
}
```

#### CSSセレクタを使用してホストエレメントをスタイリング

CSSセレクタを使用して、ホストのスタイルを設定するタイミングや方法を指定できます。このコードサンプルでは、

* セレクタ`:host`は、どんな`<x-foo>`エレメントにもマッチします
* セレクタ`:host(.blue)`は、classが`blue`の`<x-foo>`エレメントにマッチします
* セレクタ`:host(.red)`は、classが`red`の`<x-foo>`エレメントにマッチします
* セレクタ`:host(:hover)`は、`<x-foo>`エレメントにマウスがホバーした時にマッチします

[Plunkerで動作を確認](http://plnkr.co/edit/FsXnCAz65SR6fZ7YKuy6?p=preview)

`x-foo.html` { .caption}
```html
<dom-module id="x-foo">
  <template>
    <style>
      :host { font-family: sans-serif; }
      :host(.blue) {color: blue;}
      :host(.red) {color: red;}
      :host(:hover) {color: green;}
    </style>
    <p>Hi, from x-foo!</p>
  </template>
</dom-module>
```

`index.html` { .caption}
```html
<link rel="import" href="x-foo.html">

<x-foo class="blue"></x-foo>
<x-foo class="red"></x-foo>
```

セレクタ`:host`の後に、子孫セレクタがShadow Tree内のエレメントにマッチします。次の例では、CSSセレクタがShadow Tree内の全ての`p`エレメントへホストがクラス`warning`を持っているか問い合わせを行います。：

[Plunkerで動作を確認](http://plnkr.co/edit/MRN9blKg6A3w8G0RkyJD?p=preview)

`x-foo.html` { .caption}
```html
<dom-module id="x-foo">
  <template>
    <style>
      :host(.warning) p {
        color: red;
      }
    </style>
    <p>Make this text red if x-foo has class "warning", and black otherwise.</p>
  </template>
</dom-module>
```

`index.html` { .caption}
```html
<link rel="import" href="x-foo.html">

<x-foo class="warning"></x-foo>
<x-foo></x-foo>
```

Shadow Tree内部ルールがShadow Tree外部のエレメントに影響を与える可能性のあるインスタンスは二つあり、`:host`セレクタによるスタイリングはその内の一つです。もう一つのインスタンスは、次のセクションで紹介する`::slotted()`構文を使用した、割り当てられた子(distributed children)へのスタイリングルールの適用です。詳細については、[Composition and slots in Eric Bidelman's article on shadow DOM](https://developers.google.com/web/fundamentals/getting-started/primers/shadowdom#composition_slot)を参照してください。

### スロットのコンテンツ(割り当てられた子)へのスタイリング

実行時に割り当てを行うエレメントのテンプレートに**slots**を作成することができます。スロットに関する詳細な情報は、ドキュメント中の[shadow DOM and 
composition](/2.0/docs/devguide/shadow-dom#shadow-dom-and-composition)を参照してだい。

スロットに組み込まれるコンテンツの基本的な構文は、次のようになります。：

[Plunkerで動作を確認](http://plnkr.co/edit/bNvOvQqCEmC4DaoeNtwZ?p=preview)

`x-foo.html` { .caption}
```html
<dom-module id="x-foo">
  <template>
    <h1>
      <slot name="title"></slot>
    </h1>
  </template>
  ...
</dom-module>
```

`index.html` { .caption}
```html
<link rel="import" href="x-foo.html">

<x-foo>
  <span slot="title">I'm a heading!</span>
</x-foo>
```

スロットされたコンテンツにスタイルを適用するには、`::slotted()`構文を使用します。

**注意：** Shady CSSのスShimの制限内で
ブラウザ間で一貫した動作を確保するには、`::slotted(.classname)`の左側にセレクタを追加します。（例：`p ::slotted(.classname)`）

`::slotted(*)`はスロットされた全てのコンテンツを選択します。：

[Plunkerで動作を確認](http://plnkr.co/edit/pb0D6r15jvvxYVWsZ95U?p=preview)

`x-foo.html` { .caption}
```html
<dom-module id="x-foo">
  <template>
    <style>
      p ::slotted(*), h1 ::slotted(*) {
        font-family: sans-serif;
        color:green;
      }
    </style>
    <h1>
      <div><slot name='heading1'></slot></div>
    </h1>
    <p>
      <slot name='para'></slot>
    </p>
  </template>
	...
</dom-module>
```

`index.html` { .caption}
```html
<link rel="import" href="x-foo.html">
<x-foo>
  <div slot="heading1">Heading 1. I'm green.</div>
  <div slot="para">Paragraph text. I'm green too.</div>
</x-foo>
```

[Plunkerで動作を確認](http://plnkr.co/edit/Xb4j1r4wEgGuyUM9huFV?p=preview)

エレメントの型で選択することもできます：

`x-foo.html` { .caption}
```html
<dom-module id="x-foo">
  <template>
    <style>
      h1 ::slotted(h1) {
        font-family: sans-serif;
        color: green;
      }
      p ::slotted(p) {
        font-family: sans-serif;
        color: blue;
      }
    </style>
    <h1><slot name='heading1'></slot></h1>
    <p><slot name='para'></slot></p>
  </template>
  ...
</dom-module>
```

`index.html` { .caption}
```html
<link rel="import" href="x-foo.html">

<x-foo>
  <h1 slot="heading1">Heading 1. I'm green.</h1>
  <p slot="para">Paragraph text. I'm blue.</p>
</x-foo>
```

クラスで選択することもできます：

[Plunkerで動作を確認](http://plnkr.co/edit/Ep8AVOHgiwQjtv8x5kwd?p=preview)

`x-foo.html` { .caption}
```html
<dom-module id="x-foo">
  <template>
    <style>
      p ::slotted(.green) {
        color:green;
      }
    </style>
    <p>
      <slot name='para1'></slot>
    </p>
    <p>
      <slot name='para2'></slot>
    </p>
  </template>
  ...
</dom-module>
```

`index.html`
```html
<link rel="import" href="x-foo.html">

<x-foo>
  <div slot="para1" class="green">I'm green!</div>
  <div slot="para1">I'm not green.</div>
  <div slot="para2" class="green">I'm green too.</div>
  <div slot="para2">I'm not green.</div>
</x-foo>
```

スロットの`name`で選択することもできます：

[Plunkerで動作を確認](http://plnkr.co/edit/PzypR0973pxg3fquWhco?p=preview)

`x-foo.html` { .caption}
```html
<dom-module id="x-foo">
  <template>
    <style>
      p ::slotted([slot=para1]) {
        color:green;
      }
    </style>
    <p>
      <slot name='para1'></slot>
    </p>
    <p>
      <slot name='para2'></slot>
    </p>
  </template>
  ...
</dom-module>
```

`index.html` { .caption}
```html
<link rel="import" href="x-foo.html">

<x-foo>
  <div slot="para1">I'm green.</div>
  <div slot="para2">I'm not green.</div>
</x-foo>
```

### 未定義のエレメントをスタイリングを適用する

FOUC（スタイルが適用されていないコンテンツによるちらつき）を避けるために、Custom Elementsが定義される前にスタイルを適用したいかもしれません。（つまり、ブラウザがクラスの定義をマークアップタグにアタッチする前）。仮にスタイルを適用しなければ、ブラウザは最初の描画でエレメントに一切スタイルを適用しない可能性があります。通常、あなたはエレメントの定義がロードされる間にもアプリケーションのレイアウトが表示されるようにトップレベルのいくつかのエレメントにスタイルを適用したいかもしれません。


There is a specification for a `:defined` pseudo-class selector to target elements that have been 
defined, but the custom elements polyfill doesn't support this selector.

定義が完了したターゲットエレメントに対しては擬似クラスセレクタ`：defined`が使えます。しかしCustom Elementsのポリフィルはこのセレクターをサポートしません。

ポリフィルがうまく動作する対処方として、マークアップでエレメントに`unresolved`属性を追加してください。例えば：

```html
<my-element unresolved></my-element>
```

そのあと、未解決(unresolved)のエレメントにスタイルが適用されます。例えば：

```html
<style>
  my-element[unresolved] {
    height: 45px;
    text-align: center;
    ...
  }
</style>
```

最終的に、`ready`コールバック内で`unresolved`属性が取り除かれます。：

```js
class myElement extends Polymer.Element(){
  ...
  ready(){
    super.ready();
    this.removeAttribute('unresolved');
    ...
  }
  ...
}
```

## エレメント間でスタイルを共有する

### スタイルモジュール(Style Modules)を使用 {#style-modules}

スタイルを共有するのに望ましい方法は、*スタイルモジュール*を使うことです。スタイルモジュールにスタイルをパッケージ化し、エレメント間でそれを共有することができます。

スタイルモジュールを作成するには、スタイルのブロックを`<dom-module>`エレメントと`<template>`エレメントで以下のようにラップします。：

```html
<dom-module id="my-style-module">
  <template>
    <style>
      <!-- Styles to share go here! -->
    </style>
  </template>
</dom-module>
```

これらスタイルを利用してエレメントを作成する場合、スタイルブロックの開始タグでスタイルモジュールをインクルードします。：

```html
<dom-module id="new-element">
  <template>
    <style include="my-style-module">
      <!-- Any additional styles go here -->
    </style>
    <!-- The rest of your element template goes here -->
  </template>
</dom-module>
```

スタイルモジュールを独自のHTMLファイルにパッケージ化したいと考えるかもしれません。その場合は、スタイルを利用するエレメントでそのHTMLファイルをインポートする必要があります。

例：

[Plunkerで動作を確認](http://plnkr.co/edit/Cd9XdfAF0RNEw5MGOudE?p=preview)

`my-colors.html` { .caption}
```html
<!-- Define some custom properties in a style module. -->
<dom-module id='my-colors'>
  <template>
    <style>
      p.red {
        color: red;
      }
      p.green {
        color: green;
      }
      p.blue {
        color: blue;
      }
    </style>
  </template>
</dom-module>
```

`x-foo.html` { .caption}
```html
<!-- Import the styles from the style module my-colors -->
<link rel="import" href="my-colors.html">
<dom-module id="x-foo">
  <template>
    <!-- Include the imported styles from my-colors -->
    <style include="my-colors"></style>
    <p class="red">I wanna be red</p>
    <p class="green">I wanna be green</p>
    <p class="blue">I wanna be blue</p>
  </template>
  ...
</dom-module>
```

`index.html` { .caption}
```html
<link rel="import" href="x-foo.html">

<x-foo></x-foo>
```


### 外部スタイルシートを使用する(非推奨) {#external-stylesheets}

**非推奨の機能。**この実験的な機能は、現在、[スタイルモジュール](#style-modules)に代替され、その利用は推奨されていません。今もサポートはされていますが、そのサポートも今後削除される見込みです。
{.alert .alert-info}

Polymer includes an experimental feature to support loading external stylesheets
that will be applied to the local DOM of an element.  This is typically
convenient for developers who like to separate styles, share common styles
between elements, or use style pre-processing tools.  The syntax is slightly
different from how stylesheets are typically loaded, as the feature leverages
HTML Imports (or the HTML Imports polyfill, where appropriate) to load the
stylesheet text such that it may be properly shimmed and/or injected as an
inline style.

To include a remote stylesheet that applies to your Polymer element's local DOM,
place a special HTML import `<link>` tag with `type="css"` in your 
`<dom-module>` that refers to the external stylesheet to load.

For example:

[Plunkerで動作を確認](http://plnkr.co/edit/7AvgX9jQApbJoWHbdPkI?p=preview)

`style.css` { .caption}
```css
.red { color: red; }
.green { color: green; }
.blue { color: blue; }
```

`x-foo.html` { .caption}
```html
<!-- Include the styles, and use them in x-foo. -->
<dom-module id="x-foo">
  <link rel="import" type="css" href="style.css">
  <template>
    <p class="red">I wanna be red</p>
    <p class="green">I wanna be green</p>
    <p class="blue">I wanna be blue</p>
  </template>
  ...
</dom-module>
```

`index.html` { .caption}
```html
<link rel="import" href="x-foo.html">

<x-foo></x-foo>
```

## ドキュメントレベルのスタイルで`custom-style`使用する {#custom-style}

最新のShadow DOM v1仕様を実装しているブラウザは、スタイルを自動でカプセル化し、スタイルが定義されたエレメントの内部にスコープします。

一部のブラウザでは、Shadow DOM v1仕様が実装されていません。あなたのアプリやエレメントをこれらのブラウザ上で正常に表示されるようにするには、`custom-style`を使用して、スタイル情報がエレメントのローカルDOM内にリークしないようにする必要があります。.

`custom-style`はShadow DOM v1仕様を実装していないブラウザであっても、ポリフィルを有効にすることでアプリケーションやエレメントのスタイルが、これらの仕様に沿って期待した通りに動作するようにします。

定義したスタイルをすべてのブラウザ上でShadow DOM v1仕様に従って動作するようにするには、ドキュメントレベルのスタイルを定義する際に`custom-style`を使用します。`custom-style`は`Polymer.Element`には含まれておらず、別途インポートする必要があります。`custom-style`はレガシーな`polymer.html`インポートには含まれています。

*注意：`custom-style`はメインドキュメントのスタイルの定義にだけ使用してください。エレメントのローカルDOMのスタイルを定義するには単に`<style>`ブロックを使用します。*


### 例

最初のコードサンプルは、Shadow DOM v1仕様を実装していないブラウザ上で、`p`エレメントに適用したスタイルがパラグラフBにリークしている様子を示しています。二番目のコードサンプルでは、`​​custom-style`でスタイルブロックをラップすることでリークを防いでいます。

[Plunkerで動作を確認](http://plnkr.co/edit/0o1zuMHgmt4novf2DS8z?p=preview)

`x-foo.html` { .caption}
```html
<dom-module id="x-foo">
  <template>
    <p>
      Paragraph B: I am in the shadow DOM of x-foo.
      If your browser implements the Shadow DOM v1 specs,
      I am black; otherwise, I'm red.
    </p>
  </template>
  ...
</dom-module>
```

`index.html` { .caption}
```html
<link rel="import" href="x-foo.html">
<style>
  p {
    color: red;
  }
</style>
<p>Paragraph A: I am in the main document. I am red.</p>

<x-foo></x-foo>
```

[Plunkerで動作を確認](http://plnkr.co/edit/yiD9XWPHaMjHaGGwu4V9?p=preview)

`x-foo.html` { .caption}
```html
<dom-module id="x-foo">
  <template>
    <p>Paragraph B: I am in the local DOM of x-foo. I am black on all browsers.</p>
  </template>
  ...
</dom-module>
```

`index.html` { .caption}
```html
<!-- import custom-style -->
<link rel="import" href="/bower_components/polymer/lib/elements/custom-style.html">
<link rel="import" href="x-foo.html">

<custom-style>
  <style>
    p {
      color: red;
    }
  </style>
</custom-style>
<p>Paragraph A: I am in the main DOM. I am red.</p>
<x-foo></x-foo>
```

### 構文と互換性

`custom-style`の構文は変更されました。Polymer 2.xでは、`<custom-style>`はラッパーエレメントとなりました。ハイブリッド構文を使用することで、Polymer 1.xと他のバージョンとの互換性を担保することができます。

Polymer 2.x { .caption}
```html
<custom-style>
  <style>
    p {
		...
    }
  </style>
</custom-style>
```

ハイブリッド (1.xと2.xで相互に互換がある) { .caption}
```html
<custom-style>
  <style is="custom-style">
    p {
		...
    }
  </style>
</custom-style>
```

Polymer 1.x { .caption}
```html
<style is="custom-style">
  p {
	  ...
  }
</style>
```

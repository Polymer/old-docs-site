---
title: Shadow DOMのコンセプト
---

<!-- toc -->

Shadow DOMは、コンポーネントの作成に役立つ新しいDOM機能です。*Shadow DOM*は、要素内の**スコープ付きのサブツリー**と考えることができます。

**詳細はWeb Fundamentalsを読んでください。**このドキュメントでは、Shadow DOMの概要の内、Polymerに関連する部分を説明しています。Shadow DOMに関する包括的な概要説明は、Web Fundamentalsの[Shadow DOM v1: self-contained web components](https://developers.google.com/web/fundamentals/primers/shadowdom/?hl=ja)を参照してください。
{.alert .alert-info}

ページタイトルとメニューボタンを含むヘッダーコンポーネントについて考えてみましょう。この要素のDOMツリーは次のようになるでしょう。：

```html
<my-header>
  <header>
    <h1>
    <button>
```

Shadow DOMを使用すると、スコープ付きサブツリー内に子を置くことができるため、ドキュメントレベル(document-level)のCSSから意図せずボタンのスタイルを再適用してしまうといったことはなくなります。このサブツリーはShadow Treeと呼ばれます。


```
<my-header>
  #shadow-root
    <header>
      <h1>
      <button>
```

*Shadow Root*がShadow Treeのトップです。`<my-header>`に追加(attached)されたツリーの要素は*Shadowホスト*と呼ばれます。ホストには、Shadow Rootを参照する`shadowRoot`というプロパティがあります。Shadow Rootには、そのホスト要素を参照する`host`プロパティがあります。

Shadow Treeは要素の`children`とは区別されます。このShadow Treeは、外部の要素は関知する必要のない(カプセル化された)コンポーネントの**実装**の一部と考えることができます。一方、要素の子(children)は、(外部の要素に対しても)publicなインタフェースの一部です。

以下のように、`attachShadow`を呼び出すことで命令的に要素にShadow Treeを追加(attach)できます：


```js
var div = document.createElement('div');
var shadowRoot = div.attachShadow({mode: 'open'});
shadowRoot.innerHTML = '<h1>Hello Shadow DOM</h1>';
```

Polymerは、[DOMテンプレート](dom-template)を使用して宣言的にShadow Treeを追加するためのメカニズムを提供しています。要素にDOMテンプレートを追加すると、Polymerは要素の各インスタンスにShadow Rootを追加(attach)して、テンプレートの内容をShadow Treeに複製します。

```html
<dom-module id="my-header">
  <template>
    <style>...</style>
    <header>
      <h1>I'm a header</h1>
      <button>Menu</button>
    </header>
  </template>
</dom-module>
```

テンプレート内に`<style>`要素が含まれていることに注意してください。Shadow Treeに配置されたCSSはShadow Tree内部にスコープを持ち、DOMの他の部分に対してスコープがリークすることはありません。

## Shadow DOMと構成

デフォルトでは、要素にShdow DOMがある場合、**Shadow Treeが要素の子に代わってレンダリングされます。**子をレンダリングするためには、`<slot>`要素をShadow Treeに追加します。`<slot>`は、子ノードのレンダリング先を示すプレースホルダと考えることができます。例として、以下のような`<my-header>`のShadow Treeについて考えてみましょう。：


```html
<header>
  <h1><slot></slot></h1>
  <button>Menu</button>
</header>
```


ユーザーは次のように子を追加できます：


```html
<my-header>Shadow DOM</my-header>
```


`<slot>`要素が子に置き換えられたかのようにヘッダーがレンダリングされます。


```html
<my-header>
  <header>
    <h1>Shadow DOM</h1>
    <button>Menu</button>
  </header>
</my-header>
```


実際の要素(訳注：上記のように実際にレンダリングされた要素)の子孫ツリーは、そのShadow DOMツリーとは区別して、*Light DOM*と呼ばれることもあります。

レンダリングするためにLight DOMとShadow DOMツリーを単一のツリーに変換するプロセスは、*ツリーのフラット化(flattening the tree)*と呼ばれます。`<slot>`要素がレンダリングされることはありませんが、*フラット化されたツリー*には含まれるので、イベントバブリングのような処理に加えることができます。

`name`属性付きのスロットを使用することで、フラット化されたツリーのどこに子を割り当てるべきか指定することもできます。


```html
<h2><slot name="title"></slot></h2>
<div><slot></slot></div>
```

以下のように、名前付きのスロットは、一致する`slot`属性持つトップレベルの子だけを受け入れます。(訳注：トップレベルでない子に関しては、この三つ先のサンプルコードで改めて実例付きの解説があります。)：

```html
<span slot="title">A heading</span>
```

`name`属性を持たないスロットは、`slot`属性を持たない全ての子のデフォルトのスロットになります。子の`slot`属性に対応する、名前付きスロットがShadow Tree上に存在しない場合にはその子が表示されることはありません。

次のようなShadow Treeを持った`example-card`要素を例にして考えてみましょう：

```html
<h2><slot name="title"></slot></h2>
<div><slot></slot></div>
```

これが次のように使われているとします：

```html
<example-card>
  <span slot="title">Card Title</span>
  <div>
    Some text for the body of the card.
  </div>
  <span slot="footer">This footer doesn't show up.</span>
</example-card>
```

最初の`span`は`title`属性を持つスロットに割り当てられます。`slot`属性を持たない`div`は、デフォルトのスロットに割り当てられます。Shadow Treeにないスロット名を持つ最後の`span`は、*フラット化されたツリー*には出現せずレンダリングもされません。

トップレベルの子だけがスロットにマッチすることに注意してください。次の例で考えてみましょう。：

```html
<example-card>
  <div>
   <span slot="title">Am I a title?</span>
  </div>
  <div>
    Some body text.
  </div>
</example-card>
```

`<example-card>`にはトップレベルの子として二つの`<div>`要素があります。どちらの要素もデフォルトのスロットに割り当てられます。`span`はトップレベルの子ではないため、`span`の`slot`属性が配置に影響することはありません。

### フォールバックコンテンツ

スロットには一つもノードが割り当てられていないときに表示される*フォールバックコンテンツ*を含めることができます。例えば：

```
<fancy-note>
  #shadow-root
    <slot name="icon">
      <img src="note.png">
    </slot>
    <slot></slot>
</fancy-note>
```

ユーザーは次のように`<fancy-note>`要素に独自のアイコンを指定できます。：

```html
<!-- shows note with warning icon -->

<fancy-note>

  <img slot="icon" src="warning.png">

  Do not operate heavy equipment while coding.

</fancy-note>
```

ユーザーがアイコンの指定を省略すると、フォールバックコンテンツとしてデフォルトのアイコンが表示されます。：

```html
<!-- shows note with default icon -->

<fancy-note>

  Please code responsibly.

</fancy-note>
```

### マルチレベルの割り当て(distribution)

`slot`要素を他のスロットに割り当てることもできます。例えば、二つのレベルのShadow Treeを考えてみましょう。


```
<parent-element>
  #shadow-root
    <child-element>
      <!-- parent-element renders its light DOM children inside
           child-element -->
      <slot id="parent-slot">

<child-element>
  #shadow-root
    <div>
      <!-- child-element renders its light DOM children inside this div -->
      <slot id="child-slot">
```


このようなマークアップを考えてみましょう。：


```html
<parent-element>
  <span>I'm light DOM</span>
</parent-element>
```


フラット化されたツリーは次のようになります。：


```
<parent-element>
  <child-element>
    <div>
      <slot id="child-slot">
        <slot id="parent-slot>
          <span>I'm in light DOM</span>
```

最初は処理の順番について少し混乱するかもしれません。各レベルにおいて、Light DOMの子は、ホストのShadow DOMの各スロットに割り当てられています。まず`<span>I'm in light</span>`は`<parent-element>`のShadow DOMであるslot(`#parent-slot`)に割り当てられます。次にこのslot(`#parent-slot`)が`<child-element>`のShadow DOMであるslot(`#child-slot`)に割り当てられます。

**Note:** This example uses `id` on slots for illustration purposes only.  This is not the same as
the `name` attribute.  These slots are unnamed and are therefore default slots.
{.alert .alert-info}

`slot`要素はレンダリングされないので、 レンダーツリーはとてもシンプルです。：


```html
<parent-element>
  <child-element>
    <div>
      <span>I'm in light DOM</span>
```

仕様上の用語では、スロットのdistributed nodesとは割り当てられたノードのことであり、各スロットは割り当てられたノードまたはフォールバックコンテンツで置き換えられます。したがって、上記の例では、`＃child-slot`には一つのspanのdistributed nodeがあるといえます。distributed nodesは、*レンダーツリー内のスロットに置き換えられたノードのリスト*と考えることができます。

### スロットのAPI

Shadow DOMには、割り当て(distribution)をチェックするための新しいAPIがいくつか用意されています。：

*   `HTMLElement.assignedSlot` property gives the assigned slot for an element, or `null` if the
    element isn't assigned to a slot.
*   `HTMLSlotElement.assignedNodes` method returns the list of nodes associated with a given slot.
    When called with the `{flatten: true}` option, returns the *distributed nodes* for a slot.
*   HTMLSlotElement.slotchange event is fired when a slot's distributed nodes change.

*   `HTMLElement.assignedSlot`プロパティは、要素に割り当てられたスロットを返します。要素にスロットが割り当てられていない場合は`null`を返します。
*   `HTMLSlotElement.assignedNodes`メソッドは、指定されたスロットに関連付けられたノードのリストを返します。 `{flatten：true}`オプションを指定して呼び出すと、スロットのdistributed nodesが返されます。
*   `HTMLSlotElement.slotchange`イベントは、slotのdistributed nodeが変更された時点で発生します。

詳細については、Web Fundamentalsでの[Working with slots in JS](https://developers.google.com/web/fundamentals/primers/shadowdom/?hl=ja#workwithslots)を参照してください。


### 子の追加と削除の監視(observe) {#observe-nodes}

`Polymer.FlattenedNodesObserver`クラスは、要素の_フラット化されたツリー_を記録(track)するユーティリティを提供します。つまり、`<slot>`要素がdistributed nodeによって置き換えられたノードの子ノードのリストです。 `FlattenedNodesObserver`は`lib/utils/flattened-nodes-observer.html`から読み込むことができるオプションのユーティリティです。

```html
<link rel="import" href="/bower_components/polymer/lib/utils/flattened-nodes-observer.html">
```

`Polymer.FlattenedNodesObserver.getFlattenedNodes(node)`は、指定したノードのフラット化されたノードのリストを返します。

`Polymer.FlattenedNodesObserver`クラスを使用して、フラット化されたノードリストの変更を記録(track)します。

```js
this._observer = new Polymer.FlattenedNodesObserver(this.$.slot, (info) => {
  this._processNewNodes(info.addedNodes);
  this._processRemovedNodes(info.removedNodes);
});
```

`FlattenedNodesObserver`をノードが追加または削除されたときに呼び出されるコールバックに渡します。コールバックは引数として、`addedNodes`配列と`removedNodes`配列を持つObject(訳注：info)を一つ受け取ります。

このメソッドは、監視を停止するためのハンドルを返します。：

```js
this._observer.disconnect();
```

`FlattenedNodesObserver`に関していくつか注意事項があります：


*   コールバックの引数には、単なる要素でなく、追加および削除されたノードのリストを指定します。要素だけに興味がある場合は、ノードのリストをフィルタリングすることができます。：

    ```js
    info.addedNodes.filter(function(node) {
      return (node.nodeType === Node.ELEMENT_NODE)
    });
    ```

*   オブザーバーのハンドルには、ユニットテストに利用できる`flush`メソッドも用意されています。


## イベントリターゲティング

Shadow Treeのカプセル化を守るために、いくつかのイベントはShadow DOMの境界で停止されます。

それ以外のバブリングイベントは、ツリーをバブルアップしながらリターゲティングされます。リターゲティングは、同じスコープ内の要素が監視対象の要素と同等に扱われるようにイベントのターゲットの調整を行います。

例えば、次のようなツリーがあるとします。：


```html
<example-card>
  #shadow-root
    <div>
      <fancy-button>
        #shadow-root
          <img>
```

ユーザーが`image`要素をクリックすると、クリックイベントはツリーをバブルアップします。：


*   `image`要素そのもののリスナーは、ターゲットとして`<img>`を受け取ります。
*   `<fancy-button>`のリスナーは、`<fancy-button>`をターゲットとして受け取ります。元のターゲットはShadow Rootの内側にあるからです。
*   `<example-card>`のShadow DOM内の`<div>`のリスナーも`<fancy-button>`をターゲットとして受け取ります。やはり、同じShadow DOMツリー内にあるためです。
*   `<example-card>`のリスナーは、`<example-card>`自身をターゲットとして受け取ります。

これらイベントには、イベントが通過するノードを配列にして返す、`compositedPath`メソッドを提供します。今回のケースでは、配列には次のものが含まれるでしょう。：

*   `<img>`要素それ自体
*   `<fancy-button>`のShadow Root
*   `<div>`要素
*   `<example-card>`のShadow Root
*   `<example-card>`のすべての祖先（例えば、`<body>`、`<html>`、`document`および`Window`）

デフォルトでは、カスタムイベントはShadow DOMの境界を越えて伝播することは**ありません**。カスタムイベントがShadow DOMの境界を越えてリターゲティングされるようにするには、`composed`フラグを`true`に設定してイベントを作成する必要があります。：

```js
var event = new CustomEvent('my-event', {bubbles: true, composed: true});
```

Shadow Treeのイベントの詳細については、Web FundamentalsのShadow DOMに関する記事[The Shadow DOM event model](https://developers.google.com/web/fundamentals/getting-started/primers/shadowdom#events)を参照してください。

## Shadow DOMのスタイリング

Shadow Tree内のスタイルは、Shadow Treeの内部にスコープされ、Shadow Tree外の要素に作用することはありません。Shadow Tree外のスタイルも、Shadow Tree内のセレクタにマッチすることはありません。しかし、`color`のような継承可能なスタイルプロパティは、それでもなおホストからShadow Treeに下位へ継承されます。

```
<style>

  body { color: white; }

  .test { background-color: red; }

</style>

<styled-element>
  #shadow-root
    <style>
      div { background-color: blue; }
    </style>
    <div class="test">Test</div>
```


この例では、`<div>`の背景色は青になりますが、本来`div`セレクタはメインドキュメント内の`.test`セレクタよりもCSSの詳細度が低いはずです。これは、メインドキュメントのセレクタがShadow DOMの`<div>`にマッチしないためです。一方、ドキュメント本体に設定された白い文字色は`<styled-element>`に下位へ継承され、Shadow Root内部へ適用されます。

Shadow Tree内で指定したスタイルルールがShadow Tree外の要素にマッチするケースが一つだけあります。擬似クラス`:host`または関数型擬似クラス`:host()`を使用して、host要素に対してスタイルを定義することができるのです。

```
#shadow-root
  <style>
    /* custom elements default to display: inline */
    :host {
      display: block;
    }
    /* set a special background when the host element
       has the .warning class */
    :host(.warning) {
      background-color: red;
    }
  </style>
```


擬似要素セレクタ`::slotte()`を使用することで、スロットに割り当てられてたLight DOMの子に対してもスタイルを設定できます。例えば、`::slotted(img)`は、Shadow Tree内のスロットに割り当てられた全ての`image`タグを選択します。


```
  #shadow-root
    <style>
      ::slotted(img) {
        border-radius: 100%;
      }
    </style>
```


詳細については、Web Fundamentalsの記事内の[Styling](https://developers.google.com/web/fundamentals/getting-started/primers/shadowdom#styling)を参照してください。

## テーマ設定とカスタムプロパティ

Shadow Tree**外の**CSSルールを使用して、Shadow Tree内のいかなる要素に対しても**直接的に**スタイルを適用することはできません。例外は、ツリーで下位に継承される一部のCSSプロパティ(colorやfontなど)です。Shadow Treeは、そのホストからCSSプロパティを継承します。

あなたが作成した要素をユーザーがカスタマイズするのを許可するには、*CSSカスタムプロパティ*と*カスタムプロパティミックスイン*を利用して、特定のスタイルプロパティを公開します。カスタムプロパティは、要素にスタイリングAPIを付与する手段を提供します。

**ポリフィルの制限事項**：ポリフィルの提供するカスタムプロパティとミックスインを使用する場合、注意すべき多くの制限があります。詳細については、[the Shady CSS README file](https://github.com/webcomponents/shadycss/blob/master/README.md#limitations)を参照してください。

カスタムプロパティは、CSSルールの中で代入可能な変数と考えることもできます：


```
:host {
  background-color: var(--my-theme-color);
}
```


これによって、ホストの背景色をカスタムプロパティ`--my-theme-color`の値で設定します。あなたが作成した要素を利用するユーザーは誰でも、以下のようにより高いレベルでプロパティを設定できます。：


```
html {
  --my-theme-color: red;
}
```

カスタムプロパティはツリーを下って継承されるので、ドキュメントレベルで設定された値はShadow Tree内からアクセスすることができます。

代入値は利用者によってプロパティが設定されなかった場合に使用されるデフォルト値を含めることができます。：

```
:host {
  background-color: var(--my-theme-color, blue);
}
```

デフォルト値が別の`var()`関数であっても構いません。：

```
background-color: var(--my-theme-color, var(--another-theme-color, blue));
```


### カスタムプロパティミックスイン

カスタムプロパティミックスインは、カスタムプロパティの仕様をベースに構築された機能です。基本的に、ミックスインはオブジェクトの値をとるカスタムプロパティになります。：

```
html {
  --my-custom-mixin: {
    color: white;
    background-color: blue;
  }
}
```

コンポーネントは、`@apply`ルールを使用することでルールセット全体をインポートしたりミックスインしたりできます。：

```
:host {
  @apply --my-custom-mixin;
}
```

`@apply`ルールには、`@apply`が使用されたルールセット内に`--my-custom-mixin`の中身をインラインで挿入するのと同じ効果があります。

## Shadow DOMのポリフィル

Shadow DOMはすべてのプラットフォームで利用できるわけではないため、PolymerではShady DOMとShadow CSSポリフィルをインストールして活用することができます。これらのポリフィルは、`webcomponents-lite.js`ポリフィルのバンドルに含まれています。

これらのポリフィルは、**優れたパフォーマンス性を担保しながら**、ネイティブのShadow DOMの合理的(reasonable)なエミュレーションを提供します。しかし、完全なポリフィルを提供できないShadow DOMの機能もいくつか存在します。ネイティブのShadow DOMが実装されていないブラウザをサポートする必要がある場合、これらの制限に注意する必要があります。また、Shady DOMの利用したアプリケーションをデバッグする際は、Shady DOMのポリフィルに関するいくらか詳細な理解があると役立ちます。

### ポリフィルの仕組み

ポリフィルは、Shadow DOMをエミュレートするために複数の技術を組み合わせて使用します。：

*   Shady DOM：Shady DOMはShadow Tree及びその子孫ツリーの論理的な分割を内部的に維持します、それによりLight DOMやShadow DOMに追加された子は正しくレンダリングされます。さらにShady DOMはネイティブのShadow DOM APIをエミュレートするために、影響を受ける要素のDOM APIにパッチを適用します。

*   Shady CSS： Shady CSSは、Shadow DOMの子にクラスを追加したり、スタイルルールの書き換えを行うことでスタイルのカプセル化を提供します。それによって、正しいスコープを適用します。

以降のセクションでは、各ポリフィルについて掘り下げて考察しています。

#### Shady DOMポリフィル

ネイティブShadow DOMをサポートしていないブラウザでは、ドキュメント及びその子孫ツリーだけがレンダリングされます。

*フラット化されたツリー*におけるShadow DOMのレンダリングをエミュレートするのに、Shady DOMポリフィルは、論理的にツリーを分割しながら、仮想的な(virtual)`children`と`shadowRoot`プロパティを維持する必要があります。各ホスト要素の実際の`children`（ブラウザに表示される子孫ツリー）は、事前にフラット化されたShadow DOMとLight DOMの子のツリーです。開発者ツールを使用して表示されるツリーは、レンダーツリーのように見えますが、論理的なツリーではありません。

ポリフィルを使用した場合、ブラウザのツリーのビューに`slot`要素は現れません。したがって、ネイティブのShadow DOMと異なり、スロットがイベントバブリングに加わることもありません。

ポリフィルはShadow DOMに影響を受けるノードの既存のDOM APIにパッチを適用します。影響を受けるノードは、Shadow Tree内のノード、Shadow TreeをホストするノードやShadowホストのLight DOMの子ノードです。例えば、あるノード上で、Shadow Rootを渡して`appnedChild`メソッドを呼び出すと、ポリフィルはLight DOMの子の*仮想*ツリーに子を追加し、レンダリングツリーのどこに表示すべきか計算した後で、それを実際の子孫ツリーのあるべき場所へ追加します。
(訳補：説明だけでは分かりにくいので、READ MEに記載されたサンプルコードを引用して紹介します。)

詳細には、[Shady DOM polyfill README](https://github.com/webcomponents/shadydom/blob/master/README.md)を参照してください。

#### Shady CSSポリフィル

Shady CSSポリフィルはShadow DOMのスタイルのカプセル化をエミュレートするだけでなく、CSSカスタムプロパティとカスタムプロパティミックスインのエミュレーションも提供します。

カプセル化をエミュレートするために、Shady CSSポリフィルは、Shady DOMツリー内の要素にクラスを追加します。また、要素のテンプレート内で定義されたスタイルルールを書き換えて要素だけに適用されるようにします。

Shady CSSは、ドキュメントレベル(document-level)のスタイルシートに定義されたスタイルルールについては書き換えません。つまり、ドキュメントレベルで定義したスタイルがShadow Treeにリークする可能性があるこということです。ただし、カスタム要素には`<custom-style>`が用意されており、要素の外側でもポリフィルが適用されたスタイルを記述できます。これには、カスタムCSSプロパティのサポートや、スタイルがShadow Treeへのリークを防ぐために行うルールの書き換えも含まれます。

```html
<custom-style>
  <style>
    /* Set CSS custom properties */
    html { --my-theme-color: blue; }
    /* Document-level rules in a custom-style don't leak into shady DOM trees */
    .warning { color: red; }
  </style>
</custom-style>
```

詳細については、[Shady CSS polyfill README](https://github.com/webcomponents/shadycss/blob/master/README.md)を参照してください。

## 参考情報

さらなる理解のために：

*   Web Fundamentalsの[Shadow DOM v1: self-contained web components](https://developers.google.com/web/fundamentals/primers/shadowdom/?hl=ja)
*   [Custom properties specification](https://www.w3.org/TR/css-variables-1/)
*   [Custom property mixins proposal](https://tabatkins.github.io/specs/css-apply-rule/)
*   [Shady DOM polyfill README](https://github.com/webcomponents/shadydom/blob/master/README.md)
*   [Shady CSS polyfill README](https://github.com/webcomponents/shadycss/blob/master/README.md)

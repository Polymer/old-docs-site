---
title: カスタムCSSプロパティ
---

<!-- toc -->

Polymer Elementの作成者は、カスタムCSSプロパティを提供することで、アプリケーション内でエレメントの見た目をスタイリングすることができます。

カスタムプロパティによって、CSSの作成者はすべてのCSSプロパティで利用可能なカスケーディングCSS変数を定義できます。

CSS変数はのコンテキスト外で使用することができ、スタイルシート全体にスタイル情報が散らばるのを防ぐことができます。CSSの作成者がカスタムプロパティに値を割り当てると、これらは`var()`関数を使用することでスタイルシートの他のどんな場所からも利用できます。

これにより、CSSの編集は遥かに容易になり、エラーの発生も抑制できます。


例えば、[`<paper-checkbox>`エレメント](https://www.webcomponents.org/element/PolymerElements/paper-checkbox)は、チェックボックスの色や間隔、サイズ、そのラベルをスタイリングするためのカスタムプロパティを提供しています。

開発者は、これらのプロパティを利用することで、アプリケーションの中で`<paper-checkbox>`エレメントのスタイルを設定できます。

独自のを作成する際は、カスタムプロパティを使用してエレメントの利用者に向けてインターフェイスを構築することで、彼らがエレメントのスタイルを設定できるようにします。

### カスタムプロパティのAPIを使ったエレメントのスタイリング

エレメントの作成者が用意したカスタムプロパティのインターフェイスを利用する場合は、エレメントのAPIドキュメントを参照してください。

模範的な例として、[`<paper-checkbox>` API documentation](https://www.webcomponents.org/element/PolymerElements/paper-checkbox/paper-checkbox)を参照してください。

以下のコードサンプルでは、`<paper-checkbox>`をデフォルトのスタイルでエレメントに挿入しています。：

[Plunkerで動作を確認](http://plnkr.co/edit/if8IardvWBwZ2uMZIlgI?p=preview)

```html
<base href="//polygit2.appspot.com/components/">
<link rel="import" href="polymer/polymer.html">
<script src="webcomponentsjs/webcomponents-lite.js"></script>
<link rel="import" href="paper-checkbox/paper-checkbox.html">

<paper-checkbox>Check me</paper-checkbox>
```

次の点に注意してください。

* チェックボックスのラベルのデフォルトのフォントはTimes New Romanです。これはスタイル情報の無いどんなウェブページにも適用されます。
* チェックボックスは、`paper-element`のテーマからデフォルトのカラーを受け取ります。(訳注：paper-elementsに共通のスタイルは、paper-stylesに定義されています。ここで定義されているスタイルは、Googleの提唱するマテリアルデザインのガイドラインに沿ったものです。).

`<paper-checkbox>`エレメントのスタイルプロパティは、エレメントの作成者が用意したカスタムCSSプロパティを利用して設定できます。

Custom Elementのカスタムプロパティを利用するには、次の構文でスタイルルールを作成して下さい。：

```html
paper-checkbox {
  --paper-checkbox-checked-color: red;
}
```

[Plunkerで動作を確認](http://plnkr.co/edit/u41sHRHAWtYiYyjWnFlP?p=preview)

Paperエレメントは、これらを複数利用した場合に、変数を通じてこれらのエレメント群に対して一貫したスタイリングを行う手段を提供しています。

`<paper-checkbox>`の中で変数を使用してカスタムCSSプロパティを設定できます。：

```html
<style is="custom-style">
  p {
    color: var(--paper-red-500);
  }
  paper-checkbox {
    --paper-checkbox-checked-color: var(--paper-red-500);
  }
</style>
```

## カスタムプロパティの作成

エレメントの作成者は、テーマに関する内部実装の詳細を公開する代わりに、エレメントのAPIの一部としてカスタムCSSプロパティを一つ以上定義します。

これらのカスタムプロパティは、他の標準的なCSSプロパティと同様に定義することができ、定義された時点で合成されたDOMツリー(composed DOM tree)を通じてスタイルを下位に継承します。これは`color`や`font-family`の及ぼす影響に似ています。

以下の簡単な例において、`<my-toolbar>`の作成者は、エレメントの利用者によってツールバーのタイトルの色を変更できるようにすべきと考えました。そこで作成者は、セレクタ`.title`の`color`プロパティに`--my-toolbar-title-color`というカスタムプロパティを割り当て公開しました。ツールバーの利用者は、ツリー上のどこかのCSSルールにおいて、この変数を定義するかもしれません。変数が定義された場合、他の標準なCSSプロパティの継承と同様に、プロパティの値は定義された箇所からツールバーへ下位に継承されます。

例: { .caption }

```html
<dom-module id="my-toolbar">
  <template>
    <style>
      :host {
        padding: 4px;
        background-color: gray;
      }
      .title {
        color: var(--my-toolbar-title-color);
      }
    </style>
    <span class="title">{{title}}</span>
  </template>
  <script>
    class MyToolbar extends Polymer.Element {
      static get is() {
        return "my-toolbar";
      }
    }
    customElements.define(MyToolbar.is, MyToolbar);
</script>
</dom-module>
```

`<my-toolbar>`の利用例： { .caption }

```html
<dom-module id="my-element">
  <template>
    <style>
      /* Make all toolbar titles in this host green by default */
      :host {
        --my-toolbar-title-color: green;
      }
      /* Make only toolbars with the .warning class red */
      .warning {
        --my-toolbar-title-color: red;
      }
    </style>
    <my-toolbar title="This one is green."></my-toolbar>
    <my-toolbar title="This one is green too."></my-toolbar>
    <my-toolbar class="warning" title="This one is red."></my-toolbar>
  </template>
  <script>
    class MyElement extends Polymer.Element {
      static get is() {
        return "my-element";
      }
    }
    customElements.define(MyElement.is, MyElement);
  </script>
</dom-module>
```

この`--my-toolbar-title-color`プロパティは、`<my-toolbar>`内部実装でカプセル化されたタイトルエレメントの色だけに作用します。`<my-toolbar>`の作成者は、ユーザーに公開されているカスタムプロパティを変えない限り、`title`クラスの名前を変更したり、`<my-toolbar>`の内部実装を再構築したりすることができます。

ユーザーがカスタムプロパティを設定しない場合に備えて、`var()`関数にデフォルト値を含めることもできます。：

```css
color: var(--my-toolbar-title-color, blue);
```

デフォルト値としてカスタムプロパティを利用する場合には、次の構文を使用します。：

```css
color: var(--my-color, var(--my-default-color))
```

このように、カスタムCSSプロパティは、通常のCSSのスタイリングと自然に調和するように、の作成者がテーマ設定に関するAPIを利用者に向けて公開するための有用な手段です。

### カスタムCSSミックスインを使用する

(訳注：前のセクションで解説したCSS変数と異なり、CSSミックスインは仕様で標準化されているわけではありませんが、2016年9月にGoogleによって提案書が公開されました。詳細は、[公開中の提案書](https://tabatkins.github.io/specs/css-apply-rule/)を参照してください。)

エレメントの作成者が、テーマ設定に関して重要と考えられる全てのCSSプロパティを予測し、プロパティを個別に公開するのはやっかい(または不可能)なことです。

CSSミックスインは、この機能性の課題を解決するための提案です。CSSミックスインを使用するには、CSSミックスインのポリフィルをインポートします。：

```html
<!-- import CSS mixins polyfill -->
<link rel="import" href="/bower_components/shadycss/apply-shim.html">
```

下位互換性を保つため、`polymer.html`のインポートにはCSSミックスインのポリフィルも含まれています。ハイブリッドエレメントを定義する場合は、追加でインポートが必要なものはありません。

CSSミックスインを使用する場合、エレメントの作成者はCSSのプロパティセットを一つのカスタムプロパティとして定義することができ、Shadow DOM内で指定されたCSSルールに、プロパティセット内の全てのプロパティが適用されることになります。これらは、拡張機能がミックスインの能力(`@apply`を使いますが、これは`var`に似たのもです)を使って実現し、プロパティセット全体をミックスインできるようになります。

ミックスインを適用するには@applyを使用します：

<pre><code class="language-css">@apply --<var>mixin-name</var>;</code></pre>

ミックスインの定義は、カスタムプロパティの定義と似ていますが、値として一つ以上のルールを定義したオブジェクトをとる点が異なります。：

<pre><code class="language-css"><var>selector</var> {
  --<var>mixin-name</var>: {
    /* rules */
  };
}</code></pre>

例: { .caption }

```html
<dom-module id="my-toolbar">
  <template>
    <style>
      :host {
        padding: 4px;
        background-color: gray;
        /* apply a mixin */
        @apply --my-toolbar-theme;
      }
      .title {
        @apply --my-toolbar-title-theme;
      }
    </style>
    <span class="title">{{title}}</span>
  </template>
  ...
</dom-module>
```

`my-toolbar`の利用例:：{ .caption }

```html
<dom-module id="my-element">
  <template>
    <style>
      /* Apply custom theme to toolbars */
      :host {
        --my-toolbar-theme: {
          background-color: green;
          border-radius: 4px;
          border: 1px solid gray;
        };
        --my-toolbar-title-theme: {
          color: green;
        };
      }
      /* Make only toolbars with the .warning class red and bold */
      .warning {
        --my-toolbar-title-theme: {
          color: red;
          font-weight: bold;
        };
      }
    </style>
    <my-toolbar title="This one is green."></my-toolbar>
    <my-toolbar title="This one is green too."></my-toolbar>
    <my-toolbar class="warning" title="This one is red."></my-toolbar>
  </template>
  <script>
    class MyElement extends Polymer.Element {
      static get is() {
        return "my-element";
      }
    }
    customElements.define(MyElement.is, MyElement);
  </script>
</dom-module>
```

## CSSの継承を利用

エレメントがスタイル情報を上書きしない場合、エレメントはその親からスタイルを継承します。：

```html
<link rel="import" href="components/polymer/lib/elements/custom-style.html">
<custom-style>
  <style is="custom-style">
    p {
      color: var(--paper-red-900);
      font-family: Sans-serif;
    }
    paper-checkbox {
      --paper-checkbox-checked-color: var(--paper-red-900);
    }
  </style>
</custom-style>
<body>
	<p><paper-checkbox>Check me</paper-checkbox></p>
</body>
```

## グローバルスタイルを作成

ドキュメントの`html`エレメントをスタイリングすることで、グローバルなスタイルを作成します。：

```html
<link rel="import" href="components/polymer/lib/elements/custom-style.html">
<custom-style>
  <style is="custom-style">
    html {
      font-family: Sans-serif;
      --my-color: var(--paper-red-900);
      color: var(--my-color);
    }
    paper-checkbox {
      --paper-checkbox-checked-color: var(--my-color);
    }
  </style>
</custom-style>
```

フォントファミリーは継承されますが、テキストカラーは継承されない点に注意してください。これは`<paper-checkbox>`がテキストカラーを上書きしているためです。.

### Polymer ElementのカスタムプロパティAPI {#style-api}

Polymerのカスタムプロパティのshimは、エレメントの作成時に一度だけカスタムプロパティの値を評価し適用します。CSSクラスの適用など動的な変更があった場合にエレメント（及びそのサブツリー）を再評価するためには、エレメント上で[`updateStyles`](/2.0/docs/api/elements/Polymer.Element#method-updateStyles)メソッドを呼び出して下さい。ページ上のすべてのエレメントをアップデートするには、`Polymer.updateStyles`を呼び出すことができます。

`updateStyles`は引数にプロパティ/値のペアを持つオブジェクトをとり、カスタムプロパティの現在の値を更新することができます。

例： { .caption }

```html
<dom-module id="x-custom">
  <template>
    <style>
      :host {
        --my-toolbar-color: red;
      }
    </style>
    <my-toolbar>My awesome app</my-toolbar>
    <button on-tap="changeTheme">Change theme</button>
  </template>
  <script>
    class XCustom extends Polymer.Element {
      static get is() {
        return "x-custom";
      }
      static get changeTheme() {
        return function() {
        this.updateStyles({
          '--my-toolbar-color': 'blue',
        });
      }
    }
    customElements.define(XCustom.is, XCustom);
  </script>
</dom-module>
```

```html
this.updateStyles({
  '--some-custom-style': 'green',
  '--another-custom-style': 'blue'
});
```

場合によっては、実行時にエレメントがカスタムプロパティの値を取得する必要があります。この場合、Shady CSSのポリフィルがロードされているかどうかによって多少処理が異なります。：

```js
if (ShadyCSS) {
  style = ShadyCSS.getComputedStyleValue(this, '--something');
} else {
  style = getComputedStyle(this).getPropertyValue('--something');
}
```

レガシーAPIを使用するエレメントでは、`Shady CSS`の利用をテストする代わりに、インスタンスメソッド[`getComputedStyleValue`](/2.0/docs/api/mixins/Polymer.LegacyElementMixin#method-getComputedStyleValue)を呼び出してみることができます。


### カスタムプロパティshimの制限

Polymerでは、クロスプラットフォーム上でカスタムプロパティをサポートするため、内部でJavaScriptのライブラリを利用しています。ライブラリはCSS Variables(のテーマ設定に利用される機能)の仕様に**ほぼ**準拠しながらも、これまで説明してきた通り、その機能を拡張してミックスインプロパティ(CSSのスタイルルールをセットで定義できる機能)を付加しています。パフォーマンス上の理由から、**Polymerはネイティブのカスタムプロパティのすべての機能を再現しようとしません**。shimは、CSSにおける機能のダイナミズムを最大限活かすため、実用性とパフォーマンスの利益のトレードオフ調整します。

現時点におけるshimの制限は以下のとおりです。パフォーマンスとダイナミズムの改善については引き続き検討が行われています。

#### ダイナミズムの限界　

作成時においては、エレメントとマッチしたプロパティの定義だけが適用されます。プロパティ値を更新する動的な変更が自動的に適用されることがありません。Polymer Element上で[`updateStyles`](/{{{polymer_version_dir}}}/docs/api/elements/Polymer.Element#method-updateStyles)メソッドを呼び出すか、`Polymer.updateStyles`を使って全てのエレメントのスタイルをアップデートすることで、スタイルの再評価を強制的に行うことができます。

例えば、エレメント内に次のようなマークアップがあるとします。：

HTML： { .caption }

```html
<div class="container">
  <x-foo class="a"></x-foo>
</div>
```

CSS：{ .caption }

```css
/* applies */
x-foo.a {
  --foo: brown;
}
/* does not apply */
x-foo.b {
  --foo: orange;
}
/* does not apply to x-foo */
.container {
  --nog: blue;
}
```

上記の`x-foo`にクラス`b`を追加した後、新しいスタイルを適用するためにホストエレメントは`this.updateStyles`を呼び出す必要があります。この時点で再計算が行われ、ツリーを下ってスタイルが適用されます。

動的な影響は、プロパティの適用時点で反映されます。

以下の例において、`#title`エレメントに`hilighted`クラスを追加/削除することで狙い通りの効果をもたらすことができるのは、動的変更による影響がカスタムプロパティの適用に関連づけられているためです。

```css
#title {
  background-color: var(--title-background-normal);
}

#title.highlighted {
  background-color: var(--title-background-highlighted);
}
```

#### 継承の制限

親から子へ向かう通常のCSSの継承と異なり、Polymerのshimによって提供されるカスタムプロパティは、上位のスコープ内や、`:host`ルールのスコープ内でプロパティが設定され、Custom Elementに継承されている場合に限り変更することができます。**エレメントのローカルDOMのスコープ内では、カスタムプロパティが持てるのは単一の値だけです。**スコープ内でのプロパティ変更の計算は、shimにとって非常に大きなコストととなるばかりか、のスコープを越えたスタイリングというshimの主目的からすれば必要とされるものではありません。

```html
<dom-module id="my-element">
  <template>
    <style>
     :host {
       --custom-color: red;
     }
     .container {
       /* Setting the custom property here will not change */
       /* the value of the property for other elements in  */
       /* this scope.                                      */
       --custom-color: blue;
     }
     .child {
       /* This will be always be red. */
       color: var(--custom-color);
     }
    </style>
    <div class="container">
      <div class="child">I will be red</div>
    </div>
  </template>
  <script>
    class MyElement extends Polymer.Element {
      static get is() {
        return "my-element";
      }
    }
    customElements.define(MyElement.is, MyElement);
  </script>
</dom-module>
```

#### 割り当てられたエレメント(distributed elements)へのスタイル設定はサポートさていません

カスタムプロパティのshimは、割り当てられたエレメントのスタイリングをサポートしていません。

```css
/* Not supported */
:host ::slotted(div) {
  --custom-color: red;
}
```

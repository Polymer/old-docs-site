---
title: Try Polymer
---

<!-- toc -->

Polymerを使えば、宣言的記述によりWeb Componentsを簡単に作成することができます。

New web developers can simply add custom HTML elements on a web page with markdown. It’s just like using the HTML tags you’re already familiar with:

<pre><code>&lt;h1&gt;A heading!&lt;/h1&gt;</code></pre>

<pre><code>&lt;fancy-thing&gt;A fancy thing!&lt;/fancy-thing&gt;</code></pre>


カスタム要素は、Polymerの提供する以下のような機能を利用でき、シンプルな記述によって複雑でインタラクティブな性質を持ったカスタム要素を容易に構築することができます。：

- カスタム要素の登録
- ライフサイクルコールバック
- プロパティの監視
- Shadow DOMテンプレート
- データバインディング

このチュートリアルでは、何もインストールすることなくPolymerライブラリのクイックツアーを体験できるようにしています。チュートリアル内の**PLUNKERのサンプルコード**というリンクをクリックすれば、サンドボックスの上でサンプルを試すことができます。

また、ボタンをクリックすれば、各セクションで紹介した機能に関連するドキュメントの該当ページへ移動できます。

### カスタム要素を登録 {#register}

新しいカスタム要素を登録するには、ES6で導入されたclass構文を使い`Polymer.Element`クラスを拡張した上で、`customElements.define`メソッドを呼び出しカスタム要素をブラウザに_登録_します。この登録によってカスタム要素名とclass名が関連付けられます。なお、カスタム要素の名前は**ASCII文字で始まりダッシュ(-)を含める必要があります**。

<demo-tabs selected="0" name="qt-1-register" src="http://plnkr.co/edit/Q4E8zO?p=preview">
  <demo-tab slot="demo-tab" heading="custom-element.html">
<pre><code>{{{include_file('2.0/start/samples/custom-element/custom-element.html')}}}</code></pre>
  </demo-tab>
  <demo-tab slot="demo-tab" heading="index.html">
<pre><code>{{{include_file('2.0/start/samples/custom-element/index.html')}}}</code></pre>
  </demo-tab>

  <iframe frameborder="0" src="samples/custom-element/index.html" width="100%" height="40"></iframe>
</demo-tabs>

Try it out in **Plunker**:
* Try modifying the contents of `this.textContent`. 
* If you’re familiar with your browser’s developer tools, try printing the
  custom element’s `tagName` property to the console. 
  Hint: add `console.log(this.tagName);` to the constructor method!

このサンプルでは、ライフサイクルコールバックをして`<custom-element>`の初期化時にコンテンツを追加しています。初期化が完了すると、`ready`というコールバックが呼び出されます。`ready`コールバックは、カスタム要素の生成後にワンタイムの初期化を行いたい場合に利用できます。

<p><a href="/{{{polymer_version_dir}}}/docs/devguide/registering-elements" class="blue-button">
  Learn more: カスタム要素の登録
</a></p>

<p><a href="/{{{polymer_version_dir}}}/docs/devguide/registering-elements#lifecycle-callbacks" class="blue-button">
  Learn more: ライフサイクルコールバック
</a></p>

### Shadow DOMの追加

多くの要素は、独自のUIや動作を実装するために内部にDOMノードを持っています。PolymerのDOMテンプレートを使うことで、カスタム要素にShadow DOMというDOMのサブツリーを作成できます。

<demo-tabs selected="0" name="qt-2-shadow-dom" src="http://plnkr.co/edit/buPxSJ?p=preview">
  <demo-tab slot="demo-tab" heading="dom-element.html">
<pre><code>{{{include_file('2.0/start/samples/dom-element/dom-element.html')}}}</code></pre>
  </demo-tab>
  <demo-tab slot="demo-tab" heading="index.html">
<pre><code>{{{include_file('2.0/start/samples/dom-element/index.html')}}}</code></pre>
  </demo-tab>

  <iframe frameborder="0" src="samples/dom-element/index.html" width="100%" height="40"></iframe>
</demo-tabs>

Try it out in **Plunker**:
* Try adding some other html elements inside the <template></template> block. For example, add `<h1>A heading!</h1>` or `<a href=”stuff.html”>A link!</a>`

Shadow DOMはカスタム要素の内部にカプセル化されています。

<p><a href="/{{{polymer_version_dir}}}/docs/devguide/dom-template" class="blue-button">Learn more: DOM templating</a></p>

### Shadow DOMを使って要素を作成

Shadow DOMを使うことでカスタム要素を柔軟に構築できます。カスタム要素の子は割り当てられるので、Shadow DOMツリーに挿入されたかのようにレンダリングされます。

このサンプルでは、ロゴイメージをCSSでスタイリングされた`<div>`タグで囲うことで、シンプルなカスタムタグを作成しています。

<demo-tabs selected="0" name="qt-3-compose" src="http://plnkr.co/edit/KvBnmE?p=preview">
  <demo-tab slot="demo-tab" heading="picture-frame.html">
<pre><code>{{{include_file('2.0/start/samples/picture-frame/picture-frame.html')}}}</code></pre>
  </demo-tab>
  <demo-tab slot="demo-tab" heading="index.html">
<pre><code>{{{include_file('2.0/start/samples/picture-frame/index.html')}}}</code></pre>
  </demo-tab>

  <iframe frameborder="0" src="samples/picture-frame/index.html" width="100%" height="60"></iframe>
</demo-tabs>

Try it out in **Plunker**:
* Try adding a `<div>` to `index.html`; is it affected by the styles in `<picture-frame>`'s shadow DOM?
* Try adding other HTML elements to the DOM template to see how they are positioned relative to the distributed child nodes.

**ヒント**: `<dom-module>`の内部で定義されたCSSのスタイル情報は、カスタム要素のShadow DOM内にスコープされます。そのため、上記サンプルにおいて`<picture-frame>`内部の`div`に対して適用したスタイルルールは、内部の`<div>`タグに対してのみ適用されます。
{: .alert .alert-info }

<p><a href="/2.0/docs/devguide/shadow-dom#shadow-dom-and-composition" class="blue-button">
Learn more: Composition & distribution</a></p>

### データバインディングを利用

もちろん予め静的にマークアップしたShadow DOMだけは十分でないと考えるでしょう。多くの場面において、Shadow DOMを動的にアップデートしたいと考えるはずです。そのような場合には、データバインディングというシステムを使いします。

データバインディングを使えば、簡潔なコードでカスタム要素内部で発生した変化をShadow DOMへ反映させることができます。`{%raw%}{{}}{%endraw%}`という記号を使い、コンポーネント内のプロパティとバインドします。例えば`{%raw%}{{}}{%endraw%}`は、カスタム要素内のプロパティ`foo`の値によって置き換えられます。

<demo-tabs selected="0" name="qt-4-data-binding" src="http://plnkr.co/edit/8mZK8S?p=preview">
  <demo-tab slot="demo-tab" heading="name-tag.html">
<pre><code>{{{include_file('2.0/start/samples/name-tag/name-tag.html')}}}</code></pre>
  </demo-tab>
  <demo-tab slot="demo-tab" heading="index.html">
<pre><code>{{{include_file('2.0/start/samples/name-tag/index.html')}}}</code></pre>
  </demo-tab>

  <iframe frameborder="0" src="samples/name-tag/index.html" width="100%" height="40"></iframe>
</demo-tabs>

Try it out in **Plunker**:
* Try editing the value of the `owner` property.
* Try adding another property and binding it in your component. 
  Hint: Add `this.propertyName = "Property contents";` to the constructor
  and add {{propertyName}} to the element’s shadow DOM.  

<p><a href="/2.0/docs/devguide/data-binding" class="blue-button">
Learn more: data binding</a></p>

### プロパティの宣言

プロパティは、カスタム要素が外部へ公開するAPIの重要な一部です。Polymerは、*宣言的なプロパティ*をサポートしており、以下のような一般的な機能を提供します。：

- プロパティにデフォルト値を設定
- マークアップからプロパティを設定
- プロパティの変更を監視して事前に指定した処理(observer)を実行

下記サンプルでは、一つ前に紹介したサンプルに`owner`プロパティの宣言を加えています。`index.html`内のマークアップから`owner`プロパティを設定しているのが分かると思います。

<demo-tabs selected="0" name="qt-5-declare-property" src="http://plnkr.co/edit/3Nz8GL?p=preview">
  <demo-tab slot="demo-tab" heading="configurable-name-tag.html">
<pre><code>{{{include_file('2.0/start/samples/configurable-name-tag/configurable-name-tag.html')}}}</code></pre>
  </demo-tab>
  <demo-tab slot="demo-tab" heading="index.html">
<pre><code>{{{include_file('2.0/start/samples/configurable-name-tag/index.html')}}}</code></pre>
  </demo-tab>

  <iframe frameborder="0" src="samples/configurable-name-tag/index.html" width="100%" height="40"></iframe>
</demo-tabs>

Try it out in **Plunker**:
* Try editing the initial value of `owner` in index.html. Observe how this sets the property directly from your HTML.

<p><a href="/2.0/docs/devguide/properties" class="blue-button">
Learn more: プロパティの宣言</a></p>

### プロパティへのデータバインディング

Shadow DOMのテキストコンテンツだけでなく、カスタム要素のプロパティに対してもバインドすることができます。(`property-name="[[binding]]"`という記法を使います。)Polymerの`properties`は、任意のオプションとして双方向バインディングもサポートしています。(`property-name="{{binding}}"`のように`{{}}`を使います。)

このサンプルでは、双方向バインディング(two-way binding)を使用しています。カスタム`input`要素(`iron-input`)の`value`と`owner`プロパティがバインドされており、ユーザーがタイプするとカスタム要素のコンテンツもアップデートされます。

<demo-tabs selected="0" name="qt-6-bind-property" src="http://plnkr.co/edit/03HGzn98uIN5I1WgkDwu?p=preview">
  <demo-tab slot="demo-tab" heading="editable-name-tag.html">
<pre><code>{{{include_file('2.0/start/samples/editable-name-tag/editable-name-tag.html')}}}</code></pre>
  </demo-tab>
  <demo-tab slot="demo-tab" heading="index.html">
<pre><code>{{{include_file('2.0/start/samples/editable-name-tag/index.html')}}}</code></pre>
  </demo-tab>

  <iframe frameborder="0" src="samples/editable-name-tag/index.html" width="100%" height="100"></iframe>
</demo-tabs>

Try it out in **Plunker**:
* Edit the placeholder text to see two-way data binding at work.

**ヒント**: [`<iron-input>`](https://www.webcomponents.org/element/PolymerElements/iron-input)要素は、ネイティブの`<input>`要素のラッパーとして双方向のデータバインディングや入力値のバリデーション機能を提供します。
{: .alert .alert-info }

### `<dom-repeat>`使いテンプレートを連続して描画

テンプレートリピーター(`dom-repeat`)は、配列とのバインドに特化したテンプレートです。配列内の各アイテムにつき一つずつテンプレート内のコンテンツをインスタンス化します。

<demo-tabs selected="0" name="qt-7-dom-repeat" src="http://plnkr.co/edit/FdgkAtcLFHX5TpTsYtZn?p=preview">
  <demo-tab slot="demo-tab" heading="employee-list.html">
<pre><code>{{{include_file('2.0/start/samples/employee-list/employee-list.html')}}}</code></pre>
  </demo-tab>
  <demo-tab slot="demo-tab" heading="index.html">
<pre><code>{{{include_file('2.0/start/samples/employee-list/index.html')}}}</code></pre>
  </demo-tab>

  <iframe frameborder="0" src="samples/employee-list/index.html" width="100%" height="100"></iframe>
</demo-tabs>

Try it out in **Plunker**:
* Change the first and last names inside this.employees
* Add another employee by inserting the following text into the array definition after Tony Morelli:<br/>
  ```
   ,
     {first: 'Shawna', last: 'Williams'} 
  ```

<p><a href="/2.0/docs/devguide/templates" class="blue-button">
Learn more: テンプレートリピーター(dom-repeat)</a></p>

## 次のステップ

これでPolymerの基本的なコンセプトは理解できたはずです。あとは、[build an app with App Toolbox](/2.0/start/toolbox/set-up)というCLIツールを使って実際にアプリケーションを作成したり、[feature overview of the Polymer library](/2.0/docs/devguide/feature-overview)を参照してPolymerライブラリの機能の概要を理解していってください。

---
title: Handle and fire events
---

<!-- toc -->

要素はイベントを使用して状態の変化をDOMツリーを通じて親要素に伝達します。Polymer要素は、標準のDOM  APIを使ってイベントの生成、ディスパッチ、監視(listen)を行うことができます。

Polymerには*アノテーション付イベントリスナー*も用意されています。このリスナーを使用すると、要素のDOMテンプレートの一部としてイベントリスナーを宣言的に記述できます。

## アノテーション付イベントリスナーを追加 {#annotated-listeners}

ローカルDOMの子にイベントリスナーを追加するには、テンプレート内で<code>on-<var>event</var></code> アノテーションを使用します。これにより、イベントリスナーをバインドするためだけに要素に`id`を付与するといった処理が不要になります。

例： { .caption }

```html
<dom-module id="x-custom">
  <template>
    <button on-click="handleClick">Kick Me</button>
  </template>
  <script>
    class XCustom extends Polymer.Element {

      static get is() {return 'x-custom'}

      handleClick() {
        console.log('Ow!');
      }
    }
    customElements.define(XCustom.is, XCustom);
  </script>
</dom-module>
```

イベント名はHTML属性を利用して指定されるので、**常に小文字に変換されます。**これは、HTML属性名が大文字と小文字を区別しないためです。したがって、`on-myEvent`を指定した場合、イベント`myEvent`に対してリスナーが追加されます。_イベントハンドラの名前_（例えば、`handleClick`）は**大文字と小文字を区別**します。混乱を避けるため、**常に小文字のイベント名を使用する**ようにして下さい。

## リスナーを命令的に追加/削除 {#imperative-listeners}

標準の`addEventListener`及び`removeEventListener`メソッドを使用して、イベントリスナーを命令的に追加または削除することができます。

```js
ready() {
  super.ready();
  this.addEventListener('click', e => this._myClickListener(e));
}
```

上の例では、(ES6から導入された)アロー関数を使用して、カスタム要素を`this`の値としてリスナーが呼び出されるようにしています。また`bind`を使って、リスナー関数がバインドされたインスタンスを作成することもできます。この方法は、リスナーを削除する必要がある場合に役立ちます。

```js
constructor() {
  super();
  this._boundListener = this._myLocationListener.bind(this);
}

connectedCallback() {
  super.connectedCallback();
  window.addEventListener('hashchange', this._boundListener);
}

disconnectedCallback() {
  super.disconnectedCallback();
  window.removeEventListener('hashchange', this._boundListener);
}
```

自身またはShadow DOMの子のどこかにイベントリスナーを追加した要素は、その要素がガベージコレクトされるのを禁止すべきではありません。しかしながら、ウィンドウまたはドキュメントレベルのような外部の要素に追加されたイベントリスナーによって、要素がガベージコレクションされないことがあります。メモリリークを防止するため`disconnectedCallback`コールバック内でイベントリスナーを削除するようにしてください。s.


## カスタムイベントの発火 {#custom-events}

ホスト要素からカスタムイベント(独自に作成したイベント)を発火するには、標準の`CustomEvent`コンストラクタと`dispatchEvent`メソッドを使用します。

例：{ .caption }

```html
<dom-module id="x-custom">
  <template>
    <button on-click="handleClick">Kick Me</button>
  </template>

  <script>
    class XCustom extends Polymer.Element {

      static get is() {return 'x-custom'}

      handleClick(e) {
        this.dispatchEvent(new CustomEvent('kick', {detail: {kicked: true}}));
      }
    }
    customElements.define(XCustom.is, XCustom);
  </script>

</dom-module>
<x-custom></x-custom>

<script>
    document.querySelector('x-custom').addEventListener('kick', function (e) {
        console.log(e.detail.kicked); // true
    })
</script>
```
The `CustomEvent` constructor is not supported on IE, but the webcomponents polyfills include a
small polyfill for it so you can use the same syntax everywhere.

デフォルトでは、カスタムイベントはShadow DOMの境界で停止します。カスタムイベントがShadow DOMの境界を越えて伝播するようにするには、イベントを作成する際に`composed`フラグをtrueに設定します。：

```js
var event = new CustomEvent('my-event', {bubbles: true, composed: true});
```

**Backwards compatibility.** The `fire` instance method in the legacy API sets both `bubbles` and `composed` to true by default.
To get the same behavior, you need to specify both options when you create a custom event, as shown
above.
{.alert .alert-info}

## リターゲティングされたイベントの処理 {#retargeting}

Shadow DOMには、イベントがバブルアップする際に、ターゲットを変更する「イベントリターゲッティング(event retargetting)」という機能があり、そのターゲットは常にイベントを受け取る要素と同じスコープになります。（例えば、メインドキュメントのリスナーの場合、ターゲットはShadow Tree内ではなくメインドキュメント内の要素になります。）

イベントの`composedPath()`メソッドは、イベントが通過するノードを配列で返します。そのため`event.composedPath()[0]`は、イベントの原初のターゲットを表します（ただし、ターゲットが閉じられたShadow Root内に隠れていない場合に限ります）。

例： { .caption }

```html
<!-- event-retargeting.html -->
 ...
<dom-module id="event-retargeting">
  <template>
    <button id="myButton">Click Me</button>
  </template>

  <script>
    class EventRetargeting extends Polymer.Element {
      static get is() {return 'event-retargeting'}

      ready() {
        super.ready();
        this.$.myButton.addEventListener('click', e => {this._handleClick(e)});
      }

      _handleClick(e) {
        console.info(e.target.id + ' was clicked.');
      }

    }

    customElements.define(EventRetargeting.is, EventRetargeting);
  </script>
</dom-module>


<!-- index.html  -->
  ...
<event-retargeting></event-retargeting>

<script>
  var el = document.querySelector('event-retargeting');
  el.addEventListener('click', function(e){
    // logs the instance of event-targeting that hosts #myButton
    console.info('target is:', e.target);
    // logs [#myButton, ShadowRoot, event-retargeting,
    //       body, html, document, Window]
    console.info('composedPath is:', e.composedPath());
  });
</script>
```

この例では、原初のイベントが`<event-retargeting>`要素のローカルDOMツリー内の`<button>`でトリガーされています。リスナーは、メインドキュメント上の`<event-retargeting>`要素に対して設定されています。イベントはリターゲティングされるので、要素の実装を隠してしまえばクリックイベントは`<button>`要素からというよりむしろ`<event-retargeting>`要素から生じているようにみえます。

Shadow Rootは`document-fragment`としてコンソールに表示されるかもしれません。Shady DOMでは、`DocumentFragment`のインスタンスになるためです。ネイティブのShadow DOMでは、`ShadowRoot`(`DocumentFragment`を拡張するDOMインターフェース)のインスタンスとして表示されます。

For more information, see [Event retargeting](shadow-dom#event-retargeting) in Shadow DOM concepts.

## プロパティ変更イベント {#property-changes}

特定のプロパティ値が変更された際に、ノンバブリングなDOMイベントを発生する要素を構築することもできます。詳細については、[変更通知イベント](data-system#change-events)を参照してください。

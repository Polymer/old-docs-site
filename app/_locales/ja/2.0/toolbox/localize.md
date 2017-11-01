---
title: ローカリゼーション
---

<!-- toc -->

[`Polymer.AppLocalizeBehavior`](https://www.webcomponents.org/element/PolymerElements/app-localize-behavior)は、アプリケーションの国際化をサポートする[format.js](http://formatjs.io/)ライブラリをラップしています。[Intl](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl)オブジェクトをネイティブにサポートしていないブラウザを使用している場合は、**自分でポリフィルを読み込む必要があります。**polyfillの利用例は、[github.com/andyearnshaw/Intl.js](github.com/andyearnshaw/Intl.js)を参照してください。

`Polymer.AppLocalizeBehavior`は、`format.js`とまったく同じ[メッセージ構文](http://formatjs.io/guides/message-syntax/)をサポートしています。利用可能なメッセージ形式とオプションのリファレンスはformat.jsライブラリのドキュメントを参照してください。

コンテンツをローカライズして表示するエレメントには、それぞれ`Polymer.AppLocalizeBehavior`を追加する必要があります。これらのエレメントはすべて共通のローカリゼーションキャッシュを共有しており、翻訳は一度読む込むだけで済みます。

Polymer 1.xエレメントとPolymer 2.xのハイブリッドエレメントでは、`AppLocalizeBehavior`を直接使用できます。クラススタイルのエレメントの場合は、`mixinBehaviors`メソッドを使用します。.

## AppLocalizeBehaviorをインストール

    bower install --save PolymerElements/app-localize-behavior

## アプリケーションにローカリゼーションを追加

通常、メインアプリケーションが、ローカライズされたメッセージのロードと言語環境の設定を担います。

サンプルアプリケーション(クラススタイルエレメント) {.caption}

```html
<dom-module id="x-app">
  <template>
    <!-- use the localize method to localize text -->
    <div>{{localize('hello', 'name', 'Batman')}}</div>
  </template>
  <script>
    class XApp extends Polymer.mixinBehaviors([Polymer.AppLocalizeBehavior], Polymer.Element) {
      static get is() { return 'x-app'}

      static get properties() {
        return {
          // set the current language—shared across all elements in the app
          // that use AppLocalizeBehavior
          language: {
            value: 'en'
          },

          // Initialize locale data
          resources: {
            value() {
              return {
                'en': { 'hello': 'My name is {name}.' },
                'fr': { 'hello': 'Je m\'apelle {name}.' }
              }
            }
          }
        };
      }
    }

    customElements.define(XApp.is, XApp);
  </script>
</dom-module>
```

一般的には、次の例に示すように、アプリケーションは外部ファイルからリソースをロードします。

サンプルアプリケーション(ハイブリッドエレメント) {.caption}

```html
<dom-module id="x-app">
   <template>
    <!-- use the localize method to localize text -->
    <div>{{localize('hello', 'name', 'Batman')}}</div>
   </template>
   <script>
      Polymer({
        is: "x-app",

        // include the behavior
        behaviors: [
          Polymer.AppLocalizeBehavior
        ],

        // set the current language—shared across all elements in the app
        // that use AppLocalizeBehavior
        properties: {
          language: {
            value: 'en'
          },
        }

        // load localized messages
        attached: function() {
          this.loadResources(this.resolveUrl('locales.json'));
        },
      });
   </script>
</dom-module>
```


メインアプリケーションは、ポリフィル`Intl`の読み込みも担います。(上記には示されていません)

メッセージをローカライズする必要があるエレメントには、それぞれ`Polymer.AppLocalizeBehavior`を追加し、上記のように`localize`メソッドを使用して文字列を変換する必要があります。

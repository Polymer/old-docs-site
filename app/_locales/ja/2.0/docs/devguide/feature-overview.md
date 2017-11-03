---
subtitle: 機能の概要
title: Polymerライブラリ
---

PolymerライブラリはCustom Elementsを作成するための機能一式を提供します。これらの機能は、標準のDOMエレメントのように動作するCustom Elementsを迅速かつ容易に作成できるように設計されています。標準的なDOMエレメントと同様、Polymer Elementでは以下のようなことが可能です。：

* コンストラクタまたは`document.createElement`を使用してインスタンス化する。
* 属性またはプロパティを使用して構成する。
* 各インスタンスに内部DOMを追加する。
* プロパティや属性の変化に応じて処理を行う（例えば、DOMにデータを追加したり、イベントを発火させるなど）。
* 内部のデフォルトから、あるいは外部からスタイルを設定する。
* 内部の状態を操作するメソッドに応答して処理する。

基本的なPolymer Elementの定義は以下のようになります。：

```
    <dom-module id="x-custom">
      <!-- Optional shadow DOM template -->
      <template>
        <style>
          /* CSS rules for your element */
        </style>

        <!-- shadow DOM for your element -->

        <div>{{greeting}}</div> <!-- data bindings in local DOM -->
      </template>

      <script>
        // Define the element's API using an ES2015 class
        class XCustom extends Polymer.Element {

          static get is() { return 'x-custom'; }

          // Declare properties for the element's public API
          static get properties() {
            return {
              greeting: {
                type: String,
                value: "Hello!"
              }
            }
          }

          // Add methods to the element's public API
          greetMe() {
            console.log(this.greeting);
          }

        }

        // Register the x-custom element with the browser
        customElements.define(XCustom.is, XCustom);
      </script>

    </dom-module>
```


このドキュメントでは、機能を次のグループに分けて解説しています。：

*   [Custom Elements](custom-elements)：エレメントを登録すると、class名がCustom Element名に関連付けられます。このエレメントは、ライフサイクルを管理するコールバックを提供します。また、Polymerでは、プロパティを宣言することで、エレメントのプロパティAPIをPolymerのデータシステムに統合することもできます。

*   [Shadow DOM](shadow-dom)：Shadow DOMは、エレメント内にカプセル化されたローカルのDOMツリーを提供します。PolymerはDOMテンプレートからShadow Treeを自動的に生成し、エレメントに挿入することができます。

*   [イベント](events)：Polymerは、Shadow DOMの子にイベントリスナーをアタッチするための宣言的構文を提供します。また、ジェスチャー関連イベントを処理するためのオプションのライブラリも用意しています。

*   [データシステム](data-system)：Polymerのデータシステムは、プロパティオブザーバー(Property Observer)や算出プロパティ(Computed Properties)といった機能によって、プロパティや属性へのデータバインディングを提供しています。

Polymer 1.xベースの既存のエレメントを新しいAPIにアップグレードする場合は、[Upgrade guide](/2.0/docs/upgrade)を参照してください 。

リリースの最新の状況を確認したい場合は、[Release notes](/2.0/docs/release-notes)を参照してください。

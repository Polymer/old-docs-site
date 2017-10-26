---
title: Polymer2.0について
---

<!-- toc -->

Polymer 2.0は、大部分の主要ブラウザベンダーによって実装されている新しいCustom Element v1とshadow DOM v1の仕様をサポートするように設計されています。また、Polymer 1.xユーザーに対してもスムーズな移行手段を提供しています。

Polymer 2.0はいくつかの領域において改善も行いました。：

*   **相互運用性の向上**：Polymer 2.0では、DOMの操作時にPolymer.domへ依存する必要がなくなったおかげで、Polymerによって作成されたコンポーネントを他のライブラリやフレームワークで簡単に使用できるようにしました。さらに、[Shady DOM](https://github.com/webcomponents/shadydom)のコードは、Polymerに統合せず再利用可能なポリフィルに分離されています。

*   **データシステムの改善**：Polymer 2.0では、データシステムの改善も行いました。この変更によって、要素内あるいは要素間におけるデータの伝播の流れを容易に推測しデバッグできるようになりました。

*   **より標準仕様に合わせて**：Polymer 2.0では、Polymerファクトリメソッドではなく、標準ES6のクラスと標準のCustom Element v1のメソッド群を使用して要素を定義します。また、機能をミックスインするには、`Polymer`のbehaviorではなく、標準のJavaScript(クラス式のmixin)を利用します。 (`Polymer`ファクトリメソッドは互換レイヤを使用することで引き続きサポートされます)。

いくつかのテストは現在、Chrome以外のブラウザで失敗します。これらはすぐに対処される予定ですが、しばらくの間は[Chrome Canary](https://www.google.co.jp/chrome/browser/canary.html)を利用するのが最善の策です。

Polymer 2.0では、1.xとの互換性を破棄する変更がいくつも行われていますが、これらの多くは新しいCustom Elements v1とshadow DOM v1の仕様に準拠するためのものです。仕様の新しいバージョンのリリースが近づくにつれ、さらなる変更が見込まれます。

以下のセクションで、Polymer 2.0における主な変更点について説明します。Polymer 2.0への要素のアップグレードに関する詳細は、[Upgrade guide](https://www.polymer-project.org/2.0/docs/upgrade)を参照してください。

## Custom elements v1

Polymer 2.0の要素は、Custome Elements v1 APIに準拠することを目標としています。これによって、Polymer 1.xで仕様v0に準拠していたいくつかの機能が変更されました。

主な変更点は：

*   Custome Elements v1仕様では、プロトタイプに代わってES6のクラス構文を使用して要素を定義します。

  Polymer 2.0では、要素を拡張するためにES6ベースの基底クラス(`Polymer.Element`)を提供することで、ネイティブのES6フォームを利用できるようにします。さらに、`Polymer`ファクトリメソッドを使用するレガシーな要素も、Polymer 1.x互換レイヤーでサポートされています。

*   新しい仕様では、ライフサイクルコールバックをいくつか変更しています。特に大きな変更は、`created`コールバックに代えてクラスのconstructorを呼び出すようになった点です。また仕様では、constructor(Polymer 1.xのcreatedコールバックに相当)の実行に関して新たに制限も課されています。

*   さらに、仕様でサポートされている要素のタイプ拡張(`is =`)は、現時点のPolymer 2.0ではサポートしていません。

以降のセクションでは、これらの変更点について詳しく解説します。

Custom Elements v1仕様の一般的な情報に関しては、Web Fundamentalsの[Custom elements v1: reusable web components](https://developers.google.com/web/fundamentals/primers/customelements/?hl=ja)を参照してください。

### ライフサイクルの変更 {#lifecycle-changes}

クラスベースの要素を作成する場合は、新しいネイティブのライフサイクルメソッド(仕様ではCustom Elemnetsの「リアクション(reaction)」と呼ばれます)を使用します。`Polymer`ファクトリメソッドを使用してレガシーな要素を作成する場合は、従来のPolymerコールバック名を使用します。


<table>
  <tr>
    <td><strong>リアクション/コールバック名</strong></td>
    <td><strong>説明</strong></td>
  </tr>
  <tr>
    <td>
      <code>constructor (</code>ネイティブ<code>)</code>
      <p>
        <code>created</code> (レガシー)
    </td>
    <td>
      Custom Elements v1仕様では、<code>constructor</code>内のDOM API(従来のAPIでは<code>created</code>コールバック)から属性、子、または親の情報を読み取ることを禁止しています。同様に、<code>constructor</code>においては、属性と子は追加されない可能性があります。そのような作業はすべて遅延させる必要があります(例えば、<code>connectedCallback</code>まで)。
      レガシーな<code>created</code>コールバックは、<code>properties</code>のデフォルト値が設定される前には呼び出されなくなりました。そのため、<code>created</code>の中で設定されたプロパティを、要素のデフォルト値を定義する<code>value</code>の関数から参照することがないようにしてください。
      <p>
        その一方で、<code>properties</code>内の<code>value</code>で関数を定義する代わりに、<code>created</code>コールバックの中で<strong>どんな</strong>デフォルトのプロパティでも設定できるようになりました。(Polymer 1.0では監視されたプロパティ(observed properties)に対してこのような方法が禁止されていました。)
    </td>
  </tr>
  <tr>
    <td><code>connectedCallback (</code>ネイティブ<code>)</code>
      <p>
        <code>attached</code> (レガシー)
    </td>
    <td>Polymer 1.xでは、最初にレンダリングされるまで<code>attached</code>コールバックを遅延していたので、要素は自身またはその子を測定することができました。
    </td>
  </tr>
  <tr>
    <td><code>disconnectedCallback (</code>ネイティブ<code>)</code>
    <p>
      <code>detached</code> (レガシー)
    </td>
    <td></td>
  </tr>
  <tr>
    <td>
      <code>attributeChangedCallback (</code>ネイティブ<code>)</code>
      <p>
        <code>attributeChanged</code> (レガシー)
    </td>
    <td>
      属性が監視されるようにするには<em>明示的に</em>登録されている必要があります。
      <p>
        Polymer要素の場合、<code>properties</code>オブジェクト内で明示的に宣言されたプロパティだけが属性の変更を追跡(tracking)されます。(つまり、属性の値を変更すると、attribute changedコールバックが呼び出され、Polymerは属性からプロパティの値を設定します)。
      <p>
        Custom Elemnets v0では、<strong>どんな</strong>属性の変更に対しても<code>attributeChangedCallback</code>が発生しました。
      <p>
        Polymer 1.xでは、明示的に宣言されたプロパティと<em>暗黙的に宣言されたプロパティ</em>の両方に対して属性がデシリアライズされました。例えば、<code>properties</code>には宣言されてはいないが、バインディングで利用された場合やオブザーバーの依存部に使用された場合に、プロパティは暗黙的に宣言されたと見なされます。
    </td>
  </tr>
  <tr>
    <td><code>ready</code> (Polymerの仕様)</td>
    <td>
      Polymerは、もはや<code>ready</code>が呼び出される前に、最初のLight DOMの割り当て(distribution)が完了していることを保証しません。
   </td>
  </tr>
</table>


コールバックの変更に加えて、`lazyRegister`オプションが削除された点や、すべてのメタプログラミング(テンプレートの解析、プロトタイプ上のアクセサの作成など)は、要素の最初のインスタンスが生成されるまで遅延される点に注意してください。

### タイプ拡張要素(Type-extension elements) {#type-extension}

Polymer 2.0では、タイプ拡張要素をサポートしていません（例：`<input is="iron-input">`）。Custom Elements v1の仕様には、タイプ拡張のサポートは引き続き（「カスタマイズされたビルトイン要素(customized build-in elements)」として）含まれ、Chromeでは実装が予定されています。しかし、Apple社は、`is`をサポートしないことを表明しており、Custom Elementsのポリフィルが不確定な仕様に依存するのを避けるため、我々は今後その利用を推奨しません。代わりの方法として、ラッパーカスタム要素でネイティブ要素を囲むことができます。

例えば：

`<a is="my-anchor">...</a>`

上記は次のように扱えるようになりました：


```
<my-anchor>
  <a>...</a>
</my-anchor>
```

ユーザーは、必要に応じて既存のタイプ拡張要素を置き換える必要があるかもしれません。

Polymerによって提供されるすべてのテンプレートのタイプ拡張(つまり`dom-if`や`dom-repeat`のこと)は、標準のCustom Elementsと同様に、Light DOM内に`<template>`を持つようになりました。例えば：

1.xの場合、コードは次のようになります。：

```
<template is="dom-bind">...</template>
```

2.xでは、次のようになります。：

```
<dom-bind>
  <template>...</template>
</dom-bind>
```

Polymer要素のテンプレート内(つまり、`dom-module`の内部)で使用された場合には、Polymerはテンプレートのタイプ拡張(例：`dom-if`や`dom-repeat`など)をテンプレートの処理中に自動的にラップします。これは、Polymer要素の内部にネストされたテンプレートや他のPolymerのテンプレート(例：`dom-bind`)において、`<template is="">`を使い続けることができ、またそうすべきことを意味します。

`index.html`**のようなメインドキュメントで使用されるテンプレートは、手動でラップする必要があります。**

`custom-style`要素も標準仕様のカスタム要素のように、`<style>`要素をラップするように変更されました。

例えば：

```
<style is="custom-style">...</style>
```

上記は、以下のようになりました：

```
<custom-style>
  <style>...</style>
</custom-style>
```


参考文献：

*   WHATWGのHTML仕様書内の[Creating a customized built-in element](https://html.spec.whatwg.org/#custom-elements-customized-builtin-example)
*   [Apple's position on customized built-in elements](https://github.com/w3c/webcomponents/issues/509#issuecomment-233419167)

## Shadow DOM v1

Polymer 2.0はShadow DOM v1をサポートしています。Polymerユーザーにとって、Polymer 1.0と2.0の主要な違いは、`<content>`要素が、v1仕様の`<slot>`要素に置き換わったことです。

Polymer 1.xに含まれていたShady DOM及び関連するCSSカスタムプロパティのshimは、Polymerから取り除かれ、ポリフィル`webcomponents-lite.js`のバンドルに追加されました。この新バージョンのShady DOMでは、代わりの(`Polymer.dom`)APIを公開するのではなく、ネイティブDOM APIにパッチを当てることで、Polymer 2.0ユーザーはネイティブのDOM APIを直接利用できるようになりました。

ハイブリッド要素の場合、Polymer 2.0には、ネイティブのAPIに直接転送する`Polymer.dom`APIバージョンが含まれています。 2.0だけに依存する要素に対しては、ネイティブのDOM APIを選択し、`Polymer.dom`を取り除くこともできます。

**Web Fundamentalsで詳細を確認**。Shadow DOMの概要については、[Shadow DOM v1：self-contained web components](https://developers.google.com/web/fundamentals/primers/shadowdom/?hl=ja)を参照してください。
{.alert .alert-info}

v1の仕様変更に関する、簡潔で包括的な事例については、Hayato Itoの[What's New in Shadow DOM v1 (by examples)](http://hayato.io/2016/shadowdomv1/)を参照してください。

## データシステムの改善 {#data-system}

Polymer 2.0は、データシステムにいくつかの改善を取り入れています。：

*   配列操作がよりシンプルになりました。抽象レイヤ`Polymer.Collection`や配列アイテムへのキーベース(key-based)のパスがなくなりました。(訳注：Collectionオブジェクトについては、[Polymer 1.0ドキュメントのObservers and computed properties](https://www.polymer-project.org/1.0/docs/devguide/observers)のObserve array mutationsを参照してください。)

*   データの変更をバッチ処理することで、パフォーマンスと正確性の向上

*   オブザーバー、算出バインディング、および算出プロパティにおいて未定義(undefined)の依存部のチェックがなくなりました。これらはすべて初期化の際に一度だけチェックされます。

*   要素にオプションのミックスインを加えることでオブジェクトや配列の*ダーティチェック*(dirty check)をなくすことができます。このミックスインを使うと、オブジェクトや配列のプロパティに監視可能な変更を加えた場合、Polymerはそのプロパティ以下のすべて(サブプロパティ、配列のアイテム)を再評価します。これは、Polymerの`set`メソッドや配列変更メソッドが使用できないアプリケーションや、不変データを使用しないアプリケーションで役立ちます。(訳注：ダーティーチェックとは要素がオブジェクトや配列の変更をチェックして、余計なプロパティエフェクトが生じないようにする仕組みです。詳細は、[データシステムのコンセプト](https://github.com/jtakiguchi/polymer-docs-japanese-translation/blob/master/docs/polymer2/data-system/data-system-concepts.md#)のMutableData mixinに関する説明を参照してください。)

*   プロパティエフェクト(property effect)の順序が変更されました。

*   `properties`で明示的に列挙されたプロパティに限り、属性から設定できるようになりました。

*   要素の初期化(テンプレートのスタンプ処理やデータシステムの初期化を含む)は、要素がメインドキュメントにコネクトされるまで遅延されます。(これはCustom Elements v1の仕様変更を反映した結果です)。

*   その他小さな変更がいくつかの行われています。

以降のセクションでは、これらの変更点について詳しく解説していきます。

### オブジェクトや配列のダーティチェック

<!-- TODO: move me to data system concepts doc, summarize briefly here. -->

Polymer 1.xでは、ダーティチェックメカニズムを使用して、データシステムが余分な作業をするのを防いでいました。

Polymer 2.xにおいても、デフォルトでこのメカニズムの利用し続けていますが、要素がオブジェクトや配列のダーティチェックを実施するかどうかオプトアウト(ユーザー自身が利用を制限)できるようになっています。

デフォルトのダーティチェックメカニズムを使用した場合、次のコードが*プロパティエフェクト*を発生させることはありません。：

```
this.property.subproperty = 'new value!';
this.notifyPath('property');
```

`property`は引き続き同じオブジェクトを参照しておりダーティチェックは失敗し、サブプロパティの変更を伝播することがないからです。代わりに、Polymerの`set`メソッドや配列変更メソッドを使用するか、変更された正確なパスに対して`notifyPath`を呼び出す必要があります。：

```
this.set('property.subproperty', 'new value!');
// OR
this.property.subproperty = 'new value!';
this.notifyPath('property.subproperty');
```

一般的に、ダーティチェックメカニズムの利用はより効率的な手段と言えます。以下のいずれかの要件が当てはまるアプリケーションにおいてはうまく動作します。：

*   不変データを使用する。
*   小さな変更であっても常にPolymerのデータ変更メソッドを利用している。

一方で、不変データを使用しなかったり、Polymerのデータ変更メソッドを利用できないケースに対して、Polymer 2.0はオプションとして`MutableData`ミックスインを用意しています。`MutableData`ミックスインはダーティチェックを省略し、上記のコードは意図した通り動作します。また、*プロパティエフェクト*の発生前にいくつかの変更をバッチ処理することも可能になります。：

`this.property.arrayProperty.push({ name: 'Alice' });`

```js
this.property.stringProperty = 'new value!';
this.property.counter++;
this.notifyPath('property');
```

`set`メソッドを使うこともできますし、単にトップレベル(top-level)のプロパティを設定してプロパティエフェクトを発生させることもできます：

```
this.set('property', this.property);
// or
this.property = this.property;
```

特定のサブプロパティを変更するのに`set`メソッドを使用するのが最も効率的な場合があります。しかし、`MutableData`を利用する要素では、このAPIを使用する必要はありません。そうすることで、データバインディングや状態管理を行うライブラリとの互換性が向上するからです。

トップレベルでプロパティ設定し直すと、プロパティやそのサブプロパティ、また配列アイテムなどの*プロパティエフェクト*がすべて再実行さるので注意が必要です。ワイルドカードパスを指定したオブザーバー(例：`prop.*`)には、トップレベルの変更だけが通知されます。

```js
// 'property.*' observers fire with the path 'property'
this.property.deep.path = 'another new value';
this.notifyPath('property');
```

`set`メソッドを使って特定のパスを設定すると、細かな通知も生成されます。：


```js
// 'property.*' observers fire with the path 'property.deep.path'
this.set('property.deep.path', 'new value');
```


### よりシンプルな配列操作

`Polymer.Collection`APIとそれに関連した、配列のキーベースのパス指定及びsplice通知は削除されました。

この仕様変更には他にもいくつかの利点があります。：


*   プリミティブ値の配列をサポートします。
*   配列アイテムはユニークである必要はありません。


キー(key)パスが削除されたので、配列のsplice通知には`keySplices`ではなく`indexSplices`プロパティだけが含まれています。

### データ変更のバッチ処理

バインディングシステムにおけるデータの伝播をバッチで処理するようにないました。それによって、例えば複雑なオブザーバーや算出(computing)関数は、まとまった(coherent)変更をセットとして一度に実行されます。まとまった変更を作成するには、2つの方法があります。：

*   要素がプロパティを初期化する時は、まとまりのある変更のセットを自動的に生成します。

*   新しい`setProperties`メソッドを使用して、まとまりのある変更のセットをプログラムで生成することができます。

```
this.setProperties({ item: 'Orange', count: 12 });
```

単一プロパティのアクセサ(accessors)は、引き続きデータを同期的に伝播します。例えば、`a`と`b`の二つのプロパティを監視するオブザーバーがあるとします。以下の二つのサンプルがどのように動作するか見比べてみてください。：


```
// observer fires twice
this.a = 10;
this.b = 20;

// observer fires once
this.setProperties({a: 10, b: 20});
```

### プロパティエフェクトの順序

2.0では、オブザーバーは*プロパティ変更通知*の前に発火します。 2.0のプロパティエフェクトの順序は次のとおりです。

*   算出プロパティを再計算する。
*   データバインディングに値を伝播します。
*   プロパティを属性に反映します。
*   オブザーバーを実行する。
*   プロパティ変更通知を発行する。

1.xでは、オブザーバーはプロパティ変更通知の後、最後に発火されます。ions.

### オブザーバーの変更

2.0では、オブザーバーが未定義(undefined)の依存部をもったまま発火するのを防止するためのチェックが削除されました。

具体的には：

*   **一つでも**依存部が定義されていれば、複数プロパティオブザーバー、算出プロパティ、算出バインディングが初期化時に一度は実行されます。

*   今後オブザーバーまたは算出関数は、引数として`undefined`を受け取る可能性があるので、それを正しく扱う必要があります。

2.x also adds the ability to define observers and computed properties dynamically, on a per-instance
basis. For details, see
[Add observers and computed properties dynamically](devguide/observers#dynamic-observers).


### その他データシステムの変更点

*   算出バインディングで使用される関数を設定/変更すると、バインディングシステムは新しい関数と最新のプロパティ値を用いて再計算を行います。例えば、以下のようにバインディングを指定したとします。：

    ```js
    some-property="{{_computeValue(a, b)}}"
    ```

    Changing the `_computeValue` _function_ causes the binding to be re-evaluated, even if `a` and `b`
    remain the same:

    ```js
      this._computeValue = function(a, b) { ... }
    ```

*   Property change notifications (<code><em>property</em>-changed</code> events) aren't fired when
    the value changes as a result of a binding from the host.


*   In order for a property to be deserialized from its attribute, it must be declared in the
    <code>properties</code> metadata object. In Polymer 1.x, deserialization is also done for
    properties that are <em>implicitly</em> declared (for example, by being included in a binding or
    as an observer dependency).

## Polymer 1.0の互換レイヤ

Polymer 2.0は、現在のPolymer 1.0ユーザーが引き続きインポートできるように`polymer/ polymer.html`を残したままにしています。このインポートには、要素を定義するためのレガシーなPolymer関数が含まれ、Polymer 1.0 APIで書かれたコードの互換性を破綻させるような変更を最小限に抑えるよう努めています。

ほとんどの場合、Polymer 2.0にアップグレードする既存のユーザーに求められるのは、既存のコードを(コンテンツディストリビューションとスタイリングに関連する)Shadow DOM v1 APIに準拠させることと、Custom Elements v1 APIの仕様変更に伴うわずかな変更を加えるだけです。

## 削除されたメソッドとプロパティ

不必要なコードを減らすという目的に沿って、新たなES6ベースの要素`Polymer.Element`では、様々なメソッドやプロパティが取り除かれました。削除されたAPIはいくつかのカテゴリに分類されます。：

*   ネイティブDOM APIに付加されていたシンプルな機能。(例：`fire`や`trasform`)
*   まれにしか使用されない属性とプロパティ(例：`attributeFollows`や`classFollows`など)
*   インスタンスに属していないメソッドやプロパティ(例：1.xでは、`importHref`はインスタンスメソッドでしたが、コールバックのバインディング以外はインスタンス固有の処理は行いませんでした。)

削除または移管されたAPIの包括的なリストは、`Polymer.Element`APIの最終的な仕様の決定後に公開予定です。

## ブラウザのサポートとポリフィル

リリース時点においてPolymer 2.0は、Polymer 1.xと同ように次のブラウザをサポートします。Polymer 1.0ーIE 11、Edge、Safari（9+）、Chrome、Opera、Firefox

Polymer 2.0はCustom ElementsとShadow DOMの新しい仕様(v1)への互換ポリフィルと一緒に開発されテストされてきました。Polymer 2.0をテストするには、`1.0.0-rc.7`より上位バージョンの`webcomponentsjs`を使用します。webcomponentsjsはbowerが提供するPoymer 2.xに依存対象として含まれます。

ポリフィルを読み込む方法はいくつか存在します。：

*   `webcomponents-lite.js`には、サポート対象の全ブラウザで動作するのに必要なすべてのポリフィルが含まれています。
*   `webcomponents-loader.js`は、実行時に機能検出(feature-detection)を行い、必要な場合に限りポリフィルを読み込みます。

上記以外の方法とその長所と短所について解説を読む：
*   [webcomponentsjs on GitHub](https://github.com/webcomponents/webcomponentsjs/blob/master/README.md)

## EcmaScript 2015(別名：ES6)

Polymer 2.xや2.xのクラススタイルの要素は、次世代のJavaScript標準であるEcmaScript 2015(一般的にはES6として知られています)を使用して記述されています。これは、新たなCustom Elementの仕様の要求によるものです。ES6に精通していない場合は、Polymerで使用されるES6の基本を理解することが役立ちます。特に、次の機能はコード例で広く使用されています。：


* [ES6 classes](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes)
* [Shorthand property and method names](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Object_initializer#New_notations_in_ECMAScript_2015)
* [Arrow functions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions)
* [Template literals](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals)

ウェブ上には、以下のような様々な学習素材が用意されています。：

* [You Don't Know JS: ES6 and Beyond](https://github.com/getify/You-Dont-Know-JS/blob/master/es6%20&%20beyond/README.md#you-dont-know-js-es6--beyond)

現在のChrome、Safari 10、Safari Technology Preview、Firefox、およびEdgeでは、ES6をコンパイルすることなく実行できます。IE11とSafari 9でPolymer 2.xを実行するにはコンパイルが必要です。

Polymer CLI及び`polymer-build`ライブラリは、ビルド時のES6からES5へのトランスパイルをサポートします。さらに、ブラウザが必要とする場合には、`polymer serve`や`polymer test`といったコマンドを実行時にトランスパイルすることも可能です。

For more information, see [Browser compatibility]().
より詳細な情報は、[Browser compatibility](browsers#es6)を参照してください。

## Polymer 2.0のインストール {#installing}

bowerを使って、最新のPolymer 2.0 RC(リリース候補)をインストールできます。

```
bower install --save Polymer/polymer#^2.0.0
```

bowerを使って、現時点で利用可能なハイブリッド要素をインストールすることもできます。：

```
bower install --save PolymerElements/paper-button#^2.0.0
```

### 既存のプロジェクトをアップグレード {#upgrading}

既存のコードをPolymer 2.0上で動作させる方法については、[Upgrade guide](upgrade)を参照してください。

## Polymer要素の可用性 {#elements}

開発チームは、Polymer 1.7+と2.xの双方に互換性のある、新しい「ハイブリッド」フォーマットを利用できるようにPolymer要素をアップデート中です。

以下の要素はすでにPolymer 2.0をサポートするようにアップデートが完了しています。また、アップデートも不要です。：

<ul>
<li><a href="https://github.com/PolymerElements/app-layout">app-layout</a></li>
<li><a href="https://github.com/PolymerElements/app-localize-behavior">app-localize-behavior</a></li>
<li><a href="https://github.com/PolymerElements/app-pouchdb">app-pouchdb</a></li>
<li><a href="https://github.com/PolymerElements/app-route">app-route</a></li>
<li><a href="https://github.com/PolymerElements/app-storage">app-storage</a></li>
<li><a href="https://github.com/PolymerElements/gold-zip-input">gold-zip-input</a></li>
<li><a href="https://github.com/PolymerElements/iron-a11y-announcer">iron-a11y-announcer</a></li>
<li><a href="https://github.com/PolymerElements/iron-a11y-keys">iron-a11y-keys</a></li>
<li><a href="https://github.com/PolymerElements/iron-a11y-keys-behavior">iron-a11y-keys-behavior</a></li>
<li><a href="https://github.com/PolymerElements/iron-ajax">iron-ajax</a></li>
<li><a href="https://github.com/PolymerElements/iron-autogrow-textarea">iron-autogrow-textarea</a></li>
<li><a href="https://github.com/PolymerElements/iron-behaviors">iron-behaviors</a></li>
<li><a href="https://github.com/PolymerElements/iron-checked-element-behavior">iron-checked-element-behavior</a></li>
<li><a href="https://github.com/PolymerElements/iron-collapse">iron-collapse</a></li>
<li><a href="https://github.com/PolymerElements/iron-component-page">iron-component-page</a></li>
<li><a href="https://github.com/PolymerElements/iron-demo-helpers">iron-demo-helpers</a></li>
<li><a href="https://github.com/PolymerElements/iron-doc-viewer">iron-doc-viewer</a></li>
<li><a href="https://github.com/PolymerElements/iron-dropdown">iron-dropdown</a></li>
<li><a href="https://github.com/PolymerElements/iron-fit-behavior">iron-fit-behavior</a></li>
<li><a href="https://github.com/PolymerElements/iron-flex-layout">iron-flex-layout</a></li>
<li><a href="https://github.com/PolymerElements/iron-form-element-behavior">iron-form-element-behavior</a></li>
<li><a href="https://github.com/PolymerElements/iron-icon">iron-icon</a></li>
<li><a href="https://github.com/PolymerElements/iron-icons">iron-icons</a></li>
<li><a href="https://github.com/PolymerElements/iron-iconset">iron-iconset</a></li>
<li><a href="https://github.com/PolymerElements/iron-iconset-svg">iron-iconset-svg</a></li>
<li><a href="https://github.com/PolymerElements/iron-image">iron-image</a></li>
<li><a href="https://github.com/PolymerElements/iron-input">iron-input</a></li>
<li><a href="https://github.com/PolymerElements/iron-jsonp-library">iron-jsonp-library</a></li>
<li><a href="https://github.com/PolymerElements/iron-label">iron-label</a></li>
<li><a href="https://github.com/PolymerElements/iron-list">iron-list</a></li>
<li><a href="https://github.com/PolymerElements/iron-localstorage">iron-localstorage</a></li>
<li><a href="https://github.com/PolymerElements/iron-location">iron-location</a></li>
<li><a href="https://github.com/PolymerElements/iron-media-query">iron-media-query</a></li>
<li><a href="https://github.com/PolymerElements/iron-menu-behavior">iron-menu-behavior</a></li>
<li><a href="https://github.com/PolymerElements/iron-meta">iron-meta</a></li>
<li><a href="https://github.com/PolymerElements/iron-overlay-behavior">iron-overlay-behavior</a></li>
<li><a href="https://github.com/PolymerElements/iron-pages">iron-pages</a></li>
<li><a href="https://github.com/PolymerElements/iron-range-behavior">iron-range-behavior</a></li>
<li><a href="https://github.com/PolymerElements/iron-resizable-behavior">iron-resizable-behavior</a></li>
<li><a href="https://github.com/PolymerElements/iron-scroll-target-behavior">iron-scroll-target-behavior</a></li>
<li><a href="https://github.com/PolymerElements/iron-scroll-threshold">iron-scroll-threshold</a></li>
<li><a href="https://github.com/PolymerElements/iron-selector">iron-selector</a></li>
<li><a href="https://github.com/PolymerElements/iron-test-helpers">iron-test-helpers</a></li>
<li><a href="https://github.com/PolymerElements/iron-validatable-behavior">iron-validatable-behavior</a></li>
<li><a href="https://github.com/PolymerElements/iron-validator-behavior">iron-validator-behavior</a></li>
<li><a href="https://github.com/PolymerElements/marked-element">marked-element</a></li>
<li><a href="https://github.com/PolymerElements/neon-animation">neon-animation</a></li>
<li><a href="https://github.com/PolymerElements/paper-badge">paper-badge</a></li>
<li><a href="https://github.com/PolymerElements/paper-behaviors">paper-behaviors</a></li>
<li><a href="https://github.com/PolymerElements/paper-button">paper-button</a></li>
<li><a href="https://github.com/PolymerElements/paper-card">paper-card</a></li>
<li><a href="https://github.com/PolymerElements/paper-checkbox">paper-checkbox</a></li>
<li><a href="https://github.com/PolymerElements/paper-dialog">paper-dialog</a></li>
<li><a href="https://github.com/PolymerElements/paper-dialog-behavior">paper-dialog-behavior</a></li>
<li><a href="https://github.com/PolymerElements/paper-dialog-scrollable">paper-dialog-scrollable</a></li>
<li><a href="https://github.com/PolymerElements/paper-drawer-panel">paper-drawer-panel</a></li>
<li><a href="https://github.com/PolymerElements/paper-dropdown-menu">paper-dropdown-menu</a></li>
<li><a href="https://github.com/PolymerElements/paper-fab">paper-fab</a></li>
<li><a href="https://github.com/PolymerElements/paper-header-panel">paper-header-panel</a></li>
<li><a href="https://github.com/PolymerElements/paper-icon-button">paper-icon-button</a></li>
<li><a href="https://github.com/PolymerElements/paper-input">paper-input</a></li>
<li><a href="https://github.com/PolymerElements/paper-item">paper-item</a></li>
<li><a href="https://github.com/PolymerElements/paper-listbox">paper-listbox</a></li>
<li><a href="https://github.com/PolymerElements/paper-material">paper-material</a></li>
<li><a href="https://github.com/PolymerElements/paper-menu-button">paper-menu-button</a></li>
<li><a href="https://github.com/PolymerElements/paper-progress">paper-progress</a></li>
<li><a href="https://github.com/PolymerElements/paper-radio-button">paper-radio-button</a></li>
<li><a href="https://github.com/PolymerElements/paper-radio-group">paper-radio-group</a></li>
<li><a href="https://github.com/PolymerElements/paper-ripple">paper-ripple</a></li>
<li><a href="https://github.com/PolymerElements/paper-scroll-header-panel">paper-scroll-header-panel</a></li>
<li><a href="https://github.com/PolymerElements/paper-slider">paper-slider</a></li>
<li><a href="https://github.com/PolymerElements/paper-spinner">paper-spinner</a></li>
<li><a href="https://github.com/PolymerElements/paper-styles">paper-styles</a></li>
<li><a href="https://github.com/PolymerElements/paper-swatch-picker">paper-swatch-picker</a></li>
<li><a href="https://github.com/PolymerElements/paper-tabs">paper-tabs</a></li>
<li><a href="https://github.com/PolymerElements/paper-toast">paper-toast</a></li>
<li><a href="https://github.com/PolymerElements/paper-toggle-button">paper-toggle-button</a></li>
<li><a href="https://github.com/PolymerElements/paper-toolbar">paper-toolbar</a></li>
<li><a href="https://github.com/PolymerElements/paper-tooltip">paper-tooltip</a></li>
<li><a href="https://github.com/PolymerElements/platinum-sw">platinum-sw</a></li>
<li><a href="https://github.com/firebase/polymerfire">polymerfire</a></li>
<li><a href="https://github.com/PolymerLabs/note-app-elements">polymerlabs/note-app-elements</a></li>
<li><a href="https://github.com/PolymerElements/prism-element">prism-element</a></li>
</ul>

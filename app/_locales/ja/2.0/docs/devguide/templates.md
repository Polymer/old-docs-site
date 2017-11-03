---
title: ヘルパーエレメントによるデータバインディング
---

<!-- toc -->

Polymerは、一般的なデータバインディングのユースケースに備えて各種Custom Elementsを提供しています。：

-   テンプレートリピーター(`dom-repeat`)：配列アイテムごとに、テンプレートのコンテンツでインスタンスを生成します。
-   配列セレクタ：構造化されたデータの配列において選択状態を管理します。
-   条件付きテンプレート(`dom-if`)：指定された条件が`true`なら、そのコンテンツをスタンプします。
-   自動バインディングテンプレート(`dom-bind`)：Polymer Element外部でデータバインディングが利用できます。

**2.0向けのヒント**：データバインディングのヘルパーエレメントは、下位バージョンと互換性のある`polymer.html`をインポートする際にバンドルされています。レガシーなインポートを利用しない場合、あなたが使用したヘルパーエレメントを個別にインポートする必要があります。
{.alert .alert-info}

## テンプレートリピーター(dom-repeat) {#dom-repeat}

テンプレートリピーターは、配列のバインドに特化したテンプレートです。配列内の各アイテムごとに、テンプレートのコンテンツのインスタンスを一つ生成します。各インスタンスは、次のプロパティを含む新たな[データバインディングのスコープ](data-system#data-binding-scope)を作成します。：

*   `item`. The array it*   `item`：インスタンスの作成に使用された配列のアイテム
*   `index`：配列内の`item`のインデックス(配列がソートまたはフィルタリングされると、`index`の値は変化します)

テンプレートリピーターを利用するには二つの方法があります。：

*   **Polymer Element内またはPolymerが管理する他のテンプレートの内では**、`<template is="dom-repeat>`という省略記法を使用してください。 

    ~~~html
    <template is="dom-repeat" items="{{items}}">
    ...
    </template>
    ~~~

*   **Polymerが管理するテンプレートの外側では**、ラッパーエレメント`<dom-repeat>`を使用します。

    ~~~html
    <dom-repeat>
      <template>
        ...
      </template>
    </dom-repeat>
    ~~~

    このフォームでは、通常、プロパティ`items`を命令的に設定します。：

    ~~~javascript
    var repeater = document.querySelector('dom-repeat');
    repeater.items = someArray;
    ~~~


Polymerが管理するテンプレートには、Polymer Elementのテンプレートや、`dom-bind`、`dom-if`、`dom-repeat`に属するテンプレート、あるいは`Templatizer`によって管理されるテンプレートが含まれます。

ほとんどのケースにおいて、`dom-repeat`には、一番目(省略形)のフォームを使用することになるでしょう。

テンプレートリピーターは後方互換性を確保するため、レガシーなインポート(`polymer.html`)によって取り込まれます。もし`polymer.html`をインポートしない場合は、次のコードに示すよう`dom-repeat.html`をインポートして下さい。


例：{ .caption }em used to create this instance.
*   `index`：配列内の`item`のインデックス（配列がソートまたはフィルタリングされた場合、`index`の値は変更されます）

There are two ways to use a template repeater:

*   **Polymerエレメントやその他のPolymerの管理するテンプレート内部の場合** 省略形で記述してください。
    `<template is="dom-repeat">`.

        <template is="dom-repeat" items="{{items}}">
          ...
        </template>

*   **Polymerの管理するテンプレートの外部の場合** ラッパーエレメントに`<dom-repeat>`を使用してください:

        <dom-repeat>
          <template>
            ...
          </template>
        </dom-repeat>

    この形式においては通常、命令的に`items`プロパティを設定します。:

        var repeater = document.querySelector('dom-repeat');
        repeater.items = someArray;

Polymerによって管理されるテンプレートには、Polymerエレメントのテンプレートの他に、`dom-bind`、`dom-if`、`dom-repeat`といった派生的なテンプレートや`Templatize`ライブラリによって管理されるテンプレートが含まれます。

ほとんどのケースにおいて、`dom-repeat`には最初の(省略形の)形式を使います。

テンプレートリピーターは、下位互換性のためにレガシー(`polymer.html`)インポートに含まれています。
`polymer.html`をインポートしない場合は、下のコードに示すように`dom-repeat.html`を個別にインポートしてください。

例: { .caption }

```html
<link rel="import" href="components/polymer/polymer-element.html">
<! -- import template repeater -->
<link rel="import" href="components/polymer/lib/elements/dom-repeat.html">

<dom-module id="x-custom">
  <template>

    <div> Employee list: </div>
    <template is="dom-repeat" items="{{employees}}">
        <div># [[index]]</div>
        <div>First name: <span>[[item.first]]</span></div>
        <div>Last name: <span>[[item.last]]</span></div>
    </template>

  </template>

  <script>
    class XCustom extends Polymer.Element {

      static get is() { return 'x-custom'; }

      static get properties() {
        return {
          employees: {
            type: Array,
            value() {
              return [
                {first: 'Bob', last: 'Smith'},
                {first: 'Sally', last: 'Johnson'},
              ];
            }
          }
        }
      }

    }

    customElements.define(XCustom.is, XCustom);
  </script>

</dom-module>
```

`item`のサブプロパティの変更通知は、テンプレートのインスタンスに転送され、一般的な[変更通知イベント](data-system#change-events)を使用して更新されます。配列`items`が双方向バインディングデリミタを使ってバインドされている場合、個々のアイテムの変更を上に向けて流すこともできます。

テンプレートリピーターが変更を反映するには、配列`items`を監視できるように更新する必要があります。例えば：

```js
// Use Polymer array mutation methods:
this.push('employees', {first: 'Diana', last: 'Villiers'});

// Use Polymer set method:
this.set('employees.2.last', 'Maturin');

// Use native methods followed by notifyPath
this.employees.push({first: 'Barret', last: 'Bonden'});
this.notifyPath('employees');
```

詳細については、[オブジェクトと配列を監視可能(observable)に変更する](data-system#make-observable-changesy)を参照してください。


### `dom-repeat`テンプレート内のイベントの処理 {#handling-events}

`dom-repeat`テンプレートのインスタンスから生成されたイベントを処理する際、イベントが発生したエレメントと、アイテムを生成したモデルデータをマッピングしたいことが頻繁にあるかもしれません。

`<dom-repeat>`テンプレートの**内部に**宣言型イベントハンドラを追加すると、リピーターはリスナーに送られてきた各イベントに`model`プロパティを付加します。`model`オブジェクトには、テンプレートのインスタンスを生成するのに使用したスコープデータが含まれており、アイテムのデータは`model.item`になります。

```html
<link rel="import" href="polymer/polymer-element.html">
<link rel="import" href="polymer/lib/elements/dom-repeat.html">

<dom-module id="x-custom">

  <template>
    <template is="dom-repeat" id="menu" items="{{menuItems}}">
        <div>
          <span>{{item.name}}</span>
          <span>{{item.ordered}}</span>
          <button on-click="order">Order</button>
        </div>
    </template>
  </template>

  <script>
    class XCustom extends Polymer.Element {

      static get is() { return 'x-custom'; }

      static get properties() {
        return {
          menuItems: {
            type: Array,
            value() {
              return [
                {name: 'Pizza', ordered: 0},
                {name: 'Pasta', ordered: 0},
                {name: 'Toast', ordered: 0}
              ];
            }
          }
        }
      }

      order(e) {
        e.model.set('item.ordered', e.model.item.ordered+1);
      }
    }

    customElements.define(XCustom.is, XCustom);
  </script>

</dom-module>
```

`model`は`TemplateInstance`のインスタンスであり、Polymerのデータ関連のAPI：`get`、`set`、`setProperties`、`notifyPath`に加えて、配列変更メソッドを持っています。テンプレートのインスタンスに関連したパスを用いることで、これらAPIを`model`の操作に利用できます。

例えば、上記のコードでは、ユーザーが**ピザ**の横にあるボタンをクリックすると、ハンドラは以下のコードを実行します。：

```js
e.model.set('item.ordered', e.model.item.ordered+1);
```

これによって、`item`の(この場合はピザの)注文数を増やします。

**`model`オブジェクトでは、バインドされたデータのみ利用可能です。**`dom-repeat`内部で、実際にバインドされたプロパティだけが`model`オブジェクトに追加されます。そのため場合によっては、イベントハンドラからプロパティへアクセスが必要な場合、テンプレート内のプロパティにバインドする必要があるかもしれません。例えば、ハンドラが`productId`プロパティにアクセスする必要がある場合、単にそのプロパティを表示に影響を与えないプロパティにバインドします。

```html
  <template is="dom-repeat" items="{{products}}" as="product">
    <div product-id="[[product.productId]]">[[product.name]]</div>
  </template>
```

#### `dom-repeat`テンプレートの外側におけるイベント処理

(`addEventListener`を使って)命令的に登録されたリスナーや、特定の`dom-repeat`テンプレートの親ノードに設定されたリスナーに対して、`model`プロパティが付加されることはありません。これらのケースでは、指定されたエレメントから生成されたモデルデータを検索するために`dom-repeat`の`modelForElement`メソッドを利用できます。(また`itemForElement`や`indexForElement`に相当するメソッドも存在します。)
{ .alert .alert-info }


### リストのフィルタリングとソーティング

表示されたリストのアイテムをフィルタリングまたはソートをするには、`dom-repeat`に`filter`または`sort`(あるいはその両方)プロパティを指定します：

*   `filter`：単一の引数(アイテム)をとる`filter`コールバック関数を指定します。関数からの返り値が`true`ならアイテムを表示して、`false`なら省略します。これは標準の`Array`の[filter](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter)APIに**似ていますが**、コールバックは引数に一つの配列アイテムしか取らない点に注意してください。パフォーマンス上の理由から、引数`index`は含まれません。詳細については、[配列インデックスのフィルタリング](#filtering-and-sorting-lists)を参照してください。
*   `sort`：標準の`Array`の[sort](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort)APIに準じて比較関数を指定します。

いずれの場合もその値は、関数オブジェクトでも、ホストエレメント上で定義された関数を指示する文字列でも構いません。

デフォルトでは、`filter`及び`sort`関数は、次のいずれかが発生した時だけ実行されます。

*   配列に[監視可能(observable)な変化](data-system#observable-changes)が生じた。(例えば、アイテムの追加または削除によって)
*   `filter`または`sort`関数が変更された。.

関連のないデータの一部が変更された時に、`filter`や`sort`を再実行するには[render](#synchronous-renders)を呼び出してください。例えば、エレメントに`sort`関数の動作を変更する`sortOrder`プロパティがある場合、`sortOrder`に変更があったときに`render`を呼び出すことができます。

`items`の特定のサブフィールドに変更があった時に、`filter`または`sort`関数を再実行するには、サブフィールド`item`のスペース区切りのリストに`observe`プロパティを設定します。そうすることで、再度フィルタリングやそーとが行われるでしょう。

例えば、`dom-repeat`で次のようなフィルター処理を行なったとします。：

```
isEngineer(item) {
    return item.type == 'engineer' || item.manager.type == 'engineer';
}
```

この時、`observe`プロパティは次のように設定する必要があります。

```
<template is="dom-repeat" items="{{employees}}"
    filter="isEngineer" observe="type manager.type">
```

`manager.type`フィールドを変更すると、リストが再ソートされるはずです：

```
this.set('employees.0.manager.type', 'engineer');
```

#### ソートとフィルターの動的な変更

`observe`プロパティを使って、指定したアイテムのサブプロパティをフィルタリングやソートのために監視できます。しかし、場合によっては、他の関係を持たない値に基づきフィルタやソートを動的に変更したいことがあるかもしれません。このような場合には、算出バインディングを使用し、依存関係にあるプロパティが(一つ以上)変更された時に、動的にフィルタまたはソート関数を返すことができます。

```html
<dom-module id="x-custom">

  <template>
    <input value="{{searchString::input}}">

    <!-- computeFilter returns a new filter function whenever searchString changes -->
    <template is="dom-repeat" items="{{employees}}" as="employee"
        filter="{{computeFilter(searchString)}}">
        <div>{{employee.lastname}}, {{employee.firstname}}</div>
    </template>
  </template>

  <script>
    class XCustom extends Polymer.Element {

      static get is() { return 'x-custom'; }

      static get properties() {
        return {
          employees: {
            type: Array,
            value() {
              return [
                { firstname: "Jack", lastname: "Aubrey" },
                { firstname: "Anne", lastname: "Elliot" },
                { firstname: "Stephen", lastname: "Maturin" },
                { firstname: "Emma", lastname: "Woodhouse" }
              ]
            }
          }
        }
      }

      computeFilter(string) {
        if (!string) {
          // set filter to null to disable filtering
          return null;
        } else {
          // return a filter function for the current search string
          string = string.toLowerCase();
          return function(employee) {
            var first = employee.firstname.toLowerCase();
            var last = employee.lastname.toLowerCase();
            return (first.indexOf(string) != -1 ||
                last.indexOf(string) != -1);
          };
        }
      }
    }

    customElements.define(XCustom.is, XCustom);
  </script>
</dom-module>
```

この例では、`searchString`プロパティの値が変更されるたび`computeFilter`が呼び出され、`filter`プロパティの新しい値を算出します。

#### 配列インデックスによるフィルタリング {#filtering-on-index}

Polymer内部における配列の記録(track)方法のために、配列のインデックスはフィルタ関数に渡されません。配列インデックスでアイテムを参照する際の計算量はO(n)です。これをフィルター関数上で実行ことを考えると**パフォーマンスにとても大きな影響**が想定されます。

配列インデックスを参照する必要があり、パフォーマンス上の負荷を許容できる場合、次のようなコードを使用できます。：

```js
filter: function(item) {
  var index = this.items.indexOf(item);
  ...
}
```

フィルター関数は`dom-repeat`を`this`の値として呼び出されるので、`this.items`で元の配列にアクセスして、それをインデックスの参照に使用することができます。

この参照は、**元の**配列のインデックスを返します。このインデックスは、表示された(フィルター・ソートされた)配列のインデックスと一致しない可能性があります。

### dom-repeatテンプレートのネスト {#nesting-templates}

複数の`dom-repeat`テンプレートをネストした際、親のスコープからデータにアクセスしたいかもしれません。 `dom-repeat`の内部では、現在のスコープ内のプロパティによって隠蔽されない限り、親のスコープで利用可能なすべてのプロパティにアクセスできます。

例えば、`dom-repeat`によって追加されたデフォルト値の`item`と`index`プロパティは、親のスコープにある同名のプロパティを覆い隠します。

ネストされた`dom-repeat`テンプレートからプロパティにアクセスするには、`as`属性を使用して`item`のプロパティに別の名前を割り当てます。`index`プロパティに別の名前を割り当てるには、`index-as`属性を使用します。

```html
<div> Employee list: </div>
<template is="dom-repeat" items="{{employees}}" as="employee">
    <div>First name: <span>{{employee.first}}</span></div>
    <div>Last name: <span>{{employee.last}}</span></div>

    <div>Direct reports:</div>

    <template is="dom-repeat" items="{{employee.reports}}" as="report" index-as="report_no">
      <div><span>{{report_no}}</span>.
           <span>{{report.first}}</span> <span>{{report.last}}</span>
      </div>
    </template>
</template>
```

### 同期レンダリングを強制 {#synchronous-renders}

[render](/{{{polymer_version_dir}}}/docs/api/elements/Polymer.DomRepeat#method-render)を呼び出すことで、データへのどんな変更に対しても`dom-repeat`テンプレートのレンダリングが同期的に行われるよう強制します。通常、変更はバッチ処理で非同期にレンダリングされます。同期的レンダリングにはパフォーマンス上の負荷があるものの、いくつかのシナリオでは役立つでしょう。：

*   ユニットテストにおいて、生成されたDOMをチェックする前にアイテムがレンダリングされていることを保証する。
*   特定のアイテムへスクロールする前に、アイテムのリストがレンダリングされていることを保証する。
*   データの一部が配列の*外部で*変更されたとき(例えば、ソート順序やフィルタ条件など)、`sort`や`filter`関数を再実行する。

`render`は、Polymerの[配列の変更メソッド](model-data#array-mutation)によって発生するような[監視可能(observable)な変化](data-system#observable-changes)**だけ**検出します。

テンプレートが*監視不能な変更*を検出するようにするには、[テンプレートを強制的に更新する](#forcing-the-template-to-update)を参照してください 。

### テンプレートを強制的に更新 {#update-data}

開発者やサードパーティーライブラリが、Polymerのメソッドを**使用せず**配列を変更する場合、次のいずれかを実行できます。：

*   配列の変更箇所を正確に把握している場合は、[notifySplices](model-data#notifysplices)を使用することで、配列を監視するすべてのエレメントに適切に通知されるようにします。

*   配列のクローンを作成します。

    ```js
    // Set items to a shallow clone of itself
    this.items = this.items.slice();
    ```

    データ構造が複雑な場合、深いクローン(deep clone)が必要になることがあります。tructures, a deep clone may be required.

*   変更箇所を正確に把握していない場合は、`dom-repeat`上で[mutableData](/{{{polymer_version_dir}}}/docs/api/elements/Polymer.DomRepeat#property-mutableData)プロパティを設定して、配列へのダーティチェックを無効にできます。

      ```html
      <template is="dom-repeat" items="{{items}}" mutable-data> ... </template>
      ```

      `mutableData`セットを使用して、配列上で`notifyPath`を呼び出すと配列全体が再評価されます。

      ```js
      //
      this.notifyPath('items');
      ```

    詳細については、[MutableDataミックスインの使用data-system#mutable-data)を参照してください。

配列やPolymerデータシステムとの連携に関する詳細は、[配列との連携](model-data#work-with-arrays)を参照してください。

### 大規模リストにおけるパフォーマンス向上 {#large-list-perf}

デフォルトでは、`dom-repeat`は、一度にすべてのアイテムリストをレンダリングしようとします。非常に大きなアイテムリストのレンダリングに`dom-repeat`使用しようとすると、レンダリングの最中UIがフリーズするかもしれません。この問題に直面した場合は、[initialCount](/{{{polymer_version_dir}}}/docs/api/elements/Polymer.DomRepeat#property-initialCount)を設定して「チャンクされた(chunked)」レンダリングを有効にします。チャンクモードでは、 `dom-repeat`は最初に`initialCount`で指定されたアイテムをレンダリングし、残りのアイテムはアニメーションフレーム単位で、チャンクを順番にレンダリングしていきます。これにより、UIスレッドはチャンクの間であってもユーザー入力を処理することができます。[renderedItemCount](/{{{polymer_version_dir}}}/docs/api/elements/Polymer.DomRepeat#property-renderedItemCount)プロパティ(読み取り専用)を使って、すでにレンダリングされたアイテム数を追跡することもできます。

`dom-repeat`は、各チャンクでレンダリングされるアイテムの数を調整することで、ターゲットのフレームレートを維持します。また[targetFramerate](/{{{polymer_version_dir}}}/docs/api/elements/Polymer.DomRepeat#property-targetFramerate)の設定によってレンダリングを調整することもできます。

さらに[delay](/{{{polymer_version_dir}}}/docs/api/elements/Polymer.DomRepeat#property-delay)プロパティを設定することで、`filter`や`sort`関数が再実行される前に、一定の経過時間(デバウンス時間)を確保することもできます。

## 配列の選択のデータバインド(array-selector) {#array-selector}

構造化されたデータを同期するには、バインドされたデータのパスの関係をPolymerが把握していなければいけません。`array-selector`エレメントは、配列内から特定のアイテムが選択された際にパスの結合を保証してくれます。

`items`プロパティは、ユーザーデータの配列をアプリケーションの他の部分に結合されているかもしれない`selected`プロパティを更新するために`select(item)`や`deselect(item)`を呼び出します。`selected`のアイテム(群)のサブフィールドへの変更は、配列`items`内のアイテムと同期的に保たれます。

配列セレクタ(array selector)は、一つまたは複数の選択をサポートします。`multi`が`false`の場合、`selected`プロパティは最後に選択したアイテムを表します。 `multi`が`true`の場合、`selected`プロパティは選択されたアイテム群の配列になります。

配列セレクタは、後方互換性を確保するためにレガシー(`polymer.html`)インポートに含まれています。 `polymer.html`をインポートしない場合は、以下のコードに示すように`array-selector.html`をインポートしてください。

```html
<link rel="import" href="components/polymer/polymer-element.html">
<! -- import template repeater -->
<link rel="import" href="components/polymer/lib/elements/dom-repeat.html">
<!-- import array selector -->
<link rel="import" href="components/polymer/lib/elements/array-selector.html">

<dom-module id="x-custom">

  <template>

    <div> Employee list: </div>
    <template is="dom-repeat" id="employeeList" items="{{employees}}">
        <div>First name: <span>{{item.first}}</span></div>
        <div>Last name: <span>{{item.last}}</span></div>
        <button on-click="toggleSelection">Select</button>
    </template>

    <array-selector id="selector" items="{{employees}}" selected="{{selected}}" multi toggle></array-selector>

    <div> Selected employees: </div>
    <template is="dom-repeat" items="{{selected}}">
        <div>First name: <span>{{item.first}}</span></div>
        <div>Last name: <span>{{item.last}}</span></div>
    </template>

  </template>

  <script>
    class XCustom extends Polymer.Element {

      static get is() { return 'x-custom'; }

      static get properties() {
        return {
          employees: {
            type: Array,
            value() {
              return [
                {first: 'Bob', last: 'Smith'},
                {first: 'Sally', last: 'Johnson'},
                // ...
              ];
            }
          }
        }
      }

      toggleSelection(e) {
        var item = this.$.employeeList.itemForElement(e.target);
        this.$.selector.select(item);
      }
    }

    customElements.define(XCustom.is, XCustom);
  </script>

</dom-module>
```

## 条件付きテンプレート(dom-if) {#dom-if}

エレメントは、ブーリアンプロパティに基づいて条件付きでスタンプすることができます。これを実現するには、`dom-if`と呼ばれる独自の`HTMLTemplateElement`型の拡張を使ってエレメントをラップします。`dom-if`テンプレートは、その`if`プロパティが`true`になった時だけそのコンテンツをDOM内にスタンプします。

`if`プロパティが再度`false`になった場合、デフォルトでは、スタンプされたすべてのエレメントは非表示になります(ただし、DOMツリーには残ります)。この仕組みによって、`if`プロパティが再び`true`になった際、より高速なパフォーマンスを実現します。この動作を無効にするには、`restamp`プロパティを`true`に設定します。この場合には、エレメントは毎回破棄され再スタンプされるので、`if`による切り替え動作は遅くなります。

条件付きテンプレートを使用する方法は二つあります。：

*   **Polymer Elementまたは他のPolymerの管理するテンプレート内では、**省略記法`<template is="dom-repeat">`を使用してください。

    ~~~html
    <template is="dom-if" if="{{condition}}">
      ...
    </template>
    ~~~
*   **Polymerの管理するテンプレートの外側では**、ラッパーエレメント`<dom-if>`を使用します。

    ~~~html
    <dom-if>
      <template>
        ...
      </template>
    </dom-if>
    ~~~

    このフォームでは、通常、`items`プロパティは命令的に設定します。：

    ~~~javascript
    var conditional = document.querySelector('dom-if');
    conditional.if = true;
    ~~~


Polymerが管理するテンプレートには、Polymer Elementのテンプレートや、`dom-bind`、`dom-if`、`dom-repeat`に属するテンプレート、あるいは`Templatizer`によって管理されるテンプレートが含まれます。

ほとんどのケースにおいて、`dom-repeat`には、一番目(省略形)のフォームを使用することになるでしょう。

テンプレートリピーターは後方互換性を確保するため、レガシーなインポート(`polymer.html`)によって取り込まれます。もし`polymer.html`をインポートしない場合は、次のコードに示すよう`array-selector.html`をインポートして下さい。

以下は、条件付きテンプレートがどのように動作するのかを示す簡単な例です。条件付きテンプレートの推奨された利用法は後述のガイダンスを参照してください。

例： { .caption }

```
<link rel="import" href="components/polymer/polymer-element.html">
<! -- import conditional template -->
<link rel="import" href="components/polymer/lib/elements/dom-if.html">

<dom-module id="x-custom">

  <template>

    <!-- All users will see this -->
    <my-user-profile user="{{user}}"></my-user-profile>


    <template is="dom-if" if="{{user.isAdmin}}">
      <!-- Only admins will see this. -->
      <my-admin-panel user="{{user}}"></my-admin-panel>
    </template>

  </template>

  <script>
    class XCustom extends Polymer.Element {

      static get is() { return 'x-custom'; }

      static get properties() {
        return {
          user: Object
        }
      }

    }

    customElements.define(XCustom.is, XCustom);
  </script>

</dom-module>
```

条件付きテンプレートを使用すると多少のオーバーヘッドが発生するため、CSSを使用することで容易に表示/非表示にできるような小さなUIエレメントには使用すべきでありません。

代わりに、読み込み時間を改善させたり、ページのメモリ容量を減らすために条件付きテンプレートを使って下さい。例えば：

-   ページ中のセクションをレイジーロードする。最初の描画時に必要のないページ中の一部エレメントは、`dom-if`を使用してその定義が読み込みを終えるまで非表示にすることができます。この条件付きテンプレートの利用法に関しては、[ケーススタディ：ショップアプリ](/{{{polymer_version_dir}}}/toolbox/case-study#views)で説明しています。

-   大規模サイトや複雑なサイトにおいてメモリの使用量を削減します。複雑なビューを複数持つシングルページアプリケーション(SPA)では、`restamp`プロパティが設定された`dom-if`の中に各ビューを置くのは有効かもしれません。これにより、ユーザーが表示を切り替える(その箇所のDOMを再生成する)たびに、ある程度のレイテンシは犠牲になりますが、メモリの利用効率が改善されます。

条件付きテンプレートをどんな場面で利用するかについて、どんな場合にも当てはまる画一的な指針はありません。サイトのプロファイリングは、条件付きテンプレートの効果的な使い所を把握するために役立つでしょう。

## 自動バインディングテンプレート(dom-bind) {#dom-bind}

Polymer data binding is only available in Polymerのデータバインディングは、Polymerによって管理されるテンプレート内だけで使用できます。したがって、データバインディングは、エレメントのDOMテンプレート内(あるいは`dom-repeat`や`dom-if`テンプレート内)では動作しますが、メインドキュメントに配置されたエレメントでは機能しません。

新たにCustom Elementを定義**することなく**Polymerのバインディングを利用するには、`<dom-bind>`エレメントを使用します。このテンプレートは、その子のテンプレート情報の内容をメインドキュメントに即座にスタンプします。自動バインディングテンプレートによるデータバインディングは、バインディングスコープとして`<dom-bind>`エレメントそのものを利用します。

```html
<!doctype html>
<html>
<head>
  <meta charset="utf-8">
  <script src="components/webcomponentsjs/webcomponents-lite.js"></script>
  <link rel="import" href="polymer/lib/elements/dom-bind.html">
  <link rel="import" href="polymer/lib/elements/dom-repeat.html">

</head>
<body>
  <!-- Wrap elements with auto-binding template to -->
  <!-- allow use of Polymer bindings in main document -->
  <dom-bind>
    <template>

      <!-- Note the data property which gets sets below -->
      <template is="dom-repeat" items="{{data}}">
        <div>{{item.name}}: {{item.price}}</div>
      </template>

    </template>
  </dom-bind>
  <script>
    var autobind = document.querySelector('dom-bind');

    // set data property on dom-bind
    autobind.data = [
      { name: 'book', price: '$5.00'},
      { name: 'pencil', price: '$1.00'},
      { name: 'flux capacitor', price: '$8,000,000.00'}
    ];
  </script>
</body>
</html>
```


`dom-bind`の全ての機能は、Polymer Elementの中であればすでに使用できます。**自動バインディングテンプレートは、Polymer Elementの_外部_のみで利用すべきです。**


_注：Polymer 1.0では、 `dom-bind`が非同期にレンダリングされ、準備段階であることを示するために`dom-change`イベントが発生しました。Polymer 2.0では、`dom-bind`は同期的にレンダリングされます。`dom-change`イベントも発生しますが、エレメントが宣言された後でイベントハンドラがバインドされている場合、それを逃すおそれがあります。_


**同期的レンダリングの強制**：`dom-repeat`と同様、`dom-bind`は、`render`メソッドと`mutableData`プロパティを提供しています。([同期レンダリングを強制](#synchronous-renders)と[テンプレートを更新](#update-data)で説明した通りです。）
{.alert .alert-info}

## dom-changeイベント {#dom-change}

あるテンプレートのヘルパーエレメントがDOMツリーを更新すると、`dom-change`イベントが発生します。

多くのケースでは、生成したノードと直接やりとりするのではなく、モデルデータの変更によって生成したDOMとやりとりするべきです。ノードに直接アクセスする必要がある場合には、`dom-change`イベントを使用することができます。.

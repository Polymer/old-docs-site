---
title: データシステムのコンセプト
---

<!-- toc -->

<style>
table.config-summary pre, table.config-summary code {
  background: transparent !important;
  margin: 0px;
  padding: 0px;
}
table.config-summary td {
  vertical-align: middle;
  padding: 10px 10px 1 1;
}
</style>

Polymerでは、エレメントのプロパティの変更を監視(observe)し、データ変更に基づき様々なアクションを実行することができます。これらのアクションや、*プロパティエフェクト*(property effects)には、次のものがあります。

*   オブザーバー(observers)：データの変更時に呼び出されるコールバック

*   算出プロパティ(computed properties)：他のプロパティに基づき算出され、入力データが変更されたときに再計算が行われる仮想的なプロパティ。

*   データバインディング(data binding)：データが変更されたとき、DOMノードのプロパティまたは属性、テキストコンテンツをアップデートするアノテーション。

各Polymer Elementは、独自のデータモデルとローカルDOMエレメントを管理します。エレメントのモデルとは、エレメントのプロパティです。データバインディングは、エレメントのモデルをローカルDOM内のエレメントとリンクします。

非常にシンプルなエレメントについて考えてみましょう。：

```html
<dom-module id="name-card">
  <template>
    <div>[[name.first]] [[name.last]]</div>
  </template>
  <script>
    class NameCard extends Polymer.Element {
      static get is() { return "name-card"; }
      constructor() {
        super();
        this.name = {first: 'Kai', last: 'Li'};
      }
    }
    customElements.define(NameCard.is, NameCard);
  </script>
</dom-module>
```

![A name-card element with a property, name. An arrow labeled 1 connects the name property to
a JavaScript object. An arrow labeled 2 connects the element to a box labeled local DOM tree
which contains a single element, div. An arrow labeled 3 connects the JavaScript object to the
div element.](/images/1.0/data-system/data-binding-overview-new.png)

1. `<name-card>`エレメントは、JavaScriptオブジェクトを参照する`name`プロパティを持っている。
2. `<name-card>`エレメントは、`<div>`を一つだけ持ったローカルDOMのホストになる。
3. テンプレート内のデータバインディングは、Javascriptオブジェクトを`<div>`エレメントにリンクする。 

データシステムは、オブジェクトではなくパスに基づいており、パスはホストエレメントに関連するプロパティやサブプロパティを表します。例えば、`<name-card>`エレメントは、パス`name.first`とパス`name.last`に対するデータバインディングを持っています。仮に、`<name-card>`エレメントが`name`プロパティとして次のオブジェクトを持っている場合：


```js
{
  first: 'Lizzy',
  last: 'Bennet'
}
```

パス`name`はエレメントの`name`プロパティ(オブジェクト)を参照します。パス`name.first`とパス`name.last`はオブジェクトのプロパティを参照します。

![The name-card element from the previous figure. An arrow labeled 1 connects the name property
to a JavaScript object that contains two properties, first: 'Lizzy' and last: 'Bennet'. Two arrows
labeled 2 connect the paths name and name.first with the object itself and the subproperty,
first, respectively.](/images/1.0/data-system/paths-overview-new.png)

1. `name`プロパティはJavascirptのオブジェクトを参照します。
2. パス`name`はそのオブジェクト自身を参照します。パス`name.first`はサブプロパティ`first`(文字列`Lizzy`)を参照します。

Polymerは自動ですべてのデータ変更を検出するわけではありません。*プロパティエフェクト*は、プロパティまたはサブプロパティへ[監視可能(obsevable)な変更](#observable-changes)があった場合に生じます。

**なぜパスを使うのでしょうか？**パスや*監視可能(obsevable)な変更*は、初めは少し奇妙にみえるかもしれません。しかし、これらによって、非常にハイパフォーマンスなデータバインディングシステムが実現されています。*監視可能(observable)な変更*が発生した場合、PolymerはDOM内で、その変更によって影響を受ける箇所にだけ変更を加えることができます。
{ .alert .alert-info }

要約：

*   単一のJavaScriptオブジェクトや配列は複数のエレメントから参照するこができますが、パスは**常に特定のエレメントに関連づけられます**。
*   あるパスに対して**監視可能(observable)な変更**があると、バインドされた値の更新やオブザーバーの呼び出しといった**プロパティエフェクト**を発生させます。
*   データバインディングは、異なるエレメント上のパス間にコネクションを確立します。

## 監視可能(observable)な変更 {#observable-changes}

*監視可能(observable)な変更*とは、**Polymerがパスに関連付けることができるデータの変更**です。以下のような変更については自動的に監視することができます。：

*   エレメントのプロパティに直接設定する。

    ~~~javascript
    this.owner = 'Jane';
    ~~~

    もし、あるプロパティに関連した*プロパティエフェクト*が発生した場合（オブザーバー、算出プロパティやデータバインディングなど）、Polymerはプロパティエフェクトを自動的に発生させるプロパティに対してsetterメソッドを作成します。

*   双方向データバインディングを使用してエレメントのサブプロパティを設定する。

    ~~~html
    <local-dom-child name="{{hostProperty.subProperty}}"></local-dom-child>
    ~~~

    データバインディングシステムによってもたらされた変更は、自動的に伝播されます。この例で言えば、`<local-dom-child>`エレメントが自身の`name`プロパティに変更を加えると、パス`hostProperty.subProperty`に変更が行われたように、その変更をホストに向けて上に伝播します。


### 監視不能(unobservable)な変更

**オブジェクトまたは配列を命令的に変更した場合は、監視することができません**。例えば、以下のような場合です。：

*   オブジェクトのサブプロパティを設定：

    ~~~javascript
    // unobservable subproperty change
    this.address.street = 'Elm Street';
    ~~~

    ここでサブプロパティ`address.street`を変更しても、`address`のsetterメソッドが呼び出されることはないので、自動的に監視することはできません。

*   配列の変更：

    ~~~javascript
    // unobservable change using native Array.push
    this.users.push({ name: 'Maturin});
    ~~~

    配列を変更しても`users`のsetterメソッドが呼び出されることはないので、自動的に監視することはできません。

どちらの場合も、変更を監視できるようにするには、Polymerの用意したメソッドを利用する必要があります。

### オブジェクトと配列の変更を監視可能(observable)に {#make-observable-changes}

Polymerは、サブプロパティや配列を監視できるようにするメソッドを用意しています。：

```js
// mutate an object observably
this.set('address.street', 'Half Moon Street');

// mutate an array observably
this.push('users', { name: 'Maturin'});
```

特定のケースにおいては、Polymerのメソッドを利用してオブジェクトや配列を変更することができません。(サードパーティのライブラリを使用している場合など)。この場合には、[`notifyPath`](/{{{polymer_version_dir}}}/docs/api/elements/Polymer.Element#method-notifyPath)メソッドや[`notifySplices`](/{{{polymer_version_dir}}}/docs/api/elements/Polymer.Element#method-notifySplices)メソッドを使用することで、**すでに発生した**変更をエレメントに通知できます。

```js
// Notify Polymer that the value has changed
this.notifyPath('address.street');
```

`notifyPath`メソッドや`notifySplices`メソッドを呼び出すと、あたかも変更が発生したかのように、エレメントは適切な*プロパティエフェクト*を作用させます。

`set`や`notifyPath`を呼び出す際は、変更された**正確なパス**を使用する必要があります。例えば、`address`オブジェクト自体は変更されていないのに、`this.notifyPath('address')`の呼び出しを行なった場合、`address.street`の変更は検出されません。これは、Polymerがオブジェクトの等価性からオブジェクトと配列に*ダーティチェック*を行うためです。指定されたパスの値が変更されていなければ、プロパティエフェクトは一切生じることがありません。

ほとんどの場合、オブジェクトの一つ以上のプロパティが変更された場合、または配列内の一つ以上のアイテムが変更された場合、オブジェクトや配列を複製(cloning)することで、Polymerによる*ダーティチェック*を強制的に回避させることができます。

```js
// Shallow clone array
this.addresses.push(address1);
this.addresses.push(address2)
this.addresses = this.addresses.slice();
```

多層的な(multiple levels)データ構造を持ったオブジェクトや配列の場合には、その変更内容を検出するために深いコピー(deep copy)を実行する必要があるかもしれません。

アプリケーションでそのような必要性が生じた場合は、`Polymer.MutableData`ミックスインを使用することで、エレメントごとにオブジェクトや配列のダーティチェックを回避できます。このミックスインは、利便性向上ためにいくらかパフォーマンスを犠牲にすることがあるかもしれません。詳細については、[MutableDataミックスインの利用](#mutable-data)を参照してください。


関連タスク：
*   [オブジェクトのサブプロパティの設定](model-data#set-path)
*   [配列の変更](model-data#array-mutation)
*   [サブプロパティの変更をPolymerに通知](model-data#notify-pat)
*   [配列の変更をPolymerに通知](model-data#notifysplices)

### バッチ処理によるプロパティの変更

バインディングシステム内におけるデータの伝播はバッチで処理されます、そうすることでコンプレックスオブザーバーや算出関数による変更は一度にまとまて実行されます。*まとまった変更*を生成する方法はいくつか存在します。：

*   エレメントが自身のプロパティを初期化する際は、*まとまった変更*を自動的に生成します。

*   オブジェクトまたは配列を設定する際は、*まとまった変更*を自動的に生成します。

*   `setProperties`メソッドを使用することで、複数のプロパティをアトミック(atomically)に設定できます。

```js
this.setProperties({item: 'Orange', count: 12 });
```

単一プロパティのアクセサメソッドについては、データは同期的に伝播されます。例えば、`a`と`b`の2つのプロパティを監視するオブザーバーがあったとします。以下の二つの動作の違いに留意して下さい。：

```js
// observer fires twice
this.a = 10;
this.b = 20;

// observer fires once
this.setProperties({a: 10, b: 20});
```

## データパス {#paths}

データシステムにおいて、*パス*はスコープ内のプロパティまたはサブプロパティを識別するための文字列です。多くの場合、スコープはホストエレメントです。例えば、次のような関係を考えてみましょう。：

![Two elements, user-profile and address card. The user-profile element has a primaryAddress
property. An arrow labeled 1 connects the property to a JavaScript object. The address-card
element has an address property. An arrow labeled 2 connects the property to the same JavaScript
object.](/images/1.0/data-system/data-binding-paths-new.png)

1. `<user-profile>`エレメントは、Javascriptのオブジェクトを参照する`primaryAddress`プロパティを持っています。
2. `<address-card>`エレメントは、同じオブジェクトを参照する`address`プロパティを持っています

重要なことですが、**Polymerは、これらのプロパティが同じオブジェクトを参照していることを自動的に認識するわけではありません。**`<address-card>`がオブジェクトへの変更を行っても、`<user-profile>`上でプロパティエフェクトは生じるわけではありません。

**あるエレメントから別のエレメントへデータの変更が流れるようにするには、エレメントはデータバインディングによってコネクトされている必要があります。**

### データバインディングによるパスのリンク

データバインディングは、異なるエレメントのパス間にリンクを作成することができます。実は、**データバインディングは、異なるエレメントのパスにリンクを設定する唯一の手段です。**例えば、前のセクションの`<user-profile>`の例で考えてみましょう。`<address-card>`が`<user-profile>`エレメントのローカルDOM内に存在する場合、二つのパスはデータバインディングを使ってコネクトすることができます。：


```html
<dom-module id="user-profile">
  <template>
    …
    <address-card
        address="{{primaryAddress}}"></address-card>
  </template>
  …
</dom-module>
```

これでパスはデータバインディングによってコネクトされました。

![Two elements, user-profile and address-card, both referring to a shared JavaScript object. An arrow labeled 1 connects the primaryAddress property on the user-profile element to the object. An arrow labeled 2 connects the address property on the address-card element to the same object. An double-headed arrow labeled 3 connects the path primaryAddress on user-profile to the path address on address-card.](/images/1.0/data-system/data-bound-paths-new.png)

1. `<user-profile>`エレメントは、Javascriptのオブジェクトを参照する`primaryAddress`プロパティを持っています。
2. `<address-card>`エレメントは、同じオブジェクトを参照する`address`プロパティを持っています。
3. データバインディングは`<user-profile>`のパス`primaryAddress`と`<address-card>`のパス`address`をリンクさせます。

もし`<address-card>`がオジェクトに対して*監視可能(observable)な変更*を加えた場合、`<user-profile>`上でも同様に*プロパティエフェクト*が発生します。

### データバインディングのスコープ {#data-binding-scope}

パスは、現在のデータバインディングのスコープに関連づいています。

どのエレメントにとっても最上位のスコープはエレメントのプロパティです。いつくかのデータバインディングのヘルパーエレメント([テンプレートリピーター](/{{{polymer_version_dir}}}/docs/devguide/templates#dom-repeat))のような)では、新たに入れ子のスコープを導入します。

オブザーバーと算出プロパティの場合、スコープは常にエレメントのプロパティになります。

### 特別なパス

あるパスは、パスセグメント(*多くの場合*、各パスセグメントはプロパティの名前)の連続体です。

いくつか特殊なタイプのパスセグメントがあります。

*   ワイルドカード記号(`*`)は、パス内の最後のセグメントとして使用できます。(例：`foo.*`)ワイルドカードパスは、配列の変更を含む、指定されたパス及びそのサブプロパティに対する全ての変更を表します。
*   文字列`splices`は、パス内の最後のセグメントとして使用できます。(例：`foo.splices`)splicesは指定された配列における全ての変更を表します。
*   配列アイテムのパスは、(例：`foo.11`)ある配列内のアイテムを表し、数字のパスセグメントは配列のインデックスを表します。



#### ワイルドカードパス {#wildcard-paths}

ワイルドカード記号(`*`)をパス内の最後のセグメントとして使用すると、前のプロパティやそのサブプロパティへの変更を表します。例えば、`users`という配列があった場合、`users.*`と記述すると`users`配列自身またはそのサブプロパティへの変更について関心があることを示します。

ワイルドカードパスは、オブザーバー、算出プロパティ、算出バインディングだけに使用されます。データバインディングにおいてワイルドカードパスを使用することはできません。

#### 配列変更パス

パスの最後のセグメントとして`splices`が使用されると、`splices`は配列への特定の*変更*（追加または削除）を表します。例えば、`users`が配列の場合、パス
`users.splices`は、配列への追加または削除を識別します。

パス`.splices`は、オブザーバー、算出プロパティ、または算出バインディングで
配列の変更を*認識*するに利用できます。 パス`.splices`を監視(observe)すると、ワイルドカードパスによって登録された変更の**サブセット**が得られます。
（例えば、配列内に存在するオブジェクトのサブプロパティの変更には関心がないかもしれません。） **多くの場合、配列にはワイルドカードを使ったオブザーバーを利用する方が便利です。**

パスの最後のセグメントとして`splices`を使用した場合には、指定された配列に対するすべての変更(追加や削除)を表します。例えば、`users`という配列があった場合、パス`users.splices`は配列に行われたどんな追加や削除も認識します。

パス`.splices`は、オブザーバー、算出プロパティ、算出バインディングで利用され、配列の変更に関心があることを示します。パス`.splices`の監視は、ワイルドカードパスによって登録された変更の**サブセット**を提供します。(例えば、配列内のオブジェクトのサブプロパティを監視することはないかもしれません)。**多くの場合、配列に対しては、ワイルドカードを使ったオブザーバーが役立ちます。**

### 同一オブジェクトを参照する二つのパス {#two-paths}

時々、一つのエレメントに同じオブジェクトを指し示す、二つのパスが存在することがあります。

例えば、エレメントに配列`users`やオブジェクト`selectedUser`を参照する二つのプロパティがあったとします。あるユーザーが選択されると`selectedUser`は配列内の一つのオブジェクトを参照します。


![A user-list element and an array with four items labeled \[0\] through \[3\]. The user-list has two properties, users and selectedUser. The users property is connected to the array by an arrow labeled 1. The selectedUser property is connected to the array item, \[1\] by an arrow labeled 2.](/images/1.0/data-system/linked-paths-new.png)

1. プロパティ`users`は配列そのものを参照します。
2. プロパティ`selectedUser`は配列内のアイテムを参照します。

この例では、エレメントには、配列内の二番目のアイテムを参照する以下の二つのパスが存在します。

*   `selectedUser`
*   `users.1`（`1`は配列`users`内のアイテムのインデックスです）

デフォルトでは、Polymerには(`users.1`のような)配列のパスを`selectedUser`に関連付ける方法がありません。

このようなケースに最適な手段として、Polymerは、データバインディングのヘルパーエレメント`<array-selector>`を用意しており、配列とその配列から選択されたアイテムの間でパスの結合を保持します。(`<array-selector>`は、配列から複数のアイテムを選択する場合にも動作します)。


他のユースケースのために、二つのパスを関連付けるための命令的なメソッドとして[linkPaths](/{{{polymer_version_dir}}}/docs/api/elements/Polymer.Element#method-linkPaths)があります。二つのパスがリンクされている場合、一方のパスに[監視可能(observable)な変更](#observable-changes)を加えると、もう一方のパスでも同様にその変更を監視できます。

関連タスク：

*   [二つのパスを同一オブジェクトにリンク](model-data#linkpaths)
*   [配列の選択をデータバインド](templates#array-selector)

## データフロー {#data-flow}

Polymerは*Mediatorパターン*を実装しており、ホストエレメントは、エレメント自身とそのローカルDOMのノード間のデータフローを管理します。

二つのエレメントがデータバインディングでコネクトされると、データの変更は、ホストからターゲットへ下に向けて(downward)、またターゲットからホストへ上に向けて、あるいはその両方に向けて流すことができます。

ローカルDOM内の二つのエレメントが同一のプロパティにバインドされている場合、データはあるエレメントから別のエレメントに流れるように思われますが、この流れはホストによって仲介(mediate)されたものです。一つのエレメントで生じた変更がホストへ**上に**伝播すると、ホストはその変更を他方のエレメントへ**下に**伝播させます。

### データフローは同期的

データフローは**同期的**です。あなたの記述したコードが[監視可能(observable)な変更](#observable-changes)を発生させると、その変更による全てのデータフローとプロパティエフェクトは、エレメントがアクションを明示的に遅延させない限り(例えば、非同期メソッドを呼び出すことによって)、次の行のJavaScriptが実行される前に発生します。

### データフローの制御の仕組み {#data-flow-control}

個々のバインディングによってサポートされるデータフローのタイプは、以下の項目に依存して決まります。：

*   使用されるバインディングアノテーションのタイプ。
*   ターゲットプロパティーの設定。

二種類あるデータバインディングアノテーションは以下の通りです。：

*   **自動的(automatic)**：上向き(ターゲットからホストへ)及び下向き(ホストからターゲットへ)のデータフローを許可します。自動バインディングには二重中括弧(`{{ }}`)を使用します。)：

    ```html
    <my-input value="{{name}}"></my-input>
    ```

*   **一方向(one-way)**：下向きのデータフローだけ許可します。上向きのデータフローは無効です。一方向バインディングには二重角括弧(`[[ ]]`)を使用します。

    ```html
    <name-tag name="[[name]]"></name-tag>
    ```

次の設定フラグは、**ターゲットプロパティ間**におけるデータフローに影響を与えます。：

*   `notify`：**上向きのデータフローをサポートします**。デフォルトでは、プロパティは`false`(non-notifying)であり、上向きのデータフローはサポートされません。
*   `readOnly`：**下向きのデータフローを防ぎます**。デフォルトでは、プロパティは`false`(read/write)であり、下向きのデータフローをサポートします。

プロパティ定義の例 {.caption}

```js
properties: {
  // default prop, read/write, non-notifying.
  basicProp: {
  },
  // read/write, notifying
  notifyingProp: {
    notify: true
  },
  // read-only, notifying
  fancyProp: {
    readOnly: true,
    notify: true
  }
}
```

以下の表は、ターゲットプロパティの設定を基に自動バインディングがどのようなタイプのデータフローをサポートするのか示したものです。：

<table class="config-summary">
  <tr>
    <th>
      設定
    </th>
    <th>
      結果
    </th>
  </tr>
  <tr>
    <td><pre><code>notify: false,
readOnly: false</code></pre></td>
    <td>
      一方向、下向き
    </td>
  </tr>
  <tr><td><pre><code>notify: false,
readOnly: true</code></pre></td>
    <td>
      データフローなし
    </td>
  </tr>
  <tr>
    <td><pre><code>notify: true,
readOnly: false</code></pre></td>
    <td>
      双方向
    </td>
  </tr>
  <tr>
    <td><pre><code>notify: true,
readOnly: true</code></pre></td>
    <td>
      一方向、上向き
    </td>
  </tr>
</table>

これとは対照的に、一方向バインディングは下向きのデータフローだけを許可するため、`notify`フラグは結果に影響することはありません。：


<table class="config-summary">
  <tr>
    <th>
      設定
    </th>
    <th>
      結果
    </th>
  </tr>
  <tr>
    </td>
    <td>
      <pre><code>readOnly: false</code></pre>
    </td>
    <td>
      一方向、下向き
    </td>
  </tr>
  <tr>
    <td>
      <pre><code>readOnly: true</code></pre>
    </td>
    <td>
      データフローなし
    </td>
  </tr>
</table>


**プロパティの設定(readOnlyやnotify)は、プロパティそのものに影響するだけで、サブプロパティには及びません。**特に、値にオブジェクトや配列を持つプロパティをバインディングした場合、ホストとターゲットエレメントの間で共有データが生成されますが、プロパティの設定による制御ができないので、どちらのエレメントでも共有されたオブジェクトや配列の変更を防ぐ方法はありません。詳細については、[オブジェクト及び配列のデータフロー](#data-flow-objects-arrays)を参照してください。
{.alert .alert-warning}

### データフローの例

以下の例で、上記のさまざまなデータフローのシナリオを示しています。

例1：双方向バインディング { .caption }

```html
<script>
  class XTarget extends Polymer.Element {

    static get is() {return 'x-target';}

    static get properties() {
      return {
        someProp: {
          type: String,
          notify: true
        }
      }
    }

  }

  customElements.define(XTarget.is, XTarget);
</script>
...

<dom-module id="x-host">
  <template>
    <!-- changes to "value" propagate downward to "someProp" on target -->
    <!-- changes to "someProp" propagate upward to "value" on host  -->
    <x-target some-prop="{{value}}"></x-target>
  </template>
  <script>
    class XHost extends Polymer.Element {

      static get is() {return 'x-host';}

    }

    customElements.define(XHost.is, XHost);
  </script>
```

例2：一方向バインディング(下向き) { .caption }

バインディングを一方向のバインディング(`[[ ]]`)に変更すると、*一方向バインディング*が生成されます。この例では、例1と同じ`x-target`エレメントを使用しています。

```html
<dom-module id="x-host">
  <template>
    <!-- changes to "value" propagate downward to "someProp" on target -->
    <!-- changes to "someProp" don't propagate upward because of the one-way binding -->
    <x-target some-prop="[[value]]"></x-target>
  </template>
  <script>
    class XHost extends Polymer.Element {

      static get is() {return 'x-host';}

    }

    customElements.define(XHost.is, XHost);
  </script>
```

例3：一方向バインディング（下向き）
同様に、双方向バインディングデリミタは使用しながら、`someProp`プロパティで`notify: true`を省略すると、下向きの一方向バインディングが生成されます。`someProp` 

```html
<script>
  class XTarget extends Polymer.Element {

    static get is() {return 'x-target';}

    static get properties() {
      return {
        someProp: {
          type: String // no notify: true
        }
      }
    }

  }

  customElements.define(XTarget.is, XTarget);
</script>
...

<dom-module id="x-host">
  <template>
    <!-- changes to "value" propagate downward to "someProp" on target -->
    <!-- changes to "someProp" are not notified to host due to notify:falsey -->
    <x-target some-prop="{{value}}"></x-target>
  </template>
  <script>
    class XHost extends Polymer.Element {

      static get is() {return 'x-host';}

    }

    customElements.define(XHost.is, XHost);
  </script>
```

Example 例4：一方向バインディング(上向き、子からホストへ) { .caption }


```html
<script>
  class XTarget extends Polymer.Element {

    static get is() {return 'x-target';}

    static get properties() {
      return {
        someProp: {
          type: String,
          notify: true,
          readOnly: true
        }
      }
    }

  }

  customElements.define(XTarget.is, XTarget);
</script>
...

<dom-module id="x-host">
  <template>
<!-- changes to "value" are ignored by child because "someProp" is read-only -->
<!-- changes to "someProp" propagate upward to "value" on host -->
    <x-target some-prop="{{value}}"></x-target>
  </template>
  <script>
    class XHost extends Polymer.Element {

      static get is() {return 'x-host';}

    }

    customElements.define(XHost.is, XHost);
  </script>
```

例5：データフローなし/意味のない(nonsensial)状態 { .caption }


```html
<script>
  class XTarget extends Polymer.Element {

    static get is() {return 'x-target';}

    static get properties() {
      return {
        someProp: {
          type: String,
          notify: true,
          readOnly: true
        }
      }
    }

  }

  customElements.define(XTarget.is, XTarget);
</script>
...

<dom-module id="x-host">
  <template>
    <!-- changes to "value" are ignored by child because "someProp" is read-only -->
    <!-- changes to "someProp" don't propagate upward because of the one-way binding -->
    <x-target some-prop="[[value]]"></x-target>
  </template>
  <script>
    class XHost extends Polymer.Element {

      static get is() {return 'x-host';}

    }

    customElements.define(XHost.is, XHost);
  </script>
```


### 上向きおよび下向きデータフロー

ホストエレメントはデータフローを管理しているので、ターゲットエレメントと直接的にやりとりすることができます。ホストは、ターゲットエレメントのプロパティを設定したり、メソッドを呼び出すことで下に向けてデータを伝播します。


![An element, host-element connected to an element, target-element by an arrow labeled 1.](/images/1.0/data-system/data-flow-down-new.png)

1. ホストエレメントでプロパティが変更されると、ターゲットエレメントの対応するプロパティが設定され、関連するプロパティエフェクトが発生します。

Polymer Elementは、イベントを使用してデータを上に向けて伝播させます。ターゲットエレメントは、*監視可能(observable)な変更*が発生するとノンバブリングイベントを発火します。(変更イベントに関する詳細は、[変更通知イベント](#change-events)で説明しています)。

**双方向バインディング**の場合、ホストエレメントは、これらの変更イベントをリッスンし、その変更を伝播させます。これら変更は、プロパティを設定したり、関連する*プロパティエフェクト*が作用することで生じます。プロパティエフェクトには以下のようなものが含まれるかもしれません。

*   兄弟エレメント(sibling elements)へ変更を伝播させるためにデータバインディングをアップデートする。
*   変更を上に向けて伝播させるため、別の変更イベントを生成する。


![An element, target-element connected to an element, host-element by an arrow labeled 1. An arrow labeled 2 connects from the host element back to itself.](/images/1.0/data-system/data-flow-up-new.png)

1. ターゲットエレメントにおけるプロパティの変更によって、プロパティ変更イベントが発生します。
2. ホストエレメントはイベントを受け取ると対応するプロパティを設定し、関連するプロパティエフェクトを発生させます。

**一方向バインディング**アノテーションを使うと、ホストは変更リスナーを生成しませんので、データ変更が上に向かって伝播することはありません。

### オブジェクトと配列のデータフロー  {#data-flow-objects-arrays}

プロパティがオブジェクトや配列の場合、データフローは少々複雑になります。オブジェクトや配列は複数のエレメントから参照することができ、また、あるエレメントが共有された配列を変更したり、オブジェクトのサブプロパティを変更したりするのを防ぐ術はありません。

そのため、Polymerは配列やオブジェクトの内容を、常に双方向バインディング**可能なもの**として扱います。言い換えると：

*   ターゲットプロパティが読み取り専用(`readOnly:true`)に設定されていても、データの更新はいつも下に向かって流れます。
*   ターゲットプロパティが通知可能(`notify:ture`)に設定されていなくても、上向きのデータフローの変更イベントは常に発生します。

一方向バインディングアノテーションはイベントリスナーを生成しないため、これらの変更通知がホストエレメントに伝播されないようにします。

### 変更通知イベント {#change-events}

エレメントは、以下のいずれかの[監視可能(observable)な変更](#observable-changes)が発生した時点で*変更通知イベント*を発生させます。：

*   通知設定されたプロパティへの変更
*   サブプロパティの変更
*   配列の変更


イベントの`type`プロパティは、どのプロパティが変更されたか示しています。：<code><var>property</var>-changed</code>という命名規則従い、<code><var>property</var></code>の部分はダッシュケース(dash-case)に変換したプロパティ名になります。(つまり、`this.firstName`が変更されると`first-name-changed`が発火します)。

<code><var>property</var>-changed</code>リスナーをエレメントに手動で設定して、外部のエレメント、フレームワーク、またはライブラリにプロパティの変更を通知することができます。

イベントの内容は、変更によって異なります。

*   プロパティの変更の場合、`detail.value`フィールドにプロパティの新しい値が含まれます。
*   サブプロパティの変更の場合、サブプロパティへのパスが`detail.path`フィールドに含まれます、そして新しい値が`detail.value`フィールドに含まれます。
*   配列の変更の場合、`detail.path`フィールドは`myArray.splices`のように配列の変更パスになります。そして`detail.value`フィールドがチェンジレコードになります。チェンジレコードについては、ドキュメントの[配列オブザーバー](/{{{polymer_version_dir}}}/docs/devguide/observers#array-observation)で解説されています。

**注意**：**変更通知イベントの伝播は停止しないでください。**イベントオブジェクトの生成と廃棄を避けるため、Polymerは変更通知にキャッシュされたイベントオブジェクトを使用します。変更通知イベントで`stopPropagation`を呼び出ことで、**そのプロパティにおけるすべてのイベントを将来に渡って防止します。**変更通知イベントはバブリングしないので、伝播を停止する必要はありません。
{.alert .alert-warning}
### カスタム変更通知イベント

`<input>`のようなネイティブエレメントは、Polymerが上向きのデータフローに利用する変更通知イベントを用意していません。ネイティブの`input`エレメントで双方向データバインディングをサポートするために、Polymerでは**カスタム変更通知イベント**をデータバインディングと関連付けることができるようになっています。例えば、テキスト入力にバインドすると、その`input`または`change`イベントを指定することができるようになります。：


```html
<input value="{{firstName::change}}">
```

この例では、`firstName`プロパティが`input`エレメントの`value`プロパティにバインドされています。`input`エレメントが`change`イベントを発生させるたびに、Polymerは`firstName`プロパティが`input`の`value`と一致させるように更新し、また関連するプロパティエフェクトがあればすべて発生させます。**イベントの内容は重要ではありません。**

この手法は、特にネイティブの`input`エレメントにとって便利ですが、Polymerを使って作成されていないコンポーネント(プロパティを公開しており、その変更時にイベントを発生させる)に双方向バインディングを提供する手段としても使うことができます。

関連タスク：

*   [Polymer Elementでないエレメントへの双方向バインディング](data-binding#two-way-native)

### エレメントの初期化

エレメントがローカルDOMを初期化する際は、エレメントはローカルDOMの子のプロパティを設定し、データバインディングの初期化も行います。

初期化処理の中では、ホストの値が優先されます。例えば、ホストプロパティがターゲットプロパティにバインドされている場合、hostエレメントとtargetエレメントの両方でデフォルト値を指定すると、親のデフォルト値が使用されます。

## プロパティエフェクト(property effects) {#property-effects}

*   算出プロパティの再計算
*   データバインディングの更新
*   プロパティ値をホストエレメントの属性に反映
*   オブザーバーの呼び出し
*   変更通知イベントの発火

これらのプロパティエフェクトの実行順序は、しっかり定義されています。：

1. 算出プロパティ
2. データバインディング
3. 反映された(reflected)値
4. オブザーバー
5. 変更通知イベント

このような実行順序によって、変更が下方に伝播される前に算出プロパティが再計算され、その変更がオブザーバーの実行前にローカルDOMの子に伝播されることが保証されます。

### データバインディング

*データバインディング*は、ホストエレメントのデータとホストのローカルDOM内の`target`ノードのプロパティや属性の間にコネクションを確立します。エレメントのローカルDOMのテンプレートにアノテーションを追加することでデータバインディングを生成します。

*アノテーション*とは、ターゲットエレメントでデータバインディング用デリミタ`{{ }}`又は`[[ ]]`を使用した属性値です。

双方向プロパティバインディング：

<code><var>target-property</var>="{{<var>hostProperty</var>}}"</code>

一方向プロパティバインディング：

<code><var>target-property</var>="[[<var>hostProperty</var>]]"</code>

属性バインディング：

<code><var>target-attribute</var>$="[[<var>hostProperty</var>]]"</code>

また、エレメントの本体にデータバインディングアノテーションを使用することもできます。これは、エレメントの`textContent`プロパティに対してバインディングを行なったのと同じことです。

```html
<div>{{hostProperty}}</div>
```

デリミタ内のテキストは、次のいずれかになります。：

*   プロパティまたはサブプロパティのパス(`users`、`address.street`)。
*   算出バインディング（`_computeName(firstName, lastName, locale)`）。
*   上記のそれぞれに、否定演算子(`!`)を後置したもの

詳細については、[データバインディング](data-binding)を参照してください。


## UMutableDataミックスインの使用 {#mutable-data}

Polymer 1.xでは、*ダーティチェック*(dirty check)メカニズムを使用して、データシステムが余計な作業をするのを防いでいました。Polymer 2.xでもデフォルトでこのメカニズムを維持していますが、エレメントにおいてオブジェクトや配列に対する*ダーティチェック*をオプトアウト(利用者が機能の使用を制限)できるようになっています。

デフォルトの*ダーティチェック*メカニズムによって、次のコードでは*プロパティエフェクト*を生成させません。：

```js
this.property.subproperty = 'new value!';
this.notifyPath('property');
```

オブジェクトと配列に対する厳密なダーティチェックは、オブジェクトの同一性に基づいています。`property`は依然として同じオブジェクトを指しているので、ダーティチェックは失敗し、サブプロパティの変更は伝播しません。代わりに、Polymerの`set`メソッドや*配列変更メソッド*を使用するか、変更された正確なパス指定して`notifyPath`を呼び出す必要があります。：

```js
this.set('property.subproperty', 'new value!');
// OR
this.property.subproperty = 'new value!';
this.notifyPath('property.subproperty');
```

一般に、ダーティチェックメカニズムはパフォーマンスの向上をもたらします。以下いずれかの要件が当てはまるアプリケーションでは特にうまくいきます。：

*   不変データを使用する。
*   小さな変更についても必ずPolymerのデータ変更メソッドを使用する。

しかし、不変のデータを使用せず、Polymerのデータ関連メソッドを使用できないアプリケーションに対して、Polymer 2.0は[`Polymer.MutableData`](/{{{polymer_version_dir}}}/docs/api/mixins/Polymer.MutableData)ミックスインを用意しています。

```js
class MyMutableElement extends Polymer.MutableData(Polymer.Element) { ... }
```

`MutableData`ミックスインはエレメントのダーティチェックを省略するので、上記コードは意図した通りに動作するでしょう。

```js
this.property.subproperty = 'new value!';
this.notifyPath('property');
```

可変(mutable)データモードでは、*プロパティエフェクト*を呼び出す前に、いくつかの変更をバッチで処理することもできます：


```js
this.property.arrayProperty.push({ name: 'Alice' });
this.property.stringProperty = 'new value!';
this.property.counter++;
this.notifyPath('property');
```

*プロパティエフェクト*を呼び出すために、`set`メソッドを使ったり、または単純にトップレベルのプロパティを設定することもできます。：

```js
this.set('property', this.property);
// or
this.property = this.property;
```

特定のサブプロパティを変更するのに`set`メソッドを利用するのが、多くのケースで最も効率的な手段となります。しかし、`MutableData`を使用するエレメントではこのAPIを使用する必要はなく、データバインディングや状態管理を行う代替ライブラリを利用することで互換性をさらに高めることができます。

トップレベルでプロパティを再設定すると、そのプロパティ、サブプロパティ、配列のアイテムなどに対する*プロパティエフェクト*が全て再実行されてしまうので注意が必要です。さらに、ワイルドカードパス(`prop.*`のような)を指定したオブザーバーには、トップレベルでの変更だけが通知されます。：

```js
// With MutableData mixin
// 'property.*' observers fire with the path 'property'
this.property.deep.path = 'another new value';
this.notifyPath('property');
```

`set`メソッドを利用して特定のパスを設定すると、細かい通知も生成します。：


```js
// 'property.*' observers fire with the path 'property.deep.path'
this.set('property.deep.path', 'new value');
```

エレメントのプロパティが文字列、数値、ブール値などのプリミティブな値しか取らない場合には、`MutableData`を使用する必要はありません。これらの値は常にダーティチェックされており`MutableData`にはメリットがありません。これは多くのシンプルなUIエレメントについて言えることです。`MutableData`は複雑で再利用可能なエレメント(`dom-repeat`または`iron-list`のような)や、複雑な状態の情報を持つアプリケーション固有のエレメントに対しては役立つでしょう。

`MutableData`ミックスインは、エレメントのShadow DOMの子には影響を与えないことに注意してください。`Polymer.MutableData`**ミックスインを使用しないすべてのエレメントは、すべてデフォルトのダーティチェックポリシーに従います。**

`dom-repeat`エレメントを使用している場合は、`mutableData`プロパティを設定することで*可変データモード*を有効にすることができます：

```html
<!-- standard dom-repeat in MutableData mode -->
<template is="dom-repeat" items="{{items}}" mutable-data>
  <div>{{item.name}}</div>
</template>
```


### 再利用可能なエレメントのオプションとしての可変(mutable)データ {#optional-mutable-data}

構造化されたデータを取り込む再利用可能なエレメントを構築する場合は、[`Polymer.OptionalMutableData`](/{{{polymer_version_dir}}}/docs/api/mixins/Polymer.OptionalMutableData)ミックスインが使用できます。このミックスインを使用すると、エレメント上に`mutableData`プロパティを設定することで、`MutableData`モードを選択できます。

```js
class MyStructuredDataElement extends Polymer.OptionalMutableData(Polymer.Element) {
  static get is() { return 'my-structured-data-element' }
}
```

これにより、エレメントの利用者は、標準のデータフローまたは可変データモードのいずれかでエレメントを利用することができます。

```html
<!-- custom element using standard data flow -->
<my-structured-data-element data="{{someData}}">
</my-structured-data-element>

<!-- custom element using MutableData mode  -->
<my-structured-data-element data="{{someData}}" mutable-data>
</my-structured-data-element>
```

`dom-repeat`エレメントは、このミックスインを利用して構成されたエレメントの例です。



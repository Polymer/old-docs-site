---
title: オブジェクトや配列のデータとの連携
---

<!-- toc -->

データシステムは、要素のモデルデータ(プロパティおよびサブプロパティ)に[監視可能な変更](data-system#observable-changes)を加えるためのメソッドを提供します。これらのメソッドを使用して、配列やオブジェクトのサブプロパティに*監視可能な変更*を加えます。

関連する概念：

- [データパス](data-system#paths)
- [監視可能な変更](data-system#observable-changes)

## パスの記法

[データパス](data-system#paths)は、パスセグメントの連続体です。*ほとんどの場合*、各パスセグメントはプロパティ名になります。データAPIでは二種類のパスが利用可能です。：

*   ドット区切りのパスセグメントの文字列(下記例の一番目)
*   配列アイテムが文字列で、パスセグメント又はドット区切りのパスのいずれかになります。(下記例の三番目)

以下はすべて同じパスを表します。：

```
"one.two.three"
["one", "two", "three"]
["one.two", "three"]
```

特別な種類のパスセグメントがいくつかあります。

*   ワイルドカードパス(例：`foo.*`）は、配列の変更を含む、指定されたパスやそのサブプロパティに対するすべての変更を表します。
*   配列の変更パス(例：`foo.splices`)は、指定された配列に対するすべての変更を表す。
*   配列アイテムのパス(例：`foo.11`)は、配列内の特定のアイテムを表します。

## パスによる値の取得 {#get-value}

パスに基づいて値を取得するには[get](/{{{polymer_version_dir}}}/docs/api/elements/Polymer.Element#method-get)メソッドを使用してください。

```
// retrieve a subproperty by path
var value = this.get('myProp.subProp');
// Retrieve the 11th item in myArray
var item = this.get(['myArray', 11])

```

## パスによるプロパティまたはサブプロパティの設定 {#set-path}

サブプロパティに[監視可能な変更](data-system#observable-changes)を加えるには[set](/{{{polymer_version_dir}}}/docs/api/elements/Polymer.Element#method-set)メソッドを使用してください。

```js
// clear an array
this.set('group.members', []);
// set a subproperty
this.set('profile.name', 'Alex');
```

プロパティまたはサブプロパティの値が変わらない場合には、`set`を呼び出しても効果がありません。特に、オブジェクトのプロパティで`set`を呼び出すと、オブジェクトそのものが変更されない限り、Polymerはオブジェクトのサブプロパティの変更を検知しません。同様に、配列プロパティで`set`を呼び出した場合も、Polymerは既存の配列の変更を検知しません。：

```
// DOES NOT WORK
this.profile.name = Alex;
this.set('profile', this.profile);

// DOES NOT WORK
this.users.push({name: 'Grace'});
this.set('users', this.users);
```

どちらの場合も、オブジェクトは変更されておらず、オブジェクトそのものに何ら効果が生じません。代わりに、[notifyPath](#notifyPath)を利用でき、既に生じたサブプロパティの変更を、Polymerに知らせることができます。配列の場合には、[配列の変更](#array-mutation)で説明したように、Polymerの配列変更メソッドを使用するか、[配列の変更をPolymerに通知](#notifysplices)で説明したように、事後的にPolymerに通知する方法があります。

**可変データ(MutableData)**：`Polymer.MutableData`ミックスインをインクルードした要素の場合、オブジェクトまたは配列上で`set`を呼び出すと、オブジェクトや配列自身が変更されていなくても、Polymerはそれらオブジェクトや配列から開始して、オブジェクトグラフ全体を再評価します。詳細については、[MutableDataミックスインの使用](data-system#mutable-data)を参照してください。
{.alert .alert-info}


関連タスク：

-   [Notify Polymer of a subproperty change](#notify-path)
-   [Mutate an array](#array-mutation)
-   [Notify Polymer of array mutations](#notifysplices)

### Polymerにサブプロパティの変更を通知する {#notify-path}

オブジェクトのサブプロパティに変更を加えた後に`notifyPath`呼び出すことで、変更をデータシステムに対して[監視可能](data-system#observable-changes)にします。ta system.

```
this.profile.name = Alex;
this.notifyPath('profile.name');
```

`notifyPath`を呼び出し時に、変更があった**正確なパス**を指定する必要があります。例えば、`this.notifyPath('profile')`を呼び出ししても`profile.name`に対する変更は検出しません。なぜなら`profile`オブジェクトそのものは変更されていないからです。

**可変データ(MutableData)**：`Polymer.MutableData`ミックスインをインクルードした要素の場合、オブジェクトまたは配列上で`notifyPath `を呼び出すと、オブジェクトや配列自身が変更されていなくても、Polymerはそれらオブジェクトや配列から開始して、オブジェクトグラフ全体を再評価します。詳細については、[MutableDataミックスインの使用](data-system#mutable-data)を参照してください。
{.alert .alert-info}

## 配列との連携 {#work-with-arrays}

Polymerの配列変更メソッドを使用して、配列に[監視可能な変更](data-system#observable-changes)を加えます。

ネイティブメソッド(`Array.prototype.push`のような)を使用して配列を操作する場合、[オブジェクトまたは配列へのバッチによる変更](#batch-changes)で説明しているように、変更を事後的にPolymerに通知することができます。).

### 配列を変更 {#array-mutation}

配列を変更するとき、Polymerは`Array.prototype`を模倣した、一連の配列変更メソッドを提供しますが、最初の引数として文字列の`path`を使用する点が異なります。引数`path`は、要素上で変更する配列を識別するのに利用され、第二引数以降はネイティブの`Array`メソッドのものと同じです。

これらのメソッドは配列上で変更アクションを実行し、同じ配列にバインドされているかもしれない他の要素に対してその変更を通知します。配列を変更する際にこれらのメソッドを使用することで、(オブザーバー、算出プロパティ、またはデータバインディングを通じて)その配列を監視する全ての要素を同期された状態に保つことができます。

すべてのPolymer要素には、以下の配列変更メソッドがあり利用することができます。：
*   <code>push(<var>path</var>, <var>item1</var>, [..., <var>itemN</var>])</code>
*   <code>pop(<var>path</var>)</code>
*   <code>unshift(<var>path</var>, <var>item1</var>, [..., <var>itemN</var>])</code>
*   <code>shift(<var>path</var>)</code>
*   <code>splice(<var>path</var>, <var>index</var>, <var>removeCount</var>, [<var>item1</var>,..., <var>itemN</var>])</code>



例 { .caption }

```html
<link rel="import" href="components/polymer/polymer-element.html">
<link rel="import" href="components/polymer/src/elements/dom-repeat.html">

<dom-module id="x-custom">
  <template>
    <template is="dom-repeat" items="[[users]]">{{item}}</template>
  </template>

  <script>
    class XCustom extends Polymer.Element {

      static get is() {return 'custom-element'}

      addUser(user) {
        this.push('users', user);
      }

      removeUser(user) {
        var index = this.users.indexOf(user);
        this.splice('users', index, 1);
      }

    }
    customElements.define(XCustom.is, XCustom);
  </script>
</dom-module>
```

`set`メソッドは、*配列パス*を使用して配列を操作する用途も利用できます。例えば、インデックス`3`の配列のアイテムを置き換えるには次のようにします。：

```js
this.set('users.3', {name: 'Churchill'});
```

Polymerの配列変更メソッドの利用が役立たない場合もあります。この場合には、いくつかの選択肢があります。：

*   [notifySplices](#notifysplices)メソッドを使用して事後的にPolymerに通知します。
*   `MutableData`ミックスインを使用します。`Polymer.MutableData`ミックスインをインクルードした要素の場合、オブジェクトまたは配列上で`set`または`notifyPath `を呼び出すと、オブジェクトや配列自身が変更されていなくても、Polymerはそれらオブジェクトや配列から開始して、オブジェクトグラフ全体を再評価します。詳細については、[MutableDataミックスインの使用](data-system#mutable-data)を参照してください。

###  配列の変更をPolymerに通知 {#notifysplices}

可能である時は常に、Polymerの[配列変更メソッド](#array-mutation)を利用すべきです。しかし、これらは必ずしも利用できるとは限りません。例えば、Polymer配列変更メソッドを使わないサードパーティのライブラリを利用しているかもしれません。これらのシナリオにおいては、変更後に<a href="/{{{polymer_version_dir}}}/docs/api/elements/Polymer.Element#method-notifySplices">notifySplices</a>を呼び出すことで、配列を監視するすべてのPolymer要素にその変更が適切に通知されるようにできます。

`notifySplices`メソッドは、配列の変更を一連の`splice`オペレーションに*正規化*することが求められます。例えば、配列上で`shift`を呼び出して配列の最初の要素を削除するのは、`splice(0, 1)`を呼び出すことと同じです。

`splice`オペレーションはインデックスの順番に適用する必要があります。そうすることで要素が配列の内部表現を更新できます。

発生した正確な変更(パス)か分からない場合は、`MutableData`ミックスインを利用できます。
`Polymer.MutableData`ミックスインをインクルードした要素の場合、オブジェクトまたは配列上で`set`または`notifyPath `を呼び出すと、オブジェクトや配列自身が変更されていなくても、Polymerはそれらオブジェクトや配列から開始して、オブジェクトグラフ全体を再評価します。詳細については、[MutableDataミックスインの使用](data-system#mutable-data)を参照してください。


## 複数のプロパティ変更をバッチ処理 {#set-property}

複数のプロパティへの変更をまとめて設定するには[`setProperties`](/{{{polymer_version_dir}}}/docs/api/mixins/Polymer.PropertyEffects#method-setProperties)を使用します。これにより、プロパティの変更はまとまったセットとして確実に設定されます。

```js
this.setProperties({
  date: 'Jan 17, 2017',
  verified: true
});
```

`setProperties` supports an optional `setReadOnly` flag as the second parameter. If you need to set
read-only properties as part of a batch change, pass true for the second parameter:

```js
this.setProperties({
  date: 'Jan 17, 2017',
  verified: true
}, true);
```

## 同一オブジェクトへのパスをリンク {#linkpaths}

[linkPaths](/{{{polymer_version_dir}}}/docs/api/elements/Polymer.Element#method-linkPaths)メソッドは二つのパスを関連付けます。[二つのパスが同一のオブジェクトを参照]((data-system#two-paths)での説明の通り、`linkPaths`は要素が同じオブジェクトを参照する二つのパスを持つ場合に使用できます。

二つのパスがリンクされている場合、片方のパスへの[監視可能な変更](data-system#observable-changes)は、もう片方のパスでも同じように監視することができます。

```js
linkPaths('selectedUser', 'users.1');
```

**どちらのパスも同一の要素に関連付ける必要があります。**要素間で変更を伝播するには、[データバインディング](data-binding)を使用すべきです。
{.alert .alert-info}

パスの結合を解除するには、`linkPaths`に渡した一つ目のパスを引数に指定して`unlinkPaths`を呼び出します：

```js
unlinkPaths('selectedUser');
```

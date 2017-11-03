---
title: オブザーバーと算出プロパティ
---

<!-- toc -->


オブザーバーは、エレメントのデータに[監視可能(observable)な変更](data-system#observable-changes)が発生したときに呼び出されるメソッドです。オブザーバーには二つの基本的なタイプがあります。：

*   シンプルオブザーバー(Simple observers)は単一のプロパティを監視します。
*   コンプレックスオブザーバー(Complex observers)は、一つ以上のプロパティ*またはパス*を監視できます。

これらの二種類のオブザーバーを宣言するために異なる構文を使用しますが、たいていの場合、同じように動作します。

各オブザーバーは、一つ以上の_依存部_を持ちます。依存部に監視可能な(observable)な変更が生じるとオブザーバーのメソッドは実行されます。

算出プロパティ(Computed properties)は、エレメントを構成する一つ以上のデータに基づく仮想的なプロパティです。算出プロパティは算出関数(computing function)によって生成されます。算出関数は本質的には、値を返すコンプレックスオブザーバーといえます。

特別に指示しない限り、オブザーバーに関する注意点は、シンプルオブザーバー、コンプレックスオブザーバー、や算出プロパティにも適用されます。

### オブザーバーとエレメントの初期化

オブザーバーの最初の呼び出しは、次の条件が満たされるまで遅延されます。：

*   エレメントが完全に構築されている（デフォルト値が割り当てられ、データバインディングは伝播されます）
*   **少なくとも**一つは依存部が定義されている(つまり、`undefined`という値がない)

最初の呼び出しの後は、**たとえ依存部の新しい値が**<code>undefined</code>**であっても**、依存対象への**監視可能(observable)な変更はそれぞれ**オブザーバーの呼び出しを発生させます。

これにより、デフォルトの状態でオブザーバーが実行されるのを避けることができます。


### オブザーバーは同期している

すべてのプロパティエフェクトと同様に、オブザーバーは同期的です。オブザーバーが頻繁に呼び出される可能性が高い場合は、DOMの挿入や削除など時間のかかる作業を遅延することを検討してください。 例えば、[Polymer.Async](/{{{polymer_version_dir}}}/docs/api/namespaces/Polymer.Async)モジュールを使用して作業を遅延することができます。

ただし、データの変更を非同期に処理する場合は、変更データが処理されるまで古いデータが存在する可能性があるので注意してください。


## シンプルオブザーバー(Simple observers) {#simple-observers}

単純なオブザーバは`properties`オブジェクト内で宣言され、常に単一のプロパティを監視します。プロパティの初期化の順番について仮定を置いてはいけません。：オブザーバーが初期化された複数のプロパティに依存している場合は、代わりにコンプレックスオブザーバーを使用します。

シンプルオブザーバーは、プロパティが初めて定義されたとき(`!=undefined`)に起動し、*_その後に未定義(undefined)になったとしても_*、すべての変更に対して動作します。

シンプルオブザーバーは、プロパティそのものが変更された場合に限り起動します。サブプロパティの変更や配列の変更では起動しません。これら変更が必要な場合は、[パスに関連するすべての変更を監視](#deep-observation)で説明の通り、ワイルドカードパス(\*)を指定した*コンプレックスオブザーバー*を利用します。

オブザーバーメソッドは名前で指定します。ホストエレメントには、必ず同名のメソッドが必要です。

オブザーバーメソッドは引数として、プロパティの新しい値と古い値を受け取ります。

### プロパティを監視  {#change-callbacks}

シンプルオブザーバーを定義するにはプロパティの宣言に`observer`キーを追加し、名前によってオブザーバーメソッドを識別します。e.
例： { .caption }


```js
class XCustom extends Polymer.Element {

  static get is() {return 'x-custom'; }

  static get properties() {
    return {
      active: {
        type: Boolean,
        // Observer method identified by name
        observer: '_activeChanged'
      }
    }
  }

  // Observer method defined as a class method
  _activeChanged(newValue, oldValue) {
    this.toggleClass('highlight', newValue);
  }
}
```

オブザーバーメソッドは通常クラス内で定義されますが、オブザーバーメソッドは、エレメント上に同名のメソッドが存在するならば、スーパークラス、サブクラス、ミックスインクラスで定義することもできます。

**警告**：単一のプロパティに対するオブザーバーは、他のプロパティ、サブプロパティ、またはパスに依存するべきではありません。なぜなら、これらの依存関係が未定義にも関わらずオブザーバーが呼び出される可能性があるからです。詳細は、[すべての依存部の特定](#dependencies)を参照してください。
{ .alert .alert-warning }

## コンプレックスオブザーバー {#complex-observers}

コンプレックスオブザーバーは配列`observers`の内で宣言されています。コンプレックスオブザーバーは、一つ以上のパスを監視することができます。これらのパスは**オブザーバーの依存部**と呼ばれます。

```
static get observers() {
  return [
    // Observer method name, followed by a list of dependencies, in parenthesis
    'userListChanged(users.*, filter)'
  ]
}

```

依存部には次のようなものがあります。：

*   特定のプロパティ(例：`firstName`)

*   特定のサブプロパティ(例：`address.street`) 

*   特定の配列上の変更(例：`users.splices`)

*   サブプロパティのすべての変更と、指定パス(例：`users.*`)以下における配列の変更

オブザーバーメソッドには、引数を一つ指定して、各依存部に対して呼び出されます。引数のタイプは、以下のように監視対象のパスによって異なります。

*   依存部が単純なプロパティまたはサブプロパティの場合、引数はプロパティまたはサブプロパティの新しい値になります。

*   配列の変更の場合、引数は*変更を記録したレコード*(change record)になります。

*   ワイルドカードパスの場合、引数は*変更を記録したレコード*で、変更箇所の正確なパスが含まれます。

オブザーバーが呼び出された時、引数のいずれかが`undefined`かもしれないので注意してください。

コンプレックスオブザーバーは、宣言的に記述した部分だけに依存するようにすべきです。

関連タスク：

*   複数のプロパティやパスを監視
*   配列の変更を監視
*   パスに対する全ての変更を監視

### 複数のプロパティの変更を監視する {#multi-property-observers}

複数プロパティセットの変更を監視するには、配列`observers`を使用します。

これらのオブザーバーは、シングルプロパティオブザーバーといくつかの点で異なります。：

*   **一つでも**依存部が定義されていれば、マルチプロパティオブザーバーや算出プロパティが初期化されるとすぐに実行され、`observers`は一度呼び出されます。その後、それら依存部のどれかに監視可能(observable)な変更があればオブザーバーが実行されます。

*   オブザーバーは`old`値を引数として受け取らず、新しい値だけを受け取ります。`properties`オブジェクトでシングルプロパティオブザーバーが定義されている場合に限り、`old`と`new`の両方の値を引数に受け取ります。

例 { .caption }


```js
class XCustom extends Polymer.Element {

  static get is() {return 'x-custom'; }

  static get properties() {
    return {
        preload: Boolean,
        src: String,
        size: String
    }
  }

  // Each item of observers array is a method name followed by
  // a comma-separated list of one or more dependencies.
  static get observers() {
    return [
        'updateImage(preload, src, size)'
    ]
  }

  // Each method referenced in observers must be defined in
  // element prototype. The arguments to the method are new value
  // of each dependency, and may be undefined.
  updateImage(preload, src, size) {
    // ... do work using dependent values
  }
}
```

オブザーバーは`properties`に加えて、[サブプロパティへのパス](#observing-path-changes)、[ワイルドカードパス](#deep-observation)、や[配列の変更](#array-observation)も監視することもできます。

### サブプロパティの変更を監視 {#observing-path-changes}

オブジェクトのサブプロパティへの変更を監視するには：

*   配列`observers`を定義します。
*    配列`observers`にアイテムを追加します。アイテムはメソッド名に続けて、一つ以上のパスのリストをカンマ区切りで渡す必要があります。例えば、単一のパスであれば、`onNameChange(dog.name)`、複数のパスの場合は、`onNameChange(dog.name, cat.name)`のようになりますです。各パスが監視したいサブプロパティとなります。
*   エレメントのプロトタイプ(訳補：クラス)内でメソッドを定義します。メソッドが呼び出されると、メソッドの引数がサブプロパティの新しい値になります。

Polymerがサブプロパティの変更を適切に検出できるよう、サブプロパティは次の二つのいずれかの方法でアップデートする必要があります。：

*   [プロパティバインディング](data-binding#property-binding)を利用する
*   [set](model-data#set-path)メソッドを呼び出す.

例: { .caption }

```html
<dom-module id="x-custom">
  <template>
    <!-- Sub-property is updated via property binding. -->
    <input value="{{user.name::input}}">
  </template>
  <script>
    class XCustom extends Polymer.Element {

      static get is() {return 'x-custom'; }

      static get properties() {
        return {
          user: {
            type: Object,
            value: function() {
              return {};
            }
          }
        }
      }

      // Observe the name sub-property on the user object
      static get observers() {
        return [
            'userNameChanged(user.name)'
        ]
      }

      // For a property or sub-property dependency, the corresponding
      // argument is the new value of the property or sub-property
      userNameChanged: function(name) {
        if (name) {
          console.log('new name: ' + name);
        } else {
          console.log('user name is undefined');
        }

      }
    }
    customElements.define(XCustom.is, XCustom);
  </script>
</dom-module>
```

### 配列の変更を監視 {#array-observation}

Use an array mutation observer to call an 配列の変更に対してオブザーバーを設定すると、Polymerの[配列変更メソッド](model-data#array-mutation)を使用して、配列のアイテムが追加または削除される度に、オブザーバー関数が呼び出されます。配列が変更されるたびに、オブザーバーは配列のsplicesのセットとして、変更内容を表す*チェンジレコード*を受け取ります。

Polymerは、配列のアイテムが変更されたときだけ配列変更のオブザーバーを呼び出し、トップレベルの(top-level)配列への変更に対しては**呼び出されません**。

多くの場面で、配列の変更*と*配列のアイテムのサブプロパティへの変更の両方を監視したいかもしれません。この場合には、[パスに関連するすべての変更を監視](#deep-observatio)で説明されているように、ワイルドカードパスを使用する必要があります。

> **監視可能(observable)な配列の変更**：可能であれば常にPolymerの[配列の変更メソッド](model-data#array-mutation)を使用するようにしてください。これによって、配列に加えられた変更の中から、事前に登録された関心のあるエレメントに関するものを適切に通知します。ネイティブのメソッドを利用せざるを得ない場合、[ネイティブの配列の変更メソッドを使用](model-data#notifysplices)で説明されているように、Polymerに配列変更を通知する必要があります。

spliceへのオブザーバーを作成するには、配列`observers`内でパスを指定する際、配列に続けて`.splices`を指定してください。

``` js
static get observers() {
  return [
    'usersAddedOrRemoved(users.splices)'
  ]
}
```

オブザーバーメソッドは引数を一つ受け取る必要があります。オブザーバーメソッドが呼び出されると、配列上で発生した変更に関して*チェンジレコード*を受け取ります。各*チェンジレコード*は、次のプロパティを提供します。：

*   `indexSplices`：配列で発生したインデックス単位の変更。各`indexSplices`レコードには、次のプロパティが含まれます。
       -   `index`：spliceの開始位置
       -   `removed`：削除されたアイテムの配列
       -   `addedCount`：インデックスに挿入された新しいアイテムの数
       -   `object`：変更対象の配列への参照
       -   `type`：文字列リテラル`splice`


***チェンジレコード*は未定義の可能性があります**。初めてオブザーバーが呼び出された時点で、*チェンジレコード*は未定義の可能性があるため、この例に示した方法で対処する必要があります。
{ .alert .alert-info }

例 {.caption}

```js
class XCustom extends Polymer.Element {

  static get is() {return 'x-custom'; }

  static get properties() {
    return {
      users: {
        type: Array,
        value: function() {
          return [];
        }
      }
    }
  }

  // Observe changes to the users array
  static get observers() {
    return [
      'usersAddedOrRemoved(users.splices)'
    ]
  }


  // For an array mutation dependency, the corresponding argument is a change record
  usersAddedOrRemoved(changeRecord) {
    if (changeRecord) {
      changeRecord.indexSplices.forEach(function(s) {
        s.removed.forEach(function(user) {
          console.log(user.name + ' was removed');
        });
        for (var i=0; i<s.addedCount; i++) {
          var index = s.index + i;
          var newUser = s.object[index];
          console.log('User ' + newUser.name + ' added at index ' + index);
        }
      }, this);
    }
  }

  ready() {
    super.ready();
    this.push('users', {name: "Jack Aubrey"});
  }
}

customElements.define(XCustom.is, XCustom);
```

### パスに関連するすべての変更を監視 {#deep-observation}

オブジェクトや配列の(深い)サブプロパティが変更された際にオブザーバーを呼び出すには、ワイルドカード(`*`)を用いてパスを指定します。

ワイルドカードを使用してパスを指定した場合、オブザーバーに引数として渡される*チェンジレコード*オブジェクトには以下のようなプロパティが存在します。：
*   `path`：変更されたプロパティへのパス。変更されたのがプロパティか、サブプロパティか、配列か判別するのに利用されます。
*   `value`：変更されたパスの新しい値
*   `base`：パスのワイルドカード以外の部分にマッチするオブジェクト

配列の変更の場合、`path`は、`.splices`の前に置かれた変更対象の配列のパスになります。また`value`フィールドには、[配列の変更の監視](#array-observation)で説明した通り、`indexSplices`プロパティが含まれます。

例：
Example: { .caption }

```html
<dom-module id="x-custom">
  <template>
    <input value="{{user.name.first::input}}"
           placeholder="First Name">
    <input value="{{user.name.last::input}}"
           placeholder="Last Name">
  </template>
  <script>
    class XCustom extends Polymer.Element {

      static get is() { return 'x-custom'; }

      static get properties() {
        return {
          user: {
            type: Object,
            value: function() {
              return {'name':{}};
            }
          }
        }
      }

      static get observers() {
        return [
            'userNameChanged(user.name.*)'
        ]
      }

      userNameChanged(changeRecord) {
        console.log('path: ' + changeRecord.path);
        console.log('value: ' + changeRecord.value);
      }
    }

    customElements.define(XCustom.is, XCustom);
  </script>
</dom-module>
```


### すべての依存部を特定 {#dependencies}

オブザーバーは、依存部として列挙されていないプロパティ、サブプロパティ、またはパスに依存してはいけません。これにより、「隠れた(hidden)」依存部が生成され、以下のように予期せぬ動作を引き起こすかもしれないかもしれません。：

-   オブザーバーが、隠れた依存部が設定される前に呼び出されるかもしれません。
-   隠れた依存部が変更されても、オブザーバーは呼び出されません。

例えば：


```js
static get properties() {
  return {
    firstName: {
      type: String,
      observer: 'nameChanged'
    },
    lastName: {
      type: String
    }
  }
}

// WARNING: ANTI-PATTERN! DO NOT USE
nameChanged(newFirstName, oldFirstName) {
  // Not invoked when this.lastName changes
  var fullName = newFirstName + ' ' + this.lastName;
  // ...
}
```

Polymerは、プロパティの初期化の順番を保証しないので注意してください。

一般に、オブザーバーが複数の依存部を持っている場合は、[マルチプロパティオブザーバー](#multi-property-observers)を使用し、 すべての依存部をリストにしてこのオブザーバーの引数に渡します。これにより、オブザーバーの呼び出し前に、すべての依存部が確実に設定されていることを保証します。

```js
static get properties() {
  return {
    firstName: {
      type: String
    },
    lastName: {
      type: String
    }
  }
}

static get observers() {
  return [
    'nameChanged(firstName, lastName)'
  ]
}

nameChanged: function(firstName, lastName) {
  console.log('new name:', firstName, lastName);
}
```

もしシングルプロパティオブザーバーを使用しながら、他のプロパティにも依存する必要がある場合(例えば、マルチプロパティオブザーバを使ってアクセスできないような、監視プロパティの古い値にアクセスする必要がある場合)には、次の注意事項を守ってください。：

*   オブザーバーで使用する前に、すべての依存部が定義されていることを確認します。(例：`if this.lastName !== undefined`)。

しかし、オブザーバーは、引数で列挙された依存部が変更された場合だけ呼び出されるので注意してください。例えば、オブザーバーは`this.firstName`に依存しているが、引数のリストに依存部として列挙されていない場合、`this.firstName`の変更に対してオブザーバーが呼び出されることはありません。s.

## 算出プロパティ(Computed properties) {#computed-properties}

算出プロパティは、一つ以上のパスに基づき算出される仮想的なプロパティです。算出プロパティの算出関数(computing function)は、算出プロパティの値に使用された値を返す点を除けば、コンプレックスオブザーバー(complex observer)と同じルールに従います。


コンプレックスオブザーバーのように、`undefined`値の取り扱いは**監視されているプロパティの数に依存します**。詳細については、[コンプレックスオブザーバー](data-system#observable-changes)の説明を参照してください。

### 算出プロパティの定義

Polymerは、他のプロパティから値が計算される仮想的なプロパティをサポートしています。

算出プロパティを定義するには、オブジェクト`properties`に、算出関数へマップした`computed`キーを追加します。：

```
fullName: {
  type: String,
  computed: 'computeFullName(first, last)'
}
```


この関数には、引数のカッコ内で依存関係にあるプロパティが文字列として渡されます。

コンプレックスオブザーバーと同様に、算出関数は、依存関係にある**すべての**プロパティが定義される(`!== undefined`)まで呼び出されることはありません。 その後、この関数は、依存関係にあるプロパティに対して[監視可能(observable)な変更](data-system#observable-changes)があると一度呼び出されます。


**注意**： 算出関数の定義は、[マルチプロパティオブザーバー](#multi-property-observers)の定義に似ており、二つはほぼ同じように動作します。唯一の違いは、算出プロパティの関数が仮想的なプロパティとして公開される値を返す点です。
{ .alert .alert-info }

```
<dom-module id="x-custom">

  <template>
    My name is <span>{{fullName}}</span>
  </template>

  <script>
    class XCustom extends Polymer.Element {

      static get is() { return 'x-custom'; }

      static get properties() {
        return {
          first: String,

          last: String,

          fullName: {
            type: String,
            // when `first` or `last` changes `computeFullName` is called once
            // and the value it returns is stored as `fullName`
            computed: 'computeFullName(first, last)'
          }
        }
      }

      computeFullName(first, last) {
        return first + ' ' + last;
      }
    }

    customElements.define(XCustom.is, XCustom);
  </script>

</dom-module>
```

算出関数の引数は、エレメント上のシンプルなプロパティかもしれませんが、`observers`でサポートされる引数のタイプと同じならどんなものであっても構いません。これには、[パス](#observing-path-changes)、[ワイルドカードを含むパス](#deep-observation)、[配列スプライスへのパス](#array-observation)が含まれます。算出関数が受け取った引数は、上記のセクションで説明したものと一致します。

**注意**：データバインディングのためにだけに算出プロパティが必要な場合、代わりに算出バインディングを利用できます。詳細は、[算出バインディング](data-binding#annotated-computed)を参照してください 。
{ .alert .alert-info }

## 動的な(dymanib)オブザーバーメソッド {#dynamic-observer-methods}

オブザーバーメソッドが`properties`オブジェクト内で宣言された場合、そのメソッドは動的とみなされます。つまりメソッドが実行時に変更されるかもしれないということです。動的なメソッドはオブザーバーにとって特別な依存部と考えられ、メソッド自体が変更された場合にはオブザーバーは再実行されます。例えば：

```js
class NameCard extends Polymer.Element {

  static get is() {
    return 'name-card'
  }

  static get properties() {
    return {
      // Override default format by assigning a new formatter
      // function
      formatter: {
        type: Function
      },
      formattedName: {
        computed: 'formatter(name.title, name.first, name.last)'
      },
      name: {
        type: Object,
        value() {
         return { title: "", first: "", last: "" };
        }
      }
    }
  }

  constructor() {
    super();
    this.formatter = this.defaultFormatter;
  }

  defaultFormatter(title, first, last) {
    return `${title} ${first} ${last}`
  }
}
customElements.define('name-card', NameCard);
```

`formatter`に新しい値を設定すると、`name`が変更されなかったとしても、`formattedName`プロパティが更新されます。：

```js
nameCard.name = { title: 'Admiral', first: 'Grace', last: 'Hopper'}
console.log(nameCard.formattedName); // Admiral Grace Hopper
nameCard.formatter = function(title, first, last) {
  return `${last}, ${first}`
}
console.log(nameCard.formattedName); // Hopper, Grace
```

動的オブザーバーのプロパティは依存部としてカウントされるため、メソッドが定義されている場合には、
たとえ他の依存部が一切定義されていなくても、オブザーバーは初期化時に実行されます。

## 動的にオブザーバーや算出プロパティを追加する {#dynamic-observers}

場合によっては、オブザーバーや算出プロパティを動的に追加することもできます。インスタンス
メソッドを利用することで、シンプルオブザーバー、コンプレックスオブザーバー、または算出プロパティを現在のエレメントの_インスタンス_に追加することもできます。


### シンプルオブザーバーを動的に追加する

インスタンスメソッド`_createPropertyObserver`を利用すればシンプルオブザーバーを動的に生成することができます。
例えば：

```js
this._observedPropertyChanged = (newVal) => { console.log('observedProperty changed to ' + newVal); };
this._createPropertyObserver('observedProperty', '_observedPropertyChanged', true);
```

オプションの第3引数を指定することで、メソッド自体を依存部として扱うようにできます。（この例では`_observedPropertyChanged`）

### コンプレックスブザーバーを動的に追加する

インスタンスメソッド`_createMethodObserver`を利用すればコンプレックスオブザーバーを動的に生成することができます。
例えば：


```js
this._createMethodObserver('_observeSeveralProperties(prop1,prop2,prop3)', true);
```


オプションの第3引数を指定することで、メソッド自体を依存部として扱うようにできます。（この例では`_observeSeveralProperties`）


### 算出プロパティを動的に追加する

インスタンスメソッド`_createComputedProperty`を利用すれば算出プロパティを動的に生成することができます。

```js
this._createComputedProperty('newProperty', '_computeNewProperty(prop1,prop2)', true);
```


オプションの第3引数を指定することで、メソッド自体を依存部として扱うようにできます。（この例では`_computeNewProperty`）

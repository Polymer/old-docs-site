---
title: プロパティの宣言
---

<!-- toc -->

デフォルト値を追加したりデータシステムの様々な機能を利用するために、要素にプロパティを宣言することができます。

宣言したプロパティには以下のような項目を指定できます：

*   プロパティの型(type)
*   デフォルト値
*   プロパティの変更を監視するオブザーバー。プロパティ値が変更される度に特定のメソッドを呼び出します。
*   読み取り専用(read-only)ステータス。プロパティ値の予期せぬ変更を防ぎます。
*   双方向データバインディングのサポート。プロパティ値が変更されるたびにイベントを発生させます。
*   算出プロパティ(computed property)。他のプロパティを元に値を動的に計算します。
*   属性へのプロパティの反映を指定。プロパティ値がアップデートされたときに対応する属性の値を変更します。

これらの機能の多くは、[データシステム](data-system)に緊密に統合されており、それらはデータシステムのセクションに解説があります。

さらに、宣言的プロパティは、マークアップから属性を使って設定することもできます（詳細については、[属性のデシリアライズ](#attribute-deserialization)のセクションを参照してください）。

**ほとんどの場合、要素のパブリックAPIの一部となるプロパティは`properties`オブジェクト内で宣言する必要があります。**

プロパティを宣言するには、要素のクラスに静的getterメソッド`properties`を追加します。getterメソッドは、プロパティの宣言を含むオブジェクトを返す必要があります。

例：{ .caption }

```js
class XCustom extends Polymer.Element {

  static get properties() {
    return {
      user: String,
      isHappy: Boolean,
      count: {
        type: Number,
        readOnly: true,
        notify: true
      }
    }
  }
}

customElements.define('x-custom', XCustom);
```

この`properties`オブジェクトは、各プロパティに以下のキーを提供しています。

<table>
  <tr>
    <th>キー</th>
    <th>詳細</th>
  </tr>
  <tr>
    <td><code>type</code></td>
    <td>
      型：コンストラクタ<br>
      Attribute type, used for deserializing from an attribute. Polymer supports deserializing the following types: <code>Boolean</code>, <code>Date</code>, <code>Number</code>, <code>String</code>,<code>Array</code> and <code>Object</code>. You can add support for other types by overriding the element's `_deserializeValue` method.

      指定された型は、属性からプロパティにデシリアライズに使用されます。0.5系と違い、プロパティの型はコンストラクタの型によって明示的に指定されます。詳細は<a href="#attribute-deserialization">属性のデシリアライズ</a>を参照してください 。
    </td>
  </tr>
  <tr>
    <td><code>value</code></td>
    <td>
      型: <code>boolean</code>, <code>number</code>, <code>string</code> または <code>function</code>.<br>
      プロパティのデフォルト値となります。もし<code>value</code>が関数の場合、関数が呼び出され、戻り値がプロパティのデフォルト値に使用されます。デフォルト値が**インスタンスに固有な**配列またはオブジェクトでなければならない場合は、関数内で配列またはオブジェクトを作成します。詳細については、<a href="#configure-values">デフォルトのプロパティ値の設定</a>を参照してください 。
    </td>
  </tr>
  <tr>
    <td><code>reflectToAttribute</code></td>
    <td>
      型: <code>boolean</code><br>

      <code>true</code>を指定すると、プロパティ値が変更された場合、対応する属性がホストノードに設定されるようになります。プロパティ値がブール値の場合には、属性は標準のHTML属性のブール値として作成されます（trueの場合に記述され、falseの場合には記述されない）。プロパティの型がそれ以外なら、属性値はプロパティ値を文字列で表現したものになります。<br><br>Polymer0.5系の<code>reflect</code>に相当します。詳細については、<a href="#attribute-reflection">属性へのプロパティの反映</a>を参照してください。
    </td>
  </tr>
  <tr>
    <td><code>readOnly</code></td>
    <td>
      型： <code>boolean</code><br>
      <code>true</code>を指定した場合、プロパティは代入やデータバインディングによって直接的に設定することができなくなります。詳細については、<a href="#read-only">読み取り専用プロパティ</a>を参照してください。
    </td>
  </tr>
  <tr>
    <td><code>notify</code></td>
    <td>
      型： <code>boolean</code><br>
      <code>true</code>を指定した場合、プロパティに双方向データバインディングが使用できます。さらに、プロパティが変更されるたびに<code>property-name-changed</code>イベントが発生します。詳細については、<a href="#notify">プロパティ変更通知イベント（notify）</a>を参照してください。
    </td>
  </tr>
  <tr>
    <td><code>computed</code></td>
    <td>
      型: <code>string</code><br>
      プロパティの値は、メソッド名と引数リストとして解釈されます。このメソッドは、引数の値のいずれかが変更されるたびに、プロパティ値を算出するために呼び出されます。算出プロパティは常に読み取り専用です。詳細については、<a href="observers#computed-properties">算出プロパティ</a>を参照してください 。
    </td>
  </tr>
  <tr>
    <td><code>observer</code></td> 
    <td>
      型: <code>string</code><br>

      プロパティ値は、プロパティ値が変更された時に呼び出されるメソッドの名前として解釈されます。0.5系とは異なり、 <strong>プロパティ変更ハンドラは明示的に登録する必要がある点に注意してください。</strong><code><var>propertyName</var>Changed</code>メソッドは自動的に実行されることはありません。詳細については、<a href="observers">プロパティ変更コールバック（observers）</a>を参照してください。

    </td>
  </tr>
</table>

## プロパティ名の属性名へのマッピング {#property-name-mapping}

データバインディング、属性からのプロパティへのデシリアライズ、およびプロパティの属性への反映において、Polymerは属性名をプロパティ名に、またその逆に、マッピングを行います。

属性名をプロパティ名にマッピングする場合：

*   属性名は小文字のプロパティ名に変換されます。例えば、属性名が`firstName`であれば`firstname`にマップされます。

*   属性名にダッシュ(-)が含まれる場合には、キャメルケース(camelCase)に変換されます。つまりダッシュ(-)を削除して、ダッシュの後の各文字を大文字に変換します。例えば、属性名が`first-name`であれば`firstName`にマップされます。

上記とは反対に、プロパティ名を属性名に変換する際は、同様のマッピングが逆に実行されます（例えば、プロパティに`reflectToAttribute: true`が定義されている場合など）。

**互換性に関する注意:** 0.5系では、Polymerは属性名を一致したプロパティにマップしようとしました。例えば、もし要素上でプロパティでfooBarが定義されている場合、属性`foobar`は、プロパティ`fooBar`にマップされます。このようなプロパティのマッピングは、**1.0系以降の属性では発生しません。**属性からプロパティへのマッピングは、上記で示したルールに従って要素の登録のタイミングで実行されます。
{ .alert .alert-warning }

## 属性のデシリアライズ{#attribute-deserialization}

`properties`オブジェクトでプロパティが設定されている場合、プロパティ名に一致するインスタンスの属性は、指定された*型*に従ってデシリアライズされ、インスタンス上の同名のプロパティに割り当てられます。

`properties`オブジェクトに`type`(コンストラクタによって`Object`、`String`などに指定された型)以外が記述されていない場合(訳注：”property: String" のような略記のこと)、属性の値を`properties`オブジェクトの`type`プロパティの値に直接設定することができます。そうでない場合(訳注：略記でない場合)には、 `properties`オブジェクト内で`type`キーの値として設定されるべきです。


Boolean型プロパティは属性値の有無によって設定されます。つまり属性が存在すれば(属性の値は関係ない)プロパティにtrueが設定され、属性が存在しなければ、プロパティはデフォルト値になります。

例: { .caption }

```html
<script>
  class XCustom extends Polymer.Element {

    static get properties() {
      return {
        user: String,
        manager: {
          type: Boolean,
          notify: true
        }
      }
    }

    connectedCallback() {
      super.connectedCallback();
      
      // render
      this.textContent = 'Hello World, my user is ' + (this.user || 'nobody') + '.\n' +
        'This user is ' + (this.manager ? '' : 'not') + ' a manager.';
    }
  }

  customElements.define('x-custom', XCustom);
</script>

<x-custom user="Scott" manager></x-custom>
<!--
<x-custom>'s text content becomes:
Hello World, my user is Scott.
This user is a manager.
-->
```

属性から要素にキャメルケース(camelCase)のプロパティを設定するには、属性名としてダッシュケース(dash-case)を使用する必要があります。

例: { .caption }

```html
<script>

  class XCustom extends Polymer.Element {

    static get properties() {
      return {
        userName: String
      }
    }
  }

  customElements.define('x-custom', XCustom);
</script>

<x-custom user-name="Scott"></x-custom>
<!-- Sets <x-custom>.userName = 'Scott';  -->
```

**注意**：属性からプロパティへのデシリアライズは、作成時と実行時（例えば、`setAttribute`を使用して実行時に属性を変更する場合）の両方で発生します。しかし、属性は静的マークアップからプロパティを設定するためだけに使用することが推奨され、実行時にプロパティを変更するには(訳補：属性からではなく)直接的に設定するように下さい。
{.alert .alert-info}


### ブール値のプロパティの設定

マークアップからBoolean型のプロパティを指定したい場合、デフォルト値を`false`にする必要があります。デフォルト値が`true`場合、マークアップから`false`を指定することはできません。なぜなら、属性の有無にかかわらず、`true`と等価であると判定されるためです。これはWebプラットフォームにおける属性の標準的な振る舞いです。

この振る舞いがあなたのユースケースに合わない場合は、代わりに文字列や数値を属性の値に利用できます。

### オブジェクトと配列のプロパティの設定

プロパティがオブジェクトや配列の場合、これらはJSON形式にして渡すことができます：

```
<my-element book='{ "title": "Persuasion", "author": "Austen" }'></my-element>
```

上記のように、JSONでは二重引用符が必要な点に注意してください。

### Custom deserializers

The type system includes built-in support for Boolean and Number values, Object and Array values
expressed as JSON, or Date objects expressed as any Date-parsable string
representation. To support other types, you can override the element's `_deserializeValue` method.


```js
_deserializeValue(value, type) {
  if (type == MyCustomType) {
    return stringToMyCustomType(value);
  } else {
    return super._deserializeValue(value, type);
  }
}
```

## デフォルトのプロパティ値の設定 {#configure-values}

`properties`オブジェクトのプロパティのデフォルト値は、`value`フィールドを使用することで設定できます。プロパティ値は、プリミティブな値でも、値を返す関数でも構いません。

関数を指定した場合、Polymerは要素の_インスタンスごとに_一度ずつ呼び出します。

オブジェクトのプロパティや配列の値を初期化する際は、関数を利用して、すべての要素のインスタンス間でオブジェクトや配列を共有せず、要素ごとに独自に値をコピーして取得するようにします。

例: { .caption }

```js
class XCustom extends Polymer.Element {

  static get properties() {
    return {
      mode: {
        type: String,
        value: 'auto'
      },

      data: {
        type: Object,
        notify: true,
        value: function() { return {}; }
      }
    }
  }
}
```


## プロパティ変更通知イベント（notify） {#notify}

プロパティを`notify: true`に設定すると、プロパティ値が変更される度に、以下の名前のイベントが発火します。

<code><var>property-name</var>-changed</code>

イベント名の<code><var>property-name</var></code>部分は、プロパティ名をダッシュケースで表現したものです。例えば、`this.firstName`が変更されると`first-name-changed`が発火するといった具合です。

これらのイベントは、双方向データバインディングシステムによって利用されます。外部のスクリプトから`addEventListener`を使用してイベント(`first-name-changed`のような)を監視することもできます。
Property change events don't bubble, so
the event listener must be added directly to the element generating the event. 

プロパティ変更通知とデータシステムの詳細については、[データフロー](data-system#data-flow)を参照してください。

## 読み取り専用プロパティ(readOnly) {#read-only}

プロパティがデータを生成(produce)するだけで消費(consume)しない場合、`properties`の定義においてプロパティの`readOnly`フラグを`true`に設定することで、ホストからの不測の変更を明示的に避けることができます。

In order for the element to actually change the value of the property, it must use a private generated setter of the convention <code>\_set<var>Property</var>(value)</code> where <code><var>Property</var></code> is the property name, with the first character converted to uppercase (if alphabetic). 

For example, the setter for `oneProperty` is `setOneProperty`, and the setter for `_privateProperty` is `set_privateProperty`.


```
class XCustom extends Polymer.Element {

  static get properties() {
    return {
      response: {
        type: Object,
        readOnly: true,
        notify: true
      }
    }
  }

  responseHandler(response) {
    // set read-only property
    this._setResponse(response);
  }
}
```

読み取り専用プロパティとデータバインディングに関する詳細については、[データフローの制御方法](data-system#data-flow-control)を参照してください 。


## プロパティの属性への反映(reflectToAttribute)  {#attribute-reflection}

ある特定のケースにおいては、HTMLの属性値とプロパティ値を同期させておくと便利かもしれません。`properties`オブジェクト内のプロパティに`reflectToAttribute: true`を設定することで実現できます。 これによって、プロパティに対する_監視可能な変更_は、同名の属性にシリアライズされます。
(as described in <a href="#property-name-mapping">Property name to attribute name mapping</a>).
Since attributes only take string values, the property value is serialized
to a string, as described in <a href="#attribute-serialization">Attribute serialization</a>.

```js
class XCustom extends Polymer.Element {

  static get properties() {
    return {
      loaded: {
        type: Boolean,
        reflectToAttribute: true
      }
    }
  }

  _onLoad() {
    this.loaded = true;
    // results in this.setAttribute('loaded', true);
  }
}
```

### 属性へのシリアライズ {#attribute-serialization}

プロパティを属性に反映する場合や[属性にプロパティをバインド](data-binding#attribute-binding)する場合、プロパティの値は属性に_シリアライズ_されます。

デフォルトでは、プロパティの`type`の値に関係なく、値の**現在の型**に従って以下のようにシリアライズされます。：

*   `String`：シリアライズは不要です。
*   `Date`または`Number`：`toString`を使用してシリアライズされます。
*   `Boolean`：値を持たない属性が設定(`true`の場合)または、削除(`false`の場合)されます。
*   `Array`または`Object`：`JSON.stringify`を使用してシリアライズされます。

カスタム要素に独自のシリアライズ処理を実装したい場合には、要素の`_serializeValue`メソッドをオーバーライドして下さい。

```js
_serializeValue(value) {
  if (value instanceof MyCustomType) {
    return value.toString();
  }
  return super._serializeValue(value);
}
```

## 暗黙的に宣言されたプロパティ

データバインディングにプロパティを追加したり、オブザーバー、算出プロパティ、算出バインディングといった機能により、依存関係をもつプロパティを追加した場合には、プロパティが_暗黙的に_宣言されたことになります。

Polymerはこれら暗黙的に宣言されたプロパティに自動的にsetterメソッドを作成します。しかし、暗黙的に宣言されたプロパティをマークアップから作成することはできません。

## 非公開および保護されたプロパティ

JavaScriptにはプロパティを真に保護する機能はありません。Polymer要素では、慣例に従い命名規約を通じてこれらを表現します。保護されるべきプロパティやメソッドはシングルアンダースコア(`_protectedProp`)で明示します。(サブクラスで利用または上書きされることは許可されますが、publicな利用は意図しません)また、クラスのprivateなメンバーであることを明示するにはダブルアンダースコア(`__privateProp`)を利用します。

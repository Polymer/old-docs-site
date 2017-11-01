---
title: データバインディング
---

<!-- toc -->

_データバインディング_は、Custom Element(_ホストエレメント_)のデータとそのローカルDOM(子エレメントまたは_ターゲットエレメント_)のプロパティまたは属性にコネクトします。ホストエレメントのデータは、[データパス](data-system#paths)で表された特定のプロパティやサブプロパティまたは、一つ以上のパスに基づき生成されたデータになるでしょう。

エレメントのローカルDOMのテンプレートにアノテーションを追加することで、データバインディングを作成できます。

```
<dom-module id="host-element">
  <template>
    <target-element target-property="{{hostProperty}}"></target-element>
  </template>
</dom-module>
```

データバインディングのアップデートは、[プロパティエフェクト](data-system#property-effects)の一つです。

## データバインディングの分析

データバインディングは、ローカルDOMのテンプレートにHTML属性として現れます。：

<pre><code><var>property-name</var><b>=</b><var>annotation-or-compound-binding</var></code>
<code><var>attribute-name</var><b>$=</b><var>annotation-or-compound-binding</var></code></pre>

バインディングの左側で、ターゲットのプロパティや属性を識別します。

-   プロパティにバインドするには、[プロパティ名と属性名のマッピング](#property-name-mapping)で説明した通り、プロパティ名は属性のフォーマット(camelCaseでなくdash-case)で指定して下さい。

    ```html
    <my-element my-property="{{hostProperty}}">
    ```

    この例では、`<my-element>`上のプロパティ`myProperty`をターゲットにしてバインドします。

-   一方、属性にバインドするには、次のように`$`に続けて属性名を記述します。

    ```html
    <a href$="{{hostProperty}}">
    ```

    この例では、`a`エレメントの`href`**属性**にバインドしています。

バインディングの右側は、 _バインディングアノテーション(binding annotation)_ または _複合バインディング(compound binding)_ のいずれかになります。：

<dl>
  <dt>バインディングアノテーション</dt>
  <dd>二つの中括弧(<code>{{ }}</code>)または、二つの角括弧(<code>[[ ]]</code>)で囲まれたテキスト。ホストのデータがバインドされていることを表します。</dd>
  <dt>複合バインディング(compound binding)</dt>
  <dd>一つ以上のバインディングアノテーションを含む文字列リテラル。</dd>
</dl>

データフローが、ホストからターゲットに下に向けて流れるか、ターゲットからホストへ上に向けて流れるか、あるいはその両方になるかは、バインディングのアノテーションの種類やターゲットプロパティの設定によって制御されます。

-   二重中括弧(`{{ }}`)は、上向きと下向きのデータフロー両方をサポートします。
-   二重角括弧(`[[ ]]`)は、下向きに一方向のデータフローだけをサポートします。

データフローの詳細については、[データフローの制御方法](data-system#data-flow-control)を参照してください。

## ターゲットプロパティへバインド {#property-binding}

ターゲットプロパティにバインドするには、属性値に[アノテーション](#binding-annotations)または[複合バインディング](#compound-bindings)を使用して、プロパティに対応する属性名を指定します。：

```
<target-element name="{{myName}}"></target-element>
```

この例では、ターゲットエレメントの`name`プロパティをホストエレメントの`myName`プロパティにバインドしています。アノテーションには双方向又は自動(automatic)デリミタ(`{{ }}`)が使用されているので、`name`プロパティでサポートするように設定していれば双方向バインディングが生成されます。

一方向バインディングを指定するには、二重角括弧(`[[ ]]`)を使用します。：

```
<target-element name="[[myName]]"></target-element>
```


プロパティ名は、[プロパティ名と属性名のマッピング](properties#property-name-mapping)で説明しているように、属性のフォーマットで記述されます。エレメントの`camelCase`プロパティをバインドするには、属性名に`dash-case`を使用します。
例えば：

```
<!-- Bind <user-view>.firstName to this.managerName; -->
<user-view first-name="{{managerName}}"></user-view>
```

バインドされているプロパティがオブジェクか配列の場合、どちらのエレメントも**同じオブジェクト**への参照を取得します。つまり、どちらのエレメントからもオブジェクトを変更できるので、真の一方向バインディングは実現できません。詳細は、[オブジェクト及び配列のデータフロー](data-system#data-flow-objects-arrays)を参照してください。

**属性やプロパティの中には特別なものがあります。**`style`、`href`、`class`、`for`、`data-*`へバインドする場合には、[属性のバインド](#attribute-binding)構文を使ってください。詳細は、[ネイティブエレメントの属性へのバインド](#native-binding)を参照してください。 
{ .alert .alert-info }

### テキストコンテンツ(text contetent)にバインド

ターゲットエレメントの`textContent`にバインドするには、ターゲットエレメントの中にアノテーションまたは複合バインディングを含めるだけです。

```
<dom-module id="user-view">
  <template>
    <div>[[name]]</div>
  </template>

  <script>
    class UserView extends Polymer.Element {
      static get is() {return 'user-view'}
      static get properties() {
        return {
          name: String
        }
      }
    }

    customElements.define(UserView.is, UserView);
  </script>
</dom-module>

<!-- usage -->
<user-view name="Samuel"></user-view>
```

テキストコンテンツへのバインディングは、常にホストからターゲットへ一方向になります。

## ターゲット属性にバインド {#attribute-binding}

大半のケースでは、データを他のエレメントへバインドするには、[プロパティバインディング](#property-binding)を利用するすべきです。それによって、エレメント上のJavaScriptのプロパティに新しい値を設定すると、その変更が伝播されます。

しかし、時にはエレメントにプロパティではなく属性を設定する必要があるかもしれません。例えば、CSSで属性セレクタを利用していたり、ARIA(※)のような属性ベースのAPIと相互運用性を高めるために属性セレクタを使っている場合です。
(※)ARIA(Accessible Rich Internet Applications)：ハンディキャップを持つ人に向けた情報のアクセシビリティ向上を目的とした標準規約

属性にバインドするには、属性名の後にドル記号(`$`)を追加します。：

```
<div style$="color: {{myColor}};">
```

属性の値は、[バインディングアノテーション](#binding-annotationstem/data-binding.md#binding-annotations)または[複合バインディング](#compound-binding)のいずれかになります。

属性バインディングにより、次の呼び出しが行われます。：


```js
element.setAttribute(attr,value);
```

以下とは対照的です。：


```js
element.property = value;
```

例：


```html
<template>
  <!-- Attribute binding -->
  <my-element selected$="[[value]]"></my-element>
  <!-- results in <my-element>.setAttribute('selected', this.value); -->

  <!-- Property binding -->
  <my-element selected="{{value}}"></my-element>
  <!-- results in <my-element>.selected = this.value; -->
</template>
```


属性バインディングは、ホストからターゲットに向けて常に一方向なります。値は、[属性のシリアル化](properties.html#attribute-serialization)で説明したように、 _現在の_ 型に応じてシリアライズされます。

繰り返しになりますが、属性にバインドする際は、値は文字列にシリアライズする必要があるので、単純なデータの伝播には、常にプロパティバインディングを使用する方が優れたパフォーマンスを発揮します。


### プロパティバインディングをサポートしていないネイティブのプロパティ {#native-binding}

Polymerが直接データをバインドできない一般的なネイティブエレメントのプロパティがわずかながら存在します。原因は、いくつかのブラウザ上でバインディングが引き起こす問題にあります。

以下のプロパティにバインディングの効果を与えるには属性バインディングを使用する必要があります。：

| 属性 | プロパティ | 説明 |
|----|----|----|
| `class` | `classList`, `className` | フォーマットの異なる二つのプロパティをマップされます。 |
| `style` | `style` | 仕様では、`style`は`CSSStyleDeclaration`オブジェクトに対する読み取り専用の参照とみなされます。 |
| `href` | `href` | |
| `for` | `htmlFor` | |
| `data-*` |  `dataset` | カスタムデータ属性(属性名が`data-`で始まる)は`dataset`プロパティに格納されています。|
| `value` | `value` | `<input type="number">`だけに使えます。 |

**注意**：`value`プロパティへのデータバインディングは、**入力タイプが数値の場合**IEではうまく機能しません。このようなケースでは、一方向の属性バインディングを使用することで、`value`に数値入力を設定できます。あるいは、双方向バインディングを正しく扱う`iron-input`や`paper-input`のような別のエレメントを使用して下さい。
{.alert .alert-info }

上記リストには現在、プロパティのバインディングで問題を引き起こすことが知られているプロパティが含まれます。他のプロパティも影響を受ける可能性があります。

プロパティをバインドできない理由は様々です：

*   属性値に括弧`{{...}}`を配置する機能には全てのブラウザ上で問題がある。

*   (`class`のように)別の名前のJavaScriptプロパティにマップされる属性がある。

*   (`style`のように)固有の構造を持つプロパティが存在する。

動的な値への属性バインディング(`$=`を使用)：


```html
<!-- class -->
<div class$="[[foo]]"></div>

<!-- style -->
<div style$="[[background]]"></div>

<!-- href -->
<a href$="[[url]]">

<!-- label for -->
<label for$="[[bar]]"></label>

<!-- dataset -->
<div data-bar$="[[baz]]"></div>

<!-- ARIA -->
<button aria-label$="[[buttonLabel]]"></button>

```

## アノテーションのバインド {#binding-annotation}

Polymerは、二種類のデータバインディングデリミタを用意しています。：

<dl>
  <dt>一方向デリミタ： <code>[[<var>binding</var>]]</code></dt>
  <dd>一方向バインディングは、<strong>下向き</strong>のデータフローのみ許可します。</dd>
  <dt>双方向または自動(automatic)デリミタ: <code>{{<var>binding</var>}}</code></dt>
  <dd>双方向(オートマティック)バインディングは、<strong>上向きと下向き</strong>のデータフローを許可します。</dd>
</dl>

双方向バインディングと上向きデータフローについては、[データフロー](data-system#data-flow)を参照してください。

デリミタ内のテキストは、次のいずれかになります。：

*   プロパティまたはサブプロパティのパス(例：`users`、`address.street`)。
*   算出バインディング(例：`_computeName(_computeName(firstName, lastName, locale)`)。
*   上記のいずれかに、否定演算子(`!`)を前置したもの。

データバインディングアノテーションのパスは、現在の[データバインディングのスコープ](data-system#data-binding-scop)に関連しています。

### ホストプロパティにバインド {#host-property}

バインディングアノテーションの最もシンプルな形式は、ホストプロパティを使用する場合です。：

```
<simple-view name="{{myName}}"></simple-view>
```

バインドされるプロパティがオブジェクトか配列の場合、どちらのエレメントも**同じオブジェクト**への参照を取得します。つまり、どちらのエレメントからもオブジェクトを変更できるので、真の一方向バインディングは実現できません。詳細については、[オブジェクトおよび配列のデータフロー](data-system#data-flow-objects-arrays)を参照してください。

### ホストのサブプロパティにバインド {#path-binding}

以下に示すように、バインディングアノテーションには、サブプロパティのパスも含めることができます。：

```
<dom-module id="main-view">

  <template>
    <user-view first="{{user.first}}" last="{{user.last}}"></user-view>
  </template>

  <script>
    class MainView extends Polymer.Element {
      static get is() {return 'main-view'}
      static get properties() {
        return {
          user: Object
        }
      }
    }

    customElements.define(MainView.is, MainView);
  </script>

</dom-module>
```

サブプロパティの変更は自動的に[監視可能(obsevable)](data-system#observable-changes)ではありません。

ホストエレメントがサブプロパティを更新する場合は、[パスでプロパティまたはサブプロパティを設定](model-data#set-path)で説明した通り、`set`メソッドを使用するか、[Polymerへの通知](model-data#notify-path)で説明した`notifyPath`メソッドを使用する必要があります。


```
//  Change a subproperty observably
this.set('name.last', 'Maturin');
```

バインディングが双方向で、ターゲットエレメントがバインドされたプロパティを更新する場合には、その変更は上に向けて自動的に伝播します。

バインドされているサブプロパティがオブジェクトか配列の場合、どちらのエレメントも**同じオブジェクト**への参照を取得します。つまり、どちらのエレメントもオブジェクトを変更できるので、真の一方向バインディングは実現できません。詳細については、[オブジェクトおよび配列のデータフロー](data-system#data-flow-objects-array)を参照してください。

### 論理否定演算子(!) {#expressions-in-binding-annotations}

バインディングアノテーションは、バインディングデリミタの中の最初の文字として、単一の論理否定演算子(`!`)をサポートします。：

```
<template>
  <my-page show-login="[[!isLoggedIn]]"></my-page>
</template>
```

この例では、`isLoggedIn`が真の値を持つなら`showLogin`は`false`になります。

論理否定演算子は一つだけサポートされています。(`!!`)を使って値の型変換をするようなことはできません。より複雑な変換が必要な場合には、[算出バインディング](#annotated-computed)を使用します。

**論理否定バインディングは一方向です。**：
論理否定演算子を使ったバインディングは、**常にホストからターゲットに一方向**になります。
{.alert .alert-info}

### 算出バインディング(Computed bindings) {#annotated-computed}

*算出バインディング*は[算出プロパティ](observers#computed-properties)と似ています。バインディングアノテーション内で宣言されます。

```
<div>[[_formatName(first, last, title)]]</div>
```

算出バインディングの宣言は、算出関数の名前に続けて括弧で囲った_依存部_のリストを記述します。

エレメントは、自身のテンプレート内で、同じ算出関数を参照する複数の算出バインディングを持つことができます。

算出プロパティと*コンプレックスオブザーバー*でサポートされている*依存部*のタイプに加えて、算出バインディングの依存部には、文字列または数値リテラルを含めることができます。

算出バインディングが役に立つのは、算出プロパティをエレメントのAPIの一部として公開する必要がない場合や、エレメント内の他の場所で使用する場合です。算出バインディングは、値を表示する際に、フィルタリングしたり変換したりするのにも役立ちます。

算出バインディングは、以下の点で算出プロパティと異なります：

*   算出バインディングの依存部は、現在のバインディングスコープに関連づけて解釈されます。例えば、[テンプレートリピーター](templates.html#dom-repeat)の内部では、依存関係にあるプロパティは現在の`item`を参照します。

*   算出バインディングの引数リストには、[リテラルな引数](#literal-arguments-to-computed-bindings)を含めることができます。

*   算出バインディングは*空の*引数リストを持つことができます。この場合、算出関数の呼び出しは一度限りです。

例：{ .caption }
```
<dom-module id="x-custom">

  <template>
    My name is <span>[[_formatName(first, last)]]</span>
  </template>

  <script>
    class XCustom extends Polymer.Element {
      static get is() {return 'x-custom'}
      static get properties() {
        return {
          first: String,
          last: String
        }
      }
      _formatName(first, last) {
        return `${last}, ${first}`
      }

    }

    customElements.define(XCustom.is, XCustom);
  </script>

</dom-module>
```

この場合、`span`の`textContent`プロパティは、`_formatName`の返り値にバインドされ、`first`や`last`が変更されるたびに再計算されます。

**算出バインディングは一方向**：算出バインディングは、ホストからターゲットに常に一方向です。
{.alert .alert-info}

#### 算出バインディングの依存部 {#computed-binding-dependencies}

算出バインディングの依存部には、[コンプレックスオブザーバー](observers#complex-observers)によってサポートされている依存部のタイプであればどれでも含めることができます。

*   現在のスコープ上の単純なプロパティ
*   サブプロパティへのパス
*   ワイルドカードを含むパス
*   配列のsplicesへのパス

上記に加えて、算出バインディングにはリテラルな引数を含めることができます。

依存関係にあるプロパティがどのタイプでも、算出関数に渡される引数はオブザーバーに渡されるものと同じです。

オブザーバーや算出プロパティを利用する場合と同様に、**依存関係にある全てのプロパティが定義される(`!=undefined`)まで算出関数が呼び出されることはありません**。

ワイルドカードを含むパスを使った算出バインディングの例は、[配列アイテムにバインド](#array-bindin)を参照してください。

#### 算出バインディングへのリテラルな引数 {#literals}

算出バインディングに渡すことができる引数は、文字列または数値リテラルです。

文字列は、シングルクォテーション(')又はダブルクォテーション(")で囲われるでしょう。属性やプロパティのバインディングでは、属性値にダブルクォテーションを使っている場合、文字列リテラルにはシングルクォテーションを使用して下さい。これらは逆であっても構いません。

**文字列リテラルでカンマを使用**：文字列リテラルの中でカンマを使用する場合には、バックスラッシュ(`\`)を使ってエスケープ**しなければいけません**。
{.alert .alert-info }

例：

```html
<dom-module id="x-custom">
  <template>
    <span>{{translate('Hello\, nice to meet you', first, last)}}</span>
  </template>
</dom-module>
```

なお、算出バインディングに依存関係のあるプロパティがない場合、評価は一度だけ行われます。：

```
<dom-module id="x-custom">
  <template>
    <span>{{doThisOnce()}}</span>
  </template>

  <script>
    class XCustom extends Polymer.Element {

      static get is() {return 'x-custom'}

      doThisOnce: function() {
        return Math.random();
      }

    }

    customElements.define(XCustom.is, XCustom);
  </script>
</dom-module>
```

## 複合バインディング(Compound bindings) {#compound-bindings}

文字列リテラルに単一プロパティのバインディングやテキストコンテンツのバインディングを混ぜて使用することもできます。例えば：

```
<img src$="https://www.example.com/profiles/[[userId]].jpg">

<span>Name: [[lastname]], [[firstname]]</span>
```

複合バインディングは、個々のバインディングのいずれかの値が変更されるたびに再評価されます。`undefined`の値は、空の文字列によって補完されます。

**複合バインディングは一方向**：複合バインディングでは、一方向(`[[ ]]`)または自動(`{{ }}`)バインディングアノテーションを使用することができますが、その向きは**ホストからターゲットに常に一方向**になります。
{.alert .alert-info}


## 配列と配列アイテムへのバインディング {#array-binding}

アノテーションの解析(parsing)をシンプルに保つために、**Polymerは配列のアイテムに直接バインドする方法を用意していません**。

```
<!-- Don't do this! This format doesn't work -->
<span>{{array[0]}}</span>
<!-- Don't do this! Data may display, but won't be updated correctly -->
 <span>{{array.0}}</span>
```

データバインディングにおいて、配列のアイテムとやりとりする方法はいくつか存在します。：

*   ヘルパーエレメント`dom-repeat`を使用すると、配列内の各アイテムに対して、テンプレートのインスタンスを作成することができます。`dom-repeat`のインスタンス内部では、配列アイテムのプロパティへバインドできます。

*   ヘルパーエレメント`array-selector`を使用すると、配列中から選択されたアイテムとデータをバインドできます。そこで選択されるアイテムは、単一のアイテムか、元の配列のサブセットのいずれかになります。

*   算出バインディングを使って、配列の個々のアイテムをバインドすることができます。

関連トピック：

*   [テンプレートリピータ](templates#dom-repeat)
*   [配列セレクタ](templates#array-selector)
*   [配列アイテムにバインド](#bind-array-item)


### 配列アイテムにバインド {#bind-array-item}

算出バインディングを使用して、特定の配列アイテムやその配列アイテムのサブプロパティにバインドすることができます(例：`array[index].name`)。

次の例は、算出バインディングを使用して、配列アイテムからプロパティにアクセスする方法を示しています。
バインディングにワイルドカードパス(`myArray.*`)を使用しているので、サブプロパティの値が変更された場合や、配列そのものが変更された場合には算出関数を呼び出す必要があります。

```
<dom-module id="x-custom">

  <template>
    <div>[[arrayItem(myArray.*, 0, 'name')]]</div>
    <div>[[arrayItem(myArray.*, 1, 'name')]]</div>
  </template>

  <script>

    class XCustom extends Polymer.Element {

      static get is() {return 'x-custom'}

      static get properties() {
        return {
          myArray: {
            type: Array,
            value: [{ name: 'Bob' }, { name: 'Doug' }]
          }
        }
      }

      // first argument is the change record for the array change,
      // change.base is the array specified in the binding
      arrayItem(change, index, path) {
        // this.get(path, root) returns a value for a path
        // relative to a root object.
        return this.get(path, change.base[index]);
      },

      ready() {
        super.ready();
        // mutate the array
        this.unshift('myArray', { name: 'Susan' });
        // change a subproperty
        this.set('myArray.1.name', 'Rupert');
      }
    }

    customElements.define(XCustom.is, XCustom);
  </script>

</dom-module>
```

## 双方向バインディング

双方向バインディングは、下向き(ホストからターゲットへ)と上向き(ターゲットからホストへ)の両方にデータの変更を伝播できます。変更を上に向けて伝播させるには、自動データバインディングデリミタ(`{{ }}`)を使用し、またターゲットプロパティを`notify: true`に設定する必要があります。詳細については、[データフロー](data-system#data-flow)を参照してください。

配列やオブジェクトのプロパティにバインドする場合、どちらのエレメントも共有された配列やオブジェクトにアクセスして変更を加えることができます。そのような場合は、*プロパティエフェクト*が上向きに伝播するように、自動バインディングデリミタを使用して下さい。詳細については、[オブジェクトおよび配列のデータフロー]((#data-flow-objects-arrays)を参照してください。

### Polymer Elementでないエレメントへの双方向データバインディング {#two-way-native}

[変更通知イベント](#change-events)で説明したように、Polymerは双方向データバインディングを実現するために、イベントの命名規則を利用しています。

Polymer Elementでないエレメントや、このイベント命名規則に従わないネイティブエレメントへ双方向のデータバインドを行うには、次の構文を使いアノテーション内に独自の変更イベント名を指定することができます。：

<code><var>target-prop</var>="{{<var>hostProp</var>::<var>target-change-event</var>}}"</code>


例：{ .caption }

```
<!-- Listens for `input` event and sets hostValue to <input>.value -->
<input value="{{hostValue::input}}">

<!-- Listens for `change` event and sets hostChecked to <input>.checked -->
<input type="checkbox" checked="{{hostChecked::change}}">

<!-- Listens for `timeupdate ` event and sets hostTime to <video>.currentTime -->
<video url="..." current-time="{{hostTime::timeupdate}}">
```

Polymer Element上で標準の通知プロパティにバインドする場合、イベント名の指定は必須ではありません。デフォルトの命名規則のように、`property-changed`イベントをリッスンするようになっています。以下の構文は同じことです。：

```
<!-- Listens for `value-changed` event -->
<my-element value="{{hostValue::value-changed}}">

<!-- Listens for `value-changed` event using Polymer convention by default -->
<my-element value="{{hostValue}}">
```


## 移動したセクション

次のセクションは、[データシステムのコンセプト](data-system)に移行しました。

<a id="#change-notification-protocol"></a>

-   変更通知のプロトコル：[変更通知イベント](#change-events)を参照してください。

<a id="#property-notification"></a>

-   プロパティの変更通知と双方向バインディング：[データフローの制御方法](data-system#data-flow-controld)を参照してください。

-   構造化されたデータへのバインディング：[監視可能(obsevable)な変更](data-system#paths)を参照してください。

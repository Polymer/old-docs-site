---
layout: default
type: core
navgroup: docs
shortname: Docs
title: 绑定的类型
subtitle: 数据绑定
---

{% include toc.html %}

绑定数据到一个 template 有多种方法。你可以：

*   通过使用 `bind` 特性指定一个单一对象，然后创建一个 template 的单一实例。
*   通过使用 `repeat` 特性指定一个对象数组，然后创建多个 template 实例。
*   依赖传递给 `if` 特性的值是否为真，条件性的创建一个 template 实例。

**注意：**绑定 templates 只工作在 {{site.project_title}} elements 中。比如，如果一个 `<template>` element 直接插入到了一个页面的 `<body>` 标签，`bind` 特性是不工作的。如果你需要在一个 {{site.project_title}} element 之外的地方使用 template 绑定，请移步至[在一个 {{site.project_title}} element 之外的地方使用数据绑定](/docs/polymer/databinding-advanced.html#bindingoutside)。
{: .alert .alert-info }

当你在一个 template _内部_用了绑定，你就创建了一个_结点绑定_，其讲一个数据模型的值和一个 DOM 结点绑定起来。结点绑定是基于 element 类型和其绑定发生的时机，由结点解释的。详见[结点绑定](#node-bindings)。

## 单一 template 实例

你可以用 `bind` 特性创建绑定到一个对象的 template 的单一实例。

{% raw %}
    <template bind="{{person}}">
      该 template 可以绑定你的 person 对象的属性，比如 {{name}}。
    </template>
{% endraw %}

其中 `person` 是一个对象 (或者更准确的说是产生了一个对象的 [{{site.project_title}} 表达式](/docs/polymer/expressions.html))。

在 template 内部的绑定是作用在绑定对象的上下文中的。举个例子，如果 `person` 有一个属性 `name`，则 {%raw%}`{{name}}`{%endraw%} 被视为 `person.name` 的值。

For convenience, you can also create a _named scope_ when binding an object:
方便起见，你也可以在绑定一个对象时创建一个_被命名的作用域_：

{% raw %}
    <template bind="{{person as p}}">
      该 template 通过被命名的作用域来访问属性，比如 {{p.name}}。
    </template>
{% endraw %}

在这种情况下，你可以使用被命名的作用域 `p` 来访问 `person` 对象的属性。被命名的作用域易于在有嵌套 templates 的时候使用。



## 迭代的 templates

迭代的或重复的 templates 会为每个数组里的项目生成一个 template 的单一实例。每个实例都绑定了数组中的一个项目。

最简单格式的重复的 template 即：

{% raw %}
    <template repeat="{{array}}">
      创建了用 {{}} 绑定数组中 element 的实例。
    </template>
{% endraw %}

引用 `array` 的当前项目，要使用一个空的绑定表达式 {%raw%}`{{}}`{%endraw%}，它匹配当前的绑定作用域。引用一个当前项目的属性，则要使用 {%raw%}`{{<var>propertyname</var>}}`{%endraw%}。

和 `bind` 特性一样，`repeat` 特性支持被命名的作用域：

{% raw %}
    <template repeat="{{user in users}}">
      {{user.name}}
    </template>
{% endraw %}

在 `repeat` 特性中使用被命名的作用域时，数组中每个项目的 index 值也可以下面的语法使用：

{% raw %}
    <template repeat="{{user, userIndex in users}}">
      <template repeat="{{userFile, userFileIndex in user}}">
        {{userIndex}}:{{userFileIndex}}.{{userFile}}
      </template>
    </template>
{% endraw %}

和 `bind` 特性一样，你可以从 `repeat` element 继承父作用域的值。举个例子，设想你有一个这样的对象数组：

    this.items = [
      {name: "Milk"},
      {name: "Bread"},
      {name: "Cereal"}
    ];

你可以用这样的代码同时访问数组本身及其 elements：

{% raw %}
    <template bind="{{items}}">
      // {{length}} 被视为 items.length
      <p>项目数量为：{{length}}</p>
      <ul>
      <template repeat>
        // 这里的 {{name}} 被视为单个项目的 name
        <li>{{name}}</li>
      </template>
      </ul>
    </template>
{% endraw %}

输出结果是：

项目数量为：3

*   Milk
*   Bread
*   Cereal


## 条件性 templates

条件性 templates 会使用 `if` 特性条件性的创建一个 template 实例。

{% raw %}
    <template if="{{conditionalValue}}">
      当且仅当 conditionalValue 为真时才绑定。
    </template>
{% endraw %}

条件性 template 可以显性的绑定到一个使用了 {%raw%}`bind={{expression}}`{%endraw%} 语法的对象。

当显性绑定发生时，嵌套的 template 可以继承包含它的 template 的作用域。条件性 templates 常常这样使用：

{% raw %}
    <template bind="{{myOptions as m}}">
      <template if="{{m.showCounter}}">
        <div>计数：{{m.counter}}</div>
      </template>
    </template>
{% endraw %}

更多嵌套 templates 的信息请移步至[表达式作用域](/docs/polymer/expressions.html#expression-scopes)。

你可以同时使用 `if` 和 `repeat` 特性。

{% raw %}
    <template bind="{{myList as list}}">
      <template repeat="{{items in list.items}}" if="{{list.showItems}}">
        <li>{{item.name}}</li>
      </template>
    </template>
{% endraw %}

## 通过引用导入 templates

有的时候，你可以把一个 template 重用在多个地方，或引用一个别处生成的 template。这就是 `ref` 特性的用武之地：

{% raw %}
    <template id="myTemplate">
      用于任何通过 `ref` 特性引用这里的 template
    </template>

    <template bind ref="myTemplate">
      当创建一个实例的时候，这个 template 的内容将会被忽略，取而代之的是 #myTemplate 的内容。
    </template>
{% endraw %}

你可以使用 `ref` 特性定义迭代的 templates，比如树结构：

{% raw %}
    <template>
      <ul>
      <template repeat="{{items}}" id="t">
        <li>{{name}}
        <ul>
          <template ref="t" repeat="{{children}}"></template>
        </ul>
      </li>
    </template>
{% endraw %}

另外，你可以把自己绑定到 `ref` 特性来动态选择 templates：

{% raw %}
    <template bind ref="{{node.nodeType}}"></template>
{% endraw %}

## 结点绑定

结点绑定为了每个 template 的内容中的绑定而被创建。一个结点绑定创建一个数据模型的值和一个 DOM 结点之间的被命名的关系。

结点如何翻译绑定信息依赖于 _element 类型_和_绑定名称_。在 {{site.project_title}} 中，绑定名称基于绑定在标记中出现的地方：

* 一个在 element 的文本内容中的绑定，比如 {%raw%}`<span>{{someText}}</span>`{%endraw%}，命名为 `textContent`。
* 一个在 element 的特性值上的绑定，比如 {%raw%}`<span style="{{someStyles}}">`{%endraw%} 将特性的名字用于绑定的名字。


### 绑定到文本

如果绑定发生在标记之间，它会对该 element 创建一个 `textContent` 绑定。

{% raw %}
    <p>这段话里有一些 {{adjective}} 文本。</p>
{% endraw %}

所有的文本节点被视为一个单向 `textContent` 绑定：改变数据模型会改变被绑定的结点，但是强制改变 DOM 的值_不会_更新数据模型。

### 绑定到特性

当你绑定到一个特性时，绑定使用了特性的名字。举个例子，下面的绑定使用了 `style` 这个名字。

{% raw %}
    <span style="color: {{myColor}}">五彩的文本！</span>
{% endraw %}

这些绑定的工作方式依赖于被绑定的 element：

- 对于_大多数_标准的 DOM elements，这些绑定会构成单向的特性绑定。举个例子，改变 `myColor` 属性会更新 element 的文字颜色，但是强制改变 `style` 特性_并不会_更新 `myColor` 属性。

- 表单的输入类 elements `input`、`option`、`select` 和 `textarea` 对特定的特性支持双向绑定。

- {{site.project_title}} elements 对公开的属性支持双向绑定。如果你使用 `attributes` 特性或一段 `publish` 代码块公开了一个属性，那正是双向的数据绑定。

- Custom elements 也完全支持其它这些绑定方式。举个例子，一个 non-{{site.project_title}} element 可以使用底层的 [Node.bind](node_bind.html) 库来重载被命名的绑定的默认处理。

### 绑定到 input values

在一些用户输入的 elements 里，我们提供了特殊的双向绑定。我们特别为下面的特性支持了双向绑定：

- `input` element: `value` and `checked` attributes.
- `option` element: `value` attribute.
- `select` element: `selectedIndex` and `value` attributes.
- `textarea` element: `value` attribute.

### 绑定到 {{site.project_title}} 公开的属性

当你在一个 {{site.project_title}} element 上绑定一个[公开的属性](polymer.html#published-properties)时，你就获得了这个属性的双向的绑定。

下面的例子中，`intro-tag` element 绑定了一个 `say-hello` 的公开的属性：

{% raw %}
    <!-- say-hello element 公开了 'name' 属性 -->
    <polymer-element name="say-hello" attributes="name">
      <template>
        你好，<b>{{name}}</b>！
      </template>
      <script>
        Polymer('say-hello', {
          ready: function() {
            this.name = '陌生人'
          }
        });
        </script>
    </polymer-element>
    <polymer-element name="intro-tag" noscript>
      <template>
        <!-- 绑定 yourName 到公开的属性 name -->
        <p><say-hello name="{{yourName}}"></say-hello></p>
        <!-- 绑定 yourName 到 value 特性 -->
        <p>你叫什么名字？<input value="{{yourName}}" placeholder="请输入名字..."></p>
      </template>
    </polymer-element>

    <intro-tag></intro-tag>
{% endraw %}

这里的 `yourName` _同时_绑定了 `say-hello` element 的 `name` 属性和 `input` element 的 `value` 特性。两者_都是_双向的，所以当用户输入一个名字时，它就会被推送到 `say-hello` element 的 `name` 属性。如果你改变了 `name` 属性值，它也会被推送到 `input` element。

**注意：**`intro-tag` element 并没有定义 `yourName` 属性。在这里数据绑定系统会自动创建这个属性。
{: .alert .alert-info }


#### 绑定对象数组到公开的属性

大多数例子都在展示单一字符串的数据绑定，但是 {{site.project_title}} 可以让你使用公开的属性绑定不同 elements 间的引用。

让我们改一下 `name-tag` 的例子，把单独的属性换做一个对象吧。

    <polymer-element name="name-tag" attributes="person">
      <template>
        你好，我的名字是 <span style="color:{%raw%}{{person.nameColor}}{%endraw%}">
        {%raw%}{{person.name}}{%endraw%}</span>
      </template>
      <script>
        Polymer('name-tag', {
          created: function() {
            this.person = {
              name: "Scott",
              nameColor: "orange"
            }
          }
        });
      </script>
    </polymer-element>

现在想象一下我们做了一个新的 component 叫做 `<visitor-creds>`，它用到了 `name-tag`：

    <polymer-element name="visitor-creds">
      <template>
        <name-tag person="{%raw%}{{person}}{%endraw%}"></name-tag>
      </template>
      <script>
        Polymer('visitor-creds', {
          created: function() {
            this.person = {
              name: "Scott2",
              nameColor: "red"
            }
          }
        });
      </script>
    </polymer-element>

当一个 `<visitor-creds>` 实例被创建时，其 `person` 属性 (一个对象) 也被绑定到了 `<name-tag>` 的 `person` 属性上。两个 components 都是用了相同的 `person` 对象。



### 条件性的特性

对于布尔类的特性，你可以使用特殊的条件性特性语法控制其是否出现：

{% raw %}
<pre class="prettyprint">
<var>attribute</var>?={{<var>布尔表达式</var>}}
</pre>
{%endraw%}

如果_布尔表达式_为真，_attribute_就出现在标记中；否则不出现。比如：

{% raw %}
    <span hidden?="{{isHidden}}">显示或隐藏</span>
{% endraw %}

### 一次性绑定

{% include experimental.html %}

也许你不需要动态绑定。这时我们有一次性绑定。

你在任何地方使用带有 {% raw %}`{{}}`{% endraw %} 的表达式时，都可以用双方括号 (`[[]]`) 来设置一个一次性绑定。该绑定会在 {{site.project_title}} 第一次设置其值之后停止绑定。

比如：

    <input type="text" value="这个值是一次性设置好的：[[ obj.value ]]">

如果你不需要设置属性监视器造成的开销时，一次性绑定可以潜在的提升性能。

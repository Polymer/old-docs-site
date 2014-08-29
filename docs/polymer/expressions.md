---
layout: default
type: core
navgroup: docs
shortname: Docs
title: 表达式
subtitle: 数据绑定
---

{% include toc.html %}


在一个 `<polymer-element>` 里面你可以使用 {{site.project_title}} 的[表达式库](https://github.com/polymer/polymer-expressions)在任何使用 {%raw%}`{{`&nbsp;`}}`{%endraw%} 绑定的地方写内联表达式、被命名的作用域和迭代的标记。

表达式也可以用于定义[计算出来的属性](/docs/polymer/polymer.html#computed-properties)。

## 表达式语法

{{site.project_title}} 在 {%raw%}`{{}}`{%endraw%} 里支持表达式，该表达式严格属于一个 JavaScript 的子集。为了使用这一特征，理解其行为和局限性就很重要：

- 内联表达式的目的是允许简单值的概念和关系的表达式。总体上这样在 HTML (视图) 中处理复杂的逻辑是一种不好的实践方式。
- 表达式用不会作为页面脚本运行 (比如 `eval`)。它们无法获取任何全局状态 (比如 `window`)。它们被解析和转换为一个简单的解释形式，以展示表达式中包含的路径的值。
- 你无法使用表达式插入 HTML。为了避免 XSS 问题，表达式的输出在作为数据绑定的值插入之前是转码过的。

表达式支持下面的 JavaScript 子集：

| 特征 | 例子 | 解释
|---------|
|标识符 & 路径 | `foo`, `match.set.game` | 这些值相对于当前作用域被对待、取出和变化监视。如果表达式中的一个值改变了，表达式会被重新评估。而一个属性的值改变了，则并不导致表达式被重新评估。比如改变 `foo.bar` 的值不会导致表达式 `foo` 被重新评估。
| 数组访问 | `foo[bar]` | 这里的 `foo` 和 `bar` 是标识符或路径。如果 `foo` 或 `bar` 改变了，或者 `foo[bar]` 的值变化了，表达式会重新评估。
| 逻辑非操作符 | `!` |
| 一元操作符 | `+foo`, `-bar` | 转换成 `Number`。或在转换成 `Number`之后取负值。
| 二元操作符 | `foo + bar`, `foo - bar`, `foo * bar` | 支持：`+`, `-`, `*`, `/`, `%`
| Comparators | `foo < bar`, `foo != bar`, `foo == bar` | 支持：`<`, `>`, `<=`, `>=`, `==`, `!=`, `===`, `!==`
| 裸机操作符 | `foo && bar || baz` | 支持：`||`, `&&`
| 三元操作符 | `a ? b : c` |
| 归组 (小括号) | `(a + b) * (c + d)` |
| 字面量值 | numbers, strings, `null`, `undefined` | 转换不支持的字符串和非十进制的数字 |
| 数组或对象的初始化 | `[foo, 1]`, `{id: 1, foo: bar}` |
| 函数 | `reverse(my_list)` | 表达式的值是该函数返回的值。函数的参数变化会被监听，表达式会在一个或多个参数改变时被重新评估。
{: .first-col-nowrap .responsive-table .expressions-table }


另外对于 JavaScript 的一部分，一个表达式也可以包含一个或多个_过滤器_，该过滤器修改了 JavaScript 的表达式的输出。详见[过滤器表达式](#filters)

## 评估表达式

表达式会在它们的一个绑定或计算出来的属性的声明中被解析：

<pre class="nocode">
{%raw%}<b>{{</b> <var>expression</var> <b>}}</b>{%endraw%}
</pre>

<pre class="nocode">
<b>[[</b> <var>expression</var> <b>]]</b>
</pre>

<pre class="nocode">
<b>computed: {</b>
  <var>property_name</var><b>: '</b><var>expression</var><b>'
}</b>
</pre>

表达式的值是评估出来的。在一个绑定中，被插入的结果就是绑定的值：

{% raw %}
    <div>Jill has {{daughter.children.length + son.children.length}} grandchildren</div>
{% endraw %}

会得出：

    <div>Jill has 100 grandchildren</div>

对标准的 (double-mustache) 绑定和计算出来的属性来说，表达式会在其一个或多个路径的值发生改变之后被重新评估。

## 表达式作用域 {#expression-scopes}

表达式会被基于当前的_作用域_进行评估，其定义了哪些标识符和路径是可见的。在 `bind`、`repeat` 或 `if` 特性中的表达式会在父 template 的作用域里被评估。对于一个 element 的最外层 template 来说，路径和标识符是相对于 element 本身的 (所以 `this.prop` 会被评估为 {%raw%}`prop`{%endraw%})。

对于计算出来的属性，表达式的作用域始终是 element 本身。

不包含 `bind` 或 `repeat` 的 template 共享当前的作用域。

一个没有表达式的 `bind` 或 `repeat` 和使用表达式一样指定了当前的作用域。

### 嵌套的作用域的规则 {#nested-scoping-rules}

如果一个 `<template>` 使用了一个包含子 `<template>` 的被命名的作用域，则所有的祖先作用域都是可见的，直到并包含第一个**没有**被命名的作用域的祖先。比如：
       
{% raw %}
    <template>
      <!-- 最外层 template -- element 的属性是可用的 -->
      <template bind="{{organization as organization}}">
        <!-- organization.* 是可用的 -->
        <template bind="{{organization.contact as contact}}">
          <!-- organization.* 和 contact.* 是可用的 -->
          <template bind="{{contact.address}}">
            <!-- 只有 address 的属性是可用的 -->
            <template bind="{{streetAddress as streetAddress}}">
              <!-- streetAddress.* 和 address 的属性是可用的
                   而 organization.* 或 contact.* 不可用 -->
            </template>
          </template>
        </template>
      </template>
    </template>
{% endraw %}

换句话说：

- 如果一个 template 使用了被命名的作用域，则其父作用域可见。
- 如果一个 template 使用了未被命名的作用域，择期父作用域_不_可见。

## 过滤表达式 {#filters}

过滤器可以用来修改表达式的输出。{{site.project_title}} 支持多个默认的数据过滤器。它们用于过滤输入的表达式：

<pre class="prettyprint">
{% raw %}{{ <var>expression</var> | <var>filterName</var> }}{% endraw %}
</pre>

{{site.project_title}} 提供了两种预定义的过滤器，`tokenList` 和 `styleObject`。你也可以自行创建[自定义过滤器](#custom-filters)。

如果你的过滤器依赖于你的表达式中一个路径或标识符的属性，请注意表达式并不会在属性变化的时候被重新评估。比如你有一个这样的表达式：

    {% raw %}{{user | formatUserName}}{% endraw %}

该表达式不会在诸如 `user.firstName` 属性改变时被重新评估。如果你需要过滤器在属性变化时被重新评估，你可以将其显性包含在表达式中，比如这样：

    {% raw %}{{ {firstName: user.firstName, lastName: user.lastName} | formatUserName}}{% endraw %}

因为 `user.firstName` 和 `user.lastName` 被显性包含在了表达式中，这两个属性都会被监视。

### tokenList

过滤器 `tokenList` 可以用于绑定到 `class` 特性。其允许你基于传入的对象动态设置/移除 class 名称。如果对象中某一个键的值为真，其名称就会被应用为一个 class。

例如：

{% raw %}
    <div class="{{ {active: user.selected, big: user.type == 'super'} | tokenList}}"> 
{% endraw %}

如果 `user.selected == true` 且 `user.type == 'super'`，那么结果为：

    <div class="active big"> 

### styleObject

过滤器 `styleObject` 会把一个包含 CSS 样式的 JSON 对象转换为一个适合被设为 `style` 特性的 CSS 字符串。

对于简单的属性值来说 {{site.project_title}} 允许你直接绑定到 `style` 特性：

{% raw %}
    <div style="color: {{color}}">{{color}}</div>
{% endraw %}

如果 element 的 `color` 属性是“red”，那么结果如下：

    <div style="color: red">red</div>

总之，如果你有一个对象包含一套样式如 name:value 组合，可以使用 `styleObject` 过滤器将其转换为适当的格式。

{% raw %}
    <div style="{{styles | styleObject}}">...</div>
{% endraw %}

在这个例子中 `styles` 是一个形如 `{color: 'red', background: 'blue'}` 的对象，且 `styleObject` 过滤器的输出结果是一个 CSS 声明的字符串 (例如 `"color: 'red'; background: 'blue'"`)。

### 撰写自定义的过滤器 {#custom-filters}

一个过滤器就是一个简单的函数，其可以转换输入的值。你可以通过为你的 element 原型添加一个方法来创建一个_自定义过滤器_。例如，为你的 element 添加一个叫做 `toUpperCase` 的过滤器：

    Polymer('greeting-tag', {
      ...
      toUpperCase: function(value) {
        return value.toUpperCase();
      },

并这样使用：

{% raw %}
    {{s.who | toUpperCase}}
{% endraw %}

当它们被插入到 DOM 中时该过滤器会修改其值，所以 `s.who` 如果是 `world` 那么它会被显示为 `WORLD`。你也可以定义一个自定义过滤器在一个 DOM 值转换回其数据模型时进行操作 (例如当绑定一个 input element 值时)。这时可用包含 `toDOM` 和 `toModel` 函数的对象创建过滤器。例如，你可以把 `toUpperCase` 修改为下面的代码来确保数据模型中的文本是小写的：

    toUpperCase: {
      toDOM: function(value) {
        return value.toUpperCase();
      },
      toModel: function(value) {
        return value.toLowerCase();
      }
    }

**注意：**如果用户在一个绑定过的输入字段里输入文本，其 `toModel` 过滤器会在值存入数据模型之前被调用。而 `toDOM` 过滤器只在数据模型真正发生改变的情况下被调用。所以用户的文本输入不会被过滤 (即它不会被大写化)。为了校验或转换一个用户输入的值，你可以使用 `on-input` 或 `on-blur` 事件句柄。
{: .alert .alert-info }

#### 过滤器参数

你可以把参数传递给过滤器，例如：

{% raw %}
    {{myNumber | toFixed(2)}}
{% endraw %}

过滤器 `toFixed` 的代码如下：

    toFixed: function(value, precision) {
      return Number(value).toFixed(precision);
    }

参数被传入了过滤器并监视变化。

#### 过滤器链

你也可以把多个过滤器链起来，前一个过滤器的输出就是下一个过滤器的输入：

{% raw %}
    {{myNumber | toHex | toUpperCase}}
{% endraw %}


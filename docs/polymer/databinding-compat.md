---
layout: default
type: core
navgroup: docs
shortname: Docs
title: 兼容性备忘
subtitle: 数据绑定
---

{% include toc.html %}


一些原生 template 的特征无法通过 polyfill 库被完美的复制，需要做一些变通，这包括：

一些浏览器在诸如 `<select>` 或 `<table>` elements 里不允许出现 `<template>` elements。在一些不支持 template 的浏览器里绑定某些特性 (诸如 `<img>` 的 `src` 特性) 不会正常工作等。

## 无法包含 template 的 elements

在 HTML 加入 `<template>` 之前，`<select>` 和 `<table>` elements 都有特殊的解析规则来限制它们能够包含的子元素的类型。因为这些条款，不支持 `<template>` 的浏览器会把包括 `<template>` 在内的不符合预期的 elements 都互为兄弟移到外面。

例如，下面的代码在不支持 `<template>` 的浏览器中无法正常工作：

    <!-- 在不支持 `<template>` 的浏览器中无法正常工作。 -->
    <table>
      {%raw%}<template repeat="{{tr in rows}}">{%endraw%}
        <tr><td>...</td></tr>
      </template>
    </table>

`<template repeat>` 会被渲染为外面的一个兄弟：

    <!-- 不支持的浏览器会把子元素 <template> 变成兄弟。 -->
    {%raw%}<template repeat="{{tr in rows}}">{%endraw%}
      <tr><td>...</td></tr>
    </template>
    <table>
      ...
    </table>

**对于不支持 `<template>` 的浏览器来说**，{{site.project_title}} 可以直接使用 `template` 特性来重复诸如 `<option>` 和 `<tr>` 标签。

    <table>
      {%raw%}<tr template repeat="{{tr in rows}}">{%endraw%}
        <td>Hello</td>
      </tr>
    </table>

另一个用到 `<select>`/`<option>` 的例子：

    <polymer-element name="my-select">
      <template>
        <select>
          {%raw%}<option template repeat="{{options}}">{{}}</option>{%endraw%}
        </select>
      </template>
      <script>
        Polymer('my-select', {
          ready: function() { this.options = []; }
        });
      </script>
    </polymer-element>
    <script>
      var select = document.createElement('my-select');
      select.options = ['One', 'Two', 'Three'];
    </script>

如果你的用户使用不支持 `<template>` 的浏览器，请在这些特殊的 elements 上使用 `template` 特性：

* `caption`
* `col`
* `colgroup`
* `optgroup`
* `option`
* `tbody`
* `td`
* `tfoot`
* `th`
* `tr`
* `thead`

**注意：**原生支持 `<template>` 的浏览器允许其作为 `<select>` 和 `<table>` 的子 elements。如果你确定你的用户都在使用这样的浏览器，你可以使用标准的 template。
{: .alert .alert-info }


    <table>
      {%raw%}<template repeat="{{tr in rows}}">{%endraw%}
        <tr>
          <td>Hello</td>
        </tr>
      </template>
    </table>

## 绑定到特性

绑定表达式到某些特性可能在不原生支持 `<template>` 的浏览器中产生副作用。例如，在 polyfill 下运行 {% raw %}`<img src="/users/{{id}}.jpg">`{% endraw %} 会产生一个 404 的网络请求。

另外，IE 等浏览器会保护某些特性不允许在其中做 {% raw %}`{{}}`{% endraw %} 这样的文本替换。

为了避免这些副作用，绑定这些特性时可以加“_”前缀：

{% raw %}
    <img _src="/users/{{id}}.jpg">
    <div _style="color: {{color}}">
    <a _href="{{url}}">Link</a>
    <input type="number" _value="{{number}}">
{% endraw %}



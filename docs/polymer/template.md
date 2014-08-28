---
layout: default
type: core
navgroup: docs
shortname: Docs
title: Template 绑定
subtitle: 库

feature:
  summary: Polymer 的 [TemplateBinding](https://github.com/polymer/TemplateBinding) 库通过使其能够创建、管理和移除绑定了 JavaScript 数据的内容的实例，扩展了 [HTML Template Element](http://www.w3.org/TR/html-templates/) 的能力。虽然是 Polymer 内部的东西，但是也可以独立使用。
links:
- "HTML5Rocks - HTML's New Template Tag": http://www.html5rocks.com/tutorials/webcomponents/template/
---

{% include spec-header.html %}

## 学习这项技术

Template 绑定通过新的数据绑定特性扩展了 `<template>` element：

1. `bind`
1. `repeat`
1. `if`
1. `ref`

### 基本用法

#### bind

{% raw %}
    <template bind="{{ singleton }}">
      Creates a single instance with {{ bindings }} when singleton model data is provided.
    </template>
{% endraw %}

#### repeat

{% raw %}
    <template repeat="{{ collection }}">
      Creates an instance with {{ bindings }} for every element in the array collection.
    </template>
{% endraw %}

被命名的作用域：

{% raw %}
    <template repeat="{{ user in users }}">
      {{user.name}}
    </template>
{% endraw %}

使用索引：

{% raw %}
    <template repeat="{{ foo, i in foos }}">
      <template repeat="{{ value, j in foo }}">
        {{ i }}:{{ j }}. {{ value }}
      </template>
    </template>
{% endraw %}

#### if

{% raw %}
    <template bind if="{{ conditionalValue }}">
      Binds if and only if conditionalValue is truthy.
    </template>

    <template if="{{ conditionalValue }}">
      Binds if and only if conditionalValue is truthy. (same as *bind if*)
    </template>

    <template repeat if="{{ conditionalValue }}">
      Repeat if and only if conditionalValue is truthy.
    </template>
{% endraw %}

#### ref

{% raw %}
    <template id="myTemplate">
      Used by any template which refers to this one by the ref attribute
    </template>

    <template bind ref="myTemplate">
      When creating an instance, the content of this template will be ignored,
      and the content of #myTemplate is used instead.
    </template>
{% endraw %}

### 激活一个 template

在 template 上设置数据模型就可以激活 `bind`、`repeat` 或 `if` 特性的指令：

    document.querySelector('template').model = {...};

### Unbinding a model {#nodeunbind}

`Node.unbind(<property>)` 可以用于解绑定一个属性。例如，调用 `template.unbind('bind')` 来解绑一套使用了 `bind` 特性的数据：

{% raw %}
    <button onclick="removeGo()">test</button>
    <template id="greeting" bind="{{ salutations }}">
      Hello, {{who}} - {{what}}
    </template>

    <script>
      var t = document.querySelector('#greeting');
      var model = {
        salutations: { what: 'GoodBye', who: 'Imperative' }
      };
      t.model = model;
        
      function removeGo() {
        t.unbind('bind');
      }
    </script>
{% endraw %}

### 例子

参见 [HowTo examples](https://github.com/Polymer/TemplateBinding/tree/master/examples/how_to)。

{% include other-resources.html %}
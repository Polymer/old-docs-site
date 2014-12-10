---
layout: default
type: guide
shortname: Docs
title: Template Binding
subtitle: Library

feature:
  summary: Polymer's [TemplateBinding](https://github.com/polymer/TemplateBinding) library extends the capabilities of the [HTML Template Element](http://www.w3.org/TR/html5/scripting-1.html#the-template-element) by enabling it to create, manage, and remove instances of content bound to data defined in JavaScript. Although internal in Polymer, it is also useful standalone.
links:
- "HTML5Rocks - HTML's New Template Tag": http://www.html5rocks.com/tutorials/webcomponents/template/
---

{% include spec-header.html %}

## Learn the tech

Template Binding extends the `<template>` element with new attributes for binding data:

1. `bind`
1. `repeat`
1. `if`
1. `ref`

### Basic usage

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

Named scopes:

{% raw %}
    <template repeat="{{ user in users }}">
      {{user.name}}
    </template>
{% endraw %}

Indexing:

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

### Activating a template

Setting data model on the template causes any `bind`, `repeat` or `if` attribute
directive to begin acting:

    document.querySelector('template').model = {...};

### Unbinding a model {#nodeunbind}

`Node.unbind(<property>)` can be used to unbind a property. For example, to unbind
a model set using the `bind` attribute, call `template.unbind('bind')`:

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

### Examples

Please refer to the [HowTo examples](https://github.com/Polymer/TemplateBinding/tree/master/examples/how_to).

{% include other-resources.html %}

---
layout: default
title: Template Binding
subtitle: <a href="http://prollyfill.org/">prollyfill</a>

load_polymer: true
imports:
- /elements/buildbot-list.html

feature:
  spec: None
  status: <buildbot-list project="TemplateBinding"></buildbot-list>
  code: https://github.com/polymer/TemplateBinding
  summary: Extends the capabilities of the [HTML Template Element](http://www.w3.org/TR/html-templates/) by enabling it to create, manage, and remove instances of content bound to data defined in JavaScript.
links:
- "HTML5Rocks - HTML's New Template Tag": http://www.html5rocks.com/tutorials/webcomponents/template/
---

{% include spec-header.html %}

<!-- {% include toc.html %} -->

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
      Will create maintain exactly instance with {{ bindings }} for every
      element in the array collection, when it is provided.
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

#### Activating a template

Setting data model on the template causes any `bind`, `repeat` or `if` attribute
directive to begin acting:

    document.querySelector('template').model = {...};

### Examples

Please refer to the [HowTo examples](https://github.com/Polymer/TemplateBinding/tree/master/examples/how_to).

---

## Binding Delegate API

**Note:** If you're interested in implementing a binding delegate, {{site.project_title}} provides `PolymerExpressions` as an example implementation. [Read more](/docs/polymer/expressions.html) about it.
{: .alert .alert-info }

Template Bindings by themselves offer a wide-range of use cases, but (by design) don't attempt to implement many specialized behaviors that some MV* frameworks support. For example:

* Inline-expressions within mustaches

{% raw %}
      <span>{{ foo + bar ? foo : bar }}</span>
{% endraw %}

* "Named scopes" for iterators

{% raw %}
      <template repeat="{{ user in users }}">
        {{ user.name }}
      </template>
{% endraw %}

* Anything else you'd like!

Enabling these features on `<template>` is a matter of implementing and registering
a **binding delegate**.

### Basic usage

    templateElement.bindingDelegate = {
      getBinding: function(model, path, name, node) {
        // If this function is defined, the syntax can override
        // the default binding behavior
      },
      getInstanceModel: function(template, model) {
        // If this function is defined, the syntax can override
        // what model is used for each template instance which is
        // produced.
      }
    }

### Methods

The Binding Delegate API extends `<template>` with several methods for data-binding.

#### getBinding()

The `getBinding()` method allows for a custom interpretation of the contents
of mustaches ({% raw %}`{{...}}`{% endraw %}).

When a template is inserting an instance, it invokes `getBinding()` (if it's implemented by the syntax) for each mustache which is encountered. The function is invoked with four arguments:

    syntax.getBinding = function(model, path, name, node);

* `model`: The data context for which this instance is being created.
* `path`: The text contents (trimmed of outer whitespace) of the mustache.
* `name`: The context in which the mustache occurs. Within element attributes, this will be the name of the attribute. Within text, this will be 'textContent'.
* `node`: A reference to the node to which this binding will be created.

If the `getBinding()` wishes to handle binding, it is required to return an object
which has at least a `value` property. If it does, the binding delegate calls:

    node.bind(name, retval, 'value');

...on the node.

If `getBinding()` wishes to decline to override, it should not return a value.

#### getInstanceModel()

The `getInstanceModel` method allows a syntax to provide an alterate model than the one the template would otherwise use when producing an instance.

When a template is about to create an instance, it will invoke the `getInstanceModel` method (if it is implemented by the syntax). The function is invoked with two arguments:

    syntax.getBinding = function(template, model);

* `template`: The template element which is about to create and insert an instance.
* `model`: The data context for which this instance is being created.

The template element will always use the return value of `getInstanceModel` as the model for the new instance. If the syntax does not wish to override the value, it should simply return the `model` value it was passed.

#### getInstanceFragment()

**Unimplemented**

Used to override the DOM of the instance fragment which is a produced for a new instance.

### CompoundBinding

The Binding Delegate API contains a helper object `CompoundBinding` which is useful for implementing
a binding delegate.

    var binding = new CompoundBinding(function(values) {
      // compute combinedValue based on the current values which are provided
      var combinedValue = ...;
      
      return combinedValue;
    });

    binding.bind('name1', obj1, path1);
    binding.bind('name2', obj2, path2);
    //...
    binding.bind('nameN', objN, pathN);

`CompoundBinding` is an object which knows how to listen to multiple path values (registered via `bind()`) and invoke its combinator function callback when one or more of the values have changed.
It sets its `value` property to the return value of the function. When any value
changes, *all* values are passed to the callback as single argument, `values`.

### Using a binding delegate

If you've created your own binding delegate, you can register it with the
`<template>` element by include it and calling `.bindingDelegate()`:

    <script src="polymer-all/polymer-expressions/src/polymer-expressions.js"></script>
    <script>
      templateElement.bindingDelegate = new PolymerExpressions();
    </script>

**Note:** Sub-templates will inherit its use.

Once registered, you can use the syntax in your templates:

{% raw %}
    <template bind>
      <template repeat="{{ user in users }}">
        {{ user.name }} <template if="{{ user.age >= 21 }}"> Can have a drink!</template>
      </template>
    </template>
{% endraw %}



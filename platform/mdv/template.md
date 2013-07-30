---
layout: default
title: Template Instantiation
subtitle: MDV
---

{% comment %}
{% include_external polymer-all/mdv/docs/template.md %}
{% endcomment %}


MDV extends the capabilities of the [HTML Template Element](http://www.w3.org/TR/html-templates/). It enables `<template>` to create, manage and remove instances of its content by being bound to JavaScript data.

## Basic usage

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

JavaScript: 

    // Causes any bind, repeat or if attribute directives on #myTemplate to begin acting.
    document.getElementById('myTemplate').model = jsData;


### API

Note yet written. Please refer to the [HowTo examples](https://github.com/Polymer/mdv/tree/master/examples/how_to).

### Specification

Note yet written. Please refer to the [HowTo examples](https://github.com/Polymer/mdv/tree/master/examples/how_to).


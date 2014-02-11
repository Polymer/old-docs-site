---
layout: default
type: core
shortname: Docs
title: Filters
---

{{site.project_title}} supports several default filters for working with data. They're used in {% raw %}`{{}}`{% endraw %} [expressions](/docs/polymer/filters.html) by piping an object (containing key/value pairs) to the filter:

{% raw %}
    {{ {...} | filterName }}
{% endraw %}

The value of the mustache will include the space-separated keys from the object whose corresponding expressions are truthy.

## tokenList

The `tokenList` filter is useful for binding to the `class` attribute. It allows you
to dynamically set/remove class names based on the object passed to it. If the object
key is truthy, the name will be applied as a class. 

For example:

{% raw %}
    <div class="{{ {active: user.selected, big: user.type == 'super'} | tokenList }}"> 
{% endraw %}

results in the follow if `user.selected == true` and `user.type == 'super'`:

    <div class="active big"> 

## styleObject

For simple property values, {{site.project_title}} allows you to bind to the `style`
attribute directory:

{% raw %}
    <div style="{{color: color}}">{{color}}</div>
{% endraw %}

If the element's `color` property is "red", this results in the following:

    <div style="color: red">red</div>

However, for the non-literal case (the binded value is an object) use the `styleObject` filter:

{% raw %}
    <div style="{{styles | styleObject}}">...</div>

    <!-- The literal case also works, but is purely stylistic. -->
    <div style="{{ {background: color} | styleObject }}">{{color}}</div>
{% endraw %}

In this examples `styles` is an object of the form `{color: 'red', background: 'blue'}`.

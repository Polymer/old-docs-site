---
layout: default
type: guide
shortname: Docs
title: Compatibility notes
subtitle: Data-binding
---

{% include toc.html %}


A few features of native templates can't be replicated perfectly with the polyfill library, and require some workarounds. These include:

Some browsers don't allow  `<template>` elements inside certain elements like `<select>` or `<table>`.
Binding to certain attributes (such as the `<img>` tag's `src` attribute) doesn't work correctly on some browsers that don't support templates.

## Elements that can't contain a template

Until the addition of HTML `<template>`, the `<select>` and `<table>` elements had
special parser rules to limit the types of children they could contain. Because of these legacy rules, browsers that don't support `<template>` will lift unexpected elements out of context and make them siblings, including `<template>` itself!

For example, the following won't work correctly in browsers that don't support `<template>`:

    <!-- Won't work in browsers that don't support <template>. -->
    <table>
      {%raw%}<template repeat="{{tr in rows}}">{%endraw%}
        <tr><td>...</td></tr>
      </template>
    </table>

The `<template repeat>` is hoisted out and rendered as a sibling:

    <!-- Unsupported browsers make the child <template> a sibling. -->
    {%raw%}<template repeat="{{tr in rows}}">{%endraw%}
      <tr><td>...</td></tr>
    </template>
    <table>
      ...
    </table>

**For browsers that don't support `<template>`**, {{site.project_title}} can repeat tags like `<option>` and `<tr>` directly using the `template` attribute:

    <table>
      {%raw%}<tr template repeat="{{tr in rows}}">{%endraw%}
        <td>Hello</td>
      </tr>
    </table>

Another example using `<select>`/`<option>`:

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

If your users are using browsers that don't support `<template>`, use the `template`
attribute on these special elements:

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

**Note:** browsers with native support for `<template>` allow it to be a child
of elements `<select>` and `<table>`. If you know your users are using a browser
with support, you can use the standard template
{: .alert .alert-info }

    <table>
      {%raw%}<template repeat="{{tr in rows}}">{%endraw%}
        <tr>
          <td>Hello</td>
        </tr>
      </template>
    </table>

## Binding to attributes

Binding expressions to certain attributes can produce side effects in browsers that don't implement `<template>` natively.
For example, running {% raw %}`<img src="/users/{{id}}.jpg">`{% endraw %} under the polyfill produces a network request that 404s.

In addition, browsers such as IE sanitize certain attributes, disallowing {% raw %}`{{}}`{% endraw %} replacements in their text.

To avoid these side effects, bindings in certain attributes can be prefixed with "_":

{% raw %}
    <img _src="/users/{{id}}.jpg">
    <div _style="color: {{color}}">
    <a _href="{{url}}">Link</a>
    <input type="number" _value="{{number}}">
{% endraw %}

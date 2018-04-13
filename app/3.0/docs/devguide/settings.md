---
title: Global Polymer settings
---

<div>
{% include 'outdated.html' %}
</div>

Document-level global Polymer settings can be set
by creating a `Polymer` object on window before importing the Polymer
library:

```
<html>
  <head>
  <meta charset="utf-8">
  <script src="components/webcomponentsjs/webcomponents-loader.js"></script>
  <script>
    /* this script must run before Polymer is imported */
    window.Polymer = {
      rootPath: '/your/application/root'
    };
  </script>
  <!-- a component that relies on Polymer -->
  <link rel="import" href="elements/my-app.html">
  </head>
  <body>
  ...
```

Available settings:

<table>
<thead>
<tr>
  <td>
    Setting
  </td>
  <td>
    Description
  </td>
</tr>
</thead>
<tbody>
  <tr>
    <td>
      <code>rootPath</code>
    </td>
    <td>
      Sets a global <code>rootPath</code> property that can be used in templates to generate URLs that
      are relative to the application root.
    </td>
  </tr>
  <tr>
    <td>
      <code>sanitizeDOMValue</code>
    </td>
    <td>
      A global callback used to sanitize any value before inserting it into the DOM.
      The callback signature is:

```js
Polymer = {
  sanitizeDOMValue: function(value, name, type, node) { ... }
}
```

Where:

-   `value` is the value to sanitize.
-   `name` is the name of an attribute or property (for example, `href`).
-   `type` indicates where the value is being inserted: one of `property`, `attribute`, or `text`.
-   `node` is the node where the value is being inserted.
    </td>
  </tr>
</tbody>
</table>

There are also a number of polyfill-specific settings. See [Polyfills](../polyfills#settings) for
details.
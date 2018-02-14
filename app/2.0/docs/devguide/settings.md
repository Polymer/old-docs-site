---
title: Global Polymer settings
---

Document-level global Polymer settings can be set
by creating a `Polymer` object on window before importing the Polymer
library, or by calling a setter.


You should call the setters before defining your first Polymer element. For example, 
you could do this from an entrypoint file, or from your main application element import 
(assuming that you have an main application element that's always loaded first.)

Calling a setter from an entrypoint:

```html
<html>
  <head>
  <meta charset="utf-8">
  <script src="components/webcomponentsjs/webcomponents-loader.js"></script>
  <!-- import just the settings module, or polymer-element.html or polymer.html -->
  <link rel="import" href="components/polymer/lib/utils/settings.html">
  <script>
    Polymer.setPassiveTouchGestures(true);
  </script>
  <link rel="import" href="src/my-app.html">
  ...
```

Calling setter from the main application import:

```html
<link rel="import" href="components/polymer/polymer-element.html">

<script>
  Polymer.setPassiveTouchGestures(true);

  class MyApp extends Polymer.Element {
    ...
</script>
```

Defining a Polymer object:

```html
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
    Setting / Setter
  </td>
  <td>
    Description
  </td>
</tr>
</thead>
<tbody>
  <tr>
    <td>
      <code>setPassiveTouchGestures</code>
    </td>
    <td>
      <p>
        When <code>true</code>, Polymer gestures event listeners are all added as passive listeners,
        and can't call <code>preventDefault</code> to prevent the native browser handling. May improve scroll performance. Defaults to <code>false</code>.
      </p>
      <p>
        This setting <strong>can't</strong> be set from the <code>Polymer</code> object—the application
        must use the setter before any gesture event listeners are added.
      <p>
       See <a href="gesture-events#gestures-and-scroll-direction">Native browser gesture handling</a> for more information on gesture events and native browsers gestures.
      </p>
    </td>
  </tr>

  <tr>
    <td>
      <code>rootPath</code><br>
      <code>setRootPath</code>
    </td>
    <td>
      Sets a global <code>rootPath</code> property that can be used in templates to generate URLs that
      are relative to the application root.
    </td>
  </tr>
  <tr>
    <td>
      <code>sanitizeDOMValue</code><br>
      <code>setSanitizeDOMValue</code>
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
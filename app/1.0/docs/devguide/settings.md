---
title: Global Polymer settings
---

Document-level global Polymer settings can be set
by creating a `Polymer` object on window before importing the Polymer
library:

```
<html>
  <head>
  <meta charset="utf-8">
  <script src="components/webcomponentsjs/webcomponents-lite.js"></script>
  <script>
    /* this script must run before Polymer is imported */
    window.Polymer = {
      dom: 'shadow',
      lazyRegister: true
    };
  </script>
  <!-- import a component that relies on Polymer -->
  <link rel="import" href="elements/my-app.html">
  </head>
  <body>
  ...
```

Settings can also be switched on the URL query string:

    http://example.com/test-app/index.html?dom=shadow

Available settings:

*   `dom`—options:
    * `shady`. All local DOM is rendered using shady DOM, even where shadow DOM is supported (current default).
    * `shadow`. Local DOM is rendered using shadow DOM where supported (this will be the default in the future).

*   `lazyRegister`—options:
    * `true`, many registration-time activities are deferred until the first instance of an element
	type is created. Defaults to `false`. (This default may change in the future.)
    * `"max"`, Defers all behavior work until first element creation. When setting `lazyRegister` to `"max"`, cannot set an element's `is` property or create a custom constructor by defining the `factoryImpl` method. Polymer will call your element's `beforeRegister` to preserve the ability to define elements using ES6. The element's `beforeRegister` will be called before the behavior's.
*   `useNativeCSSProperties` - when `true`, Polymer uses native custom CSS properties if the browser supports them. Defaults to `false` because of Safari 9 support being buggy. See [1.6.0 release notes](https://www.polymer-project.org/1.0/docs/release-notes#v-1-6-0) for more information.
*   `noUrlSettings`- when `true`, Polymer settings can only be sent from a script in the page. In other words, URL query parameters such as `?dom=shadow` will be ignored. Defaults to `false`.

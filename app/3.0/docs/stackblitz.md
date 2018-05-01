---
title: "Polymer 3.0 on Stackblitz"
---

<!-- toc -->

[StackBlitz](https://stackblitz.com) is an online IDE for web apps. You can use StackBlitz to prototype and preview Polymer elements.

Here's a [template for Polymer 3.0 to help you get started](https://stackblitz.com/edit/start-polymer3?file=start-polymer3.js). 

Please note that at the time of writing:

* StackBlitz requires an `index.js` and `index.html` file to be present in the root folder for all JavaScript projects. You'll need to import your app shell from `index.js`, and run `index.js` from `index.html`. For example:

  index.js
  ```
  import `my-app.js`;
  ```

  index.html
  ```
  <script src="index.js"></script>
  <my-app></my-app>
  ```

  my-app.js
  ```
  import PolymerElement from '@polymer/polymer/polymer-element.js';
  class MyApp extends PolymerElement {...}
  window.customElements.define('my-app', MyApp);
  ```

* StackBlitz compiles all es6 modules down to es5 for compatibility with older browsers. Make sure you run `custom-elements-es5-adapter.js` (part of the [`@webcomponents/webcomponentsjs` suite of polyfills](https://github.com/webcomponents/webcomponentsjs) from your `index.html` file:

  index.html
  ```
  <script src="node_modules/@webcomponents/webcomponentsjs/custom-elements-es5-adapter.js"></script>
  <script src="index.js"></script>
  <my-app></my-app>
  ```
  ```

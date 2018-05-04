---
title: "Polymer 3.0 on StackBlitz"
---

<!-- toc -->

[StackBlitz](https://stackblitz.com) is an online editor for web projects. You can use StackBlitz to prototype and preview Polymer elements and apps without a build step.

StackBlitz transpiles ES6 to ES5, so samples with Polymer 3.0 code can run on any browser. You can install dependencies using npm, and import them with Node.js-style module resolution (`import {PolymerElement} from '@polymer/polymer/polymer-element.js'`). 

You can still use Polymer 3.0 in other online code editors, like [Plunker](https://plnkr.co/) or [jsbin](https://jsbin.com/), but you may need to use non-standard paths to import dependencies, and the code may not run on older browsers. 

Here's a [StackBlitz template for Polymer 3.0 to help you get started](https://stackblitz.com/edit/start-polymer3?file=start-polymer3.js). 

Please note that at the time of writing, StackBlitz requires an `index.js` and `index.html` file to be present in the root folder for all JavaScript projects. You'll need to import JavaScript modules, such as elements, from `index.js`:

index.js {.caption}

```js
import `my-app.js`;
```

index.html {.caption}

```html
<!-- StackBlitz compiles es6 code to es5. Include custom elements adapter to make code work in es6-native browsers -->
<script src="./node_modules/@webcomponents/webcomponentsjs/custom-elements-es5-adapter.js"></script>
<!-- Include WebComponents polyfills -->
<script src="./node_modules/@webcomponents/webcomponentsjs/webcomponents-loader.js"></script>
<my-app></my-app>
```

my-app.js {.caption}

```js
import PolymerElement from '@polymer/polymer/polymer-element.js';
class MyApp extends PolymerElement {
  ...
}
window.customElements.define('my-app', MyApp);
```

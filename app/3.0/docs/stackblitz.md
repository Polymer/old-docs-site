---
title: "Polymer 3.0 on Stackblitz"
---

<!-- toc -->

[StackBlitz](https://stackblitz.com) is an online editor for web projects. You can use StackBlitz to prototype and preview Polymer elements.

Here's a [template for Polymer 3.0 to help you get started](https://stackblitz.com/edit/start-polymer3?file=start-polymer3.js). 

Please note that at the time of writing, StackBlitz requires an `index.js` and `index.html` file to be present in the root folder for all JavaScript projects. You'll need to import your app shell from `index.js`, like so:

index.js {.caption}

```
import `my-app.js`;
```

index.html {.caption}
```
<!-- Include WebComponents polyfills -->
<script src="./node_modules/@webcomponents/webcomponentsjs/webcomponents-lite.js"></script>

<!-- StackBlitz compiles es6 code to es5. Include custom elements adapter to make code work in ES6-native browsers -->
<script src="node_modules/@webcomponents/webcomponentsjs/custom-elements-es5-adapter.js"></script>

<my-app></my-app>
```

my-app.js {.caption}
```
import PolymerElement from '@polymer/polymer/polymer-element.js';

class MyApp extends PolymerElement {
  ...
}

window.customElements.define('my-app', MyApp);
```

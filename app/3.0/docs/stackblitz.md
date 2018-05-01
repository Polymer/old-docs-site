---
title: "Polymer 3.0 on Stackblitz"
---

<!-- toc -->

[StackBlitz](https://stackblitz.com) is an online editor for web projects. You can use StackBlitz to prototype and preview Polymer elements.

Here's a [template for Polymer 3.0 to help you get started](https://stackblitz.com/edit/start-polymer3?file=start-polymer3.js). 

<demo-tabs selected="0" name="start-polymer3" src="http://plnkr.co/edit/?p=preview">
  <paper-tab slot="tabs">start-polymer3.js</paper-tab>
  <div>

```js
<!-- include_file 3.0/start/samples/custom-element/custom-element.js -->
```

  </div>
  <paper-tab slot="tabs">index.html</paper-tab>
  <div>

```html
<!-- include_file 3.0/start/samples/custom-element/index.html -->
```

  </div>
  <iframe slot="results" frameborder="0" src="samples/custom-element/index.html" width="100%" height="40"></iframe>
</demo-tabs>


Please note that at the time of writing, StackBlitz requires an `index.js` and `index.html` file to be present in the root folder for all JavaScript projects. You'll need to import your app shell from `index.js`, like so:

index.js {.caption}

```
import `my-app.js`;
```

index.html {.caption}
```
<!-- StackBlitz compiles es6 code to es5 for compatibility with older browsers. Include the custom elements adapter to make your code work in ES6-native browsers. -->
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

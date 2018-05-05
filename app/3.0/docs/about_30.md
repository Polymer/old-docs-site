---
title: What's new in 3.0
---

<!-- toc -->

While the Polymer 3.0 API hasn't changed significantly, there are two major changes to the way the Polymer library and elements are packaged and distributed:

  * Polymer 3.0 apps and elements use ES Modules instead of HTML Imports to import dependencies. 
  * The core Polymer 3.0 library and the Polymer 3.0 elements are distributed via npm instead of Bower.

## Import the core Polymer library and Polymer Elements

The Polymer 3.0 core library, elements, mixins, and utilities are ES Modules. 

Install them with npm:

```
npm install --save @polymer/polymer@next
npm install --save @polymer/paper-checkbox@next
```

Import them with `import` statements, referring to them with module specifiers instead of paths: 

```js
import {PolymerElement} from '@polymer/polymer/polymer-element.js';
import '@polymer/paper-checkbox/paper-checkbox.js';
```

## Create your own Polymer elements

Define an ES Module, give it an HTML template, and register the new element with the browser:

```js
import {PolymerElement} from '@polymer/polymer/polymer-element.js';

export class MyElement extends PolymerElement{
  static get template(){
    return html`
      <h1>shadow DOM!</h1>  
    `;
  }
}
customElements.define('my-element', MyElement);
```

## Use a Polymer element

Load your element as a `"module"` script, then use it in markup:

```html
<html>
  <head>
    <script type="module" src="my-element.js"></script>
  </head>
  <body>
    <my-element></my-element>
  </body>
</html>
```

## Browser support and polyfills



## ES6/ES???



## Polymer 3.0 Element Status

Nearly all of the Polymer elements are up and running in 3.0 form. 

See the [Polymer 3.0 Element status page](https://github.com/Polymer/polymer-modulizer/blob/master/docs/polymer-3-element-status) for the specifics.

---
title: Browser support overview
---

<!-- toc -->

Polymer 2.x works in the _latest two versions_ of all major browsers: Safari 9+, IE 11+, and the
evergreen Chrome, Firefox, and Edge.

## Platform features

The Polymer library is a lightweight sugaring layer on top of the [Web Components
APIs](http://webcomponents.org/articles/why-web-components/). Some features used by Polymer are not
(yet) supported natively in all browsers. For
broad web components support, Polymer uses the [polyfills](https://github.com/webcomponents/webcomponentsjs) from
[webcomponents.org](http://webcomponents.org). They're lightweight, work well, and provide the
feature support Polymer requires.

See the documentation on [polyfills](polyfills) for more information.

## ES6

Polymer 2.x uses EcmaScript 2015 (commonly known as ES6). The following browsers support all of the
ES6 features required by Polymer.

-   Chrome or Chromium version 49 or later.
-   Opera 36 or later.
-   Safari or Mobile Safari 10 or later.
-   Edge 15.15063 or later.
-   Firefox 51 or later.

For other browsers, you should compile your application to ES5.

See the documentation on [compiling ES6 to ES5](es6) for more information.
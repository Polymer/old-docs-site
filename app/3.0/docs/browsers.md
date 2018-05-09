---
title: Browser support overview
---

<!-- toc -->

Polymer 3.x works in the _latest two versions_ of all major browsers: Safari 10+, IE 11+, and the
evergreen Chrome, Firefox, and Edge.

## Platform features

The Polymer library is a lightweight sugaring layer on top of the [Web Components
APIs](http://webcomponents.org/articles/why-web-components/). Some features used by Polymer are not
(yet) supported natively in all browsers. 

*   For broad web components support, Polymer uses the [polyfills](https://github.com/webcomponents/webcomponentsjs) 
    from [webcomponents.org](http://webcomponents.org). They're lightweight, work well, and provide the
    feature support Polymer requires.

*   Polymer uses ES6 language features. For browsers that don't support them, Polymer apps need to be compiled
    to ES5. 

*   Polymer uses ES6 modules for packaging. These can be bundled out or transformed to AMD modules for browsers that
    don't support the required features, which include the `import` statement, the dynamic `import()` operator, and
    the `import.meta` property.

*   Polymer modules also use Node-style module resolution allowing you to import modules by package name. 
    These specifiers always need to be transformed to paths before being served to browsers.

The following support matrix summarizes the polyfills and transforms required for each browser.

| Browser & version | Compile? | Polyfills? | Transform modules? | Transform specifiers?|
|---|---|---|---|---|
| Chrome 66 | No | No | No | Yes|
| Safari 11.1+ | No | No| No| Yes|
| Safari 10+|No|Yes|Yes|Yes|
| Firefox 60|No|Yes|No|Yes|
| Firefox 59|No|Yes|Yes|Yes|
| Edge 17|No|Yes|No|Yes|
| Edge 16|No|Yes|Yes|Yes|
| IE 11|Yes|Yes|Yes|Yes|
| Chrome 41 (Google web crawler)|Yes|Yes|Yes|Yes|

See the documentation on [polyfills](polyfills) and [ES6 & modules](es6) for more information.

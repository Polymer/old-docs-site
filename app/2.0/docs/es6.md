---
title: ES6 and compilation to ES5
---

<!--toc -->

Polymer 2.x uses EcmaScript 2015 (commonly known as ES6). The following browsers support all of the
ES6 features required by Polymer:

-   Chrome or Chromium version 49 or later.
-   Opera 36 or later.
-   Safari or Mobile Safari 10 or later.
-   Edge 15.15063 or later.
-   Firefox 51 or later.

For other browsers, you should compile your application to ES5.

Information on multiple builds and differential serving is available in the [documentation on building for production](/{{{polymer_version_dir}}}/docs/tools/build-for-production).

## Compiling ES6 to ES5 {#compile}

Polymer 2.x and native 2.x class-style elements are written using the next generation of the
JavaScript standard, EcmaScript 2015 (more commonly known as ES6). ES6 is required by the native
custom element specification. (All browsers that implement native custom elements also support ES6.)

The Polymer CLI and `polymer-build` library support compiling ES6 to ES5 at build time. In
addition, the `polymer serve` and `polymer test` commands compile at runtime when required by the
browser.

For best performance, you should serve ES6 code to browsers that support it, and only serve ES5
code to browsers that don't support ES6.

If you need to statically host your code and serve a single version to all browsers, compile
**all** code to ES5, and include the native shim, a lightweight polyfill that lets compiled ES5
work on browsers that support native custom elements.

If you're putting together a custom build:

-   Polymer requires all ES6 features except modules. (If you're using Babel, you can use
    `babel-preset-es2015` with the `modules` option set to false.)
-   You must compile all your elements, the Polymer library, and any third-party elements you're
    using, but _not_ the polyfills.
-   Include the `custom-elements-es5-adapter.js` script from `webcomponentsjs` in your `index.html`
    (or wherever you import the webcomponents polyfill).

### Other features used by Polymer or the elements

IE 10 has flaky Mutation Observer support, and is also largely [no longer supported by
Microsoft](https://www.microsoft.com/en-us/WindowsForBusiness/End-of-IE-support). Much of Polymer
will still work, but you may run into some bugs here and there. Official support is for IE
11/Edge.
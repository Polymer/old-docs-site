---
title: ES6 and compilation to ES5
---

<!--toc -->

<div>
{% include 'outdated.html' %}
</div>

Polymer 2.x uses EcmaScript 2015 (commonly known as ES6). The following browsers support all of the
ES6 features required by Polymer:

-   Chrome or Chromium version 49 or later.
-   Opera 36 or later.
-   Safari or Mobile Safari 10 or later.
-   Edge 15.15063 or later.
-   Firefox 51 or later.

For other browsers, you should compile your application to ES5.

Information on multiple builds and differential serving is available in the
[documentation on building for production](/{{{polymer_version_dir}}}/toolbox/build-for-production).

## Compiling ES6 to ES5 {#compile}

Polymer 2.x and native 2.x class-style elements are written using the next generation of the
JavaScript standard, EcmaScript 2015 (more commonly known as ES6). ES6 is required by the native
custom element specification. (All browsers that implement native custom elements also support ES6.)

The Polymer CLI and `polymer-build` library support compiling ES6 to ES5 at build time. In
addition, the `polymer serve` and `polymer test` commands compile at runtime when required by the
browser.

**Device emulation may cause errors**. When using DevTools device emulation in Chrome,
`polymer serve` will serve compiled code when emulating iOS devices, and uncompiled code when
emulating Android devices. When switching between devices, the browser may end up with both
compiled and uncompiled code in its cache, resulting in errors. To avoid this problem, run
`polymer serve` with the `--compile never` option when testing with device emulation.
{.alert .alert info}

For best performance, you should serve ES6 code to browsers that support it, and only serve ES5
code to browsers that don't support ES6.

If you need to statically host your code and serve a single version to all browsers, compile
to ES5.

When you use the Polymer CLI to compile your app, the CLI automatically compiles the correct files
and injects `custom-elements-es5-adapter.js`, a  lightweight polyfill that lets compiled ES5 work
on browsers that support native custom elements.

If you're putting together a custom build:

-   Polymer requires all ES6 features except modules. (If you're using Babel, you can use
    `babel-preset-es2015` with the `modules` option set to false.)
-   You must compile all your elements, the Polymer library, and any third-party elements you're
    using, but _not_ the polyfills.
-   If you're serving compiled code to browsers that support native custom elements, inject the
    `custom-elements-es5-adapter.js` script at build time. The `polymer-build` library provides a
    [addCustomElementsEs5Adapter method](https://github.com/Polymer/polymer-build#custom-elements-es5-adapter)
    to inject the script. If that method doesn't work with your build system, see the
    [webcomponentsjs README](https://github.com/webcomponents/webcomponentsjs#custom-elements-es5-adapterjs)
    for details on using the script.

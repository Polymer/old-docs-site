---
title: ES6 and modules
---

<!--toc -->

Polymer 3.x uses JavaScript language features from the ECMAScript 2015 standard 
(commonly known as ES6). Polymer 3.x code is distributed as a set of ES6 modules.

Not all browsers support ES6 modules and other ES6 language features, but the Polymer
tools support transforming code into supported forms:

*   ES6 modules can be transformed into AMD modules, which are loaded using a small 
    JavaScript library, instead of depending on native module support. 
*   Other ES6 language features can be compiled to use a browser-compatible set of
    features (usually ES5, which is supported by all modern browsers). 

To deploy your code, you can either transform it for the lowest common denomniator (ES5,
transformed to AMD modules), or serve multiple versions of the code to different browsers.

Information on multiple builds and differential serving is available in the
[documentation on building for production](/{{{polymer_version_dir}}}/toolbox/build-for-production).

## JavaScript (ES6) Modules

Polymer 3.x is packaged using JavaScript Modules. JavaScript modules are the first native module
format implemented by browsers. JavaScript Modules provide _exports_ that can be used by other modules:

```js
export function fooBar() { ... }
```

Other modules can import these symbols like this:

```js
// import a symbol from a module
import {fooBar} from './my-module.js';
fooBar('baz');

// import a module for its side-effects (such as registering a custom element)
import './my-app-element.js';
```
Modules can also be loaded from HTML using `<script type="module">`

```js
<script type="module" src="./main-module.js">
</script>

<!-- modules can be inline, too -->
<script type="module">
import {fooBar} from './my-module.js';
fooBar('baz');
</script>
```

There are a number of online primers on JavaScript modules if you're not familiar with them. 

*   [ECMAScript modules in browsers](https://jakearchibald.com/2017/es-modules-in-browsers/) by Jake Archibald provides a
    good overview of modules.
*   [import](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import) and 
    [export](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/export) pages on MDN 
    provide a quick reference on module syntax.
*   [Modules chapter](http://exploringjs.com/es6/ch_modules.html) from Axel Rauschmayer's Exploring ES6.

As an addition to the standard ES6 module syntax, Polymer supports importing modules by name, as described
in the next section.

### Module specifiers

The browser accepts only one kind of module specifier in an `import` statement: a URL, which must
be either fully-qualified, or a path starting with `/`, `./` or `../`. This works fine for importing 
application-specific elements and modules:

```js
import './my-app-element.js';
```

However, it's challenging when you're writing a reusable component, and you want to import a peer dependency 
installed using npm. The path may vary depending on how the components are installed. So Polymer supports 
the use of Node-style named import specifiers:

```js
import {PolymerElement} from '@polymer/polymer/polymer-element.js';
```

Where `@polymer/polymer` is the _name_ of the npm package. (This style of specifier is sometimes called a 
"bare module specifier".)

These module specifiers need to be transformed to paths before they're served to the browser. The Polymer CLI can transform 
them at build time, and the Polymer development server can transform them at runtime, so you can test code without a build step.
Many third-party build tools, like WebPack and Rollup also support named modules.

### Dynamic imports

Dynamic import is a language feature that enables lazy-loading of resources, replacing the functionality 
that was previously used for this in Polymer 2.x (`Polymer.importHref`). 

The import operator acts like a function, and returns a `Promise`:

```js
import('my-view1.js').then((MyView1Module) => {
  console.log("MyView1 loaded");
}).catch((reason) => {
  console.log("MyView1 failed to load", reason);
});
```

The latest versions of Chrome and Safari support dynamic imports. For other browsers, the Polymer build tools can transform
dynamic imports into AMD modules. The Polymer development server can do this transformation on the fly.

For more on dynamic import, see:

*   [Dynamic import()](https://developers.google.com/web/updates/2017/11/dynamic-import) on developers.google.com.


## Compiling ES6 and beyond {#compile}

Polymer 3.x elements use features from the ECMAScript 2015 version 
of the JavaScript standard (commonly known as ES6). ES6 is required by the native
custom element specification. These features are supported in most but not all common browsers 
at this point. (All browsers that implement native custom elements also support ES6.)

The following browsers support all of the ES6 features required by Polymer:

-   Chrome or Chromium version 49 or later.
-   Opera 36 or later.
-   Safari or Mobile Safari 10 or later.
-   Edge 16 or later.
-   Firefox 51 or later.

For other browsers, you should compile your application to ES5. 

The Polymer CLI and `polymer-build` library support compiling ES6 to ES5 at build time. In
addition, the `polymer serve` and `polymer test` commands compile at runtime when required by the
browser. 

While the Polymer library doesn't depend on any features from newer JavaScript standards, 
ECMAScript 2016 or beyond. However, if you choose to use some of these features, such as 
async functions, the Polymer tools support compiling these features as well.

For best performance, you should serve ES6 code to browsers that support it, and only serve ES5
code to browsers that don't support ES6. 

If you need to statically host your code and serve a single version to all browsers, compile
to ES5.

When you use the Polymer CLI to compile your app, the CLI automatically compiles the correct files
and injects `custom-elements-es5-adapter.js`, a  lightweight polyfill that lets compiled ES5 work
on browsers that support native custom elements.

**Device emulation may cause errors**. When using DevTools device emulation in Chrome,
`polymer serve` will serve compiled code when emulating iOS devices, and uncompiled code when
emulating Android devices. When switching between devices, the browser may end up with both
compiled and uncompiled code in its cache, resulting in errors. To avoid this problem, run
`polymer serve` with the `--compile never` option when testing with device emulation.
{.alert .alert info}

### Custom builds

If you're putting together a custom build:

-   Polymer requires all ES6 features.
-   You must compile all your elements, the Polymer library, and any third-party elements you're
    using, but _not_ the polyfills.
-   If you're serving compiled code to browsers that support native custom elements, inject the
    `custom-elements-es5-adapter.js` script at build time. The `polymer-build` library provides a
    [addCustomElementsEs5Adapter method](https://github.com/Polymer/polymer-build#custom-elements-es5-adapter)
    to inject the script. If that method doesn't work with your build system, see the
    [webcomponentsjs README](https://github.com/webcomponents/webcomponentsjs#custom-elements-es5-adapterjs)
    for details on using the script.




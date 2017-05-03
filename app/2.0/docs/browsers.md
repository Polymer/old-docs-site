---
title: Browser support overview
---

Polymer 2.x works in the _latest two versions_ of all major browsers: Safari 9+, IE 11+, and the
evergreen Chrome, Firefox, and Edge.

## Platform features

The Polymer library is a lightweight sugaring layer on top of the [Web Components
APIs](http://webcomponents.org/articles/why-web-components/). Some features used by Polymer are not
(yet) supported natively in all browsers. For
broad web components support, Polymer uses the [polyfills](https://github.com/webcomponents/webcomponentsjs) from
[webcomponents.org](http://webcomponents.org). They're lightweight, work well, and provide the
feature support Polymer requires.

With the polyfills, Polymer works in these browsers:

<style>
td:not(.feature-title),th {
  text-align: center;
}
td.native {
  background-color: green;
  color: white;
}
td.partial {
  background-color: #2dd42d;
  color: white;
}
td.polyfill {
  background-color: darkorange;
  color: black;
}
</style>

<table>
<thead>
  <tr><th></th><th>Chrome</th><th>Firefox</th><th>IE&nbsp;11+/<br>Edge</th><th>Safari 9+</th><th>Chrome
 <br>(Android)</th><th>Safari<br>(iOS&nbsp;9+)</th></tr>
</thead>
<tr>
  <td class="feature-title"><a href="http://www.html5rocks.com/en/tutorials/webcomponents/template/">Template</a></td>
  <td class="native">Native</td>
  <td class="native">Native</td>
  <td class="partial">Partial</td>
  <td class="native">Native</td>
  <td class="native">Native</td>
  <td class="native">Native</td>
</tr>
<tr>
  <td class="feature-title"><a href="http://www.html5rocks.com/en/tutorials/webcomponents/imports/">HTML Imports</a></td>
  <td class="native">Native</td>
  <td class="polyfill">Polyfill</td>
  <td class="polyfill">Polyfill</td>
  <td class="polyfill">Polyfill</td>
  <td class="native">Native</td>
  <td class="polyfill">Polyfill</td>
</tr>
<tr>
  <td class="feature-title"><a href="http://www.html5rocks.com/en/tutorials/webcomponents/customelements/">Custom Elements</a></td>
  <td class="native">Native</td>
  <td class="polyfill">Polyfill</td>
  <td class="polyfill">Polyfill</td>
  <td class="partial">Partial</td>
  <td class="native">Native</td>
  <td class="partial">Partial</td>
</tr>
<tr>
  <td class="feature-title"><a href="http://www.html5rocks.com/en/tutorials/webcomponents/shadowdom/">Shadow DOM</a></td>
  <td class="native">Native</td>
  <td class="polyfill">Polyfill</td>
  <td class="polyfill">Polyfill</td>
  <td class="partial">Partial</td>
  <td class="native">Native</td>
  <td class="partial">Partial</td>
</tr>
</table>

Notes:

-   Templates are supported in Edge, but not IE.
-   Safari supports custom elements starting in 10.3.
-   Safari supports shadow DOM starting in 10.2, but as of 10.3 there are still some known issues.
-   Older versions of the Android Browser may run into some issues - please file an
    [issue](https://github.com/polymer/polymer/issues) if you run into a problem on this browser.
    Chrome for Android is supported.

### What polyfills should I use?

Polymer 2.x has been developed alongside and tested with a new suite of v1-spec compatible polyfills
for custom elements and shadow DOM. You can test Polymer 2.0 by using the latest 1.0 version of
`webcomponentsjs`, which is included as a bower dependency to Polymer 2.x. (`webcomponentsjs`
 versions prior to 1.0 support the older, v0 specifications for custom elements and shadow DOM.)

There are two main ways to load the polyfills:

*   `webcomponents-lite.js` includes all of the polyfills necessary to run on any of the supported
    browsers.
*   `webcomponents-loader.js` performs a runtime feature-detection and loads just the required
    polyfills.

References:
*   [webcomponentsjs on GitHub](https://github.com/webcomponents/webcomponentsjs)

## ES2015 {#es6}

Polymer 2.x uses EcmaScript 2015 (commonly known as ES6). The following browsers support all of the
ES6 features required by Polymer.

-   Chrome or Chromium version 49 or later.
-   Opera 36 or later.
-   Safari or Mobile Safari 10 or later.
-   Edge 15.15063 or later.
-   Firefox 51 or later.

For other browsers, you should compile your application to ES5.

### Compiling ES6 to ES5 {#compile}

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

#### Other features used by Polymer or the elements

IE 10 has flaky Mutation Observer support, and is also largely [no longer supported by
Microsoft](https://www.microsoft.com/en-us/WindowsForBusiness/End-of-IE-support). Much of Polymer
will still work, but you may run into some bugs here and there. Official support is for IE
11/Edge.

## Progress of native browser support

As of April 2017, there has been broad cross-browser agreement around the v1 versions of the [Custom
Elements](https://w3c.github.io/webcomponents/spec/custom/) and [Shadow
DOM](https://w3c.github.io/webcomponents/spec/shadow/) APIs, with support in Chrome, Opera, and
Safari Tech Preview, and implementations underway in other browsers.

**See** [caniuse.com](http://caniuse.com/) for more information on native browser support for web
components.
{: .alert .alert-info }

Notes:

-   Chrome natively implements both the v0 APIs (used by Polymer 1.x) and the v1 APIs
    (used by Polymer 2.x).

-   Safari Tech Preview includes working implementations of Shadow DOM v1 and Custom Elements v1.

-   Edge has on its backlog to support [Shadow
    DOM v1](https://wpdev.uservoice.com/forums/257854-microsoft-edge-developer/suggestions/6263785-shadow-dom-unprefixed)
    and [Custom Elements v1](https://wpdev.uservoice.com/forums/257854-microsoft-edge-developer/suggestions/6261298-custom-elements).

-   Firefox currently supports some of the v0 web component APIs behind a flag. Polymer
    **does not work correctly** with this flag enabled, because of an incompatibility with the web
    components polyfills.

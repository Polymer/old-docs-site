---
title: Browser compatibility
---

Polymer 1.0+ works in the _latest two versions_ of all major browsers: Safari 7+, IE 11+, and the
evergreen Chrome, Firefox, and Edge.

## Browser support

The Polymer library is a lightweight sugaring layer on top of the [Web Components
APIs](http://webcomponents.org/articles/why-web-components/). Unlike a typical javascript framework,
Polymer is designed to leverage features _baked into the web platform itself_ to let you build
components. Some features used by Polymer are not (yet) supported natively in all browsers. For
broad web components support, Polymer uses the [polyfills](https://github.com/webcomponents/webcomponentsjs) from
[webcomponents.org](http://webcomponents.org). They're lightweight, work well, and provide the
feature support Polymer requires.

With the polyfills, Polymer works in these browsers:

<table>
<thead>
  <tr><th></th><th>Chrome</th><th>Firefox</th><th>IE&nbsp;11+/Edge</th><th>Safari 7+</th><th>Chrome
  (Android)</th><th>Safari (iOS&nbsp;7.1)</th></tr>
</thead>
<tr>
  <td class="feature-title"><a href="http://www.html5rocks.com/en/tutorials/webcomponents/template/">Template</a></td>
  <td>✅</td>
  <td>✅</td>
  <td>✅</td>
  <td>✅</td>
  <td>✅</td>
  <td>✅</td>
</tr>
<tr>
  <td class="feature-title"><a href="http://www.html5rocks.com/en/tutorials/webcomponents/imports/">HTML Imports</a></td>
  <td>✅</td>
  <td>✅</td>
  <td>✅</td>
  <td>✅</td>
  <td>✅</td>
  <td>✅</td>
</tr>
<tr>
  <td class="feature-title"><a href="http://www.html5rocks.com/en/tutorials/webcomponents/customelements/">Custom Elements</a></td>
  <td>✅</td>
  <td>✅</td>
  <td>✅</td>
  <td>✅</td>
  <td>✅</td>
  <td>✅</td>
</tr>
<tr>
  <td class="feature-title"><a href="http://www.html5rocks.com/en/tutorials/webcomponents/shadowdom/">Shadow DOM</a></td>
  <td>✅</td>
  <td>✅</td>
  <td>✅</td>
  <td>✅</td>
  <td>✅</td>
  <td>✅</td>
</tr>
</table>

Notes:

-   Older versions of the Android Browser may run into some issues - please file an
    [issue](https://github.com/polymer/polymer/issues) if you run into a problem on this browser.
    Chrome for Android is supported.

#### What polyfills should I use?

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

## Compiling ES6 to ES5 {#es6}

Polymer 2.x and native 2.x class-style elements are written using the next generation of the
JavaScript standard, EcmaScript 2015 (more commonly known as ES6). ES6 is required by the native
custom element specification. ES6 code can be run without compilation in current Chrome, Safari 10,
Safari Technology Preview, Firefox, and Edge. Compilation is required to run Polymer 2.x in IE11
and Safari 9.

The Polymer CLI and `polymer-build` library support compiling ES6 to ES5 at build time. In
addition, the `polymer serve` and `polymer test` commands compile at runtime when required by the
browser.

For best performance, you should serve ES6 code to browsers that support it, and only serve ES5
code to browsers that don't support ES6.

If you need to statically host your code and serve a single version to all browsers, compile
**all** code to ES5, and include the native shim, a lightweight polyfill that lets compiled ES5
work on browsers that support native custom elements.


#### Other features used by Polymer or the elements

IE 10 has flaky Mutation Observer support, and is also largely [no longer supported by
Microsoft](https://www.microsoft.com/en-us/WindowsForBusiness/End-of-IE-support). Much of Polymer
will still work, but you may run into some bugs here and there. "Official" support is for IE
11/Edge.

## Progress of native browser support

As of 2016-05, there has been broad cross-browser agreement around the v1 versions of the [Custom
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

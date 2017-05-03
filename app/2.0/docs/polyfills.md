---
title: Polyfills
---

<!--toc -->

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
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
  <tr><th></th><th>Chrome</th><th>Firefox</th><th>IE&nbsp;11+/<br>Edge</th><th>Opera</th><th>Safari 9+</th><th>Chrome
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
  <td class="native">Native</td>
</tr>
<tr>
  <td class="feature-title"><a href="http://www.html5rocks.com/en/tutorials/webcomponents/imports/">HTML Imports</a></td>
  <td class="native">Native</td>
  <td class="polyfill">Polyfill</td>
  <td class="polyfill">Polyfill</td>
  <td class="native">Native</td>
  <td class="polyfill">Polyfill</td>
  <td class="native">Native</td>
  <td class="polyfill">Polyfill</td>
</tr>
<tr>
  <td class="feature-title"><a href="http://www.html5rocks.com/en/tutorials/webcomponents/customelements/">Custom Elements</a></td>
  <td class="native">Native</td>
  <td class="polyfill">Polyfill</td>
  <td class="polyfill">Polyfill</td>
  <td class="native">Native</td>
  <td class="partial">Partial</td>
  <td class="native">Native</td>
  <td class="partial">Partial</td>
</tr>
<tr>
  <td class="feature-title"><a href="http://www.html5rocks.com/en/tutorials/webcomponents/shadowdom/">Shadow DOM</a></td>
  <td class="native">Native</td>
  <td class="polyfill">Polyfill</td>
  <td class="polyfill">Polyfill</td>
  <td class="native">Native</td>
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
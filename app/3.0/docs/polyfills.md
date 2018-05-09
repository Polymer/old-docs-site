---
title: Polyfills
---

<!--toc -->

Polymer 3.x has been developed alongside and tested with a new suite of v1-spec compatible polyfills
for custom elements and shadow DOM. These versions no longer include the HTML imports polyfill,
and have been developed to work with ES6 modules. You can test Polymer 3.x using the latest 2.0 version of
`webcomponentsjs` v2.0.0 or later.

(Polyfill versions v1.x.x  include the HTML imports polyfill, and are compatible
with Polymer 2.x. Versions prior to v1.0 support the older, v0 specifications for custom elements and 
shadow DOM.)

There are two main ways to load the polyfills:

*   `webcomponents-bundle.js` includes all of the polyfills necessary to run on any of the supported
    browsers. Because all browsers receive all polyfills, this results in extra bytes being sent
    to browsers that support one or more feature. This replaces the v1.x `webcomponents-lite.js` bundle.

*   `webcomponents-loader.js` performs client-side feature-detection and loads just the required
    polyfills. This requires an extra round-trip to the server, but saves bandwidth for browsers
    that support one or more features.

In both cases, the polyfills should be loaded just once. The polyfills are generally loaded from the
application entrypoint (`index.html` or similar).

There are a couple of other related polyfill files that you may need:

*   `custom-elements-es5-adapter.js`. This small polyfill allows you to run compiled, ES5 elements
    on browsers that support native custom elements. This is useful in static serving environments
    where you need to serve a single app version to all browsers. The adapter is discussed in more
    detail in [ES6](es6) and in [Build for production](/{{{polymer_version_dir}}}/toolbox/build-for-production).
*   `apply-shim.js`. A polyfill for CSS mixins. Unlike the other polyfills, it should be imported
    by any component that defines or applies CSS mixins. For details, see
    [Use custom CSS mixins](/{{{polymer_version_dir}}}/docs/devguide/custom-css-properties#use-custom-css-mixins).

References:
*   [webcomponentsjs on GitHub](https://github.com/webcomponents/webcomponentsjs)

## Polyfill settings {#settings}

By default, the individual polyfill for a given feature is disabled on browsers that natively support
that feature. For testing purposes, you can force the polyfills on for browsers that have native
support. You can force the polyfills on by adding a JavaScript snippet before you
import the polyfills:

```html
<script>
  // Force all polyfills on
  if (window.customElements) window.customElements.forcePolyfill = true;
  ShadyDOM = { force: true };
  ShadyCSS = { shimcssproperties: true};
</script>
<script src="./node_modules/@webcomponents/webcomponentsjs/webcomponents-loader.js"></script>
```

The `webcomponents-bundle.js` file also supports forcing the polyfills on by adding query parameters to
the app's URL:

`https://www.example.com/my-application/view1?wc-ce&wc-shadydom&wc-shimcssproperties`

The following table lists the JavaScript snippets and query parameters for each polyfill.

<table>
<thead>
<tr>
  <td>
    Polyfill
  </td>
  <td>
    Description
  </td>
</tr>
</thead>
<tbody>
 <tr>
    <td>
      Custom Elements
    </td>
    <td>
JavaScript:

```js
window.customElements && window.customElements.forcePolyfill = true;
```

Query parameter:

`wc-ce`
    </td>
  </tr>
  <tr>
    <td>
      Shadow DOM
    </td>
    <td>
JavaScript:

```js
ShadyDOM = { force: true }
```

Query parameter:

`wc-shadydom`
    </td>
  </tr>
    <tr>
    <td>
      CSS custom properties
    </td>
    <td>
JavaScript:

```js
ShadyCSS = { shimcssproperties: true}
```

Query parameter:

`wc-shimcssproperties`
    </td>
  </tr>
</tbody>
</table>



## Progress of native browser support

As of May 2018 the v1 versions of the [Custom
Elements](https://w3c.github.io/webcomponents/spec/custom/) and [Shadow
DOM](https://w3c.github.io/webcomponents/spec/shadow/) APIs have been shipped in Chrome, Opera, and
Safari, and implementations underway in other browsers.

**See** [caniuse.com](http://caniuse.com/) for more information on native browser support for web
components.
{: .alert .alert-info }

Notes:

-   Chrome natively implements both the v0 APIs (used by Polymer 1.x) and the v1 APIs
    (used by Polymer 2.x & 3.x).

-   Safari includes working implementations of Shadow DOM v1 and Custom Elements v1.

-   Edge has on its backlog to support [Shadow
    DOM v1](https://wpdev.uservoice.com/forums/257854-microsoft-edge-developer/suggestions/6263785-shadow-dom-unprefixed)
    and [Custom Elements v1](https://wpdev.uservoice.com/forums/257854-microsoft-edge-developer/suggestions/6261298-custom-elements).

-   Firefox currently supports experimental implementations of the custom elements and shadow DOM APIs       
    behind flags. Polymer **does not work correctly** with the experimental shadow DOM flag enabled, because 
    of an incompatibility with the web components polyfills.

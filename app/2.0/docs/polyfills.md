---
title: Polyfills
---

<!--toc -->

Polymer 2.x has been developed alongside and tested with a new suite of v1-spec compatible polyfills
for custom elements and shadow DOM. You can test Polymer 2.x by using the latest 1.0 version of
`webcomponentsjs`, which is included as a bower dependency to Polymer 2.x. (`webcomponentsjs`
 versions prior to 1.0 support the older, v0 specifications for custom elements and shadow DOM.)

There are two main ways to load the polyfills:

*   `webcomponents-lite.js` includes all of the polyfills necessary to run on any of the supported
    browsers. Because all browsers receive all polyfills, this results in extra bytes being sent
    to browsers that support one or more feature.

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
*   `apply-shim.html`. A polyfill for CSS mixins. Unlike the other polyfills, it should be included
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
<script src="/bower_components/webcomponentsjs/webcomponents-loader.js"></script>
```

The `webcomponents-lite.js` file also supports forcing the polyfills on by adding query parameters to
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

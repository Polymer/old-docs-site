---
title: Polyfills
---

<!--toc -->

Polymer 3.x has been developed alongside and tested with v2.0 of [webcomponentsjs](https://github.com/webcomponents/webcomponentsjs/), a suite of polyfills for custom elements and shadow DOM. webcomponentsjs v2.x is included with Polymer 3.x as a dependency.

## Changes in webcomponentsjs v2.x

### HTML Imports polyfill removed 

The HTML Imports polyfill has been removed from v2.x of the webcomponentsjs polyfill suite. ES modules have shipped in most browsers, and Polymer 3.x and the Polymer Elements use them to load module dependencies. 

If you need to transform your code for browsers that can't load ES modules, you can build your code to AMD modules with [the Polymer build tools](/{{{polymer_version_dir}}}/toolbox/build-for-production).

### webcomponents-lite.js entrypoint removed

There is no `webcomponents-lite.js` entrypoint in the webcomponentsjs suite from v2.x onward. Update any `<script>` tag sources to load either `webcomponents-bundle.js` or `webcomponents-loader.js`. See below for instructions on loading the polyfills.

### Wait for the polyfills if you defer loading them

When using the `webcomponents-loader.js` entrypoint with the `defer` attribute, scripts that rely on the polyfills _must_ be loaded using `WebComponents.waitFor(loadCallback)`. See the [webcomponentsjs README](https://github.com/webcomponents/webcomponentsjs/) for more information.

## Load the polyfills

You can load the polyfills simply and easily with `webcomponents-bundle.js`, or more efficiently with `webcomponents-loader.js` and some logic.

### Load the polyfills with webcomponents-bundle.js

`webcomponents-bundle.js` loads all of the polyfills. It performs feature detection to decide which ones to use. 

To load the polyfills with `webcomponents-bundle.js`:

```html
<!-- load webcomponents bundle, which includes all the necessary polyfills -->
<script src="node_modules/webcomponentsjs/webcomponents-bundle.js"></script>

<!-- load the element -->
<script type="module" src="my-element.js"></script>

<!-- use the element -->
<my-element></my-element>
```

### Load the polyfills with webcomponents-loader.js

`webcomponents-loader.js` performs feature detection to determine which polyfills the user's browser needs. It then makes another trip to the server to load the polyfill bundle that meets the browser's needs.

To load the polyfills with `webcomponents-loader.js`:

```html
<!-- load the webcomponents loader, which injects the necessary polyfill bundle -->
<script src="node_modules/webcomponentsjs/webcomponents-loader.js"></script>

<!-- load the element -->
<script type="module" src="my-element.js"></script>

<!-- use the element -->
<my-element></my-element>
```

You can defer loading `webcomponents-loader.js` to retrieve feature-specific polyfills asynchronously. In this case, scripts that rely on the polyfills _must_ be loaded using `WebComponents.waitFor(loadCallback)`. See the [webcomponentsjs README](https://github.com/webcomponents/webcomponentsjs/) for more information.

## Other polyfills

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
<script src="/node_modules/webcomponentsjs/webcomponents-loader.js"></script>
```

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

**See** [caniuse.com](http://caniuse.com/) for more information on native browser support for web
components.
{: .alert .alert-info }

TBD

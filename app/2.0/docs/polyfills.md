---
title: Polyfills
---

<!--toc -->

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
---
layout: default
type: concepts
navgroup: start
shortname: Concepts
title: The Platform
subtitle: Supporting new web technologies today
---

{% include toc.html %}

## Introduction

{{site.project_title}} builds on top of the upcoming web components technologies, but they don't yet ship in all browsers.

The lowest layer of {{site.project_title}} is `platform.js`: a collection of libraries (or “polyfills”) for new web technologies that haven’t shipped yet across all browsers. Platform makes it possible for developers to use these standards today across all modern browsers. As these technologies are implemented in browsers, the polyfills will shrink and you'll gain the benefits of native implementations. `Platform.js` automatically detects native support and switches to the fast path when available. Your elements seamlessly start relying on the native stuff--and get faster in the process.

Although most developers will want to use everything in `platform.js`, the polyfills are designed to be used separately, as well. They're available independently and can be built standalone. For example, Mozilla's [x-tags](http://www.x-tags.org/) and Brick projects use a subset of the `platform.js` polyfills.

**Note**: The `platform.js` polyfill layer is no longer needed for browsers that fully implement the Web Components APIs, such as Chrome 36+.  This means the total payload for using Polymer on your site, for fully-compliant browsers, is a mere 32kb of `polymer.js`.
{: .alert alert-info}

## What's in Platform? {#bundle}

The platform layer is a bundle that includes the following libraries:

- Web Components
  - [Shadow DOM](/platform/shadow-dom.html). Encapsulate DOM subtrees and the associated CSS.
  - [HTML Imports](/platform/html-imports.html). Load element definitions and other resources declaratively.
  - [Custom Elements](/platform/custom-elements.html) . Define new elements in HTML.
- DOM
  - [URL](https://github.com/Polymer/URL). Parse URLs in JavaScript.
  - [WeakMap](https://github.com/Polymer/WeakMap). Shim for ES6 WeakMap type.
  - [Mutation Observers](https://github.com/Polymer/MutationObservers). Efficiently watch for changes in the DOM.
  <!-- - [Promises](https://github.com/Polymer/Promises). Handle asynchronous operations. -->
  - [observe-js](https://github.com/Polymer/observe-js). Observe changes on JS objects/arrays using `Object.observe` (if available).
- Other
  - [Web Animations](/platform/web-animations.html). Define complex timeline animations.

## Installation & usage {#setup}

To start using these features today, first download `platform.js` using Bower as described
in the [Getting the code](/docs/start/getting-the-code.html) guide:

    bower install --save Polymer/platform

Then, include `platform.js` as you would any other script:

    <script src="bower_components/platform/platform.js"></script>

**Note**: Due to the nature of some of the polyfills, to maximize compatibility with other libraries, make sure that `platform.js` is the first script tag in your document's `<head>`.
{: .alert alert-info}

Once included, you can use [HTML Imports](/platform/html-imports.html), [Custom Elements](/platform/custom-elements.html), [Shadow DOM](/platform/shadow-dom.html), and other emerging standards within your app. For example, to use a {{site.project_title}} element, just import it using an HTML Import:

    <link rel="import"
          href="bower_components/paper-tabs/paper-tabs.html">

Then use `<paper-tabs>` just like any built-in tag.

While each polyfill is standalone, the recommended approach is to include the entire `platform.js` file. This ensures all dependencies are present and the largest portion of the future web platform is available. Since this is the most-used configuration, it is also the most tested.

## Building each polyfill {#build}

For information on how to build each polyfill library independently, see [Tools & Testing](/resources/tooling-strategy.html).

## Next steps {#nextsteps}

`platform.js` is a wonderful foundation for working with Web Components in a cross-browser fashion. If you're ready to start building your own elements, and would like to learn about the additional features `polymer.js` adds, check out our guides on [Creating elements](/docs/start/creatingelements.html) and [Using elements](/docs/start/usingelements.html). Continue on to:

<a href="/docs/polymer/polymer.html">
  <paper-button raised><core-icon icon="arrow-forward" ></core-icon>API developer guide</paper-button>
</a>

---
layout: default
type: start
shortname: Concepts
title: The Platform
subtitle: Supporting new web technologies today
---

{% include toc.html %}

## Introduction

{{site.project_title}} builds on top of the upcoming web components technologies,
which don't yet ship in all browsers.

To do this, {{site.project_title}} uses `webcomponents.min.js`, a collection of
libraries (or “polyfills”) for new web technologies that haven’t shipped yet across
all browsers. The web components polyfills make it possible for developers to use
these standards today across all modern browsers. As these technologies are implemented
in browsers, the polyfills will shrink and you'll gain the benefits of native implementations.

`webcomponents.min.js` automatically detects native support and switches to the fast
path when available. Your elements seamlessly start relying on the native stuff&mdash;and
get faster in the process.

**Note:** Prior to version 0.5.0, the web components polyfills were released as
`platform.js`. For backward compatibility, `platform.js` will be maintained as
a copy of `webcomponents.min.js` for a few releases.
{: .alert .alert-info }

Although most developers will want to use everything in `webcomponents.min.js`, the
polyfills are designed to be used separately, as well. They're available independently
and can be built standalone. For example, Mozilla's [x-tags](http://www.x-tags.org/)
project uses a subset of the `webcomponents.min.js` polyfills.

**Note**: The web components polyfill layer is no longer needed for browsers that
fully implement the web components APIs, such as Chrome 36+.  This means the total
payload for using Polymer on your site, for fully-compliant browsers, is as low as 32kb
of JavaScript (minified and compressed).
{: .alert alert-info}

## What's in the web components polyfill? {#bundle}

`webcomponents.min.js` is a bundle that includes the following libraries:

- Web Components:
  - [Shadow DOM](/platform/shadow-dom.html). Encapsulate DOM subtrees and the associated CSS.
  - [HTML Imports](/platform/html-imports.html). Load element definitions and other resources declaratively.
  - [Custom Elements](/platform/custom-elements.html) . Define new elements in HTML.
- Dependencies required by the Web Components polyfills:
  - [WeakMap](https://github.com/Polymer/WeakMap). Shim for ES6 WeakMap type.
  - [Mutation Observers](https://github.com/Polymer/MutationObservers). Efficiently watch for changes in the DOM.

## Installation & usage {#setup}

To start using these features today, first download `webcomponents.min.js` using Bower as described
in the [Getting the code](/docs/start/getting-the-code.html) guide:

    bower install --save Polymer/webcomponentsjs

Then, include `webcomponents.min.js` as you would any other script:

    <script src="bower_components/webcomponentsjs/webcomponents.min.js"></script>

**Note**: Due to the nature of some of the polyfills, to maximize compatibility with other
libraries, make sure that `webcomponents.min.js` is the first script tag in your document's `<head>`.
{: .alert alert-info}

Once included, you can use [HTML Imports](/platform/html-imports.html),
[Custom Elements](/platform/custom-elements.html), [Shadow DOM](/platform/shadow-dom.html),
and other emerging standards in your app. For example, to use a {{site.project_title}} element,
just import it using an HTML Import:

    <link rel="import"
          href="bower_components/paper-tabs/paper-tabs.html">

Then use `<paper-tabs>` just like any built-in tag.

While each polyfill is standalone, the recommended approach is to include the entire
`webcomponents.min.js` file.  This ensures all dependencies are present and the largest portion
of the future web platform is available. Since this is the most-used configuration,
it is also the most tested.

The `webcomponentsjs` bower package includes individual polyfills for Shadow DOM,
Custom Elements and HTML Imports.

## Building the polyfills {#build}

If you're interested in building the polyfills locally, see the
[development repo](https://github.com/Polymer/webcomponentsjs-dev).

## Next steps {#nextsteps}

`webcomponents.min.js` is a wonderful foundation for working with Web Components in a
cross-browser fashion. If you're ready to start building your own elements, and would
like to learn about the additional features {{site.project_title}} adds, check out our guide
on [Creating elements](/docs/start/creatingelements.html) or follow
[the tutorial](/docs/start/tutorial/intro.html) to write your first {{site.project_title}} application.

Or continue on to:

<a href="/docs/polymer/polymer.html">
  <paper-button raised><core-icon icon="arrow-forward" ></core-icon>API developer guide</paper-button>
</a>

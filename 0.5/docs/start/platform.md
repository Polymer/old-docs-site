---
layout: default
type: start
shortname: Concepts
title: Web components polyfills
subtitle: Supporting new web technologies today
---

{% include toc.html %}

## Introduction

{{site.project_title}} builds on top of the upcoming web components technologies,
which don't yet ship in all browsers.

However, you can run {{site.project_title}} in any evergreen browser using the
Web Components support library, `webcomponents.js`. This is a collection of
libraries (or “polyfills”) for new web technologies that haven’t shipped yet across
all browsers. The web components polyfills make it possible for developers to use
these standards today across all modern browsers. As these technologies are implemented
in browsers, the polyfills will shrink and you'll gain the benefits of native implementations.

`webcomponents.js` automatically detects native support and switches to the fast
path when available. Your elements seamlessly start relying on the native stuff&mdash;and
get faster in the process.

In the past, the web components polyfills were maintained by
the Polymer organization and released as `platform.js`. The polyfills
have been transferred to [WebComponents.org](http://webcomponents.org)
and renamed to `webcomponents.js`.
For backward compatibility, `platform.js` will be maintained as
a copy of `webcomponents.js` for a few releases.

**Note**: The web components polyfill layer is no longer needed for browsers that
fully implement the web components APIs, such as Chrome 36+.  This means the total
payload for using Polymer on your site, for fully-compliant browsers, is as low as 32kb
of JavaScript (minified and compressed).
{: .alert alert-info}

## What's in the web components polyfill? {#bundle}

`webcomponents.min.js` is a bundle that includes the following libraries:

- Web Components:
  - [Shadow DOM](../../platform/shadow-dom.html). Encapsulate DOM subtrees and the associated CSS.
  - [HTML Imports](../../platform/html-imports.html). Load element definitions and other resources declaratively.
  - [Custom Elements](../../platform/custom-elements.html) . Define new elements in HTML.
- Dependencies required by the Web Components polyfills:
  - [WeakMap](https://github.com/Polymer/WeakMap). Shim for ES6 WeakMap type.
  - [Mutation Observers](https://github.com/Polymer/MutationObservers). Efficiently watch for changes in the DOM.

## Installation & usage {#setup}

If you install the {{site.project_title}} library using Bower or from a ZIP file,
you'll automatically get `webcomponents.js`.

You can also manually install `webcomponents.js` using Bower:

    bower install --save webcomponentsjs

**Note:** For more information on using Bower, see
[Getting the code](getting-the-code.html).
{: .alert .alert-info }

Then, include `webcomponents.min.js` as you would any other script:

    <script src="bower_components/webcomponentsjs/webcomponents.min.js"></script>

**Note**: Due to the nature of some of the polyfills, to maximize compatibility with other
libraries, make sure that `webcomponents.min.js` is the first script tag in your document's `<head>`.
{: .alert alert-info}

Once included, you can use [HTML Imports](../../platform/html-imports.html),
[Custom Elements](../../platform/custom-elements.html), [Shadow DOM](../../platform/shadow-dom.html),
and other emerging standards in your app. For example, to use a {{site.project_title}} element,
just import it using an HTML Import:

    <link rel="import"
          href="bower_components/paper-tabs/paper-tabs.html">

Then use `<paper-tabs>` just like any built-in tag.

## For more information

For more information on using, building, or contributing to the web components polyfills,
go to [WebComponents.org](http://webcomponents.org).

## Next steps {#nextsteps}

`webcomponents.min.js` is a wonderful foundation for working with Web Components in a
cross-browser fashion. If you're ready to start building your own elements, and would
like to learn about the additional features {{site.project_title}} adds, check out
[Polymer in 10 minutes](creatingelements.html) or follow
[the tutorial](tutorial/intro.html) to write your first {{site.project_title}} application.

Or continue on to:

<a href="../docs/polymer/polymer.html">
  <paper-button raised><core-icon icon="arrow-forward" ></core-icon>API developer guide</paper-button>
</a>

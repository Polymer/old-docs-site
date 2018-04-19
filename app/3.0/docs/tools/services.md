---
title: Web services
---

<!-- toc -->

This document is a list of miscellaneous services that you may find useful
when creating Polymer elements.

## <b>unpkg</b>—CDN web service for npm {#unpkg}

[unpkg](https://unpkg.com/) is a free CDN for npm packages. [It has no guarantees of uptime or support](https://unpkg.com/#/about), but is very useful when prototyping and sharing code samples.

Current use cases:

* Importing the WebComponents loader:

  index.html {.caption}

  ```html
  ...
  <head>
    <script type="module" src="https://unpkg.com/@webcomponents/webcomponentsjs/webcomponents-loader.js">
    ...
  </head>
  ...
  ```

* Importing the Polymer library, utilities, and helper functions from the `@polymer` package:

  my-element.js {.caption}

  ```js
  // Import the base PolymerElement class and html helper 
  import { PolymerElement, html } from 'https://unpkg.com/@polymer/polymer@3.0.0-pre.12/polymer-element.js';

  // Import the FlattenedNodesObserver utility
  import { FlattenedNodesObserver } from 'https://unpkg.com/@polymer/polymer@3.0.0-pre.12/lib/utils/flattened-nodes-observer.js';
  
  // Import the dom-repeat helper element
  import 'https://unpkg.com/@polymer/polymer@3.0.0-pre.12/lib/elements/dom-repeat.js';
  ```

**Currently, we don't have a way to import the Polymer elements from unpkg.** The Polymer elements are hosted on npm as well, but imports of a Polymer element (for example, `import 'https://unpkg.com/@polymer/paper-checkbox@3.0.0-pre.12/paper-checkbox.js'`) will try to load incorrect import paths.
{.alert .alert-warning}

## <b>polyicon</b>—create an optimized custom icon set {#polyicon}

[polyicon](https://github.com/PolymerLabs/polyicon) is an online tool to generate
an optimized custom icon set for your app, with only the icons that you need.
Instead of loading entire sets, this tool creates a slimmer (custom) icon set that you can load and 
use in your app.

Try it out: [https://poly-icon.appspot.com/](https://poly-icon.appspot.com/)

Source: [github.com/PolymerLabs/polyicon](https://github.com/PolymerLabs/polyicon)

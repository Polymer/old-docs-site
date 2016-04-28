---
title: "Building web components using ES6 classes"
---

<!-- toc -->

<style>
paper-button.blue {
  background: #4285f4;
  color: #fff;
}
paper-button.blue:hover {
  background: #2a56c6;
}
</style>

## Introduction

Web components evolve markup into something that's meaningful, maintainable, and highly modular. Thanks to these new API primitives, not only do we have improved ergonomics when building apps, but we gain better overall structure, design, and reusability.

ES6 does the same thing, but for JavaScript. JavaScript is the core language of the web and it's about time it saw a makeover! ES6 brings powerful new primitives to the language, but they're mostly about developer convenience. The result of all the syntactical goodness? More legible, more maintainable, and more modular JavaScript.

The analogy is simple: **Web Components : HTML :: ES6 : JS**. That is to say, what web components do for HTML, ES6 does for JavaScript.

In this article we'll create a `<stock-ticker>` custom element using ES6 classes.
First, I'll cover how to create the element using the vanilla web component JS APIs and
then how to create the same element using Polymer.

<p layout horizontal center-center>
<a href="http://ebidel.github.io/polymer-experiments/polymersummit/stockticker/" target="_blank">
  <paper-button raised class="blue">Stock Ticker Demo</paper-button>
</a>
<a href="https://github.com/ebidel/polymer-experiments/tree/master/polymersummit/stockticker" target="_blank">
  <paper-button raised class="blue">Full source</paper-button>
</a>
</p>

## Defining custom elements from a class

Custom elements can be defined from an ES6 class by extending the `HTMLElement` DOM interface:

    'use strict';

    class StockTicker extends HTMLElement {
      ...
    }

Extending `HTMLElement` creates the element with the correct `prototype`, inheriting all the methods/properties of the DOM interface.

**Note** Some browsers require `'use strict';` for using ES6 features but I'll be
leaving it off the other examples on this page.
{: .alert .alert-info }

### Element "constructors"

Normally when creating a class, you define a `constructor` to do initialization work. However,
in the world of custom elements this doesn't apply. Instead, you'll need to use
the `createdCallback` [custom element lifecycle method](../docs/devguide/registering-elements.html#lifecycle-callbacks) for setup work. Use it to initialize properties, (optionally) create [Shadow DOM](http://www.html5rocks.com/tutorials/webcomponents/shadowdom/) for the element, set default attributes, etc.

The following example creates a class definition for our stocker ticker element:

    class StockTicker extends HTMLElement {

      // Use createdCallback instead of constructor to init an element.
      createdCallback() {
        // This element uses Shadow DOM.
        this.createShadowRoot().innerHTML = `
          <style>
            :host {
              display: block;
            }
          </style>
          <div id="quotes"><div>
        `;

        // Update the ticker prices.
        this.updateQuotes(); // We'll define this later.
      }

      // You can also define the other lifecycle methods.
      attachedCallback() { ... }
      detachedCallback() { ... }
      attributeChangedCallback() { ... }
    }

**Note** Spec authors are working to support `constructor` with custom elements, but
it's currently a hole in the spec. The lack of support is due to the way native
elements are created by the browser.
{: .alert .alert-info }

One nice thing I'm doing here is using a [template string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/template_strings) to create Shadow DOM from an HTML snippet. Rather than concatenating strings or using escape sequences, we get a nicely formatted multiline string.

### Adding properties and methods

Say we wanted to add a `symbols` property to our element. Users should be able to
configure the list of ticker symbols through the property:

    document.querySelector('stock-ticker').symbols = ["GOOG", "GOOGL"];

and also declaratively, using an HTML attribute:

    <stock-ticker symbols='["GOOG", "GOOGL"]'>Loading...</stock-ticker>

To add a property like this, you can define a getter/setter that (de)serializes
the JSON when the user sets the property or declares the attribute. This is the type of feature Polymer adds for you. However, if you're working in vanilla custom elements, here's one way to go about it:

    class StockTicker extends HTMLElement {
      ...

      get symbols() {
        let s = this.getAttribute('symbols');
        return s ? JSON.parse(s) : [];
      }

      set symbols(val) {
        this.setAttribute('symbols', JSON.stringify(val));
        this.updateQuotes(); // Update prices when new symbols are set.
      }

    }

Finally, let's add an `updateQuotes` method so users can fetch the latest stock quotes.

    class StockTicker extends HTMLElement {
      ...

      updateQuotes() {
        if (!this.symbols.length) {
          return;
        }

        let url = `https://finance.google.com/finance/info?client=ig&q=${this.symbols}`;
        return fetch(url).then(...);
      }
    }

Check. It. Out! We're using ES6 [object shorthand](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Method_definitions) to define `updateQuotes` (no `function` keyword!) and constructing the URL using a [template string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/template_strings).

### Registering an element

So far, we've only defined a custom element using class syntax. The last step is to register the tag. This tells the browser about the element and allows you to create instances.

    class StockTicker extends HTMLElement {
      ...
    }

    document.registerElement('stock-ticker', StockTicker);

There's nothing new here. We're used to registering custom elements by passing
`document.registerElement` the element name followed by a `prototype`. The only difference
with classes is that you provide a `class` rather than a `prototype`.

**Classes are prototypes!** Strictly speaking, classes are syntactic sugar for `prototype`s. You may not see the `prototype` keyword when creating elements from ES6 classes, but in actuality, a `prototype` is still being passed under the hood. The JS engine does this for you.
{: .alert .alert-info }

## Defining Polymer elements from a class

Defining a Polymer element is similar to defining a vanilla custom element, with
several important differences:

1. There's no need to use `extends HTMLElement`. Polymer extends the element for you.
2. Use the `beforeRegister` method instead of `createdCallback`. This is a special method
Polymer calls before creating your element and is where you should define your `is` property (element's name) and [`properties` object](../docs/devguide/properties.html).
3. If you're using [behaviors](../docs/devguide/behaviors.html), define a getter that returns the array: `get behaviors() { return [MyBehavior]; }`
4. When registering an element, use the `Polymer()` constructor instead of `document.registerElement`.

Here's our stock ticker:

    <link rel="import" href="../polymer/polymer.html">

    <dom-module id="stock-ticker">
    <style>
      :host {
        display: block;
      }
    </style>
    <template>
      ...
    </template>
    <script>
    (function() {
      'use strict';

      let MyBehavior = { ... };

      class StockTicker {

        // Define behaviors with a getter.
        get behaviors() {
          return [MyBehavior];
        }

        // Element setup goes in beforeRegister instead of createdCallback.
        beforeRegister() {
          this.is = 'stock-ticker';

          // Define the properties object in beforeRegister.
          this.properties = {
            symbols: {
              type: Array,
              value: function() { return []; },
              observer: '_updateQuotes'
            }
          };
        }

        // Define other lifecycle methods as you need.
        ready() { ... }
        attached() { ... }
        detached() { ... }
        attributeChanged() { ... }

        _updateQuotes() {
          // Same as the vanilla component.
        }
      }

      // Register the element using Polymer's constructor.
      Polymer(StockTicker);
    })();
    </script>
    </dom-module>

<p layout horizontal center-center>
<a href="http://ebidel.github.io/polymer-experiments/polymersummit/stockticker/" target="_blank">
  <paper-button raised class="blue">Stock Ticker Demo</paper-button>
</a>
<a href="https://github.com/ebidel/polymer-experiments/tree/master/polymersummit/stockticker" target="_blank">
  <paper-button raised class="blue">Full source</paper-button>
</a>
</p>

## Building for production

**Note** ES6 classes currently work in Chrome 42+, Safari 9+, Edge preview, and FF nightly.
{: .alert .alert-info }

For our ES6 code to work in all modern browsers, we need to transpile it to an ES5 equivalent. [BabelJS](https://babeljs.io/) is my personal favorite. It's the most popular at the moment and comes with
a convenient CLI and Gulp/Grunt/Browserify workflows.

To support all browsers, follow these steps:

1. [Vulcanize](../../0.5/articles/concatenating-web-components.html) your element(s) by inlining the script and CSS:

        vulcanize element.html --inline-script --inline-css > element.v.html

2. Pipe the output to [cripser](https://www.npmjs.com/package/gulp-crisper). Crisper is a tool that extracts all inline `<script>` and creates a standalone .js file.

        crisper -s element.v.html -h element.v.html -j element.js

3. Run the standalone JS file through Babel:

        babel element.js -o element.js

   **Note**: I'm overwriting the original source with Babel's output so we don't have to
   change any paths inside the vulcanized element.v.html.

Or, you can run it all in one go:

    vulcanize element.html --inline-script --inline-css | \
        crisper -h element.v.html -j element.js;
    babel element.js -o element.js

## What about ES6 Modules?

ES6 modules are not a native thing to browsers, (*yet*). It's also unclear how and when they will work with HTML Imports. That's something the spec authors need to figure out. Right now, HTML Imports are a fantastic way to load component dependencies and related HTML/JS/CSS. That's what they've been designed to do! This is the primary reason we use them with Polymer.

That said, if you want to start using a module loader with Polymer today, one option is [Imports Module Definition](https://github.com/PolymerLabs/IMD) (IMD). IMD is an implementation of the AMD specification that performs absolutely no loading. The primary goal of it is to play nice with HTML Imports, but it should work well with any code loader that doesn't mandate a particular module registry. It's the minimal module system needed if you're already loading your scripts via HTML Imports. HTML Imports handily takes care of loading resources and their transitive dependencies, de-duplicating imports, and executing scripts in the correct order.

[Read more](https://github.com/PolymerLabs/IMD#imports-module-definition) about IMD.

## Summary

I wholeheartedly welcome ES6 classes to JavaScript! Not only is it fun to write code again,
but when combined with web components, it feels like what web development _should_
have always been. On one hand, we've got web components pushing HTML forward. On the other, ES6 is pushing JS forward. Together it's a thing of beauty.

Using ES6 with Polymer leads to writing extremely modular, grok'able, and maintainable code.
As you've seen, defining custom elements and/or Polymer elements using classes is also super easy. I like to think of it as writing "componentized JS" that leads to "componentized HTML". It's very satisfying.

### Additional resources

- [Using ES6 with Polymer](https://www.youtube.com/watch?v=bX3_tN23M_Y) video from Polymer Summit 2015
- [Polymer Starter Kit](https://github.com/PolymerElements/polymer-starter-kit/blob/master/docs/add-es2015-support-babel.md) support/recipe
- [BabelJS](https://babeljs.io/)—transpiler for ES6 -> ES5
- [ES6 In Depth articles](https://hacks.mozilla.org/category/es6-in-depth/) on Mozilla Hacks
- [Custom Elements 101](http://www.html5rocks.com/en/tutorials/webcomponents/customelements/) on html5rocks
- [Shadow DOM 101](http://www.html5rocks.com/tutorials/webcomponents/shadowdom/) on html5rocks

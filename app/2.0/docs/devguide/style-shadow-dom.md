---
title: Style an element's shadow DOM
---

<!-- toc -->

## Style your elements

Polymer supports DOM templating and the shadow DOM API. When you provide a DOM template for your custom element, Polymer then copies in the contents of the template you provided for your element.

Here's an example:

[See it on Plunker](http://plnkr.co/edit/TOgaxeSzuQsWFSIpzN7S?p=preview)

`custom-element.html` { .caption }
```html
<!-- Import polymer-element -->
<link rel="import" href="https://polygit.org/polymer+:2.0-preview/webcomponentsjs+:v1/shadydom+webcomponents+:master/shadycss+webcomponents+:master/custom-elements+webcomponents+:master/components/polymer/polymer-element.html">

<!-- Create a template for the custom element -->
<dom-module id='custom-element'>
  <template>
    <h1>Heading!</h1>
    <p>We are elements in custom-element's local DOM.</p>
  </template>

  <!-- Register the element -->
  <script>
    class CustomElement extends Polymer.Element {
      static get is() {
        return "custom-element";
      }
    }
    customElements.define(CustomElement.is, CustomElement);
  </script>
</dom-module>
```

`index.html` { .caption }
```html
<!-- Load the polyfills -->
<script src="https://polygit.org/polymer+:2.0-preview/webcomponentsjs+:v1/shadydom+webcomponents+:master/shadycss+webcomponents+:master/custom-elements+webcomponents+:master/components/webcomponentsjs/webcomponents-loader.js"></script>

<!-- Load the custom element -->
<link rel="import" href="custom-element.html">
<!-- Drop the custom element on the page -->
<custom-element></custom-element>
```

The HTML elements in your template become children in your custom element's shadow DOM. Shadow DOM provides a mechanism for encapsulation, meaning that elements inside the shadow DOM don't match selectors outside the shadow DOM.

Likewise, styling rules in side the shadow DOM can't "leak" out to affect elements outside the shadow DOM.

Shadow DOM permits encapsulation of styling rules for custom elements. You can freely define styling information for your elements, such as fonts, text colors, and classes, without fear of the styles applying outside the scope of your element.

Here's an example:

[See it on Plunker](http://plnkr.co/edit/cHSjdQTa0h6fWXAygkje?p=preview)

`x-foo.html` { .caption}
```html
<dom-module id='x-foo'>
  <template>
    <!-- Encapsulated, element-level stylesheet -->
    <style>
      p {
        color: green;
      }
      .myclass {
        color: red;
      }
    </style>
    <p>I'm a shadow DOM child element of x-foo.</p>
    <p class="myclass">So am I.</p>
  </template>
  ...
</dom-module>
```

`index.html` { .caption }
```html
<link rel="import" href="x-foo.html">
<!-- Document-level stylesheet -->
<style>
  .myclass {
    color: blue;
  }
</style>
<x-foo></x-foo>
<!-- The following paragraph uses the document-level stylesheet. -->
<p class="myclass">I have nothing to do with x-foo. Because of encapsulation, x-foo's styles won't leak to me.</p>
```

For a detailed explanation of shadow DOM as it applies to Polymer, see [Shadow DOM concepts](shadow-dom).

For an exploration of the shadow DOM v1 API, see [Shadow DOM v1: Self-Contained Web Components](https://developers.google.com/web/fundamentals/getting-started/primers/shadowdom).

### Use inheritance from document-level styles

When used in an HTML document, your element will still inherit any styling information that applies to its parent element:

[See it on Plunker](http://plnkr.co/edit/7ugStflqbexg2dNqmtDQ?p=preview)

`x-foo.html` { .caption}
```html
<dom-module id='x-foo'>
  <template>
    <div>
      I inherit styles from x-foo's parent in the light DOM.
      I'm also sans-serif and blue.
    </div>
  </template>
</dom-module>
```

`index.html` { .caption}
```html
<link rel="import" href="x-foo.html">
<!-- Document-level stylesheet -->
<style>
  p {
    font-family: sans-serif;
    color: blue;
  }
</style>

<!-- This paragraph uses document-level styles: -->
<p>I'm sans-serif and blue.</p>

<!-- And the text within x-foo inherits style from the paragraph element: -->
<p><x-foo></x-foo></p>
```

Styles declared inside shadow DOM will override styles declared outside of it:

[See it on Plunker](http://plnkr.co/edit/0Fid1Gupd0jk9jggAKuv?p=preview)

`x-foo.html` { .caption}
```html
<dom-module id='x-foo'>
  <template>
    <!-- Encapsulated, element-level stylesheet -->
    <style>
      p {
        font-family: sans-serif;
        color: green;
      }
    </style>
    <p>I'm green.</p>
  </template>
</dom-module>
```

`index.html` { .caption}
```html
<link rel="import" href="x-foo.html">
<!-- Document-level stylesheet -->
<style>
  p {
    font-family: sans-serif;
    color: blue;
  }
</style>
<p>I'm blue.</p>
<p><x-foo></x-foo></p>
```

### Style the host element


The element to which shadow DOM is attached is known as the host. To style the host, use the `:host` selector.

Inheritable properties of the host element will inherit down the shadow tree, where they apply to the shadow children.

[See it on Plunker](http://plnkr.co/edit/7771DvsQ3iPWnn2gEIf8?p=preview)

`x-foo.html` { .caption}
```html
<dom-module id='x-foo'>
  <template>
    <!-- Encapsulated, element-level stylesheet -->
    <style>
      :host {
        font-family: sans-serif;
        color: green;
        display: block;
        border: 1px solid;
      }
    </style>
    <p>I'm green.</p>
    <div>I'm green too.</div>
    <span>We're all green...</span>
  </template>
</dom-module>
```

`index.html` { .caption}
```html
<link rel="import" href="x-foo.html">
<x-foo></x-foo>
```

You can also style the host element from outside - for example, using a type selector:

[See it on Plunker](http://plnkr.co/edit/AHXFX0zeQTbO2rGELTbS?p=preview)

```css
x-foo {
	background-color: blue;
}
```

#### Use CSS selectors to style the host element

You can use CSS selectors to determine when and how to style the host. In this code sample:

* The selector `:host` matches any `<x-foo>` element
* The selector `:host(.blue)` matches `<x-foo>` elements of class `blue`
* The selector `:host(.red)` matches `<x-foo>` elements of class `red`
* The selector `:host(:hover)` matches `<x-foo>` elements when they are hovered over

[See it on Plunker](http://plnkr.co/edit/FsXnCAz65SR6fZ7YKuy6?p=preview)

`x-foo.html` { .caption}
```html
<dom-module id="x-foo">
  <template>
    <style>
      :host { font-family: sans-serif; }
      :host(.blue) {color: blue;}
      :host(.red) {color: red;}
      :host(:hover) {color: green;}
    </style>
    <p>Hi, from x-foo!</p>
  </template>
</dom-module>
```

`index.html` { .caption}
```html
<link rel="import" href="x-foo.html">

<x-foo class="blue"></x-foo>
<x-foo class="red"></x-foo>
```

Descendant selectors after `:host` match elements in the shadow tree. In this example, the CSS selector applies to any `p` element in the shadow tree if the host has class "warning":

[See it on Plunker](http://plnkr.co/edit/MRN9blKg6A3w8G0RkyJD?p=preview)

`x-foo.html` { .caption}
```html
<dom-module id="x-foo">
  <template>
    <style>
      :host(.warning) p {
        color: red;
      }
    </style>
    <p>Make this text red if x-foo has class "warning", and black otherwise.</p>
  </template>
</dom-module>
```

`index.html` { .caption}
```html
<link rel="import" href="x-foo.html">

<x-foo class="warning"></x-foo>
<x-foo></x-foo>
```

Styling with the `:host` selector is one of two instances where rules inside a shadow tree can affect an element outside a shadow tree. The second instance uses the `::slotted()` syntax to apply styling rules to distributed children. See [*Composition and slots* in Eric Bidelman's article on shadow DOM](https://developers.google.com/web/fundamentals/getting-started/primers/shadowdom#composition_slot) for more information.

### Style slotted content (distributed children)

You can create **slots** in an element's template that are populated at runtime. For more information on slots, see the documentation on [shadow DOM and composition](/2.0/docs/devguide/shadow-dom#shadow-dom-and-composition).

The basic syntax for incorporating slotted content looks like this:

[See it on Plunker](http://plnkr.co/edit/bNvOvQqCEmC4DaoeNtwZ?p=preview)

`x-foo.html` { .caption}
```html
<dom-module id="x-foo">
  <template>
    <h1>
      <slot name="title"></slot>
    </h1>
  </template>
  ...
</dom-module>
```

`index.html` { .caption}
```html
<link rel="import" href="x-foo.html">

<x-foo>
  <span slot="title">I'm a heading!</span>
</x-foo>
```

To style slotted content, use the `::slotted()` syntax.

**Note:** To work within the Shady CSS scoping shim limitations, and to ensure consistent cross-browser behavior, add a selector to the left of the `::slotted(.classname)` notation (for example, `p ::slotted(.classname)`.

`::slotted(*)` selects all slotted content:

[See it on Plunker](http://plnkr.co/edit/pb0D6r15jvvxYVWsZ95U?p=preview)

`x-foo.html` { .caption}
```html
<dom-module id="x-foo">
  <template>
    <style>
      p ::slotted(*), h1 ::slotted(*) {
        font-family: sans-serif;
        color:green;
      }
    </style>
    <h1>
      <div><slot name='heading1'></slot></div>
    </h1>
    <p>
      <slot name='para'></slot>
    </p>
  </template>
	...
</dom-module>
```

`index.html` { .caption}
```html
<link rel="import" href="x-foo.html">
<x-foo>
  <div slot="heading1">Heading 1. I'm green.</div>
  <div slot="para">Paragraph text. I'm green too.</div>
</x-foo>
```

[See it on Plunker](http://plnkr.co/edit/Xb4j1r4wEgGuyUM9huFV?p=preview)

You can select by element type:

`x-foo.html` { .caption}
```html
<dom-module id="x-foo">
  <template>
    <style>
      h1 ::slotted(h1) {
        font-family: sans-serif;
        color: green;
      }
      p ::slotted(p) {
        font-family: sans-serif;
        color: blue;
      }
    </style>
    <h1><slot name='heading1'></slot></h1>
    <p><slot name='para'></slot></p>
  </template>
  ...
</dom-module>
```

`index.html` { .caption}
```html
<link rel="import" href="x-foo.html">

<x-foo>
  <h1 slot="heading1">Heading 1. I'm green.</h1>
  <p slot="para">Paragraph text. I'm blue.</p>
</x-foo>
```

You can select by class:

[See it on Plunker](http://plnkr.co/edit/Ep8AVOHgiwQjtv8x5kwd?p=preview)

`x-foo.html` { .caption}
```html
<dom-module id="x-foo">
  <template>
    <style>
      p ::slotted(.green) {
        color:green;
      }
    </style>
    <p>
      <slot name='para1'></slot>
    </p>
    <p>
      <slot name='para2'></slot>
    </p>
  </template>
  ...
</dom-module>
```

`index.html`
```html
<link rel="import" href="x-foo.html">

<x-foo>
  <div slot="para1" class="green">I'm green!</div>
  <div slot="para1">I'm not green.</div>
  <div slot="para2" class="green">I'm green too.</div>
  <div slot="para2">I'm not green.</div>
</x-foo>
```

And you can select by slot name:

[See it on Plunker](http://plnkr.co/edit/PzypR0973pxg3fquWhco?p=preview)

`x-foo.html` { .caption}
```html
<dom-module id="x-foo">
  <template>
    <style>
      p ::slotted([slot=para1]) {
        color:green;
      }
    </style>
    <p>
      <slot name='para1'></slot>
    </p>
    <p>
      <slot name='para2'></slot>
    </p>
  </template>
  ...
</dom-module>
```

`index.html` { .caption}
```html
<link rel="import" href="x-foo.html">

<x-foo>
  <div slot="para1">I'm green.</div>
  <div slot="para2">I'm not green.</div>
</x-foo>
```

## Share styles between elements

### Use style modules {#style-modules}

The preferred way to share styles is with *style modules*. You can package up styles in a style module, and share them between elements.

To create a style module, wrap your style block in `<dom-module>` and `<template>` elements, like this:

```html
<dom-module id="my-style-module">
  <template>
    <style>
      <!-- Styles to share go here! -->
    </style>
  </template>
</dom-module>
```

When you create the element that will use the styles, include the style module in the opening tag of the style block:

```html
<dom-module id="new-element">
  <template>
    <style include="my-style-module">
      <!-- Any additional styles go here -->
    </style>
    <!-- The rest of your element template goes here -->
  </template>
</dom-module>
```

You'll most likely want to package the style module in its own html file. In that case, the element that uses the styles will need to import that file.

Here's an example:

[See it on Plunker](http://plnkr.co/edit/Cd9XdfAF0RNEw5MGOudE?p=preview)

`my-colors.html` { .caption}
```html
<!-- Define some custom properties in a style module. -->
<dom-module id='my-colors'>
  <template>
    <style>
      p.red {
        color: red;
      }
      p.green {
        color: green;
      }
      p.blue {
        color: blue;
      }
    </style>
  </template>
</dom-module>
```

`x-foo.html` { .caption}
```html
<!-- Import the styles from the style module my-colors -->
<link rel="import" href="my-colors.html">
<dom-module id="x-foo">
  <template>
    <!-- Include the imported styles from my-colors -->
    <style include="my-colors"></style>
    <p class="red">I wanna be red</p>
    <p class="green">I wanna be green</p>
    <p class="blue">I wanna be blue</p>
  </template>
  ...
</dom-module>
```

`index.html` { .caption}
```html
<link rel="import" href="x-foo.html">

<x-foo></x-foo>
```


### Use external stylesheets (deprecated) {#external-stylesheets}

**Deprecated feature.** This experimental feature is now deprecated in favor of
[style modules](#style-modules). It is still supported, but support will
be removed in the future.
{.alert .alert-info}

Polymer includes an experimental feature to support loading external stylesheets
that will be applied to the local DOM of an element.  This is typically
convenient for developers who like to separate styles, share common styles
between elements, or use style pre-processing tools.  The syntax is slightly
different from how stylesheets are typically loaded, as the feature leverages
HTML Imports (or the HTML Imports polyfill, where appropriate) to load the
stylesheet text such that it may be properly shimmed and/or injected as an
inline style.

To include a remote stylesheet that applies to your Polymer element's local DOM,
place a special HTML import `<link>` tag with `type="css"` in your 
`<dom-module>` that refers to the external stylesheet to load.

For example:

[See it on Plunker](http://plnkr.co/edit/7AvgX9jQApbJoWHbdPkI?p=preview)

`style.css` { .caption}
```css
.red { color: red; }
.green { color: green; }
.blue { color: blue; }
```

`x-foo.html` { .caption}
```html
<!-- Include the styles, and use them in x-foo. -->
<dom-module id="x-foo">
  <link rel="import" type="css" href="style.css">
  <template>
    <p class="red">I wanna be red</p>
    <p class="green">I wanna be green</p>
    <p class="blue">I wanna be blue</p>
  </template>
  ...
</dom-module>
```

`index.html` { .caption}
```html
<link rel="import" href="x-foo.html">

<x-foo></x-foo>
```

## Use `custom-style` in document-level styles {#custom-style}

Browsers that implement the current Shadow DOM v1 specifications will automatically encapsulate styles, scoping them to the elements in which they were defined.

Some browsers have not implemented the Shadow DOM v1 specifications. To make sure your apps and elements display correctly in these browsers, you'll need to use `custom-style` to ensure that styling information doesn't "leak" into the local DOM of your elements.

`custom-style` enables a set of polyfills that ensure that styles in your apps and elements behave as you would expect from the Shadow DOM v1 specifications, even in browsers that don't implement these specifications.

To ensure that your styles behave according to the Shadow DOM v1 specifications in all browsers, use `custom-style` when you define *document-level* styles. `custom-style` is not included with `Polymer.Element` and must be imported separately.
`custom-style` is included with the legacy `polymer.html` import.

*Note: You should only use `custom-style` to define styles for the main document. To define styles for an element's local DOM, just use a `<style>` block.*

### Examples

In the first code sample, the style for the `p` element “leaks” into Paragraph B in browsers that haven’t implemented the Shadow DOM v1 specs. In the second code sample, the developer has used `custom-style` to wrap the style block, preventing this leak.

[See it on Plunker](http://plnkr.co/edit/0o1zuMHgmt4novf2DS8z?p=preview)

`x-foo.html` { .caption}
```html
<dom-module id="x-foo">
  <template>
    <p>
      Paragraph B: I am in the shadow DOM of x-foo.
      If your browser implements the Shadow DOM v1 specs,
      I am black; otherwise, I'm red.
    </p>
  </template>
  ...
</dom-module>
```

`index.html` { .caption}
```html
<link rel="import" href="x-foo.html">
<style>
  p {
    color: red;
  }
</style>
<p>Paragraph A: I am in the main document. I am red.</p>

<x-foo></x-foo>
```

[See it on Plunker](http://plnkr.co/edit/yiD9XWPHaMjHaGGwu4V9?p=preview)

`x-foo.html` { .caption}
```html
<dom-module id="x-foo">
  <template>
    <p>Paragraph B: I am in the local DOM of x-foo. I am black on all browsers.</p>
  </template>
  ...
</dom-module>
```

`index.html` { .caption}
```html
<!-- import custom-style -->
<link rel="import" href="/bower_components/polymer/lib/elements/custom-style.html">
<link rel="import" href="x-foo.html">

<custom-style>
  <style>
    p {
      color: red;
    }
  </style>
</custom-style>
<p>Paragraph A: I am in the main DOM. I am red.</p>
<x-foo></x-foo>
```

### Syntax and compatibility

The syntax of `custom-style` has changed. In Polymer 2.x, `<custom-style>` is a wrapper element. You can use a hybrid syntax to ensure compatibility between Polymer 1.x and other versions.

Polymer 2.x { .caption}
```html
<custom-style>
  <style>
    p {
		...
    }
  </style>
</custom-style>
```

Hybrid (compatible with 1.x and 2.x) { .caption}
```html
<custom-style>
  <style is="custom-style">
    p {
		...
    }
  </style>
</custom-style>
```

Polymer 1.x { .caption}
```html
<style is="custom-style">
  p {
	  ...
  }
</style>
```

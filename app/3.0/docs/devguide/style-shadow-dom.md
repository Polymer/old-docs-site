---
title: Style an element's shadow DOM
---

<!-- toc -->

## Style your elements

Polymer supports DOM templating and the shadow DOM API. When you provide a DOM template for your custom element, Polymer then copies in the contents of the template you provided for your element.

Here's an example:

custom-element.js { .caption }

```js
...
static get template() {
  return html`
    <h1>Heading!</h1>
    <p>We are elements in <code>custom-element</code>'s local DOM.</p>
  `;
}
...
```

index.html { .caption }

```html
<head>
  <script type="module" src="custom-element.js"></script>
</head>
<body>
  <custom-element></custom-element>
</body>
```

[See it on Plunker](http://plnkr.co/edit/JooAma?p=preview)


The HTML elements in your template become children in your custom element's shadow DOM. Shadow DOM provides a mechanism for encapsulation, meaning that elements inside the shadow DOM don't match selectors outside the shadow DOM.

Likewise, styling rules in side the shadow DOM can't "leak" out to affect elements outside the shadow DOM.

Shadow DOM permits encapsulation of styling rules for custom elements. You can freely define styling information for your elements, such as fonts, text colors, and classes, without fear of the styles applying outside the scope of your element.

Here's an example:

custom-element.js { .caption}

```js
...
static get template() {
  return html`
    <!-- Encapsulated, element-level stylesheet -->
    <style>
      p {
        color: green;
      }
      .myclass {
        color: red;
      }
    </style>
    <p>I'm a shadow DOM child element of <code>custom-element</code>.</p>
    <p class="myclass">So am I.</p>
  `;
}
...
```

index.html { .caption }

```html
<head>
  <script type="module" src="custom-element.js"></script>
  <!-- Document-level stylesheet -->
  <style>
    .myclass {
      color: blue;
    }
  </style>
</head>
<body>
  <custom-element></custom-element>
  <p class="myclass">I am outside of <code>custom-element</code>. Because of encapsulation, <code>custom-element</code>'s styles won't leak to me.</p>
</body>
```

[See it on Plunker](http://plnkr.co/edit/NKuNTD?p=preview)

For a detailed explanation of shadow DOM as it applies to Polymer, see [Shadow DOM concepts](shadow-dom).

For an exploration of the shadow DOM v1 API, see [Shadow DOM v1: Self-Contained Web Components](https://developers.google.com/web/fundamentals/getting-started/primers/shadowdom).

### Use inheritance from document-level styles

When used in an HTML document, your element will still inherit any styling information that applies to its parent element:

custom-element.js { .caption}

```js
...
static get template() {
  return html`
    <div>
      I inherit styles from <code>custom-element</code>'s parent in the light DOM.
      I'm also sans-serif and blue.
    </div>
  `;
}
...
```

index.html { .caption }

```html
<head>
  <script type="module" src="custom-element.js"></script>
  <!-- Document-level stylesheet -->
  <style>
    p {
      font-family: sans-serif;
      color:blue;
    }
  </style>
</head>
<body>  
  <!-- This paragraph uses document-level styles: -->
  <p>I'm sans-serif and blue.</p>

  <!-- And the text within custom-element inherits style from the paragraph element: -->
  <p><custom-element></custom-element></p>
</body>
```

[See it on Plunker](http://plnkr.co/edit/jziXon?p=preview)

Styles declared inside shadow DOM will override styles declared outside of it:

custom-element.js { .caption}

```js
...
static get template() {
  return html`
    <!-- Encapsulated, element-level stylesheet
          overrides document-level stylesheet -->
    <style>
      p {
        font-family: sans-serif;
        color: green;
      }
    </style>
    <p>I'm green.</p>
  `;
}
...
```

index.html { .caption }

```html
<head>
  <script type="module" src="custom-element.js"></script>
  <!-- Document-level stylesheet -->
  <style>
    p { 
      font-family: sans-serif;
      color:blue;
    }
  </style>
</head>
<body>  
  <p>I'm blue.</p>
  <p><custom-element></custom-element></p>
</body>
```

[See it on Plunker](http://plnkr.co/edit/XDCXXG?p=preview)

### Style the host element


The element to which shadow DOM is attached is known as the host. To style the host, use the `:host` selector.

Inheritable properties of the host element will inherit down the shadow tree, where they apply to the shadow children.

custom-element.js { .caption}

```js
...
static get template() {
  return html`
    <!-- Encapsulated, element-level stylesheet -->
    <style>
      :host {
        font-family: sans-serif;
        color:green;
        display: block;
        border: 1px solid;
      }	
    </style>
    <p>I'm green.</p>
    <div>I'm green too.</div>
    <span>We're all green...</span>
  `;
}
...
```

index.html { .caption }

```html
<head>
  <script type="module" src="custom-element.js"></script>
</head>
<body>  
  <p><custom-element></custom-element></p>
</body>
```

[See it on Plunker](http://plnkr.co/edit/BByXie?p=preview)

#### Use CSS selectors to style the host element

You can use CSS selectors to determine when and how to style the host. In this code sample:

* The selector `:host` matches any `<custom-element>` element
* The selector `:host(.blue)` matches `<custom-element>` elements of class `blue`
* The selector `:host(.red)` matches `<custom-element>` elements of class `red`
* The selector `:host(:hover)` matches `<custom-element>` elements when they are hovered over

custom-element.js { .caption}

```js
...
static get template() {
  return html`
    <style>
      :host { font-family: sans-serif; }
      :host(.blue) {color: blue;}
      :host(.red) {color: red;}
      :host(:hover) {color: green;}
    </style>
    <p>Hi, from custom-element!</p>
  `;
}
...
```

index.html { .caption }

```html
<head>
  <script type="module" src="custom-element.js"></script>
</head>
<body>  
  <custom-element class="blue"></custom-element>
  <custom-element class="red"></custom-element>
</body>
```

[See it on Plunker](http://plnkr.co/edit/tbPBVG?p=preview)

Descendant selectors after `:host` match elements in the shadow tree. In this example, the CSS selector applies to any `p` element in the shadow tree if the host has class "warning":

custom-element.js { .caption}

```js
...
static get template() {
  return html`
    <style>
      :host(.warning) p {
        color:red;
      }
    </style>
    <p>Make this text red if x-foo has class "warning", and black otherwise.</p>
  `;
}
...
```

index.html { .caption }

```html
<head>
  <script type="module" src="custom-element.js"></script>
</head>
<body>  
  <custom-element class="warning"></custom-element>
  <custom-element></custom-element>
</body>
```

[See it on Plunker](http://plnkr.co/edit/U7BG6S?p=preview)

Styling with the `:host` selector is one of two instances where rules inside a shadow tree can affect an element outside a shadow tree. The second instance uses the `::slotted()` syntax to apply styling rules to distributed children. See [*Composition and slots* in Eric Bidelman's article on shadow DOM](https://developers.google.com/web/fundamentals/getting-started/primers/shadowdom#composition_slot) for more information.

### Style slotted content (distributed children)

You can create **slots** in an element's template that are populated at runtime. For more information on slots, see the documentation on [shadow DOM and composition](/2.0/docs/devguide/shadow-dom#shadow-dom-and-composition).

The basic syntax for incorporating slotted content looks like this:

custom-element.js { .caption}

```js
...
static get template() {
  return html`
    <h1><slot name="title"></slot></h1>
  `;
}
...
```

index.html { .caption }

```html
<head>
  <script type="module" src="custom-element.js"></script>
</head>
<body>  
  <custom-element><span slot="title">I'm a heading!</span></custom-element>
</body>
```

[See it on Plunker](http://plnkr.co/edit/e6m48f?p=preview)

To style slotted content, use the `::slotted()` syntax.

**Note:** To work within the Shady CSS scoping shim limitations, and to ensure consistent cross-browser behavior, add a selector to the left of the `::slotted(.classname)` notation (for example, `p ::slotted(.classname)`.

`::slotted(*)` selects all slotted content:

custom-element.js { .caption}

```js
...
static get template() {
  return html`
    <style>
      p ::slotted(*), h1 ::slotted(*) {
        font-family: sans-serif;
        color:green;
      }
    </style>
    <h1><div><slot name='heading1'></slot></div></h1>
    <p><slot name='para'></slot></p>
  `;
}
...
```

index.html { .caption }

```html
<head>
  <script type="module" src="custom-element.js"></script>
</head>
<body>  
  <custom-element>
      <div slot="heading1">Heading 1. I'm green.</div>
      <div slot="para">Paragraph text. I'm green too.</div>
    </custom-element>
</body>
```

[See it on Plunker](http://plnkr.co/edit/jMjMAY?p=preview)

You can select by element type:

custom-element.js { .caption}

```js
...
static get template() {
  return html`
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
  `;
}
...
```

index.html { .caption }

```html
<head>
  <script type="module" src="custom-element.js"></script>
</head>
<body>  
  <custom-element>
    <h1 slot="heading1">Heading 1. I'm green.</h1>
    <p slot="para">Paragraph text. I'm blue.</p>
  </custom-element>
</body>
```

[See it on Plunker](http://plnkr.co/edit/rt0jDx?p=preview)

You can select by class:

custom-element.js { .caption}

```js
...
static get template() {
  return html`
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
  `;
}
...
```

index.html { .caption }

```html
<head>
  <script type="module" src="custom-element.js"></script>
</head>
<body>  
  <custom-element>
    <div slot="para1" class="green">I'm green!</div>
    <div slot="para1">I'm not green.</div>
    <div slot="para2" class="green">I'm green too.</div>
    <div slot="para2">I'm not green.</div>
  </custom-element>
</body>
```

[See it on Plunker](http://plnkr.co/edit/po4cN3?p=preview)


And you can select by slot name:

custom-element.js { .caption}

```js
...
static get template() {
  return html`
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
  `;
}
...
```

index.html { .caption }

```html
<head>
  <script type="module" src="custom-element.js"></script>
</head>
<body>  
  <custom-element>
    <div slot="para1">I'm green.</div>
    <div slot="para2">I'm not green.</div>
  </custom-element>
</body>
```

[See it on Plunker](http://plnkr.co/edit/hR3I4w?p=preview)

### Style undefined elements

To avoid FOUC (flash of unstyled content), you might want to style custom elements before they are 
defined (that is, before the browser has attached their class definition to their markup tag). If 
you don't, the browser may not apply any styles to the element at first paint. Typically, you'll 
want to add styling for a few top-level elements so your application's layout displays while the 
element definitions are being loaded.

There is a specification for a `:defined` pseudo-class selector to target elements that have been 
defined, but the custom elements polyfill doesn't support this selector.

For a polyfill-friendly workaround, add an `unresolved` attribute to the element in markup. For 
example:

```html
<my-element unresolved></my-element>
```

Then style the unresolved element. For example:

```html
<style>
  my-element[unresolved] {
    height: 45px;
    text-align: center;
    ...
  }
</style>
```

Finally, remove the `unresolved` attribute in the element's `ready` callback:

```js
class MyElement extends PolymerElement(){
  ...
  ready(){
    super.ready();
    this.removeAttribute('unresolved');
    ...
  }
  ...
}
```

### Style directional text with the :dir() selector

The `:dir()` CSS selector allows for styling text specific to its orientation 
(right-to-left or left-to-right). See the [documentation on MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/:dir) for more information on the `:dir()`
selector.

The `DirMixin` provides limited support for the `:dir()` selector. Use of `:dir()` requires the
application to set the `dir` attribute on `<html>`. All elements will use the same direction.

Individual elements can opt-out of the global direction by setting the `dir` attribute
in HTML or in the `ready` callback, but the text direction of these elements must from then on be handled 
manually.

Setting `dir` on an ancestor (other than `html`) has no effect.

For elements that extend `PolymerElement`, add `DirMixin` to use
`:dir()` styling.

Here's an example use of the `:dir()` selector: 

`using-dir-selector.js` { .caption }

```js
import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';
import DirMixin from '@polymer/polymer/lib/mixins/dir-mixin.js';

class UsingDirSelector extends DirMixin(PolymerElement) {
  static get template() {
    return html`
      <style>
        :host {
          display: block;
          color: blue;
        }
        :host(:dir(rtl)) {
          color: green;
        }
      </style>
      ...
    `;
  }
}
customElements.define('using-dir-selector', UsingDirSelector);
```

`index.html` { .caption }

```html
<html lang="en" dir="rtl">
  <head>
    <script type="module" src="./using-dir-selector.js"></script>
  </head>
  <body>
    <using-dir-selector></using-dir-selector>
  </body>
</html>
```

## Share styles between elements

### Use style modules {#style-modules}

The preferred way to share styles is with *style modules*. You can package up styles in a style module, and share them between elements.

**The following process is a workaround.** While Polymer 3.0 does not use HTMLImports, style modules do. The following process is a workaround for this fact. This process may be updated as required.
{ .alert }

To create a style module:

1. Use JavaScript to create a `<dom-module>` element:

   ```js
   const styleElement = document.createElement('dom-module');
   ```

2. Set the `<dom-module>` element's `innerHTML` property to contain a `<template>` element that wraps a `<style>` block:

   ```js
   styleElement.innerHTML = 
    `<template>
      <style>
        /* Your shared styles go here */
      </style>
    </template>`;
  ```

3. Register your style module as an element: 

   ```js
   styleElement.register('style-element'); 
   ```

You'll most likely want to package the style module in its own JavaScript file. The element that uses the styles will need to import that file. For example:

```js
import './style-element.js';
```

When you create the element that will use the styles, include the style module in the opening tag of the style block:

```js
  static get template() {
    return html`
      <style include="style-element">
        <!-- Any additional styles go here -->
      </style>
      <!-- The rest of your element template goes here -->
    `;
  }
}
```

Here's a complete example:

index.html { .caption }

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <script type="module" src="custom-element.js"></script>
  </head>
  <body>
    <p>Style modules</p>
    <custom-element></custom-element>
    <p>are useful</p>
  </body>
</html>
```

custom-element.js { .caption }

```js
import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';
import './style-element.js';

class CustomElement extends PolymerElement {
  static get template() {
    return html`
      <!-- Include the styles defined in style-element.js (a style module): -->
      
      <style include="style-element">
        /* Additional styles can go here */
        code {
          font-family: "Lucida Console", Monaco, monospace;
        }
        /* So can styles that override the style module */
        p.overrideme {
          color: blue;
        }
      </style>
  
      <div>
        <p>Some styles for <code>custom-element.js</code> are defined in <code>style-element.js</code>, which is a <b>style module</b>.</p>
        <p class='overrideme'>Additional styles are defined in <code>custom-element.js</code>.</p> 
      </div>
    `;
  }
}
customElements.define('custom-element', CustomElement);
```

style-element.js { .caption }

```js
const styleElement = document.createElement('dom-module');
styleElement.innerHTML = 
  `<template>
    <style>
      div {
        background-color: var(--my-background-color, aliceblue);
        border: var(--my-border, 5px dashed);
        padding: var(--my-padding, 10px);
        margin: var(--my-margin, 50px);
        font-family: var(--my-font-family, sans-serif);
        color: var(--my-color, green);
        text-align: var(--my-text-align, right);
      }
      p.overrideme {
        color: red;
      }
    </style>
  </template>`;
styleElement.register('style-element');
```

[See it on Plunker](http://plnkr.co/edit/PNsZA1?p=preview)

## Use custom-style in document-level styles {#custom-style}

Browsers that implement the current Shadow DOM v1 specifications will automatically encapsulate styles, scoping them to the elements in which they were defined.

Some browsers have not implemented the Shadow DOM v1 specifications. To make sure your apps and elements display correctly in these browsers, you'll need to use `custom-style` to ensure that styling information doesn't "leak" into the local DOM of your elements.

`custom-style` enables a set of polyfills that ensure that styles in your apps and elements behave as you would expect from the Shadow DOM v1 specifications, even in browsers that don't implement these specifications.

To ensure that your styles behave according to the Shadow DOM v1 specifications in all browsers, use `custom-style` when you define *document-level* styles:

index.html { .caption }

```html
<custom-style>
  <style>
    /* Document-level styles go here */
  </style>
</custom-style>
```

`custom-style` is not included in the `@polymer/polymer/polymer-element.js` module. Import `custom-style` from `@polymer/polymer/lib/elements/custom-style.js`:

index.html { .caption }

```html
<head>
  <script src="./custom-element.js" type="module"> 
  <script src="../@polymer/polymer/lib/elements/custom-style.js" type="module"> 

  <custom-style>
    <style>
      /* Document-level styles go here */
    </style>
  </custom-style>
</head>
<body>
  <custom-element></custom-element>
</body>
```

**Don't use custom-style inside an element's template.** You should only use `custom-style` to define styles for the main document. To define styles for an element's shadow DOM, just use a `<style>` block. {.alert .alert-info}

### Examples

In the following code sample, the document-level style in index.html "leaks" into the shadow DOM of `<custom-element>` in browsers that haven’t implemented the Shadow DOM v1 specs.

custom-element.js { .caption}

```js
...
static get template() {
  return html`
    <p>
      Paragraph B: I am in the shadow DOM of <code>custom-element</code>. 
      If your browser implements the Shadow DOM v1 specs, 
      I am black; otherwise, I'm red.
    </p>
  `;
}
...
```

index.html { .caption}

```html
<head>
  <script type="module" src="./custom-element.js"></script>
  <style>
    p {
      color: red;
    }
  </style>
</head>
<body>
  <p>Paragraph A: I am in the main document. I am red.</p>
  <custom-element></custom-element>
</body>
```

[See it on Plunker](http://plnkr.co/edit/FJEC5C?p=preview)

In the following code sample, the developer has used `custom-style` to wrap the document-level style block in index.html, preventing the leak.

custom-element.js { .caption}

```js
...
static get template() {
  return html`
    <p>
      Paragraph B: I am in the shadow DOM of <code>custom-element</code>. Document-level styles in index.html are wrapped in a <code>custom-style</code> block to prevent them from leaking to me.
    </p>
  `;
}
...
```

index.html { .caption}

```html
<head>
  <script type="module" src="./custom-element.js"></script>
  <script type="module" src="./@polymer/polymer/lib/elements/custom-style.js"></script>

  <custom-style>
    <style>
      p {
        color: red;
      }
    </style>
  </custom-style>
</head>
<body>
  <p>Paragraph A: I am in the main document. I am red.</p>
  <custom-element></custom-element>
</body>
```

[See it on Plunker](http://plnkr.co/edit/M6RsuM?p=preview)
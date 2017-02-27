---
title: Encapsulated style with Polymer 2.0 and shadow DOM v1
---

<!-- toc -->

## Styling your elements

Polymer supports DOM templating and the shadow DOM API. When you use the `<dom-module>` and `<template>` blocks to template your custom element, Polymer attaches a shadow root to instances of this element. Polymer then copies in the contents of the template you provided for your element.
	
Here's an example:

[See it on Plunker](http://plnkr.co/edit/VPktVlI0PWMnYdYVsVBx?p=preview)

```html
<!-- Create a template for the custom element -->
<dom-module id='custom-element'>
  <template>
    <h1>Heading!</h1>
    <p>We are elements in custom-element's local DOM.</p>
  </template>
</dom-module>

<!-- Drop the custom element on the page -->
<custom-element></custom-element>

<!-- Register the element -->
<script>
  class CustomElement extends Polymer.Element {
    static get is() {
      return "custom-element";
    }
  }
  customElements.define(CustomElement.is, CustomElement);
</script>
```

The HTML elements in your template become children within your custom element's shadow DOM. Shadow DOM provides a mechanism for encapsulation, meaning that elements in side the shadow DOM are not accessible to styling rules external to the shadow DOM. 

Likewise, styling rules in side the shadow DOM can't "leak" out to affect elements outside the shadow DOM.

Shadow DOM permits encapsulation of styling rules for custom elements. You can freely define styling information for your elements, such as fonts, text colors, and classes, without fear of the styles applying outside the scope of your element.

Here's an example:

[See it on Plunker](http://plnkr.co/edit/cHSjdQTa0h6fWXAygkje?p=preview)

```html
<!-- Document-level stylesheet -->
<style>
	.myclass {
		color:blue;
	}
</style>
<dom-module id='x-foo'>
  <template>
    <!-- Encapsulated, element-level stylesheet -->
    <style>
		  p {
			  color:green;
		  }
		.myclass {
			color:red;
		}
	</style>
	  <p>I'm a shadow DOM child element of x-foo.</p>
	  <p class="myclass">So am I.</p>
  </template>
</dom-module>
<x-foo></x-foo>
<!-- The following paragraph uses the document-level stylesheet. -->
<p class="myclass">I have nothing to do with x-foo. Because of encapsulation, x-foo's styles won't leak to me.</p>
```

For a detailed explanation of shadowDOM as it applies to Polymer, see [arthur's article]().

For an exploration of the shadow DOM v1 API, see [Shadow DOM v1: Self-Contained Web Components](https://developers.google.com/web/fundamentals/getting-started/primers/shadowdom).

### Using inheritance from document-level styles

When used in an HTML document, your element will still inherit any styling information that applies to its parent element:

[See it on Plunker](http://plnkr.co/edit/cHSjdQTa0h6fWXAygkje?p=preview)

```html
<!-- Document-level stylesheet -->
<style>
p {
	font-family: sans-serif;
	color:blue;
}
</style>
</head>
<dom-module id='x-foo'>
  <template>
    <div>
      I inherit styles from x-foo's parent in the light DOM.
      I'm also sans-serif and blue.
    </div>
  </template>
</dom-module>

<!-- This paragraph uses document-level styles: -->
<p>I'm sans-serif and blue.</p>

<!-- And the text within x-foo inherits style from the paragraph element: -->
<p><x-foo></x-foo></p>
```

Styles declared inside shadow DOM will override styles declared outside of it:

[See it on Plunker](http://plnkr.co/edit/0Fid1Gupd0jk9jggAKuv?p=preview)

```html
<!-- Document-level stylesheet -->
<style>
	p { 
		font-family: sans-serif;
		color:blue;
    }
</style>
<dom-module id='x-foo'>
  <template>
    <!-- Encapsulated, element-level stylesheet -->
    <style>
		p {
			font-family: sans-serif;
			color:green;
		}
		</style>
		<p>I'm green.</p>
  </template>
</dom-module>

<p>I'm blue.</p>
<p><x-foo></x-foo></p> 
```

### Styling the host element


The element to which shadow DOM is attached is known as the host. To style the host, use the `:host` selector.

Inheritable properties of the host element will inherit down the shadow tree, where they apply to the shadow children.

[See it on Plunker](http://plnkr.co/edit/7771DvsQ3iPWnn2gEIf8?p=preview)

```html
<dom-module id="x-foo">
	<template>
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
<x-foo></x-foo>    
```

You can also style the host element from outside - for example, using a type selector:

[See it on Plunker](http://plnkr.co/edit/AHXFX0zeQTbO2rGELTbS?p=preview)

```html
x-foo {
	background-color: blue;
}
```

#### Using selectors 

You can use CSS selectors to determine when and how to style the host. In this code sample:

* The rule `:host { font-family: sans-serif; }` always matches `<x-foo>` elements
* The rule `:host(.blue) {color: blue;}` matches `<x-foo>` elements of class `blue`
* The rule `:host(.red) {color: red;}` matches `<x-foo>` elements of class `red`
* The rule `:host(:hover)` matches `<x-foo>` elements when they are hovered over

[See it on Plunker](http://plnkr.co/edit/FsXnCAz65SR6fZ7YKuy6?p=preview)

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
<x-foo class="blue"></x-foo>
<x-foo class="red"></x-foo>
```

Descendant selectors after `:host` match elements in the shadow tree. In this example, the CSS selector applies to any `p` element in the shadow tree if the host has class "warning":

[See it on Plunker](http://plnkr.co/edit/MRN9blKg6A3w8G0RkyJD?p=preview)

```html
<dom-module id="x-foo">
	<template>
		<style>
		:host(.warning) p {
			color:red;
		}
		</style>
    <p>Make this text red if x-foo has class "warning", and black otherwise.</p>
	</template>
</dom-module>
<x-foo class="warning"></x-foo>
<x-foo></x-foo>
```

Styling with the `:host` selector is one of two instances where rules inside a shadow tree can affect an element outside a shadow tree. The second instance uses the `::slotted()` syntax to apply styling rules to content populated from the main DOM at runtime.

### Styling slotted content (distributed children)

You can create slots in an element's template that are populated at runtime using this syntax:

[See it on Plunker](http://plnkr.co/edit/MRN9blKg6A3w8G0RkyJD?p=preview)

```html
<dom-module id="x-foo">
    <template>
        <h1><slot name='heading1'></slot></h1>
        <p><slot name='para'></slot></p>
    </template>
</dom-module>

<x-foo>
    <div slot="heading1">Heading!</div>
    <div slot="para">Paragraph text.</div>
</x-foo>
```

To style slotted content, use the `::slotted()` syntax.

`::slotted(*)` selects all slotted content:

[See it on Plunker](http://plnkr.co/edit/cGrbntuantGtqj7Poqft?p=preview)

```html
<dom-module id="x-foo">
    <template>
      <style>
        ::slotted(*) {
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
</dom-module>
<x-foo>
    <div slot="heading1">Heading 1. I'm green.</div>
    <div slot="para">Paragraph text. I'm green too.</div>
</x-foo>   
```

[See it on Plunkr](http://plnkr.co/edit/suVhRDAB5Rq7Q7T6zbMI?p=info)

You can select by element type:

```html
<dom-module id="x-foo">
	<template>
		<style>
		::slotted(h1) {
			font-family: sans-serif;
			color:green;
		}
		::slotted(p) { 
			font-family: sans-serif;
          color:blue;
      }
      </style>    
            <slot name='heading1'></slot>
            <slot name='para'></slot>
    </template>
</dom-module>
<x-foo>
    <h1 slot="heading1">Heading 1. I'm green.</h1>
    <p slot="para">Paragraph text. I'm blue.</p>
</x-foo>
```

You can select by class:

[See it on Plunker](http://plnkr.co/edit/Ep8AVOHgiwQjtv8x5kwd?p=preview)

```
<dom-module id="x-foo">
    <template>
      <style>
        ::slotted(.green) {
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
</dom-module>

<x-foo>
    <div slot="para1" class="green">I'm green!</div>
    <div slot="para1">I'm not green.</div>
    <div slot="para2" class="green">I'm green too.</div>
    <div slot="para2">I'm not green.</div>
</x-foo> 
```

And you can select by slot name:

[See it on Plunker](http://plnkr.co/edit/FnFLnownBJc0Ur8vC6dd?p=preview)

```
<dom-module id="x-foo">
    <template>
      <style>
        slot[name='para1']::slotted(*) {
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
</dom-module>

<x-foo>
    <div slot="para1">I'm green!</div>
    <div slot="para2">I'm not green.</div>
</x-foo> 
```

For more examples, see [Rob Dodson's Shadow DOM CSS Cheat Sheet](http://robdodson.me/shadow-dom-css-cheat-sheet/).

## Sharing styles

### Using style modules {#style-modules}

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
		<style include="my-style-module"></style>
		<!-- The rest of your element template goes here -->
	</template>
</dom-module>
```

Here's an example:

[See it on Plunker](http://plnkr.co/edit/Cd9XdfAF0RNEw5MGOudE?p=preview)

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
<!-- Include the styles, and use them in x-foo. -->
<dom-module id="x-foo">
    <template>
      <style include="my-colors"></style>
      <p class="red">I wanna be red</p>
      <p class="green">I wanna be green</p>
      <p class="blue">I wanna be blue</p>
    </template>
</dom-module>
<x-foo></x-foo>
```

### Using external stylesheets (deprecated) {#external-stylesheets}

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
place a special HTML import `<link>` tag with `type="css"` in your `<dom-
module>` that refers to the external stylesheet to load.

For example:

[See it on Plunker](http://plnkr.co/edit/7AvgX9jQApbJoWHbdPkI?p=preview)

```html
<dom-module id="my-awesome-button">
  <!-- special import with type=css used to load remote CSS
       Note: this style of importing CSS is deprecated -->
  <link rel="import" type="css" href="my-awesome-button.css">
  <template>
    ...
  </template>
</dom-module>
<my-awesome-button></my-awesome-button>
<script>
    class MyAwesomeButton extends Polymer.Element {
      static get is() {
        return "my-awesome-button";
      }
    }
    customElements.define(MyAwesomeButton.is, MyAwesomeButton);
</script>

## Third-party libraries that modify local DOM {#scope-subtree}

If you are using a third-party library that adds local DOM nodes to your
Polymer element, you may notice that styles on the element do not update
properly.

The correct way to add DOM nodes to a Polymer element's local DOM is via
the Polymer [DOM API](local-dom#dom-api). This API lets you manipulate
nodes in a way that respects the local DOM and ensures that styles are
updated properly.

When using third-party libraries that **do not use** the Polymer DOM
API, use the [`scopeSubtree`](/2.0/docs/api/Polymer.Base#method-scopeSubtree)
method to apply proper CSS scoping to a node and all of its descendants.

1.  Create a container node inside your element's local DOM, and have your
    third-party library create DOM under that container node.

    ```html
    <dom-module is="x-example">
      <template>
        <div id="container">
        </div>
      </template>
    </dom-module>
    ```
	
2.  Call `scopeSubtree` on the container node.

    ```js
    ready: function() {
      this.scopeSubtree(this.$.container, true);
    }
    ```

    `containerNode` is the root node of the tree you wish to scope. Setting
    the second argument to `false` scopes the specified node and descendants
    **once.** Setting it to `true` enables a mutation observer that applies CSS
    scoping whenever `containerNode` or any of its descendants are modified.

**Not for use on Polymer elements.** If the subtree that you scope
contains any Polymer elements with local DOM, `scopeSubtree` will
cause the descendants' local DOM to be styled incorrectly.
{.alert .alert-error}

## Styling at the document level
	
Browsers that implement the current Shadow DOM v1 specifications will automatically encapsulate styles, scoping them to the elements in which they were defined.

Some browsers have not implemented the Shadow DOM v1 specifications. To make sure your apps and elements display correctly in these browsers, you'll need to use `custom-style` to ensure that styling information doesn't "leak" into the local DOM of your elements.

The `custom-style` extension enables a set of polyfills that ensure that styles in your apps and elements behave as you would expect from the Shadow DOM v1 specifications, even in browsers that don't implement these specifications.

`custom-style` is an extension of the native `<style>` element. To ensure that your styles behave according to the Shadow DOM v1 specifications in all browsers, use `custom-style` when you define *document-level* styles.

*Note: You should only use `custom-style` to define styles for the main document. To define styles for an element's local DOM, just use a `<style>` block.*

### Examples

In the first code sample, the style for the `p` element “leaks” into Paragraph B in browsers that haven’t implemented the Shadow DOM v1 specs. In the second code sample, the developer has used `custom-style` to wrap the style block, preventing this leak.

[See it on Plunker](http://plnkr.co/edit/0o1zuMHgmt4novf2DS8z?p=preview)

```html
  <style>
    p {
      color: red;
    }
  </style>
  <p>Paragraph A: I am in the main DOM. I am red.</p>
  <dom-module id="x-foo">
    <template>
      <p>Paragraph B: I am in the local DOM of x-foo. 
         If your browser implements the Shadow DOM v1 specs, 
         I am black; otherwise, I'm red.
      </p>
    </template>
  </dom-module>
  <x-foo></x-foo>   
```	

[See it on Plunker](http://plnkr.co/edit/yiD9XWPHaMjHaGGwu4V9?p=preview)
```html
  <custom-style>
  <style>
      p {
        color: red;
      }
    </style>
  </custom-style>
  <p>Paragraph A: I am in the main DOM. I am red.</p>
  <dom-module id="x-foo">
    <template>
      <p>Paragraph B: I am in the local DOM of x-foo. I am black on all browsers.</p>
    </template>
  </dom-module>
  <x-foo></x-foo>   
```
  
### Syntax and compatibility

#### Polymer 2.x
```html
<custom-style>
  <style>
    p {
		...
    }
  </style>
</custom-style>
````
#### Compatibility between 1.x and 2.x
```html
<custom-style>
  <style is="custom-style">
    p {
		...
    }	
  </style>
</custom-style>
``````
#### Polymer 1.x
```html
<style is="custom-style">
  p {
	  ...
  }
</style>
```

### `custom-style` and custom properties

In a DOM module template, you can define custom properties to be used by Polymer's shim for cross-scope styling. Then, use an `include` attribute in a `style` tag to share that style data between multiple custom-style elements. 

To make sure they behave correctly in all browsers, wrap the `<style>` block in `<custom-style>` tags.

http://plnkr.co/edit/jnxXvhNIHKe6jLdG99ir?p=preview

```html
<!-- Define some custom properties in a style module. -->
<dom-module id='my-colors'>
  <template>
    <style>
      :root {
        --my-red: red;
        --my-green: green;
        --my-blue: blue;
      }
    </style>
  </template>
</dom-module>

<!-- 
  * Create document-level styles using the custom properties 
    defined in the style module.
  * To make sure they behave correctly in all browsers, wrap the <style> 
    block in <custom-style> tags.
-->  
<custom-style>
  <style include="my-colors">
    p.red {
      color: var(--my-red);
    }
    p.green {
      color: var(--my-green);
    }
    p.blue {
      color: var(--my-blue);
    }
  </style>
</custom-style>

<p class="red">I wanna be red</p>
<p class="green">I wanna be green</p>
<p class="blue">I wanna be blue</p>
```

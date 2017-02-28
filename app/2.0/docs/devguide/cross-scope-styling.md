---
title: Use custom properties
---

<!-- toc -->

The author of a Polymer element can provide custom CSS properties that you can use to style the appearance of the element in your application.

Custom properties allow CSS authors to define cascading CSS variables, which are accepted by all CSS properties.

CSS variables can be used outside the context of custom elements, simply as a way to avoid scattering style data throughout a stylesheet. A CSS author assigns values to a custom property, and then uses the `var()` function to use these values elsewhere in the stylesheet.

This makes editing your CSS much easier and less prone to author error.

For example, the [`<paper-checkbox>` element](https://www.webcomponents.org/element/PolymerElements/paper-checkbox) provides custom properties for styling the colors, spacing and size of the checkbox and its label. 

As a developer, you can use these properties to style `<paper-checkbox>` elements in your applications.

When you create your own custom elements, you can use custom properties to build an interface for the users of your element so they can style it.

### Using a custom properties API to style an element

To use the interface of custom properties provided by an element author, look at the element's API documentation.

For a good example, visit the [`<paper-checkbox>` API documentation](https://beta.webcomponents.org/element/PolymerElements/paper-checkbox/paper-checkbox)

This code sample inserts a `<paper-checkbox>` element with its default styling:

[See it on Plunker](http://plnkr.co/edit/if8IardvWBwZ2uMZIlgI?p=preview)

```html
<base href="//polygit2.appspot.com/components/">
<link rel="import" href="polymer/polymer.html">
<script src="webcomponentsjs/webcomponents-lite.js"></script>
<link rel="import" href="paper-checkbox/paper-checkbox.html">

<paper-checkbox>Check me</paper-checkbox>
```

Notice that:

* The checkbox label defaults to Times New Roman. This is true of any web page with no style info.
* The checkbox receives default colors from the paper-element theme.

The style properties of the `<paper-checkbox>` element are configurable with the custom CSS properties that the element author has provided for us.

To use a custom property of a custom element, create a style rule using this syntax:

```html
paper-checkbox {
  --paper-checkbox-checked-color: red;
}
```

[See it on Plunker](http://plnkr.co/edit/u41sHRHAWtYiYyjWnFlP?p=preview)

The paper elements provide a consistent way to configure styles across elements when using the paper element set, with variables.

We can use variables to configure the custom CSS properties in `<paper-checkbox>`:

```html
<style is="custom-style">
  p {
    color: var(--paper-red-500);
  }
  paper-checkbox {
    --paper-checkbox-checked-color: var(--paper-red-500);
  }
</style>
```

## Creating custom properties

Rather than exposing the details of an element's internal implementation for
theming, an element author defines one or more custom CSS
properties as part of the element's API.

These custom properties can be defined similarly to other standard CSS properties
and will inherit from the point of definition down the composed DOM tree,
similar to the effect of `color` and `font-family`.

In the simple example below, the author of `<my-toolbar>` identified the need for
users of the toolbar to be able to change the color of the toolbar title.  The
author exposed a custom property called `--my-toolbar-title-color` which is
assigned to the `color` property of the selector for the title element.  Users
of the toolbar may define this variable in a CSS rule anywhere up the tree, and
the value of the property will inherit down to the toolbar where it is used if
defined, similar to other standard inheriting CSS properties.

Example: { .caption }

```html
<dom-module id="my-toolbar">
  <template>
    <style>
      :host {
        padding: 4px;
        background-color: gray;
      }
      .title {
        color: var(--my-toolbar-title-color);
      }
    </style>
    <span class="title">{{title}}</span>
  </template>
  <script>
    class MyToolbar extends Polymer.Element {
      static get is() {
        return "my-toolbar";
      }
    }
    customElements.define(MyToolbar.is, MyToolbar);
</script>
</dom-module>
```

Example usage of `<my-toolbar>`: { .caption }

```html
<dom-module id="my-element">
  <template>
    <style>
      /* Make all toolbar titles in this host green by default */
      :host {
        --my-toolbar-title-color: green;
      }
      /* Make only toolbars with the .warning class red */
      .warning {
        --my-toolbar-title-color: red;
      }
    </style>
    <my-toolbar title="This one is green."></my-toolbar>
    <my-toolbar title="This one is green too."></my-toolbar>
    <my-toolbar class="warning" title="This one is red."></my-toolbar>
  </template>
  <script>
    class MyElement extends Polymer.Element {
      static get is() {
        return "my-element";
      }
    }
    customElements.define(MyElement.is, MyElement);
  </script>
</dom-module>
```

The `--my-toolbar-title-color` property only affects the color of the title
element encapsulated in `<my-toolbar>`'s internal implementation.  In the
future the `<my-toolbar>` author can rename the `title` class or
restructure the internal details of `<my-toolbar>` without changing the custom
property exposed to users.

You can also include a default value in the `var()` function, to use in case the user
doesn't set the custom property:

```css
color: var(--my-toolbar-title-color, blue);
```

To include a default value that is a custom property, use this syntax:

```css
color: var(--my-color, var(--my-default-color))
```

Thus, custom CSS properties are a powerful way for element authors to
expose a theming API to their users in a way that naturally fits right alongside
normal CSS styling. 

### Custom CSS mixins

It may be tedious (or impossible) for an element author to predict every
CSS property that may be important for theming, let alone expose every
property individually.

CSS mixins are a proposal to fill this gap in functionality. To use CSS mixins, import the CSS mixins polyfill:

```html
<!-- import CSS mixins polyfill -->
<link rel="import" href="/bower_components/shadycss/apply-shim.html">
```

For backward compatibility, the `polymer.html` import includes the CSS mixins polyfill. No extra import is required when defining hybrid elements.

Using CSS mixins, an element author can define a set of CSS properties as a single custom property and then allow all properties in the set to be applied to a specific CSS rule
in an element's shadow DOM. The extension enables this with a mixin capability
that is analogous to `var`, but which allows an entire set of properties
to be mixed in.

Use `@apply` to apply a mixin:

<pre><code class="language-js">@apply(--<var>mixin-name</var>);</code></pre>

Defining a mixin is just like defining a custom property, but the
value is an object that defines one or more rules:

<pre><code class="language-css"><var>selector</var> {
  --<var>mixin-name</var>: {
    /* rules */
  };
}</code></pre>

Example: { .caption }

```html
<dom-module id="my-toolbar">
  <template>
    <style>
      :host {
        padding: 4px;
        background-color: gray;
        /* apply a mixin */
        @apply(--my-toolbar-theme);
      }
      .title {
        @apply(--my-toolbar-title-theme);
      }
    </style>
    <span class="title">{{title}}</span>
  </template>
  ...
</dom-module>
```

Example usage of `my-toolbar`: { .caption }

```html
<dom-module id="my-element">
  <template>
    <style>
      /* Apply custom theme to toolbars */
      :host {
        --my-toolbar-theme: {
          background-color: green;
          border-radius: 4px;
          border: 1px solid gray;
        };
        --my-toolbar-title-theme: {
          color: green;
        };
      }
      /* Make only toolbars with the .warning class red and bold */
      .warning {
        --my-toolbar-title-theme: {
          color: red;
          font-weight: bold;
        };
      }
    </style>
    <my-toolbar title="This one is green."></my-toolbar>
    <my-toolbar title="This one is green too."></my-toolbar>
    <my-toolbar class="warning" title="This one is red."></my-toolbar>
  </template>	
  <script>
    class MyElement extends Polymer.Element {
      static get is() {
        return "my-element";
      }
    }
    customElements.define(MyElement.is, MyElement);
  </script>		
</dom-module>
```

## Inheritance

If an element doesn't override styling information, that element inherits styles from its parent:

```html
<link rel="import" href="components/polymer/custom-style.html">
<custom-style>
  <style is="custom-style">
    p {
      color: var(--paper-red-900);
      font-family: Sans-serif;
    }
    paper-checkbox {
      --paper-checkbox-checked-color: var(--paper-red-900);
    }
  </style>
</custom-style>
<body>
	<p><paper-checkbox>Check me</paper-checkbox></p>
</body>
```

## Global styles

Create global styles by styling the the html element of your document:

```html
<link rel="import" href="components/polymer/custom-style.html">
<custom-style>
  <style is="custom-style">
    html {
      font-family: Sans-serif;
      --my-color: var(--paper-red-900);
      color: var(--my-color);
    }
    paper-checkbox {
      --paper-checkbox-checked-color: var(--my-color);
    }
  </style>
</custom-style>
```

Note that the font family is inherited, but the text color is not. This is because `<paper-checkbox>` overrides the text color.

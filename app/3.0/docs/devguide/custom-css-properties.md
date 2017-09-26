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

### Use a custom properties API to style an element

To use the interface of custom properties provided by an element author, look at the element's API documentation.

For a good example, visit the [`<paper-checkbox>` API documentation](https://www.webcomponents.org/element/PolymerElements/paper-checkbox/paper-checkbox)

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

## Create custom properties

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

### Use custom CSS mixins

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

<pre><code class="language-css">@apply --<var>mixin-name</var>;</code></pre>

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
        @apply --my-toolbar-theme;
      }
      .title {
        @apply --my-toolbar-title-theme;
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

## Use CSS inheritance

If an element doesn't override styling information, that element inherits styles from its parent:

```html
<link rel="import" href="components/polymer/lib/elements/custom-style.html">
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

## Create global styles

Create global styles by styling the the html element of your document:

```html
<link rel="import" href="components/polymer/lib/elements/custom-style.html">
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

### Custom property API for Polymer elements {#style-api}

Polymer's custom property shim evaluates and applies custom property values once
at element creation time.  In order to have an element (and its subtree) re-
evaluate custom property values due to dynamic changes such as application of
CSS classes, call the [`updateStyles`](/2.0/docs/api/elements/Polymer.Element#method-updateStyles)
method on the element. To update _all_ elements on the page, you can also call
`Polymer.updateStyles`.

`updateStyles` can take a object with property/value pairs to update the current values of
custom properties.

Example: { .caption }

```html
<dom-module id="x-custom">
  <template>
    <style>
      :host {
        --my-toolbar-color: red;
      }
    </style>
    <my-toolbar>My awesome app</my-toolbar>
    <button on-tap="changeTheme">Change theme</button>
  </template>
  <script>
    class XCustom extends Polymer.Element {
      static get is() {
        return "x-custom";
      }
      static get changeTheme() {
        return function() {
        this.updateStyles({
          '--my-toolbar-color': 'blue',
        });
      }
    }
    customElements.define(XCustom.is, XCustom);
  </script>
</dom-module>
```

```html
this.updateStyles({
  '--some-custom-style': 'green',
  '--another-custom-style': 'blue'
});
```

Occasionally an element needs to get the value of a custom property at runtime. This is handled
slightly differently depending on whether the shady CSS polyfill is loaded:

```js
if (ShadyCSS) {
  style = ShadyCSS.getComputedStyleValue(this, '--something');
} else {
  style = getComputedStyle(this).getPropertyValue('--something');
}
```

Elements using the legacy API can use the
[`getComputedStyleValue`](/2.0/docs/api/mixins/Polymer.LegacyElementMixin#method-getComputedStyleValue)
instance method instead of testing for `ShadyCSS`.


### Custom properties shim limitations

Cross-platform support for custom properties is provided in Polymer by a
JavaScript library that **approximates** the capabilities of the CSS Variables
specification  *for the specific use case of theming custom elements*, while
also extending it to add the capability to mixin property sets to rules as
described above. For performance reasons, Polymer **does
not attempt to replicate all aspects of native custom properties.**
The shim trades off aspects of the full dynamism possible in CSS in the
interests of practicality and performance.

Below are current limitations of the shim. Improvements to performance and
dynamism will continue to be explored.

#### Dynamism limitations

Only property definitions which match the element at *creation time* are applied.
Any dynamic changes that update property values are not applied automatically. You
can force styles to be re-evaluated by calling the
[`updateStyles`](/{{{polymer_version_dir}}}/docs/api/elements/Polymer.Element#method-updateStyles) method on a
Polymer element, or `Polymer.updateStyles` to update all element
styles.

For example, given this markup inside an element:

HTML: { .caption }

```html
<div class="container">
  <x-foo class="a"></x-foo>
</div>
```

CSS: { .caption }

```css
/* applies */
x-foo.a {
  --foo: brown;
}
/* does not apply */
x-foo.b {
  --foo: orange;
}
/* does not apply to x-foo */
.container {
  --nog: blue;
}
```

After adding class `b` to `x-foo` above, the host element must call `this.updateStyles`
to apply the new styling. This re-calculates and applies styles down the tree from this point.

Dynamic effects **are** reflected at the point of a property's application.

For the following example, adding/removing the `highlighted` class on the `#title` element will
have the desired effect, since the dynamism is related to *application* of a custom property.

```css
#title {
  background-color: var(--title-background-normal);
}

#title.highlighted {
  background-color: var(--title-background-highlighted);
}
```

#### Inheritance limitations

Unlike normal CSS inheritance which flows from parent to child, custom
properties in Polymer's shim can only change when inherited by a custom element
from rules that set properties in scope(s) above it, or in a `:host` rule for
that scope.  **Within a given element's local DOM scope, a custom property can
only have a single value.**  Calculating property changes within a scope would be
prohibitively expensive for the shim and is not required to achieve cross-scope
styling for custom elements, which is the primary goal of the shim.

```html
<dom-module id="my-element">
  <template>
    <style>
     :host {
       --custom-color: red;
     }
     .container {
       /* Setting the custom property here will not change */
       /* the value of the property for other elements in  */
       /* this scope.                                      */
       --custom-color: blue;
     }
     .child {
       /* This will be always be red. */
       color: var(--custom-color);
     }
    </style>
    <div class="container">
      <div class="child">I will be red</div>
    </div>
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

#### Styling distributed elements not supported

The custom properties shim doesn't support styling distributed elements.

```css
/* Not supported */
:host ::slotted(div) {
  --custom-color: red;
}
```

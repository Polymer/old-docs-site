---
title: Use custom properties
---

<!-- toc -->

Custom CSS properties allow you to define a CSS variable and use it in your styles. 

## Basic syntax for custom CSS properties 

To set the value of a custom CSS property:

```css
element {
  --custom-color: blue;
}
```

To use the custom CSS property to create a style:

```css
element {
  color: var(--custom-color);
}
```

You can use custom CSS properties outside of the context of custom elements, simply as a way to avoid scattering style data throughout a stylesheet. For example:

```html
<html>
  <head>
    <style>
      /* Set the values of some custom CSS properties */
      html {
        --theme-dark-blue: #0d47a1;
        --theme-light-blue: #e3f2fd;
        --theme-wide-padding: 24px;
        --theme-font-family: Roboto, Noto, sans-serif;
      }
      /* Use the custom CSS properties to create styles */
      div {
        background-color: var(--theme-light-blue);
        color: var(--theme-dark-blue);
        padding: var(--theme-wide-padding);
        border:1px solid var(--theme-dark-blue);
        font-family: var(--theme-font-family);
      }
    </style>
  </head>
  <body>
    <div><p>Demonstrating basic use of custom properties</p></div>
  </body>
</html>
```

[See it on Plunker](http://plnkr.co/edit/AjZm3o?p=preview)

In the code sample above, the visual theme can be changed by editing the values of the custom properties. This makes it easier to create consistent themes, and your code will be less prone to error.

## Use the custom CSS properties provided by a Polymer element

The author of a Polymer element can provide custom CSS properties that you can use to style the appearance of the element in your application. This way, you don't need to know how the element's code works.

For example, suppose someone has authored two elements, `<flex-container>` and `<flex-item>`, which can be used together to create layouts in columns or rows, like so:

```html
<flex-container>
  <flex-item>flex item 1</flex-item>
  <flex-item>flex item 2</flex-item>
  <flex-item>flex item 3</flex-item>
</flex-container>
```

In the documentation for `flex-container`, you notice that the author has provided a custom CSS property, `--flex-direction`, to control whether the `flex-items` are laid out in a column or a row. You can assign your own value to `--flex-direction` in your app:

index.html { .caption}

```html
<html>
  <head>
    <script type="module" src="./flex-container.js">
    <script type="module" src="./flex-item.js">
    <!-- custom-style element invokes the custom properties polyfill -->
    <script type="module" src="./node_modules/@polymer/polymer/lib/elements/custom-style.js"></script>
    
    <!-- ensure that custom props are polyfilled on browsers that don't support them -->
    <custom-style>
      <style>
        html {
          /* Set a value for the custom CSS property --flex-direction */
          --flex-direction: column
        }
      </style>
    </custom-style>
  </head>
  <body>
    <flex-container>
      <flex-item>flex item 1</flex-item>
      <!-- ... -->
      <flex-item>flex item n</flex-item>
    </flex-container>
  </body>
</html>
```

[See it in Plunker](http://plnkr.co/edit/7eZqv8?p=preview)

**Custom CSS properties inherit.** In the code sample above, the value of `--flex-direction` is set in the `html` CSS rule. Since `flex-container` is a child of `html`, `flex-container` inherits this value.
{.alert}

To find out about the custom CSS properties an element provides, see the element's documentation. 

For examples of Polymer elements that provide extensive styling options with custom CSS properties, see the [API documentation for the `paper-ui-elements`](https://www.webcomponents.org/collection/PolymerElements/paper-ui-elements).

## Provide custom CSS properties to users of your elements

When you create Polymer elements, you can use custom CSS properties in your style rules. Users of your elements can then set values for the custom CSS properties, and control the appearance of your elements without needing to know how your code works.

For example, suppose you are creating two elements, `<flex-container>` and `<flex-item>`, which can be used together to create layouts in columns or rows:

```html
<flex-container>
  <flex-item>flex item 1</flex-item>
  <flex-item>flex item 2</flex-item>
  <flex-item>flex item 3</flex-item>
</flex-container>
```

You can use a custom CSS property to control the flex direction of `<flex-container>`: 

flex-container.js (your code) { .caption }

```js
/* ... */
class FlexContainer extends PolymerElement {
  static get template () {
    return html`
      <style>
        :host {
          display: flex;
          flex-direction: var(--flex-direction);
        }
      </style>
      <!-- ... -->
    `;
  }
}
/* ... */
```

[See it in Plunker](http://plnkr.co/edit/7eZqv8?p=preview)

Users can then assign their own value to `--flex-direction` like so:

index.html (user's code) { .caption }

```html
...
<style>
  html {
    --flex-direction: column
  }
</style>
...
```

If you provide documentation for the custom properties your element provides, users don't need to know any implementation details. See [Documenting your elements](/{{{polymer_version_dir}}}/docs/tools/documentation) for more information, or take a look at the [documentation for the Polymer `paper-ui-elements`](https://www.webcomponents.org/collection/PolymerElements/paper-ui-elements) for examples.

### Create default values for your CSS properties 

You may want to provide default values for the CSS properties you use in your styles.

To set a default value for a CSS property, use the following syntax:

```css
div {
  background-color: var(--theme-background, #e3f2fd);
}
```

To use a default value that is itself a custom property, use the following syntax:

```css
div {
  background-color: var(--theme-background, var(--default-light-blue));
}
```

## Inheritance and global styles

Custom CSS properties inherit down the DOM hierarchy. In the code sample below, `<custom-element>` will inherit the custom properties defined for `div`, but not the custom properties defined for `span`.

```html
<html>
  <head>
    <!-- custom-style element invokes the custom properties polyfill -->
    <script type="module" src="node_modules/@polymer/polymer/lib/elements/custom-style.js"></script>

    <!-- ensure that custom props are polyfilled on browsers that don't support them -->
    <custom-style>
      <style>
        div {
          /* flex-container is a child of div and will inherit these */
          --theme-dark-blue: #0d47a1;
          --theme-light-blue: #e3f2fd;
          color: var(--theme-dark-blue);
          background-color: var(--theme-light-blue);
        }
        span {
          /* flex-container is not a child of span and will not inherit these */
          --theme-wide-padding: 24px;
          --theme-font-family: Roboto, Noto, sans-serif;
          padding: var(--theme-wide-padding);
          font-family: var(--theme-font-family);
        }
      </style>
    </custom-style>
  </head>
  <body>
    <div>
      <flex-container>
        <flex-item>flex item 1</flex-item>
        <flex-item>flex item 2</flex-item>
        <flex-item>flex item 3</flex-item>
      </flex-container>
    </div>
    <span>
      <p>hello i am in a span</p>
    </span>
  </body>
</html>
```

[See it on Plunker](http://plnkr.co/edit/mHpf7L?p=preview)

You can use inheritance to define global custom CSS properties. In the code sample below, all nodes inherit the custom CSS properties defined for the top-level `html` element: 

index.html { .caption}

```html
...
<custom-style>
  <style>
    html {
      --theme-dark-blue: #0d47a1;
      --theme-light-blue: #e3f2fd;
      --theme-wide-padding: 24px;
      --theme-font-family: Roboto, Noto, sans-serif;

      color: var(--theme-dark-blue);
      background-color: var(--theme-light-blue);
      padding: var(--theme-wide-padding);
      font-family: var(--theme-font-family);
    }
  </style>
</custom-style>
...
<div>
  <flex-container>
    <flex-item>flex item 1</flex-item>
    <flex-item>flex item 2</flex-item>
    <flex-item>flex item 3</flex-item>
  </flex-container>
</div>
<span>
  <p>hello i am in a span</p>
</span>
...
```

[See it on Plunker](http://plnkr.co/edit/7rbXJY?p=preview)

Child elements that inherit global CSS properties can override them. For example, in the code sample above, `<flex-item>` inherited its custom CSS properties and fonts from the document-level styles for `html`. `<flex-item>` can override these properties:

flex-item.js {.caption}

```js
static get template () {
  return html`
    <style>
      :host {
        flex-grow: 1;
        --theme-font-family: Georgia, serif;
        font-family: var(--theme-font-family);
      }
    </style>
  `;
}
```

[See it on Plunker](http://plnkr.co/edit/vlO7GV?p=preview)

## Use custom CSS mixins

Using CSS mixins, you can define a set of CSS properties as a single custom property.

This is similar to defining a custom property with `var()`, but the value of the property is an object that defines one or more rules:

```css
selector {
  --mixin-name: {
    /* rules */
  };
}
```

Use `@apply` to apply a mixin:

```css
selector {
  @apply --mixin-name;
}
```

Suppose we have two custom elements, `<flex-container>` and `<flex-item>`, which can be used together to create row or column layouts.

The author of the two elements uses a CSS mixin to apply theming information to both elements:

flex-container.js {.caption}

```js
// import the @apply shim
import '@webcomponents/shadycss/entrypoints/apply-shim.js';

static get template() {
  return html`
    <style>
      :host {
        display: flex;
        flex-direction: --flex-direction;
        @apply --flex-theme;
      }
    </style>
    ...
  `;
}
```

flex-item.js { .caption}

```js
// import the @apply shim
import '@webcomponents/shadycss/entrypoints/apply-shim.js';

static get template() {
  return html`
    <style>
      :host {
        flex-grow: var(--flex-grow, 1);
        /* Apply a CSS mixin */
        @apply --flex-theme;
      }
    </style>
    ...
  `;
}
```

[See it on Plunker](http://plnkr.co/edit/glgUKv?p=preview)

Users of `flex-item` can set values for the properties in the mixin:  

index.html {.caption}

```html
<script type="module" src="@polymer/polymer/lib/elements/custom-style.js"></script>

<custom-style>
  <style>
    html {
      /* Set global theme colors */
      --theme-dark-blue: #0d47a1;
      --theme-light-blue: #e3f2fd;
      --theme-wide-padding: 24px;
      --theme-font-family: Roboto, Noto, sans-serif;
      
      /* Set flex options */
      --flex-direction: column;
      --flex-grow: 0;

      /* Set values for CSS mixin */
      --flex-theme: {
        border: 1px solid var(--theme-dark-blue);
        font-family: var(--theme-font-family);
        padding: var(--theme-wide-padding);
        background-color: var(--theme-light-blue);
      };
    }
  </style>
</custom-style>
```

Note that any element using the `@apply` syntax must import the `@apply` polyfill:

```js
// import CSS mixins polyfill
import '@webcomponents/shadycss/entrypoints/apply-shim.js';
```

[See it in Plunker](http://plnkr.co/edit/glgUKv?p=preview)

### Custom property API for Polymer elements {#style-api}

Polymer's custom property shim evaluates and applies custom property values once
at element creation time. In order to have an element (and its subtree) re-
evaluate custom property values due to dynamic changes such as application of
CSS classes, call the [`updateStyles`](/3.0/docs/api/polymer-element#PolymerElement-method-updateStyles)
method on the element. To update _all_ elements on the page, you can also call
`Polymer.updateStyles`.

`updateStyles` can take a object with property/value pairs to update the current values of
custom properties.

Example { .caption }

```js
class XCustom extends PolymerElement {
  static get changeTheme() {
    return function() {
      this.updateStyles({
        '--my-toolbar-color': 'blue',
      });
    }
  }
  static template get (){
    return html`
      <style>
        :host {
          --my-toolbar-color: red;
        }
      </style>
      <my-toolbar>My awesome app</my-toolbar>
      <button on-tap="changeTheme">Change theme</button>
    `;
  }
}
customElements.define('x-custom', XCustom);
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
[`getComputedStyleValue`](/3.0/docs/api/legacy/legacy-element-mixin#LegacyElementMixin-method-getComputedStyleValue)
instance method instead of testing for `ShadyCSS`.

### Custom properties shim limitations

Cross-platform support for custom properties is provided in Polymer by a
JavaScript library that **approximates** the capabilities of the CSS Variables
specification *for the specific use case of theming custom elements*, while
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
[`updateStyles`](/{{{polymer_version_dir}}}/docs/api/polymer-element#PolymerElement-method-updateStyles) method on a
Polymer element, or the global `updateStyles` function to update all element
styles.

For example, given this markup inside an element:

HTML { .caption }

```html
<div class="container">
  <x-foo class="a"></x-foo>
</div>
```

CSS { .caption }

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
The global `updateStyles` function re-calculates all custom property values on the page:

<!-- TODO: update import when https://github.com/Polymer/polymer/issues/5219 is resolved -->

```js
import { updateStyles } from '@polymer/polymer/lib/mixins/element-mixin.js';
updateStyles();
```

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
that scope. **Within a given element's local DOM scope, a custom property can
only have a single value.** Calculating property changes within a scope would be
prohibitively expensive for the shim and is not required to achieve cross-scope
styling for custom elements, which is the primary goal of the shim.

```js
class MyElement extends PolymerElement {
  static template get () {
    return html`
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
      `;
  }
  customElements.define('my-element', MyElement);
}
```

#### Styling distributed elements not supported

The custom properties shim doesn't support styling distributed elements.

```css
/* Not supported */
:host ::slotted(div) {
  --custom-color: red;
}
```

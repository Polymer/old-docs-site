---
title: "Step 5: Theming with custom CSS properties"
subtitle: "Build your first Polymer element"
---

<!-- toc -->

You now have a button that's basically functional. But it's stuck using the
existing text color for both pressed and unpressed states. What if you want to
get a little flashier?

Shadow DOM helps prevent users from styling your element's internals by accident.
To allow users to style your component, you can use _custom CSS properties_. Polymer
provides a custom CSS property implementation inspired by the
[CSS Custom Properties for Cascading Variables](http://www.w3.org/TR/css-variables/) specification.

You apply a custom property inside your element using the `var` function.

<pre><code>background-color: var(<em>--my-custom-property</em>, <em>defaultValue</em>);</pre></code>

Where <code>--<em>my-custom-property</em></code> is a custom property name, always starting with two dashes (`--`), and <code><em>defaultValue</em></code> is an (optional) CSS value that's used if the custom property isn't set.

## Add new custom property values

Edit your element's `<style>` tag and replace the `fill` and `stroke`
values with custom properties:

icon-toggle.js: Before  { .caption }

```html
  <style>
    /* local styles go here */
    :host {
      display: inline-block;
    }
    iron-icon {
      fill: rgba(0,0,0,0);
      stroke: currentcolor;
    }
    :host([pressed]) iron-icon {
      fill: currentcolor;
    }
  </style>
```

icon-toggle.js: After  { .caption }

```html
  <style>
    /* local styles go here */
    :host {
      display: inline-block;
    }
    iron-icon {
      fill: var(--icon-toggle-color, rgba(0,0,0,0));
      stroke: var(--icon-toggle-outline-color, currentcolor);
    }
    :host([pressed]) iron-icon {
      fill: var(--icon-toggle-pressed-color, currentcolor);
    }
  </style>
```

Because of the default values, you can still style the `<icon-toggle>` just by
setting `color`, but now you have other options.

From the `demo` folder, open up `demo-element.js` and set the new properties.

demo-element.js: Before { .caption }

```html
    <style>
      :host {
        font-family: sans-serif;
      }
    </style>
```

demo-element.js: After { .caption }

```html
    <style>
      :host {
        font-family: sans-serif;
        --icon-toggle-color: lightgrey;
        --icon-toggle-outline-color: black;
        --icon-toggle-pressed-color: red;
      }
    </style>
```

Run the demo again to get colorful.


<img src="/images/3.0/first-element/toggles-styled.png" alt="Demo showing
icon toggles with star and heart icons. Pressed icons are red.">

That's it — your element is finished. You've created an element that has a basic
UI, API, and custom styling properties.

If you have any trouble getting the element working, check out the
[finished version](https://github.com/PolymerLabs/polymer-3-first-element/tree/master/icon-toggle-finished).

If you'd like to learn a little more about custom properties, read on.

## Extra credit: set custom properties at the document level

Frequently you want to define custom property values at the document level, to
set a theme for an entire application, for example. Because custom properties
aren't built into most browsers yet, you need to use a special `custom-style`
tag to define custom properties outside of a Polymer element. Try
adding the following code inside the `<head>` tag of your `index.html` file:

```html
<custom-style>
  <style>
    /* Define a document-wide default—will not override a :host rule in  */
    html {
      --icon-toggle-outline-color: red;
    }
    /* Override the value specified in demo-element */
    demo-element {
      --icon-toggle-pressed-color: blue;
    }
    /* This rule does not work! */
    body {
      --icon-toggle-color: purple;
    }
  </style>
</custom-style>
```

Key information:

*   The `demo-element` selector matches the `demo-element` element, and
    has a **higher specificity** than the `html` rule inside `demo-element`,
    so it overrides the values there.

*   Custom properties can **only** be defined in rule-sets that match the `html`
    selector **or a Polymer custom element.** This is a limitation
    of the Polymer implementation of custom properties.

Run the demo again, and you'll notice that the pressed buttons are now blue,
but **the main color and outline color haven't changed.**

The `--icon-toggle-color` property doesn't get set because it can't be applied
to the `body` tag. Try moving this rule into the `demo-element` block to see
it applied.

The `html` rule-set creates a document-wide default value for `--icon-toggle-outline-color`.
But this value is overridden by the corresponding rule inside the `demo-element`
element. To see this default value at work, comment out the corresponding rule in
`demo-element.js`:

demo-element.js { .caption }

```html
    <style>
      :host {
        font-family: sans-serif;
        --icon-toggle-color: lightgrey;
        /* --icon-toggle-outline-color: black; */
        --icon-toggle-pressed-color: red;
      }
    </style>
```

Finally, note that to match a selector in the `custom-style`, the element must
be **in the document scope**—for example, in `index.html`, not inside another
element's shadow DOM. For example, these rules do **not** work inside the
`custom-style`:

```css
    iron-icon {
      --iron-icon-width: 40px;
      --iron-icon-height: 40px;
    }
```

That's because the `iron-icon` elements on the page are inside another element's
shadow DOM. However, since custom properties inherit down the tree, you can set
these properties at the document level to set the size for all `iron-icon`
elements on the page:

```css
    html {
      --iron-icon-width: 40px;
      --iron-icon-height: 40px;
    }
```

For more information, see the documentation on [custom CSS properties](https://www.polymer-project.org/3.0/docs/devguide/custom-css-properties).

Ready to get started on your own element? You can use the Polymer CLI to
[Create an element project](/3.0/docs/tools/polymer-cli#element).

You can also see the [Build an app](/3.0/start/toolbox/set-up)
tutorial to get started on an app using the Polymer App Toolbox.

Or review the previous section:

<a class="blue-button" href="step-4">
  Previous Step: React to input
</a>

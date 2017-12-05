---
title: "Step 2: Add Shadow DOM"
subtitle: "Build your first Polymer element"
---

<!-- toc -->

Next, you'll create a simple element that displays an icon.

In this step, you'll learn about:

*   Creating a custom element using Polymer.
*   Working with shadow DOM.

_Shadow DOM_ is the set of DOM elements managed by your element. You'll learn more
about it in this section.

Read more about shadow DOM concepts in our developer documentation: [Shadow DOM concepts](https://www.polymer-project.org/2.0/docs/devguide/shadow-dom)

## Edit icon-toggle.html

Open `icon-toggle.html `. This file contains the skeleton of a custom element.

Unlike most HTML files, this file <em>won't display anything if you load it in a
browser</em>—it just <em>defines</em> a new element. The demo imports
`icon-toggle.html` so it can use the `<icon-toggle>`
element. As you add features to the element in the following steps, they'll show
up in the demo.

Start by taking a look at the existing code:


Starting code—HTML imports { .caption }

```html
<link rel="import" href="../polymer/polymer-element.html">
<link rel="import" href="../iron-icon/iron-icon.html">
```

Key information:

*   The `link rel="import"` element is an <em>HTML import</em>, a
    way of including resources in an HTML file.
*   These lines import the Polymer library and another custom element called
    `iron-icon` that you'll use later in this step.

**Learn more: HTML Imports.** See [HTML Imports: #include for the web](http://www.html5rocks.com/en/tutorials/webcomponents/imports/)
on HTML5Rocks.com for an in-depth discussion of HTML Imports.
{ .alert .alert-info }

Next is the definition of the element itself:

Starting code—shadow DOM template { .caption }

```html
<dom-module id="icon-toggle">
  <template>
    <style>
      /* shadow DOM styles go here */
      :host {
        display: inline-block;
      }
    </style>
    <!-- shadow DOM goes here -->
    <span>Not much here yet.</span>
  </template>
```

Key information:

*   The `<dom-module>` tag wraps an element's shadow DOM definition.
    In this case, the `id` attribute shows that this module includes the
    shadow DOM for an element called `icon-toggle`.
*   The `<template>` actually defines the element's shadow DOM structure and
    styling. This is where you'll add markup for your custom element.
*   The `<style>` element inside the `<template>` lets you
    define styles that are <em>scoped</em>  to the shadow DOM, so they don't
    affect the rest of the document.
*   The `:host` pseudo-class matches the custom element you're
    defining (in this case, the `<icon-toggle>`). This is the element
    that contains or <em>hosts </em>the shadow DOM tree.

**Learn more: Shadow DOM.** Shadow DOM
lets you add a <em>scoped</em> DOM tree inside an element, with local styles and
markup that are decoupled from the rest of the web page. Shadow DOM is based on
the Shadow DOM specification, and works with native shadow DOM where available.
To learn more, see <a href="/2.0/docs/devguide/shadow-dom">Shadow 
DOM Concepts</a> in the Polymer library docs.
{ .alert .alert-info }

At the end of the element definition is some JavaScript that registers the
element. If the element has a `<dom-module>`, this script is usually placed
<em>inside</em> the `<dom-module>` to keep everything together.


Starting code—element registration { .caption }

```html
<script>
  class IconToggle extends Polymer.Element {
    static get is() {
      return "icon-toggle";
    }
    constructor() {
      super();
    }
  }
  customElements.define(IconToggle.is, IconToggle);
</script>
```

Key information:

  * Polymer uses ES6 class syntax. With this code, you extend the base Polymer.Element class to create your own:

    ```
    class IconToggle extends Polymer.Element {...}
    ```

  * You then give your new element a name, so that the browser can recognize it when you use it in tags. This name must match the `id` given in your element's template definition (`<dom-module id="icon-toggle">`).
    
    ```
    static get is() {
      return "icon-toggle";
    }
    ```

  * The element has a constructor:
    
    ```
    constructor() {
      super();
    }
    ```
    
    At the moment, this constructor does nothing. It is included here as a placeholder since we'll use it later.
	
  * At the end of the script, this line calls the "define" method from the Custom Elements API to register your element: 
    
    ```
    customElements.define(IconToggle.is, IconToggle);
    ```

### Create the shadow DOM structure

Now that you're familiar with the basic layout of the element, add something
useful to its shadow DOM template.

Find the `<span>` below the  `shadow DOM goes here` comment:

icon-toggle.html—before { .caption }

```html
    <!-- shadow DOM goes here -->
    <span>Not much here yet.</span>
  </template>
```

 Replace the `<span>` and its contents with the `<iron-icon>` tag below:

icon-toggle.html—after { .caption }

```html
    <!-- shadow DOM goes here -->
    <iron-icon icon="polymer">
    </iron-icon>
  </template>
```

Key information:

  * The `<iron-icon>` element is a custom element that renders an icon. Here it's hard-coded to use
an icon named "polymer".

### Style the shadow DOM

There are a number of new CSS selectors to work with shadow DOM. The `icon-toggle.html ` file already includes a `:host` selector, discussed earlier, to style the top-level `<icon-toggle>` element.

To style the `<iron-icon>` element, add CSS rules inside the `<style>` tag after the existing content.

icon-toggle.html: Before { .caption }

```html
    <style>
      /* shadow DOM styles go here */
      :host {
        display: inline-block;
      }
    </style>
```

icon-toggle.html: After { .caption }

```html
    <style>
      /* shadow DOM styles go here */
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

Key information:

*   The `<iron-icon>` tag uses an SVG icon. The `fill`
    and `stroke` properties are SVG-specific CSS properties. They
    set the fill color and the outline color for the icon, respectively.

*   The `:host()` function matches the host element <em>if the
    selector inside the parentheses matches the host element</em>. In this
    case, `[pressed]`is a standard CSS attribute selector, so this
    rule matches when the `icon-toggle` has a `pressed`
    attribute set on it.

Your custom element definition should now look like this:

icon-toggle.html { .caption }

```html
<link rel="import" href="../polymer/polymer-element.html">
<link rel="import" href="../iron-icon/iron-icon.html">
<dom-module id="icon-toggle">
  <template>
    <style>
      /* shadow DOM styles go here */
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
    <!-- shadow DOM goes here -->
    <iron-icon icon="polymer"></iron-icon>
  </template>
  <script>
    class IconToggle extends Polymer.Element {
      static get is() {
      return "icon-toggle";
      }
      constructor() {
        super();
      }
    }
    customElements.define(IconToggle.is, IconToggle);
  </script>
</dom-module>
```

Make sure `polymer serve` is running and reload the demo page. You should see the toggle buttons show up with the hard-coded icon.

<img src="/images/2.0/first-element/hardcoded-toggles.png" alt="Demo showing icon toggles displaying Polymer icon">

You'll notice that one toggle is styled as pressed, because the `pressed`
attribute is set in the demo. But click all you want, the button won't toggle
yet; there's no code to change the `pressed` property.

**If you don't see the new toggles,** double-check your file against the code above. If you see a blank page, make
sure you're clicking on the demo folder or on demo/index.html.
{ .alert .alert-info }

<a class="blue-button" href="intro">Previous step: Intro</a>
<a class="blue-button"
    href="step-3">Next step: Use data binding and properties</a>

---
title: "Step 2: Add Local DOM"
link: first-element/step-2
---

Next, you'll create a simple element that displays an icon.

In this step, you'll learn about:

*   Creating a custom element using Polymer.
*   Working with local DOM.

_Local DOM_ is the set of DOM elements managed by your element. You'll learn more
about it in this section.

**Local DOM? Shadow DOM?** If you're familiar with _shadow DOM_, a new proposed
web standard, local DOM is just a generic term for the same concept. Polymer's
local DOM works with or without native shadow DOM support.
{ .alert .alert-info }

## Edit icon-toggle.html

Open `icon-toggle.html `. This file contains the skeleton of a custom element.

Unlike most HTML files, this file <em>won't display anything if you load it in a
browser</em>—it just <em>defines</em> a new element. The demo imports
`icon-toggle.html` so it can use the `<icon-toggle>`
element. As you add features to the element in the following steps, they'll show
up in the demo.

Start by taking a look at the existing code:


#### Starting code—HTML imports

```html
<link rel="import" href="../polymer/polymer.html">
<link rel="import" href="../iron-icon/iron-icon.html">
```

Key information:

*   The `link rel="import"` element is an <em>HTML import</em>, a new
    way of including resources in an HTML file.
*   These lines import the Polymer library and another custom element called
    `iron-icon` that you'll use later in this step.

**Learn more: HTML Imports.** See [HTML Imports: #include for the web](http://www.html5rocks.com/en/tutorials/webcomponents/imports/)
on HTML5Rocks.com for an in-depth discussion of HTML Imports.
{ .alert .alert-info }

Next is the definition of the element itself:

#### Starting code—local DOM template



```html
<dom-module id="icon-toggle">
  <template>
    <style>
      /* local styles go here */
      :host {
        display: inline-block;
      }
    </style>
    <!-- local DOM goes here -->
    <span>Not much here yet.</span>
  </template>
```

Key information:

*   The `<dom-module>` tag wraps an element's local DOM definition.
    In this case, the `id` attribute shows that this module includes the
    local DOM for an element called `icon-toggle`.
*   The `<template>` actually defines the element's local DOM structure and
    styling. This is where you'll add markup for your custom element.
*   The `<style>` element inside the `<template>` lets you
    define styles that are <em>scoped</em>  to the local DOM, so they don't
    affect the rest of the document.
*   The `:host` pseudo-class matches the custom element you're
    defining (in this case, the `<icon-toggle>`). This is the element
    that contains or <em>hosts </em>the local DOM tree.

**Learn more: local DOM.** Local DOM
lets you add a <em>scoped</em> DOM tree inside an element, with local styles and
markup that are decoupled from the rest of the web page. Local DOM is based on
the proposed Shadow DOM specification, and works with native shadow DOM where available.
To learn more, see <a href="/1.0/docs/devguide/local-dom.html">Local
DOM</a> in the Polymer library docs.
{ .alert .alert-info }

At the end of the element definition is some JavaScript that registers the
element. If the element has a `<dom-module>`, this script is usually placed
<em>inside</em> the `<dom-module>` to keep everything together.


#### Starting code—element registration


```html
  <script>
    Polymer({
      /* this is the element's prototype */
      is: 'icon-toggle'
    });
  </script>
</dom-module>
```


Key information:

  * The `Polymer` call <em>registers</em> the element so it's recognized by the browser.
  * The argument to the Polymer call is the new element's prototype. You'll do more
with this in a later step.
  * The `is` property on the prototype is the new element's name. It has to <em>match</em> the `id` on the `<dom-module>` that contains the element's template.

### Create the local DOM structure

Now that you're familiar with the basic layout of the element, add something
useful to its local DOM template.

Find the `<span>` below the  `local DOM goes here` comment:

#### icon-toggle.html—before


```html
    <!-- local DOM goes here -->
    <span>Not much here yet.</span>
  </template>
```

 Replace the `<span>` and its contents with the `<iron-icon>` tag below:

#### icon-toggle.html—after


```html
    <!-- local DOM goes here -->
    <iron-icon icon="polymer">
    </iron-icon>
  </template>
```

Key information:

  * The `<iron-icon>` element is a custom element that renders an icon. Here it's hard-coded to use
an icon named "polymer".

### Style the local DOM

There are a number of new CSS selectors to work with local DOM. The `icon-toggle.html `file already includes a `:host` selector, discussed earlier, to style the top-level `<icon-toggle>` element.

To style the `<iron-icon>` element, add the following CSS inside the `<style>` tag after the existing content:

#### icon-toggle.html


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

#### icon-toggle.html


```html
<link rel="import" href="../polymer/polymer.html">
<link rel="import" href="../iron-icon/iron-icon.html">
<dom-module id="icon-toggle">
  <template>
    <style>
      /* local DOM styles go here */
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
    <!-- local DOM goes here -->
    <iron-icon icon="polymer">
    </iron-icon>
  </template>
  <script>
  Polymer({
    is: 'icon-toggle',
  });
  </script>
</dom-module>
```

Run the demo. If you're using Polyserve, make sure Polyserve is running and
reload the demo page.

If you're using Plunker, your changes should show up immediately.
If they don't, you may need to click **Stop** followed by **Run** to
refresh the preview.

You should see the toggle buttons show up with the hard-coded icon.

<img src="/images/1.0/first-element/hardcoded-toggles.png" alt="Demo showing icon toggles displaying Polymer icon">

You'll notice that one toggle is styled as pressed, because the `pressed`
attribute is set in the demo. But click all you want, the button won't toggle
yet; there's no code to change the `pressed` property.


**If you don't see the new toggles,** double-check your file against the code above. If you see a blank page, make
sure you're clicking on the demo folder or on demo/index.html.
{ .alert .alert-info }

<a class="blue-button" href="intro">Previous step: Intro</a>
<a class="blue-button"
    href="step-3">Next step: Use data binding and properties</a>

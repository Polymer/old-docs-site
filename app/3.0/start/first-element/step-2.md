---
title: "Step 2: Add Local DOM"
subtitle: "Build your first Polymer element"
---

<!-- toc -->

Next, you'll create a simple element that displays an icon.

You'll learn how to create a custom element using Polymer, and work with
its shadow DOM. _Shadow DOM_ is the set of DOM elements managed by your element. You'll
learn more about it in this section.

Read more about shadow DOM concepts in our developer documentation: [Shadow DOM concepts](https://www.polymer-project.org/3.0/docs/devguide/shadow-dom)

In this step, you'll:

1. [Examine the starting code in `icon-toggle.js`](#examine), and learn fundamental 
   concepts to help you work with Polymer.
2. [Edit `icon-toggle.js`](#edit) to add a pre-built custom element to your code and style
   your own custom element.

## Examine the starting code in icon-toggle.js {#examine}

Open `icon-toggle.js`. This file contains the class definition for a custom element.

The demo imports `icon-toggle.js` so it can use the `<icon-toggle>`
element. As you add features to the element in the following steps, they'll show
up in the demo.

Start by taking a look at the existing code. We'll break it down into four sections:

  1. [Imports](#imports)
  2. [The Polymer html template tag](#tag)
  3. [The new element's class definition](#classdefinition)
  4. [The `template` function](#templatefunc)

### Imports {#imports}

Starting code-imports { .caption }

```js
import {Element as PolymerElement} from "../node_modules/@polymer/polymer/polymer-element.js"
import "../node_modules/@polymer/iron-icon/iron-icon.js"
```

Key information:

*   These lines import the Polymer library and another custom element called
    `iron-icon` that you'll use later in this step.
*   `polymer-element.js` exports the `Element` object. `icon-toggle.js` imports 
    this export and renames it to `PolymerElement` for clarity.
*   `iron-icon.js` is a prebuilt element that displays an icon. Importing it 
    allows you to use the following syntax in the element you are building: 
    ```html
    <iron-icon></iron-icon>
    ```
    `iron-icon.js` does not export an object. Instead of importing an object 
    from `iron-icon.js`, the import statement in this case simply runs its code. 

See the documentation on [ES6 imports](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import) for more information.

### The Polymer html template tag {#tag}

Next is the following statement: 

```js
export const html = Polymer.html;
```

The template of our new element is defined in a method called `static get template()`, which 
we will soon examine. To be correctly processed by Polymer, the `template` getter must 
return an `HTMLTemplateElement`. The line of code above assigns the Polymer html template
tag to the variable `html`. We will return `html` when we have built the template for our
new element.

Returning a variable called `html` from the `template` function also enables HTML syntax
highlighting in many text editors, which makes writing your new templates much easier.

**TODO: improve the above explanation**

### Your new element's class definition {#classdefinition}

Next follows the element's class definition: 

Starting code—class definition { .caption }
```js
class IconToggle extends PolymerElement {
  
  constructor() {
    super();
  }

  static get template () {
    // Element template omitted in this high-level summary
  }
}

customElements.define('icon-toggle', IconToggle);
```

Key information:

  * Polymer uses ES6 class syntax. With this code, you extend the base `PolymerElement` class to create your own:

    ```
      class IconToggle extends PolymerElement {
    ```

  * The element has a constructor:
    
    ```js
    constructor() {
      super();
    }
    ```
    
    At the moment, this constructor does nothing. It is included here as a placeholder since
    we'll use it later.

  * The `template` function defines the new element's local DOM structure and styling. This
    is where you'll add markup for your custom element. The contents of the `template`
    function are ommitted here for clarity, but we'll look at this function in a moment.
	
  * At the end of the script, the following line calls the "define" method from the Custom Elements API to register your element: 
    
    ```
    customElements.define('icon-toggle', IconToggle);
    ```
  
    This tells the browser that `<icon-toggle>` is an element, and can now be used in markup.

### The template function {#templatefunc}

Now let's look at the contents of the `template` function, in which the new element's
local DOM is defined:

Starting code—template function { .caption }
```html
static get template () {
    return html`
      <style>
        /* shadow DOM styles go here */
        :host {
          display: inline-block;
        }
      </style>

      <!-- shadow DOM goes here -->
      <span>Not much here yet.</span>
    `
  }
```

Key information:

*   The function returns a `<template>` which actually defines the element's local 
    DOM structure and styling. You'll add markup for your custom element to the return
    value of this function.
*   The `<style>` element inside the `<template>` lets you
    define styles that are <em>scoped</em>  to the local DOM, so they don't
    affect the rest of the document.
*   The `:host` pseudo-class matches the custom element you're
    defining (in this case, the `<icon-toggle>`). This is the element
    that contains or <em>hosts </em>the local DOM tree.

**Learn more: Shadow DOM.** Shadow DOM
lets you add a <em>scoped</em> DOM tree inside an element, with local styles and
markup that are decoupled from the rest of the web page. Shadow DOM is based on
the Shadow DOM specification, and works with native shadow DOM where available.
To learn more, see <a href="/3.0/docs/devguide/shadow-dom">Shadow 
DOM Concepts</a> in the Polymer library docs.
{ .alert .alert-info }

## Edit icon-toggle.js {#edit}

Now that you're familiar with the basic layout of the element, add something
useful to its local DOM template.

### Add an iron-icon element to your code

Find the `<span>` below the  `shadow DOM goes here` comment:

icon-toggle.js—before { .caption }

```html
    <!-- shadow DOM goes here -->
    <span>Not much here yet.</span>
```

Replace the `<span>` and its contents with the `<iron-icon>` tag below:

icon-toggle.js—after { .caption }

```html
    <!-- shadow DOM goes here -->
    <iron-icon icon="polymer">
    </iron-icon>
```

Key information:

  * The `<iron-icon>` element is a custom element that renders an icon. Here it's hard-coded
  to use an icon named "polymer".

### Style the local DOM

There are a number of new CSS selectors to work with shadow DOM. The `icon-toggle.js ` file already includes a `:host` selector, discussed earlier, to style the top-level `<icon-toggle>` element.

To style the `<iron-icon>` element, add CSS rules inside the `<style>` tag after the existing content.

icon-toggle.js: Before { .caption }

```html
    <style>
      /* shadow DOM styles go here */
      :host {
        display: inline-block;
      }
    </style>
```

icon-toggle.js: After { .caption }

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

icon-toggle.js { .caption }

```js
import {Element as PolymerElement} from "../node_modules/@polymer/polymer/polymer-element.js"
import "../node_modules/@polymer/iron-icon/iron-icon.js"

export const html = Polymer.html;

class IconToggle extends PolymerElement {
  
  constructor() {
    super();
  }

  static get template () {
    return html`
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
      <iron-icon icon="polymer">
      </iron-icon>
    `
  }
}

customElements.define('icon-toggle', IconToggle);
```

Make sure `polymer serve` is running and reload the demo page. You should see the toggle buttons show up with the hard-coded icon.

<img width="400px" src="/images/3.0/first-element/hardcoded-toggles.png" alt="Demo showing icon toggles displaying Polymer icon">

You'll notice that one toggle is styled as pressed, because the `pressed`
attribute is set in the demo. But click all you want, the button won't toggle
yet; there's no code to change the `pressed` property.

**If you don't see the new toggles,** double-check your file against the code above. If you
see a blank page, make sure you're clicking on the demo folder or on demo/index.html.
{ .alert .alert-info }

<a class="blue-button" href="intro">Previous step: Intro</a>
<a class="blue-button"
    href="step-3">Next step: Use data binding and properties</a>
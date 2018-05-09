---
title: "Step 2: Add shadow DOM"
subtitle: "Build your first Polymer element"
---

<!-- toc -->

_Shadow DOM_ is the set of DOM elements managed by your element. You'll learn more about it in this section.

[Read more about shadow DOM concepts in our developer docs](/{{{polymer_version_dir}}}/docs/devguide/shadow-dom).

## Step 2: Add shadow DOM

In this step, you'll:

* [Take a look at the starting code](#examine).
* [Add an existing custom element to your code](#add).
* [Style your custom element](#style).

### Take a look at the starting code {#examine}

From the top-level folder, open `icon-toggle.js`. This file defines a new custom element, `<icon-toggle>`. We'll break down the code in `icon-toggle.js` into sections:

  *  [Importing the Polymer library and the `<iron-icon>` element](#imports).
  *  [Extending the `PolymerElement` base class](#classdefinition).
  *  [Defining an element template](#templatefunc).
  *  [Overriding the class constructor](#constructor).
  *  [Registering the `<icon-toggle>` element with the browser](#register).

#### Importing the Polymer library and the iron-icon element {#imports}

The first lines in `icon-toggle.js` import the Polymer library and an existing custom element called `iron-icon`:

icon-toggle.js { .caption }

```js
import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';
import '@polymer/iron-icon/iron-icon.js';
```

Key information:

  *   `'@polymer/polymer/polymer-element.js'` is a _module specifier_. The Polymer CLI development server finds this module and converts the module specifier to a file path so that your web browser can load the file.

  *   Two objects are imported from `@polymer/polymer/polymer-element.js`: `PolymerElement` and `html`.

      *   `PolymerElement` is the base Polymer element class, which is extended in `icon-toggle.js` to create a new element.

      *   `html` is a helper function that parses a [JavaScript template literal](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals). More about this soon. 

  *   `iron-icon.js` contains the definition for an existing Polymer element, `<iron-icon>`, which you will use shortly in `<icon-toggle>`'s template.

See the documentation on [ES6 imports](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import) for more information on import statements.

#### Extending the PolymerElement base class {#classdefinition}

`icon-toggle.js` defines a new class, `IconToggle`, which extends the `PolymerElement` base class:

```js
class IconToggle extends PolymerElement {
  ...
}
```

Key information: 

  * Polymer 3.0 uses [ES6 class syntax](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes). All modern browsers now support this syntax.
    
  * `IconToggle` extends the base `PolymerElement` class. `PolymerElement` has a range of functionality that is useful for developing a custom element, including ways to manipulate shadow DOM, data, and events.

#### Defining an element template {#templatefunc}

The `IconToggle` class defines the template for the custom element `<icon-toggle>`. In Polymer 3.0, you can define an element's template with a static getter function:

```js
static get template() {
  return html`
    <style>
      /* shadow DOM styles go here */
      span {
        color: blue;
      }
      :host {
        display: inline-block;
      }
    </style>

    <!-- shadow DOM goes here -->
    <span>Not much here yet.</span>
  `;
}
```

Key information:

  * The template defined above will be stamped into DOM when `<icon-toggle>` is used in an HTML document, just like a normal HTML element:

    ```
    <icon-toggle></icon-toggle>
    ```

  * The content between backticks (<code>`...`</code>) is a [JavaScript template literal](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals). In Polymer 3.0, however, the `template` function must return an instance of [`HTMLTemplateElement`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLTemplateElement). For this reason, we tag the template literal with the `html` helper function, transforming the return value of the `template` function into an `HTMLTemplateElement` instance.

  * The `<style>` block defines **scoped** CSS styles that only apply to the `<icon-toggle>` element. These styles will not affect the rest of the HTML document in which `<icon-toggle>` is used.

    * The `span` selector only matches `<span>` elements inside `<icon-toggle>`'s shadow DOM. It will not match `<span>` elements in the main HTML document.
      
    * `:host` is a pseudo-class selector that matches the "host" element of `<icon-toggle>`s shadow DOM-that is, the `<icon-toggle>` element itself. 

**Learn more: Shadow DOM.** Shadow DOM lets you add a <em>scoped</em> DOM tree inside an element, with local styles and markup that are decoupled from the rest of the web page. Shadow DOM is based on the Shadow DOM specification, and works with native shadow DOM where available. To learn more, see [Shadow DOM concepts](/{{{polymer_version_dir}}}/docs/devguide/shadow-dom). { .alert .alert-info }

#### Overriding the class constructor {#constructor}

`IconToggle` overrides the constructor of its superclass, `PolymerElement`, and defines its own constructor:

```js
constructor() {
  super();
}
```

In the starting code, we have included the constructor as a placeholder. It does nothing except call its superconstructor (`super()`). 

Note that you must always call `super()` as the first line of code if you override the constructor.

#### Registering the element with the browser {#register}

After the closing brace (`}`) of the `IconToggle` class definition, you'll see a call to the Custom Elements API to register `<icon-toggle>` as a custom element: 
    
```js
customElements.define('icon-toggle', IconToggle);
```

The line of code above tells the web browser that `<icon-toggle>` is an element, and can be used in markup.

### Add an existing custom element to your code {#add}

Now that you're familiar with the basic layout of a Polymer element in JavaScript, you can try adding something else to `<icon-toggle>`'s shadow DOM template.

In `icon-toggle.js`, find the `<span>` below the `<!-- shadow DOM goes here -->` comment:

Before { .caption }

```html
<!-- shadow DOM goes here -->
<span>Not much here yet.</span>
```

Replace the `<span>` and its contents with the `<iron-icon>` tag below:

After { .caption }

```html
<!-- shadow DOM goes here -->
<iron-icon icon="polymer"></iron-icon>
```

Key information:

  * The `<iron-icon>` element renders the icon specified by its `icon` attribute. Here, `iron-icon` is hard-coded to use an icon named `"polymer"`.

### Style your custom element {#style}

`icon-toggle.js` includes two CSS styles: 

  * A style for `<span>`s inside `<icon-toggle>` (`span {...}`).

  * A style for the top-level `<icon-toggle>` element (`:host {...}`).

In `icon-toggle.js`, replace the `<style>` block inside the `template` function with the following code: 

icon-toggle.js {.caption}

```html
<style>
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

*   The `<iron-icon>` element uses an SVG icon. The `fill` and `stroke` properties are SVG-specific CSS properties. They set the fill color and the outline color for the icon, respectively.

*   The `:host()` function matches the host element <em>if the selector inside the parentheses matches the host element</em>. In this case, `[pressed]`is a standard CSS attribute selector, so this rule matches when the `<icon-toggle>` element has a `pressed` attribute set on it.

`icon-toggle.js` should now look like this:

icon-toggle.js { .caption }

```js
import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';
import '@polymer/iron-icon/iron-icon.js';

class IconToggle extends PolymerElement {
  static get template() {
    return html`
      <style>
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
    `;
  }
  constructor() {
    super();
  }
}

customElements.define('icon-toggle', IconToggle);
```

Make sure `polymer serve` is running and reload the demo page. You should see the toggle buttons show up with the hard-coded icon.

<img width="400px" src="/images/3.0/first-element/hardcoded-toggles.png" alt="Demo showing icon toggles displaying Polymer icon">

You'll notice that one toggle is styled as pressed, because the `pressed` attribute is set in the demo. But click all you want, the button won't toggle yet; there's no code to change the `pressed` property.

We'll fix that in [step 3](step-3)!

<a class="blue-button" href="intro">Previous step: Intro</a>
<a class="blue-button"
    href="step-3">Next step: Use data binding and properties</a>

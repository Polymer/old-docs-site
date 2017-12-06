---
title: "Step 4: React to input"
subtitle: "Build your first Polymer element"
---

<!-- toc -->

Of course, a button isn't a button if you can't click it.

## Add an event listener

To toggle the button, we will add an event listener. To add event listeners on the host
element (in this case, `icon-toggle`), place the listener in the constructor after its
existing content:

icon-toggle.js: Before { .caption }

```js
constructor() {
  super();
}
```

icon-toggle.js: After { .caption }

```js
constructor() {
  super();
  addEventListener(this, 'tap', () => this.toggle());
}
```

## Add a method to be triggered when the event occurs

Add a method to toggle the `pressed` property when the button is pressed. Place it inside the class definition for `IconToggle`, after the constructor.

icon-toggle.js { .caption }

```js
...
toggle() {
  this.pressed = !this.pressed;
}
```

Your code should now look like this:

icon-toggle.js { .caption }
```js
import {Element as PolymerElement} from "../node_modules/@polymer/polymer/polymer-element.js"
import "../node_modules/@polymer/iron-icon/iron-icon.js"

export const html = Polymer.html;

class IconToggle extends PolymerElement {
  
  static get properties () {
    return {
      pressed: {
        type: Boolean,
        notify: true,
        reflectToAttribute: true,
        value: false
      },
      toggleIcon: {
        type: String
      },
    };
  }
  
  constructor() {
    super();
    this.addEventListener('click', this.toggle.bind(this));
  }
  
  toggle() {
    this.pressed = !this.pressed;
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
      <iron-icon icon="[[toggleIcon]]">
      </iron-icon>
    `
  }
}

customElements.define('icon-toggle', IconToggle);
```

Key information:

*   Use the standard `addEventListener` method to add event listeners imperatively.

Save the `icon-toggle.html` file and look at the demo again. You should be able to press the
button and see it toggle between its pressed and unpressed states.

<img width="400px" src="/images/3.0/first-element/databound-toggles.png" alt="Demo showing icon toggles with star and heart icons.">

**Learn more: data binding.** To see how the demo works, open `demo-element.js`
and take a look around (if you downloaded the code, you'll find this file in the `demo`
folder). Yes, the demo for this element is _also_ an element. The
element uses <a href="/3.0/docs/devguide/data-binding#two-way-bindings">two-way
data binding</a> and a <a href="/3.0/docs/devguide/data-binding#annotated-computed">computed
binding</a> to change the string displayed when you toggle the button.
{ .alert .alert-info }

<a class="blue-button" href="step-3">
  Previous step: Use data binding and properties
</a>

<a class="blue-button" href="step-5">
  Next step: Theming with custom CSS properties
</a>

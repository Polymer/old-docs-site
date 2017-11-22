---
title: "Step 4: React to input"
subtitle: "Build your first Polymer element"
---

Of course, a button isn't a button if you can't click it.

To toggle the button, add an event listener. Polymer lets us add event listeners with simple <code>on-<var>event</var></code> annotations in an element's template. Modify your code to use the Polymer `on-click` annotation to listen for the button's `click` event: 

icon-toggle.html { .caption } 

```html
<iron-icon icon="[[toggleIcon]]" on-click="toggle"></iron-icon>
```

**`on-click` is different from `onclick`.** This is different from the [standard <code><var>element</var>.onclick</code> property](https://developer.mozilla.org/en-US/docs/Web/API/GlobalEventHandlers/onclick). The dash in `on-click` indicates a Polymer annotated event listener.
{.alert .alert-info}

The code above calls a method called `toggle` when the button is pressed.  

Now, create the `toggle` method to toggle the `pressed` property when the button is pressed. Place the `toggle` method inside the class definition for `IconToggle`, after the constructor.

icon-toggle.html { .caption }

```js
toggle() {
  this.pressed = !this.pressed;
}
```

Your code should now look like this:

icon-toggle.html { .caption }

```html
<script>
  class IconToggle extends Polymer.Element {
    static get is() { 
      return 'icon-toggle';
    }
    static get properties() {
      return {
        pressed: {
          type: Boolean,
          notify: true,
          reflectToAttribute: true,
          value: false
        },
        toggleIcon: {
          type: String
        }
      }
    }
    constructor() {
      super();
    }
    toggle() {
      this.pressed = !this.pressed;
    }
  }

  customElements.define(IconToggle.is, IconToggle);
</script>
```

Save the `icon-toggle.html` file and look at the demo again. You should be able to press the button and see it
toggle between its pressed and unpressed states.

<img src="/images/2.0/first-element/databound-toggles.png" alt="Demo showing icon toggles with star and heart icons.">

**Learn more: data binding.** To see how the demo works, open `demo-element.html`
and take a look around (if you downloaded the code, you'll find this file in the `demo` folder.)
Yes, the demo for this element is _also_ an element. The
element uses <a href="/2.0/docs/devguide/data-binding#two-way-bindings">two-way
data binding</a> and a <a href="/2.0/docs/devguide/data-binding#annotated-computed">computed
binding</a> to change the string displayed when you toggle the button.
{ .alert .alert-info }

<a class="blue-button" href="step-3">
  Previous step: Use data binding and properties
</a>

<a class="blue-button" href="step-5">
  Next step: Theming with custom CSS properties
</a>

---
title: "Step 4: React to input"
subtitle: "Build your first Polymer element"
---

<!-- toc -->

Of course, a button isn't a button if you can't click it. In this step, we'll make the icons react to input.

## Step 4: React to input

In this step, you'll:

* [Add an event listener](#listen).
* [Define the callback for your event listener](#callback).

### Add an event listener {#listen}

To toggle the button, we will add an event listener. In `icon-toggle.js`, add the following line of code to the constructor:

```js
this.addEventListener('click', this.toggle.bind(this));
```

Before { .caption }

```js
constructor() {
  super();
}
```

After { .caption }

```js
constructor() {
  super();
  this.addEventListener('click', this.toggle.bind(this));
}
```

When the `'click'` event fires, a callback function (`toggle`) is triggered.

### Define the callback for your event listener {#callback}

Now you need to define the callback function, `toggle`. In `icon-toggle.js`, in the `IconToggle` class definition, add the following function after the constructor:

```js
toggle() {
  this.pressed = !this.pressed;
}
```

Before {.caption}

```js
class IconToggle extends PolymerElement {
  static get template() {
    ...
  }
  static get properties() {
    ...
  }
  constructor() {
    ...
  }
```

After {.caption}

```js
class IconToggle extends PolymerElement {
  static get template() {
    ...
  }
  static get properties() {
    ...
  }
  constructor() {
    ...
  }
  toggle() {
    this.pressed = !this.pressed;
  }
```

Key information:

  * Use the standard `addEventListener` method to add event listeners imperatively.

  * An element's constructor is a good place to add event listeners.

  * Make sure you are aware of the scope of the `this` value when referencing `this` from inside a function that gets passed as an argument, like a callback. In the code above, we have handled scope by binding the `this` value (`this.toggle.bind(this)`), but you could alternately handle it by using [ES6 arrow functions](https://hacks.mozilla.org/2015/06/es6-in-depth-arrow-functions/).

Save `icon-toggle.js` and reload the demo. You should be able to press the button and see it toggle between its pressed and unpressed states.

<img width="400px" src="/images/3.0/first-element/databound-toggles.png" alt="Demo showing icon toggles with star and heart icons.">

Next, learn to style your elements with custom CSS properties in [step 5](step-5). 

<a class="blue-button" href="step-3">
  Previous step: Use data binding and properties
</a>

<a class="blue-button" href="step-5">
  Next step: Theming with custom CSS properties
</a>

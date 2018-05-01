---
title: "Step 3: Use data binding and properties"
subtitle: "Build your first Polymer element"
---

<!-- toc -->

Polymer allows you to create an API for your element, providing a way to configure it from markup or from JavaScript. 

## Step 3: Use data binding and properties

In this step, you'll: 

* [Create a properties getter and declare a simple String property](#create).
* [Use the simple String property in a data binding](#bind).
* [Sync a property with its corresponding HTML attribute](#sync).

### Create a properties getter and declare a simple String property {#create}

Create a static `properties` getter function in `icon-toggle.js`. Inside the `IconToggle` class definition, after the `template` function, add the following code:

```js
static get properties() {
  return {
    toggleIcon: {
      type: String
    },
  };
}
```

Before { .caption }

```js
class IconToggle extends PolymerElement {
  static get template() {
    ...
  }
  constructor() {
    ...
  }
}
```

After { .caption }

```js
class IconToggle extends PolymerElement {
  static get template() {
    ...
  }
  static get properties () {
    return {
      toggleIcon: {
        type: String
      },
    };
  }
  constructor() {
    ...
  }
}
```

Key information:

  * Declare properties for your elements inside a `properties` getter function.

  * You must declare a property in order to use it in HTML.

  * A simple property declaration like this one just includes the type (in this
    case, `String`). 

**Learn more: deserializing attributes.** The declared property type affects how Polymer converts, or <em>deserializes</em> the attribute value (always a string value) into a JavaScript property value. The default is `String`, so the declaration of `toggleIcon` is a formality here. To learn more, see [attribute deserialization](/{{{polymer_version_dir}}}/docs/devguide/properties#attribute-deserialization) in the Polymer docs. { .alert .alert-info }

### Use the simple String property in a data binding {#bind}

In `icon-toggle.js`, find the `<iron-icon>` element and change the value of its `icon` attribute from `"polymer"` to  `"[[toggleIcon]]"`.

Before { .caption }

```html
<!-- local DOM goes here -->
<iron-icon icon="polymer"></iron-icon>
```

After { .caption}

```html
<!-- local DOM goes here -->
<iron-icon icon="[[toggleIcon]]"></iron-icon>
```

Key information:
    
  * The `icon="[[toggleIcon]]"` assignment is a <em>data binding</em>. It links your `<icon-toggle>` element's `toggleIcon` <em>property</em> with the `<iron-icon>`'s `icon` property.

You can now use your element and set the `toggleIcon` property in markup or using JavaScript. We've set up an example for you in the demo. Ensure that the Polymer CLI development server is running, and refresh the browser window to see the changes.

If you're curious about where the new icons come from, take a look at `demo-element.js` in the `demo` folder. You'll see the following code:

demo/demo-element.js { .caption }

```html
<icon-toggle toggle-icon="star" pressed></icon-toggle>
```

If you'd like to experiment, try adding a new `<icon-toggle>` element to `demo/demo-element.js`. Some icon names you can try are `add`, `menu`, and `settings`.

**Learn more: attribute and property names.** You'll note that the markup above uses `toggle-icon`, not `toggleIcon`. Polymer represents camelCase property names using dash-case attribute names. To learn more, see <a href="/{{{polymer_version_dir}}}/docs/devguide/properties#property-name-mapping">Property name to attribute name mapping</a> in the Polymer library docs. { .alert .alert-info }

### Sync a property with its corresponding HTML attribute {#sync}

In this section, you'll create a property (`pressed`) that **notifies** its host element when it changes, and is synchronized with a corresponding HTML attribute. 

In `icon-toggle.js`, in the `properties` function, add the `pressed` property:

```js
pressed: {
  type: Boolean,
  value: false,
  notify: true,
  reflectToAttribute: true
},
```

Before { .caption }

```js
class IconToggle extends PolymerElement {
  static get template() {
    ...
  }
  static get properties () {
    return {
      toggleIcon: {
        type: String
      },
    };
  }
  constructor() {
    ...
  }
}
```

After { .caption }

```js
class IconToggle extends PolymerElement {
  static get template() {
    ...
  }
  static get properties () {
    return {
      toggleIcon: {
        type: String
      },
      pressed: {
        type: Boolean,
        value: false,
        notify: true,
        reflectToAttribute: true
      }
    };
  }
  constructor() {
    ...
  }
}
```

Key information:

*   For this more complicated property, you supply a configuration object with several additional fields:

    * `value` specifies the property's [default value](//{{{polymer_version_dir}}}/docs/devguide/properties#configure-values).

    * `notify` tells Polymer to <em>dispatch property change events</em> when the property's `value` changes. This lets the change be observed by other nodes.

    * The `reflectToAttribute` property tells Polymer to [update the corresponding attribute when the property changes](//{{{polymer_version_dir}}}/docs/devguide/properties#attribute-reflection). This lets you style the element using an attribute selector, like `icon-toggle[pressed]`.

**Learn more: `notify` and `reflectToAttribute`.** The `notify` and `reflectToAttribute` properties may _sound_ similar: they both make the element's state visible to the outside world. `reflectToAttribute` makes the state visible **in the DOM tree**, so that it's visible to CSS and the `querySelector` methods. `notify` **makes state changes observable outside the element**, either using JavaScript event handlers or Polymer <a href="//{{{polymer_version_dir}}}/docs/devguide/data-binding#two-way-bindings">two-way data binding</a>. { .alert .alert-info }

Now your element has `pressed` and `toggleIcon` properties working.

Reload the demo, and you should see star and heart icons:

<img width="400px" rc="/images/3.0/first-element/static-toggles.png" alt="Demo showing icon toggles with star and heart icons">

Next, we'll make the icons react to being clicked. On to [step 4](step-4)!

<a class="blue-button" href="step-2">Previous step: Add local DOM</a>
<a class="blue-button" href="step-4">Next step: React to input</a>

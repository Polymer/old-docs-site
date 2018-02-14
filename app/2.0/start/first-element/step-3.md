---
title: "Step 3: Use data binding and properties"
subtitle: "Build your first Polymer element"
---

<!-- toc -->

Right now, the element doesn't do much. In this step, you'll give it a basic
API, allowing you to configure the icon from markup, using an attribute, or
from JavaScript, using a property.

## Declare a property

First, a bit of data binding. We'll create a `toggleIcon` property that you can use in HTML markup, like this: 

```html
<iron-icon icon="[[toggleIcon]]"></iron-icon>
```

Before this will work, we'll need to declare toggleIcon as a property.

Next, add a declaration for the `toggleIcon` property.

Find the script tag and add the following properties to the element's class definition:

icon-toggle.html: Before { .caption }

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
icon-toggle.html: After { .caption }

```html
<script>
  class IconToggle extends Polymer.Element {
    static get is() {
      return "icon-toggle";
    }
    static get properties() {
      return {
        toggleIcon: {
          type: String
        },
      }
    }
    constructor() {
      super();
    }
  }
  customElements.define(IconToggle.is, IconToggle);
</script>
```

Key information:

  * You must declare a property in order to use it in your HTML.
  * A simple property declaration like this one just includes the type (in this
    case, `String`).

**Learn more: deserializing attributes.** The declared property type affects how Polymer converts, or <em>deserializes</em>
the attribute value (always a string value) into a JavaScript property value.
The default is `String`, so the declaration of `toggleIcon` is a formality here.
To learn more, see <a href="/2.0/docs/devguide/properties#attribute-deserialization">Attribute
deserialization</a> in the Polymer docs.
{ .alert .alert-info }

## Configure the property from markup 

Now find the `<iron-icon>` element and change the value of the `icon` attribute from `"polymer"` to  "`[[toggleIcon]]`".

icon-toggle.html { .caption }

```html
<!-- local DOM goes here -->
<iron-icon icon="[[toggleIcon]]">
</iron-icon>
```

Key information:

  * `toggleIcon` is a <em>property</em> you'll define on the toggle button element. It doesn't have a default value yet.
    
  * The `icon="[[toggleIcon]]" `assignment is a <em>data binding</em>. It links your element's `toggleIcon` <em>property</em> with the `<iron-icon>`'s `icon` property.

You could now use your element and set the `toggleIcon` property in markup or
using JavaScript. If you're curious about where the new icons come from, take a look at `demo-element.html` in the `demo` folder.

You'll see lines like this:

demo-element.html—existing demo code { .caption }

```html
<icon-toggle toggle-icon="star" pressed></icon-toggle>
```

These lines are _already in place_, you don't have to add them. These lines
are part of the demo you see on screen. But if you'd like to experiment, try
adding a new `<icon-toggle>` element to the `demo-element.html` file. Some
icon names you can try are `add`, `menu`, and `settings`.

**Learn more: attribute and property names.** You'll note that the markup above
uses `toggle-icon`, not `toggleIcon`. Polymer represents camelCase property names
using dash-case attribute names. To learn more, see <a href="/2.0/docs/devguide/properties#property-name-mapping">Property
name to attribute name mapping</a> in the Polymer library docs.
{ .alert .alert-info }

The `properties` object also supports several more features. Add the following lines to add
support for the `pressed` property:

icon-toggle.html: Before { .caption }
```html
<script>
  class IconToggle extends Polymer.Element {
    static get is() {
      return "icon-toggle";
    }
    static get properties() {
      return {
        toggleIcon: {
          type: String
        },
      }
    }
    constructor() {
      super();
    }
  }
  customElements.define(IconToggle.is, IconToggle);
</script>
```

icon-toggle.html: After { .caption }

```html
<script>
  class IconToggle extends Polymer.Element {
    static get is() {
      return "icon-toggle";
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
        },
      }
    }
    constructor() {
      super();
    }
  }
  customElements.define(IconToggle.is, IconToggle);
</script>
```

Key information:

 *   For this more complicated property, you supply a configuration object with
several fields.
*   The `value` specifies the property's [default value](/2.0/docs/devguide/properties#configure-values).
*   The `notify` property tells Polymer to <em>dispatch property change events
    </em>when the property value changes. This lets the change be observed by
    other nodes.
*   The `reflectToAttribute` property tells Polymer to
    [update the corresponding attribute when the property changes](/2.0/docs/devguide/properties#attribute-reflection).
    This lets you style the element using an attribute selector, like
    `icon-toggle[pressed]`.

**Learn more: `notify` and `reflectToAttribute`.** The `notify` and
`reflectToAttribute` properties may _sound_ similar: they both make the element's
state visible to the outside world. `reflectToAttribute` makes the
state visible **in the DOM tree**, so that it's visible to CSS and the
`querySelector` methods. `notify` **makes state changes observable outside the
element**, either using JavaScript event handlers or Polymer
<a href="/2.0/docs/devguide/data-binding#two-way-bindings">two-way data binding</a>.
{ .alert .alert-info }

Now your element has `pressed` and `toggleIcon` properties working.

Reload the demo, and you should see star and heart icons instead of the
hard-coded icon from the previous step:

<img src="/images/2.0/first-element/static-toggles.png" alt="Demo showing icon toggles with star and heart icons">

<a class="blue-button" href="step-2">Previous step: Add local DOM</a>
<a class="blue-button" href="step-4">Next step: React to input</a>

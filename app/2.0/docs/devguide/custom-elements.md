---
title: Custom element concepts
---

<!-- toc -->

Custom elements provide a component model for the web. The custom elements specification provides:

*   A mechanism for associating  a class with a custom element name.
*   A set of lifecycle callbacks invoked when an instance of the custom element changes state (for
    example, added or removed from the document).
*   A callback invoked whenever one of a specified set of attributes changes on the instance.

Put together, these features let you build an element with its own public API that reacts to state
changes.

This document provides an overview of custom elements as they relate to Polymer. For a more detailed
overview of custom elements, see: [Custom Elements v1: Reusable Web
Components](https://developers.google.com/web/fundamentals/getting-started/primers/customelements)
on Web Fundamentals.

To define a custom element, you create an ES6 class and associate it with the custom element name.

```
// Create a class that extends HTMLElement (directly or indirectly)
class MyElement extends HTMLElement { … };

// Associate the new class with an element name
window.customElements.define('my-element', MyElement);
```


You can use a custom element just like you'd use a standard element:


```html
<my-element></my-element>
```

Or:

```js
const myEl = document.createElement('my-element');
```

Or:

```js
const myEl = new MyElement();
```

The element's class defines its behavior and public API. The class must extend `HTMLElement` or one
of its subclasses (for example, another custom element).

**Custom element names.** By specification, the custom element's name **must start with a lower-case
ASCII letter and must contain a dash (-)**. There's also a short list of prohibited element names
that match existing names. For details, see the [Custom elements core
concepts](https://html.spec.whatwg.org/multipage/scripting.html#custom-elements-core-concepts)
section in the HTML specification.
{.alert .alert-info}

Polymer provides a set of features on top of the basic custom element specification. To add these
features to your element, extend Polymer's base element class, `Polymer.Element`:

```html
<link rel="import" href="/bower_components/polymer/polymer-element.html">

<script>
  class MyPolymerElement extends Polymer.Element {
    ...
  }

  customElements.define('my-polymer-element', MyPolymerElement);
</script>
```

Polymer adds a set of features to the basic custom element:

*   Instance methods to handle common tasks.
*   Automation for handling properties and attributes, such as setting a property based on the
    corresponding attribute.
*   Creating shadow DOM trees for element instances based on a supplied `<template>`.
*   A data system that supports data binding, property change observers, and computed properties.

## Custom element lifecycle {#element-lifecycle}

The custom element spec provides a set of callbacks called "custom element reactions" that allow you
to run user code in response to certain lifecycle changes.

<table>
  <tr>
   <th>Reaction
   </th>
   <th>Description
   </th>
  </tr>
  <tr>
   <td>constructor
   </td>
   <td>Called when the element is upgraded (that is, when an  element is created, or when a
   previously-created element becomes defined).
   </td>
  </tr>
  <tr>
   <td>connectedCallback
   </td>
   <td>Called when the element is added to a document.
   </td>
  </tr>
  <tr>
   <td>disconnectedCallback
   </td>
   <td>Called when the element is removed from a document.
   </td>
  </tr>
  <!-- <tr>
  <td>adoptedCallback
   </td>
   <td>Called when the element is adopted into a new document.
   </td>
  </tr> -->
  <tr>
   <td>attributeChangedCallback
   </td>
   <td>Called when any of the element's attributes are changed, appended, removed, or replaced,
   </td>
  </tr>
</table>

For each reaction, the first line of your implementation must be a call to the superclass
constructor or reaction. For the constructor, this is simply the `super()` call.

```js
constructor() {
  super();
  // …
}
```

For other reactions, call the superclass method. This is required so Polymer can hook into the
element's lifecycle.

```js
connectedCallback() {
  super.connectedCallback();
  // …
}
```

The element constructor has a few special limitations:

*   The first statement in the constructor body must be a parameter-less call to the `super` method.
*   The constructor can't include a return statement, unless it is a simple early return (`return`
    or `return this`).
*   The constructor can't examine the element's attributes or children, and the constructor can't
    add attributes or children.

For a complete list of limitations, see [Requirements for custom element constructors](https://html.spec.whatwg.org/multipage/scripting.html#custom-element-conformance) in the WHATWG HTML Specification.

Whenever possible, defer work until the `connectedCallback` or later instead of performing it in the constructor.

### One-time initialization

The custom elements specification doesn't provide a one-time initialization callback. Polymer
provides a `ready` callback, invoked the first time the element is added to the DOM.

```js
ready() {
  super.ready();
  // When possible, use afterNextRender to defer non-critical
  // work until after first paint.
  Polymer.RenderStatus.afterNextRender(this, function() {
    ...
  });
}
```


The `Polymer.Element` class initializes your element's template and data system during the `ready`
callback, so if you override ready, you must call `super.ready()` at some point.

When the superclass `ready` method returns, the element's template has been instantiated and initial
property values have been set. However, light DOM elements may not have been distributed when
`ready` is called.

Don't use `ready` to initialize an element based on dynamic values, like property values or an
element's light DOM children. Instead, use [observers](observers) to react to property changes, and
`observeNodes` or the `slotchange` event to react to children being added and removed from the
element.

Related topics:

*   [DOM templating](dom-template)
*   [Data system concepts](data-system)
*   [Observers and computed properties](observers)
*   [Observe added and removed children](shadow-dom#observe-nodes)

## Element upgrades

By specification, custom elements can be used before they're defined. Adding a definition for an
element causes any existing instances of that element to be *upgraded* to the custom class.

For example, consider the following code:

```html
<my-element></my-element>
<script>
  class MyElement extends HTMLElement { ... };

  // ...some time much later...
  customElements.define('my-element', MyElement);
</script>
```


When parsing this page, the browser will create an instance of `<my-element>` before parsing and
executing the script. In this case, the element is created as an instance of `HTMLElement`, not
`MyElement`. After the element is defined, the `<my-element>` instance is upgraded so it has the
correct class (`MyElement`). The class constructor is called during the upgrade process, followed
by any pending lifecycle callbacks.

Element upgrades allow you to place elements in the DOM while deferring the cost of initializing them. It's a progressive enhancement feature.

Elements have a *custom element state* that takes one of the following values:



*   "uncustomized". The element does not have a valid custom element name. It is either a built-in
    element (`<p>`, `<input>`) or an unknown element that cannot become a custom element
    (`<nonsense>`)
*   "undefined". The element has a valid custom element name (such as "my-element"), but has not
    been defined.
*   "custom". The element has a valid custom element name and has been defined and upgraded.
*   "failed". An attempt to upgrade the element failed (for example, because the class was invalid).

The custom element state isn't exposed as a property, but you can style elements depending on
whether they're defined or undefined.

Elements in the "custom" and "uncustomized" state are considered "defined". In CSS you can use the
`:defined` pseudo-class selector to target elements that are defined. You can use this to provide
placeholder styles for elements before they're upgraded:

```
my-element:not(:defined) {
  background-color: blue;
}
```

## Extending other elements {#extending-elements}

In addition to `HTMLElement`, a custom element can extend another custom element:


```
class ExtendedElement extends MyElement {
  static get is() { return 'extended-element'; }

  static get properties() {
    return {
      thingCount: {
        value: 0,
        observer: '_thingCountChanged'
      }
    }
  }
  _thingCountChanged() {
    console.log(`thing count is ${this.thingCount}`);
  }
};

customElements.define(ExtendedElement.is, ExtendedElement);
```

**Polymer does not currently support extending built-in elements.** The custom elements spec
provides a mechanism for extending built-in elements, such as `<button>` and `<input>`. The spec
calls these elements *customized built-in elements*. Customized built-in elements provide many
advantages (for example, being able to take advantage of built-in accessibility features of UI
elements like `<button>` and `<input>`). However, not all browser makers have agreed to support
customized built-in elements, so Polymer does not support them at this time.
{.alert .alert-info}

When you extend custom elements, Polymer treats the `properties` object and
`observers` array specially: when instantiating an element, Polymer walks the prototype chain and
flattens these objects. So the properties and observers of a subclass are added to those defined
by the superclass.

A subclass can also inherit a template from its superclass. For details, see
[Inherited templates](dom-template#inherited-templates).

## Sharing code with class expression mixins {#mixins}

ES6 classes allow single inheritance, which can make it challenging to share code between unrelated
elements. Class expression mixins let you share code between elements without adding a common
superclass.

A class expression mixin is basically a function that operates as a *class factory*. You pass in a
superclass, and the function generates a new class that extends the superclass with the mixin's
methods.

```js
const fancyDogClass = FancyMixin(dogClass);
const fancyCatClass = FancyMixin(catClass);
```

### Using mixins

Add a mixin to your element like this:

```js
class MyElement extends MyMixin(Polymer.Element) {
  static get is() { return 'my-element' }
}
```

If that isn't clear, it may help to see it in two steps:

```js
// Create new base class that adds MyMixin's methods to Polymer.Element
const polymerElementPlusMixin = MyMixin(Polymer.Element);

// Extend the new base class
class MyElement extends polymerElementPlusMixin {
  static get is() { return 'my-element' }
}
```

So the inheritance hierarchy is:

```js
MyElement <= polymerElementPlusMixin <= Polymer.Element
```

You can apply mixins to any element class, not just `Polymer.Element`:

```js
class MyExtendedElement extends SomeMixin(MyElement) {
  ...
}
```

You can also apply multiple mixins in sequence:

```js
class AnotherElement extends AnotherMixin(MyMixin(Polymer.Element)) { … }
```

### Defining mixins

A mixin is simply a function that takes a class and returns a subclass:

```js
MyMixin = function(superClass) {
  return class extends superClass {
    constructor() {
      super();
      this.addEventListener('keypress', e => this.handlePress(e));
    }

    static get properties() {
      return {
        bar: {
          type: Object
        }
      };
    }

    static get observers() {
      return [ '_barChanged(bar.*)' ];
    }

    _barChanged(bar) { ... }

    handlePress(e) { console.log('key pressed: ' + e.charCode); }
  }
}
```

Or using an ES6 arrow function:

```js
MyMixin = (superClass) => class extends superClass {
  ...
}
```

The mixin class can define properties, observers, and methods just like a regular element class. In
addition, a mixin can incorporate other mixins:

```js
MyCompositeMixin = (base) => class extends MyMixin2(MyMixin1(base)) {
  ...
}
```

Because mixins are simply adding classes to the inheritance chain, all of the usual rules of
inheritance apply. For example, mixin classes can define constructors, can call superclass methods
with `super`, and so on.

**Document your mixins.** The Polymer build and lint tools require some extra documentation tags
to property analyze mixins and elements that use them. Without the documentation tags, the tools
will log warnings. For details on documenting mixins, see [Class mixins](../tools/documentation#class-mixins)
in Document your elements.
{.alert .alert-info}


### Packaging mixins for sharing

When creating a mixin that you intend to share with other groups or publish, a couple of additional
steps are recommended:

-   Use the [`Polymer.dedupingMixin`](/{{{polymer_version_dir}}}/docs/api/#function-Polymer.dedupingMixin)
    function to produce a mixin that can only be applied once.

-   Create a unique namespace for your mixins, to avoid colliding with other mixins or classes that
    might have similar names.

The `dedupingMixin` function is useful because a mixin that's used by other mixins may accidentally
be applied more than once. For example if `MixinA` includes `MixinB` and `MixinC`, and you create an element
that uses `MixinA` but also uses `MixinB` directly:

```js
class MyElement extends MixinB(MixinA(Polymer.Element)) { ... }
```

At this point, your element contains two copies of `MixinB` in its  prototype chain. `dedupingMixin`
takes a mixin function as an argument, and returns a new, deduplicating mixin function:

```js
dedupingMixinB = Polymer.dedupingMixin(mixinB);
```

The deduping mixin has two advantages: first, whenever you use the mixin, it memoizes the generated
class, so any subsequent uses on the same base class return the same class object—a minor optimization.

More importantly, the deduping mixin checks whether this mixin has already been applied anywhere in
the base class's prototype chain. If it has, the mixin simply returns the base class. In the example
above, if you used `dedupingMixinB` instead of  `mixinB` in both places, the mixin would only be
applied once.

The following example shows one way you might create a namespaced, deduping mixin:

```js
// Create my namespace, if it doesn't exist
if (!window.MyNamespace) {
  window.MyNamespace = {};
}

MyNamespace.MyMixin = Polymer.dedupingMixin((base) =>

  // the mixin class
  class extends base {
    ...
  }
);
```

## Resources

More information: [Custom elements v1: reusable web components](https://developers.google.com/web/fundamentals/primers/customelements/?hl=en) on Web Fundamentals.

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
changes. Polymer provides a set of features on top of the basic custom element specification. 

This document provides an overview of custom elements as they relate to Polymer. For a more detailed
overview of custom elements, see: [Custom Elements v1: Reusable Web
Components](https://developers.google.com/web/fundamentals/web-components/customelements)
on Web Fundamentals.

To define a custom element, you create an ES6 class and associate it with the custom element name. For the full set of Polymer features, extend the `PolymerElement` class:

```js
import {PolymerElement} from '@polymer/polymer/polymer-element.js';

  export class MyPolymerElement extends PolymerElement {
    ...
  }

  customElements.define('my-polymer-element', MyPolymerElement);
```

Exporting the custom element class is optional, but recommended.

Import the element into an HTML file using `<script type="module">`.  
Use the `import` statement (as shown above) to import it from  another ES6 module.

```html
<script type="module" src="./my-polymer-element.js">
```

Once you've imported it, you can use a custom element just like you'd use a standard element.

The element's class defines its behavior and public API. 

**Custom element names.** By specification, the custom element's name **must start with a lower-case
ASCII letter and must contain a dash (-)**. There's also a short list of prohibited element names
that match existing names. For details, see the [Custom elements core
concepts](https://html.spec.whatwg.org/multipage/scripting.html#custom-elements-core-concepts)
section in the HTML specification.
{.alert .alert-info}

Polymer adds a set of features to the basic custom element:

*   Instance methods to handle common tasks.
*   Automation for handling properties and attributes, such as setting a property based on the
    corresponding attribute.
*   Creating shadow DOM trees for element instances based on a supplied template.
*   A data system that supports data binding, property change observers, and computed properties.

The `PolymerElement` class is made up of a set of _class expression mixins_ that add individual features.
You can also use these mixins individually if you want to use a subset of Polymer's features. See the API
documentation for a list of individual mixins.

## Polymer element lifecycle {#element-lifecycle}

Polymer elements follow the standard lifecycle for custom elements. The custom element spec provides a set of
callbacks called "custom element reactions" that allow you to run user code in response to certain lifecycle 
changes.

For performance, Polymer defers creating an element's shadow tree and initializing its data system until the first time the element is attached to the DOM. Polymer adds its own `ready` callback for this initialization.

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
   previously-created element becomes defined). The constructor is a logical place to set default values,
   and to manually set up event listeners for the element itself. 
   </td>
  </tr>
  <tr>
   <td>connectedCallback
   </td>
   <td>Called when the element is added to a document.  Can be called multiple times during the lifetime of an element.
     <p>Uses include adding document-level event listeners. (For listeners local to the element, you can use 
     <a href="events#annotated-listeners">annotated event listeners</a>.)</p>
   </td>
  </tr>
  <tr>
   <td>disconnectedCallback
   </td>
   <td>Called when the element is removed from a document. Can be called
        multiple times during the lifetime of an element.
      <p>Uses include removing event listeners added in <code>connectedCallback</code>.
      </p>
   </td>
  </tr>
  <tr>
   <td>ready
   </td>
   <td>Called during Polymer-specific element initialization. Called once, the first time the 
       element is attached to the document. For details, see 
      <a href="#ready-callback)">Polymer element initialization</a>.
   </td>
  </tr>
  <tr>
   <td>attributeChangedCallback
   </td>
   <td>Called when any of the element's attributes are changed, appended, removed, or replaced. 
      <p>Use to handle attribute changes that <em>don't</em> correspond to
        declared properties. (For declared properties, Polymer
        handles attribute changes automatically as described in
        <a href="properties#attribute-deserialization">attribute deserialization</a>.)
      </p>
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

Whenever possible, defer work until the `connectedCallback` or later instead of performing it in the constructor. See [Defer non-critical work](#defer-work) for some suggestions.

### Polymer element initialization {#ready-callback}

The custom elements specification doesn't provide a one-time initialization callback. Polymer
provides a `ready` callback, invoked the first time the element is added to the DOM. (If the element 
is upgraded when it's already in the document, `ready` runs when the element is upgraded.)

```js
ready() {
  super.ready();
  // do something that requires access to the shadow tree
  ... 

}
``` 

The `PolymerElement` class initializes your element's template and data system during the `ready`
callback, so if you override `ready`, you must call `super.ready()` before accessing the element's shadow tree.

Polymer does several things at `ready` time:

-   Creates and attaches the element's shadow DOM tree. 
-   Initializes the data system, propagating intial values to data bindings.
-   Allows observers and computed properties to run (as soon as any of their dependencies are defined).

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

### Defer non-critical work {#defer-work}

When possible, defer work until after first paint. The [`render-status`](/{{{polymer_version_dir}}}/docs/api/namespaces/Polymer.RenderStatus) module provides 
an `afterNextRender` utility for this purpose. 

```js
import {PolymerElement} from '@polymer/polymer/polymer-element.js';
import {afterNextRender} from '@polymer/polymer/lib/utils/render-status.js';


class DeferElement extends PolymerElement {
  ...
  constructor() {
    super();
    // When possible, use afterNextRender to defer non-critical
    // work until after first paint.
    afterNextRender(this, function() {
      this.addEventListener('click', this._handleClick);
    });
  }
}
``` 

In most cases, you can call `afterNextRender` from either the `constructor` or the `ready` 
callback with similar results. For anything requiring access to the element's shadow tree, use
the `ready` callback.

## Element upgrades

By specification, custom elements can be used before they're defined. Adding a definition for an
element causes any existing instances of that element to be *upgraded* to the custom class.

For example, consider the following code:

```html
<my-element></my-element>

<!-- load the elment definition -->
<script type="module" src="my-element.js">
```


When parsing this page, the browser will create an instance of `<my-element>` before parsing and
executing the script. In this case, the element is created as an instance of `HTMLElement`, not
`MyElement`. After the element is defined, the `<my-element>` instance is upgraded so it has the
correct class (`MyElement`). The class constructor is called during the upgrade process, followed
by any pending lifecycle callbacks.

Element upgrades allow you to place elements in the DOM while deferring the cost of initializing them. It's a progressive enhancement feature.

To avoid unstyled content, you can apply styles to undefined elements. See 
[Style undefined elements](style-shadow-dom#style-undefined-elements) for details.


## Extending other elements {#extending-elements}

In addition to `PolymerElement`, a custom element can extend another custom element:


```
import {MyElment} from './my-element.js';

export class ExtendedElement extends MyElement {
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
[Inherit a template from another Polymer element](dom-template#inherit).

To make it easy to extend your elements, the module that defines the element should export it:

```js
export class MyElement extends PolymerElement { ... }
```

Legacy elements—elements defined using the legacy `Polymer()` function—don't require you to 
define your own class. So if you're extending a legacy element, like one of the Polymer paper elements, the module may not export a class.

If you're extending a legacy Polymer element, or a module that doesn't export the element,
you can use the `customElements.get` method to retrieve the constructor for any custom element 
that's been defined.

```js
// Import a legacy component
import './legacy-button.js';
// Retrieve the legacy-button constructor
const LegacyButton = customElements.get('legacy-button');
// Extend it!
export class MyExtendedButton extends LegacyButton { ... }
```

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
class MyElement extends MyMixin(PolymerElement) {
  static get is() { return 'my-element' }
}
```

If that isn't clear, it may help to see it in two steps:

```js
// Create new base class that adds MyMixin's methods to Polymer.Element
const PolymerElementPlusMixin = MyMixin(PolymerElement);

// Extend the new base class
class MyElement extends PolymerElementPlusMixin {
  static get is() { return 'my-element' }
}
```

So the inheritance hierarchy is:

```js
MyElement <= PolymerElementPlusMixin <= PolymerElement
```

You can apply mixins to any element class, not just `PolymerElement`:

```js
class MyExtendedElement extends SomeMixin(MyElement) {
  ...
}
```

You can also apply multiple mixins in sequence:

```js
class AnotherElement extends AnotherMixin(MyMixin(PolymerElement)) { … }
```

### Defining mixins

A mixin is simply a function that takes a class and returns a subclass:

```js
MyMixin = function(superClass) {
  return class extends superClass {
    constructor() {
      super();
      this.addEventListener('keypress', (e) => this._handlePress(e));
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

    _handlePress(e) { console.log('key pressed: ' + e.charCode); }
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

-   Use the [`dedupingMixin`](/{{{polymer_version_dir}}}/docs/api/#function-Polymer.dedupingMixin)
    function to produce a mixin that can only be applied once.

-   Define the mixin in an ES module and export it.

The `dedupingMixin` function is useful because a mixin that's used by other mixins may accidentally
be applied more than once. For example if `MixinA` includes `MixinB` and `MixinC`, and you create an element
that uses `MixinA` but also uses `MixinB` directly:

```js
class MyElement extends MixinB(MixinA(Polymer.Element)) { ... }
```

At this point, your element contains two copies of `MixinB` in its  prototype chain. `dedupingMixin`
takes a mixin function as an argument, and returns a new, deduplicating mixin function:

mixin-b.js {.caption}

```js
import {dedupingMixin} from '@polymer/polymer/lib/utils/mixin.js';

// define the mixin
let internalMixinB = (base) =>
  class extends base {
    ...
  }

// deduplicate and export it
export const MixinB = dedupingMixin(internalMixinB);
```

Using the mixin {.caption}

```js
import {mixinB} from './mixin-b.js';

class Foo extends MixinB(PolymerElement) { ... }
```

The deduping mixin has two advantages: first, whenever you use the mixin, it memoizes the generated
class, so any subsequent uses on the same base class return the same class object—a minor optimization.

More importantly, the deduping mixin checks whether this mixin has already been applied anywhere in
the base class's prototype chain. If it has, the mixin simply returns the base class. In the example
above, if you used `dedupingMixinB` instead of  `mixinB` in both places, the mixin would only be
applied once.



## Resources

More information: [Custom elements v1: reusable web components](https://developers.google.com/web/fundamentals/primers/customelements/?hl=en) on Web Fundamentals.

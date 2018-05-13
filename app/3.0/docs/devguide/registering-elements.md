---
title: Define an element
---

<!-- toc -->


## Define a custom element {#register-element}


To define a custom element, create a class that extends `PolymerElement` and pass the class to the
`customElements.define` method.

By specification, the custom element's name **must start with a lower-case ASCII letter and must
contain a dash (-)**.

Example: { .caption }

```js
// Import PolymerElement class
import {PolymerElement} from '@polymer/polymer/polymer-element.js';

// define the element's class element
class MyElement extends PolymerElement {

  // Element class can define custom element reactions
  connectedCallback() {
    super.connectedCallback();
    this.textContent = 'I\'m a custom element!';
    console.log('my-element created!');
  }

  ready() {
    super.ready();
    console.log('my-element is ready!');
  }
}

// Associate the new class with an element name
customElements.define('my-element', MyElement);

// create an instance with createElement:
var el1 = document.createElement('my-element');

// ... or with the constructor:
var el2 = new MyElement();
```

As shown above, the element's class can define callbacks for the custom element reactions as
described in [Custom element lifecycle](custom-elements#element-lifecycle).

## Extending an existing element {#extend-element}

You can leverage native subclassing support provided by ES6 to extend and customize existing
elements defined using ES6 syntax:

```js
// Subclass existing element
class MyElementSubclass extends MyElement {
  static get is() { return 'my-element-subclass'; }
  static get properties() { ... }
  constructor() {
    super();
    ...
  }
  ...
}

// Register custom element definition using standard platform API
customElements.define(MyElementSubclass.is, MyElementSubclass);
```

For more information on extending elements, see [Extending other elements](custom-elements#extending-elements)
in Custom element concepts.

If you don't provide a template for your subclass, it inherits the superclass's template by default.
For more information, see [Inherit a template from another Polymer element](dom-template#inherit).

## Using mixins

You can share code using _class expression mixins_. You use a mixin to add new features on top of a base class:

```js
class MyElementWithMixin extends MyMixin(PolymerElement) {

}
```

This pattern may be easier to understand if you think of it as two steps:

```js
// Create a new base class that adds MyMixin's features to Polymer.Element
const BaseClassWithMixin = MyMixin(PolymerElement);

// Extend the new base class
class MyElementWithMixin extends BaseClassWithMixin { ... }
```

Because mixins are simply adding classes to the inheritance chain, all of the usual rules of
inheritance apply.

For information on defining mixins, see [Sharing code with class expression mixins](custom-elements#mixins)
in Custom element concepts.


## Using legacy behaviors with class-style elements

You can add legacy behaviors to your class-style element using the `mixinBehavior` function:

```js
import {PolymerElement} from '@polymer/polymer/lib/legacy/class.js';
import {mixinBehaviors} from '@polymer/polymer/polymer-element.js';

class XClass extends Polymer.mixinBehaviors([MyBehavior, MyBehavior2], PolymerElement) {

  ...
}
customElements.define('x-class', XClass);
```

The `mixinBehavior` function also mixes in the Legacy APIs, the same as if you applied the 
`LegacyElementMixin`. These APIs are required since since legacy behaviors depend on them.


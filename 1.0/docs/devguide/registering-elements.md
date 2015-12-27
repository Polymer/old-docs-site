---
layout: default
type: guide
shortname: Docs
title: Registration and lifecycle
subtitle: Developer guide
---

{% include toc.html %}


## Register a custom element {#register-element}


To register a custom element, use the `Polymer` function, and pass in the
prototype for the new element. The prototype must have an `is` property that
specifies the HTML tag name for your custom element.

By specification, the custom element's name **must contain a dash (-)**.

Example:

    // register an element
    MyElement = Polymer({

      is: 'my-element',

      // See below for lifecycle callbacks
      created: function() {
        this.textContent = 'My element!';
      }

    });

    // create an instance with createElement:
    var el1 = document.createElement('my-element');

    // ... or with the constructor:
    var el2 = new MyElement();

The `Polymer` function registers the element with the browser and returns a
constructor that can be used to create new instances of your element via code.

The `Polymer` function sets up the prototype chain for your custom element,
chaining it to the {{site.project_title}} `Base` prototype (which provides
{{site.project_title}} value-added features), so you cannot set up your own
prototype chain. However, you can use [behaviors](#prototype-mixins) to
share code between elements.

### Define a custom constructor {#custom-constructor}

The `Polymer` method returns a basic constructor that can be used to
instantiate the custom element. If you want to
pass arguments to the constructor to configure the new element, you can
specify a custom `factoryImpl` function on the prototype.

The constructor returned from `Polymer` creates an instance using
`document.createElement`, then invokes the user-supplied `factoryImpl` function
with `this` bound to the element instance. Any arguments passed to the actual
constructor are passed on to the `factoryImpl` function.

Example:

    MyElement = Polymer({

      is: 'my-element',

      factoryImpl: function(foo, bar) {
        this.foo = foo;
        this.configureWithBar(bar);
      },

      configureWithBar: function(bar) {
        ...
      }

    });

    var el = new MyElement(42, 'octopus');


Two notes about the custom constructor:

*   The `factoryImpl` method is _only_ invoked when you create an element using the
    constructor. The `factoryImpl` method is not called if the element is created
    from markup by the HTML parser, or if the element is created using `document.createElement`.

*   The `factoryImpl` method is called **after** the element is initialized (local DOM
    created, default values set, and so on). See
    [Ready callback and element initialization](#ready-method) for more information.

### Extend native HTML elements {#type-extension}

Polymer currently only supports extending native HTML elements (for example,
`input`, or `button`, as opposed to extending other custom elements, which will
be supported in a future release). These native element extensions are called
_type extension custom elements_.

To extend a native HTML element, set the `extends` property on your prototype to
the tag name of the element to extend.


Example:

    MyInput = Polymer({

      is: 'my-input',

      extends: 'input',

      created: function() {
        this.style.border = '1px solid red';
      }

    });

    var el1 = new MyInput();
    console.log(el1 instanceof HTMLInputElement); // true

    var el2 = document.createElement('input', 'my-input');
    console.log(el2 instanceof HTMLInputElement); // true

To use a type-extension element in markup, use the _native_ tag and add an
`is` attribute that specifies the extension type name:

    <input is="my-input">

<!-- legacy anchor -->
<a id="basic-callbacks"></a>

### Define an element in the main HTML document {#main-document-definitions}

**Note:** You should only define elements from the main document when
experimenting. In production, elements should always be defined in
separate files and imported into your main document.
{: .alert .alert-info }

To define an element in your main HTML document, define the element
from `HTMLImports.whenReady(callback)`. `callback` is invoked when
all imports in the document have finished loading.

    <!DOCTYPE html>
    <html>
      <head>
        <script src="bower_components/webcomponentsjs/webcomponents-lite.js">
        </script>
        <link rel="import" href="bower_components/polymer/polymer.html">
        <title>Defining a Polymer Element from the Main Document</title>
      </head>
      <body>
        <dom-module id="main-document-element">
          <template>
            <p>
              Hi! I'm a Polymer element that was defined in the
              main document!
            </p>
          </template>
          <script>
            HTMLImports.whenReady(function () {
              Polymer({
                is: 'main-document-element'
              });
            });
          </script>
        </dom-module>
        <main-document-element></main-document-element>
      </body>
    </html>

## Lifecycle callbacks {#lifecycle-callbacks}

Polymer's Base prototype implements the standard Custom Element lifecycle
callbacks to perform tasks necessary for Polymer's built-in features.  The hooks
in turn call shorter-named lifecycle methods on your prototype.

- `created` instead of `createdCallback`
- `attached` instead of `attachedCallback`
- `detached` instead of `detachedCallback`
- `attributeChanged` instead of `attributeChangedCallback`

You can fallback to using the low-level methods if you prefer (in other
words, you can simply implement `createdCallback` in your prototype).

Polymer adds an extra callback, `ready`, which is invoked when Polymer has
finished creating and initializing the element's local DOM.


Example:

    MyElement = Polymer({

      is: 'my-element',

      created: function() {
        console.log(this.localName + '#' + this.id + ' was created');
      },

      attached: function() {
        console.log(this.localName + '#' + this.id + ' was attached');
      },

      detached: function() {
        console.log(this.localName + '#' + this.id + ' was detached');
      },

      attributeChanged: function(name, type) {
        console.log(this.localName + '#' + this.id + ' attribute ' + name +
          ' was changed to ' + this.getAttribute(name));
      }

    });

### Ready callback and local DOM initialization {#ready-method}

The `ready` callback is called when an element's local DOM is ready.

It is called after the element's template has been stamped and all elements
**inside the element's local DOM** have been configured (with values bound from
parents, deserialized attributes, or else default values) and had their `ready`
method called.

Implement `ready` when it's necessary to manipulate an element's
local DOM when the element is constructed.

    ready: function() {
      // access a local DOM element by ID using this.$
      this.$.header.textContent = 'Hello!';
    }

**Note:** This example uses [Automatic node finding](local-dom.html#node-finding) to
access a local DOM element.
{: .alert .alert-info }

Within a given tree, `ready` is generally called in _document order_, but you should not
rely on the ordering of initialization callbacks between sibling elements, or between
a host element and its light DOM children.

### Initialization order and timing {#initialization-order}

The element's basic initialization order for a given element is:

- `created` callback   local DOM initialized (This means that **local DOM**
- children are created, their property values are set as specified in the
- template, and `ready()` has been called on them) `ready` callback
- [`factoryImpl` callback](#custom-constructor) `attached` callback

Note that while the life cycle callbacks listed above will be called in the
described order for any given element, the  **initialization timing between
elements may vary** depending on whether or not the browser includes native
support for web components.

#### Initialization timing for light DOM children

As far as initialization timing of light DOM children, there are no guarantees
at all; it can generally be expected them to be ready in document order, and
that they will be _usually_ initialized after their parents. The user can add
light children at any time after the parent element has been defined.

For example, consider this light DOM for an element `avarar-list` (which would
presumably have, in its local DOM, a `<content>` element with selector on
`.photo`):

    <avatar-list> <my-photo class="photo" src="one.jpg">First photo</my-photo>
    <my-photo class="photo" src="two.jpg">Second photo</my-photo> </avatar-list>

`<avatar-list>` is _likely_ to have its `ready` before the various `<my-photo>`
elements do.

#### Initialization timing for local DOM children

In terms of local DOM and initialization timing, Local DOM children are created,
their property values are set as specified in the template, and `ready` is
called on them _before_ their parent's `ready` is.

There are two caveats:

* `dom-repeat` and `dom-if` create DOM asynchronously based on the property
* values set on them (e.g. `if`, `items`, etc.). Note that `dom-repeat` isn't a
* "special" statement: it's a normal custom element. When you set an items value
* on it, it responds by asynchronously creating instances of its template
* contents. When you use it inside an element's template, the parent element
* instantiates a `dom-repeat` element, sets its items property, and calls ready
* on it -- at that point, the `dom-repeat` starts its own (async) work, while
* the parent element has its `ready` callback called.

* Polymer guarantees that local DOM children have their `ready` callback called
* before their parent's; however, it cannot guarantee the same thing for the
* `attached` callback. This is one fundamental difference between native
* behaviour and  polyfill behavior.

#### Initialization timing for siblings

There are no guarantees with regard to initialization timing between sibling
elements.

This means that siblings may become `ready` in any order.

For accessing sibling elements when an element initializes, you can call `async`
from inside the `attached` callback:

    attached: function() { this.async(function() { // access sibling or parent
    elements here }); }
### Registration callback

`Polymer.Base` also implements `registerCallback`, which is called by `Polymer()`
to allow `Polymer.Base` to supply a [layering system](experimental.html#feature-layering)
for Polymer features.


## Static attributes on host {#host-attributes}

If a custom element needs HTML attributes set on it at create-time, the attributes may
be declared in a `hostAttributes` property on the prototype, where keys are the
attribute names and values are the values to be assigned.  Values should
typically be provided as strings, as HTML attributes can only be strings;
however, the standard `serialize` method is used to convert values to strings,
so `true` will serialize to an empty attribute, and `false` will result in no
attribute set, and so forth (see [Attribute serialization](properties.html#attribute-serialization) for more
details).

Example:

    <script>

      Polymer({

        is: 'x-custom',

        hostAttributes: {
          'string-attribute': 'Value',
          'boolean-attribute': true
          tabindex: 0
        }

      });

    </script>

Results in:

    <x-custom string-attribute="Value" boolean-attribute tabindex="0"></x-custom>

**Note:** The `class` attribute can't be configured using `hostAttributes`.
{: .alert .alert-error }

## Behaviors {#prototype-mixins}

Elements can share code in the form of _behaviors_, which can define
properties, lifecycle callbacks, event listeners, and other features.

For more information, see [Behaviors](behaviors.html).

## Class-style constructor {#element-constructor}

If you want to set up your custom element's prototype chain but **not** register
it immediately, you can use the  `Polymer.Class` function. `Polymer.Class` takes
the same prototype argument as the `Polymer` function,  and sets up the
prototype chain, but does _not_ register the element. Instead it  returns a
constructor  that can be passed to `document.registerElement` to register your
element with the browser, and after  which can be used to instantiate new
instances of your element via code.

If you want to define and register the custom element in one step, use the
[`Polymer` function](#register-element).

Example:

    var MyElement = Polymer.Class({

      is: 'my-element',

      // See below for lifecycle callbacks
      created: function() {
        this.textContent = 'My element!';
      }

    });

    document.registerElement('my-element', MyElement);

    // Equivalent:
    var el1 = new MyElement();
    var el2 = document.createElement('my-element');

`Polymer.Class` is designed to provide similar ergonomics to a speculative future
where an ES6 class may be defined and provided to `document.registerElement`.

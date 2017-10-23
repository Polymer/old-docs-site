---
title: Registration and lifecycle
---

<!-- toc -->

## Register a custom element {#register-element}


To register a custom element, use the `Polymer` function, and pass in the
prototype for the new element. The prototype must have an `is` property that
specifies the HTML tag name for your custom element.

By specification, the custom element's name **must contain a dash (-)**.

Example: { .caption }

```
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
```

The `Polymer` function registers the element with the browser and returns a
constructor that can be used to create new instances of your element via code.

The `Polymer` function sets up the prototype chain for your custom element,
chaining it to the Polymer `Base` prototype (which provides
Polymer value-added features), so you cannot set up your own
prototype chain. However, you can use [behaviors](#prototype-mixins) to
share code between elements.

<!-- legacy anchor -->
<a id="bespoke-constructor"></a>

### Define a custom constructor {#custom-constructor}

The `Polymer` method returns a basic constructor that can be used to
instantiate the custom element. If you want to
pass arguments to the constructor to configure the new element, you can
specify a custom `factoryImpl` function on the prototype.

The constructor returned from `Polymer` creates an instance using
`document.createElement`, then invokes the user-supplied `factoryImpl` function
with `this` bound to the element instance. Any arguments passed to the actual
constructor are passed on to the `factoryImpl` function.

Example: { .caption }

```
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
```

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

**Note:**
When using native shadow DOM, extension of native elements can have
unexpected behavior and is sometimes not permitted. Test your element with
native shadow DOM enabled to catch any problems during development.
For information on enabling native shadow DOM, see
[Global Polymer settings](settings).
{.alert .alert-error}

To extend a native HTML element, set the `extends` property on your prototype to
the tag name of the element to extend.


Example: { .caption }

```
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
```

To use a type-extension element in markup, use the _native_ tag and add an
`is` attribute that specifies the extension type name:

```
    <input is="my-input">
```

**createElement signature.** By specification, the `createElement` method's second argument should be a 
an object. The usage in the code sample above is specific to Polymer 1.x and works in Chrome, or when using
the custom elements v0 polyfill.
{.alert .alert-info} 

<!-- legacy anchor -->
<a id="basic-callbacks"></a>

### Define an element in the main HTML document {#main-document-definitions}

**Note:**
You should only define elements from the main document when
experimenting. In production, elements should always be defined in
separate files and imported into your main document.
{.alert .alert-error}

To define an element in your main HTML document, define the element
from `HTMLImports.whenReady(callback)`. `callback` is invoked when
all imports in the document have finished loading.

```
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
```

## Lifecycle callbacks {#lifecycle-callbacks}

Polymer's Base prototype implements the standard Custom Element lifecycle
callbacks to perform tasks necessary for Polymer's built-in features.
Polymer in turn calls shorter-named lifecycle methods on your
prototype.

Polymer adds an extra callback, `ready`, which is invoked when Polymer has
finished creating and initializing the element's local DOM.

<table>
  <tr>
    <th>Callback</th>
    <th>Description</th>
  </tr>
  <tr>
    <td><code>created</code></td>
    <td>Called when the element has been created, but before property values are
       set and local DOM is initialized.
      <p>Use for one-time set-up before property values are set.
      </p>
      <p>Use instead of <code>createdCallback</code>.
      </p>
    </td>
  </tr>
  <tr>
    <td><code>ready</code></td>
    <td>Called after property values are set and local DOM is initialized.
      <p>Use for one-time configuration of your component after local
        DOM is initialized. (For configuration based on property values, it
        may be preferable to use an <a href="observers">observer</a>.)
      </p>
    </td>
  </tr>
  <tr>
    <td><code>attached</code></td>
    <td>Called after the element is attached to the document. Can be called multiple
        times during the lifetime of an element. The first `attached`  callback
        is guaranteed not to fire until after `ready`.
      <p>Uses include accessing computed style information, and adding
        document-level event listeners. (If you use declarative
        event handling, such as <a href="events.html#annotated-listeners">annotated
        event listeners</a> or the
        <a href="events#event-listeners"><code>listeners</code> object</a>,
        Polymer automatically adds listeners on attach and removes
        them on detach.)
      </p>
      <p>Use instead of <code>attachedCallback</code>.
      </p>
    </td>
  </tr>
  <tr>
    <td><code>detached</code></td>
    <td>Called after the element is detached from the document. Can be called
        multiple times during the lifetime of an element.
      <p>Uses include removing event listeners added in <code>attached</code>.
      </p>
      <p>Use instead of <code>detachedCallback</code>.
      </p>
    </td>
  </tr>
  <tr>
    <td><code>attributeChanged</code></td>
    <td>Called when one of the element's attributes is changed.
      <p>Use to handle attribute changes that <em>don't</em> correspond to
        declared properties. (For declared properties, Polymer
        handles attribute changes automatically as described in
        <a href="properties#attribute-deserialization">attribute deserialization</a>.)
      </p>
      <p>Use instead of <code>attributeChangedCallback</code>.
      </p>
    </td>
  </tr>
</table>


Example: { .caption }

```
    MyElement = Polymer({

      is: 'my-element',

      created: function() {
        console.log(this.localName + '#' + this.id + ' was created');
      },

      ready: function() {
        console.log(this.localName + '#' + this.id + ' has local DOM initialized');
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
```

<!-- ToDo: the following section should probably be moved to the local DOM chapter. -->

### Ready callback and local DOM initialization {#ready-method}

The `ready` callback is called when a Polymer element's
local DOM has been initialized.

**What is local DOM?**
Local DOM is a subtree of elements created and
managed by your element. It's separate from the element's children,
which are called _light DOM_ for clarity. For more information, see
[Local DOM](local-dom).
{.alert .alert-error}

An element is _ready_ when:

*   Its property values have been configured, with values data-bound from parents,
    deserialized from attribute values, or else set to their default value.

*   Its local DOM template has been instantiated.

*   All of the registered elements **inside the element's local DOM** are ready, and have had
    their `ready` methods called.

Implement `ready` when it's necessary to manipulate an element's
local DOM after the local DOM has been constructed.

```
    ready: function() {
      // access a local DOM element by ID using this.$
      this.$.header.textContent = 'Hello!';
    }
```

**Note:**
This example uses [Automatic node finding](local-dom#node-finding) to
access a local DOM element.
{.alert .alert-info}

Within a given tree, `ready` is generally called in _document order_,
but you should not rely on the ordering of initialization callbacks between
sibling elements, or between a host element and its **light DOM** children.

### Initialization order and timing {#initialization-order}

The element's basic initialization order for a given element is:

-   `created` callback.
-   Local DOM initialized (This means that **local DOM** children are created,
    their property values are set as specified in the template, and `ready`
    has been called on them, assuming they are registered).
-   `ready` callback.
-   [`factoryImpl` callback](#custom-constructor).
-   `attached` callback.

Local DOM children only have `ready` called if they are *registered* custom
elements. If a local DOM child is registered later, its `created` and
`ready` methods are called when that child upgrades, without delaying the
host's remaining callbacks. Importing sources before they are used ensures
that elements are created in order.

Note that while the life cycle callbacks listed above will be called in the
described order for any given element, the  **initialization timing between
elements may vary** depending on many factors, including whether or not the
browser includes native support for web components.

#### Initialization timing for light DOM children

There are no guarantees about the initialization timing of light
DOM children. In general elements are initialized in document order,
so children are usually initialized after their parents.

For example, consider this light DOM for an element `avatar-list`:

```
    <avatar-list>
      <my-photo class="photo" src="one.jpg">First photo</my-photo>
      <my-photo class="photo" src="two.jpg">Second photo</my-photo>
    </avatar-list>
```

`<avatar-list>` is _likely_ to have its `ready` method called before the various
`<my-photo>` elements do.

In addition, the user can add light children at any time after
the parent element has been created. A well-designed element
should handle having its light DOM manipulated at runtime.

To avoid timing issues, you can use the following strategies:

*   Handle light DOM children lazily. For example, a popup menu
    element may need to count its light DOM children. By counting
    its `children` when the menu is opened, it can handle the user
    adding and removing menu items with minimal overhead.

*   To react when children are added and removed, use the
    [`observeNodes` method](local-dom#observe-nodes).

#### Initialization timing for local DOM children

In terms of local DOM and initialization timing, local DOM children are created,
their property values are set as specified in the template, and `ready` is
called on them _before_ their parent's `ready` callback is called.

There are two caveats:

 *  `dom-repeat` and `dom-if` templates create DOM **asynchronously**
    after their properties are updated. For example, if you have a
    `dom-repeat` in your element's local DOM, the `ready` callback is
    invoked before the `dom-repeat` finishes creating its instances.

    If you need to know when a `dom-repeat` or `dom-if` creates or
    removes template instances, listen for its `dom-change` event.
    See [`dom-change` event](templates#dom-change) for details.

*   Polymer guarantees that local DOM children have their `ready` callback called
    before their parent's `ready` callback; however, it cannot guarantee that 
    local DOM children have their `attached` callback called before their parent's
    `attached` callback. This is one fundamental difference between native
    behavior and  polyfill behavior.

#### Initialization timing for siblings

There are no guarantees with regard to initialization timing between sibling
elements.

This means that siblings may become `ready` in any order.

For accessing sibling elements when an element initializes, you can call `async`
from inside the `attached` callback:

```
    attached: function() {
      this.async(function() {
        // access sibling or parent elements here
      });
    }
```

### Registration callback {#registration-callback}

Polymer also provides two registration-time callbacks, `beforeRegister`
and `registered`.

Use the `beforeRegister` callback to transform an element's prototype before
registration. This is useful when registering an element using an ES6 class,
as described in the article, [Building web components using ES6 classes](/1.0/blog/es6).

You can implement the `registered` callback to perform one-time initialization
when an element is registered. This is primarily useful when implementing
[behaviors](behaviors).

## Static attributes on host {#host-attributes}

If a custom element needs HTML attributes set on it at create-time, the attributes may
be declared in a `hostAttributes` property on the prototype, where keys are the
attribute names and values are the values to be assigned.  Values should
typically be provided as strings, as HTML attributes can only be strings;
however, the standard `serialize` method is used to convert values to strings,
so `true` will serialize to an empty attribute, and `false` will result in no
attribute set, and so forth (see [Attribute serialization](properties#attribute-serialization) for more
details).

Example:  { .caption }

```
    <script>

      Polymer({

        is: 'x-custom',

        hostAttributes: {
          'string-attribute': 'Value',
          'boolean-attribute': true,
          tabindex: 0
        }

      });

    </script>
```

Results in:

```
    <x-custom string-attribute="Value" boolean-attribute tabindex="0"></x-custom>
```

**Note:**
The `class` attribute can't be configured using `hostAttributes`.
{.alert .alert-error}

## Behaviors {#prototype-mixins}

Elements can share code in the form of _behaviors_, which can define
properties, lifecycle callbacks, event listeners, and other features.

For more information, see [Behaviors](behaviors).

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

Example: { .caption }

```
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
```

`Polymer.Class` is designed to provide similar ergonomics to a speculative future
where an ES6 class may be defined and provided to `document.registerElement`.

---
layout: default
type: guide
shortname: Docs
title: Registration and lifecycle
subtitle: Developer guide
---

{% include toc.html %}


## Registering a custom element {#register-element}


To register a custom element, use the `Polymer` function, and pass in the
prototype for the new element. The prototype must have an `is` property that
specifies the HTML tag name for your custom element.

Example:

    // register an element
    MyElement = Polymer({

      is: 'my-element',

      // See below for lifecycle callbacks
      created: function() {
        this.innerHTML = 'My element!';
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
prototype chain. However, you can use [prototype mixins](#prototype-mixins) to
share code between elements.

**Note:** Defining an element in the main HTML document is not currently supported.
{: .alert .alert-info }

### Defining a custom constructor {#custom-constructor}

The `Polymer` method returns a basic constructor that can be used to
instantiate the custom element. If you want to 
pass arguments to the constructor to configure the new element, you can 
specify a custom `constructor` function on the prototype. 

This function is not a _true_ constructor, but a configuration function.
The constructor returned from `Polymer` creates an instance using 
`document.createElement`, then invokes the user-supplied `constructor` function 
with `this` bound to the element instance. Any arguments passed to the actual
constructor are passed on to `constructor` function.

Example:

    MyElement = Polymer({

      is: 'my-element',

      constructor: function(foo, bar) {
        this.foo = foo;
        this.configureWithBar(bar);
      },

      configureWithBar: function(bar) {
        ...
      }

    });

    var el = new MyElement(42, 'octopus');


Two notes about the custom constructor:

*   The custom constructor is _only_ invoked when you create an element using the 
    constructor. The custom constructor is not called if the element is created 
    from markup by the HTML parser, or if the element is created using `document.createElement`. 

*   The custom constructor is called after the element is initialized (local DOM 
    created, default values set, and so on). See
    [Ready callback and element initialization](#ready-method) for more information.

### Extending Native HTML elements {#type-extension}

Polymer 0.8 currently only supports extending native HTML elements (for example,
`input`, or `button`, as opposed to 
[extending other custom elements](#todo-inheritance)). To extend a native HTML element, 
set the `extends` property to the tag name of the element to extend.


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

<!-- legacy anchor -->
<a id="basic-callbacks"></a>

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

### Ready callback and element initialization {#ready-method} 

The `ready` method is part of an element's lifecycle and is automatically called
'bottom-up' after the element's template has been stamped and all elements
inside the element's local DOM have been configured (with values bound from
parents, deserialized attributes, or else default values) and had their `ready`
method called. Implement `ready` when it's necessary to manipulate an element's
local DOM when the element is constructed.


    ready: function() {
      <!-- access a local DOM element by ID using this.$ -->
      this.$.header.textContent = 'Hello!';
    }

**Note:** This example uses [Automatic node finding](local-dom.html#node-finding) to
access a local DOM element. 
{: .alert .alert-info }

The element's basic initialization order is:

- created callback  
- local DOM constructed
- default values set 
- ready callback
- custom constructor (if any)
- attached callback

In particular, the `ready` callback is always called before `attached`.

Use the `ready` callback for any code that needs to interact with the element's local DOM.



### Registration callback

`Polymer.Base` also implements `registerCallback`, which is called by `Polymer()` 
to allow `Polymer.Base` to supply a [layering system](experimental.html#feature-layering) 
for Polymer features.


## Static attributes on host {#host-attributes}

If a custom elements needs HTML attributes set on it at create-time, these may
be declared in a `hostAttributes` property on the prototype, where keys are the
attribute name and values are the values to be assigned.  Values should
typically be provided as strings, as HTML attributes can only be strings;
however, the standard `serialize` method is used to convert values to strings,
so `true` will serialize to an empty attribute, and `false` will result in no
attribtue set, and so forth (see [here](#attribute-serialization) for more
details).

Example:

    <script>

      Polymer({

        is: 'x-custom',

        hostAttributes: {
          role: 'button',
          'aria-disabled': true,
          tabindex: 0
        }

      });

    </script>

Results in:

    <x-custom role="button" aria-disabled tabindex="0"></x-custom>

## Prototype mixins {#prototype-mixins}

Polymer will "mixin" objects specified in a `mixin` array into the prototype.
This can be useful for adding common code between multiple elements.

The current mixin feature in 0.8 is basic; it simply loops over properties in
the provided object and adds property descriptors for those on the prototype
(such that `set`/`get` accessors are copied in addition to properties and
functions).  

**Mixin lifecycle:** A mixin can't directly configure properties
or hook info lifecycle callbacks. Instead, the mixin should supply functions 
to be called by the target element at specific points in the element's lifecycle.
These methods should be documented as part of the mixin's usage contract.  
These limitations will likely be revisited in the future.
{: .alert .alert-info }


Example: `fun-mixin.html`

    FunMixin = {

        funCreatedCallback: function() {
          this.makeElementFun();
        },

        makeElementFun: function() {
          this.style.border = 'border: 20px dotted fuchsia;';
        }
      };

    });

Example: `my-element.html`

    <link rel="import" href="fun-mixin.html">

    <script>
      Polymer({

        is: 'my-element',

        mixins: [FunMixin],

        created: function() {
          this.funCreatedCallback();
        }

      });
    </script>

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
        this.innerHTML = 'My element!';
      }

    });

    document.registerElement('my-element', MyElement);

    // Equivalent:
    var el1 = new MyElement();
    var el2 = document.createElement('my-element');

`Polymer.Class` is designed to provide similar ergonomics to a speculative future
where an ES6 class may be defined and provided to `document.registerElement`. 

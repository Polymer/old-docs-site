---
layout: default
type: core
navgroup: docs
shortname: Docs
title: API reference
---

<!-- <p><buildbot-list project="polymer-dev"></buildbot-list></p> -->

{% include toc.html %}

The {{site.project_title}} _core_ provides a thin layer of API on top of web components.
It expresses {{site.project_title}}'s opinion, provides the extra sugaring that all {{site.project_title}} elements use, and is meant to help make developing web components much easier.

## Element declaration

At the heart of {{site.project_title}} are Custom Elements. Thus, it should be no surprise that defining a {{site.project_title}} element is similar to the way you define a standard Custom Element. The major difference is that {{site.project_title}} elements are created declaratively using `<polymer-element>`.

    <polymer-element name="tag-name" constructor="TagName">
      <template>
        <!-- shadow DOM here -->
      </template>
      <script>Polymer('tag-name');</script>
    </polymer-element>

### Attributes

{{site.project_title}} [reserves](https://github.com/Polymer/polymer/blob/master/src/declaration/attributes.js#L53) special attributes to be used on `<polymer-element>`:

<table class="table responsive-table attributes-table">
  <tr>
    <th>Attribute</th><th>Required?</th><th>Description</th>
  </tr>
  <tr>
    <td><code>name</code></td><td><b>required</b></td><td>Name for the custom element. Requires a "-".</td>
  </tr>
  <tr>
    <td><code>attributes</code></td><td>optional</td><td>Used to <a href="#published-properties">publish properties</a>.</td>
  </tr>
  <tr>
    <td><code>extends</code></td><td>optional</td><td>Used to <a href="#extending-other-elements">extend other elements</a>.</td>
  </tr>
  <tr>
    <td><code>noscript</code></td><td>optional</td><td>For simple elements that don't need to call <code>Polymer()</code>. See <a href="#altregistration">Alternate ways to register an element</a>.</td>
  </tr>
  <tr>
    <td><code>constructor</code></td><td>optional</td><td>The name of the constructor to put on the global object. Allows users to create instances of your element using the <code>new</code> operator (e.g. <code>var tagName = new TagName()</code>).</td>
  </tr>
</table>

#### Default attributes {#defaultattrs}

Other attributes you declare on `<polymer-element>` will automatically be included
on each instance of the element. For example:

    <polymer-element name="tag-name" class="active" mycustomattr>
      <template>...</template>
      <script>Polymer('tag-name');</script>
    </polymer-element>

When an instance of `<tag-name>` is created, it contains `class="active" mycustomattr`
as default attributes:

    <tag-name class="active" mycustomattr></tag-name>

### Alternate ways to register an element {#altregistration}

For convenient decoupling of script and markup, you don't have to inline your script.
{{site.project_title}} elements can be created by referencing an external script
which calls `Polymer('tag-name')`:

    <!-- 2. Script referenced inside the element definition. -->
    <polymer-element name="tag-name">
      <template>...</template>
      <script src="path/to/tagname.js"></script>
    </polymer-element>

    <!-- 3. Script comes before the element definition. -->
    <script src="path/to/tagname.js"></script>
    <polymer-element name="tag-name">
      <template>...</template>
    </polymer-element>

    <!-- 4. No script -->
    <polymer-element name="tag-name" constructor="TagName" noscript>
      <template>
        <!-- shadow DOM here -->
      </template>
    </polymer-element>

#### Imperative registration {#imperativeregister}

Elements can be registered in pure JavaScript like so:

    <script>
      Polymer('name-tag', {nameColor: 'red'});
      var el = document.createElement('div');
      el.innerHTML = '\
        <polymer-element name="name-tag" attributes="name">\
          <template>\
            Hello <span style="color:{%raw%}{{nameColor}}{%endraw%}">{%raw%}{{name}}{%endraw%}</span>\
          </template>\
        </polymer-element>';
      // The custom elements polyfill can't see the <polymer-element>
      // unless you put it in the DOM.
      document.body.appendChild(el);    
    </script>

    <name-tag name="John"></name-tag>

Note that you need to add the `<polymer-element>` to the document so that the 
Custom Elements polyfill picks it up.

### Adding public properties and methods {#propertiesmethods}

If you wish to define methods/properties on your element (optional), pass an object
as the second argument to `Polymer()`. This object is used to define
the element's `prototype`.

The following example defines a property `message`, a computed property `greeting`
using an ES5 getter, and a method `foo`: 

    <polymer-element name="tag-name">
      <template>...</template>
      <script>
        Polymer('tag-name', {
          message: "Hello!",
          get greeting() {
            return this.message + ' there!';
          }, 
          foo: function() {...}
        });
      </script>
    </polymer-element>

**Note:** `this` references the custom element itself inside a {{site.project_title}} element. For example, `this.localName == 'tag-name'`.
{: .alert .alert-info }

**Important:** Be careful when initializing properties that are objects or arrays. Due to the nature of `prototype`, you may run into unexpected "shared state" across instances of the same element. If you're initializing an array or object, do it in `ready()` rather than directly on the `prototype`. 

Do this:

    Polymer('x-foo', {
      ready: function() {
        this.list = []; // Initialize and hint type to be array.
        this.person = {}; // Initialize and hint type to an object.
      }
    });
     
instead of this:

    Polymer('x-foo', {
      list: [],
      person: {}
    });

### Adding private or static variables {#static}

If you need private state within an element, wrap your script using standard
techniques like anonymous self-calling functions:

    <polymer-element name="tag-name">
      <template>...</template>
      <script>
        (function() {
          // Ran once. Private and static to the element.
          var foo_ = new Foo();

          // Ran for every instance of the element that's created.
          Polymer('tag-name', {
            get foo() { return foo_; }
          });
        })();
      </script>
    </polymer-element>

### Element lifecycle methods {#lifecyclemethods}

{{site.project_title}} has first class support for the Custom Element lifecycle
callbacks, though for convenience, implements them with shorter names.

All of the lifecycle callbacks are optional: 

    Polymer('tag-name', {
      created: function() { ... },
      ready: function() { ... },
      attached: function () { ... },
      detached: function() { ... },
      attributeChanged: function(attrName, oldVal, newVal) {
        //var newVal = this.getAttribute(attrName);
        console.log(attrName, 'old: ' + oldVal, 'new:', newVal);
      },
    });

Below is a table of the lifecycle methods according to the Custom Elements
[specification](https://dvcs.w3.org/hg/webcomponents/raw-file/tip/spec/custom/index.html#custom-element-lifecycle) vs. the names {{site.project_title}} uses.

Spec | {{site.project_title}} | Called when
|-
createdCallback | created | an instance of the element is created
- | ready | The `<polymer-element>` has been fully prepared (e.g. Shadow DOM created, property observers setup, event listeners attached, etc.)
attachedCallback | attached | an instance was inserted into the document
detachedCallback | detached | an instance was removed from the document
attributeChangedCallback | attributeChanged | an attribute was added, removed, or updated
{: .table .responsive-table .lifecycle-table }

### The polymer-ready event {#polymer-ready}

{{site.project_title}} parses element definitions and handles their upgrade _asynchronously_.
If you prematurely fetch the element from the DOM before it has a chance to upgrade,
you'll be working with an `HTMLUnknownElement`. {{site.project_title}} elements also support inline resources, such as stylesheets, that need to be loaded. These can cause FOUC issues if they're not fully loaded prior to rendering an element. To avoid FOUC, {{site.project_title}} delays registering elements until stylesheets are fully loaded.

To know when elements have been registered/upgraded, and thus ready to be interacted with, use the `polymer-ready` event.

    <head>
      <link rel="import" href="path/to/x-foo.html">
    </head>
    <body>
      <x-foo></x-foo>
      <script>
        window.addEventListener('polymer-ready', function(e) {
          var xFoo = document.querySelector('x-foo');
          xFoo.barProperty = 'baz';
        });
      </script>
    </body>

## Features {#features}

### Published properties

When you _publish_ a property name, you're making that property two-way data-bound and part
of the element's "public API". Published properties can be initialized by an HTML attribute
of the same name. 

There are two ways to publish properties:

1. **Preferred** - Include its name in the `<polymer-element>`'s `attributes` attribute.
2. Include the name in a `publish` object on your prototype.

As an example, here's an element that publishes three public properties, `foo`, `bar`, and `baz`, using the `attributes` attribute:

    <polymer-element name="x-foo" attributes="foo bar baz">
      <script> 
        Polymer('x-foo');
      </script>
    </polymer-element>

And here's one using the `publish` object:

    <polymer-element name="x-foo">
      <script> 
        Polymer('x-foo', {
          publish: {
            foo: 'I am foo!',
            bar: 'Hello, from bar',
            baz: 'Baz up in here'
          }
        });
      </script>
    </polymer-element>

Let's look at the difference between the two and when you might prefer one option over the other.

#### Default property values

By default, properties defined in `attributes` are `null`:

    <polymer-element name="x-foo" attributes="foo">
      <script> 
        Polymer('x-foo'); // x-foo has a foo property with null value.
      </script>
    </polymer-element>

As such, you can provide default values using a combination of the `attributes` attribute and the `prototype`:

    <polymer-element name="x-foo" attributes="bar">
      <script> 
        Polymer('x-foo', { // x-foo has a bar property with default value false.
          bar: false
        });
      </script>
    </polymer-element>

Or you can define the whole thing using the `publish` property:

    <polymer-element name="x-foo">
      <script> 
        Polymer('x-foo', {
          publish: {
            bar: false 
          }
        });
      </script>
    </polymer-element>

Generally it's preferable to use the `attributes` attribute because it's the declarative approach and you can easily see all of the exposed properties at the top of the element.

You should opt for the `publish` property when either of the following is true:

1. Your element has many properties and placing them all on one line feels unwieldy.
2. You want to define default values for properties and prefer the DRYness of doing it all in one place.

#### Configuring an element via attributes

Attributes are a great way for users of your element to configure it, declaratively.
They can customize a published property by passing an initial value on the attribute
with the same name:

    <x-foo name="Bob"></x-foo>

##### Hinting an attribute's type {#attrhinting}

When attribute values are converted to property values, {{site.project_title}} attempts to convert the value to the correct type, depending on the default value of the property.

    <polymer-element name="x-foo" attributes="foo">
      <script> 
        Polymer('x-foo', {
          foo: false // hint that foo is Boolean
        });
      </script>
    </polymer-element>

##### Property reflection to attributes {#attrreflection}

Property values are reflected back into their attribute counterpart. For example, setting `this.name = "Joe"` or calling `this.setAttribute('name', 'Joe')` from within the element updates the markup accordingly:

    <x-foo name="Joe"></x-foo>

### Data binding and custom attributes

Published properties are data-bound inside of {{site.project_title}} elements and accessible
via `{%raw%}{{}}{%endraw%}`. These bindings are by reference and are two-way.

For example, we can define a `name-tag` element that publishes two properties,
`name` and `nameColor`.

    <polymer-element name="name-tag" attributes="name nameColor">
      <template>
        Hello! My name is <span style="color:{{"{{nameColor"}}}}">{{"{{name"}}}}</span>
      </template>
      <script>
        Polymer('name-tag', {
          nameColor: "orange"
        });
      </script>
    </polymer-element>

In this example, `name` has initial value of `null` and `nameColor` has a value of "orange".
Thus, the `<span>`'s color will be orange.

#### Binding objects and arrays to attribute values

**Important:** Be careful when your properties are objects or arrays. Element registration
is evaluated once. This means only one instance of an object used in property initialization is ever created. Because of the nature of `prototype`, you may run into unexpected "shared state" across different instances of the same element if you're setting an initial value for a property which is an object or array. Do this type of initialization in `created()` rather than directly on the `prototype`. 
{: .alert .alert-error }

Generally, attributes are string values, but {{site.project_title}} makes it possible to bind references between elements using attributes. The binding engine interprets reference bindings
by interrogating the [attribute's type](#attrhinting). This means you 
can bind an an object to an HTML attribute!

Let's modify the `name-tag` example to take an object instead of individual properties.

    <polymer-element name="name-tag" attributes="person">
      <template>
        Hello! My name is <span style="color:{{"{{person.nameColor"}}}}">{{"{{person.name"}}}}</span>
      </template>
      <script>
        Polymer('name-tag', {
          created: function() {
            this.person = {
              name: "Scott",
              nameColor: "orange"
            }
          }
        });
      </script>
    </polymer-element>

Now, imagine we make a new component called `<visitor-creds>` that uses `name-tag`:

    <polymer-element name="visitor-creds">
      <template>
        <name-tag person="{{"{{person"}}}}"></name-tag>
      </template>
      <script>
        Polymer('visitor-creds', {
          created: function() {
            this.person = {
              name: "Scott2",
              nameColor: "red"
            }
          }
        });
      </script>
    </polymer-element>

When an instance of `<visitor-creds>` is created, its `person` property (an object)
is also bound to `<name-tag>`'s `person` property. Now both components are using
the same `person` object.

### Declarative event mapping

{{site.project_title}} supports declarative binding of events to methods in the component.
It uses special <code>on-<em>event</em></code> syntax to trigger this binding behavior.

    <polymer-element name="g-cool" on-keypress="{% raw %}{{keypressHandler}}{% endraw %}">
      <template>
        <button on-click="{% raw %}{{buttonClick}}{% endraw %}"></button>
      </template>
      <script>
        Polymer('g-cool', {
          keypressHandler: function(event, detail, sender) { ...},
          buttonClick: function(event, detail, sender) { ... }
        });
      </script>
    </polymer-element>

In this example, the `on-keypress` declaration maps the standard DOM `"keypress"` event to the `keypressHandler` method defined on the element. Similarly, a button within the element
declares a `on-click` handler for click events that calls the `buttonClick` method.
All of this is achieved without the need for any glue code. 

Some things to notice:

* The value of an event handler attribute is the string name of a method on the component. Unlike traditional syntax, you cannot put executable code in the attribute.
* The event handler is passed the following arguments:
  * `inEvent` is the [standard event object](http://www.w3.org/TR/DOM-Level-3-Events/#interface-Event).
  * `inDetail`: A convenience form of `inEvent.detail`.
  * `inSender`: A reference to the node that declared the handler. This is often different from `inEvent.target` (the lowest node that received the event) and `inEvent.currentTarget` (the component processing the event), so  {{site.project_title}} provides it directly.

### Observing properties {#observeprops}

#### Changed watchers {#change-watchers}

The simplest way to observe property changes on your element is to use a changed watcher.
All properties on {{site.project_title}} elements can be watched for changes by implementing a <code><em>propertyName</em>Changed</code> handler. When the value of a watched property changes, the appropriate change handler is automatically invoked. 

    <polymer-element name="g-cool" attributes="better best">
      <script>
        Polymer('g-cool', {
          plain: '',
          best: '',
          betterChanged: function(oldValue, newValue) {
            ...
          },
          bestChanged: function(oldValue, newValue) {
            ...
          }
        });
      </script>
    </polymer-element>

In this example, there are two watched properties, `better` and `best`. The `betterChanged` and `bestChanged` function will be called whenever `better` or `best` are modified, respectively. 

#### Custom property observers - `observe` blocks {#observeblock}

Sometimes a [changed watcher](#change-watchers) is not enough. For more control over
property observation, {{site.project_title}} provides `observe` blocks.

An `observe` block defines a custom property/observer mapping for one or more properties.
It can be used to watch for changes to nested objects or share the same callback
for several properties.

**Example:** - share a single observer

    Polymer('x-element', {
      foo: '',
      bar: '',
      observe: {
        foo: 'validate',
        bar: 'validate'
      },
      ready: function() {
        this.foo = 'bar';
        this.bar = 'foo';
      },
      validate: function(oldValue, newValue) {
        ...
      },
    });

In the example, `validate()` is called whenever `foo` or `bar` changes.

**Example:** - using automatic node in an `observe` block

When an element has an id, you can use `this.$` in the `observe` block to watch
a property on that element:

    <template>
      <x-foo id="foo"></x-foo>
    </template>
    ...
    Polymer('x-element', {
      observe: {
        '$.foo.someProperty': 'fooPropertyChanged'
      },
      fooPropertyChanged: function(oldValue, newValue) {
        ...
      }
    });

**Example:** - watching for changes to a nested object path

    Polymer('x-element', {
      observe: {
        'a.b.c': 'validateSubPath'
      },
      ready: function() {
        this.a = {
          b: {
            c: 'exists'
          }
        };
      },
      validateSubPath: function(oldValue, newValue) {
        var value = Path.get('a.b.c').getValueFrom(this);
        // oldValue == undefined
        // newValue == value == this.a.b.c === 'exists'
      }
    });

It's important to note that **{{site.project_title}} does not call the <code><em>propertyName</em>Changed</code> callback for properties included in an `observe` block**. Instead, the defined observer gets called.

    Polymer('x-element', {
      bar: '',
      observe: {
        bar: 'validate'
      },
      barChanged: function(oldValue, newValue) {
        console.log("I'm not called");
      },
      validate: function(oldValue, newValue) {
        console.log("I'm called instead");
      }
    });

### Automatic node finding

Another useful feature of {{site.project_title}} is node reference marshalling. Every node in a component's shadow DOM that is tagged with an `id` attribute is automatically referenced in the component's `this.$` hash. 

For example, the following defines a component whose template contains an `<input>` element whose `id` attribute is `nameInput`. The component can refer to that element with the expression `this.$.nameInput`.

    <polymer-element name="x-form">
      <template>
        <input type="text" id="nameInput">
      </template>
      <script>
        Polymer('x-form', {
          logNameValue: function() {
            console.log(this.$.nameInput.value);
          }
        });
      </script>
    </polymer-element>

### Firing custom events {#fire}

{{site.project_title}} core provides a convenient `fire()` method for
sending custom events. Essentially, it's a wrapper around your standard `node.dispatchEvent(new CustomEvent(...))`. In cases where you need to fire an event after microtasks have completed,
use the asynchronous version: `asyncFire()`.

Example:

{% raw %}
    <polymer-element name="ouch-button">
      <template>
        <button on-click="{{onClick}}">Send hurt</button> 
      </template>
      <script>
        Polymer('ouch-button', {
          onClick: function() {
            this.fire('ouch', {msg: 'That hurt!'}); // fire(inType, inDetail, inToNode)
          }
        });
      </script>
    </polymer-element>

    <ouch-button></ouch-button>

    <script>
      document.querySelector('ouch-button').addEventListener('ouch', function(e) {
        console.log(e.type, e.detail.msg); // "ouch" "That hurt!"
      });
    </script>
{% endraw %}

**Tip:** If your element is within another {{site.project_title}} element, you can
use the special [`on-*`](#declarative-event-mapping) handlers to deal with the event: `<ouch-button on-ouch="{% raw %}{{myMethod}}{% endraw %}"></ouch-button>`
{: .alert .alert-success }

### Extending other elements

A {{site.project_title}} element can extend another element by using the `extends`
attribute. The parent's properties and methods are inherited by the child element
and data-bound.

    <polymer-element name="polymer-cool">
      <!-- UI-less element -->
      <script>
        Polymer('polymer-cool', {
          praise: 'cool'
        });
      </script>
    </polymer-element>

    <polymer-element name="polymer-cooler" extends="polymer-cool">
      <template>
        {%raw%}{{praise}}{%endraw%} <!-- "cool" -->
      </template>
      <script>
        Polymer('polymer-cooler');
      </script>
    </polymer-element>

#### Overriding a parent's methods

When you override an inherited method, you can call the parent's method with `this.super()`, and optionally pass it a list of arguments (e.g. `this.super([arg1, arg2])`). The reason the paramater is an array is so you can write `this.super(arguments)`.

{% raw %}
    <polymer-element name="polymer-cool">
      <script>
        Polymer('polymer-cool', {
          praise: 'cool',
          makeCoolest: function() {
            this.praise = 'coolest';
          }
        });
      </script>
    </polymer-element>

    <polymer-element name="polymer-cooler" extends="polymer-cool" on-click="{{makeCoolest}}">
      <template>polymer-cooler is {{praise}}</template>
      <script>
        Polymer('polymer-cooler', {
          praise: 'cooler',
          makeCoolest: function() {
            this.super(); // calls polymer-cool's makeCoolest()
          }
        });
      </script>
    </polymer-element>

    <polymer-cooler></polymer-cooler>
{% endraw %}

In this example, when the user clicks on a `<polymer-cooler>` element, its
`makeCoolest()` method is called, which in turn calls the parent's version
using `this.super()`. The `praise` property (inherited from `<polymer-cool>`) is set
to "coolest".

## Advanced topics {#additional-utilities}

- [`async()`](#asyncmethod)
- [`unbindAll()` / `cancelUnbindAll()` / `asyncUnbindAll()`](#bindings)
  - [`.preventDispose`](#preventdispose)
- [`Platform.flush()`](#flush)

### Dealing with asynchronous tasks {#asyncmethod}

Many things in {{site.project_title}} happen asynchronously. Changes are gathered up
and executed all at once, instead of executing right away. Batching
changes creates an optimization that (a) prevents duplicated work and (b) reduces unwanted [FOUC](http://en.wikipedia.org/wiki/Flash_of_unstyled_content).

[Change watchers](#change-watchers) and situations that rely on data-bindings
are examples that fit under this async behavior. For example, conditional templates may not immediately render after setting properties because changes to those renderings are saved up and performed all at once after you return from JavaScript.

To do work after changes have been processed, {{site.project_title}} provides `async()`.
It's similar to `window.setTimeout()`, but automatically binds `this` to the correct value:

    // async(inMethod, inArgs, inTimeout)
    this.async(function() {
      this.foo = 3;
    }, null, 1000);

    // Roughly equivalent to:
    //setTimeout(function() {
    //  this.foo = 3;
    //}.bind(this), 1000);

The first argument is a function or string name for the method to call asynchronously.
The second argument, `inArgs`, is an optional object or array of arguments to
pass to the callback.

In the case of property changes that result in DOM modifications, follow this pattern:

    Polymer('my-element', {
      propChanged: function() {
        // If "prop" changing results in our DOM changing, schedule an update after
        // the new microtask.
        this.async(this.updateValues);
      },
      updateValues: function() {...}
    });

### Life of an element's bindings {#bindings}

**Note:** The section only applies to elements that are instantiated in JavaScript, not to those
declared in markup.
{: .alert .alert-info }

If you instantiate an element (e.g. `document.createElement('x-foo')`) and do **not** add it to the DOM,
{{site.project_title}} asynchronously removes its {%raw%}`{{}}`{%endraw%} bindings and `*Changed` methods.
This helps prevent memory leaks, ensuring the element will be garbage collected. 

If you want the element to "remain active" when it's not in the `document`,
call `cancelUnbindAll()` right after you create or remove it. The [lifecycle methods](#lifecyclemethods)
are a good place for this:

    Polymer('my-element', {
      ready: function() {
        // Ensure bindings remain active, even if we're never added to the DOM.
        this.cancelUnbindAll();
      },
      detached: function() {
        // Also keep bindings active if we're added, but later removed.
        this.cancelUnbindAll();
      }
    });

{{site.project_title}} typically handles this management for you, but when you
explicitly call `cancelUnbindAll()` (and the element is never added to/put back in the DOM),
it becomes your responsibility to _eventually_ unbind the element using `unbindAll()/asyncUnbindAll()`,
otherwise your application may leak memory.

    var el = document.createElement('my-element');
    // Need to unbind if el is:
    //   1. never added to the DOM
    //   2. put in the DOM, but later removed
    el.unbindAll();

#### Using preventDispose {#preventdispose}

To force bindings from being removed in call cases, set `.preventDispose`:

    Polymer('my-element', {
      preventDispose: true
    });

### How data changes are propagated {#flush}

Data changes in {{site.project_title}} happen almost immediately (at end of a microtask)
when `Object.observe()` is available. When it's not supported, {{site.project_title}} uses a polyfill ([observe-js](https://github.com/Polymer/observe-js)) to poll and periodically propagate data-changes throughout the system. This is done through a method called `Platform.flush()`.

#### What is `Platform.flush()`?

`Platform.flush()` is part of {{site.project_title}}'s data observation polyfill, [observe-js](https://github.com/Polymer/observe-js). It dirty check's all objects that have been observed and ensures notification callbacks are dispatched. {{site.project_title}} automatically calls `Platform.flush()` periodically, and this should be sufficient for most application workflows. However, there are times when you'll want to call `Platform.flush()` in application code.

**Note**: on platforms that support `Object.observe()` natively, `Platform.flush()` does nothing.
{: .alert .alert-info }

#### When should I call `Platform.flush()`?

Instead of waiting for the next poll interval, one can manually schedule an update by calling `Platform.flush()`. **There are very few cases where you need to call `Platform.flush()` directly.**

If it's important that a data change propagates before the next screen paint, you may
need to manually call `Platform.flush()`. Here are specific examples:

1. A property change results in a CSS class being added to a node. Often, this works out fine, but sometimes, it's important to make sure the node does not display without the styling from the added class applied to it. To ensure this, call `Platform.flush()` in the property change handler after adding the CSS class.
2. The author of a slider element wants to ensure that data can propagate from it as the user slides the slider. A user of the element, might, for example, bind the slider's value to an input and expect to see the input change while the slider is moving. To achieve this, the element author calls `Platform.flush()` after setting the element's value in the `ontrack` event handler.

**Note:** {{site.project_title}} is designed such that change notifications are asynchronous. Both `Platform.flush()` and `Object.observe()` (after which it's modeled) are asynchronous. Therefore, **`Platform.flush()` should not be used to try to enforce synchronous data notifications**. Instead, always use [change watchers](#change-watchers) to be informed about state.

### How {{site.project_title}} elements prepare themselves {#prepare}

For performance reasons, `<polymer-element>`s avoid the expense of preparing ShadowDOM, event listeners, and property observers if they're created outside the main document.
This behavior is similar to how native elements such as `<img>` and `<video>` behave.
They remain in a semi-inert state when created outside the main document (e.g. an `<img>` avoids the expense of loading its `src`).

{{site.project_title}} elements prepare themselves automatically in the following cases:

1. when they're created in a `document` that has a `defaultView` (the main document)
2. when they receive the `attached` callback
3. when they're created in the `shadowRoot` of another element that is preparing itself

In addition, if the `.alwaysPrepare` property is set to `true`, {{site.project_title}} elements
prepare themselves even when they do not satisfies the above rules.

    Polymer('my-element', {
      alwaysPrepare: true
    });

**Note:** an element's [`ready()` lifecycle callback](#lifecyclemethods) is called after an element has been prepared. Use `ready()` to know when an element is done initializing itself.
{: .alert .alert-success }

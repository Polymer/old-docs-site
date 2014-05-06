---
layout: default
type: core
navgroup: docs
shortname: Docs
title: API guide
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

#### Attribute case sensitivity {#attrcase}

It's worth noting that the HTML parser considers attribute names *case insensitive*. Property names in JavaScript are however *case sensitive*.

This means that attributes can be written any way that you like, but if you look at an element's attribute list, the names will always be lowercase. Polymer is aware of this and will attempt to match the attributes to properties carefully. For example, this should work as expected:

    <name-tag nameColor="blue" name="Blue Name"></name-tag>

The fact that the `nameColor` attribute is actually lowercase in DOM can generally just be ignored.

This also means that any of the below examples will also work:

    <name-tag NaMeCoLoR="blue" name="Blue Name"></name-tag>
    <name-tag NAMECOLOR="red" name="Red Name"></name-tag>
    <name-tag NAMEcolor="green" name="Green Name"></name-tag>

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
      <template>{{greeting}}</template>
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

    // Good!
    Polymer('x-foo', {
      ready: function() {
        this.list = []; // Initialize and hint type to be array.
        this.person = {}; // Initialize and hint type to an object.
      }
    });

    // Bad.
    Polymer('x-foo', {
      list: [], // Don't initialize array or objects on the prototype.
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



### Supporting global variables {#global}

There are times when you may like to define properties of an application globally once and then make them available inside all of your elements. For example, you may want to define configuration information and then reference them inside individual components. You may want one single easing curve for all animations. We may want to store information like the currently logged-in user that we consider "global".

To achieve this, you can use the [MonoState Pattern](http://c2.com/cgi/wiki?MonostatePattern).When defining a Polymer element, define a closure that closes over the variables in question, and then provide accessors on the object's prototype or copy them over to individual instances in the constructor.

    <polymer-element name="app-globals">
      <script>
      (function() {
        var firstName = 'John';
        var lastName = 'Smith';

        Polymer('app-globals', {
           ready: function() {
             this.firstName = firstName;
             this.lastName = lastName;
           }
        });
      })();
      </script>
    </polymer-element>

Then use the element as you would any other, and data-bind it to a property that you can use to access it through Polymer's data-binding:

    <polymer-element name="my-component">
      <template>
        <app-globals id="globals"></app-globals>
        <div id="firstname">{{globals.firstName}}</div>
        <div id="lastname">{{globals.lastName}}</div>
      </template>
      <script>
        Polymer('my-component', {
          ready: function() { this.globals = this.$.globals; }
         });
      </script>
    </polymer-element>

A slight tweak of this approach let's you configure the value of the globals externally:

    <polymer-element name="app-globals">
      <script>
      (function() {
        var values = {};

        Polymer('app-globals', {
           ready: function() {
             for (var i = 0; i < this.attributes.length; ++i) {
               var attr = this.attributes[i];
               values[attr.nodeName] = attr.nodeValue;
             }
           }
        });
      })();
      </script>
    </polymer-element>

The main page configures the globals by passing attributes:

    <app-globals firstName="Addy" lastName="Osmani"></app-globals>


### Element lifecycle methods {#lifecyclemethods}

{{site.project_title}} has first class support for the Custom Element lifecycle
callbacks, though for convenience, implements them with shorter names.

All of the lifecycle callbacks are optional: 

    Polymer('tag-name', {
      created: function() { ... },
      ready: function() { ... },
      attached: function () { ... },
      domReady: function() { ... },
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
createdCallback | created | An instance of the element is created.
- | ready | The `<polymer-element>` has been fully prepared (e.g. Shadow DOM created, property observers setup, event listeners attached, etc).
attachedCallback | attached | An instance of the element was inserted into the DOM. 
- | domReady | Called when the element's initial set of children are guaranteed to exist. This is an appropriate time to poke at the element's parent or light DOM children. Another use is when you have sibling custom elements (e.g. they're `.innerHTML`'d together, at the same time). Before element A can use B's API/properties, element B needs to be upgraded. The `domReady` callback ensures both elements exist.
detachedCallback | detached | An instance was removed from the DOM.
attributeChangedCallback | attributeChanged | An attribute was added, removed, or updated. **Note**: to observe changes to [published properties](#published-properties), use [*Changed watchers](#change-watchers).
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


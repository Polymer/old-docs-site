---
layout: default
title: Polymer core
---

{% comment %}
{% include outofdate.html %}
{% endcomment %}

The {{site.project_title}} _core_ provides a thin layer of code that expresses
its opinion and provides the extra sugaring that all {{site.project_title}} elements use.
It is provided in the file `polymer.js`.

**Note:** You can find working examples of the concepts on this page in [/toolkit-ui](https://github.com/polymer/toolkit-ui), [/polymer-elements](https://github.com/Polymer/polymer-elements), and [/polymer-ui-elements](https://github.com/Polymer/polymer-ui-elements).
{: .alert .alert-success }

## Element declaration

Every {{site.project_title}} element is a Custom Element at heart. Their 
declaration looks no different than your standard element definition:

    <element name="tag-name" constructor="TagName">
      <template>
        <!-- shadow DOM here -->
      </template>
      <script>
        // lifecycle setup here
      </script>
    </element>

**Reminder:** The `name` attribute specifies the name of the HTML tag when you
instantiate the element in markup (e.g. `<tag-name>`). It must be a "-" separated string.
{: .alert }

### Initializing {{site.project_title}} elements

To register `<tag-name>` and super charge it as a {{site.project_title}} element,
include a `<script>` that calls `{{site.project_title}}.register`:

    <element name="tag-name">
      <template>
        <!-- shadow DOM here -->
      </template>
      <script>
        {{site.project_title}}.register(this);
      </script>
    </element>

`{{site.project_title}}.register` is a convenience wrapper for [`document.register`](/platform/custom-elements.html#documentregister). Its first argument is reference to the element you're creating. Since script within an `<element>` runs in the context of the element,
`this` refers our `<tag-name>` element.

The second argument (optional) is an object that defines your element's `prototype`. 
In the following example the registration call defines a property `message` and
a method, `ready`: 

    {{site.project_title}}.register(this, {
      message: "Hello!",
      ready: function() {
        // component is ready now. Let's do stuff.
      }
    });

The `ready` method, if included, is analogous to the [Custom Element `readyCallback`](/platform/custom-elements.html#element-registration). It's called when the user creates
an instance of your element (if it has already been registered by the browser).

#### The `WebComponentsReady` event {#WebComponentsReady}

The polyfill(s) parse `<element>` definitions and handle their upgrade _asynchronously_.
If you try to fetch the element from the DOM before things have settled, you'll get a big fat `null`.
In these situations, an including page should wait for the `WebComponentsReady` event
before working with the node.

Example:

    <head>
      <link rel="import" href="path/to/x-foo.html">
    </head>
    <body style="opacity:0">
      <x-foo></x-foo>
      <script>
        window.addEventListener('WebComponentsReady', function() {
          document.body.style.opacity = 1; // show body now that registration is done.

          var xFoo = document.querySelector('x-foo');
          // Do something with x-foo.
        });
      </script>
    </body>

**Tip:** Use the `WebComponentsReady` event to mitigate FOUC in browsers that don't
support the CSS `:unknown` pseudo class.
{: .alert .alert-success }

## {{site.project_title}} Features {#features}

### Published properties

When you _publish_ a property name, you're making that property two-way data-bound and part
of the element's "public API". Published properties are mapped to an HTML attribute
of the same name. 

There are two ways to publish properties:

1. **Preferred** - Include its name in the `<element>`'s `attributes` attribute.
1. Include the name in a `publish` object on your prototype.

As an example, here's an element that publishes three public properties, `foo`, `bar`, and `baz`:

    <element name="x-foo" attributes="foo bar baz">
      <script> 
        Polymer.register(this);
      </script>
    </element>

#### Default property values

By default, properties defined in `attributes` are `null`:

    <element name="x-foo" attributes="foo">
      <script> 
        Polymer.register(this); // x-foo has a foo property with null value.
      </script>
    </element>

As such, you can provide default values using the prototype:

    <element name="x-foo" attributes="foo">
      <script> 
        Polymer.register(this, { // x-foo has a foo property with default value false.
          foo: false
        });
      </script>
    </element>

    <!-- Same, but using the alternate "publish" object. -->
    <element name="x-foo">
      <script> 
        Polymer.register(this, {
          publish: {
            foo: false 
          }
        });
      </script>
    </element>

#### Configuring an element via attributes

Attributes are a great way for users of your element to configure it, declaratively.
They can customize a published property by passing an initial value on the attribute
with the same name:

    <x-foo foo="true"></x-foo>

**Note:** As of today, property values are not reflected back into markup. Also, setting
an attribute using `.setAttribute()`) has no effect.
{: .alert }

##### Hinting an attribute's type

When attribute values are converted to property values, {{site.project_title}} attempts to convert the value to the correct type, depending on the default value of the property.

    <element name="x-foo" attributes="foo">
      <script> 
        Polymer.register(this, {
          foo: false // hint that foo is Boolean
        });
      </script>
    </element>

### Data binding and custom attributes

Published properties are data-bound inside of {{site.project_title}} elements an accessible
via MDV's `{%raw%}{{}}{%endraw%}`. These bindings are by reference and are two-way.

For example, we can define a `name-tag` element that publishes two properties,
`name` and `nameColor`.

    <element name="name-tag" attributes="name nameColor">
      <template>
        Hello! My name is <span style="color:{{"{{nameColor"}}}}">{{"{{name"}}}}</span>
      </template>
      <script>
        {{site.project_title}}.register(this, {
          nameColor: "orange"
        });
      </script>
    </element>

In this example, `name` has initial value of `null` and `nameColor` has a value of "orange".
Thus, the `<span>`s color will be orange.

#### Binding objects to attribute values

Generally, attributes are string values, but {{site.project_title}} makes it possible to bind references between elements using attributes. The binding engine interprets reference bindings
by interrogating the [attribute's type](#hinting-an-attributes-type). This means you 
can bind an an object to an HTML attribute!

Let's modify the `name-tag` example to take an object instead of individual properties.

    <element name="name-tag" attributes="person">
      <template>
        Hello! My name is <span style="color:{{"{{person.nameColor"}}}}">{{"{{person.name"}}}}</span>
      </template>
      <script>
        {{site.project_title}}.register(this, {
          ready: function() {
            this.person = {
              name: "Scott",
              nameColor: "orange"
            }
          }
        });
      </script>
    </element>

Now, imagine we make a new component called `<visitor-creds>` that uses `name-tag`:

    <element name="visitor-creds">
      <template>
        <name-tag person="{{"{{person"}}}}"></name-tag>
      </template>
      <script>
        {{site.project_title}}.register(this, {
          ready: function() {
            this.person = {
              name: "Scott2",
              nameColor: "red"
            }
          }
        });
      </script>
    </element>

When an instance of `<visitor-creds>` is created, its `person` property (an object),
is also bound to `<name-tag>`'s `person` property. Now both components are using
the same `person` object.

**Important:** Be careful when your properties are objects or arrays. Element registration
is evaluated once. This means only one instance of an object used in property initialization is ever created. Because of the nature of `prototype`, you may run into unexpected "shared state" across different instances of the same element if you're setting an initial value for a property which is an object or array. Do this type of initialization in `ready()` rather than directly on the `prototype`. 
{: .alert .alert-error }

### Declarative event mapping

{{site.project_title}} supports declarative binding of events to methods in the component.
It uses special <code>on-<em>event</em></code> syntax to trigger this binding behavior.

    <element name="g-cool" on-keypress="keypress">
      <template>
        <button on-click="buttonClick"></button>
      </template>
      <script>
        {{site.project_title}}.register(this, {
          keypress: function(event) { ...},
          buttonClick: function(event) { ... }
        });
      </script>
    </element>

In this example, the `on-keypress` declaration maps the standard DOM `"keypress"` event to the `keypress` method in the component. Within the component template, the `on-click` declaration maps a custom `buttonClick` event to the `buttonClick` method in the component. This is achieved again without the need for any glue code. 

Some things to notice:

* The value of an event handler attribute is the string name of a method on the component. Unlike traditional syntax, you cannot put executable code in the attribute.
* The event handler is passed the following arguments:
  * `inEvent` is the [standard event object](http://www.w3.org/TR/DOM-Level-3-Events/#interface-Event).
  * `inDetail`: A convenience form of `inEvent.detail`.
  * `inSender`: A reference to the node that declared the handler. This is often different from `inEvent.target` (the lowest node that received the event) and `inEvent.currentTarget` (the component processing the event), so  {{site.project_title}} provides it directly.

## Advanced sugaring

In addition to the above features, which are focused around making the core functionality of components simple and easy to use, {{site.project_title}} provides syntactical sugar that makes more advanced component features easy to create.

### Change watchers

All properties on {{site.project_title}} elements can be watched for changes by implementing a <code><em>propertyName</em>Changed</code> handler. When the value of a watched property changes, the appropriate change handler is automatically invoked. 

    <element name="g-cool" attributes="better best">
      <script>
        {{site.project_title}}.register(this, {
          plain: '',
          best: ''
          betterChanged: function(inOldValue) {
          },
          bestChanged: function(inOldValue) {
          }
        });
      </script>
    </element>

In this example, there are two watched properties, `better` and `best`. The `betterChanged` and `bestChanged` function will be called whenever `better` or `best` are modified, respectively. 

### Automatic node finding

Another useful feature of {{site.project_title}} is node reference marshalling. Every node in a component's shadow DOM that is tagged with an `id` attribute is automatically referenced in components `this.$` hash. 

For example, the following defines a component whose template contains an `<input>` element whose `id` attribute is `nameInput`. The component can refer to the that element with the expression `this.$.nameInput`.

    <element name="x-form">
      <template>
        <input type="text" id="nameInput">
      </template>
      <script>
        {{site.project_title}}.register(this, {
          logNameValue: function() {
            console.log(this.$.nameInput.value);
          }
        });
      </script>
    </element>

### Calling inherited methods with this.super

A {{site.project_title}} component can extend a parent component by calling the parent's inherited methods. 

    <element name="g-cooler" extends="g-cool">
      <script>
        {{site.project_title}}.register({
          moarBetter: function() {
            this.super();
            this.better += 'even more.';
          }
        });
      </script>
    </element>

In this example, `this.super` returns a reference to the parent, which is a
`g-cool` component. In `g-cooler` the value of `better` is "g-cool is", plus the string "even more".

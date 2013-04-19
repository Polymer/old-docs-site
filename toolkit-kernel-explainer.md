---
layout: default
title: Toolkit kernel
---

{% comment %}
{% include outofdate.html %}
{% endcomment %}

The Toolkit _kernel_ provides a thin layer of code that expresses the Toolkit
opinion, and provides the sugar that all components use. The kernel code is
provided by a file named `toolkit.js`.

## Component declaration

A web component declaration looks like the following:

    <element name="tag-name">
      <template>
        <!-- shadow DOM here -->
      </template>
      <script>
        // lifecycle setup here
      </script>
    </element>

To have this component add the `Toolkit.register` lifecycle initializer to
the component's `<script>` block, as shown below:

    <element name="tag-name">
      <template>
        <!-- shadow DOM here -->
      </template>
      <script>
        Toolkit.register(this);
      </script>
    </element>

Note the following:

- The `Toolkit.register` initializer is all that is required to  prepare this
component to use Toolkit [conventions and features](#features). 
- The "name" attribute specifies the name of the custom `<element>` and
determines the name of the tag when you instantiate the component in markup.
For example, `<tag-name>` in this example. The name should be a "-" separated string.

### Component initialization

The first argument to `Toolkit.register` is a reference to the `<element>` element. Since scripts
within an element tag run in the context of the element, the value of this 
argument is simply 'this'.

You can supply a second object argument to `Toolkit.register` to define the object
prototype. In the following example the component initializer defines a property
`message` and a method `ready`. 

    Toolkit.register(this, {
      message: "Hello!",
      ready: function() {
        // component is ready now, we can do stuff
      }
    });

A component's `ready` method, if it exists, is called when the component is ready for it to be used.

## Toolkit Features

### Publishing properties

By default, properties you declare are not accessible via attribute. You can _publish_ a property by listing it in the `attributes` attribute on the `<element>` tag. Published properties can be initialized using attributes on the node, and can be data-bound using attributes on the node.

A property declared in the `attributes` attribute is initially set to `null`. You can provide a more appropriate default value by also including the property directly in your prototype, as usual.


    <element name="name-tag" attributes="myName nameColor">
      <template>
        Hello! My name is <span style="color:{{"{{nameColor"}}}}">{{"{{myName"}}}}</span>
      </template>
      <script>
        Toolkit.register(this, {
          nameColor: "orange"
        });
      </script>
    </element>
 
In this case, `name-tag` declares two attributes (`myName` and `nameColor`). Note that properties declared as attributes default to 'null' unless defaults are set in the prototype, as done for `nameColor` in the above example.

#### Binding and custom attributes

Toolkit makes it possible to bind references between components via attributes. Generally, attributes are only string-valued, so the binding engine interprets reference bindings specially (in particular, interrogating an attribute for a bound reference property will just return the binding expression (the double-mustache).

Let's modify our `name-tag` to take a record instead of individual properties.

    <element name="name-tag" attributes="person">
      <template>
        Hello! My name is <span style="color:{{"{{person.nameColor"}}}}">{{"{{person.name"}}}}</span>
      </template>
      <script>
        Toolkit.register(this, {
          person: {
            name: "Scott",
            nameColor: "orange"
          }
        });
      </script>
    </element>

Now, imagine we make a new component called 'visitor-creds' that uses `name-tag`:

    <element name="visitor-creds">
      <template>
        <name-tag person="{{person"}}"></name-tag>
      </template>
      <script>
        this.component({
          person: {
            name: "Scott",
            nameColor: "orange"
          }
        });
      </script>
    </element>

When I make an instance of `visitor-creds`, its `person` object is bound to the `name-tag` instance, so now both components are using the same `person` object.


### Declarative event mapping

Toolkit supports declarative binding of events to methods in the component. The toolkit uses special <code>on-<em>event</em></code> syntax to trigger this binding behavior.

    <element name="g-cool" on-keypress="keypress">
      <template>
        <button on-click="buttonClick"></button>
      </template>
      <script>
        Toolkit.register(this, {
          keypress: function(event) {
          },
          buttonClick: function(event) {
          }
        });
      </script>
    </element>

In this example, the `on-keypress` declaration maps the standard DOM `"keypress"` event to the `keypress` method in the component. Within the component template, the `on-click` declaration maps a custom `buttonClick` event to the `buttonClick` method in the component. This is achieved again without the need for any glue code. 

Some things to notice:

* The value of an event handler attribute is the string name of a method on the component. Unlike traditional syntax, you cannot put executable code in the attribute.
* The event handler is passed the following arguments:
  * `inEvent` is the [standard event object](http://www.w3.org/TR/DOM-Level-3-Events/#interface-Event).
  * `inDetail`: A convenience form of `inEvent.detail`.
  * `inSender`: A reference to the node that declared the handler. This is often different from `inEvent.target` (the lowest node that received the event) and `inEvent.currentTarget` (the component processing the event), so the Toolkit provides it directly.

## Advanced sugaring

In addition to the above features, which are focused around making the core functionality of components simple and easy to use, the toolkit provides syntactical sugar that makes more advanced component features easy to create.

### Change watchers

All properties on Toolkit elements can be watched for changes by implementing a <code><em>propertyName</em>Changed</code> handler. When the value of a watched property changes, the appropriate change handler is automatically invoked. 

    <element name="g-cool" attributes="better best">
      <script>
        Toolkit.register(this, {
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

Another useful feature of Toolkit is node reference marshalling. Every node in a component's shadow DOM that is tagged with an `id` attribute is automatically referenced in components `this.$` hash. 

For example, the following defines a component whose template contains an `<input>` element whose `id` attribute is `nameInput`. The component can refer to the that element with the expression `this.$.nameInput`.

    <element name="x-form">
      <template>
        <input type="text" id="nameInput">
      </template>
      <script>
        Toolkit.register(this, {
          logNameValue: function() {
            console.log(this.$.nameInput.value);
          }
        });
      </script>
    </element>

### Calling inherited methods with this.super

A Toolkit component can extend a parent component by calling the parent's inherited methods. 

    <element name="g-cooler" extends="g-cool">
      <script>
        Toolkit.register({
          moarBetter: function() {
            this.super();
            this.better += 'even more.';
          }
        });
      </script>
    </element>

In this example, `this.super` returns a reference to the parent, which is a
`g-cool` component. In `g-cooler` the value of `better` is "g-cool is", plus the string "even more".

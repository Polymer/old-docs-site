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

**Note:** You can find working examples of the concepts on this page are in [/toolkit-ui](https://github.com/polymer/toolkit-ui).
{: .alert .alert-success }

## Element declaration

Every {{site.project_title}} element is a Custom Element at heart. Their 
declaration looks no different than a standard element definition:

    <element name="tag-name">
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

## {{site.project_title}} Features {#features}

### Publishing properties

When you publish a property, you're making that property/name data-bound and part
of the element's "public API". There are two ways to do this:

1. Declare the property in the `<element>`'s `attributes` attribute.
1. Include the property in the `prototype` given to `{{site.project_title}}.register`.

For example, we can define a `name-tag` element that publishes two attributes,
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
This is because by default, HTML attributes are initially `null`. An initial value
van be set in the `prototype`.

**Note:** There's no harm in including a property in both `<element attribute"">` 
and the `prototype`. The latter gives you the ability to set initial and/or default values.
{: .alert }

#### Binding and custom attributes

{{site.project_title}} makes it possible to bind references between components via attributes. Generally, attributes are only string-valued, so the binding engine interprets reference bindings specially (in particular, interrogating an attribute for a bound reference property will just return the binding expression (the double-mustache).

Let's modify our `name-tag` to take a record instead of individual properties.

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

---
layout: default
title: Toolkitchen components
---

Toolkitchen components are standard [web components](https://dvcs.w3.org/hg/webcomponents/raw-file/tip/explainer/index.html) that utilize a small library of helper code to reduce boilerplate and automate common actions. Here is a quick overview of the features of Toolkit components:

# Component initializer

## Event binding

Toolkit supports scoped, declarative data binding. This means you can declare event handlers in markup, and the handlers will map events to the component instance receiving the event. For example:

    <element name="tag-name">
      <template>
        <span on-click="helloAction">Hello World</span>
      </template>
      <script>
        this.component({
          helloAction: function(inEvent, inDetail, inSender) {
            confirm("How are you?");
          }
        });
      </script>
    </element>

Some things to notice:

* The event handler attribute takes the form `on-` plus the event name (_on-dash_ syntax). This syntax is intended to be close enough to original HTML syntax to be memorable, while being different enough to avoid confusion.
* The value of an event handler attribute is the string name of a method on the component. Unlike traditional syntax, you cannot put executable code in the attribute.
* The event handler is passed the following arguments:
  * `inEvent` is the [standard event object](http://www.w3.org/TR/DOM-Level-3-Events/#interface-Event).
  * `inDetail`: A convenience form of `inEvent.detail`.
  * `inSender`: A reference to the node that declared the handler. This is often different from `inEvent.target` (the lowest node that received the event) and `inEvent.currentTarget` (the component processing the event), so the Toolkit provides it directly.


### Properties and Methods

As we noted, you can supply an object-valued argument to `component`.The rule is: properties and methods supplied to `component` become properties on the *protected* interface.

    this.component({
      clickColor: 'orange',
      clickHandler: function() {
        this.node.style.backgroundColor = this.clickColor;
      }
    });
  
In this example, the component has two protected properties. Note that the scope of the method (the `this` value) is the protected scope. This is another rule: from the component's perspective we are always working with the protected scope. It's generally only the user of an instance that needs to deal with the public scope. The exception to this rule is when we need to operate on our node itself, we do this using the `this.node` reference, as shown in the example.

From a DOM node reference, the protected scope is available as `$protected`. So it's possible to violate encapsulation as follows:

    someNode.$protected.protectedMethod();

To make a `blueify` method that is callable on the node (public), we _publish_ the method by placing it inside a `publish` object:

    this.component({
      clickColor: 'orange',
      clickHandler: function() {
        this.node.style.backgroundColor = this.clickColor;
      },
      publish: {
        blueColor: 'blue',
        blueify: function() {
          this.node.style.color = this.blueColor;
        }
      }
    });

Things to remember about `publish`:

1. There can be only one `publish` block per definition.
2. Published properties are actually stored on the **protected** prototype, then they are forwarded to the public prototype. In other words, `blueColor` is different from `clickColor` only because there is a public getter/setter pair to access it.
3. Published methods still operate in protected scope: the properties you can access via `this` are no different from methods declared outside the publish block. 

Bottom line: when building components use `this` naturally and declare properties and methods as you like. Then, if you happen to create API you want to make public, you just move it into the `publish` block.

## Setting public property with attributes

Another Toolkit convention is that public properties are settable by attribute. For example, we could deploy the `name-tag` example shown above like this:

    <name-tag myname="Steve" namecolor="tomato"></name-tag>

When the `name-tag` is created, or when the attributes change value, those attributes values are reflected into their matching properties. Remember that only _public_ properties are settable via attribute.

#### Attributes Attribute
Toolkit supports declaring public properties directly on the element tag via the `attributes` attribute. Below is an alternative `name-tag`:

    <element name="name-tag" attributes="myName nameColor">
      <template>
        Hello! My name is <span style="color:{{ "{{ nameColor " }}}}">{{myName}}</span>
      </template>
      <script>
        this.component({
          nameColor: "orange"
        });
      </script>
    </element>

In this case, `name-tag` declares two attributes, `myName` and `nameColor`. This is semantically the same as declaring them in a `publish` block. The one difference is that properties declared as attributes default to 'undefined', unless defaults are set in the prototype (as done for `nameColor` above).

## Declarative data binding 

Each component in the toolkit has an internal model that can bind to DOM.

    <element name="g-cool">
      <template>
        Better is "{{ "{{better"}}}}"
      </template>
      <script>
        this.component({
          better: 'better than worse'
        });
      </script>
    </element>

The double-moustache {{ "{{ this " }}}} is replaced by the value of the property referenced between the brackets. This binding is kept in sync and is not just a one-time replacement.

### Two-way Binding 

Unlike normal DOM bindings which bind to text in content or attributes, Toolkit bindings are constructed on properties. Bound properties are automatically kept in sync.

    <element name="g-tabpanels" attributes="selected">
      <template>
        <g-tabs selectedTab="{{"{{selected"}}}}"></g-tabs>
        <g-panels selectedPanel="{{"{{selected"}}}}"></g-panels>
      </template>
      <script>
        this.component();
      </script>
    </element>

In this example, the `selectedTab="{{ "{{selected" }}}}"` declaration binds the `selected` property of the `g-tabs` component to the `selectedTab `property of `g-tabpanels`. This binding is two-way, so a change to either `g-tabs.selectedTab` or `g-tabpanels.selected` is reflected in the other. Also in this example, `g-panels.selectedPanel` is bound to `g-tabpanels.selected`. Now all three properties will be kept in sync.



## Automatic node finding

Another useful feature of Toolkit is node reference marshalling. Every node in a component's shadow DOM that is tagged with an `id` attribute is automatically referenced in the `this.$` hash. 

Given the following:

    <template>
      <input id="nameInput">
    </template>

We can write code like so:

    <script>
      this.component({
        logNameValue: function() {
          console.log(this.$.nameInput.value);
        }
      });
    </script>

As described, a reference to the `<input>` node is available in `this.$` hash mapped to the given id (*nameInput*, in this case).
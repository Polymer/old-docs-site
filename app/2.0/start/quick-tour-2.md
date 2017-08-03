---
title: Quick(er) tour of Polymer
---

<!-- toc -->

Polymer makes it simple to create web components, declaratively.

Custom elements can leverage Polymer's special features to reduce boilerplate
and make it even easier to build complex, interactive elements:

- Registering elements
- Lifecycle callbacks
- Property observation
- Shadow DOM template
- Data binding

In this section you can take a quick tour of the Polymer library,
without installing anything. Click the **Edit on Plunker** button to open any
of the samples in an interactive sandbox.

Tap the buttons following each feature to learn more.

### Register an element {#register}

To register a new element, create an ES6 class that extends
`Polymer.Element`, then call the `customElements.define` method, which
_registers_ a new element with the browser. Registering an element associates
an element name with a class, so you can add properties and methods to your custom
element. The custom element's name **must start with an ASCII letter and
contain a dash (-)**.

<live-demo-tabs selected="0" height="40">
  <live-demo-tab id="0">
    <div slot="heading">
      custom-element.html
    </div>
    <template slot="html-content">{{{include_file_raw('2.0/start/samples/custom-element/custom-element.html')}}}</template>
  </live-demo-tab>
  <live-demo-tab id="1">
    <div slot="heading">
      index.html
    </div>
    <template slot="html-content">{{{include_file_raw('2.0/start/samples/custom-element/index.html')}}}</template>
  </live-demo-tab>
</live-demo-tabs>

This sample uses a lifecycle callback
to add contents to the `<custom-element>` when it's initialized.
When a custom element finishes its initialization, the `ready` lifecycle callback is called.
You can use the `ready` callback for one-time initialization work after the element is created.

<p><a href="/{{{polymer_version_dir}}}/docs/devguide/registering-elements" class="blue-button">
  Learn more: element registration
</a></p>

<p><a href="/{{{polymer_version_dir}}}/docs/devguide/registering-elements#lifecycle-callbacks" class="blue-button">
  Learn more: lifecycle callbacks
</a></p>

### Add shadow DOM

Many elements include some internal DOM nodes to implement the element's UI and behavior.
You can use Polymer's DOM templating to create a shadow DOM tree for your element.

<live-demo-tabs selected="0"  height="40">
  <live-demo-tab heading="dom-element.html" id="0">
    <div slot="heading">
      dom-element.html
    </div>
    <template slot="html-content">{{{include_file_raw('2.0/start/samples/dom-element/dom-element.html')}}}</template>
  </live-demo-tab>
  <live-demo-tab heading="index.html" id="1">
    <div slot="heading">
      index.html
    </div>
    <template slot="html-content">{{{include_file_raw('2.0/start/samples/dom-element/index.html')}}}</template>
  </live-demo-tab>
</live-demo-tabs>

Shadow DOM is encapsulated inside the element.

<p><a href="/{{{polymer_version_dir}}}/docs/devguide/dom-template" class="blue-button">Learn more: DOM templating</a></p>

### Compose with shadow DOM

Shadow DOM lets you control _composition_. The element's children can be _distributed_
so they render as if they were inserted into the shadow DOM tree.

This example creates a simple tag that decorates an image by wrapping it
with a styled `<div>` tag.

<live-demo-tabs selected="0" height="60">
  <live-demo-tab heading="picture-frame.html" id="0">
    <div slot="heading">
      picture-frame.html
    </div>
    <template slot="html-content">{{{include_file_raw('2.0/start/samples/picture-frame/picture-frame.html')}}}</template>
  </live-demo-tab>
  <live-demo-tab heading="index.html" id="1">
    <div slot="heading">
      index.html
    </div>
    <template slot="html-content">{{{include_file_raw('2.0/start/samples/picture-frame/index.html')}}}</template>
  </live-demo-tab>
</live-demo-tabs>

**Note:** The CSS styles defined inside the `<dom-module>` are _scoped_ to the element's shadow DOM.
So the `div` rule here only affects `<div>` tags inside `<picture-frame>`.
{: .alert .alert-info }

<p><a href="/2.0/docs/devguide/shadow-dom#shadow-dom-and-composition" class="blue-button">
Learn more: Composition & distribution</a></p>

### Use data binding

Of course, it's not enough to have static shadow DOM. You usually want to have your element update
its shadow DOM dynamically.

Data binding is a great way to quickly propagate changes in your element and reduce boilerplate code.
You can bind properties in your component using the "double-mustache" syntax (`{%raw%}{{}}{%endraw%}`).
The `{%raw%}{{}}{%endraw%}` is replaced by the value of the property referenced between the brackets.

<live-demo-tabs selected="0" height="40">
  <live-demo-tab heading="name-tag.html" id="0">
    <div slot="heading">
      name-tag.html
    </div>
    <template slot="html-content">{{{include_file_raw('2.0/start/samples/name-tag/name-tag.html')}}}</template>
  </live-demo-tab>
  <live-demo-tab heading="index.html" id="1">
    <div slot="heading">
      index.html
    </div>
    <template slot="html-content">{{{include_file_raw('2.0/start/samples/name-tag/index.html')}}}</template>
  </live-demo-tab>
</live-demo-tabs>

<p><a href="/2.0/docs/devguide/data-binding" class="blue-button">
Learn more: data binding</a></p>

### Declare a property

Properties are an important part of an element's public API. Polymer
_declared properties_ support a number of common patterns for properties—setting default
values, configuring properties from markup, observing property changes, and more.

The following example declares the `owner` property from the last example.
It also shows configuring the owner property from markup in `index.html`.

<live-demo-tabs selected="0" height="40">
  <live-demo-tab heading="configurable-name-tag.html" id="0">
    <div slot="heading">
      configurable-name-tag.html
    </div>
    <template slot="html-content">{{{include_file_raw('2.0/start/samples/configurable-name-tag/configurable-name-tag.html')}}}</template>
  </live-demo-tab>
  <live-demo-tab heading="index.html" id="1">
    <div slot="heading">
      index.html
    </div>
    <template slot="html-content">{{{include_file_raw('2.0/start/samples/configurable-name-tag/index.html')}}}</template>
  </live-demo-tab>
</live-demo-tabs>

<p><a href="/2.0/docs/devguide/properties" class="blue-button">
Learn more: declared properties</a></p>

### Bind to a property

In addition to text content, you can bind to an element's _properties_ (using
`property-name="[[binding]]"`). Polymer properties
can optionally support two-way binding, using curly braces (`property-name="{{binding}}"`).

This example uses two-way binding: binding the value of a custom input element (`iron-input`)
to the element's `owner` property, so it's updated as the user types.

<live-demo-tabs selected="0" height="100">
  <live-demo-tab heading="editable-name-tag.html" id="0">
    <div slot="heading">
      editable-name-tag.html
    </div>
    <template slot="html-content">{{{include_file_raw('2.0/start/samples/editable-name-tag/editable-name-tag.html')}}}</template>
  </live-demo-tab>
  <live-demo-tab heading="index.html" id="1">
    <div slot="heading">
      index.html
    </div>
    <template slot="html-content">{{{include_file_raw('2.0/start/samples/editable-name-tag/index.html')}}}</template>
  </live-demo-tab>
</live-demo-tabs>

**Note:** The `<iron-input>` element wraps a native `<input>` element and provides two-way
data binding and input validation.
{: .alert .alert-info }

### Using `<dom-repeat>` for template repeating

The template repeater (`dom-repeat`) is a specialized template that binds to an array. It creates one instance of the template's contents for each item in the array.

<live-demo-tabs selected="0">
  <live-demo-tab heading="employee-list.html" id="0">
    <div slot="heading">
      employee-list.html
    </div>
    <template slot="html-content">{{{include_file_raw('2.0/start/samples/employee-list/employee-list.html')}}}</template>
  </live-demo-tab>
  <live-demo-tab heading="index.html" id="1">
    <div slot="heading">
      index.html
    </div>
    <template slot="html-content">{{{include_file_raw('2.0/start/samples/employee-list/index.html')}}}</template>
  </live-demo-tab>
</live-demo-tabs>

<p><a href="/2.0/docs/devguide/templates" class="blue-button">
Learn more: Template repeater</a></p>

## Next steps

Now that you understand these fundamental Polymer concepts, you can [build an app with App Toolbox](/2.0/start/toolbox/set-up) or see a [feature overview of the Polymer library](/2.0/docs/devguide/feature-overview).

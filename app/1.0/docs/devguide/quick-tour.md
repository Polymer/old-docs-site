---
title: Try Polymer
---

<!-- toc -->

Polymer makes it simple to create web components, declaratively.

Custom elements can leverage Polymer's special features to reduce boilerplate
and make it even easier to build complex, interactive elements:

- Registering elements
- Lifecycle callbacks
- Property observation
- Local DOM template
- Data binding

In this section you can take a quick tour of the Polymer library,
without installing anything. Click the **Edit on Plunker** button to open any
of the samples in an interactive sandbox.

Tap the buttons following each feature to learn more.

### Register an element {#register}

To register a new element, call the `Polymer` function, which
_registers_ a new element with the browser. Registering an element associates
a tag name with a prototype, so you can add properties and methods to your custom
element. The custom element's name **must contain a dash (-)**.

The Polymer function takes as an
argument an object that defines your element's prototype.

<demo-tabs selected="0" src="http://plnkr.co/edit/TbK3gUohLircKlIJByqc?p=preview">
  <demo-tab slot="demo-tab" heading="proto-element.html">
<pre><code>{{{include_file('1.0/docs/devguide/samples/proto-element/proto-element.html')}}}</code></pre>
  </demo-tab>
  <demo-tab slot="demo-tab" heading="index.html">
<pre><code>{{{include_file('1.0/docs/devguide/samples/proto-element/index.html')}}}</code></pre>
  </demo-tab>

  <iframe frameborder="0" src="samples/proto-element/index.html" width="100%" height="40"></iframe>
</demo-tabs>

This sample uses a lifecycle callback
to add contents to the `<proto-element>` when it's initialized.
When a custom element finishes its initialization, the `ready` lifecycle callback is called.
The `ready` callback is a great place to do constructor-like initialization work.

<p><a href="/1.0/docs/devguide/registering-elements" class="blue-button">
  Learn more: element registration
</a></p>

<p><a href="/1.0/docs/devguide/registering-elements#lifecycle-callbacks" class="blue-button">
  Learn more: lifecycle callbacks
</a></p>

### Add local DOM

Many elements include some internal DOM nodes to implement the element's UI and behavior.
Polymer calls this _local DOM_, and it provides an easy way to specify it:

<demo-tabs selected="0" src="http://plnkr.co/edit/RhZMWIWf6hbFUXxRSQkz?p=preview">
  <demo-tab slot="demo-tab" heading="dom-element.html">
<pre><code>{{{include_file('1.0/docs/devguide/samples/dom-element/dom-element.html')}}}</code></pre>
  </demo-tab>
  <demo-tab slot="demo-tab" heading="index.html">
<pre><code>{{{include_file('1.0/docs/devguide/samples/dom-element/index.html')}}}</code></pre>
  </demo-tab>

  <iframe frameborder="0" src="samples/dom-element/index.html" width="100%" height="40"></iframe>
</demo-tabs>

Local DOM is encapsulated inside the element.

<p><a href="/1.0/docs/devguide/local-dom" class="blue-button">Learn more: local DOM</a></p>

### Compose with local DOM

Local DOM lets you control _composition_. The element's children can be _distributed_
so they render as if they were inserted into the local DOM tree.

This example creates a simple tag that decorates an image by wrapping it
with a styled `<div>` tag.

<demo-tabs selected="0" src="http://plnkr.co/edit/qEMZleDbvKrNcpPXSviW?p=preview">
  <demo-tab slot="demo-tab" heading="picture-frame.html">
<pre><code>{{{include_file('1.0/docs/devguide/samples/picture-frame/picture-frame.html')}}}</code></pre>
  </demo-tab>
  <demo-tab slot="demo-tab" heading="index.html">
<pre><code>{{{include_file('1.0/docs/devguide/samples/picture-frame/index.html')}}}</code></pre>
  </demo-tab>

  <iframe frameborder="0" src="samples/picture-frame/index.html" width="100%" height="60"></iframe>
</demo-tabs>

**Note:** The CSS styles defined inside the `<dom-module>` are _scoped_ to the element's local DOM.
So the `div` rule here only affects `<div>` tags inside `<picture-frame>`.
{: .alert .alert-info }

<p><a href="/1.0/docs/devguide/local-dom#dom-distribution" class="blue-button">
Learn more: Composition & distribution</a></p>

### Use data binding

Of course, it's not enough to have static local DOM. You usually want to have your element update
its local DOM dynamically.

Data binding is a great way to quickly propagate changes in your element and reduce boilerplate code.
You can bind properties in your component using the "double-mustache" syntax (`{%raw%}{{}}{%endraw%}`).
The `{%raw%}{{}}{%endraw%}` is replaced by the value of the property referenced between the brackets.

<demo-tabs selected="0" src="http://plnkr.co/edit/LUm1XjpxlMIQFqGy04NS?p=preview">
  <demo-tab slot="demo-tab" heading="name-tag.html">
<pre><code>{{{include_file('1.0/docs/devguide/samples/name-tag/name-tag.html')}}}</code></pre>
  </demo-tab>
  <demo-tab slot="demo-tab" heading="index.html">
<pre><code>{{{include_file('1.0/docs/devguide/samples/name-tag/index.html')}}}</code></pre>
  </demo-tab>

  <iframe frameborder="0" src="samples/name-tag/index.html" width="100%" height="40"></iframe>
</demo-tabs>

<p><a href="/1.0/docs/devguide/data-binding" class="blue-button">
Learn more: data binding</a></p>

### Declare a property

Properties are an important part of an element's public API. Polymer
_declared properties_ support a number of common patterns for properties—setting default
values, configuring properties from markup, observing property changes, and more.

In the following example, we add a declared `owner` property with a default value,
and configure it in `index.html`.

<demo-tabs selected="0" src="http://plnkr.co/edit/HjgVnjpxMTvZJfhwpRPE?p=preview">
  <demo-tab slot="demo-tab" heading="configurable-name-tag.html">
<pre><code>{{{include_file('1.0/docs/devguide/samples/configurable-name-tag/configurable-name-tag.html')}}}</code></pre>
  </demo-tab>
  <demo-tab slot="demo-tab" heading="index.html">
<pre><code>{{{include_file('1.0/docs/devguide/samples/configurable-name-tag/index.html')}}}</code></pre>
  </demo-tab>

  <iframe frameborder="0" src="samples/configurable-name-tag/index.html" width="100%" height="40"></iframe>
</demo-tabs>

<p><a href="/1.0/docs/devguide/properties" class="blue-button">
Learn more: declared properties</a></p>

### Bind to a property

In addition to text content, you can bind to an element's _properties_ (using
`property-name="{%raw%}{{binding}}{%endraw%}"`). Polymer properties
can optionally support two-way binding.

This example uses two-way binding: binding the value of a custom input element (`iron-input`)
to the element's `owner` property, so it's updated as the user types.

<demo-tabs selected="0" src="http://plnkr.co/edit/DIA7weGNRf9Ejxp6xyh1?p=preview">
  <demo-tab slot="demo-tab" heading="editable-name-tag.html">
<pre><code>{{{include_file('1.0/docs/devguide/samples/editable-name-tag/editable-name-tag.html')}}}</code></pre>
  </demo-tab>
  <demo-tab slot="demo-tab" heading="index.html">
<pre><code>{{{include_file('1.0/docs/devguide/samples/editable-name-tag/index.html')}}}</code></pre>
  </demo-tab>

  <iframe frameborder="0" src="samples/editable-name-tag/index.html" width="100%" height="100"></iframe>
</demo-tabs>

**Note:** The `is="iron-input"` attribute indicates the input is a _type-extension_ custom
element; the element name is `iron-input`, and it _extends_ the native `<input>` element.
{: .alert .alert-info }

## Next steps

Now that you understand these fundamental Polymer concepts, you can
[build your first element](/1.0/start/first-element/intro) or explore
the remainder of the Developer guide.

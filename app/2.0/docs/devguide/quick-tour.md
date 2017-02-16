---
title: Quick tour of Polymer
---

<!-- toc -->

<script>
Polymer.Base.importHref(Polymer.Base.resolveUrl('/elements/demo-tabs.html'));
</script>

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

To register a new element, create an ES6 class that extends
`Polymer.Element`, then call the `customElements.define` method, which
_registers_ a new element with the browser. Registering an element associates
an element name with a class, so you can add properties and methods to your custom
element. The custom element's name **must start with an ASCII letter and
contain a dash (-)**.

<demo-tabs selected="0" src="http://plnkr.co/edit/0YfRfNXvPCEe4bu8dtSI?p=preview">
  <demo-tab heading="proto-element.html">
<pre><code>{{{include_file('2.0/docs/devguide/samples/custom-element/custom-element.html')}}}</code></pre>
  </demo-tab>
  <demo-tab heading="index.html">
<pre><code>{{{include_file('2.0/docs/devguide/samples/custom-element/index.html')}}}</code></pre>
  </demo-tab>

  <iframe frameborder="0" src="samples/custom-element/index.html" width="100%" height="40"></iframe>
</demo-tabs>

This sample uses a lifecycle callback
to add contents to the `<custom-element>` when it's initialized.
When a custom element finishes its initialization, the `ready` lifecycle callback is called.
You can use the `ready` callback for one-time initialization work after the element is created.

<p><a href="/1.0/docs/devguide/registering-elements" class="blue-button">
  Learn more: element registration
</a></p>

<p><a href="/1.0/docs/devguide/registering-elements#lifecycle-callbacks" class="blue-button">
  Learn more: lifecycle callbacks
</a></p>

### Add shadow DOM

Many elements include some internal DOM nodes to implement the element's UI and behavior.
You can use Polymer's DOM templating to create a shadow DOM tree for your element.

<demo-tabs selected="0" src="http://plnkr.co/edit/qwNuu5ujuKuhMUHJUHAP?p=preview">
  <demo-tab heading="dom-element.html">
<pre><code>{{{include_file('1.0/docs/devguide/samples/dom-element/dom-element.html')}}}</code></pre>
  </demo-tab>
  <demo-tab heading="index.html">
<pre><code>{{{include_file('1.0/docs/devguide/samples/dom-element/index.html')}}}</code></pre>
  </demo-tab>

  <iframe frameborder="0" src="samples/dom-element/index.html" width="100%" height="40"></iframe>
</demo-tabs>

Local DOM is encapsulated inside the element.

<p><a href="/1.0/docs/devguide/dom-template" class="blue-button">Learn more: DOM templating</a></p>

### Compose with shadow DOM

Shadow DOM lets you control _composition_. The element's children can be _distributed_
so they render as if they were inserted into the shadow DOM tree.

This example creates a simple tag that decorates an image by wrapping it
with a styled `<div>` tag.

<demo-tabs selected="0" src="http://plnkr.co/edit/pnoCAMEuAyd2e8MkxGhC?p=preview">
  <demo-tab heading="picture-frame.html">
<pre><code>{{{include_file('2.0/docs/devguide/samples/picture-frame/picture-frame.html')}}}</code></pre>
  </demo-tab>
  <demo-tab heading="index.html">
<pre><code>{{{include_file('2.0/docs/devguide/samples/picture-frame/index.html')}}}</code></pre>
  </demo-tab>

  <iframe frameborder="0" src="samples/picture-frame/index.html" width="100%" height="60"></iframe>
</demo-tabs>

**Note:** The CSS styles defined inside the `<dom-module>` are _scoped_ to the element's local DOM.
So the `div` rule here only affects `<div>` tags inside `<picture-frame>`.
{: .alert .alert-info }

<p><a href="/2.0/docs/devguide/local-dom#dom-distribution" class="blue-button">
Learn more: Composition & distribution</a></p>

### Use data binding

Of course, it's not enough to have static local DOM. You usually want to have your element update
its local DOM dynamically.

Data binding is a great way to quickly propagate changes in your element and reduce boilerplate code.
You can bind properties in your component using the "double-mustache" syntax (`{%raw%}{{}}{%endraw%}`).
The `{%raw%}{{}}{%endraw%}` is replaced by the value of the property referenced between the brackets.

<demo-tabs selected="0" src="http://plnkr.co/edit/IdMTRu1boSjWIA6q7Kj8?p=preview">
  <demo-tab heading="name-tag.html">
<pre><code>{{{include_file('2.0/docs/devguide/samples/name-tag/name-tag.html')}}}</code></pre>
  </demo-tab>
  <demo-tab heading="index.html">
<pre><code>{{{include_file('2.0/docs/devguide/samples/name-tag/index.html')}}}</code></pre>
  </demo-tab>

  <iframe frameborder="0" src="samples/name-tag/index.html" width="100%" height="40"></iframe>
</demo-tabs>

<p><a href="/1.0/docs/devguide/data-binding" class="blue-button">
Learn more: data binding</a></p>

### Declare a property

Properties are an important part of an element's public API. Polymer
_declared properties_ support a number of common patterns for properties—setting default
values, configuring properties from markup, observing property changes, and more.

The following example declares the `owner` property from the last example.
It also shows configuring the owner property from markup in `index.html`.

<demo-tabs selected="0" src="http://plnkr.co/edit/DhDSeqNrmLflcQ8UZI1R?p=preview">
  <demo-tab heading="configurable-name-tag.html">
<pre><code>{{{include_file('2.0/docs/devguide/samples/configurable-name-tag/configurable-name-tag.html')}}}</code></pre>
  </demo-tab>
  <demo-tab heading="index.html">
<pre><code>{{{include_file('2.0/docs/devguide/samples/configurable-name-tag/index.html')}}}</code></pre>
  </demo-tab>

  <iframe frameborder="0" src="samples/configurable-name-tag/index.html" width="100%" height="40"></iframe>
</demo-tabs>

<p><a href="/2.0/docs/devguide/properties" class="blue-button">
Learn more: declared properties</a></p>

### Bind to a property

In addition to text content, you can bind to an element's _properties_ (using
`property-name="[[binding]]"`). Polymer properties
can optionally support two-way binding, using curly braces (`property-name="{{binding}}"`).

This example uses two-way binding: binding the value of a custom input element (`iron-input`)
to the element's `owner` property, so it's updated as the user types.

<demo-tabs selected="0" src="http://plnkr.co/edit/cSDfLSaJtHHuoFwUqgEf?p=preview">
  <demo-tab heading="editable-name-tag.html">
<pre><code>{{{include_file('2.0/docs/devguide/samples/editable-name-tag/editable-name-tag.html')}}}</code></pre>
  </demo-tab>
  <demo-tab heading="index.html">
<pre><code>{{{include_file('2.0/docs/devguide/samples/editable-name-tag/index.html')}}}</code></pre>
  </demo-tab>

  <iframe frameborder="0" src="samples/editable-name-tag/index.html" width="100%" height="100"></iframe>
</demo-tabs>

**Note:** The `<iron-input>` element wraps a native `<input>` element and provides two-way
data binding and input validation.
{: .alert .alert-info }

## Next steps

Now that you understand these fundamental Polymer concepts, you can
[build your first element](/2.0/start/first-element/intro) or explore
the remainder of the Developer guide.

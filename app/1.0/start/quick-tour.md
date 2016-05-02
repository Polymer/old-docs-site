---
title: Quick tour of Polymer
link: quick-tour
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

See the [Developer guide](../devguide/feature-overview.html) for
detailed information on each of these features.

### Register an element {#register}

To register a new element, call the `Polymer` function, which
_registers_ a new element with the browser. Registering an element associates
a tag name with a prototype, so you can add properties and methods to your custom
element. The custom element's name **must contain a dash (-)**.

The Polymer function takes as an
argument an object that defines your element's prototype.

<demo-tabs selected="0" src="samples/proto-element/manifest.json">
  <demo-tab heading="proto-element.html">
<pre><code>
{{{include_file('1.0/start/samples/proto-element/proto-element.html')}}}
</code></pre>
  </demo-tab>
  <demo-tab heading="index.html">
<pre><code>
{{{include_file('1.0/start/samples/proto-element/index.html')}}}
</code></pre>
  </demo-tab>
  <div class="result">
    <iframe frameborder="0" src="samples/proto-element/index.html" width="100%" height="50"></iframe>
  </div>
</demo-tabs>

This sample uses a lifecycle callback
to add contents to the `<proto-element>` when it's initialized.
When a custom element finishes its initialization, the `ready` lifecycle callback is called.
The `ready` callback is a great place to do constructor-like initialization work.

<p><a href="../devguide/registering-elements.html" class="blue-button">
  Learn more: element registration
</a></p>

<p><a href="../devguide/registering-elements.html#lifecycle-callbacks" class="blue-button">
  Learn more: lifecycle callbacks
</a></p>

### Add local DOM

Many elements include some internal DOM nodes to implement the element's UI and behavior.
Polymer calls this _local DOM_, and it provides an easy way to specify it:

<demo-tabs selected="0" src="samples/dom-element/manifest.json">
  <demo-tab heading="proto-element.html">
<pre><code>
{{{include_file('1.0/start/samples/dom-element/dom-element.html')}}}
</code></pre>
  </demo-tab>
  <demo-tab heading="index.html">
<pre><code>
{{{include_file('1.0/start/samples/dom-element/index.html')}}}
</code></pre>
  </demo-tab>
  <div class="result">
    <iframe frameborder="0" src="samples/dom-element/index.html" width="100%" height="50"></iframe>
  </div>
</demo-tabs>

Local DOM is encapsulated inside the element.

<p><a href="../devguide/local-dom.html" class="blue-button">Learn more: local DOM</a></p>

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

<live-demo-tabs selected="0">
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

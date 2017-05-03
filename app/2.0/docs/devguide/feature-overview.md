---
subtitle: Feature Overview
title: Polymer library
---

The Polymer library provides a set of features for creating custom elements. These features are
designed to make it easier and faster to make custom elements that work like standard DOM elements.
Similar to standard DOM elements, Polymer elements can be:

* Instantiated using a constructor or `document.createElement`.
* Configured using attributes or properties.
* Populated with internal DOM inside each instance.
* Responsive to property and attribute changes.
* Styled with internal defaults or externally.
* Responsive to methods that manipulate its internal state.

A basic Polymer element definition looks like this:

```
    <dom-module id="x-custom">
      <!-- Optional shadow DOM template -->
      <template>
        <style>
          /* CSS rules for your element */
        </style>

        <!-- shadow DOM for your element -->

        <div>{{greeting}}</div> <!-- data bindings in local DOM -->
      </template>

      <script>
        // Define the element's API using an ES2015 class
        class XCustom extends Polymer.Element {

          static get is() { return 'x-custom'; }

          // Declare properties for the element's public API
          static get properties() {
            return {
              greeting: {
                type: String,
                value: "Hello!"
              }
            }
          }

          // Add methods to the element's public API
          greetMe() {
            console.log(this.greeting);
          }

        }

        // Register the x-custom element with the browser
        customElements.define(XCustom.is, XCustom);
      </script>

    </dom-module>
```


This guide divides the features into the following groups:

*   [Custom elements](custom-elements). Registering an
    element associates a class with a custom element name. The
    element provides callbacks to manage its lifecycle. Polymer also lets you declare properties,
    to integrate your element's property API with the Polymer data system.

*   [Shadow DOM](shadow-dom). Shadow DOM provides a local, encapsulated DOM tree for your element.
    Polymer can automatically create and populate a shadow tree for your element from a DOM
    template.

*   [Events](events). Polymer provides a declarative syntax for attaching event listeners to
    shadow DOM children. It also provides an optional library for handling gesture events.

*   [Data system](data-system). The Polymer data system provides data binding to properties and
    attributes; property observers; and computed properties.


If you're upgrading an existing 1.x element to the new APIs, see the
[Upgrade guide](/2.0/docs/upgrade) for advice.

If you're looking for the latest changes in this release, see the
[Release notes](/2.0/docs/release-notes).

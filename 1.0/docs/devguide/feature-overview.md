---
layout: default
type: guide
shortname: Docs
title: Feature overview
subtitle: Developer guide
---


The Polymer library provides a set of features for creating custom elements. These features are designed 
to make it easier and faster to make custom elements that work like standard DOM elements. With a standard DOM element, you might expect:

* You can create it using a constructor or `document.createElement`.
* You can configure it using attributes or properties.
* It may have some internal DOM that's created for each instance.
* It responds to property and attribute changes (for example, by populating data into the DOM, or firing an event).
* It has some default style and can be styled from the outside.
* It may provide methods to allow you to manipulate its internal state.

A basic {{site.project_title}} element definition looks like this:

    <dom-module id="element-name">

      <style>
        /* CSS rules for your element */
      </style>
      
      <template>
        <!-- local DOM for your element -->

        <div>{%raw%}{{greeting}}{%endraw%}</div> <!-- data bindings in local DOM -->
      </template>

      <script>
        // element registration
        Polymer({
          is: "element-name",

          // add properties and methods on the element's prototype

          properties: {
            // declare properties for the element's public API
            greeting: {
              type: String,
              value: "Hello!"
            }
          }
        });
      </script>

    </dom-module>



This guide divides the features into the following groups:

*   [Registration and lifecycle](registering-elements.html). Registering an
    element associates a class (prototype) with a custom element name. The
    element provides callbacks to manage its lifecycle. Use behaviors to
    share code.

*   [Declared properties](properties.html). Declared properties can be 
    configured from markup using attributes. Declared properties can optionally
    support change observers, two-way data binding, and reflection to attributes.
    You can also declare computed properties and read-only properties.

*   [Local DOM](local-dom.html). Local DOM is the DOM created and managed by the element.

*   [Events](events.html). Attaching event listeners to the host object 
    and local DOM children. Event retargeting.

*   [Data binding](data-binding.html). Property bindings. Binding to attributes.

*   [Behaviors](behaviors.html). Behaviors are reusable modules of code that can be 
    mixed into {{site.project_title}} elements.

*   [Utility functions](utility-functions.html). Helper methods for common tasks.

*   [Experimental features and elements](experimental.html). Experimental template and styling features.
    Feature layering.

If you're migrating an existing 0.5 element to the new APIs, see the [Migration guide](../migration.html)
for advice.

If you're upgrading from the 0.8 release, see the [Release notes](../release-notes.html).






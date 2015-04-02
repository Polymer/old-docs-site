---
layout: default
type: guide
shortname: Docs
title: Feature overview
subtitle: Developer guide
---

{% include toc.html %}

**Note:** Polymer 0.8 and this document are a WORK IN PROGRESS and APIs are subject to change.
{: .alert .alert-error }


The Polymer library provides a set of features for creating custom elements. These features are designed 
to make it easier and faster to make custom elements that work like standard DOM elements. With a standard DOM element, you might expect:

* You can create it using a constructor or `document.createElement`.
* You can configure it using attributes or properties.
* It may have some internal DOM that's created for each instance.
* It responds to property and attribute changes (for example, by populating data into the DOM, or firing an event).
* It has some default style and can be styled from the outside.
* It may provide methods to allow you to manipulate its internal state.

This guide divides the features into the following groups:

*   [Registration and lifecycle](registering-elements.html). Registering an
    element associates a class (prototype)     with a custom element name. The
    element provides callbacks to manage its lifecycle. Use prototype mixins to
    share code.

*   [Properties](properties.html). Property features include the ability to
    configure properties from markup using attributes, react to property
    changes, create computed properties and read-only properties.

*   [Local DOM](local-dom.html). Local DOM is the DOM created and managed by the element.

*   [Events](events.html). Attaching event listeners to the host object 
    and local DOM children. Event retargeting.

*   [Data binding](data-binding.html). Property bindings. Binding to attributes.

*   [Utility functions](utility-functions.html). Helper methods for common tasks.

*   [Experimental features and elements](experimental.html). Experimental template and styling features.
    Feature layering.


If you're migrating an existing 0.5 element to the 0.8 APIs, see the [Migration guide](../migration.html)
for advice.






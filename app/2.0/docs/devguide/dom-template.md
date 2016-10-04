---
title: DOM templating
---

<!-- toc -->

Many elements use a subtree of DOM elements to implement their features. DOM templating provides an easy way to create a DOM subtree for your element.

By default, adding a DOM template to an element causes Polymer to create a shadow root for the element and clone the template into the shadow tree.

The DOM template is also processed to enable data binding and declarative event handlers.

## DOM template overview

To specify an element's DOM template:

1.  Create a `<dom-module>`element with an `id` attribute that matches the element's name.
2.  Create a `<template>` element inside the `<dom-module>`.

Polymer clones this template's contents into the element's local DOM.

Example: { .caption }

```html
<dom-module id="x-foo">

  <template>I am x-foo!</template>

  <script>
    class XFoo extends extends Polymer.Element {
      static get is() { return  'x-foo' }
    }
    customElements.define(XFoo.is, XFoo);
  </script>

</dom-module>
```

In this example, the DOM template and the JavaScript that defines the element are in the same file. You can also put these portions in separate files, but the DOM template must be parsed before the element is defined.


**Note:** Elements should generally be defined outside of the main document,
except for testing. For caveats about defining elements in the main document,
see [main document definitions][registering-elements#main-document-definitions].
{.alert .alert-info}

## Automatic node finding {#node-finding}

Polymer builds a static map of node IDs when the element initializes its DOM template, to provide convenient access to frequently used nodes without the need to query for them manually. Any node specified in the element's template with an `id` is stored on the `this.$` hash by `id`.

**Note:** Nodes created dynamically using data binding (including those in
`dom-repeat` and `dom-if` templates) are _not_ added to the
`this.$` hash. The hash includes only _statically_ created local DOM nodes
(that is, the nodes defined in the element's outermost template).
{.alert .alert-info}

Example: { .caption }

```html
<dom-module id="x-custom">

  <template>
    Hello World from <span id="name"></span>!
  </template>

  <script>
    class MyElement extends Polymer.Element {
      static get is() { return  'x-custom' }
      ready() {
        this.$.name.textContent = this.tagName;
      }
    }
  </script>

</dom-module>
```

For locating dynamically-created nodes in your element's shadow DOM,
use the standard DOM `querySelector`  method.

<code>this.shadowRoot.querySelector(<var>selector</var>)</code>





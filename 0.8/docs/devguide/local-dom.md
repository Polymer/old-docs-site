---
layout: default
type: guide
shortname: Docs
title: Local DOM
subtitle: Developer guide
---

{% include toc.html %}

We call the DOM that an element is in charge of creating and managing its _local
DOM_. This is distinct from the element's children which are sometimes called
its _light DOM_ for clarity.

{{site.project_title}} supports multiple local DOM implementations. On browsers
that support shadow DOM, shadow DOM may be used to create local DOM. On other
supported browsers, {{site.project_title}} provides local DOM via a custom
implementation called _shady DOM_ which is inspired by and compatible with shadow
DOM.

**Note:** 
Currently {{site.project_title}} uses shady DOM by default on all browsers.
To opt-in to using shadow DOM where available, see [Global settings](settings.html)
{: .alert .alert-info }

## Local DOM template {#template-stamping}

To specify DOM to use for an element's local DOM, use the `<dom-module>` element.
Give the `<dom-module>` an `id` attribute that matches its element's
`is` property and put a `<template>` inside the `<dom-module>`.
Polymer will automatically clone this template's contents into the element's local DOM.

Example:

    <dom-module id="x-foo">
      <template>I am x-foo!</template>
    </dom-module>

    <script>
      Polymer({
        is: 'x-foo'
      });
    </script>

We say that an element definition has an imperative and declarative portion. The imperative
portion is the call to `Polymer({...})`, and the declarative portion is the `<dom-module>`
element. The imperative and declarative portions of an element's definition may be placed
in the same html file or in separate files.

**Note:** Defining an element in the main HTML document is not currently supported.
{: .alert .alert-info }


## Scoped styling {#scoped-styling}

Polymer 0.8 uses [Shadow DOM styling
rules](http://www.html5rocks.com/en/tutorials/webcomponents/shadowdom-201/) for
providing scoped styling of the element's local DOM.  Scoped styles should be
provided via `<style>` tags placed inside the `<dom-module>` for an element (but
not inside the `<template>` -- note this is a slight deviation from typical
Shadow DOM rules).

    <dom-module id="my-element">
      
      <style>
        :host {
          display: block;
          border: 1px solid red;
        }
        #child-element {
          background: yellow;
        }
        /* styling elements distributed to content (via ::content) requires */
        /* using a wrapper element for compatibility with shady DOM         */
        .content-wrapper > ::content .special {
          background: orange;
        }
      </style>
      
      <template>
        <div id="child-element">In local Dom!</div>
        <div class="content-wrapper"><content></content></div>
      </template>
      
    </dom-module>

    <script>

        Polymer({
            is: 'my-element'
        });

    </script>

Loading external stylesheets (as opposed to defining them inline in HTML) for
styling local DOM is currently supported via an [experimental
feature](experimental.html#external-stylesheets).

### Styling distributed children (::content)

Under shady DOM, the `<content>` tag doesn't appear in the DOM tree. Styles are rewritten to remove the 
`::content` pseudo-element, **and any combinator immediately to the left of `::content`.**

This implies:

*   You must have a selector to the left of the `::content` pseudo-element.

        :host ::content div

    Becomes:

        x-foo div

    (Where `x-foo` is the name of the custom element.)

*   To limit styles to elements inside the ::content tag, add a wrapper element around the 
    `<content>` element. This is especially important when using a child combinator (`>`) to
    select top-level children.

        <dom-module id="my-element">
          
          <style>
            .content-wrapper > ::content .special {
              background: orange;
            }
          </style>
          
          <template>
            <div class="content-wrapper"><content></content></div>
          </template>
          
        </dom-module>

    In this case, the rule:

        .content-wrapper ::content > .special

    Becomes:

        .content-wrapper > special

## Local node marshalling {#node-marshalling}

{{site.project_title}} automatically builds a map of instance nodes stamped into
its local DOM, to provide convenient access to frequently used nodes without
the need to query for (and memoize) them manually.  Any node specified in the
element's template with an `id` is stored on the `this.$` hash by `id`.

Example:

    <dom-module id="x-custom">
      <template>
        Hello World from <span id="name"></span>!
      </template>
    </dom-module>

    <script>

      Polymer({

        is: 'x-custom',

        ready: function() {
          this.$.name.textContent = this.name;
        }

      });

    </script>


**Note:** The `this.$` hash is populated when the element's local DOM is constructed
from its template, so it's available by the time the [`ready` callback](registering-elements.html#ready-method)
is called. It is **not updated** for dynamically-created elements (for example,
if you have an `x-repeat` in your template, the `x-repeat`'s children are not added to
the `this.$` hash).
{: .alert .alert-info }


## DOM (re-)distribution {#dom-distribution}

To support composition of an element's light DOM with its local DOM, Polymer
supports the `<content>` element. The `<content>` element provides an insertion
point at which an element's light DOM is combined with its local DOM. The
`<content>` element supports a `select` attribute which filters nodes via a
simple selector.

Example:

    <template>
      <header>Local dom header followed by distributed dom.</header>
      <content select=".content"></content>
      <footer>Footer after distributed dom.</footer>
    </template>

In shadow DOM, the browser maintains separate light DOM and shadow DOM trees, and creates a 
merged view (the _composed tree_) for rendering purposes. `addChild` adds a node to an element's 
light DOM.

In shady DOM, {{site.project_title}} maintains its own light DOM and shady DOM trees.
The document's DOM tree is effectively the composed tree. 

## DOM API {#dom-api}

Polymer provides custom API for manipulating DOM such that local DOM and light DOM trees are properly maintained.

**Note:** All DOM manipulation must use this API, as opposed to DOM API directly on nodes.
{: .alert .alert-error }

The following methods are provided:

  * `Polymer.dom(parent).appendChild(node)`
  * `Polymer.dom(parent).insertBefore(node, beforeNode)`
  * `Polymer.dom(parent).removeChild(node)`
  * `Polymer.dom(parent).querySelector(selector)`
  * `Polymer.dom(parent).querySelectorAll(selector)`
  * `Polymer.dom(parent).childNodes`
  * `Polymer.dom(node).parentNode`
  * `Polymer.dom(contentElement).getDistributedNodes()`
  * `Polymer.dom(node).getDestinationInsertionPoints()`
  * `Polymer.dom.flush()`

**Async operations:** The insert, append, and remove operations are transacted lazily in certain cases for performance.  In order to interrogate the dom (e.g. `offsetHeight`, `getComputedStyle`, etc.) immediately after one of these operations, call `Polymer.dom.flush()` first.
{: .alert .alert-info }

Calling `append`/`insertBefore` where `parent` is a custom Polymer element adds the node to the light DOM of the element.  In order to insert/append into the shadow root of a custom element, use `this.root` as the parent.

`Polymer.dom` properties and methods that return a list of nodes return an `Array`, not a `NodeList` like the standard DOM equivalent.

Example:

    var toLight = document.createElement('div');
    Polymer.dom(this).appendChild(toLight);

    var toLocal = document.createElement('div');
    var beforeNode = Polymer.dom(this.root).childNodes[0];
    Polymer.dom(this.root).insertBefore(toLocal, beforeNode);

    var allSpans = Polymer.dom(this).querySelectorAll('span');

You can use `Polymer.dom` on any node, whether or not it has a local DOM tree:

Example:

    <template>
      <div id="container">
         <div id="first"></div>
         <content></content>
      </div>
    </template>

    ...

    var insert = document.createElement('div');
    Polymer.dom(this.$.container).insertBefore(insert, this.$.first);

Sometimes it's necessary to access the elements which have been distributed to a given `<content>` insertion point or to know to which `<content>` a given node has been distributed. The `getDistributedNodes` and `getDestinationInsertionPoints` respectively provide this information.

Example:

    <x-foo>
      <div></div>
    </x-foo>

    <!-- x-foo's template -->
    <template>
      <content></content>
    </template>

    // script
    var div = Polymer.dom(xFoo).querySelector('div');
    var content = Polymer.dom(xFoo.root).querySelector('content');
    var distributed = Polymer.dom(content).getDistributedNodes()[0];
    var insertedTo = Polymer.dom(div).getDestinationInsertionPoints()[0];

    // the following should be true:
    assert.equal(distributed, div);
    assert.equal(insertedTo, content)

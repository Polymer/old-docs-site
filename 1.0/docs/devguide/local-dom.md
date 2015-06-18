---
layout: default
type: guide
shortname: Docs
title: Local DOM Basics and API
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

      <script>
        Polymer({
          is: 'x-foo'
        });
      </script>

    </dom-module>



We say that an element definition has an imperative and declarative portion. The imperative
portion is the call to `Polymer({...})`, and the declarative portion is the `<dom-module>`
element. The imperative and declarative portions of an element's definition may be placed
in the same html file or in separate files.

**Note:** Defining an element in the main HTML document is not currently supported.
{: .alert .alert-info }


## Automatic node finding {#node-finding}

{{site.project_title}} automatically builds a map of statically created instance nodes 
in  its local DOM, to provide convenient access to frequently used nodes without
the need to query for them manually.  Any node specified in the
element's template with an `id` is stored on the `this.$` hash by `id`.

**Note:** Nodes created dynamically using data binding (including those in 
`dom-repeat` and `dom-if` templates) are _not_ added to the
`this.$` hash. The hash includes only _statically_ created local DOM nodes
(that is, the nodes defined in the element's outermost template).
{: .alert .alert-warning }


Example:

    <dom-module id="x-custom">

      <template>
        Hello World from <span id="name"></span>!
      </template>

      <script>

        Polymer({

          is: 'x-custom',

          ready: function() {
            this.$.name.textContent = this.name;
          }

        });

      </script>

    </dom-module>

  

For locating dynamically-created nodes in your element's local DOM, use the `$$` 
method:

<code>this.$$(<var>selector</var>)</code>

`$$` returns the first node in the local DOM that matches <code><var>selector</var></code>.

## DOM distribution {#dom-distribution}

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

Polymer provides a custom API for manipulating DOM such that local DOM and light DOM trees are properly maintained. These methods
and properties have the same signatures as their standard DOM equivalents, except that properties and methods 
that return a list of nodes return an `Array`, not a `NodeList`.

**Note:** All DOM manipulation must use this API, as opposed to DOM API directly on nodes.
{: .alert .alert-error }

The following methods and properties are provided.

Adding and removing children:

*   `Polymer.dom(parent).appendChild(node)`
*   `Polymer.dom(parent).insertBefore(node, beforeNode)`
*   `Polymer.dom(parent).removeChild(node)`
*   `Polymer.dom.flush()`

Calling `append`/`insertBefore` where `parent` is a custom Polymer element adds the node to the light DOM of the element.  In order to insert/append into the local dom of a custom element, use `this.root` as the parent.

 **Async operations:** The insert, append, and remove operations are transacted lazily in certain cases for performance.  In order to interrogate the dom (e.g. `offsetHeight`, `getComputedStyle`, etc.) immediately after one of these operations, call `Polymer.dom.flush()` first.
{: .alert .alert-info }

Parent and child APIs:
 
  * `Polymer.dom(parent).childNodes`
  * `Polymer.dom(node).parentNode`
  * `Polymer.dom(node).firstChild`
  * `Polymer.dom(node).lastChild`
  * `Polymer.dom(node).firstElementChild`
  * `Polymer.dom(node).lastElementChild`
  * `Polymer.dom(node).previousSibling`
  * `Polymer.dom(node).nextSibling`
  * `Polymer.dom(node).textContent`
  * `Polymer.dom(node).innerHTML`

Query selector:

  * `Polymer.dom(parent).querySelector(selector)`
  * `Polymer.dom(parent).querySelectorAll(selector)`

Content APIs:

  * `Polymer.dom(contentElement).getDistributedNodes()`
  * `Polymer.dom(node).getDestinationInsertionPoints()`

Node mutation APIs:

  * `Polymer.dom(node).setAttribute(attribute, value)`
  * `Polymer.dom(node).removeAttribute(attribute)`
  * `Polymer.dom(node).classList`

Using these node mutation APIs when manipulating children ensures that shady DOM 
can distribute content elements dynamically. If you change attributes or classes
that could affect distribution **without** using the `Polymer.dom` API, call
`distributeContent` on the host element to force it to update its distribution.

### DOM API examples 

Some examples of using the `Polymer.dom`.

Add a child to the light DOM:

    var toLight = document.createElement('div');
    Polymer.dom(this).appendChild(toLight);

Insert a child into the local DOM:

    var toLocal = document.createElement('div');
    var beforeNode = Polymer.dom(this.root).childNodes[0];
    Polymer.dom(this.root).insertBefore(toLocal, beforeNode);

Retrieve all `<span>` elements in the light DOM.

    var allSpans = Polymer.dom(this).querySelectorAll('span');

You can use `Polymer.dom` on any node, whether or not it has a local DOM tree:

    <template>
      <div id="container">
         <div id="first"></div>
         <content></content>
      </div>
    </template>

    ...

    var insert = document.createElement('div');
    Polymer.dom(this.$.container).insertBefore(insert, this.$.first);

Sometimes it's necessary to access the elements which have been distributed to a given `<content>` insertion point or to know to which `<content>` a given node has been distributed. The `getDistributedNodes` and `getDestinationInsertionPoints` methods, respectively, provide this information:


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




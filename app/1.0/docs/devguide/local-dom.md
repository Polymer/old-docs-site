---
title: Local DOM Basics and API
---

<!-- toc -->

The DOM that an element creates and manages is called its _local
DOM_. This is distinct from the element's children which are sometimes called
its _light DOM_ for clarity.

Polymer supports multiple local DOM implementations. On browsers
that support shadow DOM, shadow DOM may be used to create local DOM. On other
browsers, Polymer provides local DOM via a custom
implementation called _shady DOM_ which is inspired by shadow DOM.

Shady DOM requires you to use the [Polymer DOM API](#dom-api)
when manipulating DOM from JavaScript. This interface covers most of the
common DOM methods and properties, and is compatible with both shady DOM and
native shadow DOM.


**Note:** Currently Polymer uses shady DOM by default on all
browsers. To opt-in to using shadow DOM where available, see [Global
settings](settings).
{.alert .alert-info}


## Local DOM template {#template-stamping}

To specify DOM to use for an element's local DOM, use the `<dom-module>`
element. Give the `<dom-module>` an `id` attribute that matches its element's
`is` property and put a `<template>` inside the `<dom-module>`. Polymer will
automatically clone this template's contents into the element's local DOM.

Example: { .caption }

```html
<dom-module id="x-foo">

  <template>I am x-foo!</template>

  <script>
    Polymer({
      is: 'x-foo'
    });
  </script>

</dom-module>
```

We say that an element definition has an imperative and declarative portion.
The imperative portion is the call to `Polymer({...})`, and the declarative
portion is the `<dom-module>` element. The imperative and declarative portions
of an element's definition may be placed in the same html file or in separate
files.

The `<script>` tag can be inside or outside of the `<dom-module>` element.

The element’s template must be parsed before the call to Polymer.


**Note:** Elements should generally be defined outside of the main document,
except for testing. For caveats about defining elements in the main document,
see [main document definitions][mdd].
{.alert .alert-info}

[mdd]: registering-elements#main-document-definitions


## Automatic node finding {#node-finding}

Polymer automatically builds a map of statically created
instance nodes in  its local DOM, to provide convenient access to frequently
used nodes without the need to query for them manually. Any node specified in
the element's template with an `id` is stored on the `this.$` hash by `id`.


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

    Polymer({

      is: 'x-custom',

      ready: function() {
        this.$.name.textContent = this.tagName;
      }

    });

  </script>

</dom-module>
```

For locating dynamically-created nodes in your element's local DOM,
the `$$` method provides a shorthand for `Polymer.dom(this.root).querySelector()`:

<code>this.$$(<var>selector</var>)</code>

`$$` returns the first node in the local DOM that matches
<code><var>selector</var></code>.

## DOM distribution {#dom-distribution}

To support composition of an element's light DOM with its local DOM, Polymer
supports the `<content>` element. The `<content>` element provides an insertion
point at which an element's light DOM is combined with its local DOM. The
`<content>` element supports a `select` attribute which filters nodes via a
simple selector.

Example: { .caption }

```html
<template>
  <header>Local dom header followed by distributed dom.</header>
  <content select=".content"></content>
  <footer>Footer after distributed dom.</footer>
</template>
```

In shadow DOM, the browser maintains separate light DOM and shadow DOM trees,
and creates a merged view (the _composed tree_) for rendering purposes.

In shady DOM, Polymer maintains its own light DOM and shady
DOM trees. The document's DOM tree is effectively the composed tree.


## DOM API {#dom-api}

Polymer provides a custom API for manipulating DOM such that local DOM and
light DOM trees are properly maintained.


**Note:** All DOM manipulation must use this API, as opposed to DOM API
directly on nodes.
{.alert .alert-error}

These methods and properties have the same signatures as their standard DOM
equivalents, with the following exceptions:

*   **`Array` not `NodeList`**. Properties and methods that return a list
    of nodes return an `Array`, not a `NodeList`.

*   **Local DOM root**. Use the `root` property to access a
    Polymer element's local DOM root—equivalent to
    the shadow root in native shadow DOM.

*   **Async operations.** Insert, append, and remove operations are
    transacted lazily in certain cases for performance.  In order to
    interrogate the DOM (for example, `offsetHeight`, `getComputedStyle`,
    etc.) immediately after one of these operations, call
    `Polymer.dom.flush()` first.

The following methods and properties are provided.

Adding and removing children:

*   `Polymer.dom(parent).appendChild(node)`
*   `Polymer.dom(parent).insertBefore(node, beforeNode)`
*   `Polymer.dom(parent).removeChild(node)`
*   `Polymer.dom.flush()`

Calling `append`/`insertBefore` adds the node to <var>parent</var>'s
_light DOM_.  In order to insert/append into the local DOM of a custom
element, use a node in the local DOM as a parent (or `this.root`, which is
the root of the local DOM).

Parent and child APIs:

  * `Polymer.dom(parent).childNodes`
  * `Polymer.dom(parent).children`
  * `Polymer.dom(node).parentNode`
  * `Polymer.dom(node).firstChild`
  * `Polymer.dom(node).lastChild`
  * `Polymer.dom(node).firstElementChild`
  * `Polymer.dom(node).lastElementChild`
  * `Polymer.dom(node).previousSibling`
  * `Polymer.dom(node).nextSibling`
  * `Polymer.dom(node).textContent`
  * `Polymer.dom(node).innerHTML`


**Note:** When working with light DOM children, you may want to consider
using the distributed children or effective children APIs.
See [Work with light DOM children](#light-dom-children) for details.
{.alert .alert-info}

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

Using these node mutation APIs when manipulating children ensures that shady
DOM can distribute content elements dynamically. If you change attributes or
classes that could affect distribution **without** using the `Polymer.dom`
API, call `distributeContent` on the host element to force it to update its
distribution.

### Work with local DOM

Every Polymer element has a `this.root` property which is the
root of its local DOM tree. You can manipulate the tree using `Polymer.dom`
methods:

```js
// Append to local DOM
var toLocal = document.createElement('div');
Polymer.dom(this.root).appendChild(toLocal);

// Insert to the local DOM
var toInsert = document.createElement('div');
var beforeNode = Polymer.dom(this.root).childNodes[0];
Polymer.dom(this.root).insertBefore(toInsert, beforeNode);
```

You can use the [automatic node finding](#node-finding) feature to locate
local DOM nodes:

```js
var item = document.createElement('li');
Polymer.dom(this.$.list).appendChild(item);
```

You can also locate nodes in the local DOM using `querySelector`,
`querySelectorAll`, or the `$$` utility method:

```js
var cancelButton = Polymer.dom(this.root).querySelector('#cancelButton');

// Shorthand for finding a local DOM child by selector
// (equivalent to the above):
this.$$('#cancelButton');
```

### Work with light DOM children {#light-dom-children}

When creating a custom element that can take light DOM children, you
frequently need to interact with  your child nodes imperatively.

An element can access its light DOM children using `Polymer.dom(this).children`
and similar properties and methods. However, most of the time you want to be
aware of how light DOM children are distributed to insertion points.

If your element has local DOM and contains one or more insertion points
(`<content>` tags), you can query the set of [_distributed child
nodes_](#distributed-children) that are being distributed to a given insertion
point.

In some cases, distributed nodes might not be what you want. For example:

*   Your element has no shadow DOM.
*   You're interested in elements that **aren't** being distributed into
    any insertion point.
*   You want to see all of your child nodes, regardless of what insertion
    point they've been distributed to.

In these cases, you simply want a list of the element's children. The
[_effective children_ APIs](#effective-children) are a useful way of accessing
light DOM children regardless of whether they're being distributed to
insertion points in your element.

```html
<dom-module id="simple-content">
  <template>
    <content id="myContent"></content>
  </template>
  <script>
    Polymer({
      is: 'simple-content',
      ready: function() {
        var distributed = this.getContentChildren('#myContent');
        console.log(distributed.length);
      }
    });
  </script>
</dom-module>
```

#### Effective children {#effective-children}

Effective children are the  set of an element's light DOM children, _with
any insertion points replaced by their distributed children._

Consider a simple image carousel element with no local DOM. It's used like this:

```html
<simple-carousel>
  <img src="one.jpg">
  <img src="two.jpg">
  <img src="three.jpg">
<simple-carousel>
```

The carousel adds dots underneath the current image that let the user select
a different image, so the carousel needs to know how many children it has.
This is simple enough: the carousel can check its children in the `attached`
callback:

```js
attached: function() {
  this.childCount = Polymer.dom(this).children.length;
  // do something with childCount ...
}
```

But there are a few issues here. What if you create a new element,
`<popup-carousel>`, that includes a simple carousel in its local DOM? You
use the new element the same way:

```html
<popup-carousel>
  <img src="one.jpg">
  <img src="two.jpg">
</popup-carousel>
```

Internally, the popup-carousel does something like this:

```html
<dom-module id="popup-carousel">
  <template>
    <simple-carousel>
      <content></content>
    </simple-carousel>
  </template>
  ...
</dom-module>
```

The popup carousel simply passes its children on to the simple carousel by
including a `<content>` tag. But now the simple carousel's `attached` method
doesn't work: `Polymer.dom(this).children.length` will always return 1,
because the carousel only has a single child, the `<content>` tag.

Clearly, `children` isn't what you want here. You want a list of children,
with any `<content>` tags replaced by their distributed children.
Unfortunately, the platform doesn't have a primitive for this, so Polymer
has added the concept of "effective children" in its DOM API.

You can retrieve an element's effective child nodes using:

```js
var effectiveChildren = Polymer.dom(element).getEffectiveChildNodes();
```

For convenience, several utility methods are available on the Polymer
element prototype:

*   `getEffectiveChildNodes()`. Returns a list of effective child nodes for
    this element.
*   `getEffectiveChildren()`. Returns a list of effective child elements for
    this element.
*   `queryEffectiveChildren(selector)`. Returns the first effective child
    that matches <var>selector</var>.
*   `queryAllEffectiveChildren(selector)`. Returns a list of effective
    children that match <var>selector</var>.

Replacing `children` with the `getEffectiveChildren` method gives you the
result you want:

```js
this.childCount = this.getEffectiveChildren().length;
```

You can think of `getEffectiveChildren` as a composition-friendly version of
`children`.

### Observe added and removed children {#observe-nodes}

Use the DOM API's `observeNodes` method to track when children are added and
removed from your element:

```js
this._observer =
    Polymer.dom(this.$.contentNode).observeNodes(function(info) {
  this.processNewNodes(info.addedNodes);
  this.processRemovedNodes(info.removedNodes);
});
```

You pass `observeNodes` a callback to be invoked when nodes are added or
removed. The callback takes a single Object argument, with `addedNodes` and
`removedNodes` arrays.

The method returns a handle that can be used to stop observation:

```js
Polymer.dom(node).unobserveNodes(this._observer);
```

The `observeNodes` method behaves slightly differently depending on the
node being observed:

*   If the node being observed is a _content node_, the callback is called
    when the content node's _distributed children_ change.
*   For any other node, the callback is called when the node's [_effective
    children_](#effective-children) change.

A few notes on `observeNodes`:

*   Since the method is attached to the DOM API, the callback is called the
    observed node as the `this` value. So if you do:

    ```js
    this._observer = Polymer.dom(this.$.content).observeNodes(_childrenChanged);
    ```

    The callback is invoked with `this.$.content` as the `this` value. If you
    want to use the custom element as the `this` value, you need to bind the
    callback:

    ```js
    var boundHandler = this._childNodesChanged.bind(this);
    this._observer = Polymer.dom(this.$.content).observeNodes(boundHandler);
    ```

*   The callback argument lists added and removed nodes, not just elements.
    If you're only interested in elements, you can filter the node list:

    ```js
    info.addedNodes.filter(function(node) {
      return (node.nodeType === Node.ELEMENT_NODE)
    });
    ```

*   The first callback from `observeNodes` contains **all** nodes added
    to the element, _not_ the elements added since `observeNodes` was
    called. This works well if you're using `observeNodes` exclusively.

    If you need to synchronously process the element's children -- for
    example, in `attached`, and then use `observeNodes` to monitor changes
    to the child list, you may need to be aware of this.


#### Why not just a mutation observer?

If you're familiar with mutation observers, you may wonder why you can't just
use a mutation observer to handle DOM changes.

For the simple case, you can use a mutation observer to detect when children
are added or removed from your element. However, mutation observers have the
same limitation as the `children` list: they don't reflect local DOM
distributions. In the case of the `<popup-carousel>` example, adding a child
to `<popup-carousel>` wouldn't trigger a mutation observer on
`<simple-carousel>`.

To detect those changes, `<simple-carousel>` would have to check its child
list for `<content>` nodes. If it's got a `<content>` node in its `children`,
it would need to add _another_ mutation observer on its shadow host (in this
case, `<popup-carousel>`). And so on. Suddenly, the `<simple-carousel>` isn't
so simple anymore.

The `observeNodes` method handles this complexity for you. It uses mutation
observers internally to track DOM changes, and handles the extra bookkeeping
required to track local DOM distributions. Unlike a mutation observer, the
`observeNodes` callback is only invoked when nodes are added or removed—it
doesn't handle attribute changes or character data changes.

### DOM API examples

Some examples of using the `Polymer.dom`.

Add a child to the light DOM:

```js
var toLight = document.createElement('div');
Polymer.dom(this).appendChild(toLight);
```

Retrieve all `<span>` elements in the light DOM.

```js
var allSpans = this.queryAllEffectiveChildren('span');
```

You can use `Polymer.dom` on any node, whether or not it has a local DOM tree:

```js
<template>
  <div id="container">
     <div id="first"></div>
     <content></content>
  </div>
</template>

...

var insert = document.createElement('div');
Polymer.dom(this.$.container).insertBefore(insert, this.$.first);
```

## Remove empty text nodes {#strip-whitespace}

Add the `strip-whitespace` boolean attribute to a template to remove
any empty text nodes from the template's contents. This can result in a
minor performance improvement.

With empty text nodes:

```html
<dom-module id="has-whitespace">
  <template>
    <div>A</div>
    <div>B</div>
  </template>
  <script>
    Polymer({
      is: 'has-whitespace',
      ready: function() {
        console.log(Polymer.dom(this.root).childNodes.length); // 5
      }
    });
  </script>
</dom-module>
```

Without empty text nodes:

```html
<dom-module id="no-whitespace">
  <template strip-whitespace>
    <div>A</div>
    <div>B</div>
  </template>
  <script>
    Polymer({
      is: 'no-whitespace',
      ready: function() {
        console.log(Polymer.dom(this.root).childNodes.length); // 2
      }
    });
  </script>
</dom-module>
```

Starting in release 1.8.0, `strip-whitespace` is recursive, affecting any nested `dom-if` and
`dom-repeat` instances inside the  template.

## Preserve template contents

Polymer performs one-time processing on your DOM template. For example:

-   Parsing and removing binding annotations.
-   Parsing and removing markup for declarative event listeners.
-   Caching and removing the contents of nested templates for better performance. 

This processing removes the template's original contents (the `content` property will be 
undefined). If you want to access the contents of a nested template, you can add the 
`preserve-content` attribute to the template.

Preserving the contents of a nested template means it **won't have any Polymer features like
data bindings or declarative event listeners.** Only use this when you want to manipulate the
template yourself, and you don't want Polymer to touch it.

This is a fairly rare use case.

```html
<dom-module id="custom-template">
  <template>
    <template id="special-template" preserve-content>
      <div>I am very special.</div>
    </template>
  </template>
  <script>
    Polymer({
      is: 'custom-template',
      ready: function() {
        // retrieve the nested template
        var template = Polymer.dom(this.root).querySelector('#special-template');

        // insert some copies of the template, with no data binding
        for (var i=0; i<10; i++) {
          Polymer.dom(this.root).appendChild(document.importNode(template.content, true));
        }
      }
    });
  </script>
</dom-module>
```
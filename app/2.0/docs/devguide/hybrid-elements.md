---
title: Build hybrid elements
---

Hybrid elements are Polymer elements designed to run under both Polymer 1.x and Polymer 2.x. Polymer
2 provides a backwards-compatible API for hybrid elements.

Implementing a hybrid element requires some extra work, including maintaining multiple sets of
bower dependencies, testing on both Polymer 1 and Polyemr 2. Build hybrid elements if you're
creating a set of reusable elements and need to support customers using both Polymer 1.x and Polymer
2.x. You may also find hybrid elements useful if you're trying to port a large application.

Polymer CLI supports installing and testing with multiple versions of your bower dependencies, so
you can test your hybrid elements against multiple versions of Polymer. For an overview, see
[Manage dependencies for hybrid elements](#dependency-variants).

## Register a hybrid element

Hybrid elements use a Polymer 1.x-compatible API. Use the `Polymer` function to define a hybrid
element.

The function takes as its argument the  prototype for the new element. The prototype
must have an `is` property that specifies the HTML tag name for your custom element.

By specification, the custom element's name **must start with an ASCII letter and contain a dash (-)**.

Example: { .caption }

```html
<!-- import the legacy base class and backwards-compatible API -->
<link rel="import" href="/bower_components/polymer/polymer.html">

<script>
    // register an element
    MyElement = Polymer({

      is: 'my-element',

      // Define properties
      properties: {
        data: Object
      },

      // Define complex observers
      observers: [
        '_dataChanged(data.*)'
      ],

      _dataChanged(changeRecord {
        // ...
      },

      // See below for lifecycle callbacks
      ready: function() {
        this.textContent = 'My element!';
      }

    });
</script>
```

As shown above, hybrid elements place the `properties` object and `observers` array directly on the
prototype, not in a `config` object like a class-style element.

The `Polymer` function registers the element with the browser and returns a
constructor that can be used to create new instances of your element via code.

The `Polymer` function sets up the prototype chain for your custom element,
so you cannot set up your own prototype chain.

-   In 1.x, your prototype is chained to the Polymer `Base` prototype (which
    provides Polymer value-added features).
-   In 2.0, Polymer uses your prototype to create a new class that extends
    `Polymer.LegacyElement`.

You can use Polymer 1.x style [behaviors](#behaviors) to share code between elements.

## Lifecycle callbacks {#lifecycle-callbacks}

Hybrid element provide the same lifecycle callbacks used in Polymer 1. Note that there
are limitations to what you can do in certain callbacks, and some timing differences
running under 2.0 versus 1.x.

<table>
  <tr>
    <th>Legacy callback</th>
    <th>Description</th>
  </tr>
  <tr>
    <td><code>created</code></td>
    <td>Called when the element has been created, but before property values are
       set and shadow DOM is initialized.
      <p>Use for one-time set-up before property values are set.
      </p>
      <p>Equivalent to the native constructor.
      </p>
    </td>
  </tr>
  <tr>
    <td><code>ready</code></td>
    <td>Called after property values are set and local DOM is initialized.
      <p>Use for one-time configuration of your component after local
        DOM is initialized. (For configuration based on property values, it
        may be preferable to use an <a href="observers">observer</a>.)
      </p>
    </td>
  </tr>
  <tr>
    <td><code>attached</code></td>
    <td>Called after the element is attached to the document. Can be called multiple
        times during the lifetime of an element. The first `attached`  callback
        is guaranteed not to fire until after `ready`.
      <p>Uses include adding document-level event listeners. (For listeners local to the element,
      you can use declarative
        event handling, such as <a href="events.html#annotated-listeners">annotated
        event listeners</a> or the
        <a href="events#event-listeners"><code>listeners</code> object</a>.)</p>
     <p>Equivalent to native <code>connectedCallback</code>.</p>
      </p>
    </td>
  </tr>
  <tr>
    <td><code>detached</code></td>
    <td>Called after the element is detached from the document. Can be called
        multiple times during the lifetime of an element.
      <p>Uses include removing event listeners added in <code>attached</code>.
      </p>
      <p>Equivalent to native <code>disconnectedCallback</code>.</p>
      </p>
    </td>
  </tr>
  <tr>
    <td><code>attributeChanged</code></td>
    <td>Called when one of the element's attributes is changed.
      <p>Use to handle attribute changes that <em>don't</em> correspond to
        declared properties. (For declared properties, Polymer
        handles attribute changes automatically as described in
        <a href="properties#attribute-deserialization">attribute deserialization</a>.)
      </p>
      <p>Equivalent to the native <code>attributeChangedCallback</code>.
      </p>
    </td>
  </tr>
</table>

The following sections describe the callbacks and implementation differences in more detail.

### Creation time (created) {#creation-time-created}

The custom elements v1 specification forbids reading attributes, and accessing child or parent
information from the DOM API from the constructor. Likewise, attributes and children cannot be added.
You need to move any DOM work out the `created` callback:

*   Defer work until after `created` completes using `setTimeout` or `requestAnimationFrame`.
*   Move work to a different callback,such as `attached` or `ready`.
*   Use an observer, event listener, or mutation observer to react to runtime changes.

### Ready time {#ready-time}

The `ready` callback, for one-time initialization, is called after the  element's shadow DOM has
been created.

The major difference between 1.x and 2.0 has to do with the timing of initial light DOM distribution.
In the v1 shady DOM polyfill, initial distribution of children into `<slot>` is asynchronous
(microtask) to creating the `shadowRoot`, meaning distribution occurs after observers are run and
`ready`  is called. In the Polymer 1.0 shim, initial distribution occurs before `ready`.

To check the initial distribution, use `setTimeout` or `requestAnimationFrame` from `ready`. The
callback should fire after initial distribution is complete.

```js
ready: function() {
  setTimeout(function() {
    var distributedNodes = this.getContentChildNodes();
    console.log(distributedNodes);
  }.bind(this), 0);
}
```

You can use `observeNodes` method to react to runtime changes to distribution.

```js
ready: function() {
  this._observer = Polymer.dom(this.$.contentNode).observeNodes(function(info) {
      this.processNewNodes(info.addedNodes);
      this.processRemovedNodes(info.removedNodes);
  });
}
```

For more details on `observeNodes`, see
[Observe added and removed children](/1.0/docs/devguide/local-dom#observe-nodes) in the Polymer 1
documentation.

In order to force distribution synchronously, call `ShadyDOM.flush()`. This can be useful for unit
tests.

### Attach time (attached/connectedCallback) {#attach-time-attached-connectedcallback}

If you have any code that relies on the element being rendered when the `attached` callback runs
(for example, measuring the element or its children), it must wait until the element has rendered.

In 1.x, the `attached` callback is deferred until the element has been rendered

Use the `Polymer.RenderStatus.afterNextRender` function to register a one-time callback after the
next render.

```
attached: function() {
  // 1st argument to afterNextRender is used as the "this"
  // value when the callback is invoked.
  Polymer.RenderStatus.afterNextRender(this, function() {
     // measure something
  });
}
```

### Hybrid behaviors {#hybrid-behaviors}

Like Polymer 1.x elements, hybrid elements can share code using_behaviors_, which can define
properties, lifecycle callbacks, event listeners, and other features. To work with hybrid elements,
hybrid behaviors must follow the same constraints as hybrid elements.

For more information on behaviors, see [Behaviors](/1.0/docs/devguide/behaviors) in the Polymer 1.x
docs.

## Working with DOM

Hybrid elements need to run under Polymer 2.0—which uses the newer shadow DOM v1 specification, and
and Polymer 1.x, which uses the earlier shadow DOM v0 specification.

*   When writing the DOM template for a hybrid element, use the shadow DOM v1 style `<slot>` element
    and `::slotted` selector.

*   When manipulating DOM elements at runtime, use the `Polymer.dom` APIs for backward compatibility.

### DOM template and styling

Hybrid elements must use the shadow DOM v1 style `<slot>` element, and `::slotted()` CSS selector
in place of the `<content>` element and `::content` selector from shadow DOM v0.

Note that `<slot>` is more restrictive than the v0 `<content>` mechanism:

*   Insertion points that selected content using <code>&lt;content select="<var>selector</var>"&gt;</code>
    must be changed to named slots: <code>&lt;slot name="<var>slot_name</var>"&gt;</code>. Note that
    in shadow DOM v1, distributed content can _only_ be selected by slot name, not by tag name,
    attributes or CSS classes.

*   Users of your element must use the matching new <code>slot="<var>slot_name</var>"</code>
    attribute to distribute content into a named slot.

*   Any `::content` CSS selectors must be replaced with <code>::slotted(<var>selector</var>)</code>,
    where <var>selector</var> is [compound selector](https://drafts.csswg.org/selectors-4/#compound)
    that identifies a **top-level distributed child**. That is, `::slotted(.foo)` is equivalent to
    `::content > .foo`.

    In shadow DOM v1, you cannot select a descendant of a top-level distributed child. For example,
    `::slotted(*) .child` does not work. No descendant selectors can follow the `::slotted()` selector.

When running in Polymer 1.x, `<slot>` elements are re-written at runtime into the
equivalent `<content>` elements and `::content` style rules, to work with shadow DOM v0.

As written:
{.caption}

```html
<dom-module id="x-forward-compat">
  <template>
    <style>
      #container ::slotted(.foo) {
        color: red;
      }
      #namedContainer ::slotted(*) {
        border: 2px solid black;
      }
    </style>
    <div id="namedContainer">
      <slot name="named"></slot>
    </div>
    <div id="container">
      <slot></slot>
    </div>
  </template>
</dom-module>
```

After runtime transform:
{.caption}

```html
<dom-module id="x-forward-compat">
  <template>
    <style>
      #container ::content > .foo {
        color: red;
      }
      #namedContainer ::content > * {
        border: 2px solid black;
      }
    </style>
    <div id="namedContainer">
      <content select="[slot=named]"></content>
    </div>
    <div id="container">
      <content></content>
    </div>
  </template>
</dom-module>
```

Note that Polymer doesn't transform code that _uses_ this element.
Anywhere you're using `x-forward-compat`, you need to use the new slot syntax:

```
<x-forward-compat>
  <h2 slot="named">I'm the named content</h2>
  <span>This content goes to the default slot.</span>
</x-forward-compat>

#### Default slot behavior

For native shadow DOM v1, a default slot doesn't match children with an explicit slot name
(that  is, a <code>slot="<var>slot_name</var>"</code> attribute).

When running in 1.x mode, a default `<slot>` element is translated to a default `<content>`
element, which accepts all distributed children that haven't matched a previous `<content>` element.
This means that for hybrid elements, **all named slots must come _before_ any unnamed slots in the
DOM.**

For example, given this set of slots:

```html
<slot name="header"></slot>
<slot></slot>
<slot name="footer"></slot>
```

Content with `slot="footer"` is distributed to the _default_ slot in 1.x, but distributed to the
last slot in 2.0.

### DOM APIs

When working with the DOM imperatively, use the Polymer 1.x APIs, such as `Polymer.dom`,
`observeNodes`, and `getContentChildNodes`.

Note that the initial distribution of light DOM children into slots may be delayed under the
polyfill, as described in the [discussion of the `ready` callback](#ready-time).

## Version-specific code {#version-specific-code}

In some cases, you may need to run different code depending on which version of Polymer is in use.
One easy way to test the version is to test for the existence of the `Polymer.Element` constructor,
which is only used in Polymer 2.

```js
if (Polymer.Element) {
  // version 2 code
} else {
  // version 1 code
}
```

## Manage dependencies for hybrid elements {#dependency-variants}

For testing Polymer elements, Polymer CLI supports installing multiple versions of bower
dependencies. These versions are called _variants_. The components' default dependencies are listed
in the standard `dependencies` and `devDependencies` sections. The default dependencies should
use version ranges that include all versions supported by the component (typically, 1.7.1 or higher
for Polymer itself).

Other sets are listed in a special `variants` section. For example:

```js
  "dependencies": {
    "polymer": "Polymer/polymer#>=1.7.1 <3.0.0"
  },
  "devDependencies": {
    "iron-component-page": "PolymerElements/iron-component-page#>=1.0.0 <3.0.0",
    "iron-demo-helpers": "PolymerElements/iron-demo-helpers#>=1.0.0 <3.0.0",
    "test-fixture": "PolymerElements/test-fixture#>=1.0.0 <3.0.0",
    "web-component-tester": "^6.0.0",
    "webcomponentsjs": "webcomponents/webcomponentsjs#>=0.7.0 <2.0.0"
  },
  "variants": {
    "1.x": {
      "dependencies": {
        "iron-resizable-behavior": "PolymerElements/iron-resizable-behavior#^1.0.0",
        "polymer": "Polymer/polymer#^1.0.0"
      },
      "devDependencies": {
        "iron-component-page": "PolymerElements/iron-component-page#^1.0.0",
        "paper-styles": "PolymerElements/paper-styles#^1.0.0",
        "iron-demo-helpers": "PolymerElements/iron-demo-helpers#^1.0.0",
        "test-fixture": "PolymerElements/test-fixture#^1.0.0",
        "web-component-tester": "^4.0.0",
        "webcomponentsjs": "webcomponents/webcomponentsjs#^0.7.0"
      }
    }
  },
```

In the example above, the default dependencies match either 1.x or 2.x, while the 1.x variant
matches 1.x.

Run the following command to install both sets of dependencies:

`polymer install --variants`

Other CLI commands like `polymer serve` and `polymer test` can run against the default dependencies,
as well as any variants. For example, `polymer serve` serves both versions at the same time, from
different ports. Likewise, `polymer test` runs your test suites using each of the installed
variants.

When a user installs a hybrid element, **only the default dependencies are considered**. The variants
are used purely for local development and testing.

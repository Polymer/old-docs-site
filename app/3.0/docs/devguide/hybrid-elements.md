---
title: Hybrid elements
---

<!-- toc -->

<div>
{% include 'outdated.html' %}
</div>

Hybrid elements are Polymer elements designed to run under both Polymer 1.x and Polymer 2.x. Polymer
2 provides a backwards-compatible API for hybrid elements.

Implementing a hybrid element requires some extra work, including maintaining multiple sets of
bower dependencies and testing on both Polymer 1 and Polymer 2. Build hybrid elements if you're
creating a set of reusable elements and need to support customers using both Polymer 1.x and Polymer
2.x. You may also find hybrid elements useful if you're trying to port a large application.

Polymer CLI supports installing and testing with multiple versions of your bower dependencies, so
you can test your hybrid elements against multiple versions of Polymer. For an overview, see
[Manage dependencies for hybrid elements](#dependency-variants).

## Hybrid element overview

A hybrid element is defined using a 2.x-style DOM template and a 1.x-style `Polymer()` function call.

The `Polymer` function sets up the prototype chain for your custom element,
so you cannot set up your own prototype chain.

-   In 1.x, your prototype is chained to the Polymer `Base` prototype (which
    provides Polymer value-added features).

-   In 2.x, Polymer uses your prototype to create a new class that extends
    `Polymer.Element`. The class also mixes in the `Polymer.LegacyElementMixin`, which adds
    backward-compatbile APIs that are not included in `Polymer.Element.

Hybrid elements must use a compatible subset of the 1.x API. (Version-specific API calls can be
conditionalized.)

You can use Polymer 1.x style [behaviors](#behaviors) to share code between elements, as long
as they follow the same API restrictions as hybrid elements.

## Working with DOM

Hybrid elements need to run under Polymer 2.0—which uses the newer shadow DOM v1 specification, and
Polymer 1.x, which uses the earlier shadow DOM v0 specification.

*   When writing the DOM template for a hybrid element, use the shadow DOM v1 style `<slot>` element
    and `::slotted()` selector.

*   When manipulating DOM elements at runtime, use the `Polymer.dom` APIs for backward compatibility.

### DOM template and styling

Hybrid elements must use the shadow DOM v1 style `<slot>` element and `::slotted()` CSS selector
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
```

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
last slot in 2.x.

### DOM APIs

When working with the DOM imperatively, use the Polymer 1.x APIs, such as `Polymer.dom`,
`observeNodes`, and `getContentChildNodes`.

Note that the initial distribution of light DOM children into slots may be delayed under the
polyfill, as described in the [discussion of the `ready` callback](#ready-time).

Also note that `Polymer.dom.flush` does not flush `observeNodes` callbacks in 2.x. This is most
likely to affect unit tests using `Polymer.dom.flush` to ensure that shadow DOM children have been
distributed.

This change is because `observeNodes` uses the native `slotchange` event where possible and there
is no mechanism to force the event to fire. Instead, there is a `flush` method on the observer
object.

x-sample.html {.caption}

```
attached: function() {
  this._observer = Polymer.dom(this).observeNodes(this._onNodesChange);
},
_onNodesChange: function() {
  this.count = Polymer.dom(this).children.length;
}
```

Test code, before {.caption}

```
Polymer.dom(myElement).appendChild(document.createElement('div'));
Polymer.dom.flush();
// test some condition that should be true after the observeNodes callback fires
assert.equal(myElement.count, 1, 'child count should be 1');
```

Test code, after {.caption}

```
Polymer.dom(myElement).appendChild(document.createElement('div'));
myElement._observer.flush ? myElement._observer.flush() : Polymer.dom.flush();
// test some condition that should be true after the observeNodes callback fires
assert.equal(myElement.count, 1, 'child count should be 1');

```


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
use version ranges that include all versions supported by the component (typically, 1.9.1 or higher
for Polymer itself).

Other sets are listed in a special `variants` section. For example:

```js
  "dependencies": {
    "polymer": "Polymer/polymer#1.9 - 2"
  },
  "devDependencies": {
    "iron-component-page": "PolymerElements/iron-component-page#^2.0.0",
    "iron-demo-helpers": "PolymerElements/iron-demo-helpers#^2.0.0",
    "test-fixture": "PolymerElements/test-fixture#^2.0.0",
    "web-component-tester": "^6.0.0",
    "webcomponentsjs": "webcomponents/webcomponentsjs#^1.0.0"
  },
  "variants": {
    "1.x": {
      "dependencies": {
        "polymer": "Polymer/polymer#^1.9"
      },
      "devDependencies": {
        "iron-component-page": "PolymerElements/iron-component-page#^1.0.0",
        "paper-styles": "PolymerElements/paper-styles#^1.0.0",
        "iron-demo-helpers": "PolymerElements/iron-demo-helpers#^1.0.0",
        "test-fixture": "PolymerElements/test-fixture#^1.0.0",
        "web-component-tester": "^4.0.0",
        "webcomponentsjs": "webcomponents/webcomponentsjs#^0.7.0"
      },
      "resolutions": {
        "webcomponentsjs": "^0.7"
      }
    }
  },
  "resolutions": {
    "webcomponentsjs": "^1.0.0"
  }
```

In the example above, the default dependencies work with either Polymer 1.x or 2.x, while the
1.x variant works with 1.x.

Run the following command to install both sets of dependencies:

`polymer install --variants`

To run on both 1.x and 2.x, hybrid elements should only depend on other hybrid elements.
For elements built by the Polymer team, such as the iron-, paper- or app- elements, this
means you will need a version number of 2.0.0 or higher.

Other CLI commands like `polymer serve` and `polymer test` can run against the default dependencies,
as well as any variants. For example, `polymer serve` serves both versions at the same time, from
different ports. Likewise, `polymer test` runs your test suites using each of the installed
variants.

When a user installs a hybrid element, **only the default dependencies are considered**. The variants
are used purely for local development and testing.

## Polymer 1.x projects using hybrid components

If your Polymer 1.x project uses hybrid components, you will need to add a resolution for the webcomponents polyfills. Otherwise, Bower is unable to resolve the conflict between the dev dependency on webcomponents v1 and the app dependency on webcomponents 0.7.

```js
"resolutions": {
  "webcomponentsjs": "^0.7"
}
```

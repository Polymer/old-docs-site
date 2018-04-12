---
title: Polymer 2.0 upgrade guide
---

<!-- toc -->

<div>
{% include 'outdated.html' %}
</div>


Polymer 2.0 includes a number of breaking changes. However, the Polymer team has worked to provide
an incremental path for updating Polymer 1.x elements to 2.0.

Polymer 2.0 supports several types of elements:

*   2.x class-based elements use the ES6 class-based syntax supported by the custom elements v1
    specification. Recommended for new development in Polymer 2.0.
*   2.x legacy elements use the `Polymer` factory method, and have most of the 1.0 APIs available to
    them, as well as any new 2.x APIs.
*   2.x hybrid elements are elements defined using the legacy `Polymer` factory method, with extra
    code for backwards compatibility with 1.x. They can run on Polymer 1.8+ as well as Polymer 2.x.
    As much as possible, hybrid elements should stick to the common subset of APIs supported by 1.x
    and 2.x. In some cases, they may need to conditionalize code to run in 1.x or 2.x.
    Maintaining hybrid elements is more complicated than maintaining class-based or legacy elements,
    since they need to be tested on both 1.x and 2.x.

When porting a large project, you can update to Polymer 1.8 and upgrade elements to 2.0 hybrid style
one at a time. After all of the elements have been upgraded, you can test your project against
Polymer 2.0.

The Polymer team plans to release a Polymer Upgrade tool to automatically perform a number of the
changes required to upgrade 1.x elements to either hybrid or class-based style. The remaining
changes require either manual code changes, testing, or both to ensure that your element operates
the same in 2.0 as it did in 1.x. **The upgrade tool is not available at this time.**


See [Install Polymer 2.0](about_20#installing) for installation instructions.

This upgrade guide is a work in progress. Please
[report issues on GitHub](https://github.com/Polymer/docs/issues/new).

## Upgrade strategy

When upgrading an element or app, there are several possible scenarios:

-   Upgrading an individual element.
-   Upgrading a small application.
-   Upgrading a large application that uses many custom, reusable elements.

When upgrading individual elements, you can choose to upgrade to either hybrid mode (if supporting
both 1.x and 2.x simultaneously is important), or to upgrade directly to legacy mode or class-based
mode. For simple elements, just updating the DOM template and styling may be enough to get the
element running in 2.x legacy mode.

For a small application, converting your own elements to hybrid mode is probably not useful.
The simplest incremental approach is to convert each element's DOM template first and get it running
in legacy mode. Then you can port elements to class-based mode as desired.

For large applications, where you have written many of your own reusable elements, you may want to
upgrade elements individually to hybrid mode.

### Before you begin

Before you start the upgrade, there's a couple of things you need to do.

*   Update the Polymer CLI.
*   Create a new branch or workspace.
*   Update bower dependencies.

Update the Polymer CLI:

```
npm update polymer-cli
```

#### Create a new branch or workarea

You'll want to work in a new branch or workarea so you don't
break the existing, 1.x version of your element or app.

#### Update bower dependencies

Follow these steps to update your bower dependencies:

1.  Remove the existing `bower_components` folder.

    ```bash
    rm -rf bower_components
    ```

2.  Update the Polymer version in `bower.json` to the latest versions.

    | Component | Version |
    |-----------|---------|
    | Polymer   | `^2.0.0` |
    | webcomponentsjs | `^1.0.0` |
    | web-component-tester | `^6.0.0` |
    | Polymer elements | `^2.0.0` |

    A list of 2.0-compatible Polymer elements can be found on the [About Polymer 2.0](/{{{polymer_version_dir}}}/docs/about_20#elements) page.

    If you previously installed one of the 2.0 release candidates, you should
    remove your `bower_components` folder and reinstall all components.

    Example dependencies {.caption}

    ```
      "dependencies": {
        "app-layout": "PolymerElements/app-layout#^2.0.0",
        "app-route": "PolymerElements/app-route#^2.0.0",
        "iron-flex-layout": "PolymerElements/iron-flex-layout#^2.0.0",
        "iron-icon": "PolymerElements/iron-icon#^2.0.0",
        "iron-iconset-svg": "PolymerElements/iron-iconset-svg#^2.0.0",
        "iron-localstorage": "PolymerElements/iron-localstorage#^2.0.0",
        "iron-media-query": "PolymerElements/iron-media-query#^2.0.0",
        "iron-pages": "PolymerElements/iron-pages#^2.0.0",
        "iron-selector": "PolymerElements/iron-selector#^2.0.0",
        "paper-icon-button": "PolymerElements/paper-icon-button#^2.0.0",
        "polymer": "Polymer/polymer#^2.0.0",
        "webcomponentsjs": "webcomponents/webcomponentsjs#^1.0.0"
      },
      "devDependencies": {
        "web-component-tester": "^6.0.0"
      },
    ```

3.  Install the new dependencies.

    ```bash
    bower install
    ```

If you are upgrading the element to hybrid mode, you can add extra sets of bower dependencies
so you can test against multiple versions of Polymer easily. For details, see
[Manage dependencies for hybrid elements](devguide/hybrid-elements#dependency-variants).

### Upgrade an element

When upgrading an individual element, start by updating the DOM template and styling. For simple
elements, this may be the only change you need to make to run in hybrid or legacy mode.

## Shadow DOM template and styling {#shadow-dom-changes}

Polymer 2.0 elements create shadow DOM v1 shadow trees.  As such, user code related to scoped
styling, distribution, and events must be adapted to the native v1 API.


*   ***All elements*** need to update their shadow DOM template and styling as described in
    [DOM template](#dom-template) and [Shadow DOM styles](#shadow-dom-styles).


### DOM Template {#dom-template}

**All elements** need to update their shadow DOM templates and styling as described in this section.

Quick summary:

*   Remove deprecated patterns in the DOM module (`<dom-module>` using `is` or `name`; styles
    outside of the template).
*   Update your element's DOM template to use the new `<slot>` element instead of `<content>`.
*   Update styles to use the `::slotted()` selector  in place of ::content.
*   Remove any `/deep/` and `::shadow` CSS rules.
*   Update any URLs inside the template.

These changes are detailed in the following sections.

#### Remove deprecated patterns in DOM module {#remove-deprecated-patterns-in-dom-module}

Your `<dom-module>` **must set** the `id` property to specify the element name. Polymer 1.x accepted
the deprecated  `is` or `name` as alternatives.

Make sure your element's styles are defined *inside the template*. Defining styles outside the
template was deprecated in Polymer 1.x and is no longer supported.

Before {.caption}


```html
<dom-module name="blue-element">
  <template>
    <div>I am blue!</div>
  </template>
  <style>
    :host { color: blue; }
  </style>
</dom-module>
```

After {.caption}


```html
<dom-module id="blue-element">
  <template>
    <style>
      :host { color: blue; }
    </style>
    <div>I am blue!</div>
  </template>
</dom-module>
```

#### Replace content elements {#replace-content-elements}

*   Change `<content>` insertion points to `<slot>` elements.

*   Change `<content select="...">` to named slots: `<slot name="...">`.

Before {.caption}

```html
<!-- element template -->
<dom-module id="my-el">
  <template>
    ...
    <h2>
      <content select=".title"></content>
    </h2>
    <div>
      <content></content>
    </div>
  </template>
</dom-module>

  ...
<!-- usage -->
<my-el>
  <span class="title">Mr. Darcy</span>
  <span>Fun at parties.</span>
</my-el>
```


After {.caption}


```html
<!-- element template -->
<dom-module id="my-el">
  <template>
    ...
    <h2>
      <slot name="title"></slot>
    </h2>
    <div>
      <slot></slot>
    </div>
  </template>
</dom-module>

 ...
<!-- usage -->
<my-el>
  <span slot="title">Mr. Darcy</span>
  <span>Fun at parties.</span>
</my-el>
```

Note that if you're using `<content select="...">` anywhere in your code, ***this means a change to
your element's contract***, and everyone using your element will need to update to use slot names.

**Limitation.** Slots can only be selected explicitly, by *slot name*. It's impossible to select
content implicitly, based on a tag name or an arbitrary selector like `:not(.header)`.
{.alert .alert-info}

Before: implicit selection {.caption}

```html
<!-- element template -->
<dom-module id="my-el">
  <template>
    ...
    <div class="header">
      <!-- Selection by tag name isn't supported.
           This element must be redesigned to work with
           Shadow DOM v1. -->
      <content select="h2"></content>
    </div>
    <div class="body">
      <content></content>
     </div>
    </template>
</dom-module>

<!-- usage -->
<my-el>
  <h2>Mr. Darcy</h2>
  <span>Not so fun at parties.</span>
</my-el>
```

After: explicit selection {.caption}


```html
<!-- element template -->
<dom-module id="my-el">
  <template>
    ...
    <div class="header">
      <!-- Shadow DOM v1 version uses explicit slot name -->
      <slot name="header"></slot>
    </div>
    <div class="body">
      <slot></slot>
     </div>
    </template>
</dom-module>

<!-- usage -->
<my-el>
  <h2 slot="header">Mr. Darcy</h2>
  <span>Not so fun at parties.</span>
</my-el>
```

Although these examples show only a single element being assigned to a slot, any number of elements
can be assigned to the same slot. For example:

```html
<my-el>
  <h2 slot="header">Mr. Darcy</h2>
  <p>Not so fun at parties.</p>
  <p>Improves on further acquaintance.</p>
</my-el>
```

Here, both paragraphs are assigned to the default slot.

#### Default slot versus default insertion point

In shadow DOM v0, a default insertion point (one without a
`select` attribute) consumes all nodes **not matched by a previous insertion point**.  In v1, a
default slot (one without a `name` attribute) **only matches content with no slot attribute**. In
other words, **a node with a slot attribute is never distributed to the default slot**.


```html
<!-- shadow DOM v0 template -->
<template>
  <!-- this insertion point gets everything -->
  <content></content>
  <!-- the following insertion point never matches anything; the default
         Insertion point is greedy. -->
  <content select=".special"></content>
</template>

<!-- shadow DOM v1 template -->
<template>
  <!-- this slot gets any top-level nodes that don't have slot
       attributes. -->
  <slot></slot>
  <!-- the following insertion point gets any top-level nodes that have
       slot="special". -->
  <slot name="special"></slot>
  <!-- top-level nodes that have slot attributes with other values
       don't get distributed at all. -->
</template>
```

If you have complex distributions, and you're trying to upgrade to hybrid elements, you may need
to place **both** `<content>` and `<slot>` elements in the template.

#### Multilevel distribution {#multilevel-distribution}

Multilevel distribution works differently in shadow DOM v1. In v0, content was redistributed at each
level. For example, an element with `class="title"` can be distributed through several insertion
points and eventually selected by a `<content select=".title">`.

Document content {.caption}

```
<!-- v0 redistribution example -->
<parent-el>
  <span class="title">My Title</span>
</parent-el>
```

Shadow DOM of `<parent-el>` {.caption}

```
<child-el>
  <content></content>
</child-el>
```

Shadow DOM of `<child-el>` {.caption}

```
<h2>
  <!-- matches the span from the main document! -->
  <content select=".title"></content>
<h2>
```


By contrast, in v1, a host's light DOM nodes are only *assigned* to slots in the host's shadow DOM,
based on the `slot` attributes on those light DOM nodes. For a parent element to redistribute
content to a named slot, it must use a slot with a `slot` attribute.


```
<!-- v1 redistribution example -->
<parent-el>
  <span slot="header-text">My Title</span>
</parent-el>
```

Shadow DOM of <`parent-el>` {.caption}

```
<child-el>
  <!-- matches span[slot=header-text] above, targets content for
       slot[name=title] below -->
  <slot slot="title" name="header-text"></slot>
</child-el>
```

Shadow DOM of `<child-el>` {.caption}

```
<h2>
  <!-- matches the span from the main document! -->
  <slot name="title"></slot>
<h2>
```

Using the v0 approach does not work in v1. Given the same user markup:

```
<parent-el>
  <span slot="title">My Title</span>
</parent-el>
```

Shadow DOM of <`parent-el>` {.caption}

```
<child-el>
  <!-- default slot doesn't match span[slot=title] -->
  <slot></slot>
</child-el>
```

Shadow DOM of `<child-el>` {.caption}


```
<h2>
  <!-- doesn't match the default slot from parent-el -->
  <slot name="title"></slot>
<h2>
```

#### All elements: Update URLs in templates {#urls-in-templates}

In Polymer 1.x, URLs in attributes and styles inside element templates were re-written to be
relative to the HTML import that defined the element. Based on user feedback, we are changing this
behavior.

Two new properties are being added to `Polymer.Element`: `importPath` and `rootPath`. The
`importPath` property is a static getter on the element class that defaults to the element
HTML import document URL and is overridable. It may be useful to override `importPath` when an
element `template` is not retrieved from a `dom-module` or the element is not defined using an
HTML import. The `rootPath` property is set to the value of `Polymer.rootPath` which is globally
settable and defaults to the main document URL. It may be useful to set `Polymer.rootPath` to
provide a stable application mount path when using client side routing. URL's in styles are
re-written to be relative to the `importPath` property. Inside element templates, URLs in
element attributes are *no longer* re-written. Instead, they should be bound using `importPath` or
 `rootPath` where appropriate. For example:

A Polymer 1.x template that included:

```html
<img src="foo.jpg">
```

In Polymer 2.x should be:

```html
<img src$="[[importPath]]foo.jpg">
```

The `importPath` and `rootPath` properties are being ported back to Polymer 1.x, so they can be used
by hybrid elements.

### Shadow DOM styles {#shadow-dom-styles}

Update styles in your shadow DOM to match v1 specifications:


*   Replace `::content` selectors with `::slotted()` selectors.
*   Remove `/deep/` and `::shadow` selectors, if you're still using them.
*   Remove `:root` selectors.
*   Update custom property syntax.
*   Wrap `custom-style` elements.

#### Replace content selectors

Replace any `::content` CSS selectors with <code>::slotted(<em>selector</em>)</code>  where
<code><em>selector</em></code> is [compound selector](https://drafts.csswg.org/selectors-4/#compound)
that identifies a <strong>top-level distributed child</strong>.


That is:

```css
::slotted(.foo)
```

is equivalent to:


```css
::content > .foo
```


Example of ::slotted {.caption}


```html
<dom-module id="slotted-el">
  <template>
    <style>
      #container ::slotted(*) {
        color: blue;
      }
      #container ::slotted(.warning) {
        color: red;
      }
    </style>
    <div id="container">
      <slot></slot>
    </div>
  </template>
</dom-module>

<!-- usage -->
<slotted-el>
  <div>
    I'm colored blue.
  </div>
  <div class="warning">
    I'm colored red.
  </div>
  <div>
    <span class="warning">Surprise! Not red.</span>
  </div>
</slotted-el>
```

In shadow DOM v1, **you cannot select a descendant of a top-level distributed child**. For example,
you can't select the span in the previous example like this:

`#container ::slotted(*) span { ... }`

No selectors can follow the  `::slotted()` selector.

For more information, see [Styling distributed nodes](https://developers.google.com/web/fundamentals/getting-started/primers/shadowdom#stylinglightdom) in the Web Fundamentals article on shadow DOM.

#### Remove deep and shadow selectors

If you still have any `/deep/` or `::shadow` selectors in your project, it's time to remove them.
They don't work at all in shadow DOM v1.

There's no direct substitute for shadow-piercing selectors.To let users customize your element,
[custom CSS properties](/{{{polymer_version_dir}}}/docs/devguide/custom-css-properties) are probably the best option.

#### Replace root selectors {#replace-root-selectors}

If you're using the `:root` selector inside an element's template, replace it with:

```css
:host > * { ... }
```

(If you're using `:root` selection inside a `custom-style`, replace it with the `html` selector.)

In 1.x, you can use either of these selectors to override custom properties set at a higher level.
For example, the following rule in the main document:


```css
style-me {
  --my-theme-color: blue;
}
```


Overrides a `:host` rule in `style-me`'s shadow root, because they match the same element, but the
main document styles comes earlier in the cascade order. `:host > *` applies a ruleset to all of the
top-level children in the host's shadow tree, which doesn't conflict with the rule in the main
document.

Before {.caption}


```html
<style>
  :root {
    --my-theme-color: red;
  }
</style>
```


After {.caption}


```html
<style>
  :host > * {
    --my-theme-color: red;
  }
</style>
```

#### Update custom property syntax {#update-custom-property-syntax}

When applying custom properties, Polymer 1.x accepted this incorrect syntax for specifying a default
value to a `var()` function:

Before {.caption}

```css
color: var(--special-color,--default-color);
```

By specification, the default (or fallback) is a CSS value, not a custom property name. To use a
custom property as a default, add a nested `var()` function.

After {.caption}

```css
color: var(--special-color, var(--default-color));
```

In addition, you must update the syntax of any `@apply` rules to match the proposal, which doesn't
use parentheses.

Before {.caption}

```css
@apply(--my-mixin);
```

After {.caption}

```css
@apply --my-mixin;
```

#### Wrap custom-style elements {#wrap-custom-style-elements}

While custom elements v1 supports customized built-in elements, Polymer 2.0 does not currently use
them. Instead, it introduces a new `<custom-style>` element that wraps a `<style>` element.

*   **Hybrid projects.** Wrap your existing `<style is="custom-style">` elements with
    `<custom-style>` elements.
*   **2.0-only projects.** Replace your existing  `<style is="custom-style">` elements with
    `<custom-style>` elements.
*   **All projects.** Replace any `:root` selectors with `html`, and update custom property syntax
    as described in [Update custom property syntax](#update-custom-property-syntax).


Before {.caption}

```html
<style is="custom-style">
  /* In a 1.x custom-style, :root can be used to set global defaults */
  :root {
    --my-theme-color: #9C27B0;
  }
</style>
```


After (hybrid code) {.caption}

```html
<custom-style>
  <style is="custom-style">
    /* In a 2.x custom-style use the html selector to set global defaults */
    html {
      --my-theme-color: #9C27B0;
    }
  </style>
</custom-style>
```

After (2.x-only code) {.caption}

```html
<custom-style>
  <style>
    html {
      --my-theme-color: #9C27B0;
    }
  </style>
</custom-style>
```

## DOM APIs {#polymer-dom-apis}

**Hybrid elements** must continue to use existing Polymer DOM APIs, but may require some
changes. **Class-based elements** should use native DOM APIs.

If your element doesn't do any imperative DOM manipulation, you can skip this section.

*   ***Hybrid elements*** should continue to use the Polymer DOM APIs, but may require some changes.
*   ***Legacy elements*** can use the Polymer DOM APIs or the native DOM APIs.
*   ***Class-based elements*** should use native DOM APIs.


#### Hybrid elements: update Polymer.dom usage {#hybrid-elements-update-polymer-dom-usage}

**Hybrid elements** need to keep using the `Polymer.dom` API. However, note that in 2.0, for native
methods and properties that return a `NodeList,` **<code>Polymer.dom</code> APIs also return
<code>NodeList</code>, not <code>Array</code>.** If you're using any native
<code>Array</code> methods  on the returned object, you need to update your code.

**Legacy elements** may continue using Polymer DOM APIs or move to native methods as described in
[Use native DOM methods](#class-based-and-legacy-elements-use-native-dom-methods)


Before {.caption}


```js
_findTextNodes: function() {
  // childNodes is an Array
  var nodes = Polymer.dom(this).childNodes;
  return nodes.filter(function(n) { return n.nodeType = Node.TEXT_NODE });
}
```

After {.caption}

```js
_findTextNodes: function() {
  // childNodes *might* be a NodeList
  var nodes = Polymer.dom(this).childNodes;
  return Array.prototype.filter.call(nodes,
      function(n) { return n.nodeType = Node.TEXT_NODE });
}
```

#### Class-based and legacy elements: use native DOM methods {#class-based-and-legacy-elements-use-native-dom-methods}

**Class-based elements** should use the native DOM APIs instead of the `Polymer.dom` APIs.
**Legacy elements** can optionally use the native APIs.


*   For standard DOM operations, remove the `Polymer.dom()` wrapper.
*   Use `this.shadowRoot` in place of `Polymer.dom(this.root)`.
*   For events, use the standard v1 event API:
    *   `Polymer.dom(event).localTarget` becomes `event.target.`
    *   `Polymer.dom(event).path` becomes `event.composedPath().`
    *   `Polymer.dom(event).rootTarget` becomes `event.composedPath()[0].`

On browsers that lack native shadow DOM v1 support, Polymer 2.0 is designed to be used with the new
[shady DOM v1 polyfill](https://github.com/webcomponents/shadydom), which patches native DOM API as
necessary to be mostly equivalent to native shadow DOM.

Note that the new ES6 base class, `Polymer.Element`, lacks many of the DOM helpers, such as
`getContentChildren` and `getEffectiveChildren`, defined on `Polymer.Base`. Polymer encourages the
use of native properties and methods where possible. See [Slot APIs](devguide/shadow-dom#slot-apis) for information on
some of the new shadow DOM-related APIs.

The `Polymer.FlattenedNodesObserver` class can be used to replace the 1.x `observeNodes` method.

1.x {.caption}

```js
this._observer = Polymer.dom(nodeToObserve).observeNodes(this._nodesChanged);
```

2.x {.caption}

```js
this._observer = new Polymer.FlattenedNodesObserver(nodeToObserve, this._nodesChanged);
```

In addition, `Polymer.FlattenedNodesObserver.getFlattenedNodes(node)` can be used to replace the
`getEffectiveChildNodes` method.

To replace the `getEffectiveChildren` method, use the `getFlattenedNodes` helper method, and filter down to just the elements (ignore comments and text nodes):

1.x {.caption}

```js
var effectiveChildren = this.getEffectiveChildren();
```

2.x {.caption}

```js
let effectiveChildren =
  Polymer.FlattenedNodesObserver.getFlattenedNodes(this).filter(n => n.nodeType === Node.ELEMENT_NODE)
```

To replace the `getContentChildren` method, write platform code to perform this functionality (get the `assignedNodes`, and filter down to just the elements, ignoring comments and text nodes):

1.x {.caption}

```
this.getContentChildren();
```

2.x {.caption}

```js
this.shadowRoot
  // If you have more than one slot, you can use a
  // different selector to identify the slot you're interested in.
  .querySelector('slot')
  .assignedNodes({flatten:true})
  .filter(n => n.nodeType === Node.ELEMENT_NODE)
```

`Polymer.FlattenedNodesObserver` is an optional module. If you're loading the `polymer-element.html`
import, you need to import `FlattenedNodesObserver` separately.

```html
<link rel="import" href="/bower_components/polymer/lib/utils/flattened-nodes-observer.html">
```



## CSS custom property shim {#css-custom-property-shim}

Polymer 2.0 continues to use a shim to provide limited support for CSS custom properties on browsers
that do not yet natively support custom properties (currently only Microsoft Edge and IE). This lets
an element expose a custom styling API. The shim is now included as part of the shady CSS polyfill,
not in the Polymer library itself.

**For class-based elements**, support for custom CSS mixins has been moved to a second, optional
shim.

The following changes have been made in the shims that Polymer 2.0 uses:

*   The shim always uses native CSS custom properties on browsers that support them. This was
    optional in 1.x, and it introduces some limitations on the use of mixins.
*   CSS mixin support has been separated into an optional shim.
*   The `customStyle` instance property has been removed. Use `updateStyles` instead.
*   Invalid custom properties syntax is no longer supported. These changes are described in
    [Shadow DOM styles](#shadow-dom-styles).

### Class-based elements: import the CSS mixin shim

If you are using **class-based elements** and you are using **CSS mixins**, import the CSS mixin
shim.

CSS custom properties are becoming widely supported, CSS mixins remain a proposal. So support for
CSS mixins has been moved to a separate shim that is optional for 2.0 class-style elements. For
backwards compatibility, the `polymer.html` import includes the CSS mixin shim. Class-style elements
must explicitly import the mixin shim.

The shim performs a one-time transformation of stylesheets  containing CSS custom property mixins.
Where possible, mixins are transformed into individual  native CSS properties for better performance.

This introduces some limitations to be aware of, which are documented in the
[shady CSS polyfill README](https://github.com/webcomponents/shadycss#custom-properties-and-apply).

The following examples show how to load the CSS mixin shim.

Example: importing CSS mixin shim to top-level file {.caption}

```
<!-- load polyfills -->
<script src="/bower_components/webcomponentsjs/webcomponents-lite.js"></script>
<!-- import CSS mixin shim -->
<link rel="import" href="/bower_components/shadycss/apply-shim.html">
<!-- import custom-style -->
<link rel="import" href="/bower_components/polymer/lib/elements/custom-style.html">

<custom-style>
  <style>
    html {
      --my-mixin: {
        color: blue;
      };
    }
  </style>
</custom-style>
```

Example: importing CSS mixin shim to an element {.caption}

```
<!-- import CSS mixin shim -->
<link rel="import" href="../shadycss/apply-shim.html">
<!-- import Polymer.Element -->
<link rel="import" href="../polymer/polymer-element.html">

<dom-module id="x-custom">
  <template>
    <style>
      :host {
        @apply --my-mixin;
      }
    </style>
  </template>
  <script>
    class XCustom extends Polymer.Element {
      static get is() {return 'x-custom'}
    }

    customElements.define(XCustom.is, XCustom);
  </script>
</dom-module>
```

### All elements: Use updateStyles instead of customStyle {#use-updatestyles-instead-of-customstyle}

**All elements**. Instead of using the `customStyle` object, pass new style properties to the `updateStyles` method.
This use of `updateStyles` was already supported in 1.x. The `customStyle` object is removed in 2.0.

Before {.caption}

```js
this.customStyle['--my-dynamic-property'] = 'red';
this.updateStyles();
```

After {.caption}


```js
this.updateStyles({'--my-dynamic-property': 'red'});
```

To handle cases in which `getComputedStyleValue` was previously used, use the custom ShadyCSS API when the polyfill is loaded:

Before {.caption}

```
style = this.getComputedStyleValue('--something');
```

After {.caption}

```
if (window.ShadyCSS) {
  style = ShadyCSS.getComputedStyleValue(el, '--something');
} else {
  style = getComputedStyle(el).getPropertyValue('--something');
}
```

## Custom elements APIs {#custom-elements-apis}

Polymer 2.0 elements target the custom elements v1 API.


*   **All elements.** The contracts have changed for several of the lifecycle callbacks. Check and
    test your code to make sure this doesn't cause problems with your elements.
*   **All elements.** Refactor type-extension elements as wrapper elements. Wrap existing
    type-extension elements.

### Callback contracts have changed {#callback-contracts-have-changed}

Polymer 2.0 introduces several changes to the contracts of the various lifecycle callbacks. Some of
these are required by the custom elements v1 specification, while others are designed to improve
performance.

For more information on the lifecycle callbacks, see [Lifecycle changes](about_20#lifecycle-changes).

#### Creation time (created/constructor) {#creation-time-created-constructor}

The custom elements v1 specification forbids reading attributes, and accessing child or parent
information from the DOM API from the constructor. Likewise, attributes and children cannot be added.
You need to move any DOM work out the constructor:

*   Defer work until after the constructor completes using `setTimeout` or `requestAnimationFrame`.
*   Move work to a different callback,such as `attached`/`connectedCallback` or `ready`.
*   Use an observer, `slotchange` event listener, or mutation observer to react to runtime changes.

#### Ready time {#ready-time}

The `ready` callback, for one-time initialization, signals the creation of the element's shadow DOM.
In the case of class-based elements, you need to call `super.ready()` before accessing the shadow
tree.

The major difference between 1.x and 2.0 has to do with the timing of initial light DOM distribution.
In the v1 shady DOM polyfill, initial distribution of children into `<slot>` is asynchronous
(microtask) to creating the `shadowRoot`, meaning distribution occurs after observers are run and
`ready`  is called. In the Polymer 1.0 shim, initial distribution occurred before `ready`.

To check the initial distribution, use `setTimeout` or `requestAnimationFrame` from `ready`. The
callback should fire after initial distribution is complete.

Class-based element: check distributed nodes {.caption}

```js
ready() {
  super.ready();
  setTimeout(function() {
    var distributedNodes = this.$.slot.assignedNodes({flatten: true});
    console.log(distributedNodes);
  }.bind(this), 0);
}
```

You can use a `slotchange` event listener to react to runtime changes to distribution, but the event
listener doesn't fire for the *initial* distribution.

Class-based element: slotchange listener {.caption}

```
ready() {
  super.ready(); // for 2.0 class-based elements only
  this._boundHandler = this._processLightChildren.bind(this);
  setTimeout(this._boundHandler);
  this.$.slot.addEventListener('slotchange', this._boundHandler);
}

_processLightChildren: function() {
  console.log(this.$.slot.assignedNodes());
}
```

In order to force distribution synchronously, call `ShadyDOM.flush()`. This can be useful for unit
tests.

The hybrid or legacy equivalents of the above samples would use the 1.x APIs, like
`getContentChildNodes` or `observeNodes`.

Hybrid element: get distributed nodes {.caption}

 ```js
ready: function() {
  setTimeout(function() {
    var distributedNodes = this.getContentChildNodes();
    console.log(distributedNodes);
  }.bind(this), 0);
}
```

You can use `observeNodes` method to react to runtime changes to distribution.

Hybrid element: observeNodes {.caption}

```js
ready: function() {
  this._observer = Polymer.dom(this.$.contentNode).observeNodes(function(info) {
      this.processNewNodes(info.addedNodes);
      this.processRemovedNodes(info.removedNodes);
  });
}
```

For more details on `observeNodes`, see
[Observe added and removed children](../../1.0/docs/devguide/local-dom#observe-nodes) in the Polymer 1
documentation.

In order to force distribution synchronously, call `Polymer.dom.flush`. This can be useful for
unit tests.

In 2.x, `Polymer.dom.flush` does not flush the `observeNodes` callbacks. To force the `observeNodes`
callbacks to be invoked, call the `flush` method on the observer object returned from `observeNodes`.


 #### Attach time (attached/connectedCallback) {#attach-time-attached-connectedcallback}

If you have any code that relies on the element being layed out when the `attached` callback runs
(for example, measuring the element or its children), it must wait until the layout is complete.

Use the `Polymer.RenderStatus.beforeNextRender` function to register a one-time callback after
layout is complete, but before the page is rendered (or "painted").

Before {.caption}

```js
attached: function() {
  // measure something
}
```

After {.caption}

```js
attached: function() {
  // 1st argument to beforeNextRender is used as the "this"
  // value when the callback is invoked.
  Polymer.RenderStatus.beforeNextRender(this, function() {
     // measure something
  });
}
```

For work that can be deferred until after first paint (such as adding event listeners), you can use
`Polymer.RenderStatus.afterNextRender`, which takes the same arguments as `beforeNextRender`.

These examples show the hybrid callbacks, but the `Polymer.RenderStatus` API can be used in
class-based elements as well. If you're loading the `polymer-element.html`
import, you need to import `Polymer.RenderStatus` separately.

```html
<link rel="import" href="/bower_components/polymer/lib/utils/render-status.html">
```

### Remove type-extension elements {#remove-type-extension-elements}

Polymer doesn't support type-extension elements (such as `<input is="iron-input">`). For a discussion
of this change, see [Type-extension elements](about_20#type-extension)

*   **All projects.** Refactor your own type-extension elements.
*   **All projects.** Replace any top-level template extension elements with the 2.0 wrapper
    equivalents.

#### Refactor type-extension elements {#refactor-type-extension-elements}

Type extension elements need to be refactored into standard custom elements (for example, instead of
an element that extends an `<a>` element, an element that takes an `<a>` element in its light DOM).

#### Convert template extension elements at the document level {#convert-template-extension-elements-at-the-document-level}


If you have any template extension elements—`dom-bind`, `dom-if`, or `dom-repeat`—*in the main
document*, convert them to the wrapped form.

Before {.caption}

```
<template is="dom-bind">
  <ul>
  <template is="dom-repeat" items="{{people}}">
    <li>{{item.name}}
  </template>
  </ul>
</template>
<script>
var domBind = document.querySelector('template[is=dom-bind]');
domBind.people = [
 ...
];
</script>
```


After {.caption}


```
<dom-bind>
  <!-- Hybrid code must keep the is="dom-bind" for backwards
       compatibility. For 2.0-only projects, use a plain template. -->
  <template is="dom-bind">
    <ul>
    <!-- inner template doesn't need to be wrapped -->
    <template is="dom-repeat" items="{{people}}">
      <li>{{item.name}}
    </template>
    </ul>
  </template>
</dom-bind>
<script>
var domBind = document.querySelector('dom-bind');
domBind.people = [
 ...
];
</script>
```

Polymer automatically wraps template extensions used in Polymer element templates during template
processing. This means you can and should continue using `<template is="">` in templates nested
inside a Polymer element template. As shown above, nested templates inside a top-level `dom-bind`,
`dom-if`, or `dom-repeat` are also automatically wrapped.


**Templates used in the main document must be manually wrapped.**


## Data system {#data-system}

Polymer 2.0 includes several important changes to the data system, detailed in
[Data system improvements](about_20#data-system).

### Remove key paths and Polymer.Collection {#remove-key-paths-and-polymer-collection}

Code that interacts with key paths, or uses `Polymer.Collection` directly won't run in hybrid mode.
If upgrading to hybrid mode, you can conditionalize 1.0 code:


```
if (Polymer.Element) {
  // 2.0 code
} else {
  // 1.0 code
}
```


If upgrading to legacy or class-based elements, you can eliminate this code. Array change
notifications for specific items use index paths. Changing the entire array results in a change
notification for the entire array.

### Update observers {#update-observers}

Observers need to check for `undefined` arguments, which was not an issue in 1.x. If all of your
observer's dependencies have default values, the observer should not be called with `undefined`
arguments. But if your code relies on the observer to wait until all dependencies are defined, you
need to add `undefined` checks.

If your observer relies on hidden dependencies being initialized, you may need to update your code.

Before {.caption}


```js
observers: [ '_observeStuff(a, b)' ],
_observeStuff: function(a, b) {
  // this.c == hidden dependency!
  var v = a * b + this.c;
  ...
}
```

After {.caption}


```js
observers: [ '_observeStuff(a, b, c)' ],
_observeStuff: function(a, b, c) {
  // check for undefined
  if (! (a === undefined || b === undefined || c === undefined)) {
    // no hidden dependency
    var v = a * b + c;
    ...
  } else {
    // handle undefined case.
  }
}
```

### Custom property serialization and deserialization

If your element overrides the `serialize` or `deserialize` methods, these override points have been
renamed to `_serializeValue` and `_deserializeValue`, respectively.

### Data system miscellany {#data-system-miscellany}

A few more changes that you may need to take into account.

Only properties listed explicitly in `properties` can be configured from an attribute. You need to
explicitly declare your property if both of the following are true:

*   You have a property that's declared *implicitly* (used in a binding or observer, but not in the
    `properties` object).
*   You rely on configuring that property from an attribute (not a data binding).

Because several aspects of timing change in 2.0, you'll need to test your code to ensure that it
doesn't rely on any 1.x timing. In particular:

*   Element initialization (including template stamping and data system initialization) is deferred
    until the the element is connected to the main document. (This is a result of the custom element
    v1 changes.)

In order for a property to be deserialized from its attribute, it must be declared in the
`properties` metadata object

Binding a default value of `false` using an *attribute binding* to a boolean property will not
override a default `true` property of the target, due to the semantics of boolean attributes.
In general, property binding should always be used when possible, and will avoid such situations.


## Removed APIs {#removed-apis}

The following APIs have been removed.

*   `Polymer.instanceof` and `Polymer.isInstance`: no longer needed, use `instanceof` and
    `instanceof Polymer.Element`  instead.


*   `element.getPropertyInfo`: This API returned unexpected information some of the time and was
    rarely used.

*   `element.getNativePrototype`: Removed because it is no longer needed for internal code and was
    unused by users.

*   `element.beforeRegister`: This was originally added for metadata compatibility with ES6 classes.
    We now prefer users create ES6 classes by extending `Polymer.Element`, specifying metadata in
    the static `properties` and `observers` properties.

    For legacy elements, dynamic effects may now be added using the `registered` lifecycle method.

*   `element.attributeFollows`: Removed due to disuse.

*   `element.classFollows`: Removed due to disuse.

*   `listeners` Removed ability to use `id.event` to add listeners to elements in shadow DOM. Use
    declarative template event handlers instead.

*    Methods starting with `_` are not guaranteed to exist (most have been removed).

## Upgrading to class-based elements {#upgrading-to-class-based-elements}

To define a class-based element, create a class that extends `Polymer.Element` (a subclass of
`HTMLElement`), which provides most of the same features of Polymer 1.x based on static
configuration data supplied on the class definition.

The basic syntax looks like this:

```html
<!-- Load the Polymer.Element base class -->
<link rel="import" href="bower_components/polymer/polymer-element.html">

<script>
// Extend Polymer.Element base class
class MyElement extends Polymer.Element {

  static get is() { return 'my-element'; }

  static get properties() {
    return {
      /* properties meta data object just like 1.x */
      myProp: {
        type: Object,
        notifies: true
      }
    }
  }

  static get observers() {
    return [
      /* observer array just like 1.x */
      '_myPropChanged(myProp.*)'
    ]
  }

  constructor() {
    super();
    ...
  }

  connectedCallback() {
    super.connectedCallback();
    ...
  }

  _myPropChanged(changeRecord) {
    ...
  }
  ...
}

// Register custom element definition using standard platform API
customElements.define(MyElement.is, MyElement);
</script>
```

**Class-based elements are 2.0 only.** These elements are not backward compatible
with 1.x.
{.alert .alert-info}

Below are the general steps for defining a custom element using this new syntax:

*   Extend from `Polymer.Element`. This class provides the minimal surface area to integrate with
    2.0 DOM templating and data binding system. It provides the standard custom element lifecycle
    callbacks, plus the Polymer-specific `ready` callback.

*   Implement "behaviors" as [mixins that return class expressions](#mixins). Or use the the
    `mixinBehaviors` method to mix hybrid behaviors into your element.

*   Element's `is` property should be defined as a static on the class.

*   The `listeners` and `hostAttributes` have been removed from element metadata; listeners and
    default attributes can be installed as and when needed. For convenience _`ensureAttribute` is
    available to set default attributes.

    ```js
    // set tabindex if it's not already set
    this._ensureAttribute('tabindex', 0);
    ```

    Note that attributes can't be manipulated in the constructor.

### Common utility APIs

`Polymer.Element` provides a cleaner base class without much of the sugared utility API
that present on legacy elements, such as `fire`, `transform`, and so on. With web platform surface
area becoming far more stable across browsers, we intend to add fewer utility methods and embrace
the raw platform API more.  This section describes replacements for some of the more common APIs.

In addition, many features are still included in the library, but as optional modules or mixins
rather than being bundled in with `Polymer.Element`. For details, see
[Import optional features](#optional-features).



#### async

In many cases you can use the native platform features (such as `setTimeout` or
`requestAnimationFrame` instead of the `async` call. Polymer 2.x also provides an optional
[`Polymer.Async`](/{{{polymer_version_dir}}}/docs/api/namespaces/Polymer.Async) module that provides
a set of Async APIs with a common interface. This is particularly useful for microtask timing, which
is harder to time consistently across browsers.


Before using `Polymer.Async`, you must import it:

```
<!-- import async module -->
<link rel="import" href="/bower_components/polymer/lib/utils/async.html">
```

With one arguments, the legacy `async` method produced microtask timing:

```
this.async(someMethod);
```

The equivalent method with `Polymer.Async` looks like this:

```
// in JS, execute someMethod with microtask timing
Polymer.Async.microTask.run(() => this.someMethod());
```

If using `async` with a timeout:

```
this.async(someMethod, 500);
```

The native `setTimeout` works fine:

```js
setTimeout(() => this.someMethod(), 500);
```

#### debounce

The legacy `debounce` method isn't available on `Polymer.Element`. In many cases, you can trivially
implement a debounced method that does what you want.

You can also use the `Polymer.Debouncer` class.


```html
<!-- import debounce module -->
<link rel="import" href="/bower_components/polymer/lib/utils/debounce.html">
```

```js
this._debouncer = Polymer.Debouncer.debounce(this._debouncer,
    Polymer.Async.timeOut.after(250),
    () => { this.doSomething() });
```

#### fire

Instead of using the legacy
`this.fire('some-event')` API, use the equivalent platform APIs:


```js
this.dispatchEvent(new CustomEvent('some-event', { bubbles: true, composed: true }));
```

The `fire` method sets the `bubbles` and `composed` properties by default. For more on using custom
events, see [Fire custom events](/{{{polymer_version_dir}}}/docs/devguide/events#custom-events).

(The `CustomEvent` constructor is not supported on IE, but the webcomponents polyfills include a
small polyfill for it so you can use the same syntax everywhere.)

#### importHref

The `importHref` instance method is replaced by the static `Polymer.importHref` function. The only
difference from the instance method is that the load and error callbacks don't have the `this`
value bound to the element. You can work around this by using arrow functions:

```js
Polymer.importHref(this.resolveUrl('some-other-file.html'),
    () => this.onLoad(loadEvent),
    () => this.onError(errorEvent),
    true /* true for async */);
```

#### $$

The `$$` method isn't available. Use `this.shadowRoot.querySelector` instead.

#### Using the legacy APIs

If you want to upgrade to a class-based element but depend on some of the removed APIs, you can
add most of the legacy APIs by using the `LegacyElementMixin`.

```js
class MyLegacyElement extends Polymer.LegacyElementMixin(Polymer.Element) { ... }
```

### Class mixins and behaviors {#mixins}

A class expression mixin is essentially a factory function that takes a class as an argument and
returns a new class, with new features "mixed in." Polymer 2.x provides a number of features as
optional mixins instead of building them into the base class.

Apply mixins when you create an element class:

```js
class MyElement extends MyMixin(Polymer.Element) {
  static get is() { return 'my-element' }
}
```

The `MyMixin(Polymer.Element)` returns a new class, which extends `Polymer.Element` and adds the
features from `MyMixin`. So `MyElement`'s inheritance is:

`MyElement => MyMixin(Polymer.Element) => Polymer.Element`

For information on writing your own class expression mixins, see
[Sharing code with class expression mixins](devguide/custom-elements#mixins)


#### Using hybrid behaviors with class-style elements

In some cases, the features you want to use may be available as hybrid behaviors, but not as
class mixins.

You can add hybrid behaviors to your class-style element using the `Polymer.mixinBehavior` function:

```js
class XClass extends Polymer.mixinBehaviors([MyBehavior, MyBehavior2], Polymer.Element) {
  static get is() { return 'x-class'}

  ...
}
customElements.define(XClass.is, XClass);
```

The `mixinBehavior` function also mixes in the Legacy APIs, the same as if you extended
`Polymer.LegacyElement`. These APIs are required since since hybrid behaviors depend on them.

### Import optional features {#optional-features}

A number of features have been omitted from the base `Polymer.Element` class and packaged as
separate, optional imports. These include:

-   [Gesture support](devguide/gesture-events).
-   [`<array-selector>` element](devguide/templates#array-selector)
-   [`<custom-style>` element](devguide/style-shadow-dom#custom-style)
-   [`<dom-bind>` element](devguide/templates#dom-bind)
-   [`<dom-if>` element](devguide/templates#dom-if)
-   [`<dom-repeat>` element](devguide/templates#dom-repeat)
-   [`Polymer.RenderStatus`](/{{{polymer_version_dir}}}/docs/api/namespaces/Polymer.RenderStatus)
    module.

Element imports are found in the Polymer folder under `/lib/elements`, mixins under `/lib/mixins`,
and utility modules under `/lib/utils`. For example, to load the `Polymer.RenderStatus` module,
use an import like this:

```html
<link rel="import" href="/bower_components/polymer/lib/utils/render-status.html">
```





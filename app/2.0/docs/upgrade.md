---
title: Polymer 2.0 upgrade guide
---

<!-- toc -->


Polymer 2.0 includes a number of breaking changes. However, the Polymer team has worked to provide an incremental path for updating Polymer 1.x elements to 2.0.

Polymer 2.0 supports several types of elements:



*   2.0 class-based elements use the ES6 class-based syntax supported by the custom elements v1 specification. Recommended for new development in Polymer 2.0.
*   2.0 legacy elements use the `Polymer` factory method, and have most of the 1.0 API available to them.
*   2.0 hybrid elements are elements defined using the legacy `Polymer` factory method, with extra code for backwards compatibility with 1.x. They can run on Polymer 1.7+ as well as Polymer 2.0.

When porting a large project, you can update to Polymer 1.7 and upgrade elements to 2.0 hybrid style one at a time. After all of the elements have been upgraded, you can test your project against Polymer 2.0.

The Polymer team plans to release a Polymer Upgrade tool to automatically perform a number of the changes required to upgrade 1.x elements to either hybrid or class-based style. The remaining changes require either manual code changes, testing, or both to ensure that your element operates the same in 2.0 as it did in 1.x.

See [Install Polymer 2.0](about_20#installing) for installation instructions.

This upgrade guide is a work in progress. Please [report issues on GitHub](https://github.com/Polymer/docs/issues/new).

## Shadow DOM changes {#shadow-dom-changes}

Polymer 2.0 elements create shadow DOM v1 shadow trees.  As such, user code related to scoped styling, distribution, and events must be adapted to the native v1 API.



*   ***All elements*** need to update their shadow DOM template and styling as described in [DOM template](#dom-template) and [Shadow DOM styles](#shadow-dom-styles).
*   ***Hybrid elements*** should continue to use the Polymer.dom APIs, but may require some changes.
*   ***Class-based elements*** don't need to use the Polymer.dom APIs for manipulating DOM or referring to events.

### DOM Template {#dom-template}

***All elements*** need to update their shadow DOM template and styling as described in this section.

Quick summary:



*   Remove deprecated patterns in the DOM module (`<dom-module>` using `is` or `name`; styles outside of the template).
*   Update your element's DOM template to use the new `<slot>` element instead of `<content>`.
*   Update styles to use the `::slotted()` selector  in place of ::content.
*   Remove any `/deep/` and `::shadow` CSS rules.

These changes are detailed in the following sections.

#### Remove deprecated patterns in DOM module {#remove-deprecated-patterns-in-dom-module}

Your `<dom-module>` **must set** the `id` property to specify the element name. Polymer 1.x accepted the deprecated  `is` or `name` as alternatives.

Make sure your element's styles are defined *inside the template*. Defining styles outside the template was deprecated in Polymer 1.x and is no longer supported.

Before {.caption}


```
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


```
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


Note that if you're using `<content select="...">` anywhere in your code, ***this means a change to your element's contract***, and everyone using your element will need to update to use slot names.

**Limitation.** Slots can only be selected explicitly, by *slot name*. It's impossible to select content implicitly, based on a tag name or an arbitrary selector like `:not(.header)`.
{.alert .alert-info}

Can't be upgraded automatically {.caption}


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


**Default slot versus default insertion point.**  In v0, a default insertion point (one without a `select` attribute) consumes all nodes **not matched by a previous insertion point**.  In v1, a default slot (one without a `name` attribute) **only matches content with no slot attribute**. In other words, **a node with a slot attribute is never distributed to the default slot**.
{.alert .alert-info}


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

Multilevel distribution works differently in shadow DOM v1. In v0, content was redistributed at each level. For example, an element with `class="title"` can be distributed through several insertion points and eventually selected by a `<content select=".title">`.

Document content {.caption}

```
<!-- v0 redistribution example -->
<parent-el>
  <span class="title">My Title</span>
</parent-el>
```


Shadow DOM of <`parent-el>` {.caption}


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


By contrast, in v1, a host's light DOM nodes are only *assigned* to slots in the host's shadow DOM, based on the `slot` attributes on those light DOM nodes. For a parent element to redistribute content to a named slot, it must use a slot with a `slot` attribute.


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


Using the v0 approach does not work in v1:


```
<!-- v1 redistribution example -->
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


### Shadow DOM styles {#shadow-dom-styles}

Update styles in your shadow DOM to match v1 specifications:



*   Replace `::content` selectors with `::slotted()` selectors.
*   Remove `/deep/` and `::shadow` selectors, if you're still using them.
*   Remove `:root` selectors.
*   Update custom property syntax.
*   Wrap `custom-style` elements.

#### Replace content selectors

Replace any `::content` CSS selectors with <code>::slotted(<em>selector</em>)</code>  where <code><em>selector</em></code> is [compound selector](https://drafts.csswg.org/selectors-4/#compound) that identifies a <strong>top-level distributed child</strong>.

That is:

`::slotted(.foo)`

is equivalent to:


```
::content > .foo
```


**For example**:


```
<dom-module id="slotted-el">
  <template>
    <style>
      #container ::slotted(*) {
        color: #blue;
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

In shadow DOM v1, **you cannot select a descendant of a top-level distributed child**. For example, you can't select the span in the previous example like this:

`#container ::slotted(*) span { ... }`

No selectors can follow the  `::slotted()` selector.

For more information, see [Styling distributed nodes](https://developers.google.com/web/fundamentals/getting-started/primers/shadowdom#stylinglightdom) in the Web Fundamentals article on shadow DOM.

#### Remove deep and shadow selectors

If you still have any `/deep/` or `::shadow` selectors in your project, it's time to remove them. They don't work at all in shadow DOM v1.

There's no direct substitute for shadow-piercing selectors.To let users customize your element, custom CSS properties and mixins are probably the best option.

#### Replace root selectors {#replace-root-selectors}

If you're using the `:root` selector inside an element's template, replace it with:


```css
:host > * { ... }
```


(If you're using `:root` selection inside a `custom-style`, replace it with the `html` selector.)

In 1.x, you can use either of these selectors to override custom properties set at a higher level. For example, the following rule in the main document:


```css
style-me {
  --my-theme-color: blue;
}
```


Overrides a `:host` rule in `style-me`'s shadow root, because they match the same element, but the main document styles comes earlier in the cascade order. `:host > *` applies a ruleset to all of the top-level children in the host's shadow tree, which doesn't conflict with the rule in the main document.

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

When applying custom properties, Polymer 1.x accepted this incorrect syntax for specifying a default value to a `var()` function:

Before {.caption}


```css
color: var(--special-color,--default-color);
```


By specification, the default (or fallback) is a CSS value, not a custom property name. To use a custom property as a default, add a nested `var()` function.

After {.caption}

```css
color: var(--special-color, var(--default-color));
```


In addition, you must update the syntax of any `@apply` rules to match the proposal, which doesn't use parentheses.

Before {.caption}


```css
@apply(--my-mixin);
```


After {.caption}


```css
@apply --my-mixin;
```


#### Wrap custom-style elements {#wrap-custom-style-elements}

While custom elements v1 supports customized built-in elements, Polymer 2.0 does not currently use them. Instead, it introduces a new `<custom-style>` element that wraps a `<style>` element.



*   **Hybrid projects.** Wrap your existing `<style is="custom-style">` elements with `<custom-style>` elements.
*   **2.0-only projects.** Replace your existing  `<style is="custom-style">` elements with `<custom-style>` elements.
*   **All projects.** Replace any `:root` selectors with `html`, and update custom property syntax as described in [Replace root selectors](#replace-root-selectors) and [Update custom property syntax](#update-custom-property-syntax).

Before {.caption}


```html
<style is="custom-style>
  :root {
    --my-theme-color: #9C27B0;
  }
</style>
```


**After (hybrid element):**


```html
<custom-style>
  <style is="custom-style>
    html {
      --my-theme-color: #9C27B0;
    }
  </style>
</custom-style>
```


**After (class-based element):**


```html
<custom-style>
  <style>
    html {
      --my-theme-color: #9C27B0;
    }
  </style>
</custom-style>
```


### Polymer DOM APIs {#polymer-dom-apis}

Hybrid and legacy elements can continue to use existing DOM APIs, but may require some changes. Class-based elements should use native DOM APIs.

#### Hybrid elements: update Polymer.dom usage {#hybrid-elements-update-polymer-dom-usage}

Hybrid elements need to keep using the `Polymer.dom` API. However, note that in 2.0, for native methods and properties that return a `NodeList,` **<code>Polymer.dom</code> APIs also return <code>NodeList</code>, not <code>Array</code>.</strong> If you're using any native <code>Array</code> methods  on the returned object, you need to update your code.

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

**If you are targeting 2.0 only**, use the native DOM APIs instead of the Polymer.dom APIs.



*   For standard DOM operations, simply remove the `Polymer.dom()` wrapper.
*   Use `this.shadowRoot` in place of `Polymer.dom(this.root)`.
*   For events, use the standard v1 event API:
    *   `Polymer.dom(event).localTarget` becomes `event.target.`
    *   `Polymer.dom(event).path` becomes `event.composedPath().`
    *   `Polymer.dom(event).rootTarget` becomes `event.composedPath()[0].`

On browsers that lack native shadow DOM v1 support, Polymer 2.0 is designed to be used with the new [shady DOM v1 polyfill](https://github.com/webcomponents/shadydom), which patches native DOM API as necessary to be mostly equivalent to native shadow DOM.

Note that the new ES6 base class, `Polymer.Element`, lacks many of the DOM helpers, such as `getContentChildren` and `getEffectiveChildren`, defined on `Polymer.Base`. Polymer encourages the use of native properties and methods where possible.

## CSS Custom Property Shim {#css-custom-property-shim}

Polymer 2.0 continues to use a shim to provide limited support for CSS custom properties on browsers that do not yet natively support custom properties. This lets an element expose a custom styling API. The shim is now included as part of the shady CSS polyfill, not in the Polymer library itself.

The following changes have been made in the shim that Polymer 2.0 uses:



*   The shim always uses native CSS custom properties on browsers that support them. This was optional in 1.x, and it introduces some limitations on the use of mixins.
*   The `customStyle` instance property has been removed. Use `updateStyles` instead.
*   Change any code that imperatively creates `custom-style` elements.
*   Invalid custom properties syntax is no longer supported. These changes are described in [Shadow DOM styles](#shadow-dom-styles).

### Native custom properties {#native-custom-properties}

The shim now always uses native CSS Custom Properties by default on browsers that implement them (this was opt-in in Polymer 1.x).  The shim performs a one-time transformation of stylesheets containing CSS custom property mixins. Where possible, mixins are transformed into individual native CSS properties for better performance.



This introduces some limitations to be aware of, which are documented in the [shady CSS polyfill README](https://github.com/webcomponents/shadycss#custom-properties-and-apply).

### Use updateStyles instead of customStyle {#use-updatestyles-instead-of-customstyle}

Instead of using the `customStyle` object, pass new style properties to the `updateStyles` method. This use of `updateStyles` was already supported in 1.x. The `customStyle` object is removed in 2.0.

Before {.caption}


```
this.customStyle['--my-dynamic-property'] = 'red';
this.updateStyles();
```


After {.caption}


```
this.updateStyles({'--my-dynamic-property': 'red'});
```


### Dynamic custom-style elements {#dynamic-custom-style-elements}

For performance reasons, the custom properties shim no longer supports creating `custom-style` elements dynamically. Any code you have that relies on this needs to be reworked to use other mechanisms (such as `updateStyles`).

## Custom elements APIs {#custom-elements-apis}

Polymer 2.0 elements target the custom elements v1 API.



*   **All elements.** The contracts have changed for several of the lifecycle callbacks. Check and test your code to make sure this doesn't cause problems with your elements.
*   **All elements.** Refactor type-extension elements as wrapper elements. Wrap existing type-extension elements.

### Callback contracts have changed {#callback-contracts-have-changed}

Polymer 2.0 introduces several changes to the contracts of the various lifecycle callbacks. Some of these are required by the custom elements v1 specification, while others are designed to improve performance.

For more information on the lifecycle callbacks, see [Lifecycle changes](about_20#lifecycle-changes).

#### Creation time (created/constructor) {#creation-time-created-constructor}

The custom elements v1 specification forbids reading attributes, and accessing child or parent
information from the DOM API from the constructor. Likewise, attributes and children cannot be added.
You need to move any DOM work out the constructor:

*   Defer work until after the constructor completes using `setTimeout` or `requestAnimationFrame`.
*   Move work to a different callback,such as `attached`/`connectedCallback` or `ready`.
*   Use an observer, `slotchange` event listener, or mutation observer to react to runtime changes.

#### Attach time (attached/connectedCallback) {#attach-time-attached-connectedcallback}

If you have any code that relies on the element being rendered when the `attached` callback runs
(for example, measuring the element or its children), it must wait until the element has rendered.

Use the `Polymer.RenderStatus.afterNextRender` function to register a one-time callback after the
next render.

Before {.caption}

```js
attached: function() {
  // measure something
}
```

After {.caption}

```
attached: function() {
  Polymer.RenderStatus.afterNextRender(function() {
     // measure something
  }.bind(this))
}
```

Deferring work until after the constructor completes using `setTimeout` or `requestAnimationFrame`.


#### Ready time {#ready-time}

The `ready` callback, for one-time initialization, signals the creation of the element's shadow DOM. In the case of class-based elements, you need to call `super.ready()` before accessing the shadow tree.

The major difference between 1.x and 2.0 has to do with the timing of initial light DOM distribution. In the v1 shady DOM polyfill, initial distribution of children into `<slot>` is asynchronous (microtask) to creating the `shadowRoot`, meaning distribution occurs after observers are run and `ready`  is called. In the Polymer 1.0 shim, initial distribution occurred before `ready`.

To check the initial distribution, use `setTimeout` or `requestAnimationFrame` from `ready`. The callback should fire after initial distribution is complete.


```
ready: function() {
  setTimeout(function() {
    this.$.slot.assignedNodes({flatten: true});
  }.bind(this), 0);
}
```


You can use a `slotchange` event listener to react to runtime changes to distribution, but the event listener doesn't fire for the *initial* distribution.


```
ready: function() {
  var this._boundHandler = this._processLightChildren.bind(this);
  setTimeout(this._processLightChildren);
  this.$.slot.addEventListener('slotchange', this._processLightChildren);
}
```


 In order to force distribution synchronously, call `ShadyDOM.flush()`. This can be useful for unit tests.

### Remove type-extension elements {#remove-type-extension-elements}

Polymer doesn't support type-extension elements (such as `<input is="iron-input">`). For a discussion of this change, see [Type-extension elements](about_20#type-extension)



*   **All projects.** Refactor any type-extension elements into wrapper elements.
*   **All projects.** Replace any top-level template extension elements with the 2.0 wrapper equivalents.

#### Refactor type-extension elements {#refactor-type-extension-elements}

Type extension elements need to be refactored into standard custom elements (for example, instead of
an element that extends an `<a>` element, an element that takes an `<a>` element in its light DOM).

#### Convert template extension elements at the document level {#convert-template-extension-elements-at-the-document-level}

If you have any template extension elements—dom-bind, dom-if, and dom-repeat—*in the main document*, convert them to the wrapped form.

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
  <!-- Hybrid elements must keep the is="dom-bind" for backwards
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


For the time being, Polymer automatically wraps template extensions used in Polymer element templates during template processing for backward-compatibility, so you don't need to change those. As shown above, nested templates inside a top-level `dom-bind`, `dom-if`, or `dom-repeat` are also automatically wrapped.

## Data system {#data-system}

Polymer 2.0 includes several important changes to the data system, detailed in [Data system improvements](about_20#data-system).

### Remove key paths and Polymer.Collection {#remove-key-paths-and-polymer-collection}

Code that interacts with key paths, or uses `Polymer.Collection` directly won't run in hybrid mode. If upgrading to hybrid mode, you can conditionalize 1.0 code:


```
if (Polymer.Element) {
  // 2.0 code
} else {
  // 1.0 code
}
```


If upgrading to legacy or class-based elements, you can eliminate this code. Array change notifications for specific items use index paths. Changing the entire array results in a change notification for the entire array.

### Update observers {#update-observers}

Observers need to check for `undefined` arguments, which was not an issue in 1.x. If all of your observer's dependencies have default values, the observer should not be called with `undefined` arguments. But if your code relies on the observer to wait until all dependencies are defined, you need to add `undefined` checks.

If your observer relies on hidden dependencies being initialized, you may need to update your code.

Before {.caption}


```
observers: [ '_observeStuff(a, b)' ],
_observeStuff: function(a, b) {
  // this.c == hidden dependency!
  var v = a * b + this.c;
  ...
}
```


After {.caption}


```
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

### Data system miscellany {#data-system-miscellany}

A few more changes that you may need to take into account.

Only properties listed explicitly in `properties` can be configured from an attribute. You need to explicitly declare your property:



*   You have a property that's declared *implicitly* (used in a binding or observer, but not in the `properties` object).
*   You rely on configuring that property from an attribute (not a data binding).

Because several aspects of timing change in 2.0, you'll need to test your code to ensure that it doesn't rely on any 1.0 timing. In particular:



*   Element initialization (including template stamping and data system initialization) is deferred until the the element is connected to the main document. (This is a result of the custom element v1 changes.)

In order for a property to be deserialized from its attribute, it must be declared in the `properties` metadata object

Binding a default value of `false` using an *attribute binding* to a boolean property will not override a default `true` property of the target, due to the semantics of boolean attributes.  In general, property binding should always be used when possible, and will avoid such situations.

## Removed APIs {#removed-apis}

The following APIs have been removed.

*   `Polymer.instanceof` and `Polymer.isInstance`: no longer needed, use `instanceof` and `instanceof Polymer.Element`  instead.


*   `element.getPropertyInfo`: This API returned unexpected information some of the time and was rarely used.


*   `element.getNativePrototype`: Removed because it is no longer needed for internal code and was unused by users.


*   `element.beforeRegister`: This was originally added for metadata compatibility with ES6 classes. We now prefer users create ES6 classes by extending `Polymer.Element`, specifying metadata in the static `config` property.

    For legacy elements, dynamic effects may now be added using the `registered` lifecycle method.

*   `element.attributeFollows`: Removed due to disuse.

*   `element.classFollows`: Removed due to disuse.

*   `listeners` Removed ability to use `id.event` to add listeners to elements in shadow DOM. Use declarative template event handlers instead.

*    Methods starting with `_` are not guaranteed to exist (most have been removed).

## Upgrading to class-based elements {#upgrading-to-class-based-elements}

To define a class-based element, create a class that extends `Polymer.Element` (a subclass of `HTMLElement`), which provides most of the same features of Polymer 1.0 based on static configuration data supplied on the class definition.

The basic syntax looks like this:


```html
<!-- Load the Polymer.Element base class -->
<link rel="import" href="bower_components/polymer/polymer-element.html">

<script>
// Extend Polymer.Element base class
class MyElement extends Polymer.Element {
  static get is() { return 'my-element'; }
  static get config() {
   return { /* properties, observers meta data */ }
  }
  constructor() {
    super();
    ...
  }
  connectedCallback() {
    super.connectedCallback();
    ...
  }
  ...
}

// Register custom element definition using standard platform API
customElements.define(MyElement.is, MyElement);
</script>
```


You can leverage native subclassing support provided by ES6 to extend and customize existing elements defined using ES6 syntax:


```html
// Subclass existing element
class MyElementSubclass extends MyElement {
  static get is() { return 'my-element-subclass'; }
  static get config() { ... }
  constructor() {
    super();
    ...
  }
  ...
}

// Register custom element definition using standard platform API
customElements.define(MyElementSubclass.is, MyElementSubclass);
```


Below are the general steps for defining a custom element using this new syntax:



*   Extend from `Polymer.Element`. This class provides the minimal surface area to integrate with 2.0 DOM templating and data binding system. It provides only standard custom element lifecycle with the addition of ready.



*   You can extend from `Polymer.LegacyElement` instead, to get all of the Polymer 1.0 element API, but since most of this API was rarely used, this should not often be needed.



*   Implement "behaviors" as [mixins that return class expressions](http://justinfagnani.com/2015/12/21/real-mixins-with-javascript-classes/).

*   Property metadata (`properties` object) and complex observers (`observers` array) should be put on the class as a static in a property called `config`.

*   Element's `is` property should be defined as a static on the class.

*   The `listeners` and `hostAttributes` have been removed from element metadata; listeners and default attributes can be installed as and when needed. For convenience _`ensureAttribute` is available to set default attributes.


    ```
    // set tab-index if it's not already set
    _ensureAttribute('tab-index', 0);
    ```


Note that `Polymer.Element` provides a cleaner base class without much of the sugared utility API that present on legacy elements, such as `fire`, `transform`, and so on. With web platform surface area becoming far more stable across browsers, we intend to add fewer utility methods and embrace the raw platform API more.  So when using  `Polymer.Element`, instead of using the legacy `this.fire('some-event')` API, use the equivalent platform APIs:


```
this.dispatchEvent(new CustomEvent('some-event'), {bubbles: true});
```


If you want to upgrade to a class-based element but depend on some of the removed APIs, you can extend the `Polymer.LegacyElement` class instead of `Polymer.Element`.


```
class MyLegacyElement extends Polymer.LegacyElement { ... }
```




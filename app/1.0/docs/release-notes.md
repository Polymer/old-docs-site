---
title: Release notes
---

<!-- toc -->

<style>
.breaking {
  color: red;
  text-transform: capitalize;
  }
</style>

## [Release 1.11.2](https://github.com/polymer/polymer/tree/v1.11.1) (2017-12-15) {#v-1-11-2}

This release includes the following fix:

-   [#4984](https://github.com/Polymer/polymer/issues/4984). Fixes a regression introduced in 
    release 1.11.1, where the `:-webview-any` and `:-moz-any` selectors were tranformed 
    incorrectly when used following a `:host-context` selector. This resulted in the affected 
    rule and any following rules in the stylesheet being ignored. For example, the following
    selector would cause the issue:

    `:host-context([dir=rtl]) :-webview-any(.b1, b2)`

## [Release 1.11.1](https://github.com/polymer/polymer/tree/v1.11.1) (2017-12-05) {#v-1-11-1}

This release includes the following fixes:

-   [#4902](https://github.com/Polymer/polymer/pull/4902). Allow arbitrary whitespace between
    style module names in the `include` attribute. This allows for tabs and line breaks, for example:
    
    ```
    <style include="one-module two-module three-module
    four-module">
    ```

-   [#4952](https://github.com/Polymer/polymer/issues/4952). Fix `:dir` selector to handle a few 
    more complicated use cases:

    - `other-custom-element:dir()`
    - `:dir()` in a shadowroot should behave like `*:dir()`
    - A few cases where the `dir` attribute is set inside of a shadowroot.


-   [#4961](https://github.com/Polymer/polymer/issues/4961). `touchend` listeners do not need to   
    be passive to enable more performant scrolling.

    With this change, most of the tradeoffs with enabling `passiveTouchGestures` disappear. 
    For example, you can prevent a synthetic `click` event from being generated from a 
    tap by calling `preventDefault` from the `up` listener.

    The only limitation when using `passiveTouchGestures` is that you can't control
    scrolling from `track`, `down`, and `move` gesture event listeners.


## [Release 1.11.0](https://github.com/polymer/polymer/tree/v1.11.0) (2017-09-19) {#v-1-11-0}

This release includes the following new features:

-   `:dir()` CSS selector is now supported.

    The `:dir()` selector allows for writing text-orientation specific styling. [More information on MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/:dir).

    Use of `:dir()` requires the application to set the `dir` attribute on `<html>`. All 
    elements will use the same direction (that is, setting the `dir` attribute on the element
    itself or on one of the element's ancestors has no effect).

-   custom styles with complex selectors (`html *`, `html:not([foo]) .bar`) are now supported 
    correctly. 

## [Release 1.10.1](https://github.com/polymer/polymer/tree/v1.10.1) (2017-09-19) {#v-1-10-1}

This release includes the following features and fixes:

-   Work around [Chrome deprecation](https://crbug.com/523952) of styling main document from HTML  
    Imports (backport from 2.1.1).

-   Work around a [slightly broken CSS Custom Properties implementation](https://github.com/webcomponents/shadycss/issues/111) 
    in Edge 15  (backport from webcomponents/shadycss).

## [Release 1.10.0](https://github.com/polymer/polymer/tree/v1.10.0) (2017-09-19) {#v-1-10-0}


This release adds support for a new `passiveTouchGestures` setting. This can be set by defining a 
`Polymer` object before loading `polymer.html`, as described in [Global settings](devguide/settings).

```html
<script>
window.Polymer = {passiveTouchGestures: true}
</script>
```

Using passive listeners may improve scrolling performance, at the cost of being unable to control scrolling by calling `preventDefault` on a gesture event.

Instead, elements must use `Polymer.Gestures.setTouchAction(node, 'direction')`.

The `passiveTouchGestures` setting is false by default and is meant as an opt-in.
 
## [Release 1.9.3](https://github.com/polymer/polymer/tree/v1.9.3) (2017-07-20) {#v-1-9-3}

This release adds support for Polymer 2 hybrid styles with `:host, html` selector.
This is the best replacement for `:root` selector in style modules.


## [Release 1.9.2](https://github.com/polymer/polymer/tree/v1.9.2) (2017-06-15) {#v-1-9-2}

This release fixes the following issue:

-   [#4550](https://github.com/Polymer/polymer/issues/4550). For elements using `disable-upgrade`, 
    the `detached` callback should now only be called after the element has upgraded.



## [Release 1.9.1](https://github.com/polymer/polymer/tree/v1.9.1) (2017-04-17) {#v-1-9-1}

This release fixes two issues related to 2.0 hybrid element support.

-   Fix use of `this.resolveUrl()` function in the `properties` block. This fixes a regression
    introduced in 1.9.0.

-   Fix hybrid use of `dom-if`, `dom-bind`, and `dom-repeat` with 2.x wrapper elements to stamp content above the wrapper

    Example {.caption}

    ```html
    <!-- content should be stamped here -->
    <dom-bind>
      <template is="dom-bind">
        <!-- content -->
      </template>
    </dom-bind>
    ```


## [Release 1.9.0](https://github.com/polymer/polymer/tree/v1.9.0) (2017-04-13) {#v-1-9-0}


This release adds two new properties to all Polymer elements for forward-compatibility with 2.0
(for use in "2.0 hybrid" elements): `importPath` and `rootPath`.

-   The `importPath` property defaults to the element's HTMLImport document URL path.

-   The `rootPath` property defaults to the main document URL's path but may be globally overridden
    using `Polymer = { rootPath: '...' }` prior to loading `polymer.html`.

Inside element templates, users can now use property binding (e.g. `src$="[[importPath]]foo.jpg"` or
`src$="[[rootPath]]foo.png"`) to explicitly declare what the URL is relative to, rather than relying
on Polymer 1.x's automatic URL rewriting, which has been removed in 2.x.

It may be useful to override `rootPath` to provide a stable application mount path when using client
side routing so that an element template can refer to "application absolute" paths.

For more information, see [URLs in templates](/2.0/docs/devguide/dom-template#urls-in-templates) in
the 2.0 docs.

## [Release 1.8.0](https://github.com/polymer/polymer/tree/v1.8.0) (2017-02-06) {#v-1-8-0}

This release adds several small performance-related features.

### Suppress notification events

This release includes two new global settings to suppress unnecessary notifications. These settings
must be enabled before loading the Polymer import (`polymer.html`) as described in
[Global settings](devguide/settings).

*   Suppress template notifications.

    Usage:

    ```js
    Polymer = { suppressTemplateNotifications: true }
    ```

    When true, suppresses `dom-change` and `rendered-item-count` events from `dom-if`, `dom-repeat`,
    and `dom-bind` elements. Users can opt back into `dom-change` events by setting the
    `notify-dom-change` attribute (`notifyDomChange: true` property) on individual `dom-if` and
    `dom-repeat` instances.

    ```html
    <template is="dom-repeat" notify-dom-change>
      ...
    </template>
    ```

*   Suppress binding notifications.

    Usage:

    ```js
    Polymer = { suppressBindingNotifications: true }
    ```

    Disables notify effects when propagating data _downward_ via bindings. Generally these are not
    useful unless you are explicitly adding a binding and a change event listener on the same
    element:

    ```html
    <my-el foo="{{foo}} on-foo-changed="handleFoo"></my-el>
    ```

    With this binding, when the host changes the value of `foo`, its `handleFoo` method is invoked
    to handle the change event. This pattern is generally unnecessary since the host element doing
    the binding can use a `foo` observer.

    With `suppressBindingNotifications: true`, the event isn't fired  when the host changes the
    value (but is still fired if `my-el` changes its `foo` value internally.)

    We attempted to make this the default some time back but needed to revert it when we found via
    [issue #3077](https://github.com/Polymer/polymer/issues/3077) that users were indeed doing this
    in corner-case scenarios.  Users that avoid these patterns can enjoy the potentially significant
    benefit of suppressing unnecessary events during downward data flow by opting into this flag.

### `disable-upgrade` attribute

This release adds a `disable-upgrade` attribute API for all Polymer elements when global opt-in
setting `disableUpgradeEnabled` is true.  This is a lightweight feature useful for performance
tuning an application, giving fine-grained control over individual element instantiation cost.

When an element is marked with the `disable-upgrade` attribute, its `createdCallback` returns
early without performing any of the normal Polymer element initialization steps (for example,
stamping template, setting default properties, running observers, and so on).  The element behaves
like an element that has not had its definition loaded, **except** that it has the correct prototype
(as such, methods should not be called on the element until its `disable-upgrade` attribute
has been removed).

Removing the `disable-upgrade` attribute causes the element to boot up, initialize its properties,
stamp its template, and so on.

Note this feature is implemented as an attribute API only.  There is no corresponding
`disableUpgrade` property.  As such, any bindings should be via attribute bindings. For example:

```html
<script src="/bower_components/webcomponentsjs/webcomponents-lite.js"></script>
<script>
  Polymer = { disableUpgradeEnabled: true };
</script>
<link rel="import" href="/bower_components/polymer/polymer.html">

  ...

<template is="dom-bind">

  ...

  <!-- upgrade my-element when loggedIn == true -->
  <my-element disable-upgrade$="{{!loggedIn}}"></my-element>

</template>
```

### Template `strip-whitespace` is recursive

The `strip-whitespace` attribute is now recursive to descendant templates, stripping whitespace from
nested `<template is="dom-repeat">` and `<template is="dom-if>` elements.

For information on the `strip-whitespace` attribute, see
[Remove empty text nodes](devguide/local-dom#strip-whitespace).

## [Release 1.7.1](https://github.com/polymer/polymer/tree/v1.7.1) (2016-12-14) {#v-1-7-1}

This release includes a set of bug fixes, including an update to the `<slot>` support originally
included in release 1.7.0.

### Distribute text nodes to the default slot

This release fixes an issue ([#4109](https://github.com/Polymer/polymer/issues/4109)) that
prevented text nodes from being distributed to the default `<slot>`.

For native shadow DOM v1, a default slot doesn't match children with an explicit slot name
(that  is, a <code>slot="<var>slot_name</var>"</code> attribute). In release 1.7.0, Polymer
attempted to emulate this feature by transforming a default slot into the following `<content>`
element:

  <content select=":not([slot])"></content>

Unfortunately, the `:not()` selector only matches elements, not text nodes, so text nodes were not
distributed to the default slot. For example, given a custom element with a text node as a child:

  <my-element>Some text</my-element>

The string "Some text" would not distribute to a default slot inside `<my-element>`.

Now, a default `<slot>` element is translated to a default `<content>` element, which accepts all
distributed children that haven't matched a previous `<content>` element. This means that for
hybrid elements, **all named slots must come _before_ any unnamed slots in the DOM.**

For example, given this set of slots:

```html
<slot name="header"></slot>
<slot></slot>
<slot name="footer"></slot>
```

Content with `slot="footer"` is distributed to the _default_ slot in 1.7.1, but distributed to the
last slot in 2.0.


### Bug fixes

-   [#3964](https://github.com/Polymer/polymer/pull/3964) Fixed IE memory leaks in the `fire` and
    `importHref` methods.

-   [#4096](https://github.com/Polymer/polymer/issues/4096). `dom-repeat` and `dom-if` occasionally
    log errors.

-   [#4123](https://github.com/Polymer/polymer/issues/4123). Fix memory leak when using `importHref`.

-   [#4125](https://github.com/Polymer/polymer/issues/4125). CSS custom properties cannot be queried
    in elements that do not apply properties. This problem manifested when an element did not apply
    any custom property values in its local DOM, but tried to retrieve a custom property value
    imperatively with `getComputedStyleValue`.

-   [#4128](https://github.com/Polymer/polymer/issues/4128). On touch devices, when a `<button>` is
    covered by a Polymer element that uses gestures (for example, one with a `down` listener) and
    the Polymer element is moved, the `<button>` does not receive mouse events for 2.5s.



## [Release 1.7.0](https://github.com/polymer/polymer/tree/v1.7.0) (2016-09-29) {#v-1-7-0}

This release includes forward compatibility features that let you build elements that run under
both Polymer 1.7+ and Polymer 2.0.

The syntax changes described here are **not required** for current Polymer 1.x elements, but using
the new syntax makes for an easier transition to 2.x. The Polymer team plans to provide a
tool to automate these and other changes required for moving from 1.x to 2.0, so if you have a large
project, you may want to wait for an announcement about the migration tool.

### Shadow DOM v1 slots

To provide a smooth migration path from Polymer 1.x to 2.x, this release lets you
opt-in to using the new `<slot>` element, and `::slotted()` CSS selector from shadow DOM v1 in place
of the `<content>` element and `::content` selector from shadow DOM v0. (This release doesn't
actually add support for shadow DOM v1, it just lets you use a forward-compatible syntax.)
)

To update an element:

*   Each `<content>` insertion point must be changed to `<slot>`.

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

In Polymer 1.7, elements written with slots are re-written at runtime into the
equivalent `<content>` elements and style rules, to work with shadow DOM v0.

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
Anywhere you're using `x-forward-compat`, you'd have to change to the new slot syntax:

```
<x-forward-compat>
  <h2 slot="named">I'm the named content</h2>
  <span>This content goes to the default slot.</span>
</x-forward-compat>
```

For more details about transitioning to `<slot>`, see the
[2.0-preview README](https://github.com/Polymer/polymer/blob/2.0-preview/README.md#distribution).

#### Limitations of slot emulation

The runtime transformation does not produce a perfect
representation of the v1 slot algorithm. In particular, multiple levels
of shadow trees with named slots are problematic. For example,
the following templates do not work correctly under 1.7 (although
they're valid under shadow DOM v1):

```html
<dom-module id="x-child">
  <template>
    <slot name="child-slot"></slot>
  </template>
</dom-module>

<dom-module id="x-parent">
  <template>
    <x-child>
      <slot name="parent-slot" slot="child-slot"></slot>
    </x-child>
  </template>
</dom-module>
```

To make this work with 1.7, the same slot name must be used
at each level. For example, the parent could change to use
the name `child-slot`.

```html
<dom-module id="x-parent">
  <template>
    <x-child>
      <slot name="child-slot" slot="child-slot"></slot>
    </x-child>
  </template>
</dom-module>
```

### Alternatives for `:root` selector

Another Polymer 2.x change is removing the `:root` selector and replacing it with `html` in `<style is="custom-style">`, and `:host > *` in element styles.

This release allows for using both `html` and `:root` in `<style is="custom-style">`, and using both `:root` and `:host > *` in element styles

### Bug fixes

[#3676](https://github.com/Polymer/polymer/issues/3676). The `preserve-content` attribute does not protect style tags nested in templates.

[#3836](https://github.com/Polymer/polymer/issues/3836). `var()` functions rewritten incorrectly with `useNativeCSSProperties=true`.

[#3957](https://github.com/Polymer/polymer/issues/3957). VoiceOver/iOS: Anchors do not fire tap.

[#3965](https://github.com/Polymer/polymer/issues/3965). Performance regression on IE11.


## [Release 1.6.1](https://github.com/polymer/polymer/tree/v1.6.1) (2016-08-01) {#v-1-6-1}

New features:

-   [#3736](https://github.com/Polymer/polymer/issues/3736).
    Even lazier `lazyRegister`. When `lazyRegister` is set to `max`, behaviors
    are evaluated at the first element instance, which places a few new
    restrictions on the behaviors. When lazyRegister is `max`, defer all
    behavior work until first element creation. When set, a behavior cannot
    setup an element's `is` or custom constructor via defining `factoryImpl`.
    We do call beforeRegister on the prototype to preserve the ability to use
    it in ES6. This orders the element prototype's `beforeRegister` before
    behaviors' rather than after, as in the normal case.

-   [#3786](https://github.com/Polymer/polymer/issues/3786).
    Add `noUrlSettings` settings flag. When this settings option is set,
    Polymer settings can only be sent from a script in the page. In other
    words, URL query parameters such as `?dom=shadow` will be ignored.

Bug fixes:

-   [#2448](https://github.com/Polymer/polymer/issues/2448).
    Rewrite links to be relative to source document rather than to where the
    element is loaded.

-   [#3818](https://github.com/Polymer/polymer/issues/3818).
    Correctly handle values of `inherit` and `initial` in apply shim.

-   [#3802](https://github.com/Polymer/polymer/issues/3802).
    Ensure that apply shim produces correct properties in shared elements.

-   [#3803](https://github.com/Polymer/polymer/issues/3803).
    Handle values of `initial` and `inherit` correctly in the CSS custom
    property shim.

-   [#3801](https://github.com/Polymer/polymer/issues/3801).
    Calculate custom properties in style host before element so that
    scope's styles are ready to be inspected by the element for matching
    rules.

-   [#3800](https://github.com/Polymer/polymer/issues/3800).
    When `nativeCSSCustomProperties` was true, `updateStyles` mistakenly
    attempted to unapply all existing inline style properties and then set
    the given properties. It has been fixed to only unapply properties that
    were previously set via `updateStyles` (and then set the given
    properties).

-   [#3779](https://github.com/Polymer/polymer/issues/3779).
    When an attribute and a property are present at upgrade time,
    the property should win.

-   [#3677](https://github.com/Polymer/polymer/issues/3677).
    Firing `value-changed` should not cause repeated value change on the
    element itself.

-   [#3784](https://github.com/Polymer/polymer/issues/3784).
    Fire `tap` event on touchscreen tap followed by mouse click.

-   [#3770](https://github.com/Polymer/polymer/issues/3770).
    Fix rules inside media queries for IE 10 and 11.

-   [#3190](https://github.com/Polymer/polymer/issues/3190).
    Handle complex default values (such as gradient) correctly in custom
    property shim.

-   [#3645](https://github.com/Polymer/polymer/issues/3645).
    Add missing `iron-component-page` dev dependency needed for viewing
    the repo's docs.

## [Release 1.6.0](https://github.com/polymer/polymer/tree/v1.6.0) (2016-06-29) {#v-1-6-0}

New features:

-   Added support for native custom CSS properties.

    To use, set `lazyRegister` and `useNativeCSSProperties` to true in Polymer
    settings. For example, you could insert the following script block before importing
    `polymer.html`:

    ```
    <script>
      Polymer = {
        lazyRegister: true,
        useNativeCSSProperties: true
      };
    </script>
    ```

    Enabling the feature only impacts browsers that support native custom CSS
    properties (Chrome and Firefox; Safari 9+ supports custom properties, but is
    buggy and thus opted out for now).  On these browsers, normal custom CSS
    properties such as `--custom-property: value` will use native properties;
    [custom CSS mixins](https://www.polymer-project.org/1.0/docs/devguide/styling#custom-css-mixins)
    such as `--custom-mixin: { ... }` and their `@apply` points of usage will be
    destructured into individual custom properties once at registration time such
    that native properties are used for all custom properties.  This eliminates
    all _instance time_ work related to the custom property shim, which should
    provide substantial performance gains.

    *Caveats:* When native custom properties are in use, Polymer's
    `updateStyles(...)` API is supported with one exception: calling
    `updateStyles` to change the value of custom CSS mixins is not supported.

-   Integrated support for
    [polymer-css-build](https://github.com/PolymerLabs/polymer-css-build).

    The CSS build performs Shady DOM CSS selector shimming as well as
    destructuring custom CSS mixins to individual properties, which can help
    eliminate all runtime cost of Shady DOM style shimming, as well as all
    runtime cost of custom property shimming (on browsers with native CSS
    properties).  Achieving optimal results may require selectively serving
    different built CSS depending on client capabilities.  See that repo for
    details on how to run the build.

-   Added support for defining CSS custom properties in `@media` queries

    The following use of CSS custom properties inside `@media` rules is
    now supported, allowing for dynamic change of custom property values
    based on media features, like screen size:

    ```html
    <style>
      @media (max-width: 400px) {
        :host {
          --gutter-width: 16px;
        }
      }
    </style>
    ```
    For browsers that don't support custom properties, call
    `Polymer.updateStyles()` to re-evaluate the media queries upon window
    resize. The Polymer team chose not to include a window resize listener in
    the Polymer core library because there are performance and responsiveness
    tradeoffs depending on whether it should be called on every resize or
    throttled somehow. Here's a basic example that ensures styles are updated on
    window resize, throttled to one update per 100ms.

    ```js
    (function() {
      var resizeDebouncer;
      addEventListener('resize', function() {
        resizeDebouncer = Polymer.Debounce(resizeDebouncer, Polymer.updateStyles, 100);
      });
    })();
    ```

Bug fixes:

-   [#3705](https://github.com/Polymer/polymer/issues/3705).
    Ensure that custom property shim correctly re-calculates custom property
    style values when global `<style is="custom-style">` elements are loaded
    asynchronously (e.g. via lazy-loading).

-   [#3734](https://github.com/Polymer/polymer/issues/3734).
    Ensure that lazy-loaded element definitions result in tree-order upgrades
    when using `importHref()`. This should result in more deterministic behavior
    when using lazy-load patterns.

-   [#3722](https://github.com/Polymer/polymer/issues/3722).
    Observers and computed functions now always receive the current value of a
    property. This addresses errors caused by stale values that
    occurred when a property value was changed synchronously in its own
    observer.

-   [#3749](https://github.com/Polymer/polymer/issues/3749). Fix selectors like
    `:host(.foo)::after` in Shady DOM.

-   [#3748](https://github.com/Polymer/polymer/pull/3748). Fix selectors like
    `:host[inline]` in Shady DOM.

-   [#3739](https://github.com/Polymer/polymer/issues/3739). Correctly shim
    `:host(.element-name)` as `element-name.element-name`.

-   [#3530](https://github.com/Polymer/polymer/issues/3530). Force element to
    recalculate its style properties when it's reinserted into the DOM. This
    fixes a confusing issue where calling `updateStyles()` before an element was
    attached had no effect.

-   [#3730](https://github.com/Polymer/polymer/issues/3730). Fix behavior of
    `Polymer.dom(node).nextSibling`. In some situations, it was being set to the
    `nextSibling` in the browser DOM, when it should have been `null`.

-   [#3631](https://github.com/Polymer/polymer/pull/3631). Listening for
    `foo.bar.*` was incorrectly triggering `foo.bars`.

-   [#3555](https://github.com/Polymer/polymer/issues/3555).
    Ensure selectors including `::content` without a prefix inside a complex
    selector are shimmed correctly and do not leak to the global scope. For
    example, `button, ::content button { ... }` was getting incorrectly shimmed
    as `buttom.custom-element, button { ... }`.

-   [#3567](https://github.com/Polymer/polymer/issues/3567). Ensure that
    `preventDefault` works in tap handlers when the source is a touch.
    Previously it was only working when the source was a click.

## [Release 1.5.0](https://github.com/Polymer/polymer/tree/v1.5.0) (2016-05-31) {#v1-5-0}

This release includes one new feature:

-  `Polymer.Gestures.resetMouseCanceller`: New API for resetting the "mouse canceller" that prevents
    mouse event driven gestures when using a touch screen. This API is most likely to be useful for
    testing.

This release includes the following bug fixes:

-   [#2350](https://github.com/Polymer/polymer/issues/2350),
    [#2415](https://github.com/Polymer/polymer/issues/2415),
    [#3179](https://github.com/Polymer/polymer/issues/3179),
    [#3239](https://github.com/Polymer/polymer/issues/3239). Refactor how observers get their
    arguments.

-   [#3179](https://github.com/Polymer/polymer/issues/3179). Make notifyPath's value argument optional.

-   [#3364](https://github.com/Polymer/polymer/issues/3364) When a `dom-bind`, `dom-if` or
    `dom-repeat` is in the main document, binding a value to class attribute doesn't work correctly
    in Shady DOM.

-   [#3515](https://github.com/Polymer/polymer/issues/3515). Changes in dynamic computed functions
    don't get triggered in `dom-if` templates.

-   [#3525](https://github.com/Polymer/polymer/issues/3525): Make lazy registration compatible with
    platforms (like IE10) on which a custom element's prototype must be simulated.

-   [#3531](https://github.com/Polymer/polymer/issues/3531). Give the `detached` callback the same
    "wait for first paint" semantics as the `attached` callback for consistency. Prior to this fix,
    in some cases it was possible for `detached` to fire before `attached`.

-   [#3546](https://github.com/Polymer/polymer/pull/3546) Compute and use correct annotation value
    during config. This fix prevents some bindings (such as compound bindings and negated binding
    values) from receiving the incorrect value during configuration.

-   [#3661](https://github.com/Polymer/polymer/issues/3661) Re-use cached style element that needs
    to be replaced in the document rather than creating a new one.

## [Release 1.4.0](https://github.com/Polymer/polymer/tree/v1.4.0) (2016-03-18) {#v1-4-0}

This release includes one new feature:

-   [#3508](https://github.com/Polymer/polymer/pull/3509). Support lazy
    registration of elements. When enabled, this defers _most_ of the work
    performed at registration time until the first instance of an element
    is created. If your page includes definitions for many custom elements
    that are not included in the initial page load, this can improve start-up
    time by deferring actions like template parsing, style shimming, and data
    system set up until the elements are used.

    For example, if the only instance of an elements is inside a `dom-if`
    template, the more expensive registration actions are deferred until the
    `dom-if` instantiates its contents (when its condition changes to true).

    Lazy registration is opt-in for now.

    To enable lazy registration, add a `lazyRegister` property with a value
    of `true` to the global settings object.

    ```
    <script src="components/webcomponentsjs/webcomponents-lite.js"></script>
    <script>
      window.Polymer = {lazyRegister: true};
    </script>
    <!-- import polymer.html or any elements that depend on Polymer -->
    ```

    If you have specific element that relies on the default (immediate)
    registration behavior, call `ensureRegisterFinished` on its prototype:

    ```
    var EagerElement = Polymer({ is: "eager-element"});
    EagerElement.prototype.ensureRegisterFinished();
    ```

    This ensures that your element **doesn't** use lazy registration, even if
    the global `lazyRegister` flag is set.

    **As of this release there is a known issue with the neon animation elements
    not working when lazy registration is enabled.**

This release includes one bugfix:

-   [#3500](https://github.com/Polymer/polymer/issues/3500). Properties starting
    with an uppercase letter, like `FPS`, no longer reflect to attributes.

    Prior to v1.3.0, a property like `FPS` reflected incorrectly to the
    attribute `fps`. With v1.3.0, `FPS` reflected to `-f-p-s`, which is treated
    as invalid by `setAttribute`, causing some bindings to throw exceptions.
    With this change, properties that start with an uppercase letter **do not
    reflect**. If such a property is configured to reflect, Polymer prints a
    warning to the console.

## [Release 1.3.1](https://github.com/Polymer/polymer/tree/v1.3.1) (2016-03-02) {#v1-3-1}

This release fixes the following issues:

-   [#3461](https://github.com/Polymer/polymer/issues/3461). Using
    `var()` in a css mixin or custom property definition
    breaks the scoped style of the element. For a full description
    of this issue, see [Known issues in release 1.3.0](#v1-3-0-known-issues).

-   [#3484](https://github.com/Polymer/polymer/issues/3484). A `dom-bind` may
    render before the entire document is loaded. This may result in a script
    which expects to install API on a `dom-bind` running after it renders,
    resulting in unexpected behavior.

## [Release 1.3.0](https://github.com/Polymer/polymer/tree/v1.3.0) (2016-02-22) {#v1-3-0}

This release includes the following new features:

-   [#2348](https://github.com/Polymer/polymer/issues/2348). Allow late
    upgrading of bound elements. Fixed an issue where setting properties on an
    un-upgraded element Polymer's setters, preventing property effects (bindings,
    observers, and computed properties) from working.

-   [#3023](https://github.com/Polymer/polymer/issues/3023). Add support for
    `[attribute~="value"]` selector.

-   [#3299](https://github.com/Polymer/polymer/issues/3299). Support dynamic
    functions for computed annotations. See
    [Support for dynamic functions in bindings](#v1-3-0-dynamic-fns) for details.

-   [#2399](https://github.com/Polymer/polymer/issues/2399). Add support for
    custom properties in `@keyframes` rules.

-   [#2486](https://github.com/Polymer/polymer/pull/2486). Allow newlines in
    computed binding argument list. For example:

    ```
    <div hidden$="[[_someVeryLongFunctionName(
        someVeryLongArg,
        anotherCrazyLongArg)]]">
    ```


This release fixes the following issues:

-   [#1715](https://github.com/Polymer/polymer/issues/1715). Allow two-way binding
    for negated expressions. (For example, `checked="{{!hidden}}"`.)


-   [#1727](https://github.com/Polymer/polymer/issues/1727). Eliminate the need
    to add `:host` or other selector in front of `::content` in some situations.
    This applies if the `<content>` tag is a top-level local DOM child, and there
    are no other local DOM nodes that could match the selector, for example:

    ```
    <template>
      <content></content>
    </template>
    ```


    If you are using a wrapper element around the `<content>` tag as described
    in [Styling distributed children](/1.0/docs/devguide/styling#styling-distributed-children-content)
    you should keep using the wrapper. For example:

    ```
    <dom-module id="styled-content">
      <template>
        <style>
          .wrapper ::content * {
            color: red;
          }
        </style>
        <h2>I am in local DOM</h2>
        <div class="wrapper">
          <content></content>
        </div>
      </template>
      <script>
        Polymer({ is: 'styled-content' });
      </script>
    </dom-module>
    ```

    Changing this selector to `::content *` results in the `<h2>` element
    being styled red under shady DOM, because the style rule is rewritten as
    `styled-content *`.

-   [#2291](https://github.com/Polymer/polymer/pull/2291). Make `isDebouncerActive`
    actually return a boolean.

-   [#3063](https://github.com/Polymer/polymer/issues/3063). Templatizer: bug in
    templatize depending on the parent properties. In certain circumstances, an
    element using the Templatizer behavior could throw the error "Uncaught
    TypeError: template._propertySetter is not a function".

-   [#3206](https://github.com/Polymer/polymer/issues/3206). Camel case declared
    properties with single letter in the middle are ignored. (For example,
    `align-x-axis` did not map to `alignXAxis`.) This was a regression introduced
    by a performance improvement in 1.2.2.

-   [#3221](https://github.com/Polymer/polymer/issues/3221). Custom properties
    don't use default values if they contain parenthesis. For example:

    ``` css
    background-image: var(--foo-background-image, url(http://placehold.it/400x300));
    ```

-   [#3222](https://github.com/Polymer/polymer/pull/3222). Fix for scoping when
    class is not specified on element.

-   [#3288](https://github.com/Polymer/polymer/issues/3288). Fixed a case where
    attribute bindings set a property where they should not have.
    For details, see [Attribute binding fix](#v1-3-0-attribute-binding).

-   [#3326](https://github.com/Polymer/polymer/issues/3326). Fix incorrect CSS
    specificity when using custom properties. For details, see
    [CSS specificity changes](#v1-3-0-css-specificity).

-   [#3349](https://github.com/Polymer/polymer/issues/3349). Allow binding to a
    path that includes a dash. (For example, `"{{foo.some-value}}"`.)

-   [#3365](https://github.com/Polymer/polymer/issues/3365). Behavior callbacks
    can be called multiple times when a behavior appears more than once in the
    flattened behavior list.

-   [#3405](https://github.com/Polymer/polymer/issues/3405). Unexpected tap event
    from child when parent fires track events.

-   [#3443](https://github.com/Polymer/polymer/issues/3443). Attributes bindings
    initially set to `false` are configured to `true`.

-   [#3446](https://github.com/Polymer/polymer/issues/3446). Elements without
    property effects do not receive configured properties.

-   [#3354](https://github.com/Polymer/polymer/pull/3354). Fix ordering of
    property effects.

-   [#3373](https://github.com/Polymer/polymer/pull/3373). `dom-template`: Parent
    properties should not override argument-based properties.

-   [#3442](https://github.com/Polymer/polymer/pull/3442). Restrict early
    property set to properties that have accessors. This allows users to set
    properties in `created` which are listed in `properties` but which have no
    accessor.


### Support for dynamic functions in bindings (#3299) {#v1-3-0-dynamic-fns}

Computed bindings and observers will trigger when a function changes. Computed
bindings on functions can be used to lazily trigger bindings on external changes,
or encapsulate dependencies.

A good example is a translate function for i18n that depends on external
translation tables.

Example { .caption }

```
<dom-module id="i18n-string">
  <template>
    [[translate(input)]]
  </template>
  <script>
  Polymer({
    is: 'i18n-string',
    properties: {
      translate: {
        type: Function,
        computed: '_computeTranslateFn(translationService)'
      },
      translationService: {
        type: Function,
        value: function() {
          return function(str){ return str + 'ish'; };
        }
      }
    },
    _computeTranslateFn: function(ts) {
      return function(str) {
        return ts(str);
      }
    }
  });
  </script>
</dom-module>

<!-- initially displays "helloish" -->
<i18n-string input="hello"></i18n-string>
```

In this example, `<i18n-string>` can wait for `translationService` to be set
before  attempting translations, and updates update translations when
`translationService` is changed. This encapsulates the dependency on
`translationService` in the computed `translate` function, so it doesn't need
to be included in the binding.

### Attribute binding fix (#3288) {#v1-3-0-attribute-binding}

Prior to Polymer v1.3.0, a bug existed related to attribute bindings to unknown
attributes (that is, attributes that do not map to properties that Polymer
creates accessors for). The bug resulted in the value of the attribute being
mirrored to a property of the same name _once_ (but subsequent changes in the
attribute were not mirrored).

Polymer's contract is to only deserialize attributes to properties that Polymer
is managing. That is, properties declared in the `properties` object or used as
dependencies to bindings, observers, or computed functions. You should review
your code to ensure that you're not relying on the unintentional one-time
deserialization of unknown attributes. For example, the following will not
initialize the property `foo`:

```
<!-- binding to unknown attribute: will not deserialize to property -->
<button foo$="{{property}}">`
```

```
// Passes:
assert(button.getAttribute('foo') == this.property);
// Fails:
assert(button.foo == this.property);
```

If you need to access the _property_ value of a bound element,
you should ensure you are binding to a property as opposed to an attribute:

```
<!-- binding to unknown property always works -->
<button foo="{{property}}">
```

```
// Passes:
assert(button.foo == this.property);
```

### CSS specificity changes {#v1-3-0-css-specificity}

This release fixes an issue with CSS specificity, where rules that applied
custom properties improperly received higher specificity than a rules with no
custom properties.

```
<dom-module id="x-foo">
  <template>
    <style>
      :host {
        background: var(--foo, red);
      }
      :host(.zap) {
        background: orange;
      }
    </style>
    <content></content>
  </template>
  <script>Polymer({is: 'x-foo'});</script>
</dom-module>

<x-foo>i am red</x-foo><br>
<x-foo class='zap'>I should be orange</x-foo>
```

This fix changes how some styles are shimmed, and may change how some styles
are displayed under shady DOM. In particular: rules defined in a `:host` selector
inside an element's local DOM _should_ be lower specificity than an type selector
in the main document:

```
<!-- main document -->
<style>
  my-element {
    color: red;
  }
</style>

<my-element>I should be red.<my-element>

<!-- my-element.html -->
<dom-module>
  <template>
    <style>
      :host {
        color: blue;
      }
    </style>
    <content></content>
  </template>
  <script>
    Polymer({ is: 'my-element'});
  </script>
</dom-module>
```

With this change, the text in this example renders (incorrectly) as blue under
shady DOM. Using a `custom-style` element for document-level styling corrects
this issue:

```
<style is="custom-style">
  my-element {
    color: red;
  }
</style>
```

If this solution isn't possible, you can also use a more specific selector in your
document styles (for example, a class selector).

### Known issues in release 1.3.0 {#v1-3-0-known-issues}

The following issue was discovered after the release of 1.3.0:

-   [#3461](https://github.com/Polymer/polymer/issues/3461).
    Using `var()` in a css mixin or custom property definition
    breaks the scoped style of the element. An
    element with styles like the following triggers this bug:

    ```
    <style>
      :host {
        color: white;
        // Apply a custom property when defining a custom property
        --my-property: var(--another-property);
        // OR:
        --my-mixin: {
          // Apply a custom property inside a mixin
          background: var(--my-background);
        }
      }
    </style>
    ```

    This issue will be fixed in the next release.

    As a temporary workaround, you can add the following ruleset at the
    beginning of the element's styles (before all other styles).

    ```
    /* Workaround for issue #3461 */
    :host {
      --workaround: inherit;
      color: var(--workaround);
      /* existing rules below */
        }
    ```


## [Release 1.2.4](https://github.com/Polymer/polymer/tree/v1.2.4) (2016-01-27)

This release fixes the following issues:


-   Fixes [2407](https://github.com/Polymer/polymer/issues/2407). `scopeSubtree`
    doesn't work on SVG elements.

-   Fixes [2506](https://github.com/Polymer/polymer/issues/2506). Fix for method
    parsing in computed bindings.

-   Fixes [2555](https://github.com/Polymer/polymer/issues/2555). Produce nicer
    error on malformed observer.

-   Fixes [2617](https://github.com/Polymer/polymer/issues/2617). Added
    `polymer-mini.html` and `polymer-micro.html` to Bower distribution.

-   Fixes [2645](https://github.com/Polymer/polymer/issues/2645). Improve
    performance of `Polymer.dom` `prevSibling`, `nextSibling` operations.

-   Fixes [2666](https://github.com/Polymer/polymer/issues/2666). Fix using
    `value$` on input element.

-   Fixes [2704](https://github.com/Polymer/polymer/issues/2704). Fix compound
    bindings with braces in literals.

-   Fixes [3018](https://github.com/Polymer/polymer/issues/3018). Avoid throwing
    with invalid keys/paths. Recent changes caused calls that used to fail
    gracefully  on unexpected input to throw exceptions, which could cause
    unexpected breakage. For example, the following calls improperly generated
    an exception:

    -   Calling `Polymer.Collection.getItem(key)` with an undefined key.
    -   Calling `Polymer.Base.notifyPath(path, value)` where the path cannot be
        dereferenced to the leaf.

    These now fail gracefully again.

-   Fixes [3065](https://github.com/Polymer/polymer/issues/3065). Add
    `dom-repeat.renderedItemCount` property.

-   Fixes [3076](https://github.com/Polymer/polymer/issues/3076). The
    `beforeRegister` callback was being called twice.

-   Fixes [3077](https://github.com/Polymer/polymer/issues/3077). Listeners on
    `data-change` events may not be called if the property is bound. This was a
    regression introduced in Release 1.2.2.

-   Fixes [3083](https://github.com/Polymer/polymer/issues/3083). Remove closures
    holding element references after `mouseup`/`touchend`.

-   Fixes [3084](https://github.com/Polymer/polymer/issues/3084). Bindings with
    wildcard arguments to inline computing functions fail to parse Include
    wildcard character in identifier.

-   Fixes [3108](https://github.com/Polymer/polymer/issues/3108). Moves `debounce`
    functionality from polymer-micro to polymer-mini. The functionality belongs
    in the mini layer and was never actually functional in micro.

-   Fixes [3113](https://github.com/Polymer/polymer/issues/3113). Add an optional
    async argument to `importHref`.

-   Fixes [3115](https://github.com/Polymer/polymer/issues/3115). Make
    `Polymer.dom.flush` reentrant-safe.

-   Fixes [3125](https://github.com/Polymer/polymer/issues/3125). Ensure `dom-if`
    in host does not restamp when host detaches.

-   Fixes [3128](https://github.com/Polymer/polymer/issues/3128),
    [3121](https://github.com/Polymer/polymer/issues/3121). Computed bindings:
    outer scope property forwarding errantly forwarded literals as properties.
    This triggered a bug on Safari,"TypeError: Attempting to change the setter of
    an unconfigurable property."

-   Fixes [3157](https://github.com/Polymer/polymer/issues/3157). Data-bound text
    nodes in a dom-if show up when they should be hidden.

-   Fixes [3214](https://github.com/Polymer/polymer/issues/3214). Fix for
    `Polymer.dom(...)._query()` method doesn't exist which causes
    `Polymer.updateStyles()` to fail.

-   Fixes [3270](https://github.com/Polymer/polymer/issues/3270). Cannot bind to
    `isAttached`.

-   Fixes [3285](https://github.com/Polymer/polymer/issues/3285). SVGs inside an
    element's local DOM are styled improperly on IE.

-   Fixes [3295](https://github.com/Polymer/polymer/issues/3295). `getOwnerRoot`
    incorrect when queried after an element is added from within a document
    fragment.

-   Fixes [3308](https://github.com/Polymer/polymer/issues/3308). `Polymer.dom`
    element accessors can be incorrect when an element has no logical nodes.

-   Fixes [3321](https://github.com/Polymer/polymer/issues/3321).  Only let
    `dom-repeat` insert elements in attached if it has been previously detached;
    correctly avoid re-adding children in document fragments to an element's
    logical linked list if they are already there.

-   Fixes [3324](https://github.com/Polymer/polymer/issues/3324). Ensure `dom-if`
    moved into doc fragment is torn down.

-   Fixes [3337](https://github.com/Polymer/polymer/issues/3337). Fixes an issue
    that was detected when an a doc fragment that did not include an insertion
    point was added after one that did but before distribution.

## [Release 1.2.3](https://github.com/Polymer/polymer/tree/v1.2.3) (2015-11-16)

This release fixes the following issues:

-   Fixes [#2381](https://github.com/Polymer/polymer/issues/2381),
    [#2708](https://github.com/Polymer/polymer/issues/2708): Fix ordering
    issues with `custom-style` elements that apply custom properties defined
    in other `custom-style` elements.

## [Release 1.2.2](https://github.com/Polymer/polymer/tree/v1.2.2) (2015-11-12)

This release includes a number of small optimizations affecting startup time.

This release includes the following new features:

-   Fixes [#2511](https://github.com/Polymer/polymer/issues/2511). Add
    support for `strip-whitespace` attribute on templates. A template defined
    with the `strip-whitespace` attribute removes any empty text nodes from the
    template contents, which can result in a minor performance improvement.


-   Fixes [#2537](https://github.com/Polymer/polymer/issues/2537). Add optional
    incremental "chunked" rendering to `dom-repeat`.

    New properties:

    -   `initialCount`. Enables incremental rendering and sets initial render count
    -   `targetFramerate`. Determines the target frame budget for rendering the remaining items.

    If `initialCount` is set, after setting (or re-setting) `items`, the initial count will be rendered pre-paint, and all remaining items will be incrementally rendered at `requestAnimationFrame` timing. The template makes a best-effort attempt to hit
    the framerate specified by `targetFramerate`.

-   Fixes [#2690](https://github.com/Polymer/polymer/issues/2690). Add new
    `getComputedStyleValue` method to determine the computedn style of a custom
    property. Usage:

    <code><var>propertyValue</var> = <var>element</var>.getComputedStyleValue(<var>propertyName</var>);</code>

    This is equivalent to the native:

    <code><var>propertyValue</var> = getComputedStyle(<var>element</var>).getPropertyValue(<var>property</var>);</code>


This release includes the following bug fixes and improvements:

-   Fix compound bindings with braces in literals.

-   Fixes [#2639](https://github.com/Polymer/polymer/issues/2639). Fix for
    BEM-like CSS selectors under media queries. This issue affected CSS selectors
    that included two dashes inline, such as `foo--bar`.

-   Fixes [#2641](https://github.com/Polymer/polymer/issues/2641). Fix gestures
    when using shadow DOM polyfill.

-   Fixes [#2649](https://github.com/Polymer/polymer/issues/2649).
    `queryAllEffectiveChildren` method throws an exception.

-   Fixes [#2650](https://github.com/Polymer/polymer/issues/2650). Add support
    for short unicode escape sequences in CSS rules.

-   Fixes [#2660](https://github.com/Polymer/polymer/issues/2660). Fix parsing
    of custom properties with 'var' in value.

-   Fixes [#2670](https://github.com/Polymer/polymer/issues/2670). Fix
    for multiple consequent spaces present in CSS selectors.

-   Fixes [#2685](https://github.com/Polymer/polymer/issues/2685): `dom-if`
    throws exception if detached before instance is stamped.


## [Release 1.2.1](https://github.com/Polymer/polymer/tree/v1.2.1) (2015-10-29)

This release includes the following new features:

-   Add `deepContains` method to DOM API.

This release includes fixes for the following issues:

-   Make parsing of mixin declarations more robust.

-   [Fixes #2556](https://github.com/Polymer/polymer/issues/2556).
    `notifyPath`: Ensure outer paths aren't forwarded to instance props.

-   [Fixes #2610](https://github.com/Polymer/polymer/issues/2610).
    `isLightDescendant` should return false for self.

## [Release 1.2.0](https://github.com/Polymer/polymer/tree/v1.2.0) (2015-10-22)

This release includes the following new features:

-   Compound binding support. In place of a single binding annotation, you
    can now use a compound binding consisting of string literals and
    binding annotations:

        <span>Name: {{lastname}}, {{firstname}}</span>

    See [Compound bindings](/1.0/docs/devguide/data-binding#compound-bindings) for details.

-   New `observeNodes` method for tracking addition and removal of child
    nodes and distributed nodes. See [Observe added and removed children](/1.0/docs/devguide/local-dom#observe-nodes).

-   New _effective children_ APIs that provide a composition-aware view of
    light DOM children. See [Effective children](/1.0/docs/devguide/local-dom#effective-children).

-   Improvements to path API.
    [Fixes #2007](https://github.com/Polymer/polymer/issues/2007),
    [#2509](https://github.com/Polymer/polymer/issues/2509).

    *    Allows `set` to take paths with array keys, identified by
         <code>#<var>key</var></code>.
    *    Allows `notifyPath` to take paths with array indices.
    *    Exposes public `notifySplices` API.


-   [Fixes #2582](https://github.com/Polymer/polymer/issues/2582). Fix IE10 regressions
    in dom-repeat, dom-bind, and dom-module-inline

-   Fix deepEqual on Safari 9 due to Safari enumeration bug.

-   Add `Polymer.dom(node).notifyObservers` method to 'kick' observers, for example,
    when attributes change under Shadow DOM.


## [Release 1.1.5](https://github.com/Polymer/polymer/tree/v1.1.5) (2015-10-08)

This release includes the following new features:

-   Added `isLightDescendent` and `isLocalDescendent` utility methods to
    Polymer elements.

-   The `fire` method's `detail` argument can take any primitive value, not just objects.

This release fixes the following issues:

- [Fixes #2504](https://github.com/Polymer/polymer/issues/2504). Templatizer: Variables in the parent scope are not passed during initialization.

- [Fixes #2505](https://github.com/Polymer/polymer/issues/2504). Templatizer: Changes to array/object properties from the parent scope not notified.

## [Release 1.1.4](https://github.com/Polymer/polymer/tree/v1.1.4) (2015-09-25)

This release fixes the following issues:

-   [Fixes #2452](https://github.com/Polymer/polymer/issues/2452). Work around
    a [Chromium bug](https://code.google.com/p/chromium/issues/detail?id=529941)
    that caused memory to leak on page refresh.

-   [Fixes #2048](https://github.com/Polymer/polymer/issues/2048). Allow multiple
    paths to be linked using `linkPath`.


**Web Components polyfill updated to 0.7.13.** The latest version of `webcomponents-lite.js`
fixes an issue that affected SEO of Polymer 1.x apps.
{ .alert .alert-info }

## [Release 1.1.3](https://github.com/Polymer/polymer/tree/v1.1.3) (2015-09-04)

-   [Fixes #2403](https://github.com/Polymer/polymer/issues/2403). Fixes a regression
    that affected legacy projects using Chrome 39.

## [Release 1.1.2](https://github.com/Polymer/polymer/issues/2403) (2015-08-28)

-   [Fixes #2356](https://github.com/Polymer/polymer/issues/2356). Log a warning
    if the included style module cannot be found.

-   [Fixes #2357](https://github.com/Polymer/polymer/issues/2357). Styles included
    with `include=` are inserted _before_ any styles defined in the body of
    the style element.

-   [Fixes #2363](https://github.com/Polymer/polymer/issues/2363). Explicitly create
    `Polymer` object on `window` to satisfy strict mode.

-   [Fixes #2329](https://github.com/Polymer/polymer/issues/2329). Registration changes
    to support ES6 classes.

-   [Fixes #2341](https://github.com/Polymer/polymer/issues/2341). Branch `Polymer.dom` to
    use native dom methods under Shadow DOM for `appendChild`, `insertBefore`, `removeChild`,
    `replaceChild`, and `cloneNode`.

-   [Fixes #2334](https://github.com/Polymer/polymer/issues/2341). When composing nodes
    in shady DOM, check if a node is where we expect it to be before removing it from
    its distributed position. We do this because the node may have been moved by
    `Polymer.dom` in a way that triggered distribution of its previous location. The
    node is already where it needs to be so removing it from its parent when it's no
    longer distributed is destructive.

[Release 1.1.1](https://github.com/Polymer/polymer/tree/v1.1.1) (2015-08-20)

This release fixes a serious regression in Release 1.1 related to shady DOM distribution. Related issues:

- [Fixes #2276](https://github.com/Polymer/polymer/issues/2276): DOM API fails to select an element in a `dom-repeat` in Polymer 1.1.  ([commit](https://github.com/Polymer/polymer/commit/ee61627))

- [Fixes #2311](https://github.com/Polymer/polymer/issues/2311), [#2323](https://github.com/Polymer/polymer/issues/2323): When elements are removed from their previous position when they are added elsewhere, make sure to remove them from composed, not logical parent. ([commit](https://github.com/Polymer/polymer/commit/3d93116))

- [Fixes #2253](https://github.com/Polymer/polymer/issues/2253): Refine logical tree check and populate parents of insertion points with logical info only if necessary. [Fixes #2283](https://github.com/Polymer/polymer/issues/2283): when a node is removed, we need to potentially distribute not only its host but also its parent. ([commit](https://github.com/Polymer/polymer/commit/6619f6c))


**Other fixed issues:**

- [Fixes #2263](https://github.com/Polymer/polymer/issues/2263): Ensure `custom-style` can parse variable definitions in supported selectors (e.g. /deep/) without exception due to unknown css. ([commit](https://github.com/Polymer/polymer/commit/894492b))

- `array-selector`: Add `selectedItem` property. ([commit](https://github.com/Polymer/polymer/commit/d65acd0))

- `dom-repeat`: [Fixes #2297](https://github.com/Polymer/polymer/issues/2297), Where a
`dom-repeat` with a `sort` property threw an exception when removing 10 or more items at a time. ([commit](https://github.com/Polymer/polymer/commit/fccbd8a))

- [Fixes #2267](https://github.com/Polymer/polymer/issues/2267): Properly find dom-module for mixed case elements. ([commit](https://github.com/Polymer/polymer/commit/76c58b8))

- [Fixes #2304](https://github.com/Polymer/polymer/issues/2304): Avoid trying to read style data from imports that did not load. ([commit](https://github.com/Polymer/polymer/commit/0d1f206))

- Support for negative numbers in computed bindings. ([commit](https://github.com/Polymer/polymer/commit/fc53f50))


## [Release 1.1.0](https://github.com/Polymer/polymer/tree/v1.1.0) (2015-08-13)


**Shared style change**

This release includes support for a new style sharing mechanism. The new mechanism
should be used in place of `<link rel="import" type="css">`.

See [Shared styles and external stylesheets](/1.0/docs/devguide/styling#style-modules) in
the Developer guide for details.

As a result of these changes, several recommendations are changing:

*   `<link rel="import" type="css">` is deprecated and will eventually be removed. This syntax
    allowed users to use a pure .css file, but the file is parsed as HTML which is a
    security and performance concern.

*   We now recommend placing an element's `<style>` tag _inside_ the element's local DOM
    template, not outside. The older style is still supported, but does not perform as well
    as placing the styles inside the template.

**Fixed issues:**

- [Fixes #2251](https://github.com/Polymer/polymer/issues/2251): Resolve imported stylesheets against correct document. ([commit](https://github.com/Polymer/polymer/commit/68af666))

- Reduce `keySplices` to minimum change set before notifying. [Fixes #2261](https://github.com/Polymer/polymer/issues/2261). ([commit](https://github.com/Polymer/polymer/commit/f74d072))

- `array-selector`: Make `clearSelection` method public. ([commit](https://github.com/Polymer/polymer/commit/7497729))

- Add logical info if an element being added is an insertion point; do not add logical info for any element in a shady root. ([commit](https://github.com/Polymer/polymer/commit/45cb150))

- [Fixes #2235](https://github.com/Polymer/polymer/issues/2235). Manages logical information in shady distribution more directly by capturing it explicitly when needed and not whenever distribution is run. ([commit](https://github.com/Polymer/polymer/commit/21500fb))

- Ensure path fixup is applied correctly to styles in templates. ([commit](https://github.com/Polymer/polymer/commit/b22f3cd))

- `dom-module` no longer needs to eagerly upgrade custom elements since the web components polyfills do this automatically. ([commit](https://github.com/Polymer/polymer/commit/051e1bf))

##[v1.0.9](https://github.com/Polymer/polymer/tree/v1.0.9) (2015-08-07)

- `array-selector`. Numerous fixes around selection. Default selected to empty array. Add `isSelected` API. Add default values and update docs. ([commit](https://github.com/Polymer/polymer/commit/d4e7140), [commit](https://github.com/Polymer/polymer/commit/db9bda5), [commit](https://github.com/Polymer/polymer/commit/ca267a5), [commit](https://github.com/Polymer/polymer/commit/ba4bf38))

- [Fixes #2218](https://github.com/Polymer/polymer/issues/2218): Match style properties against scope transformed selector (not property unique selector). ([commit](https://github.com/Polymer/polymer/commit/c9e9062))

- Gestures: Make sure mouse position is not a factor for `.click()` in IE 10. ([commit](https://github.com/Polymer/polymer/commit/1a2fb4d))

- Gestures: Always trigger tap for synthetic click events. ([commit](https://github.com/Polymer/polymer/commit/1eef1a7))

- [Fixes #2193](https://github.com/Polymer/polymer/issues/2193): Implements workaround for [chromium bug #516550](https://code.google.com/p/chromium/issues/detail?id=516550) by adding `Polymer.RenderStatus.whenReady` and using it to defer `attached`. ([commit](https://github.com/Polymer/polymer/commit/2bffc4c))

- Fixes [vulcanize#209](https://github.com/Polymer/vulcanize/issues/209).
    Fixes issue where polyfilled templates may not upgrade correctly.
    ([commit](https://github.com/Polymer/polymer/commit/d78c934))

- Use `_clientsReadied` to avoid missing attribute->property sets in ready. ([commit](https://github.com/Polymer/polymer/commit/165f716))

- Make propagation of attribute changes at configure time more efficient. ([commit](https://github.com/Polymer/polymer/commit/b269c1d))

- [Fixes #1673](https://github.com/Polymer/polymer/issues/1673): Ensure instance effects exist before marshaling attributes. ([commit](https://github.com/Polymer/polymer/commit/7c83df5))

- Custom properties: Make properties replacement robust against properties which start with a leading semicolon (`;`). ([commit](https://github.com/Polymer/polymer/commit/3ea0333))

- [Fixes #2154](https://github.com/Polymer/polymer/issues/2154): Ensure `Polymer.dom` always sees wrapped nodes when Shadow DOM polyfill is in use. ([commit](https://github.com/Polymer/polymer/commit/fc90aa0))

- Use CSS parser's property stripping code in `custom-style`. ([commit](https://github.com/Polymer/polymer/commit/756ef1b))

- Gestures: Automatically filter mouse events without the left mouse button. ([commit](https://github.com/Polymer/polymer/commit/bbc3b57))

- [Fixes #2113](https://github.com/Polymer/polymer/issues/2113): Ensure custom-style rules that use `@apply` combined with defining properties apply correctly. ([commit](https://github.com/Polymer/polymer/commit/69a4aa5))

- More loosely match expression function names. ([commit](https://github.com/Polymer/polymer/commit/6cfa759))

- Update behaviors order.  [Fixes #2144](https://github.com/Polymer/polymer/issues/2144). ([commit](https://github.com/Polymer/polymer/commit/2a51661))

- `dom-if`: Cache `style.display` & `textContent` and re-apply on true. [Fixes #2037](https://github.com/Polymer/polymer/issues/2037). ([commit](https://github.com/Polymer/polymer/commit/2611285))

- [Fixes #2118](https://github.com/Polymer/polymer/issues/2118): force element `is` to be lowercase: mixing case causes confusion and breaks style shimming for type extensions. ([commit](https://github.com/Polymer/polymer/commit/c8905f9))

- Allow array mutation APIs to accept string & negative args. [Fixes #2062](https://github.com/Polymer/polymer/issues/2062). Brings the API more in line with native Array methods. ([commit](https://github.com/Polymer/polymer/commit/7e2ceeb))

- Fix #2107: improve binding expression parser to match valid JavaScript property names. ([commit](https://github.com/Polymer/polymer/commit/7560130))

##[Release 1.0.8](https://github.com/Polymer/polymer/tree/v1.0.8) (2015-07-23)

- Gestures: Disable track gestures when scrolling. ([commit](https://github.com/Polymer/polymer/commit/ee5177d))

- [Fixes #2125](https://github.com/Polymer/polymer/issues/2125): Add a `register` method to `dom-module` to support imperative creation. ([commit](https://github.com/Polymer/polymer/commit/861f4aa))

- Gestures: Move recognizer reset into start of event flow. ([commit](https://github.com/Polymer/polymer/commit/a7495f7))

- Remove alternate calculation for `_rootDataHost` ([commit](https://github.com/Polymer/polymer/commit/26663cd))

- `dom-bind`: Don't call `dom-change` when detached. ([commit](https://github.com/Polymer/polymer/commit/bdb8fa3))

- [Fixes #1998](https://github.com/Polymer/polymer/issues/1998): add API doc for `customStyle` property. ([commit](https://github.com/Polymer/polymer/commit/91577c9))

- Handle comment nodes correctly for `textContent` and `innerHTML`. ([commit](https://github.com/Polymer/polymer/commit/6d56d2b))

- Data binding: [Fixes #2098](https://github.com/Polymer/polymer/issues/2098): Ignore undefined values as initial config ([commit](https://github.com/Polymer/polymer/commit/1a5c391))

- Data binding: Allow setting non-index array properties. [Fixes #2096](https://github.com/Polymer/polymer/issues/2096). ([commit](https://github.com/Polymer/polymer/commit/f8cad94)).

- `dom-bind`: Added `render` method to dom-bind which can be called when async imports are used; documented template render functions ([commit](https://github.com/Polymer/polymer/commit/348896a)).

- Fixes #2039: Polymer.dom.flush now triggers Custom Elements polyfill mutations and includes an api (`Polymer.dom.addDebouncer(debouncer)`) for adding debouncers which should run at flush time. Template rendering debouncers are placed in the flush list. ([commit](https://github.com/Polymer/polymer/commit/89a767c))

- [Fixes #2010](https://github.com/Polymer/polymer/issues/2010) and [#1818](https://github.com/Polymer/polymer/issues/1818): Shady DOM mutations which trigger additional mutations are now successfully enqueued. ([commit](https://github.com/Polymer/polymer/commit/a26247b))

- `debounce` returns debouncer. ([commit](https://github.com/Polymer/polymer/commit/fb52120))


##[Release 1.0.7](https://github.com/Polymer/polymer/tree/v1.0.7) (2015-07-16)

- `dom-repeat`: Remove unnecessary keys bookkeeping. ([commit](https://github.com/Polymer/polymer/commit/3e02bfd))

- `dom-repeat`: Always use placeholders; fix insertion reference bug. ([commit](https://github.com/Polymer/polymer/commit/4a45d4f),
    [commit](https://github.com/Polymer/polymer/commit/5eda235))

- `dom-repeat`: Fix reuse logic to handle multiple mutations in same turn. [Fixes #2009](https://github.com/Polymer/polymer/issues/2009). ([commit](https://github.com/Polymer/polymer/commit/1bf5f6d))


- Add `Polymer.instanceof` & `isInstance`. [Fixes #2083](https://github.com/Polymer/polymer/issues/2083). ([commit](https://github.com/Polymer/polymer/commit/7954f93))

- Make `Polymer.dom(element).getDistributedNodes` and `Polymer.dom(element).getDestinationInsertionPoints()` always return at least an empty array (was generating exception under Shadow DOM); make `element.getContentChildNodes` and `element.getContentChildren` always return at least an empty array when a selector is passed that does not find a `<content>` (was generating exception under Shadow DOM). ([commit](https://github.com/Polymer/polymer/commit/f966381)). [Fixes #2081](https://github.com/Polymer/polymer/issues/2081).

- [Fixes #2077](https://github.com/Polymer/polymer/issues/2077): Workaround IE text node splitting issue that can make text bindings fail. ([commit](https://github.com/Polymer/polymer/commit/312d11f))

- [Fixes #2078](https://github.com/Polymer/polymer/issues/2078): When computing custom style properties, make sure the styling scope is valid when the element is attached to a `shadowRoot` whose host is not a Polymer element. ([commit](https://github.com/Polymer/polymer/commit/fab2ed7))


## [Release 1.0.6](https://github.com/Polymer/polymer/tree/v1.0.6) (2015-07-09)

**Fixed issues:**

- Basic support for host-context [\#1895](https://github.com/Polymer/polymer/issues/1895)

- Custom property resolver tripping over some selectors? [\#1938](https://github.com/Polymer/polymer/issues/1938)

- Parsing compressed CSS does not work [\#1927](https://github.com/Polymer/polymer/issues/1927)

- Support Polymer.dom().classList.contains [\#1907](https://github.com/Polymer/polymer/issues/1907)

- Add support for :host-context [\#1900](https://github.com/Polymer/polymer/issues/1900)

- Grey overlay in mobile Safari [\#1970](https://github.com/Polymer/polymer/issues/1970)

- `node.unlisten` removes native event listeners too often [\#1988](https://github.com/Polymer/polymer/issues/1988)

- `notifyPath` doesn't return as its documentation says [\#1966](https://github.com/Polymer/polymer/issues/1966)

- "TypeError: Cannot set property 'display' of undefined" when HTML comment is present inside a dom-if template that evaluates to truthy [\#1786](https://github.com/Polymer/polymer/issues/1786)

- `dom-repeat` in a falsy `dom-if` should hide newly stamped children [\#1751](https://github.com/Polymer/polymer/issues/1751)

- Typo in Polymer.mixin API documentation [\#2001](https://github.com/Polymer/polymer/issues/2001)

- Low-level changes for `iron-list` integration (`fire` & `modelForElemennt`) [\#2003](https://github.com/Polymer/polymer/issues/2003)

- Normalized event difference with ShadowDOM and Shady [\#1921](https://github.com/Polymer/polymer/issues/1921)

- DOM API `innerHTML` adds only first element [\#1972](https://github.com/Polymer/polymer/issues/1972)

- With Polymer\#1.05-update, style-sheets and custom-style-elements are not parsed in my project anymore [\#1974](https://github.com/Polymer/polymer/issues/1974)

- Expected behavior for `importNode`, `cloneNode` [\#1888](https://github.com/Polymer/polymer/issues/1888)

- \#1.0.5 computed property function name limitations? [\#2016](https://github.com/Polymer/polymer/issues/2016)


## [Release 1.0.5](https://github.com/Polymer/polymer/tree/v1.0.5) (2015-06-25)

**Fixed issues:**

- Bindings to concrete types not propagating correctly from template to collection [\#1839](https://github.com/Polymer/polymer/issues/1839)

- Setting individual array elements not working [\#1854](https://github.com/Polymer/polymer/issues/1854)

- CustomStyle change has no effect [\#1851](https://github.com/Polymer/polymer/issues/1851)

- With Shady DOM, `<content>` doesn't get passed to another element inside dom-if [#1902](https://github.com/Polymer/polymer/issues/1902)

- Provide a convenience method for setting `customStyle` and calling `updateStyles` [\#1915](https://github.com/Polymer/polymer/issues/1915)

- If an async callback throws an error, it's never removed from the callback list [\#1759](https://github.com/Polymer/polymer/issues/1759)

- dom-if: undefined is considered falsy only once [\#1742](https://github.com/Polymer/polymer/issues/1742)

- Setting readOnly **and** computed on properties [\#1925](https://github.com/Polymer/polymer/issues/1925)

- Uncaught TypeError: this.mixin is not a function [\#1911](https://github.com/Polymer/polymer/issues/1911)

- `Polymer.Base.async` "infinite loop" condition [\#1933](https://github.com/Polymer/polymer/issues/1933)

- Custom property resolver tripping over some selectors? [\#1938](https://github.com/Polymer/polymer/issues/1938)

- Annotated attribute binding issues [\#1874](https://github.com/Polymer/polymer/issues/1874)

- Parsing compressed CSS does not work [\#1927](https://github.com/Polymer/polymer/issues/1927)


## [Release 1.0.4](https://github.com/Polymer/polymer/tree/v1.0.4) (2015-06-17)

**Fixed issues:**

- Need a way to cancel track and tap from down [#1823](https://github.com/Polymer/polymer/issues/1823)

- `array-selector` doesn't work with multi unless toggle is specified [#1810](https://github.com/Polymer/polymer/issues/1810)

- Style shim only converts a single `::shadow` or `/deep/` in a selector [#1809](https://github.com/Polymer/polymer/issues/1809)

- Incorrect style for custom CSS properties when extending a native element [#1807](https://github.com/Polymer/polymer/issues/1807)

- Unwrapped `dom-if` causes `DOMException` [#1804](https://github.com/Polymer/polymer/issues/1804)

- `dom-if` fails to add rows to a table if they contain `<content>` [#1800](https://github.com/Polymer/polymer/issues/1800)

- Data binding causes infinite loop if value is NaN [#1799](https://github.com/Polymer/polymer/issues/1799)

- Do not resolve hash-only urls used for routing [#1757](https://github.com/Polymer/polymer/issues/1757)

- Content nodes in `dom-if` template do not distribute correctly [#1753](https://github.com/Polymer/polymer/issues/1753)

- An element that uses only values supplied by variable defaults can be styled incorrectly [#1752](https://github.com/Polymer/polymer/issues/1752)

- Nested `dom-repeat` with sort attribute shows duplicate entries when adding new items. [#1744](https://github.com/Polymer/polymer/issues/1744)

- `::before` / `::after` pseudo selectors in a `custom-style` [#1668](https://github.com/Polymer/polymer/issues/1668)

- Need `Polymer.Base.unlisten` to remove the event listener [#1639](https://github.com/Polymer/polymer/issues/1639)

- `custom-style` sometimes does not apply variables [#1637](https://github.com/Polymer/polymer/issues/1637)

- `dom-if` template doesn't stamp when its content contains a wrapped insertion point [#1631](https://github.com/Polymer/polymer/issues/1631)



## Documentation updates 10 June 2015

*   Documented [extending behaviors](/1.0/docs/devguide/behaviors#extending).
*   Corrected [`@apply` example](migration.html#layout-attributes) in Migration guide to show only one mixin per `@apply` statement.
*   Added documentation for [custom properties API](/1.0/docs/devguide/styling#style-api).
*   Moved `<script>` tags inside `<dom-module>` according to latest recommendations.
*   Updated documentation on [computed bindings](/1.0/docs/devguide/data-binding#annotated-computed) to
    cover literal arguments and no-arg computed bindings.
*   Added notes on several more renamed element and helper methods to the [migration guide](migration.html#methods).
*   Added notes about replacing `template-bound` and `templateInstance` when using the template [helper elements](migration.html#helper-elements).
*   Updated docs on [`ready` callback](/1.0/docs/devguide/registering-elements#ready-method) to clarify element initialization order.
*   Added a note about replacing the [`domReady` callback](migration.html#domready).
*   Fixed some accessibility issues related to text contrast and bad alt text.

## Release 1.0.3

Release 1.0.3 includes the following bug fixes:

-   `dom-if` showing invalid HTML. [Fixes #1632.](https://github.com/Polymer/polymer/issues/1632)

-   Custom CSS property fix for IE. ([commit](https://github.com/Polymer/polymer/commit/1f3b4ea))

-   Move non-webcomponents script unresolved case to `load` instead of synchronous. ([commit](https://github.com/Polymer/polymer/commit/2258920))

-   `dom-repeat`: re-insert rows when re-attaching. [Fixes #1498](https://github.com/Polymer/polymer/issues/1498).

-   Make `__styleScoped` a one-time optimization. [Fixes #1733](https://github.com/Polymer/polymer/issues/1733).


## Release 1.0.2

Release 1.0.2 includes the following bug fix:

-   Refactor ghost click code. ([commit](https://github.com/Polymer/polymer/commit/d96917a))

## Release 1.0.1

Release 1.0.1 includes the following bug fixes:

-   Add `sourceEvent` property to `track` event. ([commit](https://github.com/Polymer/polymer/commit/bdf191b))
-   Fix tap distance check: [Fixes #1652.](https://github.com/Polymer/polymer/issues/1652)
-   Fix `element.click()` sending `tap` on IE10 [Fixes #1640.](https://github.com/Polymer/polymer/issues/1640)

## Release 1.0

Release 1.0 includes the following bug fixes since 0.9:

* Custom style system performance optimizations and parsing robustness.
* Fixed Shady DOM style scoping on IE.
* Avoid binding `undefined` string into textContent and inputs.
* Allow `behaviors` to accept nested arrays of behaviors.
* Properly update `dom-repeat` rendering following array mutations when both `sort` and `filter` are used.
* Support literal strings & numbers in inline computed functions.
* Support no-argument functions in inline computed functions.
* Update Shady DOM distribution when using `Polymer.dom(node).classList` or `Polymer.dom(node).setAttribute` on distribution candidates.
* Fixed gesture exception when dragging outside the document.
* Fix ordering of behavior application.
* Allow `dom-bind` to be imperatively created and filled with elements to be bound.
* Fixed tap not firing the first time after tracking another element.
* Fix `dom-bind` to ensure dependencies have resolved before stamping.
* Fixed certain use cases of dynamically stamping a `<content>` using `dom-if`.
* Prevent mustache content from being set to `<input>` value on IE.
* Added warnings for common user mistakes.
* Fix `dom-bind` from improperly scoping element classes.
* Allow observation and binding of `array.length`.
* Fix `:host` specificity for custom style properties.
* Added `Polymer.version` property.

### Documentation correction

The Migration guide has been updated to reflect that the
[`iron-flex-layout`](migration.html#layout-attributes)
custom properties are the recommended replacement for layout attributes in
Release 1.0. The layout classes previously described
in the Migration guide for Releases 0.8 and 0.9 will continue to work for
now, but are deprecated.

## Release 0.9

A number of APIs changed between 0.8-rc.2 and 0.9. This section summarizes the changes.

### Element registration changes

#### <span class="breaking">breaking change:</span> Mixins replaced by behaviors

Mixins have been replaced by _behaviors_, which can define properties, add
lifecycle callbacks, observers, and event listeners.

Specify behaviors using the `behaviors` array on the prototype:

```
Polymer({
  is: "enhanced-element",
  behaviors: [CoolBehavior]
});
```

For details, see [Behaviors](devguide/behaviors.html).

#### <span class="breaking">breaking change:</span> constructor renamed to factoryImpl

When creating a custom constructor, the configuration function is
renamed from `constructor` to `factoryImpl`, to aid compilation tools.

#### <span class="breaking">breaking change:</span> hostAttributes changes {#host-attributes}

Static attributes defined in `hostAttributes` can now be overridden from markup.

As a part of this change, the `class` attribute can no longer be set from
`hostAttributes`. If you need to set classes on the host, you can do so
imperatively (for example, by calling `classList.add` from the `ready` callback).

### <span class="breaking">breaking change:</span> Property observer changes

The format for property observers has changed to be more like the format for computed properties:

Before:

```
observers: {
  'preload src size': 'updateImage'
},

updateImage: function(preload, src, size) {
  // ... do work using dependent values
}
```

After:

```
observers: [
  'updateImage(preload, src, size)'
],

updateImage: function(preload, src, size) {
  // ... do work using dependent values
}
```

Also, property observers are not invoked until **all** dependent properties are defined.
If the observer is not being invoked, make sure all dependent properties have non-`undefined`
default values set.

### Styling changes

#### Custom property support

This release includes several enhancements and changes to custom property support:

*   Custom property support is enabled for all elements. The `enableCustomStyleProperties`
    flag is no longer required.

*   <span class="breaking">breaking change:</span> Style mixins are applied with `@apply` instead of `mixin`.

        @apply --my-style-mixin

*   The `var` function allows you to supply a default value, which is used if the custom
    property is not defined:

    ``` css
    background-color: var(--my-background, red);
    ```

*   Custom properties and mixins can be used inside a mixin.

    ``` css
    --foo: {
      color: var(--my-color);
      @apply --my-theme;
    };
    ```

#### <span class="breaking">breaking change:</span> x-style renamed to custom-style

The `custom-style` element replaces the experimental `x-style` element.

Custom properties and CSS mixins can now be applied inside a `custom-style` element.

For more details, see [Custom element for document styling](/1.0/docs/devguide/styling#custom-style).

#### Support for :root selector

Styling now supports the [`:root` pseudo-class](https://developer.mozilla.org/en-US/docs/Web/CSS/:root)
inside `custom-style`. In the context of a `custom-style` element, the `:root` selector lets
you define a custom property that applies to all custom elements. (In 0.8, applying a property to
all custom elements required a more expensive `*` selector.)

### Data binding changes

#### <span class="breaking">breaking change:</span> Template helper elements no longer experimental

The template helper elements are no longer experimental, and have been renamed:

*  `x-repeat` is now `dom-repeat`.
*  `x-bind` is now `dom-bind`.
*  `x-array-selector` is now `array-selector`.
*  `x-if` is now `dom-if`.

#### Nested template support

As of 0.9, nested templates can access their parent's scope. See [Nesting dom-repeat templates](/1.0/docs/devguide/templates#nesting-templates) for details.

#### <span class="breaking">breaking change:</span> Array mutation methods

In 0.8, an array observer was used to monitor the mutation of arrays, so adding an
item to an array was observed automatically, but changing a value in an array item required
the `setPathValue` method (now renamed to `set`).

0.9 replaces the array observers with a set of array mutation methods. For array changes
to be observed by data bindings, computed properties, or observers, you must use the provided
helper methods: `push`, `pop`, `splice`, `shift`, and `unshift`. Like `set`, the first argument
is a string path to the array.

```
this.push('users', { first: "Stephen", last: "Maturin" });
```

### Gesture support

This release adds limited gesture support. For details, see [Gesture events](/1.0/docs/devguide/gesture-events).

### Content security policy (CSP) {#csp}

CSP issues in the initial release of 0.8 have been resolved. CSP still requires separate script and
HTML files.

The CSP-specific functions of [`vulcanize`](https://github.com/Polymer/vulcanize) have been
split into a separate utility, [`crisper`](https://github.com/PolymerLabs/crisper). To prepare a site for
deployment in a CSP environment, you can use a command like this:

    vulcanize --inline-scripts --inline-css target.html | \
        crisper --html build.html --js build.js

For more details on the `vulcanize` arguments, see the [README](https://github.com/Polymer/vulcanize).

**Note:** The latest versions of `vulcanize` are **not** compatible with Polymer 0.5.
For 0.5 projects, use `vulcanize` versions **earlier than 1.0**. `vulcanize` 0.7.10 is the latest version
supporting 0.5 projects.
{ .alert .alert-info }

### Utility functions

#### <span class="breaking">breaking change:</span> transform and translate3d API changes

The method signatures for the `transform` and `translate3d` utility methods have
changed to match the other utility methods. The `node` argument is now the last argument,
and is optional. If `node` is omitted, the methods act on `this`.

Before:

``` js
transform(node, transform);
translate3d(node, x, y, z);
```

After:

```
transform(transform, node);
translate3d(x, y, z, node);
```

#### <span class="breaking">breaking change:</span> fire API changes

The `fire` method now takes three arguments:

```
fire(type, [detail], [options]);
```

The `options` object can contain the following properties:

*   `node`. Node to fire the event on. Defaults to `this`.
*   `bubbles`. Whether the event should bubble. Defaults to `true`.
*   `cancelable`. Whether the event can be canceled with `preventDefault`. Defaults to `false`.

#### New utilities

The following utility functions were added since 0.8-rc.2 _or_ were missing
from the earlier documentation:

*   `$$`
*   `cancelAsync`
*   `debounce`
*   `cancelDebouncer`
*   `flushDebouncer`
*   `isDebouncerActive`

For details, see [Instance methods](/1.0/docs/devguide/instance-methods).

### Bug fixes

Release 0.9 includes a number of bug fixes. A few notable fixes are listed below.


- The `id` attribute can now be data bound. (Note that if `id` is data bound,
  the element is omitted from `this.$`.)

- Default values are now set correctly for read-only properties.

- An identifier with two dashes in the middle (`c--foo`) was improperly interpreted
  as a CSS custom property name.

- Fixed several issues with computed bindings, including one where the computing function
  was not invoked unless its dependent property was included in another binding.


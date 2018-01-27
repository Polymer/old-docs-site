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

## [Release 2.4.0](https://github.com/Polymer/polymer/releases/tag/v2.4.0) (2018-01-26) {#v-2-4-0}

See our [blog post on Polymer 2.4](../../blog/2018-01-25-polymer-2-4) for more details. Here's a
rundown of the changes:

-   TypeScript support has been added. To use TypeScript, simply add references to the types
    for the library imports that you use from the `types` folder. For example:

    `my-element.html`
    ```html
    <link rel="import" href="bower_components/polymer/polymer-element.html>
    <dom-module id="my-element"><template>...</template></dom-module>
    <script src="my-element.js">    
    
    ```

    `my-element.ts`
    ```ts
    /// <reference path="./bower_components/polymer/types/polymer-element.d.ts" />`
    class MyElement extends Polymer.Element {
        ...
    }
    ```

-   A subset of properties functionality has been broken out into a mixin called `PropertiesMixin`.
    Use the `PropertiesMixin` to create new, lightweight base classes that have Polymer's
    functionality for defining declarative properties, creating property accessors, and syncing 
    properties with attributes.

    Example {.caption}

    ```html
    <link rel="import" href="bower_components/polymer/lib/mixins/properties-mixin.html">
    <script>
    class MyPropertiesElement extends Polymer.PropertiesMixin(HTMLElement) {
      // Define properties to watch. You may only specify the property’s name and type.
      static get properties() { 
        return {
            name: String
        }
      }
      // Called whenever the declared properties change. 
      _propertiesChanged(currentProps, changedProps, oldProps) {
        // Render the changed content.
      this.textContent = `Hello, ${this.name}`;
      }
    }
    </script>
    ```

-   Returning a string from a static template getter is now deprecated. Instead, a static template
    getter should return an instance of `HTMLTemplateElement`. 

    This change is **non-breaking**. Returning a string will still work in this release, but will
    generate a console warning.

    Polymer 2.4 adds the `Polymer.html` helper function to facilitate returning an
    `HTMLTemplateElement` from a static template getter. You can use it like this:

    Example {.caption}

    ```html
    <link rel="import" href="bower_components/polymer/lib/polymer-element.html">
    <script>
    class MyAppElement extends Polymer.Element {
        static get template() {
        return Polymer.html`<div>I'm a template</div>
                            <div>[[withBindings]]</div>
                            <button on-click="clickHandler">Click me!</button>`
        }
        ...
    }
    customElements.define('my-app-element', MyAppElement);
    </script>
    ```
    
This release also includes bug fixes. For now, please see the [Changelog](https://github.com/Polymer/polymer/commit/cb88252debc7c06c458ca45595fbc3afa57e7a2c) for the details.

## [Release 2.3.1](https://github.com/Polymer/polymer/releases/tag/v2.3.1) (2017-12-07) {#v-2-3-1}

This release fixes a single issue introduced in release 2.3.0:

-   [#4975](https://github.com/Polymer/polymer/issues/4975). Fixed a styling bug introduced in 
    2.3.0 that could cause incorrect ordering of styles included using `<style include>`, or throw 
    an exception if a `<style>` was not a direct child of the template.

## [Release 2.3.0](https://github.com/Polymer/polymer/releases/tag/v2.3.0) (2017-12-05) {#v-2-3-0}

This release includes one new feature:

-   Property observers can now take a function reference in addition to taking a string name.

    Example {.caption}

    ```
    class XFoo extends Polymer.Element {
      static get properties() {
        return {
          prop: {
            type: String,
            observer: function (newProp, oldProp) {
              return this.prop2Changed(newProp, oldProp);
            }
          }
        };
      }
    }
    ```
This release also includes the following fixes:

-   [#3626](https://github.com/Polymer/polymer/issues/3626) `dom-repeat` will now always resort
    and/or refilter an array when an item changes. (Previously, replacing an array item using `set` acted differently than replacing an array item using `splice`.)

-   [#4892](https://github.com/Polymer/polymer/pull/4892) Do not collapse multiple styles into a
    single style, which allows for lower memory usage in browsers with native Shadow DOM. This
    primarily affects style sharing allows browsers to recognize shared styles as similar so
    that they can perform optimizations.

    Note, currently the ShadyCSS polyfill always collapses multiple styles into a single 
    element. This means that users of either the `@apply` shim or ShadyCSS scoping shim will still
    have only a single style element in the element template.

-   [#4961](https://github.com/Polymer/polymer/issues/4961). `touchend` listeners do not need to    
    be passive to enable more performant scrolling.

    With this change, most of the tradeoffs with enabling `passiveTouchGestures` disappear. 
    For example, you can prevent a synthetic `click` event from being generated from a 
    tap by calling `preventDefault` from the `up` listener.

    The only limitation when using `passiveTouchGestures` is that you can't control
    scrolling from `track`, `down`, and `move` gesture event listeners.

## [Release 2.2.0](https://github.com/Polymer/polymer/releases/tag/v2.2.0) (2017-10-18) {#v-2-2-0}

This release includes one new feature:

-   `:dir()` CSS selector is now supported.

    The `:dir()` selector allows for writing text-orientation specific styling. [More information on MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/:dir).

    For elements that extend `Polymer.Element`, add the `Polymer.DirMixin` mixin to use `:dir()` styling. Elements that use the legacy `Polymer({})` call automatically include this mixin.

    Use of `:dir()` requires the application to set the `dir` attribute on `<html>`. All 
    elements will use the same direction.

    Individual elements can opt-out of the global direction by setting the `dir` attribute in HTML 
    or at `ready()`, but these elements must from then on be handled manually. Setting `dir` on an
    ancestor (other than `html`) has no effect.

## [Release 2.1.1](https://github.com/Polymer/polymer/releases/tag/v2.1.1) (2017-09-28) {#v-2-1-1}

This release includes a fix for the following issue:

-   [#4679](https://github.com/Polymer/polymer/issues/4679) Work around 
    [Chrome deprecation](https://crbug.com/523952) of styling main document from HTML  
    Imports.

    Note that this release should prevent future problems when the feature is removed, 
    but **doesn't** prevent the deprecation warning being logged to the console.

## [Release 2.1.0](https://github.com/Polymer/polymer/releases/tag/v2.1.0) (2017-09-19) {#v-2-1-0}

This release includes the following new feature:

-   New global `passiveTouchGestures` setting. 

    The `passiveTouchGestures` setting allows an app to specify that gesture events like `tap` and 
    `track` generated from touch will not be preventable, allowing for better scrolling performance.

    Since this could break elements or apps that depended on being able to call 
    `gestureEvent.preventDefault()` to prevent scrolling, this is an opt-in setting.

    Use `Polymer.setPassiveTouchGestures(true)` to enable. See 
    [Native browser gesture handling](devguide/gesture-events#gestures-and-scroll-direction) 
    for more information on gesture events and native browsers gestures.

This release includes the following bug fixes and enhancements:

-   An assortment of minor changes to help facilitate easier automated conversions to ES Modules 
    for Polymer 3.x
-   Fix event path for gestures generated by touch events.
-   Add documentation for `Polymer.sanitizeDOMValue`
      - `sanitizeDOMValue` is a global callback that can be used to plug into XSS sanitization libraries before the databinding system sets values. See [Global settings](devguide/settings)
      for more information.
-   Fix ordering of `<link rel="import" type="css">` stylesheets to always be prepended, more 
    aligned with their usage in 1.x.
-   The `<dom-bind>` element is now exposed on Polymer as `Polymer.DomBind`.
-   All `<dom-*>` elements are now explicitly styled as `display: none`.


## [Release 2.0.2](https://github.com/Polymer/polymer/releases/tag/v2.0.2) (2017-07-14) {#v-2-0-2}

This release includes the following fixes and enhancements:

-   Full Closure Compiler compatibility with Polymer Pass version 2.
    `--polymer_version=2` flag to Closure Compiler
-   [#4597](https://github.com/Polymer/polymer/issues/4597). Fix for elements that take templates provided as light DOM children.
-   Fix DocumentFragment issues on IE 11.
-   [#4643](https://github.com/Polymer/polymer/issues/4643) Allow spaces inside of functions in template binding syntax.
-   [#4650](https://github.com/Polymer/polymer/issues/4650) Fix dom-repeat to always notify on observed properties changing.


## [Release 2.0.1](https://github.com/Polymer/polymer/releases/tag/v2.0.1) (2017-05-25) {#v-2-0-1}

This release includes a fix for the following issue:

-   [#4601](https://github.com/Polymer/polymer/issues/4601) Observers not firing when an element is stamped by `<iron-list>`.


## [Release 2.0.0](https://github.com/Polymer/polymer/releases/tag/v2.0.0) (2017-03-15) {#v-2-0-0}

The following changes have been made since 2.0.0-rc.1.

-   Hybrid elements can make template instances with mutable data.

-   `dom-change` events now fire with the `composed` flag.

-   Allow `properties`, `behaviors`, `observers`, `hostAttributes`, and `listeners` to be set in
    `Polymer({})` calls.

-   Behaviors can only be set on the element prototype.

-   Reintroduce `beforeRegister` to the legacy API to install dynamic property effects. In a
    difference from 1.x,  `is` property cannot be set in this function.

-   Maintain 1.x ordering of `ready()` lifecycle call, where children will always `ready()` before
    the parent.

-   Made data binding system more extensible, allowing elements to override template binding
    functions.

    -   Adds override points for `_parseBindings` and `_evaluateBinding`.

    -   Add override points for `_enableProperties` and `_flushProperties`.

    -   Adds support for runtime template binding using `_stampTemplate`.

    -   More information on using binding overrides in
        [issue #4510](https://github.com/Polymer/polymer/pull/4510#issuecomment-292625579)

-   Add `$` ID map to `dom-bind` elements.

-   Support listening to Gesture events with `dom-bind` elements.

-   Start supporting compilation with Closure Compiler in 'ADVANCED' mode.

-   Allow `setProperties` to set readOnly properties:

    ```js
    this.setProperties({readOnlyProp: value}, true)`
    ```

-   Prevent properties from reverting to default value after boot when the property has no observers.

-   Fix `linkPaths()` to handle aliased paths.

-   Fix for observers firing before `ready()`.

-   Refactor `PropertyEffects` mixin with a more usable API. Add new static API for creating
    property effects which mirror the instance versions:

    - `PropertyEffects.addPropertyEffect`
    - `PropertyEffects.createPropertyObserver`
    - `PropertyEffects.createMethodObserver`
    - `PropertyEffects.createNotifyingProperty`
    - `PropertyEffects.createReadOnlyProperty`
    - `PropertyEffects.createReflectedProperty`
    - `PropertyEffects.createComputedProperty`
    - `PropertyEffects.bindTemplate`

    These static methods are not necessary if you're creating a standard Polymer element, but could
    be helpful for using the `PropertyEffects` mixin on its own.

-   Fix a bug where setting a property inside of a notification event listener could break the
    guarantee that clients should be ready before host side effects are processed.

For a release-by-release breakdown of the release candidates, see the
[raw release notes](https://github.com/Polymer/polymer/releases) on GitHub.


## [Release 2.0.0-rc.1](https://github.com/Polymer/polymer/releases/tag/v2.0.0-rc.1) (2017-03-06) {#v-2-0-0-rc.1}

The following notable changes have been made since the 2.0 Preview announcement.

-   The `config` getter on element classes has been replaced by individual `properties` and
    `observers` getters, more closely resembling the 1.x syntax.

    ```js
    static get properties() {
      return {
        aProp: String,
        bProp: Number
      }
    }
    static get observers() {
      return [
        '_observeStuff(aProp,bProp)'
      ]
    }
    ```

-   1.x-style dirty checking has been reinstated for better performance. An optional mixin is
    available for elements to skip dirty checking of objects and arrays, which may be more easy to
    integrate with some state management systems. For details, see
    [Using the MutableData mixin](devguide/data-system#mutable-data) in Data system concepts.

-   Support for dynamically-created `custom-style` elements has been added.

-   Support for the external style sheet syntax, `<link rel="import" type="css">` has
    been added. This was deprecated in 1.x, but will be retained until an alternate solution is
    available for importing unprocessed CSS.

-   New properties `rootPath` and `basePath` were added to `Polymer.Element` to allow authors
    to configure how URLs are rewritten inside templates. For details, see the
    [Update URLs in templates](./upgrade#urls-in-templates) in the Upgrade guide.



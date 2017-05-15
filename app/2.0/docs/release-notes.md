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



---
layout: default
type: about
shortname: Docs
title: Release notes
subtitle: About this release
---

{% include toc.html %}

<style>
.breaking {
  color: red;
  text-transform: capitalize;
  }
</style>

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

*   Documented [extending behaviors](devguide/behaviors.html#extending).
*   Corrected [`@apply` example](migration.html#layout-attributes) in Migration guide to show only one mixin per `@apply` statement.
*   Added documentation for [custom properties API](devguide/styling.html#style-api).
*   Moved `<script>` tags inside `<dom-module>` according to latest recommendations.
*   Updated documentation on [computed bindings](devguide/data-binding.html#annotated-computed) to
    cover literal arguments and no-arg computed bindings.
*   Added notes on several more renamed element and helper methods to the [migration guide](migration.html#methods).
*   Added notes about replacing `template-bound` and `templateInstance` when using the template [helper elements](migration.html#helper-elements).
*   Updated docs on [`ready` callback](devguide/registering-elements.html#ready-method) to clarify element initialization order.
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

    Polymer({
      is: "enhanced-element",
      behaviors: [CoolBehavior]
    });

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

    observers: {
      'preload src size': 'updateImage'
    },

    updateImage: function(preload, src, size) {
      // ... do work using dependent values
    }

After:

    observers: [
      'updateImage(preload, src, size)'
    ],

    updateImage: function(preload, src, size) {
      // ... do work using dependent values
    }

Also, property observers are not invoked until **all** dependent properties are defined.
If the observer is not being invoked, make sure all dependent properties have non-`undefined`
default values set.

### Styling changes

#### Custom property support

This release includes several enhancements and changes to custom property support:

*   Custom property support is enabled for all elements. The `enableCustomStyleProperties` 
    flag is no longer required.

*   <span class="breaking">breaking change:</span> Style mixins are applied with `@apply` instead of `mixin`.

        @apply(--my-style-mixin)

*   The `var` function allows you to supply a default value, which is used if the custom
    property is not defined:

        background-color: var(--my-background, red);

*   Custom properties and mixins can be used inside a mixin.

        --foo: {
          color: var(--my-color);
          @apply(--my-theme);
        };


#### <span class="breaking">breaking change:</span> x-style renamed to custom-style

The `custom-style` element replaces the experimental `x-style` element.

Custom properties and CSS mixins can now be applied inside a `custom-style` element.

For more details, see [Custom element for document styling](devguide/styling.html#custom-style).

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

As of 0.9, nested templates can access their parent's scope. See [Nesting dom-repeat templates](devguide/templates.html#nesting-templates) for details.

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

This release adds limited gesture support. For details, see [Gesture events](devguide/events.html#gestures).

### Content security policy (CSP) {#csp}

CSP issues in the initial release of 0.8 have been resolved. CSP still requires separate script and
HTML files.

The CSP-specific functions of [`vulcanize`](https://github.com/Polymer/vulcanize) have been 
split into a separate utility, [`crisper`](https://github.com/PolymerLabs/crisper). To prepare a site for
deployment in a CSP environment, you can use a command like this:

    vulcanize --inline-scripts --inline-css target.html | \
        crisper --html build.html --js build.js

For more details on the `vulcanize` arguments, see the [README](https://github.com/Polymer/vulcanize).

**Note:** The latest versions of `vulcanize` are **not** compatible with {{site.project_title}} 0.5.
For 0.5 projects, use `vulcanize` versions **earlier than 1.0**. `vulcanize` 0.7.10 is the latest version
supporting 0.5 projects.
{: .alert .alert-info }

### Utility functions

#### <span class="breaking">breaking change:</span> transform and translate3d API changes

The method signatures for the `transform` and `translate3d` utility methods have
changed to match the other utility methods. The `node` argument is now the last argument,
and is optional. If `node` is omitted, the methods act on `this`.

Before:

    transform(node, transform);
    translate3d(node, x, y, z);

After:

    transform(transform, node);
    translate3d(x, y, z, node);

#### <span class="breaking">breaking change:</span> fire API changes

The `fire` method now takes three arguments:

    fire(type, [detail], [options]);

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

For details, see [Utility functions](devguide/utility-functions.html).

### Bug fixes

Release 0.9 includes a number of bug fixes. A few notable fixes are listed below.


- The `id` attribute can now be data bound. (Note that if `id` is data bound,
  the element is omitted from `this.$`.)

- Default values are now set correctly for read-only properties.

- An identifier with two dashes in the middle (`c--foo`) was improperly interpreted
  as a CSS custom property name.

- Fixed several issues with computed bindings, including one where the computing function
  was not invoked unless its dependent property was included in another binding.


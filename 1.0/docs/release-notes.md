---
layout: default
type: guide
shortname: Docs
title: Release notes
subtitle: Guide
---

{% include toc.html %}

<style>
.breaking {
  color: red;
  text-transform: capitalize;
  }
</style>

## Release 0.9

A number of APIs changed between 0.8-rc.2 and 0.9. This document summarizes the changes.

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

As of 0.9, nested templates can access their parent's scope. See [Nesting dom-repeat templates]
(devguide/templates.html#nesting-templates) for details.

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


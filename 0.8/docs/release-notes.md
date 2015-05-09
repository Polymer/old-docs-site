---
layout: default
type: guide
shortname: Docs
title: Release notes
subtitle: Guide
---

{% include toc.html %}

## Release 0.9

A number of APIs changed between 0.8-rc.2 and 0.9. This document summarizes the changes.

### Element registration changes

#### Mixins replaced by behaviors

Mixins have been replaced by _behaviors_, which can define properties, add
lifecycle callbacks, observers, and event listeners.

Specify behaviors using the `behaviors` array on the prototype:

    Polymer({
      is: "enhanced-element",
      behaviors: [CoolBehavior]
    });

For details, see [Behaviors](behaviors.html).

#### `constructor` renamed to `factoryImpl`

When creating a custom constructor, the configuration function is
renamed from `constructor` to `factoryImpl`, to aid compilation tools.

### Styling changes

#### Custom property support

This release includes several enhancements and changes to custom property support:

*   Custom property support is enabled for all elements. The `enableCustomStyleProperties` 
    flag is no longer required.

*   Style mixins are applied with `@apply` instead of `mixin`.

        @apply(--my-style-mixin)

*   The `var` function allows you to supply a default value, which is used if the custom
    property is not defined:

        background-color: var(--my-background, red);

*   Custom properties and mixins can be used inside a mixin.

        --foo: {
          color: var(--my-color);
          @apply(--my-theme);
        };


#### `x-style` renamed to `custom-style`

The `custom-style` element replaces the experimental `x-style` element.

Custom properties and mixins can now be applied inside a `custom-style` element.

#### Support for `:root` selector

Styling now supports the [`:root` pseudo-class](https://developer.mozilla.org/en-US/docs/Web/CSS/:root)
inside `<custom-style>`. The `:root` selector the matches the document's root scope. <<<Waiting for primer updates for more details>>>

### Data binding changes

#### Template helper elements no longer experimental

The template helper elements are no longer experimental, and have been renamed:

*  `x-repeat` is now `dom-repeat`.
*  `x-bind` is now `dom-bind`.
*  `x-array-selector` is now `array-selector`.
*  `x-if` is now `dom-if`.

#### Array mutation methods

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

### Utility functions

#### `transform` and `translate3d` API changes

The method signatures for the `transform` and `translate3d` utility methods have
changed to match the other utility methods. The `node` argument is now the last argument,
and is optional. If `node` is omitted, the methods act on `this`.

Before:

    transform(node, transform);
    translate3d(node, x, y, z);

After:

    transform(transform, node);
    translate3d(x, y, z, node);

#### `fire` API changes

The `fire` method now takes three arguments:

    fire(type, [detail], [options]);

The `options` object can contain the following properties:

*   `node`. Node to fire the event on. Defaults to `this`.
*   `bubbles`. Whether the event should bubble. Defaults to `true`.
*   `cancelable`. Whether the event can be canceled with `preventDefault`. Defaults to `false`.

#### New utilities

New utility functions added or newly documented since 0.8-rc.2:

*   `cancelAsync`
*   `debounce`
*   `cancelDebouncer`
*   `flushDebouncer`
*   `isDebouncerActive`

For details, see [Utility functions](utility-functions.html).

### Bug fixes

Release 0.9 includes a number of bug fixes. A few notable fixes are listed below.

- Static attributes defined in `hostAttributes` can now be overridden from markup.

- The `id` attribute can now be data bound. (Note that if `id` is data bound,
  the element is omitted from `this.$`.)

- Default values are now set correctly for read-only properties.

- An identifier with two dashes in the middle (`c--foo`) was improperly interpreted
  as a CSS custom property name.


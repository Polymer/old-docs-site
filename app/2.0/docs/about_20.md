---
title: About Polymer 2.0
---

<!-- toc -->

Polymer 2.0 is designed to support the new custom elements v1 and shadow DOM v1 specifications being
implemented by most major browser vendors, while providing a smooth migration path for Polymer
 1.x users.

Polymer 2.0 also makes improvements in several areas:

*   **Improved interoperability.** By removing the need to use Polymer.dom for DOM manipulation,
    Polymer 2.0 makes it easier to use Polymer components with other libraries and frameworks. In
    addition, the shady DOM code has been separated out into a reusable polyfill, instead of being
    integrated into Polymer.
*   **Data system improvements.** Polymer 2.0 includes targeted improvements to the data system.
    These changes make it  easier to reason about and debug the propagation of data through and
    between elements.
*   **More standard.** Polymer 2.0 uses standard ES6 classes and the standard custom elements v1
    methods for defining elements, instead of a Polymer factory method. You can mix in features
    using standard JavaScript (class expression mixins) instead of `Polymer` behaviors. (The
    `Polymer` factory method is still supported using a compatibility layer.)

**Unreleased preview code.** Currently, Polymer 2.0 is available as a branch of the Polymer library
repo on GitHub. **This is an active development branch, and should not be used in production.** By
all means, use the `2.0-preview` branch to experiment, to provide feedback, and to familiarize
yourself with the latest versions of the custom elements and shadow DOM specifications. Just don't
build production code on it quite yet. Please.
{.alert .alert-warning}

Some tests currently fail on non-Chrome browsers; these will be addressed soon, but in the short
term Chrome Canary is your best bet.

Polymer 2.0 introduces a number of breaking changes—many of which are required by new custom
elements v1 and shadow DOM v1 specifications. Expect to see more changes as this new version nears
release.

The following sections describes the major changes in Polymer 2.0. For details on upgrading elements
to Polymer 2.0, see the [upgrade guide](upgrade).

## Custom elements v1

Polymer 2.0 elements target the custom elements v1 API, which makes several changes to the v0
version of the spec used in Polymer 1.x. In particular:

*   The custom elements v1 spec defines elements using ES6 classes, instead of prototypes.

    Polymer 2.0 lets you use this native ES6 form by providing an ES6 base class (`Polymer.Element`)
    for your elements to extend. In addition, legacy elements using the `Polymer` factory method are
    supported with a Polymer 1.x compatibility layer.

*   The new spec has some changes to the lifecycle callbacks. In particular, instead of a created
    callback it invokes the class constructor. The spec also imposes new restrictions on what can be
    done in the constructor (equivalent to the `created` callback in Polymer 1.x).

*   In addition, although they are supported in the specification, Polymer 2.0 does not currently
    support type-extension elements (`is=`).

The following sections describe these changes in more detail.

For general information on the custom elements v1 specification, see [Custom elements v1: reusable web components](https://developers.google.com/web/fundamentals/primers/customelements/?hl=en) on Web Fundamentals.

### Lifecycle changes {#lifecycle-changes}

When creating class-based elements, use the new native lifecycle methods (called "custom element
reactions"). When creating legacy elements using the Polymer factory method, use the legacy Polymer
callback names.


<table>
  <tr>
   <td><strong>Reaction/callback name</strong>
   </td>
   <td><strong>Notes</strong>
   </td>
  </tr>
  <tr>
   <td><code>constructor (</code>native<code>)</code>
<p>
<code>created</code> (legacy)
   </td>
   <td>The custom elements v1 spec forbids reading attributes, children, or parent information from
   the DOM API in the <code>constructor</code> (<code>created</code> callback in the legacy API).
   Likewise, attributes and children may not be added in the <code>constructor</code>.  Any such
   work must be deferred (for example, until <code>connectedCallback</code>).

The legacy <code>created</code> callback is no longer called before default values in
<code>properties</code> have been set.  As such, you should not rely on properties set in
<code>created</code> from within <code>value</code> functions that define property defaults.
<p>
However, you can now set <strong>any</strong> property defaults within the <code>created</code>
callback (in 1.0 this was forbidden for observed properties) in lieu of using the <code>value</code>
function in <code>properties</code>.
   </td>
  </tr>
  <tr>
   <td><code>connectedCallback (</code>native<code>)</code>
<p>
<code>attached</code> (legacy)
   </td>
   <td>Polymer 1.x deferred the <code>attached</code> callback until after first render, so elements
   could measure themselves or their children.
   </td>
  </tr>
  <tr>
   <td><code>disconnectedCallback (</code>native<code>)</code>
<p>
<code>detached</code> (legacy)
   </td>
   <td>
   </td>
  </tr>
  <tr>
   <td><code>attributeChangedCallback (</code>native<code>)</code>
<p>
<code>attributeChanged</code> (legacy)
   </td>
   <td>Attributes must be <em>explicitly</em> registered to be observed.
<p>
For Polymer elements, only properties explicitly declared in the  <code>properties</code> object are
tracked for attribute changes. (That is, changing the attribute value invokes the attribute changed
callback, and causes Polymer to set the property value from the attribute.)
<p>
In custom elements v0, the <code>attributeChangedCallback</code> was generated for
<strong>any</strong> attribute change.
<p>
In Polymer 1.x, attributes were deserialized for both explicitly declared properties and
<em>implicitly declared properties</em>. For example, a property used in a binding or as the
dependency of an observer, but not declared in <code>properties</code> can be considered implicitly
declared.
   </td>
  </tr>
  <tr>
   <td><code>ready</code> (Polymer specific)
   </td>
   <td>Polymer no longer guarantees that the initial light DOM distribution is complete before ready is called.
   </td>
  </tr>
</table>


In addition to changes in the callbacks, note that the `lazyRegister` option has been removed and
all meta-programming (parsing the template, creating accessors on the prototype, and so on) is
deferred until the first instance of the element is created.

### Type-extension elements {#type-extension}

Polymer 2.0 doesn't support type-extension elements (for example, `<input is="iron-input">`).
Type-extension support is still included in the custom elements v1 spec (as "customized build-in
elements"), and scheduled for implementation in Chrome. However, since Apple has said it will not
implement `is`, we will not be encouraging its use to avoid indefinite reliance on the custom
elements polyfill. Instead, a wrapper custom element can surround a native element. For example:

`<a is="my-anchor">...</a>`

Could become:


```
<my-anchor>
  <a>...</a>
</my-anchor>
```


Users will need to change existing type-extension elements where necessary.

All template type extensions provided by Polymer have now have corresponding standard custom elements
that take a `<template>` in their light DOM. For example:

```
<template is="dom-bind">...</template>
```

Becomes:

```
<dom-bind>
  <template>...</template>
</dom-bind>
```

Polymer automatically wraps template extensions used in Polymer element templates during template
processing. This means you can and should continue using `<template is="">` in templates nested
inside a Polymer element, or another Polymer template (such as `dom-bind`).

**Templates used in the main document must be manually wrapped.**

The `custom-style` element has also been changed to a standard custom element that must wrap a
`<style>` element. For example:

```
<style is="custom-style">...</style>
```

Becomes:

```
<custom-style>
  <style>...</style>
</custom-style>
```


References:

*   [Creating a customized built-in element](https://html.spec.whatwg.org/#custom-elements-customized-builtin-example) in the WHATWG HTML specification.
*   [Apple's position on customized built-in elements](https://github.com/w3c/webcomponents/issues/509#issuecomment-233419167)).

## Shadow DOM v1

Polymer 2.0 supports shadow DOM v1. For Polymer users, the main differences in v1 involve replacing
`<content>` elements with v1 `<slot>` element.

The shady DOM shim that was part of Polymer 1.x has been factored out of Polymer and added to the
`webcomponents-lite.js` polyfill bundle, along with the related shim for CSS Custom Properties.
This new version of shady DOM  no longer exposes an alternative (`Polymer.dom`) API but instead
patches the native DOM API, so 2.0 users can use the native DOM APIS directly.

For hybrid elements, Polymer 2.0 includes a version the `Polymer.dom` API that forwards directly to
the native API. For 2.0-only elements, `Polymer.dom` can be eliminated in favor of the native DOM
APIs.

**Read more on Web Fundamentals**. For an overview of shadow DOM, see [Shadow DOM v1: self-contained web components](https://developers.google.com/web/fundamentals/primers/shadowdom/?hl=en) on Web Fundamentals.
{.alert .alert-info}

For a brief but comprehensive set of examples illustrating the shadow DOM v1 spec changes, see
[What's New in Shadow DOM v1 (by examples)](http://hayato.io/2016/shadowdomv1/) by Hayato Ito.

## Data system improvements {#data-system}

Polymer 2.0 introduces a number of improvements in the data system:


*   Simpler array handling. Eliminates the `Polymer.Collection` abstraction and key-based paths for
    array items.

*   Batched data changes, which can improve performance as well as correctness.

*   Undefined dependency checks for observers, computed bindings and computed properties have been
    removed. These are all called once at initialization time.

*   An optional element mixin that eliminates dirty checking for objects or arrays. This means that
    when you make an observable change to an object or array property, Polymer re-evaluates
    everything below that property (sub-properties, array items). This can be useful for
    applications that can't use the Polymer `set` and array mutation methods, and do not use
    immutable data patterns.

*   Change in property effect order.

*   Only properties listed explicitly in `properties` can be configured from an attribute.

*   Element initialization (including template stamping and data system initialization) is deferred
    until the the element is connected to the main document. (This is a result of the custom element
    v1 changes.)

*   Several miscellaneous smaller changes.

The following sections describe these changes in more detail.

### Dirty checking for objects and arrays

<!-- TODO: move me to data system concepts doc, summarize briefly here. -->

Polymer 1.x uses a dirty-checking mechanism to prevent the data system from doing extra work.
Polymer 2.x retains this mechanism by default, but lets elements opt out of dirty checking objects
and arrays.

With the default dirty-checking mechanism, the following code doesn't generate any property effects:

```
this.property.subproperty = 'new value!';
this.notifyPath('property');
```

Because `property` still points to the same object, the dirty check fails, and sub-property changes
don't get propagated. Instead, you need to use the Polymer `set` or array mutation methods, or
call `notifyPath` on the exact path that changed:

```
this.set('property.subproperty', 'new value!');
// OR
this.property.subproperty = 'new value!';
this.notifyPath('property.subproperty');
```

In general, the dirty-checking mechanism is more performant. It should work for apps where one of
the following is true:

*   You use immutable data.
*   You always use the Polymer data mutation methods to make granular changes.

However, for apps that don't use immutable data and can't use the Polymer data methods, Polymer 2.0
provides an optional `MutableData` mixin. The `MutableData` mixin eliminates the dirty check is
eliminated, so the code above would work as intended. This also lets you batch several changes
before invoking property effects:

`this.property.arrayProperty.push({ name: 'Alice' });`

```
this.property.stringProperty = 'new value!';
this.property.counter++;
this.notifyPath('property');
```

You can also use set or simply set a top-level property to invoke effects:

```
this.set('property', this.property);
// or
this.property = this.property;
```


Using `set` to change a specific subproperty can often be the most efficient way to make changes.
However, elements that use `MutableData` Polymer elements shouldn't need to use this API, making it
more  compatible with alternate data-binding and state management libraries.

Note that when you re-set a property at the top-level, all property effects for that property and
its subproperties, array items, and so-on are re-run. Observers with wildcard paths (like `prop.*`)
are only notified with the top-level change:

```
// 'property.*' observers fire with the path 'property'
this.property.deep.path = 'another new value';
this.notifyPath('property');
```

Using `set` to set specific paths generates granular notifications:

```
// 'property.*' observers fire with the path 'property.deep.path'
this.set('property.deep.path', 'new value');
```


### Simpler array handling

The `Polymer.Collection` API and its associated key-based path and splice notification for arrays
has been eliminated.

There are several other benefits to this change:


*   Arrays of primitive values are supported.
*   Array items don't need to be unique.

Since key paths have been eliminated, array splice notifications only include the `indexSplices`
property, not `keySplices`.

### Batched data changes

Propagation of data through the binding system is now batched, such that complex observers and
computing functions run once with a set of coherent changes. There's two ways to create a set of
coherent changes:

*   An element automatically creates a set of coherent changes when it initializes its properties.

*   You can programmatically create a set of coherent changes using the new `setProperties` method.

```
this.setProperties({ item: 'Orange', count: 12 });
```


Single property accessors still propagate data synchronously. For example, given an observer that o
bserves two properties, `a` and `b`:


```
// observer fires twice
this.a = 10;
this.b = 20;

// observer fires once
this.setProperties({a: 10, b: 20});
```

### Property effect order

In 2.0, observers fire before property-change notifications. The effect order in 2.0 is:

- Recompute computed properties.
- Propagate values to data bindings.
- Reflect properties to attributes.
- Run observers.
- Fire property-change notifications.

In 1.x, observers fire last, after property-change notifications.

### Observer changes

In 2.0, the checks preventing observers from firing with undefined dependencies are removed.

Specifically:

*   Multi-property observers, computed properties, and computed bindings run once at initialization
    if **any** dependencies are defined.

*   The observer or computing functions may now receive `undefined` as an argument value, and
    needs to handle it correctly.

### Miscellaneous data system changes

*   Setting/changing any function used in a computed binding causes the binding to re-compute its
    value using the new function and current property values. For example, given the binding:

    `some-property="{{_computeValue(a, b)}}"`

    Changing the `_computeValue` function causes the binding to be re-evaluated, even if `a` and `b`
    remain the same:


    ```
      this._computeValue = function(a, b) { ... }
    ```

*   Property change notifications (<code><em>property</em>-changed</code> events) aren't fired when
    the value changes as a result of a binding from the host.


*   In order for a property to be deserialized from its attribute, it must be declared in the
    <code>properties</code> metadata object. In Polymer 1.x, deserialization is also done for
    properties that are <em>implicitly</em> declared (for example, by being included in a binding
    or as an observer dependency).

## Polymer 1 compatibility layer

Polymer 2.0 retains the existing `polymer/polymer.html` import that current Polymer 1.x users can
continue to import. This import includes the legacy Polymer function for defining elements, and
strives to provide a very minimally-breaking change for code written to the Polymer 1.0 API.

For the most part, existing users upgrading to Polymer 2.x will only need to adapt existing code to
be compliant with the shadow DOM v1 API  related to content distribution and styling, as well as
minor breaking changes introduced due to changes in the custom elements v1 API.

## Removed methods and properties

In keeping with a goal of reducing unnecessary code, the new ES6 base element, `Polymer.Element`,
leaves out a number of methods and properties. The removed APIs fall into several categories:

*   Simple sugaring for native DOM APIs. For example `fire` and `transform`.
*   Rarely-used attributes and properties, like `attributeFollows` and `classFollows`.
*   Methods and properties that don't belong on the instance. For example, in 1.x `importHref` was
    an instance method, but it doesn't do anything instance-specific, except for binding the
    callback.

A comprehensive list of missing or moved APIs will be available after the API for  `Polymer.Element`
is finalized.

## Not yet implemented

*   Most of `Polymer.dom` is emulated, but some APIs may be missing. Please file issues to determine
    if the missing behavior is an intended breaking change.

## Browser support and polyfills

When released, Polymer 2.0 should support the same set of browsers as Polymer 1.x—IE 11, Edge,
Safari (9+), Chrome, Opera and Firefox.

Polymer 2.0 has been developed alongside and tested with a new suite of v1-spec compatible polyfills
for custom elements and shadow DOM. You can test Polymer 2.0 by using the `v1` branch of
`webcomponentsjs`, which is included as a bower dependency to Polymer 2.x.

There are two main ways to load the polyfills:

*   `webcomponents-lite.js` includes all polyfills necessary to run on any of the supported
    browsers.
*   `webcomponents-loader.js` performs a runtime feature-detection and loads just the required
    polyfills.


References:

*   [v1 branch of webcomponents/webcomponentsjs](https://github.com/webcomponents/webcomponentsjs/tree/v1)

## ES6 transpilation

Polymer 2.0 and 2.0 class-style elements are written in ES6, and can be run without transpilation in
current Chrome, Safari 10, Safari Technology Preview, Firefox, and Edge.  Transpilation is required
to run in IE11 and Safari 9.

The Polymer CLI and `polymer-build` library support transpiling ES6 to ES5 at build time. In addition,
the `polymer serve` and `polymer test` commands transpile as runtime when required by the browser.

## Polymer element availability {#elements}

The team is in the process of updating the Polymer elements to use the new "hybrid" format compatible
with both Polymer 1.7 and 2.0. Many elements repos have `2.0-preview` branches in varying degrees of
stability.

## Install Polymer 2.0 {#installing}

You can install the Polymer `2.0-preview` branch using bower:

```
bower install --save Polymer/polymer#2.0-preview
```

You can also use bower to install any of the available hybrid elements:

```
bower install --save PolymerElements/paper-button#2.0-preview
```

Note that all of the `2.0-preview` branches are active development branches and may break at any
time.

### Upgrade an existing project {#upgrading}

When upgrading an existing project you may  want to read through
the rest of this doc and the [upgrade guide](upgrade) before starting.

If your project uses Polymer elements or behaviors, see [Polymer element availability](#elements).

1.  Create a copy of your project or create a new branch to work in.

1.  Find any Polymer packages in `bower.json` and replace the existing version
    with  `2.0-preview` branch:

    `"polymer": "Polymer/polymer#2.0-preview"`

1.  Run bower install.

    `bower install`

1.  See the [upgrade guide](upgrade) for information on getting your code working with 2.0.




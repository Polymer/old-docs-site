---
title: Data system concepts
---

<!-- toc -->


Polymer lets you observe changes to an element's properties and take various actions based on data
changes. These actions, or *property effects*, include:


*   Observers. Callbacks invoked when data changes.

*   Computed properties. Virtual properties computed based on other properties, and recomputed when
    the input data changes.

*   Data bindings. Annotations that update the properties, attributes, or text content of a DOM node
    when data changes.

Each Polymer element manages  its own data model and local DOM elements. The *model* for an element
is the element's properties. Data bindings link an element's model with the elements in its local
DOM.

Consider a very simple element:


```
<dom-module id="name-card">
  <template>
    <div>{{name.first}} {{name.last}}</div>
  </template>
  <script>Polymer({ is: 'name-card' });</script>
</dom-module>
```

![alt_text](/images/1.0/data-system/data-binding-overview.png)

This element's model consists of a single property, `name`, and its local DOM tree contains a single
`<div>` element. Data bindings in the template link the `name` object to the text content of the
`<div>`.

The data system is based on *paths*, not objects, where a path represents a property or subproperty
*relative to an element*. For example, the `<name-card>` element has data bindings for the paths
`"name.first"` and `"name.last"`. If a `<name-card>` has the following object for its `name`
property:


```
{
  first: 'Lizzy',
  last: 'Bennet'
}
```

The path "`name`" refers to the element's `name` property (an object).The paths "`user.first`" and
`"user.last"` refer to properties of that object.

![alt_text](/images/1.0/data-system/paths-overview.png)

Polymer doesn't automatically detect all data changes. Property effects occur when there is
an [_observable change_](#observable-changes) to a property or subproperty.

**Why use paths?** Paths and observable changes might seem a little strange at first. But this
results in a very high-performance data binding system. When an observable change occurs, Polymer
can make a change to just those points in the DOM that are affected by that change.
{ .alert .alert-info }

In summary:

*   While a single JavaScript object or array can be referenced by multiple elements, a path is
    **always relative to an element**.
*   An **observable change** to a path can produce **property effects**, like updating bindings or
    calling observers.
*   Data bindings establish connections between paths on different elements.

## Observable changes {#observable-changes}

An *observable change* is **a data change that Polymer can associate with a path**. Certain changes
are automatically *observable*:

*   Setting a *direct property *of the element.

	`this.owner = 'Jane';`

	If a property has any associated property effects (such as observers, computed properties, or
	data bindings), Polymer creates a setter for the property, which automatically invokes the
	property effects.

*   Setting a subproperty of the element using a two-way data binding.

	```
	<local-dom-child name="{{hostProperty.subProperty}}"></local-dom-child>
	```

	Changes made by the data binding system are automatically propagated. In this example, if
	`<local-dom-child>` makes a change to its `name` property, the change propagates up to the host,
	as a change to the path `"hostProperty.subProperty"`.

### Unobservable changes

Changes that **imperatively mutate an object or array are *not* observable**. This includes:

*   Setting a subproperty of an object:

	```
	// unobservable subproperty change
		this.address.street = 'Elm Street';
	```

	Changing the subproperty `address.street` here *doesn't* invoke the setter on `address`, so it
	isn't automatically observable.

*   Mutating an array:

    ```
	  // unobservable change using native Array.push
    this.users.push({ name: 'Maturin});
    ```

    Mutating the array doesn't invoke the setter on `users`, so it isn't automatically observable.

Polymer provides methods for making observable changes to subproperties and arrays:

```
// mutate an object observably
this.set('address.street', 'Half Moon Street');

// mutate an array observably
this.push('users', { name: 'Maturin'});
```

In some cases, you can't use the Polymer methods to mutate objects and arrays (for example, if
you're using a third-party library). In this case, you can use  the `notifyPath` and `notifySplices`
methods to *notify* the element about changes that have already taken place.

```
// Notify Polymer that the value has changed
this.notifyPath('address.street');
```

When you call `notifyPath` or `notifySplices`, the element applies the appropriate property effects,
as if the changes had just taken place.

When calling `set` or `notifyPath`, you need to use the **exact path** that changed. For example, calling
`this.notifyPath('address')` doesn't pick up a change to `address.street` if the `address` object itself
remains unchanged. This is because Polymer performs dirty checking and doesn't produce any property
effects if the value at the specified path hasn't changed.

In most cases, if one or more properties of an
object have changed, or one or more items in an array have changed, you can force Polymer to skip the dirty check
by setting the property to an empty object or array, then back to the original object or array.

```
var address = this.address;
this.address = {};
this.address = address;
```


Related tasks:

*   [Set object subproperties](model-data#set-path).
*   [Mutate an array](model-data#array-mutation).
*   [Notify Polymer of subproperty changes](model-data#notify-path).
*   [Notify Polymer of array mutations](model-data#notifysplices).

## Data paths {#paths}

In the data system, a _path_ is a string that identifies a property or subproperty *relative to a
scope*. In most cases, the scope is a host element. For example, consider the following diagram:

![alt_text](/images/1.0/data-system/data-binding-paths.png)

The `<user-profile>` and `<address-card>` elements both hold references to the same object. The
`<user-profile>` refers to the address object using the path `"primaryAddress"`. The
`<address-card>` element uses the path `"address"` to refer to the same object.

Importantly, **Polymer doesn't automatically know that these paths refer to the same object**. If
`<address-card>` makes a change to the object, no property effects are invoked on `<user-profile>`.

**For data changes to flow from one element to another, the elements must be connected with a data
binding.**

### Linking paths with data bindings

Data bindings can create links between paths on different elements. In fact, **data binding is the
only way to link paths on different elements**. For example, consider the `<user-profile>` example
in the previous section. If `<address-card>` is in the local DOM of the `<user-profile>` element,
the two paths can be connected with a data binding:


```
<dom-module id="user-profile">
  <template>
    …
    <address-card
        address="{{primaryAddress}}"></address-card>
  </template>
  …
</dom-module>
```

Now the paths are connected by data binding.


![alt_text](/images/1.0/data-system/data-bound-paths.png)


If `<address-card>` makes an observable change to the object, property effects are invoked on
`<user-profile>` as well.

### Special paths

A path is a series of path segments. *In most cases*, each path segment is a property name.

There are a few special types of path segments.


*   The wildcard character, `*`, can be used as the last segment in a path (like `foo.*`).
    This wildcard path represents _all changes to a given path and its subproperties_, including
    array mutations.
*   The string `splices` can be used as the last segment in a path (like `foo.splices`) to represent
    all array mutations to a given array.
*   Array item paths (like `foo.11`) represent an item in an array.



#### Wildcard paths {#wildcard-paths}

When used as the last segment in a path, the wildcard character (`*`) represents any change to the
previous property or its subproperties. For example, if `users` is an array, `users.*` indicates an
interest in any changes to the `users` array or its subproperties.

Wildcard paths are only used in observers, computed properties and computed bindings. You can't use
a wildcard path in a data binding.

#### Array mutation paths

When used as the last segment in a path, `splices` represents any array *mutations* to the
identified array (additions or deletions). For example, if `users` is an array, the path
`users.splices` identifies any additions to or deletions from the array.

A `.splices` path can be used in an observer, computed property or computed binding to identify
*interest* in array mutations. Observing a `.splices` path gives you a  **subset** of the changes
registered by a wildcard path (for example, you won't see changes to subproperties of objects
*inside* the array). **In most cases, it's more useful to use a wildcard observer for arrays.**

#### Paths to array items

Polymer supports two ways of identifying an array item in a path: by index or by an opaque,
immutable key.

*   An index, for example, `"myArray.1"` indicates the array item at position 1.

*   An opaque key, prefixed with the pound sign (`#`), for example, `"myArray.#1"` indicates the
    array item with the *key* "1".

**Why use keys?** Polymer uses keys internally to provide a stable path to a specific array item,
regardless of its current position in the array. This allows an element that manages a list, for
example, to create a stable association between an array item and the DOM that it generates. Keys
are generated by Polymer and last as long as the item is in the array.
{.alert .alert-info }

When **you notify Polymer of a change to an array path**, you can use either the index or the key.

When **Polymer generates a notification for an array item**, it identifies the item by *key*,
because it requires extra work to retrieve the index. Polymer provides methods to retrieve the
original array item given the item's key.

**In most cases, you don't need to deal with array keys directly**. Polymer provides helper
elements, such as the [template repeater element](/1.0/docs/devguide/templates#dom-repeat) that
abstract away many of the complexities of working with arrays.

Related tasks:

*   [Look up an array item by key](model-data#get-array-item).
*   [Look up an array index by key](model-data#get-array-index).

### Data scopes

Paths are relative to the current data binding *scope*,

The topmost scope for any element is the element's properties. Certain data binding helper elements
(like [template repeaters](/1.0/docs/devguide/templates#dom-repeat)) introduce new, nested scopes.

### Two paths referencing the same object

Sometimes an element has two paths that point to the same object.

For example, an element has two properties, `users` (an array) and `selectedUser` (an object). When
a user is selected, `selectedUser` refers one of the objects in the array.


![alt_text](/images/1.0/data-system/data-binding-overview.png)


In this example, the element has several paths that refer to the second item in the array:


*   `"selectedUser"`
*   `"users.1"` (where 1 is the item's index in the `users` array)
*   `"users.#5"` (where 5 is the item's immutable key)

By default, Polymer has no way to associate the array paths (like `users.1`) with `selectedUser`.

For this exact use case, Polymer provides a data binding helper element, `<array-selector>`, that
maintains path linkages between an array and a selected item from that array. (`<array-selector>`
also works when selecting multiple items from an array.)

For other use cases, there's an imperative method,
[`linkPaths`](/1.0/docs/api/Polymer.Base#method-linkPaths) to associate two paths. When two paths
are *linked*, an [observable change](#observable-changes) to one path is observable on the other
path, as well.

Related tasks:



*   Link two paths
*   Data bind an array selection



## Data flow

Polymer implements the mediator pattern, where a host element manages data flow between itself and
its local DOM nodes.

When two elements are connected with a data binding, data changes can flow **downward** — from
host to target — **, upward** — from target to host — , or both.

When two elements in the local DOM are bound to the same property data appears to flow from one
element to the other, but this flow is **mediated** by the host. A change made by one element
propagates **up** to the host, then the host propagates the change **down** to the second element.

### Data flow is synchronous

Data flow is **synchronous**. When your code makes an [observable change](#observable-changes),
all of the data flow and property effects from that change occur before the next line of your
JavaScript is executed, unless an element explicitly defers action (for example, by calling an
asynchronous method).

### How data flow is controlled

The type of data flow supported by an individual binding depends on:



*   The type of binding annotation used.
*   The configuration of the target property.

The two types of data binding annotations are:



*   **Automatic**, which allows upward (target to host) and downwards (host to target) data flow.
    Automatic bindings use double curly brackets (`{{ }}`):


```
<my-input value="{{name}}"></my-input>

```


*   **One-way**, which only allows downwards data flow. Upward data flow is disabled. One-way bindings
    use double square brackets (`[[ ]]`).


```
<name-tag name="[[name]]"></name-tag>
```


The following configuration flags affect data flow to and from target properties:


*   `notify`. A notifying property **supports upward data flow**. By default, properties are
    non-notifying, and don't support upward data flow.
*   `readOnly`. A read-only property **prevents downward data flow**. By default, properties are
    read/write, and support downward data flow.

Example property definitions


```
properties: {
  // default prop, read/write, non-notifying.
  basicProp: {
  },
  // read/write, notifying
  notifyingProp: {
    notify: true
  },
  // read-only, notifying
  fancyProp: {
    readOnly: true,
    notify: true
  }
}
```


This matrix shows what kind of data flow is supported by automatic bindings based on the
configuration of the target property:


<table>
  <tr>
   <td>
   </td>
   <td>non-notifying (default)
   </td>
   <td>notifying
   </td>
  </tr>
  <tr>
   <td>read/write (default)
   </td>
   <td>One-way, downward
   </td>
   <td>Two-way
   </td>
  </tr>
  <tr>
   <td>read-only
   </td>
   <td>No data flow
   </td>
   <td>One-way, upward
   </td>
  </tr>
</table>


By contrast, one-way bindings only allow one-way, downward data flow, so the `notify` flag doesn't
affect the outcome:


<table>
  <tr>
   <td>
   </td>
   <td>non-notifying (default)
   </td>
   <td>notifying
   </td>
  </tr>
  <tr>
   <td>read/write (default)
   </td>
   <td>One-way, downward
   </td>
   <td>One-way, downward
   </td>
  </tr>
  <tr>
   <td>read-only
   </td>
   <td>No data flow
   </td>
   <td>No data flow
   </td>
  </tr>
</table>


It's important to note that the property configuration **only affects the property itself, not
subproperties**. In particular, binding a property that's an object or array creates shared data
between the host and target element. There's no way to prevent either element from mutating a shared
object or array.

### Upward and downward data flow

Since the host element manages data flow, it can directly interact with the target element. The host
propagates data downward by setting the target element’s properties or invoking its methods.


![alt_text](/images/1.0/data-system/data-flow-down.png)


Polymer elements use events to propagate data upward. The target element fires a non-bubbling event
when an observable change occurs. Change events are described in more detail in [Change
notification events](#link).

For **two-way bindings**, the host element listens for these change events and propagates the
changes — for example, setting a property and invoking any related property effects. The property
effects may include:


*   Updating data bindings to propagate changes to sibling elements.
*   Generating another change event to propagate the change upward.


![alt_text](/images/1.0/data-system/data-flow-up.png)


For **one-way binding** annotations, the host doesn't create a change listener, so upward data changes
aren't propagated.

### Data flow for objects and arrays

For object and array properties, data flow is a little more complicated. An object or array can be
referenced by multiple elements, and there's no way to prevent one element from mutating a shared
array or changing a subproperty of an object.

As a result, Polymer treats the contents of arrays and objects as always being **available** for two-
way binding. That is:


*   Data updates always flow downwards, even if the target property is marked read-only.
*   Change events for upward data flow are always fired, even if the target property is not marked
    as notifying.

Since one-way binding annotations don't create an event listener, they prevent these change
notifications from being propagated to the host element.

### Change notification events {#change-events}

A change notification event is fired when one of the following
[observable changes](#observable-changes) occurs:

*   A change to a notifying property.

*   A subproperty change.

*   An array mutation.

Event types follow a naming convention of <code><var>property</var>-changed</code>, where
<code><var>property</var></code> is the property name, in dash case (so changing `this.firstName`
fires `first-name-changed`.

You can manually attach a <code><var>property</var>-changed</code> listener to an element to
notify external elements, frameworks, or libraries of property changes.

The contents of the event vary depending on the change.

### Custom change notification events

Native elements like `<input>` don't provide the change notification events that Polymer uses for
upward data flow. To support two-way data binding of native input elements, Polymer lets you
associate a **custom change notification event** with a data binding. For example, when binding to a
text input, you could specify the `input` or `change` event:


```
<input value="{{firstName::change}}">
```


In this example, the `firstName` property is bound to the input's `value` property. Whenever the
input element fires its `change` event, Polymer updates the `firstName` property to match the input
value, and invokes any associated property effects. **The contents of the event aren't important.**

This technique is especially useful for native input elements, but can be used to provide two-way
binding for any non-Polymer component that exposes a property and fires an event when the property
changes.

Related tasks:

*   [Two-way bind to a non-Polymer element](data-binding#two-way-native)

### Element initialization

When an element initializes its local DOM, it configures the properties of its local DOM children's data bindings.

The host’s values take priority during initialization. For example, when a host property is bound to
a target property, if both host and target elements specify default values, the parent's default
value is used.

## Property effects

Property effects are actions triggered by [observable changes](#observable-changes) to a given
property (or path). Property effects include:



*   Recomputing computed properties.
*   Updating data bindings.
*   Reflecting a property value to an attribute on the host element.
*   Firing change notification events.
*   Invoking observers.



## Data bindings

A *data binding* establishes a path connection between a path on the host element and a property or
attribute of a `target node` in the host's local DOM. You create data bindings by adding
`annotations` to an element's local DOM template.

Annotations are attribute values set on a target element that include the data binding delimiters `{{ }}` or `[[ ]]`.

```
target-property="{{hostProperty}}"
target-property="[[hostProperty]]"
```


You can also use a data binding annotation in the body of an element, which is equivalent to binding
to the element's `textContent` property.

```
<div>{{hostProperty}}</div>
```


For example, given an element template:


```
<dom-module id="user-list">
 <template>
   …
   <address-card
       address="{{selectedUser.address}}"></address-card>
  </template>
  …
</dom-module>
```

The data binding links the host's `"selectedUser.address"` path with the `<address-card>` element's
`"address"` path. The relationship can be represented like this:

![alt_text](/images/1.0/data-system/data-binding-simple.png)


When there's an [observable change](#observable-changes) to `selectedUser.address`, Polymer sets the
`address` property on `<address-card>`.

### Data binding annotations

Polymer provides two kinds of data binding delimiters:

*  One-way bindings:  (<code>[[<em>binding</em>]]</code>). One-way bindings allow only
   <strong>downward</strong> data flow.

*   Two-way or "automatic" binding annotations (<code>{{<em>binding</em>}}</code>). Automatic
    bindings allow <strong>upward and downward</strong> data flow.

See [Data flow](#data-flow) for information on two-way binding and upward data flow.

The text inside the delimiters can be one of the following:

*   A property or subproperty path (`users`, `address.street`).
*   A computed binding (`_computeName(firstName, lastName, locale)`)
*   Any of the above, preceded by the negation operator (`!`).

The paths in a data binding annotation are relative to the current data binding scope.

### Compound bindings

A `compound binding` is a string containing one or more data binding annotations. The values of the
annotations are interpolated into the string.


```
<div>Hello, {{name}}.</div>
```


If an annotation evaluates to `undefined`, it is replaced by an empty string. For example, if `name`
is `undefined`, the above example would evaluate as:


```
<div>Hello, .</div>
```


### Computed bindings

A *computed binding* is similar to a computed property. It's declared inside a binding annotation.


```
<div>[[formatName(first, last, title)]]</div>
```


An element can have multiple computed bindings in its template that refer to the same computing
function.

In addition to the dependency types supported by computed properties and complex observers, the
dependencies for a computed binding can include string or number literals.

A computed binding is useful if you don't need to expose a computed property as part of the
element's API, or use it elsewhere in the element. Computed bindings are also useful for filtering
or transforming values for display.

Computed bindings differ from computed properties in the following ways:

*   A computed binding's dependencies are interpreted relative to the current *binding scope*. For
    example, inside a [template repeater](templates.html#dom-repeat), a dependent property could
    refer to the current `item`.

*   A computed binding's argument list can include literal arguments.

*   A computed binding can have an *empty* argument list, in which case the computing function is
    only called once.

A computed binding is always one-way, host-to-target.

#### Dependencies of computed bindings {#computed binding dependencies}

Arguments to computing functions may be *dependent properties*, which include any of the argument
types supported by complex observers:

*   Simple properties on the current scope.

*   Paths to subproperties.

*   Paths with wildcards.

*   Paths to array splices.

In addition, a computed binding can include literal arguments.

For each type of dependent property, the argument passed to the computing function is the same as
that passed to an observer.

As with observers and computed properties, the computing function **is not called until all
dependent properties are defined (`!=undefined`)**.

For an example computed binding using a path with a wildcard, see [Binding to array
items](#array-binding).

#### Literal arguments to computed bindings {#literals}

Arguments to computed bindings may be string or number literals.

Strings may be  either single- or double-quoted. In an attribute or

property binding, if you use double quotes for the attribute value, use single

quotes for string literals, or the reverse.

**Commas in literal strings:** Any comma occurring in a string literal
**must** be escaped using a backslash (`\`).
{.alert .alert-info }

Example:

```
<dom-module id="x-custom">
  <template>
    <span>{{translate('Hello\, nice to meet you', first, last)}}</span>
  </template>
</dom-module>
```


### Binding to arrays and array items

To keep annotation parsing simple, **Polymer doesn't provide a way to bind directly to an array
item**. There are several ways to interact with arrays in a data binding:

*   The `dom-repeat` helper element lets you create a instance of a template for each item in an
    array. Inside a `dom-repeat` instance, you can bind to the properties of the array item.

*   The `array-selector` helper element lets you data bind to a selection from an array, where the
    selection is either a single item or a subset of the original array.

*   You can bind an individual array item using a computed binding.

Related topics:

*   [Template repeater](templates#dom-repeat)
*   [Array selector](templates#array-selector)
*   [Bind to an array item](data-binding#array-binding)

### Attribute bindings

In the vast majority of cases, binding data to other elements should use property bindings, where
changes are propagated by setting the new value to the JavaScript property on the element.

However, sometimes you need to set an attribute on an element, as opposed to a property.  For
example, when attribute selectors are used for CSS or for interoperability with elements that
require using an attribute-based API.

To bind to an attribute, use `$=` rather than `=`.  This results in a call to:


```
element.setAttribute(attr,value);
```

As opposed to:


```
element.property = value;
```

For example:


```
<template>
  <!-- Attribute binding -->
  <my-element selected$="{{value}}"></my-element>
  <!-- results in <my-element>.setAttribute('selected', this.value); -->

  <!-- Property binding -->
  <my-element selected="{{value}}"></my-element>
  <!-- results in <my-element>.selected = this.value; -->
</template>
```


Attribute bindings are always one-way, host-to-target. Values are serialized according to the
value's _current_ type, as described for
[attribute serialization](properties.html#attribute-serialization).

Again, as values must be serialized to strings when binding to attributes, it is always more
performant to use property binding for pure data propagation.

### Native properties that don't support property binding

There are a handful of common native element properties that Polymer can't data-bind to directly,
because the binding causes issues on one or more browsers.

You need to use attribute bindings to affect the following properties:

| Attribute | property | notes

| `class` | `classList`, `className` | Maps to two properties with different formats.

| `style` | `style` | By specification, `style` is considered a read-only reference to a `CSSStyleDeclaration` object.

| `href` | `href` |

| `for` | `htmlFor` |

| `data-*` |  `dataset` | Custom data attributes (attribute names starting with `data-`) are stored on the `dataset` property.

| `value` | `value` | Only for `<input type="number">`.

**Note:** data binding to the `value` property doesn't work on IE for ***numeric input types***. For
this specific case, you can use one-way attribute binding to set the `value` of a numeric input. Or
use another element such as `iron-input` or `paper-input` that handles two-way binding correctly.
{.alert .alert-info }

This list includes the properties currently known to cause issues with property bindings. Other
properties may also be affected.

There are various reasons that properties can't be bound:


*   Cross-browser isssues with the ability to place binding braces `{{...}}` in some of these
    attribute values.

*   Attributes that map to differently-named JavaScript properties (such as `class`).

*   Properties with unique structures (such as `style`).

Attribute binding to dynamic values (use `$=`):


```
<!-- class -->
<div class$="{{foo}}"></div>

<!-- style -->
<div style$="{{background}}"></div>

<!-- href -->
<a href$="{{url}}">

<!-- label for -->
<label for$="{{bar}}"></label>

<!-- dataset -->
<div data-bar$="{{baz}}"></div>
```

---
title: Data system concepts
---

<!-- toc -->

<style>
table.config-summary pre, table.config-summary code {
  background: transparent !important;
  margin: 0px;
  padding: 0px;
}
table.config-summary td {
  vertical-align: middle;
  padding: 10px 10px 1 1;
}
</style>

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

```html
<dom-module id="name-card">
  <template>
    <div>[[name.first]] [[name.last]]</div>
  </template>
  <script>
    class NameCard extends Polymer.Element {
      static get is() { return "name-card"; }
      constructor() {
        super();
        this.name = {first: 'Kai', last: 'Li'};
      }
    }
    customElements.define(NameCard.is, NameCard);
  </script>
</dom-module>
```

![A name-card element with a property, name. An arrow labeled 1 connects the name property to
a JavaScript object. An arrow labeled 2 connects the element to a box labeled local DOM tree
which contains a single element, div. An arrow labeled 3 connects the JavaScript object to the
div element.](/images/1.0/data-system/data-binding-overview-new.png)

1.  The `<name-card>` element has a `name` property that _refers_ to a JavaScript object.
2.  The `<name-card>` element _hosts_ a local DOM tree, that contains a single `<div>` element.
3.  Data bindings in the template link the JavaScript object to the `<div>` element.

The data system is based on *paths*, not objects, where a path represents a property or subproperty
*relative to the host element*. For example, the `<name-card>` element has data bindings for the paths
`"name.first"` and `"name.last"`. If a `<name-card>` has the following object for its `name`
property:


```js
{
  first: 'Lizzy',
  last: 'Bennet'
}
```

The path "`name`" refers to the element's `name` property (an object).The paths "`name.first`" and
`"name.last"` refer to properties of that object.

![The name-card element from the previous figure. An arrow labeled 1 connects the name property
to a JavaScript object that contains two properties, first: 'Lizzy' and last: 'Bennet'. Two arrows
labeled 2 connect the paths name and name.first with the object itself and the subproperty,
first, respectively.](/images/1.0/data-system/paths-overview-new.png)

1.  The `name` property refers to the JavaScript object.
2.  The path "name" refers to the object itself. The path "name.first" refers to its subproperty,
    `first` (the string, `Lizzy`).

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

*   Setting a *direct property* of the element.

    `this.owner = 'Jane';`

    If a property has any associated property effects (such as observers, computed properties, or
    data bindings), Polymer creates a setter for the property, which automatically invokes the
    property effects.

*   Setting a subproperty of the element using a two-way data binding.

    ```html
    <local-dom-child name="{{hostProperty.subProperty}}"></local-dom-child>
    ```

    Changes made by the data binding system are automatically propagated. In this example, if
    `<local-dom-child>` makes a change to its `name` property, the change propagates up to the host,
    as a change to the path `"hostProperty.subProperty"`.


### Unobservable changes

Changes that **imperatively mutate an object or array are *not* observable**. This includes:

*   Setting a subproperty of an object:

    ```js
    // unobservable subproperty change
    this.address.street = 'Elm Street';
    ```

    Changing the subproperty `address.street` here *doesn't* invoke the setter on `address`, so it
    isn't automatically observable.

*   Mutating an array:

    ```js
    // unobservable change using native Array.push
    this.users.push({ name: 'Maturin'});
    ```

    Mutating the array doesn't invoke the setter on `users`, so it isn't automatically observable.

In both cases, you need to use Polymer methods to ensure that the changes are observable.

### Mutating objects and arrays observably {#make-observable-changes}

Polymer provides methods for making observable changes to subproperties and arrays:

```js
// mutate an object observably
this.set('address.street', 'Half Moon Street');

// mutate an array observably
this.push('users', { name: 'Maturin'});
```

In some cases, you can't use the Polymer methods to mutate objects and arrays (for example, if
you're using a third-party library). In this case, you can use  the
[`notifyPath`](/{{{polymer_version_dir}}}/docs/api/elements/Polymer.Element#method-notifyPath) and
[`notifySplices`](/{{{polymer_version_dir}}}/docs/api/elements/Polymer.Element#method-notifySplices)
methods to *notify* the element about changes that have **already taken place.**


```js
// Notify Polymer that the value has changed
this.notifyPath('address.street');
```

When you call `notifyPath` or `notifySplices`, the element applies the appropriate property effects,
as if the changes had just taken place.

When calling `set` or `notifyPath`, you need to use the **exact path** that changed. For example,
calling `this.notifyPath('address')` doesn't pick up a change to `address.street` if the `address`
object itself remains unchanged. This is because Polymer performs dirty checking for objects
and arrays using object equality. It doesn't produce any property effects if the value at the
specified path hasn't changed.

In most cases, if one or more properties of an
object have changed, or one or more items in an array have changed, you can force Polymer to skip
the dirty check by cloning the object or array.

```js
// Shallow clone array
this.addresses.push(address1);
this.addresses.push(address2)
this.addresses = this.addresses.slice();
```

If you have a data structure with multiple levels of objects and arrays, you may need to perform a
deep copy to pick up changes.

If your application requires it, you can eliminate dirty-checking of objects and arrays on a
per-element basis using the `Polymer.MutableData` mixin. This mixin may trade some performance
for increased ease of use. For details, see [Using the MutableData mixin](#mutable-data).

Related tasks:

*   [Set object subproperties](model-data#set-path).
*   [Mutate an array](model-data#array-mutation).
*   [Notify Polymer of subproperty changes](model-data#notify-path).
*   [Notify Polymer of array mutations](model-data#notifysplices).

### Batched property changes

Propagation of data through the binding system is  batched, so complex observers and computing
functions run once with a set of coherent changes. There's several ways to create a set of coherent
changes:

*   An element automatically creates a set of coherent changes when it initializes its properties.

*   Setting an object or array can create a set of coherent changes.

*   You can atomically set multiple properties using the `setProperties` method.

```js
this.setProperties({item: 'Orange', count: 12 });
```

Single property accessors still propagate data synchronously. For example, given an observer that
observes two properties, `a` and `b`:

```js
// observer fires twice
this.a = 10;
this.b = 20;

// observer fires once
this.setProperties({a: 10, b: 20});
```

## Data paths {#paths}

In the data system, a _path_ is a string that identifies a property or subproperty *relative to a
scope*. In most cases, the scope is a host element. For example, consider the following
relationships:

![Two elements, user-profile and address card. The user-profile element has a primaryAddress
property. An arrow labeled 1 connects the property to a JavaScript object. The address-card
element has an address property. An arrow labeled 2 connects the property to the same JavaScript
object.](/images/1.0/data-system/data-binding-paths-new.png)

1.  The `<user-profile>` element has a property `primaryAddress` that refers to a JavaScript object.
2.  The `<address-card>` element has a property `address` that refers to the same object.

Importantly, **Polymer doesn't automatically know that these properties refer to the same object**.
If `<address-card>` makes a change to the object, no property effects are invoked on `<user-profile>`.

**For data changes to flow from one element to another, the elements must be connected with a data
binding.**


### Linking paths with data bindings

Data bindings can create links between paths on different elements. In fact, **data binding is the
only way to link paths on different elements**. For example, consider the `<user-profile>` example
in the previous section. If `<address-card>` is in the local DOM of the `<user-profile>` element,
the two paths can be connected with a data binding:


```html
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

![Two elements, user-profile and address-card, both referring to a shared JavaScript object. An arrow labeled 1 connects the primaryAddress property on the user-profile element to the object. An arrow labeled 2 connects the address property on the address-card element to the same object. An double-headed arrow labeled 3 connects the path primaryAddress on user-profile to the path address on address-card.](/images/1.0/data-system/data-bound-paths-new.png)

1.  The `<user-profile>` element has a property `primaryAddress` that refers to a JavaScript object.
2.  The `<address-card>` element has a property `address` that refers to the same object.
3.  The data binding connects the path `"primaryAddress"` on `<user-profile>` to the path `"address"`
    on `<address-card>`

If `<address-card>` makes an observable change to the object, property effects are invoked on
`<user-profile>` as well.

### Data binding scope {#data-binding-scope}

Paths are relative to the current data binding *scope*.

The topmost scope for any element is the element's properties. Certain data binding helper elements
(like [template repeaters](/{{{polymer_version_dir}}}/docs/devguide/templates#dom-repeat)) introduce new, nested scopes.

For observers and computed properties, the scope is always the element's properties.

### Special paths

A path is a series of path segments. *In most cases*, each path segment is a property name.

There are a few special types of path segments.


*   The wildcard character, `*`, can be used as the last segment in a path (like `foo.*`).
    This wildcard path represents _all changes to a given path and its subproperties_, including
    array mutations.
*   The string `splices` can be used as the last segment in a path (like `foo.splices`) to represent
    all array mutations to a given array.
*   Array item paths (like `foo.11`) represent an item in an array, where the numeric path segment
    represents an array index.



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


### Two paths referencing the same object {#two-paths}

Sometimes an element has two paths that point to the same object.

For example, an element has two properties, `users` (an array) and `selectedUser` (an object). When
a user is selected, `selectedUser` refers one of the objects in the array.


![A user-list element and an array with four items labeled \[0\] through \[3\]. The user-list has two properties, users and selectedUser. The users property is connected to the array by an arrow labeled 1. The selectedUser property is connected to the array item, \[1\] by an arrow labeled 2.](/images/1.0/data-system/linked-paths-new.png)

1.  The `users` property references the array itself.
2.  The `selectedUser` property references an item in the array.

In this example, the element has several paths that refer to the second item in the array:


*   `"selectedUser"`
*   `"users.1"` (where 1 is the item's index in the `users` array)

By default, Polymer has no way to associate the array paths (like `users.1`) with `selectedUser`.

For this exact use case, Polymer provides a data binding helper element, `<array-selector>`, that
maintains path linkages between an array and a selected item from that array. (`<array-selector>`
also works when selecting multiple items from an array.)

For other use cases, there's an imperative method,
[`linkPaths`](/{{{polymer_version_dir}}}/docs/api/elements/Polymer.Element#method-linkPaths) to
associate two paths. When two paths are *linked*, an [observable change](#observable-changes) to one
path is observable on the other path, as well.


Related task:

*   [Link two paths to the same object](model-data#linkpaths)

*   [Data bind an array selection](templates#array-selector)



## Data flow {#data-flow}

Polymer implements the mediator pattern, where a host element manages data flow between itself and
its local DOM nodes.

When two elements are connected with a data binding, data changes can flow _downward_, from
host to target, _upward_, from target to host, or both ways.

When two elements in the local DOM are bound to the same property data appears to flow from one
element to the other, but this flow is _mediated_ by the host. A change made by one element
propagates **up** to the host, then the host propagates the change **down** to the second element.

### Data flow is synchronous

Data flow is **synchronous**. When your code makes an [observable change](#observable-changes),
all of the data flow and property effects from that change occur before the next line of your
JavaScript is executed, unless an element explicitly defers action (for example, by calling an
asynchronous method).

### How data flow is controlled {#data-flow-control}

The type of data flow supported by an individual binding depends on:

*   The type of binding annotation used.
*   The configuration of the target property.

The two types of data binding annotations are:

*   **Automatic**, which allows upward (target to host) and downwards (host to target) data flow.
    Automatic bindings use double curly brackets (`{{ }}`):

    ```html
    <my-input value="{{name}}"></my-input>
    ```

*   **One-way**, which only allows downwards data flow. Upward data flow is disabled. One-way bindings
    use double square brackets (`[[ ]]`).

    ```html
    <name-tag name="[[name]]"></name-tag>
    ```

The following configuration flags affect data flow to and from target properties:

*   `notify`. A notifying property **supports upward data flow**. By default, properties are
    non-notifying, and don't support upward data flow.
*   `readOnly`. A read-only property **prevents downward data flow**. By default, properties are
    read/write, and support downward data flow.

Example property definitions {.caption}

```js
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

This table shows what kind of data flow is supported by automatic bindings based on the
configuration of the target property:

<table class="config-summary">
  <tr>
    <th>
      Configuration
    </th>
    <th>
      Result
    </th>
  </tr>
  <tr>
    <td><pre><code>notify: false,
readOnly: false</code></pre></td>
    <td>
      One-way, downward
    </td>
  </tr>
  <tr><td><pre><code>notify: false,
readOnly: true</code></pre></td>
    <td>
      No data flow
    </td>
  </tr>
  <tr>
    <td><pre><code>notify: true,
readOnly: false</code></pre></td>
    <td>
      Two-way
    </td>
  </tr>
  <tr>
    <td><pre><code>notify: true,
readOnly: true</code></pre></td>
    <td>
      One-way, upward
    </td>
  </tr>
</table>

By contrast, one-way bindings only allow one-way, downward data flow, so the `notify` flag doesn't
affect the outcome:


<table class="config-summary">
  <tr>
    <th>
      Configuration
    </th>
    <th>
      Result
    </th>
  </tr>
  <tr>
    </td>
    <td>
      <pre><code>readOnly: false</code></pre>
    </td>
    <td>
      One-way, downward
    </td>
  </tr>
  <tr>
    <td>
      <pre><code>readOnly: true</code></pre>
    </td>
    <td>
      No data flow
    </td>
  </tr>
</table>


 **Property configuration _only affects the property itself_, not
subproperties**. In particular, binding a property that's an object or array creates shared data
between the host and target element. There's no way to prevent either element from mutating a shared
object or array. For more information, see [Data flow for objects and
arrays](#data-flow-objects-arrays)
{.alert .alert-warning}

### Data flow examples

The following examples show the various data flow scenarios described above.


Example 1: Two-way binding { .caption }

```html
<script>
  class XTarget extends Polymer.Element {

    static get is() {return 'x-target';}

    static get properties() {
      return {
        someProp: {
          type: String,
          notify: true
        }
      }
    }

  }

  customElements.define(XTarget.is, XTarget);
</script>
...

<dom-module id="x-host">
  <template>
    <!-- changes to "value" propagate downward to "someProp" on target -->
    <!-- changes to "someProp" propagate upward to "value" on host  -->
    <x-target some-prop="{{value}}"></x-target>
  </template>
  <script>
    class XHost extends Polymer.Element {

      static get is() {return 'x-host';}

    }

    customElements.define(XHost.is, XHost);
  </script>
```

Example 2: One-way binding (downward) { .caption }

Changing the binding to a one-way binding `[[ ]]` produces a one-way binding. This example uses the
same `x-target` element as example 1.

```html
<dom-module id="x-host">
  <template>
    <!-- changes to "value" propagate downward to "someProp" on target -->
    <!-- changes to "someProp" don't propagate upward because of the one-way binding -->
    <x-target some-prop="[[value]]"></x-target>
  </template>
  <script>
    class XHost extends Polymer.Element {

      static get is() {return 'x-host';}

    }

    customElements.define(XHost.is, XHost);
  </script>
```

Example 3: One-way binding (downward) { .caption }

Similarly, using the two-way binding delimiters but omitting the `notify: true` on `someProp` yields
a one-way, downward binding.

```html
<script>
  class XTarget extends Polymer.Element {

    static get is() {return 'x-target';}

    static get properties() {
      return {
        someProp: {
          type: String // no notify: true
        }
      }
    }

  }

  customElements.define(XTarget.is, XTarget);
</script>
...

<dom-module id="x-host">
  <template>
    <!-- changes to "value" propagate downward to "someProp" on target -->
    <!-- changes to "someProp" are not notified to host due to notify:falsey -->
    <x-target some-prop="{{value}}"></x-target>
  </template>
  <script>
    class XHost extends Polymer.Element {

      static get is() {return 'x-host';}

    }

    customElements.define(XHost.is, XHost);
  </script>
```

Example 4: One-way binding (upward, child-to-host) { .caption }


```html
<script>
  class XTarget extends Polymer.Element {

    static get is() {return 'x-target';}

    static get properties() {
      return {
        someProp: {
          type: String,
          notify: true,
          readOnly: true
        }
      }
    }

  }

  customElements.define(XTarget.is, XTarget);
</script>
...

<dom-module id="x-host">
  <template>
<!-- changes to "value" are ignored by child because "someProp" is read-only -->
<!-- changes to "someProp" propagate upward to "value" on host -->
    <x-target some-prop="{{value}}"></x-target>
  </template>
  <script>
    class XHost extends Polymer.Element {

      static get is() {return 'x-host';}

    }

    customElements.define(XHost.is, XHost);
  </script>
```

Example 5: No data flow / nonsensical state { .caption }


```html
<script>
  class XTarget extends Polymer.Element {

    static get is() {return 'x-target';}

    static get properties() {
      return {
        someProp: {
          type: String,
          notify: true,
          readOnly: true
        }
      }
    }

  }

  customElements.define(XTarget.is, XTarget);
</script>
...

<dom-module id="x-host">
  <template>
    <!-- changes to "value" are ignored by child because "someProp" is read-only -->
    <!-- changes to "someProp" don't propagate upward because of the one-way binding -->
    <x-target some-prop="[[value]]"></x-target>
  </template>
  <script>
    class XHost extends Polymer.Element {

      static get is() {return 'x-host';}

    }

    customElements.define(XHost.is, XHost);
  </script>
```


### Upward and downward data flow

Since the host element manages data flow, it can directly interact with the target element. The host
propagates data downward by setting the target element’s properties or invoking its methods.


![An element, host-element connected to an element, target-element by an arrow labeled 1.](/images/1.0/data-system/data-flow-down-new.png)

1.  When a property changes on the host element, it sets the corresponding property on the target
    element, triggering the associated property effects.

Polymer elements use events to propagate data upward. The target element fires a non-bubbling event
when an observable change occurs. (Change events are described in more detail in [Change
notification events](#change-events).)

For **two-way bindings**, the host element listens for these change events and propagates the
changes—for example, setting a property and invoking any related property effects. The property
effects may include:


*   Updating data bindings to propagate changes to sibling elements.
*   Generating another change event to propagate the change upward.


![An element, target-element connected to an element, host-element by an arrow labeled 1. An arrow labeled 2 connects from the host element back to itself.](/images/1.0/data-system/data-flow-up-new.png)

1.  A property change on the target element causes a property change event to fire.
2.  The host element receives the event and sets the corresponding property, invoking the related
    property effects.

For **one-way binding** annotations, the host doesn't create a change listener, so upward data changes
aren't propagated.

### Data flow for objects and arrays {#data-flow-objects-arrays}

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

An element fires a change notification event when one of the following
[observable changes](#observable-changes) occurs:

*   A change to a notifying property.

*   A subproperty change.

*   An array mutation.

The event's type property indicates which property changed: it follows a naming convention of
<code><var>property</var>-changed</code>, where <code><var>property</var></code> is the property
name, in dash case (so changing `this.firstName` fires `first-name-changed`).

You can manually attach a <code><var>property</var>-changed</code> listener to an element to
notify external elements, frameworks, or libraries of property changes.

The contents of the event vary depending on the change.

*   For a property change, the new value of the property is included in the `detail.value` field.
*   For a subproperty change, the _path_ to the subproperty is included in the `detail.path` field,
    and the new value is included in the `detail.value` field.
*   For an array mutation, the `detail.path` field is an array mutation path, such as
    "myArray.splices", and the `detail.value`

**Don't stop propagation on change notification events.** To avoid creating and discarding
event objects, Polymer uses cached event objects for change notifications. Calling `stopPropagation`
on a change notification event **prevents all future events for that property.** Change notification
events don't bubble, so there should be no reason to stop propagation.
{.alert .alert-warning}

### Custom change notification events

Native elements like `<input>` don't provide the change notification events that Polymer uses for
upward data flow. To support two-way data binding of native input elements, Polymer lets you
associate a **custom change notification event** with a data binding. For example, when binding to a
text input, you could specify the `input` or `change` event:


```html
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

When an element initializes its local DOM, it configures the properties of its local DOM children and
initializes data bindings.

The host’s values take priority during initialization. For example, when a host property is bound to
a target property, if both host and target elements specify default values, the parent's default
value is used.

## Property effects {#property-effects}

Property effects are actions triggered by [observable changes](#observable-changes) to a given
property (or path). Property effects include:

*   Recomputing computed properties.
*   Updating data bindings.
*   Reflecting a property value to an attribute on the host element.
*   Invoking observers.
*   Firing change notification events.

These property effects run in a well-defined order:

1.  Computed properties.
2.  Data bindings.
3.  Reflected values.
4.  Observers.
5.  Change notification events.

This order ensures that computed properties are recomputed before changes are propagated
downward, and that changes are propagated to the local DOM children before observers run.

### Data bindings

A *data binding* establishes a connection between data on the host
element and a property or attribute of a `target node` in the host's local DOM. You create data
bindings by adding _annotations_ to an element's local DOM template.

Annotations are attribute values set on a target element that include the data binding delimiters
`{{ }}` or `[[ ]]`.

Two-way property binding:

<code><var>target-property</var>="{{<var>hostProperty</var>}}"</code>

One-way property binding:

<code><var>target-property</var>="[[<var>hostProperty</var>]]"</code>

Attribute binding:

<code><var>target-attribute</var>$="[[<var>hostProperty</var>]]"</code>

You can also use a data binding annotation in the body of an element, which is equivalent to binding
to the element's `textContent` property.

```html
<div>{{hostProperty}}</div>
```

The text inside the delimiters can be one of the following:

*   A property or subproperty path (`users`, `address.street`).
*   A computed binding (`_computeName(firstName, lastName, locale)`)
*   Any of the above, preceded by the negation operator (`!`).

For more information, see [Data binding](data-binding).


## Using the MutableData mixin {#mutable-data}

Polymer 1.x uses a dirty-checking mechanism to prevent the data system from doing extra work.
Polymer 2.x retains this mechanism by default, but lets elements opt out of dirty checking objects
and arrays.

With the default dirty-checking mechanism, the following code doesn't generate any property effects:

```js
this.property.subproperty = 'new value!';
this.notifyPath('property');
```

This strict dirty checking for objects and arrays is based in object equality. Because `property`
still points to the same object, the dirty check fails, and sub-property changes don't get
propagated. Instead, you need to use the Polymer `set` or array mutation methods, or call
`notifyPath` on the exact path that changed:

```js
this.set('property.subproperty', 'new value!');
// OR
this.property.subproperty = 'new value!';
this.notifyPath('property.subproperty');
```

In general, the dirty-checking mechanism is more performant. It works well for apps where one of
the following is true:

*   You use immutable data.
*   You always use the Polymer data mutation methods to make granular changes.

However, for apps that don't use immutable data and can't use the Polymer data methods, Polymer 2.0
provides the [`Polymer.MutableData`](/{{{polymer_version_dir}}}/docs/api/mixins/Polymer.MutableData)
mixin.

```js
class MyMutableElement extends Polymer.MutableData(Polymer.Element) { ... }
```

The `MutableData` mixin eliminates the dirty check for that element, so the code above would work
as intended.

```js
this.property.subproperty = 'new value!';
this.notifyPath('property');
```

This mutable data mode also lets you batch several changes before invoking property effects:


```js
this.property.arrayProperty.push({ name: 'Alice' });
this.property.stringProperty = 'new value!';
this.property.counter++;
this.notifyPath('property');
```

You can also use set or simply set a top-level property to invoke effects:

```js
this.set('property', this.property);
// or
this.property = this.property;
```

Using `set` to change a specific subproperty can often be the most efficient way to make changes.
However, elements that use `MutableData` shouldn't need to use this API, making it
more  compatible with alternate data-binding and state management libraries.

Note that when you re-set a property at the top-level, all property effects for that property and
its subproperties, array items, and so-on are re-run. In addition, observers with wildcard paths
(like `prop.*`) are only notified with the top-level change:

```js
// With MutableData mixin
// 'property.*' observers fire with the path 'property'
this.property.deep.path = 'another new value';
this.notifyPath('property');
```

Using `set` to set specific paths generates granular notifications:


```js
// 'property.*' observers fire with the path 'property.deep.path'
this.set('property.deep.path', 'new value');
```

If an element's properties only take primitive values, like strings, numbers or booleans, you don't
need to use `MutableData`. These values are always dirty-checked and `MutableData` would provide
no benefit. This is true for most simple UI elements. `MutableData` is likely to be useful for
complex reusable elements (like `dom-repeat` or `iron-list`), or for application-specific elements
that hold complex state information.

Note that the `MutableData` mixin does not affect the element's shadow DOM children. **Any element
that doesn't use the `Polymer.MutableData` mixin uses the default dirty-checking policy.**

If you're using the `dom-repeat` element, you can enable mutable data mode by setting its
`mutableData` property:

```html
<!-- standard dom-repeat in MutableData mode -->
<template is="dom-repeat" items="{{items}}" mutable-data>
  <div>{{item.name}}</div>
</template>
```


### Optional mutable data for reusable elements {#optional-mutable-data}

If you're building a reusable element that takes structured data, you can use the
[`Polymer.OptionalMutableData`](/{{{polymer_version_dir}}}/docs/api/mixins/Polymer.OptionalMutableData)
mixin. This mixin lets the element user select `MutableData` mode by setting the `mutableData`
property on the element.

```js
class MyStructuredDataElement extends Polymer.OptionalMutableData(Polymer.Element) {
  static get is() { return 'my-structured-data-element' }
}
```

The user can then use your element with either standard data flow, or the mutable data mode.

```html
<!-- custom element using standard data flow -->
<my-structured-data-element data="{{someData}}">
</my-structured-data-element>

<!-- custom element using MutableData mode  -->
<my-structured-data-element data="{{someData}}" mutable-data>
</my-structured-data-element>
```


The `dom-repeat` element is an example of an element built with this mixin.



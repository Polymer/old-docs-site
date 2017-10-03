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
  <script>Polymer({ is: 'name-card' });</script>
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
*relative to an element*. For example, the `<name-card>` element has data bindings for the paths
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

    ```
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
    this.users.push({ name: 'Maturin});
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
you're using a third-party library). In this case, you can use  the `notifyPath` and `notifySplices`
methods to *notify* the element about changes that have **already taken place.**

```js
// Notify Polymer that the value has changed
this.notifyPath('address.street');
```

When you call `notifyPath` or `notifySplices`, the element applies the appropriate property effects,
as if the changes had just taken place.

When calling `set` or `notifyPath`, you need to use the **exact path** that changed. For example,
calling `this.notifyPath('address')` doesn't pick up a change to `address.street` if the `address`
object itself remains unchanged. This is because Polymer performs dirty checking and doesn't produce
any property effects if the value at the specified path hasn't changed.

In most cases, if one or more properties of an
object have changed, or one or more items in an array have changed, you can force Polymer to skip
the dirty check by setting the property to an empty object or array, then back to the original
object or array.

```js
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
(like [template repeaters](/1.0/docs/devguide/templates#dom-repeat)) introduce new, nested scopes.

For observers and computed properties, the scope is always the element's properties.

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

### Two paths referencing the same object {#two-paths}

Sometimes an element has two paths that point to the same object.

For example, an element has two properties, `users` (an array) and `selectedUser` (an object). When
a user is selected, `selectedUser` refers to one of the objects in the array.


![A user-list element and an array with four items labeled \[0\] through \[3\]. The user-list has two properties, users and selectedUser. The users property is connected to the array by an arrow labeled 1. The selectedUser property is connected to the array item, \[1\] by an arrow labeled 2.](/images/1.0/data-system/linked-paths-new.png)

1.  The `users` property references the array itself.
2.  The `selectedUser` property references an item in the array.

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

```
<script>
  Polymer({
    is: 'custom-element',
    properties: {
      someProp: {
        type: String,
        notify: true
      }
    }
  });
</script>
...

<!-- changes to "value" propagate downward to "someProp" on child -->
<!-- changes to "someProp" propagate upward to "value" on host  -->
<custom-element some-prop="{{value}}"></custom-element>
```

Example 2: One-way binding (downward) { .caption }

```
<script>
  Polymer({
    is: 'custom-element',
    properties: {
      someProp: {
        type: String,
        notify: true
      }
    }
  });
</script>

...

<!-- changes to "value" propagate downward to "someProp" on child -->
<!-- changes to "someProp" are ignored by host due to square-bracket syntax -->
<custom-element some-prop="[[value]]"></custom-element>
```

Example 3: One-way binding (downward) { .caption }

```
<script>

  Polymer({
    is: 'custom-element',
    properties: {
      someProp: String    // no notify:true!
    }
  });

</script>
...

<!-- changes to "value" propagate downward to "someProp" on child -->
<!-- changes to "someProp" are not notified to host due to notify:falsey -->
<custom-element some-prop="{{value}}"></custom-element>
```

Example 4: One-way binding (upward, child-to-host) { .caption }

```
<script>
  Polymer({
    is: 'custom-element',
    properties: {
      someProp: {
        type: String,
        notify: true,
        readOnly: true
      }
    }
  });
</script>

...

<!-- changes to "value" are ignored by child due to readOnly:true -->
<!-- changes to "someProp" propagate upward to "value" on host  -->
<custom-element some-prop="{{value}}"></custom-element>
```

Example 5: Error / non-sensical state { .caption }

```
<script>
  Polymer({
    is: 'custom-element',
    properties: {
      someProp: {
        type: String,
        notify: true,
        readOnly: true
      }
    }
  });
</script>
...
<!-- changes to "value" are ignored by child due to readOnly:true -->
<!-- changes to "someProp" are ignored by host due to square-bracket syntax -->
<!-- binding serves no purpose -->
<custom-element some-prop="[[value]]"></custom-element>
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
    "myArray.splices", and the `detail.value` field is a change record, like the one described in the documentation on [array observation](/{{{polymer_version_dir}}}/docs/devguide/observers#array-observation).

    When you mutate an array, Polymer also generates a change event for the array's `length` property (for example, `detail.path` is "`myArray.length`" and `detail.value` is the new length of the array).

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
*   Firing change notification events.
*   Invoking observers.

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







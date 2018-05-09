---
title: Work with object and array data
---

<!-- toc -->

The data system provides methods for making [observable changes](data-system#observable-changes) to
an element's model data (properties and subproperties). Use these methods to make observable changes
to arrays and object subproperties.

Related concepts:

-   [Data paths](data-system#paths).
-   [Observable changes](data-system#observable-changes).

## Specifying paths

A [data path](data-system#paths) is a series of path segments. *In most cases*, each path segment is
a property name. The data APIs accept two kinds of paths:

*   A string, with path segments separated by dots.

*   An array of strings, where each array element is either a path segment or a dotted path.

The following all represent the same path:


```
"one.two.three"
["one", "two", "three"]
["one.two", "three"]
```

There are a few special types of path segments.


*   Wildcard paths (like `foo.*`) represent _all changes to a given path and its subproperties_,
    including array mutations.
*   Array mutation paths (like `foo.splices`) represent all array mutations to a given array.
*   Array item paths (like `foo.11`) represent an item in an array.

## Get a value by path {#get-value}

Use the [`get`](/{{{polymer_version_dir}}}/docs/api/polymer-element#PolymerElement-method-get) method to retrieve a value based on
its path.

```
// retrieve a subproperty by path
var value = this.get('myProp.subProp');
// Retrieve the 11th item in myArray
var item = this.get(['myArray', 11])

```

## Set a property or subproperty by path {#set-path}

Use the [`set`](/{{{polymer_version_dir}}}/docs/api/polymer-element#PolymerElement-method-set) method to
make an [observable change](data-system#observable-changes) to a subproperty.

```js
// clear an array
this.set('group.members', []);
// set a subproperty
this.set('profile.name', 'Alex');
```

Calling `set` has no effect if the value of the property or subproperty doesn't change. In
particular, calling `set` on an object property won't cause Polymer to pick up changes to the
object's subproperties, unless the object itself changes. Likewise, calling `set` on an array
property won't cause Polymer to pick up array mutations that have already been made:

```
// DOES NOT WORK
this.profile.name = Alex;
this.set('profile', this.profile);

// DOES NOT WORK
this.users.push({name: 'Grace'});
this.set('users', this.users);
```

In both cases an object to itself doesn't have any effect—the object hasn't changed. Instead,
you can use [`notifyPath`](#notifyPath) to inform Polymer of a subproperty change that's already
happened. For an array, you can either use Polymer's array mutation methods as described in
[Mutate an array](#array-mutation), or notify Polymer after the fact as described in
[Notify Polymer of array mutations](#notifysplices).

**MutableData** For elements that include the `Polymer.MutableData` mixin, calling `set` on an
object or array causes Polymer to re-evaluates the entire object graph starting at
that object or array, even if the object or array itself hasn't changed. For details, see
[Using the MutableData mixin](data-system#mutable-data).
{.alert .alert-info}


Related tasks:

-   [Notify Polymer of a subproperty change](#notify-path)
-   [Mutate an array](#array-mutation)
-   [Notify Polymer of array mutations](#notifysplices)

### Notify Polymer of a subproperty change {#notify-path}

After making changes to an object subproperty, call `notifyPath` to make the change
[_observable_](data-system#observable-changes) to the data system.

```
this.profile.name = Alex;
this.notifyPath('profile.name');
```

When calling `notifyPath`, you need to use the **exact path** that changed. For example, calling
`this.notifyPath('profile')` doesn't pick up a change to `profile.name` because the `profile` object
itself hasn't changed.

**MutableData** For elements that include the `Polymer.MutableData` mixin, calling `notifyPath` on an
object or array causes Polymer to re-evaluates the entire object graph starting at
that object or array, even if the object or array itself hasn't changed. For details, see
[Using the MutableData mixin](data-system#mutable-data).
{.alert .alert-info}

## Work with arrays {#work-with-arrays}

Use Polymer's array mutation methods to make [observable changes](data-system#observable-changes)
to arrays.

If you manipulate an array using the native methods (like `Array.prototype.push`), you can notify
Polymer after the fact, as described in [Batch changes to an object or array](#batch-changes).

### Mutate an array {#array-mutation}

When modifying arrays, Polymer provides a set of array mutation methods that mimic
`Array.prototype` methods, with the exception that
they take a `path` string as the first argument.  The `path` argument identifies
an array on the element to mutate, with the following arguments matching those
of the native `Array` methods.

These methods perform the mutation action on the array, and then notify other elements that may be
bound to the same array of the changes. You can use these methods when mutating an array
to ensure that any elements watching the array (via observers, computed properties,
or data bindings) are kept in sync.

Every Polymer element has the following array mutation methods available:

*   <code>push(<var>path</var>, <var>item1</var>, [..., <var>itemN</var>])</code>
*   <code>pop(<var>path</var>)</code>
*   <code>unshift(<var>path</var>, <var>item1</var>, [..., <var>itemN</var>])</code>
*   <code>shift(<var>path</var>)</code>
*   <code>splice(<var>path</var>, <var>index</var>, <var>removeCount</var>, [<var>item1</var>,
    ..., <var>itemN</var>])</code>


Example { .caption }

```js
import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';
import '@polymer/polymer/lib/elements/dom-repeat.js';

class XCustom extends PolymerElement {
  static get template() {
    return html`
      <template is="dom-repeat" items="[[users]]"><p>{{item}}</p></template>
      <p><button on-click="addUser">add</button><button on-click="removeUser">remove</button><button on-click="_reset">reset</button></p>
    `;
  }
  constructor() {
    super();
    this._reset();
  }
  addUser() {
    var user = "wing sang";
    this.push('users', user);
  }
  removeUser() {
    var user = "wing sang";
    var index = this.users.indexOf(user);
    this.splice('users', index, 1);
  }
  _reset() {
    this.users=["wing sang", "deshaun", "kelley"];
  }
}
customElements.define('x-custom', XCustom);
```

[See it on Plunker](https://plnkr.co/edit/3LTcb2?p=info)

The `set` method can also be used to manipulate arrays by using an array path. For example, to
to replace the array item at index 3:

```js
this.set('users.3', {name: 'Churchill'});
```

Sometimes it's not convenient to use the Polymer array mutation methods. In this event, you have
a few choices:

*   Use the [`notifySplices`](#notifysplices) method to notify Polymer after the fact.

*   Use the `MutableData` mixin. For elements that include the `Polymer.MutableData` mixin, calling
    `set` or `notifyPath` on an object or array causes Polymer to re-evaluate the entire object
    graph starting at that object or array, even if the object or array itself hasn't changed. For
    details, see [Using the MutableData mixin](data-system#mutable-data).

### Notify Polymer of array mutations {#notifysplices}

Whenever possible you should always use Polymer's [array mutation methods](#array-mutation).
However, this isn't always possible. For example, you may be using a third-party library
that does not use Polymer's array mutation methods. In these scenarios you can call
<a href="/{{{polymer_version_dir}}}/docs/api/polymer-element#PolymerElement-method-notifySplices">`notifySplices`</a>
after the mutations to ensure that any Polymer elements observing the array
are properly notified of the changes.

The `notifySplices` method requires the array mutations to be *normalized* into a series of `splice`
operations. For example, calling `shift` on an array removes the first element of the array, so is
equivalent to calling `splice(0, 1)`.

Splices should be applied in index order, so that the element can update its internal representation
of the array.

If you can't know the exact changes that occurred, you can use the `MutableData` mixin. For elements
that include the `Polymer.MutableData` mixin, calling `set` or `notifyPath` on an object or array
causes Polymer to re-evaluate the entire object graph starting at that object or array, even if the
object or array itself hasn't changed. For details, see [Using the MutableData mixin](data-system#mutable-data).


## Batch multiple property changes {#set-property}

Use [`setProperties`](/{{{polymer_version_dir}}}/docs/api/polymer-element#PolymerElement-method-setProperties)
method to make a batch change to a set of properties. This ensures the property changes
run as a coherent set.

```js
this.setProperties({
  date: 'Jan 17, 2017',
  verified: true
});
```

`setProperties` supports an optional `setReadOnly` flag as the second parameter. If you need to set
read-only properties as part of a batch change, pass true for the second parameter:

```js
this.setProperties({
  date: 'Jan 17, 2017',
  verified: true
}, true);
```

## Link two paths to the same object {#linkpaths}

Use the [`linkPaths`](/{{{polymer_version_dir}}}/docs/api/polymer-element#PolymerElement-method-linkPaths)
method to associate two paths. Use `linkPaths` when an element has two paths that refer to the same
object, as described in [Two paths referencing the same object](data-system#two-paths).

When two paths are *linked*, an [observable change](data-system#observable-changes) to one path is
observable on the other path, as well.

```js
linkPaths('selectedUser', 'users.1');
```

**Both paths must be relative to the same element.** To propagate changes _between_ elements, you
must use a [data binding](data-binding).
{.alert .alert-info}

To remove a path linkage, call `unlinkPaths`, passing in the first path you passed to
`linkPaths`:

```js
unlinkPaths('selectedUser');
```

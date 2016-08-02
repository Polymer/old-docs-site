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

Use the [`get`](/1.0/docs/api/Polymer.Base#method-get) method to retrieve a value based on
its path.

```
// retrieve a subproperty by path
var value = this.get('myProp.subProp');
// Retrieve the 11th item in myArray
var item = this.get(['myArray', 11])

```

## Set a property or subproperty by path {#set-path}

Use the [`set`](/1.0/docs/api/Polymer.Base#method-set) method to make an [observable
change](data-system#observable-changes) to a subproperty.

```
// clear an array
this.set('group.members', []);
// set a subproperty
this.set('profile.name', 'Alex');
```

Calling `set` has no effect if the value of the property or subproperty hasn't changed. In
particular, calling `set` on an object property won't cause Polymer to pick up changes to the
object's subproperties, unless the object itself changes. Likewise, calling `set` on an array
property won't cause Polymer to pick up array mutations.

```
// DOES NOT WORK—use notifyPath instead
this.profile.name = Alex;
this.set('profile', this.profile);

// DOES NOT WORK—use notifySplices instead
this.users.push({name: 'Grace'});
this.set('users', this.users);
```

Related tasks:

-   [Notify Polymer of a subproperty change](#notify-path).
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

If multiple subproperties have changed, or you don't know the exact changes, see
[Override dirty checking](#override-dirty-check).


## Work with arrays {#work-with-arrays}

Use Polymer's array mutation methods to make [observable changes](data-system#observable-changes)
to arrays.

If you manipulate an array using the native methods (like `Array.prototype.push`), you can notify
Polymer after the fact.

Note that Polymer's array handling has the following constraints:

-   **Array items must be unique**. The data system uses object identity to compare
    array items, so array items must be unique.
-   **Primitive array items are not supported.** This is because primitives (like number, string
    and boolean values) with the same value are represented by the same object. Consider an array
    of numbers:

    ```
    this.numbers = [1, 1, 2];
    ```

    The data system can't handle changes to this array property, because the first two items aren't
    unique.

You can work around these constraints by wrapping primitives in objects to ensure uniqueness:

```
this.numbers = [{ value: 1}, {value: 1}, {value: 3}];
```

### Mutate an array {#array-mutation}

When modifying arrays, a set of array mutation methods are provided on Polymer
element prototypes which mimic `Array.prototype` methods, with the exception that
they take a `path` string as the first argument.  The `path` argument identifies
an array on the element to mutate, with the following arguments matching those
of the native `Array` methods.

These methods perform the mutation action on
the array, and then notify other elements that may be bound to the same
array of the changes.  You must use these methods when mutating an array
to ensure that any elements watching the array (via observers, computed properties,
or data bindings) are kept in sync.

Every Polymer element has the following array mutation methods available:

*   <code>push(<var>path</var>, <var>item1</var>, [..., <var>itemN</var>])</code>
*   <code>pop(<var>path</var>)</code>
*   <code>unshift(<var>path</var>, <var>item1</var>, [..., <var>itemN</var>])</code>
*   <code>shift(<var>path</var>)</code>
*   <code>splice(<var>path</var>, <var>index</var>, <var>removeCount</var>, [<var>item1</var>,
    ..., <var>itemN</var>])</code>

Example: { .caption }

```
<dom-module id="custom-element">
  <template>
    <template is="dom-repeat" items="[[users]]">{{item}}</template>
  </template>

  <script>
    Polymer({

      is: 'custom-element',

      addUser: function(user) {
        this.push('users', user);
      },

      removeUser: function(user) {
        var index = this.users.indexOf(user);
        this.splice('users', index, 1);
      }

    });
  </script>
</dom-module>
```

### Notify Polymer of array mutations {#notifysplices}


Whenever possible you should always use Polymer's [array mutation methods](#array-mutation).
However, this isn't always possible. For example, you may be using a third-party library
that does not use Polymer's array mutation methods. In these scenarios you can call
<a href="/1.0/docs/api/Polymer.Base#method-notifySplices">`notifySplices`</a>
after each mutation to ensure that any Polymer elements observing the array
are properly notified of the changes.

The `notifySplices` method requires the array mutations to be *normalized* into a series of `splice`
operations. For example, calling `shift` on an array removes the first element of the array, so is
equivalent to calling `splice(0, 1)`.

Splices should be applied in index order, so that the element can update its internal representation
of the array.

If you don't know the exact changes that occurred (for example, if you manipulate
the array using a third-party library), you can force the data system to refresh the
entire array—see [Override dirty checking](#override-dirty-check).

### Look up an array item by key {#get-array-item}

To retrieve an array item by key, you can simply use the `get` method described in [Get a value
by path](#get-value).

```
var item = this.get(['myArray', key]);
```

### Find the index for an array item {#get-array-index}

In some situations, such as inside an observer, you may have an array key or the array item itself,
but not have its index. If you have the key or the full path to the item, use `get` to look up the
item. Then use the standard array `indexOf` method to determine the index.

```
// Delete an item, based on the item's key
var item = this.get(['myArray', key]);
var index = this.myArray.indexOf(item);
if (index != -1) {
  this.splice('myArray', index, 1, )
}
```

## Override dirty checking {#override-dirty-check}

When processing an [observable change](data-system#observable-changes), Polymer performs dirty
checking and doesn't produce any property effects if the value at the specified path hasn't changed.

Sometimes, when you have a number of changes to an object or array, or you don't know the exact
changes to the object or array, it's desirable to skip the dirty checking.

To force the data system to skip the dirty check, set a path to an empty object or array,
then back to the original object or array. This makes the data system re-evaluate all property
effects related to that path and its subpaths.

```
// Force data system to pick up subproperty changes
var address = this.address;
this.address = {};
this.address = address;
```

```
// Force data system to pick up array mutations
var array = this.myArray;
this.myArray = [];
this.myArray = array;
```

This pattern also works with `set`:

```
// Force data system to reevaluate a subproperty
var members = this.group.members;
this.set('group.members', []);
this.set('group.members', members);
```

If the property is a large array or a complicated object, this process may be expensive.

## Link two paths to the same object {#linkPaths}

Use the [`linkPaths`](/1.0/docs/api/Polymer.Base#method-linkPaths) method to associate two paths.
Use `linkPaths` when an element has two paths that refer to the same object, as described in
[Two paths referencing the same object](data-system#two-paths).

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




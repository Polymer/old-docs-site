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

Use the [`get`](/{{{polymer_version_dir}}}/docs/api/elements/Polymer.Element#method-get) method to retrieve a value based on
its path.

```
// retrieve a subproperty by path
var value = this.get('myProp.subProp');
// Retrieve the 11th item in myArray
var item = this.get(['myArray', 11])

```

## Set a property or subproperty by path {#set-path}

Use the [`set`](/{{{polymer_version_dir}}}/docs/api/elements/Polymer.Element#method-set) method to make an [observable
change](data-system#observable-changes) to a subproperty.

```js
// clear an array
this.set('group.members', []);
// set a subproperty
this.set('profile.name', 'Alex');
```

When  you call `set` on an object or array, Polymer re-evaluates the entire object graph starting at
that object or array.

```js
this.profile.name = Alex;
this.set('profile', this.profile);

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

When you call `notifyPath` on an object or array, Polymer re-evaluates the entire object graph
starting at that object or array. For example, calling `this.notifyPath('profile')` picks up a
change to `profile.name` even if the `profile` object itself hasn't changed.

If multiple subproperties have changed, or you don't know the exact changes, you can notify
on the parent path to force Polymer to re-evaluate an entire object or array.

```
this.notifyPath('profile');
```

For more information, see [Batch changes to an object or array](#batch-changes).

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
or data bindings) are kept in sync. (Alternately, you can mutate the array using native methods,
then notify Polymer as described in [Batch changes to an object or array](#batch-changes).)

Every Polymer element has the following array mutation methods available:

*   <code>push(<var>path</var>, <var>item1</var>, [..., <var>itemN</var>])</code>
*   <code>pop(<var>path</var>)</code>
*   <code>unshift(<var>path</var>, <var>item1</var>, [..., <var>itemN</var>])</code>
*   <code>shift(<var>path</var>)</code>
*   <code>splice(<var>path</var>, <var>index</var>, <var>removeCount</var>, [<var>item1</var>,
    ..., <var>itemN</var>])</code>

Example { .caption }

```html
<link rel="import" href="components/polymer/polymer-element.html">
<link rel="import" href="components/polymer/src/elements/dom-repeat.html">

<dom-module id="x-custom">
  <template>
    <template is="dom-repeat" items="[[users]]">{{item}}</template>
  </template>

  <script>
    class XCustom extends Polymer.Element {

      static get is() {return 'custom-element'}

      addUser(user) {
        this.push('users', user);
      }

      removeUser(user) {
        var index = this.users.indexOf(user);
        this.splice('users', index, 1);
      }

    }
    customElements.define(XCustom.is, XCustom);
  </script>
</dom-module>
```

Sometimes it's not convenient to use the Polymer [array mutation methods](#array-mutation),
or you don't know the exact changes that occurred (for example, if you manipulate
the array using a third-party library).

In this case, you can force the data system to refresh the
entire array:

```
this.notifyPath('myArray');
```

For more  information, see [Batch changes to an object or array](#batch-changes).


## Batch changes to an object or array {#batch-changes}

After making a set of unobservable changes to an object or array, you can signal Polymer to
reevaluate the entire object or array by calling `notifyPath`.

This can be more performant than making individual observable changes, because the related property
effects are only evaluated once. For example, when making multiple changes to an object:

```js
// Mutate object
this.address.street = 'Half Moon Street';
this.address.number = '123';
this.address.name = 'Smith';
// Force data system to pick up subproperty changes
this.notifyPath('address');
```

Similarly, when you make multiple changes to an array:

```js
// Mutate array
this.myArray.push(newItem1, newItem2);
this.myArray.splice(1, 2, newItem3, newItem4);
// Force data system to pick up array mutations
this.notifyPath('myArray');
```

If the property is a large array or a complicated object, this process may be expensive.

## Batch multiple property changes {#set-property}

Use `setProperties` to make a batch change to a set of properties. This ensures the property changes
run as a coherent set.

```js
this.setProperties({
  date: 'Jan 17, 2017',
  verified: true
});
```



## Link two paths to the same object {#linkpaths}

Use the [`linkPaths`](/{{{polymer_version_dir}}}/docs/api/elements/Polymer.Element#method-linkPaths) method to associate two paths.
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




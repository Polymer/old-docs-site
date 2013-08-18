---
layout: default
title: ObserveJS

feature:
  status: <span class="label label-success">functional</span>
  code: https://github.com/polymer/observe-js
---

{% include spec-header.html %}

{% comment %}
{% include_external polymer-all/observe-js/README.md %}
{% include toc.html %}
{% endcomment %}

**Note:** {{site.project_title}} uses {{page.title}} under the hood. You do not need to use this library directly.  This document is provided as reference.
{: .alert .alert-info }

{{page.title}} is a library for observing changes in JavaScript data. It exposes a high-level
path/object/array observation API on top of `Object.observe()`, with fallback to dirty-checking.

## Observation types {#observationtypes}

{{page.title}} exposes three classes for observing different types of data:

1. `PathObserver`
1. `ObjectObserver`
1. `ArrayObserver`

### PathObserver {#path}

`PathObserver` allows code to react to changes on a path within an object. 

    var observer = new PathObserver(obj, 'foo.bar.baz', function(newValue, oldValue) {
      // respond to obj.foo.bar.baz having changed value.
    });

Details:

* If a path is unreachable from the provided object, its value is `undefined`
* If a path is empty (`''`), its value is the object provided
* Path observation respects `prototype` values.
* `PathObserver.getValueAtPath(obj, 'foo.bar.baz')` is provided in order to retrieve a `path value` without observing it.
* `PathObserver.setValueAtPath(obj, 'foo.bar.baz')` is provided in order to set the `path value`. Setting will create a final property, but not create objects.

### ObjectObserver {#objects}

`ObjectObserver` allows code to react to all property changes of a given object. 

    var observer = new ObjectObserver(obj, function(added, removed, changed, getOldValueFn) {
      // respond to changes to the obj.
      Object.keys(added).forEach(function(property) {
        property; // a property which has been been added to obj
        added[property]; // its value
      });
      Object.keys(removed).forEach(function(property) {
        property; // a property which has been been removed from obj
        getOldValueFn(property); // its old value
      });
      Object.keys(changed).forEach(function(property) {
        property; // a property on obj which has changed value.
        changed[property]; // its value
        getOldValueFn(property); // its old value
      });
    });

Details:

* Changes are reported as `added`, `removed`, and `changed` properties. Each is an object whose keys are property names and whose values the present value of that property on the object.
* The forth argument (`getOldValueFn`) provided to callback, will retrieve the previous value of a given property if a change to it was reported.
* `ObjectObserver` does not respect `prototype` values.

### ArrayObserver {#array}

`ArrayObserver` allows code to react to changes in the indexed valued properties of an Array. 

    var observer = new ArrayObserver(arr, function(splices) {
      // respond to changes to the elements of arr.
      splices.forEach(function(splice) {
        splice.index; // index position that the change occurred.
        splice.removed; // an array of values representing the sequence of elements which were removed
        splice.addedCount; // the number of elements which were inserted.
      });
    });

Details:

* Changes to non-indexed valued properties are not reported (e.g. `arr.foo`)
* Regardless of what caused the change (e.g. `splice()`, `arr[4] = 4`, `arr.length = 4`), the effects are reported as splices.
* The changes reported are the minimal set of splices required to transform the previous state of `arr` to the present state (`ArrayObserver.applySplices(splices, copyOfOldArray);` will actually do this).
* `ArrayObserver` does not respect `prototype` values.

## Common Methods

`PathObserver`, `ArrayObserver`, and `ObjectObserver` expose a set of common methods.

### deliver()

Calling `observer.deliver()` forces changes to be delivered.

    var obj = { id: 1 }
    var observer = new ObjectObserve(obj, function(added, removed, changed, getOldValueFn) {
      // react.
    });
    obj.id = 2;

    observer.deliver(); // causes the callback to be invoked reporting the change in value to obj.id.

### reset()

Calling `observer.reset()` resets an observer, discarding any previous changes.

    var arr = [1, 2, 3];
    var observer = new ArrayObserver(arr, function(splices) {
      // react.
    });
    arr.push(4);

    observer.reset(); // observer forgets about prior changes
    observer.deliver(); // because of the reset, there is nothing to report so callback is not invoked.

### close()

Calling `observer.close()` stops future callbacks from being delivered.

    var obj = { foo: { bar: 2 } };
    var observer = new PathObserver(arr, function(newValue, oldValue) {
      // react.
    });
    obj.foo.bar = 3;

    observer.close(); // the observer is now invalid and will never fire its callback

## How changes are delivered {#deliveringchanges}

ObserveJS is intended to be used alongside `Object.observe()`, but it works in
environments which do not support it natively. 

<table class="table">
  <tr>
    <th><code>Object.observe()</code></th><th>Behavior</th>
  </tr>
  <tr>
    <td>Available</td>
    <td>If observers have changes to report, their callbacks will be invoked at the end of the current turn (microtask). In a browser environment, this is generally at the end of an event.</td>
  </tr>
  <tr>
    <td>Absent</td>
    <td><code>Platform.performMicrotaskCheckpoint()</code> must be called to trigger delivery of changes. <b>Note</b>: If <code>Object.observe()</code> is implemented <code>Platform.performMicrotaskCheckpoint()</code> has no effect.</td>
  </tr>
</table>

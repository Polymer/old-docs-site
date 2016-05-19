---
title: Instance methods
---

<!-- toc -->

To add an instance method to your element, just add a method on the element's prototype.

```
Polymer({
    is: 'cat-element',
    _says: 'meow',
    speak: function() {
      console.log(this._says);
    }
});
```

You can invoke the method on any instance of your element.

```
var cat1 = document.querySelector('cat-element');
cat1.speak();
var cat2 = document.createElement('cat-element');
cat2.speak();
```


## Built-in methods {#instance-methods}

All Polymer elements inherit from [`Polymer.Base`](/1.0/docs/api/Polymer.Base), which
provides a set of useful convenience functions for instances to use.

This section summarizes some common instance methods. For a complete list of methods, see the [`Polymer.Base`](/1.0/docs/api/Polymer.Base) API docs.



*   [`$$(selector)`](/1.0/docs/api/Polymer.Base#method-$$). Returns the first node in this element's local DOM that matches
    `selector`.

*   [`fire(type, [detail], [options])`](/1.0/docs/api/Polymer.Base#method-fire). Fires a custom event. The `options` object can contain
      the following properties:

    -   `node`. Node to fire the event on (defaults to `this`).

    -   `bubbles`. Whether the event should bubble. Defaults to `true`.

    -   `cancelable`. Whether the event can be canceled with `preventDefault`. Defaults to `false`.

### Async and debounce

*   [`async(method, [wait])`](/1.0/docs/api/Polymer.Base#method-async). Calls `method` asynchronously. If no wait time is specified,
    runs tasks with microtask timing (after the current method finishes, but before the
    next event from the event queue is processed). Returns a handle that can be used to cancel
    the task.

*   [`cancelAsync(handle)`](/1.0/docs/api/Polymer.Base#method-cancelAsync). Cancels the identified async task.

*   [`debounce(jobName, callback, [wait])`](/1.0/docs/api/Polymer.Base#method-debounce). Call `debounce` to collapse multiple
    requests for a named task into one invocation, which is made after the wait
    time has elapsed with no new request.  If no wait time is given, the callback
    is called at microtask timing (guaranteed to be before paint).

*   [`cancelDebouncer(jobName)`](/1.0/docs/api/Polymer.Base#method-cancelDebouncer). Cancels an active debouncer without calling the callback.

*   [`flushDebouncer(jobName)`](/1.0/docs/api/Polymer.Base#method-flushDebouncer). Calls the debounced callback immediately and cancels the debouncer.

*   [`isDebouncerActive(jobName)`](/1.0/docs/api/Polymer.Base#method-isDebouncerActive). Returns true if the named debounce task is waiting to run.

### Class and attribute manipulation

*   [`toggleClass(name, bool, [node])`](/1.0/docs/api/Polymer.Base#method-toggleClass). Toggles the named boolean class on the
    host element, adding the class if `bool` is truthy and removing it if
    `bool` is falsey. If `node` is specified, sets the class on `node` instead
    of the host element.

*   [`toggleAttribute(name, bool, [node])`](/1.0/docs/api/Polymer.Base#method-toggleAttribute). Like `toggleClass`, but toggles the named boolean attribute.

*   [`attributeFollows(name, newNode, oldNode)`](/1.0/docs/api/Polymer.Base#method-attributeFollows). Moves a boolean attribute from `oldNode` to
    `newNode`, unsetting the attribute (if set) on `oldNode` and setting it on `newNode`.

*   [`classFollows(name, newNode, oldNode)`](/1.0/docs/api/Polymer.Base#method-classFollows). Moves a class from `oldNode` to
    `newNode`, removing the class (if present) on `oldNode` and adding it to `newNode`


### CSS transforms

*   [`transform(transform, [node])`](/1.0/docs/api/Polymer.Base#method-transform). Applies a CSS transform to the specified node,
    or host element if no node is specified.
    `transform` is specified as a string. For example:

         this.transform('rotateX(90deg)', this.$.myDiv);

*   [`translate3d(x, y, z, [node])`](/1.0/docs/api/Polymer.Base#method-translate3d). Transforms the specified node, or host element
    if no node is specified. For example:

        this.translate3d('100px', '100px', '100px');

### Imports and URLs

*   [`importHref(href, onload, onerror)`](/1.0/docs/api/Polymer.Base#method-importHref). Dynamically imports an HTML document.

    ```
    this.importHref('path/to/page.html', function(e) {
        // e.target.import is the import document.
    }, function(e) {
        // loading error
    });
    ```

    **Note:** To call `importHref` from outside a Polymer element, use `Polymer.Base.importHref`.
    { .alert .alert-info }

*   [`resolveUrl(url)`](/1.0/docs/api/Polymer.Base#method-resolveUrl). Takes a URL relative to the `<dom-module>` of an imported Polymer
    element, and returns a path relative to the current document. This method can be used, for example,
    to refer to an asset delivered alongside an HTML import.

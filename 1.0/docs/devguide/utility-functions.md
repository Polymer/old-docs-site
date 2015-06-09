---
layout: default
type: guide
shortname: Docs
title: Utility functions
subtitle: Developer guide
---

{% include toc.html %}


## Utility Functions {#utility-functions}

All {{site.project_title}} elements inherit from `{{site.project_title}}.Base`, which 
provides a set of useful convenience functions for instances to use.

*   `$$(selector)`. Returns the first node in this element's local DOM that matches
    `selector`.

*   `toggleClass(name, bool, [node])`. Toggles the named boolean class on the
    host element, adding the class if `bool` is truthy and removing it if
    `bool` is falsey. If `node` is specified, sets the class on `node` instead
    of the host element.

*   `toggleAttribute(name, bool, [node])`. Like `toggleClass`, but toggles the named boolean attribute.

*   `attributeFollows(name, newNode, oldNode)`. Moves a boolean attribute from `oldNode` to
    `newNode`, unsetting the attribute (if set) on `oldNode` and setting it on `newNode`.

*   `classFollows(name, newNode, oldNode)`. Moves a class from `oldNode` to
    `newNode`, removing the class (if present) on `oldNode` and adding it to `newNode`.

*   `fire(type, [detail], [options])`. Fires a custom event. The `options` object can contain
      the following properties:

    -   `node`. Node to fire the event on (defaults to `this`).

    -   `bubbles`. Whether the event should bubble. Defaults to `true`.

    -   `cancelable`. Whether the event can be canceled with `preventDefault`. Defaults to `false`.

*   `async(method, [wait])`. Calls `method` asynchronously. If no wait time is specified,
    runs tasks with microtask timing (after the current method finishes, but before the 
    next event from the event queue is processed). Returns a handle that can be used to cancel
    the task.

*   `cancelAsync(handle)`. Cancels the identified async task.

*   `debounce(jobName, callback, [wait])`. Call `debounce` to collapse multiple 
    requests for a named task into one invocation, which is made after the wait 
    time has elapsed with no new request.  If no wait time is given, the callback 
    is called at microtask timing (guaranteed to be before paint).

*   `cancelDebouncer(jobName)`. Cancels an active debouncer without calling the callback.

*   `flushDebouncer(jobName)`. Calls the debounced callback immediately and cancels the debouncer.

*   `isDebouncerActive(jobName)`. Returns true if the named debounce task is waiting to run.

*   `transform(transform, [node])`. Applies a CSS transform to the specified node,
    or host element if no node is specified.
    `transform` is specified as a string. For example:

         this.transform('rotateX(90deg)', this.$.myDiv);

*   `translate3d(x, y, z, [node])`. Transforms the specified node, or host element
    if no node is specified. For example:

        this.translate3d('100px', '100px', '100px');

*   `importHref(href, onload, onerror)`. Dynamically imports an HTML document.

        this.importHref('path/to/page.html', function(e) {
            // e.target.import is the import document.
        }, function(e) {
            // loading error
        });

    **Note:** To call `importHref` from outside a Polymer element, use `Polymer.Base.importHref`.
    {: .alert .alert-info }

*   `resolveUrl(url)`. Takes a URL relative to the `<dom-module>` of an imported {{site.project_title}} 
    element, and returns a path relative to the current document. This method can be used, for example,
    to refer to an asset delivered alongside an HTML import.

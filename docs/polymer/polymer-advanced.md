---
layout: default
type: core
navgroup: docs
shortname: Docs
title: Advanced topics
---

{% include toc.html %}

## Advanced topics {#additional-utilities}

- [`async()`](#asyncmethod)
- [`onMutation()`](#onMutation)
- [`unbindAll()` / `cancelUnbindAll()` / `asyncUnbindAll()`](#bindings)
  - [`.preventDispose`](#preventdispose)
- [`Platform.flush()`](#flush)

### Observing changes to light DOM children {#onMutation}

To know when light DOM children change, you can setup a Mutation Observer to 
be notified when nodes are added or removed. To make this more convenient, {{site.project_title}} adds an `onMutation()` callback to every element. Its first argument is the DOM element to 
observe. The second argument is a callback which is passed the `MutationObserver` and the mutation records:

    this.onMutation(domElement, someCallback);

**Example** - Observe changes to (light DOM) children elements:

    ready: function() {
      // Observe a single add/remove.
      this.onMutation(this, this.childrenUpdated);
    },
    childrenUpdated: function(observer, mutations) {
      // getDistributedNodes() has new stuff.

      // Monitor again.
      this.onMutation(this, this.childrenUpdated);
    }

### Dealing with asynchronous tasks {#asyncmethod}

Many things in {{site.project_title}} happen asynchronously. Changes are gathered up
and executed all at once, instead of executing right away. Batching
changes creates an optimization that (a) prevents duplicated work and (b) reduces unwanted [FOUC](http://en.wikipedia.org/wiki/Flash_of_unstyled_content).

[Change watchers](#change-watchers) and situations that rely on data-bindings
are examples that fit under this async behavior. For example, conditional templates may not immediately render after setting properties because changes to those renderings are saved up and performed all at once after you return from JavaScript.

To do work after changes have been processed, {{site.project_title}} provides `async()`.
It's similar to `window.setTimeout()`, but automatically binds `this` to the correct value:

    // async(inMethod, inArgs, inTimeout)
    this.async(function() {
      this.foo = 3;
    }, null, 1000);

    // Roughly equivalent to:
    //setTimeout(function() {
    //  this.foo = 3;
    //}.bind(this), 1000);

The first argument is a function or string name for the method to call asynchronously.
The second argument, `inArgs`, is an optional object or array of arguments to
pass to the callback.

In the case of property changes that result in DOM modifications, follow this pattern:

    Polymer('my-element', {
      propChanged: function() {
        // If "prop" changing results in our DOM changing,
        // schedule an update after the new microtask.
        this.async(this.updateValues);
      },
      updateValues: function() {...}
    });

### Life of an element's bindings {#bindings}

**Note:** The section only applies to elements that are instantiated in JavaScript, not to those
declared in markup.
{: .alert .alert-info }

If you instantiate an element (e.g. `document.createElement('x-foo')`) and do **not** add it to the DOM,
{{site.project_title}} asynchronously removes its {%raw%}`{{}}`{%endraw%} bindings and `*Changed` methods.
This helps prevent memory leaks, ensuring the element will be garbage collected. 

If you want the element to "remain active" when it's not in the `document`,
call `cancelUnbindAll()` right after you create or remove it. The [lifecycle methods](#lifecyclemethods)
are a good place for this:

    Polymer('my-element', {
      ready: function() {
        // Ensure bindings remain active, even if we're never added to the DOM.
        this.cancelUnbindAll();
      },
      detached: function() {
        // Also keep bindings active if we're added, but later removed.
        this.cancelUnbindAll();
      }
    });

{{site.project_title}} typically handles this management for you, but when you
explicitly call `cancelUnbindAll()` (and the element is never added to/put back in the DOM),
it becomes your responsibility to _eventually_ unbind the element using `unbindAll()/asyncUnbindAll()`,
otherwise your application may leak memory.

    var el = document.createElement('my-element');
    // Need to unbind if el is:
    //   1. never added to the DOM
    //   2. put in the DOM, but later removed
    el.unbindAll();

#### Using preventDispose {#preventdispose}

To force bindings from being removed in call cases, set `.preventDispose`:

    Polymer('my-element', {
      preventDispose: true
    });

### How data changes are propagated {#flush}

Data changes in {{site.project_title}} happen almost immediately (at end of a microtask)
when `Object.observe()` is available. When it's not supported, {{site.project_title}} uses a polyfill ([observe-js](https://github.com/Polymer/observe-js)) to poll and periodically propagate data-changes throughout the system. This is done through a method called `Platform.flush()`.

#### What is `Platform.flush()`?

`Platform.flush()` is part of {{site.project_title}}'s data observation polyfill, [observe-js](https://github.com/Polymer/observe-js). It dirty check's all objects that have been observed and ensures notification callbacks are dispatched. {{site.project_title}} automatically calls `Platform.flush()` periodically, and this should be sufficient for most application workflows. However, there are times when you'll want to call `Platform.flush()` in application code.

**Note**: on platforms that support `Object.observe()` natively, `Platform.flush()` does nothing.
{: .alert .alert-info }

#### When should I call `Platform.flush()`?

Instead of waiting for the next poll interval, one can manually schedule an update by calling `Platform.flush()`. **There are very few cases where you need to call `Platform.flush()` directly.**

If it's important that a data change propagates before the next screen paint, you may
need to manually call `Platform.flush()`. Here are specific examples:

1. A property change results in a CSS class being added to a node. Often, this works out fine, but sometimes, it's important to make sure the node does not display without the styling from the added class applied to it. To ensure this, call `Platform.flush()` in the property change handler after adding the CSS class.
2. The author of a slider element wants to ensure that data can propagate from it as the user slides the slider. A user of the element, might, for example, bind the slider's value to an input and expect to see the input change while the slider is moving. To achieve this, the element author calls `Platform.flush()` after setting the element's value in the `ontrack` event handler.

**Note:** {{site.project_title}} is designed such that change notifications are asynchronous. Both `Platform.flush()` and `Object.observe()` (after which it's modeled) are asynchronous. Therefore, **`Platform.flush()` should not be used to try to enforce synchronous data notifications**. Instead, always use [change watchers](#change-watchers) to be informed about state.

### How {{site.project_title}} elements prepare themselves {#prepare}

For performance reasons, `<polymer-element>`s avoid the expense of preparing ShadowDOM, event listeners, and property observers if they're created outside the main document.
This behavior is similar to how native elements such as `<img>` and `<video>` behave.
They remain in a semi-inert state when created outside the main document (e.g. an `<img>` avoids the expense of loading its `src`).

{{site.project_title}} elements prepare themselves automatically in the following cases:

1. when they're created in a `document` that has a `defaultView` (the main document)
2. when they receive the `attached` callback
3. when they're created in the `shadowRoot` of another element that is preparing itself

In addition, if the `.alwaysPrepare` property is set to `true`, {{site.project_title}} elements
prepare themselves even when they do not satisfies the above rules.

    Polymer('my-element', {
      alwaysPrepare: true
    });

**Note:** an element's [`ready()` lifecycle callback](#lifecyclemethods) is called after an element has been prepared. Use `ready()` to know when an element is done initializing itself.
{: .alert .alert-success }

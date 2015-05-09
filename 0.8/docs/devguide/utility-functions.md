---
layout: default
type: guide
shortname: Docs
title: Utility functions
subtitle: Developer guide
---

{% include toc.html %}


## Utility Functions {#utility-functions}

The {{site.project_title}} `Base` prototype provides a set of useful convenience functions for instances to use.  

*   `toggleClass(name, bool, [node])`. Toggles the named boolean class on the
    host element, adding the class if `bool` is truthy and removing it if
    `bool` is falsey. If `node` is specified, sets the class on `node` instead
    of the host element.

*   `toggleAttribute(name, bool, [node])`. Like `toggleClass`, but toggles the named boolean attribute.

*   `attributeFollows(name, newValue, oldValue)`. Moves a boolean attribute from `oldValue` to
    `newValue`, unsetting the attribute (if set) on `oldValue` and setting it on `newValue`.

*   `fire(type, [detail], [onNode], [bubbles], [cancelable])`. Fires a custom event.

*   `async(method)`. Calls `method` asynchronously, with microtask timing (after
    the current method finishes, but before the next event from the event queue
    is processed).

*   `transform(node, transform)`. Applies a CSS transform to the specified node.
    `transform` is specified as a string. For example:

	     this.transform(this.$.myDiv, 'rotateX(90deg)')

*   `translate3d(node, x, y, z)`. Transforms the specified node. For example:

        this.translate3d(this, '100px', '100px', '100px');

*   `importHref(href, onload, onerror)`

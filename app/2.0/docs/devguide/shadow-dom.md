---
title: Shadow DOM concepts
---

<!-- toc -->

Shadow DOM is a new DOM feature that helps you build components. You can think of shadow DOM as a
**scoped subtree** inside your element.

**Read more on Web Fundamentals**. This document gives an overview of shadow DOM as it relates to
Polymer. For a more comprehensive overview of Shadow DOM, see
[Shadow DOM v1: self-contained web components](https://developers.google.com/web/fundamentals/primers/shadowdom/?hl=en)
on Web Fundamentals.
{.alert .alert-info}

Consider a header component that includes a page title and a  menu button: The DOM tree for this
element might look like this:


```html
<my-header>
  <header>
    <h1>
    <button>
```


Shadow DOM lets you place the children in a scoped subtree, so document-level CSS can't restyle the
button by accident, for example. This subtree is called a shadow tree.


```
<my-header>
  #shadow-root
    <header>
      <h1>
      <button>
```


The *shadow root* is the top of the shadow tree. The element that the tree is attached to
(`<my-header>`) is called the *shadow host*.  The host has a property called `shadowRoot` that
refers to the shadow root. The shadow root has a `host` property that identifies its host element.

The shadow tree is separate from the element's `children`. You can think of this shadow tree as part
of the component's **implementation**, which outside elements don't need to know about. The
element's children are part of its public interface.

You can add a shadow tree to an element imperatively by calling `attachShadow`:


```js
var div = document.createElement('div');
var shadowRoot = div.attachShadow({mode: 'open'});
shadowRoot.innerHTML = '<h1>Hello Shadow DOM</h1>';
```


Polymer provides a declarative mechanism for adding a shadow tree using a [DOM template](dom-template).
When you provide a DOM template for an element, Polymer attaches a shadow root for each instance of
the element and copies the template contents into the shadow tree.


```html
<dom-module id="my-header">
  <template>
    <style>...</style>
    <header>
      <h1>I'm a header</h1>
      <button>Menu</button>
    </header>
  </template>
</dom-module>
```


Note that the template includes a `<style>` element. CSS placed in the shadow tree is scoped to the
shadow tree, and won't leak out to other parts of your DOM.

## Shadow DOM and composition

By default, if an element has shadow DOM, **the shadow tree is rendered instead of the element's
children.** To allow children to render, you can add a `<slot>` element to your shadow tree. Think
of the `<slot>` as a placeholder showing where child nodes will render. Consider the following
shadow tree for `<my-header>`:


```html
<header>
  <h1><slot></slot></h1>
  <button>Menu</button>
</header>
```


The user can add children like this:


```html
<my-header>Shadow DOM</my-header>
```


The header renders as if the `<slot>` element was replaced by the children:


```html
<my-header>
  <header>
    <h1>Shadow DOM</h1>
    <button>Menu</button>
  </header>
</my-header>
```


The element's actual descendant tree is sometime called its light DOM, in contrast to its shadow DOM
tree.

The process of turning the light DOM and shadow DOM trees into a single tree for rendering is called
*flattening* the tree. While the `<slot>` elements don't *render*, they are included in the
flattened tree, so they can take part in event bubbling, for example.

You can control where a child should be distributed into the flattened tree using *named slots*.


```html
<h2><slot name="title"></slot></h2>
<div><slot></slot></div>
```


A named slot only accepts top-level children that have a matching `slot` attribute:


```html
<span slot="title">A heading</span>
```


A slot with no `name` attribute acts as the default slot for any children that don't have a `slot`
attribute. If a child's `slot` attribute doesn't match any named slot element in the shadow tree,
that child doesn't appear at all.

For example, consider an `example-card` element with the following shadow tree:


```html
<h2><slot name="title"></slot></h2>
<div><slot></slot></div>
```


If the example card is used like this:


```html
<example-card>
  <span slot="title">Card Title</span>
  <div>
    Some text for the body of the card.
  </div>
  <span slot="footer">This footer doesn't show up.</span>
</example-card>
```


The first span is assigned into the `title` slot. The div, which has no `slot` attribute, is
assigned to the default slot. The final span, which has a slot name that doesn't appear in the
shadow tree, doesn't show up in the flattened tree, and doesn't render.

Note that only top-level children can match a slot. Consider the following example:


```html
<example-card>
  <div>
   <span slot="title">Am I a title?</span>
  </div>
  <div>
    Some body text.
  </div>
</example-card>
```




The `<example-card>` has two top-level children, both `<div>` elements. Both are assigned to the
default slot. The `slot` attribute on the span has no effect on the distribution, because the span
isn't a top-level child.

### Fallback content

A slot can contain *fallback content* that's displayed when no nodes are assigned to the slot. For
example:


```
<fancy-note>
  #shadow-root
    <slot name="icon">
      <img src="note.png">
    </slot>
    <slot></slot>
</fancy-note>
```


The user can supply their own icon for the <fancy-note> element like this:

```html
<!-- shows note with warning icon -->

<fancy-note>

  <img slot="icon" src="warning.png">

  Do not operate heavy equipment while coding.

</fancy-note>
```

If the user omits the icon, the fallback content supplies a default icon:

```html
<!-- shows note with default icon -->

<fancy-note>

  Please code responsibly.

</fancy-note>
```

### Multi-level distribution

A slot element may also be assigned to a slot. For example, consider two levels of shadow trees.


```
<parent-element>
  #shadow-root
    <child-element>
      <!-- parent-element renders its light DOM children inside
           child-element -->
      <slot id="parent-slot">

<child-element>
  #shadow-root
    <div>
      <!-- child-element renders its light DOM children inside this div -->
      <slot id="child-slot">
```


Given markup like this:


```html
<parent-element>
  <span>I'm light DOM</span>
</parent-element>
```


The flattened tree looks like this:


```
<parent-element>
  <child-element>
    <div>
      <slot id="child-slot">
        <slot id="parent-slot>
          <span>I'm in light DOM</span>
```


The ordering may be a little confusing at first. At each level, the light DOM children are
*assigned* to a slot in the host's shadow DOM. The span "I'm in light DOM" is *assigned* to the
slot `#parent-slot` in `<parent-element>`'s shadow DOM. The `#parent-slot` is then *assigned* to
`#child-slot` in `<child-element>`'s shadow DOM.

**Note:** This example uses `id` on slots for illustration purposes only.  This is not the same as
the `name` attribute.  These slots are unnamed and are therefore default slots.
{.alert .alert-info}

The slot elements don't render, so the rendered tree is much simpler:


```html
<parent-element>
  <child-element>
    <div>
      <span>I'm in light DOM</span>
```


In spec language, a slot's *distributed nodes* are the assigned nodes, with any slots replaced by
their assigned nodes or fallback content. So in the example above, `#child-slot` has one
distributed node, the span. You can think of the distributed nodes as the *list of nodes that take
the place of the slot in the rendered tree*.

### Slot APIs

Shadow DOM provides a few new APIs for checking distribution:


*   `HTMLElement.assignedSlot` property gives the assigned slot for an element, or `null` if the
    element isn't assigned to a slot.
*   `HTMLSlotElement.assignedNodes` method returns the list of nodes associated with a given slot.
    When called with the `{flatten: true}` option, returns the *distributed nodes* for a slot.
*   HTMLSlotElement.slotchange event is fired when a slot's distributed nodes change.

For more details, see [Working with slots in JS](https://developers.google.com/web/fundamentals/primers/shadowdom/?hl=en#workwithslots) on Web Fundamentals.


### Observe added and removed children {#observe-nodes}

The `Polymer.FlattenedNodesObserver` class provides utilities to track an element's _flattened tree_.
That is, a list of the node's child nodes, with any `<slot>` elements replaced by their distributed
nodes. `FlattenedNodesObserver` is an optional utility that can be loaded from
`lib/utils/flattened-nodes-observer.html`.

```html
<link rel="import" href="/bower_components/polymer/lib/utils/flattened-nodes-observer.html">
```

`Polymer.FlattenedNodesObserver.getFlattenedNodes(node)` returns a list of flattened nodes for
the specified node.

Use the `Polymer.FlattenedNodesObserver` class to track when the flattened node list changes.

```js
this._observer = new Polymer.FlattenedNodesObserver(this.$.slot, (info) => {
  this._processNewNodes(info.addedNodes);
  this._processRemovedNodes(info.removedNodes);
});
```

You pass the `FlattenedNodesObserver` a callback to be invoked when nodes are added or
removed. The callback takes a single Object argument, with `addedNodes` and
`removedNodes` arrays.

The method returns a handle that can be used to stop observation:

```js
this._observer.disconnect();
```

A few notes on `FlattenedNodesObserver`:


*   The callback argument lists added and removed nodes, not just elements.
    If you're only interested in elements, you can filter the node list:

    ```js
    info.addedNodes.filter(function(node) {
      return (node.nodeType === Node.ELEMENT_NODE)
    });
    ```

*   The observer handle also provides a `flush` method, that can be used for unit testing.


## Event retargeting

To preserve the encapsulation of the shadow tree, some events are stopped at the shadow DOM boundary.

Other bubbling events are *retargeted* as they bubble up the tree. Retargeting adjusts the event's
target so that  it represents an element in the same scope as the listening element.

For example, given a tree like this:


```html
<example-card>
  #shadow-root
    <div>
      <fancy-button>
        #shadow-root
          <img>
```

If the user clicks on the image element the click event bubbles up the tree:


*   A listener on the image element itself receives the `<img>` as the target.
*   A listener on the `<fancy-button>` receives the `<fancy-button>` as the target, because the
    original target is inside its shadow root.
*   A listener on the `<div>` in `<example-card>`'s shadow DOM also receives `<fancy-button>` as the
    target, since they are in the same shadow DOM tree.
*   A listener on the `<example-card>` receives the <example-card> itself as the target.

The event provides a `composedPath` method that returns an array of nodes that the event will pass
through. In this case, the array would include:

*   The `<img>` element itself.
*   The shadow root of `<fancy-button>`.
*   The `<div>` element.
*   The shadow root of `<example-card>`.
*   Any ancestors of `<example-card>` (for example, `<body>`, `<html>`, `document` and `Window`).

By default, custom events **don't** propagate though shadow DOM boundaries. To allow a custom event
to travel through a shadow DOM boundary and be retargeted, you need to create it with the `composed`
flag set to `true`:

```js
var event = new CustomEvent('my-event', {bubbles: true, composed: true});
```

For more information on events in shadow trees, see [The Shadow DOM event model](https://developers.google.com/web/fundamentals/getting-started/primers/shadowdom#events) in the Web Fundamentals article on shadow DOM.

## Shadow DOM styling

Styles inside a shadow tree are *scoped* to the shadow tree, and don't affect elements outside the
shadow tree. Styles outside the shadow tree also don't match selectors inside the shadow tree.
However, inheritable style properties like `color` still inherit down from host to shadow tree.

```
<style>

  body { color: white; }

  .test { background-color: red; }

</style>

<styled-element>
  #shadow-root
    <style>
      div { background-color: blue; }
    </style>
    <div class="test">Test</div>
```


In this example, the `<div>` has a blue background, even though the `div` selector is less specific
than the `.test` selector in the main document. That's because the main document selector doesn't
match the `<div>` in the shadow DOM at all. On the other hand, the white text color set on the
document body inherits down to `<styled-element>` and into its shadow root.

There is one case where a style rule inside a shadow tree matches an element outside the shadow tree.
You can define styles for the *host element*, using the `:host` pseudoclass or the `:host()`
functional pseudoclass.


```
#shadow-root
  <style>
    /* custom elements default to display: inline */
    :host {
      display: block;
    }
    /* set a special background when the host element
       has the .warning class */
    :host(.warning) {
      background-color: red;
    }
  </style>
```


You can also style light DOM children that are assigned to slots using the `::slotted()`
pseudoelement. For example, `::slotted(img)` selects any image tags that are assigned to slots in the
shadow tree.


```
  #shadow-root
    <style>
      ::slotted(img) {
        border-radius: 100%;
      }
    </style>
```


For more information, see [Styling](https://developers.google.com/web/fundamentals/getting-started/primers/shadowdom#styling) in the Web Fundamentals article on shadow DOM.

## Theming and custom properties

You can't directly style anything in a shadow tree using a CSS rule **outside** of the shadow tree.
The exception is CSS properties (such as color and font) that inherit down the tree. A shadow tree
inherits CSS properties from its host.

To let users customize your element, you can expose specific styling properties using CSS custom
properties and custom property mixins. Custom properties provide a way to add a styling API to your
element.

**Polyfill limitations.** When using polyfilled versions of custom properties and mixins, there are
a number of limitations you should be aware of. For details, see [the Shady CSS README file](https://github.com/webcomponents/shadycss/blob/master/README.md#limitations).

You can think of a custom property as a variable that can be substituted in to your CSS rules:


```
:host {
  background-color: var(--my-theme-color);
}
```


This sets the host's background color to the value of the `--my-theme-color` custom property. Anyone
using your element can set the property at a higher level:


```
html {
  --my-theme-color: red;
}
```


Custom properties inherit down the tree, so a value set at the document level is accessible from
inside a shadow tree.

The substitution can include default values to use if no property is set:


```
:host {
  background-color: var(--my-theme-color, blue);
}
```


The default can even be another `var()` function:


```
background-color: var(--my-theme-color, var(--another-theme-color, blue));
```


### Custom property mixins

Custom property *mixins* are a feature built on top of the custom property specification. Basically,
the mixin is a variable that contains multiple properties:


```
html {
  --my-custom-mixin: {
    color: white;
    background-color: blue;
  }
}
```


A component can import or *mix in* the entire set of rules using the `@apply` rule:


```
:host {
  @apply --my-custom-mixin;
}
```


The `@apply` rule has the same effect as adding the contents of `--my-custom-mixin` inline in the
ruleset where `@apply` is used.


## Shadow DOM polyfills

Because shadow DOM is not available on all platforms, Polymer takes advantage of the shady DOM and
shady CSS polyfills if they're installed. These polyfills are included in the `webcomponents-lite.js`
polyfill bundle.

These polyfills provide reasonable emulation of native shadow DOM while maintaining good performance.
However, there are some shadow DOM features that can't be polyfilled completely. If you're
supporting browsers that don't include native shadow DOM, you need to be aware of these limitations.
It's also helpful to understand some details of the shady DOM polyfill when debugging applications
under shady DOM.

### How the polyfills work

The polyfills use a combination of techniques to emulate shadow DOM:



*   Shady DOM. Maintains the logical divisions of shadow tree and descendant tree internally, so
    children added to the light DOM or shadow DOM render correctly. Patches DOM APIs on affected
    elements in order to emulate the native shadow DOM APIs.
*   Shady CSS. Provides style encapsulation by adding classes to shadow DOM children and rewriting
    style rules so that they apply to the correct scope.

The following sections discuss each polyfill in more depth.

#### Shady DOM polyfill

A browser without native shadow DOM only renders the document and its tree of descendants.

To emulate shadow DOM's rendering of the flattened tree, the shady DOM polyfill has to maintain
virtual `children` and `shadowRoot` properties with separate logical trees. Each host element's
actual `children`—the descendant tree visible to the browser—is a pre-flattened tree of shadow and
light DOM children. The tree you'll see using developer tools looks like the rendered tree, not the
logical tree.

Under the polyfill, the slot elements don't appear in the browser's view of the tree. So unlike
native shadow DOM, slots don't take part in event bubbling.

The polyfill patches existing DOM APIs on nodes that are affected by shadow DOM—that is, nodes
are in a shadow tree, nodes that hose a shadow tree, or nodes that are light DOM children of shadow
hosts. For example, when you call `appendChild` on a node with a shadow root, the polyfill adds the
child to a *virtual* tree of light DOM children, calculates where the child should appear in the
*rendered* tree, and then adds it to the actual descendant tree in the correct place.

For more information, see the [Shady DOM polyfill README](https://github.com/webcomponents/shadydom/blob/master/README.md).

#### Shady CSS polyfill

The Shady CSS polyfill emulates shadow DOM style encapsulation, and also provides emulation for CSS
custom properties and custom property mixins.

To emulate encapsulation, the shady CSS polyfill adds classes to elements inside a shady DOM tree.
It also rewrites style rules defined inside an element's template so that they're confined to the
element.

Shady CSS does not rewrite style rules in document-level stylesheets. This means that document-level
styles can leak into shadow trees. However, it provides a custom element, `<custom-style>` for
writing polyfilled styles outside of an element. This includes support for custom CSS properties and
rewriting rules so they don't leak into shadow trees.


```html
<custom-style>
  <style>
    /* Set CSS custom properties */
    html { --my-theme-color: blue; }
    /* Document-level rules in a custom-style don't leak into shady DOM trees */
    .warning { color: red; }
  </style>
</custom-style>
```


For more information, see the [Shady CSS polyfill README](https://github.com/webcomponents/shadycss/blob/master/README.md).

## Resources

For further reading:



*   [Shadow DOM v1: self-contained web components](https://developers.google.com/web/fundamentals/primers/shadowdom/?hl=en) on Web Fundamentals.
*   [Custom properties specification](https://www.w3.org/TR/css-variables-1/).
*   [Custom property mixins proposal](https://tabatkins.github.io/specs/css-apply-rule/).
*   [Shady DOM polyfill README](https://github.com/webcomponents/shadydom/blob/master/README.md).
*   [Shady CSS polyfill README](https://github.com/webcomponents/shadycss/blob/master/README.md).

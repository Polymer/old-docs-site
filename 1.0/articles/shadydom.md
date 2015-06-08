---
layout: default
type: article
shortname: Articles
title: "What is shady DOM?"
subtitle: Why do we need a new kind of DOM?

article: true
description: Why do we need a new kind of DOM?
published: 2015-05-28
#updated: 2014-10-17
author: sjmiles
polymer_version: "1.0"

tags:
- shadowdom
- shadydom
---


{% include authorship.html %}

{% include toc.html %}

## Why a new kind of DOM?

Encapsulation is at the core of web components. 

Web components aim to provide the user a **simple element interface** that is
rendered with **complexity hidden under the hood.**

Browsers often do this kind of encapsulation internally. Elements like
`<select>` or `<video>` are rendered as unreachable DOM subtrees, only the
browser vendors really know what’s in there.

There are libraries today that do this sort of thing via JavaScript. For
example, JQuery plugins allow you to target an element and imbue it with
abilities. Often a plugin will generate a bunch of DOM for you; this is how it
adds value. However, these plugin elements are not quite as nifty as `<select>`
or `<video>` because the DOM used to render the control ends up just sitting
there in your document, not hidden away.

The shadow DOM standard is aimed at bridging this gap. On browsers that support
shadow DOM, it’s possible to have an element that is rendered with complex DOM,
but have that complexity hidden away as implementation detail. Simple Markup is
Good

Let’s imagine an `x-fade` element that makes an image fade-in when it loads. You
use it like this:

    <x-fade>
      <img src="cool.png">
    </x-fade>

Let’s imagine we implement this element as a JQuery plugin, and the user “renders” the element this way:

    $('x-fade').makeFade();

The author is happy, because `x-fade` is doing its thing now. 

This is the virtue we want from Web Components: the author has used some simple
markup to acquire fancy functionality. But Web Components makes this experience
even better. The plugin version has problems with its DOM; problems that are
solved by shadow DOM. 

## DOM Pollution

After the `makeFade` call, let’s say the DOM looks something like this:

    <x-fade>
      <div>
        <img src="cool.png">
      </div>
      <canvas></canvas>
    </x-fade>

`x-fade` needs to add some DOM elements to implement its behavior. Sadly, these
elements are now exposed to the world. Exposing these nodes is problematic:


-   Details of the implementation are leaking.
-   Queries over the document now include the `<canvas>` and the `<div>`.
-   The new nodes may be affected by stylesheets, because the document author wasn’t expecting them.
-   The `<img>` node may lose styling, because it’s in a different part of the DOM tree now.
-   Can the developer add a new `<img>` or replace the old one? How can she do that, if the node is not where she left it?


## Tree Scoping

This is where shadow DOM comes in, or more generally speaking, there is where
_tree-scoping_ comes in. Tree-scoping is the ability to take a DOM subtree and
hide it from the main document scope. This is where the shadow nomenclature
comes from, as if we are hiding some DOM in the shadows (which is awesome, but
unfortunately sounds a bit nefarious).

If `x-fade` is implemented with shadow DOM, then after calling `makeFade`, the DOM tree looks like this:

    <x-fade>
      <img src="cool.png">
    </x-fade>

That is, exactly how it was before makeFade, which is the point.

The rendering is just as fancy, but from the developer’s perspective, it’s just
one node with one child, just as she wrote it.

So tree scoping with shadow DOM has solved our problems with the previous
implementation. Specifically:

-   Details of the implementation are hidden.
-   Queries over the document will not see the `<canvas>` or the `<div>`.
-   The new nodes are not affected by stylesheets, because they are not in the document scope.
-   The `<img>` node will not lose styling, because it never moves.
-   The developer can add a new `<img>` or replace the old one, it’s just a regular child of `x-fade`.

## Shadow DOM Encapsulation

If we draw a picture of the DOM that includes the shadow root, we can see where the extra goodies are:

    <x-fade>
      <img src="cool.png">
      #shadow-root
        <div>
          <content select="img">
        </div>
        <canvas></canvas>
    </x-fade>

OK, there’s our `<canvas>` and our `<div>` (and one other new thing: the `<content>`
node, this is the bit that tells the browser where and how to combine the
element's shadow tree with its regular children).

At render time, the element's children and shadow tree are _composed_ into a
single tree for rendering. In this case, the _composed tree_ looks just like the
classic jQuery version shown before:

    <x-fade>
      <div>
        <img src="cool.png">
      </div>
      <canvas></canvas>
    </x-fade>

## Shadow DOM is awesome, why is there a shady DOM?

Shadow DOM works by hiding the scoped DOM trees from the traditional tree
walking functions and accessors (`childNodes`, `children`, `firstChild` and so
on). These accessors return only the elements in your scope.

To polyfill shadow DOM turns out to be hard. The polyfill must ensure native DOM
always reflects the composed tree so the platform renders the right thing, while
only ever revealing the logical tree to the developer.

This means that all the tree-walking accessors (`childNodes`, `children`,
`firstChild`, and so on) have to be modified so they return custom information.
To present the logical tree to the developer, one has to wrap the entire DOM API
surface and indirect the responses through custom data structures.

The Shadow DOM Polyfill actually attempts this task, but there are costs: 

-   It’s a lot of code.
-   It’s slow to indirect all the DOM API.
-   Structures like `NodeList` can simply not be emulated.
-   There are certain accessors that cannot be overwritten (for example, `window.document`, `window.document.body`).
-   The polyfill returns objects that are not actually Nodes, but Node proxies, which can be very confusing.

Many projects simply cannot afford the Shadow DOM Polyfill, for the reasons
given above. In particular, the performance costs on platforms like mobile
Safari are nearly intolerable. 

## Shady DOM is Born

Roughly speaking, shady DOM provides a shadow DOM compatible form of tree
scoping. To go back to our `x-fade` example, the `x-fade` DOM rendered with 
shady DOM looks just like the classic JQuery version:

    <x-fade>
      <div>
        <img src="cool.png">
      </div>
      <canvas></canvas>
    </x-fade>

In other words, strictly speaking it has the same deficiencies. It’s leaking
details, confusing CSS, and all the rest.

The saving grace is that if you opt-in to looking at the tree with the shady DOM
API, you can restore the value of shadow DOM. For example, if instead of walking
`<x-fade>`’s subtree using the traditional API, if you examine it using the shady
DOM API, you see this:

    <x-fade>
      <img src="cool.png">
    </x-fade>

“Examine it using the shady DOM API” means something like this:

    var arrayOfNodes = Polymer.dom(x-fade).children;

The upshot is that shady DOM provides enough tree-scoping for Polymer to act as
if shadow DOM is available on all platforms, without compromising performance.

It’s important to note that we've made shady DOM and shadow DOM compatible. This
means that the shady DOM API employs real shadow DOM where it's available.
Therefore, you can write one code base that works on all platforms, but you
enjoy improved performance and robustness on platforms that implement Shadow
DOM.

## Summary

- Web components require tree-scoping for proper encapsulation.
- Shadow DOM is the standard that implements tree-scoping, but it’s not yet universally implemented.
- Polyfilling shadow DOM is hard, the robust polyfill is invasive and slow.
- Shady DOM is a super-fast shim for shadow DOM that provides tree-scoping, but has drawbacks. Most importantly, one must use the shady DOM APIs to work with scoped trees.
- Shady DOM makes web components palatable for a much wider swath of projects, growing mindshare, and driving adoption of all web components standards.
- The annoying bits of shady DOM are exactly the reasons why shadow DOM needs to be native across platforms. 

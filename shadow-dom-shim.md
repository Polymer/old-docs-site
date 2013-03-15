---
layout: default
title: About Shadow DOM
#subtitle: shim
pygments: true
---

- Status: <span class="label label-info">shim</span>
- Repo: [https://github.com/toolkitchen/ShadowDOM](https://github.com/toolkitchen/ShadowDOM)
- Specification: [https://dvcs.w3.org/hg/webcomponents/raw-file/tip/spec/shadow/index.html](https://dvcs.w3.org/hg/webcomponents/raw-file/tip/spec/shadow/index.html)

---

*Toolkitchen uses a shim to provide Shadow DOM functionality in browsers that don't
support it natively. This document explains how a proper (native) implementation
differs from the shim implementation provided by Toolkitchen.*

## Shadow DOM subtrees

Shadow DOM allows a single node to express three subtrees: _light DOM_, _shadow DOM_, and _composed DOM_. A component user supplies the light DOM; the node has a (hidden) shadow DOM; and the composed DOM is what is actually rendered in the browser. At render time, the light DOM is merged with the shadow DOM to produce the composed DOM. For example:

**Light DOM**

{% highlight html%}
<custom-node>
  <!-- everything in here is custom-node's light DOM -->
  <q>Hello World</q>
</custom-node>
{% endhighlight %}

**Shadow DOM**

{% highlight html%}
<!-- shadow-root is attached to custom-node, but is not a child-->
<shadow-root>
  <!-- everything in here is custom-node's shadow DOM -->
  <span>People say: <content></content></span>
</shadow-root>
{% endhighlight html%}    

**Composed (rendered) DOM**

{% highlight html%}
<!-- rendered DOM -->
<custom-node>
  <span>People say: <q>Hello World</q></span>
</custom-node>
{% endhighlight %}

Under a proper (native) Shadow DOM implementation, the following would be true about this example:

* The light DOM that belongs to `<custom-node>` is visible to the user as its normal subtree. It can expressed by `childNodes`, `children`, `innerHTML` or any other property or method that gives you information about a node's subtree.
* Nodes in light DOM or shadow DOM express parent and sibling relationships that match their respective tree structures; the relationships that exist in the rendered tree are not expressed anywhere in DOM.

So, while in the final rendered tree `<span>` is a child of `<custom-node>` and the parent of `<q>`, interrogating those nodes will tell you that the `<span>` is a child of `<shadow-root>` and `<q>` is a child of `<custom-node>`, and that those two nodes are unrelated.

In this way, the user can manipulate light DOM or shadow DOM directly as regular DOM subtrees, and let the system take care of keeping the render tree synchronized.

## Shadow DOM shim limitations ##

To polyfill Shadow DOM it's necessary to compose the rendered tree into the DOM proper, as that is what the browser is going to display. That means the truisms above no longer apply. There are several important differences to consider under a polyfilled Shadow DOM:

* `<custom-node>`'s light DOM must be stored in a subtree separate from main DOM. `<custom-node>`'s native `childNodes`, `children`, `innerHTML` properties and methods all refer to the rendered tree.
* Nodes in light DOM or shadow DOM express native parent and sibling relationships that match only the rendered tree structure; the relationships that exist in the original light and shadow trees are not expressed by native DOM.

For proper polyfilling, these contradictions need to be solved by overriding the DOM tree accessors from JS to provide the illusion of the separated DOM trees. For this reason, Toolkit uses a Shadow DOM _shim_ instead of a polyfill. 

> We differentiate a <em>shim</em> from a <em>polyfill</em> in that a shim does the minimum work to make a technology function, whereas a polyfill needs to provide (as near as possible) to 100% compatibility with that technology.

In particular, the Toolkit Shadow DOM shim does not provide the ability to operate on light and shadow subtrees as strictly normal DOM subtrees. Instead, those subtrees are embedded in the native (rendered) DOM and special APIs are provided to navigate them.

### Subtree perversions

Using the native DOM accessors (such as `childNodes`) on a tree containing Shadow DOM shim subtrees, you will encounter these unusual DOM structures:

* **LightDOM**: Nodes that have shadow DOM are assigned a corresponding `.lightDOM` document-fragment. When walking DOM, one generally wants to descend into light DOM subtrees (via `.lightDOM`) and not the native (rendered) tree, to mimic the proper hiding of shadow DOM.

* **Changelings**: Changelings are "dummy" nodes that take the place of a real node, called the `baby`. A Changeling is created when a `baby` has to be moved into a composition. In other words, Changelings allow a node to be in multiple subtrees. 

{% highlight html%}
<shadow-root>
  <span-changeling></span-changeling>
</shadow-root>
<custom-node><span>I'm in two places at once</span></custom-node>
{% endhighlight %}
    
When we interrogate `<span-changeling>`'s `parentNode` property, it correctly references `<shadow-root>`. The Changeling has preserved the position of the `<span>` in the shadow DOM when the actual `<span>` had to be re-parented into the rendered tree. Being Changeling-aware, we can get non-positional information via `.baby`. For example, the real `innerText` is available via `baby.innerText`.

* **Insertion Lists**: alternate child lists that represent subtrees before insertion-points are removed. 

Insertion-points, namely `<content>` and `<shadow>` are intended to be invisible to the render engine, for the purposes of, for example, parent/child selectors. A shadow DOM subtree like this:

{% highlight html%}
<content></content>
{% endhighlight %}

might compose with light DOM into 

{% highlight html%}
<custom-element>
  <contesnt>
    <span>Hello World</span>
  </content>
</custom-element>
{% endhighlight%}

but the render tree must see this as

{% highlight html%}
<custom-element>
  <span>Hello World</span>
</custom-element>
{% endhighlight%}

In this case, an `.insertions` array is created on `<custom-element>` which contains the child list from the composed tree. In this case this contains simply `[<content>]`.

### Locality

Because shadow DOM subtrees can be embedded in other shadow DOM subtrees, it quickly becomes possible for a node to be both in light and shadow DOM, depending on your perspective. Instead of having two kinds of trees, it's simpler to talk about a node's _local_ tree. This way, my shadow DOM is just my _local_ tree, and my light DOM is part of _my parentNode's_ local tree. 

> Note: By [specification], nodes distributed to insertion-points (`<content>`, `<shadow>`) are not considered part of the local tree, and must be studied separately via the `.getDistributedNodes()` function.

### API Utilities

* `ShadowDOM.deref(inNode)`: dereference a Changeling: returns `inNode.baby` if it exists, otherwise `inNode`.
* `ShadowDOM.localQuery[All](inNode, inSelector)`: a subset of `querySelector[All]` that searches the input node's local tree for nodes matching `inSelector` (for a restricted set of selectors).
* **`ShadowDOM.localNodes(inNode)`**: returns a simple array of nodes at the top of inNode's local tree.



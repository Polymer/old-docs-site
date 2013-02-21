Shadow DOM allows a single node to express three subtrees: light DOM, shadowDOM, and composed DOM. At render time, the light DOM is merged with the shadow DOM to produce the composed DOM.

The general idea is that a user supplies light DOM, the node has a (hidden) shadow DOM, and the composed DOM is what is actually rendered in the UA.
	
	<custom-node>
		<!-- everything in here is custom-node's light DOM -->
		<q>Hello World</q>
	</custom-node>
	
	<!-- shadow-root is attached to custom-node, but is not a child
	<shadow-root>
		<!-- everything in here is custom-node's shadow DOM -->
		<span>People say: <content></content></span>
	</shadow-root>
	
	<!-- rendered DOM -->
	<custom-node>
		<span>People say: <q>Hello World</q></span>
	</custom-node>

Under a proper Shadow DOM implementation, the following things are true:

* *custom-node's* light DOM is visible to the user as it's normal subtree. In other words, the light DOM is expressed by `childNodes`, `children`, `innerHTML`, and any property or method that gives you information about a node's subtree.
* nodes in light DOM or shadow DOM express parent and sibling relationships that match their respective tree structures, the relationships that exist in the rendered tree are not expressed anywhere in DOM.

So, while in the final rendered tree, `<span>` is a child of custom-node and the parent of `<q>`, interrogating those nodes will tell you that the `<span>` is a child of `<shadow-root>` and `<q>`) is a child of `<custom-node>` and that those two nodes are unrelated.

In this way, the user can manipulate light DOM or shadow DOM directly as regular DOM subtrees, and let the system worry about keeping the render tree synchronised.

When polyfilling Shadow DOM, there is no choice but to compose the rendered tree into the DOM proper, as that is what the User Agent is going to render. That means the truisms above no longer apply. Under a polyfilled Shadow DOM:

* *custom-node's* light DOM must be stored in a subtree separate from main DOM. *custom-node's* native `childNodes`, `children`, `innerHTML`, etc., all refer to the rendered tree.
* nodes in light DOM or shadow DOM express native parent and sibling relationships that match only the rendered  tree structure, the relationships that exist in the original light and shadow trees are not expressed by native DOM.

For proper polyfilling, these contradictions need to be solved by overriding the DOM tree accessors from JS to provide the illusion of the separated DOM trees. Overriding these accessors is unfortunately non-trivial, especially (as it turns out) in Safari-based browsers (due to a quirk [bug?] in their implementation of DOM property attributes). For this reason, Toolkit uses a Shadow DOM _shim_ instead of a polyfill.

We differentiate a _shim_ from a _polyfill_ in that a shim only has to do the minimum work to make a technology function, whereas a polyfill needs to provide (as near as possible) to 100% compatibility with that technology.

In particular, the Toolkit Shadow DOM shim discards the ability to operate on light and shadow subtrees as strictly normal DOM subtrees. Instead, those subtrees are embedded in the native (rendered) DOM and special APIs are provided to navigate them.

### Subtree Perversions

Using the native DOM accessors on a tree containing Shadow DOM shim subtrees, you will encounter these unusual DOM structures:

* **LightDOM**: nodes that have shadow DOM are assigned a corresponding `.lightDOM` document-fragment. When walking DOM, one generally wants to descend into light DOM subtrees (via `.lightDOM`) and not the native (rendered) tree, to mimic the proper hiding of shadow DOM.

* **Changelings**: dummy nodes that take the place of a real node, called the `baby`. A Changeling is created when a `baby` has to be moved into a composition. In other words, Changelings allow a node to be in multiple subtrees. 

		<shadow-root><span-changeling></span-changeling></shadow-root>
		<custom-node><span>I'm in two places at once</span></custom-node>
	
	When we encounter `<span-changeling>` it's `parentNode` correctly references `<shadow-root>`. The Changeling has preserved the position of the `<span>` in the shadow DOM when the actual `<span>` had to be reparented into the rendered tree. Being Changeling-aware, we can get non-positional information via `.baby`. For example, the real `innerText` is available via `baby.innerText`.

* **Insertion Lists**: alternate child lists that represent subtrees before insertion-points are removed. 

	Insertion-points, namely `<content>` and `<shadow>` are intended to be invisible to the render engine, for the purposes of, for example, parent/child selectors. A shadow DOM subtree like this:

		<content></content>

	might compose with light DOM into 

		<custom-element>
			<content>
				<span>Hello World</span>
			</content>
		</custom-element>

	but the render tree must see this as

		<custom-element>
			<span>Hello World</span>
		</custom-element>
	
	In this case, a `.insertions` array is created on `<custom-element>` which contains the child list from the composed tree, in this case, simply `[<content>]`.

### Locality

Because shadow DOM subtrees can be embedded in other shadow DOM subtrees, it quickly becomes possible for a node to be both in light and shadow DOM, depending on your perspective. So, instead of having two kinds of trees, it's easy to simply talk about a node's _local_ tree. This way, my shadow DOM is just my _local_ tree, and my light DOM is part of _my parentNode's_ local tree. 


> Note: by spec, nodes distributed to insertion-points (`<content>`, `<shadow>`) are not considered part of the local tree, and must be studied separately via the `.getDistributedNodes()` function.

[TODO(sjmiles): implement beyond this point]

### Utilities

* **`ShadowDOM.deref(inNode)`**: dereference a Changeling: returns `inNode.baby` if it exists, otherwise `inNode`.
* **`ShadowDOM.localQuery[All](inNode, inSelector)`**: a subset of `querySelector[All]` that searches the input node's local tree for nodes matching `inSelector` (for a restricted set of selectors).
* **`ShadowDOM.localNodes(inNode)`**: returns a simple array of nodes at the top of inNode's local tree.



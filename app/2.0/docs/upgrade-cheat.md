---
title: Polymer 2.0 upgrade cheat sheet
---

This is a quick-and-dirty guide to updating your code to use the Polymer 2.0 library. Note that this does not cover hybrid elements.

See the [Polymer 2.0 Upgrade Guide](upgrade) for more complete documentation on upgrading your apps and elements.

|**Polymer 1.x**|**Polymer 2.x**|
| -------------|-----------|
|<pre><code>Polymer.dom(this.root)</code></pre>|<pre><code>this.shadowRoot</code></pre>|
|<pre><code>Polymer.dom(event).localTarget</code></pre>|<pre><code>event.target</code></pre>|
|<pre><code>Polymer.dom(event).path</code></pre>|<pre><code>event.composedPath()</code></pre>|
|<pre><code>Polymer.dom(event).rootTarget</code></pre>|<pre><code>event.composedPath()[0]</code></pre>|
|<pre><code>Polymer.dom(this).observeNodes(this._nodesChanged)</code></pre>|<pre><code><link rel="import"<br>  href="/bower_components/polymer/lib/utils/<br>  flattened-nodes-observer.html"><br>this._observer = <br>  new Polymer.FlattenedNodesObserver(this._nodesChanged);<br>this._observer.disconnect();</code></pre>|
|<pre><code>this.getComputedStyleValue()</code></pre>|For now, you will need to use custom ShadyCSS API <br>when the polyfill is loaded:<br><pre><code>if (window.ShadyCSS) {<br>  style = ShadyCSS.getComputedStyleValue(el, '--something');<br>} else {<br>  style = getComputedStyle(el).getPropertyValue('--something');<br>}</code></pre><br>See [https://github.com/webcomponents/shadycss/issues/83](https://github.com/webcomponents/shadycss/issues/83)<br> for the proposed fix to enable this functionality without a conditional.|
|<pre><code>this.getContentChildren</code></pre>|Write the platform code that will do this: Find the slot, get the `assignedNodes`, and filter down to just the elements (ignore comments & text nodes):<br><pre><code>this.shadowRoot<br>  .querySelector('slot')<br>  .assignedNodes({flatten:true})<br>  .filter(n.nodeType === Node.ELEMENT_NODE)</code></pre>|
|<pre><code>this.getEffectiveChildren</code></pre>|Use `Polymer.FlattenedNodesObserver`'s `getFlattenedNodes` helper method, and filter them down to just the elements (ignore comments & text nodes):<br><pre><code><link rel="import" href=<br>  "polymer/lib/utils/flattened-nodes-observer.html"><br>...<br>let effectiveChildren =<br>  Polymer.FlattenedNodesObserver.getFlattenedNodes(this)<br>  .filter(n.nodeType === Node.ELEMENT_NODE)</code></pre>|
|<pre><code>this.getComputedStyleValue('--something');</code></pre>| This inconvenience is known: https://github.com/webcomponents/shadycss/issues/83<br><pre><code>if (window.ShadyCSS) {<br>  style = ShadyCSS.getComputedStyleValue(this, '--something');<br>} else {<br>  style = getComputedStyle(this).getPropertyValue('--something');<br>}</code></pre>|
|<pre><code>this.customStyle['--my-dynamic-property'] = 'red';<br>this.updateStyles();</code></pre>|<pre><code>this.updateStyles({'--my-dynamic-property': 'red'});</code></pre>|
|<pre><code>this.async(function() { /* ... */}, 100);</code></pre>|<pre><code>setTimout(() => { /* ... */}, 100);</code></pre>|
|<pre><code>this.fire('some-event');</code></pre>|<pre><code>// composed: true => bubble across the boundary between the<br>//shadow DOM and the regular DOM<br>this.dispatchEvent(new CustomEvent('some-event', {<br>  detail: {}, bubbles: true, composed: true <br>}));</code></pre>|
|<pre><code>this.mixin(target, source);</code></pre>|<pre><code>mixin(target, source) {<br>  for (var i in source) {<br>\    target[i] = source[i];<br>  }<br>  return target;<br>}</code></pre><br>// If copying enumerable and own properties is enough (option defaults for example)<br><pre><code>Object.assign(target, ...sources)</code></pre>|
|<pre><code>hostAttributes: {<br>  'tabindex': '0'<br>}</code></pre>|<pre><code><this._ensureAttribute('tabindex', '0');</code></pre>|

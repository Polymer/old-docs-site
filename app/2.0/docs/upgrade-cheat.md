# Polymer 2.0 API Upgrade CheatSheet

**Before**
```js
Polymer.dom(this.root)
```

**After**
```js
this.shadowRoot
```

---

**Before**
```js
Polymer.dom(event).localTarget
```

**After**
```js
event.target
```

---

**Before**
```js
Polymer.dom(event).path
```

**After**
```js
event.composedPath()
```

---

**Before**
```js
Polymer.dom(event).rootTarget
```

**After**
```js
event.composedPath()[0]
```

---

**Before**
```js
Polymer.dom(this).observeNodes(this._nodesChanged)
```

**After**
```js
<link rel="import" href="/bower_components/polymer/lib/utils/flattened-nodes-observer.html">

this._observer = new Polymer.FlattenedNodesObserver(this._nodesChanged);
this._observer.disconnect();
```

---

**Before**  
```js
this.getComputedStyleValue()
```

**After:**
For now, you will need to use custom ShadyCSS API when the polyfill is loaded:
```
if (window.ShadyCSS) {
  style = ShadyCSS.getComputedStyleValue(el, '--something');
} else {
  style = getComputedStyle(el).getPropertyValue('--something');
}
```

See [https://github.com/webcomponents/shadycss/issues/83](https://github.com/webcomponents/shadycss/issues/83) for the proposed fix to enable this functionality without a conditional.

---

**Before**
```js
this.getContentChildren
```

**After:**
Write the platform code that will do this: find the slot, get the `assignedNodes`, and filter down to just the elements (ignore comments & text nodes):
```
this.shadowRoot
  .querySelector('slot')
  .assignedNodes({flatten:true})
  .filter(n.nodeType === Node.ELEMENT_NODE)
```

---

**Before**  
```js
this.getEffectiveChildren
```

**After:**
Use `Polymer.FlattenedNodesObserver`'s  `getFlattenedNodes` helper method, and filter them down to just the elements (ignore comments & text nodes):
```
<link rel="import" href="polymer/lib/utils/flattened-nodes-observer.html">
...
let effectiveChildren = Polymer.FlattenedNodesObserver.getFlattenedNodes(this)
  .filter(n.nodeType === Node.ELEMENT_NODE)
```

---

**Before**
```js
this.getComputedStyleValue('--something');
```

**After**
This inconvenience is known:
https://github.com/webcomponents/shadycss/issues/83

```js
if (window.ShadyCSS) {
  style = ShadyCSS.getComputedStyleValue(this, '--something');
} else {
  style = getComputedStyle(this).getPropertyValue('--something');
}
```

---

**Before**
```js
this.customStyle['--my-dynamic-property'] = 'red';
this.updateStyles();
```

**After**
```js
this.updateStyles({'--my-dynamic-property': 'red'});
```

---

**Before**
```js
this.async(function() { /* ... */}, 100);
```

**After**
```js
setTimout(() => { /* ... */}, 100);
```

---

**Before**
```js
this.fire('some-event');
```

**After**
```js
// composed: true => bubble across the boundary between the shadow DOM and the regular DOM
this.dispatchEvent(new CustomEvent('some-event', { detail: {}, bubbles: true, composed: true }));
```

---

**Before**
```js
this.mixin(target, source);
```

**After**
```js
mixin(target, source) {
  for (var i in source) {
    target[i] = source[i];
  }
  return target;
}

// If copying enumerable and own properties is enough (option defaults for example)
Object.assign(target, ...sources)
```

---

**Before**
```js
hostAttributes: {
  'tabindex': '0'
}
```

**After**
```js
this._ensureAttribute('tabindex', '0');
```

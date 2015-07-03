---
layout: default
type: guide
shortname: Docs
title: Experimental features & elements
subtitle: Developer guide
---

{% include toc.html %}



## Feature layering {#feature-layering}

**EXPERIMENTAL: API MAY CHANGE.**
{: .alert .alert-error }

Polymer is currently layered into 3 sets of features provided as 3 discrete
HTML imports, such that an individual element developer can depend on a version
of Polymer whose feature set matches their tastes/needs.  For authors who opt
out of the more opinionated local DOM or data-binding features, their element's
dependencies would not be payload- or runtime-burdened by these higher-level
features, to the extent that a user didn't depend on other elements using those
features on that page.  That said, all features are designed to have low runtime
cost when unused by a given element.

Higher layers depend on lower layers, and elements requiring lower layers will
actually be imbued with features of the highest-level version of Polymer used on
the page (those elements would simply not use/take advantage of those features).
This provides a good tradeoff between element authors being able to avoid direct
dependencies on unused features when their element is used standalone, while
also allowing end users to mix-and-match elements created with different layers
on the same page.

*   `polymer-micro.html`: [Polymer micro features](#polymer-micro) (bare-minimum
    Custom Element sugaring)

*   `polymer-mini.html`: [Polymer mini features](#polymer-mini) (template
     stamped into "local DOM" and tree lifecycle)

*   `polymer.html`: [Polymer standard features](#polymer-standard) (all other
    features: declarative data binding and event handlers, property nofication,
    computed properties, and experimental features)

This layering is subject to change in the future and the number of layers may be reduced.

### Polymer micro features {#polymer-micro}

The Polymer micro layer provides bare-minimum Custom Element sugaring.


| Feature | Usage
|---------|-------
| [Custom element constructor](registering-elements.html#element-constructor) | Polymer.Class({ … });
| [Custom element registration](registering-elements.html#register-element) | Polymer({ is: ‘...’,  … }};
| [Custom constructor support](registering-elements.html#bespoke-constructor) | constructor: function() { … }
| [Basic lifecycle callbacks](registering-elements.html#basic-callbacks) | created, attached, detached, attributeChanged
| [Native HTML element extension](registering-elements.html#type-extension) | extends: ‘…’
| [Declared properties](properties.html#property-config) | properties: { … }
| [Attribute deserialization to property](properties.html#attribute-deserialization) | properties: { \<property>: \<Type> }
| [Static attributes on host](registering-elements.html#host-attributes) | hostAttributes: { \<attribute>: \<value> }
| [Behaviors](behaviors.html) | behaviors: [ … ]


### Polymer mini features {#polymer-mini}

The Polymer mini layer provides features related to local DOM:
Template contents cloned into the custom element's local DOM, DOM APIs and 
tree lifecycle.

| Feature | Usage
|---------|-------
| [Template stamping into local DOM](local-dom.html#template-stamping) | \<dom-module>\<template>...\</template>\</dom-module>
| [DOM distribution](local-dom.html#dom-distribution) | \<content>
| [DOM API](local-dom.html#dom-api)  | Polymer.dom
| [Configuring default values](properties.html#configure-values)  | properties: \<prop>: { value: \<primitive>\|\<function> }
| [Bottom-up callback after configuration](registering-elements.html#ready-method) | ready: function() { … }

<a name="polymer-standard"></a>

### Polymer standard features {#polymer-standard}

The Polymer standard layer adds declarative data binding, events, property notifications and utility methods.

| Feature | Usage
|---------|-------
| [Automatic node finding](local-dom.html#node-finding) | this.$.\<id>
| [Event listener setup](events.html#event-listeners)| listeners: { ‘\<node>.\<event>’: ‘function’, ... }
| [Annotated event listener setup](events.html#annotated-listeners) | \<element on-[event]=”function”>
| [Property change callbacks](properties.html#change-callbacks) | properties: \<prop>: { observer: ‘function’ }
| [Annotated property binding](data-binding.html#property-binding) | \<element prop=”{%raw%}{{property\|path}}{%endraw%}”>
| [Property change notification](data-binding.html#property-notification) | properties: { \<prop>: { notify: true } }
| [Binding to structured data](data-binding.html#path-binding) | \<element prop=”{%raw%}{{obj.sub.path}}{%endraw%}”>
| [Path change notification](data-binding.html#set-path) | set(\<path>, \<value>)
| [Declarative attribute binding](data-binding.html#attribute-binding) | \<element attr$=”{%raw%}{{property\|path}}{%endraw%}”>
| [Reflecting properties to attributes](properties.html#attribute-reflection) | properties: { \<prop>: { reflectToAttribute: true } }
| [Computed properties](properties.html#computed-properties) | computed: { \<property>: ‘computeFn(dep1, dep2)’ }
| [Computed bindings](data-binding.html#annotated-computed) | \<span>{%raw%}{{computeFn(dep1, dep2)}}{%endraw%}\</span>
| [Read-only properties](properties.html#read-only) |  properties: { \<prop>: { readOnly: true } }
| [Utility functions](utility-functions.html) | toggleClass, toggleAttribute, fire, async, …
| [Scoped styling](styling.html) | \<style> in \<dom-module>, Shadow-DOM styling rules (:host, ...)
| [General polymer settings](#settings) | \<script> Polymer = { ... }; \</script>

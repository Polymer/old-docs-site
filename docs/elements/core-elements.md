---
layout: default
type: elements
navgroup: elements
shortname: Elements
title: Core elements
subtitle: non-visual utility elements

add_permalinks: false

#stylesheets:
#  "/css/elementpage.css"
---

<!-- page specific stylesheet needs to be inline to the page so ajax injects it. -->
<link rel="stylesheet" href="/css/elementpage.css">

<div class="hide-on-hash">
  <p class="alert alert-info"><strong>Note:</strong> These elements and their documentation are still early. The “source” links below point to commented code where you can learn more about how to use the element.</p>
  <p>Install everything:</p>
  <pre class="prettyprint"><code><span class="pln">bower install </span><span class="typ">Polymer</span><span class="pun">/</span><span class="pln">core</span><span class="pun">-</span><span class="pln">elements</span></code></pre>
</div>
<component-docs coreElements='{% list_components dir:components prefix:core %}'></component-docs>

---
layout: default
type: elements
navgroup: elements
shortname: Elements
title: Polymer paper elements
subtitle: material design

add_permalinks: false

#stylesheets:
#  "/css/elementpage.css"
---

<!-- page specific stylesheet needs to be inline to the page so ajax injects it. -->
<link rel="stylesheet" href="/css/elementpage.css">

<div class="hide-on-hash">
  <!-- <p class="alert alert-info"><strong>Note:</strong> These elements and their documentation are still early. The “source” links below point to commented code where you can learn more about how to use the element.</p> -->
  <p>Install the element set:</p>
  <pre class="prettyprint">
bower install Polymer/paper-elements
</pre>
</div>

<component-docs
    elements='{% list_components dir:components prefix:paper blacklist:"paper-doc-viewer paper-calculator" %}'>
</component-docs>

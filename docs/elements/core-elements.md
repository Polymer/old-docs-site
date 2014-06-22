---
layout: default
type: elements
navgroup: elements
shortname: Elements
title: Polymer core elements
#subtitle: non-visual utility elements

add_permalinks: false

#stylesheets:
#  "/css/elementpage.css"
---

<!-- page specific stylesheet needs to be inline to the page so ajax injects it. -->
<link rel="stylesheet" href="/css/elementpage.css">

<div class="hide-on-hash">
  <!-- <p class="alert alert-info"><strong>Note:</strong> These elements and their documentation are still early. The “source” links below point to commented code where you can learn more about how to use the element.</p> -->
  <p>{{site.project_title}}'s core elements are a set of visual and non-visual utility elements.</p>
  <p>Install the element set:</p>
  <pre class="prettyprint">
bower install Polymer/core-elements
</pre>
</div>

<component-docs
    elements='{% list_components dir:components prefix:core blacklist:"core-layout core-doc-viewer core-home-page" %}'>
</component-docs>

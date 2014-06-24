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
  <p>The Paper elements are a set of UI elements that implement the 
    [material design system](http://google.com/design/spec).</p>
  <p>See <a href="material.html">Material Design Using Polymer</a> for an overview of creating a material design applicaiton using {{site.project_title}}.</p>
  <p>For a quick visual overview of the elements, see the <a href="/components/paper-elements/demo.html">Paper elements sampler</a>.

  <p>Install the element set:</p>
  <pre class="prettyprint">
bower install Polymer/paper-elements
</pre>
</div>

<component-docs
    elements='{% list_components dir:components prefix:paper blacklist:"paper-doc-viewer paper-calculator" %}'>
</component-docs>

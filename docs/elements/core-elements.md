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
  <p>{{site.project_title}} Core elements are a set of utility
    elements including general-purpose UI elements (such as icons, layout elements, and toolbars),
    as well as  non-UI elements providing features like AJAX, signaling and storage.</p>

   <component-download-button org="Polymer" component="core-elements" label="GET THE POLYMER CORE ELEMENTS">
   </component-download-button>

  <h2>Related Guides</h2>
  <p><a href="layout-elements.html">Application layout elements</a>.</p>
  <p><a href="icons.html">Using core icons</a></p>

  <h2>Demos</h2>
  <p><a href="/components/core-elements/demo.html">{{site.project_title}} Core elements sampler</a></p>
</div>

<component-docs
    elements='{% list_components dir:components prefix:core blacklist:"core-layout core-doc-viewer core-home-page" %}'>
</component-docs>

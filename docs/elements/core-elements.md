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
  <p>Related:</p>
  <ul>
    <li><a href="layout-elements.html">Application layout elements</a> for an overview of using the {{site.project_title}} Core elements for top-level application layout.</li>
    <li><a href="icons.html">Using core icons</a> descibes the `<core-icon>` element, using the built-in icon sets, and creating custom icons and icon sets.</li>
    <li><a href="/components/core-elements/demo.html">{{site.project_title}} Core elements sampler</a> is an interactive demonstration of the visual core elements.</li>
  </ul>
  <p>Install the element set:</p>
  <pre class="prettyprint">
bower install Polymer/core-elements
</pre>
</div>

<component-docs
    elements='{% list_components dir:components prefix:core blacklist:"core-layout core-doc-viewer core-home-page" %}'>
</component-docs>

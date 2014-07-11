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
    <a href="http://google.com/design/spec">material design system</a>.</p>

  <component-download-button org="Polymer" component="paper-elements" label="GET THE PAPER ELEMENTS">
  </component-download-button>

  <h2>Related Guides</h2>
  <p><a href="material.html">Material Design Using Polymer</a></p>

  <h2>Demos</h2>
  <p><a href="/components/paper-elements/demo.html">Paper elements sampler</a></p>
</div>

<component-docs
    elements='{% list_components dir:components prefix:paper blacklist:"paper-calculator paper-doc-viewer paper-ink paper-scaffold paper-menu-button-transition paper-menu-button-overlay-container paper-form paper-row paper-group paper-doc-toc paper-doc-page"%}'>
</component-docs>


---
layout: default
type: elements
navgroup: docs
shortname: Elements
title: Polymer UI elements
subtitle: basic visual elements

add_permalinks: false
#stylesheets:
#  "/css/elementpage.css" 
---

<!-- page specific stylesheet needs to be inline to the page so ajax injects it. -->
<link rel="stylesheet" href="/css/elementpage.css">

{% include labs.html %}

To install this entire element set, run:

    bower install PolymerLabs/polymer-ui-elements

<section class="element-list">
{% directory org:PolymerLabs dir:components tag:div glob:polymer-ui-* blacklist:"polymer-ui-elements" %}
</section>

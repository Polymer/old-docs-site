---
layout: default
type: elements
navgroup: docs
shortname: Elements
title: Polymer elements
subtitle: non-visual utility elements

add_permalinks: false
stylesheets:
  "/css/elementpage.css"
---

{% include labs.html %}

Install everything:

    bower install PolymerLabs/polymer-elements

<section class="element-list">
{%comment%}
{% include_external /polymer-elements/docs/classes/polymer-file.html %}
{%endcomment%}

{% directory org:PolymerLabs dir:components tag:div glob:polymer-* blacklistglob:polymer-ui-* blacklist:"polymer-dev polymer-expressions polymer-elements polymer-ui-elements" %}
</section>

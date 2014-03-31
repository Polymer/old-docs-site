---
layout: default
type: elements
navgroup: docs
shortname: Elements
title: Core elements
subtitle: non-visual utility elements

add_permalinks: false

stylesheets:
  "/css/elementpage.css"
---

**Note:** These elements and their documentation are still early. The "source" links below point to commented code where you can learn more about how to use the element.
{: .alert .alert-info}

Install everything:

    bower install Polymer/core-elements

<section class="element-list">
{% directory org:Polymer dir:components tag:div glob:core-* blacklist:"core-elements core-component-page-dev" %}
</section>

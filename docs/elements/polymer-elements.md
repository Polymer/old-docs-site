---
layout: default
type: elements
title: Polymer elements
subtitle: Utility elements that do not render UI
---

**Note:** These elements and their documentation are very early.
The "source" links below point to commented code where you can learn more about
how to use the element.
{: .alert .alert-info}

Install everything:

    bower install Polymer/polymer-elements

<section class="element-list">
{%comment%}
{% include_external /polymer-elements/docs/classes/polymer-file.html %}
{%endcomment%}

{% directory dir:components tag:div glob:polymer-* blacklistglob:polymer-ui-* blacklist:"polymer-dev polymer-expressions polymer-elements polymer-ui-elements" %}
</section>

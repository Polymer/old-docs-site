---
layout: default
title: Elements
---

<!-- {% include_external polymer-all/polymer-elements/README.md %} -->

{%comment%}

{% capture polymer_elements  %}
  {% directory polymer-elements %}
{% endcapture %}

{{ polymer_elements | split:',' }}

{% endcomment %}

<ul class="element-list">
{% directory tag:li dir:polymer-all/polymer-elements glob:polymer-* %}
</ul>
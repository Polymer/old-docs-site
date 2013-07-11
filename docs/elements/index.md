---
layout: default
title: Element reference
---

{%comment%}

{% capture polymer_elements  %}
  {% directory polymer-elements %}
{% endcapture %}

{{ polymer_elements | split:',' }}

{% endcomment %}

## Elements

**Repository:** [github.com/Polymer/polymer-elements](https://github.com/Polymer/polymer-elements)

{%comment%}
{% include_external polymer-all/polymer-elements/README.md %}
{%endcomment%}

<ul class="element-list">
{% directory tag:li dir:polymer-all/polymer-elements glob:polymer-* %}
</ul>

---

## UI Elements

**Repository:** [github.com/Polymer/polymer-ui-elements](https://github.com/Polymer/polymer-ui-elements)

<ul class="element-list">
{% directory tag:li dir:polymer-all/polymer-ui-elements glob:polymer-ui-* %}
</ul>
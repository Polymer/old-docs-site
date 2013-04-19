---
layout: default
title: About Web Animations
subtitle: polyfill

feature:
  spec: https://dvcs.w3.org/hg/FXTF/raw-file/default/web-anim/index.html
  status: <span class="label label-success">functional</span>
  code: https://github.com/web-animations/web-animations-js
  summary: "Web Animations defines a APIs for synchronizing several of the web's animation models with complex, scriptable animations."

---

<!-- TODO(ericbidelman): remove when Toolkit builds in Web Animations. -->
<!-- <script src="/toolkit/platform/WebAnimations/web-animations.js"></script> -->

{% include spec-header.html %}

{% comment %}
<!-- Uncomment and use when repo is updated -->
{% include_external ../toolkit/platform/WebAnimations/README.md %}
{% endcomment %}

{% include_external platform/web-animations-temp-README.md %}

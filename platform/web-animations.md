---
layout: default
title: Web Animations
subtitle: polyfill

load_polymer: true
imports:
- /elements/buildbot-list.html

feature:
  spec: http://dev.w3.org/fxtf/web-animations/
  status: <buildbot-list project="web-animations-js"></buildbot-list>
  code: https://github.com/web-animations/web-animations-js
  summary: "Web Animations defines APIs for synchronizing several of the web's animation models with complex, scriptable animations."

---

<!-- TODO(ericbidelman): remove when Toolkit builds in Web Animations. -->
<!-- <script src="/toolkit/platform/web-animations-js/web-animations.js"></script> -->

{% include spec-header.html %}

{% include_external polymer-all/web-animations-js/README.md %}

---
layout: default
title: Build status

add_permalinks: false
---

This is a snapshot of each repository. See {{site.project_title}}'s [build waterfall](http://build.chromium.org/p/client.polymer/) for everything.

{% raw %}
<ul id="repobuildlist">
<template id="t" repeat="{{repos}}">
  <li>
    <h4>{{}}</h4>
    <buildbot-list project="{{}}"></buildbot-list>
  </li>
</template>
</ul>
{% endraw %}

<script>
var t = document.querySelector('#t');
t.model = { repos: [
  'polymer',
  'platform',
  'ShadowDOM',
  'CustomElements',
  'HTMLImports',
  'PointerEvents',
  'PointerGestures',
  'web-animations-js',
  'TemplateBinding',
  'NodeBind',
  'observe-js',
  'polymer-expressions'
]};
</script>

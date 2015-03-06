---
layout: default
published: false
---

<!-- page specific stylesheet needs to be inline to the page so ajax injects it. -->
<link rel="stylesheet" href="/css/elementpage.css">

{% assign element = site.data.versions["0_5"]["elements"][page.element] %}

<component-docs></component-docs>

<script>
  (function() {
    
    // JSON for each element will be rendered here.
    // Grab the element's JSON and hand it to the `component-docs` element
    // when the page boots up
    window.elementDoc = {{element | jsonify}};

  })();
</script>

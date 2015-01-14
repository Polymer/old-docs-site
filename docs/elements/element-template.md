---
layout: default
published: false
---

<!-- page specific stylesheet needs to be inline to the page so ajax injects it. -->
<link rel="stylesheet" href="/css/elementpage.css">

{% assign element = site.data.elements[page.element] %}

<component-docs></component-docs>

<script>
  (function() {
    // JSON for each element will be rendered here.
    // Grab the element's JSON and hand it to the `component-docs` element
    // when the page boots up
    function initDoc() {
      var elementDoc = {{element | jsonify}};
      document.querySelector('component-docs').data = elementDoc;  
    }
    initDoc();

  })();
</script>

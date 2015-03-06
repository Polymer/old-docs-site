---
layout: default
type: elements
navgroup: elements
shortname: Elements
title: Element collections

add_permalinks: false
---

<style>
.panel {
  margin-top: 2.5em;
  padding: 25px;
  border-radius: 3px;
  background-color: #fafafa;
}
.panel img {
  max-height: 250px;
  border: 1px solid #eee;
  margin-left: 10px;
}
.panel paper-button {
  margin-right: 15px;
  background-color: #fff;
}
.panel h2 {
  margin: 0 !important;
}

@media only screen and (max-width: 850px) {
  .panel img {
    margin: 10px 0 0 0 !important;
  }
  .panel {
    -webkit-flex-direction: column !important;
    flex-direction: column !important;
    margin: 0!important;
    padding: 20px!important;
    margin-top: 2em!important;
  }
}
</style>

<div horizontal layout start class="panel">
  <!-- <paper-shadow z="1"></paper-shadow> -->
  <section flex layout vertical>
    <h2><a href="core-ajax.html">{{site.project_title}} core elements</a></h2>
    <p>{{site.project_title}}'s core elements are a set of visual and non-visual utility elements. They include elements for working with layout, user input, selection, and scaffolding apps.</p>
    <div horizontal layout>
      <a href="core-ajax.html"><paper-button>Docs</paper-button></a>
      <a href="../../components/core-elements/demo.html#core-scroll-header-panel"><paper-button>Demos</paper-button></a>
    </div>
  </section>
  <a href="../../components/core-elements/demo.html#core-scroll-header-panel" target="_blank">
    <img src="/images/sampler-core.png">
  </a>
</div>

<div horizontal layout center class="panel">
  <!-- <paper-shadow z="1"></paper-shadow> -->
  <section flex>
    <h2><a href="paper-button.html">Paper elements</a></h2>
    <p>{{site.project_title}}'s paper elements collection implements material design for the web. They're a set of highly visual, highly interactive elements that include things like controls, layouts, hero transitions, and scrolling effects.</p>
    <p>
      <a href="paper-button.html"><paper-button>Docs</paper-button></a>
      <a href="../../components/paper-elements/demo.html#core-toolbar"><paper-button>Demos</paper-button></a>
    </p>
  </section>
  <a href="../../components/paper-elements/demo.html#core-toolbar" target="_blank">
    <img src="/images/sampler-paper.png">
  </a>
</div>

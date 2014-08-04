---
layout: default
type: elements
navgroup: elements
shortname: Elements
title: Element 集合

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
    <h2><a href="/docs/elements/core-elements.html#core-ajax">{{site.project_title}} core elements</a></h2>
    <p>{{site.project_title}} 的 core elements 是一组可视和非可视的工具类 elements。它们包括布局的处理，用户输入的处理，选择的处理， 和 app 基架的处理。</p>
    <div horizontal layout>
      <a href="/docs/elements/core-elements.html#core-ajax"><paper-button label="文档"></paper-button></a>
      <a href="/components/core-elements/demo.html#core-scroll-header-panel"><paper-button label="示例"></paper-button></a>
    </div>
  </section>
  <a href="/components/core-elements/demo.html#core-scroll-header-panel" target="_blank">
    <img src="/images/sampler-core.png">
  </a>
</div>

<div horizontal layout center class="panel">
  <!-- <paper-shadow z="1"></paper-shadow> -->
  <section flex>
    <h2><a href="/docs/elements/paper-elements.html#paper-button">Paper elements</a></h2>
    <p>{{site.project_title}} 的 paper elements 集合给web带来了 material design 的实现。 它们是高度可视化，高度互动性的 elements，包括控制器，布局， hero式转场动画，和滚动特效。</p>
    <p>
      <a href="/docs/elements/paper-elements.html#paper-button"><paper-button label="文档"></paper-button></a>
      <a href="/components/paper-elements/demo.html#core-toolbar"><paper-button label="示例"></paper-button></a>
    </p>
  </section> 
  <a href="/components/paper-elements/demo.html#core-toolbar" target="_blank">
    <img src="/images/sampler-paper.png">
  </a>
</div>

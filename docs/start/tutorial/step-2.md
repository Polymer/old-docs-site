---
layout: default
type: start
navgroup: docs
shortname: Start
title: "步骤 2: 你自己的 element"
subtitle: 你的第一个 Polymer 应用程序 
---

<link rel="import" href="/elements/side-by-side.html">

<link rel="stylesheet" href="tutorial.css">

{% include toc.html %}


## 步骤 2: 你自己的 element

现在呢你已经有了应用程序的基础结构，你可以开始构建一个 card element 来显示一条信息了。完工的卡片包括个人照片，用户名，收藏按钮，和内容区。

<div layout vertical center>
  <img class="sample" src="/images/tutorial/card.png">
</div>

本步骤里，你将创建一个用来控制布局和子节点样式的 `<post-card>` element，那么你可以用下面的代码标记来创建一个与上面相同的卡片：
 
    <post-card>
      <img src="profile-picture.png">
      <h2>A. Developer</h2>
      <p>Something really profound about code.</p>
    </post-card>

本步骤里,你将学到:

-   使用 Polymer 来创建一个 custom element。
-   结合使用 shadow DOM。

<aside class="alert alert-info">
<p><b>学习更多:</b>Shadow DOM 给你一个途径将一个局部的 DOM 树添加进一个 DOM element 里，使得此 DOM 树中的局部样式和局部标记与页面的其他部分解耦开来。</p>
<p>要深入学习 shadow DOM,请参看 <a href="/platform/shadow-dom.html">
Shadow DOM polyfill 文档</a>.</p>
</aside>

### 编辑 post-card.html

在你的编辑器里打开 `post-card.html` 。 此文件包含一个   
custom element 的骨架, 从几个 imports 开始:

<side-by-side>
<pre>
&lt;link rel="import" 
  href="../components/polymer/polymer.html">
&lt;link rel="import" 
  href="../components/core-icon-button/core-icon-button.html">
...
</pre>
<aside>
<h4>要点</h4>

<ul>
<li>从上面看到 <code>&lt;link rel="import"&gt;</code> 是用来将 <code>post-card</code> element 所依赖的 elements 导入进来的。</li>

</ul>
</aside>
</side-by-side>

往下则是 element 自身的定义：

<side-by-side>
<pre>
&lt;polymer-element name="post-card">
  &lt;template>
    &lt;style>
    :host {
      display: block;
      position: relative;
      background-color: white;
      padding: 20px;
      width: 100%;
      font-size: 1.2rem;
      font-weight: 300;
    }
    .card-header {
      margin-bottom: 10px;
    }
    &lt;/style>

    &lt;!-- CARD CONTENTS GO HERE -->
  &lt;/template>
  ...
</pre>
<aside>
<h4>要点</h4>

<ul><li> <code>&lt;polymer-element&gt;</code> element 就是你用 Polymer 来定义一个新的 custom 
    element 的方式。 本例里，你是在创建一个叫 "post-card" 的 element。 </li>
<li> <code>&lt;template&gt;</code> 定义了 element 内部的 DOM 结构, 或者 <em>shadow DOM</em>。这里就是你将来要给你的 custom element 添加代码标记的地方。</li>
<li>在一个 shadow DOM 树里被使用的 <code>:host</code> 伪类匹配的是<em>主持着</em>整个树的 element。
本例里，它匹配<code>&lt;post-card&gt;</code> element。</li>
<li>在 shadow DOM 内部使用普通的选择器 <em>作用域范围是</em> shadow DOM <code>.card-header</code> 仅匹配本 element 的 shadow DOM 里的 elements。</li>
</ul>
</aside>
</side-by-side>

**注意:** `<polymer-element>` 标签仅能包含一个 `<template>` 标签作为其 _直接_ 后代标签。
此标签定义了 element 的 shadow DOM 。其他 `<template>` 标签可能被嵌套在外围 template 标签里.
{: .alert .alert-info }

在 element 的底部定义了一个 `<script>` 标签:

<side-by-side>
<pre>
...
  &lt;script>
  Polymer({});
  &lt;/script>
&lt;/polymer-element>
</pre>
<aside>
<h4>要点</h4>
<ul>
<li> <code>Polymer</code> 的调用是将 element <em>注册</em> 了才能被浏览器识别。后面你步骤你还将会做很多这样的操作。</li>
</ul>
</aside>
</side-by-side>


<aside class="alert alert-info">
<p><b>学习更多：</b>
当你创建一个 <code>&lt;post-card&gt;</code>实例时，它的
shadow DOM <code>&lt;template&gt;</code> 里的内容是被当作 element 的 <em>shadow root</em> 插入的。这些 elements 在浏览器里被渲染着，
但却不包括在 element 自身的 <code>子节点</code> 里。</p>
<p>默认情况下，用户自己加的子节点将不会被渲染。如：</p>

<pre>&lt;post-card&gt;&lt;h3&gt;Hello!&lt;/h3&gt;&lt;/post-card&gt;</pre>

<p>创建一个 <code>&lt;post-card&gt;</code> 并且有个 <code>&lt;h3&gt;</code> 元素作为其子节点。
为了将 <code>&lt;h3&gt;</code> 渲染在 <code>&lt;post-card&gt;</code> 里，你需要追加一个<em>插入点</em>，以告知浏览器在将子节点渲染在 shadow DOM 树里的哪个地方。</p>
</aside>

<div class="divider" layout horizontal center center-justified>
  <core-icon icon="polymer"></core-icon>
</div>

搭建卡片的结构。

找到 `卡片内容放这里` 的注释然后添加如下的 `<div>` 和
`<content>` 标签。

<side-by-side>
<pre>
&lt;!-- 卡片内容放这里 -->
<strong class="highlight nocode">&lt;div class="card-header" layout horizontal center>
  &lt;content select="img">&lt;/content>
  &lt;content select="h2">&lt;/content>
&lt;/div>
&lt;content>&lt;/content></strong>
</pre>
  <aside>
  <h4>要点</h4>
    <ul>
    <li><code>layout horizontal center</code> 属性是 Polymer 创建 flexbox 布局的快捷方式。 </li>
    <li>三个 <code>&lt;content&gt;</code> 元素搭建了三个 <em>插入点</em>. <br />
    (shadow DOM 将此称为节点 <em>分配</em> 的选择过程).</li>
    <li>任何匹配了 <code>&lt;img&gt;</code> 的子节点将被插入到第一个 <code>&lt;content&gt;</code> 标签里。</li>
    <li>第二个 <code>&lt;content&gt;</code> 标签则选中任何 <code>h2</code> 子节点。</li>
    <li>最后一个 <code>&lt;content&gt;</code> 标签， 没有 <code>select</code> 属性，将选中其他还没有被插入的子节点。 (这可能是 <code>&lt;content&gt;</code> 元素最通用的格式了。)</li>
    </ul>
  </aside>
</side-by-side>

**内容选择**. 一个 `content` 元素上的 `select` 属性接受这些 [受限的CSS选择器](http://w3c.github.io/webcomponents/spec/shadow/#satisfying-matching-criteria). 
你只能选择主节点的直接子节点而不是所有子孙节点。 
{: .alert .alert-info }

<div class="divider" layout horizontal center center-justified>
  <core-icon icon="polymer"></core-icon>
</div>

给导入的内容上样式。

有很多新的CSS选择器可以结合使用。`post-card.html` 
文件里已经 使用了一个 `:host` 选择器，之前讨论过的，是给顶层 `<post-card>` element 上样式的。 

要给被添加的子节点加样式需要通过 `<content>` 元素，将下面的CSS规则添加到 `<style>` 标签里:

<side-by-side>
<pre><strong class="highlight nocode">
polyfill-next-selector { content: '.card-header h2'; }
.card-header ::content h2 {
  margin: 0;
  font-size: 1.8rem;
  font-weight: 300;
}
polyfill-next-selector { content: '.card-header img'; }
.card-header ::content img {
  width: 70px;
  border-radius: 50%;
  margin: 10px;
}</strong>
</pre>
  <aside>
    <h4>要点</h4>
    <ul>
      <li> <code>::content</code> 元素伪类选中的是一个插入点 (由<code>&lt;content&gt;</code> 标签创建)。  
      这里的 <code>::content h2</code> 选中任何通过插入点分配的 <code>h2</code>。</li>
      <li>对于没有原生支持 shadow DOM 的浏览器<br />
      <code>polyfill-next-selector</code> 规则告诉 shadow DOM polyfill 如何将 <code>::content</code> 规则转换成 非-shadow DOM 规则。
		例如，没有 shadow DOM 时， <code>post-card h2</code> 将匹配卡片里的 <code>&lt;h2&gt;</code> 元素。</li>
    </ul>
  </aside>
</side-by-side>

**注意:** 
你是不能给插入点自身上样式的，因此
<code>::content</code> 元素伪类总是当成后代选择器来使用的。
{: .alert .alert-info }

### 编辑 index.html

将新的 element 导入到 `index.html`。

保存 `post-card.html` 文件并从你的编辑里打开 `index.html`。将 `post-card.html` 的导入追加到已有的导入后面：

<side-by-side>
<pre>
...
&lt;link rel="import"
  href="../components/paper-tabs/paper-tabs.html">
<strong class="highlight nocode">&lt;link rel="import" href="post-card.html"></strong>
...
</pre>
  <aside>
    <h4>要点</h4>
    <ul>
      <li>这样 <code>&lt;post-card&gt;</code> element 才能在 <code>index.html</code> 里使用。</li>
    </ul>
  </aside>
</side-by-side>

 <div class="divider" layout horizontal center center-justified>
  <core-icon icon="polymer"></core-icon>
</div> 

添加一个 `<post-card>` element 到`index.html` 里，直接追加在 `<core-toolbar>` element 的后面:

<side-by-side>
<pre>
...   
&lt;/core-toolbar>
  <strong class="highlight nocode">&lt;div class="container" layout vertical center>
    &lt;post-card>
      &lt;img width="70" height="70" 
        src="../images/avatar-07.svg">
      &lt;h2>Another Developer&lt;/h2>
      &lt;p>I'm composing with shadow DOM!&lt;/p>
    &lt;/post-card>
  &lt;/div></strong>
...
</pre>
  <aside>
    <h4>要点</h4>
    <ul>
      <li>你在这里添加的子节点元素将 <em>被分配</em> 进 <code>&lt;post-card&gt;</code> element 的各个插入点里.</li>
    </ul>
  </aside>
</side-by-side>

### 测试你的工作

保存文件并刷新页面。你的应用程序现在将看上去像这样：

<div layout vertical center>
  <img class="sample" src="/images/tutorial/step-2.png">
</div>

卡片还缺一个偏好按钮，不过已经开始有模有样了。

如果哪里出了问题，可以对照 `step-2` 文件夹里的文件检查你的工作：

-   [`post-card.html`](https://github.com/Polymer/polymer-tutorial/blob/master/step-2/post-card.html)
-   [`index.html`](https://github.com/Polymer/polymer-tutorial/blob/master/step-2/index.html)


**探讨:** 多多操作插入点就能悟出它是什么工作的了。修改 `index.html` 文件里  `<post-card>`' 的子节点的顺序会有什么变化吗？如果加入多张图片，或者文本呢? 你还可以试试交换 `post-card.html` 里的两个 `select=` 属性。
{: .alert .alert-info }

### 下一步

<a href="/docs/start/tutorial/step-3.html">
  <paper-button icon="arrow-forward" label="步骤 3: 使用数据绑定" raisedButton></paper-button>
</a>


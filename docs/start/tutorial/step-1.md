---
layout: default
type: start
navgroup: docs
shortname: Start
title: "步骤 1: 搭建 app 的结构"
subtitle: 你的第一个 Polymer 应用程序
---

<link rel="import" href="/elements/side-by-side.html">

<link rel="stylesheet" href="tutorial.css">

{% include toc.html %}

## 步骤 1: 搭建 app 的结构

在本步骤里，你将会用到一些已有的 Polymer elements 来搭建应用程序的基础结构，有工具栏和标签栏。

通过本步骤，你将学到：

-   使用 HTML imports.
-   结合标准的 HTML, CSS 和 JavaScript使用 {{site.project_title}} elements.

### 编辑 index.html


到 `本项目` 的根目录并用你偏好的编辑器打开 `index.html` 文件. 文件开始看上去是这样的:

<side-by-side>
<pre>
&lt;!doctype html>
&lt;html>

&lt;head>
  &lt;title>unquote&lt;/title>
  &lt;meta name="viewport" 
    content="width=device-width, minimum-scale=1.0, initial-scale=1.0, user-scalable=yes">
  &lt;script src="../components/platform/platform.js">
  &lt;/script>

  &lt;link rel="import" 
    href="../components/font-roboto/roboto.html">
  ...
</pre>
<aside>
  <h4>要点</h4>
  <ul>
    <li>这个基础的文件定义了一些样式和链入了可弥补浏览器原生不支持某些特性的 <code>platform.js</code> 脚本。</li>
    <li> <code>link rel="import"</code> element 就是 <em>HTML import</em>啦,是一种将资源导入到一个 THML 文件里的新途径.</li>
  </ul>
</aside>
</side-by-side>

先跳过样式部分，在文件的底下你会看到一些新东西：

<side-by-side>
<pre>
  ...
&lt;body unresolved touch-action="auto">

&lt;/body>
  ...
</pre>
<aside>
  <h4>要点</h4>
  <ul>
    <li>这里<code>&lt;body></code> element 上的 <code>unresolved</code> 属性是用来防止某些浏览器原生不支持 custom elements 而且引起的无样式内容闪动(flash of unstyled content - FOUC)问题 . 
    详情请查看
        <a href="/docs/polymer/styling.html#fouc-prevention">Polymer styling reference</a>.</li>
    <li> <code>touch-action="auto"</code> 属性是保证 touch 事件在某些浏览器上被正确处理的.</li>
  </ul>
</aside>
</side-by-side>

<div class="divider" layout horizontal center center-justified>
  <core-icon icon="polymer"></core-icon>
</div>

追加 HTML import 连接将 `<core-header-panel>`, `<core-toolbar>`, 和 `<paper-tabs>` elements 导入:

<side-by-side>
<pre>
&lt;script 
  src="../components/platform/platform.js"></script>
&lt;link rel="import" 
  href="../components/font-roboto/roboto.html">

<strong class="highlight nocode">&lt;link rel="import"
  href="../components/core-header-panel/core-header-panel.html">
&lt;link rel="import"
  href="../components/core-toolbar/core-toolbar.html">
&lt;link rel="import"
  href="../components/paper-tabs/paper-tabs.html"></strong>
&lt;style>
</pre>
  <aside>
    <h4>要点</h4>
    <ul>
      <li>
        Polymer 使用 <a href="/platform/html-imports.html">HTML imports</a> 来加载 components.
        HTML imports 提供了依赖关系的管理，保证你的 elements 和它们的依赖都加载好了你再使用它们。
      </li>
      <li>
        在本教程里，你要添加的代码就是<code><strong class="highlight nocode">加粗的黑体文本</strong></code>部分。
      </li>
    </ul>
  </aside>
</side-by-side>

<div class="divider" layout horizontal center center-justified>
  <core-icon icon="polymer"></core-icon>
</div>

要添加一个工具栏，将下面的代码添加到 `<body>` 标签里.
 
<side-by-side>
<pre>
<strong class="highlight nocode">&lt;core-header-panel>
    
  &lt;core-toolbar>
  &lt;/core-toolbar>

  &lt;!-- main page content will go here --> 

&lt;/core-header-panel></strong>
</pre>
  <aside>
    <h4>要点</h4>

    <ul>
      <li><code><a href="/docs/elements/core-elements.html#core-header-panel">&lt;core-header-panel&gt;</a></code> 
          element 是一个可以包含一个标题栏(本例是个 <code>&lt;core-toolbar></code> element)和内容的简单容器. 
          标题栏默认是保持在页面的顶部，当然也可以设置成随页面滚动而滚动</li>
      <li><code><a href="/docs/elements/core-elements.html#core-toolbar">&lt;core-toolbar></a></code> element 
      	则作为包含标签栏，菜单按钮，和其他控制器相关的容器。</li>
    </ul>
  </aside>
</side-by-side>

<div class="divider" layout horizontal center center-justified>
  <core-icon icon="polymer"></core-icon>
</div>

添加标签栏.

本应用程序会使用标签栏来作为两个不同的视图之间的导航，一个视图是所有消息列表，另一个视图是偏好列表。
<code><a href="/docs/elements/paper-elements.html#paper-tabs">&lt;paper-tabs&gt;</a></code>
element 的效果与 `<select>` element 类似, 只是它的样式被定义成了一组tab标签.

<side-by-side>
<pre>
...
&lt;core-toolbar>

  <strong class="highlight nocode">&lt;paper-tabs id="tabs" selected="all" self-end>
    &lt;paper-tab name="all">ALL&lt;/paper-tab>
    &lt;paper-tab name="favorites">FAVORITES&lt;/paper-tab>
  &lt;/paper-tabs></strong>

&lt;/core-toolbar>
...
</pre>
  <aside>
    <h4>要点</h4>
    <ul>
      <li>
        <code>&lt;paper-tabs></code> 标识了子节点选中的方式是通过 name 值还是它的索引下标值.
      </li>
      <li>
        <code>selected="all"</code> 表示选择第一个tab标签作为默认选中标签.
      </li>
      <li>在本例里, 子节点都是 <code>&lt;paper-tab></code> elements, 提供了当你点击一个tab标签时 "水墨涟漪" 的样式和动画效果.
      </li>
      <li>
        <code>self-end</code> 是个
        <a href="/docs/polymer/layout-attrs.html">布局属性</a>.
      </li>

    </ul>
  </aside>
</side-by-side>

<div class="divider" layout horizontal center center-justified>
  <core-icon icon="polymer"></core-icon>
</div> 

给新 elements 添加样式. 将以下的CSS规则添加到 `<style>` element 里.

<side-by-side>
<pre><strong class="highlight nocode">
core-header-panel {
  height: 100%;
  overflow: auto;
  -webkit-overflow-scrolling: touch; 
}
core-toolbar {
  background: #03a9f4;
  color: white;
}
#tabs {
  width: 100%;
  margin: 0;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}</strong>
</pre>
<aside>
  <h4>关键点</h4>
  <ul>
    <li><code>&lt;core-header-panel&gt;</code> 是个普通的element，可以作为整个页面的布局或作为一个有工具栏的卡片。 要作成整个页面，可滚动的容器，则需要显示的设置它的高度。
    <code>overflow</code> 和 <code>-webkit-overflow-scrolling</code> 属性确保了在触屏设备上流畅的滚动，尤其是iOS设备。</li>
    <li>工具栏为其子tab标签添加了默认的 margin 值，以便适当的控制间隔。这里的tab标签之间不需要额外的间隔。</li>
    <li><code>user-select</code> 属性是防止用户意外的选中tab标签里的文本.</li>
  </ul>
</aside>
</side-by-side>

<div class="divider" layout horizontal center center-justified>
  <core-icon icon="polymer"></core-icon>
</div> 

追加一个 `<script>` wk到文件的底部来处理tab标签之间的切换事件.


<side-by-side>
<pre>
<strong class="highlight nocode">&lt;script>
  var tabs = document.querySelector('paper-tabs');

  tabs.addEventListener('core-select', function() {
    console.log("Selected: " + tabs.selected);
  });
&lt;/script>
</strong>&lt;/body>
</pre> 
  <aside>
    <h4>要点</h4>
    <ul>
      <li>
        <code>&lt;paper-tabs></code> element 会在你选中一个标签时触发 <code>core-select</code> 事件。
        你可以将其作为内部 element 一样与此 element 互动。
      </li> 
      <li>
      	不过目前没有什么可切换的，稍后你再完成那部分功能。
      </li>
    </ul>
  </aside>
</side-by-side>


保存文件并在浏览器里打开你的项目 (如, [http://localhost:8000/starter/](http://localhost:8000/starter/)). 一个 Polymer app 呈现在你的眼前! 


<div layout vertical center>
  <img class="sample" src="/images/tutorial/step-1.png">
</div>

**注意:** 如果你打开了控制台,你可能已经注意到了，你每次切换tab标签时都触发了两次 `core-select` 
事件 &mdash; 一个是先前选中tab标签的，另一个是之后选中的tab标签的。`<paper-tabs>` element 从
<code><a href="/docs/elements/core-elements.html#core-selector">&lt;core-selector&gt;</a></code> 继承了此行为, 是同时支持单选和多选的。
{: .alert .alert-info }

如果哪里出了问题，可以对照 `step-1` 文件夹里的 `index.html` 文件检查你的工作：

-   [`index.html`](https://github.com/Polymer/polymer-tutorial/blob/master/step-1/index.html)

在本步骤里，你已经用上了 HTML imports 来导入 custom elements，并且也用这些 custom elements 搭建起了一个简单的 app 的布局。

**探讨:** 你能在 `<paper-tabs>` 里使用其他子节点吗? 尝试一下 image 或者带文本的 span 标签。
{: .alert .alert-info }

### 下一步

<a href="/docs/start/tutorial/step-2.html">
  <paper-button icon="arrow-forward" label="步骤 2: 你自己的 element" raisedButton></paper-button>
</a>


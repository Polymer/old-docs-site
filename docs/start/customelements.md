---
layout: default
type: start
navgroup: start
shortname: Start
title: Custom elements 101
subtitle: 关于基于 Polymer 的 apps 的基本原理
---

{% include toc.html %}

## 引言

如果明天 HTML 被重新发明，它将比如今内置的 elements 提供更多的特性和更加强大的能力。打个比方说，想象你正在构建一个大头贴 app 来拍照，显示缩略图，和循环播放最近的相片。如果 HTML 提供了 `<camera>`, `<carousel>`, 或者 `<tabs>` element，你将不假思索的使用它们。你已经接受了功能性并开始编写代码标记。


幸好， [Custom Elements](/platform/custom-elements.html) 铺设了一条通向 {{site.project_title}} 的 "[一切都是 element](/docs/start/everything.html#everythingis)" 哲理的道路。拥抱哲理意味着一个 web app 变成了一组定义良好，可复用的 components。
你通过组装 custom elements 来构建你的应用程序：要么是 {{site.project_title}} 提供的，要么是 [你自己创建的](/docs/start/creatingelements.html) ，或者第三方的 elements。

## Custom element APIs {#publicapis}

一个关键的认识就是 **custom elements 是不会比标准的 HTML elements 难的**。每个 HTML  element 都有自己的，由以下构成：

- 属性(properties)
- 方法
- 属性(attributes)
- 事件
- element 如何处理它的子节点

拿一个 HTML `<select>` 作比方。它可以通过以下标记声明：

    <select selected="0">
      <option>Hello World</option>
    </select>

… 或者在 JavaScript 被实例化：

    var s = document.createElement('select');
    s.innerHTML = '<option>Hello World</option>';

你一旦引用了一个 element，你可能添加事件监听器，访问属性或者调用它的方法：

    s.addEventListener('change', function(e) {
      alert(this.selectedIndex == 0);
    });

你猜怎么着？**同样适用于 custom elements 的技巧**。你能在 custom elements 上使用标准的 DOM 方法，访问它们的属性，追加事件监听器，或者给它们上样式。custom elements 的主要区别在于，它们给予作者一个工具来定义含有内置功能的新标签。这些标签能添加自己的方法，属性(properties，attributes)，和事件，并且有自己处理子节点的逻辑。

`<core-selector>` element 是一个基本 custom element 的好示例。它与 `<select>` 非常的近似，但提供了额外的功能且更加灵活。例如，你可能将 `<core-selector>` 作为一个用来选择 _任意_ 内容类型的普通选择控件，而不仅仅是 `<option>`。它还提供了便于上样式的勾子，事件，和额外的属性来与它的项进行交互。

    <core-selector selected="0">
      <div>Item 1</div>
      <div>Item 2</div>
    </core-selector>

    <script>
      var ps = document.querySelector('core-selector');
      ps.addEventListener('core-select', function(e) {
        alert(e.selectedIndex == 0);
      });
    </script>

## elements 的类型 {#elementtypes}

Polymer 基于使用的行为将它的 custom  elements 划分成两个基本的类别：

- UI elements, 将 UI 渲染到屏幕上。
- 非UI elements, 提供工具支持。 

###  UI elements {#uielements}

像 `<select>` 和 `<core-selector>` Elements 都是 _UI elements_。它们渲染的 UI 都显示在页面上。其他的实例有 [`<core-collapse>`](/components/core-docs/index.html#core-collapse), [`<core-toolbar>`](/components/core-docs/index.html#core-toolbar), 和 [`<paper-tabs>`](/components/paper-docs/index.html#paper-tabs)：

    <paper-tabs selected="0">
      <paper-tab>One</paper-tab>
      <paper-tab>Two</paper-tab>
      <paper-tab>Three</paper-tab>
    </paper-tabs>

<!-- 
<iframe src="/components/paper-tabs/demo.html" style="border:none;height:80px;width:100%;"></iframe> -->

### 非UI elements {#nonuielements}

非UI elements _**不会**_ 渲染任何东西到屏幕上。这可能有点奇怪，不过 HTML 里已经有很多实例了： `<script>`, `<style>`, 和 `<meta>` 是其中的少数部分。这些 elements 有自己的目的并且无需渲染 UI 也能很有帮助。

非UI elements 在屏幕后面提供工具支持。如， `<core-ajax>` 标签让你 **在标记上发起 XHR 请求**。给它添加一些属性配置并监听它的返回响应：

    <core-ajax url="http://gdata.youtube.com/feeds/api/videos/" auto
               params='{"alt":"json", "q":"chrome"}' handleAs="json"></core-ajax>
    <script>
      var ajax = document.querySelector('core-ajax');
      ajax.addEventListener('core-response', function(e) {
        console.log(this.response);
      });
    </script>

像这样的非UI elements 减少了大量你需要编辑的模板代码。它们完事就消失，还能隐藏像 `XMLHttpRequest` 一样复杂的 API。

## 共用性：默认支持 {#interop}

因为 custom elements 本质上还是 HTML elements，它们之间或者与其他理解 DOM(地球上的所有框架)的技术都能很好的配合。这意味着，custom elements 已经能与这些像 Angular， Ember， jQuery，等框架结合使用了。


目前为止我们所使用的 custom elements 来自 {{site.project_title}} 的合集且由 [{{site.project_title}} 核心](/docs/polymer/polymer.html) 构建。 
但是，这正是事情变得有意思的地方...

**那无关紧要**.

因为 custom elements 与常规的 elements 一样，用什么样的技术实现它的内部结构都无关紧要。来源不同种类不同的 elements 都能在同一个页面共存。比如，Mozilla 提供的一系列  custom elements 叫做 [x-tags](http://x-tags.org/) (另见： [Brick](http://mozilla.github.io/brick/))。你可以将  x-tags 与其他 elements 混用互相匹配。按照常规，一个 element 如何被组织并不重要。

## 下一步 {#nextsteps}

现在你已经了解了你能用 custom elements 来干什么，是时候创造点什么了吧！接着：

<a href="/docs/start/usingelements.html">
  <paper-button icon="arrow-forward" label="使用 elements" raisedButton></paper-button>
</a>

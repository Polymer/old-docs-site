---
layout: default
type: concepts
navgroup: start
shortname: Concepts
title: 理解 Polymer
subtitle: 概念层
---

{% include toc.html %}

{{site.project_title}} 不同于其他你可能接触过的框架或类库。要完全理解它是什么，你需要理解 {{site.project_title}} 的世界观，快速的过一遍以下三个概念层。

## 一切都是 element : {{site.project_title}} 的世界观 {#everythingis}

"_一切都是 element _" 的哲理是解理 {{site.project_title}} 的核心。

自 Web 诞生以来，浏览器都自带有一系列默认的 element 。绝大大数 element 作用并不大，好比 `<div>` 。
但有些 element 却比较强大，想想卑微的的`<select>`。我们都不以为然，实际上它却非常的了不起：

- **实用的**. 浏览器已经知道如何处理 `<select>`  element 。当在代码标记里遇到 `<select>` 时，浏览器会自动创建一个可以与用户交互的控件。
- **可复用**. `<select>`  element 是一个你无需自己去实现的可复用的封装。
- **可共用**. 每个 JavaScript 库都知道如何跟 DOM  element 进行交互。
- **可封装**. 它的内部结构都是隐藏的，所以引入一个进来也不会破坏你的页面。
- **可配置**. 你完全可以不使用任何脚本仅通过 HTML 属性就能配置它。
- **可编程的**. 你如果要从 DOM 里操作它，它也提供了相应的方法和属性。
- **生成事件**. 当有趣的事情发生时它还会通过各种事件派遣来通知你。
- **可组合**. 你不仅能将一个 `<select>` 包含到大部分其他 element 里，它的行为还会因包含它的 element 的不同而不同。

 element 真的很伟大，它们是构建 web 的积木。遗憾的是，随着 web app 变得愈加的复杂，浏览器自带的基础 element 已经无法适应我们的需求。我们的解决方案往往是加入一堆脚本。这些转变已经让我们失去了优雅的 element 。

{{site.project_title}} 回归我们的初衷。我们认为答案不是一堆脚本，而是创造更加强大的 element 。一系列称之为 Web Components 的强大的新技术让这成为了可能。

那将我们拉回到 {{site.project_title}} 的世界观: _一切都是 element _

当我们说 " element " 时，我们指的是一个真实的 element ，一个内键有很多很棒的属性的 element 。那为何 element 仅限于UI呢？ element 的有些属性是UI专用的，但大多数不是。 element 可以当作一个对可复用的功能的通用的封装。

当你从这个观点出发时世界变得大不一样。将一些底层的 element 放到一起，构建一个巨型强大并且内部组件完全封装好的 element 。你还可以将这些 element 拿来构建更大更好的 element 。当你还没有回过神来，你已经构建了一个可封装，易复用的 _app_ 。

在旧的世界里，脚本就是你的混凝土，你能用的解决方案就是一堆一堆的用。在新的世界里， element 是砖块；脚本更像是灰浆。按需选好你的砖块，然后用适量的灰浆将它们砌到一起。这就是当我们说 _一切都是 element _ 时的含义。


## {{site.project_title}} 的概念层

{{site.project_title}} 有三个概念层：

1. **[使用 element ](/docs/start/usingelements.html)**: {{site.project_title}} 提供了一系列你可以直使用的UI和非UI的 element 。你可以将 {{site.project_title}} 的 element 一起混着用，包括自带的 element 和其他自定义的custom elements。

1. **[创建 element ](/docs/start/creatingelements.html)**: {{site.project_title}}  的声明语法使得定义一个 custom elements 变得更加简单。数据双向绑定，属性监听，手势事件等特性会帮你构建强大可复用的 element。

1. **[平台](/docs/start/platform.html)**: {{site.project_title}} 是基于最新的 web 技术的，像 Web Components 和 Object.observe。并不是所有的浏览器都支持了，因此 {{site.project_title}} 的平台层填补了这些缺口，通过 JavaScirpt 实现了对应的 APIs。{{site.project_title}} 在运行时会自动选择最高性能的方式 -- 使用原生的实现还是 JavaScript 的实现。


## 下一步 {#nextsteps}

现在你已经了解了 {{site.project_title}} 的基本概念，是时候更加深入一点了，接着：

<a href="/docs/start/customelements.html">
  <paper-button icon="arrow-forward" label="Custom Elements 101" raisedButton></paper-button>
</a>

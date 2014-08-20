---
layout: default
type: concepts
navgroup: start
shortname: Concepts
title: 平台
subtitle: 目前支持新技术的方案
---

{% include toc.html %}

## 引言

{{site.project_title}} 基于即将到来的 web components 技术，不过这些技术还没有被所有浏览器完全支持。

{{site.project_title}} 最底的那层就是 `platform.js`：一个解决那些还没有被所有浏览器原生支持的 web 技术的类库集合。平台使得开发者目前就能在跨所有流行浏览用上这此新的标准。随着这些技术被浏览器原生的支持，polyfills 会减少，你将直接受益于原生的实现。`Platform.js` 自动检测原生支持并在可用的情况下切换至最佳途径。你的 elements 会无缝的依赖原生的东西 -- 处理过程会更快。

虽然大部分开发者都想用上全部的 `platform.js`，但 polyfills 是被分开设计的，所以，他们可以互相依赖的使用也可以单独使用。如 Mozilla 的 [x-tags](http://www.x-tags.org/) 和 Brick 项目使用了 `platform.js` polyfills 的一个子集。

## 平台里有些什么? {#bundle}

平台层就是个套餐，包含了以下的类库:

- Web Components
  - [Shadow DOM](/platform/shadow-dom.html). 自身封装 DOM 和关联相应的 CSS。
  - [HTML Imports](/platform/html-imports.html). 显示的加载 element 的定义和其他资源。
  - [Custom Elements](/platform/custom-elements.html) . 在 HTML 里定义新的 elements。
- DOM
  - [URL](https://github.com/Polymer/URL). JavaScript 解析 URLs。
  - [WeakMap](https://github.com/Polymer/WeakMap). 填补 ES6 WeakMap 类型。
  - [Mutation Observers](https://github.com/Polymer/MutationObservers). 高效的监听 DOM 的变化。
  <!-- - [Promises](https://github.com/Polymer/Promises). 处理异步操作。 -->
  - [observe-js](https://github.com/Polymer/observe-js). 使用 `Object.observe` 监听 JS 对象/数组(如果可用)。
- 其他
  - [Web Animations](/platform/web-animations.html). 定义复杂的时时动画。

## 安装 & 使用 {#setup}

要当下就使用这些特性，首先按 [获取源码](/docs/start/getting-the-code.html) 指南里描述的使用 Bower 下载`platform.js`：

    bower install --save Polymer/platform

然后， 像引入其他脚本一样引入 `platform.js` ：

    <script src="bower_components/platform/platform.js"></script>

**注意**: 限于某些 polyfills 的本性，要与其他类库一起发挥最大的能力，请确保 `platform.js` 是 document 的 `<head>` 里首个 script 标签。
{: .alert alert-info}

引用进入后，你就可以将 [HTML Imports](/platform/html-imports.html), [Custom Elements](/platform/custom-elements.html), [Shadow DOM](/platform/shadow-dom.html)，
和那些新兴的标准应用到你的 app 里了。如，要使用一个 {{site.project_title}} element，直接使用一个 HTML Import 将其导入：

    <link rel="import"
          href="bower_components/paper-tabs/paper-tabs.html">

然后像使用内部标签一样的使用 `<paper-tabs>`。

虽然每个 polyfill 都是独立的，推荐直接引入整个 `platform.js` 文件。这能确保所有的依赖都到位，未来的 web 平台能最大程度的可用。由于这是最常用的配置，它被测试得也是最多的。

## 构建每个 polyfill {#build}

有关如何单独构建每个 polyfill 的资料，请参看 [工具 & 测试](/resources/tooling-strategy.html)。

## 下一步 {#nextsteps}

`platform.js` 是个很棒的使得 Web Components 跨流行浏览器工作的基础。如果你已经准备好创建你自己的 elements，也想学习更多 `polymer.js` 的附加特性，请参看我们的 [创建 elements](/docs/start/creatingelements.html) 和 [使用 elements](/docs/start/usingelements.html) 指南。 接着：

<a href="/docs/polymer/polymer.html">
  <paper-button icon="arrow-forward" label="开发者 API 指南" raisedButton></paper-button>
</a>
 

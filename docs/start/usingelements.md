---
layout: default
type: start
navgroup: start
shortname: Start
title: 使用 elements
subtitle: Polymer from the outside
---

{% include toc.html %}

{{site.project_title}} 提供了一些 elements 集合，你可以轻松的将它们导入到你的项目里。如果你懒得多写几行代码，接着往下读！ 

## 安装 elements {#install}

你可以一次安装一个 elements，或者安装整个 elements 集合。

{{site.project_title}} 包含有两个主要的 elements 集合：

-   <a href="/docs/elements/core-elements.html">{{site.project_title}} Core elements</a>. 工具集 elements，包含常用的 UI elements(如，icons，布局 elements，工具栏)，
	还有非UI的 elements 可提供如AJAX，信号发送和存储。

-   [Paper elements](/docs/elements/paper-elements.html). 实现了 
    [material design 系统](/docs/elements/material.html) 的 elements 集合。

如果你在文档里发现一个你想要的 elements，点击下载按钮然后选择你的安装方式。更多方法请参看[获取源码](getting-the-code.html)。

点击以下其中一个按钮安装对应的 element 集：

  <component-download-button org="Polymer" component="core-elements" label="获取 {{site.project_title}} CORE ELEMENTS">
  </component-download-button>

  <component-download-button org="Polymer" component="paper-elements" label="获取 PAPER ELEMENTS">
  </component-download-button>


**注意:** github 上的 PolymerLabs repo 包含有不少不是实验性就是被废弃的已不被支持的 elements 。尤其是早期的 `polymer-elements` 和 `polymer-ui-elements` 已被 {{site.project_title}} Core elements 所取代。

## 使用 elements {#using}

要使用 elements，首先要加载 `platform.js`。目前大多数浏览器还没有原生实现好多 web components APIs。在它们支持前， `platform.js` 提供 [polyfill 的支持](/docs/start/platform.html). **要操作 DOM 前请确保已经引入这个文件。**

你安装好 elements 并加载了 `platform.js` 后，使用一个 element 就是通过一个 [HTML Import](/platform/html-imports.html) 将 element 的文件导入。 

`index.html` 示例：

    <!DOCTYPE html>
    <html>
      <head>
        <!-- 1. 加载 platform.js 以提供 polyfill 支持. -->
        <script src="bower_components/platform/platform.js"></script>

        <!-- 2. 使用一个 HTML Import 将 element 导入 -->
        <link rel="import"
              href="bower_components/core-ajax/core-ajax.html">
      </head>
      <body>
        <!-- 3. 声明 element，通过它的属性配置它。 -->
        <core-ajax url="http://example.com/json"
                   handleAs="json"></core-ajax>

        <script>
          // 等待 'polymer-ready' 触发，确保 element 已被更新。
          window.addEventListener('polymer-ready', function(e) {
            var ajax = document.querySelector('core-ajax');

            // 响应事件的触发。
            ajax.addEventListener('core-response', function(e) {
              console.log(this.response);
            });

            ajax.go(); // 调用它自己的 API 方法。
          });
        </script>
      </body>
    </html>

**注意:** 你必须将你的 app 放到一个 web server 里运行才能使 [HTML Imports](/platform/html-imports.html)
polyfill 正常的工作。这个需求会在浏览器原生支持后消失。
{: .alert .alert-info }

###  在属性中传递对象和数组 {#objectarray}

[HTML 属性](https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes) 值都是字符串，
但有时候你想传递更加复杂的参数给一个 custom element，比如对象或者数组，最后由 element 的作者决定如何解析属性中的值。
不过很多 {{site.project_title}} 的 elements 是可以识别属性的值为 JSON序列化对象或者数组的。例如：

    <roster-list persons='[{"name": "John"}, {"name": "Bob"}]'></roster-list>

对于 {{site.project_title}} 的 elements，你可以在 [Elements 参考书](/docs/elements/) 里找到期望的类型。如果你发错了类型，它可能无法解析。 

当你自己创建 {{site.project_title}} elements 时，你能选择性的将属性暴露成标记属性，参看 [公有的属性](/docs/polymer/polymer.html#published-properties).

## 下一步 {#nextsteps}

目前你已经了解了安装 elements 的基础思路，是时候构建点东西出来了！下一章节里我们将讲解 {{site.project_title}} 的特性和如何创建一个新的 `<polymer-element>` 。接着：

<a href="/docs/start/creatingelements.html">
  <paper-button icon="arrow-forward" label="创建 elements" raisedButton></paper-button>
</a>

如果你宁愿浏览已有的 elements，参看
<a href="/docs/elements/core-elements.html">{{site.project_title}} Core elements</a> 
and <a href="/docs/elements/paper-elements.html">Paper elements</a> catalogs.

---
layout: default
type: core
navgroup: docs
shortname: 文章
title: 给 Elements 上样式完全指南

article:
  author: ebidel
  published: 2013-07-11
  updated: 2014-04-11
  polymer_version: 0.2.2
  description: Learn all about how to style Polymer elements.
tags:
- CSS
---

<link rel="import" href="/articles/demos/styling/elements.html">

{% include authorship.html %}

{% include toc.html %}

这篇文章覆盖到很多给 [Custom Elements](/platform/custom-elements.html) 上样式的新 CSS 规则，属性，和概念。其中很多内容都适用于普通的 Web Components，特别注重于以下内容：

1. 如何与 {{site.project_title}} 结合使用这些新的 CSS 特性。
2. {{site.project_title}} 的 polyfills 如何替补(shim)某些行为。

这篇文章列出的内容与 CSS 和 Shadow DOM 如何互相配合密切相关。如果你想了解如何给 Shadow DOM 上样式的具体细节，参看我在 HTML5Rocks.com 上的文章，[Shadow DOM 201 - CSS and Styling](http://www.html5rocks.com/tutorials/webcomponents/shadowdom-201/)。

## 默认样式

大多数 elements 都被浏览器设置了默认的样式。如，
`<head>` 的 `<title>` 是 `display: none`, `<div>` 是 `display: block`,
`<body>` 有 `margin: 8px`, 及列表项是 `list-style-type: disc`。

### 用户提供的样式

正如任意的 HTML element，你的 Custom Element 的用户可以为其定义样式：

    <style>
      x-foo {
        display: block;
      }
      x-foo:hover {
        opacity: 0;
      }
    </style>

    <x-foo></x-foo>

不过，Custom Element 定义了自身的外观是很平常的。

### Element 定义的样式

_你_ 所创建的 elements 会需要上一些样式。 `:host` 和 `:host(<选择器>)` 允许你在其内容的定义里设置目标和样式化一个 custom element：

    <polymer-element name="x-foo" noscript>
      <template>
        <style>
          :host {
            /* Note: by default elements are always display:inline. */
            display: block;
          }
        </style>
      </template>
    </polymer-element>

`:host` 指向 custom element 自身且有着最底层的特征。它允许用户从外部重写你的样式。


`:host(<选择器>)` 是 `:host` 最复杂的部分。它允许你指定一些规则目标是是否匹配 host 里的`<selector>`：如：

    <x-foo class="different"></x-foo>

匹配

    :host(.different) {
      ...  
    }

#### 响应用户状态

`:host` 一个有趣的用途是响应不同用户驱动的状态 (:hover, :focus, :active, etc.)：

    <polymer-element name="x-button" noscript>
      <template>
        <style>
          :host {
            opacity: 0.6;
            transition: opacity 400ms ease-in-out;
          }
          :host(:hover) { opacity: 1; }
          :host(:active) { ... }
        </style>
        <button><content></content></button>
      </template>
    </polymer-element>

    <x-button>x-buttonz!</x-button>

当有人鼠标经过 `<x-button>` 将会得到一个性感的淡入效果！

**示例:** <x-button-example>x-buttonz!</x-button-example>

#### 主题化一个 element

`:host-context(<选择器>)` 伪类匹配的是 host element，只要它或者任意一个父级匹配 `<选择器>`。

**示例** - 如果 element 的父级有 `different` 类则加上颜色：

    :host-context(.different) {
      color: red;
    }

另一个你觉得 `:host-context()` 很实用的原因就是用来做主题。如，很多开发者通过在 `<html>` 或 `<body>` 上添加类来实现主题。

    <body class="different">
      <x-foo></x-foo>
    </body>

**示例** - 使用外部的类来主题化一个 element

    <polymer-element name="x-foo" noscript>
      <template>
        <style>
          :host-context(.different) { ... }
        </style>
      </template>
    </polymer-element>

    <body class="different">
      <x-foo></x-foo>
    </body>

#### 通过编程修改样式

你可以动态的修改一个 element 的样式，你猜对了，修改它的 `.style` 属性。

从外部：

    var xFoo = document.createElement('x-foo');
    xFoo.style.background = 'blue';

从 element 内部：

{% raw %}
    <polymer-element name="x-foo" on-click="{{changeBg}}">
      <template>
        <style>
          :host {
            display: inline-block;
            background: red;
            color: white;
          }
        </style>
        <div>Click me</div>
      </template>
      <script>
        Polymer('x-foo', {
          changeBg: function() {
            this.style.background = 'blue'; 
          }
        });
      </script>
    </polymer-element>
{% endraw %}

**示例:** <x-bgchange-example></x-bgchange-example>

如果你抓狂了，在 `:host` 里使用 CSSOM 来修改规则是可以的：

{% raw %}
    <polymer-element name="x-foo" on-click="{{changeBg}}">
      <template>
        <style>
          :host { background: red; }
        </style>
      </template>
      <script>
        Polymer('x-foo', {
          changeBg: function() {
            var sheet = this.shadowRoot.querySelector('style').sheet;
            // 特例，:host 可能不是 <style> 中的第一个
            var hostRules = sheet.cssRules[0];
            // 将规则追回到结尾。
            hostRules.insertRule(':host:hover { color: white; }',
                                 hostRules.cssRules.length);
          }
        });
      </script>
    </polymer-element>
{% endraw %}

这么做的唯一理由可能是编程实现对伪类的添加/删除。
这个技巧在 {{site.project_title}} 的 Shadow DOM polyfill 作用下是无效的，所以不值得。
参看 [issue #23](https://github.com/Polymer/platform/issues/23).

## 预防 FOUC

当你声明 `<x-foo>` (或者其他非原生的 HTML element) 时，它在页面里作为一个普通的 `HTMLElement` 安然的存在着。
只有当浏览器注册了它的定义时 `<x-foo>` 才会变得不可思议。

一个 element 在被注册之前，更新它的过程要花的时间可能要比预期的要长点。
例如，定义 element 的 [HTML Import](/platform/html-imports.html)  可能会因为网络差而变得很慢。

要与这些 UX 方面的问题作斗争及缓解类 [FOUC](http://en.wikipedia.org/wiki/Flash_of_unstyled_content) 的问题，你可以使用 CSS `:unresolved` 伪类。
它会作用到那些不被浏览器识别的 elements 直到生命周期方法 `createdCallback` 被调用。

**支持:** CSS `:unresolved` 伪类在 Chrome 29 是原生支持的。如果你使用的浏览器没有原生支持它，使用 {{site.project_title}} 的 [预防 FOUC](/docs/polymer/styling.html#fouc-prevention) 特性。
{: .alert .alert-success}

**示例:** 当一个 element 被注册时淡入显示它

    <style>
      x-foo {
        opacity: 1;
        transition: opacity 300ms;
      }
      x-foo:unresolved {
        opacity: 0;
      }
    </style>

**示例:** 使用自定义的 content 显示 "loading" 提示

    <style>
      :unresolved {
        display: flex;
        justify-content: center;
        background: rgba(255,255,255,0.5);
        border: 1px dashed #ccc;
        border-radius: 5px;
      }
      :unresolved:after {
        padding: 15px;
        content: 'loading...';
        color: #ccc;
      }
    </style>

### Polyfilling :unresolved

{{site.project_title}} 提供 `[unresolved]` 属性来 polyfill CSS
`:unresolved` 伪类。参看 [预防 FOUC](/docs/polymer/styling.html#fouc-prevention)。此属性会在 `polymer-ready` 时机自动被删除掉，`polymer-ready` 是所有 element 被更新后触发的事件。

**示例**

    <style>
      x-foo[unresolved] {
        /* custom styling */ 
      }
    </style>
    <x-foo unresolved></x-foo>

## 给内部标记上样式 {#style-shadowdom}

### 在 element 内部 {#style-frominside}

要给一个 element 的内部标记上样式，在 `<template>` 的顶部引入一个 `<link>` 或者 `<style>` 标签：

    <polymer-element name="x-foo" noscript>
      <template>
        <style>
          p {
            padding: 5px;
          }
          #message {
            color: blue;
          }
          .important {
            font-weight: bold;
          }
        </style>
        <div id="message">I'm a status message!</div>
        <p>Web components are great</p>
        <footer class="important">That is all</footer>
      </template>
    </polymer-element>

局部样式是 Shadow DOM 的其中一个特性。于 shadow tree 里定义的样式不会外漏同时页面的样式也不会渗入。

{{site.project_title}} 从 `<polymer-element>` 顶部定义的 `<template>` 开始创建 Shadow DOM，
所以内部定义的样式只作用你的 element。不必担心与外边的 id 出现重复，或者使用的样式规则作用范围太宽。

**注意** 对于那些没有原生支持 Shadow DOM 的浏览器，polyfill 将会尽可能的模拟局部样式。参看 [polyfill 详解里的处理局部样式](/docs/polymer/styling.html#polyfill-details).
{: .alert .alert-info }

如果你需要给来自用户的 Light DOM (非Shadow DOM 或普通 DOM)，你 element 里的分布式节点上样式。参看 [样式化分布式节点](#style-distributed).

#### 样式化分布式节点 {#style-distributed}

`<content>` elements 允许你选中 ["Light DOM"](/platform/shadow-dom.html#shadow-dom-subtrees) 的节点，并将他们在你的 element 里的预先定义的位置渲染。
CSS `::content` 伪类是给从插入点插入的节点上样式的一种方式。

**完整示例**

    <polymer-element name="x-foo" noscript>
      <template>
        <style>
          content[select="p"]::content * { /* anything distributed here */
            font-weight: bold;
          }
          polyfill-next-selector { content: 'p:first-child'; }
          ::content p:first-child {
            color: red;
          }
          polyfill-next-selector { content: 'footer > p'; }
          ::content footer > p {
            color: green;
          }
          polyfill-next-selector { content: ':host > p'; }
          ::content p { /* scope relative selector */
            color: blue;
          }
        </style>
        <content select="p"></content>
        <content></content>
      </template>
    </polymer-element>

    <!-- x-foo 子元素都是 Light DOM. -->
    <x-foo>
      <p>I'm red and bold</p>
      <p>I'm blue and bold</p>
      <footer>
        <p>I'm green</p>
        <span>I'm black</span>
      </footer>
    </x-foo>
    
**注意**: 对于复杂似分布式节点的样式化，{{site.project_title}} 提供了 `polyfill-*`
选择器来 polyfill 某些 Shadow DOM 特性。参看 [样式化说明](/docs/polymer/styling.html#directives) 了解更多。
{: .alert .alert-info }

**记住:** 在主文档里定义的样式是一直作用到对应的 Light DOM 节点上的，即便这些节点已经被分布到 Shadow DOM 里。跑进一个插入点里并无法更改什么样式被应用。
下面的示例说明了这个观点：

    <style>
      x-foo > div {
        color: green;
      }
      .red {
        color: red; 
      }
    </style>

    <polymer-element name="x-foo" noscript>
      <template>
        <div class="red">Shadow DOM: shouldn't be red (under native Shadow DOM)</div>
        <content select="div"></content>
      </template>
    </polymer-element>

    <x-foo>
      <div>Light DOM: green</div>
    </x-foo>

<style>
  x-foo-example2 > div {
    color: green;
  }
  .red {
    color: red; 
  }
</style>

**示例:**

<x-foo-example2 style="margin-bottom:20px;">
  <div>Light DOM: green</div>
</x-foo-example2>

element 的 Shadow DOM `<div class="red">` 并没有匹配到 `.red` 类。
被分布的 `<div>Light DOM: green</div>` 保持了绿色，因为逻辑上它还在父级页面里所以匹配了 `x-foo > div`。
所以它只是被简单的在别处渲染(在 Shadow DOM 的背面)。

### 在 element 的外部 {#style-fromoutside}

伪-element `::shadow` 和 `/deep/` 连结符能穿透 Shadow DOM 的边界而允许你从不同的 shadow trees 里给 elements 上样式。

#### 伪-element `::shadow` {#hat}

如果一个 element 至少有一个 shadow tree，伪-element `::shadow` 将匹配 shadow roots 本身。
例如，假设你想给 x-foo 内部的 p 元素上样式。先通过 `x-foo::shadow` 选择中 x-foo 的 shadow root。然后，你可以写一个普通的后代选择器来匹配 `p` 了。

    <style>
      x-foo::shadow p {
        color: red;
      }
      /* (本例里)与上边的规则相等。 */ 
      x-foo::shadow > p {
        color: red;
      }
    </style>

    <polymer-element name="x-foo" noscript>
      <template>
        <p>I am red!</p>
        <content></content>
      </template>
    </polymer-element>

    <x-foo>
      <p>I am not red (under native shadow dom).</p>
    </x-foo>

**示例:**

<style shim-shadowdom>
  x-foo-shadow::shadow p {
    color: red;
  }
</style>

<x-foo-shadow style="margin-bottom:20px;">
  <p>I am not red (under native shadow dom).</p>
</x-foo-shadow>

本例里， `<p>I am not red (under native shadow dom)</p>` 样式没变化，因为 `x-foo::shadow p { ... }` 只针对 x-foo 内部的 `<p>` (e.g. 在其 Shadow DOM 里)。
在 polyfill 的作用下，它 _是_ 被样式成红色。这是因为 {{site.project_title}} 将 `::shadow` 替换成 `x-foo p` 了。

一个更加完整的实例是样式化一个 tabs component，假设是 `<x-tabs>`。在它的 Shadow DOM 里有 `<x-panel>` 的子节点。各自有一个  `h2` 标题。
要在主页面里给这些标题上样式，可以这样使用 伪-element `::shadow` ：

{%raw%}
    <style>
      x-tabs::shadow x-panel::shadow h2 {
        ...
      }
    </style>

    <polymer-element name="x-tabs" noscript>
      <template>
        <x-panel heading="Title">
          <p>Lorem Ipsum</p>
        </x-panel>
        ...
      </template>
    </polymer-element>

    <polymer-element name="x-panel" attributes="heading" noscript>
      <template>
        <h2>{{heading}}</h2>
        <content>No content provided.</content>
      </template>
    </polymer-element>

    <x-tabs></x-tabs>
{%endraw%}

#### `/deep/` 连结符 {#cat}

`/deep/` 连结符与 `::shadow` 类似，但更加强大。它完全 **忽略 shadow 的边界可以穿透任意数量的 shadow trees**

**示例** 样式化 `<x-tabs>` 的所有后代 `h2` elements，于 shadow tree 的任意位置：

    x-tabs /deep/ h2 {
      ...
    }

**示例** 通过 `.library-theme` 样式化所有 elements， 于 shadow tree 的任意位置：

    body /deep/ .library-theme {
      ...
    }

## 结论

样式化 Custom Elements 有很多新的概念。将事情变得格外有趣（同时，也无力）的是 Shadow DOM 。
Web 开发过程中，我们习惯的想，“哇！到处是全局性”。这只是对 DOM，CSS,JS的，不是对 Custom Elements 的。这是个美好的新世界，然而也是功能强大的包装，呆萌的狗狗，毛茸茸的兔子。尽情的享受吧！

{% include disqus.html %}

---
layout: default
type: core
navgroup: docs
shortname: Docs
title: 给 elements 上样式
subtitle: 指南
---

{% include toc.html %}

**注意:** 给 {{site.project_title}} elements 上样式并不难于给 custom elements 上样式。
更加全面的基础指南，请参看 "[给 Elements 上样式完全指南](/articles/styling-elements.html)".
{: .alert }

除了 [给 Custom Elements 上样式的标准设置](/articles/styling-elements.html) 外， {{site.project_title}} 包含有额外的增强设置以完全控制 element 的样式化。本文档会涉及到那些额外的特性，包括预防无样式内容闪动(flash of unstyled content - FOUC), Shadow DOM polyfill 如何应用样式，及目前一些受限如何应付。

## 预防 FOUC

在 custom elements [更新](http://www.html5rocks.com/tutorials/webcomponents/customelements/#upgrades) 之前可能显示错乱。 为了缓解 [FOUC](http://en.wikipedia.org/wiki/Flash_of_unstyled_content) 问题, 
{{site.project_title}} 提供了一个 polyfill 解决方案，配合 [`:unresolved` 伪类](/articles/styling-elements.html#preventing-fouc) 使用。 
对于简单的 app，你可以为 body 添加 `unresolved` 属性。这将在页面初始化时隐藏页面直到所有的 elements 被更新才显示。

    <body unresolved>

类名 | 行为
|-
`body[unresolved]` | 设置 body `opacity: 0; display: block; overflow: hidden`。
`[resolved]` | 200毫秒后淡入显示 body。
{: .table .responsive-table .fouc-table }

如果你想获得更精细的控制，将 `unresolved` 添加到特定的 elements 上而不是 body 上。这将会先显示整个页面而允许你控制 unresolved element 的样式：

    <style>
      [unresolved] {
        opacity: 0;
        /* other custom styles for unresolved elements */
      }
    </style>
    <x-foo unresolved>If you see me, elements are upgraded!</x-foo>
    <div unresolved></div>

[`polymer-ready`](/docs/polymer/polymer.html#polymer-ready) 触发前， {{site.project_title}} 会执行以下的步骤：

1. 移除 elements 中 `[unresolved]` 属性
2. 添加 `[resolved]` 属性
3. 在 element 收到第一个  `transitionend` 时移除 `[resolved]` 

### 在启动后揭开 elements {#unveilafterboot}

遮罩过程可能用来实时预防 FOUC。要如此这般，给目标 elements 添加 `[unresolved]` 属性，当要显示 elements 时切换到 `[resolved]` 属性。如，

    element.setAttribute('unresolved', '');

    // ... 一段时间后 ...
    element.setAttribute('resolved', '');
    element.removeAttribute('unresolved');

## 在 element 内容引入样式表

{{site.project_title}} 允许你将样式表引入至 `<polymer-element>` 的定义里，这是原生 Shadow DOM 不支持的特性。如下：

    <polymer-element name="my-element">
      <template>
        <link rel="stylesheet" href="my-element.css">
         ...
      </template>
    </polymer>

{{site.project_title}} 会自动通过一个 `<style>` 的方式将 `my-element.css` 的样式表内联进来：

    <polymer-element ...>
      <template>
        <style>.../* Styles from my-element.css */...</style>
         ...
      </template>
    </polymer>

## Polyfill CSS 选择器 {#directives}

当基于Shadow DOM polyfill时，{{site.project_title}} 提供了一个特殊的 `polyfill-*` CSS 选择器，给你更多填补样式规则的控制权。

### polyfill-next-selector {#at-polyfill}

`polyfill-next-selector` 选择器是用来将原生 CSS 选择器替换为 polyfill 的实现。如，要作用目标节点使用 `::content` 只有原生 Shadow DOM 下生效。换之呢，你可以告知 {{site.project_title}} 用 polyfill 去使用兼容的规则替换指定的规则。

要替换原生的 CSS 样式规则，将 `polyfill-next-selector {}` 放置在你想要 polyfill 的选择器上边。
在 `polyfill-next-selector` 的内部，添加一个`content` 属性。它的值必须是一个与原生的规则相同的选择器。
 {{site.project_title}} 会使用这个值去顶替原生的选择器。如：

    polyfill-next-selector { content: ':host .bar'; }
    ::content .bar {
      color: red;
    }
    
    polyfill-next-selector { content: ':host > .bar'; }
    * ::content .bar {
      color: blue;
    }

    polyfill-next-selector { content: '.container > *'; }
    ::content * {
      border: 1px solid black;
    }


在原生的 Shadow DOM 下不会起作用，但在 polyfill 下，原生的选择器已被那个定义在它前边的 `polyfill-next-selector` 替换。上边的例子会被转变成：

    x-foo .bar {
      color: red;
    }
    
    x-foo > .bar {
      color: blue;
    }

    x-foo .container > * {
      border: 1px solid black;
    }

### polyfill-rule {#at-polyfill-rule}

`polyfill-rule` 选择器**只**用来创建那些给 Shadow DOM polyfill 用的规则。 当你无法使一个样式规则同时在原生的 Shadow DOM polyfill 中生效时，这就是给你的解决方案。
然而，由于这是 {{site.project_title}} 提供的样式顶替，你应该尽少的用到。

要使用 `polyfill-rule`， 创建一个样式规则列表。添加 `content` 属性来描述那些将被应用的 CSS 选择器。如：

    polyfill-rule {
      content: '.bar';
      background: red;
    }

    polyfill-rule {
      content: ':host.foo .bar';
      background: blue;
    }

这些规则在原生 Shadow DOM 下是无效的。在 polyfill 下 `polyfill-rule` 将被 `content` 里的选择器替换。

 {{site.project_title}} 还会给选择器前缀加上 element 的 name。

上边的例子会被转变成：

    x-foo .bar {
      background: red;
    }
    
    x-foo.foo .bar {
      background: blue;
    }

### polyfill-unscoped-rule {#at-polyfill-unscoped-rule}

`polyfill-unscoped-rule` 选择器跟 `polyfill-rule` 一样精确，除了里面的规则不在 polyfill 作用域内。你所写的选择器将被精确应用到对应的规则上。

    polyfill-unscoped-rule {
      content: '#menu > .bar';
      background: blue;
    }

结果：

    #menu > .bar {
      background: blue;
    }

你需要用到 `polyfill-unscoped-rule` 的场景很少的。
{{site.project_title}} 使用 CSSOM 来更改样式，有一些已知的规则跟 CSSOM 不太兼容 (某些浏览器下)。比如在 Safair 中使用 CSS `calc()`。只有在这类场景下 `polyfill-unscoped-rule` 才会被用到。

<!-- {%comment%}
## 全局样式

CSS 规定, 某些 @-rules 像 `@keyframe` 和 `@font-face` 不能定义在 `<style scoped>`。因此，它们在 Shadow DOM 中将无效。
换之，你需要在 element 的外部声明它们的定义。

HTML import 里的样式表和 `<style>` 元素会自动导入到主文档中：

    <link rel="stylesheet" href="animations.css">

    <polymer-element name="x-foo" ...>
      <template>...</template>
    </polymer-element>

定义一个全局的 `<style>`：

    <style>
      @-webkit-keyframes blink {
        to { opacity: 0; }
      }
    </style>

    <polymer-element name="x-blink" ...>
      <template>
        <style>
          :host {
            -webkit-animation: blink 1s cubic-bezier(1.0,0,0,1.0) infinite 1s;
          }
        </style>
        ...
      </template>
    </polymer-element>

{{site.project_title}} 同时也支持使用 `polymer-scope="global"` 来将一个 `<style>` 或者内联样式表全局化。

**示例:** 全局化一个样式表

    <polymer-element name="x-foo" ...>
      <template>
        <link rel="stylesheet" href="fonts.css" polymer-scope="global">
        ...
      </template>
    </polymer-element>

使用 `polymer-scope="global"` 的样式表会被移到页面的 `<head>` 里。只处理一次。

**示例:** 在一个 element 里定义和使用 CSS 动画

    <polymer-element name="x-blink" ...>
      <template>
        <style polymer-scope="global">
          @-webkit-keyframes blink {
            to { opacity: 0; }
          }
        </style>
        <style>
          :host {
            -webkit-animation: blink 1s cubic-bezier(1.0,0,0,1.0) infinite 1s;
          }
        </style>
        ...
      </template>
    </polymer-element>

**注意:** `polymer-scope="global"` 应该只用于那些包含有需要作用于全局的规则的样式表或者 `<style>`(e.g. `@keyframe` 和 `@font-face`).
{: .alert .alert-error}
{%endcomment%}
 -->

## 控制 polyfill 的 CSS 替补 {#stylingattrs}

{{site.project_title}} 提供了勾子来控制 Shadow DOM polyfill 怎样和在哪里应用 CSS 替补。

### 忽略样式替补 {#noshim}

在一个 element 里，`<style>` 或者 `<link rel="stylesheet">` 上的 `no-shim` 属性会指示 {{site.project_title}} 忽略里边样式的替补。样式替补将不会生效。

    <polymer-element ...>
      <template>
        <link rel="stylesheet"  href="main.css" no-shim>
        <style no-shim>
         ...
        </style>
      ...

这样可能会提升不少性能，只要你确认样式表里没有任何 Shadow DOM CSS 特性。

### 在 polymer-element 外部替补样式 {#sdcss}

polyfill 作用时，{{site.project_title}} 自动检测每个 `<polymer-element>` 里的样式或者外链的 elements。
这么一来 Shadow DOM CSS 的特性才能被替补，[polyfill-*](#directives) 选择器才会被执行。如，
如果你在一个 element 里使用  `::shadow` 和 `/deep/`，选择器将被重写以便在不支持的浏览器中生效。
参看上边的 [重定义规则](#reformatrules)。

然而，考虑到性能问题每个 element 外的样式将不会自动被替补。
那么，如果你在主页面的样式表里使用 `::shadow` 和 `/deep/`，确保包含这些规则的 `<style>` 或者 `<link rel="stylesheet">` 上有 `shim-shadowdom` 属性。
此属性会指示 {{site.project_title}} 替补里边的样式。

    <link rel="stylesheet"  href="main.css" shim-shadowdom>

## Polyfill 详解 {#polyfill-details}

### 处理局部样式 {#handling-scoped-styles}

原生的 Shadow DOM 给我们免费的包装局部样式。针对没有原生支持的浏览器 {{site.project_title}} 的 polyfills 尽力去替补 _这些_ 局部的行为。

由于要 polyfill Shadow DOM 样式的行为非常的困难，{{site.project_title}} 考虑实用性和性能优先于正确性。如，polyfill 将不会在文档级别的 CSS 面前保护 Shadow DOM elements。
 
当 {{site.project_title}} 执行 element 定义时，它会查找 `<style>` 元素和样式表。然后将它们从 custom element 的 Shadow DOM `<template>` 内移除，重新按以下的规则重组它们，然后将一个包含这些新样式的 `<style>` 元素里追加到主文档里。

#### 重定义规则 {#reformatrules}

1. **将 `:host`替换掉，包含 `:host(<合成选择器>)` ，以 element 的标签名作前缀**

      如，`x-foo` 里的规则：

        <polymer-element name="x-foo">
          <template>
            <style>
              :host { ... }
              :host(:hover) { ... }
              :host(.foo) > .bar { ... }
            </style>
          ...

      变成：

        <polymer-element name="x-foo">
          <template>
            <style>
              x-foo { ... }
              x-foo:hover { ... }
              x-foo.foo > .bar, .foo x-foo > bar {...}
            </style>
          ...

1. **在选择器前追加 element 的名称，构成一个后代选择器**。
这确保了样式不会对 shadowRoot 外边的 element 构成污染(e.g. 上界的封装).

      如，`x-foo` 里的规则：

        <polymer-element name="x-foo">
          <template>
            <style>
              div { ... }
            </style>
          ...

      变成：

        <polymer-element name="x-foo">
          <template>
            <style>
              x-foo div { ... }
            </style>
          ...

      注意，此技校不会影响下界的封装，要实现你需要 [强制样式严谨](#strictstyling).

1. 用 `<space>` 字符 **替换 `::shadow` 和 `/deep/`**。

### 强制样式严谨 {#strictstyling}

默认情况下，{{site.project_title}} 不会强制下界的样式封装。下界是指插入点与 shadow 主持的子节点间的范围。

你可以给下界的封装设置上 `Platform.ShadowCSS.strictStyling` 来开启：

    Platform.ShadowCSS.strictStyling = true;

这个值目前还不是默认的，因为它需要你将 custom element 的名称作为属性添加到 shadowRoot 里的所有 DOM 节点上(e.g. `<span x-foo>`)。


### 手动实现样式替补 {#manualshim}

少数场景下，你可能需要给自己的样式实现样式替补。{{site.project_title}} 的 Shadow DOM 的替补 polyfill 可以如下手动运行：

    <style id="newstyles">
     ...
    </style>

    var style = document.querySelector('#newstyles');

    var cssText = Platform.ShadowCSS.shimCssText(
          style.textContent, 'my-scope');
    Platform.ShadowCSS.addCssToDocument(cssText);

执行此样式的替补， 将规则放到 'my-scope' 的作用域，然后将结果放到主文档里。

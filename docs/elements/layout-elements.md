---
layout: default
type: elements
navgroup: elements
shortname: Elements
title: 布局 elements
subtitle: 指南
---

<style shim-shadowdom>
.app-demo {
  border: 1px solid #eee;
  position: absolute;
  top: 44px;
  left: 0px;
  right: 0px;
  bottom: 0px;
}

demo-tabs .result {
  position: static;
}

demo-tabs::shadow #results {
  position: relative;
  box-sizing: border-box;
  width: 240px;
  height: 405px;
  max-width: 100%;
}

</style>

core-elements 集合和 paper-elements 集合包含一些可以用来组织你的 app 的布局的 elements。有：

- `<core-header-panel>`. 一个包含有一个标题区和内容区的简单容器。

- `<core-toolbar>`.  可以用于 app 的导航栏，或者较小的 UI component 的工具栏，比如一个卡片。工具栏可以作为容器承载控制器，比如tab标签和工具。

- `<core-drawer-panel>`. 一个包含有用于导航的左右侧边栏和主内容区域的响应式的容器。

- `<core-scaffold>`. 快捷的实现 app 响应式布局，包含侧边栏导航，主导航栏和内容区域(通过 core-drawer-panel， core-header-panel 和 core-toolbar 实现的)。core-scaffold element 是搭建一个 app 的 UI 的快捷方法。


## App 导航栏和工具栏

[`<core-header-panel>`](/docs/elements/core-elements.html#core-header-panel) 通常与一个 [`<core-toolbar>`](/docs/elements/core-elements.html#core-toolbar) 组合。当你使用 `<core-toolbar>`进，工具栏会自动显示在标题栏区域。你也可以在标题栏中的任意 element 添加 `core-header` 类来实现。

其他放在 core-header-panel 的 elements 会在内容区底部显示。

`<core-header-panel>` 是 `position: relative`的，并且总是需要显示的设置高度。

以下的示例 app 使用一个 `<core-header-panel>` 当作它的顶层布局：

{% include samples/layout-elements/header-app.html %}

<a href="/samples/layout-elements/header-app.html" target="_blank">从新窗口打开示例</a>

下面的示例使用一个普通的 `<div>` 作为标题 element，应用了 `core-header` 类：

    <core-header-panel>
      <div class=“core-header”>
         My App
      </div>
      <div>
        My app content.
      </div>
    </core-header-panel>


在标题栏上设置 `风格` element 来控制标题区与内容区之间如何互动。有以下风格

- `standard`. 标准。标题栏显示为比内容区高一层并且底部有阴影。内容区可以从标题栏下滚过。
- `seamed`. 缝合。标题栏显示为跟内容区同层，之间有一条缝合线(非底部阴影)。内容区可以从标题栏下滚过。
- `waterfall`. 瀑布。标题栏初始时是跟内容区缝合。当内容区从标题下滚过，标题栏会提高一层底部会出现阴影(与 `standard` 风格相同).
- `waterfall-tall`. 加长型瀑布。与瀑布相同，只不过工具栏开始是加长的(3倍于标准高度)，当用户滚动内容区时会收缩成标准高度。
- `scroll`. 滚动。标题栏跟内容区缝合并跟内容区一同滚动。
- `cover`. 覆盖。内容区从标题栏上滚过。这种风格为内容区较窄的情况而设计的(比如卡片)。

参看 [`<core-header-panel>` demo](/components/core-header-panel/demo.html) 中的示例了解所有风格的实战效果。

另外，你可以通过给 core-toolbar 手动添加以下其中一个类来改变工具栏的尺寸：

-   medium-tall (2倍于正常高度)
-   tall (3倍于正常高度)

当你想创建一个有tab标签的导航栏时，较高的工具栏很实用，如：

{% include samples/layout-elements/toolbar-sample.html %}

如果 core-header-panel 是 `waterfall-tall` 风格, 它会自动控制工具栏的高度，因此你不应该给工具栏设置上 `medium-tall` 或者 `tall`。

**提示:** 对于工具栏在高度变化之间比较炫的滚动动画效果，你可以使用 [`<core-scroll-header-panel>`](/docs/elements/core-elements.html#core-scroll-header-panel)。参看这里的 [示例](/components/core-scroll-header-panel/demo.html) 。 你可能需要研究示例的源码以了解如何实现比较复杂的效果。
{: .alert .alert-info }


## 响应式的侧边栏导航

[`<core-drawer-panel>`](/docs/elements/core-elements.html#core-drawer-panel)
element 会在主内容区边沿创建一个居左或者居右的侧边栏导航，在小屏幕上，侧边栏导航会变成可显示隐藏的抽屉效果，可以通过调用 `togglePanel` 方法来触发。

属于 `drawer` 属性(的元素)的子节点会显示在导航区。
属于 `main` 属性(的元素)的子节点会显示在主内容区。

你可以将 `<core-header-panel>` 和 `<core-toolbar>` elements 嵌套到一个 `<core-drawer-panel>` 里来构建内容区的布局和侧滑导航。如下示例所示：

{% include samples/layout-elements/drawer-app.html %}

<a href="/samples/layout-elements/drawer-app.html" target="_blank">从新窗口打开示例</a>


### 用 `<core-scaffold>` 实现侧边栏导航

[`<core-scaffold>`](/docs/elements/core-elements.html#core-drawer-panel)  element 组装了常用的 components 组合：
主内容区含有带一个 `<core-header-panel>` 和 一个 `<core-toolbar>` 的 `<core-drawer-panel>`。
同时也包含一个按钮来切换显示隐藏侧边栏导航。

下面的示例演示了跟上边的侧边栏导航示例一样的基础布局：

{% include samples/layout-elements/scaffold-app.html %}

<a href="/samples/layout-elements/scaffold-app.html" target="_blank">从新窗口打开示例</a>


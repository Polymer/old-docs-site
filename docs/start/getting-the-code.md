---
layout: default
type: start
shortname: Start
navgroup: start
title: Getting the code
---

<style>
#download-button {
  background: #4285f4;
  color: #fff;
  font-size: 18px;
  fill: #fff;
}
#download-button:hover {
  background: #2a56c6;
}
#download-button::shadow #ripple {
  color: #fff;
}
</style>


{% include toc.html %}

## 安装 {{site.project_title}} {#installing-polymer}

想要入门 {{site.project_title}}，最容易的方式就是下载这个起步项目：

<p layout horizontal center-justified>
  <a href="https://github.com/Polymer/polymer-tutorial/archive/master.zip">
    <paper-button icon="file-download" id="download-button" raisedButton label="下载起步项目" onclick="downloadStarter()"></paper-button>
  </a>
</p>

这个起步项目包含 {{site.project_title}}、一套元素和一个起步应用。你可以通过教程逐步了解 {{site.project_title}} 的API及其概念，或者自行研究其应用的成品。

<a href="/docs/start/tutorial/intro.html">
  <paper-button icon="arrow-forward" label="开始教程" raisedButton></paper-button>
</a>

如果你自己已经有准备好的项目，你可以挑选安装自己需要的组件，也可以安装像 Paper 元素集这样的一整套组件。

## 安装组件 {#installing-components}

{{site.project_title}}是非常模块化的，你可以只安装 {{site.project_title}} 库和平台的 polyfills、单一的元素或一整套元素。

像这样的组件下载按钮会贯穿我们的整个网站：

<component-download-button org="Polymer" component="paper-elements" label="获取 PAPER 元素集">
</component-download-button>

这些组件下载按钮提供 3 种安装一个或一套组件的方式：

*   Bower。**推荐**。Bower 会管理依赖，它安装一个组件的同时也会补齐所有缺失的依赖。Bower还可以让安装过的组件保持更新。更多信息参见[用 Bower 安装](#using-bower)。

*   ZIP 文件。包括所有的依赖，解压后就可以立刻使用。该 ZIP 文件不需要额外的工具，但其自身不具备更新依赖的方法。更多信息参见[用 ZIP 文件安装](#using-zip)。

*   Github。当你从 Github clone 一个组件时，你需要自行管理所有的依赖。而如果你想对其做一些 hack 或提交 pull request，可参见[用 git 设置 {{site.project_title}}](/resources/tooling-strategy.html#git)。

请选择一种方式，并遵循其下载对话框里的步骤。

### 用 Bower 安装 {#using-bower}

通过 Bower 是推荐的安装 **{{site.project_title}} {{site.latest_version}}** 的方式。Bower 的安装方式参见[Bower 网站](http://bower.io/)。

Bower 去除了开发或使用元素时管理依赖的麻烦。当你安装一个组件时，Bower 会确保所有的依赖都是安装好的。

#### 项目设置

如果你还没有为你的应用创建一个 `bower.json` 文件，请在你项目的根目录运行这条命令：

    bower init

这条命令会生成一个基础的 `bower.json` 文件。其产生的一些诸如“你会外露什么类型的模块”的问题可以通过回车跳过。

下一步是安装一个或多个 {{site.project_title}} 包：

    bower install --save Polymer/polymer

Bower 会在你项目的根目录添加一个 `bower_components/` 文件夹，并填入 {{site.project_title}} 及其依赖。

**提示：**`--save` 会在*你的*应用的 bower.json 文件中添加对其的依赖：
```
{
  "name": "my-project",
  "version": "0.0.0",
  "dependencies": {
    "polymer": "Polymer/polymer#~{{site.latest_version}}",
  }
}
```
{: .alert .alert-success }

#### 选择包

打开组件下载按钮，然后点击 **Bower** 卡片并剪切+粘贴 Bower 安装命令。

你还可以选择其中一个常用的包：

-   `Polymer/polymer`。只有 {{site.project_title}} 库和平台 polyfills。

-   `Polymer/core-elements`。[{{site.project_title}} Core 元素集](/docs/elements/core-elements.html)。

-   `Polymer/paper-elements`。[Paper 元素集](/docs/elements/paper-elements.html)。

例如，如果你想安装 {{site.project_title}} 预创建的元素集，可在终端允许下面的命令：

    bower install --save Polymer/core-elements
    bower install --save Polymer/paper-elements


#### 更新包 {#updatebower}

当 {{site.project_title}} 有一个新版本时，在你的应用目录下运行 `bower update` 即可更新你的拷贝：

    bower update

它会更新所有 `bower_components/` 下所有的包。

### 用 ZIP 文件安装 {#using-zip}

当你以一个 ZIP 文件的方式下载了一个或一套组件时，这个文件绑定了你需要的所有依赖。这是一种好的起步方式，因为你无须安装额外的工具。

在你的项目目录里展开这个 ZIP 文件即创建了一个 `components` 文件夹。

![](/images/zip-file-contents.png)

如果你下载了多套组件的 ZIP 文件，你往往会最终得到多种依赖。这时你需要合并这些 ZIP 文件的内容。

ZIP 文件不像 Bower 那样提供更新依赖的内建方法。你可以用新的 ZIP 文件手动更新组件。

### 用 git 设置 {#git}

因为存在一些依赖，所以我们推荐用 Bower 替代 git 安装 {{site.project_title}}。如果你想对这个项目做一些 hack 或提交 pull request，请查阅[用 git 设置 {{site.project_title}}](/resources/tooling-strategy.html#git)。

## 下一步 {#nextsteps}

现在，我们已经安装了 {{site.project_title}}，是时候学习其核心概念了。在下一章我们会教您如何在一个项目中使用元素。来吧：

<a href="/docs/start/usingelements.html">
  <paper-button icon="arrow-forward" label="使用元素" raisedButton></paper-button>
</a>

如果你想跳过这里，请查阅[创建元素](/docs/start/creatingelements.html)。

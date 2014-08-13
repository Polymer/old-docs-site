---
layout: default
type: resources
navgroup: resources
shortname: Resources
title: 工具 & 测试
---

{% include toc.html %}

## 构建状态

如果哪里看上去严重有问题，请参看 {{site.project_title}} 的 [构建状态页面](/build/).

## Vulcanize - element 构建工具

> 硫化(合并)是使得 polymers 更加实用的处理。

[Vulcanize](https://github.com/Polymer/vulcanize) 是一个将一系列 web components 连结合并进一个文件的工具。这是我们目前推荐一个"构建步骤"。更多请参看 "[ 使用 Vulcanize 连结 Web Components](/articles/concatenating-web-components.html)".

## 调试 Shadow DOM

在Chrome里，客户端的 Shadow DOM 是可以通过 DevTools 来检查的。

要视察浏览器原生添加的 Shadow DOM (e.g. 如 `<input type="date">` 的 Shadow DOM),
在 DevTools 的常规设置里开启 "Show user agent shadow DOM"：

![在 Devtools 里开启 "Show user agent shadow DOM"](/images/showshadowdom.png 'Enable "Show user agent shadow DOM" in the Devtools')

重新启动 DevTools, 客户端的 Shadow DOM 应该可以检查了。 它会作为一个 `#shadow-root (user-agent)` 的元素显示在查看器里。

## Source maps

{{site.project_title}}  polyfills 了 [HTML Imports](/platform/html-imports.html) 的实现。要在运行时调试代码，components 内嵌的脚本将被注入到主文档的`<head>`里。
支持 [source maps](http://www.html5rocks.com/en/tutorials/developertools/sourcemaps/)  的工具/浏览器会将这些脚本识别为源 components 所属。

## 构建 &amp; 测试 

要自定义构建或者测试 polyfills，你的系统需要安装好 `node` 和 `grunt-cli`。

* 安装 [NodeJS](http://nodejs.org)，参看它官网的安装方法。
* 使用 `npm` 安装 [GruntJS](http://gruntjs.com) 任务管理器到命令行。
  
      npm install -g grunt-cli

### 自定义构建 polyfills

如果你对使用自定义的 polyfill 感兴趣 (e.g. 而不是使用默认的 platform.js)
你需要构建以下的压缩文件。

**如** - 构建 CustomElements polyfill

    $ mkdir cepolyfill; cd cepolyfill

    $ git clone https://github.com/Polymer/MutationObservers

    $ git clone https://github.com/Polymer/tools

    $ git clone https://github.com/Polymer/CustomElements

    $ cd CustomElements

    $ npm install

    $ grunt

**注意**: 如上例所示，你可能需要安装其他依赖的repo来能构建成功。
例如，CustomElement polyfills 依赖 `MutationObservers` 和 `tools` repos。有时候查看 repo 的 [build.json](https://github.com/Polymer/CustomElements/blob/master/build.json) 了解依赖是非常有帮助的。
{: .alert .alert-info }

### 运行测试

对于任何包含有测试的源码库，在项目的根目录(e.g. `<somepath>/platform-dev/`)运行：

    npm install

#### 任务处理

东西都安装好后，你可以运行测试或者使用 `grunt` 来执行任务了。

构建压缩文件项目 (默认):

    grunt
    
运行测试:

    grunt test

## 开发流程 & 工具

我们目前还处在为基于 {{site.project_title}} 的项目使用的流行前端工具的调研初期。
包括使用 [Yeoman](http://yeoman.io) 来搭建 {{site.project_title}} elements, [Grunt](http://gruntjs.com) 用来构建和优化项目以及 [Bower](http://bower.io) 用来管理 component 之间的依赖。

当我们在这块领域还刚刚开始时，请关注一下这些潜在的开发流程(下面是一个youtube视频)：

<div class="centered" style="margin:20px;"><iframe id="video" src="http://www.youtube.com/embed/EwQkyplZHDY" frameborder="0" allowfullscreen></iframe>
</div>

[{{site.project_title}} + Grunt](https://github.com/addyosmani/polymer-grunt-example) 组合是个好的开端。同时请随时关注我们正在研究的 [generator-polymer](https://github.com/yeoman/generator-polymer/).

## 使用 git {#git}

**注意:** 本节是给那些想 hack Polymer 或者提交 pull request 的高级用户的。
如果你只是想在项目中使用 Polymer 我们推荐使用 Bower。请参看我们的[获取源码](/docs/start/getting-the-code.html)指南。
{: .alert .alert-error}

### Clone 项目 {#clone}

你可以通过执行 `pull-all.sh` 脚本来 clone {{site.project_title}} 的重要源码库：

    mkdir polymer_local; cd polymer_local
    git clone https://github.com/Polymer/tools.git
    ./tools/bin/pull-all.sh

<!-- <p class="centered"><a href="/tools/pull-all.sh" target="_blank" class="btn btn-success" alt="Download pull-all.sh" title="Download pull-all.sh"><i class="icon-white icon-download"></i> Download pull-all.sh</a></p>
 -->

去享受一杯咖啡吧，这需要几分钟的时间！

`pull-all.sh` 对于研究代码或者想要某个单独的 polyfill 的源码库是非常有帮助的。会生成两个目录, `components/` 和 `projects/`，并将一些子源码库检出到对应的目录里。

**components/**

- *components/platform/platform.js* — 平台用到的 shims 和 polyfills.
- *components/polymer/polymer.js* — [{{site.project_title}} core](/docs/polymer/polymer.html)
- *components/core-elements/* — core elements 集的文件夹。
- 为每个 polyfill repo 开的目录(CustomElements, HTMLImports, ShadowDOM).

**projects/**

包含所有示例程序。

### 测试你的环境 {#testgit}

要检测你的开发环境是否已经准备好，尝试运行 designer 工具：

    cd projects/designer
    bower install

开启一个 web 服务器然后导航到 designer app

### 更新检出 {#updategit}

要更新你本地的副本，重新运行 `pull-all.sh` ：

    ./tools/bin/pull-all.sh

### 关于源码库集 {#abouttherepos}

{{site.project_title}} 的整个项目是由很多的 Git 源码库合成的。
全部的 polyfill 库，项目及每个 element都有自己的源码库。

源码库规范 (da polyfills)

每个新的 web 平台规范都有与之对应的 polyfill 源码库。理由有两条：

1. 使 polyfills 兼容所有流行的游览器。
2. 每个 polyfill 可以独立维护并且能照单点菜。

如，以下的源码库可能对你研究个别的 API 很有帮助：

* `CustomElements`
* `HTMLImports`
* `PointerEvents`
* `PointerGestures`
* `ShadowDOM`
* `web-animations-js`

#### 其他有用的源码库

**/polymer** - [github.com/Polymer/polymer](https://github.com/Polymer/polymer)

一个用来发布 `polymer.js` 构建的源码库。

**/polymer-dev** - [github.com/Polymer/polymer-dev](https://github.com/Polymer/polymer-dev)

[`polymer-dev`](https://github.com/polymer/polymer-dev) 源码库包含
[{{site.project_title}} 的核心](/docs/polymer/polymer.html) 和它的工具和测试用例，是给项目的开发者使用的。
如果你不是想 hack {{site.project_title}}，你最好不要碰这个源码库。

**/platform** - [github.com/Polymer/platform](https://github.com/Polymer/platform)

一个用来发布`platform.js` 构建的源码库。

**/platform-dev** - [github.com/Polymer/platform-dev](https://github.com/Polymer/platform-dev)

[`platform-dev`](https://github.com/polymer/platform-dev) 包含一体化的测试用例，加载器，和构建工具来连结polyfills的。也是项目的开发者使用。
如果你不是想 hack {{site.project_title}}，你最好不要碰这个源码库。

**/core-elements** - [github.com/Polymer/core-elements](https://github.com/Polymer/core-elements)

编译工具 elements 列表的源码库。

**/paper-elements** - [github.com/Polymer/paper-elements](https://github.com/Polymer/paper-elements)

编译 paper (UI) elements 列表的源码库。


<!-- 
**/polymer-elements** - [github.com/PolymerLabs/polymer-elements](https://github.com/Polymer/polymer-elements)

A meta repository compiling the list of utility elements that do not render UI.

**/polymer-ui-elements** - [github.com/Polymer/polymer-ui-elements](https://github.com/Polymer/polymer-ui-elements)

A meta repository compiling the list of basic labs UI elements.

**/more-elements** - [github.com/Polymer/more-elements](https://github.com/Polymer/more-elements)

A meta repository compiling the list of extra components and wrappers for third-party code. 
Examples include Bootstrap, topcoat, Chart.js, pdf.js, x-tags, and AceEditor.
 -->

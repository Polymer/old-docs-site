---
layout: default
type: start
navgroup: start
shortname: Start
author: addyosmani
title: 创建可复用的 elements
subtitle: 如何将可复用的 Polymer elements 发布和部署到 GitHub 上
---

{% include toc.html %}

## 引言

那么，你想发布你的第一个可复用的 {{site.project_title}} element 了？好样的！本指南会带你过一遍流程。首先，我们会讲解安装官方的 **样板** 到你本地来构建一个可复用的 {{site.project_title}} element。
其次，我们再学习 **部署** 一个 element 的版本到 [GitHub pages](http://github.com)。

这指南将确保你的 *master* 分支包含最小的核心代码给其他 apps 或者 elements 调用，你的 *gh-pages (GitHub pages)*  分支会包含你的 element 的加载页面。
此分支会包含 **checked-in 的依赖**，**示例** 和 **文档**。

**注意:** 我们假设你安装了Git， [Node](http://nodejs.org/) 和 [Bower](http://bower.io/) 。

## 创建

1. 在你的本地为你的 {{site.project_title}} elements 创建一个目录。(e.g `"development"`).

2. 下载 [seed-element](https://github.com/PolymerLabs/seed-element/archive/master.zip) 样板并解压到你的目录。

3. 重命名你的 element 和对应的文件。例如，如果你的 element 叫 `<test-element>` 那就重命名 `seed-element` 目录为 `test-element`，你的文件列表看上去如下面的样子：

![File list for the test-element directory showing that seed-element.html and seed-element.css have been accordingly renamed to test-element.html and test-element.css](/images/publishing-polymer-elements/image_0.png)

4. 接着，在你的 element 目录运行 `bower install` 来安装依赖。如果一切顺利最终会结束在 `development` 目录。你现在可以在本地开发了，同时要搭个服务器来测试你的 element。

![Directory listing of installed Bower packages including polymer, platform, core-component-page and core-action-icons. As this is the development directory, test-element is also shown in the directory list](/images/publishing-polymer-elements/image_1.png)

## 开发及测试

给你的 element 添加逻辑并测试好功能。好的单元测试是必不可少的，不过理智的作法是搭个 web 服务器来直接访问你的 demo.html。
实现这的途径很多，最简单的办法是通过 Python 运行一个简单的 web 服务器，使用以下的命令：

    $ cd ..  # 你需要在父级目录运行 web 服务器
    $ python -m SimpleHTTPServer

web 服务器运行在 8000 端口上，所以你需要在浏览器里打开 `localhost:8000/test-element/demo.html` 来测试你的 element。 

## 部署

### 将你的工作成果推到 GitHub 上

当你对你的 element 感到满意后，你可能想将你的 `test-element` 的代码推到 GitHub 上并打个 tag 版本。

点击[这里](https://github.com/new) 来在 GitHub 上创建一个新的源码仓库。你源码仓库的名称最好跟你的 element 统一(e.g 如果你的 element 是 `<test-element>`,
 那你的源码仓库应该也叫 `test-element`).

接着，按下面的步骤来：

    # 在你的 development 文件夹下，导航到你的 element 目录
    cd test-element
    
    # 为 test-element 初始化一个 Git 仓库
    git init
    
    # 提交当前的代码
    git add .
    git commit -m 'My initial version'
    
    # 关联 GitHub 上的远程仓库 
    git remote add origin https://github.com/<username>/test-element.git
    
    # 将你的代码推到 master
    git push -u origin master


接着，你可能想在 GitHub 上给你的 element 打个 tag。你可以在 GitHub 上操作也可以通过命令行来实现。

####通过命令行

    # 当你觉得你需要给你的 element 发布一新版时，给它打个 tag
    # 下面是你打版本为 0.0.1 的tag
    git tag -a v0.0.1 -m '0.0.1'
    
    # 然后，将你的 tag 推到 GitHub 上
    git push --tags


####在 GitHub 上操作

在 GitHub 切到你 element 的主页面然后在主导航栏里点击 "releases" 连接。如下标红的位置：

![Preview of the GitHub navigation bar for a repository listing four navigation items - commits, branches, releases, contributors. The releases link is highlighted](/images/publishing-polymer-elements/image_2.png)

你会切到 *Releases*  页面。对于一个没有任何 releases 的项目，这个页面效果跟下面的差不多。

![GitHub Releases page message stating that there aren't any releases here yet. The Create a new release button is highlighted](/images/publishing-polymer-elements/image_3.png)

点击 ‘Create a new release’ 按钮继续。

这里会显示一个发布草稿，你可以为你的 element 输入版本号和发布内容。如下所示，我们输入 v0.0.1 作为 tag 版本号并将 `master` 分支设置为我们的目标分支。

![The GitHub releases form displaying an input field for entering in a version number, a drop-down box for selecting the target branch, a release titles field and a description field](/images/publishing-polymer-elements/image_4.png)

输入好内容后，点击 ‘Publish release’ 按钮来完成 tag 并发布你的 element。收工！

![Preview of the Publish release button in the GitHub releases page](/images/publishing-polymer-elements/image_5.png)

### 为你的 element 发布示例和展示页面

现在你的 element 已经有个 tag 版本了。下面，就让我们创建一个有意义的示例和展示页面。

我们推荐修改 `demo.html` 页面来为你的 element 提供一个真实 [案例](http://googlewebcomponents.github.io/google-chart/components/google-chart/demo.html) 。开发者能真实体验到你的 element 的行为，能以你的示例为出发点在他们的项目中引入你的 element。

这也是你能将你的 element 的文档公开分享出去的好机会。`index.html` 使用的是我们的 [core-component-page](https://github.com/Polymer/core-component-page) element 来解析你的 element 的文档，只要你用了我们定义的 [JSDoc 注释](http://usejsdoc.org/about-getting-started.html) 风格。
  `seed-element` 包含了这些可用的注释样板。 (你可以参看 [core-doc-viewer issue tracker](https://github.com/Polymer/core-doc-viewer/issues) 了解一些已知的 JSDoc 注释的 issues。)

这允许我们:

* 提供了你的 element 能干什么的摘要。
* 自动通过属性，方法，事件将你的文档分类。
* 展示你的 element 的真实案例。
* 连接到你的 element 的 [示例](http://polymerlabs.github.io/seed-element/components/seed-element/demo.html).

在浏览器里看一下 `demo.html` 和 JSDocs 在 `index.html` 里渲染的结果确保满意。你需要基于你的 [本地 web 服务器](https://www.google.com/search?q=local+web+server) 以 `http:` URIs  访问；如果直接用 `file:` URIs 访问它们将不会正常显示。

`demo.html` 和 `index.html` 里的文档显示好后，确保你已经将修改提交到你的 `master` 分支。那你现在就可以通过一个脚本来发布你的展示页面到 Github pages上了。在你的命令行里依次执行以下命令：

    # 导航到 development 目录
    cd ..
    
    # git clone {{site.project_title}} 工具源码库
    git clone git://github.com/Polymer/tools.git
    
    # 新建一个临时目录来发布你的 element 并 cd 到它里面
    mkdir temp && cd temp
    
    # 运行 gp.sh 脚本。这能够将一个示例和依赖以 GitHub pages 的方式都发布到对应源码库的 gh-pages 分支。
    # 下面我们输入一个 GitHub 用户名和 repo 名
    ../tools/bin/gp.sh <username> test-element
    
    # 最后，删掉临时目录
    cd ..
    rm -rf temp


这将会创建一个新的 `gh-pages`  分支(或者 clone 再删除当前的支持)并将你的 element 的一个版本推上去。

## 分享

你现在可以将你挂在 GitHub pages 上的 element 与世人分享了。因为我们用的是 `seed-element` repo，{{site.project_title}}  会给你一个看上去这样种效果的 component 页面：

![Preview of the component langing page, displaying the element title in the header with a demo link next to it. The rest of the page contains formatted summary and attribute/method/event information parsed from the documentation in your element](/images/publishing-polymer-elements/image_6.png)

参看 `seed-element` 的 [线上](http://polymerlabs.github.io/seed-element/components/seed-element/) 版本的这个展示页面。

##下一步?

你现在已经将你的 {{site.project_title}} element 发布到了 GitHub 上，你可能有兴趣学习如何 [使用 bower 来分发你的 element](/articles/distributing-components-with-bower.html).


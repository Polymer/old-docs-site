---
layout: default
type: start
navgroup: docs
shortname: Start
title: 入门教程
subtitle: 你的第一个 Polymer 应用程序 
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
.unquote-link {
  max-width: 360px;
}
.unquote-image {
  background-image: url(/images/tutorial/finished.png);
  background-size: cover;
  background-position: top;
  width: 360px;
  height: 320px;
  border: 1px solid black;
}
</style>

通过本教程, 你将构建一个小小的 {{site.project_title}} 应用程序 -- 一个非常基础的社交类客户端.最终效果如下：

<figure layout vertical center>
  <a href="/samples/tutorial/finished/index.html" layout horizontal flex class="unquote-link">
    <div class="unquote-image" flex></div>
  </a>
  <figcaption>
    点击截图去演示
  </figcaption>
</figure>

本项目会将使用 {{site.project_title}} 过程中的一些比较关键的概念灌输给你。不完全理解也不要担心。这里提到的每个概念在 {{site.project_title}} 文档里都有详细的说明。

## 在你开始前：请先下载入门项目

准备开始前，请先下载本入门项目。本入门项目包含了你将需要的所有 {{site.project_title}} 类库和依赖。

<p layout horizontal center-justified>
  <a href="https://github.com/Polymer/polymer-tutorial/archive/master.zip">
    <paper-button icon="file-download" id="download-button" raisedButton label="下载入门项目" onclick="downloadStarter()"></paper-button>
  </a>
</p>

将入门项目解压到你本地硬盘任意位置。

本项目包含一个初始化的版本给你。如果你遇到了困难，里面还包含有完整项目的所有增量的(每一步)版本，你可以边参考边继续下去。

开发过程中，你需要一个基础的 HTTP 服务器来放你的页面。如果你已经安装了 Python，你可以在本项目的根目录运行以下的命令其中的一个：

Python 2.x:

    python -m SimpleHTTPServer 

Python 3.x:

    python -m http.server 

运行本项目的最终版本来检测你的 web 服务器。如：

-  [http://localhost:8000/finished/](http://localhost:8000/finished/)

本教程里的连接是假设你本地的 web 服务器监听的端口号是 8000.
如果你用的其他端口号，则自行替换成你所用的。

**注意:** 在 Windows 操作系统上, Python 的 simple HTTP 服务器可能对SVG图片的 MIME type 支持有误。
如果图片无法渲染，尝试使用其他的 web 服务器。
{: .alert .alert-info }

### 下一步

<a href="/docs/start/tutorial/step-1.html">
  <paper-button icon="arrow-forward" label="步骤 1: 搭建 app 的结构" raisedButton></paper-button>
</a>


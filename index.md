---
layout: home
title: Welcome
---

<section id="future" class="main-bg">
  <div class="panel left">
    <img src="/images/logos/p-logo.svg">
    <summary>
      <h1>欢迎来到明天的世界</h1>
      <p>Web Components将Web开发引入一个新的纪元，它完全基于传承自HTML的可封装易共用的Custum elements。站在一系列新的Web标准的顶端，Polymer使得无论是创建一个普通的按钮，还是一个完善的可跨桌面和移动及更多平台的应用程序变得更加简单快速。</p>
      <a href="/docs/start/getting-the-code.html">
        <paper-button icon="archive" label="获取 {{site.project_title}}" raisedButton unresolved></paper-button>
      </a>
     <!--  <a href="/docs/start/usingelements.html">
        <paper-button icon="arrow-forward" label="Get started" raisedButton unresolved></paper-button>
      </a> -->
      <a href="https://github.com/polymer">
        <paper-button class="github" icon="social:post-github" label="到 Github 上查看" unresolved></paper-button>
      </a>
    </summary>
  </div>
</section>

<section id="learn" class="main-purple">
  <div class="panel right">
    <summary>
      <learn-tabs></learn-tabs>
    </summary>
  </div>
</section>

<section id="featured">
  <div class="panel right">
    <summary>
        <feature-carousel interval="5000" flex unresolved>
        <div>
          <a href="/components/paper-elements/demo.html#core-toolbar" target="_blank">
            <img src="/images/sampler-paper.png">
          </a>
          <summary>
            <h1>专题: material design</h1>
            <p>{{site.project_title}} 给web带来了 <a href="http://google.com/design/spec">material design</a> 的实现. paper elements 涵盖了从控制器到特效响应及用户交互.
            <br><br>
            <a href="/docs/elements/material.html">
              <paper-button icon="arrow-forward" label="了解更多"></paper-button>
            </a>
            </p>
          </summary>
        </div>
        <div>
          <a href="/resources/video.html">
            <img src="/images/logos/polymer_video_thumb.jpg">
          </a>
          <!-- <div class="video">
            <iframe src="https://www.youtube.com/embed/videoseries?list=PLRAVCSU_HVYu-zlRaqArF8Ytwz1jlMOIM&theme=light&controls=2" frameborder="0" allowfullscreen></iframe>
          </div> -->
          <summary>
            <h1>专题: Google I/O</h1>
            <p>回顾 {{site.project_title}} 在 Google I/O 2014 上的方方面面. 观看视频课程和DevByte短片.
            <br><br>
            <a href="/resources/video.html">
              <paper-button icon="drive-video" label="观看"></paper-button>
            </a>
            </p>
          </summary>
        </div>
      </feature-carousel>
    </summary>
  </div>
</section>

<section id="designer" class="main-purple">
  <div class="panel">
    <summary style="transform: translateZ(0);">
      <h1>Designer</h1>
      <a href="/tools/designer/" target="_blank">
        <img src="/images/designer_fadeout.png" alt="Launch the designer tool" title="Launch the designer tool">
      </a>
      <div>
        <p>
        Designer 是个使用 {{site.project_title}} 来制作原型 app 的可视化拖拽式工具.你的作品将会被作为 Github gists 保存起来.
        </p>
        <a href="/tools/designer/" target="_blank">
          <paper-button icon="arrow-forward" label="马上试用"></paper-button>
        </a>
      </div>
    </summary>
  </div>
</section>

{% comment %}
<section id="everything-element" class="main-purple">
  <div class="panel right">
    <summary>
      <h1>Everything is an element</h1>
      <p>From <code>&lt;a&gt;</code> to <code>&lt;select&gt;</code>, elements are the building blocks of HTML. But modern applications have outgrown these built-in elements, forcing app developers to rely on JavaScript frameworks to provide dynamic, custom behavior.  The resulting apps are frequently complex and monolithic; a component developed for one may not work in another.
      <br><br>
      {{site.project_title}} puts elements back at the center of web development. With {{site.project_title}}, you can craft your own HTML elements and compose them into complete, complex applications that are scalable and maintainable.</p>
      <a href="/docs/start/everything.html">
        <paper-button icon="arrow-forward" label="Learn more"></paper-button>
      </a>
    </summary>
    <img src="/images/logos/p-elements.svg">
  </div>
</section>
{% endcomment %}

<section id="apps">
  <div class="panel">
    <h1>Demos</h1>
    <div class="columns" layout horizontal wrap>
      <summary>
        <div class="box">
          <a href="/apps/topeka/">
            <img src="/images/topeka_square.png">
          </a>
        </div>
        <h2 class="elements-using">Topeka</h2>
        <p>一个有趣的问答 app, 使用基于 material-design 的 <em>paper-elements</em> 创建.</p>
        <a href="/apps/topeka/">
          <paper-button icon="arrow-forward" label="演示 Topeka"></paper-button>
        </a>
      </summary>
      <summary>
        <div class="box">
          <a href="/components/paper-elements/demo.html#core-toolbar">
            <img src="/images/sampler-paper-square.png">
          </a>
        </div>
        <h2 class="elements-creating">Paper Elements</h2>
        <p>基于 material design 的 Polymer elements 的实例演示</p>
        <a href="/components/paper-elements/demo.html#core-toolbar">
          <paper-button icon="arrow-forward" label="浏览 Elements"></paper-button>
        </a>
      </summary>
      <summary>
        <div class="box">
          <a href="/components/paper-calculator/demo.html">
            <img src="/images/paper-calculator.png">
          </a>
        </div>
        <h2 class="platform">Calculator</h2>
        <p> 一个计算器 app, 突出演示了模拟油墨的特效</p>
        <a href="/components/paper-calculator/demo.html">
          <paper-button icon="arrow-forward" label="演示 Calculator"></paper-button>
        </a>
      </summary>
    </div>
  </div>
</section>

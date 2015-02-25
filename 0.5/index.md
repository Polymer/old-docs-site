---
layout: home
title: Welcome
---

<section id="future" class="main-bg">
  <div class="panel left">
    <img src="/images/logos/p-logo.svg">
    <summary>
      <h1>Welcome to the future</h1>
      <p>Web Components usher in a new era of web development based on encapsulated and interoperable custom elements that extend HTML itself. Built atop these new standards, Polymer makes it easier and faster to create anything from a button to a complete application across desktop, mobile, and beyond.</p>
      <a href="docs/start/getting-the-code.html">
        <paper-button raised unresolved>
          <core-icon icon="archive"></core-icon> Get {{site.project_title}}
        </paper-button>
      </a>
      <a href="https://github.com/polymer">
        <paper-button class="github" unresolved>
          <core-icon icon="social:post-github"></core-icon> View on GitHub
        </paper-button>
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
      <feature-carousel interval="7000" flex unresolved>
        <div>
          <a href="https://www.youtube.com/playlist?list=PLOU2XLYxmsII5c3Mgw6fNYCzaWrsM3sMN">
            <img src="//img.youtube.com/vi/82LfXCeuaOo/hqdefault.jpg">
          </a>
          <summary>
            <h1>Polycasts</h1>
            <p>Join Rob Dodson as he explores the ins and outs of {{site.project_title}}.
            <br>Learn about the basics and see how to compose elements into buttery smooth mobile experiences.
            <br><br>
            <a href="https://www.youtube.com/playlist?list=PLOU2XLYxmsII5c3Mgw6fNYCzaWrsM3sMN">
              <paper-button>Watch</paper-button>
            </a>
            </p>
          </summary>
        </div>
        <div>
          <a href="resources/video.html">
            <img src="//img.youtube.com/vi/0LT6W5QVCJI/hqdefault.jpg">
          </a>
          <summary>
            <h1>Chrome Dev Summit 2014</h1>
            <p>Recap everything {{site.project_title}} at Chrome Dev Summit 2014, including an introduction to Polymer 0.8.
            <br><br>
            <a href="resources/video.html">
              <paper-button>Watch</paper-button>
            </a>
            </p>
          </summary>
        </div>
        <div>
          <a href="components/paper-elements/demo.html#core-toolbar" target="_blank">
            <img src="/images/sampler-paper.png">
          </a>
          <summary>
            <h1>Material design using Polymer</h1>
            <p>{{site.project_title}} brings an implementation of <a href="http://google.com/design/spec">material design</a> to the web.<br>The paper elements range from controls to effects and user interaction.
            <br><br>
            <a href="docs/elements/material.html">
              <paper-button>
                <core-icon icon="arrow-forward"></core-icon> Learn more
              </paper-button>
            </a>
            </p>
          </summary>
        </div>
        <div>
          <a href="resources/video.html">
            <img src="/images/logos/polymer_video_thumb.jpg">
          </a>
          <summary>
            <h1>Google I/O 2014</h1>
            <p>Recap everything {{site.project_title}} at Google I/O 2014. Watch sessions videos and DevByte shorts.
            <br><br>
            <a href="resources/video.html">
              <paper-button>Watch</paper-button>
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
      <a href="https://polymer-designer.appspot.com" target="_blank">
        <img src="/images/designer_fadeout.png" alt="Launch the designer tool" title="Launch the designer tool">
      </a>
      <div>
        <p>
        Designer is a drag and drop tool for prototyping apps using {{site.project_title}}. Save your experiments as GitHub gists.
        </p>
        <a href="https://polymer-designer.appspot.com" target="_blank">
          <paper-button>
            <core-icon icon="arrow-forward"></core-icon> Try it now
          </paper-button>
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
      <a href="docs/start/everything.html">
        <paper-button>
          <core-icon icon="arrow-forward"></core-icon> Learn more
        </paper-button>
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
      <summary flex>
        <div class="box">
          <a href="https://polymer-topeka.appspot.com">
            <img src="/images/topeka_square.png">
          </a>
        </div>
        <h2 class="start">Topeka</h2>
        <p>A fun quiz app built using material-design based <em>paper-elements</em></p>
        <a href="https://polymer-topeka.appspot.com">
          <paper-button>
            <core-icon icon="arrow-forward"></core-icon> Demo Topeka
          </paper-button>
        </a>
      </summary>
      <summary flex>
        <div class="box">
          <a href="components/paper-elements/demo.html#core-toolbar">
            <img src="/images/sampler-paper-square.png">
          </a>
        </div>
        <h2 class="elements">Paper Elements</h2>
        <p>A sampler showcasing Polymer elements based on material design</p>
        <a href="components/paper-elements/demo.html#core-toolbar">
          <paper-button>
            <core-icon icon="arrow-forward"></core-icon> Browse Elements
          </paper-button>
        </a>
      </summary>
      <summary flex>
        <div class="box">
          <a href="components/paper-calculator/demo.html">
            <img src="/images/paper-calculator.png">
          </a>
        </div>
        <h2 class="guide">Calculator</h2>
        <p>A calculator app mockup highlighting material ink effects</p>
        <a href="components/paper-calculator/demo.html">
          <paper-button>
            <core-icon icon="arrow-forward"></core-icon> Demo Calculator
          </paper-button>
        </a>
      </summary>
    </div>
  </div>
</section>

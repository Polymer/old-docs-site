---
layout: home
title: Welcome

stylesheets:
  "/css/homepage.css"
---

<section id="future" class="main-bg">
  <div class="panel left">
    <img src="/images/logos/p-logo.svg">
    <summary>
      <h1>Welcome to the future</h1>
      <p>Web Components usher in a new era of web development based on encapsulated and interoperable custom elements that extend HTML itself. Built atop these new standards, Polymer makes it easier and faster to create anything from a button to a complete application across desktop, mobile, and beyond.</p>
      <a href="/docs/start/getting-the-code.html">
        <paper-button icon="archive" label="Get {{site.project_title}}" raisedButton unresolved></paper-button>
      </a>
     <!--  <a href="/docs/start/usingelements.html">
        <paper-button icon="arrow-forward" label="Get started" raisedButton unresolved></paper-button>
      </a> -->
      <a href="https://github.com/polymer">
        <paper-button class="github" iconSrc="/images/picons/ic_social_github.png" label="View on Github" unresolved></paper-button>
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
            <h1>Featured: material design</h1>
            <p>{{site.project_title}} brings an implementation of <a href="http://google.com/design/spec">material design</a> to the web. The paper elements range from controls to effects and user interaction.
            <br><br>
            <a href="/docs/elements/material.html">
              <paper-button icon="arrow-forward" label="Learn more"></paper-button>
            </a>
            </p>
          </summary>
        </div>
        <div>
          <div class="video">
            <iframe src="https://www.youtube.com/embed/videoseries?list=PLRAVCSU_HVYu-zlRaqArF8Ytwz1jlMOIM&theme=light&controls=2" frameborder="0" allowfullscreen></iframe>
          </div>
          <summary>
            <h1>Featured: Google I/O</h1>
            <p>Recap everything {{site.project_title}} at Google I/O 2014. Watch sessions videos and DevByte shorts.
            <br><br>
            <a href="/resources/video.html">
              <paper-button icon="drive-video" label="Watch"></paper-button>
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
        <img src="/images/designer_screenshot.png" class="cover" alt="Launch the designer tool" title="Launch the designer tool">
      </a>
      <div>
        <h3>
        Designer is a drag and drop tool for prototyping apps using {{site.project_title}}. Save your experiments as Github gists.
        </h3>
        <a href="/tools/designer/" target="_blank">
          <paper-button icon="arrow-forward" label="Try it now"></paper-button>
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
        <h1 class="elements-using">Topeka</h1>
        <h5>A fun quiz app built using material-design based <em>paper-elements</em></h5>
        <a href="/apps/topeka/">
          <paper-button icon="arrow-forward" label="Demo Topeka"></paper-button>
        </a>
      </summary>
      <summary>
        <div class="box">
          <a href="/components/paper-elements/demo.html#core-toolbar">
            <img src="/images/sampler-paper-square.png">
          </a>
        </div>
        <h1 class="elements-creating">Paper Elements</h1>
        <h5>A sampler showcasing Polymer elements based on material design</h5>
        <a href="/components/paper-elements/demo.html#core-toolbar">
          <paper-button icon="arrow-forward" label="Browse Elements"></paper-button>
        </a>
      </summary>
      <summary>
        <div class="box">
          <a href="/components/paper-calculator/demo.html">
            <img src="/images/paper-calculator.png">
          </a>
        </div>
        <h1 class="platform">Calculator</h1>
        <h5>A calculator app mockup highlighting material ink effects</h5>
        <a href="/components/paper-calculator/demo.html">
          <paper-button icon="arrow-forward" label="Demo Calculator"></paper-button>
        </a>
      </summary>
    </div>
  </div>
</section>

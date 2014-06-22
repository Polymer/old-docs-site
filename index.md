---
layout: home
title: Welcome

#stylesheets:
#  "/css/homepage.css"
---

<!-- page specific stylesheet needs to be inline to the page so ajax injects it. -->
<link rel="stylesheet" href="/css/homepage.css" shim-shadowdom>

<section id="future" class="main-bg">
  <div class="panel left">
    <img src="/images/logos/p-logo.svg">
    <summary>
      <h1>Building blocks for the web</h1>
      <p>{{site.project_title}} is a library that uses the latest web technologies to let you create custom HTML elements. Build anything from a button to a complete application as an encapsulated, reusable element that works across desktop and mobile.</p>
      <a href="/docs/start/getting-the-code.html">
        <paper-button icon="archive" label="Get {{site.project_title}}" raisedButton></paper-button>
      </a>
      <a href="/docs/start/usingelements.html">
        <paper-button icon="arrow-forward" label="Get started" raisedButton></paper-button>
      </a>
      <a href="https://github.com/polymer">
        <paper-button class="github" iconSrc="/images/picons/ic_social_github.png" label="View on Github"></paper-button>
      </a>
    </summary>
  </div>
</section>

<section id="videos" class="main-purple">
  <div class="panel right">
    <summary>
      <h1>Watch</h1>
      <p>Learn what the {{site.project_title}} team is up to through articles, videos, and presentations.
      <br><br>
      <a href="/resources/video.html">
        <paper-button icon="arrow-forward" label="See more"></paper-button>
      </a>
      </p>
    </summary>
    <div class="video">
    <iframe src="https://www.youtube.com/embed/videoseries?list=PLRAVCSU_HVYu-zlRaqArF8Ytwz1jlMOIM&theme=light&controls=0" frameborder="0" allowfullscreen></iframe>
    </div>
  </div>
</section>

<section id="apps">
  <div class="panel">
    <summary>
      <h1>Apps</h1>
      <a href="/apps/topeka/" target="_blank">
        <img src="/images/topeka_small.png" alt="Launch the Topeka app" title="Launch the Topeka app">
      </a>
      <div>
        <h3 style="margin:0">
        <a href="/apps/topeka/" target="_blank">Topeka</a> is a multi-screen app created from <a href="/docs/polymer/material.html">Polymer's material design elements</a>. It works across the multi-device web.
        </h3>
        <!-- <a href="/apps/topeka" target="_blank">
          <paper-button icon="arrow-forward" label="Try it" raisedButton></paper-button>
        </a> -->
      </div>
    </summary>
  </div>
</section>

<section id="sampler" class="main-purple">
  <div class="panel left">
    <a href="/components/paper-elements/demo.html"><img src="/images/sampler.png" alt="Launch the paper element sampler" title="Launch the paper element sampler"></a>
    <summary>
      <h1>Material design</h1>
      <p>{{site.project_title}} brings an implementation of material design to the web. The paper elements are a collection of material components ranging from controls and layout, to effects and user interaction.</p>
      <a href="/docs/polymer/material.html">
        <paper-button icon="arrow-forward" label="Take a spin"></paper-button>
      </a>
    </summary>
  </div>
</section>

<section id="designer">
  <div class="panel">
    <summary>
      <h1>Designer</h1>
      <a href="/tools/designer/#391b62346ab74dc8ca2c" target="_blank">
        <img src="/images/designer_screenshot.png" class="cover" alt="Launch the designer tool" title="Launch the designer tool">
      </a>
      <div>
        <h3>
        Our drag n' drop tool for prototyping apps using {{site.project_title}}'s  components. Save your experimnts as Github gists.
        </h3>
        <!-- <a href="/tools/designer/#391b62346ab74dc8ca2c" target="_blank">
          <paper-button icon="arrow-forward" label="Try it" raisedButton></paper-button>
        </a> -->
      </div>
    </summary>
  </div>
</section>

{% comment %}
<!-- <section id="everything-element" class="main-purple">
  <!-- <nav class="bar" flexbox>
    <a href="#everything-element" flex>Return to the elegance of the element</a>
  </nav> -->
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

<section id="architecture">
 <!--  <nav class="bar" flexbox>
    <a href="#architecture">The architecture of {{site.project_title}}</a>
  </nav> -->
  <div class="panel">
    <summary>
      <div class="box">
        <img src="/images/logos/p-elements.svg">
      </div>
      <h1 class="elements-using">Using elements</h1>
      <h5>{{site.project_title}} from the outside</h5>
      <p>{{site.project_title}} provides a comprehensive set of elements—both UI and non-UI—that you can use right out of the box. You can mix and match {{site.project_title}} elements with other elements, including built-in elements and other custom elements.</p>
      <a href="/docs/start/usingelements.html">
        <paper-button icon="arrow-forward" label="Use our elements"></paper-button>
      </a>
    </summary>
    <summary>
      <div class="box">
        <img src="/images/logos/p-create-elements.svg">
      </div>
      <h1 class="elements-creating">Creating elements</h1>
      <h5>{{site.project_title}} from the inside</h5>
      <p>{{site.project_title}}'s declarative syntax makes it simpler to define custom elements. Features like two-way data binding, declarative event handlers, property observation, and gesture support help you build powerful, reusable elements.</p>
      <a href="/docs/start/creatingelements.html">
        <paper-button icon="arrow-forward" label="Build your own"></paper-button>
      </a>
    </summary>
    <summary>
      <div class="box">
        <img src="/images/logos/p-platform.svg">
      </div>
      <h1 class="platform">The platform</h1>
      <h5>Supporting new web technologies today</h5>
      <p>{{site.project_title}} is built on the latest web technologies like Web Components. Not all browsers support these features yet. {{site.project_title}}'s platform layer fills the gaps, implementing the APIs in JavaScript. {{site.project_title}} picks the fastest path at runtime.</p>
      <a href="/docs/start/platform.html">
        <paper-button icon="arrow-forward" label="Use the platform"></paper-button>
      </a>
    </summary>
  </div>
</section>

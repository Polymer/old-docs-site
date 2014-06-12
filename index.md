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
      <polymer-ui-toolbar>
        <a href="/docs/start/getting-the-code.html">
          <paper-button icon="archive" label="Get {{site.project_title}}" raisedButton></paper-button>
        </a>
        <a href="/docs/start/usingelements.html">
          <paper-button icon="arrow-forward" label="Get started" raisedButton></paper-button>
        </a>
        <a href="https://github.com/polymer">
          <paper-button class="github" iconSrc="/images/picons/ic_social_github.png" label="View on Github"></paper-button>
        </a>
      </polymer-ui-toolbar>
    </summary>
  </div>
</section>
<section id="everything-element" class="main-purple">
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
<section id="designer">
  <div class="panel">
    <summary>
      <h1>Designer</h1>
      <a href="http://www.polymer-project.org/tools/designer/#391b62346ab74dc8ca2c"><img src="/images/designer_screenshot.png"></a>
      <div>
        <h3>
        Our drag n' drop tool for prototyping apps using {{site.project_title}}'s  components. Save your experimnts as Github gists.
        </h3>
        <a href="http://www.polymer-project.org/tools/designer/#391b62346ab74dc8ca2c">
          <paper-button icon="arrow-forward" label="Try it" raisedButton></paper-button>
        </a>
      </div>
    </summary>
  </div>
</section>
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

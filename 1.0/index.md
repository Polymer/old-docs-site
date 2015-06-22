---
layout: home_1_0
title: Welcome
---

<section id="future" class="main-bg">
  <div class="panel left">
    <img src="./images/polymer1.0-01.svg" alt="">
    <summary>
      <h1>Production ready</h1>
      <p>Polymer 1.0 has been rebuilt from the ground up for speed and efficiency. The new, leaner core library makes it easier than ever to make fast, beautiful, and interoperable web components. If you haven't used Polymer before, it's time to try it out. If you haven't tried it recently, time to take another look.</p>
      <a href="docs/start/getting-the-code.html">
        <paper-button raised unresolved>
          <core-icon icon="file-download"></core-icon> Get {{site.project_title}}
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

<!-- <section id="release08" class="main-light-purple">
  <div class="panel">
    <summary>
      <a href="/0.9/">
        <h2 layout horizontal center>
          Join us @ Polypalooza, Sept. ???
        </h2>
      </a>
    </summary>
  </div>
</section> -->

<section id="googleio" class="main-light-purple">
  <div class="panel" layout horizontal>
    <span class="iologo" layout vertical>
      <img src="https://events.google.com/io2015/images/io15-color.png" alt="Polymer at Google I/O 2015">
    </span>
    <a href="https://www.youtube.com/embed/fD2As5RmM8Q" target="_blank" onclick="document.getElementById('iovideo').toggle();return false;" style="margin-left:25px;" layout vertical>
      <h4>Watch Google I/O 2015</h4>
      <h2>Polymer and modern web APIs: In production at Google scale</h2>
    </a>
  </div>
</section>

<!-- 
<section id="featured">
  <div class="panel" layout horizontal>
    <div flex>
      <h1>Google I/O 2015</h1>
      <h2>Polymer and modern web APIs: In production at Google scale</h2>
      <p class="video">
        <iframe src="https://www.youtube.com/embed/fD2As5RmM8Q?rel=0" frameborder="0" allowfullscreen></iframe>
      </p>
    </div>
  </div>
</section> -->

<section id="catalog" class="main-purple">
  <div class="panel">
    <summary>
      <h1>Element Catalog</h1>
      <a href="https://elements.polymer-project.org" target="_blank">
        <img src="/images/catalog_fadeout.png" alt="Launch the element catalog" title="Launch the element catalog">
      </a>
      <div>
        <p>
        Custom elements, built by the Polymer team, ready to use in your applications.
        </p>
        <a href="https://elements.polymer-project.org" target="_blank">
          <paper-button>
            <core-icon icon="arrow-forward"></core-icon> Browse elements
          </paper-button>
        </a>
      </div>
    </summary>
  </div>
</section>

<!-- <section id="production" class="main-purple">
  <div class="panel" layout horizontal>
    <div flex>
      <h2>Lean, Mean, and Ready for Production</h2>
      <p class="one-oh-summary">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nulla facilis itaque, quo fuga veritatis odit hic magnam perspiciatis voluptatibus rem delectus omnis nisi inventore ea sapiente quibusdam a tenetur pariatur.</p>
    </div>
    <div flex>
      <div class="one-oh">1.0</div>
    </div>
  </div>
</section> -->

<section id="features" class="main-bg">
  <div class="panel">
    <div class="feature">
      <div class="badge">
        <div class="badge-wrapper">
          <core-icon icon="trending-up" style="color: #4CAF50;"></core-icon>
        </div>
      </div>
      <h2>Built for Speed</h2>
      <p>Polymer 1.0 replaces the shadow DOM polyfill with a lightweight shim, uses a new, faster data-binding system, and significantly reduces code size.</p>
    </div>

    <div class="feature">
      <div class="badge">
        <div class="badge-wrapper">
          <core-icon icon="check-box" style="color: #00BCD4;"></core-icon>
        </div>
      </div>
      <h2>For Modern Browsers</h2>
      <p>Polymer is built from the ground up for modern browsers, using the latest web platform APIs. Polyfills provide support on evergreen browsers for APIs that aren't universal yet.</p>
    </div>
    
    <div class="feature">
      <div class="badge">
        <div class="badge-wrapper">
          <core-icon icon="favorite" style="color: #E91E63;"></core-icon>
        </div>
      </div>
      <h2>Using Web Components</h2>
      <p>Polymer leverages <em>web components</em>, a new set of standards designed to provide reusable components for the web.</p>
    </div>
  </div>

</section>

<section id="examples">
  <div class="panel">

    <div class="example">
      <h2 class="example-header">Use elements from the catalog</h2>
      <div class="example-wrapper">
        <div class="example-code">
        {% highlight html %}
{%raw%}
<!-- Polyfill Web Components support for older browsers -->
<script src="components/webcomponentsjs/webcomponents-lite.min.js"></script>

<!-- Import element -->
<link rel="import" href="components/google-map/google-map.html">

<!-- Use element -->
<google-map lat="37.790" long="-122.390"></google-map>
{%endraw%}
        {% endhighlight %}
        </div>
        
        <div class="example-result example-google-map">
          <iframe frameborder="0" src="samples/homepage/google-map/index.html" width="100%"></iframe>
        </div>
      </div>
      <div class="example-caption">
        <p>An element built with Polymer looks and works just like any other HTML element. Simply find an element you’d like to use in your app, import it with an HTML import, and then add the tag to your page.</p>
      </div>
    </div>

    <div class="example">
      <h2 class="example-header">Create your own elements</h2>
      <div class="example-wrapper">
        <div class="example-code">
      {% highlight html %}
{%raw%}
<dom-module id="contact-card">
  <link rel="import" type="css" href="contact-card.css">
  <template>
    <content></content>
    <iron-icon icon="star" hidden$="{{!starred}}"></iron-icon>
  </template>
  <script>
    Polymer({
      is: 'contact-card',
      properties: {
        starred: Boolean
      }
    });
  </script>
</dom-module>
{%endraw%}
      {% endhighlight %}
      
      {% highlight html %}
{%raw%}
<contact-card starred>
  <img src="profile.jpg" alt="Eric's photo">
  <span>Eric Bidelman</span>
</contact-card>
{%endraw%}
      {% endhighlight %}
        </div>
        <div class="example-result example-contact-card">
          <iframe frameborder="0" src="samples/homepage/contact-card/index.html" width="100%"></iframe>
        </div>
      </div>
      <div class="example-caption">
        <p>The Polymer library makes it easy to create your own powerful elements. Give your element some markup and properties, and then use it on a site. Polymer provides useful features like templating and data binding to reduce the amount of boilerplate you need to write.</p>
      </div>
    </div>


    <div class="example">
      <h2 class="example-header">Power it all with real data</h2>
      <div class="example-wrapper">
        <div class="example-code">
        {% highlight html %}
{%raw%}
<dom-module id="friend-list">
  <link rel="import" type="css" href="friend-list.css">
  <template>
    <firebase-collection data="{{data}}"
                      location="https://users1.firebaseio.com/users">
    </firebase-collection>
    <template is="dom-repeat" items="{{data}}">
      <contact-card starred="{{item.starred}}">
        <img src="{{item.img}}">
        <span>{{item.name}}</span>
      </contact-card>
    </template>
  </template>
  <script>
    Polymer({
      is: 'friend-list'
    });
  </script>
</dom-module>
{%endraw%}
        {%endhighlight%}
        {%highlight html%}
{%raw%}
<friend-list></friend-list>
{%endraw%}
        {%endhighlight html%}
        </div>
        <div class="example-result example-friend-list">
          <iframe frameborder="0" src="samples/homepage/friend-list/index.html" width="100%"></iframe>
        </div>
      </div>
      <div class="example-caption">
        <p>Build more sophisticated elements by composing simpler elements together. Elements can provide simple abstractions to powerful APIs. The <code>&lt;firebase-collection&gt;</code> used here pulls data from a Firebase database. </p>
      </div>
      
      <div class="button-row">
        <a href="docs/start/quick-tour.html">
          <paper-button raised>
            <core-icon icon="arrow-forward"></core-icon> Take a Tour
          </paper-button>
        </a>

        <a href="docs/start/getting-the-code.html">
          <paper-button raised>
            <core-icon icon="archive"></core-icon> Get The Code
          </paper-button>
        </a>

        <a href="docs/index.html">
          <paper-button raised>
            <core-icon icon="info"></core-icon> Learn More
          </paper-button>
        </a>
      </div>
    </div>
    
  </div>
</section>

<paper-dialog id="iovideo" transition="core-transition-center" backdrop layered="false">
  <iframe src="https://www.youtube.com/embed/fD2As5RmM8Q" frameborder="0" allowfullscreen fit></iframe>
</paper-dialog>

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

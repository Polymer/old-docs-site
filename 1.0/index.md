---
layout: home_1_0
title: Welcome
---

<section id="future" class="main-bg">
  <div class="panel left">
    <img src="./images/polymer1.0-01.svg">
    <summary>
      <h1>Production ready</h1>
      <p>Polymer 1.0 has been rebuilt from the ground up for speed and efficiency. The new, leaner core library makes it easier than ever to make fast, beautiful, and interoperable web components. If you haven't used Polymer before, it's time to try it out. If you haven't tried it recently, time to take another look.</p>
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

<section id="catalog" class="main-purple">
  <div class="panel">
    <summary style="transform: translateZ(0);">
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
      <p>Polymer is built from the ground up for modern browsers, using sparkly unicorn magic. Also a lot of coffee.</p>
    </div>
    
    <div class="feature">
      <div class="badge">
        <div class="badge-wrapper">
          <core-icon icon="favorite" style="color: #E91E63;"></core-icon>
        </div>
      </div>
      <h2>Using Web Components</h2>
      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Veritatis nihil eius beatae, impedit aut nostrum fugiat, non corporis consequatur, fugit asperiores cupiditate accusamus, dolores ad ullam provident recusandae ex eveniet?</p>
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
<script src="bower_components/webcomponentsjs/webcomponents-lite.min.js"></script>

<!-- Import element -->
<link rel="import" href="components/google-map/google-map.html">

<!-- Use element -->
<google-map lat="37.790" long="-122.390" flex></google-map>
{%endraw%}
        {% endhighlight %}
        </div>
        
        <div class="example-result example-google-map">
          <iframe frameborder="0" src="samples/homepage/google-map/index.html" width="100%"></iframe>
        </div>
      </div>
      <div class="example-caption">
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aspernatur ad molestias esse alias dicta enim eaque neque voluptatum, doloribus provident nihil laudantium commodi quibusdam debitis ex facilis excepturi magnam itaque?</p>
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
</dom-module>

<script>
  Polymer({
    is: 'contact-card',
    properties: {
      starred: Boolean
    }
  });
</script>
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
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aspernatur ad molestias esse alias dicta enim eaque neque voluptatum, doloribus provident nihil laudantium commodi quibusdam debitis ex facilis excepturi magnam itaque?</p>
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
    <firebase-element data="{{data}}"
                      location="https://users1.firebaseio.com/users">
    </firebase-element>
    <template is="dom-repeat" items="{{data}}">
      <contact-card starred="{{item.starred}}">
        <img src="{{item.img}}" alt="{{item.name}}">
        <span>{{item.name}}</span>
      </contact-card>
    </template>
  </template>
</dom-module>

<script>
  Polymer({
    is: 'friend-list'
  });
</script>
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
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aspernatur ad molestias esse alias dicta enim eaque neque voluptatum, doloribus provident nihil laudantium commodi quibusdam debitis ex facilis excepturi magnam itaque?</p>
      </div>
    </div>
    
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

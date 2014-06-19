---
layout: home
title: Quickstart

stylesheets:
  "/css/homepage.css"
---

<style shim-shadowdom>
core-tooltip {
  display: inline-flex;
  cursor: default;
  border-radius: 3px;
  outline: none;
}
core-tooltip:hover,
core-tooltip:focus {
  background: white;
}
core-tooltip::shadow .polymer-tooltip {
  opacity: 0;
  -webkit-transition: all 300ms cubic-bezier(0,1.92,.99,1.07);
  transition: all 300ms cubic-bezier(0,1.92,.99,1.07);
  -webkit-transform: translate3d(0, -10px, 0);
  transform: translate3d(0, -10px, 0);
  /*white-space: initial;*/
  /*min-width: 300px;*/
  /*max-width: 300px;*/
  line-height: 1.5;
}
core-tooltip:hover::shadow .polymer-tooltip,
core-tooltip:focus::shadow .polymer-tooltip {
  opacity: 1;
  transform: translate3d(0, 0, 0);
}
/*#glanceapp /deep/ .polymer-tooltip {
  visibility: visible !important;
}*/

google-map {
  display: block;
  width: 400px;
  height: 400px;
}
</style>

<link rel="import" href="/components/google-map/google-map.html">
<link rel="import" href="/components/google-map/google-map-directions.html">
<!-- <link rel="import" href="/components/google-map/google-map-search.html"> -->


<section id="quickstart">
  <div class="panel">

<h1>Quickstart: {{site.project_title}} at a glance (1 min)</h2></h1>

<h2>Using components</h2>

<p>{{site.project_title}}'s collection of elements are ready to drop in your page.
To use a component, simply import it, then use it.</p>

<div horizontal layout>
<pre style="margin:0;" flex>
&lt;link rel="import" href="google-map.html">
&lt;link rel="import" href="google-map-directions.html">

&lt;map-directions start="San Francisco"
                   end="Mountain View"
                   travelMode="DRIVING">&lt;/map-directions>
&lt;google-map id="map" zoom="14" showCenterMarker>&lt;/google-map>

&lt;script>
  var gmap = document.querySelector('#map');
  gmap.addEventListener('map-ready', function(e) {
    var dirs = document.querySelector('map-directions');
    dirs.map = gmap.map;
  });
&lt;/script>
</pre>

<google-map mapType="roadmap" zoom="14"></google-map>
<google-map-directions startAddress="San Francisco" endAddress="Mountain View" travelMode="DRIVING"></google-map-directions>
</div>

<h2>Creating components</h2>

<p>{{site.project_title}} allows you to declaratively build custom elements using <code>&lt;polymer-element></code>. The DOM and CSS of your element are encapsulated using Shadow DOM. Inside {{site.project_title}} you can use features like <a href="/docs/polymer/databinding.html">two-way data binding</a> and <a href="/docs/polymer/polymer.html#declarative-event-mapping">declarative event handlers</a>.</p>

<div horizontal layout>

<demo-tabs bottom>
  <demo-tab heading="element.html">
<pre class="prettyprint" id="glanceapp">
<core-tooltip large label="Element dependencies are loaded at the top using an HTML Import.">&lt;link rel="import" href="../polymer/polymer.html"></core-tooltip>

<core-tooltip large label="Components are defined declaratively." position="top">&lt;polymer-element name="hello-element"</core-tooltip> <core-tooltip large label="Published properties allow users to configure your element." position="top">attributes="name"></core-tooltip>
  <core-tooltip large label="&lt;template> provides native client-side templating. Scaffold your component using DOM, not strings." position="right">&lt;template></core-tooltip>
    <core-tooltip large position="top" label="CSS &amp; DOM are scoped to the element using Shadow DOM.">&lt;link rel="stylesheet" href="element.css"></core-tooltip>
    &lt;div <core-tooltip large label="Declarative event handling">on-click="{%raw%}{{sayHi}}{%endraw%}"</core-tooltip>>Hello, &lt;b id="name"><core-tooltip large label="Two-way data-binding to element properties" position="top">{%raw%}{{name}}{%endraw%}</core-tooltip>&lt;/b>!</div>
  &lt;template>
  &lt;script>
    Polymer('name-tag', {
      name: 'Dimitri',
      nameChanged: function() {

      },
      sayHi: function() {
        alert('Hi!' + this.name);
      },
    });
  &lt;/script>
&lt;/polymer-element>
</pre>
  </demo-tab>
  <demo-tab heading="element.css">
{% highlight html %}
#name {
  color: red;
}
@media only screen and (min-width: 580px) {
  #name {
    letter-spacing: 5px;
  }
}
{% endhighlight %}
  </demo-tab>
  <demo-tab heading="index.html">
{% highlight html %}
<!DOCTYPE html>
<html>
<head>
  <script src="platform.js"></script>
  <link rel="import" href="element.html">
</head>
<body>
  <my-element name="Eric"></my-element>
</body>
</html>
{% endhighlight %}
  </demo-tab>
</demo-tabs>

<div>
<h4>Anatomy of an element</h4>
<ul>
  <li>Imports</li>
  <li>polymer-element</li>
  <li>todo...</li>
  <li>hook these up to the tooltip</li>
</ul>

</div>
</div>
      
  </div>
</section>

<script>
document.addEventListener('polymer-ready', function(e) {
  var gMap = document.querySelector('google-map');
  gMap.addEventListener('google-map-ready', function(e) {
    document.querySelector('google-map-directions').map = gMap.map;
    //gSearch.map = gMap.map;
  });

  // var geoLocation = document.querySelector('geo-location');
  // geoLocation.addEventListener('core-response', function(e) {
  //   gMap.latitude = geoLocation.latitude;
  //   gMap.longitude = geoLocation.longitude; 
  // });
});
</script>
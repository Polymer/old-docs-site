---
layout: default
type: start
navgroup: start
shortname: Start
title: Custom elements 101
subtitle: Learn about the foundation of Polymer-based apps
---

{% include toc.html %}

## Introduction

If HTML were reinvented tomorrow, it would provide more features and greater capability than today's built-in elements. For example, imagine you're building a photo booth app to capture snapshots, display thumbnails, and cycle through recent photos. If HTML provided the `<camera>`, `<carousel>`, or `<tabs>` element, you wouldn't think twice about using them. You'd accept the functionality and start writing markup!

Fortunately, [Custom Elements](/platform/custom-elements.html) pave a path to {{site.project_title}}'s "[Everything is an element](/docs/start/everything.html#everythingis)" philosophy. Embracing the philosophy means a web app becomes a collection of well-defined, reusable components. You create applications by assembling custom elements: either ones provided by {{site.project_title}}, [ones you create](/docs/start/creatingelements.html) yourself, or third-party elements.

## Custom element APIs {#publicapis}

A critical realization is that **custom elements are no different than
standard HTML elements**. Each HTML  element has its own API, consisting of:

- properties
- methods
- attributes
- events
- how the element handles its children

Take an HTML `<select>`. It can be declared in markup:

    <select selected="0">
      <option>Hello World</option>
    </select>

… or instantiated in JavaScript:

    var s = document.createElement('select');
    s.innerHTML = '<option>Hello World</option>';

Once you have a reference to an element, you can attach event listeners, access properties, or call its methods:

    s.addEventListener('change', function(e) {
      alert(this.selectedIndex == 0);
    });

Guess what? **The same tricks apply to custom elements**. You can use standard DOM methods on custom elements, access their properties, attach event listeners, or style them using CSS. The major difference with custom elements is that they give authors a tool for defining new tags with built-in functionality. These tags can add their own methods, properties, attributes, and events, and define their own logic for handling children.

The `<core-selector>` element is a good example of a basic custom element. It's a close relative to `<select>`, but provides additional functionality and more flexibility. For example, you can  use `<core-selector>` as a general container for selecting _any_ type of content, not just `<option>`. It also provides convenient styling hooks, events, and additional properties for interacting with its items.

    <core-selector selected="0">
      <div>Item 1</div>
      <div>Item 2</div>
    </core-selector>

    <script>
      var ps = document.querySelector('core-selector');
      ps.addEventListener('core-select', function(e) {
        alert(e.selectedIndex == 0);
      });
    </script>

## Types of elements {#elementtypes}

Polymer divides its custom  elements into two categories based on their use and behavior:

- UI elements, which render UI to the screen.
- Non-UI elements, which provide other utilities. 

###  UI elements {#uielements}

Elements like `<select>` and `<core-selector>` are _UI elements_. They render UI and are visible on the page. A few other examples are [`<core-collapse>`](/components/core-docs/index.html#core-collapse), [`<core-toolbar>`](/components/core-docs/index.html#core-toolbar), and [`<paper-tabs>`](/components/paper-docs/index.html#paper-tabs):

    <paper-tabs selected="0">
      <paper-tab>One</paper-tab>
      <paper-tab>Two</paper-tab>
      <paper-tab>Three</paper-tab>
    </paper-tabs>

<!-- 
<iframe src="/components/paper-tabs/demo.html" style="border:none;height:80px;width:100%;"></iframe> -->

### Non-UI elements {#nonuielements}

Non-UI elements _**don't**_ render anything to the screen. That may seem strange, but there are plenty of examples already in HTML: `<script>`, `<style>`, and `<meta>` to name a few. These elements serve a purpose and do their useful work without rendering UI.

Non-UI elements provide utility behind the scenes. For example, the `<core-ajax>` tag lets you **make XHR requests from markup**. Feed it some configuration attributes and listen for a response:

    <core-ajax url="http://gdata.youtube.com/feeds/api/videos/" auto
               params='{"alt":"json", "q":"chrome"}' handleAs="json"></core-ajax>
    <script>
      var ajax = document.querySelector('core-ajax');
      ajax.addEventListener('core-response', function(e) {
        console.log(this.response);
      });
    </script>

Non-UI elements like this one reduce the amount of boilerplate code you have to write. They perform their task, get out of your way, and can hide the details of a complex API like `XMLHttpRequest`.

## Interoperability: on by default {#interop}

Because custom elements are fundamentally HTML elements, they work well with each other or any technology that understands DOM (every framework on the planet). That means custom elements already work with frameworks like Angular, Ember, jQuery, and others.

The custom elements we've used so far come from {{site.project_title}}'s set and are built using [{{site.project_title}} core](/docs/polymer/polymer.html). But here's where things get interesting...

**That doesn't matter**.

Because custom elements are just like regular elements, it doesn't matter what kind of technology is used to implement their internals. Different kinds of elements from different vendors can all coexist in the same page. As an example, Mozilla offers a series of custom elements called [x-tags](http://x-tags.org/) (see also: [Brick](http://mozilla.github.io/brick/)). You can use x-tags with your other elements and mix and match them. As a general rule, it doesn't matter how an element was constructed.

## Next steps {#nextsteps}

Now that you've got an idea of what you can do with custom elements, it's time to start building something! Continue on to:

<a href="/docs/start/usingelements.html">
  <paper-button icon="arrow-forward" label="Using elements" raisedButton></paper-button>
</a>

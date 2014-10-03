---
layout: default
type: core
navgroup: docs
shortname: Articles
title: "Building single page apps using web components"
subtitle: The Polymer approach to building single page applications

article:
  author: ebidel
  published: 2014-10-01
  #updated: 2014-10-01
  polymer_version: 0.4.1
  description: The Polymer approach to building single page applications
tags:
- routing
- spa
- app
---

<style>
paper-button {
  background: #4285f4;
  color: #fff;
}
paper-button:hover {
  background: #2a56c6;
}
</style>

{% include authorship.html %}

{% include toc.html %}

So how does one build a single page application (SPA) using web components? On the Polymer team we get this question a lot. Our answer (as always) is,..."Use components!" However, it's never obvious to folks how a bunch of modular components can compose together into a larger, functional app. The goal of those tutorial is to help you 

<p layout vertical center style="float:right;margin: 0 0 0 10px;">
  <a href="demos/spa/final.html" target="_blank"><img src="images/spa/screenshot.png" style="width:300px;"></a>
</p>

In this tutorial, we'll build a full-featured single page app:

- Built entirely using Polymer's [core elements](/docs/elements/core-elements.html)
- Responsive
- Transitions between views using data-binding features
- URL routing and deep linking
- Keyboard accessible

<a href="demos/spa/final.html" target="_blank">
  <paper-button raised>
    <core-icon icon="arrow-forward"></core-icon>Open the demo
  </paper-button>
</a>

## App structure
{:style="clear:both"}

Designing a layout is one of your first tasks when starting a project. As part of its [core element collection](/docs/elements/core-elements.html), Polymer
has several [layout elements](/docs/elements/layout-elements.html) (`<core-header-panel>`, `<core-drawer-panel>`, `<core-toolbar>`) for scaffolding an application's structure. These components are useful by themselves, but for an even quicker start, check out `<core-scaffold>`. It starts you off with a responsive, mobile layout by assembling several of the foundational elements.

`<core-scaffold>`'s children are arranged by specifying attributes and/or using specific tags. For example, using a `<nav>` element creates the app drawer. Alternatively, you can use the `navigation` attribute on any element (e.g `<core-header-panel navigation>`). The toolbar is designated with the `tool` attribute. All other children end up in the main content area.

<pre>
&lt;body unresolved fullbleed&gt;
  &lt;core-scaffold id="scaffold"&gt;
    &lt;<b>nav</b>&gt;Left drawer&lt;/<b>nav</b>&gt;
    &lt;core-toolbar <b>tool</b>&gt;Application&lt;/core-toolbar&gt;
    &lt;div&gt;Main content&lt;/div&gt;
  &lt;/core-scaffold&gt;
&lt;/body&gt;
</pre>

Let's dive deeper on each of these sections. 

### Drawer

Markup that you put in the chosen navigation element end up in a slide-away app drawer.
For our purposes, we'll stick with a heading `<core-toolbar>` and `<core-menu>` of navigational links:

    <nav>
      <core-toolbar><span>Single Page Polymer</span></core-toolbar>
      <core-menu selected="0">
        <paper-item icon="label-outline" label="Single">
          <a href="#one"></a>
        </paper-item>
        <paper-item icon="label-outline" label="page">
          <a href="#two"></a>
        </paper-item>
        ...
      </core-menu>
    </nav>

**Note** Right now, `<core-menu selected="0">` is hardcoded to select the first item. We'll make that dynamic later.
{: .alert .alert-info }

### Toolbar

The toolbar spans the top of the page and contains functional icon buttons. A perfect
element for that type of behavior is `<core-toolbar>`:

    <core-toolbar tool flex> <!-- flex makes the bar span across the top -->
      <div flex>Application</div> <!-- flex justifies the icons to the right-side -->
      <core-icon-button icon="refresh"></core-icon-button>
      <core-icon-button icon="add"></core-icon-button>
    </core-toolbar>

### Main content {#maincontent}

The last section is left for your content! It can be any type of element. A `<div>` is perfectly fine:

    <div layout horizontal center-center fit>
      <!-- fill with pages -->
    </div>

The `fit` attribute instructs the main area to take up the full width/height of its parent and `layout horizontal center-center` horizontally/vertically centers that content using flexbox.

## Creating "views"

You can create multiple views (or pages) within an app by using `<core-pages>` or `<core-animated-pages>`. Both of these elements are useful for displaying only one of their children at a time. The benefit of `<core-animated-pages>` is that it provides more defaults and sexy transitions.

Since the demo uses the `slide-from-right` transition, the first thing to do is import the element definition _and_ the the `slide-from-right` transition:

    <link rel="import" href="components/core-animated-pages/core-animated-pages.html">
    <link rel="import" href="components/core-animated-pages/transitions/slide-from-right.html">

and drop in your content:

<pre>
&lt;div layout horizontal center-center fit&gt;
  <b>&lt;core-animated-pages  selected=&quot;0&quot; transitions=&quot;slide-from-right&quot;&gt;</b>
    &lt;section layout vertical center-center&gt;
      &lt;div&gt;Single&lt;/div&gt;
    &lt;/section&gt;
    &lt;section layout vertical center-center&gt;
      &lt;div&gt;page&lt;/div&gt;
    &lt;/section&gt;
    ...
  <b>&lt;/core-animated-pages&gt;</b>
&lt;/div&gt;
</pre>

**Note** Right now, `<core-animated-pages selected="0">` is hardcoded to select the first page. We'll make that dynamic later.
{: .alert .alert-info }

By now you should have <a href="demos/spa/example1.html" target="_blank">a basic app</a>, but **there's something subtle to notice**. Thanks to Polymer's [layout attributes](/docs/polymer/layout-attrs.html) and the [default styles](/articles/styling-elements.html#default-styles) provided by each element, **you've achieved a responsive app without writing a lick of CSS**! Of course, with a little inspiration from the [material design color palette](http://www.google.com/design/spec/style/color.html), [less than 10 CSS rules](demos/spa/styles.css) turns the app into something beautiful.

<p>
<a href="demos/spa/example1.html" target="_blank">
  <paper-button raised>
    <core-icon icon="arrow-forward"></core-icon>See it in action: without CSS
  </paper-button>
</a>
<a href="demos/spa/example1-style.html" target="_blank">
  <paper-button raised>
    <core-icon icon="arrow-forward"></core-icon>See it in action: with CSS
  </paper-button>
</a>
</p>

### Using data binding to simplify the markup

At this point, we have an app but it's nothing to write home about. The app is not DRY. Similar markup is repeated all over the place:

    <nav>
      <core-menu selected="0">
        <paper-item icon="label-outline" label="Single">
          <a href="#one"></a>
        </paper-item>
        <paper-item icon="label-outline" label="page">
          <a href="#two"></a>
        </paper-item>
        <paper-item icon="label-outline" label="app">
          <a href="#three"></a>
        </paper-item>
        ...
      </core-menu>
    </nav>

The app is also not dynamic. When a user selects a menu item the view doesn't update.
Luckily, both of these problems are easily solved with Polymer's [data binding features](/docs/polymer/databinding.html).

To leverage Polymer's data-binding features outside of a `<polymer-element>`, we can wrap our app inside an auto-binding `<template>`:

<pre>
&lt;body unresolved fullbleed>
  <b>&lt;template is="auto-binding" id="t"></b>
    &lt;core-scaffold id="scaffold">
      ...
    &lt;/core-scaffold>
  <b>&lt;/template></b>
&lt;/body>
</pre>

An auto-binding `<template>` allows us to use {%raw%}`{{}}`{%endraw%} bindings, [expressions](/docs/polymer/expressions.html), and [`on-*` declarative event handlers](/docs/polymer/polymer.html#declarative-event-mapping) inside the main page.

You can greatly **reduce the amount of markup you write by generating it from a data model**. In our case, we can render the menu items and pages with a `<template repeat>`:

{%raw%}
    <core-menu valueattr="hash" selected="{{route}}">
      <template repeat="{{page, i in pages}}">
        <paper-item label="{{page.name}}" hash="{{page.hash}}">
          <a href="#{{page.hash}}"></a>
        </paper-item>
      </template>
    </core-menu>

    <core-animated-pages valueattr="hash" selected="{{route}}" ...>
      <template repeat="{{page, i in pages}}">
        <section hash="{{page.hash}}" layout vertical center-center>
          <div>{{page.name}}</div>
        </section>
      </template>
    </core-animated-pages>

    <script>
      var template = document.querySelector('#t');
      template.pages = [
        {name: 'Single', hash: 'one'},
        {name: 'page', hash: 'two'},
        {name: 'app', hash: 'three'},
        {name: 'using', hash: 'four'},
        {name: 'Polymer', hash: 'five'}
      ];
    </script>
{%endraw%}

Notice that `<core-animated-pages>` and `<core-menu>` are also linked by binding
their `selected` attributes together. The `valueattr="hash"` tells both elements
to use the `hash` attribute as the selected value.

{%raw%}
    <core-menu valueattr="hash" selected="{{route}}">
    ...
    <core-animated-pages valueattr="hash" selected="{{route}}">
{%endraw%}

Now, when a user clicks a nav item the view updates accordingly.

<a href="demos/spa/example2.html" target="_blank">
  <paper-button raised>
    <core-icon icon="arrow-forward"></core-icon>See it in action
  </paper-button>
</a>

## URL routing &amp; deep linking

## Keyboard navigation

## Dynamically loading content

Loading content on-demand can be a challenge.

## Extra polish

1. When a menu item is selected, close the app drawer:

{%raw%}
        <core-menu ... on-core-select="{{menuItemSelected}}">

        template.menuItemSelected = function(e, detail, sender) {
          if (detail.isSelected) {
            this.$ && this.$.scaffold.closeDrawer();
          }
        };
{%endraw%}

2. Render a different icon for the selected nav item:

{%raw%}
        <paper-item icon="label{{route != page.hash ? '-outline' : ''}}"...>
{%endraw%}

## Conclusion

TODO

{% include disqus.html %}

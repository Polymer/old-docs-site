---
layout: default
title: FAQ
---

{% include alpha.html %}

*Don't see an answer to your question on here? Ask on the [mailing list](/discuss.html)!*

## {{site.project_title}} 

#### Why should I care about this project?

{{site.project_title}} is still in its very early days, but we're excited about its potential. It's one of the *first frameworks that doesn't fight the web platform* with oodles of JavaScript, but rather embraces it. It targets the evolving web platform by using a handful of independent polyfills for emerging web standards like Custom Elements and Shadow DOM. Over time as more browsers implement these emerging standards, the foundation layer will diminish and ultimately disappear.

#### Where are all of the shiny magic components that are going to revolutionize the entire internet and solve all of my problems?

At this point they're basically just a glimmer in our collective eye. But we've built a solid technical foundation and are working feverishly to make our ambitious vision a reality, so watch this space.

#### Okay, the components aren't there yet. Is the rest of {{site.project_title}} production ready?

We don't think so, but if you're the adventurous type you're welcome to give it a try. Run the demos, play with the toolkit. Most importantly, join the mailing list and give us feedback!

#### I don't like your {components | toolkit syntax | face }!

<!-- 
<figure id="architecture-diagram" style="float:right">
  <iframe src="/images/architecture-diagram.svg?{{'now' | date: "%Y%m%d"}}" style="width:150px;"></iframe>
  <figcaption>Architectural Diagram</figcaption>
</figure> -->

That's fine. We've designed {{site.project_title}}  to be cleanly layered so you can use just the parts you like. You can use our whole stack, a single polyfill, or anything in between. It's up to you.
<!-- {: style="clear:both"} -->

#### Do I have to use the Sandbox tool if I want to use {{site.project_title}}?

Nope, Sandbox is just a simple demo app that makes it easy to play around with
components and get a feel for {{site.project_title}}. It's not intended to be
any kind of production tool.

#### Which browsers does {{site.project_title}} support?

{{site.project_title}} aims to support [evergreen browsers](http://www.yetihq.com/blog/evergreen-web-browser/). After all, we're trying to simulate the future, and as someone once said, "You're headed for trouble if all you do is stare in the rear-view mirror." In practice, this means we support the most recent versions of Chrome, Safari, Internet Explorer, and Firefox. Some pieces of {{site.project_title}} may support more browsers if it doesn't require too much extra effort.

See our [Browser Compatibility](/compatibility.html) page for more information.

#### When will other browsers support these APIs natively?

The foundation layer in our [architecture diagram](/images/architecture-diagram.svg) is based on emerging web standards. As browsers support them natively, the need for that layer will diminish and ultimately disappear. It's impossible to say when every browser will support these features natively--but the more that web developers ask for them, the sooner native support will come.

#### What's your mobile story?

One of our core goals is for {{site.project_title}} to work on mobile as a first-class citizen. For example, many parts of {{site.project_title}} work on Chrome for Android and Mobile Safari today. We're also investigating responsive components that can automatically configure themselves correctly on desktop, tablets, and phones.

#### What does this have to do with x-tags?

[x-tags](http://x-tags.org/) is a cool project that Mozilla is working on, and it's not directly affiliated with {{site.project_title}}. However, both {{site.project_title}} and x-tags build on the emerging Custom Elements standard, which means their components are interoperable by default. Both Google and Mozilla offer polyfills for the Custom Element spec. X-Tag works on top of either, so you can use X-Tag custom elements alongside your {{site.project_title}} components. We're working actively with them to maximize compatibility between the component sets.

#### How is {{site.project_title}} different from Twitter's Bootstrap or Adobe's Topcoat?

Bootstrap and Topcoat are awesome CSS/UI libraries. Our goals for {{site.project_title}} are different. While we eventually plan to create a standard set of shiny amazing UI components, the meat of {{site.project_title}} is geared towards developers interested in building web applications on top of Web Component technologies. {{site.project_title}} also provides additional sugaring APIs ([MDV](/platform/mdv.html), templates, and data-binding)  to meet the demands of today's web applications.

#### Wait, what happened to Toolkitchen?

Toolkitchen was the first name we picked for this project. We didn't love it, so
we changed it to {{site.project_title}}.

#### How is this related to Google?

We're first and foremost just a group of folks who think web components are the bee's knees--a bunch of us just happen to work at Google. We're thrilled about the community participation we've gotten already and hope you'll join in the discussion!

#### Is this project related to {Angular JS | Closure | Google Web Toolkit}?

Nope.

#### I see a bunch of XHRs making network requests. What gives?

One limitation of today's polyfills is that {{site.project_title}} aggressively uses XHR to shim HTML Imports. We're experimenting with packaging systems and build steps to reduce the cost of network requests. When this API lands natively in browsers, things will Just Work™. Resources will be loaded as they normally do, taking advantage of parallelism, browser caching, etc. 

#### Performance isn't ideal. Don't you care about it?

Deeply. And we want the entire web platform to be a buttery smooth 60fps. That said, we have not yet run benchmarks on the various polyfills--we're in the early stages, after all! If you're interested in helping us put some numbers behind these guys, [let us know](/discuss.html).

Remember our libraries go away over time! {{site.project_title}} gets better, stronger, and faster as native browser implementations pop up.

#### How can I contribute?

We love to hear your comments or suggestions. [File a bug](https://github.com/polymer/polymer/issues/new) or swing by the [mailing list](/discuss.html) and say "hi"--we don't bite! If you want
to contribute code, see our [contributor's guide](https://github.com/polymer/polymer/blob/master/CONTRIBUTING.md).

#### Where is the best place to file bugs?

We have many different demo, platform, and library repositories. If you know exactly where the problem lives in the stack, please file the bug under the appropriate repo. Otherwise, filing under the general [polymer](https://github.com/polymer/polymer/issues/new) project is great.

## Web Components

#### How do I package a bunch of custom elements together?

Use a custom build step that flattens/concatenates everything into a single file,
then uses [HTML Imports](/platform/html-imports.html) (`<link ref="import">`) to 
bring that file into your app. 

Similarly, you could write a build step that inlines any custom element definition directly into your main app. 

#### Crawlers understand custom elements? How does SEO work?

They don't. However, search engines have been dealing with heavy AJAX
based application for some time now. Moving away from JS and being more declarative
is a good thing and will generally make things better.

#### Is there a registry of components I can play with?

Not yet, but we think that's a great idea.

#### I get errors when trying to use external stylesheets in my element definition or using `<link rel="import">` with external files.

Unfortunately, this is a limitation of the HTML Import spec and the polyfill follows suit. The polyfill uses XHR to pull down resources defined in an `<element>` definition. External resources will fail if they are not [CORS-enabled](http://www.html5rocks.com/tutorials/cors/).

To link in external stylesheets, you can use `@import` in a `<style>` with `toolkit-scope="global"`:

    <element name="x-blink">
    <style toolkit-scope="global">
      @import url(http://fonts.googleapis.com/css?family=Quicksand);
    </style>
    <template>...</template>
    </element>

#### How can I use web fonts or CSS Animations in my custom element?

According to the spec, certain @ at-rules (including CSS `@keyframe` and `@font-face`) [cannot be defined](http://lists.w3.org/Archives/Public/public-whatwg-archive/2013Jan/0251.html) in `<style scoped>`. Therefore, you need to define these values outside of ShadowDOM (e.g. outside a `<template>`) using `<style toolkit-scope="global">`. After that, you can use the animation/font inside your Shadow DOM:

    <element name="x-blink">
      <!-- CSS Animation defs need to be outside of scoped styles -->
      <style toolkit-scope="global">
        @import url(http://fonts.googleapis.com/css?family=Quicksand);
        @-webkit-keyframes blink {
          to { opacity: 0; }
         }
      </style>
      <template>
        <style>
          @host {
            x-blink { -webkit-animation: blink 1s cubic-bezier(1.0,0,0,1.0) inifnite 1s; }
          }
        </style>
        ...
      </template>
    </element>

*Special thanks go to GitHub user md_5 who generously donated the polymer organization name.*
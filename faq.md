---
layout: default
title: FAQ
---

{% include alpha.html %}

*Don't see an answer to your question on here? Ask on the [mailing list](/discuss.html)!*

## {{site.project_title}} 

#### Why should I care about this project? {#why}

{{site.project_title}} is a new type of library for the web, targeting the modern
web platform, and useful for building web applications based on Web Components.

Unlike some other frameworks before it, {{site.project_title}} attempts to embrace
HTML as much as possible by encouraging the use of [custom element](/platform/custom-elements.html) wherever possible. It includes a handful of independent polyfills for these emerging web standards (Custom Elements, Shadow DOM, etc.) that over time, diminish and ultimately disappear as browser vendors implement the native APIs.

{{site.project_title}} is still in its very early days, but we're excited about its potential! 

#### Where are all of the shiny magic components that are going to revolutionize the entire internet and solve all of my problems? {#uicomponents}

At this point they're basically just a glimmer in our collective eye. But we've built a solid technical foundation and are working feverishly to make our ambitious vision a reality, so watch this space.

#### Okay, the components aren't there yet. Is the rest of {{site.project_title}} production ready? {#readiness}

We don't think so, but if you're the adventurous type you're welcome to give it a try. Run the demos, play with the toolkit. Most importantly, join the mailing list and give us feedback!

#### I don't like your {components | toolkit syntax | face }! {#dislike}

<!-- 
<figure id="architecture-diagram" style="float:right">
  <iframe src="/images/architecture-diagram.svg?{{'now' | date: "%Y%m%d"}}" style="width:150px;"></iframe>
  <figcaption>Architectural Diagram</figcaption>
</figure> -->

That's fine. We've designed {{site.project_title}}  to be cleanly layered so you can use just the parts you like. You can use our whole stack, a single polyfill, or anything in between. It's up to you.
<!-- {: style="clear:both"} -->

#### Do I have to use the Sandbox tool if I want to use {{site.project_title}}? {#sandbox}

Nope, Sandbox is just a simple demo app that makes it easy to play around with
components and get a feel for {{site.project_title}}. It's not intended to be
any kind of production tool.

#### Which browsers does {{site.project_title}} support? {#browsersupport}

{{site.project_title}} aims to support [evergreen browsers](http://www.yetihq.com/blog/evergreen-web-browser/). After all, we're trying to simulate the future, and as someone once said, "You're headed for trouble if all you do is stare in the rear-view mirror." In practice, this means we support the most recent versions of Chrome, Safari, Internet Explorer, and Firefox. Note that this is fewer browsers than other frameworks support. For example, {{site.project_title}} only aims to support Internet Explorer 10 and above. Some pieces of {{site.project_title}} may support more browsers if it doesn't require too much extra effort--if you find bugs in unsupported browsers, please still file them.  Most things should work in IE9 today without too much work; feel free to file bugs on what doesn't.  IE8 is incompatable due to its insufficient DOM support. 

See our [Browser Compatibility](/compatibility.html) page for more information.

#### When will other browsers support these APIs natively? {#nativesupport}

The foundation layer in our [architecture diagram](/images/architecture-diagram.svg) is based on emerging web standards. As browsers support them natively, the need for that layer will diminish and ultimately disappear. It's impossible to say when every browser will support these features natively--but the more that web developers ask for them, the sooner native support will come.

#### What's your mobile story? {#onmobile}

One of our core goals is for {{site.project_title}} to work on mobile as a first-class citizen. For example, many parts of {{site.project_title}} work on Chrome for Android and Mobile Safari today. We're also investigating responsive components that can automatically configure themselves correctly on desktop, tablets, and phones.

#### What does this have to do with x-tags? {#xtags}

[x-tags](http://x-tags.org/) is a cool project that Mozilla is working on, and it's not directly affiliated with {{site.project_title}}. However, both {{site.project_title}} and x-tags build on the emerging Custom Elements standard, which means their components are interoperable by default. Both Google and Mozilla offer polyfills for the Custom Element spec. X-Tag works on top of either, so you can use X-Tag custom elements alongside your {{site.project_title}} components. We're working actively with them to maximize compatibility between the component sets.

#### How is {{site.project_title}} different from Twitter's Bootstrap or Adobe's Topcoat? {#uiframeworks}

Bootstrap and Topcoat are awesome CSS/UI libraries. Our goals for {{site.project_title}} are different. While we eventually plan to create a standard set of shiny amazing UI components, the meat of {{site.project_title}} is geared towards developers interested in building web applications on top of Web Component technologies. {{site.project_title}} also provides additional sugaring APIs ([MDV](/platform/mdv.html), templates, and data-binding)  to meet the demands of today's web applications.

#### Wait, what happened to Toolkitchen? {#toolkitchen}

Toolkitchen was the first name we picked for this project. We didn't love it, so
we changed it to {{site.project_title}}.

#### How is this related to Google? {#google}

We're first and foremost just a group of folks who think web components are the bee's knees--a bunch of us just happen to work at Google. We're thrilled about the community participation we've gotten already and hope you'll join in the discussion!

#### Is this project related to {Angular JS | Closure | Google Web Toolkit}? {#frameworks}

Nope.

#### I see a bunch of XHRs making network requests. What gives? {#xhrrequests}

One limitation of today's polyfills is that {{site.project_title}} aggressively uses XHR to shim HTML Imports. We're experimenting with packaging systems and build steps to reduce the cost of network requests. When this API lands natively in browsers, things will Just Work™. Resources will be loaded as they normally do, taking advantage of parallelism, browser caching, etc. 

#### Performance isn't ideal. Don't you care about it? {#performancestuff}

Deeply. And we want the entire web platform to be a buttery smooth 60fps. That said, we have not yet run benchmarks on the various polyfills--we're in the early stages, after all! If you're interested in helping us put some numbers behind these guys, [let us know](/discuss.html).

Remember our libraries go away over time! {{site.project_title}} gets better, stronger, and faster as native browser implementations pop up.

#### Does {{site.project_title}} work under Content Security Policy (CSP)? {#csp}

In certain cases, {{site.project_title}} fails under certain [CSP](http://www.html5rocks.com/tutorials/security/content-security-policy/). This is because the [HTML Imports](/platform/html-imports.html) polyfill uses XHR to do its magic. Native implementations of HTML Imports are needed (see Blink's [crbug.com/240592](http://crbug.com/240592)). In the interim, we may prioritize a software solution.

#### How can I contribute? {#contributing}

We love to hear your comments or suggestions. [File a bug](https://github.com/polymer/polymer/issues/new) or swing by the [mailing list](/discuss.html) and say "hi"--we don't bite! If you want
to contribute code, see our [contributor's guide](https://github.com/polymer/polymer/blob/master/CONTRIBUTING.md).

#### Where is the best place to file bugs? {#filebugs}

We have many different demo, platform, and library repositories. If you know exactly where the problem lives in the stack, please file the bug under the appropriate repo. Otherwise, filing under the general [{{site.project_title}}](https://github.com/polymer/polymer/issues/new) project is great.

#### What is the difference between the stable and master branches? {#branches}

See [Branching strategy](/branching-strategy.html).

#### How do I use an MDV model to repeat an `<option>` or `<tr>`? {#mdv-option-tr}

The elements `<option>` and `<tr>` have special meaning when they're children of
`<select>` and `<table>`, respectively. For these special types elements, use the
`template` attribute to repeat the element:

    <template bind>
      <select>
        {%raw%}<option template repeat="{{options}}">{{}}</option>{%endraw%}
      </select>
    </template>
    <script>
      var t = document.querySelector('template').model = {
        options: ['One', 'Two', 'Three']
      };
    </script>

#### How do I manage JavaScript dependencies to prevent 1000 copies of library X? {#loadlibs}

There is no way to guarantee sharing and deduping in the general case. However, if
you have a library of components that use a library, they can all import a
"library.html" file that loads that library. [HTML Imports](/platform/html-imports.html)
will de-dupe the import based on it's fully qualified path.

If multiple libraries want to share a dependency, they will have to agree on a system.
Feature detection, or an agreed upon common location for a 'jquery.html' file in a CDN, etc.

## Web Components

#### How do I package a bunch of custom elements together? {#packaging}

Use a custom build step that flattens/concatenates everything into a single file,
then use [HTML Imports](/platform/html-imports.html) (`<link ref="import">`) to 
bring that file into your app. 

Similarly, you could write a build step that inlines any custom element definition
directly into your main app. We've experimented with this basic idea in a
tool we call [Vulcanizer](https://github.com/Polymer/labs/tree/master/vulcanize).

#### Crawlers understand custom elements? How does SEO work? {#seo}

They don't. However, search engines have been dealing with heavy AJAX
based application for some time now. Moving away from JS and being more declarative
is a good thing and will generally make things better.

#### Is there a registry of components I can play with? {#registry}

Not yet, but we think that's a great idea.

#### I get errors when trying to use external stylesheets in my element definition or using `<link rel="import">` with external files. {#externalsheets}

Unfortunately, this is a limitation of the HTML Import spec and the polyfill follows suit. The polyfill uses XHR to pull down resources defined in an `<element>` definition. External resources will fail if they are not [CORs-enabled](http://www.html5rocks.com/tutorials/cors/).

For stylesheets that are not same domain or CORs-enabled, you can use `@import` in a `<style>`:

    <element name="x-blink">
    <style>
      @import url(http://example.com/awesome.css);
    </style>
    <template>...</template>
    </element>

*Note*: If your stylesheet **is** CORs-enabled or from the same domain as your app,
it's preferred to inline the styles without using `@import`. For example:

    <element ...>
      <link rel="stylesheet" href="frameworkstyles.css">
      <template>...</template>
      ...
    </element>

#### How can I use web fonts or CSS Animations in my custom element? {#fontsanimations}

According to the spec, certain @ at-rules (including CSS `@keyframe` and `@font-face`) [cannot be defined](http://lists.w3.org/Archives/Public/public-whatwg-archive/2013Jan/0251.html) in `<style scoped>`. Therefore, you need to define these values outside of ShadowDOM (e.g. outside a `<template>`) using `<style polymer-scope="global">`. After that, you can use the animation/font inside your Shadow DOM:

    <element name="x-blink">
      <!-- CSS Animation defs need to be outside of scoped styles -->
      <style polymer-scope="global">
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

#### Why does my element claim its `.clientWidth/clientHeight` is 0? {#clientDimenstions}

By default, customs elements are `display: inline`. The fix is to give your element
a default style of `display: block` using an `@host` rule.

    <element name="my-element">
      <template>
        <style>
          @host { * { display: block; } }
        </style>
        ...
      </template>
      ...
    </element>
    <script>
    window.addEventListener('WebComponentsReady', function(e) {
      var element = document.querySelector('my-element');
      // element.clientWidth/clientHeight won't be 0.
    });
    </script>

#### Can an element `extend` from more than one element or have multiple inheritance (e.g. `<element name="my-element" extends="foo bar">`? {#multipleextends}

No. But {{site.project_title}} may provide a syntax for mixins in the future.

#### How do I access the DOM in a `<content>`? {#accessContentDOM}

For a `<content>`, you can iterate through `content.getDistributedNodes()`
to get the list of nodes distributed at the insertion point.

Also remember that you can access the light DOM as the element's normal children
(i.e. `this.children`, or other accessors). The difference with this approach
is that it's the entire set of *potentially* distributed nodes; not those actually distributed.

#### Can I use the `constructor` attribute without polluting the global namespace? {#constructorattr}

By design, `constructor` puts the constructor's name on `window`. If you don't want
this, there are two options:

1. Don't use the `constructor` attribute. Use `document.createElement()` instead.
2. Use `document.register()` and wrap the constructor it returns in a namespace.

---

*Special thanks go to GitHub user md_5 who generously donated the {{site.project_title}} organization name.*



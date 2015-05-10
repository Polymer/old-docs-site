---
layout: default
type: guide
shortname: Resources
title: FAQ
---

{% include alpha.html %}

*Don't see an answer to your question on here? Ask on the [mailing list](/discuss.html)!*

{% include toc.html %}

## {{site.project_title}}

### Why should I care about this project? {#why}

{{site.project_title}} is a pioneering library that makes it faster and easier than ever before to build beautiful applications on the web. {{site.project_title}} is built on top of a set of powerful new web platform primitives called Web Components. Web Components bring unprecedented composability, interoperability, and consumability to the web platform. The result is a monumental increase in developer productivity.

### Is {{site.project_title}} production ready? {#readiness}

{{site.project_title}} is currently in "developer preview." However, despite the label many people have already had success using {{site.project_title}} in production. Although things might still change, we encourage developers to take {{site.project_title}} out for a test drive.

### How is {{site.project_title}} related to material design? {#materialdesign}

{{site.project_title}} is the embodiment of material design for the web. The {{site.project_title}} team works closely with the design teams behind material design. In fact, {{site.project_title}} played a key role in material design's development: it was used to quickly prototype and iterate on design concepts. The material design components are still a work in progress, but will mature over the coming months.

### Do I have to use {{site.project_title}} Designer? {#designer}
Nope! [{{site.project_title}} Designer](https://polymer-designer.appspot.com) is primarily a tool to make it easy to dive in and prototype apps. It's entirely optional&mdash;although we've found that for developers who use it, it has quickly become an indispensable part of their workflow.

### I don't like your {components | data binding syntax | face }! {#dislike}

<!--
<figure id="architecture-diagram" style="float:right">
  <iframe src="/images/architecture-diagram.svg?{{'now' | date: "%Y%m%d"}}" style="width:150px;"></iframe>
  <figcaption>Architectural Diagram</figcaption>
</figure> -->

That's fine. The cool thing about Web Components-based libraries like {{site.project_title}} is that you can easily mix and match elements built using different libraries&mdash;and you don't have to use any of our databinding syntax if you just want to use some of our elements.

<!-- {: style="clear:both"} -->

### Which browsers does {{site.project_title}} support? {#browsersupport}

{{site.project_title}} aims to support [evergreen browsers](http://eisenbergeffect.bluespire.com/evergreen-browsers/). After all, we're trying to simulate the future, and as someone once said, "You're headed for trouble if all you do is stare in the rear-view mirror." In practice, this means we support the most recent versions of Chrome, Safari, Internet Explorer, and Firefox. Chrome 36 is the first browser to ship all of the platform features {{site.project_title}} depends on natively.

Note that this is fewer browsers than other frameworks support. For example, {{site.project_title}} only aims to support Internet Explorer 10 and above. Some pieces of {{site.project_title}} may support more browsers if it doesn't require too much extra effort--if you find bugs in unsupported browsers, please still file them.  Most things should work in IE9 today without too much work; feel free to file bugs on what doesn't.  IE8 is incompatable due to its insufficient DOM support.

See our [Browser Compatibility](compatibility.html) page for more information.


### When will other browsers support these APIs natively? {#nativesupport}

The foundation layer in our <a href="/images/architecture-diagram.svg" target="_blank">architecture diagram</a> is based on emerging web standards. As browsers support them natively, the need for that layer will diminish and ultimately disappear. In fact, Chrome 36 is the first browser to support all of the primitives natively. It's impossible to say when every browser will support these features natively--but the more that web developers ask for them, the sooner native support will come.

### What's your mobile story? {#onmobile}

One of our core goals is for {{site.project_title}} to work on modern mobile browsers as a first-class citizen. Check out [Topeka](https://polymer-topeka.appspot.com), one of our sample apps, to see it in action.


### How do I create a single page app with routing? {#spa}

By combining data-binding, [core-scaffold](../docs/elements/core-scaffold.html), [core-pages](../docs/elements/core-pages.html)/[core-animated-pages](../docs/elements/core-animated-pages.html), and [`<flatiron-director>`](https://github.com/PolymerLabs/flatiron-director) (an element for routing), you can easily create a responsive SPA with deep linking.

Here's a [demo](http://polymer-change.appspot.com/demos/spa.html) and [source](https://github.com/ebidel/polymer-change/blob/master/demos/spa.html).

See [customelements.io](http://customelements.io/?q=route) for further solutions.


### What does this have to do with x-tags? {#xtags}

[x-tags](http://x-tags.org/) is a cool project that Mozilla is working on, and it's not directly affiliated with {{site.project_title}}. However, both {{site.project_title}} and x-tags build on the emerging Custom Elements standard, which means their components are interoperable by default. Both Google and Mozilla offer polyfills for the Custom Element spec. X-Tag works on top of either, so you can use X-Tag custom elements alongside your {{site.project_title}} components. We're working actively with them to maximize compatibility between the component sets.

### How is {{site.project_title}} different from Twitter's Bootstrap or Adobe's Topcoat? {#uiframeworks}

Bootstrap and Topcoat are awesome CSS/UI libraries. Our goals for {{site.project_title}} are different. While we have our own set of shiny UI components, the meat of {{site.project_title}} is geared towards developers interested in building web applications on top of Web Component technologies. {{site.project_title}} also provides additional sugaring APIs to meet the demands of today's web applications.

### Is this project related to {Angular JS | Closure | Google Web Toolkit}? {#frameworks}

Nope. {{site.project_title}} isn't like things that have come before. {{site.project_title}} is the first of a new kind of library taking advantage of Web Components. The arrival of Web Components is a monumental change in web development, and we're really excited about the future {{site.project_title}} is demonstrating.

### How is {{site.project_title}}.dart related to {{site.project_title}}? {#dart}

polymer.dart is a Dart port of {{site.project_title}} created and maintained by the Dart team. The Dart team is collaborating with the {{site.project_title}} team to ensure that polymer.dart elements and polyfills are fully compatible with {{site.project_title}}.

### Is the code hosted on a CDN?

There is no official CDN version of {{site.project_title}}. Some community members
maintain a copy of {{site.project_title}} on [CloudFlare](http://cdnjs.cloudflare.com/):

<pre>
&lt;script src="//cdnjs.cloudflare.com/ajax/libs/polymer/<em>&lt;version&gt;</em>/webcomponents.js"></script>
&lt;script src="//cdnjs.cloudflare.com/ajax/libs/polymer/<em>&lt;version&gt;</em>/polymer.js"></script>
</pre>

Where <em>&lt;version&gt;</em> is the latest version of {{site.project_title}} available on CloudFlare.

There are a number of reasons why we recommend you use Bower instead of the CDN:

- The CDN does not host `polymer.html` which removes the ability for elements to import it.
- There are many elements which are not hosted on the CDN so it might be tricky to include all of them in your project.
- You will not be able to [Vulcanize your code](/articles/concatenating-web-components.html).

For testing and reproducing bugs, you can link to the current versions of the `webcomponents.js`
and `polymer.html` files on `polymer-project.org`:

    <script src="//www.polymer-project.org/{% polymer_version_dir %}/components/webcomponentsjs/webcomponents.min.js"></script>
    <link rel="import" href="//www.polymer-project.org/{% polymer_version_dir %}/components/polymer/polymer.html">

Many of the Core and Paper elements can also be found under `components`.

**Please do not use these URLs in production applications.** They should only
be used for testing and may break in the future!

### I see a bunch of XHRs making network requests. What gives? {#xhrrequests}

One limitation of today's polyfills is that {{site.project_title}} aggressively uses XHR to shim HTML Imports. We're experimenting with packaging systems and build steps to reduce the cost of network requests. HTML imports are supported natively in Chrome 36 this API lands natively in browsers, where things will Just Work™. Resources load as they normally do, taking advantage of parallelism, browser caching, etc.

You can try [Vulcanize](/articles/concatenating-web-components.html), which
is a build tool for concatenating a list of elements and inlining their definitions into your main page.

### Performance. Do you care about it? {#performancestuff}

Deeply. And we want the entire web platform to be a buttery smooth 60fps. That said, we have not yet run benchmarks on the various polyfills--we're in the early stages, after all! If you're interested in helping us put some numbers behind these guys, [let us know](/discuss.html).

Remember our libraries go away over time! {{site.project_title}} gets better, stronger, and faster as native browser implementations pop up.

### The filesize of webcomponents.js is big (~163KB). Why? {#filesize}

Minified and gzipped, webcomponents.js is ~44KB (for comparison JQuery 1.10 is 32KB). Keep
in mind that most of this size comes from the polyfills; code which has a death wish
and goes away over time as browsers support the native APIs.

{{site.project_title}} has also been designed to be a la carte. For example, if
you're only interested in Custom Elements, use the custom elements polyfill. If you
only want Shadow DOM, use its polyfill. webcomponents.js is simply a convenient bundle
for developers that includes all of the the pieces for building
{{site.project_title}}-based applications.

### Does {{site.project_title}} work with Chrome Apps? {#chromeapp}
Yes. Here's [an example Polymer Chrome App](https://github.com/PolymerLabs/polymerchromeapp) to get you started. It's important to note that Chrome Apps have a strict [Content Security Policy (CSP)](http://www.html5rocks.com/tutorials/security/content-security-policy/) which prevents the use of inline script elements. To handle the CSP limitation, this example uses our [Vulcanize](/articles/concatenating-web-components.html) build tool (in the form of [grunt-vulcanize](https://github.com/Polymer/grunt-vulcanize)) to turn inline script elements into external files. Be sure to read the [FAQ section on Content Security Policy](#csp) and the [Dealing with CSP](https://github.com/PolymerLabs/polymerchromeapp#dealing-with-csp) section in the sample project's README.

### Does {{site.project_title}} work under Content Security Policy (CSP)? {#csp}

Yes. By using `webcomponents.js` and [creating elements that use external scripts](../docs/polymer/polymer.html#altregistration), {{site.project_title}} runs under [CSP](http://www.html5rocks.com/tutorials/security/content-security-policy/). If you prefer to keep your element's
script inline to `<polymer-element>`, we recommend using [Vulcanize](tooling-strategy.html#vulcanize-build-tool) and running with the `--csp` flag.

In other nuanced cases, {{site.project_title}} fails under CSP. This is because
the [HTML Imports](../platform/html-imports.html) is polyfilled using XHR, which can
in turn, execute strings as JavaScript and fail CSP. So if you import a file that has an inline script tag, it will fail. This problem will go away with
native HTML Imports (see Blink's [crbug.com/240592](http://crbug.com/240592) tracking bug).

### How can I contribute? {#contributing}

We love to hear your comments or suggestions. [File a bug](https://github.com/polymer/polymer/issues/new) or swing by the [mailing list](/discuss.html) and say "hi"--we don't bite! If you want
to contribute code, see our [contributor's guide](https://github.com/Polymer/tools/blob/master/CONTRIBUTING.md).

### Where is the best place to file bugs? {#filebugs}

We have many different demo, platform, and library repositories. If you know exactly where the problem lives in the stack, please file the bug under the appropriate repo. Otherwise, filing under the general [{{site.project_title}}](https://github.com/polymer/polymer/issues/new) project is great.

### How do I manage JavaScript dependencies to prevent 1000 copies of library X? {#loadlibs}

There is no way to guarantee sharing and deduping in the general case. However, if
you have a library of components that use a library, they can all import a
"library.html" file that loads that library. [HTML Imports](../platform/html-imports.html)
will de-dupe the import based on it's fully qualified path.

If multiple libraries want to share a dependency, they will have to agree on a system.
Feature detection, or an agreed upon common location for a 'jquery.html' file in a CDN, etc.

### What sort of testing do you do?

{{site.project_title}} uses Chromium's continuous build infrastructure to test
the entire system and each polyfill, individually.

### How can I validate property values? {#validateinput}

One way to validate input is to use a `*Changed` handler to observe the
property changing, but separate out the "set value" vs. the "validated value":

    <polymer-element name="x-foo" attributes="color">
      <template>
        Do you like the color <span style="color:{%raw%}{{validColor}}{%endraw%}">{%raw%}{{validColor}}{%endraw%}</span>?
      </template>
      <script>
        Polymer('x-foo', {
          color: 'red',
          colorChanged: function(inOld) {
            if (this.color.match(/red|orange|yellow/)) {
              this.validColor = this.color;
            } else {
              alert("The color wasn't a hot!");
            }
          }
        });
      </script>
    </polymer-element>

    <x-foo color="orange"></x-foo>

### Can an element `extend` from more than one element or have multiple inheritance? {#multipleextends}

For example `<polymer-element name="my-element" extends="foo bar">`.

No. But {{site.project_title}} may provide a syntax for mixins in the future.

### I don't like package managers, can't I download {{site.project_title}} as a zip? {#bower}

{{site.project_title}} has many different pieces. Creating a one-stop-shop .zip for
all of the different permutations is unwieldy. If you really want a .zip, Github
provides a download link on each project page. However in some cases, you won't get the necessary
dependencies and will need to do this on multiple repositories.

Web components and {{site.project_title}} are intended to be extremely granular.
This is on purpose, to allow users to use exactly what they need and nothing more. In additional to granularity, higher-level components may be composed out of lower-level components. Bower allows us to easily manage those dependencies.

### My components are producing markup with multiple ids of the same name. {#multipleids}

The Shadow DOM polyfill tries hard to mimic native Shadow DOM, in that nodes with the same
`id`s will still be encapsulated.

However, you should avoid using DOM-level id referencing (e.g. `<label for>`) when using
the polyfill. The `id` may not resolve correctly when under the Shadow DOM polyfill.

## Data-binding

### I'm trying to render HTML using data-binding but {{site.project_title}} escapes the content. {#setinnerHTML}

{{site.project_title}} does not stamp unescaped HTML via data-binding because
it becomes a vulnerability for XSS attacks. For those cases where you need to
insert HTML with bindings _after_ your element is created, {{site.project_title}}
supplies the [`injectBoundHTML` method](../docs/polymer/databinding-advanced.html#boundhtml).

You can also use a [property changed watcher](../docs/polymer/polymer.html#change-watchers)
and [automatic node finding](../docs/polymer/polymer.html#automatic-node-finding) to set the
`.innerHTML` of an node:

    <div id="div"></div>

    dataChanged: function() {
      this.$.div.innerHTML = this.data;
    }


When using `<template repeat>`, a similar approach can be taken as suggested in [stackoverflow.com/a/22311788](http://stackoverflow.com/a/22311788).

### How do I use data-binding to repeat an `<option>` or `<tr>`? {#option-tr}

Until the addition of HTML `<template>`, certain elements like `<select>`, `<table>`, and [others](https://github.com/Polymer/TemplateBinding/blob/master/src/TemplateBinding.js#L141:L153) had special parser rules to prevent anything other than `<option>` and `<tr>` from being their children, respectively. Because of these legacy rules, browsers that don't support `<template>` will lift unexpected elements out of context and make them siblings, including `<template>` itself!

For example, the following won't work correctly in browsers that don't support `<template>`:

    <!-- Won't work in browsers that don't support <template>. -->
    <table>
      {%raw%}<template repeat="{{tr in rows}}">{%endraw%}
        <tr><td>...</td></tr>
      </template>
    </table>

The `<template repeat>` is hoisted out and rendered as a sibling:

    <!-- Unsupported browsers make the child <template> a sibling. -->
    {%raw%}<template repeat="{{tr in rows}}">{%endraw%}
      <tr><td>...</td></tr>
    </template>
    <table>
      ...
    </table>

For **browsers that don't support `<template>`**, the [TemplateBinding](../docs/polymer/template.html) [prollyfill](http://prollyfill.org/) has the ability to repeat `<option>` and `<tr>` directly using the `template` attribute:

    <table>
      {%raw%}<tr template repeat="{{tr in rows}}">{%endraw%}
        <td>Hello</td>
      </tr>
    </table>

Another example using`<select>`/`<option>`:

    <polymer-element name="my-select">
      <template>
        <select>
          {%raw%}<option template repeat="{{options}}">{{}}</option>{%endraw%}
        </select>
      </template>
      <script>
        Polymer('my-select', {
          ready: function() { this.options = []; }
        });
      </script>
    </polymer-element>
    <script>
      var select = document.createElement('my-select');
      select.options = ['One', 'Two', 'Three'];
    </script>

If your users are using browsers that don't support `<template>`, use the `template`
attribute on these [special elements](https://github.com/Polymer/TemplateBinding/blob/master/src/TemplateBinding.js#L117).

**Note:** browsers with native support for `<template>` allow it to be a child
of elements `<select>` and `<table>`. If you know your users are using a browser
with support, write your repeaters like this:

    <table>
      {%raw%}<template repeat="{{tr in rows}}">{%endraw%}
        <tr>
          <td>Hello</td>
        </tr>
      </template>
    </table>

### How can I access the current named model instance that in a `<template repeat>`? {#templateinstancemodel}

For example, in a `on-*` handler, you can access the named model instance using: `e.target.templateInstance.model.<property>`:

{%raw%}
    <polymer-element name="x-foo">
      <template>
        <template repeat="{{user in users}}">
          <div on-click="{{clickHandler}}">{{user.name}}</div>
        </template>
      </template>
      <script>
        Polymer('x-foo', {
          clickHandler: function(e, detail, sender) {
            console.log(sender.templateInstance.model.user.name);
          }
        });
      </script>
    </polymer-element>
{%endraw%}

## Can I use `<template>` inside an `<svg>` element? {#templateinsvg}

Sure can. Here's a [demo](http://jsbin.com/EXOWUFu/60/edit).

{%raw%}
    <svg>
      <template repeat="{{l in lights}}">
        <circle cx="100" cy="{{l.cy}}" r="50" fill="{{l.selectedColor}}"/>
      </template>
    </svg>
{%endraw%}

The behavior is similar to templates in non-template browsers in that their content is not inert. For example, scripts will run.

### How quickly are data changes propagated? {#dirtychecking}

If `Object.observe()` is available, data changes happen ~immediately at end of a microtask.
When `Object.observe()` is not supported, {{site.project_title}} uses its polyfill ([observe-js](https://github.com/Polymer/observe-js)) to poll and propagate data-changes throughout the system every 125ms.

Instead of waiting for the next poll interval, one can manually schedule an update
by calling `Platform.flush()`. **There are very few cases where you need to call `Platform.flush()` directly.**

Note: on platforms that support `Object.observe()` natively, `Platform.flush()` does nothing.

## Web Components

### How do I package a bunch of custom elements together? {#packaging}

Use a custom build step that flattens/concatenates everything into a single file,
then use [HTML Imports](../platform/html-imports.html) (`<link rel="import">`) to
bring that file into your app.

Similarly, you could write a build step that inlines any custom element definition
directly into your main app. We've experimented with this basic idea in a
tool we call [Vulcanizer](tooling-strategy.html#vulcanize-build-tool).

### Crawlers understand custom elements? How does SEO work? {#seo}

Because Polymer makes use of polyfills, search engines should treat Polymer-based applications no differently than they do other javascript-based web apps. [In fact, Google's crawler understands JavaScript heavy applications](http://googlewebmastercentral.blogspot.com/2014/05/understanding-web-pages-better.html). Going forward, it is a reasonable assumption that as use of native Shadow DOM increases, search engine providers will try to adapt to understand it, just as they have adapted to other new web technologies in the past.

### Is there a registry of components I can play with? {#registry}

At [http://customelements.io](http://customelements.io), you can find a growing registry of third party components and contribute yours too.

### I get errors when trying to use  `<link rel="import">` with external files. {#externalfiles}

HTML Imports follow the same restrictions as XHR:

1. URLs need to have an `http(s)` protocol. The browser imposes security restriction son what you can do with `file://`.
- The resource needs to be [CORs-enabled](http://www.html5rocks.com/tutorials/cors/) if it is remote to your server.

{%comment%}
### How can I use web fonts or CSS Animations in my custom element? {#fontsanimations}

See "[Making styles global](../docs/polymer/styling.html#making-styles-global)".
{%endcomment%}

### Why does my element claim its `.clientWidth/clientHeight` is 0? {#clientDimenstions}

By default, customs elements are `display: inline`. The fix is to give your element
a default style of `display: block` using `:host`.

    <polymer-element name="my-element">
      <template>
        <style>
          :host { display: block; }
        </style>
        ...
      </template>
      ...
    </polymer-element>
    <script>
    window.addEventListener('polymer-ready', function(e) {
      var element = document.querySelector('my-element');
      // element.clientWidth/clientHeight won't be 0.
    });
    </script>

### How do I access the DOM in a `<content>`? {#accessContentDOM}

For a `<content>`, you can iterate through `content.getDistributedNodes()`
to get the list of nodes distributed at the insertion point.

In {{site.project_title}}, the best place to call this method is in the [`attached()` callback](../docs/polymer/polymer.html#lifecyclemethods) so you're guaranteed that the element is in the DOM tree.

Also remember that you can access the light DOM as the element's normal children
(i.e. `this.children`, or other accessors). The difference with this approach
is that it's the entire set of *potentially* distributed nodes; not those actually distributed.

### Why do elements report zero (light DOM) children at created/ready time? {#zerochildren}

Because of subtle timing issues on element upgrades, it's generally a mistake to attempt to reference an element's children (light dom) in the `created()`, `ready()`, or `attached()` method. When these methods are fired, the element is not guaranteed to be in the DOM or have children. In addition, {{site.project_title}} calls `TemplateBinding.createInstance()` on an element's `<template>` to create its Shadow DOM. This process creates and binds elements in the template one by one.

The best time to take a first look at an element's children is in `domReady()`. This is when the element is in the DOM, has a parent, its possibly children. To observe changes
to light DOM children, [setup a mutation observer](#mutationlightdom).

### When is the best time to access an element's parent node? {#parentnode}

The `attached()` callback is the best time to access an element's parent.
That way, you're guaranteed that the element is in DOM and its parent has been upgraded.

Use the `attached()` and `this.async()` to ensure you're in the next quantum of time (e.g. the DOM has been constructed):

    attached: function() {
      this.async(function() {
        // this.parentNode is upgraded
      });
    }

To manage this dance with more convenience, {{site.project_title}} provides
`domReady()` to do the same thing:

    domReady: function() {
      // same
    }

### How do I monitor changes to light dom children? {#mutationlightdom}

To know when light DOM children are added or removed, setup a Mutation Observer to do so. {{site.project_title}} puts a `onMutation` callback on every element which can be used to
observe a single DOM mutation:

    ready: function() {
      // Observe a single mutation.
      this.onMutation(this, this.childrenUpdated);
    },
    childrenUpdated: function(observer, mutations) {
      mutations.forEach(function(record) {
        console.log(record.addedNodes);
      }.bind(this));
    }

To observe other types of changes, setup your own `MutationObserver` in `ready()`:

    ready: function() {
      var observer = new MutationObserver(function(mutations) {
        ...
      }.bind(this));
      observer.observe(this, {childList: true, attributes: true});
    }

### Can I use the `constructor` attribute without polluting the global namespace? {#constructorattr}

By design, `constructor` puts the constructor's name on `window`. If you don't want
this, there are two options:

1. Don't use the `constructor` attribute. Use `document.createElement()` instead.
2. Use `document.register()` and wrap the constructor it returns in a namespace.

### Does Shadow DOM play nicely with assistive technologies and screen readers? {#accessibility}

**Note:** Steve Faulkner had a [nice writeup](http://blog.paciellogroup.com/2012/07/notes-on-web-components-aria/) on this topic a while back and found that it does. See also Marcy Sutton's more recent "[Accessibility and the Shadow DOM](http://substantial.com/blog/2014/02/05/accessibility-and-the-shadow-dom/)".

A common mis-conception is that the Shadow DOM doesn't play nicely with assistive technologies. The reality is that the Shadow DOM can in fact be traversed and any node with Shadow DOM has a `shadowRoot` property which points to it's shadow document. Most assistive technologies hook directly into the browsers rendering tree, so they just see the fully composed tree.

In fact, if you inspect one of the native HTML elements that use Shadow DOM, `<input type="date">` for example, you'll notice aria attributes inside the tree:

![](/images/ariashadowdom.jpg)

Other types of assistive tools like [Chromevox](http://www.chromevox.com/) will [need to be updated](https://code.google.com/p/chromium/issues/detail?id=96373) to learn how to traverse the Shadow DOM.
There's an ongoing discussion with accessibility experts on how best to integrate Shadow DOM with screen readers and search engines and further progress in this area is likely to come in the future.

### How do I access the `activeElement` inside a {{site.project_title}} element? {#activeelement}

Shadow Roots have their own `activeElement`, which you can access internally as
`shadowRoot.activeElement`.

### Why don't my element's properties/methods autocomplete in the DevTools? {#autocomplete}

This is an artifact of the Shadow DOM polyfill. It creates wrappers around DOM elements
and exposes only the standard DOM APIs (e.g. `querySelector`) on those wrappers. {{site.project_title}} sets up properties on these wrapper objects, not on the actual DOM object. Since the DevTools
only knows about the actual DOM, your element properties won't be seen by the tools.

**Tip:** select a node in the inspector can type `wrap($0)` into the console. You'll
get the wrapped node with all the {{site.project_title}} goodies attached. You can also
use `unwrap()` if you need to go the other direction.
{: .alert .alert-info }

Under native Shadow DOM this isn't an issue. Properties will auto complete in the console.

### What is the behavior of custom elements in a `<template>`? {#intemplate}

Custom elements in templates are like `<script>` and friends--inert. Their definitions are registered but the elements are not upgraded. Upgrading elements in a `<template>` would be a performance penalty.


---

*Special thanks go to GitHub user md_5 who generously donated the {{site.project_title}} organization name.*

---
title: "Roadmap update, part 1: 3.0 and beyond"
---

<!-- toc -->

We're now in the final days of development on Polymer 3.0, which we'll officially release at Google I/O next week. As we approach the 3.0 release, we'd like to zoom out for a big-picture view of our roadmap.

**tl;dr:**



*   Polymer 3.0 is all about moving our project and the web components ecosystem from HTML Imports to ES Modules and from Bower to npm, removing the biggest remaining barriers to mainstream adoption.
*   After 3.0, in keeping with our guiding vision, we'll continue working to make our offerings lighter and more loosely coupled, as exemplified by our next-generation products: lit-html, LitElement and PWA Starter Kit.
*   We'll also remain active in the standards process, pursuing a set of new proposals that, like the original web components specs, seek to advance the state of development on the modern web platform.


## Polymer 3.0

Let's start with a quick overview of Polymer 3.0 itself.

You'll know if you've [been](https://www.polymer-project.org/blog/2017-08-22-npm-modules.html) [following](https://www.polymer-project.org/blog/2018-01-18-polymer-3-new-preview.html) [along](https://www.polymer-project.org/blog/2018-02-26-3.0-preview-paths-and-names.html) that Polymer 3.0 represents a simple but important step forward from Polymer 2.x: we're moving from HTML Imports to ES Modules, and from Bower to npm.

These changes represent a move toward the mainstream, making it easier to use Polymer (and Polymer-based elements) with other popular libraries, frameworks and tools. As we'll discuss below, they also provide a solid foundation for future enhancements.

Like we did for the Polymer 1.x-to-2.0 transition, we've made a smooth upgrade path our top priority for Polymer 3.0. Polymer's API remains almost unchanged, and we'll be providing an upgrade tool ([polymer-modulizer](https://github.com/Polymer/polymer-modulizer)) that will automatically handle most of the work in converting your 2.x-based elements and apps to 3.0.

With the 3.0 release, we'll be updating not just the core Polymer library, but all of the various resources we provide for building elements and apps with web components:



*   The Polymer Elements, like the core library, will be converted to ES Modules and distributed via npm.
*   The Polymer CLI and associated tools will be updated to support developing, testing and deploying projects composed of ES Modules.
*   The Polymer Starter Kit and other app and element templates included with the CLI will be converted to use modules.
*   We'll provide a new loader for the v1 web components polyfills, since the current loader assumes the use of HTML Imports.
*   The element catalog at webcomponents.org will be updated to support elements built with modules and distributed via npm.
*   We'll update our documentation to reflect all of these changes.

In sum, the goal of Polymer 3.0 is to make sure that anyone who has built elements and apps with earlier versions of Polymer (or following patterns and conventions established by Polymer) can easily move forward with us as we start a new chapter.
{.alert .alert-tip}


## What's next?

So, what will that new chapter hold? We see a few major themes...

First, **we see web components becoming increasingly mainstream**—they'll be natively supported in three of the four major browsers by year's end and are enjoying unprecedented support from other libraries, frameworks and tools. We'll keep working to eliminate barriers to adoption, as exemplified by our current effort to help the web components ecosystem move to ES Modules and npm.

At the same time, **we see our own offerings becoming lighter and more loosely coupled**. Since day one, our guiding vision has been: make it simpler to develop web components, while adding minimal weight. Along the way, we've made compromises, increasing the size and scope of the library in the interest of performance or developer productivity. Our next offerings will swing back toward that guiding vision.

Finally, with the core web components standards firmly established, **we see opportunities to help shape and advocate for a new generation of related standards**—standards that will bring improvements to styling and theming, templating, and loading, among other things.

Let's take a closer look at how these themes will manifest in our roadmap. There are still some open questions—names and details are subject to change—but the sections below should give you a good idea of where we're headed.


### Libraries

In Polymer 2.0, we did some significant refactoring, decomposing the core library into a set of layered mixins. While it's still easy to adopt the library as a whole, developers can now define lighter-weight base classes incorporating only the layers they need.

After the Polymer 3.0 release, we'll be proceeding further down this path toward smaller and more loosely coupled units of functionality. Specifically, we'll:



*   Ship a tiny new foundation library, focused solely on streamlining the management of an element's properties and attributes. It won't offer any functionality for creating and updating DOM; rather, it's intended to be paired with an opinionated rendering or templating system.
*   Pair this new foundation library with [lit-html](https://github.com/Polymer/lit-html) (the standalone templating library we introduced last year) to provide an ultra-light, highly performant base class (currently previewed as [LitElement](https://github.com/PolymerLabs/lit-element)) with a simple but expressive API. With lit-html and LitElement headed for 1.0 releases in the coming months, LitElement is our recommended base class for new development.
*   Maintain the full Polymer 3.x API surface (including the templating and data system from Polymer 1.x - 3.x) in a separate library, built on the same new foundation. We won't do new feature development on this "classic" library, but we'll provide maintenance releases to meet the needs of existing apps and elements. We'll also offer guidance and support for developers who want to migrate apps and elements from the classic base classes to LitElement—see the [FAQ](2018-05-02-roadmap-faq) for more on this.


### App toolbox

Along with these changes to our library lineup, we'll be revamping our toolbox for building apps and relaunching it as [PWA Starter Kit](https://github.com/Polymer/pwa-starter-kit).

If you've followed the last two Polymer Summits or engaged with us online, you'll know that we've become strong proponents of unidirectional data flow and centralized state management for applications. PWA Starter Kit will provide out-of-the-box support for this model, incorporating the popular [Redux](https://redux.js.org/) library, integrating it simply and cleanly with a web components view layer based on LitElement, and making it easy to factor your Redux code for efficient loading via the [PRPL pattern](https://developers.google.com/web/fundamentals/performance/prpl-pattern/).

PWA Starter Kit will also feature updated samples, templates, and an all-new set of docs. Like LitElement, PWA Starter Kit is still in development, but it's available to try out today and rapidly firming into shape.


### Elements

A few months ago, we blogged about our [future plans for elements](https://www.polymer-project.org/blog/2017-11-27-future-of-elements.html)—specifically, why we weren't updating the existing Polymer Elements to canonical, class-based Polymer 2.0 syntax, and what we intended to do instead.

In short, our elements were overdue for a rewrite, and it made more sense for us to invest our limited resources in a next-generation element set. That's still true today, but our plans have evolved and we can provide a bit more detail.

To replace our current paper-elements collection, we'll be collaborating with Google's Material Design Components team, whose charter is to provide performant, spec-compliant implementations of Material Design components for multiple platforms. By leveraging their base web implementation, we believe we'll be able to offer developers a better product—an actively maintained set of [Material Web Components](https://github.com/material-components/material-components-web-components) that closely tracks the Material Design spec.

Beyond the Material Web Components, we'll scale back significantly on our own element lineup. We'll continue to develop a small set of elements (including components for responsive layout and infinite lists), but in the spirit of teaching developers to fish, we'll turn more of our attention toward documenting best practices for building and distributing reusable elements.

To ensure exposure and distribution for the growing catalog of community-built elements, we'll continue to maintain and invest in [webcomponents.org](https://www.webcomponents.org/).


### Tools

We've come to a crossroads with respect to our tools efforts, and we're not yet sure which direction we'll go from here.

With our move from HTML Imports to ES Modules, much of the historical need for maintaining our own toolchain has melted away; it will now be easy to use our offerings with popular third-party tools like Webpack and Rollup.

But with our tools updated to support ES Modules, they work for a much broader range of projects, including projects that don't use our libraries or elements. While we respect and appreciate today's mainstream tools, we'd also like to see our platform-centric approach to web tools adopted more widely.

This topic deserves a post of its own; in the coming months we'll be thoughtfully weighing our options for tools in the post-Polymer-3.0 era, and we'll welcome your input as we do so.


### Polyfills

The Polymer team has long been responsible for producing web components polyfills: designing and developing them, optimizing their performance, and updating them as the specs evolve and browser support progresses.


We look forward to a day in the not-too-distant future when the core web components polyfills become obsolete; until then, we'll continue maintaining them. Where applicable, we'll also develop polyfills (and/or tool support) for the new standards we invest in.


### Standards

In addition to our ongoing product development work, we are helping to define and/or advocating for a number of emerging standards. We believe each of these has the potential to push the web platform and ecosystem forward in ways that benefit users and developers alike.



*   **CSS Shadow Parts** ([draft spec](https://drafts.csswg.org/css-shadow-parts/), [explainer](https://meowni.ca/posts/part-theme-explainer/)) will make it easier to style and theme web components—see Monica's explainer to learn more.
*   **Scoped Custom Element Registries** ([proposal](https://github.com/w3c/webcomponents/issues/716)) would allow a custom element definition to be scoped to a subset of the DOM tree, rather than apply to the page's global scope. This would help to avoid conflicts in larger apps.
*   **HTML Template Instantiation** ([proposal](https://github.com/w3c/webcomponents/blob/gh-pages/proposals/Template-Instantiation.md), [discussion](https://github.com/w3c/webcomponents/issues?utf8=%E2%9C%93&q=is%3Aissue+is%3Aopen+%22%5BTemplate+Instantiation%5D%22)) aims to provide enhanced built-in support for creating and dynamically updating instances of HTML Templates. The proposal's central concepts are shared by lit-html, which was written in anticipation of such a feature, and we've been working actively to help refine and advance the proposal.
*   **HTML Modules** ([proposal](https://github.com/w3c/webcomponents/issues/645#issuecomment-343601237), [discussion](https://github.com/w3c/webcomponents/issues?q=is%3Aissue+is%3Aopen+html+modules+label%3Amodules)) would provide native support for loading modular HTML content—much as HTML Imports did, but in a manner that would integrate seamlessly with ES Modules.
*   **Package Name Maps** ([proposal](https://github.com/domenic/package-name-maps), [discussion](https://github.com/domenic/package-name-maps/issues)) would enable the browser's native module loader to import ES Modules specified by package name (e.g. `import LitElement from lit-element;`). This pattern is dominant in today's JavaScript package ecosystem, but modules written this way can't currently be loaded in the browser unless bundled or rewritten to replace package-name specifiers with full paths.


## Moving forward

This is an exciting time for web components and the Polymer project. Six years after the ideas behind web components were first discussed in public, those ideas have largely come to fruition: the web platform now has an extensible, native component model with widespread browser support and steadily increasing adoption.

We look forward to helping web components continue their transition from future-facing to mainstream, and to setting our sights on what lies beyond. We'll have more to say about all of the above at Google I/O: Kevin Schaaf and Steve Orvell will team up for a [project-level overview](https://events.google.com/io/schedule/?section=may-9&sid=b3c00fca-0b53-41ea-b3c8-bf3769d47b70), Monica Dinculescu will [introduce PWA Starter Kit](https://events.google.com/io/schedule/?section=may-9&sid=cf302209-4151-4c6b-8590-7243d2c6c3c3), and we'll be hanging out at the web sandbox throughout the event.

Thank you for joining us on this journey. We'd love to hear what you think—come find us on Slack, and if you'll be at Google I/O, be sure to drop by and say hello!

For answers to frequently-asked-questions, read on:

<a href="2018-05-02-roadmap-faq" class="blue-button">Roadmap update, part two: FAQ</a>
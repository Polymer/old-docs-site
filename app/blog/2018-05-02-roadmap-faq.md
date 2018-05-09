---
title: "Roadmap update, part 2: FAQ"
---

<style>
b.qa {
    color: #1e88e5;
    font-weight: bold;
}
</style>

<!-- toc -->

This frequently-asked-questions is a follow-up to our May 2018 [Roadmap update](/blog/2018-05-02-roadmap-update).

### Polymer 3.0 or LitElement?

<b class="qa">Q:</b> <i>I'm starting a new project. Should I use Polymer 3.0 or LitElement?</i>

<b class="qa">A:</b> For new projects, we suggest that you use LitElement (and if your project is an app, PWA Starter Kit, which incorporates LitElement).

While lit-html, LitElement and PWA Starter Kit are still in development, they're on the fast track to 1.0 releases, and they represent the future direction of the Polymer project.

If your project has a short development cycle and you're uncomfortable with including pre-release dependencies in your production deployments, you might choose to use Polymer 3.0 instead. This is a safe choice, as we'll continue to support the Polymer 3.x APIs with maintenance releases for the foreseeable future.


### Should I update to Polymer 3.0?

<b class="qa">Q:</b> <i>Should I update my existing app or element to use Polymer 3.0?</i>

<b class="qa">A:</b> Yes, we recommend that you update existing apps and elements to use Polymer 3.0. Doing so will open up a world of mainstream libraries and development tools for you to choose from, and publishing your reusable elements to npm will greatly increase the size of your potential user base.

The upgrade process is mechanical, and polymer-modulizer can do most of the work for you. Once you've updated to Polymer 3.0 (and adopted ES Modules and npm), you can migrate to LitElement as your needs dictate, and at your own pace (see the next question).

Exceptions to this rule might be small projects that can easily be reimplemented using LitElement (skipping Polymer 3.0), or large projects that are no longer being actively developed (which you may choose to leave on Polymer 2.x). 


### How do I upgrade to LitElement?

<b class="qa">Q:</b> <i>What is the upgrade path from Polymer 1.x - 3.x to LitElement?</i>

<b class="qa">A:</b> Unlike the migration from Polymer 2.x to Polymer 3.0, the path to adopting LitElement is not formulaic – it will depend on how your element or app is currently implemented.

That said, it's not necessarily hard. First, thanks to the inherent interoperability of web components, you can upgrade your app or element collection one piece at a time; elements you've built with or upgraded to LitElement can sit alongside and interact with elements you've built using previous versions of the Polymer library.

Elements and apps you've built following the basic precepts of unidirectional data flow (e.g., data flowing from above via one-way bindings) should also be straightforward (though not mechanical) to migrate.

The biggest migration challenges will be for apps that have leaned heavily on two-way bindings, distributing app logic and responsibility for data mutations across many components. Apps like these will need to be rethought with unidirectional data flow in mind.

As we move LitElement out of preview and toward a 1.0 release, we'll provide more guidance and support for developers migrating from Polymer 1.x - 3.x.


### Dependencies not in ES modules/npm?

<b class="qa">Q:</b> <i>I want to adopt Polymer 3.0 or LitElement, but my app depends on third-party web components that haven't yet moved to ES Modules and npm. What do I do?</i>

<b class="qa">A:</b> Contact the developers of your dependencies and let them know that you'd like them to make their web components available as ES Modules in packages on npm. Developers of many popular web components have already begun doing so; notably, the latest versions of Vaadin's core components are already [available on npm](https://www.npmjs.com/search?q=%40vaadin).

If you use third-party components whose authors are unresponsive or aren't planning to update, you have a couple of choices: you can replace these components with alternatives, or you can fork them and update them yourself (using polymer-modulizer).


### Dependencies not compatible with the native module loader?

<b class="qa">Q:</b> <i>I want my ES Module-based app to utilize the browser's native module loader, but some of the npm packages I'd like to use aren't distributed in a form that's compatible with the native loader. What do I do?</i>

<b class="qa">A:</b> With ES Module support having landed in all of the major browsers and coming to node.js, the proportion of npm packages distributed in browser-loadable ES Module form is growing. We're working actively to promote this practice, with our contribution to the Package Name Map proposal being one example. You can expect us to talk more about this going forward.

That said, many npm packages that might be useful in the browser are still distributed such that they can't be loaded directly in the browser – they may be in the older CommonJS format, or they may use future JavaScript features that aren't yet supported in browsers. If you want to use such a package, we encourage you to file an issue for the package author, asking that they support the browser's native module loader.

Meanwhile, the easiest way to use these packages today is to use a tool like Webpack or Rollup that can bundle heterogeneous modules and compile out unsupported language features as needed.

### What about declarative HTML templates?

<b class="qa">Q:</b> <i>I like writing templates using declarative HTML syntax. What do I do?</i>

<b class="qa">A:</b> This question has a near-term answer and a longer-term answer.

For the near term, Polymer 3.0 still supports exactly the same declarative template syntax as Polymer 1.x and 2.x (albeit within JavaScript template literals). So will the "classic" library that we'll release and maintain post-3.0, so you can continue writing templates this way if you like, with the important caveat that this codebase won't see active development going forward.

For the longer term, we aren't giving up on the promise of declarative HTML templates. Our work on the HTML Modules spec reflects this, as does our choice to factor our lowest-common-denominator base class into a standalone library that doesn't have an opinion on templating. It's too early to say anything concrete, but we can imagine a future in which we offer a new alternative to LitElement that opts for declarative HTML templates.

Further, the HTML Template Instantiation proposal is well suited to provide native support for both JavaScript-based templating approaches (like lit-html) and purely declarative HTML-based approaches. We're keeping both in mind as we work to advance the proposal.


### What about .html files?

<b class="qa">Q:</b> <i>I like declarative HTML templates AND I want to keep writing them in .html files. What do I do?</i>

<b class="qa">A:</b> This one also has two answers.

For the near term, we'll provide guidance and support for developers who want to write templates in .html files for use with Polymer 3.0 and the forthcoming "classic" library. The approach we have in mind will require the use of at least lightweight tools during development, which means that won't be able to run your element or app source directly in the browser if you opt to write your templates in .html files.

Longer term, the HTML Modules proposal aims to provide a tool-free solution for the declarative HTML template use case.


### Why not wait for HTML Modules?

<b class="qa">Q:</b> <i>Why don't you keep using HTML Imports until HTML Modules or another suitable replacement is available?</i>

<b class="qa">A:</b> With Custom Elements, Shadow DOM and HTML Templates all reaching critical mass in terms of browser support and web components enjoying a surge of interest, we believe the best thing we can do to bolster future prospects is to remove remaining barriers to adoption.

Sadly, HTML Imports had become the largest such barrier, requiring the continued use of polyfills in browsers that otherwise no longer required any, dictating the use of specialized build tools and making it difficult to distribute reusable elements in a form that mainstream developers could easily consume.

These problems are solved by moving to ES Modules while we continue working through the standards process to land first-class native support for loading modular HTML.


### Can I keep using the Polymer data system?

<b class="qa">Q:</b> <i>I like Polymer's data system, with features like observers, computed properties and two-way bindings. What do I do?</i>

<b class="qa">A:</b> Like the "classic" declarative template syntax, these are features that you can continue using, provided you understand that they won't see active development going forward.

That said, we strongly encourage you to adopt LitElement and its simpler approach to data-driven views, based on unidirectional data flow and the functional mapping of application state to UI.

The Polymer data system was the spiritual successor to a would-be spec called Model Driven Views (MDV). Based on concepts that were popular in user-space frameworks and libraries at the time, MDV was conceived along with the core web components specs, recognizing that the low-level primitives supplied by the core specs didn't provide an ergonomic, out-of-the-box way to bind data to views.

When work on MDV was halted to focus on landing the core web components specs, its functionality was pulled into the Polymer library. While the Polymer data system has proven to be powerful and performant, it has undoubtedly added significant complexity and weight to the library. When not used carefully, it has also contributed to frustrating complexity in developers' elements and apps.

In all, we don't believe that the virtues of the Polymer data system continue to justify its size and complexity, especially given our guiding vision of providing solutions that are light and close to the platform.

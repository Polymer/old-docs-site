---
title:  "Polymer 3.0 preview: npm and ES6 Modules"
---



Today at the 2017 Polymer Summit in Copenhagen, we announced one of the biggest changes to our developer workflow in the project's history. Actually, it's *two* changes:



*   Polymer is moving from Bower to npm.
*   We're switching to using ES6 modules instead of HTML Imports.

We're currently previewing these changes—which will be included in the next major version of Polymer—so we can get feedback, and continue working on them in public. By all means, experiment with the preview. For production work, continue using the existing Polymer 1.x or 2.x library you're using today. If you're starting a new project today, we recommend using Polymer 2.x.

While these changes are significant, **nearly all of the Polymer API stays the same**. All of the classes, mixins, elements, template system, and other APIs that are a part of Polymer 2.x have been ported to modules, including the Polymer 1.x legacy syntax. All of the knowledge that Polymer developers have will translate directly to the new releases.

Today's post describes our reasoning behind the change, and the next steps that need to happen before a stable release. Tomorrow, we'll get you started working hands-on with the preview code.


## Why are we switching to NPM and ES6 modules?

Since the early days of Polymer, we've used Bower and HTML Imports to manage dependencies: Bower to install dependencies, and HTML Imports to load them.

These technologies have worked great for people using pure Polymer, but they've put us outside the mainstream of web development, and made it hard for people working with other frameworks or build tools.

On the other hand, moving to ES6 modules and npm has several advantages:



*   Polymer becomes even more compatible with the workflow and tools that a huge number of JavaScript developers are familiar with.
*   Polymer applications can run *without any polyfills* on recent versions of Chrome, Opera, *and Safari*. When Edge and Firefox ship custom elements and shadow DOM, Polymer will run polyfill-free on those browsers, too.
*   You can work with regular JavaScript libraries more easily, whether you're importing a Polymer element into a library, or using a libraries inside an element.

The following sections describe these changes in more depth.


## HTML Imports ➙ ES6 Modules

Since the beginning, Polymer has used HTML imports to load dependencies. HTML Imports have a lot of benefits that we like:



*   Web-native loading mechanism. No build tools are required to load code using HTML imports (but it only works natively on Chrome).
*   Transitive loading of dependencies with ordered evaluation. That is, if A imports B, and B imports C, C and B are loaded and evaluated before A.
*   Deduplication of dependencies by URL. Each import is downloaded and evaluated only once, even if imported multiple times.
*   Native HTML parsing.

But HTML Imports have not gotten traction among the standards committees or other browsers. There are active discussions on a successor, but any new standard would be years away.

Enter ES6 modules. The ECMAScript 2015 standard (also known as ECMAScript 6 or ES6) introduced a native module and module loading system for JavaScript, which is finally getting support in all major browsers. They're supported in Safari, Chrome, and behind flags in Firefox and Edge.

ES6 modules allow JavaScript files to import other files, causing them to be loaded and executed by the browser.  The loading behavior of ES6 modules is nearly identical to HTML Imports:



*   Web-native loading mechanism.
*   Transitive loading of dependencies with ordered evaluation.
*   Deduplication of dependencies by URL.
*   (But no native parsing of HTML.)

We've always intended for Polymer's reliance on polyfills to go away over time as the web component standards are implemented by all browsers. We were extremely excited when Safari implemented Shadow DOM and Custom Elements. But with HTML Imports stalled, we need to do what's best for our developers and their users.


## Bower ➙ npm

Like HTML Imports, Bower has been with us for a long time. Bower's flat dependency tree is ideal for front-end projects. But Bower has never been as widely adopted as npm, and while it's still maintained, it's no longer being actively developed.

Moving to npm will make Polymer packages seamlessly available to the millions of npm users, and allow Polymer packages to easily use other packages from the massive npm ecosystem.

This has been a long requested feature, but we've been waiting until we had good solutions for supporting flat installs of modules and keeping Bower and npm packages in sync.

The Yarn npm client provides support for flat installs, which solves our #1 issue with npm.

After considering a number of approaches to keeping Bower and npm packages in sync, we concluded that maintaining parallel versions was impractical. So we're making a clean break at 3.x and moving to npm exclusively.


## When will this happen?

You can preview the new version of the library and elements now, but there are still a number of pieces that need to come together to make a full, production release.

Right now, we have:



*   Working versions of the Polymer core library and elements published to npm.
*   A tool for converting Bower and HTML Imports-based projects to npm and JavaScript modules.
*   Support for npm modules in `polymer serve`.

We need a few more things to come together before we release a stable version of Polymer on npm:



*   At least one browser shipping full support for modules, including dynamic imports. (Safari 10.1 and Chrome 61 already support modules, but not dynamic imports).
*   We need to do more comprehensive performance testing—native module support is very new in Chrome and Safari, and relatively untried.
*   We need to complete Polymer tooling for modules and npm.
*   We need to write documentation, samples, templates, and all that good stuff.


## What next?

If you're feeling brave, we'd love to have your feedback on the current preview.

Tune in tomorrow to get hands-on with the Polymer 3.0 preview!

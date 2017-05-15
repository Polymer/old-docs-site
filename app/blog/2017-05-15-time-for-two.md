---
title: Time for 2.0
---

**Polymer 2.0** has landed. Our freshest cut of the **Polymer CLI** is ready for download, our **Docs** include all the latest 2.0 guidance and upgrade tips, and our **Elements** have been ported to Hybrid mode to be used in both 1.0- and 2.0-based applications.

We've also made sure to bring all of our most popular resources along with us. We've upgraded our News and Shop demos - Progressive Web Apps built with Polymer and showcasing our best-practices - to use 2.0 App Toolbox elements, our Start tutorials now teach developers how to build [2.0 elements](/2.0/start/first-element/intro) and [applications](/2.0/start/toolbox/set-up), and our Starter Kit will now generates a 2.0-based PWA template.

## Polymer Release 2.0.0

Built on the fundamental goals of using **native web platform features**, improving **interoperability**, and providing a **smooth migration path**, the Polymer 2.0 library is a great support system for developing web components.

One of the most exciting features of Polymer 2.0 is support for ES6 class-based syntax, so web components built with Polymer look essentially native. Web Component support in the platform has advanced quite a bit in the last year, with Safari shipping native implementations of both Shadow DOM and Custom Elements v1. As the platform advances, our polyfills shrink. The new polyfills are also modular, so you can send each browser only the polyfills it needs

The advancements within the platform and modularity of our polyfills and mixins are what contribute to our incredibly lightweight core at just 11k. All of those things together help make elements built with Polymer 2.0 much more interoperable, so they'll "just work" in many popular JS frameworks.

## Polymer CLI

The Polymer CLI, the multi-tool of web component development, has also had a major version advancement, launching version 1.0.0 today.

The Polymer CLI has been outfitted with the brand new Polymer Analyzer - a static analyzer for the web - which scans your entire project and understands its structure. Based on your code the analyzer knows what components you define and use, so the CLI can give you useful diagnostics, compile your entire application from ES6 to ES5 for older browsers, intelligently optimize and bundle your app for lightning-fast loading, and more, all with minimal configuration.

Version 1.0 of the CLI adds templates and starter kits for Polymer 2.0 and a new linter that understands the new syntax and features of Custom Elements v1 and Polymer 2.0.

## Elements

In sync with the library and tooling releases, our catalog of elements is now available in hybrid mode, which means they work in both 1.0 and 2.0 based applications! If your application is built fully with off-the-shelf Polymer elements, upgrading to 2.0 is as simple as changing the dependencies in your bower.json file.

Beyond upgrading our catalog, we've even added some **brand new [app-media](https://github.com/polymerelements/app-media) elements** due to popular demand.  The app-media elements are built using the latest web media APIs and enable you to capture and process video, photo, and audio content client-side, making building media-rich PWA experiences much simpler.

With the 2.0 library advancements, lots of convenient ES6 features are now available to you. You can make new components that inherit from our elements and use plain ES6 class-based syntax instead of the Polymer factory method.

## Stay tuned for I/O

All of this news comes at a very exciting time—I/O is in just 2 days! We'll have 3 talks deep-diving on various areas of the Polymer Project. We will give an overview of all of the Polymer Project's latest and greatest advancements, including some new announcements at our [Polymer Keynote on Day 1](https://events.google.com/io/schedule/?section=may-17&sid=7b0b4c44-8121-4d87-9149-2fe61ff77e9d). Justin Fagnani-Bell, Tech Lead on the Tools team will speak about [developer tooling for web components](https://events.google.com/io/schedule/?section=may-18&sid=5869a78a-fb7f-4e98-8951-ea6f7ebb3649), and Monica Dinculescu will be sharing tips, tricks, and best practices for [building web components with Polymer 2.0](https://events.google.com/io/schedule/?section=may-18&sid=861c6857-57e9-4a25-9800-0a788f99193a).

We're also working on a fresh fleet of codelabs, a large presence at the I/O Web Sandbox, and an even more exciting Polymon-related surprise. We're looking forward to sharing it all with you either over the livestream or in person. Please come by or shoot us a tweet to share your thoughts and say hello!

<a class="blue-button" href="/2.0/docs/about_20">What's new in 2.0</a>
<a class="blue-button" href="/2.0/docs/upgrade">Upgrade to 2.0</a>

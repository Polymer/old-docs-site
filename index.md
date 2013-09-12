---
layout: default
#title: Welcome
---

<style>
h2 {
  margin: 30px 0;
}
</style>

{% include alpha.html %}

## What is {{site.project_title}}?

{{site.project_title}} is a new type of library for the web, built on top of Web Components,
and designed to leverage the evolving web platform on modern browsers.
{: .lead }

{% include downloadbutton.html %}

<figure id="architecture-diagram">
  <iframe src="/images/architecture-diagram.svg?{{'now' | date: "%Y%m%d"}}"></iframe>
  <figcaption><a href="/images/architecture-diagram.svg">Architectural diagram</a></figcaption>
</figure>

- <i class="icon-cogs icon-3x pull-left foundation"></i> A set of _polyfills_ for emerging web platform features. Initially, these core features are enabled as polyfills but go away
over time as browsers implement them.
- <i class="icon-beaker icon-3x pull-left core"></i> A next-generation _web application framework_ built upon these core technologies.
- <i class="icon-puzzle-piece icon-3x pull-left elements"></i> A set of _comprehensive UI and utility components_ for building web applications.
{: id="what-is" }

## Quick start

1. Download the latest .zip from above or [get the code](/getting-the-code.html).
2. **Fire up a web server**. Include `<script src="polymer.min.js"></script>` in your page.
3. Read the [Getting Started](/getting-started.html) guide.
4. Learn how to soup-up your web components using the [Polymer core](/polymer.html).
5. Play with the [polymer-elements](https://github.com/Polymer/polymer-elements), [polymer-ui-elements](https://github.com/Polymer/polymer-ui-elements), and [toolkit-ui](https://github.com/Polymer/toolkit-ui).

_Join the [mailing list](/discuss.html). Ask questions and give feedback!_

## Guiding principles

<div class="centered" style="margin:20px;"><iframe id="video" src="http://www.youtube.com/embed/videoseries?list=PLRAVCSU_HVYu-zlRaqArF8Ytwz1jlMOIM" frameborder="0" allowfullscreen></iframe>
</div>

The overall aim of {{site.project_title}} is to manage the complexity of building web applications.

**Use the platform** —  Use as much or as little of the framework as you wish. An application can choose to load `platform.js` for just the polyfills or use `polymer.js` to give web components extra batteries. We call these types of elements ["{{site.project_title}} elements"](/polymer.html).

**Everything is an element** — Encapsulation is the key to creating scalable, maintainable applications. All {{site.project_title}} resources are components, even ones that are non-visual. To construct an app, a developer creates new components, or uses ones {{site.project_title}} provides, and assembles them together. Focusing on individual, composable building blocks allows developers to "think locally" about their application, reducing complexity. With this divide-and-conquer approach, applications can simultaneously be simple and arbitrarily complicated.

**Eliminate boilerplate** — Developers should write the **minimum** amount of code possible to create their application. Anything repetitive should be re-factored into a component, handled by {{site.project_title}} itself, or added into the browser platform itself. {{site.project_title}} provides simple syntax without reducing features, and avoids boilerplate wherever possible.


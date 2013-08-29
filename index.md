---
layout: default
#title: Welcome

load_polymer: true
---

{% include alpha.html %}

{{site.project_title}} is a new type of library for the web, built on top of Web Components,
and designed to leverage the evolving web platform on modern browsers.
{: .lead }

{% include downloadbutton.html %}

<div class="centered"><iframe id="video" src="http://www.youtube.com/embed/videoseries?list=PLRAVCSU_HVYu-zlRaqArF8Ytwz1jlMOIM" frameborder="0" allowfullscreen></iframe>
</div>

## Quick start

1. Download the latest .zip bundle from the link above. If you want to use Git, see [Getting the code](/getting-the-code.html).
2. **Fire up a web server** in your app's directory.
3. Include `polymer.min.js` (bundled with the release) in your main page:

        <script src="polymer.min.js"></script>

4. Read the [Getting Started](/getting-started.html) guide.
5. Learn how to soup-up your web components using the [Polymer core](/polymer.html).
6. Play with the [polymer-elements](https://github.com/Polymer/polymer-elements), [polymer-ui-elements](https://github.com/Polymer/polymer-ui-elements), and [toolkit-ui](https://github.com/Polymer/toolkit-ui) (*also must be run from a web server)*.
7. Join the [mailing list](/discuss.html)! Ask questions and give feedback.

## What is {{site.project_title}}?
{: style="clear:both" }

{{site.project_title}} comprises two efforts:

- A set of polyfills for emerging web platform features ([Shadow DOM](/platform/shadow-dom.html),
[Custom Elements](/platform/custom-elements.html), [HTML Imports](/platform/html-imports.html)).
Initially, these core features are enabled as polyfills. As browsers
implement these new primitives, the polyfill platform layer becomes smaller and better over time.
- A next-generation web application framework built upon these core technologies called the **_{{site.project_title}}_**.

The architectural stack looks like this:

<figure id="architecture-diagram">
  <!-- <img src="/images/architecture-diagram.svg" alt="Architecture Diagram" titld="Architecture Diagram"> -->
  <iframe src="/images/architecture-diagram.svg?{{'now' | date: "%Y%m%d"}}"></iframe>
  <figcaption>Architectural Diagram</figcaption>
</figure>

## Guiding principles

The overall aim of {{site.project_title}} is to manage the complexity of building web applications. Our principles are:

**Everything is a component** — Encapsulation is the key to creating scalable, maintainable applications. All {{site.project_title}} resources are components, even ones that are non-visual. To construct an app, a developer creates new components, or uses ones {{site.project_title}} provides, and assembles them together. Focusing on individual, composable building blocks allows developers to "think locally" about their application, reducing complexity. With this divide-and-conquer approach, applications can simultaneously be simple and arbitrarily complicated.

**Extreme pragmatism** — Developers should write the **minimum** amount of code possible to create their application. Anything repetitive should be re-factored into a component, handled by {{site.project_title}} itself, or added into the browser platform itself. {{site.project_title}} provides simple syntax without reducing features, and avoids boilerplate wherever possible.

**Salt to taste** —  Use as much or as little of the framework as you wish. An application can choose to load `platform.js` for just the polyfills or use `polymer.js` to give web components extra batteries. We call these types of elements ["{{site.project_title}} elements"](/polymer.html).


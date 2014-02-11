---
layout: default
type: resources
shortname: Resources
title: Tools & Testing
---

## Build status

If something seems terrible wrong, check out {{site.project_title}}'s [build status page](/build/).

## Vulcanize build tool

> Vulcanization is process that turns polymers into more durable materials.

[Vulcanize](https://github.com/Polymer/vulcanize) is a tool to concatenate a set of web components into a single file. It's our current recommendation for a "build step". Read more about it in "[Concatenating Web Components with Vulcanize](/articles/concatenating-web-components.html)".

## Debugging Shadow DOM

In Chrome, native Shadow DOM is not inspectable. That is, you can't use the DevTools
to drill down into a Shadow Root. 

To be able to inspect Shadow DOM, turn on "Show Shadow DOM" in the DevTools general settings:

![Enable "Show Shadow DOM" in the Devtools](/images/showshadowdom.png 'Enable "Show Shadow DOM" in the Devtools')

After reloading the DevTools, Shadow DOM is inspectable and renders as `#document-fragment`s in the tree.

## Source maps

{{site.project_title}}  polyfills the [HTML Imports](/platform/html-imports.html) specification. In order for code to be debuggable at run-time, scripts embedded in components are injected into `<head>` in the main document. Tools/browsers that support [source maps](http://www.html5rocks.com/en/tutorials/developertools/sourcemaps/) will identify these scripts as belonging to their source components.

## Minification, Testing, and Documentation

To run tests, build minified files, or build documentation you need `node` and
`grunt-cli` on your system.

* install [NodeJS](http://nodejs.org) using the instructions on their website
* use `npm` to install the [GruntJS](http://gruntjs.com) task runner for the command-line
  
    npm install -g grunt-cli

Now for any repository in which you want to use tools, install the Node dependencies
and use Grunt to perform tasks. In the project's root folder (e.g. `<somepath>/platform/`), run:

    npm install

### Tasks

Once things are installed, you may run the tests or use `grunt` to perform tasks.

Build minified project files (default):

    grunt

Build documentation:

    grunt docs
    
Run tests:

    grunt test


## Development workflow & tooling

We are currently in the early stages of investigating modern front-end tooling for projects built with {{site.project_title}}. This includes using [Yeoman](http://yeoman.io) for scaffolding out {{site.project_title}} elements, [Grunt](http://gruntjs.com) for building and optimizing projects and [Bower](http://bower.io) for component dependency management.

While our work in this area is just beginning, take a look at the potential workflow:

<div class="centered" style="margin:20px;"><iframe id="video" src="http://www.youtube.com/embed/EwQkyplZHDY" frameborder="0" allowfullscreen></iframe>
</div>

The [{{site.project_title}} + Grunt](https://github.com/addyosmani/polymer-grunt-example) proof-of-concept project is a good start. Also follow our work on [generator-polymer](https://github.com/yeoman/generator-polymer/).

We hope to announce more stable support for these projects in the near future.


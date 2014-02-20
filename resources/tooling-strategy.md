---
layout: default
type: resources
navgroup: resources
shortname: Resources
title: Tools & Testing
---

{% include toc.html %}

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

After reloading the DevTools, Shadow DOM is inspectable and renders as `#shadow-root`s in the tree.

## Source maps

{{site.project_title}}  polyfills the [HTML Imports](/platform/html-imports.html) specification. In order for code to be debuggable at run-time, scripts embedded in components are injected into `<head>` in the main document. Tools/browsers that support [source maps](http://www.html5rocks.com/en/tutorials/developertools/sourcemaps/) will identify these scripts as belonging to their source components.

## Minification, Testing, and Documentation

To run tests, build minified files, or build documentation you need `node` and
`grunt-cli` on your system.

* install [NodeJS](http://nodejs.org) using the instructions on their website
* use `npm` to install the [GruntJS](http://gruntjs.com) task runner for the command-line
  
      npm install -g grunt-cli

Now for any repository in which you want to use tools, install the Node dependencies
and use Grunt to perform tasks. In the project's root folder (e.g. `<somepath>/platform-dev/`), run:

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

## Using git {#git}

**Note:** This section is for advanced users who want to hack on Polymer or submit a pull request. If you just want to use Polymer in a project we recommend using Bower. Please follow our guide at [Getting the Code](http://localhost:8080/getting-the-code.html).
{: .alert .alert-error}

### Clone the project {#clone}

You can clone {{site.project_title}}'s important repositories
by running our `pull-all.sh` script:

    mkdir polymer_local; cd polymer_local
    git clone https://github.com/Polymer/tools.git
    ./tools/bin/pull-all.sh

<!-- <p class="centered"><a href="/tools/pull-all.sh" target="_blank" class="btn btn-success" alt="Download pull-all.sh" title="Download pull-all.sh"><i class="icon-white icon-download"></i> Download pull-all.sh</a></p>
 -->

Go grab a coffee. This takes a few minutes!

`pull-all.sh` is great for hacking on the code or if you want the individual polyfill repositories. It creates two directories, `components/` and `projects/`, and checks out a number of sibling repositories to each folder.

**components/**

- *components/platform/platform.js* — The platform shims and polyfills.
- *components/polymer/polymer.js* — [{{site.project_title}} core](/docs/polymer/polymer.html)
- *components/polymer-elements/* — A folder of the meta collection of the core utility elements.
- *components/polymer-ui-elements/* — A folder of the meta collection of the UI elements.
- A directory for each polyfill repo (CustomElements, HTMLImports, ShadowDOM).

**projects/**

Full and sample applications.

### Test your environment {#testgit}

To check that your development environment is ready, try running the playground tool:

    cd projects/designer
    bower install

Start a web server and navigate to the designer app.

### Updating checkouts {#updategit}

To update your local copies, re-run `pull-all.sh`:

    ./tools/bin/pull-all.sh

### About the repositories {#abouttherepos}

The entirety of the {{site.project_title}} is composed of a many Git
repositories. All of the polyfill libraries, projects, and individual elements
each have their own repository.

Specification repositories (da polyfills)

Each new web platform specification has a corresponding polyfill repository. The
reasoning for this is two-fold:

1. make the polyfills work across all modern browsers
2. each polyfill can stand on its own and be used à la carte in projects.

For example, the following repositories may be useful if you're interested in the individual API:

* `CustomElements`
* `HTMLImports`
* `PointerEvents`
* `PointerGestures`
* `ShadowDOM`
* `web-animations-js`

#### Other useful repositories

**/polymer** - [github.com/polymer/polymer](https://github.com/polymer/polymer)

A meta repository used to distribute `polymer.js` builds.

**/polymer-dev** - [github.com/polymer/polymer-dev](https://github.com/polymer/polymer-dev)

The [`polymer-dev`](https://github.com/polymer/polymer-dev) repository contains the
[{{site.project_title}} core](/docs/polymer/polymer.html) and its tools and tests and is used
by the project's developers. You should not have to touch this repository unless
you're planning to hack on {{site.project_title}}.

**/platform** - [github.com/polymer/platform](https://github.com/polymer/platform)

A meta repository used to distribute `platform.js` builds.

**/platform-dev** - [github.com/polymer/platform-dev](https://github.com/polymer/platform-dev)

The [`platform-dev`](https://github.com/polymer/platform-dev) contains integration tests, loader, and build tools for the amalgamated polyfills. It's used by the project's developers. You should not have to touch this repository unless you're planning to hack on {{site.project_title}}.

**/polymer-elements** - [github.com/polymer/polymer-elements](https://github.com/polymer/polymer-elements)

A meta repository compiling the list of utility elements that do not render UI.

**/polymer-ui-elements** - [github.com/polymer/polymer-ui-elements](https://github.com/polymer/polymer-ui-elements)

A meta repository compiling the list of basic UI elements.

**/more-elements** - [github.com/polymer/more-elements](https://github.com/polymer/more-elements)

A meta repository compiling the list of extra components and wrappers for third-party code. 
Examples include Bootstrap, topcoat, Chart.js, pdf.js, x-tags, and AceEditor.

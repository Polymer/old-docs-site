---
layout: default
type: guide
shortname: Resources
title: Tools & Testing
---

{% include toc.html %}

## Build status

If something seems terribly wrong, check out {{site.project_title}}'s [build status page](/build/).

## Vulcanize - element build tool

> Vulcanization is process that turns polymers into more durable materials.

[Vulcanize](https://github.com/Polymer/vulcanize) is a tool to concatenate a set of web components into a single file. It's our current recommendation for a "build step". Read more about it in "[Concatenating Web Components with Vulcanize](/articles/concatenating-web-components.html)".

## Debugging Shadow DOM

In Chrome, author defined Shadow DOM is inspectable using the DevTools.

To inspect Shadow DOM defined by the user agent (e.g. the Shadow DOM of `<input type="date">`),
turn on "Show user agent shadow DOM" in the DevTools general settings:

![Enable "Show user agent shadow DOM" in the Devtools](/images/showshadowdom.png 'Enable "Show user agent shadow DOM" in the Devtools')

After reloading the DevTools, user agent Shadow DOM should be inspectable. It will render as `#shadow-root (user-agent)`s in element inspector.

## Source maps

{{site.project_title}}  polyfills the [HTML Imports](../platform/html-imports.html) specification. In order for code to be debuggable at run-time, scripts embedded in components are injected into `<head>` in the main document. Tools/browsers that support [source maps](http://www.html5rocks.com/en/tutorials/developertools/sourcemaps/) will identify these scripts as belonging to their source components.

## Building &amp; testing

To run build individual polyfills or run tests, you need `node` and `grunt-cli` on your system.

* install [NodeJS](http://nodejs.org) using the instructions on their website
* use `npm` to install the [GruntJS](http://gruntjs.com) task runner for the command-line

      npm install -g grunt-cli

### Building individual polyfills

If you're interested in using an individual polyfill by itself (e.g. rather that the prebuilt webcomponents.js bundle),
you need to build the minified file.

**Example** - building the CustomElements polyfill

    $ mkdir cepolyfill; cd cepolyfill

    $ git clone https://github.com/Polymer/MutationObservers

    $ git clone https://github.com/Polymer/tools

    $ git clone https://github.com/Polymer/CustomElements

    $ cd CustomElements

    $ npm install

    $ grunt

**Note**: As seen in the example above, you may need to install other repo dependencies for the build to succeed. For example, the CustomElement polyfills requires `MutationObservers` and the `tools` repos. Sometime it is useful to look in the repo's [build.json](https://github.com/Polymer/CustomElements/blob/master/build.json) file for requirements.
{: .alert .alert-info }

### Running the tests

For any repository that contains tests, in the project's root folder (e.g. `<somepath>/platform-dev/`), run:

    npm install

#### Tasks

Once things are installed, you may run the tests or use `grunt` to perform tasks.

Build minified project files (default):

    grunt

Run tests:

    grunt test

## Development workflow & tooling

We are currently in the early stages of investigating modern front-end tooling for projects built with {{site.project_title}}. This includes using [Yeoman](http://yeoman.io) for scaffolding out {{site.project_title}} elements, [Grunt](http://gruntjs.com) for building and optimizing projects and [Bower](http://bower.io) for component dependency management.

While our work in this area is just beginning, take a look at the potential workflow:

<div class="centered" style="margin:20px;"><iframe id="video" src="http://www.youtube.com/embed/EwQkyplZHDY" frameborder="0" allowfullscreen></iframe>
</div>

The [{{site.project_title}} + Grunt](https://github.com/addyosmani/polymer-grunt-example) proof-of-concept project is a good start. Also follow our work on [generator-polymer](https://github.com/yeoman/generator-polymer/).

## Using git {#git}

**Note:** This section is for advanced users who want to hack on Polymer or submit a pull request. If you just want to use Polymer in a project we recommend using Bower. Please follow our guide at [Getting the Code](/docs/start/getting-the-code.html).
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

- *components/webcomponentsjs/webcomponents.js* — The platform shims and polyfills.
- *components/polymer/polymer.js* — [{{site.project_title}} core](/docs/polymer/polymer.html)
- *components/core-elements/* — A folder of the meta collection of the core elements.
- A directory for each polyfill repo (CustomElements, HTMLImports, ShadowDOM).

**projects/**

Full and sample applications.

### Test your environment {#testgit}

To check that your development environment is ready, try running the designer tool:

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

**/polymer** - [github.com/Polymer/polymer](https://github.com/Polymer/polymer)

A meta repository used to distribute `polymer.js` builds.

**/polymer-dev** - [github.com/Polymer/polymer-dev](https://github.com/Polymer/polymer-dev)

The [`polymer-dev`](https://github.com/polymer/polymer-dev) repository contains the
[{{site.project_title}} core](/docs/polymer/polymer.html) and its tools and tests and is used
by the project's developers. You should not have to touch this repository unless
you're planning to hack on {{site.project_title}}.

**/platform** - [github.com/Polymer/platform](https://github.com/Polymer/platform)

A meta repository used to distribute `webcomponents.js` builds.

**/platform-dev** - [github.com/Polymer/platform-dev](https://github.com/Polymer/platform-dev)

The [`platform-dev`](https://github.com/polymer/platform-dev) contains integration tests, loader, and build tools for the amalgamated polyfills. It's used by the project's developers. You should not have to touch this repository unless you're planning to hack on {{site.project_title}}.

**/core-elements** - [github.com/Polymer/core-elements](https://github.com/Polymer/core-elements)

A meta repository compiling the list of utility elements.

**/paper-elements** - [github.com/Polymer/paper-elements](https://github.com/Polymer/paper-elements)

A meta repository compiling the list of paper (UI) elements.


<!--
**/polymer-elements** - [github.com/PolymerLabs/polymer-elements](https://github.com/Polymer/polymer-elements)

A meta repository compiling the list of utility elements that do not render UI.

**/polymer-ui-elements** - [github.com/Polymer/polymer-ui-elements](https://github.com/Polymer/polymer-ui-elements)

A meta repository compiling the list of basic labs UI elements.

**/more-elements** - [github.com/Polymer/more-elements](https://github.com/Polymer/more-elements)

A meta repository compiling the list of extra components and wrappers for third-party code.
Examples include Bootstrap, topcoat, Chart.js, pdf.js, x-tags, and AceEditor.
 -->

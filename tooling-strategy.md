---
layout: default
title: Tools & Testing
---

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

## Source maps

{{site.project_title}}  polyfills the [HTML Imports](/platform/html-imports.html) specification. In order for code to be debuggable at run-time, scripts embedded in components are injected into `<head>` in the main document. Tools/browsers that support [source maps](http://www.html5rocks.com/en/tutorials/developertools/sourcemaps/) will identify these scripts as belonging to their source components.

## Debugging Shadow DOM

In Chrome, native Shadow DOM is not inspectable. That is, you can't use the DevTools
to drill down into a Shadow Root. 

To be able to inspect Shadow DOM, turn on "Show Shadow DOM" in the DevTools general settings:

![Enable "Show Shadow DOM" in the Devtools](/images/showshadowdom.png 'Enable "Show Shadow DOM" in the Devtools')

After reloading the DevTools, Shadow DOM is inspectable and renders as `#document-fragment`s in the tree.

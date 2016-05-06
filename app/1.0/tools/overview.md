---
title: Tools
link: overview
---

<!-- toc -->

The Polymer team has built modular tools for developing, debugging, and productizing Polymer apps.

## Build / optimization tools {#build}

### <b>vulcanize</b>—optimize HTML Imports {#vulcanize}

[vulcanize](https://github.com/polymer/vulcanize) is a tool for crushing an HTML Import file and its dependent HTML Imports into one file. Think of it as a build step for web components. Vulcanize reduces the number of requests made by your application by concatenating imports into a single file.

Install:

    npm install -g vulcanize

Usage (CLI):

    vulcanize --inline-scripts --inline-css --strip-comments \
        elements.html > elements.build.html

Vulcanize can be used from the CLI or ran programmatically from Node, `gulp-vulcanize`, or `grunt-vulcanize`. Read more about vulcanize in [Optimize for production](optimize-for-production).

Source: [github.com/Polymer/vulcanize](https://github.com/Polymer/vulcanize)

Related tools

- [gulp-vulcanize](https://www.npmjs.com/package/gulp-vulcanize)
- [grunt-vulcanize](https://www.npmjs.com/package/grunt-vulcanize)
- [broccoli-vulcanize](https://www.npmjs.com/package/broccoli-vulcanize)

### <b>crisper</b>—extract inline script from an HTML Import {#crisper}

[crisper](https://github.com/PolymerLabs/crisper) is a tool for extracting inline scripts from an HTML file and splitting them into a separate file. This is useful for cases where you need CSP compliance.

Install:

    npm install -g crisper

Usage:

    crisper --html build.html --js build.js index.html

Source: [github.com/PolymerLabs/crisper](https://github.com/PolymerLabs/crisper)

Related tools

- [gulp-crisper](https://www.npmjs.com/package/gulp-crisper)
- [grunt-crisper](https://www.npmjs.com/package/grunt-crisper)

### <b>polyclean</b>—minify JS/CSS/HTML {#polyclean}

[polyclean](https://github.com/PolymerLabs/polyclean) provides basic Gulp plugins for minifying and cleaning JS, CSS, and HTML.

Install:

    npm install -g polyclean

Usage:

    vulcanize --inline-css --inline-scripts index.html | polyclean

Source: [github.com/PolymerLabs/polyclean](https://github.com/PolymerLabs/polyclean)

### <b>polybuild</b>—all-in-one build tool for optimizing apps {#polybuild}

[polybuild](https://github.com/PolymerLabs/polybuild) is an all-in-one build tool that combines vulcanize, crisper, and polyclean. Although less flexible than using the tools individually, polybuild is an easy solution if you want quick defaults.

Install:

    npm install -g polybuild

Usage:

    polybuild index.html --maximum-crush

Source: [github.com/PolymerLabs/polybuild](https://github.com/PolymerLabs/polybuild)

### <b>polyicon</b>—create an optimized custom icon set {#polyicon}

[polyicon](https://github.com/PolymerLabs/polyicon) is an online tool to generate
an optimized custom icon set for your app, with only the icons that you need.
Instead of loading entire sets, this tool creates a slimmer (custom) icon set that you can load and use in your app.

Try it out: [https://poly-icon.appspot.com/](https://poly-icon.appspot.com/)

Source: [github.com/PolymerLabs/polyicon](https://github.com/PolymerLabs/polyicon)

## Development tools {#dev}

### <b>&lt;seed-element></b>—boilerplate starter for creating a resuable element on Github {#seedelement}

See [Create a reusable element](/1.0/docs/start/reusableelements.html).

Source: [github.com/polymerelements/seed-element](https://github.com/polymerelements/seed-element)

### <b>Polymer Starter Kit</b>—starter project for building Polymer apps {#psk}

The Polymer Starter Kit is a complete starting point for building Polymer-based applications See [Using Polymer Starter Kit](/1.0/docs/start/psk/set-up.html) for more information on getting started.

Source: [github.com/PolymerElements/polymer-starter-kit](https://github.com/PolymerElements/polymer-starter-kit)

### <b>polylint</b>—lint projects for errors and common mistakes {#polylint}

[polylint](https://github.com/PolymerLabs/polylint) is a linting tool to detect
common mistakes and errors in your projects.

Install:

    npm install -g polylint

Usage:

    polylint --root my-project/ \
        --input elements.html my-element.html

**Source:** [github.com/PolymerLabs/polylint](https://github.com/PolymerLabs/polylint)

**Related tools**

- [Sublime plugin](https://github.com/nomego/SublimeLinter-contrib-polylint)
- [Atom package](https://github.com/PolymerLabs/polylint#installing-the-atom-package)

### <b>polyserve</b>—web server for developing elements {#polyserve}

[polyserve](https://github.com/PolymerLabs/polyserve) is simple web server for serving `bower_components`, locally. It's useful when developing your own elements.

polyserve serves the component from the current directory as `/components/{element-name}/`, where `element-name` is defined as the name in `bower.json`. All other dependencies are served from `./bower_components/`.

Install:

    npm install -g polyserve

Usage:

    cd my-element/
    polyserve -p 8080

Source: [github.com/PolymerLabs/polyserve](https://github.com/PolymerLabs/polyserve)

### <b>polygit</b>—CDN web service for serving components {#polygit}

[polygit](http://polygit.org/) is proxy server for serving components from a CDN. **It is not meant to be used for production apps**, but is very useful when prototyping and sharing jsbins.

Usage:

```
<head>
  <base href="https://polygit.org/components/"> <!-- saves typing! -->
  <script src="webcomponentsjs/webcomponents-lite.min.js"></script>
  <link rel="import" href="paper-button/paper-button.html">
  <link rel="import" href="iron-selector/iron-selector.html">
</head>
```

For more documentation, see [http://polygit.org](http://polygit.org/).

Source: [github.com/PolymerLabs/polygit](https://github.com/PolymerLabs/polygit)

### <b>polystyle</b>—web service for creating style modules {#polystyle}

[polystyle](https://poly-style.appspot.com/demo/) is a web service that can wrap an existing stylesheet on a remote server as Polymer [style module](/1.0/docs/devguide/styling.html#style-modules). This is useful if you have a hosted third-party stylesheet that you want to use in an element or your application.

Usage:

```
<head>
  <link rel="import" href="bower_components/polymer/polymer.html">
  <link rel="import" href="https://poly-style.appspot.com?id=theme-styles&url=https://example.com/styles.css">
  <style is="custom-style" include="theme-styles">
    ...
  </style>
</head>
```

For more information, see [https://poly-style.appspot.com/demo/](https://poly-style.appspot.com/demo/).

**Related tools**

- [gulp-style-modules](https://github.com/MaKleSoft/gulp-style-modules)—3rd party Gulp plugin for wrapping local CSS files into style modules

Source: [github.com/PolymerLabs/polystyles](https://github.com/PolymerLabs/polystyles)

## Documentation {#documentation}

The Polymer team uses the `iron-component-page` element to create
API docs for Polymer elements and behaviors.

See [Document your elements](documentation.html) for details on
writing API docs and viewing them with `iron-component-page`.

## Testing / debugging {#testing}

### Web component tester—unit-testing tool for elements {#wct}

[Web component tester](https://github.com/Polymer/web-component-tester) is a tool providing a browser-based testing environment for web components. Out of the box it includes support for Mocha, Chai, Async and Sinon. See [Test your elements](tests.html) for detailed usage.

Install:

    npm install -g web-component-tester

Usage:

    wct
    wct -l chrome (runs tests in chrome only)

By default, any tests under `test/` will be run. You can override this by specifying particular files (or globs of files) via `wct path/to/files`.

If you prefer not to use WCT's command line tool, you can also [run WCT tests directly in a browser](https://github.com/Polymer/web-component-tester#web-server) via a web server of your choosing.

For details on using WCT, see [Test your elements](test).

Source: [github.com/Polymer/web-component-tester](https://github.com/Polymer/web-component-tester)

### polydev Chrome extension {#polydev}

[polydev](https://github.com/PolymerLabs/polydev) is a Chrome DevTools extension to help develop Polymer custom elements. It provides useful information like the number of element instances and time spent in each element. polydev is useful for discovering potential perf bottlenecks in your app.

**Note**: It is highly recommended that the extension is installed in a separate Chrome profile. The extension needs permission to modify every page to install metrics gathering code.
{ .alert .alert-info }

Install:

1. Create a new Chrome profile
- [Install](https://chrome.google.com/webstore/detail/polymer-devtools-extensio/mmpfaamodhhlbadloaibpocmcomledcg) the extension from the Chrome Webstore

Source: [github.com/PolymerLabs/polydev](https://github.com/PolymerLabs/polydev)

## Misc

### <b>polyup</b>—Polymer 0.5 to 1.0 migration tool {#polyup}

[polyup](https://github.com/PolymerLabs/polyup) is a migration tool and web service for Polymer v0.5 to 1.0. It does many of the boring mechanical parts for you.

polyup will parse your HTML and any JS in either inline or external scripts and perform a number of automatic transformations to your code. For most projects polyup won't be able to do everything necessary to upgrade, but its goal is to make it way easier.

Try it out: [http://polymerlabs.github.io/polyup/](http://polymerlabs.github.io/polyup/)

Source: [github.com/PolymerLabs/polyup](https://github.com/PolymerLabs/polyup)

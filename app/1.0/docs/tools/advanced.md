---
title: Advanced tools
---

<!-- toc -->

The [Polymer CLI](polymer-cli) is the recommended starting point for tools
related to developing Polymer elements. If for some reason it does not
meet your needs, here is a list of the underlying tools that it is composed
of. You can use a build tool like Gulp or Grunt in combination with these
tools to create your own workflow.

## Development

### <b>polyserve</b>—web server for developing elements {#polyserve}

*Equivalent to Polymer CLI command `polymer serve`.*

[polyserve](https://github.com/Polymer/polyserve) is simple web server for serving `bower_components`, locally. It's useful when developing your own elements.

polyserve serves the component from the current directory as `/components/{element-name}/`, where `element-name` is defined as the name in `bower.json`. All other dependencies are served from `./bower_components/`.

Install:

    npm install -g polyserve

Usage:

    cd my-element/
    polyserve -p 8080

Source: [github.com/Polymer/polyserve](https://github.com/Polymer/polyserve)

### <b>polylint</b>—lint projects for errors and common mistakes {#polylint}

*Equivalent to Polymer CLI command `polymer lint`.*

[polylint](https://github.com/PolymerLabs/polylint) is a linting tool to detect
common mistakes and errors in your projects.

Install:

    npm install -g polylint

Usage:

    polylint --root my-project/ \
        --input elements.html my-element.html

**Source:** [github.com/PolymerLabs/polylint](https://github.com/PolymerLabs/polylint)

### Web component tester—unit-testing tool for elements {#wct}

*Equivalent to Polymer CLI command `polymer test`.*

[Web component tester](https://github.com/Polymer/web-component-tester) is a tool providing a browser-based testing environment for web components. Out of the box it includes support for Mocha, Chai, Async and Sinon. See [Test your elements](tests) for detailed usage.

Install:

    npm install -g web-component-tester

Usage:

    wct
    wct -l chrome (runs tests in chrome only)

By default, any tests under `test/` will be run. You can override this by specifying particular files (or globs of files) via `wct path/to/files`.

If you prefer not to use WCT's command line tool, you can also [run WCT tests directly in a browser](https://github.com/Polymer/web-component-tester#web-server) via a web server of your choosing.

For details on using WCT, see [Test your elements](tests).

Source: [github.com/Polymer/web-component-tester](https://github.com/Polymer/web-component-tester)

## Build and optimization {#build}

This section lists commands used by the Polymer CLI command `polymer build`.
You can use them directly if you need to customize your build process.

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

### <b>polymer-build</b>-Provides granular control of building and optimizing applications {#polymer-build}

*Equivalent to Polymer CLI command `polymer build`.*

[polymer-build](https://github.com/Polymer/polymer-build) is a tool for creating custom builds for your application. It is the same library that powers the `build` command in the CLI, but using it directly gives you more control over that process. You can include custom optimizations, compilations, bundling, events, and more. See the [polymer-build README](https://github.com/Polymer/polymer-build) for more information on how to use.

Install:

    npm install polymer-build

Usage:

    // Create a build pipeline to bundle our application before writing to the 'build/' dir
    mergeStream(project.sources(), project.dependencies())
      .pipe(project.bundler)
      .pipe(gulp.dest('build/'));

Source: [github.com/Polymer/polymer-build](https://github.com/Polymer/polymer-build)



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

[polyserve](https://github.com/PolymerLabs/polyserve) is simple web server for serving `bower_components`, locally. It's useful when developing your own elements.

polyserve serves the component from the current directory as `/components/{element-name}/`, where `element-name` is defined as the name in `bower.json`. All other dependencies are served from `./bower_components/`.

Install:

    npm install -g polyserve

Usage:

    cd my-element/
    polyserve -p 8080

Source: [github.com/PolymerLabs/polyserve](https://github.com/PolymerLabs/polyserve)

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

The Polymer CLI command `polymer build` uses the `polymer-build` library to build your project.

`polymer-build` is a Node library for automating Polymer build tasks. You can use it to create a custom Polymer build process using Gulp or another Node-based build system.

<a href="https://github.com/Polymer/polymer-build/blob/master/README.md" target="_blank">See the polymer-build README for instructions</a>.

Source: [github.com/Polymer/polymer-build](https://github.com/Polymer/polymer-build)
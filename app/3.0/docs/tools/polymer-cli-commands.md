---
title: Polymer CLI Commands
---

<!-- toc -->

This section explains various useful Polymer CLI commands that you'll want to incorporate into your
development workflow while you build your element or app project.

The commands are intended for both element and app projects unless otherwise
noted.

* [polymer build (for app projects only)](#build)
* [polymer init](#init)
* [polymer install](#install)
* [polymer lint](#lint)
* [polymer serve](#serve)
* [polymer test](#tests)
* [Global options for Polymer CLI commands](#global)

## polymer build {#build}

*This command is for app projects only.*

Generates a production-ready build of your app. This process includes minifying the HTML, CSS, and
JS of the application dependencies, and generating a service worker to pre-cache dependencies.

Polymer CLI's build process is designed for apps that follow the [PRPL pattern](/{{{polymer_version_dir}}}/toolbox/prpl). 

To make sure your app builds properly, create a `polymer.json` file 
at the top-level of your project and store your build configurations there. [See the polymer.json
specification for more information](polymer-json).

You can also pass equivalent values via the following command-line flags. This can be useful for
building simple projects on your machine but you will need to include the flag every time you run
the command. For most projects a `polymer.json` configuration file will be easier to work with and
share across your team.

* [--add-service-worker](#service-workers)
* [--add-push-manifest](#push-manifest)
* [--base-path](#basepath)
* [--browser-capabilities](#browsercapabilities)
* [--bundle](#bundles)
* [--css-minify](#css-minify)
* [--entrypoint](#entrypoint)
* [--html-minify](#html-minify)
* [--insert-prefetch-links](#prefetch)
* [--js-compile](#js-compile)
* [--js-minify](#js-minify)
* [--js-transform-modules-to-amd](#amd)
* [--js-transform-import-meta](#meta)
* [--shell](#shell)



A set of presets have been provided to cover common configurations - see the section below 
on [build presets](#presets).

### --add-service-worker {#service-workers}

Generate a service worker for your application to cache all files and assets on the client.

Polymer CLI will generate a service worker for your build using the
[sw-precache](https://github.com/GoogleChrome/sw-precache) library. To customize your service
worker, create a `sw-precache-config.js` file in your project directory that exports your
configuration. See the [sw-precache README](https://github.com/GoogleChrome/sw-precache) for a list
of all supported options.

Note that the sw-precache library uses a cache-first strategy for maximum speed and makes some
other assumptions about how your service worker should behave. Read the
["Considerations"](https://github.com/GoogleChrome/sw-precache#considerations) section of the
sw-precache README to make sure that this is suitable for your application.

### --add-push-manifest {#push-manifest}

If `true`, generate an [HTTP/2 Push Manifest](https://github.com/GoogleChrome/http2-push-manifest) for your application.

### --base-path {#basepath}

Update the entrypoint's `<base>` tag, to support serving this build from a non-root path, such as when doing differential serving based on user agent. Requires that a `<base>` tag already exists. 

This works well in conjunction with the convention of using relative URLs for static resources and absolute URLs for application routes.

If `true`, use the build `name`. If a `string`, use that value. 

Leading/trailing slashes are optional.

### --browser-capabilities {#browsercapabilities}

A list of capabilities required for a browser to consume this build. Values include `es2015` and `push`. See canonical list at https://github.com/Polymer/prpl-server-node/blob/master/src/capabilities.ts

This field is purely a hint to servers reading this configuration, and does not affect the build process. A server supporting differential serving (e.g. prpl-server) can use this field to help decide which build to serve to a given user agent.

### --bundle {#bundles}

By default, JavaScript code is unbundled. This is optimal for HTTP/2-compatible servers and clients.

If the `--bundle` flag is supplied, JavaScript code is bundled together to reduce the number of file
requests. This is optimal for sending to clients or serving from servers that are not HTTP/2
compatible.

### --css-minify {#css-minify}

Minify inlined and external CSS.

### --entrypoint {#entrypoint}

A filename. This is the main entrypoint into your application for all routes. Often times this is
your `index.html` file. This file should import the app shell file specified in the
[`shell`](#shell) option. It should be minimal since it's loaded and cached for each route.

### --html-minify {#html-minify}

Minify HTMl by removing comments and whitespace.

### --js-compile {#js-compile}

Use babel to compile newer JavaScript features to an older target JavaScript version.

Valid JavaScript targets are `"es5"`, `"es2015"`, `"es2016"`, `"es2017"`, and `"es2018"`.

```
polymer serve --js-compile="es5"
```

Compiling to es5 will inject `custom-elements-es5-adapter.js` to ensure that ES6-native browsers can render custom elements.

### --js-minify {#js-minify}

Minify inlined and external JavaScript.

### --js-transform-modules-to-amd {#amd}

Transform ES modules to AMD modules.

### --js-transform-import-meta {#meta}

Rewrite `import.meta` expressions to objects with inline URLs.

### --shell {#shell}

The app shell file containing common code for the app.

### Build presets {#presets}

```bash
polymer build --preset preset-name
```

**Build presets** provide an easy way to create common build configurations. When you provide a valid preset for your build, it will use the flags in that preset. We currently provide 5 presets:

- **es5-bundled:**
  --js-minify --js-compile="es5" --js-transform-modules-to-amd --css-minify --html-minify --bundled --add-service-worker

- **es6-bundled:**
  --js-minify --js-compile="es2015" --js-transform-modules-to-amd --css-minify --html-minify --bundled --add-service-worker
  --browser-capabilities="['es2015']" 
  
- **es6-unbundled:**
  --js-minify --js-compile="es2015" --js-transform-modules-to-amd --css-minify --html-minify --add-service-worker --add-push-manifest --browser-capabilities="['es2015', 'push']" 

- **uncompiled-bundled:** 
  --js-minify --css-minify --html-minify --bundled --add-service-worker --browser-capabilities="['es2018']" 

- **uncompiled-unbundled:**
  --js-minify --css-minify --html-minify --add-service-worker --add-push-manifest --browser-capabilities="['es2018', 'push']" 

### Examples {#examples}

Create a bundled build for browsers that support ES5:

`polymer build --preset es5-bundled`

Create an unbundled build for browsers that support ES6:

`polymer build --preset es6-unbundled`

## polymer init {#init}

Initializes a Polymer project from one of several templates. Pre-bundled templates range from just bare-bones to fully featured applications like the [Polymer Shop app](/{{{polymer_version_dir}}}/toolbox/case-study).

Run `polymer init` to choose a template from a list of all installed templates. Or, if you know the template name before hand, you can provide it as a command argument to select it automatically.

See the [polymer-cli readme](https://github.com/Polymer/tools/blob/master/packages/cli/README.md#polymer-init-template) for more information on the `polymer init` command. 

See also:

* [Create an element project with the Polymer CLI](create-element-polymer-cli)
* [Create an application project with the Polymer CLI](create-app-polymer-cli)
* [Case study of the Polymer Shop app](/{{{polymer_version_dir}}}/toolbox/case-study)

## polymer install {#install}

Installs dependencies. Running `polymer install` is equivalent to running `npm install`.

## polymer lint {#lint}

Analyze your project for syntax errors, missing imports, bad databinding expressions and more. `polymer lint` helps with identifying issues across your HTML, JS, and CSS based on an in-depth analysis of web components in source code. It does not reinvent the wheel though, it focuses on issues specific to web components and Polymer, so it is a good adjunct to other tools like [`eslint`](http://eslint.org/) and [`htmlhint`](http://htmlhint.com/).

Use it like so:

    polymer lint --rules=polymer-3

This will lint all of the code in your project with the `polymer-3` ruleset, which is appropriate for projects using Polymer 3.0.

You can pass flags to the linter like `--rules` but even better is to put the configuration in `polymer.json` so that all you need to do is run `polymer lint`. Putting your configuration in `polymer.json` also means that other tools, like IDE plugins can use the same lint configuration.

Here's what that looks like:

```json
{
  "lint": {
      "rules": ["polymer-3"],
      "ignoreWarnings": []
  }
}
```

- `rules`: An array of lint rules and rule collections to run on your project. For most projects,  `polymer-3` is all that's needed here.
- `ignoreWarnings`: An array of warning codes to ignore.

### Warning Codes:

The output of `polymer lint` looks like this:

```
            <iron-collapse>
            ~~~~~~~~~~~~~~~

index.html(83,12) warning [undefined-elements] - The element iron-collapse is not defined
```

This means that on line 83 of `index.html` there's an `<iron-collapse>` tag, but the linter can't find the definition of the `iron-collapse` custom element. This probably means that there's a missing import in `index.html`. To ignore this warning, add `undefined-elements` to the `ignoreWarnings` array in `polymer.json`.

## polymer serve {#serve}

Runs a local web server.

If you want to view a live demo of your element or app, run the local web server:

    polymer serve

This section describes command line options available for the Polymer CLI development server (`polymer serve`).

### --npm

Sets npm mode. Dependencies are installed from npm, the component directory is set to `node_modules` and the package name is read from `package.json`.

```
polymer serve --npm
```

`--npm` is required when:

  * You are using npm to install dependencies, and
  
  * You are importing peer dependencies by paths that start with `../` instead of by module specifiers.

If you are using npm and importing by module specifiers (e.g. `'@polymer/polymer/...'`), you don't need to use this flag.

### --module-resolution

Specifies how to resolve module specifiers in import and export statements when rewriting them to URLs.

Valid values are `"none"` and `"node"`. Defaults to `"node"`.

  * `"none"` disables module specifier rewriting. 

  * `"node"` uses Node.js resolution to find modules. 

The `--module-resolution` option does not affect Polymer 1.x or 2.x projects, so unless you need to disable module resolution in a Polymer 3.x project, you can safely ignore it.

To disable module resolution in a Polymer 3.x project:

```
polymer serve --module-resolution="none"
```

### --compile

Compiler options. Valid values are `"auto"`, `"always"` and `"never"`. Defaults to `"auto"`.

`"auto"` compiles JavaScript to ES5 for browsers that don't fully support ES6.

### --component-dir, -c

The component directory to use. When `--npm` is true, defaults to `"node_modules"`. Without the `--npm` flag, defaults to `"bower_components"`. 

Polymer 1.x and 2.x element projects might need to set a component directory to resolve peer dependencies accessed by URLs that start with `../`. Polymer 3.x projects should use module specifiers (e.g. `'@polymer/polymer/...'`) to access peer dependencies, so most will not need to set a component directory.

### --port, -p

By default, the `polymer serve` command runs the Polymer CLI development server on an open port. You can use `--port` or `-p` to specify the port to serve from. For example, to serve from port 3000:

```
polymer serve --port 3000
```

### --hostname 

If you have configured a custom hostname on your machine, Polymer CLI can serve it with the
`--hostname` argument. For example, if your hostname is `test`, the following command serves an application project from `http://test:8080`:

    polymer serve --hostname test

### --open, --browser

Open a page other than the default `index.html` in a specific browser
(Apple Safari, in this case):

    polymer serve --open app.html --browser Safari

## polymer test {#tests}

Runs tests.

If you want to run tests on your element or app project, `cd` to the base directory of your project
and run:

    polymer test

Polymer CLI automatically runs all of the tests that it finds in the `test` directory. You'll see
the results of the tests in your CLI.

If you create your own tests, they should also go in the `test` directory.

The underlying library that powers `polymer test` is called `web-component-tester` (`wct`). Learn
more about creating unit tests with `wct`
in [Test your elements](tests).

## Global options for Polymer CLI commands {#global}

You can see a list of global options by running `polymer help`. Most of them
are self-explanatory.

The following options are currently only supported for the `polymer build`
command:

*   `entry`
*   `shell`

See [`polymer build`](#build) for more information on how to use these options.

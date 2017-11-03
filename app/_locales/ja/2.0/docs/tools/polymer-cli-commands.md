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
* [--bundle](#bundles)
* [--css-minify](#css-minify)
* [--entrypoint](#entrypoint)
* [--html-minify](#html-minify)
* [--insert-prefetch-links](#prefetch)
* [--js-compile](#js-compile)
* [--js-minify](#js-minify)
* [--shell](#shell)
* [--fragment](#fragment)

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

### --bundle {#bundles}

By default, fragments are unbundled. This is optimal for HTTP/2-compatible servers and clients.

If the `--bundle` flag is supplied, all fragments are bundled together to reduce the number of file
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

### --insert-prefetch-links {#prefetch}
Insert prefetch link elements into your fragments so that all dependencies are prefetched
immediately. Add dependency prefetching by inserting `<link rel="prefetch">` tags into entrypoint
and `<link rel="import">` tags into fragments and shell for all dependencies.

### --js-compile {#js-compile}

Use babel to compile all ES6 JS down to ES5 for older browsers.

### --js-minify {#js-minify}

Minify inlined and external JavaScript.

### --shell {#shell}

The app shell file containing common code for the app.

### --fragment {#fragment}

This flag supports dynamic dependencies. It is an array of any HTML filenames that are not
statically linked from the app shell (that is, imports loaded on demand by `importHref`).

If a fragment has static dependencies, provided the fragment is defined in this property, the
Polymer build analyzer will find them. You only need to list the file imported by importHref.

In a Polymer app, the files listed in the fragments flag usually contain one or more element
definitions that may or may not be required during the user’s interaction with the app, and can
thus be lazily loaded.

### Build presets {#presets}

```bash
polymer build --preset preset-name
```

**Build presets** provide an easy way to create common build configurations. When you provide a valid preset for your build, it will use the flags in that preset. We currently support 3 different presets:

- **es5-bundled:**
  --js-minify --js-compile --css-minify --bundled --add-service-worker --add-push-manifest --insert-prefetch-links

- **es6-bundled:**
  --js-minify --css-minify --html-minify --bundled --add-service-worker --add-push-manifest --insert-prefetch-links
  
- **es6-unbundled:**
  --js-minify --css-minify --html-minify --add-service-worker --add-push-manifest --insert-prefetch-links

### Examples {#examples}

Create a bundled build for browsers that support ES5:

`polymer build --preset es5-bundled`

Create an unbundled build for browsers that support ES6:

`polymer build --preset es6-unbundled`

## polymer init {#init}

Initializes a Polymer project from one of several templates. Pre-bundled templates range from just bare-bones to fully featured applications like the [Polymer Shop app](/{{{polymer_version_dir}}}/toolbox/case-study).

Run `polymer init` to choose a template from a list of all installed templates. Or, if you know the template name before hand, you can provide it as a command argument to select it automatically.

See the [polymer-cli readme](https://github.com/Polymer/polymer-cli#polymer-init-template) for more information on the `polymer init` command. 

See also:

* [Create an element project with the Polymer CLI](create-element-polymer-cli)
* [Create an application project with the Polymer CLI](create-app-polymer-cli)
* [Case study of the Polymer Shop app](/{{{polymer_version_dir}}}/toolbox/case-study)

## polymer install {#install}

Installs Bower dependencies. Running `polymer install` is equivalent to running `bower install`.

The `--variants` flag allows you to install dependency variants. See the documentation on [managing dependencies for hybrid elements](/{{{polymer_version_dir}}}/docs/devguide/hybrid-elements#dependency-variants) for more information.

The `--offline` flag tells the install command not to hit the network to retrieve components. If components are not cached, the install will fail.

## polymer lint {#lint}

Analyze your project for syntax errors, missing imports, bad databinding expressions and more. `polymer lint` helps with identifying issues across your HTML, JS, and CSS based on an in-depth analysis of web components in source code. It does not reinvent the wheel though, it focuses on issues specific to web components and Polymer, so it is a good adjunct to other tools like [`eslint`](http://eslint.org/) and [`htmlhint`](http://htmlhint.com/).

Use it like so:

    polymer lint --rules=polymer-2

This will lint all of the code in your project with the `polymer-2` ruleset, which is appropriate for projects using Polymer 2.0. If your code is hybrid and should work with either Polymer 1.x or 2.x then `polymer-2-hybrid` is a better choice, as it will warn you about use of features that do not exist in Polymer 2.x.

You can pass flags to the linter like `--rules` but even better is to put the configuration in `polymer.json` so that all you need to do is run `polymer lint`. Putting your configuration in `polymer.json` also means that other tools, like IDE plugins can use the same lint configuration.

Here's what that looks like:

```json
{
  "lint": {
      "rules": ["polymer-2"],
      "ignoreWarnings": []
  }
}
```

- `rules`: An array of lint rules and rule collections to run on your project. For most projects, one of  `polymer-2`, `polymer-2-hybrid`, or `polymer-1` is all that's needed here.
- `ignoreWarnings`: An array of warning codes to ignore.

### Warning Codes:

The output of `polymer lint` looks like this:

```
            <iron-collapse>
            ~~~~~~~~~~~~~~~

index.html(83,12) warning [undefined-elements] - The element iron-collapse is not defined
```

This means that on line 83 of `index.html` there's an `<iron-collapse>` tag, but the linter can't find the definition of the `iron-collapse` custom element. This probably means that there's a missing HTML import in `index.html`. To ignore this warning, add `undefined-elements` to the `ignoreWarnings` array in `polymer.json`.

## polymer serve {#serve}

Runs a local web server.

If you want to view a live demo of your element or app, run the local web server:

    polymer serve

To view the demo, point your browser to one of the following URLs.

Element project demo:

<pre><code>http://localhost:8080/components/<var>my-el</var>/demo/</code></pre>

Element project API reference:

<pre><code>localhost:8080/components/<var>my-el</var>/</code></pre>

App project demo:

    http://localhost:8080

### Server options {#server-options}

This section shows examples of using various `polymer serve` options.

Serve from port 3000:

    polymer serve --port 3000

If you have configured a custom hostname on your machine, Polymer CLI can serve it with the
`--hostname` argument (for example, app project demo is available at `http://test:8080`):

    polymer serve --hostname test

Open up a page other than the default `index.html` in a specific browser
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

The following commands are currently only supported for the `polymer build`
command, with planned support for other commands in the future.

*   `entry`
*   `shell`
*   `fragment`

See [`polymer build`](#build) for more information on how to use these options.

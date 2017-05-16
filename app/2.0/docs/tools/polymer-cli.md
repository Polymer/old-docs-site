---
title: Polymer CLI
---

<!-- toc -->

## Install {#install}

1.  Make sure you have installed a verson of Node.js supported by Polymer. Run `node --version` to to check the version of Node.js that you have installed and see our [official node version support policy](node-support) for more details.

1.  Update npm.

        npm install npm@latest -g

1.  Ensure that Git is installed.

        git --version

    If it isn't, you can find it on the [Git downloads page](https://git-scm.com/downloads).

1.  Install the latest version of Bower.

        npm install -g bower

1.  Install Polymer CLI.

        npm install -g polymer-cli

You're all set. Run `polymer help` to view a list of commands.

## Overview {#overview}

Polymer CLI is a command-line interface for Polymer projects. It includes a build pipeline, a
boilerplate generator for creating elements and apps, a linter, a development server, and a test
runner.

Polymer CLI works with two types of projects:

* Elements projects. In an element project, you expose a single element or
  group of related elements which you intend to use
  in other element or app projects, or
  distribute on a registry like Bower or NPM. Elements are reusable and
  organized to be used alongside other elements, so components are referenced
  outside the project.
* Application projects. In an app project, you build an application, composed
  of Polymer elements, which you intend to deploy as a website. Applications are
  self-contained, organized with components inside the application.

Complete the [Install](#install) section to learn how to install
Polymer CLI and then proceed to the [Build an element](#element) or
[Build an app](#app) section to get started on your first project.

## Create an element project {#element}

This section shows you how to start an element project.

1.  Create a directory for your element project. It's best practice for the name
    of your project directory to match the name of your element.

    <pre><code>mkdir <var>my-el</var> && cd <var>my-el</var></code></pre>

    Where <code><var>my-el</var></code> is the name of the element you're
    creating.

1.  Initialize your element. Polymer CLI asks you a few
    questions as it sets up your element project.

        polymer init

1.  Select `polymer-2-element`.

1.  Enter a name for your element.

    The [custom elements
    specification](https://www.w3.org/TR/2016/WD-custom-elements-20160226/#concepts) requires the
    element name to contain a dash.
    {.alert .alert-info}

1.  Enter a description of the element.

At this point, Polymer CLI generates files and directories for your element,
and installs your project's dependencies.

### Element project layout

After the initialization process Polymer CLI generates the following files and directories.

*   `bower.json`. Configuration file for Bower.
*   `bower_components/`. Project dependencies. See
    [Manage dependencies](#dependencies).
*   `demo/index.html`. Demo of <code><var>my-el</var></code>`.html`.
*   `index.html`. Automatically-generated API reference.
*   <code><var>my-el</var></code>`.html`. Element source code.
*   `test/`<code><var>my-el</var></code>`_test.html`. Unit tests for
    the element.

#### HTML imports and dependency management {#element-imports}

Summary:

When importing Polymer elements via HTML imports, always use the relative URL
<code>../<var>package-name</var>/<var>element-name</var>.html</code> (e.g.
`../polymer/polymer.html` or `../paper-elements/paper-button.html`).

Details:

Suppose that you ran Polymer CLI to generate an element project. Your element is named `my-el`. You
look inside `my-el.html` and see that Polymer has been
imported like so:

    <link rel="import" href="../polymer/polymer.html">

This path doesn't make sense. Relative to `my-el.html`,
Polymer is actually located at `bower_components/polymer/polymer.html`. Whereas
the HTML import above is referencing a location *outside* of your element
project. What's going on?

Bower installs dependencies in a flat dependency tree, like so:

    bower_components/
      polymer/
        polymer.html
      my-el/
        my-el.html
      other-el/
        other-el.html

This works well on the application-level. All elements are siblings, so they can
all reliably import each other using relative paths like
`../polymer/polymer.html`. This is why Polymer CLI uses relative paths
when initializing your element project.

However, one problem with this approach, as stated earlier, is that this
structure does not actually match the layout in your element project. Your
element project is actually laid out like so:

    bower_components/
      polymer/
        polymer.html
    my-el.html

Polymer CLI handles this by remapping paths. When you run `polymer serve`,
all elements in `bower_components` are remapped to appear to be in sibling
directories relative to `my-el`. The current element is served from the
made-up path of <code>/components/<var>bower name</var></code>, where
<code><var>bower name</var></code> is the `name` field from your element
project's `bower.json` file.

## Create an app project {#app}

Polymer CLI supports initializing a project folder with one of
several application templates.  The CLI comes with a `basic` template,
which is the most basic starting point for a Polymer-based application,
as well as others that introduce more complex layout and application patterns.

This chapter teaches you more about `basic` app projects.  See
[Polymer App Toolbox templates](../../toolbox/templates) for more details on
other templates.

### App project architecture {#app-architecture}

Polymer CLI is designed for apps that follow the [app shell
architecture](https://developers.google.com/web/updates/2015/11/app-shell).

There are fundamental concepts of the app shell architecture that you should understand before
creating your app project with Polymer CLI: the entrypoint,
the shell, and fragments. See [App structure](../../toolbox/prpl#app-structure)
from the App Toolbox docs for an in-depth overview of these concepts.

### Set up basic app project {#basic-app}

Follow the steps below to get your `basic` app project set up.

1.  Create a directory for your app project.

    <pre><code>mkdir <var>app</var>
    cd <var>app</var></code></pre>

    Where <code><var>app</var></code> is the name of your project directory.

1.  Initialize your app. Polymer CLI asks you a few questions
    as it sets up your app.

        polymer init

1.  Select `polymer-2-application`.

1.  Enter a name for your app. Defaults to the name of the current directory.

1.  Enter a name for the main element in your project. The main element is the
    top-most, application-level element of your app. Defaults to the name of
    the current directory, followed by `-app`.

    The code samples throughout this doc use the example app element name
    <code><var>my-app</var></code>. When creating your app you'll want to
    replace any instance of <code><var>my-app</var></code> with the name of
    your main element.
    {.alert .alert-info}

1.  Enter a description for your app.

At this point, Polymer CLI generates files and directories for your app,
and installs your project's dependencies.

### App project layout

After the initialization process Polymer CLI generates the following files and directories.

*   `bower.json`. Configuration file for Bower.
*   `bower_components/`. Project dependencies. See
    [Manage dependencies](#dependencies).
*   `index.html`. Entrypoint page of the app.
*   `src/`<code><var>my-app</var></code>/<code><var>my-app</var></code>`.html`.
    Source code for main element.
*    `test/`<code><var>my-app</var></code>/<code><var>my-app</var></code>`_test.html`. Tests for
main element.

#### Add elements

You may want to compose your main element out of smaller, application-specific
elements. These app-specific elements should be defined in the `src` directory, at the same level
as <code><var>my-app</var></code>.

    app/
      src/
        my-app/
        my-el/

Currently there is no Polymer CLI command to generate application-specific elements. You should do
it by hand and should not create an [element project](#element) within your app project.

## Commands {#commands}

This section explains various useful Polymer CLI commands that you'll want to incorporate into your
development workflow while you build your element or app project.

The commands are intended for both element and app projects unless otherwise
noted.

* [`polymer install`](#install)
* [`polymer test`](#tests)
* [`polymer serve`](#serve)
* [`polymer lint`](#lint)
* [`polymer build` (for app projects only)](#build)

### `polymer install` {#install}

Installs Bower dependencies. Running `polymer install` is equivalent to running `bower install`.

The `--variants` flag allows you to install dependency variants. See the documentation on [managing dependencies for hybrid elements](/{{{polymer_version_dir}}}/docs/devguide/hybrid-elements#dependency-variants) for more information.

The `--offline` flag tells the install command not to hit the network to retrieve components. If components are not cached, the install will fail.

### `polymer test` {#tests}

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

### `polymer serve` {#serve}

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

#### Server options {#server-options}

This section shows examples of using various `polymer serve` options.

Serve from port 3000:

    polymer serve --port 3000

If you have configured a custom hostname on your machine, Polymer CLI can serve it with the
`--hostname` argument (for example, app project demo is available at `http://test:8080`):

    polymer serve --hostname test

Open up a page other than the default `index.html` in a specific browser
(Apple Safari, in this case):

    polymer serve --open app.html --browser Safari

### `polymer lint` {#lint}

Analyze your project for syntax errors, missing imports, bad databinding expressions and more. `polymer lint` helps with identifying issues across your HTML, JS, and CSS based on an in-depth analysis of web components in source code. It does not reinvent the wheel though, it focuses on issues specific to web components and Polymer, so it is a good adjunct to other tools like [`eslint`](http://eslint.org/) and [`htmlhint`](http://htmlhint.com/).

Use it like so:

    polymer lint --rules=polymer-2

This will lint all of the code in your project with the `polymer-2` ruleset, which is appropriate for projects using Polymer 2.0. If your code is hybrid and should with with either Polymer 1.x or 2.x then `polymer-2-hybrid` is a better choice, as it will warn you about use of features that do not exist in Polymer 2.x.

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

#### Warning Codes:

The output of `polymer lint` looks like this:

```
            <iron-collapse>
            ~~~~~~~~~~~~~~~

index.html(83,12) warning [undefined-elements] - The element iron-collapse is not defined
```

This means that on line 83 of `index.html` there's an `<iron-collapse>` tag, but the linter can't find the definition of the `iron-collapse` custom element. This probably means that there's a missing HTML import in `index.html`. To ignore this warning, add `undefined-elements` to the `ignoreWarnings` array in `polymer.json`.


### `polymer build` {#build}

*This command is for app projects only.*

Generates a production-ready build of your app. This process includes minifying the HTML, CSS, and
JS of the application dependencies, and generating a service worker to pre-cache dependencies.

Polymer CLI's build process is designed for apps that follow the [app shell
architecture](https://developers.google.com/web/updates/2015/11/app-shell). To make sure your app
builds properly, create a `polymer.json` file at the top-level of your project and store your
build configurations there.

[See the polymer.json specification for more information](polymer-json).

You can also pass equivalent values via the following command-line flags. This can be useful for
building simple projects on your machine but you will need to include the flag every time you run
the command. For most projects a `polymer.json` configuration file will be easier to work with and
share across your team.

* [`--add-service-worker`](#service-workers)
* [`--bundle`](#bundles)
* [`--css-minify`](#css-minify)
* [`--entry`](#entrypoint)
* [`--html-minify`](#html-minify)
* [`--insert-prefetch-links`](#prefetch)
* [`--js-compile`](#js-compile)
* [`--js-minify`](#js-minify)
* [`--shell`](#shell)
* [`--fragment`](#fragment)

A set of presets have been provided to cover common configurations - see the section below 
on [build presets](#presets).

#### `--add-service-worker` {#service-workers}

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

#### `--bundle` {#bundles}

By default, fragments are unbundled. This is optimal for HTTP/2-compatible servers and clients.

If the `--bundle` flag is supplied, all fragments are bundled together to reduce the number of file
requests. This is optimal for sending to clients or serving from servers that are not HTTP/2
compatible.

#### `--css-minify` {#css-minify}

Minify inlined and external CSS.

#### `--entry` {#entrypoint}

A filename. This is the main entrypoint into your application for all routes. Often times this is
your `index.html` file. This file should import the app shell file specified in the
[`shell`](#shell) option. It should be minimal since it's loaded and cached for each route.

#### `--html-minify` {#html-minify}

Minify HTMl by removing comments and whitespace.

#### `--insert-prefetch-links` {#prefetch}
Insert prefetch link elements into your fragments so that all dependencies are prefetched
immediately. Add dependency prefetching by inserting `<link rel="prefetch">` tags into entrypoint
and `<link rel="import">` tags into fragments and shell for all dependencies.

#### `--js-compile` {#js-compile}

Use babel to compile all ES6 JS down to ES5 for older browsers.

#### `--js-minify` {#js-minify}

Minify inlined and external JavaScript.

#### `--shell` {#shell}

The app shell file containing common code for the app.

#### `--fragment` {#fragment}

This flag supports dynamic dependencies. It is an array of any HTML filenames that are not
statically linked from the app shell (that is, imports loaded on demand by `importHref`).

If a fragment has static dependencies, provided the fragment is defined in this property, the
Polymer build analyzer will find them. You only need to list the file imported by importHref.

In a Polymer app, the files listed in the fragments flag usually contain one or more element
definitions that may or may not be required during the user’s interaction with the app, and can
thus be lazily loaded.

#### Build presets {#presets}

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

#### Examples {#examples}

Create a bundled build for browsers that support ES5:

`polymer build --preset es5-bundled`

Create an unbundled build for browsers that support ES6:

`polymer build --preset es6-unbundled`

## Manage dependencies {#dependencies}

Polymer CLI uses [Bower](http://bower.io) for dependency management.

Dependencies are stored in the `bower_components` directory. You should never manually alter the
contents of this directory.

Use the Bower CLI to manage dependencies.

```bash
# downloads dependency to bower_components/
# --save flag saves new dependency to bower.json
bower install --save PolymerElements/iron-ajax
# removes dependency from bower_components/ and bower.json
bower uninstall PolymerElements/iron-ajax
```

## Global options {#global-options}

You can see a list of global options by running `polymer help`. Most of them
are self-explanatory.

The following commands are currently only supported for the `polymer build`
command, with planned support for other commands in the future.

*   `entry`
*   `shell`
*   `fragment`

See [Build app](#build) for more information on how to use these options.

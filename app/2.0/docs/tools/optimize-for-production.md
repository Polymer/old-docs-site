---
title: Optimize for production
---

<!-- toc -->

The Polymer CLI includes a `build` command to generate a production-ready build of your application. This process can include minifying code, compiling JavaScript, automatic service worker generation, and more.

Polymer CLI's build process works best with applications that follow the [app shell architecture](https://developers.google.com/web/updates/2015/11/app-shell). To configure your app as an App Shell application, create a `polymer.json` file at the top-level of your project and set the `entrypoint`, `shell`, and `fragments` options for your application.

You can configure your build via the following command-line flags. However, we reccomend saving these values in your polymer.json. That way there's no concern about remembering the same flags for every build. [See the `polymer.json` specification for more information](polymer-json).

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

#### `--add-service-worker` {#service-workers}

Generate a service worker for your application to cache all files and assets on the client.

Polymer CLI will generate a service worker for your build using the
[sw-precache](https://github.com/GoogleChrome/sw-precache) library. To customize your service worker, create a `sw-precache-config.js` file in your project directory that exports your configuration. See the [sw-precache README](https://github.com/GoogleChrome/sw-precache) for a list of all supported options.

Note that the sw-precache library uses a cache-first strategy for maximum speed and makes some other assumptions about how your service worker should behave. Read the ["Considerations"](https://github.com/GoogleChrome/sw-precache#considerations) section of the sw-precache README to make sure that this is suitable for your application.

#### `--bundle` {#bundles}

By default, fragments are unbundled. This is optimal for HTTP/2-compatible servers and clients.

If the `--bundle` flag is supplied, all fragments are bundled together to reduce the number of file requests. This is optimal for sending to clients or serving from servers that are not HTTP/2 compatible.

#### `--css-minify` {#css-minify}

Minify inlined and external CSS.

#### `--entry` {#entrypoint}

A filename. This is the main entrypoint into your application for all routes. Often times this is your `index.html` file. This file should import the app shell file specified in the [`shell`](#shell) option. It should be minimal since it's loaded and cached for each route.

#### `--html-minify` {#html-minify}

Minify HTMl by removing comments and whitespace.

#### `--insert-prefetch-links` {#prefetch}
Insert prefetch link elements into your fragments so that all dependencies are prefetched immediately. Add dependency prefetching by inserting `<link rel="prefetch">` tags into entrypoint and `<link rel="import">` tags into fragments and shell for all dependencies.

#### `--js-compile` {#js-compile}

Use babel to compile all ES6 JS down to ES5 for older browsers.

#### `--js-minify` {#js-minify}

Minify inlined and external JavaScript.

#### `--shell` {#shell}

The app shell file containing common code for the app.

#### `--fragment` {#fragment}

This flag supports dynamic dependencies. It is an array of any HTML filenames that are not statically linked from the app shell (that is, imports loaded on demand by `importHref`).

If a fragment has static dependencies, provided the fragment is defined in this property, the Polymer build analyzer will find them. You only need to list the file imported by importHref.

In a Polymer app, the files listed in the fragments flag usually contain one or more element definitions that may or may not be required during the user’s interaction with the app, and can thus be lazily loaded.

#### Examples {#examples}

Create a bundled, minified application build:

`polymer build --bundle --js-minify --css-minify --html-minify`

Create an unbundled, minified application build:

`polymer build --js-minify --css-minify --html-minify`

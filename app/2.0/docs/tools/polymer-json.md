---
title: polymer.json specification
---

<!-- toc -->

Creating a `polymer.json` in your project directory allows you to store information about your
project structure and desired build configuration(s). It is used by the [Polymer CLI](polymer-cli)
as a way to understand the structure of your application.

To make sure your application builds correctly, create a `polymer.json` file at the top level of
your project. Here's an example from the [Shop app](https://github.com/Polymer/shop):

<a id="about"></a>

```
-shop
  |-README.md
  |-app.yaml
  |-bower.json
  |-build
  |-data
  |-images
  |-index.html
  |-manifest.json
  |-polymer.json
  |-service-worker.js
  |-src
  |-sw-precache-config.js
  |-test
```

## Example `polymer.json` file

Here’s an example `polymer.json` file from the [Shop app](https://github.com/Polymer/shop):

`polymer.json`
{.caption}
```json
{
  "entrypoint": "index.html",
  "shell": "src/shop-app.html",
  "fragments": [
    "src/shop-list.html",
    "src/shop-detail.html",
    "src/shop-cart.html",
    "src/shop-checkout.html",
    "src/lazy-resources.html"
  ],
  "sources": [
   "src/**/*",
   "data/**/*",
   "images/**/*",
   "bower.json"
  ],
  "extraDependencies": [
    "manifest.json",
    "bower_components/webcomponentsjs/webcomponents-lite.js"
  ],
  "lint": {
    "rules": ["polymer-2-hybrid"]
  },
  "builds": [
    { "preset": "es5-bundled" },
    { "preset": "es6-unbundled" }
  ]
}
```

## Properties

### entrypoint
Optional, Defaults to `index.html`<br>
Type: `String`

The main entrypoint to your app for all routes, often `index.html`. This file should import the app
shell file specified in the shell property. It should be as small as possible since it’s served for
all routes. All paths in the entrypoint should be absolute, because this file is served from many
different URLs.

### fragments
Optional<br>
Type: `Array` of `String`

This property supports dynamic dependencies. It is an array of any HTML filenames that are not
statically linked from the app shell (that is, imports loaded on demand by `importHref`).

If a fragment has static dependencies, provided the fragment is defined in this property, the
Polymer build analyzer will find them. You only need to list the file imported by `importHref`.

In a Polymer app, the files listed in the `fragments` property usually contain one or more element
definitions that may or may not be required during the user’s interaction with the app, and can
thus be lazily loaded.

### extraDependencies
Optional<br>
Type: `Array` of `String`

Dependencies that the analyzer component of the Polymer build toolchain can’t discover, possibly
because they're not statically imported, and that do not need to be bundled.

### shell
*Required*<br>
Type: `String`

The app shell. Contains the main code that boots the app and loads necessary resources. The shell
usually includes the common UI for the app, and the router, which loads resources needed for the
current route.

### sources
Optional, Defaults to `["src/**/*"]`<br>
Type: `Array` of `String`

An optional array of globs matching your application source files. If left out, defaults to all
files in your project `src/` directory. You’ll need to set this if you store your source files in
other locations.

In the Shop app, source files are stored in `/src`, `/data` and `/images`. [See above for the Shop
file structure](#about).

The `sources` property is set as follows:

```json
"sources": [
  "data/**/*",
  "images/**/*",
  "src/**/*",
  "bower.json"
],
```

### builds
Optional<br>
Type: `Array` of `Build Configuration` objects

You can configure how the CLI [builds your application for production](/{{{polymer_version_dir}}}/toolbox/build-for-production) via
the `builds` property. This is equivalent to passing different CLI flags to the build command, but
storing them here will configure the build
for every run:

*   `name`: An optional name for your build. If multiple builds are defined, the `name` property 
    is required.

*   `preset`: An optional preset name that your build configuration can inherit from. 
    See below for more information.

*   `addServiceWorker`: If `true`, generate a service worker for your application.

*   `addPushManifest`: If `true`, generate an [HTTP/2 Push Manifest](https://github.com/GoogleChrome/http2-push-manifest) for your application.

*   `swPrecacheConfig`: An optional configuration file for the generated service worker.

*   `insertPrefetchLinks`: If `true`, insert prefetch link elements into your fragments so that 
    all dependencies are prefetched immediately.

*   `bundle`: You may provide a boolean (`true` to bundle your application; default is `false`), 
    or an object containing bundling configuration options.
    
    *   `excludes`: A list of paths of files and/or folders that should not be inlined. 
      
    *   `inlineCss`: Inline external CSS file contents into `<style>` tags.

    *   `inlineScripts`: Inline external Javascript file contents into `<script>` tags.
    
    *   `rewriteUrlsInTemplates`: Rewrite URLs in element attributes and style tags inside templates 
         when inlining html. 
         
         Defaults to `false` for Polymer 2.x; for Polymer 1.x, or where the Polymer CLI can't identify the 
         version you're using, `rewriteUrlsInTemplates` defaults to `true`. 
         
         **URLs in element attributes and style tags inside templates are no longer re-written in Polymer 2.x**
         In Polymer 1.x, URLs in attributes and styles inside element templates were re-written 
         to be relative to the HTML import that defined the element. In Polymer 2.x, they should
         instead be bound using `importPath` or `rootPath` where appropriate. See the documentation on 
         [URLs in DOM templates](https://www.polymer-project.org/2.0/docs/devguide/dom-template#urls-in-templates)
         and the [Polymer 2.0 upgrade guide](https://www.polymer-project.org/2.0/docs/upgrade#urls-in-templates) for more information.
         {.alert .alert-info}
    
    *   `sourcemaps`: Create identity source maps for inline scripts.

    *   `stripComments`: Remove all comments except those tagged `@license`, or starting with
        `<!--!` or `<!--#`.

*   `html`: An object containing a configuration option for HTML:
    
    *   `minify`: If `true`, minify all HTML.

*   `css`: An object containing a configuration option for CSS:

    *   `minify`: If `true`, minify all CSS.

*   `js`: An object containing configuration options for Javascript:

    *   `minify`: If `true`, minify all JS.

    *   `compile`: If `true`, use babel to compile all ES6 JS down to ES5.

*   `browserCapabilities`: Capabilities required for a browser to consume this build. 
    Values are `es2015`, `push` and `serviceworker`. For more information, see the 
    [prpl-server-node README](https://github.com/Polymer/prpl-server-node#capabilities).

*   `basePath`: Update the entrypoint's `<base>` tag to support serving this build from a
    non-root path, such as when performing differential serving based on user agent. Requires
    that a `<base>` tag already exists.

    If `true`, use the build `name`. If a `string`, use that value. Leading and trailing 
    slashes are optional.

    Note that `basePath` must be set to `true` if using [prpl-server](https://github.com/Polymer/prpl-server-node).

As an example, here is the configuration for a bundled, minified application build:

```json
"builds": [{
    "bundle": true,
    "js": {"minify": true},
    "css": {"minify": true},
    "html": {"minify": true}
  }]
```

And here is a configuration to generate two optimized builds: One bundled and one unbundled:

```json
"builds": [{
    "name": "bundled",
    "bundle": true,
    "js": {"minify": true},
    "css": {"minify": true},
    "html": {"minify": true}
  },{
    "name": "unbundled",
    "js": {"minify": true},
    "css": {"minify": true},
    "html": {"minify": true}
  }]
```

The following configuration generates a bundled, minified application build with bundling options:

*   Specified paths are excluded from inlining.
*   Comments are stripped.
*   External CSS is not inlined.
*   Identity source maps for inline scripts are created.

```json
"build": [{
  "name": "bundled-custom",
  "bundle": {
    "excludes": ["/path/to/stuff/", "/path/to/more/stuff.html"],
    "stripComments": "true",
    "inlineCss": "false",
    "sourcemaps": "true"
  },
  "js": {"minify": true},
  "css": {"minify": true},
  "html": {"minify": true}
}]
```

**Build presets** provide an easy way to create common build configurations. When you provide a 
valid preset for your build, it will inherit its configuration from that preset. We currently 
support 3 different presets:

- **es5-bundled:**
  - name: `es5-bundled`
  - js: `{minify: true, compile: true}`
  - css: `{minify: true}`
  - html: `{minify: true}`
  - bundle: `true`
  - addServiceWorker: `true`
  - addPushManifest: `true`
  - insertPrefetchLinks: `true`
- **es6-bundled:**
  - name: `'es6-bundled'`
  - browserCapabilities: `['es2015']`
  - js: `{minify: true, compile: false}`
  - css: `{minify: true}`
  - html: `{minify: true}`
  - bundle: `true`
  - addServiceWorker: `true`
  - addPushManifest: `true`
  - insertPrefetchLinks: `true`
- **es6-unbundled:**  
  - name: `'es6-unbundled'`
  - browserCapabilities: `['es2015', 'push']`
  - js: `{minify: true, compile: false}`
  - css: `{minify: true}`
  - html: `{minify: true}`
  - bundle: `false`
  - addServiceWorker: `true`
  - addPushManifest: `true`
  - insertPrefetchLinks: `true`

Any additional options that you provide will override the given preset. In the example below, a single "es5-bundled" build will be created with all the es5-bundled preset options except "addServiceWorker", which was overridden and set to false:

```json
"builds": [{
  "preset": "es5-bundled",
  "addServiceWorker": false
}]
```

### lint
Optional<br>
Type: `Object`

You can use this to configure how polymer-lint will lint your project both on the command line and in IDE plugins.

* `rules`: An array of lint rules and rule collections to run on your project. For most projects, one of  `polymer-2`, `polymer-2-hybrid`, or `polymer-1` is all that's needed here. Run `polymer help lint` for the full list of options.
* `ignoreWarnings`: An array of warning codes to ignore.

For example:

```json
  "lint": {
    "rules": ["polymer-2"],
    "ignoreWarnings": []
  }
```

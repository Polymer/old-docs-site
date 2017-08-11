---
title: Build for production
---

<!-- toc -->

## Overview

### Why do we need  a build process?

The tools in the Polymer build process can optimize your application. The build toolset can reduce the download size of your app and its elements by minifying your code. By concatenating your app's element definitions, scripts and stylesheets, the build toolset can also reduce the number of network requests a user's browser will make when loading your app and its resources. 

The Polymer build tools ensure that your applications can run across multiple and older browsers. Polymer 2.0 is written in ES6, for more legible, maintainable, and modular code. For compatibility with older browsers, the Polymer build tools must compile ES6 to ES5. 

Some application developers will need to deliver JavaScript separately from HTML files - for example, for deployment to environments that use [CSP (Content Security Policy)](https://developers.google.com/web/fundamentals/security/csp/). The Polymer build tools can handle this requirement by splitting inline JavaScript and CSS from HTML.

### What build tools are available?

* If your application is written entirely in Polymer and does not use any other tools or frameworks, you can simply use the Polymer CLI to build your application:

  ```
  `polymer build`
  ```

  You can configure your build, or create multiple builds, by writing a [`polymer.json`](/{{{polymer_version_dir}}}/docs/tools/polymer-json) configuration file.
  
* If you need a custom build process, for example, to integrate another tool into your build chain, you can [use the `polymer-build` library](#use-polymer-build) to do so. 

## Understanding the transforms

The Polymer CLI and `polymer-build` library support the following transforms:

* [Minifying HTML, JavaScript and CSS](#minifying)
* [Compiling ES6 to ES5](#compiling)
* [Bundling resources to reduce the total number of HTTP requests made by the user's browser](#bundling)
  
### Minifying HTML, JavaScript and CSS {#minifying}

The Polymer build tools provide options to minify HTML, JavaScript and CSS by stripping whitespace and comments. You can use these on the command line, or configure them in `polymer.json`. See the [polymer.json specification](/{{{polymer_version_dir}}}/docs/tools/polymer-json) for more details.

**Function**|**CLI flag**|**Entry in polymer.json**
--- | --- | ---
Minify inlined and external JavaScript | `--js-minify` | `"js": {"minify": true}` 
Minify inlined and external CSS | `--css-minify` | `"css": {"minify": true}` 
Minify HTML | `--html-minify` | `"html": {"minify": true}` 

Example: Build a project. Use CLI options to minify JavaScript, CSS and HTML {.caption}

```bash
polymer build --js-minify --css-minify --html-minify 
```

Example: A build object in `polymer.json` that minifies JavaScript, CSS and HTML {.caption}

```
"builds": [{
  "js": {"minify": true},
  "css": {"minify": true},
  "html": {"minify": true}
}]
```

### Compiling ES6 to ES5 {#compiling}

Polymer 2.x and its native elements are written using ES6, allowing class definitions, inheritance and modular code. Support for ES6 is required in order for a browser to implement the [custom elements](https://developers.google.com/web/fundamentals/getting-started/primers/customelements) specification.

Because Polymer 2.0 uses ES6 and HTML Custom Elements, it is always best to serve ES6 to browsers with full ES6 support.

These browsers fully support ES6:

* Chrome or Chromium version 49 or later.
* Opera 36 or later.
* Safari or Mobile Safari 10 or later.
* Edge 15.15063 or later.
* Firefox 51 or later.

You should serve compiled ES5 only to older browsers that don't support ES6.

If you need to statically host your code and serve a single version to all browsers, however, you should compile all code to ES5. In this case, you can include a shim—a lightweight polyfill that lets compiled ES5 work on browsers that support native custom elements.
  
The `--js-compile` flag adds the `custom-elements-es5-adapter.js` adapter for running ES5 code on browsers that support ES6.

Equivalently, configure a build option in `polymer.json` as follows:

```
"builds": [{
  "js": {"compile": true}
}]
```

If you’re unsure what the best strategy is for your project, here’s a quick overview:

|   | Easiest for cross-browser support  | Best performance  |
|---|-------|------|
| **Server** | Any server works, including static ones | Dynamic serving required |
| **Deployed Code** | Single build, ES5 transpiled | Two builds, ES5 and ES6 |
| **Polyfills** | custom-elements-es5-adapter.js + webcomponents-loader.js | webcomponents-loader.js|

Differential serving means you must serve both ES5 and ES6, depending on client capabilities. `polymer serve` does this.

According to the native [Custom Elements V1](https://html.spec.whatwg.org/multipage/scripting.html#custom-element-conformance) spec, elements must be defined using ES6 classes. ES5-defined elements will error in the presence of native Custom Elements V1 implementations (Chrome and Safari Tech Preview). Because of this, the best approach is to differentially serve ES6 to browsers that support it (almost all of them), and ES5 to those that do not.

For more information, see the [Polymer 2.0 browser compatibility documentation](/{{{polymer_version_dir}}}/docs/browsers)

### Bundling resources to reduce the total number of HTTP requests made by the user's browser {#bundling}
  
Web pages that use multiple HTML Imports, external scripts, and stylesheets to load dependencies may end up making lots of network round-trips. In many cases, this can lead to long initial load times and unnecessary bandwidth usage. The Polymer build tools can follow HTML Imports and external script and stylesheet references, inlining these external assets into "bundles" to be used in production.

## Build choices

Your build choices will reflect the environments you will be deploying to.

### One build or multiple builds?

* Static hosting services like [GitHub Pages](https://pages.github.com/) and [Firebase Hosting](https://firebase.google.com/docs/hosting/) don't support serving different files to different user agents. If you're hosting your application on one of these services, you'll need to serve a single build.
  
  If you're serving a single build to all browsers _and_ you need to support browsers that don't support ES6, such as IE11 and Safari 9, then this build needs to be compiled to ES5:
  
  `polymer build --js-compile`
  
* If you need to serve multiple builds, your web server must perform user-agent detection and serve different content to different browsers. The Polymer CLI and the `polymer-build` library both permit you to configure multiple build outputs.

### To bundle or not to bundle?

The decision of whether to produce a build/s with bundled or unbundled resources depends on the behaviour and capabilities of both server and browser. 

With HTTP/2 push, support for the PRPL pattern is possible:

* Push critical resources for the initial route.
* Render initial route.
* Pre-cache remaining routes.
* Lazy-load and create remaining routes on demand.

This pattern requires an unbundled build (the default build type).

Because not all browsers support HTTP/2 push, you will also need to create a bundled build:

   ```bash
   polymer build --bundle
   ```

## Building with the CLI

Run `polymer help build` to see the command line options for the `polymer build` command.

You can define your build options by editing the `builds` object in your project's `polymer.json` configuration file. For detailed information on `polymer.json`, see the [`polymer.json` specification](/{{{polymer_version_dir}}}/docs/tools/polymer-json).

### A single, compiled, bundled build

This example gives a single build. ES6 is compiled to ES5; JavaScript, CSS and HTML are minified; and resources are bundled.

`polymer.json` {.caption}

```json
...
"builds": [{
  "bundle": true,
  "js": {"compile": true, "minify": true},
  "css": {"minify": true},
  "html": {"minify": true}
}]
...
```

To build this configuration:

1. Edit your `polymer.json` file to include the build configuration above.
2. Ensure that you have installed the latest version of the [Polymer CLI](/{{{polymer_version_dir}}}/docs/tools/polymer-cli).
3. cd to your project's main folder, and type `polymer build`.

Your build is output to the `build/default` folder.

### Single build with custom bundling options

This configuration generates a bundled, minified application build with the following bundling options:

* Specified paths are excluded from inlining
* Comments are stripped
* External CSS is not inlined
* Identity source maps for inline scripts are created

```json
"build": [{
  "name": "bundled-custom",
  "bundle": {
    "excludes": ["/path/to/stuff/", "/path/to/more/stuff.html"],
    "stripComments": true,
    "inlineCss": false,
    "sourcemaps": true
  },
  "js": {"minify": true},
  "css": {"minify": true},
  "html": {"minify": true}
}]
```

To build this configuration:

1. Edit your `polymer.json` file to include the build configuration above.
2. Ensure that you have installed the latest version of the [Polymer CLI](/{{{polymer_version_dir}}}/docs/tools/polymer-cli).
3. cd to your project's main folder, and type `polymer build`.

Your build is output to the `build/bundled-custom` folder.

### Multiple builds, both bundled and unbundled

This example gives two builds - bundled and unbundled.

`polymer.json` {.caption}

```json
...
"builds": [
  {
    "name": "bundled",
    "bundle": true,
    "js": {"minify": true},
    "css": {"minify": true},
    "html": {"minify": true}
  },
  {
    "name": "unbundled",
    "js": {"minify": true},
    "css": {"minify": true},
    "html": {"minify": true}
  }
]
...
```  

To build this configuration:

1. Edit your `polymer.json` file to include the build configuration above.
2. Ensure that you have installed the latest version of the [Polymer CLI](/{{{polymer_version_dir}}}/docs/tools/polymer-cli).
3. cd to your project's main folder, and type `polymer build`.

Your builds are output to two separate folders, corresponding to their names: `build/bundled` and `build/unbundled`.
 

### Build presets

**Build presets** provide an easy way to define common build configurations in your [polymer.json file](/{{{polymer_version_dir}}}/docs/tools/polymer-json). You can use a preset as-is, or define a build configuration that inherits from a preset. 

We currently support three build presets:

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
  - js: `{minify: true, compile: false}`
  - css: `{minify: true}`
  - html: `{minify: true}`
  - bundle: `true`
  - addServiceWorker: `true`
  - addPushManifest: `true`
  - insertPrefetchLinks: `true`
- **es6-unbundled:**
  - js: `{minify: true, compile: false}`
  - css: `{minify: true}`
  - html: `{minify: true}`
  - bundle: `false`
  - addServiceWorker: `true`
  - addPushManifest: `true`
  - insertPrefetchLinks: `true`

Any additional options that you provide will override the given preset. In the example below, a single "es5-bundled" build will be created with all the es5-bundled preset options except "addServiceWorker", which was overriden and set to false:

```json
"builds": [{
  "preset": "es5-bundled",
  "addServiceWorker": false
}]
```

## Building with `polymer-build` {#use-polymer-build}

Consider using `polymer-build` instead of the CLI if you:

* Want to customize your build(s) without using the Polymer CLI
* Need to run your source code through custom optimizers/processors before, after, or during your build
* Need to hook additional work into any part of the build process

You can use the `polymer-build` tools with a task runner like [gulp](http://gulpjs.com/). Here's an [example gulpfile.js](https://github.com/PolymerElements/generator-polymer-init-custom-build/blob/master/generators/app/gulpfile.js
) that uses the `polymer-build` library.

For detailed information on `polymer-build`, see the [`polymer-build` README](https://github.com/Polymer/polymer-build).

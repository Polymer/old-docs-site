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

* If your application is written entirely in Polymer and does not use any other tools or frameworks, you can simply use the Polymer CLI to build your application. You can configure your build, or create multiple builds, by writing a [`polymer.json`](https://www.polymer-project.org/2.0/docs/tools/polymer-json) configuration file.
* If you need a custom build process, for example, to integrate another tool into your build chain, you can use the `polymer-build` library. 

## Understanding the transforms

The Polymer CLI and `polymer-build` library support the following transforms:

* Splitting inline JavaScript and CSS from HTML files
  
  To deploy in an environment that uses CSP (Content Security Policy), some app developers will need to split inline JavaScript from HTML.
  
  **TODO: what is the Polymer build tool that does this, and how does it do it?** 
  
  `foo.html` {.caption}
  ````html
  <body>
    <h1></h1>
    <p>Lorem ipsum dolor sit amet.</p>
    <script>
      ...
    </script> 
  </body>
  ````
  
  `foo.html` {.caption}
  ````html
  <body>
    <h1></h1>
    <p>Lorem ipsum dolor sit amet.</p>
  </body>
  ````
  
  `foo.js` {.caption}
  ````javascript
    <script>
      ...
    </script>
  ````
  
* Minifying HTML, JavaScript and CSS
  
  The Polymer build tools **which ones?** minify HTML, JavaScript and CSS by:
  
  * Stripping whitespace
  * Stripping comments
  * ...? 

* Compiling ES6 to ES5

  Polymer 2.x and its native elements are wirtten using ES6, allowing class definitions, inheritance and modular code. Support for ES6 is required in order for a browser to implement the [custom elements](https://developers.google.com/web/fundamentals/getting-started/primers/customelements) specification.
  
  As of writing, ES6 code can be run without compilation in the latest versions of Chrome, Safari 10, Safari Technology Preview, Firefox, and Edge. Internet Explorer, See [this browser compatibility table](http://caniuse.com/#search=es6) for more up-to-date information.

  The Polymer CLI and polymer-build library support compiling ES6 to ES5 at build time. 

  For best performance, you should serve ES6 code to browsers that support it, and only serve ES5 code to browsers that don't support ES6.

  However, If you need to statically host your code and serve a single version to all browsers, you should compile all code to ES5. In this case, you can include a shim - a lightweight polyfill that lets compiled ES5 work on browsers that support native custom elements.
  
  **TODO: Can we link to this shim? Is it in here? [https://github.com/es-shims](https://github.com/es-shims)**
  
* Bundling resources together to reduce the total number of HTTP requests to download the app/page.
  
  Web pages that use multiple HTML Imports, external scripts, and stylesheets to load dependencies may end up making lots of network round-trips. In many cases, this can lead to long initial load times and unnecessary bandwidth usage. The Polymer build tools can follow HTML Imports and external script and stylesheet references, inlining these external assets into "bundles" to be used in production.

## Build choices

Your build choices will reflect the environments you will be deploying to.

### One build or multiple builds?

* Static hosting services like [GitHub Pages](https://pages.github.com/) and [Firebase Hosting](https://firebase.google.com/docs/hosting/) don't support serving different files to different user agents. If you're hosting your application on one of these services, you'll need to serve a single build.
  
  If you're serving a single build to all browsers _and_ you need to support browsers that don't support ES6, such as IE11 and Safari 9, then this build needs to be compiled to ES5.
  
* If you need to serving multiple builds, your web server must perform user-agent detection and serve different content to different browsers. The Polymer CLI and `polymer build` tools both permit you to configure multiple build outputs.

### To bundle or not to bundle?

The decision of whether to build bundled or unbundled resources depends on the behaviour and capabilities of both server and browser. 

With HTTP/2 push, support for the PRPL pattern is possible:

* Push critical resources for the initial route.
* Render initial route.
* Pre-cache remaining routes.
* Lazy-load and create remaining routes on demand.

This pattern requires an unbundled build.

Because not all browsers support HTTP/2 push, you will also need to create an unbundled build.

### Polyfills?

**TODO: Elaborate on why/how this is part of the build process**

* Use webcomponents-loader.js? 
* Full polyfill? 
* Add them differentially?

## Building with the CLI

You can define your build options by editing the `builds` object in your project's `polymer.json` configuration file. For detailed information on `polymer.json`, see the [`polymer.json` specification](https://www.polymer-project.org/2.0/docs/tools/polymer-json).

### Example 1: A single, compiled, bundled build

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
2. Ensure that you have installed the latest version of the [Polymer CLI](https://www.polymer-project.org/2.0/docs/tools/polymer-cli).
3. cd to your project's main folder, and type `polymer build`.

Your build is output to the `build/default` folder.

### Example 2: Output both bundled and unbundled builds

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
2. Ensure that you have installed the latest version of the [Polymer CLI](https://www.polymer-project.org/2.0/docs/tools/polymer-cli).
3. cd to your project's main folder, and type `polymer build`.

Your builds are output to two separate folders, corresponding to their names: `build/bundled` and `build/unbundled`. 

## Building with polymer-build

Consider using polymer-build instead of the CLI if you:

* Want to customize your build(s) without using the Polymer CLI
* Need to run your source code through custom optimizers/processors before, after, or during your build
* Need to hook additional work into any part of the build process

```bash
insert simple example here
````

**TODO: What would be a common use case for including another tool in an app developer's build process?**

For detailed information on `polymer-build`, see the [`polymer-build` README](https://github.com/Polymer/polymer-build).
---
title: Build for production
---

<!-- toc -->

## Quick start

To build a Polymer 3.0 app:

  1.  Update Polymer CLI (`npm install -g polymer-cli@next`).

  2.  Create [`polymer.json`](/{{{polymer_version_dir}}}/docs/tools/polymer-json) in your top-level project folder.

  3.  From the same folder as `polymer.json`, run `polymer build`.

After `polymer build` completes, you'll find production-ready builds in the `build` folder.

Try building the Polymer 3.0 Starter Kit app:

```bash
npm install -g polymer-cli@next
mkdir my-app
cd my-app
polymer init polymer-3-starter-kit
polymer build
```

## Overview

The Polymer 3.0 library and elements use code that must be transformed to load in a web browser. The Polymer build tools handle this transformation, and let you package your app to work with the capabilities of your hosting service and the browsers you support.

[Learn more about the transforms](#transforms) offered by the Polymer build tools.

To build your Polymer 3.0 project, do one of two things:

  *   [Build your project with Polymer CLI](#buildwithcli). For most projects, you can simply use Polymer CLI to configure and run `polymer build`.

  *   [Use the polymer-build library](#buildwithlibrary). For projects that require integration with other build tools, the `polymer-build` library offers greater customization.

## Build your project with Polymer CLI {#buildwithcli}

To build your project for the web with Polymer CLI:

  1.  [Decide on hosting features and supported browsers](#decide).
  2.  [Create a polymer.json file for your project](#createpolymerjson).
  3.  [Add build configuration/s to polymer.json](#configs).
  3.  [Run `polymer build`](#runpolymerbuild).

### Decide on hosting features and supported browsers {#decide}

Your ideal build configuration will depend on the browsers you need to support, and the capabilities of your hosting environment:

  *   [Will you serve different builds to different browsers?](#differential)
  *   [Will your hosting service use HTTP/2 Push?](#http2push)
  *   [Which browsers will you support?](#browsersupport)
  
#### Will you serve different builds to different browsers? {#differential}

If your hosting service lets you implement user agent detection and serve different files to different user agents, you can deploy multiple builds. This gives users of modern browsers all the performance benefits of native ES6 modules, HTTP/2 Push, and so on, while still enabling older browsers to load your app.

Static hosting services like [GitHub Pages](https://pages.github.com/) and [Firebase Hosting](https://firebase.google.com/docs/hosting/) don't support serving different files to different user agents. If you're hosting your application on one of these services, generate a single build. The configuration for that single build will depend on the browsers you decide to support.

#### Will your hosting service use HTTP/2 push?

With HTTP/2 push, you can use the PRPL pattern:

* Push critical resources for the initial route.
* Render initial route.
* Pre-cache remaining routes.
* Lazy-load and create remaining routes on demand.

The PRPL pattern requires an unbundled build. However, if your hosting service doesn't use HTTP/2 push, you may need to bundle your builds.

#### Which browsers will you support?

Polymer 3.0 uses modern JavaScript features and the Web Components standards, both of which are implemented (or in the process of being implemented) by a growing number of browsers. [See the browser compatibility documentation for more information](browsercompat).

The Polymer build tools offer a range of transforms to generate builds that run well on the widest possible range of browsers. In the next sections, you'll configure builds based on the transforms required by the browsers you support.

[Learn more about the transforms](#transforms).

### Create a polymer.json file for your project

You can enter most of the Polymer CLI build options from the command line, but it's much easier to store your configurations in a [polymer.json file](/{{{polymer_version_dir}}}/docs/tools/polymer-json).

To create a polymer.json file for your project:

  1.  In the top-level folder for your project, open `polymer.json` for editing, or create `polymer.json` if it doesn't exist.

  2.  Edit `polymer.json`:
  
      * Set your app's `"entrypoint"`, `"shell"`, `"sources"` and `"extraDependencies"` properties. See the [polymer.json documentation](/{{{polymer_version_dir}}}/docs/tools/polymer-json) for more information on setting these properties.

      * Create the `"builds"` array, if it doesn't already exist.

      polymer.json {.caption}

      ```js
      {
        "entrypoint": "index.html",
        "shell": "src/start-polymer3.js",
        "sources": [
          "src/start-polymer3.js",
          "manifest/**",
          "package.json"
        ],
        "extraDependencies": [
          "manifest.json",
          "node_modules/@webcomponents/webcomponentsjs/**"
        ],
        "builds": []
      }
      ```

  3.  `"builds"` is an array of **build configuration objects**. In the next section, you'll create a build configuration object for each build you want to generate. Separate the build configurations with commas. 
  
      When you're done, `polymer.json` will look similar to one of the following examples:

      polymer.json with a single build {.caption}

      ```json
      {
        "entrypoint": "index.html",
        "shell": "src/start-polymer3.js",
        "sources": [
          "src/start-polymer3.js",
          "manifest/**",
          "package.json"
        ],
        "extraDependencies": [
          "manifest.json",
          "node_modules/@webcomponents/webcomponentsjs/**"
        ],
        "builds": [
          { /* single build config */ }
        ]
      }
      ```

      polymer.json with multiple builds {.caption}

      ```json
      {
        "entrypoint": "index.html",
        "shell": "src/start-polymer3.js",
        "sources": [
          "src/start-polymer3.js",
          "manifest/**",
          "package.json"
        ],
        "extraDependencies": [
          "manifest.json",
          "node_modules/@webcomponents/webcomponentsjs/**"
        ],
        "builds": [
          { /* build config 1 */ },
          { /* build config 2 */ },
          ...,
          { /* build config n */ }
        ]
      }
      ```

### Add one or more build configurations to polymer.json

In this section, you'll find example `polymer.json` build configurations to generate the following:

* [A single build for maximum browser compatibility](#onebuildforall).
* [A single build for most modern browsers](#onebuildformodern).
* [Multiple builds for serving based on user-agent detection](#multibuild).

Use the following examples to add one or more build configurations to `polymer.json`.

#### Single build for maximum compatibility {#onebuildforall}

This build has the widest possible browser compatibility, but can't take advantage of modern performance features like HTTP/2 Push. It is suitable if you can't serve different files based on user agent detection, and you need to support older browsers. 

You will also need to [include the webcomponents-bundle.js polyfills](polyfills).

polymer.json {.caption}

```json
...
"builds": [{ "preset": "es5-bundled" }]
...
```

This single build uses the `"es5-bundled"` preset. [See the documentation on polymer.json for more information on build presets](/{{{polymer_version_dir}}}/docs/tools/polymer-json). The `"es5-bundled"` preset:

  * Minifies html, css and JavaScript.
  * Compiles JavaScript to ES5 code for older browsers, and includes the `custom-elements-es5-adapter.js` to make ES5 code work in ES6-capable browsers.
  * Transforms ES modules to AMD modules.
  * Bundles source files.
  * Generates a service worker for your app. 

To tweak this or any other preset for your requirements, override the settings in the build preset by setting the properties yourself:

polymer.json {.caption}

```json
...
"builds": [{ 
  "preset": "es5-bundled",
  "html": { "minify": false}, 
  "addServiceWorker": false,
}]
...
```

[See the polymer.json documentation](/{{{polymer_version_dir}}}/docs/tools/polymer-json) for more information.

#### Single build for most modern browsers {#onebuildformodern}

This build lets modern browsers take advantage of ES6 features. With the [webcomponents-bundle.js polyfills](polyfills), it will load on most modern browsers. It will not load on IE11.

```json
...
"builds": [{ "preset": "es6-bundled" }]
...
```

This single build uses the `"es6-bundled"` preset. [See the documentation on polymer.json for more information on build presets](/{{{polymer_version_dir}}}/docs/tools/polymer-json). The `"es6-bundled"` preset:

  * Minifies html, css and JavaScript.
  * Compiles JavaScript to ES2015 code.
  * Transforms ES modules to AMD modules.
  * Bundles source files.
  * Generates a service worker for your app. 

To tweak this preset for your requirements, you can override settings in the build preset by setting the properties yourself:

```json
...
"builds": [{ 
  "name": "mybuild",
  "preset": "es6-bundled",
  "html": { "minify": false}, 
  "addServiceWorker": false,
}]
...
```

[See the polymer.json documentation](/{{{polymer_version_dir}}}/docs/tools/polymer-json) for more information.

#### Multiple builds {#multibuild}

To deploy multiple builds, you need to implement user agent detection in your hosting service, and be able to serve different files to different user agents.

The unbundled build configurations below generate a [push manifest](). To use push capabilities, your hosting service needs to be capable of HTTP/2 push.

polymer.json {.caption}

```
```json
...
"builds": [
  { "preset": "es5-bundled" },
  { "preset": "es6-unbundled" },
  { "preset": "uncompiled-unbundled" },
]
...
```

This configuration generates three builds:

* A bundled build that compiles JavaScript code to es5 and transforms ES modules to AMD modules, suitable for older browsers. It is bundled and won't be able to use the PRPL pattern.
* An unbundled build that compiles JavaScript code to es2015 and transforms ES modules to AMD modules. It is suitable for most modern browsers, and for serving an implementation of the PRPL pattern.
* An uncompiled, unbundled build that serves ES modules as-is. It is suitable for serving an implementation of the PRPL pattern to browsers that implement the latest JavaScript features and Web Components standards.

Service workers are generated for all three builds. All three builds are minified. [See the polymer.json documentation](/{{{polymer_version_dir}}}/docs/tools/polymer-json) for more information.

### Run the polymer build command

When you've configured the builds you want to deploy, run the Polymer CLI `build` command from your top-level project folder (the folder your `polymer.json` is in).

```bash
polymer build
```

Your builds will be generated under the `build` folder, ready for deployment.

To serve a build from the Polymer CLI development server, change to its folder and run the Polymer CLI development server. For example:

```bash
cd build/es6-unbundled
polymer serve 
```

## Use the polymer-build library {#buildwithlibrary}

Consider using `polymer-build` instead of Polymer CLI if you:

* Want to customize your build(s) without using the Polymer CLI
* Need to run your source code through custom optimizers/processors before, after, or during your build
* Need to hook additional work into any part of the build process

You can use the `polymer-build` tools with a task runner like [gulp](http://gulpjs.com/). 

For detailed information on `polymer-build`, see the [`polymer-build` README](https://github.com/Polymer/polymer-build).

## Learn more about the build transforms {#transforms}

The Polymer build tools offer the following build transforms:

* [Rewrite module specifiers to paths](#rewrite).
* [Find and resolve dynamic imports](#dynamic).
* [Minify code](#minify).
* [Compile JavaScript to ES2015 or ES5](#compile).
* [Transform ES modules to AMD modules](#amd).
* [Bundle your source files](#bundle).
* [Service workers]().

### Rewrite module specifiers to paths {#rewrite}

The Polymer 3.0 library uses **module specifiers**, rather than paths, to load dependencies. For example:

Import statement using a module specifier {.caption}

```js
import {PolymerElement} from '@polymer/polymer/polymer-element.js';
```

At the time of writing, web browsers can't load module specifiers. A web browser needs a path-whether it's a relative path, or a full URL-to follow. The example above needs to be rewritten so that a web browser can follow the link. For example: 

Import statement using a path {.caption}

```js
import {PolymerElement} from './node_modules/@polymer/polymer/polymer-element.js';
```

The exact path that gets rewritten depends on where you've installed your dependencies. Conveniently, the Polymer build tools work this out for you, using the same methods as Node.js to resolve dependencies. 

### Find and resolve dynamic imports {#dynamic}

[Dynamic imports]() let you lazy-load JavaScript modules. Polymer CLI can detect dynamic imports, provided their filenames are expressed in your code with static strings. For example:

```js
toggleThing(){
  if(condition) {
    import('./lazy-element.js').then((LazyElement) => {
      console.log("LazyElement loaded");
    }).catch((reason) => {
      console.log("LazyElement failed to load", reason);
    });
    this.loadComplete = true;
  }
}
```

To improve performance and handle bundling, the Polymer build tools analyze your project for dynamic imports. The build tools can include the lazy import in a bundled build, or for an unbundled build, in a push manifest.

Add dynamic imports to a bundled build {.caption}

```
{
  ...
  "bundle": true,
  "addPushManifest": false,
  ...
}
```

Include dynamic imports in a push manifest {.caption}

```
{
  ...
  "bundle": false,
  "addPushManifest": true,
  ...
}
```

### Minify HTML, JavaScript and CSS {#minify}

The Polymer build tools can strip whitespace and comments from your code. You can use these options on the command line, or configure them in `polymer.json`. See the [polymer.json specification](/{{{polymer_version_dir}}}/docs/tools/polymer-json) for more details.

**Function**|**CLI flag**|**Entry in polymer.json**
--- | --- | ---
Minify inlined and external JavaScript | `--js-minify` | `"js": {"minify": true}` 
Minify inlined and external CSS | `--css-minify` | `"css": {"minify": true}` 
Minify HTML | `--html-minify` | `"html": {"minify": true}` 


Use CLI options to minify JavaScript, CSS and HTML {.caption}

```bash
polymer build --js-minify --css-minify --html-minify 
```

Configure minification in polymer.json {.caption}

```
"builds": [{
  "js": {"minify": true},
  "css": {"minify": true},
  "html": {"minify": true}
}]
```

#### Compile JavaScript {#compile}

Polymer 3.x and its native elements are written using the [latest JavaScript features](https://medium.com/front-end-hacking/javascript-whats-new-in-ecmascript-2018-es2018-17ede97f36d5). 

It is best to serve native code to browsers that support it, and serve compiled code to older browsers that don't support recent features.

If you need to statically host your code and serve a single version to all browsers, however, you should compile your code. 

To compile JavaScript code:

Compile to es5 (adds custom-elements-es5-adapter.js) {.caption}

```json
...
"builds": [{
  ...
  "js": {"compile": "es5"},
  ...
}],
...
```

Compile to es2015 {.caption}

```json
...
"builds": [{
  ...
  "js": {"compile": "es2015"},
  ...
}],
...
```

#### Transform ES Modules to AMD Modules {#amd}

Polymer 3.0 and the Polymer elements use ES syntax to import and export modules. For example:

ES module syntax {.caption}

```javascript
import {OtherThing} from './other-thing.js';
...
const MyThing = (...);
...
export MyThing;
```

The Polymer build tools can transform ES modules into AMD syntax. For example:

AMD module syntax {.caption}

```javascript
define(['OtherThing'], function (OtherThing) {
  ...
  return MyThing;
});
```

See [@brianleroux's Medium post on ES6 modules](https://medium.com/@brianleroux/es6-modules-amd-and-commonjs-c1acefbe6fc0) and the [RequireJS page on AMD](http://requirejs.org/docs/whyamd.html#amd) for more information.

To transform ES modules to AMD:

```json
...
"builds": [{
  ...
  "js": {"transformModulesToAmd": true},
  ...
}],
...
```

#### Bundle your source files {#bundle}

With HTTP/2 push, you can support the PRPL pattern:

* Push critical resources for the initial route.
* Render initial route.
* Pre-cache remaining routes.
* Lazy-load and create remaining routes on demand.

This pattern requires an unbundled build-the default build type. To generate an unbundled build, leave the "bundle" option unspecified, or set it to false: 

polymer.json {.caption}

```json
...
builds[{
  ...
  "bundle": false,
  ...
}]
...
```

For a deployment that does not use HTTP/2 Push, bundling resources can minimize network round trips and increase performance. The Polymer build tools can bundle your build by following and inlining imports.

To generate a bundled build:

polymer.json {.caption}

```json
...
builds[{
  ...
  "bundle": true,
  ...
}]
...
```

#### Service workers 

Polymer build tools can add a [service worker](https://developers.google.com/web/fundamentals/primers/service-workers/) to your build. 

Service workers can cache your app's dependencies, speeding up performance and allowing the app to preserve functionality when offline.

To add a service worker to your build:

polymer.json {.caption}

```json
...
builds[{
  ...
  "addServiceWorker": true,
  ...
}]
...
```

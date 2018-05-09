---
title: Build for production
---

<!-- toc -->

## Quick start

To build a Polymer 3.0 app:

  1.  Update Polymer CLI (`npm install -g polymer-cli@next`).

  2.  Create [`polymer.json`](/{{{polymer_version_dir}}}/docs/tools/polymer-json) in your top-level project folder.

  3.  From your top-level project folder, run `polymer build`.

After `polymer build` completes, you'll find production-ready builds in the `build` folder. Serve a build locally with <code>polymer serve build/<var>your_build_name</var></code>.

Try building the Polymer 3.0 Starter Kit app:

```bash
npm install -g polymer-cli
mkdir my-app
cd my-app
polymer init polymer-3-starter-kit
polymer build
polymer serve build/default
```

## Overview

The Polymer 3.0 library and elements use code that must be transformed to load in a web browser. The Polymer build tools handle this transformation, and let you optimize your app for the capabilities of your hosting service and the browsers you support.

[Learn more about the transforms](#transforms) offered by the Polymer build tools.

To build your Polymer 3.0 project, do one of the following:

  *   [Build your project with Polymer CLI](#buildwithcli). For most projects, you can simply use Polymer CLI to configure and run `polymer build`.

  *   [Use the polymer-build library](#buildwithlibrary). For projects that require integration with other build tools, the `polymer-build` library offers greater customization.

## Build your project with Polymer CLI {#buildwithcli}

To build your project for the web with Polymer CLI:

  1.  [Decide on hosting features and supported browsers](#decide).
  2.  [Describe your project structure in polymer.json](#createpolymerjson).
  3.  [Add build configuration/s to polymer.json](#configs).
  3.  [Run `polymer build`](#runpolymerbuild).

### Decide on hosting features and supported browsers {#decide}

Your ideal build configuration will depend on the browsers you need to support, and the capabilities of your hosting environment:

  *   [Will you serve different builds to different browsers?](#differential)
  *   [Will your hosting service use HTTP/2 Push?](#http2push)
  *   [Which browsers will you support?](#browsersupport)
  
#### Will you serve different builds to different browsers? {#differential}

If your hosting service lets you implement user agent detection and serve different files to different user agents, you can deploy multiple builds. This gives users of modern browsers all the performance benefits of recent web standards, and older browsers can still run your app.

Static hosting services like [GitHub Pages](https://pages.github.com/) and [Firebase Hosting](https://firebase.google.com/docs/hosting/) don't support serving different files to different user agents. If you're hosting your application on one of these services, generate a single build. The configuration for that single build will depend on the browsers you support.

#### Will your hosting service use HTTP/2 push?

With HTTP/2 push, you can use the PRPL pattern:

* Push critical resources for the initial route.
* Render initial route.
* Pre-cache remaining routes.
* Lazy-load and create remaining routes on demand.

The PRPL pattern requires an unbundled build. However, if your hosting service doesn't use HTTP/2 push, you may need to bundle your builds.

#### Which browsers will you support?

Polymer 3.0 uses modern JavaScript features and the Web Components standards, both of which are implemented by a growing number of browsers. [See the browser compatibility documentation for more information](/{{{polymer_version_dir}}}/docs/browsers).

The Polymer build tools offer a range of transforms to create builds that run well on the widest possible range of browsers. In the next sections, you'll configure builds based on the transforms required by the browsers you support.

[Learn more about the transforms](#transforms).

### Describe your project structure in polymer.json

The [polymer.json](/{{{polymer_version_dir}}}/docs/tools/polymer-json) config file describes your project structure and defines options for how the Polymer CLI tools will interact with your project.

  1.  In a text editor, open or create a file called `polymer.json` in your top-level project folder.

  2.  Edit `polymer.json`:
  
      * Set your app's `"entrypoint"`, `"shell"`, `"sources"` and `"extraDependencies"` properties. See the [polymer.json documentation](/{{{polymer_version_dir}}}/docs/tools/polymer-json) for more information on setting these properties.

      * Create the `"builds"` array, if it doesn't already exist.

      polymer.json {.caption}

      ```js
      {
        "entrypoint": "index.html",
        "shell": "src/start-polymer3.js",
        "sources": [
          "src/**.js",
          "manifest/**",
          "package.json"
        ],
        "extraDependencies": [
          "manifest.json",
          "node_modules/@webcomponents/webcomponentsjs/bundles/**"
        ],
        "builds": []
      }
      ```

`"builds"` is an array of **build configuration objects**. In the next section, you'll create a build configuration object for each build you want to generate.
  
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
    "node_modules/@webcomponents/webcomponentsjs/bundles/**"
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

Create one or more build configurations. For example:

* [A single build for maximum browser compatibility](#onebuildforall).
* [A single build for most modern browsers](#onebuildformodern).
* [Multiple builds for serving based on user-agent detection](#multibuild).

Add the build configurations to polymer.json. If you create multiple configurations, separate them with commas:

```
"builds": [
    { /* build config 1 */ },
    { /* build config 2 */ },
    { /* build config 3 */ }]
```

For more information on configuring a build, see the [polymer.json spec](/{{{polymer_version_dir}}}/docs/tools/polymer-json).

#### Single build for maximum compatibility {#onebuildforall}

This build has the widest possible browser compatibility, but can't take advantage of modern performance features like HTTP/2 Push. It is suitable if you can't serve different files based on user agent detection, and you need to support older browsers. 

**Load the polyfills from your app entrypoint**. To work in older browsers, your app still needs to [load the polyfills](/{{{polymer_version_dir}}}/docs/polyfills), usually from `index.html`.

Build for maximum compatibility {.caption}

```json
...
"builds": [{ "preset": "es5-bundled" }]
...
```

This build configuration:

  * Rewrites module specifiers to paths.
  * Bundles source files.
  * Minifies html, css and JavaScript.
  * Compiles JavaScript to ES5 code for older browsers, and includes the `custom-elements-es5-adapter.js` to make ES5 code work in ES6-capable browsers.
  * Transforms ES modules to AMD modules.
  * Generates a service worker for your app. 

This build configuration uses the `"es5-bundled"` preset. [See the documentation on polymer.json for more information on build presets](/{{{polymer_version_dir}}}/docs/tools/polymer-json).

Override a preset option by configuring it yourself:

Override preset options {.caption}

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

This build lets modern browsers take advantage of ES6 features. With the [webcomponents polyfills](/{{{polymer_version_dir}}}/docs/polyfills), it will load on most modern browsers. It will not load in Internet Explorer.

Build for compatibility with most modern browsers {.caption}

```json
...
"builds": [{ "preset": "es6-bundled" }]
...
```

This build uses the `"es6-bundled"` preset. [See the documentation on polymer.json for more information on build presets](/{{{polymer_version_dir}}}/docs/tools/polymer-json). 

This build configuration:

  * Rewrites module specifiers as paths.
  * Bundles source files.
  * Minifies html, css and JavaScript.
  * Compiles JavaScript to ES6 (ES2015).
  * Transforms ES modules to AMD modules.
  * Generates a service worker for your app. 

Override a preset option by configuring it yourself:

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

The unbundled build configurations below generate a [push manifest](#pushmanifest). To use push capabilities, your hosting service needs to be capable of HTTP/2 push.

polymer.json {.caption}

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

* A bundled build, `es5-bundled`, that compiles JavaScript code to es5 and transforms ES modules to AMD modules, suitable for older browsers. It is bundled and won't be able to use the PRPL pattern.
* An unbundled build, `es6-unbundled`, that compiles JavaScript code to es6 (es2015) and transforms ES modules to AMD modules. It is suitable for most modern browsers, and for serving an implementation of the PRPL pattern.
* An uncompiled, unbundled build, `uncompiled-unbundled`, that serves ES6 modules as-is. It is suitable for serving an implementation of the PRPL pattern to browsers that use the latest JavaScript features.

Service workers are generated for all three builds. All three builds are minified. A push manifest is generated for the unbundled builds. [See the polymer.json documentation](/{{{polymer_version_dir}}}/docs/tools/polymer-json) for more information.

### Run the polymer build command

When you've configured the builds you want to deploy, run the Polymer CLI `build` command from your top-level project folder.

```
polymer build
```

Your builds will be generated under the `build` folder, ready for deployment.

You can also serve a build locally. For example, from your top-level project folder:

```bash
polymer serve build/es6-unbundled
```

## Use the polymer-build library {#buildwithlibrary}

Consider using `polymer-build` instead of Polymer CLI if you:

* Want to customize your build(s) without using the Polymer CLI.
* Need to run your source code through custom optimizers/processors before, after, or during your build.
* Need to hook additional work into any part of the build process.

You can use the `polymer-build` tools with a task runner like [gulp](http://gulpjs.com/). 

For detailed information on `polymer-build`, see the [`polymer-build` README](https://github.com/Polymer/polymer-build).

## Learn more about the build transforms {#transforms}

The Polymer build tools offer the following build transforms:

* [Rewrite module specifiers to paths](#rewrite).
* [Bundle your source files](#bundle).
* [Find and resolve dynamic imports](#dynamic).
* [Minify HTML, JavaScript and CSS](#minify).
* [Compile JavaScript to ES2015 or ES5](#compile).
* [Transform ES modules to AMD modules](#amd).
* [Add a service worker](#serviceworker).
* [Create a push manifest](#pushmanifest).

### Rewrite module names to paths {#rewrite}

The Polymer 3.0 library supports Node-style module resolution, using package names, rather than paths, to load dependencies. For example:

Import statement using a module name {.caption}

```js
import {PolymerElement} from '@polymer/polymer/polymer-element.js';
```

At the time of writing, web browsers only support paths, not names, as module specifiers. The example above needs to be rewritten so that a web browser can follow the link:

Import statement using a path {.caption}

```js
import {PolymerElement} from './node_modules/@polymer/polymer/polymer-element.js';
```

The exact path that gets rewritten depends on where you've installed your dependencies. Conveniently, the Polymer build tools work this out for you, using the same methods as Node.js to resolve dependencies. 

### Bundle your source files {#bundle}

Bundling your source files concatenates them into a few larger files. This can increase performance for a deployment where HTTP/2 Push isn't available. To create a bundled build:

Create a bundled build {.caption}

```json
...
"builds": [{
  ...
  "bundle": true,
  ...
}]
...
```

For a server configuration that supports HTTP/2 push, leave your resources unbundled. To create an unbundled build, leave the `"bundle"` option unspecified, or set it to false: 

Create an unbundled build {.caption}

```json
...
"builds": [{
  ...
  "bundle": false,
  ...
}]
...
```

### Find and resolve dynamic imports {#dynamic}

A dynamic import loads a module on-the-fly. This lets you implement lazy-loading, only requesting modules that your user needs. For example:

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

Include the path to your dynamic imports in the `"sources"` property in polymer.json. For example:

polymer.json {.caption}

```json
...
"sources": ["src/**", "lazy-src/**"],
"builds": [{...}]
...
```

**You don't need to list dynamic imports as fragments.** The latest Polymer build tools analyze your code and find your dynamic imports, provided they are expressed with static strings. There's no need to list them as separate fragments.

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

### Compile JavaScript {#compile}

Polymer 3.x and the Polymer Elements are written in ES6 (also known as ES2015). To allow older browsers to render your apps, compile your code to ES5. 

When you compile your code to ES5, the Polymer build tools will inject the [`custom-elements-es5-adapter.js` polyfill](polyfill) into your entrypoint so that ES6-capable browsers can still render your ES5 code.

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

For the best performance, serve ES6 code to browsers that implement it. Only serve compiled code to older browsers.

If your code uses JavaScript features newer than ES6, and your target browsers don't, you can also compile to ES6:

Compile to ES6 {.caption}

```json
...
"builds": [{
  ...
  "js": {"compile": "es2015"},
  ...
}],
...
```

See the [polymer.json spec](/{{{polymer_version_dir}}}/docs/tools/polymer-json) for more information.

### Transform ES6 Modules to AMD Modules {#amd}

Polymer 3.0 and the Polymer elements use ES syntax to import and export modules. For example:

ES6 module syntax {.caption}

```javascript
import {OtherThing} from './other-thing.js';
...
const MyThing = (...);
...
export MyThing;
```

The Polymer build tools can transform ES modules into AMD syntax. AMD modules can be 
loaded on browsers that don't support native ES6 modules. 

To transform ES modules to AMD:

Transform ES modules to AMD {.caption}

```json
...
"builds": [{
  ...
  "js": {"transformModulesToAmd": true},
  ...
}],
...
```

### Add a service worker {#serviceworker}

Polymer build tools can add a [service worker](https://developers.google.com/web/fundamentals/primers/service-workers/) to your build. 

Service workers can cache your app's dependencies, speeding up performance and allowing the app to function when offline.

To add a service worker to your build:

Add a service worker {.caption}

```json
...
builds[{
  ...
  "addServiceWorker": true,
  ...
}]
...
```

### Add a push manifest {#pushmanifest}

A push manifest is a list of static resources that your web app might need when it runs. HTTP/2 push-capable servers can read this file to send resources more efficiently. Using a push manifest helps you make a lazy loading pattern work well for your users. 

You don't need a push manifest to use HTTP/2, but it is useful for telling your server what critical resources to push for the requesting page.

Add a push manifest to your build {.caption}

```json
...
builds[{
  ...
  "addPushManifest": true,
  ...
}]
...
```

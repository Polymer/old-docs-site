---
title: Build for production
---

<!-- toc -->

The Polymer 3.0 library and elements use code that must be **transformed** in order to run on a web browser. During development, the Polymer CLI development server (`polymer serve`) performs some of these transforms on the fly. 

**Polymer 3.0 code must be built for deployment**. At a minimum, module specifiers such as `@polymer/polymer/polymer-js` must be rewritten to paths such as `./node_modules/@polymer/polymer/polymer-js`. The Polymer build tools can also optimize your code for performance, and ensure that your app runs well on a range of browsers. [Learn more about the build transforms](#transforms). { .alert } { .alert-info }

To buid your Polymer 3.0 project for production, do one of two things:

  *   [Build your project for the web with Polymer CLI](#buildwithcli). For most projects, you can simply use Polymer CLI to configure and run `polymer build`.

  *   [Use the polymer-build library](#buildwithlibrary). For projects that require integration with other build tools, the `polymer-build` library offers greater customization.

## Build your project for the web with Polymer CLI {#buildwithcli}

To build your project for the web with Polymer CLI:

  1.  [Decide on browsers to support and hosting features to use](#decide). Blah blah.
  2.  [Create one or more **build configurations** in `polymer.json`](#configs). Create `polymer.json` configuration file with build configs.
  3.  [Run `polymer build`](#runpolymerbuild). Generate the builds by running `polymer build` in the same folder as `polymer.json`. 

### Decide on supported browsers and hosting features

Your ideal build configuration will depend on the browsers you need to support, and the capabilities of your hosting environment. 

  *   [Will you serve different builds to different browsers?](#differential)
  *   [Which browsers will you support?](#browsersupport)
  *   [HTTP/2 Push?](#http2push)

#### Will you serve different builds to different browsers? {#differential}

The Polymer build tools can generate multiple builds. If your hosting service lets you implement user agent detection and serve different files to different user agents, you can deploy multiple builds and serve an optimal build based on browser capabilities.

Static hosting services like [GitHub Pages](https://pages.github.com/) and [Firebase Hosting](https://firebase.google.com/docs/hosting/) don't support serving different files to different user agents. If you're hosting your application on one of these services, you'll need to serve a single build; the config for that single build will depend on the browsers you need to support.

#### Will your hosting service use HTTP/2 push?

Unbundled is better if your server does use HTTP/2. Multiple requests can be sent at once so there's no point concatenating them.

If your server doesn't do it, you'll need to bundle.

**Most browsers handle HTTP/2 push nowadays**. See caniuse. That is why I haven't included this in the browser support section.

#### Which browsers will you support?

Now that you know whether to do one or more builds, and whether or not to bundle, decide which browser each build will support.

Transforms for browser compatibility:

* Compilation
* AMD modules
* ES6 or ES5
* Dynamic imports

[Learn more about the transforms](#transforms).

To support **all browsers**: 

  * With a single build, do X.
  * With user-agent detection and multiple builds, do Y.

To support **most modern browsers**: 

  * With a single build, do X.
  * With user-agent detection and multiple builds, do Y.

### Create a polymer.json configuration file

  1.  In the top-level folder for your project, open `polymer.json` for editing, or create `polymer.json` if it doesn't exist.

  2.  Edit `polymer.json`.
  
      * Set your app's `"entrypoint"`, `"shell"`, `"sources"` and `"extraDependencies"` properties. See the [polymer.json spec]() for more information on what to put in these properties.
      * Set `"npm"` to `true`. 
      * Set `"moduleResolution"` to `"node"`. 
      * Create the `"builds"` array, if it doesn't already exist.

      For example:

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
        "npm": true,
        "moduleResolution": "node",
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
        "npm": true,
        "moduleResolution": "node",
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
        "npm": true,
        "moduleResolution": "node",
        "builds": [
          { /* build config 1 */ },
          { /* build config 2 */ },
          ...,
          { /* build config n */ }
        ]
      }
      ```

### Add one or more build configurations to polymer.json

In this section, you'll find example `polymer.json` build configuration objects to generate the following:

* [A single build for all browsers](#onebuildforall)
* [A single build for most modern browsers](#onebuildformodern)
* [Multiple builds for serving based on user-agent detection](#multibuild)

#### Single build for all browsers {#onebuildforall}

* Widest browser compatibility, but can't take advantage of modern performance features.
* Works on static servers that only serve 1 thing.
* Doesn't require HTTP2 or push from server or browser.
* Nearly all browsers will load this, but you need the webcompoents-bundle.js and custom-elements-es5-adapter.js [polyfills]().

```json
...
"builds": [{ "preset": "es5-bundled" }]
...
```

This single build uses the `"es5-bundled"` preset. [See the documentation on polymer.json for more information on build presets](polymer-json#presets). The `"es5-bundled"` preset:

  * Minifies html, css and JavaScript.
  * Compiles JavaScript to ES5 code for older browsers. Note: newer, ES6-native browsers will need `custom-elements-es5-adapter.js` to run this build. See the documentation on [polyfills] for more information.
  * Transforms ES modules to AMD modules.
  * Bundles source files.
  * Generates a service worker for your app. 

To tweak this preset for your requirements, you can override settings in the build preset by setting the properties in the build configuration object:

```json
...
"builds": [{ 
  "name": "mybuild",
  "preset": "es5-bundled",
  "html": { "minify": false}, 
  "addServiceWorker": false,
}]
...
```

[See an example of a single-build polymer.json configuration for all browsers]().

#### Single build for most modern browsers {#onebuildformodern}

* Can't take advantage of modern performance features.
* Works on static servers that only serve 1 thing.
* Doesn't require HTTP2 or push from server or browser.
* Won't load on IE.
* ES6-native browsers won't need custom-elements-es5-adapter polyfill. Firefox, Safari and Edge will still need webcomponents-bundle.js.

```json
...
"builds": [{ "preset": "es6-bundled" }]
...
```

This single build uses the `"es6-bundled"` preset. [See the documentation on polymer.json for more information on build presets](polymer-json#presets). The `"es6-bundled"` preset:

  * Minifies html, css and JavaScript.
  * Compiles JavaScript to ES2015 code.
  * Transforms ES modules to AMD modules.
  * Bundles source files.
  * Generates a service worker for your app. 

To tweak this preset for your requirements, you can override settings in the build preset by setting the properties in the build configuration object.

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

[See an example of a single-build polymer.json configuration for most browsers]().

#### Multiple builds {#multibuild}

* You need to implement user agent detection in your hosting service, and be able to serve different files based on user agent, to use this configuration.
* Your hosting service also needs to be capable of HTTP/2 push.

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

Generates three builds:

* A bundled build that compiles to es5 and AMD modules, suitable for older browsers when the webcomponents-bundle.js polyfills are included.
* An unbundled build that compiles to es2015 and AMD modules, and uses HTTP2/push. Most browsers will handle this if the webcomponents-bundle.js polyfills are included.
* An uncompiled, unbundled build. Chrome will serve this one and you can take advantage of the PRPL pattern, dynamic imports, new JavaScript features, etc. 

Service workers are generated for all three builds. All three builds are minified.

[See an example of a configuration with multiple builds](#)

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

* Rewrite module specifiers to paths
* Find and resolve dynamic imports
* Minify code
* Compile JavaScript from X to Y
* Transform ES modules to AMD modules
* Bundling
* Service workers 

### Rewrite module specifiers to paths

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

### Find and resolve dynamic imports

[Dynamic imports]() let you lazy-load stuff. To make this faster, the Polymer build tools analyze your project and find any imports. Then either includes it in the bundle or, for an unbundled build, includes it in the push manifest, if your configuration generates one.

Provided an import is a static string, build tools wil find them. No need to add it to a list of fragments.

### Minify code

Polymer build tools can strip whitespace, comments, and smoosh your code into something illegible but small. This makes it go faster.

#### Compile JavaScript from X to Y

adsljfaldsjf
jalkj;adlskfj

#### Transform ES Modules to AMD Modules

dsfkajlj adsflkjas;dlkfj adskl;fj ds

#### Bundle 

* Some browsers need everything in the one file, that's lame. Polymer build tool does this.
* Some don't do HTTP 2 push. Again, lame, but Polymer build still handles it.

With HTTP/2 push, support for the PRPL pattern is possible:

* Push critical resources for the initial route.
* Render initial route.
* Pre-cache remaining routes.
* Lazy-load and create remaining routes on demand.

This pattern requires an unbundled build (the default build type).

#### Service workers 

* Service workers, precaching

For more information, see the [Polymer 3.0 browser compatibility documentation](/{{{polymer_version_dir}}}/docs/browsers)

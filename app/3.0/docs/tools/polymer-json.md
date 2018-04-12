---
title: polymer.json specification
---

<!-- toc -->

Create a `polymer.json` file in your top-level project folder to configure the behavior of [Polymer CLI](polymer-cli) tools for your Polymer project. See the [Polymer 3.0 Sample App](https://github.com/PolymerLabs/start-polymer3/blob/master/polymer.json) for a working example.

Example { .caption }

```json
{
  "root": "~/projects/my-project",
  "entrypoint": "index.html",
  "shell": "src/my-project.js",
  "fragments": [
    "src/lazy-element.js"
  ],
  "sources": [
   "src/my-project.js",
   "manifest/**",
   "package.json"
  ],
  "extraDependencies": [
    "manifest.json",
    "node_modules/@webcomponents/webcomponentsjs/**"
  ],
  "moduleResolution": "node",
  "npm": true,
  "builds": [
    { 
      "name": "es5prod",
      "preset": "es5-bundled",
      "addServiceWorker": true
    },
    { 
      "name": "es6prod",
      "preset": "es6-unbundled",
      "addServiceWorker": true
    },
    { 
      "name": "dev",
      "addServiceWorker": false,
      "js": {"minify": false, "compile": false},
      "css": {"minify": false},
      "html": {"minify": false},
      "bundle": false,
      "addServiceWorker": true,
      "addPushManifest": false
    }
  ]
}
```

This page defines the available configuration options for `polymer.json`, and describes how to set them.

## Quick reference {#quickreference}

* [`root`](#root). Specify the path to the root project folder.
* [`entrypoint`](#entrypoint). Specify the file that imports the app shell.
* [`shell`](#shell). Specify the app shell.
* [`fragments`](#fragments). Specify your project's dynamic dependencies.
* [`sources`](#sources). Specify your app's source files and folders.
* [`extraDependencies`](#extradependencies). Specify undiscoverable dependencies that won't be bundled.
* [`builds`](#builds). Configure one or more builds for your project.
* [`autoBasePath`](#autobasepath). Set the base path for each build to its name.
* [`lint`](#lint). Configure lint warnings.
* [`npm`](#npm). Specify whether to use the `node_modules` folder as the `componentDir` option.
* [`componentDir`](#componentdir). Specify the folder in which web components are located.
* [`moduleResolution`](#moduleresolution). Use Node.js-style module resolution to convert package names to paths.

## root

Optional string.

```json
"root": "myfolder"
```

```json
"root": "/full/path/to/myfolder"
```

The path to the root project folder. This can be an absolute path, or a path relative to the current working directory. Defaults to the current working directory.

## entrypoint

Optional string.

```json
"entrypoint": "index.html"
```

The main entrypoint to your app for all routes, often index.html. This file should import the app shell file specified in the `shell` property. It should be as small as possible since it’s served for all routes.

## shell

**Required** string.

```json
"shell": "my-app.js"
```

The app shell. Contains the main code that boots the app and loads necessary resources. The shell usually includes the common UI for the app, and the router, which loads resources needed for the current route.

## fragments

Optional array of strings.

```json
"fragments": [
  "src/shop-list.js",
  "src/shop-detail.js",
  "src/shop-cart.js",
  "src/shop-checkout.js",
  "src/lazy-resources.js"
]
```

This property supports dynamic dependencies. It is an array of any JavaScript filenames that are not statically imported from the app shell.

If a fragment has static dependencies, provided the fragment is defined in this property, the Polymer build analyzer will find them. You only need to list the dynamic import.

In a Polymer app, the files listed in the fragments property usually contain one or more element definitions that may or may not be required during the user’s interaction with the app,and can thus be lazily loaded.

## sources

Optional array of strings. Defaults to `["src/**/*"]`.

```json
"sources": [
  "data/**/*",
  "images/**/*",
  "src/**/*",
  "bower.json"
]
```

An optional array of globs matching your application source files. If left out, defaults to all files in your project `src/` directory. You’ll need to set this if you store your source files in other locations.

## extraDependencies

Optional array of strings.

```json
"extraDependencies": [
  "manifest.json",
  "node_modules/@webcomponentsjs/**"
],
```

Dependencies that the analyzer component of the Polymer build toolchain can’t discover, possibly because they're not statically imported, and that do not need to be bundled.

## builds

Optional array of build configuration objects.

* [Overview: Build configuration](#overview)
* [Inherit build config options from a preset](#inherit)
  * [`preset`](#preset)
* [Basic build customization options](#basic)
  * [`name`](#name)
  * [`basePath`](#basepath)
  * [`browserCapabilities`](#browsercapabilities)
* [Service worker, push manifest, and precache options](#swprepush)
  * [`addServiceWorker`](#addServiceWorker)
  * [`addPushManifest`](#addPushManifest)
  * [`swPrecacheConfig`](#swPrecacheConfig)
  * [`insertPrefetchLinks`](#insertPrefetchLinks)
* [`bundle`: Configure build bundling options](#bundling)
  * [`exclude`](#exclude)
  * [`inlineCss`](#inlineCss)
  * [`inlineScripts`](#inlineScripts)
  * [`rewriteUrlsInTemplates`](#rewriteUrlsInTemplates)
  * [`sourcemaps`](#sourcemaps)
  * [`stripComments`](#stripComments)
* [Source file processing options](#srcprocessing)
  * [`html`](#html)
  * [`css`](#css)
  * [`js`](#js)

### Overview: Build configuration in polymer.json {#overview}

Use the `builds` array to configure one or more builds to be generated by the `polymer build` command.

```js
"builds": [
  {
    "preset": "es5-bundled",
    "name": "mybuildname",       
    "basePath": "somethingelse", 
    "browserCapabilities": ["es2015", "push"],
    "addServiceWorker": true, 
    "addPushManifest": true,  
    "swPrecacheConfig": "sw-precache-config.js", 
    "insertPrefetchLinks": true,
    "bundle": {             
      "exclude": ["path/to/file.js", "..." ], 
      "inlineCss": true,          
      "inlineScripts": true,      
      "rewriteUrlsInTemplates": true, 
      "sourcemaps": true,     
      "stripComments": true,    
    },
    "html": {            
      "minify": {        
        "exclude": ["path/to/file.html", "..." ]
      }
    },
    "css": {              
      "minify": {       
        "exclude": ["path/to/file.css", "..." ]
      }
    },
    "js": {              
      "minify": {         
        "exclude": ["path/to/file.js", "..." ]   
      },
      "compile": {        
        "exclude": ["path/to/file.js", "..." ]   
      }
    }
  },
  { 
    "name": "buildname",
     ... 
  }, 
  { 
    "name": "buildname",
     ... 
  }
]
```

### Inherit build config options from a preset {#inherit}

#### preset

Optional string.

```json
"builds": [
  { "preset": "es5-bundled" }
]
```

Use build presets to easily create a build from a set of predefined options. We currently have presets for `es5-bundled`, `es6-bundled` and `es6-unbundled` builds. 

The following example uses presets to generate two builds (`es5-bundled` and `es6-bundled`):

```json
...
  "builds": [
    { "preset": "es5-bundled" }, 
    { "preset": "es6-unbundled" }
  ],
...
```

The presets are equivalent to the following build configurations:

es5-bundled

```json
{
  "name": "es5-bundled",
  "js": {"minify": true, "compile": true},
  "css": {"minify": true},
  "html": {"minify": true},
  "bundle": true,
  "addServiceWorker": true,
  "addPushManifest": false,
}
```

es6-bundled

```json
{
  "name": "es6-bundled",
  "browserCapabilities": ["es2015"],
  "js": {"minify": true, "compile": false},
  "css": {"minify": true},
  "html": {"minify": true},
  "bundle": true,
  "addServiceWorker": true,
  "addPushManifest": false,
}
```

es6-unbundled

```json
{
  "name": "es6-unbundled",
  "browserCapabilities": ["es2015", "push"],
  "js": {"minify": true, "compile": false},
  "css": {"minify": true},
  "html": {"minify": true},
  "bundle": false,
  "addServiceWorker": true,
  "addPushManifest": true,
}
```

If you supply additional options for a build that inherits a preset, your options will override the preset's. For example, the following build configuration inherits all options from es5-bundled, but overrides `addServiceWorker` to `false`:

```json
"builds": [{
  "preset": "es5-bundled",
  "addServiceWorker": false
}]
```

### Basic build customization options {#basic}

```json
"builds": [{
  "name": "mybuildname",       
  "basePath": true,  
  "browserCapabilities": ["es2015", "push"]
}]
```

#### name

Optional string.

```json
"name": "mybuildname"
```

An optional name for your build. If multiple builds are defined, the name property is required.
   
#### basePath {#basepath}

Optional string.

To set <code>&lt;base href="<var>buildname</var>"&gt;</code>:

```json
"basePath": true
```

To set `<base href="some/other/path">`:
```json
"basePath": "some/other/path"
```

Update the entrypoint's `<base>` tag to support serving this build from a non-root path, such as when performing differential serving based on user agent. Requires that a `<base>` tag already exists.

If `true`, use the `name` property for the corresponding build configuration in the [`builds` array](#builds). If a string, use that value. Leading and trailing slashes are optional.

Note that `basePath` must be set to `true` if using prpl-server.

You can automatically set `basePath` to `true` for all build configurations in the builds array by setting the [top-level `autoBasePath` option](#autobasepath) to `true`.

#### browserCapabilities {#browsercapabilities}

Optional array of strings.

```json
"browserCapabilities": ["es2015", "push", "serviceworker"]
```

Denotes the capabilities required for a browser to consume this build. Values are `es2015`, `push` and `serviceworker`. For more information, see the [prpl-server-node README](https://github.com/Polymer/prpl-server-node#capabilities).

### Service worker, push manifest, and precache options {#swprepush}

```json
"builds": [{
  ...
  "addServiceWorker": true, 
  "addPushManifest": true,   
  "swPrecacheConfig": "sw-precache-config.js", 
  "insertPrefetchLinks": true
  ...
}]
```
  
#### addServiceWorker

Optional boolean.

```json
"addServiceWorker": true
```

If true, generate a service worker for your application.

#### addPushManifest

Optional boolean.

```json
"addPushManifest": true
```

If true, generate an [HTTP/2 Push Manifest](https://github.com/GoogleChromeLabs/http2-push-manifest) for your application.
  
#### swPrecacheConfig

Optional string.

```json
"swPrecacheConfig": "sw-precache-config.js"
```

An optional configuration file for the generated service worker. Defaults to `sw-precache-config.js`.
  
#### insertPrefetchLinks

Optional boolean.

```json
"insertPrefetchLinks": true,
```

If true, insert prefetch link elements into your fragments so that all dependencies are prefetched immediately.

### Build output bundling options {#bundling}

#### bundle 

Optional object.

```json
"builds": [{
  ...
  "bundle": {             
    "exclude": ["path/to/file.js", "..." ], 
    "inlineCss": true,          
    "inlineScripts": true,       
    "rewriteUrlsInTemplates": true, 
    "sourcemaps": true,          
    "stripComments": true,   
  }
  ...
}]
```

* `exclude`: A list of paths of files and/or folders that should not be inlined.

  ```json
  "exclude": [ "path/to/file.js", "path" ]
  ```

* `inlineCss`: If true, inline external CSS file contents into `<style>` tags.

  ```json
  "inlineCss": true 
  ```
  
* `inlineScripts`: If true, inline external Javascript file contents into `<script>` tags.

  ```json
  "inlineScripts": true 
  ```
  
* `rewriteUrlsInTemplates`: If true, rewrite URLs in element attributes and style tags inside templates when inlining html.

  ```json
  "rewriteUrlsInTemplates": true 
  ```
     
  Defaults to `false` for Polymer 3.x and Polymer 2.x; for Polymer 1.x, or where the Polymer CLI can't identify the version you're using, `rewriteUrlsInTemplates` defaults to `true`. 
  
  **URLs in element attributes and style tags inside templates are not re-written in Polymer 3.x**. URLs in attributes and styles inside element templates should be bound using `importPath` or `rootPath` where appropriate. See the documentation on [URLs in DOM templates](/{{{polymer_version_dir}}}/docs/devguide/dom-template#urls-in-templates) for more information.
  {.alert .alert-info}
  
* `sourcemaps`: Create identity source maps for inline scripts.

  ```json
  "sourcemaps": true 
  ```
  
* `stripComments`: Remove all comments except those tagged `@license`, or starting with `<!--!` or `<!--#`.
  
  ```json
  "stripComments": true 
  ```

### Source file processing options {#sourceprocessing}

```json
"builds": [
  {
    ...
    "html": {            
      "minify": { 
        "exclude": ["path/to/file.html", "..." ] 
      }
    },
    "css": {              
      "minify": true
    },
    "js": {
      "minify": {         
        "exclude": ["path/to/file.js", "..." ]   
      },
      "compile": {      
        "exclude": ["path/to/file.js", "..." ]   
      }
    }
    ...
  }
]
```

* `html`: An object containing a configuration option for HTML: 
  * `minify`: If `true`, minify all HTML.

* `css`: An object containing a configuration option for CSS:
  * `minify`: If `true`, minify all CSS.

* `js`: An object containing configuration options for Javascript:
  *   `minify`: If `true`, minify all JS.
  *   `compile`: If `true`, use babel to compile all ES6 JS down to ES5.

## autoBasePath {#autobasepath}

Optional boolean.

```json
"autoBasePath": true
```

Set the [`basePath` property](#basepath) to `true` for all build configurations in the [`builds` array](#builds).

## lint

Optional object.

```json
"lint": {
  "rules": ["polymer-2"],
  "ignoreWarnings": []
}
```

Use the `lint` property to control the warnings you receive from `polymer lint`, and from `polymer-lint` when run from the command line or used by an IDE plugin.

### rules

Optional array of strings. 

```json
"lint": {
  "rules": ["polymer-2"]
}
```

`rules` is an array of linting rules and/or rule collections.

Most projects will use one of the following rule collections:

#### polymer-2: Warn for bad Polymer 2.x syntax
    
```json
"lint": {
  "rules": ["polymer-2"]
}
```

#### polymer-2-hybrid: Warn for bad hybrid Polymer 2.x/1.x syntax

```json
"lint": {
  "rules": ["polymer-2-hybrid"]
}
```

#### polymer-1: Warn for bad Polymer 1.x syntax

```json
"lint": {
  "rules": ["polymer-1"]
}
```

#### Warn for specific syntax errors

To receive warnings for specific instances of bad syntax, add the relevant rule to the `rules` array. For example, the following configuration warns for:

* Data bindings that use undeclared properties, and
* Callback overrides that fail to call the superclass callback.

```json
"lint": {
  "rules": ["databind-with-unknown-property", "call-super-in-callbacks"]
}
```
  
For a full list of available rules and rule collections, run `polymer help lint` from the command line.

### ignoreWarnings

Optional array of strings.

To ignore a warning, add it to the `ignoreWarnings` array. For example, the following configuration warns for bad Polymer 2.x syntax, but ignores code that sets undeclared properties or attributes in HTML:

```json
"lint": {
  "rules": ["polymer-2"],
  "ignoreWarnings": ["set-unknown-attribute"]
}
```

For a full list of available rules, run `polymer help lint` from the command line.

## npm

Optional boolean.

```json
"npm": true
```

When true, tells the build process to look for components in `node_modules`.

## componentDir

Optional string.

```json
"componentDir": "path/to/components"
```

The folder containing this project's components. When the [`npm` option](#npm) is set to `true`, this option is automatically set to the `node_modules` folder.

## moduleResolution

Optional string. Defaults to `"none"`.

Defines how to resolve module specifiers in import and export statements when rewriting them to be web-compatible. 

To disable module specifier rewriting:

```json
"moduleResolution": "none"
```

To use Node.js resolution to find modules:

```json
"moduleResolution": "node"
```

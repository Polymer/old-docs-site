---
title: polymer.json specification
---

<!-- toc -->

Create a `polymer.json` to configure your project for the [Polymer CLI](polymer-cli) tools, and set options for building, linting, and serving your app.

Place `polymer.json` in your root project folder.

See the [shop app](https://github.com/Polymer/shop/blob/3.0/polymer.json) for a working sample of a `polymer.json` file.

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

** Required ** string.

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

### Overview 

```js
"builds": [
  {
    /* Inherit build config options from a preset */ 
    "preset": "es5-bundled",

    /* Basic custom build configuration options */
    "name": "mybuildname",       // Output folder name
    // "basePath": true,         // In entrypoint, set <base href="mybuildname"> 
    "basePath": "somethingelse", // In entrypoint, set <base href="somethingelse">  
    "browserCapabilities": ["es2015", "push"], // Browser features required for this build

    /* Service worker, push manifest, and precache options */
    "addServiceWorker": true,    // Generate a service worker. Caches files on the client
    "addPushManifest": true,     // Generate an HTTP/2 Push Manifest
    "swPrecacheConfig": "sw-precache-config.js", // sw precache config filename
    "insertPrefetchLinks": true, // Insert prefetch code. Fragments, entrypoints and app shell
    
    /* Bundling options */
    // "bundle": true,      // Bundle fragments together to reduce number of file requests
    "bundle": {             // "bundle" Can be a boolean or an object
      "exclude": ["path/to/file.js", "..." ], // Exclude these files from bundling
      "inlineCss": true,           // Inline external CSS file contents into <style> tags
      "inlineScripts": true,       // Inline external JS file contents into <script> tags
      "rewriteUrlsInTemplates": true, // Rewrite element attrs in templates for inline html
      "sourcemaps": true,          // Create identity source maps for inline scripts
      "stripComments": true,       // Remove comments, except '@license', `<!--!` or `<!--#`
    },

    /* Source file processing options */ 
    "html": {            
      // "minify": true, // Minify HTMl by removing comments and whitespace
      "minify": {        // "minify" can be a boolean or an object
        "exclude": ["path/to/file.html", "..." ] // Minify all HTML files except these
      }
    },
    "css": {              
      // "minify": true,  // Minify inlined and external CSS
      "minify": {         // "minify" can be a boolean or an object
        "exclude": ["path/to/file.css", "..." ]  // Minify all CSS files except these
      }
    },
    "js": {              
      // "minify": true,  // Minify inlined and external JavaScript
      "minify": {         // "minify" can be a boolean or an object
        "exclude": ["path/to/file.js", "..." ]   // Minify all JS files except these
      },
      // "compile": true, // Use babel to compile all ES6 JS down to ES5 for older browsers
      "compile": {        // "compile" can be a boolean or an object
        "exclude": ["path/to/file.js", "..." ]   // Compile all JS files except these
      }
    }
  }//, 
  /* More build objects can go here...
  { 
    "name": "buildname",
     ... 
  }, 
  { 
    "name": "buildname",
     ... 
  }, 
  */
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

polymer.json { .caption }

```json
...
  "builds": [
    { "preset": "es5-bundled" }, 
    { "preset": "es6-unbundled" }
  ],
...
```

The presets are equivalent to the following build configurations:

`es5-bundled`:
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

`es6-bundled`:
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

`es6-unbundled`:
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
   
#### `basePath`

Optional string.

To set `<base href="buildname">`:
```json
"basePath": true
```

To set `<base href="some/other/path">`:
```json
"basePath": "some/other/path"
```

Update the entrypoint's `<base>` tag to support serving this build from a non-root path, such as when performing differential serving based on user agent. Requires that a `<base>` tag already exists.

If true, use the build name. If a string, use that value. Leading and trailing slashes are optional.

Note that `basePath` must be set to `true` if using prpl-server.

You can automatically set `basePath` to `true` for all build configurations in the builds array by setting the top-level `autoBasePath` option to `true`.

#### browserCapabilities

Optional array of strings.

```json
"browserCapabilities": ["es2015", "push", "serviceworker"]
```

Denotes the capabilities required for a browser to consume this build. Values are `es2015`, `push` and `serviceworker`. For more information, see the [prpl-server-node README](https://github.com/Polymer/prpl-server-node#capabilities).

### Service worker, push manifest, and precache options

```json
"builds": [{
  "addServiceWorker": true, 
  "addPushManifest": true,   
  "swPrecacheConfig": "sw-precache-config.js", 
  "insertPrefetchLinks": true
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

### Build output bundling options

#### bundle 

Optional object.

```json
"builds": [{
  "bundle": {             
    "exclude": ["path/to/file.js", "..." ], 
    "inlineCss": true,          
    "inlineScripts": true,       
    "rewriteUrlsInTemplates": true, 
    "sourcemaps": true,          
    "stripComments": true,   
  }
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

### Source file processing options

```json
"builds": [
  {
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

## autoBasePath

Optional boolean.

```json
"autoBasePath": true
```

Set `basePath: true` on all builds.

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

The folder containing this project's components. 

## moduleResolution

Optional string.

To disable module specifier rewriting (this is the default):

```json
"moduleResolution": "none"
```

To use Node.js resolution to find modules:

```json
"moduleResolution": "node"
```

Defines how to resolve module specifiers in import and export statements when rewriting them to be web-compatible. 
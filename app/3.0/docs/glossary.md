---
title: "Polymer Glossary"
---

<!-- toc -->

## A

### AMD modules

AMD modules are loaded by a web browser using a small library. This means AMD modules can be used with browsers that don't support native ES modules. You can configure your [Polymer CLI](#polymer-cli) build settings to convert ES modules to AMD modules.

### app shell
In a progressive web app, the app shell contains the CSS, HTML and JavaScript that implements the 
UI framework common to the whole app. This can include headers, footers, menus and routing logic. 
It excludes any functionality that is specific to a route. As such, the app shell contains the code 
that surrounds the rest of the content. 

The [Polymer CLI](#polymer-cli) is designed to work with apps that use an app shell architecture. 
See [Instant Loading Web Apps with an Application Shell 
Architecture](https://developers.google.com/web/updates/2015/11/app-shell) for more information.

## B

### Bower

Bower is a package manager for web projects. Bower automates the installation of packages like custom elements and JavaScript libraries. Polymer 1.x and 2.x distribute their core library and elements via Bower. See [bower.io](https://bower.io) for more information.

In Polymer 3.0, [npm](#npm) replaces Bower as a package manager.

### bundling

Bundling concatenates an app's scripts and resources to reduce the number of network requests it takes to load dependencies. 

By contrast, if both server and browser support HTTP/2 (a newer protocol that permits concurrent resource requests), it can be acceptable to leave resources unbundled. Unbundled builds permit lazy loading of dynamic dependencies. By default, Polymer apps are unbundled.

## D
### dependency

*dependency* may refer to:

* A package dependency, such as an npm package that your project uses.
* A specific resource that is required by another, such as HTML files or JavaScript libraries. See 
also: [dynamic dependency](#dynamic-dependency), [static dependency](#static-dependency), 
[transitive dependency](#transitive-dependency).
* A data dependency in the context of the Polymer data system: a piece of data that an observer, 
computed property or computed binding depends on.

### dynamic import()
A [dynamic JavaScript `import()` statement](#https://developers.google.com/web/updates/2017/11/dynamic-import) loads a module. In contrast to static [import](#import) statements, dynamic imports load based on code execution, and can take a computed string.

The Polymer 3.0 build tools will find your dynamic imports and include them in your build if you use string literals to identify them.

## E
### eager loading
Eager loading refers to the process of loading dependencies statically, rather than on demand. 
Compare [lazy loading](#lazy-loading).

### entry point
The HTML actually loaded by the browser to start the application. Usually `index.html`. In an 
application built with an [app shell](#app-shell) architecture, the entrypoint is loaded for many 
different URLs.

### ES (ES5, ES6/ES2015)

ECMAScript. A specification created to standardize JavaScript. 

ES5 and ES6 (ES2015) are editions of ECMAScript; ES6 adds features to ES5, such as [imports](#import).

The Web Components standards and the Polymer library are based on ES modules, a JavaScript feature added in ES6. Unlike AMD modules, which must be loaded with a library, ES modules are available natively in modern browsers. You can configure the [Polymer CLI](#polymer-cli) build tools to compile your code so that older browsers can still run your app.

### ES modules

ES modules use JavaScript `import` to load bindings that have been `export`ed by another ES module. Polymer uses ES modules to package the features of the Polymer library and load their dependencies.

## F
### fragment
Fragments are resources, such as custom element definitions, that are only loaded if the user follows a route that requires them. Fragments can be used by a bundler to identify resources that should be packaged together.

## G
### git
A distributed version control system. 

### gulp
A streamed JavaScript task runner that can be used to set up a custom build process using the 
[`polymer-build` library](#polymer-build).

## I
### import

The [JavaScript `import` statement](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import) loads an ES module. Polymer 3.0 uses `import` statements to load the Polymer library, utilities and elements. `import` is an [ES6](#es6) feature.

## L
### lazy loading
Lazy loading takes advantage of routing to load elements only when they are required for render. 
Used correctly, lazy loading can improve performance.

For an example implementation of lazily-loaded elements, see the [Shop 
app](https://github.com/Polymer/shop). In the Shop app, views are elements which are instantiated 
only when they are routed to. 

### linter
A linter analyzes source code and warns you about possible errors. Polymer CLI includes [`Polymer Linter`](#polymer-linter).

## M
### monolithic
A monolithic app is one that loads all of its code statically and does not use an app shell 
architecture or dynamic code loading.

## N
### Node.js
An environment for writing JavaScript applications and server-side code. Works with a package manager, npm. [Polymer CLI](#polymer-cli) and the Polymer Elements
are built on Node. For more information, visit [nodejs.org](https://nodejs.org).

### npm
npm is a package manager for [Node.js](#node-js). The Polymer library and core elements are distributed via npm.

## P
### package.json
A metadata file used by [npm](#npm) to manage project dependencies.

### Polymer CLI
A command line tool for Polymer projects. Polymer CLI has a number of tools for working with 
Polymer and Web Components. For more information, see the [Polymer CLI documentation](/{{{polymer_version_dir}}}/docs/tools/polymer-cli).

#### `polymer build` {#build-command}

Polymer CLI command. Takes a build configuration from command line options, or from a [polymer.json file](#polymer-json), and packages your app for deployment on a web server. 

`polymer build` is a convenient wrapper for the [`polymer-build`](#polymer-build) library. Use the `polymer-build` library itself if you need greater customization of your build process.

#### `polymer init`
Initializes a Polymer project. Contains a set of starter templates for elements and apps. 

#### `polymer install`
Calls `npm install`.

#### `polymer lint`
Calls [`polymer-linter`](#polymer-linter) to analyze your code for potential problems. 

#### `polymer serve`
This command starts [`polyserve`](#polyserve), a simple development server for Web Components.

#### `polymer test`
Runs tests for your Polymer app with [`web-component-tester`](#web-component-tester).

### Polymer Analyzer
A static analysis tool for Web Components. Used by the tools in Polymer CLI to parse your code. For more information, see the [README](https://github.com/Polymer/tools/tree/master/packages/analyzer).

### polymer-build
`polymer-build` is a library for building Polymer projects. `polymer-build` allows you to completely customize your build process and integrate it with other tools. For more information, see the the [README](https://github.com/Polymer/tools/tree/master/packages/build).

### Polymer Bundler
Polymer build tool that follows HTML Imports and `<script>` tags to concatenate resources into a 
single page for production. Can improve performance by reducing network trips.

### Polymer Linter
[Linter](#linter) invoked by `polymer lint` command. Warns you about potential problems in your Polymer code-for example, data binding with a property that doesn't exist, or using deprecated CSS selectors. For more information, see the [README](https://github.com/Polymer/tools/tree/master/packages/linter).

### `polymer.json` {#polymer-json}
Configuration file. Sets options for how Polymer CLI tools should interact with your project, and defines the output of the `polymer build` command. Use polymer.json to create one or more build configurations, and to specify the locations of source files, data files, and extra dependencies. 

### progressive web app 
A progressive web app (PWA) is a reliable, fast web site that works seamlessly on mobile, tablet and desktop. A PWA has the look-and-feel of a native application and delivers content when offline, but is served over HTTPS via any modern web browser. 

## R
### routing
Routing is the process an app uses to determine how to respond to a client request for a particular 
endpoint. A default route is the endpoint the app directs the user to when no route is specified. 
In a progressive web app, the [app shell](#app-shell) performs routing.

## S
### service worker

A service worker is a script that your browser runs in the background, separate from a web page, 
opening the door to features that don't need a web page or user interaction. Today, they already 
include features like push notifications and background sync.

For progressive web applications, a service worker can help to make an application usable offline 
in a meaningful way. For example, on first accessing a particular site, a service worker could 
fetch a defined set of resources and cache them. Then, the service worker could act as a 
client-side proxy, intercepting network requests for resources. Where possible, the service worker 
could supply those resources from the browser cache. 

### static dependency
A [dependency](#dependency) that is required by a given file, and whose import is hard-coded using 
syntax like `<link rel="import">` or `<script src="...">`. This dependency will always be loaded 
when the given file is loaded.

### transitive dependency

A transitive dependency is an indirect dependency - that is, a resource that is depended on by 
another dependency.

For example, if file A depends on file B, and file B depends on file C, then file C is a transitive 
dependency of file A. 

The *transitive dependencies* of a resource are all the dependencies, direct and indirect, that a 
resource depends on.

## W
### web-component-tester
A browser-based testing environment for web components. Runs your tests in local browsers or 
remotely via Sauce. 

---
title: "Polymer Tools Glossary"
---

<!-- toc -->

# A
## app shell
In a progressive web app, the app shell contains the minimum CSS, HTML and JavaScript to load the basic UI. [Polymer CLI](#polymer-cli) is designed to work with apps that use an app shell architecture. See [Instant Loading Web Apps with an Application Shell Architecture](https://developers.google.com/web/updates/2015/11/app-shell) for more information.

# B
## bower
bower is a package manager for the Web. The Polymer toolchain uses bower to manage and install elements for reuse in apps and in other elements. See [bower.io](https://bower.io) for more information.

## bower.json
`bower.json` is a manifest used by bower for configuring packages for use as dependencies. See [the `bower.json` specification](https://github.com/bower/spec/blob/master/json.md) for more information.

# C
## crisper
crisper extracts inline scripts from an HTML file. This is useful if you need to run a transformation on your JavaScript, such as a minifier or a transpiler. You could also use crisper to separate JavaScript from HTML in order to deploy in an environment that uses CSP (Content Security Policy).

# D
## dependency
In the context of Polymer apps, a dependency is a resource (a file or set of files) required by your application, such as HTML files or JavaScript libraries. Dependencies should be declared in [`polymer.json`](#polymer-json) to ensure they are included in your build. See also: [dynamic dependency](#dynamic-dependency), [static dependency](#static-dependency), [transitive dependency](#transitive-dependency).

In the context of the Polymer data system, a dependency is a piece of data that an observer, computed property or computed binding depends on.

## dependency variants
Polymer dependencies vary based on the version of Polymer in which you are implementing your element. In the context of Polymer tools, a variant is a version of your element that is built using a specific version of Polymer. 

Variants are useful for testing elements against different versions of Polymer, where [`bower.json`](#bower-json) would normally only let you install and test against one version

If you run `polymer install --variants`, the `polymer install` tool creates separate builds for your element using the versions of Polymer you specify. You can use the [Polymer development server](#polyserve) to test these variants. 

## dynamic dependency
A dynamic dependency is a dependency that is imported at runtime, using a mechanism such as `importHref`. Compare [static dependency](#static-dependency).

# E
## eager loading
Eager loading refers to the process of loading dependencies statically, rather than on demand. Compare [lazy loading](#lazy-loading).

## entry point
The HTML actually loaded by the browser to start the application. Usually `index.html`. In an application built with an [app shell](#app-shell) architecture, the entrypoint is loaded for many different URLs.

# F
## fragment
Fragments are used to define bundles and are often associated with routes or non-critical resources. A fragment is a lazily-loaded HTML file. 

# G
## git
A distributed version control system. bower depends on git to install components from their GitHub repositories.

## gulp
A streamed JavaScript task runner that can be used to set up a custom build process using the [`polymer-build` library](#polymer-build).

# H
## hydrolysis
This tool has been renamed to [Polymer Analyzer](#polymer-analyzer). It is a static analysis framework for Web Components. 

# L
## lazy loading
Lazy loading takes advantage of routing to load elements only when they are required for render. Used correctly, lazy loading can improve performance.

For an example implementation of lazily-loaded elements, see the [Shop app](https://github.com/Polymer/shop). In the Shop app, views are elements which are instantiated only when they are routed to. 

## linter
A linter is a piece of software that analyzes code for suspicious-looking constructions that can potentially cause errors; for example, for example, registering an element without specifying its tag name, or using invalid data-binding syntax. The Polymer tools include [`polymer-linter`](#polymer-linter), which does this for Polymer apps and elements.

# M
## monolithic
A monolithic app is one that loads all of its code statically and does not use an app shell architecture or dynamic code loading.

# N
## Node.js
An event-driven JavaScript runtime environment. The [Polymer CLI](#polymer-cli) and [bower](#bower) are both built on Node.

## npm
Package management system for [Node.js](#node-js).

# P
## package.json
A metadata file used by [npm](#npm) to manage project dependencies.

## polyclean
A set of basic gulp plugins for cleaning HTML. Includes code to remove comments and whitespace.

## Polymer CLI
A command line tool for Polymer projects. The Polymer CLI has a number of tools for working with Polymer and Web Components. For more information, see the [Polymer CLI documentation](polymer-cli).

### `polymer build`
This command builds your project with a preconfigured build pipeline. It calls `polymer-build` with options configured for a build suitable for an [app shell](#app-shell) app.

To customize your build pipeline, you can use `polymer-build` itself in conjunction with other build tools.

### `polymer init`
Initializes a Polymer project. Contains a set of starter templates for elements and apps. 

### `polymer install`
Install command for Polymer apps. Installs [bower](#bower) dependencies, equivalent to running `bower install`. With the option `--variants`, also installs any [dependency variants](#dependency-variants) specified in the `variants` property of [`bower.json`](#bower-json).

### `polymer lint`
Invokes [`polymer-linter`](#polymer-linter) to [lint](#linter) a polymer project.

### `polymer serve`
This command starts [`polyserve`](#polyserve), a simple development server for Web Components.

### `polymer test`
Runs tests for your Polymer app with [`web-component-tester`](#web-component-tester).

## polymer-build
`polymer-build` is a library for building Polymer projects. `polymer-build` allows you to completely customize your build and combine additional streams and build tasks in any order. 

Compare the `polymer build` command, which calls `polymer-build` with preconfigured options. 

## polymer-bundler
Polymer build tool that follows HTML Imports and `<script>` tags to concatenate resources into a single page for production. Can improve performance by reducing network trips.

## polymer-linter
[Linter](#linter) invoked by `polymer lint` command. Lints a Polymer project.

## polymer-analyzer
A static analysis framework for web applications. 

## `polymer.json`
`polymer.json` is the Polymer build configuration file. It lets you configure your app’s entrypoint and app shell files, instead of passing these as parameters to polymer build.

`polymer.json` also lets you specify the locations of source files, HTML fragments and additional dependencies, and configure the [Polymer linter](#polymer-linter).

## `polyserve`
`polyserve` is a locally-installable web server for developing [bower](#bower) components. 

# R
## routing
Routing is the process an app uses to determine how to respond to a client request for a particular endpoint. A default route is the endpoint the app directs the user to when no route is specified. In a PWA, the [app shell](#app-shell) performs routing.

# S
## service worker
A script that a web browser runs in the background. On first accessing a particular site, the service worker fetches a defined set of resources and caches them. Then, the service worker acts as a client-side proxy. It intercepts network requests for resources and, where possible, supplies the resources from the browser cache. 

When a service worker is installed, apps may be able to be used offline in a meaningful way.

## shell
In the [app-shell](#app-shell) design pattern, the shell is the main code that boots the app and loads necessary resources. The shell usually includes the common UI for the app, and the [router](#routing), which loads resources needed for the current route.

## static dependency
A [dependency](#dependency) that is required by a given file, and whose import is hard-coded using syntax like `<link rel="import">` or `<script src="...">`. This dependency will always be loaded when the given file is loaded.

## transitive dependencies
The entire graph of [dependencies](#dependency) for a given file. A file’s transitive dependencies are all of that file’s dependencies, plus their dependencies, and so on. 

# V
## variant
See [dependency variant](#dependency-variant).

## vulcanize
This tool has been re-named [polymer-bundler](#polymer-bundler).

# W
## web-component-tester
A browser-based testing environment for web components. Runs your tests in local browsers or remotely via Sauce. 

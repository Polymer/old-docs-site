---
title: Build for production
---

<!-- toc -->

## Overview

### Why do we need  a build process?

* Build process can optimize your app, to minimize download times.
* Polymer 2.0 is written in ES6, which needs to be compiled to ES5 to run on older browsers.
* Some environments require JavaScript to be delivered separately from HTML files. 

### What build tools are available?
* Polymer CLI can handle your building needs if you're writing a pure Polymer app and not using any other tools. You just need to write a build configuration file (`polymer.json`).
* If you need a custom build process, for example, to integrate another tool into your build chain, you can use the `polymer-build` library. 

## Understanding the transforms

The Polymer CLI and `polymer-build` library support the following transforms:

* Splitting inline JavaScript and CSS from HTML files. 
* Minifying HTML, JavaScript and CSS.
* Compiling ES6 to ES5. (some material on this in the existing browser support page.)
* Bundling resources together to reduce the total number of HTTP requests to download the app/page.

### Splitting inline js

### Minifying HTML, Javascript and CSS

### Compiling ES6 to ES5

### Bundling resources

## Decisions to make (this is a really horrible title)

### One build or multiple builds?
* If you're serving the site from a static hosting service like github pages or Firebase Hosting, you have to serve the same files to all browsers. 
* If you're serving a single build to all browsers _and_ you need to support browsers that don't support ES6 (list), then this build needs to be compiled to ES5.
* Serving multiple builds requires your server to do some kind of user-agent detection and serve different contents to different browsers.

### To bundle or not to bundle?
* If you are going to use the full PRPL pattern and push required resources, you need to create an unbundled build for browsers that support server push/HTTP2, and a bundled build for other browsers.

### Polyfills
* Use webcomponents-loader.js? Full polyfill? Add them differentially?

## Building with the CLI

### Sample 1

single-build, compiled, bundled solution

### Sample 2

multiple-build solution that includes unbundled and bundled builds

## Building with polymer-build

Simple example, then throw them out to the README, which appears to be pretty complete.

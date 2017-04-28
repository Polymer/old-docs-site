---
title: Polymer CLI
---

<!-- toc -->

## Install {#install}

The Polymer CLI can be installed with either [Yarn](https://yarnpkg.com/en/) or [npm](https://www.npmjs.com/). Yarn is the reccomended installation method due to it's faster and more dependable installations.

```bash
$ yarn add global polymer-cli
# or...
$ npm install -g polymer-cli
```

## Overview {#overview}

The Polymer CLI is our official command-line tool for Polymer projects and Web Components. Its features include:

  - **init** - Create a new Polymer project from pre-configured starter templates
  - **install** - Install dependencies and [dependency variants](https://www.polymer-project.org/2.0/docs/glossary#dependency-variants) via Bower
  - **serve**	- Serve elements and applications during development
  - **lint** - Lint a project to find and diagnose errors quickly
  - **test** - Test your project with [`web-component-tester`](https://github.com/Polymer/web-component-tester/)
  - **build**	- Build an application optimized for production
  - **analyze** - Generate an analyzed JSON representation of your element or application

Run `polymer help` for an up-to-date list of all supported commands, and run `polymer help COMMAND_NAME` for information about specific command features and options.


## Supported Dependencies {#dependencies}

Polymer CLI assumes all projects install dependencies in a flat directory. Polymer officially supports (and strongly reccomends) using [Bower](http://bower.io) for dependency management. [Yarn](https://yarnpkg.com/en/) also supports a `--flat` install, but this is considered experimental for Polymer projects at this time.

`polymer install` is a helpful shortcut to install your project's Bower dependencies (aliases to `bower install`).


#### Supported Projects {#element-imports}

Polymer CLI works with three types of projects:

* **Elements:** An element project exposes a single element or
  group of related elements to be consumed by other elements or applications. Elements are reusable and are meant to live alongside other dependencies in your project, so other components are referenced
  outside the project. Polymer tooling will help you work with these elements.
* **Simple Applications:** An application project is a web application that can be deployed as a website. Applications are self-contained, with application elements organized inside the application.
* **[App-Shell Applications]((https://developers.google.com/web/updates/2015/11/app-shell)):** A type of web application that adheres to a specific structure. App-Shell applications are more performant in production and can take advantage of additional Polymer CLI build features (automatic code bundling, HTTP/2 push manifest generation, and more). To set up, configure the `entrypoint`, `shell`, and `fragments` properties in your [`polymer.json`](polymer-json).


#### Example: Building a Polymer Element

`polymer init` offers several element templates to help you get started building a new element.

When importing dependencies inside your element, you should always use a relative URL *as if dependency is a sibling of your project.*

```
<!-- from a top-level 'some-element.html' -->
<link rel="import" href="../polymer/polymer.html">
```

This may feel weird, but remember that dependencies are siblings of each other. So write your paths as if the element is already being served as a dependency, and during development the CLI will properly serve your project as a sibling of your dependencies.


#### Example: Building an App-Shell Application

`polymer init` offers several element templates to help you get started building a new application. [Polymer Starter Kit](https://github.com/PolymerElements/polymer-starter-kit) & [Shop](https://github.com/Polymer/shop) are two application templates already configured with an App-Shell architecture.

If you're building an App-Shell application from scratch, make sure you create a [`polymer.json`](polymer-json) file for your project with `entrypoint`, `shell`, and `fragments` properties configured.

Applications should also use relative URLs to import other source files and dependencies. But because applications are served independently, they can properly reach into the dependencies directory for dependencies.

```
<!-- from a 'src/some-application.html' file in your application -->
<link rel="import" href="../bower_components/polymer/polymer.html">
```

Only one file should use absolute URLs for imports: your "entrypoint" (defaults to "index.html"). The reason is that in an App-Shell application your entrypoint is served for any URL so that your application loads on any URL. Because it can be served from anywhere, relative URLs are impossible. Use absolute URLs in the entrypoint instead.

```
<!-- from a top-level application "entrypoint" -->
<link rel="import" href="/bower_components/polymer/polymer.html">
<link rel="import" href="/src/some-application.html">
```

#### Example: Deploying an Application

When you're ready to deploy your application, check out the [Optimize for production](optimize-for-production) article for information about how to build your application for production.
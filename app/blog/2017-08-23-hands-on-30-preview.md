---
title:  "Hands-on with the Polymer 3.0 preview"
---

**Updated instructions available.** If you're using the latest Polymer 3.0 preview 
(3.0.0-pre.12 or later), see the [new blog post](/blog/2018-03-23-polymer-3-latest-preview).
The instructions in this post only apply to 3.0.0-pre.11 and earlier.
{.alert .alert-warning}

Polymer 3.0 preview is available to experiment with, and today's installment will get you started. But note that we use the word "experiment" advisedly. This is a very early preview, and there are definitely rough edges aplenty.

But fortune favors the bold—so let's press on.


## Get the tools

Before you start, you'll want to update to the latest version of Polymer CLI.


```
npm install -g polymer-cli
```


You'll also need to install the Yarn package manager to install components, as described in the [previous post](/blog/2017-08-22-npm-modules). See the [Yarn installation page](https://yarnpkg.com/en/docs/install) for instructions.

Finally, you'll need to have Chrome 61 or later or Safari 10.1  installed to run the preview code.


## Install dependencies with Yarn

The Polymer components are published to the npm registry under the `@polymer` namespace. Use Yarn to install components.

There are no `polymer init` templates for Polymer 3.0 yet, so you'll need to create your own project from scratch.

To start a new Polymer 3.0 preview project:


1.  Initialize the project. Create a new directory and run `yarn init`.

    `yarn init`

    Answer the prompts to set up your project (in most cases, you can just accept the default answer for all of the prompts).

1.  Edit the generated `package.json` file and add the `"flat": true` property.

    ```
    {
      "name": "my-app",
      "flat": true,
      ...
    ```

1.  Install components using `yarn add`, which is equivalent to `bower install --save`. For example:

    ```bash
    yarn add @polymer/polymer@next
    yarn add @webcomponents/webcomponentsjs
    ```

    Any components you previously installed from the `Polymer` or `PolymerElements` organization using Bower you can now install from the `@polymer` namespace.  <strong>Be sure to include the <code>@next</code> version to pick up the 3.0 preview packages.</strong>
    You can install the polyfills from `@wecomponents/webcomponentsjs` (no `@next` required here,
    since you're using the released version of the polyfills).


### Alternate yarn setups

If you have other npm dependencies, such as servers, dev tools, or compilers, installing all
dependencies flat may cause version conflicts. In that case, you have several options:

-   Explicitly install web components with `--flat`.

    Leave the `"flat": true` out of the `package.json` file, and add the `--flat` flag when
    adding front-end components.

    ```
    yarn add --flat @polymer/polymer@next
    ```

    For an existing project with a `package.json` file, this approach is probably less disruptive.

    This has the advantage of keeping all dependencies in a single `node_modules` folder, but means
    that you need to remember the `--flat` flag every time you add a component.

-   Use separate directories.

    Another alternative is to set up the `package.json` file in the project directory with `"flat": true` and
    add a subdirectory (for example, `tools`) with its own `package.json` for packages that need nested
    dependencies.

## Use modules

There's a lot to learn about ES6 modules if you aren't familiar with them, and this post will only touch on some of the key features.

If you're looking for a thorough background in ES6 modules, you might want to read this [chapter on modules](http://exploringjs.com/es6/ch_modules.html) from *Exploring ES6* by Dr. Axel Rauschmayer.


You can also watch Sam Thorogood's talk about ES6 modules from Polymer Summit.

<google-youtube video-id="fIP4pjAqCtQ"
          list-type="playlist"
          list="PLNYkxOF6rcIDP0PqVaJxqNWwIgvoEPzJi"
          autoplay="0"
          rel="0">
          </google-youtube>

## Import dependencies

You can import a module in HTML using  <`script type="module">`. For example, your `index.html` might look like this:


```
<!doctype html>
<html>
  <head>
    <!-- Load polyfills. Same as 2.x, except for the path -->
    <script
        src="node_modules/@webcomponents/webcomponentsjs/webcomponents-loader.js">
    </script>

    <!-- Import the my-app element's module. -->
    <script type="module" src="src/my-app.js"></script>
  </head>
  <body>
    <my-app></my-app>
  </body>
</html>
```


From inside a module, you can import a module using the `import` statement:


```
import {Element as PolymerElement}
    from "../node_modules/@polymer/polymer/polymer-element.js"
```


As with Bower dependencies, reusable elements should not include the `node_modules` in the path (for example `../@polymer/polymer/polymer-element.js`).

There are a few important things to note about modules and the `import` statement:


*   Like HTML imports, the import must use a path, not a module name.
*   The imported path **must** start with "`./`", "`../`", or "`/`".
*   The `import` statement **can only be used inside a module** (that is, an external file or inline script loaded with `<script type="module">.`
*   Modules always run in strict mode.

There are several forms of the import statement. For the most part, elements modules register an element but don't export any symbols, so you can use this simple import statement:


```
import "../@polymer/paper-button/paper-button.js"
```


For behaviors, you'll typically import the behavior explicitly:


```
import {IronResizableBehavior}
    from "../@polymer/iron-resizable-behavior/iron-resizable-behavior.js"
```


For utility modules like `Async` that export several members, you can import individual members, or import the entire module:


```
import * as Async from "../@polymer/polymer/lib/utils/async.js"

Async.microTask.run(callback);
```


Different module are structured differently; until we have a API docs for 3.0, you may need to look at the source code to figure out what a given module exports.


### Dynamic imports: not quite there yet

There's a specification for dynamic imports using the `import()` operator but it hasn't quite landed yet. The import operator acts like a function, and returns a `Promise`:


```
import('my-view1.js').then((MyView1) => {
  console.log("MyView1 loaded");
}).catch((reason) => {
  console.log("MyView1 failed to load", reason);
});
```


**The current Polymer CLI tools don't support transforming dynamic imports**, so you won't be able to use lazy-loading patterns like PRPL in 3.0 just yet. Before the production release, we'll be working on adding support for dynamic imports to the Polymer CLI and related tools.

If you're using a custom build setup using a tool like Webpack, you may be able to use dynamic imports today, but that's outside the scope of today's post.


## Defining elements

Instead of defining elements in HTML Imports, you'll define elements in ES6 modules. Aside from the obvious difference that you're writing a JavaScript file instead of an HTML file, there are three major differences in the new format:



*   Imports use ES6 import syntax, not `<link rel="import">`.
*   Templates are defined by providing a `template` getter that returns a string—not the `<dom-module>` and `<template>` elements.
*   Instead of defining globals (for example, when defining behaviors or mixins) use the `export` statement to export symbols from modules.

For example:


```
my-app.js

// Element is the same as Polymer.Element in 2.x
// Modules give you the freedom to rename the members that you import
import {Element as PolymerElement}
    from '../node_modules/@polymer/polymer/polymer-element.js';

// Added "export" to export the MyApp symbol from the module
export class MyApp extends PolymerElement {

  // Define a string template instead of a `<template>` element.
  static get template() {
    return `<div>This is my [[name]] app.</div>`
  }

  constructor() {
    super();
    this.name = '3.0 preview';
  }

  // properties, observers, etc. are identical to 2.x
  static get properties() {
    name: {
      Type: String
    }
  }
}

customElements.define('my-app', MyApp);
```


As you can see, except for the changes noted above, the  element definition looks the same as 2.x. So far there are only a handful of changes to the 2.x API, all related to dynamic imports: in particular, the `Polymer.importHref` function is no longer supported; this is slated to be replaced by dynamic ES6 imports.

For a reusable element, the import for the Polymer `Element` class would omit the `node_modules` folder:


```
import {Element as PolymerElement}
    from '../@polymer/polymer/polymer-element.js';
```



## Previewing projects

Use the new `--npm` flag when previewing or testing projects.


```
polymer serve --npm
polymer test --npm
```


The flag tells the devserver to load components from `node_modules` instead of `bower_components`, and to look for the package name in `package.json` instead of `bower.json`.

Make sure you're loading your projects in Safari 10.1 or Chrome 61 or later. The CLI doesn't do any
conversion of modules at this point, so 3.0 only works on browsers that have native module support.


## Upgrading an existing project

The Polymer Modulizer tool upgrades Polymer 2.x projects to the npm and ES6 modules format of Polymer 3.0. This tool is in a very early state. There are a number of known issues that should be resolved over the next few weeks. So if you run into problems, don't worry—we're actively working to make it as easy to use as possible.

If you still want to try Modulizer after those disclaimers, see the [README](https://github.com/Polymer/polymer-modulizer/blob/master/README.md) for instructions. You can also join the `#modulizer` channel on Slack if you have questions about Polymer Modulizer.


## What now?

Hopefully this post gets you started experimenting with the Polymer 3.0 preview. We'll have more updates over the following days and weeks. Watch this space for an announcement when Polymer Modulizer is ready for wider consumption.

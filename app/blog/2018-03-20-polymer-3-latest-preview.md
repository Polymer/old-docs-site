---
title:  "Hands-on with the latest Polymer 3.0 preview"
---

In a previous [blog post](2018-02-26-3.0-preview-paths-and-names), we announced some changes to the way we handle module imports in Polymer 3.0, and described why we made those changes. We're happy to announce that you can try out the new import syntax in the latest Polymer 3.0 preview (`3.0.0-pre.12`).

To jump right in, follow the guide in the [quick start section](#quickstart), or read on for full details.

* [Quick start with the latest preview (3.0.0-pre.12)](#quickstart)
* [Changes in v3.0.0-pre.12](#pre12changes)
  * [Renamed base element export in polymer-element.js](#renamed)
  * [Renamed polymer.js to polymer-legacy.js](#renamedlegacy)
  * [Simpler module imports](#packagenames)
* [An update on dynamic imports](#dynamicimports)
* [Tools updates](#tools)
  * [Updates to the Polymer CLI](#cliupdates)
  * [New polymer.json properties](#polymerjson)
  * [An update on yarn vs npm and element uniqueness](#uniqueness)
* [What next?](#whatnext)
* [Sample app and element with the new preview](#samples)

## Quick start with the latest preview (3.0.0-pre.12) {#quickstart}

To get started with the latest Polymer preview:

1.  Update the Polymer CLI tools:

    ```bash
    npm install -g polymer-cli@next
    ```

2.  Update the Polymer library and element dependencies in your project to use version `3.0.0-pre.12`. 

    For example, modify `package.json`:

    Before {.caption}

    ```json
    {
      "name": "start-polymer3",
      "version": "1.0.0",
      "main": "index.js",
      "repository": "https://github.com/katejeffreys/start-polymer3.git",
      "author": "Kate Jeffreys <katejeffreys@google.com>",
      "license": "MIT",
      "dependencies": {
        "@polymer/paper-checkbox": "^3.0.0-pre.11",
        "@polymer/polymer": "^3.0.0-pre.11"
      }
    }
    ```

    After {.caption}

    ```json
    {
      "name": "start-polymer3",
      "version": "1.0.0",
      "main": "index.js",
      "repository": "https://github.com/katejeffreys/start-polymer3.git",
      "author": "Kate Jeffreys <katejeffreys@google.com>",
      "license": "MIT",
      "dependencies": {
        "@polymer/paper-checkbox": "^3.0.0-pre.12",
        "@polymer/polymer": "^3.0.0-pre.12"
      }
    }
    ```

3.  Update imports that use `Element` from `polymer-element.js`. The `Element` export from `polymer-element.js` has been renamed to `PolymerElement`:

    Before {.caption}

    ```js
    import { Element as PolymerElement } from './node_modules/@polymer/polymer/polymer-element.js';
    import './node_modules/@polymer/paper-checkbox/paper-checkbox.js';
    ```

    After {.caption}

    ```js
    /* You can use package names to import the polymer library and elements now - see below for details!*/
    import { PolymerElement } from '@polymer/polymer/polymer-element.js';
    import '@polymer/paper-checkbox/paper-checkbox.js';
    ```

4.  If you use the `polymer.js` module, update import statements to use its new name, `polymer-legacy.js`:

    Before {.caption}

    ```js
    import './node_modules/@polymer/polymer/polymer.js';
    ```

    After {.caption}

    ```js
    /* You can use package names to import the polymer library and elements now - see below for details!*/
    import '@polymer/polymer/polymer-legacy.js'
    ```

5.  Remove the `node_modules` folder from your project, then reinstall dependencies: 

    ```
    cd your-root-project-folder
    rm -r node_modules
    yarn install --flat
    ```

Read on for full details on the changes in the new preview.

## Changes in 3.0.0-pre.12 {#pre12changes}

### Renamed base element export in polymer-element.js (breaking change) {#renamed}
Previously, it was necessary to change the symbol for the main export of `@polymer/polymer/polymer-element.js` from `Element` to some other symbol on import. This export has been renamed to `PolymerElement`. You can now use this symbol without changing it: 

```js
import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';

class MyApp extends PolymerElement {
  //...
}
customElements.define('my-app', MyApp);
```

### Renamed polymer.js to polymer-legacy.js (breaking change) {#renamedlegacy}

The collection of imports formerly known as `polymer.js` has been renamed to `polymer-legacy.js`. 

`polymer-legacy.js` imports:

  * The legacy element mixin and related behaviors
  * The DOM template, array selector and custom style helper elements
  * The `html` helper function

### Simpler module imports {#packagenames}

In this release, we add support for importing npm modules using their package names. From now on, we recommend using package names instead of paths to import npm modules in your Polymer apps and elements.

For example, instead of referring to the Polymer library by its path, as we did in previous Polymer 3.0 releases:

Old import syntax { .caption }

```js
import { Element as PolymerElement } from './node_modules/@polymer/polymer/polymer-element.js';
```

You can now refer to the Polymer library using its package name.

New import syntax { .caption }

```js
import { PolymerElement } from '@polymer/polymer/polymer-element.js';
```

Using package names in your imports makes it easier to install third-party dependencies, and removes the need to juggle the different path styles of elements and applications. Previously, for example, you had to import the Polymer library from `./node_modules/@polymer/polymer/polymer-element.js` in apps, and from `../@polymer/polymer/polymer-element.js` in reusable elements. Now, apps and reusable elements can both import from `@polymer/polymer/polymer-element.js`.

The Polymer CLI tools automatically resolve and rewrite imports that use package names to imports that use paths, producing web-compatible code for the browser.

At present, web browsers need the full path to an import to process it. A discussion on supporting imports by package name in browsers is ongoing-for example, see this [proposal for package name maps](https://github.com/domenic/package-name-maps). 

#### What you need to do

**If you're converting a Polymer 2.x project to Polymer 3.0:**

You don't need to change your code-the [Polymer Modulizer](https://github.com/Polymer/polymer-modulizer) will handle that. We recommend you run the modulizer with the `--import-style=name` option to generate Polymer 3.0 code that uses package names to import modules. 

**If you're updating earlier Polymer 3.0 code to use the new preview:**

We recommend you change any imports of npm packages to use package names, like in [the examples below](#examples).

**If you're writing Polymer 3.0 code with the new preview:**

We recommend you import npm packages using their package names, like in [the examples below](#examples). 

**Everyone:**

* Continue to use paths to import modules that are parts of your app. For example:
  
  ```js
  // this syntax won't change
  import './my-view.js'
  ```

  Valid import paths that start with `/`, `./`, or `../` won't be transformed by the Polymer CLI tools.

* When serving code that uses the new Polymer 3.0 preview, run `polymer serve` with the `--npm` and `--module-resolution=node` options. You can set these options from command line flags, or from `polymer.json`. See the section of this post on [Tools](#tools) for detailed instructions. 

#### Potential questions and answers

**Can I still use paths to import my dependencies?**

Yes. The Polymer CLI tools won't try to transform import paths that start with `/`, `./`, or `../` into package names.

**What happens if I mix paths and package names?**

Your code will work as normal. The Polymer CLI tools won't try to transform import paths that start with `/`, `./`, or `../` into package names.

**Which tools have been updated to handle imports that use package names?**

All of the Polymer CLI tools have been updated with this functionality (although `polymer build` is still a work in progress). Set the `--module-resolution=node` and `--npm` options to enable the new functionality. 

See the [Tools](#tools) section of this post for more detail.

#### Use the new import syntax {#examples}

To import and use the Polymer library:
```js
import { PolymerElement } from '@polymer/polymer/polymer-element.js';
...
class MyElement extends PolymerElement {
  ...
}
```

To import and use a helper element from the Polymer library:
```js
import '@polymer/polymer/lib/elements/dom-if.js';
...
class MyElement extends PolymerElement {
  <template is="dom-if">
  ...
  </template>
}
```

To import a Polymer Element:
```js
import '@polymer/paper-checkbox/paper-checkbox.js';
...
<paper-checkbox></paper-checkbox>
```

To import a behavior:
```js
import {IronResizableBehavior}
    from '@polymer/iron-resizable-behavior/iron-resizable-behavior.js';
```

You can also import entire modules in one go, like `Polymer.Async`:
```js
import * as async from '@polymer/polymer/lib/utils/async.js'
async.microTask.run(callback);
```

The Polymer 3.0 API docs are still in progress-so for the moment, refer to the [Polymer 3.0 preview source code](https://github.com/Polymer/polymer/tree/__auto_generated_3.0_preview) to determine what a module exports.

See the [MDN documentation on `import`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import) for more information. 

##### Old Polymer 3.0 preview syntax

```js
/* my-app.js
 * 
 * Old syntax used path names.
 * Also, the main export of polymer-element.js
 * was called Element and had to be renamed on import. 
 */
import { Element as PolymerElement } from './node_modules/@polymer/polymer/polymer-element.js';
import './node_modules/@polymer/polymer/lib/elements/dom-if.js';
import './node_modules/@polymer/paper-checkbox/paper-checkbox.js';
import './my-view.js';

class MyApp extends PolymerElement {
  static get template () {
    // Old syntax let you return a string literal.
    return `
      <h1>Hello World</h1>
      <template is="dom-if" if="true">
        <paper-checkbox>I like pie</paper-checkbox>
      </template>
      <my-view></my-view>
    `;
  }
}
customElements.define('my-app', MyApp);
```

```html
<!-- index.html -->
<!-- this doesn't change -->
<!-- polyfills, metadata, etc -->
<script type="module" src="./my-app.js">
<my-app></my-app>
```

##### Current Polymer 3.0 preview syntax

```js
/* 
 * my-app.js
 * 3 changes:
 * - Import statements now use package names instead of paths
 * - polymer-element.js exports PolymerElement instead of Element, no 
 *   need to rename it
 * - Import the html helper function from polymer-element.js for templates
*/
import { PolymerElement, html } from '@polymer/polymer/polymer-element';
import '@polymer/polymer/lib/elements/dom-if';
import '@polymer/paper-checkbox/paper-checkbox';
// Continue to use paths for importing other modules that are part of your app
import './my-view.js';

class MyApp extends PolymerElement {
  static get template () {
    // Always return an HTMLTemplateElement, not a string literal
    return html`
      <h1>Hello World</h1>
      <template is="dom-if" if="true">
        <paper-checkbox>I like pie</paper-checkbox>
      </template>
      <my-view></my-view>
    `;
  }
} 
customElements.define('my-app', MyApp);
```

```html
<!-- index.html -->
<!-- this doesn't change -->
<!-- polyfills, metadata, etc -->
<script type="module" src="./my-app.js">
<my-app></my-app>
```

## An update on dynamic imports {#dynamicimports}

The latest versions of Chrome and Safari support [dynamic imports using the `import()` operator](https://developers.google.com/web/updates/2017/11/dynamic-import) (a polyfill is still to come).

The import operator acts like a function, and returns a `Promise`:

```js
import('my-view1.js').then((MyView1) => {
  console.log("MyView1 loaded");
}).catch((reason) => {
  console.log("MyView1 failed to load", reason);
});
```

Dynamic imports enable lazy-loading of resources, replacing the functionality that we previously used for this in Polymer 2.0 (`Polymer.importHref()`). 

## Tools updates {#tools}

### Polymer CLI development server {#cliupdates}

The Polymer CLI development server (`polymer serve`) now resolves package names to paths, and rewrites them on-the-fly. Set the `--npm` and `--module-resolution=node` options to enable this functionality. You can set these options from command line flags, or from `polymer.json`.

To set the options from command line flags, for example: 

```bash
polymer serve --npm --module-resolution=node
```

To set the options from your `polymer.json` file, add them as top-level properties. For example:

```json
{ 
  //...
  "npm": true,
  "moduleResolution": "node",
  //...
}
```

### New polymer.json properties {#polymerjson}

To support new functionality, we made a few new `polymer.json` options you should know about. These options are all top-level properties. 

* `root`: Optional string. Defaults to the current working folder.
  
  The path to the root project folder. This can be an absolute path, or a path relative to the current working folder. 

  ```json
  "root": "/full/path/to/myfolder"
  ```
  
  ```json
  "root": "a/relative/path"
  ```

* `moduleResolution`: Optional string. Defaults to `"none"`.

  Specifies how the Polymer CLI tools will resolve package names.

  To disable module specifier rewriting: 

  ```json
  "moduleResolution": "none"
  ```
  
  To use Node.js resolution to find modules: 

  ```json
  "moduleResolution": "node"
  ```
  
* `componentDir`: Optional string. If `npm` is `true`, defaults to `"node_modules"`. 
  
  Specifies the folder containing this project's components. 

  ```json
  "componentDir": "path/to/components"
  ```

* `npm`: Optional boolean. 

  Sets `componentDir` to `"node_modules"`.

  ```json
  "npm": true
  ```

### An update on yarn vs npm and element uniqueness {#uniqueness}

Because custom elements are registered globally, web components (including the Polymer elements) require uniqueness–that is, you can’t have multiple versions of a single web component in a single project. In older previews of Polymer 3.0, we required users to use yarn and its `--flat` option to install packages and maintain uniqueness. 

This didn't work for many Polymer users. Authors of real-world projects with deep dependency graphs ran into version conflicts for some of their non-web-component dependencies. We're still working out the best way to enforce uniqueness; for example, we'd like package managers to perform deduplication, and custom elements to recognize scope. But as of Polymer 3.0.0-pre.12, **a flat installation is no longer required for a Polymer project**. 

However, **custom element uniqueness is still a requirement**, and `yarn install --flat` remains the easiest way to avoid inadvertently importing and registering multiple versions of the same custom element. If your project's dependency graph can be installed this way without any version conflict issues, it's still the best option.

If you can't use `--flat`, it's no longer a problem: you can choose to use yarn without the `--flat` option, or to use npm instead. You will, however, need to ensure that your project doesn't try to import different versions of the same custom element. 

## What next? {#whatnext}

With this preview, the core library is feature complete, marking another step on the road to a stable Polymer 3.0 release.

Here's what's still in progress:

* The Polymer CLI build tool (`polymer build`).
* Lots of testing.
* A complete set of developer and API docs for Polymer 3.0.
* The finishing touches (and lots more testing) for the Polymer 3.0 elements. See the [elements status page](https://github.com/Polymer/polymer-modulizer/blob/master/docs/polymer-3-element-status.md) for more info.
* JavaScript bundling. Our implementation is based on [Rollup](https://github.com/rollup/rollup).
* Lots more testing of the Polymer CLI tools.
* Template Polymer 3.0 apps and elements for `polymer init`.
* Did we mention testing?

[See the Polymer 3.0 Roadmap for more info](https://github.com/Polymer/project/blob/master/Roadmap.md).

## Sample app and element with the new preview {#samples}

We are working on Polymer 3.0 app and element templates that you’ll be able to generate from the Polymer CLI with the polymer init command. In the mean time, take a look at this [sample Polymer 3.0 app built with the new preview](https://github.com/PolymerLabs/start-polymer3). A [hosted demo is also available](https://start-polymer3.firebaseapp.com/).

**The sample app uses dynamic imports.** The sample app shows an example of a dynamic import for lazy-loading. For this reason, it only works in the latest versions of Chrome and Safari. { .alert }

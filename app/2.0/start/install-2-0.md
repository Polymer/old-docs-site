---
title: Install Polymer 2.x
---

<!-- toc -->

You can install Polymer via the Polymer CLI, or via Bower.

### Option 1:  Start a blank application with `polymer init`

1. Install the Polymer CLI

    ```bash
    npm install -g polymer-cli@next
    ```

2. Verify your Polymer version.

    ```bash
    polymer --version
    ```

    The output of this command should be at least `0.18.0-pre.12`.

3. Create a test folder for Polymer 2.0, and switch to it.

    ```bash
    mkdir polymer-20-test
    cd polymer-20-test
    ```

4. Initialize your project.

    ```bash
    polymer init
    ```

5. Select `polymer-2-application`.

6. Serve your project.

    ```bash
    polymer serve
    ```

### Option 2: Start from scratch with Bower

1. Install the Polymer CLI

    ```bash
    npm install -g polymer-cli@next
    ```

2. Verify your Polymer version.

    ```bash
    polymer --version
    ```

    The output of this command should be at least `0.18.0-pre.12`.

3. Install Polymer from bower

    ```bash
    bower install Polymer/polymer#2.0.0-rc.2
    ```

4. Create a test `index.html` file, and add the following in the `<head>` tag:
  - `<script src="/bower_components/webcomponentsjs-loader.js"></script>` to
  load the polyfills
  - `<link rel="import" href="/bower_components/polymer/polymer.html">` to
  import Polymer

5. Import and use whichever elements you’d like.

6. Serve your project.

    ```bash
    polymer serve
    ```

### Building for deployment

The `polymer build` tool is the easiest way to build for deployment. There are some [issues](https://github.com/Polymer/polymer-build/issues/150)
to resolve before this is an entirely smooth end-to-end experience. Until then, we strongly recommend using `polymer serve` to test your application. It uses "differential serving" to serve the correct versions of your files to each browser.

Because Polymer 2.0 uses ES6 and HTML Custom Elements, it is always best to serve ES6 to browsers with full ES6 support (currently Chrome, Firefox and Safari Tech Preview), and compiled ES5 only to older browsers that don't support ES6. If you’re unsure what the best strategy is for your project, here’s a quick overview:

|   | Easiest for cross-browser support  | Most optimal for WC v1 performance**  |
|---|-------|------|
| Server | Any server works, including static ones | Differential serving* required |
| Deployed Code | ES5 transpiled | ES6|
| Polyfill Loader | webcomponents-es5-loader.js | webcomponents-loader.js|

\* Differential serving means you must serve both ES5 and ES6, depending on client capabilities. `polymer serve` does this.

\*\* According to the native [Custom Elements V1](https://html.spec.whatwg.org/multipage/scripting.html#custom-element-conformance) spec, elements must be defined using ES6 classes. ES5-defined elements will error in the presence of native Custom Elements V1 implementations (Chrome and Safari Tech Preview). Because of this, the best approach is to differentially serve ES6 to browsers that support it (almost all of them), and ES5 to those that do not.

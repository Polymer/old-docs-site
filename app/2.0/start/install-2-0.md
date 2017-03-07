---
title: Install Polymer 2.x
---

<!-- toc -->

## Install Polymer 2.x

You can install Polymer via the Polymer CLI, or via Bower.

### Option 1: Use the Polymer CLI

1. [Install the Polymer CLI](https://www.polymer-project.org/2.0/start/toolbox/set-up#install-the-polymer-cli).

2. Verify your Polymer version. 

    `polymer --version`

    The output of this command should be `0.18.0-prerelease.11`.

3. Create a test folder for Polymer 2.x, and switch to it.

    `mkdir polymer-20-test && cd polymer-20-test`

4. Initialize your project.

    `polymer init`

5. Select `polymer-2-application`.

6. Serve and build your projet.

    ```bash
    polymer serve
    polymer build
    ```

### Option 2: Use Bower

To install via Bower, type this command:

```bash
bower install Polymer/polymer#2.0.0-rc.1
```

## Notes on loading the polyfills

For best performance, we recommend using the `webcomponents-loader.js` script for webcomponents 
polyfills. This loader conditionally loads only the polyfills needed.

Native V1 custom elements must be defined using ES6 classes. ES5 defined elements will error in the 
presence of native custom elements (Chrome and Safari Tech Preview).

Because of this, the best approach is to differentially serve ES6 to browsers that support it 
(almost all of them) and ES5 to those that do not. The server included with the Polymer CLI does 
this out of the box.

If you cannot differentially serve content, then code must be transpiled to ES5. In this case, the 
`webcomponents-es5-loader.js` script should be used to load the webcomponents polyfills. It loads a 
small shim so that ES5 element definitions function when native custom elements are supported.



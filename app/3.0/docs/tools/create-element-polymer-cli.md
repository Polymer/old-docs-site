---
title: Create an element project with the Polymer CLI
---

<!-- toc -->

This section shows you how to start an element project.

1.  Create a directory for your element project. For projects with a single element,
    it's common to name the project directory to match the element name.

    <pre><code>mkdir <var>my-el</var> && cd <var>my-el</var></code></pre>

    Where <code><var>my-el</var></code> is the name of the element you're
    creating.

1.  Initialize your element. Polymer CLI asks you a few questions as it sets up your element
    project.

        polymer init

1.  Select `polymer-3-element`.

1.  Enter a name for your element.

    The [custom elements
    specification](https://www.w3.org/TR/2016/WD-custom-elements-20160226/#concepts) requires the
    element name to contain a dash.
    {.alert .alert-info}

1.  Enter a description of the element.

At this point, Polymer CLI generates files and directories for your element, and installs your 
project's dependencies.

## Element project layout

After the initialization process Polymer CLI generates the following files and directories.

*   `README.md`. Template for a README file.
*   `demo/index.html`. Demo of <code><var>my-el</var></code>`.html`.
*   `index.html`. Automatically-generated API reference.
*   <code><var>my-el</var></code>`.js`. Element source code.
*   `node_modules/`. Project dependencies. See [Manage dependencies](#dependencies).
*   `package-lock.json`. Automatically generated control file for npm.
*   `package.json`. Configuration file for npm.
*   `polymer.json`. Configuration file for Polymer CLI.
*   `test/`<code><var>my-el</var></code>`_test.html`. Unit tests for
the element.

## Manage dependencies and JavaScript imports {#dependencies}

### Use npm to manage dependencies

Polymer CLI uses [npm](http://npmjs.com) for dependency management.

Dependencies are stored in the `node_modules` directory. You should never manually alter the
contents of this directory.

Use the npm command line tool to manage dependencies.

To download a dependency to `node_modules/` (the `--save` flag saves the new 
dependency to `package.json`):

    npm install --save @polymer/iron-ajax@next

To remove the dependency from `node_modules` and `package.json`:

    npm uninstall @polymer/iron-ajax

### Import dependencies as module specifiers

Use module specifiers to import dependencies in your source code:

```js
// from 'some-element.js'
import {PolymerElement} from '@polymer/polymer/polymer-element.js';
import '@polymer/paper-elements/paper-button.js';
```

Polymer CLI rewrites module specifiers to paths when you build or serve your app. For more information, see [Build for production](/{{{polymer_version_dir}}}/toolbox/build-for-production).

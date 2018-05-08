---
title: Create an application project with the Polymer CLI
---

<!-- toc -->

Polymer CLI supports initializing a project folder with one of several application templates.  
The `polymer-3-application` template is the most basic starting point for a Polymer-based 
application. Other templates introduce more complex layout and application patterns.

This chapter teaches you more about the `polymer-3-application` template.  
See [Polymer App Toolbox templates](/{{{polymer_version_dir}}}/toolbox/templates) for more details on other templates.

For a more full-featured progressive web app template, you can use the starter kit template 
(`polymer-3-starter-kit`). See [the Polymer Starter Kit tutorial](/{{{polymer_version_dir}}}/start/toolbox/set-up) for setup instructions.

## Set up basic app project {#basic-app}

Follow the steps below to get your basic app project set up.

1.  Create a directory for your app project.

    <pre><code>mkdir <var>app</var>
    cd <var>app</var></code></pre>

    Where <code><var>app</var></code> is the name of your project directory.

1.  Initialize your app. Polymer CLI asks you a few questions
    as it sets up your app.

        polymer init

1.  Select `polymer-3-application`.

1.  Enter a name for your app. Defaults to the name of the current directory.

1.  Enter a name for the main element in your project. The main element is the
    top-most, application-level element of your app. Defaults to the name of
    the current directory, followed by `-app`.

    The code samples throughout this doc use the example app element name
    <code><var>my-app</var></code>. When creating your app you'll want to
    replace any instance of <code><var>my-app</var></code> with the name of
    your main element.
    {.alert .alert-info}

1.  Enter a description for your app.

The Polymer CLI generates your app and installs its dependencies.

## App project layout

After creating your app, Polymer CLI generates the following files and directories:

*   `README.md`. Template README file.
*   `index.html`. Entrypoint page of the app.
*   `manifest.json`. App manifest. Provides information about your app to the browser.
*   `node_modules/`. Project dependencies. See [Manage dependencies](#dependencies).
*   `package-lock.json`. Auto-generated file for npm.
*   `package.json`. Configuration file for npm.
*   `polymer.json`. Configuration file for Polymer CLI.
*   `src/`<code><var>my-app</var>/<var>my-app</var></code>`.js`.
    Source code for main element.
*   `test/`<code><var>my-app</var>/<var>my-app</var></code>`_test.html`. Tests 
    for main element.

### Add elements

You may want to compose your main element out of smaller elements specific to your app. These 
application-specific elements should be defined in the `src` directory, at the same level as 
<code><var>my-app</var></code>.

<pre><code>app/
  src/
    <var>my-app</var>/
      <var>my-app</var>.js
    <var>my-el</var>/
      <var>my-el</var>.js</code></pre>

To add another element to the project:

1. Create a new folder under `src`.
   
    <pre><code>mkdir src/<var>my-el</var></code></pre>
   
2. Create a JavaScript module for the new element. You can use the existing app element as a starting point.
   
3. To use the new element, you'll need to import it into your application element (for example, <code><var>my-app</var>.js</code>) with an "import" statement:
   
    <pre><code>import '<var>my-el</var>/<var>my-el</var>.js';</code></pre>
   
   Don't use `polymer init` to create an element project inside your app project.

## Manage dependencies in an application project {#dependencies}

Import your dependencies using module specifiers:

    src/my-app/my-app.js {.caption}

    ```js
    import {PolymerElement} from '@polymer/polymer/polymer-element.js';
    import '@polymer/paper-button/paper-button.js';
    import '../my-el/my-el.js';
    ```

*   When importing a dependency installed using npm, use the package name, followed
    by the path to the module. 

    In the code above, for example, `@polymer/paper-button` is the name of a package
    containing the `paper-button` module, and `paper-button.js` is the path to the 
    module inside the package. Polymer CLI rewrites these specifiers to paths when
    you build your app.

*   When importing a local dependency (like `my-el.js` above), use either a relative
    path starting with `./` or `../`, or an absolute path starting with `..`. Polymer CLI
    doesn't rewrite these specifiers.

*   If you need to include a module from another site, such as a CDN, use a full URL
    (e.g. `https://unpkg.com/thing@1.0.1/index.js`). Polymer CLI doesn't rewrite these
    specifiers.

See [Build for production](/{{{polymer_version_dir}}}/toolbox/build-for-production#transforms) for more information on how Polymer CLI resolves imports.

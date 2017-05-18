---
title: Install Polymer 2.x
---

<!-- toc -->

If you're familiar with Polymer and just want to get started with the new release, you're in the right place! If you'd like an introduction to the Polymer project and web components:

* [Take a quick tour of Polymer](/{{{polymer_version_dir}}}/start/quick-tour)
* [Learn how to build your first Polymer app](/{{{polymer_version_dir}}}/start/toolbox/set-up)
* [Learn how to build your first element with the Polymer library](/{{{polymer_version_dir}}}/start/first-element/intro)

Polymer is distributed via the [Bower package manager](https://bower.io/).

To create an application template and install Polymer automatically, you can [use the Polymer CLI](#use-cli).

To start a project from scratch, you can [install Polymer with Bower](#use-bower).

### Use the Polymer CLI to create an application template and install Polymer {#use-cli}

The Polymer CLI requires Node.js, npm, Git and Bower. For full installation instructions, see [the Polymer CLI documentation](../docs/tools/polymer-cli).

1. Install the Polymer CLI.

    ```bash
    npm install -g polymer-cli
    ```

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

### Install Polymer from Bower {#use-bower}

1. Install Bower.

    ```bash
    npm install -g bower
    ```

2. Install the Polymer CLI

    The Polymer CLI requires Node.js and npm as well as Bower. For full installation instructions, see [the Polymer CLI documentation](../docs/tools/polymer-cli).

    ```bash
    npm install -g polymer-cli
    ```

3. Install the latest Polymer 2.0 release from bower

    ```bash
    bower install Polymer/polymer#^2.0.0
    ```

4. Create a test `index.html` file, and add the following in the `<head>` tag:
  - `<script src="/bower_components/webcomponentsjs/webcomponents-loader.js"></script>` to
  load the polyfills
  - `<link rel="import" href="/bower_components/polymer/polymer.html">` to
  import Polymer

5. Import and use whichever elements you’d like.

6. Serve your project.

    ```bash
    polymer serve
    ```

For information on building your project for production, see the documentation on [building Polymer applications for production](../toolbox/build-for-production).


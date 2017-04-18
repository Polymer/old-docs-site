---
title: Install Polymer 2.x
---

<!-- toc -->

Polymer is distributed via the [Bower package manager](https://bower.io/). 

To create an application template and install Polymer automatically, you can [use the Polymer CLI](#use-cli).

To start a project from scratch, you can [install Polymer with Bower](#use-bower). 

### Use the Polymer CLI to create an application template and install Polymer {#use-cli}

1. Install Bower.

    ```bash
    npm install -g bower
    ```

2. Install the Polymer CLI

    ```bash
    npm install -g polymer-cli
    ```

3. Verify your Polymer version.

    ```bash
    polymer --version
    ```

    The output of this command should be at least `0.18.0`.

4. Create a test folder for Polymer 2.0, and switch to it.

    ```bash
    mkdir polymer-20-test
    cd polymer-20-test
    ```

5. Initialize your project.

    ```bash
    polymer init
    ```

6. Select `polymer-2-application`.

7. Serve your project.

    ```bash
    polymer serve
    ```

### Install Polymer from Bower {#use-bower}

1. Install Bower.

    ```bash
    npm install -g bower
    ```

2. Install the Polymer CLI

    ```bash
    npm install -g polymer-cli
    ```

3. Verify your Polymer CLI version.

    ```bash
    polymer --version
    ```

    The output of this command should be at least `0.18.0`.

4. Install the latest Polymer 2.0 RC release from bower

    ```bash
    bower install Polymer/polymer#^2.0.0-rc.3
    ```

5. Create a test `index.html` file, and add the following in the `<head>` tag:
  - `<script src="/bower_components/webcomponentsjs/webcomponents-loader.js"></script>` to
  load the polyfills
  - `<link rel="import" href="/bower_components/polymer/polymer.html">` to
  import Polymer

6. Import and use whichever elements you’d like.

7. Serve your project.

    ```bash
    polymer serve
    ```

For information on building your project for production, see the documentation on [building Polymer applications for production](../docs/tools/build-for-production.md).


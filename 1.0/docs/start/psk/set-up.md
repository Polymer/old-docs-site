---
layout: default
type: start
shortname: Start
title: Set up
subtitle: Polymer Starter Kit
---

{% include toc.html %}

Follow the instructions below to install, build, and run the 
Polymer Starter Kit (PSK) locally in less than 15 minutes.

## Install the Polymer Starter Kit and dependencies

1.  Install [Node.js](https://nodejs.org/) (`node`) version 0.12 or above. 
    Node.js includes Node Package Manager (`npm`) by default. The PSK 
    uses `npm` to install and manage tooling.

1.  Verify that you're running `node` version 0.12 or above and `npm` 
    version 2.11 or above.

        node -v
        v0.12.5

        npm -v
        2.12.2

1.  Install Gulp and Bower.

        npm install -g gulp bower

    Note: the `-g` flag installs Gulp and Bower globally, so you may need to 
    execute the script with `sudo` privileges. The reason they are installed
    globally is because some scripts in the PSK expect
    `gulp` and `bower` to be available from the command line. 

1.  Download the [latest PSK release](https://github.com/PolymerElements/polymer-starter-kit/releases/latest).
   
    There are two versions of the PSK, a light version (e.g. 
    `polymer-starter-kit-light-x.x.x.zip`)
    and a full version (e.g. `polymer-starter-kit-x.x.x.zip`). Download 
    the full
    version.

1.  Unzip the file to a suitable location. After unzipping the file 
    you should have a directory called `polymer-starter-kit-x.x.x`. 
    You can rename the directory to something more relevant to your project.

1.  Install the build and toolchain dependencies.

        npm install

1.  Install the application dependencies.

        bower install

## Directory structure 

The diagram below is a brief summary of the directories within the PSK. The
appendix of this tutorial contains a complete overview of the entire PSK
app structure.

<pre>
/
|---app/ 
|   |---elements/ 
|   |---images/ 
|   |---scripts/ 
|   |---styles/
|   |---test/ 
|---docs/ 
|---dist/
</pre>

*   `app/` is where you store all of your source code and do all of your
    development. 
*   `elements/` is where you keep your custom elements. 
*   `images/` is for static images.
*   `scripts/` is the place for JS scripts. 
*   `styles/` houses your app's [shared styles][shared styles] and CSS rules.
*   `test/` is where you [define tests for your web
    components](https://github.com/Polymer/web-component-tester).
*   `docs/` contains optional "recipes" (how-to guides) for adding features
    to your application or for using optional tools or editors. 
*   `dist/` is the directory to deploy to production. When you run the
    build task, files are prepared for production (HTML imports are
    vulcanzied, scripts are minimized, and so on) and output to this directory.

## Initializine Git repository (optional)

Your PSK installment does not contain any version control system. Follow the 
instructions below if you want to manage your source code with Git.

1.  `cd` into the base directory of your PSK installment.

1.  Initialize a Git repository.

        git init

1.  Add and commit all of the files.

        git add . && git commit -m "Add Polymer Starter Kit."

## Build and serve 

1.  Build the app.

        gulp 

1.  Serve the app locally. 

        gulp serve

The task above automatically opens up your default web browser and
fetches the locally-hosted application (at `http://localhost:5000`).

The local development server automatically detects file modifications
and re-builds the application. As long as you keep the `gulp serve`
task running there is no need to re-build or re-serve the app while
you develop. 

## Appendix: complete app structure

The diagram below represents the complete directory structure of the 
PSK. An item that ends in a forward slash (`/`) represents a directory. The 
rest are individual files. Content after a hashtag (`#`) describes the
purpose of that item or why you would potentially interact with it.

<pre>
/  # Root directory.
|---app/  # Source code directory. Make all changes in this directory.
|   |---elements/  # Add your custom elements here.
|   |   |---my-greeting/  # Sample element demonstrating data-binding.
|   |   |   |---my-greeting.html
|   |   |---my-list/  # Sample element demonstrating dom-repeat templates.
|   |   |   |---my-list.html
|   |   |---elements.html  # Add element imports here.
|   |   |---routing.html  # Define URL routing rules here. 
|   |---images/  # Logos for adding app icons to device homescreens.
|   |   |---touch/
|   |       |---apple-touch-icon.png
|   |       |---chrome-splashscreen-icon-384x384.png
|   |       |---chrome-touch-icon-192x192.png
|   |       |---icon-128x128.png
|   |       |---ms-icon-144x144.png
|   |       |---ms-touch-icon-144x144-precomposed.png
|   |---scripts/  # Add JS scripts here.
|   |   |---app.js  # Add app-level scripts here.
|   |---styles/
|   |   |---app-theme.html  # Define app-level styles here.
|   |   |---main.css  # Define pure CSS rules here.
|   |   |---shared-styles.html  # Share styles between elements here.
|   |---test/  # Add Web Component tests here.
|   |   |---index.html
|   |   |---my-greeting-basic.html  # Tests for my-greeting sample element.
|   |   |---my-list-basic.html   # Tests for my-list sample element.
|   |---cache-config.json  # Service worker cache config. See comment in file.
|   |---favicon.ico 
|   |---index.html  # Add app navigation and content here.
|   |---manifest.json  # Manifest file for Chrome apps.
|   |---robots.txt  # Define how search engines can crawl your app here.
|   |---sw-import.js  # Service worker import script.
|---docs/  # Optional "recipes" for adding features, using tools, etc.
|   |---README.md
|   |---add-es2015-support-babel.md  # How to use ES2015 language features.
|   |---chrome-dev-editor.md  # How to use Chrome Dev Editor.
|   |---polymer-perf.md  # How to optimize web component loading.
|---.editorconfig  # Define code style.
|---.gitattributes  # Configure rules for how Git stores files.
|---.gitignore  # Tell Git which files to ignore.
|---.jscsrc  # Configure JSCS here.
|---.jshintc  # Configure JSHint here.
|---CONTRIBUTING.md  # Learn how to contribute to PSK.
|---LICENSE.md  # Learn how you can use and distribute PSK.
|---README.md  # Read feature overviews and how to install PSK.
|---bower.json  # Define app dependencies.
|---gulpfile.js  # Define tasks for building, testing, serving, etc. here.
|---package.json  # Define build and toolchain dependencies.
|---dist/  # Deploy this directory to production. 
</pre>


[shared styles]: https://www.polymer-project.org/1.0/docs/devguide/styling.html#style-modules

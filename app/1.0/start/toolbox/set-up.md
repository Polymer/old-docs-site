---
title: Step 1. Get set up
subtitle: "Build an app with App Toolbox"
---

<!-- toc -->

These tutorials teach you how to initialize, customize, and deploy a 
[Progressive Web App][PWA] using Polymer in less than 30 minutes. 

The app you'll be building is built on top of the [Polymer App 
Toolbox][toolbox]. The Toolbox is a collection of reusable web components, 
tools, and app templates. 

[PWA]: https://developers.google.com/web/progressive-web-apps

## Install Polymer CLI

Polymer CLI is an all-in-one command line tool for Polymer projects. In these
tutorials you use Polymer CLI to initialize, serve, and build your project. You
can also use it for linting and testing, but these tutorials won't cover those
topics.

1.  Check that you have already installed all of Polymer CLI's dependencies
    by running the following commands.

    *   Git

            git --version

    *   Node.js (LTS version or higher)

            node -v 

    *   Bower

            bower -v

    You should see the typical output indicating what version you're running
    of each of these dependencies.
    If you're missing any of these dependencies, follow the instructions in 
    the following section from the Polymer CLI guide to learn how to install 
    each one: [Install section from Polymer
    CLI guide](/1.0/docs/tools/polymer-cli#install).

1.  Install Polymer CLI.

        npm install -g polymer-cli

## Initialize your project

1. Create a new directory for your project.

        mkdir my-app
        cd my-app

1. Initialize your project.

        polymer init starter-kit

## Serve your project

As you progress through the tutorials, keep the following command running
in the background to locally serve your app. Whenever you make a change
to a file, just refresh your browser to view the changes.

    polymer serve --open

This command starts the local server, automatically opens up your default 
browser and fetches your app at `http://localhost:8080`.

You can pass a string after `--open` to use a different browser (e.g. 
`polymer serve --open 'Google Chrome Canary'`).
{.alert .alert-info}

![App Toolbox Drawer Template](/images/1.0/toolbox/app-drawer-template.png)

## Project structure

The diagram below is a brief summary of the files and directories within
the project.

```
bower.json  # bower configuration
bower_components/  # app dependencies
images/
index.html  # main entry point into your app
manifest.json  # app manifest configuration
polymer.json  # Polymer CLI configuration
service-worker.js  # auto-generated service worker
src/  # app-specific elements
  my-app.html  # top-level element
  my-icons.html  # app icons 
  my-view1.html  # sample views or "pages"
  my-view2.hmtl
  my-view3.html
sw-precache-config.js  # service worker pre-cache configuration
test/  # unit tests
```

## Next steps

Your app is now up and running locally. Next, learn how to add 
a page to your app. 

<a class="blue-button"
    href="create-a-page">Next step: Create a page</a>

[toolbox]: /1.0/toolbox/
[shared styles]: /1.0/docs/devguide/styling.html#style-modules
[md]: http://www.google.com/design/spec/material-design/introduction.html

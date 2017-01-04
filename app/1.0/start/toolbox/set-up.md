---
title: Step 1. Get set up
subtitle: "Build an app with App Toolbox"
---

<!-- toc -->

The [Polymer App Toolbox][toolbox] is a collection of components, tools and
templates for building Progressive Web Apps with Polymer.

Follow the instructions below to install, build, and deploy a project using an
App Toolbox template in less than 15 minutes.

## Install the Polymer CLI

1.  Install the LTS version (4.x) of Node.js. The current version (6.x) should work, but is not
    officially supported. Versions below LTS are not supported.

1. If you don't have bower installed, install it

        npm install -g bower

1.  Install the Polymer CLI

        npm install -g polymer-cli

## Initialize your project from a template

1. Create a new project folder to start from

        mkdir my-app
        cd my-app

1. Initialize your project with an app template

        polymer init starter-kit

## Serve your project

The App Toolbox templates do not require any build steps to get started
developing.  You can serve the application using the Polymer CLI, and
file changes you make will be immediately visible by refreshing
your browser.

    polymer serve --open

The task above automatically opens up your default web browser and
fetches the locally-hosted application (at `http://localhost:8080`).

![App Toolbox: Starter Kit Template](/images/1.0/toolbox/starter-kit.png)

## Initialize Git repository (optional)

Your app template does not contain any version control system. Follow the
instructions below if you want to manage your source code with Git.

1.  `cd` into the base directory of your project.

1.  Initialize a Git repository.

        git init

1.  Add and commit all of the files.

        git add . && git commit -m "Initial commit."

## Directory structure

The diagram below is a brief summary of the directories within the template.

    /
    |---index.html
    |---src/
    |---bower_components/
    |---images/
    |---test/


*   `index.html` is the main entry point into your application
*   `src/` is where your application-specific custom elements will go
*   `bower_components/` is where reusable custom elements and/or libraries
       fetched via bower will go
*   `images/` is for static images
*   `test/` is where you [define tests for your web
    components](https://github.com/Polymer/web-component-tester).

## Next steps

Now that your App Toolbox template is up and running, learn how to [add a new
page of content](create-a-page), or how to [deploy the app to the web](deploy).

[toolbox]: /1.0/toolbox/
[shared styles]: /1.0/docs/devguide/styling.html#style-modules
[md]: http://www.google.com/design/spec/material-design/introduction.html

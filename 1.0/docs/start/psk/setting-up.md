---
layout: default
type: start
shortname: Start
title: Setting up
subtitle: Polymer Starter Kit
---

## Setting up the Polymer Starter Kit

Follow the instructions below to install, build, and set up the
Polymer Starter Kit (PSK) for local development in less than 15 minutes.

1. Install [Node.js](https://nodejs.org/) (`node`) version 0.12 or above. 
   Node.js includes Node Package Manager (`npm`) by default. The PSK uses `npm` to 
   install and manage tooling.

1. Verify that you're running `node` version 0.12 or above and `npm` version 2.11
   or above.

       node -v
       v0.12.5

       npm -v
       2.12.2

1. Install Gulp and Bower.

       npm install -g gulp bower

   Note: the `-g` flag installs Gulp and Bower globally, so you may need to 
   execute the script with `sudo` privileges. The reason they are installed
   globally is because some scripts in the PSK expect
   `gulp` and `bower` to be available from the command line. 

   [//]: # (discussion of the Git workflow)


1. Download the [latest PSK release](https://github.com/PolymerElements/polymer-starter-kit/releases/latest).
   
   There are two versions of the PSK, a light version (e.g. `polymer-starter-kit-light-x.x.x.zip`)
   and a full version (e.g. `polymer-starter-kit-x.x.x.zip`). Download the full
   version.

1. Unzip the file to a suitable location. After unzipping the file you should have a 
   directory called `polymer-starter-kit-x.x.x`. You can rename the directory to
   something more relevant to your project.

1. `cd` into the directory.

1. Initialize a Git repository.

       git init

1. Add and commit all of the files.

       git add . && git commit -m "Add Polymer Starter Kit."

1. Install build and toolchain depencies.

       npm install

1. Install application dependencies.

       bower install

1. Build the app.

       gulp 

1. Serve the app locally. 

       gulp serve

   The task above automatically opens up your default web browser and
   fetches the locally-hosted application (at `http://localhost:5000`).

   The local development server automatically detects file modifications
   and re-builds the application. As long as you keep the `gulp serve`
   task running there is no need to re-build or re-serve the app while
   you develop. 

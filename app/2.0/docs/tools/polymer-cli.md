---
title: Polymer CLI
---

<!-- toc -->

## Install {#install}

1.  Make sure you have installed a verson of Node.js supported by Polymer. Run `node --version` to 
to check the version of Node.js that you have installed and see our [official node version support 
policy](node-support) for more details.

1.  Update npm.

        npm install npm@latest -g

1.  Ensure that Git is installed.

        git --version

    If it isn't, you can find it on the [Git downloads page](https://git-scm.com/downloads).

1.  Install the latest version of Bower.

        npm install -g bower

1.  Install Polymer CLI.

        npm install -g polymer-cli@next

You're all set. Run `polymer help` to view a list of commands.

## Overview {#overview}

Polymer CLI is our official command line tool for Polymer projects and Web Components. It includes 
a build pipeline, a boilerplate generator for creating elements and apps, a linter, a development
server, and a test runner.

Polymer CLI works with two types of projects:

* Elements projects. In an element project, you expose a single element or group of related 
  elements which you intend to use in other element or app projects, or distribute on a registry 
  like Bower or NPM. Elements are reusable and organized to be used alongside other elements, so 
  components are referenced outside the project.
  
  See the guide to [creating an element project with the Polymer CLI](create-element-polymer-cli)
  for more information.

* Application projects. In an app project, you build an application, composed of Polymer elements, 
  which you intend to deploy as a website. Applications are self-contained, organized with 
  components inside the application.
  
  See the guide to [creating an application project with the Polymer CLI](create-app-polymer-cli)
  for more information.

## Commands

See the documentation on [Polymer CLI commands](polymer-cli-commands) for a list of commands and
how to use them.

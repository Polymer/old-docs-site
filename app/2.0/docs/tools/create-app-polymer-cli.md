---
title: Create an application project with the Polymer CLI
---

<!-- toc -->

Polymer CLI supports initializing a project folder with one of several application templates.  The 
CLI comes with a `basic` template, which is the most basic starting point for a Polymer-based 
application, as well as others that introduce more complex layout and application patterns.

This chapter teaches you more about `basic` app projects.  See [Polymer App Toolbox 
templates](../../toolbox/templates) for more details on other templates.

## App project architecture {#app-architecture}

Polymer CLI is designed for apps that follow the [app shell 
architecture](https://developers.google.com/web/updates/2015/11/app-shell).

There are fundamental concepts of the app shell architecture that you should understand before 
creating your app project with Polymer CLI: the entrypoint, the shell, and fragments. See [App 
structure](../../toolbox/prpl#app-structure) from the App Toolbox docs for an in-depth overview of 
these concepts.

## Set up basic app project {#basic-app}

Follow the steps below to get your `basic` app project set up.

1.  Create a directory for your app project.

    <pre><code>mkdir <var>app</var>
    cd <var>app</var></code></pre>

    Where <code><var>app</var></code> is the name of your project directory.

1.  Initialize your app. Polymer CLI asks you a few questions
    as it sets up your app.

        polymer init

1.  Select `polymer-2-application`.

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

At this point, Polymer CLI generates files and directories for your app, and installs your 
project's dependencies.

## App project layout

After the initialization process Polymer CLI generates the following files and directories.

*   `bower.json`. Configuration file for Bower.
*   `bower_components/`. Project dependencies. See [Manage dependencies](#dependencies).
*   `index.html`. Entrypoint page of the app.
*   `src/`<code><var>my-app</var></code>/<code><var>my-app</var></code>`.html`.
    Source code for main element.
*    `test/`<code><var>my-app</var></code>/<code><var>my-app</var></code>`_test.html`. Tests for 
main element.

### Add elements

You may want to compose your main element out of smaller, application-specific elements. These 
app-specific elements should be defined in the `src` directory, at the same level as 
<code><var>my-app</var></code>.

    app/
      src/
        my-app/
        my-el/

Currently there is no Polymer CLI command to generate application-specific elements. You should do 
it by hand and should not create an [element project](#element) within your app project.

## Manage dependencies in an application project {#dependencies}

Applications should use relative URLs to import other source files and dependencies. But because 
applications are served independently, they can properly reach into the dependencies directory for 
dependencies.

    <!-- from a 'src/some-application.html' file in your application -->
    <link rel="import" href="../bower_components/polymer/polymer.html">

Only one file should use absolute URLs for imports: your "entrypoint" (defaults to "index.html"). 
The reason is that in an app-shell application, your entrypoint is served for any URL so that your 
application loads on any URL. Because it can be served from anywhere, relative URLs are impossible. 
Use absolute URLs in the entrypoint instead.

    <!-- from a top-level application "entrypoint" -->
    <link rel="import" href="/bower_components/polymer/polymer.html">
    <link rel="import" href="/src/some-application.html">


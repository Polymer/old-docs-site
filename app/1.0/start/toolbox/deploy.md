---
title: Step 4. Deploy
subtitle: "Build an app with App Toolbox"
---

<!-- toc -->

This tutorial teaches you how to build your website so that it's optimized
to be as fast as possible, and then deploy your app to a secure web site.

## Build for deployment

Run the following to prepare your application for deployment.

    polymer build

This command  minifies the HTML, JS, and CSS dependencies of your application,
and generates a service worker that precaches all of the dependencies
of your application so that it can work offline.

The build command creates two optimized versions of your app:

* `build/unbundled`. Contains granular resources suitable for serving via 
   HTTP/2 with server push.
* `build/bundled`. Contains bundled (concatenated) resources suitable for 
   serving from servers or to clients that do not support HTTP/2 server push.

## Deploy to a server

Polymer applications can be deployed to any web server.
Whatever hosting option you choose, keep in mind that **Progressive Web Apps
must be served over secure (HTTPS) connections**. 

The app template you're using uses the `<app-location>` element to enable 
URL-based routing, which requires that the server serve the `index.html` entry 
point for all routes.

You can follow one of the sections below to deploy this app to either
[Google App Engine](https://cloud.google.com/appengine) or [Firebase
Static Hosting](https://www.firebase.com/docs/hosting/), which are both free and
secure approaches for deploying a Polymer app.  The approach
is similar for other hosting providers.

### Deploy with AppEngine

1.  Download and install the [Google App Engine 
    SDK](https://cloud.google.com/appengine/downloads). This tutorial is going
    to use the Python SDK for example, but you can use any of the other ones.

1.  Open up the Google App Engine Launcher (`GoogleAppEngineLauncher`) 
    at least once and give the launcher permission to create symlinks. 

1.  [Sign up for a Google App Engine 
    account](https://cloud.google.com/appengine).

1.  Open the [project 
    dashboard](https://console.cloud.google.com/iam-admin/projects).

1.  Create a new project.

1.  `cd` into your project directory.

1.  Create an `app.yaml` file with the following contents. Replace
    `{project name}` with the project name that you just created in the 
    Google App Engine dashboard. 

    ```
    application: {project name}
    version: 1
    runtime: python27
    api_version: 1
    threadsafe: yes

    handlers:
    - url: /bower_components
      static_dir: build/bundled/bower_components
      secure: always

    - url: /images
      static_dir: build/bundled/images
      secure: always

    - url: /src
      static_dir: build/bundled/src
      secure: always

    - url: /service-worker.js
      static_files: build/bundled/service-worker.js
      upload: build/bundled/service-worker.js
      secure: always

    - url: /manifest.json
      static_files: build/bundled/manifest.json
      upload: build/bundled/manifest.json
      secure: always

    - url: /.*
      static_files: build/bundled/index.html
      upload: build/bundled/index.html
      secure: always    
    ```

1.  Run the following command to deploy. Replace `{project name}` with your
    Google App Engine project name.

        appcfg.py -A {project name} update app.yaml

    If you didn't open up Google App Engine Launcher and give it permission to
    create symlinks, the `appcfg.py` command probably won't be available on 
    your command line. 
    {.alert .alert-warning}

### Deploy with Firebase

The instructions below are based on the [Firebase hosting quick start
guide](https://www.firebase.com/docs/hosting/quickstart.html).

1.  [Sign up for a Firebase account](https://firebase.google.com/).

1.  Go to the [Firebase console](https://console.firebase.google.com) 
    and create a new project. 

1.  Install the Firebase command line tools.

        npm install -g firebase-tools

1.  `cd` into the root directory of your project. 

1.  Log in to your account. 

        firebase login

1.  Initialize your Firebase project. 

        firebase init

    Firebase CLI asks you various questions:

    *   Press the `Space` key to disable the `Database: Deploy Firebase
        Realtime Database Rules` option. Keep the `Hosting` option enabled. 
        Press the `Enter` key to confirm. 
    *   Use `build/bundled` for your public directory. 
    *   For `Configure as a single-page app` type `y`. 
    *   Associate your app with the Firebase project that you just created. 

1.  Edit your firebase configuration to add support for URL routing. Edit
    the following section of your `firebase.json` file to match the code 
    below.

    ```
    "rewrites": [ {
      "source": "**/!{*.*}",
      "destination": "/index.html"
    } ]
    ```

    This instructs Firebase to serve up `index.html` for any URLs that don't
    otherwise end in a file extension.
    {.alert .alert-info}

1.  Deploy.

        firebase deploy

    The URL to your live site is listed in the output. You can also open
    the site in your default browser by running `firebase open hosting:site`.

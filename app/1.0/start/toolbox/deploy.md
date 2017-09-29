---
title: Step 4. Deploy
subtitle: "Build an app with App Toolbox"
---

<!-- toc -->

In this step, you'll deploy your application to the web.

## Build for deployment

Run the following Polymer CLI command to perform a number of steps to prepare your
application for deployment:

    polymer build

This command  minifies the HTML, JS, and CSS dependencies of your application,
and generates a service worker that precaches all of the dependencies
of your application so that it can work offline.

The built files are output to the following folders:

* `build/unbundled`. Contains granular resources suitable for serving via HTTP/2
with server push.
* `build/bundled`. Contains bundled (concatenated) resources suitable for serving
from servers or to clients that do not support HTTP/2 server push.

## Deploy to a server

Polymer applications can be deployed to any web server.

This template utilizes the `<app-location>` element to enable URL-based routing,
which requires that the server serve the `index.html` entry point for all
routes.

You can follow one of the sections below to deploy this app to either
[Google AppEngine](https://cloud.google.com/appengine) or [Firebase
Static Hosting](https://www.firebase.com/docs/hosting/), which are both free and
secure approaches for deploying a Polymer app.  The approach
is similar for other hosting providers.

### Deploy with AppEngine

1.  Download the [Google App Engine SDK](https://cloud.google.com/appengine/downloads)
and follow the instructions for your platform to install it.

1.  [Sign up for an AppEngine account](https://cloud.google.com/appengine).

1.  [Open the project dashboard](https://console.cloud.google.com/iam-admin/projects)
and create a new project

    * Click the Create Project button.
    * Type a project name.
    * Click the Create button.

1.  `cd` into your project directory.

1. Create an `app.yaml` file and instruct the server to serve up
`index.html` for any URL's that don't otherwise end in a file extension.
Replace `{project name}` with the name you chose in the previous step.

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

1.  Deploy.

        appcfg.py -A {project name} update app.yaml

### Deploy with Firebase

The instructions below are based on the [Firebase hosting quick start
guide](https://www.firebase.com/docs/hosting/quickstart.html).

1.  [Sign up for a Firebase account](https://www.firebase.com/signup/).

1.  Install the Firebase command line tools.

        npm install -g firebase-tools

    The `-g` flag instructs `npm` to install the package globally so that you
    can use the `firebase` command from any directory. You may need
    to install the package with `sudo` privileges.

1.  `cd` into your project directory.

1.  Inititalize the Firebase application.

        firebase login
        firebase init

    Firebase asks you which app you would like to use for hosting. If you just
    signed up, you should see one app with a randomly-generated name. You can
    use that one. Otherwise go to
    [https://www.firebase.com/account](https://www.firebase.com/account) to
    create a new app.

1.  Firebase asks you the name of your app's public directory. Enter
    `build/bundled`.  This works because when you run `polymer build` to
    build your application, Polymer CLI places your bundled application
    appropriate for serving on Firebase into the `build/bundled` folder.

1.  Edit your firebase configuration to add support for URL routing. The final
    `firebase.json` file should look something like this:
	
    ```
    {
      "hosting": {
        "public": "build/bundled/",
        "rewrites": [
          {
            "source": "**/!(*.*)",
            "destination": "/index.html"
          }
        ]
      }
    }
    ```	

    This instructs Firebase to serve up `index.html` for any URLs that don't
    otherwise end in a file extension.

1.  Deploy.

        firebase deploy

    The URL to your live site is listed in the output.

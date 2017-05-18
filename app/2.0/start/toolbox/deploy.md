---
title: Step 4. Deploy
subtitle: "Build an app with App Toolbox"
---

<!-- toc -->

In this step, you'll deploy your application to the web.

## Build for deployment

Run the following Polymer CLI command to prepare your
application for deployment:

    polymer build

This command  minifies the HTML, JS, and CSS dependencies of your application,
and generates a service worker that precaches all of the dependencies
of your application so that it can work offline.

The built files are output to the `build/default` folder. The default build contains an unbundled
build with granular resources suitable for serving via HTTP/2 with server push. 

For more information on build options, see the [documentation for the `polymer build` command](/2.0/docs/tools/polymer-cli#build).
This includes documentation on generating bundled (concatenated) resources suitable for
serving from servers or to clients that do not support HTTP/2 server push.

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
and follow the instructions for your platform to install it. This tutorial uses the Python SDK.

1.  [Sign up for an AppEngine account](https://cloud.google.com/appengine).

1.  [Open the project dashboard](https://console.cloud.google.com/iam-admin/projects)
and create a new project

    * Click the Create Project button.
    * Type a project name.
    * Click the Create button.
    
    The App Engine gives you a project ID based on the name of your project.
    Make note of this ID.

1.  `cd` into the main folder for your app (e.g. `my-app/`).

1. Create an `app.yaml` file with the following contents:

    ```
    runtime: python27
    api_version: 1
    threadsafe: yes

    handlers:
    - url: /bower_components
      static_dir: build/default/bower_components
      secure: always

    - url: /images
      static_dir: build/default/images
      secure: always

    - url: /src
      static_dir: build/default/src
      secure: always

    - url: /manifest.json
      static_files: build/default/manifest.json
      upload: build/default/manifest.json
      secure: always

    - url: /.*
      static_files: build/default/index.html
      upload: build/default/index.html
      secure: always
    ```

1.  Set your project id to the ID given to your app by the App Engine. For example:
    ````
    gcloud config set project my-app-164409
    ````

1. Create your app.
    ````
    gcloud app create
    ````
	
    You will need to select a region for your app to be deployed in. This can't be changed.

1. Deploy your app.

    ````
    gcloud app deploy
    ````

1. Your app will be available online at its designated URL. For example:

    ````
    https://my-app-164409.appspot.com/new-view
    ````

    Open your app URL in your browser by typing this command:

    ````
    gcloud app browse
    ````

### Deploy with Firebase

The instructions below are based on the [Firebase hosting quick start
guide](https://www.firebase.com/docs/hosting/quickstart.html).

1.  [Sign up for a Firebase account](https://www.firebase.com/signup/).

1.  Go to [https://www.firebase.com/account](https://www.firebase.com/account) to create a new app. Make note of the project ID associated with your app.

    ![Welcome to Firebase showing Project ID](/images/2.0/toolbox/welcome-firebase.png)

1.  Install the Firebase command line tools.

        npm install -g firebase-tools

1.  `cd` into your project directory.

1.  Inititalize the Firebase application.

        firebase login
        firebase init

1.  Firebase asks you for a project to associate with your app. Select the one you created earlier.

1.  Firebase asks you the name of your app's public directory. Enter
    `build/default`.

1.  Edit your firebase configuration to add support for URL routing.  Add
    the following to the `hosting` object in your `firebase.json` file.

    ```
    "rewrites": [
      {
        "source": "!/__/**",
        "destination": "/index.html"
      },
      {
        "source": "**/!(*.js|*.html|*.css|*.json|*.svg|*.png|*.jpg|*.jpeg)",
        "destination": "/index.html"
      }
    ]
    ```

    For example, your `firebase.json` file may look like this afterwards:
	
    ```
    {
      "database": {
        "rules": "database.rules.json"
      },
      "hosting": {
        "public": "build/default",
        "rewrites": [
          {
            "source": "!/__/**",
            "destination": "/index.html"
          },
          {
            "source": "**/!(*.js|*.html|*.css|*.json|*.svg|*.png|*.jpg|*.jpeg)",
            "destination": "/index.html"
          }
        ]
      }
    }
    ```	

    This instructs Firebase to serve up `index.html` for any URLs that don't
    otherwise end in a file extension.

1.  Deploy your project.

        firebase deploy

    The URL to your live site is listed in the output. You can also open
    the site in your default browser by running `firebase open hosting:site`.


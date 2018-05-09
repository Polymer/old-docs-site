---
title: Step 4. Deploy
subtitle: "Build an app with App Toolbox"
---

<!-- toc -->

In this step, you'll deploy your application to the web.

## Build for deployment

Type `polymer build` to build your Polymer application for production. 

You can serve different builds of your app to browsers with different capabilities. In this step, you'll deploy `es5-bundled`. 

The Polymer Starter Kit is configured to create three builds:

* `esm-bundled`: This build serves JavaScript code without compilation, as ES modules.

* `es6-bundled`: This build serves JavaSCript code compiled to ES2015, as AMD modules.

* `es5-bundled`: This build serves JavaSCript code compiled to ES5, as AMD modules.

Builds are configured in the `builds` object in `polymer.json`, a configuration file in the top-level project folder:

polymer.json { .caption}

```
...
"builds": [
    { "name": "esm-bundled", ... },
    { "name": "es6-bundled", ... },
    { "name": "es5-bundled", ... }
  ],
...
```

The builds will be output to subfolders under the `build/` folder as follows:

    build/
      esm-bundled/
      es6-bundled/
      es5-bundled/

To configure a custom build, you can use command line options, or edit `polymer.json`. Run `polymer help build` for the full list of available options and optimizations. Also, see the documentation on the [polymer.json specification](/{{{polymer_version_dir}}}/docs/tools/polymer-json) and [building your Polymer application for production](/{{{polymer_version_dir}}}/toolbox/build-for-production).

## Deploy to a server

Polymer applications can be deployed to any web server.

This template uses the `<app-location>` element to enable URL-based routing,
which requires that the server serve the `index.html` entry point for all
routes.

You can follow one of the sections below to deploy this app to either
[Google App Engine](https://cloud.google.com/appengine) or [Firebase
Static Hosting](https://www.firebase.com/docs/hosting/), which are both free and
secure approaches for deploying a Polymer app. The approach
is similar for other hosting providers.

### Deploy with App Engine

1.  Download the [Google App Engine SDK](https://cloud.google.com/appengine/downloads)
and follow the instructions for your platform to install it. This tutorial uses the Python SDK.

1.  [Sign up for an App Engine account](https://cloud.google.com/appengine).

1.  [Open the project dashboard](https://console.cloud.google.com/iam-admin/projects)
and create a new project.

    * Click the Create Project button.
    * Type a project name.
    * Click the Create button.
    
    The App Engine gives you a unique identifier for your project-make note of this ID.

1.  In the root project folder for your app (e.g. `my-app/`), create a file called `app.yaml` with the following contents:

    ```
    runtime: python27
    api_version: 1
    threadsafe: true

    handlers:
    - url: /node_modules
      static_dir: node_modules
      secure: always

    - url: /images
      static_dir: images
      secure: always

    - url: /src
      static_dir: src
      secure: always

    - url: /manifest.json
      static_files: manifest.json
      upload: manifest.json
      secure: always

    - url: /service-worker.js
      static_files: service-worker.js
      upload: service-worker.js
      secure: always

    - url: /.*
      static_files: index.html
      upload: index.html
      secure: always

    ```

1.  In a text editor, open `polymer.json` from your root project folder. Add `"app.yaml"` to the `extraDependencies` array.

    Before {.caption}

    ```
    ...
    "extraDependencies": [
        "manifest.json",
        "node_modules/@webcomponents/webcomponentsjs/*.js",
        "!node_modules/@webcomponents/webcomponentsjs/gulpfile.js"
      ],
    ...
    ```

    After {.caption}

    ```
    ...
    "extraDependencies": [
        "manifest.json",
        "node_modules/@webcomponents/webcomponentsjs/*.js",
        "!node_modules/@webcomponents/webcomponentsjs/gulpfile.js",
        "app.yaml"
      ],
    ...
    ```

1.  Re-run `polymer build` to include `app.yaml` in your build.

        polymer build

1.  Navigate to your build output folder:

        cd build/es5-bundled

1.  Set your project id to the ID given to your app by the App Engine. For example:
   
        gcloud config set project test-thing-16996

1.  Create your app:
   
        gcloud app create
     
    You will need to select a region for your app to be deployed in. This can't be changed.

1.  Deploy your app:

    **Make sure you running the following command from your build output folder.** If you run it from your root project folder, the deployment will fail. {.alert .alert-warning}
   
        gcloud app deploy

1.  Your app will be available online at its designated URL. For example:
   
        https://test-thing-16996.appspot.com
   
    Open your app URL in your browser by typing this command:
   
        gcloud app browse

### Deploy with Firebase

The instructions below are based on the [Firebase hosting quick start
guide](https://www.firebase.com/docs/hosting/quickstart.html).

1.  [Sign up for a Firebase account](https://www.firebase.com/signup/).

1.  Go to [https://www.firebase.com/account](https://www.firebase.com/account) to create a new app. Make note of the project ID associated with your app.

    ![Welcome to Firebase showing Project ID](/images/3.0/toolbox/welcome-firebase.png)

1.  Install the Firebase command line tools.

        npm install -g firebase-tools

1.  `cd` into your project folder.

1.  Initialize the Firebase application.

        firebase login
        firebase init

    1.  When asked which features you want to set up for your project folder, use the arrow keys and space to select "Hosting", then press enter to confirm.

    1.  When asked for a project to associate with your app, select the one you created earlier.

    1.  When asked for the path to your app's public folder, enter `build/es5-bundled/`.

    1.  When asked if you want to configure your project as a single-page app, type `y` and press enter.

    1.  When asked if you want to overwrite your `index.html` with theirs, type `n` and press enter.

    The Firebase tools will create a `firebase.json` file for you, which should look something like this:
	
    ```
    {
      "hosting": {
        "public": "build/es5-bundled/",
        "ignore": [
          "firebase.json",
          "**/.*",
          "**/node_modules/**"
        ],
        "rewrites": [
          {
            "source": "**",
            "destination": "/index.html"
          }
        ]
      }
    }
    ```	

    The [`rewrites` setting](https://firebase.google.com/docs/hosting/full-config#rewrites) shown above instructs Firebase to serve up `/index.html` for any URL that doesn't match a path to a file in the publicly deployed folder (`build/es5-bundled/`).

1.  Remove the rule in the [`ignore` setting](https://firebase.google.com/docs/hosting/full-config#ignore) that ignores folders named `node_modules`:

    Before {.caption}

    ```
    ...
    "ignore": [
      "firebase.json",
      "**/.*",
      "**/node_modules/**"
    ],
    ...
    ```

    After {.caption}

    ```
    ...
    "ignore": [
      "firebase.json",
      "**/.*"
    ],
    ...
    ```

    Don't forget to remove the comma after the previous item!

    We need to remove this rule because `polymer build` doesn't change the file layout of your app, except when it bundles files together. This means that some of your app's dependencies will still be in a folder called `node_modules` after being built. Don't worry, `polymer build` only includes files from `node_modules` that it knows your app needs.

1.  Deploy your project.
   
        firebase deploy
   
    The URL to your live site is listed in the output. You can also open
    the site in your default browser by running `firebase open hosting:site`.

## Next steps

Congratulations-you've successfully built and deployed a Polymer 3.0 application.

Next, if you haven't already done so, try [building your first Polymer element](/{{{polymer_version_dir}}}/start/first-element/intro). 

You can also visit the [Polymer App Toolbox documentation](/{{{polymer_version_dir}}}/toolbox/) to learn about more of its features, tools and templates.

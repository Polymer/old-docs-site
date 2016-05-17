---
title: Step 4. Deploy
subtitle: "Build your first Polymer application"
---

<!-- This page does not have a ToC because it currently only has one H2.
     Add a ToC if you add another H2. -->

In this step, we'll deploy our application to the web.

## Build for deployment

Run the following Polymer CLI command to perform a number of steps to prepare your
application for deployment:

    polymer build

This command will minify the HTML, JS, and CSS dependencies of your application,
and will generate a service worker that will pre-cache all of the dependencies
of your application so that it will work offline.

The built files are output the the following folders:

* `build/bundled` - contains bundled (concatenated) resources suitable for serving
from servers or to clients that do not support HTTP/2 Server Push
* `build/unbundled` - contains granular resources suitable for serving via HTTP/2
with Server Push

## Deploy with Firebase (recommended)

Firebase is a very simple and secure way to deploy a Polymer app site. You can sign
up for a free account and deploy your application in less than 5 minutes.

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

1.  Edit your firebase configuration to add support for URL routing.  Add
    the following section to your `firebase.json` file, which will instruct
    Firebase to serve up `index.html` for any URL's that don't otherwise
    end in a file extension.

    ```
    "rewrites": [ {
      "source": "**/!{*.*}",
      "destination": "/index.html"
    } ]
    ```

1.  Deploy.

        firebase deploy

    The URL to your live site is listed in the output.

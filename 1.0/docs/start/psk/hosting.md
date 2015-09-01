---
layout: default
type: start
shortname: Start
title: Hosting
subtitle: Polymer Starter Kit
---

## Hosting a Polymer Starter Kit application

This guide teaches you how to deploy your Polymer Starter Kit application.

### Firebase (recommended)

Firebase is one of the easiest ways to deploy a PSK site. You can sign
up for a free account, and deploy your application in less than 5 minutes.

The instructions below are based on the [Firebase hosting quick start 
guide](https://www.firebase.com/docs/hosting/quickstart.html).

1. [Sign up for a Firebase account](https://www.firebase.com/signup/).

1. Install the Firebase command line tools.

    `npm install -g firebase-tools`

   The `-g` flag instructs `npm` to install the package globally so that you
   can use the `firebase` command from any directory. You may need
   to install the package with `sudo` privileges.

1. `cd` into your project directory.

1. Inititalize the Firebase application.

       `firebase init`

   Firebase asks you which app you would like to use for hosting. If you just
   signed up, you should see one app with a randomly-generated name. You can 
   use that one. Otherwise go to https://www.firebase.com/account to 
   create a new app.

1. Firebase asks you the name of your app's public directory. Enter `dist`. 
   This works because when you run `gulp` to build your application, PSK builds 
   everything and places it all in `dist`. So `dist` contains everything 
   your application needs to run.

1. Deploy.

       `firebase deploy`

The output to this last command lists the live URL to your application.

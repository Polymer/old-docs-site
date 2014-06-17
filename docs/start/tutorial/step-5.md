---
layout: default
type: start
navgroup: start
shortname: Start
title: >
    Step 5: Starting your next app
subtitle: Your first Polymer application 
---

<link rel="import" href="/elements/side-by-side.html">

<style>
.running-app-frame {
    border: 1px solid #000;
    padding: 0px;
}
pre {
  font-size: 13px !important;
  border: 1px solid #eaeaea !important;
  padding 5px !important;
  margin: 10px 0px !important;
}
side-by-side h4 {
  line-height: 16px;
  margin-top: 0px;
  margin-left: 25px;
}
side-by-side ul {
  -webkit-padding-start: 25px;
}
</style>

{% include toc.html %}

## Step 5. Starting your next app

Now you've created your first {{site.project_title}} app. You probably want to try something of your own.

Most of the time when working with {{site.project_title}}, you'll want to use a package manager to download and update custom elements and manage their dependencies. {{site.project_title}} uses [Bower](http://bower.io/) for this. In this step, you'll get Bower installed if you don't already have it.

If you already have Bower installed, head straight to [Getting the code](http://www.polymer-project.org/docs/start/getting-the-code.html).

1.  Install Node.js and `npm`. 

    Visit [nodejs.org](http://nodejs.org/) and follow the directions to 
    install Node.

    [nodejs.org](http://nodejs.org/)

    Bower depends on Node, and you can install Bower using the Node Package 
    Manager, `npm`, which is installed with Node.

2.  Install Bower.

        npm install -g bower

    The `-g` argument tells `npm` to install Bower in _global_ mode, so you 
    can run it from the command line.

    Note: If you get an error running this command, you may need to 
    run it with superuser permission to allow `npm` to install `bower` 
    in the correct directory:

        sudo npm install -g bower

3.  Make sure you have `git` installed.
    
        $ git --version
        git version 1.9.0
 
    Bower uses `git` to download packages from `github`. If you _don't_ have 
    `git`, you can install it from [git-scm.com](http://git-scm.com/).

4.  Create a new project directory and `cd` into it.

5.  Run `bower init` in your project directory to create a `bower.json` file.

        bower init

    Bower asks a lot of questions. You can press **Enter** to accept the 
    default value for all of them.

6.  Install {{site.project_title}} and some elements.

        bower install --save Polymer/core-elements Polymer/paper-elements

    … Or just {{site.project_title}}:

        bower install --save Polymer/polymer

Bower gives you the flexibility to install just one or two elements or an entire set. 
If you want to experiment with {{site.project_title}}, you can 
start with the `core-elements` and `paper-elements` sets.

For more information on using Bower, see [Getting the code](http://www.polymer-project.org/docs/start/getting-the-code.html).



<a href="/docs/start/creatingelements.html">
  <paper-button icon="arrow-forward" label="Creating elements" raisedButton></paper-button>
</a>


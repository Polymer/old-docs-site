---
title: Publish an element
---

<!-- toc -->

## Introduction

So, you want to publish your first reusable Polymer element?
Fantastic! This guide walks you through the process.

When you're done, you'll have:

-   A local git repo for your element, based on the official boilerplate.
-   A published, Yarn-installable version of your element on GitHub.

## Set up

This guide assumes you have Git, Node.js, and Yarn installed, and that you
have a GitHub account. 

1.  [Install Polymer CLI](polymer-cli#install). 
1.  [Create an element project](polymer-cli#element). 

## Develop

As you develop your new element, make sure that you follow the relative URL 
conventions for importing other elements into your element project. See [HTML 
imports and dependency management](polymer-cli#element-imports) for more 
information.

A good way to quickly sanity test your component is to access a demo of your
element using Polymer CLI's `serve` command:

    polymer serve 

From here you can view your element demo at the following URL:

<pre><code>http://localhost:8080/components/<var>test-element</var>/demo/</code></pre>

Where <code><var>test-element</var></code> is the name of your element project
directory. 

See [Run local web server](polymer-cli#serve) for more help. 

### Unit tests

Use Polymer CLI's `test` command to run unit tests against your element. 

    polymer test

See [Run tests](polymer-cli#tests) for more information. 

### Documentation

The Polymer CLI element project comes with built-in documentation.

See [Document your elements](documentation) to learn more. 

## Publish your element to GitHub

Once you're happy with your element, you’ll want to push the code to GitHub and tag a new version of it.

Click [here](https://github.com/new) to create a new repository on GitHub. Try to keep the name of the repository consistent with the naming of your element (e.g if your element is `<test-element>`, your repository should be called `test-element`).

Next, follow the steps below (assuming that the name of your element is 
`test-element`):

    # Inside your development folder, navigate to your element directory
    cd test-element

    # Initialize a new Git repository for test-element
    git init

    # Add the commits for your current code
    git add .
    git commit -m 'My initial version'

    # Add a remote pointing to the GitHub repository you created.
    # Replace <username> with your GitHub username.
    git remote add origin https://github.com/<username>/test-element.git

    # Push your code to master by running
    git push -u origin master


Next, you’ll want to tag a version of your element on GitHub. You can either do this directly through the GitHub UI **or** via the terminal.

#### Using the terminal

    # Once you feel you have a version of your element you can release, tag it
    # For example, to tag version 0.0.1
    git tag -a v0.0.1 -m '0.0.1'

    # Then, push your tag to GitHub
    git push --tags


#### Using the GitHub UI

Navigate to the main GitHub page for your element and click the "releases" link in the main navigation. It is highlighted in red below:

![Preview of the GitHub navigation bar for a repository listing four navigation items—commits, branches, releases, and contributors. The releases link is highlighted.](/images/3.0/reusable-elements/publishing/image_2.png)

This will navigate you to the *Releases* page. For a project without any releases, this page will display a message similar to the one below.

![GitHub Releases page message stating that there aren't any releases here yet. The Create a new release button is highlighted](/images/3.0/reusable-elements/publishing/image_3.png)

Click the ‘Create a new release’ button to proceed.

This will display a Release drafting page where you can enter in version and release information for your element.
For example, setting v0.0.1 as the tag to create and the `master` branch as target

![The GitHub releases form displaying an input field for entering in a version number, a drop-down box for selecting the target branch, a release titles field and a description field](/images/3.0/reusable-elements/publishing/image_4.png)

Once you are happy with the information you have entered into the above form, click the ‘Publish release’ button to complete tagging and publishing a release of your element.

![Preview of the Publish release button in the GitHub releases page](/images/3.0/reusable-elements/publishing/image_5.png)

#### Test install your element

You should now be able to install your component. Change to a new directory for testing and initialize a new project:

    # Initialize a project to install your component into.
    yarn init 

Complete the Yarn initialization process. Then install your component:

    # Replace <username> with your GitHub username and <test-element>
    # with your repository's name. 
    yarn add <username>/<test-element> --flat

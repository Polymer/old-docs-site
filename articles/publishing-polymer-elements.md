---
layout: default
type: core
navgroup: docs
shortname: Articles
title: "Publishing Polymer Elements"
subtitle: How to publish and deploy Polymer elements to GitHub

article:
  author: addyosmani
  published: 2014-04-15
  #updated: 2013-12-06
  polymer_version: 0.2.2
  description: How to publish and deploy Polymer elements to GitHub 
tags:
- publishing
- github
- bower
---

{% include authorship.html %}

{% include toc.html %}

## Introduction

So, you want to publish your first reusable Polymer element? Fantastic! This guide will walk you through that process. First, we’ll cover setting up the official **boilerplate** for working on a reusable Polymer element on your local system. We’ll then walk through **deploying** a version of your element to [GitHub](http://github.io).

This guide will ensure your *master* branch contains the bare-minimum of code that needs to be consumed by other apps or elements and your *gh-pages (GitHub pages)* branch contains a landing page for your element. This branch will contain **checked-in dependencies**, **demos** and **documentation**.

**Note:** We assume you have git, [Node](http://nodejs.org/) and [Bower](http://bower.io/) installed on your system.

## Create

1. Create a new directory on your system for working on Polymer elements (e.g `"development"`).

2. Clone the [untitled-element](https://github.com/polymerlabs/untitled-element) boilerplate inside this directory: 

        git clone git://github.com/polymerlabs/untitled-element.git


3. Rename the element and its files accordingly. For example, if your element is called `<test-element>` and you've renamed the `untitled-element` directory to `test-element`, your file list should look a little like this:

![](/articles/images/publishing-polymer-elements/image_0.png)

4. In the terminal, run `touch .bowerrc` (or `type NUL > .bowerrc` on Windows) to create a new Bower configuration file inside your element directory. Edit the file so that Bower installs your dependencies a level up from your element. Pasting in the below and saving it should do the trick:

        {
          "directory": "../"
        }


5. Next, run `bower install` inside your element directory to install dependencies. They will end up inside the `development` directory if all goes well. You can now locally develop and serve your element up for testing purposes.

![](/articles/images/publishing-polymer-elements/image_1.png)

## Deploy

### Pushing your work to GitHub

Once you're happy with your element, you’ll want to push the code for `test-element` to GitHub and tag a new version of it.

Click [here](https://github.com/new) to create a new repository on GitHub. Try to keep the name of the repository consistent with the naming of your element (e.g if your element is `<test-element>`, your repository should be called `test-element`).

Next, follow the steps below:

    # Inside your development folder, navigate to your element directory
    cd test-element
    
    # Remove the git history for untitled-element from test-element
    rm -rf .git
    
    # Initialize a new Git repository for test-element
    git init
    
    # Add .bowerrc to a .gitignore file so it doesn’t get checked in
    # This can be done using the echo command or a text editor
    echo '.bowerrc' > .gitignore
    
    # Add the commits for your current code
    git add .
    git commit -m 'My initial version'
    
    # Add a remote pointing to the GitHub repository you created. 
    git remote add origin https://github.com/<username>/test-element.git
    
    # Push your code to master by running 
    git push -u origin master


Next, you’ll want to tag a version of your element on GitHub. You can either do this directly through the GitHub UI **or** via the terminal. 

####Via the terminal

    # Once you feel you have a version of your element you can release, tag it
    # Below we’re tagging version 0.0.1
    git tag -a v0.0.1 -m '0.0.1'
    
    # Then, push your tag to GitHub
    git push --tags


####Via the GitHub UI

Navigate to the main GitHub page for your element and click the "releases" link in the main navigation. It is highlighted in red below:

![](/articles/images/publishing-polymer-elements/image_2.png)

This will navigate you to the *Releases* page. For a project without any releases, this page will display a message similar to the one below. 

![](/articles/images/publishing-polymer-elements/image_3.png)

Click the ‘Create a new release’ button to proceed. 

This will display a Release drafting page where you can enter in version and release information for your element. Below, we’ve entered in v0.0.1 as the tag we would like to create and set the `master` branch as our target. 

![](/articles/images/publishing-polymer-elements/image_4.png)

Once you are happy with the information you have entered into the above form, click the ‘Publish release’ button to complete tagging and publishing a release of your element. Boom!

![](/articles/images/publishing-polymer-elements/image_5.png)

### Publishing a demo and landing page for your element

Great. So you should now have a tagged release for your element. Next, we’re going to use a special script to push a landing page for your element to GitHub pages. Inside your terminal, walk through running the following commands:

    # Navigate back to your development directory
    cd ../development
    
    # git clone the Polymer tools repository
    git clone git://github.com/Polymer/tools.git
    
    # Create a temporary directory for publishing your element and cd into it
    mkdir temp && cd temp
    
    # Run the gp.sh script. This will allow you to push a demo-friendly 
    # version of your page and its dependencies to a GitHub pages branch 
    # of your repository (gh-pages). Below, we pass in a GitHub username 
    # and the repo name for our element
    ./tools/bin/gp.sh <username> test-element
    
    # Finally, clean-up your temporary directory as you no longer require it
    cd ..
    rm -rf temp


This will create a new `gh-pages` branch (or clone and clear the current one) then push a shareable version of your element to it.

## Share

You can now share the link to your element hosted on GitHub pages with the world. As we used the `untitled-element` repo, Polymer will give you a styled component page out of the box that looks a little like this:

![](/articles/images/publishing-polymer-elements/image_6.png)

You can check out the [live](http://polymerlabs.github.io/untitled-element/components/untitled-element/) version of this page for the `untitled-element` project.

This page uses our [core-component-page](https://github.com/Polymer/core-component-page) element to parse out documentation from your element as long as you’re using our custom flavour of [JSDoc comments](http://usejsdoc.org/about-getting-started.html). `untitled-element` includes boilerplate for these comments out of the box.

This allows us to automatically group your documentation by attributes, methods and events, show an example and provide a summary of what your element does. It can also provide you to a link to an element [demo](http://addyosmani.github.io/test-element/components/test-element/demo.html).

##Where to go next?

Now that you’ve published your Polymer element to GitHub, you may be interested in learning how to [distribute your element using Bower](http://www.polymer-project.org/articles/distributing-components-with-bower.html).


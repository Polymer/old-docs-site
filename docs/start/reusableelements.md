---
layout: default
type: start
navgroup: start
shortname: Start
author: addyosmani
title: Creating reusable elements
subtitle: How to publish and deploy reusable Polymer elements on GitHub
---

{% include toc.html %}

## Introduction

So, you want to publish your first reusable {{site.project_title}} element? Fantastic! This guide will walk you through that process. First, we’ll cover setting up the official **boilerplate** for working on a reusable {{site.project_title}} element on your local system. We’ll then walk through **deploying** a version of your element to [GitHub pages](http://github.com).

This guide will ensure your *master* branch contains the bare-minimum of code that needs to be consumed by other apps or elements and your *gh-pages (GitHub pages)* branch contains a landing page for your element. This branch will contain **checked-in dependencies**, **demos** and **documentation**.

**Note:** We assume you have git, [Node](http://nodejs.org/) and [Bower](http://bower.io/) installed on your system.

## Create

1. Create a new directory on your system for working on {{site.project_title}} elements (e.g `"development"`).

2. Clone the [untitled-element](https://github.com/polymerlabs/untitled-element) boilerplate inside this directory: 

        git clone git://github.com/polymerlabs/untitled-element.git


3. Rename the element and its files accordingly. For example, if your element is called `<test-element>` and you've renamed the `untitled-element` directory to `test-element`, your file list should look a little like this:

![File list for the test-element directory showing that untitled-element.html and untitled-element.css have been accordingly renamed to test-element.html and test-element.css](/images/publishing-polymer-elements/image_0.png)

4. In the terminal, create a new Bower configuration file inside your element directory. This file will help Bower so that it installs your dependencies a level up from your element. The below snippet should do the trick:

        # For *nix OS
        $ cat > .bowerrc
        {
          "directory": "../"
        }
        
        # For Windows
        > echo { "directory": "../" } > .bowerrc


5. Next, run `bower install` inside your element directory to install dependencies. They will end up inside the `development` directory if all goes well. You can now locally develop and serve your element up for testing purposes.

![Directory listing of installed Bower packages including polymer, platform, core-component-page and core-action-icons. As this is the development directory, test-element is also shown in the directory list](/images/publishing-polymer-elements/image_1.png)

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

![Preview of the GitHub navigation bar for a repository listing four navigation items - commits, branches, releases, contributors. The releases link is highlighted](/images/publishing-polymer-elements/image_2.png)

This will navigate you to the *Releases* page. For a project without any releases, this page will display a message similar to the one below. 

![GitHub Releases page message stating that there aren't any releases here yet. The Create a new release button is highlighted](/images/publishing-polymer-elements/image_3.png)

Click the ‘Create a new release’ button to proceed. 

This will display a Release drafting page where you can enter in version and release information for your element. Below, we’ve entered in v0.0.1 as the tag we would like to create and set the `master` branch as our target. 

![The GitHub releases form displaying an input field for entering in a version number, a drop-down box for selecting the target branch, a release titles field and a description field](/images/publishing-polymer-elements/image_4.png)

Once you are happy with the information you have entered into the above form, click the ‘Publish release’ button to complete tagging and publishing a release of your element. Boom!

![Preview of the Publish release button in the GitHub releases page](/images/publishing-polymer-elements/image_5.png)

### Publishing a demo and landing page for your element

Great. So you should now have a tagged release for your element. Next, we’re going to use a special script to push a landing page for your element to GitHub pages. Inside your terminal, walk through running the following commands:

    # Navigate back to your development directory
    cd ../development
    
    # git clone the {{site.project_title}} tools repository
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

You can now share the link to your element hosted on GitHub pages with the world. As we used the `untitled-element` repo, {{site.project_title}} will give you a styled component page out of the box that looks a little like this:

![Preview of the component langing page, displaying the element title in the header with a demo link next to it. The rest of the page contains formatted summary and attribute/method/event information parsed from the documentation in your element](/images/publishing-polymer-elements/image_6.png)

You can check out the [live](http://polymerlabs.github.io/untitled-element/components/untitled-element/) version of this page for the `untitled-element` project.

This page uses our [core-component-page](https://github.com/Polymer/core-component-page) element to parse out documentation from your element as long as you’re using our custom flavour of [JSDoc comments](http://usejsdoc.org/about-getting-started.html). `untitled-element` includes boilerplate for these comments out of the box.

This allows us to automatically group your documentation by attributes, methods and events, show an example and provide a summary of what your element does. It can also provide you to a link to an element [demo](http://polymerlabs.github.io/untitled-element/components/untitled-element/demo.html).

##Where to go next?

Now that you’ve published your {{site.project_title}} element to GitHub, you may be interested in learning how to [distribute your element using Bower](/articles/distributing-components-with-bower.html).


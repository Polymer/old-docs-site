---
title: "Step 1: Set up"
subtitle: "Build your first Polymer element"
---

<!-- toc -->

In this tutorial, you’ll learn how to build elements using Polymer 2.0. You’ll
create a simple Polymer element, a toggle button. The finished button will look
something like this:

![Sample star-shaped toggle buttons, showing pressed and unpressed
state](/images/2.0/first-element/sample-toggles.png)

You’ll be able to use it with simple markup like this:

```html
<icon-toggle></icon-toggle>
```

This project introduces you to most of the key concepts in working with
Polymer.

Don’t worry if you don’t understand everything. Each of the concepts presented
here is described in detail in the Polymer documentation.


## Step 1: Get set up

To follow this tutorial, you’ll need:

-   Git.
-   The starting code (available on GitHub; downloadable with Git).
-   The [Polymer CLI](/2.0/docs/tools/polymer-cli) to run the demo.

### Fork the starting code repo

1.  Fork the repo by running this command:

    ```bash
    git clone https://github.com/PolymerLabs/polymer-2-first-element.git
    ```
 
2.  Open the project folder:  

    ```bash
    cd polymer-2-first-element
    ```

    Your project folder should look something like
    this:

    <pre>
    README.md
    bower.json
    demo/
    icon-toggle-finished/
    icon-toggle.html
    </pre>

    The main file you’ll work with is `icon-toggle.html`, which contains the definition for your custom element.

### Install Polymer CLI.

Install the Polymer CLI to serve the demo locally.

1.  Install [a version of Node.js supported by the Polymer toolset](https://www.polymer-project.org/2.0/docs/tools/node-support). Currently, versions 6.x and 7.x are supported.

    Downloads and installation instructions are available on the [Node.js website](https://nodejs.org/en/download/).

2.  Install [git](https://git-scm.com/downloads).

3.  Install the latest version of [Bower](http://bower.io/#install-bower).

        npm install -g bower

4.  Install Polymer CLI.

        npm install -g polymer-cli

### Install and run the demo.

To install and run the element demo:

1.  Run `bower install` from the repo directory:

        bower install

    This installs the components and dependencies required to use the Polymer library and other web components. 

    You will now see an extra folder named `bower_components` in the project directory: 

    <pre>
    README.md
    bower.json
    bower_components
    demo/
    icon-toggle-finished/
    icon-toggle.html
    </pre>

2.  Run the Polymer development server from the repo directory:

        polymer serve

3.  Open `localhost:8080/components/icon-toggle/demo/` in your browser.

    (Note that the path uses `icon-toggle`—the
    component name listed in this element’s `bower.json` file—rather than the actual directory name.
    If you’re wondering why `polymer serve` does this, see [HTML imports and dependency
    management](/2.0/docs/tools/polymer-cli#element-project-layout).)

    You’ll see some text where the icon toggles should appear. It doesn’t look
    very interesting, but it shows that everything is working.

<img src="/images/2.0/first-element/starting-state.png" alt="Initial state of the demo. The demo shows three icon-toggle elements, two labeled 'statically-configured icon toggles' and one labeled 'data-bound icon toggle'. Since the icon toggles are not implemented yet, they appear as placeholder text reading 'Not much here yet'." title="Initial demo">

**If this text doesn’t appear**, make sure you’re looking at the the demo folder itself, or at `demo/index.html`,
not at `toggle-icon.html` or `toggle-icon-demo.html`.
{ .alert .alert-info }

If everything looks good, move on to [step 2](step-2).

<a class="blue-button" href="step-2">Step 2: Add local DOM</a>

---
title: "Step 1: Set up"
subtitle: "Build your first Polymer element"
---

<!-- toc -->

In this tutorial, you’ll learn how to build elements using Polymer 1.0. You'll
create a simple Polymer element, a toggle button. The finished button will look
something like this:

![Sample star-shaped toggle buttons, showing pressed and unpressed
state](/images/1.0/first-element/sample-toggles.png)

You'll be able to use it with simple markup like this:

```html
<icon-toggle></icon-toggle>
```

This project introduces you to most of the key concepts in working with
Polymer.

Don't worry if you don't understand everything. Each of the concepts presented
here is described in detail in the Polymer documentation.


## Step 1: Get set up

To follow this tutorial, you'll need:

-   The starting code.
-   The [Polymer CLI](/1.0/docs/tools/polymer-cli) to run the demo.


**Don't want to install anything?** To run through this tutorial online,
follow the instruction in [Step 1: No install version](#noinstall).
{ .alert .alert-info }


### Download the starting code

1.  Click the button to download the starting code as a ZIP file.

    <a class="blue-button" href="https://github.com/googlecodelabs/polymer-first-elements/releases/download/v1.0/polymer-first-elements.zip">
      Download ZIP
    </a>

2.  Expand the archive to create your project folder.

    Your project folder should look something like
    this:

    <pre>
    README.md
    bower.json
    bower_components/
    demo/
    icon-toggle-finished/
    icon-toggle.html
    </pre>

    The main file you'll work with is `icon-toggle.html`, which contains the definition for your custom element.


### Install Polymer CLI.

Install the Polymer CLI to serve the demo locally.

1.  Install the LTS version (4.x) of [Node.js](https://nodejs.org/en/download/).
    The current version (6.x) should work, but is not officially supported. Versions
    below LTS are not supported.

2.  Install [git](https://git-scm.com/downloads).

3.  Install the latest version of [Bower](http://bower.io/#install-bower).

        npm install -g bower

4.  Install Polymer CLI.

        npm install -g polymer-cli

### Run the demo

To run the element demo:

1.  Run `polymer serve` from the repo directory:

        polymer serve

2.  Open `localhost:8080/components/icon-toggle/demo/` in your browser.

    (Note that the path uses `icon-toggle`—the
    component name listed in this element's `bower.json` file—rather than the actual directory name.
    If you're wondering why `polymer serve` does this, see [HTML imports and dependency
    management](/1.0/docs/tools/polymer-cli#element-imports).)

    You'll see some text where the icon toggles should appear. It doesn't look
    very interesting, but it shows that everything is working.


<img src="/images/1.0/first-element/starting-state.png" alt="Initial state of the demo. The demo shows three icon-toggle elements, two labeled 'statically-configured icon toggles' and one labeled 'data-bound icon toggle'. Since the icon toggles are not implemented yet, they appear as placeholder text reading 'Not much here yet'." title="Initial demo">

**If this text doesn't appear**, make sure you're looking at the the demo folder itself, or at `demo/index.html`,
not at `toggle-icon.html` or `toggle-icon-demo.html`.
{ .alert .alert-info }

If everything looks good, move on to [step 2](step-2).

<a class="blue-button" href="step-2">Step 2: Add local DOM</a>



## Step 2: No install version {#noinstall}

To run through this tutorial online without installing anything:

1.  Open the [starter project on Plunker](https://plnkr.co/edit/QfsudzAPCbAu56Qpb7eB?p=preview){target="\_blank"}.

2. Click **Fork** to create your own working copy.

Continue to [step 2](step-2).

<a class="blue-button" href="step-2">Step 2: Add local DOM</a>

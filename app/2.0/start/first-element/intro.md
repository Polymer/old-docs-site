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

-   [git](https://git-scm.com/downloads).
-   The starting code, [available on 
GitHub](https://github.com/PolymerLabs/polymer-2-first-element.git).
-   The [Polymer CLI](/2.0/docs/tools/polymer-cli) to run the demo.

### Download the starting code

1.  Download the starting code by running this command:

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
    index.html
    </pre>

    The main file you’ll work with is `icon-toggle.html`, which contains the definition for your 
custom element.

### Install Polymer CLI

Install the Polymer CLI to serve the demo locally. 

Polymer CLI requires Node.js, npm, git and Bower. For full installation instructions, see [the 
Polymer CLI documentation](/{{{polymer_version_dir}}}/docs/tools/polymer-cli).

To install Polymer CLI:

   ```bash
   npm install -g polymer-cli
   ```

### Install dependencies and run the demo

To install the element's dependencies and run the demo:

1.  Run `bower install` from the repo directory:

        bower install

    This installs the components and dependencies required to use the Polymer library and other web 
components. 

    You will now see an extra folder named `bower_components` in the project directory: 

    <pre>
    README.md
    bower.json
    bower_components
    demo/
    icon-toggle-finished/
    icon-toggle.html
    index.html
    </pre>

2.  Run the Polymer development server from the project directory:

        polymer serve --open

    You’ll see some text where the icon toggles should appear. It doesn’t look
    very interesting, but it shows that everything is working.
 
    (Note that the URL includes `icon-toggle`—the component name listed in this element’s `bower.json` file—rather than the actual directory name. If you’re wondering why `polymer serve` does this, see [HTML imports and dependency management](/2.0/docs/tools/create-element-polymer-cli#dependencies).)

<img src="/images/2.0/first-element/starting-state.png" alt="Initial state of the demo. The demo 
shows three icon-toggle elements, two labeled 'statically-configured icon toggles' and one labeled 
'data-bound icon toggle'. Since the icon toggles are not implemented yet, they appear as 
placeholder text reading 'Not much here yet'." title="Initial demo">

If everything looks good, move on to [step 2](step-2).

<a class="blue-button" href="step-2">Step 2: Add local DOM</a>

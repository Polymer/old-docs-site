---
title: "Step 1: Set up"
subtitle: "Build your first Polymer element"
---

<!-- toc -->

In this tutorial, you’ll learn how to build elements using Polymer 3.0. You’ll
create a simple Polymer element-a toggle button. The finished button will look
something like this:

![Sample star-shaped toggle buttons, showing pressed and unpressed
state](/images/3.0/first-element/sample-toggles.png)

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
GitHub](https://github.com/PolymerLabs/polymer-3-first-element.git).
-   The [Polymer CLI](/3.0/docs/tools/polymer-cli) to run the demo.

### Download the starting code

1.  Download the starting code by running the following command:

    ```bash
    git clone https://github.com/PolymerLabs/polymer-3-first-element.git
    ```
 
2.  Open the project folder:  

    ```bash
    cd polymer-3-first-element
    ```

    Your project folder should look something like
    this:

    <pre>
    README.md
    demo
    icon-toggle-finished
    icon-toggle.js
    index.html
    package.json
    yarn.lock
    </pre>

    The main file you’ll work with is `icon-toggle.js`, which contains the definition for your custom element.

### Install Polymer CLI

Install the Polymer CLI to serve the demo locally. 

Polymer CLI requires Node.js, npm, git and Yarn. For full installation instructions,
see [the Polymer CLI documentation](/{{{polymer_version_dir}}}/docs/tools/polymer-cli).

To install Polymer CLI:

   ```bash
   npm install -g polymer-cli
   ```

### Install dependencies and run the demo

To install the element's dependencies and run the demo:

1.  Run `yarn install` from the repo directory:

        yarn install

    This installs the components and dependencies required to use the Polymer library and other web components. 

    You will now see an extra folder named `node_modules` in the project directory: 

    <pre>
    README.md
    demo
    icon-toggle-finished
    icon-toggle.js
    index.html
    node_modules
    package.json
    yarn.lock
    </pre>

2.  Run the Polymer development server from the project directory:

        polymer serve --npm 

    **TODO: What does the `--npm` flag do? Why do we need it?**
    
    Visit the first link in the output (the link for `applications`). If you have no other local web servers running, this should be <a href="http://127.0.0.1:8081">http://127.0.0.1:8081</a>.
    
    **TODO: Fix path shenanigans so that `polymer serve --open --npm` will work**

    You’ll see some text where the icon toggles should appear. It doesn’t look
    very interesting, but it shows that everything is working.

<p><img src="/images/3.0/first-element/starting-state.png" width="500px" alt="Initial state of the demo. The demo shows three icon-toggle elements, two labeled 'statically-configured icon toggles' and one labeled 'data-bound icon toggle'. Since the icon toggles are not implemented yet, they appear as placeholder text reading 'Not much here yet'." title="Initial demo"></p>

If everything looks good, move on to [step 2](step-2).

<a class="blue-button" href="step-2">Step 2: Add local DOM</a>

---
title: "Step 1: Set up"
subtitle: "Build your first Polymer element"
---

<!-- toc -->

In this tutorial, you'll build your first custom element with Polymer 3.0. You’ll create a simple toggle button:

![Sample star-shaped toggle buttons, showing pressed and unpressed state](/images/3.0/first-element/sample-toggles.png)

You’ll be able to use the toggle button with simple markup like this:

```html
<icon-toggle></icon-toggle>
```

## Step 1: Set up

In this step, you'll: 

* [Install Polymer CLI](#install).
* [Download the starting code](#download).
* [Install dependencies and run the demo](#run).

To follow this tutorial, you’ll first need to install some command line tools. See the [Polymer CLI install guide](/{{{polymer_version_dir}}}/docs/tools/polymer-cli) for full instructions on setting up Polymer CLI and its prerequisites (Git, npm, and Node.js). 

### Install Polymer CLI {#install}

If you're comfortable that you have all the prerequisites installed, update Polymer CLI with the following command:

```
npm install -g polymer-cli
```

If you don't have the prerequisites, or you're not sure whether you have them, follow the [Polymer CLI install guide](/{{{polymer_version_dir}}}/docs/tools/polymer-cli).

### Download the starting code {#download}

Download the starting code for this tutorial by running the following command:

```bash
git clone https://github.com/PolymerLabs/polymer-3-first-element.git
```
 
Open the project folder:  

```bash
cd polymer-3-first-element
```

Your top-level project folder should look something like this:

<pre>
README.md
demo
icon-toggle-finished
icon-toggle.js
index.html
package.json
polymer.json
</pre>

The main file you’ll work with is `icon-toggle.js` in the top-level project folder. This file contains the definition for your a custome element, which you will modify.

### Install dependencies and run the demo {#run}

To install the element's dependencies and run the demo:

1.  Run `npm install` from the repo directory:

    ```
    npm install
    ```
    
    This installs the components and dependencies required to use the Polymer library and other web components. 

    You will now see an extra folder named `node_modules` and an extra file named `package-lock.json`:

    <pre>
    README.md
    demo
    icon-toggle-finished
    icon-toggle.js
    index.html
    node_modules
    package.json
    package-lock.json
    polymer.json
    </pre>

    * `node_modules` is where the project's dependencies are installed.
    * `package-lock.json` contains some npm-related dependency-management info.

2.  Run the Polymer development server from the root project directory:

    ```
    polymer serve --open
    ```

    You’ll see something like this:

<p><img src="/images/3.0/first-element/starting-state.png" width="500px" alt="Initial state of the demo. The demo shows three icon-toggle elements, two labeled 'statically-configured icon toggles' and one labeled 'data-bound icon toggle'. Since the icon toggles are not implemented yet, they appear as placeholder text reading 'Not much here yet'." title="Initial demo"></p>

Keep the demo open, and move on to [step 2](step-2).

<a class="blue-button" href="step-2">Step 2: Add local DOM</a>

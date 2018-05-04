---
title: Install Polymer 3.0
---

<!-- toc -->

This chapter describes how to install the Polymer 3.0 tools and get started with a template Polymer 3.0 project. 

## Install the Polymer 3.0 prerequisites

To set up a development environment for Polymer 3.0: 

* [Install Git](#git).
* [Install npm and Node.js](#node).
* [Install Polymer CLI](#cli).
* Optionally, [Download and serve a sample Polymer 3.0 app](#app).

### Install Git {#git}

[Download and run a Git installer for your operating system](https://git-scm.com/download/). 

[See the Git documentation](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git) for detailed instructions on installing Git.

To confirm that Git is correctly installed:

```bash
git --version
```

### Install npm and Node.js {#node}

[Download and run a Node.js installer for your operating system](https://nodejs.org/en/download/). This will install npm as well. 

For more detailed instructions on installing npm and Node.js, see the [npm and Node.js install documentation](https://docs.npmjs.com/getting-started/installing-node).

**Install a current or active LTS version of Node.js**. Polymer requires a current or active LTS version of Node.js. See our [Node.js support page](/{{{polymer_version_dir}}}/docs/tools/node-support) for more information.
{.alert .alert-info}

To confirm that npm is correctly installed:

```bash
npm --version
```

To confirm that Node.js is correctly installed:

```bash
node --version
```

### Install Polymer CLI {#cli}

To install Polymer CLI, run the following command:

```bash
npm install -g polymer-cli@next
```

To confirm that the Polymer CLI has been correctly installed:

```bash
polymer --version
```

## Optional: Download and serve a sample Polymer 3.0 app {#app}

To test your Polymer development environment, you can try out a sample Polymer app we prepared earlier:

```bash
git clone https://github.com/PolymerLabs/start-polymer3.git
cd start-polymer3
npm install
polymer serve
```

For more information on the tools and options in the Polymer CLI, see the documentation on [Polymer CLI commands](/{{{polymer_version_dir}}}/docs/tools/polymer-cli-commands).

## Next steps {#next}

* [Build your first Polymer app](/{{{polymer_version_dir}}}/start/toolbox/set-up)
* [Build your first element with the Polymer library](/{{{polymer_version_dir}}}/start/first-element/intro)

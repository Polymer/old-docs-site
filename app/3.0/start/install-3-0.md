---
title: Install Polymer 3.0
---

<!-- toc -->

This chapter describes how to install the Polymer 3.0 tools and get started with a template Polymer 3.0 project. 

## Install the Polymer 3.0 prerequisites

Note: We recommend using npm to install the Polymer CLI globally, and Yarn to add the Polymer library and elements to your project.

Polymer elements need to be unique, so we recommend using Yarn's `--flat` install option if possible to install your project's dependencies. This prevents your project from attempting to install multiple versions of the same element.

To set up a development environment for Polymer 3.0: 

* [Install Git](#git).
* [Install npm and Node.js](#node).
* [Install Yarn](#yarn).
* [Install the Polymer CLI](#cli).
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
{ .alert}

To confirm that npm is correctly installed:

```bash
npm --version
```

To confirm that Node.js is correctly installed:

```bash
node --version
```

### Install Yarn {#yarn}

For Mac and Linux users, an easy way to install Yarn is to run the Yarn install script:

```bash
curl -o- -L https://yarnpkg.com/install.sh | bash
```

[See the Yarn documentation for more information on the install script](https://yarnpkg.com/lang/en/docs/install/#alternatives-tab).

You can also install Yarn from a package manager on such as apt or Homebrew. [See the Yarn documentation for detailed instructions](https://yarnpkg.com/lang/en/docs/install/).

To confirm that Yarn is correctly installed:

```bash
yarn --version
```

### Install the Polymer CLI {#cli}

To install the Polymer CLI, run the following command:

```bash
npm install -g polymer-cli
```

Note: If you have a previous version of the Polymer CLI, the command above will update it to the
latest version.

To confirm that the Polymer CLI has been correctly installed:

```bash
polymer --version
```

## Optional: Download and serve a sample Polymer 3.0 app {#app}

To test your Polymer development environment, you can try out a sample Polymer app we prepared earlier:

```bash
git clone https://github.com/PolymerLabs/start-polymer3.git
cd start-polymer3
yarn install --flat
polymer serve --open --npm --module-resolution=node
```

For more information on the tools and options in the Polymer CLI, see the documentation on [Polymer CLI commands](/{{{polymer_version_dir}}}/docs/tools/polymer-cli-commands).

## Next steps {#next}

* [Build your first Polymer app](/{{{polymer_version_dir}}}/start/toolbox/set-up)
* [Build your first element with the Polymer library](/{{{polymer_version_dir}}}/start/first-element/intro)
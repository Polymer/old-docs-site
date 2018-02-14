---
title: Install Polymer 3.0
---

<!-- toc -->

## Install the Polymer 3.0 prerequisites

The Polymer 3.0 library is published to the [npm registry](https://docs.npmjs.com). Polymer
projects use Yarn to install packages and manage dependencies. 

To set up a development environment for Polymer 3.0: 

* Install Git.
* Install npm and Node.js.
* Install Yarn.
* Install the Polymer CLI.

### Install Git 

[Download and run a Git installer for your operating system](https://git-scm.com/download/). 

[See the Git documentation](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git) for detailed instructions on installing Git.

To confirm that Git is correctly installed:

```
git --version
```

### Install npm and Node.js

[Download and run a Node.js installer for your operating system](https://nodejs.org/en/download/). This will install npm as well. 

For more detailed instructions on installing npm and Node.js, see the [npm and Node.js install documentation](https://docs.npmjs.com/getting-started/installing-node).

**Install a current or active LTS version of Node.js**. Polymer requires a current or active LTS version of Node.js. See our [Node.js support page](/{{{polymer_version_dir}}}/docs/tools/node-support) for more information.
{ .alert}

To confirm that npm is correctly installed:

```
npm --version
```

To confirm that Node.js is correctly installed:

```
node --version
```

### Install Yarn

For Mac and Linux users, an easy way to install Yarn is to run the Yarn install script:

```
curl -o- -L https://yarnpkg.com/install.sh | bash
```

[See the Yarn documentation for more information on the install script](https://yarnpkg.com/lang/en/docs/install/#alternatives-tab).

You can also install Yarn from a package manager on such as apt or Homebrew. [See the Yarn documentation for detailed instructions](https://yarnpkg.com/lang/en/docs/install/).

To confirm that Yarn is correctly installed:

```
yarn --version
```

### Install the Polymer CLI

To install the Polymer CLI, run the following command:

```
npm install -g polymer-cli
```

Note: If you have a previous version of the Polymer CLI, the command above will update it to the
latest version.

To confirm that the Polymer CLI has been correctly installed:

```
polymer --version
```

## Optional: Download and serve a template Polymer app

Optionally, to test your Polymer development environment, try out a template Polymer app we prepared earlier:

```
git clone https://github.com/katejeffreys/start-polymer3.git
cd start-polymer3
polymer serve --open --npm
```

For more information on the tools and options in the Polymer CLI, see the documentation on [Polymer CLI commands](/{{{polymer_version_dir}}}/docs/tools/polymer-cli-commands).

## Next steps

* [Build your first Polymer app](/{{{polymer_version_dir}}}/start/toolbox/set-up)
* [Build your first element with the Polymer library](/{{{polymer_version_dir}}}/start/first-element/intro)
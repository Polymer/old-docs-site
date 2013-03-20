---
layout: default
title: Tooling Strategy
---

## Summary

### Repositories 

It's generally a good idea to perform

    git submodule update --init --recursive

after cloning a {{site.project_title}} repository, to ensure you have any submodule files.

###  Minification, Testing, and Documentation

To run tests, build minified files, or build documentation you need `node` and
`grunt-cli` on your system.

* install [NodeJS](http://nodejs.org) using the instructions on their website
* use `npm` to install the [GruntJS](http://gruntjs.com) task runner for the command-line
	
		npm install -g grunt-cli

Now for any repository in which you want to use tools, install the Node dependencies
and use Grunt to perform tasks. In the project's root folder (e.g. `<somepath>/platform/`), run:

    npm install


Once things are installed, you may run the tests or use `grunt` to perform tasks.

Build minified project files (default):

    grunt

Build documentation:

    grunt docs

## Background and Details

### Repositories 

Git has these features:

* The smallest bit Git can manage is a repository.
* Repositories can be aggregated via submodules.

therefore, we have factored our repositories into atomic chunks, and then created integration repositories to bring them together again.

For example, the following repositories may be useful individually:

* `CustomElements`
* `ShadowDOM`
* `MDV`
* `PointerGestures`

So other repositories, such as:

* `Platform`
* `Toolkit`
* `Toolkitchen`

aggregate those individual repositories (as submodules) into useful combinations.

Remember that after cloning a repository containing submodules, you need to perform

    git submodule update --init --recursive

to bring down all submodule files.

### Executables for Minification, Testing, and Documentation

A certain amount of executable tooling is required for things like minifying code, running tests, and generating documentation.

Having all the needed dependencies directly in the repositories is not ideal: they take up space, may need to be frequently updated, and are often duplicated. 

Instead, we want to be able to install those tools when they are needed.

We chose Node as our executable environment for these tools, as it is multi-platform, there are many such tools already available, and the Node Package Manager (`npm`) is very handy for installation.

Once `node` is installed, Most of the time all you have to do to acquire tooling is execute

    npm install

in the root folder of the repository.

We also employ `grunt`, which is a general purpose task runner (like a very simple `make`) that works under Node.

Grunt is designed to have two parts, a command-line interface, and then a local grunt worker. The local grunt tasks are installed via npm install, but you will need to install the `grunt-cli` once, globally, via

    npm install -g grunt-cli







---
layout: default
title: Tools & Testing
---

## Repositories 

Git has these features:

* The smallest bit Git can manage is a repository.
* Repositories can be aggregated via submodules.

therefore, we have factored our repositories into atomic chunks, and then created
integration repositories to bring them together again.

For example, the following repositories may be useful individually:

* `CustomElements`
* `ShadowDOM`
* `MDV`
* `PointerGestures`

Other repositories aggregate these individual repositories (as submodules) into useful combinations:

* `platform`
* `toolkit`

<p class="alert">
Remember that after cloning a repository containing submodules, it's generally a good idea to perform
<code>git submodule update --init --recursive</code> to ensure you have all submodule files.
</p>

## Minification, Testing, and Documentation

To run tests, build minified files, or build documentation you need `node` and
`grunt-cli` on your system.

* install [NodeJS](http://nodejs.org) using the instructions on their website
* use `npm` to install the [GruntJS](http://gruntjs.com) task runner for the command-line
	
		npm install -g grunt-cli

Now for any repository in which you want to use tools, install the Node dependencies
and use Grunt to perform tasks. In the project's root folder (e.g. `<somepath>/platform/`), run:

    npm install

### Tasks

Once things are installed, you may run the tests or use `grunt` to perform tasks.

Build minified project files (default):

    grunt

Build documentation:

    grunt docs
    
Run tests:

    grunt test



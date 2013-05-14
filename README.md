Polymer docs are mostly in Markdown with some HTML. [Jekyll][jekyll] is used to generate the static HTML for the site. The output is generated into a folder called `_site` and served from Google App Engine.

## Install the requirements

We use Jekyll 1.0+ and [Grunt][grunt] to generate the documentation. You'll need to install the requirements before working on the docs:

    sudo gem install jekyll
    npm install

## Making edits and previewing changes

This repo (`polymer-project/docs`) is where the documentation source files live. To make a change, follow this basic process:

1. Checkout this repo (using `git clone git://github.com/polymer-project/docs.git --recursive`) and make desired changes.
- To build the docs locally, run `grunt` or ``. This starts a web server at
[http://localhost:4000](http://localhost:4000) where you can preview your edits. This also watches and rebuilds on changes.

The generated site is placed in a folder named `_site`. Alternatively, if you just want to
build the docs and not run a webserver, run:

    grunt jekyll:server

Once your changes look good, `git commit` them and push.

## Building and pushing the docs

**Note**: only project owners can publish the documentation.

Make sure your `docs/polymer` submodule is up to date
(this should only be necessary when `polymer` merges the *master* -> *stable* branch):

    git submodule update --recursive

TODO

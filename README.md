Polymer docs are mostly in Markdown with some HTML. [Jekyll][jekyll] is used to generate the static HTML for the site. The output is generated into a folder called `_site` and served from Google App Engine.

## Prereqs and installation requirements

We use Jekyll 1.4.2+ and [Grunt][grunt] to generate the documentation. You'll need to install the requirements before working on the docs (these instructions assume [NPM is already installed](http://nodejs.org/download/)):

    sudo gem install jekyll
    sudo gem install kramdown
    sudo npm install -g grunt-cli
    npm install

You'll also need the App Engine SDK to run the dev_appserver and preview the docs locally. [Download the SDK](https://developers.google.com/appengine/downloads).

### Check out the documentation

Checkout this repo:

    git clone https://github.com/Polymer/docs.git --recursive

Create a directory `polymer-all/projects` and run the `pull-all-projects.sh` script in that directory:

    cd docs/polymer-all
    mkdir projects; cd projects
    ../tools/bin/pull-all-projects.sh

This populates `projects` with a bunch of repositories. You'll periodically need to re-run `pull-all-projects.sh` whenever the site is released.

Next, create a `components` folder in the top level `docs` directory and run `pull-all-polymer.sh` and `pull-all-elements.sh` in it:

    cd ../..
    mkdir components; cd components
    ../polymer-all/tools/bin/pull-all-polymer.sh
    ../polymer-all/tools/bin/pull-all-elements.sh

**Note:** these scripts can take some time to download.

## Making edits and previewing changes

This repo (`Polymer/docs`) is where the documentation source files live. To make a change:

1. First, up the App Engine dev server in this folder (`dev_appserver.py .`) to preview the docs.
1. Make your edits.
1. To build the docs, run `grunt` in base of the docs diretory you checked out. This starts up jekyll and watches for changes as you make edits. Be sure to run `npm install` in your docs directory if it's a new checkout. It can take some time for the docs to fully regenerate and be copied to the output folder...keep refreshing!

Jekyll generates the static site in a folder named `_site`. **Note**: If you're not running jekyll to rebuild the site, you won't see your changes in the dev server.

Once your changes look good, `git commit` them and push.

## Building and pushing the docs

**Note**: only project owners can publish the documentation.

If you have things checked out correctly in `components` and `polymer-all`, you should be able to generate the prodcution documentation using:

    grunt docs

It's a good idea to do this before pushing the docs, as it runs a number of grunt tasks. Verify things went well.

Last step is to push the docs to App Engine. In your `Polymer/docs` directory, run:

    ./scripts/deploy_site.sh

This script builds the site, api docs, runs Vulcanizer over the imports, and deploys to App Engine.

[jekyll]: http://jekyllrb.com/
[grunt]: http://gruntjs.com/

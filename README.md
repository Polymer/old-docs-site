Polymer docs are mostly in Markdown with some HTML. [Jekyll][jekyll] is used to generate the static HTML for the site. The output is generated into a folder called `_site` and served from Google App Engine.

## Prereqs and installation requirements

We use Jekyll 1.0+ and [Grunt][grunt] to generate the documentation. You'll need to install the requirements before working on the docs (these instructions assume [NPM is already installed](http://nodejs.org/download/)):

    sudo gem install jekyll
    sudo npm install -g grunt-cli
    npm install

You'll also need the App Engine dev server to preview the docs locally. [Download the SDK](https://developers.google.com/appengine/downloads).

### Check out the documentation

Checkout this repo:

    git clone https://github.com/Polymer/docs.git --recursive

Create a directory called `polymer-all` and check out Polymer's tools into it:

    cd docs
    mkdir polymer-all; cd polymer-all
    git clone https://github.com/Polymer/tools.git --recursive

Run the `pull-all.sh` script:

    ./tools/bin/pull-all.sh

This pulls down a number of repos needed by the documentation. The first time you run this script will take several minutes. 

## Making edits and previewing changes

This repo (`Polymer/docs`) is where the documentation source files live. To make a change:

1. Make your edits.
1. To build the docs, run `grunt` in base of the docs diretory you checked out. This starts up jekyll and watches for changes as you make edits. You may need to run `npm install` in your docs directory if it's a new checkout.
1. Lastly, fire up the App Engine dev server in this folder (`dev_appserver.py .`) to preview the docs.

Jekyll generates the static site in a folder named `_site`. **Note**: If you're not running jekyll to rebuild the site, you won't see your changes in the dev server.

Once your changes look good, `git commit` them and push.

## Building and pushing the docs

**Note**: only project owners can publish the documentation.

If you have things checked out correctly in `polymer-all` using the `pull-all.sh` script, you should be able to generate the documentation using:

    grunt docs

This needs to be done before pushing.

Last step is to push the docs to App Engine. In your `Polymer/docs` directory, run:

    appcfg.py --oauth2 update .

(The `--oauth2` is not required, but makes it easier to upload if you use second factor authentication.)

[jekyll]: http://jekyllrb.com/
[grunt]: http://gruntjs.com/

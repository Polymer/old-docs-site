Polymer docs are mostly in Markdown with some HTML. [Jekyll][jekyll] is used to generate the static HTML for the site. The output is generated into a folder called `_site` and served from Google App Engine.

## Prereqs and installation requirements

We use Jekyll 2.4 and [Grunt][grunt] to generate the documentation, and compass to compile SASS to CSS. You'll need to install the requirements before working on the docs (these instructions assume [NPM is already installed](http://nodejs.org/download/)):

    gem install bundler
    npm install -g grunt-cli vulcanize bower

**Note:** If you receive permission warnings, you may need to run the above tasks with `sudo`.

You'll also need the Python App Engine SDK to run the dev_appserver and preview the docs locally. [Download the SDK](https://developers.google.com/appengine/downloads).


### Getting Started

- `git clone https://github.com/Polymer/docs.git`
- `bundle install`
- `npm install`
- `cd 0.5`
- `bower install`
- `grunt docs`
- `grunt` (or `npm start`)

## Making edits and previewing changes

This repo (`Polymer/docs`) is where the documentation source files live. To make a change:

1. Be sure to run `npm install` in your docs directory if it's a new checkout.
2. Fire up the `grunt` task. This task runs a number of processes: a local app engine server, jekyll, compass, and vulcanize. The jekyll, compass, and vulcanize tasks will all watch for file changes and update the site if you make any edits.
**Note:** Jekyll generates the static site in a folder named `_site`. It can take some time for the docs to fully regenerate and be copied to the output folder...keep refreshing!
3. Make your edits.

Once your changes look good, `git commit` them and push.

## Releases: pushing the docs

**Note**: only project owners can publish the documentation.

### Preview locally

It's a good idea to run `grunt` before pushing the docs, as it runs a number of grunt tasks. Verify things went well and preview your changes locally using the dev server.

### Update apps

When updating the version of Polymer that the site uses, make sure to also update it in the following apps:

- [Tutorial](https://github.com/Polymer/polymer-tutorial)
- [Topeka](https://github.com/Polymer/topeka)
- [Designer](https://github.com/Polymer/designer)

Unzip the release candidate into the `bower_components` directory of each app, verify, then run the app's `deploy.sh` script. In the case of the Tutorial, you'll need to follow the deploy instructions on the repo itself.

### Release

Run `bower update` to make sure you have the latest component dependencies.

Once these are updated, you need to update some versions for the docs:

- Increment the version in `app.yaml`;
- Update the Polymer release version in `_config.yml`.
- Add a link point link to the release notes in `changelog.md`.

Build the docs:

    grunt docs
    
At this point, run the dev server with `grunt`, and preview things locally to make sure nothing is terribly
broken after Polymer and the elements have been updated. 

Next, run the deploy script in the root of the `Polymer/docs` directory:

    ./scripts/deploy_site.sh
    
This script builds the site, api docs, runs Vulcanizer over the imports, and deploys to App Engine.    

Last thing is to switch the app version in the App Engine admin console. To make the docs live, hit up https://appengine.google.com/deployment?&app_id=s~polymer-project and select the version you just deployed.

[jekyll]: http://jekyllrb.com/
[grunt]: http://gruntjs.com/

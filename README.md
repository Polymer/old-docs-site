Polymer docs are mostly in Markdown with some HTML. [Jekyll][jekyll] is used 
to generate the static HTML for the site. The output is generated into a 
folder called `_site` and served from Google App Engine.

We use Jekyll 2.4 and [Grunt][grunt] to generate the documentation, and compass to compile SASS to CSS.



## Setup

In this section you learn how to:

1. install all of the tools needed to build the site
2. build the site
3. locally preview the site

These setup instructions were validated against Mac OS X 10.10.3.

We've included brief descriptions on how each tool is used in the build
process. The build process is automated, so you don't really need 
to know this stuff, but it will be very useful to know when
things go wrong.

Install npm:

    http://nodejs.org/download

npm is a JavaScript dependency manager. It is bundled with Node.js 
by default.

Install Bundler:

    gem install bundler --user-install 

Bundler is a Ruby dependency manager. We use it to manage 
Jekyll (the tool we use to generate static HTML from markdown), and 
its dependencies. 

The `--user-install` flag in the command above installs the gem to your home
directory (usually `~/.gem/ruby/1.9.1`). The default behavior is to
install to the system-wide Ruby directory
(usually `/var/lib/gems/1.9.1`) which can create all kinds of
problems down the line. 

If Ruby warns you that the user install directory is not on your
path, add it now by adding the following to your `.bashrc` file
(or whatever is appropriate for your development environment):

    PATH="$PATH:$(ruby -rubygems -e 'puts Gem.user_dir')/bin"

Next, install Grunt, Vulcanize, and Bower:

    npm install -g grunt-cli vulcanize@0.7 bower

Grunt automates repetitive tasks, like minifying 
JavaScript, compiling SASS, and deploying the website.
Vulcanize (built by the Polymer team) reduces HTML files and their 
dependent HTML imports into one file. Bower is another tool for
managing JavaScript dependencies.

`vulcanize@0.7` instructs npm to istall version 0.7. If you omitted this,
it would install the latest release, which does not play nicely
with our build toolchain.

The `-g` flag installs these command-line tools globally, so that 
you can use them in any directory. Some of the build scripts expect
the tools to be globally accessible.

Download and install the Google App Engine Python SDK:

    https://developers.google.com/appengine/downloads

We'll use the App Engine to locally preview and deploy the website.

Clone this repository. For sake of example, we'll assume you clone 
it to `~/Polymer/docs`.

    git clone https://github.com/Polymer/docs.git

Change directories to this repository.

    cd ~/Polymer/docs

Install Jekyll and its dependencies:

    bundle install --path ~/.gem

This installs all gems to the same location as Bundler, rather 
than the system-wide Ruby directory.

Install Grunt and various other tools for building / deploying the site: 

    npm install

`npm` reads `package.json` and installs all of the dependencies
it finds into `node_modules`.

Change directories to the directory for 0.5 documents:

    cd 0.5

Install a bunch of dependencies:

    bower install

When bower instructs you to select a Polymer version, select `0.5`.

Change directories to the directory for Polymer version 1.0 documents:

    cd ../1.0

Install more dependencies: 

    bower install

When it prompts you to specify which version of Polymer to use, select
`0.5` again.

Change directories to the `samples` directory:

    cd samples/

Install dependencies:

    bower install

Unlike the rest of the website, the samples are built with Polymer
version 1.0.

Change directories to the root of the repository:

    cd ../..

Build the website:

    grunt docs

When grunt runs the `doc_merge:0_5` and `doc_merge:1_0` tasks, you will see 
a list of errors along the lines of `Unable to find @extends input from
core-input` or `Unable to find @mixins CoreFocusable from core-tooltip`. You
can safely ignore these errors.

Deploy the site locally:

    grunt

Open a web browser and view the website at the following location:

    http://localhost:3000

You're done. Phew!

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

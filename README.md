Toolkitchen docs are mostly in Markdown with some HTML. [Jekyll][jekyll] is used to generate the static HTML for the site. The output is copied to
`/toolkitchen/toolkitchen.github.com` for serving.

Our documentation source files (located in this repo) and the rendered HTML (located in `/toolkitchen/toolkitchen.github.com`)
are in separate repos in order to take advantage of Jekyll `_plugins`, special build scripts, and have full control
over doc generation.

## Install the requirements

We use [Grunt][grunt] to generate the documentation. You'll need to install the requirements before working on the docs:

    npm install

## Making edits and previewing changes

This repo (`toolkitchen/docs`) is where the documentation source files live. To make a change, follow this basic process:

1. Checkout this repo and make desired changes.
- To build the docs locally, run `grunt` or ``. This starts a web server at
[http://localhost:4000](http://localhost:4000) where you can preview your edits. This also watches and rebuilds on changes.

The generated site is placed in a folder named `_site`. Alternatively, if you just want to
build the docs and not run a webserver, run:

    grunt jekyll:server

Once your changes look good, `git commit` them and push.

## Building and pushing the docs

First, checkout `toolkitchen/toolkitchen.github.com`. This repo is where the generated docs live
and are served from using [Github Pages](https://help.github.com/categories/20/articles).

Next, run the `publish` task:

    grunt publish

This generates the docs in `_site/` and copies its contents into your checked out version
of `toolkitchen/toolkitchen.github.com`.

The last step is to commit and push those changes live. To do that, just make the commit:

    git commit -am 'Updating live docs'
    git push

[jekyll]: https://github.com/mojombo/jekyll
[grunt]: http://gruntjs.com/

---
layout: default
type: guide
shortname: Articles
title: "Concatenating Web Components with Vulcanize"
subtitle: Reduce network requests by flattening HTML Imports

article:
  author: addyosmani
  published: 2013-12-20
  #updated: 2013-12-06
  polymer_version: 0.1.1
  description: Techniques for concatenating elements and their HTML imported dependencies into a single file.
tags:
- concatenation
- optimization
- tooling
- build
---

{% include authorship.html %}

{% include not-an-intro.html %}

{% include toc.html %}

We all know that reducing network requests is important. In the {{site.project_title}} world, [Vulcanize](https://github.com/Polymer/vulcanize) is the name given to a build tool that lets you **concatenate** a set of elements and their HTML imported dependencies into a single file. If your app has lots of top-level imports, consider squashing them into a single file and importing it instead!

Vulcanize recursively pulls in all your imports, flattens their dependencies and spits out something that can potentially **reduce the number of network requests** your app makes.

In the future, we will hopefully have the tech to do away with needing Vulcanize using advanced HTTP techniques (e.g HTTP 2.0). In the mean time, it's an excellent tool for cutting down on the network requests made by your {{site.project_title}} apps.

**Note:** for more great info on performance considerations worth keeping in mind when using HTML Imports, see [HTML Imports - #include for the web](http://www.html5rocks.com/en/tutorials/webcomponents/imports/#performance)
{: .alert .alert-info }

## Installation

You can install Vulcanize and its dependencies using [NPM](http://npmjs.org):

    npm install -g vulcanize

We recommend installing Vulcanize globally so you can run it from anywhere on the command-line. To install locally, simply omit the `-g` flag.

## Usage

### Basic

Assuming an input HTML file index.html using a number of HTML imports, we can run it through Vulcanize by passing it as an argument as follows:

    vulcanize index.html

The output file can be specified using the `--output` or `-o` flag:

    vulcanize -o build.html index.html

No additional configuration is necessary. build.html now contains a version of index.html with all imports inlined and dependencies flattened. Paths to any URLs are automatically adjusted for the new output location, with the exception of those set in JavaScript.

If no output is specified, vulcanized.html is used by default.

#### Example

Let's say we have a {{site.project_title}} app composed of three HTML files: index.html, x-app.html, and x-dep.html.

index.html:

{% raw %}
    <!doctype html>
    <html>
      <head>
        <script src="bower_components/webcomponentsjs/webcomponents.js"></script>
        <link rel="import" href="app.html">
      </head>
      <body>
        <x-app></x-app>
      </body>
    </html>
{% endraw %}

app.html:

{% raw %}
    <link rel="import" href="bower_components/polymer/polymer.html">
    <link rel="import" href="path/to/x-dep.html">
    <polymer-element name="x-app">
      <template>
        <x-dep></x-dep>
      </template>
      <script>Polymer('x-app');</script>
    </polymer-element>
{% endraw %}

  x-dep.html:

{% raw %}
    <link rel="import" href="bower_components/polymer/polymer.html">
    <polymer-element name="x-dep">
      <template>
        <img src="x-dep-icon.jpg">
      </template>
      <script>Polymer('x-dep');</script>
    </polymer-element>
{% endraw %}

Without any concatenation in place, loading up this application will result in at least 6 network requests. Let's bring that number down. Running Vulcanize on index.html, and specifying build.html as the output:

    vulcanize -o build.html index.html

This results in a build.html that looks a little like this:

{% raw %}
    <!doctype html>
    <script src="bower_components/polymer/polymer.js"></script>
    <polymer-element name="x-dep" assetpath="path/to/">
      <template>
        <img src="path/to/x-dep-icon.jpg">
      </template>
      <script>Polymer('x-dep');</script>
    </polymer-element>
    <polymer-element name="x-app" assetpath="">
      <template>
        <x-dep></x-dep>
      </template>
      <script>Polymer('x-app');</script>
    </polymer-element>
    <x-app></x-app>
{% endraw %}

### Inlining resources

If your index.html or one of your HTML imports contains references to external scripts/stylesheets you may wish to inline them. Inlining means the flattened import tree is dumped into the index.html file. This means zero import requests, but less flexibility.

Inline the imported requests with the `--inline` flag.

    vulcanize -o build.html index.html --inline

Vulcanize also supports the opposite of this process, extracting inline scripts to external files for the purposes of CSP.

## Content Security Policy

[Content Security Policy](http://en.wikipedia.org/wiki/Content_Security_Policy) (CSP) is a JavaScript security model that aims to prevent XSS and other attacks. In so doing, it prohibits the use of inline scripts.

To use {{site.project_title}} in a CSP environment that doesn't support inline scripts, pass the `--csp` flag to Vulcanize. It removes all scripts from the HTML Imports and place their contents into an output JavaScript file. This is useful in amongst other things, using {{site.project_title}} in a Chrome App.

Using the previous example, the output from `vulcanize -o build.html index.html --csp` will be

build.html:

{% raw %}
    <!doctype html>
    <script src="bower_components/polymer/polymer.js"></script>
    <polymer-element name="x-dep" assetpath="path/to/">
      <template>
        <img src="path/to/x-dep-icon.jpg">
      </template>
      <script>Polymer('x-dep');</script>
    </polymer-element>
    <polymer-element name="x-app" assetpath="">
      <template>
        <x-dep></x-dep>
      </template>
      <script>Polymer('x-app');</script>
    </polymer-element>
    <script src="build.js"></script>
    <x-app></x-app>
{% endraw %}

build.js:

{% raw %}
    Polymer('x-dep');
    Polymer('x-app');
{% endraw %}

## FAQ

### Can I use Vulcanize with Grunt or Gulp?

Although Vulcanize does a great job of flattening imports, you may have an existing build system setup that needs to uglify/minify your code or run your CSS through a preprocessor. Vulcanization can be added to Gulp using [gulp-vulcanize](https://github.com/sindresorhus/gulp-vulcanize) or to Grunt using the [grunt-vulcanize](https://github.com/Polymer/grunt-vulcanize) task. In fact, we dogfood the task on this [very](https://github.com/Polymer/docs/blob/master/Gruntfile.js#L46:L56) site :)

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

    npm install grunt-vulcanize --save-dev

Once the plugin has been installed, enable it inside your Gruntfile with this line of JavaScript:

    grunt.loadNpmTasks('grunt-vulcanize');

In your project's Gruntfile, add a section named vulcanize to the data object passed into `grunt.initConfig()`.

    grunt.initConfig({
      vulcanize: {
        options: {
          // Task-specific options go here.
        },
        your_target: {
          // Target-specific file lists and/or options go here.
        },
      },
      // ...
    });

You can then use custom options to further configure the task. For example, below we use the `csp` option to apply Content Security Policy settings and `excludes` to leave alone any imports that match the regex "polymer.html". The file `index.html` is vulcanized into `build-csp.html`:

    grunt.initConfig({
      vulcanize: {
        options: {
          csp: true,
          excludes: {
            imports: [
              "polymer.html"
            ]
          }
        },
        files: {
          'build-csp.html': 'index.html'
        },
      },
    });

For more information on how to configure the `grunt-vulcanize` task, read the [official documentation](https://github.com/Polymer/grunt-vulcanize/blob/master/README.md).

### Is concatenation a good idea?

This depends on how large your application is. Excessive requests are often far worse than filesize. Hypothetically, let's say you have 20 HTML files/imports of 0.5MB each. Out of which only 2 (1MB) are required on the first page. You might want to keep them separate and combine others or load others in a deferred mode while on the first page.

Some of the things that you should think about before combining a large number of imports are when you combine 100 files together, you're cutting down on 99 requests, but you're also doing the following:

* Increasing how long it takes to download that single file (and potentially block loading of an important page)

* Accounting for the additional time spent parsing and rendering that additional code we just pulled from the server, which may not be required at this point.

The short answer is "don't guess it, test it". There is always a trade-off when it comes to concatenation but tools like [WebPageTest](http://webpagetest.org) can be useful for determining what your true bottlenecks are.

{% include disqus.html %}

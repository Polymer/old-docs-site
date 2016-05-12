---
title: Optimize for production
---

<!-- toc -->

[Polymer CLI](polmyer-cli) is the recommended starting point for building
Polymer applications. If for some reason it does not meet your needs, you 
can use the underlying libraries that power its build toolchain. See
[Advanced tools](advanced#build) for a list of these tools. 

This guide teaches you more about two of these underlying tools: Vulcanize 
and Cripser. This doc is mainly of interest to people who are developing their 
own customized build toolchains. 

## Overview

Reducing network requests is important for a performant app experience. In the Polymer world, [Vulcanize](https://github.com/Polymer/vulcanize) is the name given to a build tool that lets you **concatenate** a set of elements and their HTML imported dependencies into a single file. Vulcanize recursively pulls in all your imports, flattens their dependencies and spits out something that can **reduce the number of network requests** your app makes. Additionally, the Polymer build tools can also be used to transform your code to run in an environment that enforces [content security policy (CSP)](#content-security-policy), including Chrome Apps and Extensions.

**Note:** for more great info on performance considerations worth keeping in mind when using HTML Imports, see [HTML Imports - #include for the web](http://www.html5rocks.com/en/tutorials/webcomponents/imports/#performance)
{ .alert .alert-info }

Follow the steps below to get set up, or watch the Polycast:

<google-youtube
  video-id="EUZWE8EZ0IU"
  autoplay="0"
  rel="0"
  fluid>
</google-youtube>

## Installation

Install Vulcanize and its dependencies using [NPM](http://npmjs.org):

    npm install -g vulcanize

It's recommended to install Vulcanize globally so you can run it from anywhere on the command-line. To install locally, simply omit the `-g` flag.

## Usage

Vulcanize can be used standalone from the command line, or as part of a `gulp`/`grunt` build chain.

### Use Vulcanize from the command line

If you have an input HTML file, `elements.html`, that uses a number of HTML imports, you can run it through Vulcanize as follows:

    vulcanize elements.html -o elements.vulcanized.html

The `-o` or `--output` flag will direct the output to a new file called `elements.vulcanized.html`. If you omit the `-o` flag, Vulcanize will print the output to stdout, which can be useful if you want to pipe it to another command.

`elements.vulcanized.html` now contains a version of `elements.html` with all imports inlined and dependencies flattened. Paths to any URLs are automatically adjusted for the new output location, with the exception of those set in JavaScript.

You can pass additional options to Vulcanize in the form of flags. For a full list of supported flags, see [the official Vulcanize documentation](https://github.com/Polymer/vulcanize#using-vulcanize-programmatically).

Here’s the same example from above. The extra flags tell Vulcanize to strip out comments, and to merge external scripts and CSS files into the vulcanized file.

    vulcanize -o elements.vulcanized.html elements.html --strip-comments --inline-scripts --inline-css

### Use Vulcanize with gulp

Although Vulcanize does a great job of flattening imports, you may have an existing build system setup that needs to uglify/minify your code or run your CSS through a preprocessor. This section shows you how to add Vulcanize to `gulp` using  [gulp-vulcanize](https://github.com/sindresorhus/gulp-vulcanize).

*Using Grunt?* You can use the [grunt-vulcanize](https://github.com/Polymer/grunt-vulcanize) task. It supports a similar set of options [maybe link to README?]
{ .alert .alert-info }

To add Vulcanize to your build process:

Install `gulp-vulcanize`

    npm install --save-dev gulp gulp-vulcanize

Require the Vulcanize module in your `gulpfile` and add a task to run it.

```
var gulp = require('gulp');
var vulcanize = require('gulp-vulcanize');

gulp.task('vulcanize', function() {
  return gulp.src('app/elements/elements.html')
    .pipe(vulcanize())
    .pipe(gulp.dest('dist/elements'));
});

gulp.task('default', ['vulcanize']);
```

This sample assumes your project has a single `elements.html` file that imports your other web component dependencies.
{ .alert .alert-info }

You should now be able to run `gulp` and vulcanize your dependencies.

To configure the task with the same `stripComments`, `inlineScripts`, and `inlineCss` options from above, pass them to the Vulcanize task in a configuration object:

```
gulp.task('vulcanize', function() {
  return gulp.src('app/elements/elements.html')
    .pipe(vulcanize({
      stripComments: true,
      inlineScripts: true,
      inlineCss: true
    }))
    .pipe(gulp.dest('dist/elements'));
});
```

Depending on the structure of your app, it may make sense to break it into a few small vulcanized bundles, instead of inlining everything into one file. This technique can cut down on loading times as it enables you to only load the elements required for a specific section.

To prevent certain imports from being inlined in your bundle, use the `excludes` and `stripExcludes` options together, passing each an array of file paths or regexes.

```
gulp.task('vulcanize', function() {
  return gulp.src(app/elements/elements.html')
    .pipe(vulcanize({
      excludes: ['elements/x-foo.html'],
      stripExcludes: ['elements/x-foo.html']
    }))
    .pipe(gulp.dest('dist/elements'));
});
```

If you wish to leave the link tags for an element inside of a bundle, omit the `stripExcludes` option. This will only prevent the resource(s) from being _inlined_ in the bundle. This technique can be useful if you have several pages with different element sets (but all depending on `polymer.html`), where you may want to keep the `polymer.html` file separate, so the browser can cache it efficiently.

#### Example

Consider a Polymer app composed of four HTML files: index.html, elements/elements.html, elements/x-foo.html, and elements/x-bar.html.

app/index.html:

```
<!doctype html>
<html>
  <head>
    <script src="bower_components/webcomponentsjs/webcomponents-lite.js"></script>
    <link rel="import" href="elements/elements.html">
  </head>
  <body>
   ...
  </body>
</html>
```

app/elements/elements.html:

```
<link rel="import" href="x-foo.html">
<link rel="import" href="x-bar.html">
```

 app/elements/x-foo.html:

```
<link rel="import" href="../bower_components/polymer/polymer.html">
<dom-module id="x-foo">
  <template>
    <p>Hello from x-foo!</p>
  </template>
  <script>
    Polymer({
      is: 'x-foo'
    });
  </script>
</dom-module>
```

 app/elements/x-bar.html:

```
<link rel="import" href="../bower_components/polymer/polymer.html">
<dom-module id="x-bar">
  <template>
    <p>Hello from x-bar!</p>
  </template>
  <script>
    Polymer({
      is: 'x-bar'
    });
  </script>
</dom-module>
```

Without any concatenation in place, loading this application results in at least 5 network requests. Let's bring that number down. Running Vulcanize on `elements/elements.html`, and specifying `elements.vulcanized.html` as the output:

    vulcanize elements.html -o elements.vulcanized.html

This results in a `elements.vulcanized.html` that looks a little like this:

```
<!-- all the code for polymer.html -->
<dom-module id="x-foo" assetpath="/">
  <template>
    <p>Hello from x-foo!</p>
  </template>
  <script>
    Polymer({is: 'x-foo'});
  </script>
</dom-module>
<dom-module id="x-bar" assetpath="/">
  <template>
    <p>Hello from x-bar!</p>
  </template>
  <script>
    Polymer({is: 'x-bar'});
  </script>
</dom-module>
```

## Content Security Policy

[Content Security Policy](http://en.wikipedia.org/wiki/Content_Security_Policy) (CSP) is a JavaScript security model that aims to prevent XSS and other attacks. In so doing, it prohibits the use of inline scripts.

To use Polymer in a CSP environment (such as a Chrome App or Extension), you can use the Crisper project. Crisper removes all scripts from the HTML Imports and places their contents into an external JavaScript file.

<google-youtube
  video-id="VrajHIZZbE4"
  autoplay="0"
  rel="0"
  fluid>
</google-youtube>

Like Vulcanize, Crisper can be used either from the command line, or as a `gulp` plugin.

### Command Line

To install Crisper, run the following command:

    npm install -g crisper

Crisper can work directly with the piped output from Vulcanize, as shown below:

    vulcanize elements/elements.html --inline-script | crisper --html elements/elements.vulcanized.html --js elements/elements.vulcanized.js

It may seem a little strange to call `vulcanize` with `--inline-script` then pass it through `crisper` to separate out the JavaScript. However, if any of your elements use external scripts, this flag ensures that both inline and external scripts are extracted and concatenated into `elements.vulcanized.js`.
{ .alert .alert-info }

### Gulp

Similarly, you can pipe the output from the Vulcanize task directly to the Crisper task in `gulp`.

Run the following command:

    npm install -g gulp-crisper

Then add it to your `gulpfile`:

```
var gulp = require('gulp');
var vulcanize = require('gulp-vulcanize');
var crisper = require('gulp-crisper');

gulp.task('vulcanize', function() {
  return gulp.src('app/elements/elements.html')
    .pipe(vulcanize())
    .pipe(crisper())
    .pipe(gulp.dest('dist/elements'));
  });

gulp.task('default', ['vulcanize']);
```

## FAQ

### Is concatenation a good idea?

This depends on how large your application is. Excessive requests are often far worse than filesize. Hypothetically, let's say you have 20 HTML files/imports of 0.5MB each. Out of which only 2 (1MB) are required on the first page. You might want to vulcanize just those two requests into a critical bundle, then load the others in a separate, deferred bundle using Polymer’s importHref method.

For example:

```
Polymer.Base.importHref('/elements/less-important-stuff.html',
  // onsuccess callback
  function() {
    console.log('yay! our app is ready!');
  },
  // onerror callback
  function(err) {
    console.log('uh oh, something failed', err);
  },
  // use `async` on import
true);
```

Some of the things that you should think about before combining a large number of imports are when you combine 100 files together, you're eliminating 99 requests. But concatenation does have some drawbacks:

* The single file takes much longer to download, and potentially blocks loading of an important page.

* The browser needs to parse and render additional code that might not be required yet.

The short answer is "don't guess it, test it". There are always trade-offs when it comes to concatenation, but tools like [WebPageTest](http://webpagetest.org) can be useful for determining what your true bottlenecks are.

---
layout: default
type: guide
shortname: Articles
title: "Custom Element Interoperability"
subtitle: Using Polymer, X-Tag, and Vanilla Custom Elements

article:
  author: robdodson
  published: 2014-02-28
  #updated: 2013-12-06
  polymer_version: 0.2.0
  description: Get started using Polymer with Mozilla X-Tag and vanilla custom elements.
tags:
- custom elements
- html imports
- x-tag
- interoperability
- bower
---

{% include not-an-intro.html %}

A number of developers have asked if they can use [Polymer](http://www.polymer-project.org/) with [X-Tag](http://www.x-tags.org/)/[Brick](http://mozilla.github.io/brick/) or vanilla custom elements. We're happy to say that, yes, custom elements of any variety (be they Polymer, X-Tag or vanilla) can all happily coexist. In this guide we’ll cover what you need to do to get started working with custom elements in an interoperable fashion.

## Getting Setup

First, clone the example project on Github:

    git clone https://github.com/x-tag/interop-examples

The example project uses [Bower](http://bower.io) to manage its dependencies. Be sure to install Bower if you don’t already have it.

    npm install -g bower

Then, `cd` into the project directory, `polymer-xtag-vanilla` and run:

    bower install

Lastly, you’ll need to start a local server to view the `index.html` file.

<iframe src="demos/polymer-xtag-vanilla/example.html" width="380" height="320" frameborder="0"></iframe>

If your screen looks like the above then you’re all set.

## Understanding Elements

Under the hood, x-tags relies on the polyfills from Polymer's [`webcomponents.js`](../docs/start/platform.html). This can be a point of confusion for developers who assume that x-tags has its own set of polyfills that might break Polymer. In fact, the polyfill layer is shared between both projects, making them totally interoperable.

Since both projects adhere to the work-in-progress Web Components standards, it also makes them compatible with vanilla custom elements and any future projects which adhere to these same standards. **So long as everyone makes their elements according to spec, they can all coexist happily!**

## Digging Deeper

Let’s walk through the example project to better understand what’s actually going on. Open the `index.html` file.

    <!doctype html>
    <html>
    <head>
      <title>Polymer + X-Tag + vanilla Custom Elements</title>
      <!-- web components -->
      <script src="bower_components/webcomponentsjs/webcomponents.js"></script>
      <!-- import an element written without a library -->
      <link rel="import" href="elements/icon-button.html">
      <!-- import an element written using X-Tag -->
      <link rel="import" href="bower_components/x-tag-imports/x-tag-switch.html">
      <!-- import an element written using Polymer -->
      <link rel="import" href="bower_components/polymer-ui-ratings/polymer-ui-ratings.html">
    </head>
    <body>
      <h2>Vanilla Custom Element</h2>
      <icon-button></icon-button>

      <hr>

      <h2>X-Tag element</h2>
      <x-switch onText="Good" offText="Bad"></x-switch>

      <hr>

      <h2>Polymer Element</h2>
      <polymer-ui-ratings value="0"></polymer-ui-ratings>

      <script>
        document.addEventListener('polymer-ready', function(e) {
          var btn = document.querySelector('icon-button');
          var xswitch = document.querySelector('x-switch');
          var ratings = document.querySelector('polymer-ui-ratings');

          btn.addEventListener('click', function(e) {
            xswitch.toggle();
            ratings.value = ratings.value === 0 ? 5 : 0;
          });
        });
      </script>

    </body>
    </html>

We first load `webcomponents.js` which polyfills support for Web Components in all modern browsers.

    <!-- web components -->
    <script src="bower_components/webcomponentsjs/webcomponents.js"></script>

This means we can now register our own element using the native APIs.

### Importing a vanilla Custom Element

To get started working with vanilla custom elements, take a look at `elements/icon-button.html`.

    <template>
      <img style="vertical-align: middle;"
           src="http://lorempixel.com/32/32" alt="awesome icon">
      Click Me
    </template>
    <script>
    // See the Polymer docs for an explanation of _currentScript
    // http://www.polymer-project.org/platform/html-imports.html#other-notes
    var owner = document._currentScript.ownerDocument;
    var tmpl = owner.querySelector('template');

    var IconButtonProto = Object.create(HTMLElement.prototype);
    IconButtonProto.createdCallback = function() {
      this.appendChild(document.importNode(tmpl.content, true));
    };

    var IconButton = document.registerElement('icon-button', {
      prototype: IconButtonProto
    });
    </script>

The above snippet of code registers a new Custom Element called `icon-button`. It may not be the most exciting element, but it gets the job done.

To use `icon-button` in our project we need to load it into `index.html` with an HTML Import. We'll do this in the `head` of `index.html`.

    <!-- import an element written without a library-->
    <link rel="import" href="elements/icon-button.html">

Now that our `icon-button` is ready to use we add it to the `body` of our `index` file.

    <h2>Vanilla Custom Element</h2>
    <icon-button></icon-button>

That's it! We've just extended the browser with our very own tag.

### Importing an X-Tag element

We'll take a look at X-Tag next. Open up `bower_components/x-tag-imports/x-tag-switch.html`:

    <link rel="import" href="x-tag-core.html">
    <link rel="stylesheet" href="../x-tag-switch/src/switch.css">
    <script src="../x-tag-switch/src/switch.js"></script>

Elements coming from the [x-tag-imports project](https://github.com/x-tag/x-tag-imports) know to depend on x-tag-core and link to any additional dependencies (like CSS or JavaScript) from their original X-Tag element. On the outside, this means we don’t need to manage these linkages ourselves. We can just import the element in `index.html` and start working with it. Like the previous, vanilla Custom Element, we'll import `x-tag-switch` in the `head` of `index.html`.

    <!-- import an element written using X-Tag -->
    <link rel="import" href="bower_components/x-tag-imports/x-tag-switch.html">

Then we'll add it to the `body` of our `index` file:

    <h2>X-Tag Element</h2>
    <x-switch onText="Good" offText="Bad"></x-switch>

And we're good to go!

### Importing a Polymer UI Element

Lastly, let's look at how we import a Polymer UI element. Because Polymer UI elements already work with HTML Imports there's no need for a shim like x-tag-imports. Instead, we can just import the original element into the `head` of our `index` file.

    <!-- import an element written using Polymer -->
    <link rel="import" href="bower_components/polymer-ui-ratings/polymer-ui-ratings.html">

Once that's done, we're ready to use it in the `body` our page.

    <h2>Polymer Element</h2>
    <polymer-ui-ratings value="0"></polymer-ui-ratings>

Easy!

## Tying it all together

The final step is to get all of the elements working in harmony. Note the script at the bottom of `index.html` that has a listener for the `polymer-ready` event:

    <script>
      document.addEventListener('polymer-ready', function(e) {
        var btn = document.querySelector('icon-button');
        var xswitch = document.querySelector('x-switch');
        var ratings = document.querySelector('polymer-ui-ratings');

        btn.addEventListener('click', function(e) {
          xswitch.toggle();
          ratings.value = ratings.value === 0 ? 5 : 0;
        });
      });
    </script>

`polymer-ready` informs us when all of our HTML Imports have loaded. We’re then able to `querySelector` the different elements and store their references. The `click` handler on our button uses these references to toggle the switch and set the value of the ratings element. With that in place we’ve got a working application that links X-Tag, Polymer, and vanilla Custom Elements. Give it a spin!

<iframe src="demos/polymer-xtag-vanilla/example.html" width="380" height="320" frameborder="0"></iframe>

## Conclusion

X-Tag is awesome, Polymer is awesome, and Custom Elements are definitely awesome. Thankfully we don't have to pick favorites because they all work well together. I hope this post clears up any confusion you may have had but if you've still got questions be sure to reach out to either the Polymer team on [the polymer mailing list](https://groups.google.com/forum/#!forum/polymer-dev) or in the #polymer IRC channel on irc.freenode.net, or the X-Tag team on irc.mozilla.org in the #brick channel.





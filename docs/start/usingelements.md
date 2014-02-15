---
layout: default
type: start
navgroup: start
shortname: Start
title: Using elements
subtitle: Polymer from the outside
---

{% include toc.html %}

If HTML was reinvented tomorrow, it would provide more features and greater capability and than today's built-in elements. For example, imagine you're building a photobooth app to capture snapshots, display thumbnails, and cycle through recent photos. If HTML provided the `<camera>`, `<carousel>`, or `<tabs>` element, you wouldn't think twice about using them. You'd accept the functionality and start declaring markup!

Fortunately, [Custom Elements](/platform/custom-elements.html) pave a path to {{site.project_title}}'s, "[Everything is an element](/docs/start/everything.html)" mantra. Embracing the mantra means web apps become a large collection of well-defined, reusable components. Applications are created by assembling many custom elements together, either ones provided by {{site.project_title}}, [ones you create](/getting-started.html) yourself, or third-party elements.

## Custom elements are just elements

A critical realization is that **custom elements are no different than
standard HTML elements**. Take an HTML `<select>`. It can be declared:

    <select selected="0">
      <option>Hello World</option>
    </select>

or instantiated in JavaScript:

    var s = document.createElement('select');
    s.innerHTML = '<option>Hello World</option>';

One can attach event listeners, access properties, or call its methods:

    <script>
      s.addEventListener('change', function(e) {
        alert(this.selectedIndex == 0);
      });
    </script>

Guess what? **The same tricks apply to custom elements**. You can use standard DOM methods
on custom elements, access their properties, attach event listeners, or style them using CSS. The major difference with custom elements is that they give authors a tool for defining new tags
with compartmentalized functionality.

Our `<polymer-selector>` element is a good example of a basic custom element. It's a close relative to `<select>`, but provides additional functionality and more flexibility. For example, you can  use `<polymer-selector>` as a general container for selecting _any_ type of content, not just `<option>`! It also provides convenient styling hooks, events, and additional properties for interacting with its items.

    <polymer-selector selected="0">
      <div>Item 1</div>
      <div>Item 2</div>
    </polymer-selector>

    <script>
      var ps = document.querySelector('polymer-selector');
      ps.addEventListener('polymer-select', function(e) {
        alert(e.selectedIndex == 0);
      });
    </script>

## Types of elements {#elementtypes}

###  Visual Elements {#visualelements}

Visual elements are what most people think of when they hear web components. The render
UI and are visible on the page. A few examples are `<polymer-ui-collapsible>`, `<polymer-ui-tabs>`, and `<polymer-ui-toolbar>`.

Example of using `<polymer-ui-tabs>`:

    <polymer-ui-tabs selected="0">
      <span>One</span><span>Two</span><span>Three</span>
      <span>Four</span><span>Five</span>
    </polymer-ui-tabs>

<iframe src="/components/polymer-ui-tabs/smoke.html" style="border:none;height:80px;width:100%;"></iframe>

### Non-visual elements {#nonvisualelements}

It can be surprising to consider invisible elements, that is, elements that do not
render anything to the screen. However, there are plenty of examples already in HTML: `<script>`, `<style>`, and `<meta>` to name a few. These do useful work without rendering UI.

Non-visual custom elements provide utility without rendering anything. One example is `<polymer-ajax>`, which removes the complexity of `XMLHttpRequest` by doing useful work without.

Example using `<polymer-ajax>`:

    <polymer-ajax auto url="http://gdata.youtube.com/feeds/api/videos/" 
                  params='{"alt":"json", "q":"chrome"}'
                  handleAs="json"></polymer-ajax>

## Installing elements {#install}

The first step in using an element (or a set of elements) is to install it locally into your app using [Bower](http://bower.io). As your application grows in complexity, you'll be using more and more elements. Bower is an ideal tool for managing and versioning those dependencies.

### À la carte {#installsingle}

Elements can be installed individually as needed. For example, to download `<polymer-ajax>`, install it using the shorthand to the element's [Github project](https://github.com/polymer/polymer-ajax):

    bower install --save Polymer/polymer-ajax

Running this command adds a `bower_components/` folder and fills it with `<polymer-ajax>`:

    yourapp/
      bower_components/
        platform/
        polymer/
        polymer-ajax/

Using the `--save` flag  adds {{site.project_title}} as `<polymer-ajax>` to your app's `bower.json`:

    {
      "name": "your-app",
      "version": "0.0.0",
      "dependencies": {
        "polymer-ajax": "Polymer/polymer-ajax#~0.1.4"
      }
    }

**Note** If your project does not yet have a `bower.json`, create one by running `bower init`.
{: .alert .alert-info }

Don't worry about the other dependencies that were added. Bower installs them automatically, and HTML Imports will do the heavy lifting of loading them.

### Installing an element set {#installset}

{{site.project_title}} contains a set of [visual](#visualelements) and [non-visual](#visualelements) elements:

- [Polymer elements](/docs/elements/polymer-elements.html) - non-visual utility elements that perform common tasks like layout, AJAX, signaling, and storage and do not render UI.
- [Polymer UI elements](/docs/elements/polymer-elements.html) - visual elements that render UI. Oftentimes they reuse the non-visual elements.

Each set can be downloaded separately using Bower:

    bower install --save polymer-elements
    bower install --save polymer-ui-elements

### Using elements {#using}

The first step to using elements is to load `platform.js`. This is an unfortunate necessity,
as many browsers do not have support for the various web components APIs. Until that magical day,
`platform.js` provides polyfill support. **Be sure to include this file before any code that touches the DOM.**

Once you've loaded `platform.js` and got some elements installed, using them is simply a matter of loading the element file using an [HTML Import](/platform/html-imports.html).

An example `index.html` file:

    <!DOCTYPE html>
    <html>
      <head>
        <!-- 1. Load platform.js for polyfill support. -->
        <script src="bower_components/platform/platform.js"></script>

        <!-- 2. Use an HTML Import to bring in the element. -->
        <link rel="import"
              href="bower_components/polymer-ajax/polymer-ajax.html">
      </head>
      <body>
        <!-- 3. Declare the element. Configure using its attributes. -->
        <polymer-ajax url="http://example.com/json"
                      handleAs="json"></polymer-ajax>

        <script>
          // Wait for 'polymer-ready'. Insures the element is upgraded.
          window.addEventListener('polymer-ready', function(e) {
            var ajax = document.querySelector('#ajax');

            // Respond to events it fires.
            ajax.addEventListener('polymer-response', function(e) {
              console.log(this.response);
            });

            ajax.go(); // Call it's API methods.
          });
        </script>
      </body>
    </html>

**Note:** You must run your app from a web server for the [HTML Imports](/platform/html-imports.html)
polyfill to work properly. This requirement goes away when the API is available natively.
{: .alert .alert-info }

## Interoperability: on by default {#interop}

Because custom elements are fundamentally HTML elements, by nature, they work well with each other or any technology that understands DOM (every framework on the planet). That means custom elements already works with frameworks like Angular, Ember, jQuery, &lt;insert your framework here>.

The custom elements we've used so far come from {{site.project_title}}'s set and are built using [{{site.project_title}} core](/docs/polymer/polymer.html). But here's where things get interesting...

**That doesn't matter**.

Because custom elements are just like regular elements, it doesn't matter what kind of technology is used to implement their internals. Different kinds of elements from different vendors can all coexist in the same page! As an example, Mozilla offers a series of custom elements called [x-tags](http://x-tags.org/) (see also: [Brick](http://mozilla.github.io/brick/)). I can use x-tags with my other elements and I can mix and match them. As a general rule, it doesn't matter how an element was constructed.

## Next steps {#nextsteps}

Now that you've got the basic idea of using and installing elements, it's time to start
building something! In the next section we'll cover the features of {{site.project_title}} and how to create new `<polymer-element>`s.

Continue on to [Creating elements](/getting-started.html).

If you'd rather browser the existing elements, check out the [Polymer elements](/docs/elements/polymer-elements.html) and [Polymer UI elements](/docs/elements/polymer-elements.html).

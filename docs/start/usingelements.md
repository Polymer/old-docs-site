---
layout: default
type: start
navgroup: start
shortname: Start
title: Using elements
subtitle: Polymer from the outside
---

{% include toc.html %}


{{site.project_title}} provides a large collection of elements for you to pick from. And because the elements are just like built-in elements, you get a lot of great properties for free:

- **You don't have to care how they work**. Their guts are safely encapsulated, and you interact with them via a well-defined API of attributes, events, properties, methods, and how they handle child nodes. They could use some kind of space-age magic inside, but from the outside you don't know or care.
- **They play well with other frameworks**. Every framework ever created understands how DOM works, and these elements are just DOM. That means you can incrementally use them in your existing apps without having to worry about them blowing everything up.
- **Mix and match components from different authors**. An element is an element is an element. So long as you interact with them via their defined API, it doesn't matter what flavor of magic they're using inside. This means it's entirely reasonable for a element from collection A to have a dependency on an element from collection B. You don't have to decide which framework to use and then be stuck with that; you can pick and choose on an element-by-element basis.
- **Convenient to set up in your project**. Elements, no matter which framework they're from, should define their dependencies using [Bower](http://bower.io). That means that setting up an element for use in your project--no matter how complex its dependencies, or which frameworks it depends on--is just a matter of running `bower install the-element`, loading the [HTML Import](/platform/html-imports.html) in your page, and using it.

{{site.project_title}}'s set of elements includes the usual suspects like buttons and other UI components, but also includes non-visual elements like `<polymer-ajax>`. It may sound surprising, but when you embrace the world-view that "[everything is an element](/docs/start/everything.html)" you'll find yourself reaching for pre-built elements more often than script to accomplish common tasks. {{site.project_title}}'s collection of elements is already robust, but it will continue to grow. 

I
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

Although you can grab elements independently, sometimes you want to grab a whole collection. {{site.project_title}} contains a set of [visual](#visualelements) and [non-visual](#visualelements) elements:

- [Polymer elements](/docs/elements/polymer-elements.html) - non-visual utility elements that perform common tasks like layout, AJAX, signaling, and storage and do not render UI.
- [Polymer UI elements](/docs/elements/polymer-elements.html) - visual elements that render UI. Oftentimes they reuse the non-visual elements.

Each set can be downloaded separately using Bower:

    bower install --save polymer-elements
    bower install --save polymer-ui-elements

### Using elements {#using}

The first step to using elements is to load `platform.js`. Many browsers do not have support for the various web components APIs. Until that magical day, `platform.js` provides polyfill support. **Be sure to include this file before any code that touches the DOM.**

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

## Next steps {#nextsteps}

Now that you've got the basic idea of using and installing elements, it's time to start
building something! In the next section we'll cover the features of {{site.project_title}} and how to create new `<polymer-element>`s.

Next section:

<a href="/getting-started.html" class="paper-button"><polymer-ui-icon src="/images/picons/ic_arrowForward_dark_.png"></polymer-ui-icon>Creating elements</a>

If you'd rather browser the existing elements, check out the [Polymer elements](/docs/elements/polymer-elements.html) and [Polymer UI elements](/docs/elements/polymer-elements.html) catalogs.

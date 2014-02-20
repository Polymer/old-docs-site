---
layout: default
type: start
navgroup: start
shortname: Start
title: Using elements
subtitle: Polymer from the outside
---

{% include toc.html %}

## Introduction

{{site.project_title}} provides a large collection of elements for you to pick from. Of course, these elements have all of the features described in [Custom Elements 101](/docs/start/customelements.html). Using them is straightforward:

- **You don't have to care how they work**. Their internals are safely encapsulated. You interact with them using a well-defined API of attributes, events, properties, methods, and how they handle child nodes. They could use some kind of space-age magic inside, but from the outside you don't know or care.
- **They're easy to add to your project**. Elements, no matter which framework they're from, should define their dependencies using [Bower](http://bower.io). That means that setting up an element for use in your project--no matter how complex its dependencies, or which frameworks it depends on--is just a matter of running `bower install the-element`, importing the element to your page, and using it.

{{site.project_title}}'s set of elements includes the usual suspects like buttons and other UI components, but also includes non-UI elements like `<polymer-ajax>`. It may sound surprising, but when you embrace the world-view that "[everything is an element](/docs/start/everything.html)" you'll find yourself reaching for pre-built elements more often than script to accomplish common tasks. {{site.project_title}}'s collection of elements is already robust, and continues to grow. 

## Installing elements {#install}

The first step in using an element (or a set of elements) is to install it locally into your app using [Bower](http://bower.io). If you haven’t already done so, check out [Getting the Code](/docs/start/getting-the-code.html) to learn more about using Bower.

### Installing a single element {#installsingle}

Elements can be installed individually as needed. For example, to download `<polymer-ajax>` and install it in your current project, run:

    bower install --save Polymer/polymer-ajax

**Note:** `Polymer/polymer-ajax` is shorthand for the element’s github repo, [https://github.com/Polymer/polymer-ajax](https://github.com/Polymer/polymer-ajax). You can install other elements the same way.
{: .alert .alert-info }


Running this command adds a `bower_components/` folder and fills it with `<polymer-ajax>`:

    yourapp/
      bower_components/
        platform/
        polymer/
        polymer-ajax/

Using the `--save` flag  adds the element to your app's `bower.json` file:

    {
      "name": "your-app",
      "version": "0.0.0",
      "dependencies": {
        "polymer-ajax": "Polymer/polymer-ajax#~0.1.4"
      }
    }

**Note** If your project does not yet have a `bower.json` file, create one by running `bower init`.
{: .alert .alert-info }

Don't worry about the other dependencies that were added. Bower installs them automatically, and HTML Imports will do the heavy lifting and load them at runtime.

### Installing an element set {#installset}

Although you can grab elements independently, sometimes you want to grab a whole collection. {{site.project_title}} contains a set of [UI elements](/docs/start/customelements.html#uielements) and a set of [non-UI](/docs/start/customelements.html#nonuielements) elements:

- [Polymer elements](/docs/elements/polymer-elements.html). Non-UI utility elements that perform common tasks like layout, AJAX, signaling, and storage, but don’t render anything in the browser.
- [Polymer UI elements](/docs/elements/polymer-elements.html). UI  elements that render in the browser. 

Each set can be downloaded separately using Bower:

    bower install --save polymer-elements
    bower install --save polymer-ui-elements

## Using elements {#using}

To use elements, first load `platform.js`. Many browsers have yet to implement the various web components APIs. Until they do, `platform.js` provides polyfill support. **Be sure to include this file before any code that touches the DOM.**

Once you have some elements installed and you've loaded `platform.js`, using an element is simply a matter of loading the element file using an [HTML Import](/platform/html-imports.html).

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

###  Passing object and array values in attributes {#objectarray}

HTML attributes are string values, but sometimes you need to pass more complicated values into a custom element, such as objects or arrays. Ultimately, it's up to the element author to decide how to decode values passed in as attributes, but many {{site.project_title}} elements understand attribute values that are a JSON-serialized object or array. For example:

    <roster-list persons="[{'name': 'John'}, {'name': 'Bob'}]"></roster-list>

For {{site.project_title}} elements, you can find the expected type for each attribute listed in the [Elements reference](/docs/elements/) . If you pass the wrong type, it may be decoded incorrectly.

When creating your own {{site.project_title}} elements, you can choose to expose properties as attributes, as described in [Published properties](/docs/polymer/polymer.html#published-properties).

## Next steps {#nextsteps}

Now that you've got the basic idea of using and installing elements, it's time to start
building something! In the next section we'll cover the features of {{site.project_title}} and how to create new `<polymer-element>`s. Continue on to:

<a href="/docs/start/creatingelements.html" class="paper-button"><polymer-ui-icon src="/images/picons/ic_arrowForward_dark_.png"></polymer-ui-icon>Creating elements</a>

If you'd rather browse the existing elements, check out the [{{site.project_title}} elements](/docs/elements/polymer-elements.html) and [{{site.project_title}} UI elements](/docs/elements/polymer-elements.html) catalogs.

---
layout: default
type: start
navgroup: start
shortname: Start
title: Using elements
subtitle: Polymer from the outside
---

{% include toc.html %}

{{site.project_title}} provides a set of core-elements which are both [UI and non-UI components](/docs/start/customelements.html#elementtypes). You can reuse them in your projects simply by
including them in your project. If you don't want to write any code, keep reading!

## Installing elements {#install}

The first step to using an element is to install using [Bower](http://bower.io). If you're not familiar with Bower, check out [Getting the Code](/docs/start/getting-the-code.html) to learn more about using it.

### Installing a single element {#installsingle}

Elements can be installed individually as needed. For example, to download `<core-ajax>` and install it in your current project, run:

    bower install --save Polymer/core-ajax

**Note:** `Polymer/core-ajax` is shorthand for the element’s github repo, [https://github.com/Polymer/core-ajax](https://github.com/Polymer/core-ajax). You can install other elements the same way.
{: .alert .alert-info }


Running this command adds a `bower_components/` folder and fills it with `<core-ajax>`:

    yourapp/
      bower_components/
        platform/
        polymer/
        core-ajax/

Using the `--save` flag  adds the element to your app's `bower.json` file:

    {
      "name": "your-app",
      "version": "0.0.0",
      "dependencies": {
        "core-ajax": "Polymer/core-ajax#~{{site.latest_version}}"
      }
    }

**Note** If your project does not yet have a `bower.json` file, create one by running `bower init`.
{: .alert .alert-info }

Don't worry about the other dependencies that were added. Bower installs them automatically, and HTML Imports will do the heavy lifting and load them at runtime.

### Installing an element set {#installset}

Although you can grab elements independently, sometimes you want to grab a whole collection. {{site.project_title}} contains a set of [UI elements](/docs/start/customelements.html#uielements) and a set of [non-UI](/docs/start/customelements.html#nonuielements) elements:

- [Core elements](http://polymer.github.io/core-docs/). Non-UI utility elements that perform common tasks like layout, AJAX, signaling, and storage, but don’t render anything in the browser.
- [Polymer UI elements](/docs/elements/polymer-ui-elements.html). UI elements that render in the browser.

Each set can be downloaded separately using Bower:

    bower install --save Polymer/core-elements
    bower install --save Polymer/polymer-ui-elements

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
              href="bower_components/core-ajax/core-ajax.html">
      </head>
      <body>
        <!-- 3. Declare the element. Configure using its attributes. -->
        <core-ajax url="http://example.com/json"
                   handleAs="json"></core-ajax>

        <script>
          // Wait for 'polymer-ready'. Ensures the element is upgraded.
          window.addEventListener('polymer-ready', function(e) {
            var ajax = document.querySelector('core-ajax');

            // Respond to events it fires.
            ajax.addEventListener('core-response', function(e) {
              console.log(this.response);
            });

            ajax.go(); // Call its API methods.
          });
        </script>
      </body>
    </html>

**Note:** You must run your app from a web server for the [HTML Imports](/platform/html-imports.html)
polyfill to work properly. This requirement goes away when the API is available natively.
{: .alert .alert-info }

###  Passing object and array values in attributes {#objectarray}

HTML attributes are string values, but sometimes you need to pass more complicated values into a custom element, such as objects or arrays. Ultimately, it's up to the element author to decide how to decode values passed in as attributes, but many {{site.project_title}} elements understand attribute values that are a JSON-serialized object or array. For example:

    <roster-list persons='[{"name": "John"}, {"name": "Bob"}]'></roster-list>

For {{site.project_title}} elements, you can find the expected type for each attribute listed in the [Elements reference](/docs/elements/). If you pass the wrong type, it may be decoded incorrectly.

When creating your own {{site.project_title}} elements, you can choose to expose properties as attributes, as described in [Published properties](/docs/polymer/polymer.html#published-properties).

## Next steps {#nextsteps}

Now that you've got the basic idea of using and installing elements, it's time to start
building something! In the next section we'll cover the features of {{site.project_title}} and how to create new `<polymer-element>`s. Continue on to:

<a href="/docs/start/creatingelements.html" class="paper-button"><polymer-ui-icon src="/images/picons/ic_arrowForward_dark_.png"></polymer-ui-icon>Creating elements</a>

If you'd rather browse the existing elements, check out the [Core elements](http://polymer.github.io/core-docs/) and [{{site.project_title}} UI elements](/docs/elements/polymer-ui-elements.html) catalogs.

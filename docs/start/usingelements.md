---
layout: default
type: start
shortname: Start
title: Using elements
subtitle: Polymer from the outside
---

{% include toc.html %}

To use elements, first load `webcomponents.min.js`. Many browsers have yet to implement the various web components APIs. Until they do, `webcomponents.min.js` provides [polyfill support](/docs/start/platform.html). **Be sure to include this file before any code that touches the DOM.**

Once you have some elements installed and you've loaded `webcomponents.min.js`, using an element is simply a matter of loading the element file using an [HTML Import](/platform/html-imports.html).

An example `index.html` file:

    <!DOCTYPE html>
    <html>
      <head>
        <!-- 1. Load webcomponents.min.js for polyfill support. -->
        <script src="bower_components/webcomponentsjs/webcomponents.min.js"></script>

        <!-- 2. Use an HTML Import to bring in the element. -->
        <link rel="import"
              href="bower_components/core-ajax/core-ajax.html">
      </head>
      <body>
        <!-- 3. Declare the element. Configure using its attributes.
        Replace '//example.com/json' with valid json file -->
        <core-ajax url="//example.com/json"
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

[HTML attributes](https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes) are string values, but sometimes you need to pass more complicated values into a custom element, such as objects or arrays. Ultimately, it's up to the element author to decide how to decode values passed in as attributes, but many {{site.project_title}} elements understand attribute values that are a JSON-serialized object or array. For example:

    <roster-list persons='[{"name": "John"}, {"name": "Bob"}]'></roster-list>

For {{site.project_title}} elements, you can find the expected type for each attribute listed in the [Elements reference](/docs/elements/). If you pass the wrong type, it may be decoded incorrectly.

When creating your own {{site.project_title}} elements, you can choose to expose properties as attributes, as described in [Published properties](/docs/polymer/polymer.html#published-properties).

## Next steps {#nextsteps}

Now that you've got the basic idea of using and installing elements, it's time to start
building something! In the next section we'll cover the features of {{site.project_title}} and how to create new `<polymer-element>`s. Continue on to:

<a href="/docs/start/creatingelements.html">
  <paper-button raised><core-icon icon="arrow-forward" ></core-icon>Creating elements</paper-button>
</a>

If you'd rather browse the existing elements, check out the
<a href="/docs/elements/core-elements.html">{{site.project_title}} Core elements</a>
and <a href="/docs/elements/paper-elements.html">Paper elements</a> catalogs.

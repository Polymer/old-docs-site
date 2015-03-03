---
layout: default
type: elements
shortname: Elements
title: Using elements
subtitle: Element guides
---

{% include toc.html %}

The Core and Paper element sets provide elements that you can use
in your web pages and apps. These elements are built with the {{site.project_title}}
library.

You don't need to use {{site.project_title}} directly to use these elements.
However, using {{site.project_title}} you can take advantage of special
features such as data binding.

## Installing elements {#install}

You can install elements one at a time, or install a whole collection of elements.

{{site.project_title}} contains two primary collections of elements:

-   <a href="../elements/core-elements.html">{{site.project_title}} Core elements</a>. A set of utility
    elements including general-purpose UI elements (such as icons, layout elements, and toolbars),
    as well as  non-UI elements providing features like AJAX, signaling and storage.

-   [Paper elements](../elements/paper-elements.html). A set of UI elements that implement the
    [material design system](../elements/material.html).

Throughout the site, you'll find component download buttons like this:

  <component-download-button org="Polymer" component="core-elements" label="GET THE {{site.project_title}} CORE ELEMENTS">
  </component-download-button>

If you find an element you want while browsing the docs, simply click
the download button and choose your install method.

The component download button offers three ways to install a component or set of components:

*   Bower. **Recommended**. Bower manages dependencies, so installing a component
    also installs any missing dependencies. Bower also handles updating
    installed components. For more information, see [Installing with Bower](#using-bower).

*   ZIP file. Includes all dependencies, so you can unzip it and start using it
    immediately. The ZIP file requires no extra tools, but doesn't provide a
    built-in method for updating dependencies. For more information, see
    [Installing from ZIP files](#using-zip).

*   Github. When you clone a component from Github, you need to manage all of the dependencies
    yourself. If you'd like to hack on the project or submit a pull request, see
    [setting up {{site.project_title}} with git](../../resources/tooling-strategy.html#git).

Pick your method and follow the instructions in the download dialog.

If you install one or more elements using Bower or the ZIP file, you also get the
{{site.project_title}} library; as well as the [Web Components polyfills](platform.html),
which allow you to run {{site.project_title}} on browsers that don't yet support
the web components standards.

### Installing with Bower {#using-bower}

The recommended way to install **{{site.project_title}}** elements
is through Bower. To install Bower, see the [Bower web site](http://bower.io/).

Bower removes the hassle of dependency management when developing or consuming
elements. When you install a component, Bower makes sure any dependencies are
installed as well.

#### Project setup

If you haven't created a `bower.json` file for your application, run this
command from the root of your project:

    bower init

This generates a basic `bower.json` file. Some of the questions, like
"What kind of modules do you expose," can be ignored by pressing Enter.

The next step is to install one or more {{site.project_title}} packages:

    bower install --save Polymer/core-icons

Bower adds a `bower_components/` folder in the root of your project and
fills it with the element and its dependencies.

**Tip:** `--save` adds the item as a dependency in *your* app's bower.json:
```
{
  "name": "my-project",
  "version": "0.0.0",
  "dependencies": {
    "polymer": "Polymer/core-icons#~{{site.latest_version}}"
  }
}
```
{: .alert .alert-success }

#### Selecting packages

Using the component download button, click the **Bower** tab
and cut and paste the Bower install command.

You can also choose one of the commonly-used packages:

-   `Polymer/polymer`. Just the {{site.project_title}} library
    and web components polyfills.

-   `Polymer/core-elements`. The
    [{{site.project_title}} Core elements](../elements/core-elements.html)
    collection.

-   `Polymer/paper-elements`. The
    [Paper elements](../lements/paper-elements.html) collection.

For example, if you'd like to install {{site.project_title}}’s collections
of pre-built elements, run the following commands from the terminal:

    bower install --save Polymer/core-elements
    bower install --save Polymer/paper-elements

#### Updating packages {#updatebower}

When a new version of {{site.project_title}} is available, run `bower update`
in your app directory to update your copy:

    bower update

This updates all packages in `bower_components/`.

### Installing from ZIP files {#using-zip}

When you download a component or component set as a ZIP file, you get all of
the dependencies bundled into a single archive. It's a great way to get
started because you don't need to install any additional tools.

Expand the ZIP file in your project directory to create a `bower_components` folder.

![](/images/zip-file-contents.png)

If you download multiple component sets as ZIP files, you'll usually end up with
multiple copies of some dependencies. You'll need to merge the contents of the
ZIP files.

Unlike Bower, the ZIP file doesn't provide a built-in method
for updating dependencies. You can manually update components with a new ZIP
file.

### Using git {#git}

Because there are a number of dependencies we suggest you install
{{site.project_title}} with Bower instead of git. If you'd like to hack on
the project or submit a pull request check out our guide on
[setting up {{site.project_title}} with git](../../resources/tooling-strategy.html#git).

## Using elements {#using}

To use elements, first load `webcomponents.js`. Many browsers have yet to
implement the various web components APIs. Until they do, `webcomponents.js`
provides [polyfill support](platform.html). **Be sure to include
this file before any code that touches the DOM.**

Once you have some elements installed and you've loaded `webcomponents.js`,
using an element is simply a matter of loading the element file using an
[HTML Import](../../platform/html-imports.html).

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

**Note:** You must run your app from a web server for the [HTML Imports](../../platform/html-imports.html)
polyfill to work properly. This requirement goes away when the API is available natively.
{: .alert .alert-info }

###  Passing object and array values in attributes {#objectarray}

[HTML attributes](https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes) are string values, but sometimes you need to pass more complicated values into a custom element, such as objects or arrays. Ultimately, it's up to the element author to decide how to decode values passed in as attributes, but many {{site.project_title}} elements understand attribute values that are a JSON-serialized object or array. For example:

    <roster-list persons='[{"name": "John"}, {"name": "Bob"}]'></roster-list>

For {{site.project_title}} elements, you can find the expected type for each attribute listed in the [Elements reference](../elements/). If you pass the wrong type, it may be decoded incorrectly.

When creating your own {{site.project_title}} elements, you can choose to expose properties as attributes, as described in [Published properties](../polymer/polymer.html#published-properties).

## Next steps {#nextsteps}

Now that you've got the basic idea of using and installing elements, it's time to start
building something!

In the next section we'll cover using the Core layout elements
to structure an application's layout.  Continue on to:

<a href="../elements/layout-elements.html">
  <paper-button raised><core-icon icon="arrow-forward" ></core-icon>Layout elements</paper-button>
</a>

To learn about building your own elements using the {{site.project_title}} library, see
[{{site.project_title}} in 10 minutes](creatingelements.html).

If you'd rather browse the existing elements, check out the
<a href="../elements/core-elements.html">{{site.project_title}} Core elements</a>
and <a href="../elements/paper-elements.html">Paper elements</a> catalogs.


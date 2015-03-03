---
layout: default
type: start
shortname: Start
title: Getting the code
---

<style>
#download-button {
  background: #4285f4;
  color: #fff;
  font-size: 18px;
  fill: #fff;
}
#download-button:hover {
  background: #2a56c6;
}
#download-button::shadow paper-ripple {
  color: #fff;
}
</style>

{% include toc.html %}

## Installing {{site.project_title}} {#installing-polymer}

If you're ready to start your own project, you can install {{site.project_title}}
in one of several ways:

*   Bower. **Recommended**. Bower manages dependencies, so installing a component
    also installs any missing dependencies. Bower also handles updating
    installed components. For more information, see [Installing with Bower](#using-bower).

*   ZIP file. Includes all dependencies, so you can unzip it and start using it
    immediately. The ZIP file requires no extra tools, but doesn't provide a
    built-in method for updating dependencies. For more information, see
    [Installing from ZIP files](#using-zip).

*   GitHub. When you clone a component from GitHub, you need to manage all of the dependencies
    yourself. If you'd like to hack on the project or submit a pull request, see
    [setting up {{site.project_title}} with git](../../resources/tooling-strategy.html#git).

When you install {{site.project_title}} using Bower or the ZIP file, you get the
[Web Components polyfill library](platform.html). Using the polyfills
ensures that you can use {{site.project_title}} with browsers that don't support
the Web Components specifications natively.

**Note:** For information about installing elements from the Core and Paper element
collection, see [Using elements](usingelements.html).

**Note:** The PolymerLabs GitHub repo contains a number of unsupported elements that are either
experimental or deprecated. In particular, the `polymer-elements` and `polymer-ui-elements`
collections represent earlier work superseded by the {{site.project_title}} Core elements and
Paper elements.

## Installing with Bower {#using-bower}

The recommended way to install **{{site.project_title}} {{site.latest_version}}**
is through Bower. To install Bower, see the [Bower web site](http://bower.io/).

Bower removes the hassle of dependency management when developing or consuming
elements. When you install a component, Bower makes sure any dependencies are
installed as well.

### Project setup

If you haven't created a `bower.json` file for your application, run this
command from the root of your project:

    bower init

This generates a basic `bower.json` file. Some of the questions, like
"What kind of modules do you expose," can be ignored by pressing Enter.

The next step is to install {{site.project_title}}:

    bower install --save Polymer/polymer

Bower adds a `bower_components/` folder in the root of your project and
fills it with {{site.project_title}} and its dependencies.

**Tip:** `--save` adds the item as a dependency in *your* app's bower.json:
```
{
  "name": "my-project",
  "version": "0.0.0",
  "dependencies": {
    "polymer": "Polymer/polymer#~{{site.latest_version}}"
  }
}
```
{: .alert .alert-success }

#### Updating packages {#updatebower}

When a new version of {{site.project_title}} is available, run `bower update`
in your app directory to update your copy:

    bower update

This updates all packages in `bower_components/`.

## Installing from ZIP files {#using-zip}

To download {{site.project_title}} as a ZIP file, click the **GET POLYMER** button
then click **Download ZIP**.

<component-download-button org="Polymer" component="polymer" label="GET POLYMER">
</component-download-button>

When you download {{site.project_title}} as a ZIP file, you get all of
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

## Using git {#git}

Because there are a number of dependencies we suggest you install
{{site.project_title}} with Bower instead of git. If you'd like to hack on
the project or submit a pull request check out our guide on
[setting up {{site.project_title}} with git](../../resources/tooling-strategy.html#git).

## Next steps {#nextsteps}

Now that you've installed {{site.project_title}} it's time to learn the core
concepts. In the next section we'll get you up and running on creating elements
using {{site.project_title}}. Continue on to:

<a href="creatingelements.html">
  <paper-button raised><core-icon icon="arrow-forward"></core-icon>Polymer in 10 minutes</paper-button>
</a>

If you'd rather skip ahead, check out the
[tutorial](tutorial/intro.html), or skip to the
[API developer guide](../polymer/polymer.html).

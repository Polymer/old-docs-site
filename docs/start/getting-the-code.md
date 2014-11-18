---
layout: default
type: start
shortname: Start
navgroup: start
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

{{site.project_title}} is very modular; you can install just the {{site.project_title}}
library and web components polyfills, a single element, or a whole collection of elements.

To download just Polymer:

<component-download-button org="Polymer" component="polymer" label="Get the Polymer library">
</component-download-button>

## Installing elements {#installing-components}

{{site.project_title}} provides several sets of elements, which you can reuse simply by
including them in your project. You can install elements one at a time, or install a whole collection of elements.

{{site.project_title}} contains two primary collections of elements:

-   <a href="/docs/elements/core-elements.html">{{site.project_title}} Core elements</a>. A set of utility
    elements including general-purpose UI elements (such as icons, layout elements, and toolbars),
    as well as  non-UI elements providing features like AJAX, signaling and storage.

-   [Paper elements](/docs/elements/paper-elements.html). A set of UI elements that implement the
    [material design system](/docs/elements/material.html).

If you find an element you want while browsing the docs, simply click
the download button and choose your install method.

Throughout the site, you'll find component download buttons like this:

<component-download-button org="Polymer" component="core-elements" label="GET THE {{site.project_title}} CORE ELEMENTS">
</component-download-button>

<component-download-button org="Polymer" component="paper-elements" label="GET THE PAPER ELEMENTS">
</component-download-button>

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
    [setting up {{site.project_title}} with git](/resources/tooling-strategy.html#git).

Pick your method and follow the instructions in the download dialog.

**Note:** The PolymerLabs github repo contains a number of unsupported elements that are either
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

The next step is to install one or more {{site.project_title}} packages:

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

### Selecting packages

Using the component download button, click the **Bower** tab
and cut and paste the Bower install command.

You can also choose one of the commonly-used packages:

-   `Polymer/polymer`. Just the {{site.project_title}} library
    and web components polyfills.

-   `Polymer/core-elements`. The
    [{{site.project_title}} Core elements](/docs/elements/core-elements.html)
    collection.

-   `Polymer/paper-elements`. The
    [Paper elements](/docs/elements/paper-elements.html) collection.

For example, if you'd like to install {{site.project_title}}’s collections
of pre-built elements, run the following commands from the terminal:

    bower install --save Polymer/core-elements
    bower install --save Polymer/paper-elements


### Updating packages {#updatebower}

When a new version of {{site.project_title}} is available, run `bower update`
in your app directory to update your copy:

    bower update

This updates all packages in `bower_components/`.

## Installing from ZIP files {#using-zip}

When you download a component or component set as a ZIP file, you get all of
the dependencies bundled into a single archive. It's a great way to get
started because you don't need to install any additional tools.

Expand the ZIP file in your project directory to create a `components` folder.

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
[setting up {{site.project_title}} with git](/resources/tooling-strategy.html#git).

## Next steps {#nextsteps}

Now that you've installed {{site.project_title}} it's time to learn the core
concepts. In the next section we'll get you up and running on using elements
in a project. Continue on to:

<a href="/docs/start/usingelements.html">
  <paper-button raised><core-icon icon="arrow-forward" ></core-icon>Using elements</paper-button>
</a>

If you'd rather skip ahead, check out our guide on
[Creating Elements](/docs/start/creatingelements.html).

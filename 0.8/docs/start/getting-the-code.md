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

<!--
*   ZIP file. Includes all dependencies, so you can unzip it and start using it
    immediately. The ZIP file requires no extra tools, but doesn't provide a
    built-in method for updating dependencies. For more information, see
    [Installing from ZIP files](#using-zip).
-->

*   GitHub. When you clone a component from GitHub, you need to manage all of the dependencies
    yourself.

When you install {{site.project_title}} using Bower, you get the
[Web Components polyfill library](/0.5/docs/start/platform.html). 
For {{site.project_title}} 0.8, you need the `webcomponents-lite` version of the 
library, which doesn't include the shadow DOM polyfill.

Using the polyfills ensures that you can use {{site.project_title}} with browsers that don't support
the Web Components specifications natively.


## Installing with Bower {#using-bower}

The recommended way to install **{{site.project_title}} 0.8**
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
    "polymer": "Polymer/polymer#~0.8.0"
  }
}
```
{: .alert .alert-success }

#### Updating packages {#updatebower}

When a new version of {{site.project_title}} is available, run `bower update`
in your app directory to update your copy:

    bower update

This updates all packages in `bower_components/`.

<!-- 
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

-->

## Using git {#git}

Because there are a number of dependencies we suggest you install
{{site.project_title}} with Bower instead of git. If you'd like to hack on
the project or submit a pull request, you can [visit the GitHub repo](https://github.com/Polymer/polymer).

## Next steps {#nextsteps}

Now that you've installed {{site.project_title}} it's time to learn the core
concepts.  Continue on to:

<p><a href="devguide/feature-overview.html">
  <paper-button raised><core-icon icon="arrow-forward"></core-icon>Feature overview</paper-button>
</a></p>

If you're coming from {{site.project_title}} 0.5, check out the [Migration Guide](../migration.html).

---
layout: default
type: start
shortname: Start
title: Get the Polymer library
subtitle: Get started
---

<style>
 paper-button[raised].cta {
      background-color: #0f9d58;
      color: white;
      fill: white;
      margin: 10px;
}

.download-button {
  background: #4285f4;
  color: #fff;
  font-size: 18px;
  fill: #fff;
}

.download-button:hover {
  background: #2a56c6;
}

.download-button::shadow paper-ripple {
  color: #fff;
}
</style>

{% include toc.html %}

## Installing with Bower {#using-bower}

The recommended way to install **{{site.project_title}} {% polymer_version_dir %}**
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

    bower install --save Polymer/polymer#^1.0.0

Bower adds a `bower_components/` folder in the root of your project and
fills it with {{site.project_title}} and its dependencies.

**Tip:** `--save` adds the item as a dependency in *your* app's bower.json:
```
{
  "name": "my-project",
  "version": "0.0.0",
  "dependencies": {
    "polymer": "Polymer/polymer#^1.0.0"
  }
}
```
{: .alert .alert-success }

#### Updating packages {#updatebower}

When a new version of {{site.project_title}} is available, run `bower update`
in your app directory to update your copy:

    bower update

This updates all packages in `bower_components/` to the latest stable version.

## Installing from ZIP files {#using-zip}

Click the button to download {{site.project_title}} {% polymer_version_dir %} as a ZIP file.

<p><a href="http://zipper.bowerarchiver.appspot.com/archive?polymer=Polymer/polymer%231.0.0">
  <paper-button class="cta" raised><core-icon icon="file-download"></core-icon>Download ZIP</paper-button>
</a></p>

When you download {{site.project_title}} as a ZIP file, you get all of
the dependencies bundled into a single archive. It's a great way to get
started because you don't need to install any additional tools. **However, if you need to install additional elements, like the Material Design element set, you'll have to download them as ZIPs as well, or switch to Bower. For this reason we [recommend starting with Bower if possible](#using-bower).**

Expand the ZIP file in your project directory to create a `bower_components` folder.

![](/{% polymer_version_dir %}/images/zip-file-contents.png)

Unlike Bower, the ZIP file doesn't provide a built-in method
for updating dependencies. You can manually update components with a new ZIP
file. 

**Note:**  If you decide to install Bower later, you can use Bower to update the 
components you installed from the ZIP file. Follow the instructions in 
[Updating packages](#updatebower).
{: .alert .alert-info }

## Using the Polyfills

When you install {{site.project_title}} (either with Bower or as a ZIP), you get the
[Web Components polyfill library](/0.5/docs/start/platform.html). 
For this version of {{site.project_title}}, you need the `webcomponents-lite` version of the 
library, which doesn't include the shadow DOM polyfill.

Using the polyfills ensures that you can use {{site.project_title}} with browsers that don't support
the Web Components specifications natively.

## Element starter {#seed-element}

If you want to publish an element for others to use, [the 
`<seed-element>` boilerplate](https://github.com/polymerelements/seed-element) is a good starting point. It comes with the tools
you need for building, testing and documenting your element.

[Create a reusable element](reusableelements.html) guides you through the 
steps to create, test, document and publish your element.

## Polymer Starter Kit {#psk}

A “batteries-included” application template, the 
[Polymer Starter Kit](https://developers.google.com/web/tools/polymer-starter-kit/)
includes a responsive application layout, tooling for testing and deployment, and
even optional support for advanced features like offline access and push notifications. 

## Contributing to the Project {#using-git}

If you'd like to hack on
the project or submit a pull request, you can [visit the GitHub repo](https://github.com/Polymer/polymer). Because there are a number of dependencies, if you're just trying to use Polymer in a project we suggest you [install
{{site.project_title}} with Bower](#using-bower) instead of git.

## Next steps {#nextsteps}

Now that you've installed {{site.project_title}} it's time to learn the core
concepts.  Continue on to:

<p><a href="quick-tour.html">
  <paper-button raised><core-icon icon="arrow-forward"></core-icon>Quick tour of {{site.project_title}}</paper-button>
</a></p>


<p><a href="../devguide/feature-overview.html">
  <paper-button raised><core-icon icon="arrow-forward"></core-icon>Developer guide</paper-button>
</a></p>

If you're coming from {{site.project_title}} 0.5, check out the [Migration guide](../migration.html).

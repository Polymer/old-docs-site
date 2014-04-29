---
layout: default
type: start
shortname: Start
navgroup: start
title: Getting the code
---

{% include toc.html %}

## Setup & installation {#install}

### Using Bower {#installing-polymer}

The recommended way to install **{{site.project_title}} {{site.latest_version}}** is through [Bower](http://bower.io/). We've chosen Bower because it removes the hassle of dependency management when developing or consuming elements.

#### Getting the packages

If you haven't created a `bower.json` file for your application, run this command from the root of your project:

    bower init

This generates a basic `bower.json` file. Some of the questions, like "What kind of modules do you expose," can be ignored by pressing Enter.

The next step is to install {{site.project_title}}.

    bower install --save Polymer/polymer

Bower adds a `bower_components/` folder in the root of your project and fills it with {{site.project_title}} and its dependencies.

**Tip:** `--save` adds the item as dependencies in *your* app's bower.json:
```
{
  "name": "my-project",
  "version": "0.0.0",
  "dependencies": {
    "polymer": "Polymer/polymer#~{{site.latest_version}}",
  }
}
```
{: .alert .alert-success }

#### Getting our elements

If you'd like to install {{site.project_title}}’s collection of pre-built elements, run this command from the terminal:

    bower install --save Polymer/core-elements

Other element sets, like [polymer-elements](/docs/elements/polymer-elements.html) and [polymer-ui-elements](/docs/elements/polymer-ui-elements.html) in [PolymerLabs](https://github.com/PolymerLabs), can be installed by running:

    bower install --save Polymer/polymer-elements Polymer/polymer-ui-elements

#### Updating packages {#updatebower}

When a new version of {{site.project_title}} is available, run `bower update`
in your app directory to update your copy:

    bower update

This updates all packages in `bower_components/`.

### Using git {#git}

Because there are a number of dependencies we suggest you install {{site.project_title}} with Bower instead of git. If you'd like to hack on the project or submit a pull request check out our guide on [setting up {{site.project_title}} with git](/resources/tooling-strategy.html#git).

## Next steps {#nextsteps}

Now that you've installed {{site.project_title}} it's time to learn the core concepts. In the next section we'll get you up and running on using elements in a project. Continue on to:

<a href="/docs/start/usingelements.html" class="paper-button"><polymer-ui-icon src="/images/picons/ic_arrowForward_dark_.png"></polymer-ui-icon>Using elements</a>

If you'd rather skip ahead, check out our guide on [Creating Elements](/docs/start/creatingelements.html).

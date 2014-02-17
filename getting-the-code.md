---
layout: default
type: start
shortname: Start
navgroup: start
title: Getting the code
---

<!--
<embed src="/images/picons/ic_polymer_source.svg" type="image/svg+xml" onload="test(this)">
<script>
  function test(embed) {
    //var svg = el.getSVGDocument().querySelector('svg');
    var svg = embed.getSVGDocument().querySelector('svg');
    //svg.classList.add('wow')
    svg.style.fill = 'rgb(214, 26, 127)';
  }
</script>
-->


{% include toc.html %}

## Setup & installation {#intall}

### Using Bower {#installing-polymer}

The recommended way to get the pieces of **{{site.project_title}} {{site.latest_version}}** is through [Bower](http://bower.io/). We've chosen Bower because it removes the hassle of dependency management when developing
or consuming elements.

#### Getting the packages

Everything is à la carte in {{site.project_title}}, so get the parts you're interested in.
After running one of these commands, Bower creates a `bower_components/` directory and populates it with the packages (and their dependencies) as siblings folders.

**Tip:** `--save` adds the item as dependencies in *your* app's bower.json.
{: .alert .alert-success }

- Install and use the {{site.project_title}} <i class="icon-puzzle-piece elements"></i> <b class="elements">elements</b>:

        bower install --save Polymer/polymer-elements
        bower install --save Polymer/polymer-ui-elements

    **Note:** installing a set of elements also installs the `Polymer/platform` and `Polymer/polymer` dependencies. You do not need to run the other install commands.

- To build {{site.project_title}} elements, install the <i class="icon-beaker core"></i> <b class="core">core</b> sugaring:

        bower install --save Polymer/polymer

    **Note:** this also gets you `Polymer/platform`.

- Only interested in the <i class="icon-cogs foundation"></i> <b class="foundation">polyfill</b> libraries? Install them standalone:

        bower install --save Polymer/platform

#### Test your environment {#testbower}

In the folder where you ran `bower install`, create an `index.html` that loads `platform.js`
and imports the `<polymer-ui-tabs>` element:

    <!DOCTYPE html>
    <html>
      <head>
        <script src="bower_components/platform/platform.js"></script>
        <link rel="import"
              href="bower_components/polymer-ui-tabs/polymer-ui-tabs.html">
      </head>
      <body>
        <polymer-ui-tabs selected="0">
          <span>One</span><span>Two</span><span>Three</span>
          <span>Four</span><span>Five</span>
        </polymer-ui-tabs>
      </body>
    </html>

Fire up a web server, navigate to `index.html`, and feast on your accomplishments.
You should see a tabs component like the one below.

<iframe src="/components/polymer-ui-tabs/smoke.html" style="border:none;height:80px;width:100%;"></iframe>

#### Updating packages {#updatebower}

When a new version of {{site.project_title}} is available, run `bower update`
in your app directory to update your copy:

    bower update

This updates all packages in `bower_components/`.

### Using a CDN {#cdn}

{{site.project_title}} is maintained on [cdnjs](http://cdnjs.com/) and can be
loaded from the following URLs:

    <script src="//cdnjs.cloudflare.com/ajax/libs/polymer/{{site.latest_version}}/platform.js"></script>
    <script src="//cdnjs.cloudflare.com/ajax/libs/polymer/{{site.latest_version}}/polymer.js"></script>

### Using git {#git}

As an alternative to Bower, you can clone {{site.project_title}}'s important repositories
by running our `pull-all.sh` script:

    mkdir polymer_local; cd polymer_local
    git clone https://github.com/Polymer/tools.git
    ./tools/bin/pull-all.sh

<!-- <p class="centered"><a href="/tools/pull-all.sh" target="_blank" class="btn btn-success" alt="Download pull-all.sh" title="Download pull-all.sh"><i class="icon-white icon-download"></i> Download pull-all.sh</a></p>
 -->

Go grab a coffee. This takes a few minutes!

`pull-all.sh` is great for hacking on the code or if you want the individual polyfill repositories.
Running this script sets things up differently than Bower. It creates two directories, `components/` and `projects/`, and checks out a number of sibling repositories to each folder.

**components/**

- *components/platform/platform.js* — The platform shims and polyfills.
- *components/polymer/polymer.js* — [{{site.project_title}} core](polymer.html)
- *components/polymer-elements/* — A folder of the meta collection of the core utility elements.
- *components/polymer-ui-elements/* — A folder of the meta collection of the UI elements.
- A directory for each polyfill repo (CustomElements, HTMLImports, ShadowDOM).

**projects/**

Full and sample applications.

#### Test your environment {#testgit}

To check that your development environment is ready, try trying the playground tool:

    cd projects/designer
    bower install

Start a web server and navigate to the designer app.

#### Updating checkouts {#updategit}

To update your local copies, re-run `pull-all.sh`:

    ./tools/bin/pull-all.sh

## About the repositories {#abouttherepos}

**Note:** This section should be used for reference purposes only. We recommend
[using Bower](#bower) to install and work with {{site.project_title}}.
{: .alert }

The entirety of the {{site.project_title}} is composed of a many Git
repositories. All of the polyfill libraries, projects, and individual elements
each have their own repository.

### Specification repositories (da polyfills)

Each new web platform specification has a corresponding polyfill repository. The
reasoning for this is two-fold:

1. make the polyfills work across all modern browsers
2. each polyfill can stand on its own and be used à la carte in projects.

For example, the following repositories may be useful if you're interested in the individual API:

* `CustomElements`
* `HTMLImports`
* `PointerEvents`
* `PointerGestures`
* `ShadowDOM`
* `web-animations-js`

### Other useful repositories

#### /polymer

[github.com/polymer/polymer](https://github.com/polymer/polymer)

A meta repository used to distribute `polymer.js` builds.

#### /polymer-dev

[github.com/polymer/polymer-dev](https://github.com/polymer/polymer-dev)

The [`polymer-dev`](https://github.com/polymer/polymer-dev) repository contains the
[{{site.project_title}} core](polymer.html) and its tools and tests and is used
by the project's developers. You should not have to touch this repository unless
you're planning to hack on {{site.project_title}}.

#### /platform

[github.com/polymer/platform](https://github.com/polymer/platform)

A meta repository used to distribute `platform.js` builds.

#### /platform-dev

[github.com/polymer/platform-dev](https://github.com/polymer/platform-dev)

The [`platform-dev`](https://github.com/polymer/platform-dev) contains integration tests, loader, and build tools for the amalgamated polyfills. It's used by the project's developers. You should not have to touch this repository unless you're planning to hack on {{site.project_title}}.

#### /polymer-elements

[github.com/polymer/polymer-elements](https://github.com/polymer/polymer-elements)

A meta repository compiling the list of utility elements that do not render UI.

#### /polymer-ui-elements

[github.com/polymer/polymer-ui-elements](https://github.com/polymer/polymer-ui-elements)

A meta repository compiling the list of basic UI elements.

#### /more-elements

[github.com/polymer/more-elements](https://github.com/polymer/more-elements)

A meta repository compiling the list of extra components and wrappers for third-party code. 
Examples include Bootstrap, topcoat, Chart.js, pdf.js, x-tags, and AceEditor.

<!--
#### /toolkit-ui

[github.com/polymer/toolkit-ui](https://github.com/polymer/toolkit-ui)

The [`toolkit-ui`](https://github.com/polymer/toolkit-ui) repository contains examples of
the types of things you can do when writing a [{{site.project_title}} element](/docs/polymer/polymer.html).

- **elements/** — `g-*` custom element definitions.
- **workbench/** — demos of the {{site.project_title}}-style elements found in `elements/`.


### /projects

[github.com/polymer/projects](https://github.com/polymer/projects)

The [`projects`](https://github.com/polymer/projects) repository contains
substantial larger apps/demos that we're tinkering with This includes apps like
pica and tools like Sandbox.
-->


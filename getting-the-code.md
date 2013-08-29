---
layout: default
title: Getting the Code

load_polymer: true
---

## First step: bring on the code!

You can grab {{site.project_title}} a few different ways:

### Option 1. download the code {#download}

{% include downloadbutton.html %}

The latest version of {{site.project_title}} can be downloaded as .zip bundle
or installed via [Bower](http://bower.io/).

#### Zip file

The .zip contains everything you need, including the repositories, demos, and
samples described in this document. It contains the built files for `polymer.min.js`
and `platform.min.js`.

#### Via Bower

The Bower component just includes the build files. This does not allow you to test right away like proposed in the second step hereunder.

### Option 2. checkout instructions {#git}

If you want to checkout code or contribute to the project, you can recursively
clone and initialize all of {{site.project_title}}'s submodules with a single git command.

**To get the code, run:**

    git clone git://github.com/Polymer/polymer-all.git --recursive

If you want the bleeding edge development version, you'll want the *master* branch:

    git clone -b master git://github.com/Polymer/polymer-all.git --recursive

**Remember**: If you don't specify _master_, you'll get the _stable_ branch by default.
See [branching workflow](branching-strategy.html) for more info.
{: .alert }

This creates a `polymer-all/` folder with the following top-level files and folders:

- **platform/** — The platform shims and polyfills.
- **polymer/polymer.js** — The [{{site.project_title}} kernel](polymer.html)
- **polymer-elements/** — A collection of core utility elements.
- **polymer-ui-elements/** — A collection of UI elements.
- **projects/** — Larger examples, demos, and tools that use {{site.project_title}}.
- **toolkit-ui/** — older widget examples.
- **more-elements/** — additional elements
- Each platform polyfill also has a sibling repo.

A [description of each repository](#abouttherepos) is below.

#### Updating submodules

Periodically, we will update the project's submodules on GitHub. To
update your local copy's submodules, run the following command
from the `polymer-all/` folder:

    git submodule update --init --recursive

## Second step: test your environment

To check that your development environment is ready, start a local web
server and run one of the included sample projects:

1. **Start a local web server** in the folder where you have `polymer-all/`. This folder does not exist if you installed via Bower.
2. In your browser, navigate to
    [http://localhost/toolkit-ui/workbench/menu.html](http://localhost/toolkit-ui/workbench/menu.html), or whichever port you started the server on. You should see a menu of items, as shown below.

<iframe src="/polymer-all/toolkit-ui/workbench/menu.html" style="width:270px;height:220px;border:none;"></iframe>

## About the repositories {#abouttherepos}

The entirety of the {{site.project_title}} is composed of a number of Git
repositories. All are included as submodules in the main `polymer-all` repository.
However, understanding the various pieces will help you navigate the codebase.

We have factored our repositories into separate chunks for each specification API.
For example, the following repositories are useful individually:

* `CustomElements`
* `HTMLImports`
* `PointerEvents`
* `PointerGestures`
* `ShadowDOM`
* `mdv`
* `web-animations-js`

Some repositories depend on others in {{site.project_title}} and must be siblings of the same parent directory to function completely:

* `polymer`
* `platform`
* `toolkit-ui`

### /polymer repository

[github.com/polymer/polymer](https://github.com/polymer/polymer)

The [`polymer`](https://github.com/polymer/polymer) repository contains the
[{{site.project_title}} kernel](polymer.html) and its tools and tests. It expects
the [`platform`](https://github.com/polymer/platform) polyfill repo to be a sibling directory.

### /platform

[github.com/polymer/platform](https://github.com/polymer/platform)

Each new web platform feature has a corresponding polyfill repository. The
reasoning for this is two-fold:

1. make the polyfills work across all modern browsers
2. each polyfill can stand on its own and be used à la carte in projects.

The [`platform`](https://github.com/polymer/platform) repository references each of the polyfills as a sibling directory, and contains integration tests, loader, and build tools for
the amalgamated polyfills.

See [Tooling & Testing](tooling-strategy.html) for information.

### /polymer-elements

[github.com/polymer/polymer-elements](https://github.com/polymer/polymer-elements)

The [`polymer-elements`](https://github.com/polymer/polymer-elements) repository
contains utility elements that do not render UI.

### /polymer-ui-elements

[github.com/polymer/polymer-ui-elements](https://github.com/polymer/polymer-ui-elements)

The [`polymer-ui-elements`](https://github.com/polymer/polymer-ui-elements)
repository contains a growing set of basic UI components. Most are a work in progress.

### /more-elements

[github.com/polymer/more-elements](https://github.com/polymer/more-elements)

The [`more-elements`](https://github.com/polymer/more-elements) repository contains 
extra components and wrappers for third-party code. Examples include Bootstrap,
topcoat, Chart.js, pdf.js, x-tags, and AceEditor.

### /toolkit-ui

[github.com/polymer/toolkit-ui](https://github.com/polymer/toolkit-ui)

The [`toolkit-ui`](https://github.com/polymer/toolkit-ui) repository contains examples of
the types of things you can do when writing a [{{site.project_title}} element](/polymer.html).

- **elements/** — `g-*` custom element definitions.
- **workbench/** — demos of the {{site.project_title}}-style elements found in `elements/`.

### /projects

[github.com/polymer/projects](https://github.com/polymer/projects)

The [`projects`](https://github.com/polymer/projects) repository contains
substantial larger apps/demos that we're tinkering with This includes apps like
pica and tools like Sandbox.



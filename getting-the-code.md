---
layout: default
title: Getting the Code
---

## Bring on the code!

You can recursively clone and initialize all of toolkit's submodules with a single git command.

**To get the code, run:**

    git clone git://github.com/toolkitchen/toolkit.git --recursive

This creates a `toolkit/` folder with the following top-level files and folders:

- **components/** — Initial set of example components.
- **platform/** — Submodule which contains the platform shims and polyfills.
- **test/** — Test cases.
- **workbench/** — Examples of using the Toolkit components in `components/`. 
- **toolkit.js** — The [Toolkit kernel](toolkit-kernel-explainer.html)

More on repository structure is below.

### Test your environment

To check that your development environment is ready, start a local web
server and run one of the included sample projects:

1. Start a local web server with the `toolkit/` folder as the web root.
2. In your browser, navigate to
    [http://localhost/toolkit/workbench/menu.html](http://localhost/toolkit/workbench/menu.html).
    You should see a menu of items, as shown below.

<iframe src="/toolkit/workbench/menu.html" style="width: 270px;height:280px;border:none;"></iframe>

### About branches

See [Branching Workflow](branching-strategy.html).

### Updating {{site.project_title}} submodules

Periodically, we will update the projects' submodules on GitHub. To
update your local copy's submodules, run the following command
from the the repository's folder:

    git submodule update --init --recursive

## Repository structure

The entirety of the {{site.project_title}} is composed of a number of Git
repositories. Most are included as submodules in the main `toolkit` repository.
However, understanding the various pieces will help you navigate the codebase.

We have factored our repositories into atomic chunks, and then created
integration repositories to bring them together again. For example, the following repositories may be useful individually:

* `CustomElements`
* `HTMLImports`
* `ShadowDOM`
* `MDV`
* `PointerGestures`

Other repositories aggregate these individual repositories (as submodules) into useful combinations:

* `platform`
* `toolkit`

### Polyfill repositories

Each new web platform feature has a corresponding polyfill repository. The
reasoning for this is two-fold:

1. make the polyfills work across all modern browsers
-  each polyfill can stand on its own and be used à la carte in projects.

### /platform repository

[github.com/toolkitchen/platform](https://github.com/toolkitchen/platform)

The [`platform`](https://github.com/toolkitchen/platform) repository references each of the polyfills as submodules, and contains integration tests, loader, and build tools for the amalgamated polyfills.

See [Tooling Strategy](tooling-strategy.html) for information.

### /toolkit repository

[github.com/toolkitchen/toolkit](https://github.com/toolkitchen/toolkit)

The [`toolkit`](https://github.com/toolkitchen/toolkit) repository contains the guts
of the project. It pulls in the [`platform`](https://github.com/toolkitchen/platform)
polyfill repo as a submodule, contains examples, demos, tools, and hosts the
[Toolkit kernel](toolkit-kernel-explainer.html).

If you want to see the development activity, checkout the _master_ branch directly:

    git clone -b master https://github.com/toolkitchen/toolkit.git --recursive

<p class="alert">
<b>Remember</b>: If you don't specify <em>master</em>, you'll get the <em>stable</em> branch by default.
See <a href="/branching-strategy.html">Branching Workflow</a> for more info.
</p>

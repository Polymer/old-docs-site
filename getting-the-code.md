---
layout: default
title: Getting the Code
---

<p class="alert">
  <strong>Browser requirements</strong>: {{site.project_title}} will eventually support all major "evergreen"
(auto-updating) browsers, it currently requires a WebKit-based browser such as Chrome or Safari.
</p>

## Bring on the code!

You can recursively clone and initialize all of its submodules with a single git command.

**To clone toolkit:**

    git clone git://github.com/toolkitchen/toolkit.git --recursive

This creates a `toolkit/` folder with the following top-level files and folders:

- **components/** — Initial set of example components.
- **platform/** — Submodule which contains the platform shims and polyfills.
- **test/** — Test cases.
- **workbench/** — Examples of using the Toolkit components in `components/`. 
- **toolkit.js** — The [Toolkit kernel](toolkit-kernel-explainer.html)

### Test your environment

To check that your development environment is ready, start a local web
server and run one of the included sample projects:

1. Start a local web server with the `toolkit/` folder as the web root.
2. In your browser, navigate to
    [http://localhost:8000/toolkit/workbench/menu.html](http://localhost:8000/toolkit/workbench/menu.html).
    You should see a menu of items, as shown below.

<iframe src="/toolkit/workbench/menu.html" style="width: 270px;height:280px;border:none;"></iframe>

### Updating {{site.project_title}} submodules

Periodically, we will update the project's submodules on GitHub. To
update your local {{site.project_title}}'s submodules, run the following command
from the `toolkit/` folder:

    git submodule update --init --recursive

### About master and dev branches

See [Branching Workflow](branching-strategy.html).


## Repository structure

The entirety of the {{site.project_title}} is composed of a number of Git
repositories. Most are included as submodules in the main `toolkit` repository.
However, understanding the various pieces will help you navigate the codebase.

### Polyfill repos

Each new web platform feature has a corresponding polyfill repository. The
reasoning for this is two-fold:

1. make the polyfills work across all modern browsers
-  each polyfill can stand on its own and be used à la carte in projects.

### Platform repo

[github.com/toolkitchen/platform](https://github.com/toolkitchen/platform)

The [platform](https://github.com/toolkitchen/platform) repository references each of the polyfills as submodules, and contains integration tests, loader, and build tools for the amalgamated polyfills.

See [Tooling Strategy](tooling-strategy.html) for information.

### Toolkit repo

[github.com/toolkitchen/toolkit](https://github.com/toolkitchen/toolkit)

The [toolkit](https://github.com/toolkitchen/toolkit) repository contains the guts
of the project. It pulls in the [platform](https://github.com/toolkitchen/platform)
polyfill repo as a submodule, contains examples, demos, tools, and hosts the
[Toolkit kernel](toolkit-kernel-explainer.html).

If you want to see the development activity, checkout the _master_ branch directly:

    git clone -b master https://github.com/toolkitchen/toolkit.git

If you don't specify _master_, you'll get the _stable_ branch by default.
See [Branching Workflow](branching-strategy.html) for more info.

---
layout: default
title: Getting the code
pygments: true
---

{{site.project_title}} is composed from a number of Git repositories included as
submodules in the main toolkitchensink repository.


## About the repositories

The {{site.project_title}} project has two primary goals:

1. make the polyfills work across all modern browsers
- put each polyfill in its own repository so it may stand on its own


Platform

The platform repository references each of the polyfills as submodules, and contains integration tests, loader, and build tools for the amalgamated polyfills.

See [Tooling Strategy](tooling-strategy.html) for information about the tooling strategy.

Toolkit

The toolkit master branch is unchanged: it represents the stable codebase from the last iteration.

The toolkit dev branch has recently been revamped. In particular, it loads platform as a submodule.

Notes:

toolkit itself is in flux, the dev code is not feature complete vs the stable branch, and there are various systemic changes we will describe in future communications
as we changed platform from a folder to a submodule, Git will not allow updating toolkit from the old dev to the new dev, or from master to dev. For now, to checkout the new dev branch, one should do so directly.
Example command to clone toolkit dev:

    git clone -b dev https://github.com/toolkitchen/toolkit.git

See [ Branching Workflow](branching-strategy.html) for information on our philosophy on branches.

## Checkout the code

You can recursively clone and initialize all of its submodules with a single git command.

**To clone toolkitchensink:**

    git clone git://github.com/toolkitchen/toolkitchensink.git --recursive

This creates the following top-level directories in toolkitchensink/,
each a submodule:

-   **toolkit/**—Contains the core Toolkit kernel, a set of components,
    and the platform shims and polyfills.
-   pantry/—Extra components and wrappers for third-party code.
-   projects/—Projects that use, enhance, or demonstrate Toolkit
    technologies.

The toolkit/ folder contains the following sub-folders:

-   **platform/**—Contains the platform shims and polyfills.
-   **components/**— Contains the Toolkit kernel (g-component.html) and
    the initial set of Toolkit components.
-   getting\_started/—A starter project.
-   test/—Test cases.
-   third-party/—Testing libraries.
-   workbench/—Examples of using Toolkit components.

### Test your environment

To check that your development environment is ready, start a local web
server and run one of the included sample projects:

1.  Start a local web server with the **toolkitchensink/** folder as the
    web root.
2.  In a supported browser, go to
    [http://localhost:8000/toolkit/workbench/menu.html](http://localhost:8000/toolkit/workbench/menu.html).
    You should see a menu of items, as shown below.

### Browser requirements

{{site.project_title}} will eventually support all major "evergreen"
(auto-updating) browsers, it currently requires a WebKit-based browser
such as Chrome or Safari.

### Updating {{site.project_title}} submodules

Periodically, we will update the project's submodules on GitHub. To
update your local {{site.project_title}}'s submodules, run the following command
from the toolkitchensink/ folder:

    git submodule update --init --recursive

### About master and dev branches

See [Branching Workflow](branching-strategy.html).


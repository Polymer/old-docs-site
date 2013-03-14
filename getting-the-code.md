---
layout: default
title: Getting the code
pygments: true
---

Toolkitchen is composed from a number of Git repositories included as
submodules in the main toolkitchensink repository. You can recursively
clone and initialize all of its submodules with a single git command.

**To clone Toolkitchen:**

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

Toolkitchen will eventually support all major "evergreen"
(auto-updating) browsers, it currently requires a Webkit-based browser
such as Chrome or Safari.

### Updating Toolkitchen submodules

Periodically, we will update the project's submodules on GitHub. To
update your local Toolkitchen's submodules, run the following command
from the toolkitchensink/ folder:

    git submodule update --init --recursive

### About master and dev branches

Some of the repositories in Tookitchen have a **dev** branch, in
addition to the **master** branch. The master branch is intended to be
generally free of bugs, while the dev branch contains the most recent
commits and may not be stable.

Eventually we will establish a more formalized schedule and structure
for this process, but for now it's going to be done "when the time is
right".

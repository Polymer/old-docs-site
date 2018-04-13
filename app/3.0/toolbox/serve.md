---
title: Serve your app
---

<!-- toc -->

<div>
{% include 'outdated.html' %}
</div>

You can serve an App Toolbox app using any server technology you want. The [Polymer CLI](/{{{polymer_version_dir}}}/docs/tools/polymer-cli) build
process supports fast-loading applications that can take advantage of the latest web technologies.

The default output of the `polymer build` command is an unbundled build designed for server/browser combinations that support HTTP/2 and HTTP/2 server push to deliver the resources the browser needs for a fast first paint while optimizing caching.

See the [documentation on the PRPL pattern](prpl) for more information.

For server and browser combinations that don't support server push, you can generate a bundled build designed to minimize the number of round-trips required to get the application running.

Create a bundled build with the `--bundled` flag:

    polymer build --bundle

## Dynamic serving

If you need to perform dynamic serving (serving different content to users with different browsers), multiple builds are an option. You can generate multiple builds by configuring them in your [polymer.json file](/{{{polymer_version_dir}}}/docs/tools/polymer-json).

If you have multiple builds, your server logic must deliver the appropriate build for each browser, usually by examining the user-agent string sent by the browser.

You may need to perform dynamic serving if:

* You want to serve a bundled build to some users, and an unbundled build to others.
* You want to serve ES6 to some users and ES5 to others.

See the documentation on [building your app for production](build-for-production) for more information.

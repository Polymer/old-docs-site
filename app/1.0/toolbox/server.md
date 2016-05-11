---
title: Serve your app
---

You can  serve a App Toolbox app using any server technology you want, but App Toolbox includes a _reference server_, a sample server implementation built on top of Google App Engine. The reference server takes advantage of HTTP2 and HTTP2 push to deliver the resources the browser needs for a fast first paint while optimizing caching.

## HTTP2 and HTTP2 Push

HTTP2 allows _multiplexed_ downloads over a single connection, so that multiple small files can be downloaded more efficiently.

HTTP2 Push allows the server to preemptively send resources to the browser.

For an example of how HTTP2 Push speeds up downloads, consider how the browser retrieves an HTML file with a linked stylesheet.

In HTTP1:
*   The browser requests the HTML file.
*   The server returns the HTML file and the browser starts parsing it.
*   The browser encounters the `<link rel="stylesheet">` tag, and starts a new request for the stylesheet.
*   The browser receives the stylesheet.

With HTTP2 push:
*   The browser requests the HTML file.
*   The server returns the HTML file, and pushes the stylesheet at the same time.
*   The browser starts parsing the HTML. By the time it encounters the `<link rel="stylesheet">`, the stylesheet is already in the cache.

In this simplest case, HTTP2+Push eliminates a single HTTP request-response.

With HTTP1, developers bundle resources together to reduce the number of HTTP requests required to render a page. However, bundling can reduce the efficiency of the browser's cache. if resources for each page are combined into a single bundle, each page gets its own bundle, and the browser can't identify shared resources.

The combination of HTTP2 and HTTP2 push can provide the _benefits_ of bundling (reduced latency) without needing to bundle resources. Keeping resources separate means they can cached efficiently and be shared between pages.

## PRPL strategy

To optimize delivery, the reference server uses the [PRPL strategy](link-to-blog-yet-to-be), which stands for:

*  Push critical resources for the initial route.
*  Render initial route.
*  Pre-cache remaining routes.
*  Lazy-load and create remaining routes on demand.

To do this, the server needs to be able to identify the resources required by each of the app's routes. Instead of bundling the resources into a single unit for download, it uses HTTP2 push to deliver the individual resources needed to render the requested route.

The server and service worker together work to precache the resources for the inactive routes.

When the user switches routes, the app lazy-loads any required resources that haven't been cached yet, and creates the required views.

## Fallback strategy

Bundled (vulcanized, concatenated) and unbundled (HTTP2 push) versions.

Plugins for polytool, build, serve, deploy hooks
&lt;&lt;&lt;I don't know what the tasks are here. Plz help.&gt;&gt;&gt;
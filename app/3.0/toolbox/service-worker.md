---
title: Offline caching with Service Worker Precache
---

<div>
{% include 'outdated.html' %}
</div>

To provide a better experience in offline and spotty network situations, App
Toolbox uses a service worker to provide offline caching of critical resources. A
service worker is a script associated with a specific web site that acts as a
client-side proxy for network requests. The service worker can intercept network
requests, access the browser's cache, and serve requests out of the cache
instead of accessing the network.

The first time someone opens the site, the browser installs the site's service
worker, and the service worker ensures that the site's critical resources are
cached. On subsequent visits, the service worker can load resources directly
from the cache. If the user is completely offline, the service worker can still
load the site, and display cached data or an offline message, as appropriate.

Service worker works well with an _app shell_ strategy, where the app's main UI
views and logic (the app shell) are cached so that they can be served from the
cache.

App Toolbox uses the Service Worker Precache (`sw-precache`) module for offline
support. This module takes a list of files to cache and generates a service
worker at build time, so you don't need to write your own service worker code.

For background, gotchas and debugging tips on service workers, see [Introduction to Service
Worker](https://developers.google.com/web/fundamentals/primers/service-worker/) on Web Fundamentals.

## Prerequisites

To work with service worker, your application **must** be served over HTTPS. However, you can
test service worker on your local system without a SSL certificate, because `localhost` is
considered a secure origin.

## Add a service worker

Support for Service Worker Precache is built into the [Polymer CLI](/{{{polymer_version_dir}}}/docs/tools/polymer-cli),
so a service worker script is automatically generated when you build your app.

However, to use the service worker, you need to add code to register it:

```js
// Register service worker if supported.
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/service-worker.js');
}
```

Registering a service worker doesn't speed up the first load of your site, so you can delay
registering it until after your app has loaded.

## Configuring the service worker

You can specify any Service Worker Precache options by passing an options file
to the build command:

<code>polymer build --sw-precache-config <var>config-file</var>.json</code>

The config file is a JavaScript file that exports a set of configuration options supported by
Service Worker Precache. See [Options parameter](https://github.com/GoogleChrome/sw-precache#options-parameter)
in the `sw-precache` README for more information.

If you identify resources using the `--entrypoint`, `--shell` and `--fragment`, arguments, those
files are added in to the `staticFileGlobs` parameter to ensure that they're cached.

If you're writing a single-page app and you want it to work completely offline, you probably want
to specify a _fallback_ document, to be served when the requested URL is not in the cache. For a
single—page app, this is typically the same as the entrypoint.  Configure fallback using the
[navigateFallback](https://github.com/GoogleChrome/sw-precache#navigatefallback-string) and
[navigateFallbackWhitelist](https://github.com/GoogleChrome/sw-precache#navigatefallbackwhitelist-arrayregexp)
parameters.

The following config file sets up some common options, including falling back to the `/index.html`
file when offline.

```js
module.exports = {
  staticFileGlobs: [
    '/index.html',
    '/manifest.json',
    '/bower_components/webcomponentsjs/webcomponents-lite.js',
    '/images/*'
  ],
  navigateFallback: '/index.html',
  navigateFallbackWhitelist: [/^(?!.*\.html$|\/data\/).*/]
}
```

Only paths that match the whitelist fall back to `/index.html`. In this case, the whitelist includes
all files _except_ those that end in `.html` (for HTML imports) and ones with `/data/` in the path
(for dynamically-loaded data).

## More resources

The library supports a number of other features, including runtime caching of
your app's dynamic content.

For more information on the library, see [Service Worker Precache Getting
Started](https://github.com/GoogleChrome/sw-precache/blob/master/GettingStarted.md).

For background on service workers, see [Introduction to Service
Worker](https://developers.google.com/web/fundamentals/primers/service-worker/) on Web Fundamentals.

---
title: Offline caching with Service Worker Precache
---

To provide a better experience in offline and spotty network situations, App
Toolbox uses service workers to provide offline caching of critical resources. A
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

App Toolbox  uses the Service Worker Precache (`sw-precache`) module for offline
support. This module takes a list of files to cache and generates a service
worker at build time, so you don't need to write your own service worker code.

If you start with one of the App Toolbox application templates,`sw-precache` is
already included and integrated into the build step. All you need to do is
update the list of critical resources.

The library supports a number of other features, including runtime caching of
your app's dynamic content.

For more information on the library, see [Service Worker Precache Getting
Started](https://github.com/GoogleChrome/sw-
precache/blob/master/GettingStarted.md)

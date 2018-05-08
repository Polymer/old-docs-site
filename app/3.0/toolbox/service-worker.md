---
title: Offline caching with Service Worker Precache
---

<!-- toc -->

A service worker is a script associated with a specific web site that acts as a
client-side proxy for network requests. The service worker can intercept network
requests, access the browser's cache, and serve requests out of the cache
instead of accessing the network.

A service worker can improve your app's performance and allow it to work offline. 

The first time someone opens your site, the browser installs the site's service
worker, and the service worker caches your app's critical resources. On subsequent visits, the service worker can load resources directly
from the cache. If the user is completely offline, the service worker can still
load the site, and display cached data or an offline message, as appropriate.

Service worker works well with an _app shell_ strategy, where the app's main 
views and logic (the app shell) are cached so that they can be served without accessing the network.

Polymer CLI uses the [Service Worker Precache (`sw-precache`)](https://github.com/GoogleChromeLabs/sw-precache) library. All of the Polymer [build presets](/{{{polymer_version_dir}}}/docs/tools/polymer-json#presets), and the default build, include a service worker. 

For background, gotchas and debugging tips on service workers, see [Introduction to Service
Workers](https://developers.google.com/web/fundamentals/primers/service-worker/) on Web Fundamentals.

## Prerequisites

To work with a service worker, your application **must** be served over HTTPS. However, you can
test your service worker locally without a SSL certificate, because `localhost` is
considered a secure origin.

For information on browser support for service worker, see [Is Service Worker Ready](https://jakearchibald.github.io/isserviceworkerready/).

## Add a service worker to your build

To add a service worker to your build:

1.  [Configure polymer.json](#configpolymerjson).
2.  [Add code to your entrypoint to register a service worker](#register).
3.  Run `polymer build`.

A service worker is added to your build.

### Configure polymer.json

To configure polymer.json, set the `"entrypoint"` and `"shell"` properties. The service worker will automatically precache these resources.

Polymer CLI generates a service worker by default. You can switch service worker generation on or off with the `"addServiceWorker"` option in your build configuration.

Example polymer.json configuration {.caption}

```json
{
  "entrypoint": "index.html",
  "shell": "src/my-app.js",
  "builds": [
    {
      "name": "esm-unbundled",
      "browserCapabilities": [
        "es2015",
        "modules"
      ],
      "js": {
        "minify": true
      },
      "css": {
        "minify": true
      },
      "html": {
        "minify": true
      },
      "bundle": false,
      "addServiceWorker": true
    }
  ],
  ...
}
``` 

### Register your service worker

To use the service worker, add code to your app's entrypoint to register it:

Register a service worker {.caption}

```html
<head>
  ...
  <script>
  // Feature detect for service worker capability in the browser
  if ('serviceWorker' in navigator) {
    // Delay registering until page load
    window.addEventListener('load', function() {
      navigator.serviceWorker.register('service-worker.js');
    });
  }
  </script>
  ...
</head>
```

Registering a service worker doesn't speed up the first load of your site. You can delay registering it until after your app has loaded.

## Customize your service worker

To customize your service worker, create a configuration file called  `sw-precache-config.js` in your top-level project folder. 

`sw-precache-config.js` exports a set of configuration options supported by Service Worker Precache. See [Options parameter](https://github.com/GoogleChrome/sw-precache#options-parameter)
in the `sw-precache` README for more information.

If you're writing a single-page app and you want it to work completely offline, specify a _fallback_ document to be served when the requested URL is not in the cache. For a single—page app, this is typically the same as the entrypoint. Configure fallback using the [navigateFallback](https://github.com/GoogleChrome/sw-precache#navigatefallback-string) and [navigateFallbackWhitelist](https://github.com/GoogleChrome/sw-precache#navigatefallbackwhitelist-arrayregexp)
parameters.

Example sw-precache-config.js {.caption}

```js
module.exports = {
  staticFileGlobs: [
    '/index.html',
    '/manifest.json',
    '/node_modules/@webcomponents/webcomponentsjs/webcomponents-bundle.js',
    '/images/*'
  ],
  navigateFallback: '/index.html',
  navigateFallbackWhitelist: [/^(?!.*\.js$|\/data\/).*/]
}
```

Only paths that match the whitelist fall back to `/index.html`. In this case, the whitelist includes
all files _except_ those that end in `.js` (for JavaScript imports) and ones with `/data/` in the path
(for dynamically-loaded data).

## More resources

The `sw-precache` library supports a number of other features, including runtime caching of
your app's dynamic content.

For more information on the library, see [Service Worker Precache: Getting
Started](https://github.com/GoogleChrome/sw-precache/blob/master/GettingStarted.md).

For background on service workers, see [Introduction to Service
Worker](https://developers.google.com/web/fundamentals/primers/service-worker/) on Web Fundamentals.

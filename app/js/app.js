/*
 * @license
 * Copyright (c) 2016 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
 */

(function(exports) {
'use strict';

function downloadStarter() {
  ga('send', 'event', 'button', 'download');
}

function recordPlunker(demo) {
  ga('send', 'event', 'plunker', demo);
}

function recordPageview(opt_url) {
  var url = opt_url || location.pathname + location.hash;
  ga('send', 'pageview', url);
  ga('devrelTracker.send', 'pageview', url);
}

exports.recordPageview = recordPageview;
exports.downloadStarter = downloadStarter;
exports.recordPlunker = recordPlunker;

// Analytics -----
/* jshint ignore:start */
(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
})(window,document,'script','//www.google-analytics.com/analytics.js','ga');
/* jshint ignore:end */

ga('create', 'UA-39334307-1', 'auto', {'siteSpeedSampleRate': 50});
ga('create', 'UA-49880327-9', 'auto', {'name': 'devrelTracker'});
recordPageview();

if (console) {
  console.log("%cWelcome to Polymer!\n%cweb components are the <bees-knees>",
              "font-size:1.5em;color:#4558c9;", "color:#d61a7f;font-size:1em;");
}

// Show a toast with a service-worker-related update.
window.showToast = function(message) {
  var toast = document.getElementById('sw-toast');
  if (!toast) {
    toast = document.createElement('paper-toast');
    toast.id = 'sw-toast';
    document.body.appendChild(toast);
  }
  toast.textContent = message;
  toast.show();
};

// Register service worker, if supported, after the load event (to deprioritize it after lazy imports).
if ('serviceWorker' in navigator) {
  window.addEventListener('load', function() {
    navigator.serviceWorker.register('/service-worker.js').then(function(registration) {
      registration.onupdatefound = function() {
        // The updatefound event implies that registration.installing is set; see
        // https://slightlyoff.github.io/ServiceWorker/spec/service_worker/index.html#service-worker-container-updatefound-event
        const installingWorker = registration.installing;
        installingWorker.onstatechange = function() {
          switch (installingWorker.state) {
            case 'installed':
              if (!navigator.serviceWorker.controller) {
                window.showToast('Service Worker installed! Pages you view are cached for offline use.');
              }
              break;

            case 'redundant':
              throw Error('The installing service worker became redundant.');
          }
        };
      };
    }).catch(function(e) {
      console.error('Service worker registration failed:', e);
    });

    // Check to see if the service worker controlling the page at initial load
    // has become redundant, since this implies there's a new service worker with fresh content.
    if (navigator.serviceWorker.controller) {
      navigator.serviceWorker.controller.onstatechange = function(event) {
        if (event.target.state === 'redundant') {
          window.showToast('Site updated. Refresh this page to see the latest content.');
        }
      };
    }
  });
}

})(window);

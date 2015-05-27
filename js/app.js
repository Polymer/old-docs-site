/*
 * @license
 * Copyright (c) 2014 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
 */

(function(exports) {

// Control whether the site is ajax or static.
var AJAXIFY_SITE = true;//!navigator.userAgent.match('Mobile|Android');

var wasRelativeAnchorClick = false;

var siteBanner = null;
var docsMenu = null;
var dropdownPanel = null;
var appBar = null;
var sidebar = null;

function hideSidebar() {
  sidebar.close();
}

function addPermalink(el) {
  el.classList.add('has-permalink');
  el.insertAdjacentHTML('beforeend',
      '<a class="permalink" title="Permalink" href="#' + el.id + '">#</a>');
}

// Add permalinks to heading elements.
function addPermalinkHeadings(opt_inDoc) {
  var doc = opt_inDoc || document;

  var permalinkEl = doc.querySelector('.show-permalinks');
  if (permalinkEl) {
    ['h2','h3','h4'].forEach(function(h, i) {
      Array.prototype.forEach.call(
          permalinkEl.querySelectorAll(h), addPermalink);
    });
  }
}

function prettyPrintPage(opt_inDoc) {
  var doc = opt_inDoc || document;

  // TODO: Use kramdown to add the class - {:.prettyprint .lang-js}.
  Array.prototype.forEach.call(doc.querySelectorAll('pre'), function(pre, i) {
    pre.classList.add('prettyprint');
  });

  exports.prettyPrint && prettyPrint();
}

/**
 * Replaces in-page <script> tag in xhr'd body content with runnable script.
 *
 * @param {Node} node Container element to replace script content.
 */
function replaceScriptTagWithRunnableScript(node) {
  var script  = document.createElement('script');
  script.text = node.innerHTML;
  node.parentNode.replaceChild(script, node);
}

/**
 * Replaces the main content of the page by loading the URL via XHR.
 *
 * @param {string} url The URL of the page to load.
 * @param {boolean} opt_addToHistory If true, the URL is added to the browser's
 *     history.
 */
function injectPage(url, opt_addToHistory) {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', url);
  xhr.responseType = 'document';
  xhr.overrideMimeType("text/html; charset=utf-8");
  xhr.onloadend = function(e) {
    if (e.target.status != 200) {
      // TODO: use window.error and report this to server.
      console.error('Page fetch error', e.target.status, e.target.statusText);
      return;
    }

    var doc = e.target.response;

    document.title = doc.title; // Update document title to fetched one.

    var meta = doc.head.querySelector('meta[itemprop="name"]');
    if (meta) {
      var metaContentName = doc.head.querySelector('meta[itemprop="name"]').content;
      document.head.querySelector('meta[itemprop="name"]').content = metaContentName;
    }

    // Update URL history now that title and URL are set.
    var addToHistory = opt_addToHistory == undefined ? true : opt_addToHistory;
    if (addToHistory) {
      history.pushState({url: url}, doc.title, url);
    }

    // Record GA page view early; once metadata is set up and URL is updated.
    exports.recordPageview();

    // Update app-bar links.
    var docAppBar = doc.querySelector('app-bar');
    if (docAppBar) {
      appBar.badge = docAppBar.getAttribute('badge');
      appBar.innerHTML = docAppBar.innerHTML;
    } else {
      // We're not on a doc page (e.g. demo page or something else). Just redirect.
      location.href = url;
      return;
    }

    // Inject article body.
    var CONTAINER_SELECTOR = '#content-container scroll-area article';
    var container = document.querySelector(CONTAINER_SELECTOR);
    var newDocContainer = doc.querySelector(CONTAINER_SELECTOR);
    container.innerHTML = newDocContainer.innerHTML;

    // .innerHTML doesn't eval script. Replace <script> in-page with runnable version.
    var scripts = container.querySelectorAll('script');
    Array.prototype.forEach.call(scripts, function(node, i) {
      replaceScriptTagWithRunnableScript(node);
    });

    // Set left-nav menu and highlight correct item.
    docsMenu.highlightItemWithCurrentURL();

    // Replace site-banner > header content.
    var HEADER_SELECTOR = 'site-banner header';
    var siteBannerHeader = document.querySelector(HEADER_SELECTOR);
    siteBannerHeader.innerHTML = doc.querySelector(HEADER_SELECTOR).innerHTML;

    // Update site-banner attributes. Elements in xhr'd document are not upgraded.
    // We can't set properties directly. Instead, do old school attr replacement.
    // This runs last to help color transition be buttery smooth.
    var newDocSiteBanner = doc.querySelector('site-banner');
    Array.prototype.forEach.call(newDocSiteBanner.attributes, function(attr, i) {
      if (attr.name != 'unresolved') {
        siteBanner.setAttribute(attr.name, attr.value);
      }
    });

    // TODO: can't pass `doc` to prettyPrint() needs markup in DOM.
    initPage();

    // Scroll to hash, otherwise goto top of the loaded page.
    if (location.hash) {
      // Wrap this scrolling logic in a timeout to ensure that the <template>s are fully
      // stamped out, and that if the user agent tries to reset the scroll position (e.g.
      // after a reload), our logic kicks in afterward.
      // See https://github.com/Polymer/docs/pull/836 for a discussion of this behavior.
      window.setTimeout(function() {
        var scrollTargetEl = document.querySelector(location.hash);
        scrollTargetEl && exports.scrollTo(0, scrollTargetEl.offsetTop - siteBanner.offsetHeight);
      }, 200);
    } else {
      exports.scrollTo(0, 0);
    }

    // Hide mobile sidebar when injected page is finished loading. Prevents jank
    // to do this as late as possible.
    if (sidebar.mobile) {
      hideSidebar();
    }

    document.dispatchEvent(new Event('page-injected'));
  };

  xhr.send();
}

// Old API reference URLs have the page name in the hash. After
// server-side redirects, they end up as "docs/elements/#page-name"
// The page name may be followed by a deep link, like ".attributes.data".
// Rewrite here to "docs/elements/page-name.html", leaving any hash
// in place to preserve the deep link.
function redirectOldAPIDocs() {
  var oldAPILanding = 'docs/elements/'
  var path = window.location.pathname;
  var hash = window.location.hash;
  var position = path.length - oldAPILanding.length;
  var lastIndex =  path.indexOf(oldAPILanding, position);
  if (lastIndex !== -1 && lastIndex == position) {
    if (hash) {
      location.href = location.href.replace(/(\/docs\/elements\/)#([^.]*)(.*)$/, '$1$2.html#$2$3')
    }
  }
}

function initPage(opt_inDoc) {
  var doc = opt_inDoc || document;

  // TODO: surely there's a better way to do this?
  redirectOldAPIDocs();


  // TODO: do this at build time.
  addPermalinkHeadings(doc);

  // Only syntax highlight on desktop. Saves ~200ms.
  if (!window.matchMedia('(max-width: 580px)').matches) {
    prettyPrintPage(doc);
  }
}

// Hijacks page to preventDefault() on links and make site ajax.
function ajaxifySite() {
  document.addEventListener('polymer-ready', function(e) {
    docsMenu.ajaxify = true;
    if (dropdownPanel) {
      dropdownPanel.ajaxify = true;
    }
  });

  document.addEventListener('click', function(e) {
    // Allow users to open new tabs.
    if (e.metaKey || e.ctrlKey || e.which == 2) {
      return;
    }

    // Inject page if <a> was in the event path and matches ajax criteria:
    // - was relative link and not javascript:
    // - not a #hash link within the same page
    // - is not going to a non-ajaxable page (index.html, apps, components, etc.)
    // - was not targeted at a new window
    for (var i = 0; i < e.path.length; ++i) {
      var el = e.path[i];
      if (el.localName == 'a') {
        wasRelativeAnchorClick = !!el.hash;
        if (!el.getAttribute('href').match(/^(https?:|javascript:|\/\/)/) &&
            (!el.hasAttribute('data-external-link')) &&
            (location.origin == el.origin) &&
            !(el.hash && (el.pathname == location.pathname)) &&
            (el.pathname != '/') &&
            (el.pathname != '/index.html') &&
            (el.pathname.indexOf('/apps') != 0) &&
            (el.pathname.indexOf('/components') != 0) &&
            el.target == '') {
          injectPage(el.href);
          e.preventDefault();
          e.stopPropagation();
        }

        return;
      }
    }
  });

  // TODO(ericbidelman): gave up on making this work on Safari + polyfill.
  // Because this event fires on page in Safari/webkit, it means there's a
  // wasteful call to injectPage().
  // Note: Chromium no longer suffers from the popstate event firing on
  // page load (crbug.com/63040). WebKit still does.
  exports.addEventListener('popstate', function(e) {
    Polymer.whenReady(function() {
      if (e.state && e.state.url) {
        // TODO(ericbidelman): Don't run this for relative anchors on the same page.
        injectPage(e.state.url, false);
      } else if (!wasRelativeAnchorClick && history.state) {
        history.back();
      }
    });
  });

}

// Every element doc page has a json string containing the definition
// for the elemnt itself. This string needs to be handed to the component-docs
// element to render. See 0.5/docs/elements/element-template.md for page template
function initElementDoc() {
  if (window.location.href.indexOf('docs/elements') !== -1) {
    // Hacky FOUC control
    setTimeout(function() {
      var node = document.querySelector('component-docs');
      if (node) {
        node.data = window.elementDoc;
      }
    }, 0);
  }
}

document.addEventListener('polymer-ready', function(e) {
  // TODO(ericbidelman): Hacky solution to get anchors scrolled to correct location
  // in page. Layout of page happens later than the browser wants to scroll.
  if (location.hash) {
    window.setTimeout(function() {
      var scrollTargetEl = document.querySelector(location.hash);
      scrollTargetEl && scrollTargetEl.scrollIntoView(true, {behavior: 'smooth'});
    }, 200);
  }

  // The dropdown panel in the sidebar for mobile
  var dropdownToggle = document.querySelector('#dropdown-toggle');
  var dropdownPanel = document.querySelector('dropdown-panel');

  siteBanner.addEventListener('hamburger-time', function(e) {
    sidebar.toggle();
  });

  dropdownToggle && dropdownToggle.addEventListener('click', function(e) {
    dropdownPanel.openPanel();
    // dropdownPanel listens to clicks on the document and autocloses
    // so no need to add any more handlers
  });

  // Kickoff element doc pages
  initElementDoc();

});

document.addEventListener('page-injected', function(e) {

  // Kickoff element doc pages
  initElementDoc();

});


document.addEventListener('DOMContentLoaded', function(e) {
  siteBanner = document.querySelector('site-banner');
  docsMenu = document.querySelector('docs-menu');
  dropdownPanel = document.querySelector('dropdown-panel');
  sidebar = document.querySelector('#sidebar');
  appBar = document.querySelector('app-bar');
  learnTabs = document.querySelector('learn-tabs');
  featureCarousel = document.querySelector('feature-carousel');

  if (AJAXIFY_SITE && docsMenu) { // Ajaxify on pages other than the home.
    ajaxifySite();

    // Insure add current page to history so back button has an URL for popstate.
    history.pushState({url: document.location.href}, document.title,
                      document.location.href);
  }

  if (learnTabs) {
    learnTabs.addEventListener('tab-changed', function(e) {
      exports.tabChanged('learn-tabs', e.detail.tab);
    });
    learnTabs.addEventListener('click', function(e) {
      exports.recordClickthrough('learn-tabs', e);
    });
  }

  if (featureCarousel) {
    featureCarousel.addEventListener('click', function(e) {
      exports.recordClickthrough('carousel', e);
    });
  }

  initPage();
});

document.addEventListener('click', function(e) {
  // Search box close.
  if (appBar.showingSearch) {
    appBar.toggleSearch(e);
  }
});

document.querySelector('[data-twitter-follow]').addEventListener('click', function(e) {
  e.preventDefault();
  var target = e.target.localName != 'a' ? e.target.parentElement : e.target;
  exports.open(target.href, '', 'width=550,height=520');
});


// TODO: Create ga-logger component to avoid polluting the global scope.
exports.tabChanged = function(tabContainer, tab) {
  ga('send', 'event', tabContainer, 'select', 'tab-' + tab);
}

// send a separate event for a clickthrough inside a special container
// (carousel, learn-tabs).
exports.recordClickthrough = function(container, event) {
  for (var i=0; i < event.path.length; i++) {
    var el = event.path[i];
    if (el.localName === 'a') {
      ga('send', 'event', container, 'clickthrough', el.getAttribute('href'));
      return;
    }
  }
}

exports.downloadStarter = function() {
  ga('send', 'event', 'button', 'download');
};

exports.recordSearch = function(term) {
  ga('send', 'event', 'search', term);
}

exports.recordPageview = function(opt_url) {
  var url = opt_url || location.pathname + location.hash;
  ga('send', 'pageview', url);
  ga('devrelTracker.send', 'pageview', url);
};

// -------------------------------------------------------------------------- //

// Analytics -----
(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
})(window,document,'script','//www.google-analytics.com/analytics.js','ga');

ga('create', 'UA-39334307-1', 'auto', {'siteSpeedSampleRate': 50});
ga('create', 'UA-49880327-9', 'auto', {'name': 'devrelTracker'});
exports.recordPageview();
// ---------------

console && console.log("%cWelcome to Polymer!\n%cweb components are the <bees-knees>",
                       "font-size:1.5em;color:#4558c9;", "color:#d61a7f;font-size:1em;");

})(window);

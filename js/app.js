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
  sidebar.toggle();
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

  Array.prototype.forEach.call(doc.querySelectorAll('pre'), function(pre, i) {
    pre.classList.add('prettyprint');
  });

  exports.prettyPrint && prettyPrint();
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
      appBar.innerHTML = docAppBar.innerHTML;
    } else {
      // We're not on a doc page (e.g. demo page or something else). Just redirect.
      location.href = url;
      return;
    }

    // Inject article body.
    var CONTAINER_SELECTOR = '#content-container scroll-area article';
    var container = document.querySelector(CONTAINER_SELECTOR);
    container.innerHTML = doc.querySelector(CONTAINER_SELECTOR).innerHTML;

    // Set left-nav menu and highlight correct item.
    docsMenu.setAttribute(
        'menu', doc.querySelector('docs-menu').getAttribute('menu'));
    // docsMenu.menu = doc.querySelector('docs-menu').getAttribute('menu');
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

    // TODO(ericbidelman): still need to run HTMLImports loader for inline imports?

    var hasInlineImports = !!container.querySelector('link[rel="import"]');

    // TODO: can't pass doc. prettyPrint() needs markup in DOM.
    initPage(null, hasInlineImports);

    // Scroll to hash, otherwise goto top of the loaded page.
    if (location.hash) {
      var scrollTargetEl = document.querySelector(location.hash);
      scrollTargetEl && scrollTargetEl.scrollIntoView(true, {behavior: 'smooth'});
    } else {
      exports.scrollTo(0, 0);
    }

    // Always hide mobile sidebar upon nav item selection.
    if (sidebar.mobile) {
      hideSidebar();
    }
  };

  xhr.send();
}

function initPage(opt_inDoc, hasInlineImports) {
  var doc = opt_inDoc || document;

  addPermalinkHeadings(doc);

  // TODO: Use kramdown {:.prettyprint .linenums .lang-ruby} to add the
  // <pre class="prettyprint"> instead of doing this client-side.
  if (!hasInlineImports) {
    prettyPrintPage(doc);
  } else {
    // Need small delay to prevent https://github.com/Polymer/docs/issues/419.
    // 200ms is arbitrary, but works.
    setTimeout(function() {
      prettyPrintPage(doc);
    }, 200);
  }
  if (location.hash) {
    hideOnHash();
  }
}

// Hijacks page to preventDefault() on links and make site ajax.
function ajaxifySite() {
  document.addEventListener('polymer-ready', function(e) {
    docsMenu.ajaxify = true;
    dropdownPanel.ajaxify = true;
  });

  document.addEventListener('click', function(e) {
    // Allow users to open new tabs.
    if (e.metaKey || e.ctrlKey) {
      return;
    }

    var viableLink = false;

    wasRelativeAnchorClick = !!e.target.hash;

    if (e.target.localName == docsMenu.localName || e.target.localName == dropdownPanel.localName) {
      if (e.detail.link) {
        viableLink = e.detail.link;
      }
    } else if (e.target.localName == 'a') {
      // Link is relative and doesn't have a target set.
      if (!e.target.getAttribute('href').match(/^(https?:|javascript:|\/\/)/) &&
          !e.target.hash && e.target.target == '') {
        viableLink = e.target;
      }
    }

    if (viableLink) {
      injectPage(viableLink.href);

      e.preventDefault();
      e.stopPropagation();
      return false;
    }
  });

  exports.addEventListener('popstate', function(e) {
    if (e.state && e.state.url) {
      // TODO(ericbidelman): Don't run this for relative anchors on the page.
      injectPage(e.state.url, false);
    } else if (!wasRelativeAnchorClick && history.state) {
      history.back();
    }
  });
}

// Hides elements with 'hide-on-hash' class if hash present.
function hideOnHash() {
  Array.prototype.forEach.call(document.querySelectorAll('.hide-on-hash'),
    function(el) {
      el.hidden = true;
    }
  );
};

document.addEventListener('polymer-ready', function(e) {
  // TODO(ericbidelman): Hacky solution to get anchors scrolled to correct location
  // in page. Layout of page happens later than the browser wants to scroll.
  if (location.hash) {
    window.setTimeout(function() {
      var scrollTargetEl = document.querySelector(location.hash);
      scrollTargetEl && scrollTargetEl.scrollIntoView(true, {behavior: 'smooth'});
    }, 200);
    hideOnHash();
  }

  // The dropdown panel in the sidebar for mobile
  var dropdownToggle = document.querySelector('#dropdown-toggle');
  var dropdownPanel = document.querySelector('dropdown-panel');

  siteBanner.addEventListener('hamburger-time', function(e) {
    sidebar.toggle();
  });

  dropdownToggle.addEventListener('click', function(e) {
    dropdownPanel.openPanel();
    // dropdownPanel listens to clicks on the document and autocloses
    // so no need to add any more handlers
  });

});


document.addEventListener('DOMContentLoaded', function(e) {
  siteBanner = document.querySelector('site-banner');
  docsMenu = document.querySelector('docs-menu');
  dropdownPanel = document.querySelector('dropdown-panel');
  sidebar = document.querySelector('#sidebar');
  appBar = document.querySelector('app-bar');

  if (AJAXIFY_SITE && docsMenu) { // Ajaxify on pages other than the home.
    ajaxifySite();

    // Insure add current page to history so back button has an URL for popstate.
    history.pushState({url: document.location.href}, document.title,
                      document.location.href);
  }

  initPage(null, false);
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


exports.downloadStarter = function() {
  ga('send', 'event', 'button', 'download');
};

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

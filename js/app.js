(function(exports) {

var AJAXIFY_SITE = true;

exports._gaq = exports._gaq || [];
exports._gaq.push(['_setAccount', 'UA-39334307-1']);
exports._gaq.push(['_setSiteSpeedSampleRate', 50]);
exports._gaq.push(['_trackPageview']);

var docsMenu = document.querySelector('docs-menu');


function addPermalink(el) {
  el.classList.add('has-permalink');
  el.insertAdjacentHTML('beforeend',
      '<a class="permalink" title="Permalink" href="#' + el.id + '">#</a>');
}

function setupDownloadButtons(opt_inDoc) {
  var doc = opt_inDoc || document;

  var downloadButton = doc.querySelector('.download a.btn');
  downloadButton && downloadButton.addEventListener('tap', function(e) {
    doc.querySelector('#dialog').toggle();
    return false;
  });

  var downloadSDKLink = doc.querySelector('#download_polymer_link');
  downloadSDKLink && downloadSDKLink.addEventListener('click', function(e) {
    exports._gaq.push(['_trackEvent', 'SDK', 'Download', POLYMER_VERSION]);
  });
}

// Placeholder for "loading screen"
// document.body.addEventListener('WebComponentsReady', function(e) {
//   e.target.classList.add('resolved');    
// });

// Add permalinks to heading elements.
function addPermalinkHeadings(opt_inDoc) {
  var doc = opt_inDoc || document;

  var permalinkEl = doc.querySelector('.show-permalinks');
  if (permalinkEl) {
    ['h2','h3','h4'].forEach(function(h, i) {
      [].forEach.call(permalinkEl.querySelectorAll(h), addPermalink);
    });
  }
}

function prettyPrintPage(opt_inDoc) {
  var doc = opt_inDoc || document;

  [].forEach.call(doc.querySelectorAll('pre'), function(pre, i) {
    pre.classList.add('prettyprint');
  });
  exports.prettyPrint && prettyPrint();
}

function testXhrType(type) {
  if (typeof XMLHttpRequest == 'undefined') {
    return false;
  }

  var xhr = new XMLHttpRequest();
  xhr.open('GET', '/', true);
  try {
    xhr.responseType = type;
  } catch(error) {
    return false;
  }
  return 'response' in xhr && xhr.responseType == type;
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
  xhr.responseType = 'document'; // TODO: verify all browsers have this.
  xhr.onloadend = function(e) {
    if (e.target.status != 200) {
      // TODO: use window.error and report this to server.
      console.error('Page fetch error', e.target.status, e.target.statusText);
      return;
    }

    var doc = e.target.response;

    document.title = doc.title;

    var META_CONTENT_NAME = 'meta[itemprop="name"]';
    var metaContentName = doc.head.querySelector(META_CONTENT_NAME).content;
    document.head.querySelector(META_CONTENT_NAME).content = metaContentName;

    var CONTAINER_SELECTOR = '#content-container';
    var container = doc.querySelector(CONTAINER_SELECTOR);
    document.querySelector(CONTAINER_SELECTOR).innerHTML = container.innerHTML;

    // Run Polymer's HTML Import loader/parser.
    HTMLImports.importer.load(container, function() {
      HTMLImports.parser.parse(container);
    });

    var addToHistory = opt_addToHistory == undefined ? true : opt_addToHistory;
    if (addToHistory) {
      history.pushState({url: url}, doc.title, url);
    } else {
      // Came from history pop. Adjust nav arrow position.
      // TODO: doesn't always move the arrow to the correct location. For the sake
      // of mitigating user confusion, don't move the arrow on a history pop.
      //docsMenu.highlightItemWithURL(location.pathname);
    }

    initPage(); // TODO: can't pass doc to this because prettyPrint() needs markup in dom.

    // Record page view in GA early on.
    exports._gaq.push(['_trackPageview', location.pathname]);

    exports.scrollTo(0, 0); // Ensure we're at the top of the page when it's ready.
  };

  xhr.send();
}

// Analytics
(function() {
  var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
  ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
  var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
})();

function initPage(opt_inDoc) {
  var doc = opt_inDoc || document;

  setupDownloadButtons(doc);
  addPermalinkHeadings(doc);

  // TODO: Use kramdown {:.prettyprint .linenums .lang-ruby} to add the
  // <pre class="prettyprint"> instead of doing this client-side.
  prettyPrintPage(doc);
}

$(document).ready(function() {
  initPage();

  document.querySelector('[data-twitter-follow]').addEventListener('click', function(e) {
    e.preventDefault();
    var target = e.target.localName != 'a' ? e.target.parentElement : e.target;
    exports.open(target.href, '', 'width=550,height=520');
  });
});

if (AJAXIFY_SITE) {
  docsMenu.ajaxify = true;

  document.addEventListener('click', function(e) {
    var viableLink = false;

    if (e.target.localName == docsMenu.localName && e.detail.link) {
      viableLink = e.detail.link;
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
      injectPage(e.state.url, false);
    }
  });

}

console && console.log("%cWelcome to Polymer!\n%cweb components are the <bees-knees>",
                       "font-size:1.5em;color:navy;", "color:#ffcc00;font-size:1em;");

})(window);

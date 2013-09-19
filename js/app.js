function addPermalink(el) {
  el.classList.add('has-permalink');
  el.insertAdjacentHTML('beforeend',
      '<a class="permalink" title="Permalink" href="#' + el.id + '">#</a>');
}

var _gaq = _gaq || [];
_gaq.push(['_setAccount', 'UA-39334307-1']);
_gaq.push(['_setSiteSpeedSampleRate', 50]);
_gaq.push(['_trackPageview']);

// Analytics
(function() {
  var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
  ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
  var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
})();

// Change "active" style on selected left-hand navigation menu item.
$(document).ready(function () {
  addPermalinkHeadings();

  // TODO: Use kramdown {:.prettyprint .linenums .lang-ruby} to add the
  // <pre class="prettyprint"> instead of doing this client-side.
  prettyPrintPage();

  document.querySelector('[data-twitter-follow]').addEventListener('click', function(e) {
    e.preventDefault();
    var target = e.target.localName != 'a' ? e.target.parentElement : e.target;
    window.open(target.href, '', 'width=550,height=520');
  });
});

(function() {
  var downloadButton = document.querySelector('.download a.btn');
  downloadButton && downloadButton.addEventListener('tap', function(e) {
    document.querySelector('#dialog').toggle();
    return false;
  });

  var downloadSDKLink = document.querySelector('#download_polymer_link');
  downloadSDKLink && downloadSDKLink.addEventListener('click', function(e) {
    _gaq.push(['_trackEvent', 'SDK', 'Download', '{{site.latest_version}}']);
  });
})();

// Placeholder for "loading screen"
// document.body.addEventListener('WebComponentsReady', function(e) {
//   e.target.classList.add('resolved');    
// });

// Add permalinks to heading elements.
function addPermalinkHeadings() {
  var permalinkEl = document.querySelector('.show-permalinks');
  if (permalinkEl) {
    ['h2','h3','h4'].forEach(function(h, i) {
      [].forEach.call(permalinkEl.querySelectorAll(h), addPermalink);
    });
  }
}

function prettyPrintPage() {
  [].forEach.call(document.querySelectorAll('pre'), function(pre, i) {
    pre.classList.add('prettyprint');
  });
  window.prettyPrint && prettyPrint();
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

document.addEventListener('click', function(e) {
  var viableLink = false;

  if (e.target.localName == 'docs-menu' && e.detail.link) {
    
    viableLink = e.detail.link;

  } else if (e.target.localName == 'a') {
    var relativeLinks = document.querySelectorAll('a:not([href^="http"]):not([href^="#"]):not([href^="javascript:"])');
    for (var i = 0, a; a = relativeLinks[i]; ++i) {
      if (e.target == a) {
        viableLink = e.target;
      }
    }
  }

  if (viableLink) {
    // if (history.pushState) {
    //   history.pushState({prevUrl: location.href}, document.title, location.href);
    // }

    injectPage(viableLink.href);

    e.preventDefault();
    e.stopPropagation();
    return false;
  }
});

window.addEventListener('popstate', function(e) {
console.log(e.state)
  if (e.state && e.state.url) {
    injectPage(e.state.url);
  }
});

function injectPage(url) {
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

    if (history.pushState) {
      history.pushState({url: url}, doc.title, url);
    }

    prettyPrintPage();
    addPermalinkHeadings();

    // TODO: record page hit in GA: _gaq.push(['_trackPageview', State.url]);
  };
  xhr.send();
}

console && console.log("%cWelcome to Polymer!\n%cweb components are the <bees-knees>",
                       "font-size:1.5em;color:navy;", "color:#ffcc00;font-size:1em;");

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
  var path = location.pathname;
  $('ul.nav > li > a[href="' + path + '"]').parent().addClass('active');

  // Add permalinks to heading elements.
  var permalinkEl = document.querySelector('.show-permalinks');
  if (permalinkEl) {
    ['h2','h3','h4'].forEach(function(h, i) {
      [].forEach.call(permalinkEl.querySelectorAll(h), addPermalink);
    });
  }

  // TODO: Use kramdown {:.prettyprint .linenums .lang-ruby} to add the
  // <pre class="prettyprint"> instead of doing this client-side.
  $('pre').addClass('prettyprint');
  window.prettyPrint && prettyPrint();

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

---
title: Browser compatibility
---

Polymer 1.0+ works in the _latest two versions_ of all major browsers: Safari 8+, IE 11+, and the
evergreen Chrome, Firefox, and Edge.

## Browser support

The Polymer library is a lightweight sugaring layer on top of the [Web Components
APIs](http://webcomponents.org/articles/why-web-components/). Unlike a typical javascript framework,
Polymer is designed to leverage features _baked into the web platform itself_ to let you build
components. Some features used by Polymer are not (yet) supported natively in all browsers. For
broad web components support, Polymer uses the [polyfills](http://webcomponents.org/polyfills/) from
[webcomponents.org](http://webcomponents.org). They're lightweight, work well, and provide the
feature support Polymer requires.

With the polyfills, Polymer works in these browsers:

<table>
<thead>
  <tr><th></th><th>Chrome</th><th>Firefox</th><th>IE&nbsp;11+/Edge</th><th>Safari 8+</th><th>Chrome
  (Android)</th><th>Safari (iOS&nbsp;8.1)</th></tr>
</thead>
<tr>
  <td class="feature-title"><a href="http://www.html5rocks.com/en/tutorials/webcomponents/template/">Template</a></td>
  <td>✅</td>
  <td>✅</td>
  <td>✅</td>
  <td>✅</td>
  <td>✅</td>
  <td>✅</td>
</tr>
<tr>
  <td class="feature-title"><a href="//www.polymer-project.org/platform/html-imports.html">HTML Imports</a></td>
  <td>✅</td>
  <td>✅</td>
  <td>✅</td>
  <td>✅</td>
  <td>✅</td>
  <td>✅</td>
</tr>
<tr>
  <td class="feature-title"><a href="//www.polymer-project.org/platform/custom-elements.html">Custom Elements</a></td>
  <td>✅</td>
  <td>✅</td>
  <td>✅</td>
  <td>✅</td>
  <td>✅</td>
  <td>✅</td>
</tr>
<tr>
  <td class="feature-title"><a href="//www.polymer-project.org/platform/shadow-dom.html">Shadow DOM</a></td>
  <td>✅</td>
  <td>✅</td>
  <td>✅</td>
  <td>✅</td>
  <td>✅</td>
  <td>✅</td>
</tr>
</table>

Notes:

-   Older versions of the Android Browser may run into some issues - please file an
    [issue](https://github.com/polymer/polymer/issues) if you run into a problem on this browser.
    Chrome for Android is supported.

-   We recommend conditionally loading the polyfills in your application: using the server or
    feature-detecting on the client whether the browser supports web components natively, and then
    only loading the polyfills if it doesn't.  An advantage of using standards-based features is the
    payload necessary to run your application will continue to decrease as browsers implement the
    standard. If you've installed the polyfills using
    `bower install --save webcomponents/webcomponentsjs`, here is some example code for how to
    feature-detect on the client:

    ```
    (function() {
      if ('registerElement' in document
          && 'import' in document.createElement('link')
          && 'content' in document.createElement('template')) {
        // platform is good!
      } else {
        // polyfill the platform!
        var e = document.createElement('script');
        e.src = '/bower_components/webcomponentsjs/webcomponents-lite.min.js';
        document.body.appendChild(e);
      }
    })();
    ```

#### Should I use webcomponents-lite.js or webcomponents.js?

We recommend using the `webcomponents-lite.js` version of the polyfills with Polymer 1.0+. This
version uses [Shady DOM](https://www.polymer-project.org/1.0/blog/shadydom.html).

Although the full `webcomponents.js` polyfill works with Polymer 1.0+, we do not recommend using it.
This version contains the full Shadow DOM polyfill, which is known to have performance overhead.

**See** the webcomponents.js [compatibility matrix](https://github.com/WebComponents/webcomponentsjs#browser-support) for more details on support.
{: .alert .alert-info }

#### Other features used by Polymer or the elements

IE 10 has flaky Mutation Observer support, and is also largely [no longer supported by
Microsoft](https://www.microsoft.com/en-us/WindowsForBusiness/End-of-IE-support). Much of Polymer
will still work, but you may run into some bugs here and there. "Official" support is for IE
11/Edge.

## Progress of native browser support

As of 2016-05, there has been broad cross-browser agreement around the v1 versions of the [Custom
Elements](https://w3c.github.io/webcomponents/spec/custom/) and [Shadow
DOM](https://w3c.github.io/webcomponents/spec/shadow/) APIs, and many implementations are well
underway in major browsers.

Polymer currently relies on the v0 implementations of these APIs, which are also supported by the
web components polyfills. Polymer will begin transitioning to these v1 APIs very soon. Components
built with the current version of Polymer will still work even when browsers support v1 APIs
natively, but will require the v0 polyfills. Upgrading components built with Polymer from the v0
APIs to v1 will be relatively straightforward, as Polymer already provides light abstractions over
some of the more low-level, spec-specific details and will be able to handle the transition under
the hood.

**See** [Are We Componentized Yet?](http://jonrimmer.github.io/are-we-componentized-yet/) and
[caniuse.com](http://caniuse.com/) for more information on native browser support for web
components.
{: .alert .alert-info }

Notes:

-   Chrome natively implements the v0 APIs, and work is underway on the v1 APIs.

-   WebKit Nightly has a working implementation of Shadow DOM v1.

-   Edge has on its backlog to support [Shadow
    DOM v1](https://wpdev.uservoice.com/forums/257854-microsoft-edge-developer/suggestions/6263785-shadow-dom-unprefixed)
    and [Custom Elements v1](https://wpdev.uservoice.com/forums/257854-microsoft-edge-developer/suggestions/6261298-custom-elements).

-   Firefox currently supports some of the v0 web component APIs behind a flag. Polymer
    **does not work correctly** with this flag enabled, because of an incompatibility with the web
    components polyfills.

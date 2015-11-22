---
layout: default
type: guide
shortname: Resources
title: Browser Compatibility
---

> **{{site.project_title}} 1.0 works in all _latest version_ "evergreen" browsers (Chrome, Firefox, IE, Opera, and Safari)**.

---

## Browser support

The features used by {{site.project_title}} are not (yet) supported natively in 
all browsers. For web components support, {{site.project_title}}
uses the [polyfills](http://webcomponents.org/polyfills/) from [webcomponents.js](http://webcomponents.org). They're lightweight, work well, and provide the feature support {{site.project_title}} requires.

With the polyfills, {{site.project_title}} works in these browsers:

<table>
<thead>
  <tr><th></th><th>Chrome</th><th>Firefox</th><th>IE&nbsp;10+/Edge</th><th>Safari 8+</th><th>Chrome (Android)</th><th>Safari (iOS&nbsp;8.1)</th></tr>
</thead>
<tr>
  <td class="feature-title"><a href="http://www.html5rocks.com/en/tutorials/webcomponents/template/">Template</a></td>
  <td><paper-checkbox checked></paper-checkbox></td>
  <td><paper-checkbox checked></paper-checkbox></td>
  <td><paper-checkbox checked></paper-checkbox></td>
  <td><paper-checkbox checked></paper-checkbox></td>
  <td><paper-checkbox checked></paper-checkbox></td>
  <td><paper-checkbox checked></paper-checkbox></td>
</tr>
<tr>
  <td class="feature-title"><a href="//www.polymer-project.org/platform/html-imports.html">HTML Imports</a></td>
  <td><paper-checkbox checked></paper-checkbox></td>
  <td><paper-checkbox checked></paper-checkbox></td>
  <td><paper-checkbox checked></paper-checkbox></td>
  <td><paper-checkbox checked></paper-checkbox></td>
  <td><paper-checkbox checked></paper-checkbox></td>
  <td><paper-checkbox checked></paper-checkbox></td>
</tr>
<tr>
  <td class="feature-title"><a href="//www.polymer-project.org/platform/custom-elements.html">Custom Elements</a></td>
  <td><paper-checkbox checked></paper-checkbox></td>
  <td><paper-checkbox checked></paper-checkbox></td>
  <td><paper-checkbox checked></paper-checkbox></td>
  <td><paper-checkbox checked></paper-checkbox></td>
  <td><paper-checkbox checked></paper-checkbox></td>
  <td><paper-checkbox checked></paper-checkbox></td>
</tr>
<tr>
  <td class="feature-title"><a href="//www.polymer-project.org/platform/shadow-dom.html">Shadow DOM</a></td>
  <td><paper-checkbox checked></paper-checkbox></td>
  <td><paper-checkbox checked></paper-checkbox></td>
  <td><paper-checkbox checked></paper-checkbox></td>
  <td><paper-checkbox checked></paper-checkbox></td>
  <td><paper-checkbox checked></paper-checkbox></td>
  <td><paper-checkbox checked></paper-checkbox></td>
</tr>
</table>

Notes:

- **Android Browser is not supported**. Chrome for Android is supported.


#### Should I use webcomponents-lite.js or webcomponents.js?

We recommend using the `webcomponents-lite.js` version of the polyfills with {{site.project_title}} 1.0. This version uses [Shady DOM](https://www.polymer-project.org/1.0/articles/shadydom.html).

Although the full `webcomponents.js` polyfill works with {{site.project_title}} 1.0,
we do not recommend using it. This version contains the full Shadow DOM polyfill,
which is known to have performance overhead.

**See** the webcomponents.js [compatibility matrix](https://github.com/WebComponents/webcomponentsjs#browser-support) for more details on support.
{: .alert .alert-info }

#### Other features used by Polymer or the elements

In addition to the web component standards, {{site.project_title}} uses these other
new web platform features which are covered by polyfills:

<table>
<thead>
  <tr><th></th><th>Chrome</th><th>Firefox</th><th>IE 11/Edge+*</th><th>Safari 8+</th><th>Chrome (Android)</th><th>Safari (iOS 8.1)</th></tr>
</thead>
<tr>
  <td class="feature-title">Mutation Observers</td>
  <td><paper-checkbox checked></paper-checkbox></td>
   <td><paper-checkbox checked></paper-checkbox></td>
  <td><paper-checkbox checked></paper-checkbox></td>
  <td><paper-checkbox checked></paper-checkbox></td>
  <td><paper-checkbox checked></paper-checkbox></td>
  <td><paper-checkbox checked></paper-checkbox></td>
</tr>
<tr>
  <td class="feature-title"><a href="https://github.com/web-animations/web-animations-js">Web Animations polyfill</a></td>
  <td><paper-checkbox checked></paper-checkbox></td>
  <td><paper-checkbox checked></paper-checkbox></td>
  <td><paper-checkbox checked></paper-checkbox></td>
  <td><paper-checkbox checked></paper-checkbox></td>
  <td><paper-checkbox checked></paper-checkbox></td>
  <td><paper-checkbox checked></paper-checkbox></td>
</tr>
</table>

Notes:

- IE 10 has flaky Mutation Observer support. We recommend IE 11/Edge.

## Progress of native browser support

As of 2015-11-03, Chrome is the only browser to support all of the web components APIs
natively. However, the landscape is changing quickly. Other browsers are implementing
Shadow DOM v1 and/or have implementations behind runtime flags. 

**See** [Are We Componentized Yet?](http://jonrimmer.github.io/are-we-componentized-yet/)
and [caniuse.com](http://caniuse.com/) for more information on native browser support for web components.
{: .alert .alert-info }

Notes:

- WebKit Nightly has a working implementation of Shadow DOM v1.
- Firefox currently supports some of the web component APIs behind a flag. {{site.project_title}} 
**does not work correctly** with this flag enabled, because of an incompatibility with the web components polyfills. Also, although currently implemented behind a flag, Mozilla has [no plans to implement HTML Imports](https://developer.mozilla.org/en-US/docs/Web/Web_Components/HTML_Imports) at this time.

#### Other features

<table>
<thead>
  <tr><th></th><th>Chrome</th><th>Firefox</th><th>IE 11/Edge+*</th><th>Safari 8+</th><th>Chrome (Android)</th><th>Safari (iOS 8.1)</th></tr>
</thead>
<tr>
  <td class="feature-title">Mutation Observers</td>
  <td><paper-checkbox checked></paper-checkbox></td>
   <td><paper-checkbox checked></paper-checkbox></td>
  <td><paper-checkbox checked></paper-checkbox></td>
  <td><paper-checkbox checked></paper-checkbox></td>
  <td><paper-checkbox checked></paper-checkbox></td>
  <td><paper-checkbox checked></paper-checkbox></td>
</tr>
<tr>
  <td class="feature-title">Web Animations</td>
  <td><paper-checkbox checked></paper-checkbox></td>
  <td><paper-checkbox disabled></paper-checkbox></td>
  <td><paper-checkbox disabled></paper-checkbox></td>
  <td><paper-checkbox disabled></paper-checkbox></td>
  <td><paper-checkbox checked></paper-checkbox></td>
  <td><paper-checkbox disabled></paper-checkbox></td>
</tr>
</table>

**Note:** {{site.project_title}} 1.0 **does not** use `Object.observe`, which was used
by {{site.prject_title}} 0.5 and earlier.
{: .alert .alert-info }


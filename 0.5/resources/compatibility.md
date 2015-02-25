---
layout: default
type: guide
shortname: Resources
title: Browser Compatibility
---

Unlike other frameworks, **{{site.project_title}} and its polyfills are intended to work in the _latest
version_ of "evergreen" browsers**. This means that your favorite browser might not be supported. For more about what that means in practice, check out the [FAQ](faq.html#browsersupport). The support matrix for each polyfill and their
native browser implementation is below.

## Native browser support

<table>
<thead>
  <tr><th></th><th>Chrome</th><th>Firefox</th><th>IE 10+</th><th>Safari 8+</th><th>Chrome (Android)</th><th>Safari (iOS 8.1)</th></tr>
</thead>
<tr>
  <td class="feature-title"><a href="//www.html5rocks.com/en/tutorials/webcomponents/template/">Template</a></td>
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
  <td>dev flag*</td>
  <td><paper-checkbox disabled></paper-checkbox></td>
  <td><paper-checkbox disabled></paper-checkbox></td>
  <td><paper-checkbox disabled></paper-checkbox></td>
  <td><paper-checkbox disabled></paper-checkbox></td>
</tr>
<tr>
  <td class="feature-title"><a href="//www.polymer-project.org/platform/custom-elements.html">Custom Elements</a></td>
  <td><paper-checkbox checked></paper-checkbox></td>
  <td>dev flag</td>
  <td><paper-checkbox disabled></paper-checkbox></td>
  <td><paper-checkbox disabled></paper-checkbox></td>
  <td><paper-checkbox checked></paper-checkbox></td>
  <td><paper-checkbox disabled></paper-checkbox></td>
</tr>
<tr>
  <td class="feature-title"><a href="//www.polymer-project.org/platform/shadow-dom.html">Shadow DOM</a></td>
  <td><paper-checkbox checked></paper-checkbox></td>
  <td>dev flag</td>
  <td><paper-checkbox disabled></paper-checkbox></td>
  <td><paper-checkbox disabled></paper-checkbox></td>
  <td><paper-checkbox checked></paper-checkbox></td>
  <td><paper-checkbox disabled></paper-checkbox></td>
</tr>
</table>

<small>*Mozilla <a href="https://hacks.mozilla.org/2014/12/mozilla-and-web-components/">announced</a> they will not ship an implementation of HTML Imports.</small>

<p>Also see <a href="http://caniuse.com/">caniuse.com</a> and <a href="http://jonrimmer.github.io/are-we-componentized-yet/">Are We Componentized Yet?</a> for up to date information on native support.</p>

### Other APIs

In addition to the main web components APIs, Polymer uses other new platform features:

<table>
<thead>
  <tr><th></th><th>Chrome</th><th>Firefox</th><th>IE 11+</th><th>Safari 8+</th><th>Chrome (Android)</th><th>Safari (iOS 8.1)</th></tr>
</thead>
<tr>
  <td class="feature-title"><code>Object.observe()</code></td>
  <td><paper-checkbox checked></paper-checkbox></td>
  <td><paper-checkbox disabled></paper-checkbox></td>
  <td><paper-checkbox disabled></paper-checkbox></td>
  <td><paper-checkbox disabled></paper-checkbox></td>
  <td><paper-checkbox disabled></paper-checkbox></td>
  <td><paper-checkbox disabled></paper-checkbox></td>
</tr>
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
  <td class="feature-title">Web Animations API</td>
  <td><paper-checkbox checked></paper-checkbox></td>
  <td><paper-checkbox disabled></paper-checkbox></td>
  <td><paper-checkbox disabled></paper-checkbox></td>
  <td><paper-checkbox disabled></paper-checkbox></td>
  <td><paper-checkbox checked></paper-checkbox></td>
  <td><paper-checkbox disabled></paper-checkbox></td>
</tr>
</table>

## Polyfill browser support

<p>Polymer uses the <a href="https://github.com/WebComponents/webcomponentsjs">webcomponents.js polfyills</a> that work in the latest versions of evergreen browsers. See the <a href="https://github.com/WebComponents/webcomponentsjs#browser-support">compatibility maxtrix</a> for more details.</p>

<!-- <iframe src="https://docs.google.com/spreadsheet/pub?key=0Anye-JMjUkZZdDdoblh6dTlwcWRLQkhKbTVzdHJtcXc&single=true&gid=2&output=html&range=A1:Q43" seamless style="border:none;width:100%;height:830px;"></iframe> -->

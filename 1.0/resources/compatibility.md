---
layout: default
type: guide
shortname: Resources
title: Browser Compatibility
---

Unlike other frameworks, **{{site.project_title}} is intended to work in the _latest
version_ of "evergreen" browsers**. That is, Chrome, Firefox, IE, Opera and Safari. 
This means that your favorite browser might not be supported. 

The features required by {{site.project_title}} are not supported natively in 
all of the evergreen browsers, but a set of web components polyfills are available
that **do** run in the evergreen browsers and provide the support {{site.project_title}}
requires.

## Native browser support

<table>
<thead>
  <tr><th></th><th>Chrome</th><th>Firefox</th><th>IE&nbsp;10+*</th><th>Safari 8+</th><th>Chrome (Android)</th><th>Safari (iOS&nbsp;8.1)</th></tr>
</thead>
<tr>
  <td class="feature-title"><a href="http://www.html5rocks.com/en/tutorials/webcomponents/template/">Template</a></td>
  <td><paper-checkbox checked></paper-checkbox></td>
  <td><paper-checkbox checked></paper-checkbox></td>
  <td><paper-checkbox disabled></paper-checkbox></td>
  <td><paper-checkbox checked></paper-checkbox></td>
  <td><paper-checkbox checked></paper-checkbox></td>
  <td><paper-checkbox checked></paper-checkbox></td>
</tr>
<tr>
  <td class="feature-title"><a href="//www.polymer-project.org/platform/html-imports.html">HTML Imports</a></td>
  <td><paper-checkbox checked></paper-checkbox></td>
  <td>dev flag **</td>
  <td><paper-checkbox disabled></paper-checkbox></td>
  <td><paper-checkbox disabled></paper-checkbox></td>
  <td><paper-checkbox checked></paper-checkbox></td>
  <td><paper-checkbox disabled></paper-checkbox></td>
</tr>
<tr>
  <td class="feature-title"><a href="//www.polymer-project.org/platform/custom-elements.html">Custom Elements</a></td>
  <td><paper-checkbox checked></paper-checkbox></td>
  <td>dev flag **</td>
  <td><paper-checkbox disabled></paper-checkbox></td>
  <td><paper-checkbox disabled></paper-checkbox></td>
  <td><paper-checkbox checked></paper-checkbox></td>
  <td><paper-checkbox disabled></paper-checkbox></td>
</tr>
<tr>
  <td class="feature-title"><a href="//www.polymer-project.org/platform/shadow-dom.html">Shadow DOM</a></td>
  <td><paper-checkbox checked></paper-checkbox></td>
  <td>dev flag **</td>
  <td><paper-checkbox disabled></paper-checkbox></td>
  <td><paper-checkbox disabled></paper-checkbox></td>
  <td><paper-checkbox checked></paper-checkbox></td>
  <td><paper-checkbox disabled></paper-checkbox></td>
</tr>
</table>

<p>
<small>* Includes Edge</small>
</p>

<p>
<small>** Firefox currently supports some of the web components behind a flag. {{site.project_title}} 
<strong>does not work correctly</strong> with this flag enabled, because of an incompatibility with the web components
polyfills. Also, although currently implemented behind a flag, Mozilla 
<a href="https://hacks.mozilla.org/2014/12/mozilla-and-web-components/">announced</a> they will not ship 
an implementation of HTML Imports.</small>
</p>

<p>Also see <a href="http://caniuse.com/">caniuse.com</a> and <a href="http://jonrimmer.github.io/are-we-componentized-yet/">Are We Componentized Yet?</a> for up to date information on native support.</p>

### Other APIs

In addition to the main web components APIs, Polymer uses other new platform features:

<table>
<thead>
  <tr><th></th><th>Chrome</th><th>Firefox</th><th>IE 11+*</th><th>Safari 8+</th><th>Chrome (Android)</th><th>Safari (iOS 8.1)</th></tr>
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
  <td class="feature-title">Web Animations API</td>
  <td><paper-checkbox checked></paper-checkbox></td>
  <td><paper-checkbox disabled></paper-checkbox></td>
  <td><paper-checkbox disabled></paper-checkbox></td>
  <td><paper-checkbox disabled></paper-checkbox></td>
  <td><paper-checkbox checked></paper-checkbox></td>
  <td><paper-checkbox disabled></paper-checkbox></td>
</tr>
</table>

<p>
<small>* Includes Edge</small>
</p>

**Note:** {{site.project_title}} 1.0 **does not** use `Object.observe`, which was used
by {{site.prject_title}} 0.5 and earlier.
{: .alert .alert-info }

## Polyfill browser support

<p>Polymer uses the <a href="https://github.com/WebComponents/webcomponentsjs">webcomponents.js polyfills</a> that work in the latest versions of evergreen browsers. See the <a href="https://github.com/WebComponents/webcomponentsjs#browser-support">compatibility matrix</a> for more details.</p>

<p>
{{site.project_title}} 1.0 requires the <code>webcomponents-lite.js</code> version of the polyfills.
It can also be used with the full <code>webcomponents.js</code> polyfill, which includes the shadow DOM polyfill,
but this is not recommended, because of performance concerns with the shadow DOM polyfill.
</p>

<!-- <iframe src="https://docs.google.com/spreadsheet/pub?key=0Anye-JMjUkZZdDdoblh6dTlwcWRLQkhKbTVzdHJtcXc&single=true&gid=2&output=html&range=A1:Q43" seamless style="border:none;width:100%;height:830px;"></iframe> -->

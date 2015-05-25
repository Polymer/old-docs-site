---
layout: default
type: start
shortname: Start
title: "Step 1: Creating the app structure"
subtitle: Your first Polymer application
---

<link rel="import" href="../../../elements/side-by-side.html">

<link rel="stylesheet" href="tutorial.css">

{% include toc.html %}

## Step 1: Creating the app structure

In this step, you'll use some pre-built Polymer elements to create the basic application structure, with a toolbar and tabs.

In this step, you'll learn about:

-   Using HTML imports.
-   Using {{site.project_title}} elements with standard HTML, CSS and JavaScript.

### Edit index.html


Go to the `starter` directory and open the `index.html` file in your favorite editor. The starting file looks like this:

<side-by-side>
<pre>
&lt;!doctype html>
&lt;html>

&lt;head>

  &lt;title>unquote&lt;/title>

  &lt;meta name="viewport"
    content="width=device-width, minimum-scale=1.0, initial-scale=1.0, user-scalable=yes">

  &lt;script src="../components/webcomponentsjs/webcomponents.js">
  &lt;/script>

  &lt;link rel="import"
    href="../components/font-roboto/roboto.html">
  ...
</pre>
<aside>
  <h4>Key information</h4>
  <ul>
    <li>This bare-bones file defines some styles and embeds the <code>webcomponents.js</code> script, which supplies any missing platform features.</li>
    <li>The <code>link rel="import"</code> element is an <em>HTML import</em>, a new way of including resources into an HTML file.</li>
  </ul>
</aside>
</side-by-side>

**Note:** The `font-roboto` import loads the `RobotoDraft` font using the
[Google Fonts API](https://developers.google.com/fonts/). If you're working
offline or cannot access the Google Fonts API for any reason, this can block
rendering of the web page. If you experience this problem, comment out the
import for `font-roboto`.
{: .alert .alert-info }


Skipping over the styles for now, at the end of the file you'll find something new:

<side-by-side>
<pre>
...
&lt;body unresolved>

&lt;/body>
...
</pre>
<aside>
  <h4>Key information</h4>
  <ul>
    <li>The <code>unresolved</code> attribute on the <code>&lt;body></code> element is used to prevent a flash of unstyled content
        (FOUC) on browsers that lack native support for custom elements. For details, see the
        <a href="../../polymer/styling.html#fouc-prevention">Polymer styling reference</a>.</li>
  </ul>
</aside>
</side-by-side>

<div class="divider" layout horizontal center center-justified>
  <core-icon icon="polymer"></core-icon>
</div>

Add HTML import links to import the `<core-header-panel>`, `<core-toolbar>`, and `<paper-tabs>` elements:

<side-by-side>
<pre>
&lt;script
  src="../components/webcomponentsjs/webcomponents.js">
&lt;/script>

&lt;link rel="import"
  href="../components/font-roboto/roboto.html">
<strong class="highlight nocode">&lt;link rel="import"
  href="../components/core-header-panel/core-header-panel.html">
&lt;link rel="import"
  href="../components/core-toolbar/core-toolbar.html">
&lt;link rel="import"
  href="../components/paper-tabs/paper-tabs.html"></strong>
&lt;style>
</pre>
  <aside>
    <h4>Key information</h4>
    <ul>
      <li>
        Polymer uses <a href="../../../platform/html-imports.html">HTML imports</a> to load components.
        HTML imports provide dependency management, ensuring that your elements and all of their dependencies are loaded
        before you use them.
      </li>
      <li>
        Throughout this tutorial, the code you need to add appears in <code><strong class="highlight nocode">bold black text</strong></code>.
      </li>
    </ul>
  </aside>
</side-by-side>

<div class="divider" layout horizontal center center-justified>
  <core-icon icon="polymer"></core-icon>
</div>

To add a toolbar, add the following code inside the `<body>` tag.

<side-by-side>
<pre>
<strong class="highlight nocode">&lt;core-header-panel>

  &lt;core-toolbar>
  &lt;/core-toolbar>

  &lt;!-- main page content will go here -->

&lt;/core-header-panel></strong>
</pre>
  <aside>
    <h4>Key information</h4>

    <ul>
      <li>The
          <code><a href="../../elements/core-header-panel.html">&lt;core-header-panel&gt;</a></code>
          element is a simple container that holds a
          header (in this case a <code>&lt;core-toolbar></code> element), and some content. By
          default, the header stays at the top of the screen, but it can also be
          set to scroll with the content.</li>
      <li>The <code><a href="../../elements/core-toolbar.html">&lt;core-toolbar></a></code> element serves
          as a container for tabs, menu buttons, and other controls.</li>
    </ul>
  </aside>
</side-by-side>

<div class="divider" layout horizontal center center-justified>
  <core-icon icon="polymer"></core-icon>
</div>

Add the tabs.

The application will use tabs for navigating between two different views,
a list of all messages and a list of favorites. The
<code><a href="../../elements/paper-tabs.html">&lt;paper-tabs&gt;</a></code>
element works much like a `<select>` element, but it's styled as a set of
tabs.

<side-by-side>
<pre>
...
&lt;core-toolbar>

  <strong class="highlight nocode">&lt;paper-tabs id="tabs" selected="all" self-end>
    &lt;paper-tab name="all">All&lt;/paper-tab>
    &lt;paper-tab name="favorites">Favorites&lt;/paper-tab>
  &lt;/paper-tabs></strong>

&lt;/core-toolbar>
...
</pre>
  <aside>
    <h4>Key information</h4>
    <ul>
      <li>
        <code>&lt;paper-tabs></code> identifies the selected child by its name
        value or its index value.
      </li>
      <li>
        <code>selected="all"</code> chooses the first tab with a matching `name` attribute 
        as the initially selected tab. See the 
        <code><a href="../../elements/core-selector.html#core-selector.attributes.valueattr">&lt;core-selector&gt; docs</a></code>.
      </li>
      <li>In this case, the children are <code>&lt;paper-tab></code> elements, which provide
         styling and the "ink ripple" animation when you touch a tab.
      </li>
      <li>
        <code>self-end</code> is a
        <a href="../../polymer/layout-attrs.html">layout attribute</a>.
      </li>

    </ul>
  </aside>
</side-by-side>

<div class="divider" layout horizontal center center-justified>
  <core-icon icon="polymer"></core-icon>
</div>

Add styles for the new elements. Add the following CSS rules inside the `<style>` element.

<side-by-side>
<pre>
html,body {
  height: 100%;
  margin: 0;
  background-color: #E5E5E5;
  font-family: 'RobotoDraft', sans-serif;
}
<strong class="highlight nocode">core-header-panel {
  height: 100%;
  overflow: auto;
  -webkit-overflow-scrolling: touch;
}
core-toolbar {
  background: #03a9f4;
  color: white;
}
#tabs {
  width: 100%;
  margin: 0;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  text-transform: uppercase;
}</strong>
</pre>
<aside>
  <h4>Key information</h4>
  <ul>
    <li>The <code>&lt;core-header-panel&gt;</code> is a generic element that can be used as either a
        full-page layout or for a card with a toolbar. To use it as a full-page, scrollable container,
        set its height explicitly. </li>
    <li>Here, the height is set to 100%. This works because the existing style rules ensure that its
        parent elements,
        <code>&lt;html&gt;</code> and <code>&lt;body&gt;</code>, take up 100% of the viewport height.</li>
    <li>The <code>overflow</code> and <code>-webkit-overflow-scrolling</code> properties ensure that
        scrolling works smoothly on touch devices, especially iOS.</li>
    <li>The <code>#tabs</code> selector selects the <code>&lt;paper-tabs&gt;</code> element. The toolbar adds a default margin on its children, to space controls appropriately. The tabs don't need this extra spacing.</li>
    <li>The <code>user-select</code> properties prevent the user from accidentally selecting the tab text.</li>
  </ul>
</aside>
</side-by-side>

<div class="divider" layout horizontal center center-justified>
  <core-icon icon="polymer"></core-icon>
</div>

Add a `<script>` tag near the end of the file to handle the tab switching
    event.


<side-by-side>
<pre>
<strong class="highlight nocode">&lt;script>
  var tabs = document.querySelector('paper-tabs');

  tabs.addEventListener('core-select', function() {
    console.log("Selected: " + tabs.selected);
  });
&lt;/script>
</strong>&lt;/body>
</pre>
  <aside>
    <h4>Key information</h4>
    <ul>
      <li>
        The <code>&lt;paper-tabs></code> element fires a <code>core-select</code> event when you select a
        tab. You can interact with the element just like a built-in element.
      </li>
      <li>
        Right now there's nothing to switch; you'll finish hooking it up later.
      </li>
    </ul>
  </aside>
</side-by-side>


Save the file and open the project in your browser (for example, [http://localhost:8000/starter/](http://localhost:8000/starter/)). You have a Polymer app!


<div layout vertical center>
  <img class="sample" src="/images/tutorial/step-1.png">
</div>

**Note:** If you have the console open, you'll notice that you get two `core-select`
events each time you switch tabs &mdash; one for the previously-selected tab and one
for the newly-selected tab. The `<paper-tabs>` element inherits this behavior from <code><a href="../../elements/core-selector.html">&lt;core-selector&gt;</a></code>, which supports
both single and multiple selections.
{: .alert .alert-info }

If something isn't working, check your work against the `index.html` file in the `step-1` folder:

-   [`index.html`](https://github.com/Polymer/polymer-tutorial/blob/master/step-1/index.html)

In this step, you used HTML imports to import custom elements, and used them to create a simple app layout.

**Explore:** Can you use other children inside the `<paper-tabs>`? Try an image or a text span.
{: .alert .alert-info }

<div layout horizontal justified class="stepnav">
<a href="intro.html">
  <paper-button><core-icon icon="arrow-back"></core-icon>Getting Started</paper-button>
</a>
<a href="step-2.html">
  <paper-button raised><core-icon icon="arrow-forward"></core-icon>Step 2: Creating your own element</paper-button>
</a>
</div>

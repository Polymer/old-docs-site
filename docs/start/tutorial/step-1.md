---
layout: default
type: start
navgroup: docs
shortname: Start
title: "Step 1: Creating the app structure"
subtitle: Your first Polymer application 
---

<link rel="import" href="/elements/side-by-side.html">

<style>
.running-app-frame {
    border: 1px solid #000;
    padding: 0px;
}
pre {
  font-size: 13px !important;
  border: 1px solid #eaeaea !important;
  padding 5px !important;
  margin: 0 0 0 20px !important;
}
</style>

{% include toc.html %}

## Step 1: Creating the app structure

In this step, you'll use some pre-built Polymer elements to create the basic application structure, with a toolbar and tabs.


### Edit index.html


Go to the `unquote` directory and open the `index.html` file in your favorite editor. The starting file looks like this:

<side-by-side>
<pre>
&lt;!doctype html>
&lt;html>

&lt;head>
  &lt;title>unquote&lt;/title>
  &lt;meta name="viewport" 
    content="width=device-width, minimum-scale=1.0, initial-scale=1.0, user-scalable=yes">
  &lt;script src="../components/platform/platform.js">
  &lt;/script>

  &lt;link rel="import" 
    href="../components/font-roboto2/roboto2.html">
  ...
</pre>
<aside>
  <h4>Key information</h4>
  <ul>
    <li>This bare-bones file defines some styles and embeds the <code>platform.js</code> script, which supplies any missing platform features.</li>
    <li>The <code>link rel="import"</code> element is an <em>HTML Import</em>, a new way of including resources into an HTML file.</li>
  </ul>
</aside>
</side-by-side>

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
        <a href="http://www.polymer-project.org/docs/polymer/styling.html#fouc-prevention">Polymer styling reference</a>.</li>
  </ul>
</aside>
</side-by-side>

----

Add an HTML import links to import the `<core-header-panel>`, `<core-toolbar>`, and `<paper-tabs>` elements:

<side-by-side>
  <pre>
  &lt;script 
    src="../components/platform/platform.js"></script>
  &lt;link rel="import" 
    href="../components/font-roboto2/roboto2.html">

  <strong>&lt;link rel="import"
    href="../components/core-header-panel/core-header-panel.html">
  &lt;link rel="import"
    href="../components/core-toolbar/core-toolbar.html">
  &lt;link rel="import"
    href="../components/paper-tabs/paper-tabs.html"></strong>
&lt;/head>
  </pre>
  <aside>
    <h4>Key information</h4>
    <ul>
      <li>
        Polymer uses <a href="http://www.polymer-project.org/platform/html-imports.html">HTML imports</a> to load components.
        HTML imports provide dependency management, ensuring that your elements and all of their dependencies are loaded 
        before you use them.
      </li>
    </ul>
  </aside>
</side-by-side>

----

To add a toolbar, add the following code inside the `<body>` tag.
 
<side-by-side>
  <pre>
  <strong>&lt;core-header-panel>
      
    &lt;core-toolbar>
    &lt;/core-toolbar>

    &lt;!-- main page content will go here --> 

  &lt;/core-header-panel></strong>
  </pre>
  <aside>
    <h4>Key information</h4>

    <ul>
      <li>The 
          <a href="http://www.polymer-project.org/components/core-docs/index.html#core-header-panel">
            <code>&lt;core-header-panel></code>
          </a>
          element is a 
          simple container that holds a 
          header (in this case a <code>&lt;core-toolbar></code> element), and some content. By 
          default, the header stays at the top of the screen, but it can also be 
          set to scroll with the content.</li>
      <li>The <a href="http://www.polymer-project.org/components/core-docs/index.html#core-toolbar"><code>&lt;core-toolbar></code></a> serves 
          as a container for tabs, menu buttons, and other controls.</li>
    </ul>
  </aside>
</side-by-side>

----

Add the tabs.

The application will use tabs for navigating between two different views, 
a list of all messages and a list of favorites. The `<paper-tabs>`   
element works much like a `<select>` element, but it's styled as a set of 
tabs.

<side-by-side>
  <pre>
  &lt;core-header-panel>
      
    &lt;core-toolbar>

      <strong>&lt;paper-tabs valueattr="name" selected="all" self-end>
        &lt;paper-tab name="all">ALL&lt;/paper-tab>
        &lt;paper-tab name="favorites">FAVORITES&lt;/paper-tab>
      &lt;/paper-tabs></strong>

    &lt;/core-toolbar>

  &lt;/core-header-panel>
  </pre>
  <aside>
    <h4>Key information</h4>
    <ul>
      <li>
        By default, <code>&lt;paper-tabs></code> identifies the selected child by its index 
        value. <code>valueattr="name"</code> specifies that it should identify its 
        children using their </code>name</code> attribute.
      </li>
      <li>
        <code>selected="all"</code> chooses the first tab as the initially selected tab.</li>
    <li>In this case, the children are <code>&lt;paper-tab></code> elements, which provide
         styling and the "ink ripple" animation when you touch a tab.</li>    
    </ul>
  </aside>
</side-by-side>

---- 

Add a `<script>` tag at the end of the file to handle the tab switching
    event.


<side-by-side>
  <pre>
  <strong>&lt;script>
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


Save the file and open the project in your browser (for example, `http://localhost:8000/unquote`). You have a Polymer app! 

  <iframe class="running-app-frame" width="480" height="320" src="/samples/tutorial/step-1/index.html">
  </iframe>

If something isn't working, check your work against the `index.html` file in the `step-1` folder:

-   [`index.html`](https://github.com/Polymer/polymer-tutorial/blob/master/step-1/index.html)

In this step, you used HTML imports to import custom elements, and used them to create a simple app layout.

**Explore:** Can you use other children inside the `<paper-tabs>`? Try an image or a text span!
{: .alert .alert-info }

### Next

<a href="/docs/start/tutorial/step-2.html">
  <paper-button icon="arrow-forward" label="Step 2: Your own element" raisedButton></paper-button>
</a>


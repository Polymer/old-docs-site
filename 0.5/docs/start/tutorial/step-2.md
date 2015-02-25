---
layout: default
type: start
navgroup: docs
shortname: Start
title: "Step 2: Creating your own element"
subtitle: Your first Polymer application
---

<link rel="import" href="../../../elements/side-by-side.html">

<link rel="stylesheet" href="tutorial.css">

{% include toc.html %}


## Step 2: Your own element

Now that you have a basic application structure, you can start building a card element to display a post. The finished card includes space for a profile picture, name, favorite button, and a content area.

<div layout vertical center>
  <img class="sample" src="/images/tutorial/card.png">
</div>

In this step, you'll create a `<post-card>` element that controls the layout and styling of its children, so you can create a card like the one above using simple markup like this:

    <post-card>
      <img src="profile-picture.png">
      <h2>A Developer</h2>
      <p>
        Just getting started with Polymer.<br>
        Feels like the future!
      </p>
    </post-card>

In this step, you'll learn about:

-   Creating a custom element using Polymer.
-   Working with shadow DOM.

<aside class="alert alert-info">
<p><b>Learn more:</b>Shadow DOM provides you a way to add a local DOM tree
inside a DOM element, with local styles and markup that are decoupled from the rest of the web page.</p>
<p>To learn more about shadow DOM, see the <a href="../../platform/shadow-dom.html">
Shadow DOM polyfill docs</a>.</p>
</aside>

### Edit post-card.html

Open `post-card.html` in your editor. This file contains the skeleton of a
custom element, starting with some imports:

<side-by-side>
<pre>
&lt;link rel="import"
  href="../components/polymer/polymer.html">
&lt;link rel="import"
  href="../components/core-icon-button/core-icon-button.html">
...
</pre>
<aside>
<h4>Key information</h4>

<ul>
<li>As in the previous step, <code>&lt;link rel="import"&gt;</code> is used to import
    elements the <code>post-card</code> element relies on.</li>

</ul>
</aside>
</side-by-side>

Next is the definition of the element itself:

<side-by-side>
<pre>
&lt;polymer-element name="post-card">
  &lt;template>
    &lt;style>
    :host {
      display: block;
      position: relative;
      background-color: white;
      padding: 20px;
      width: 100%;
      font-size: 1.2rem;
      font-weight: 300;
    }
    .card-header {
      margin-bottom: 10px;
    }
    &lt;/style>

    &lt;!-- CARD CONTENTS GO HERE -->
  &lt;/template>
  ...
</pre>
<aside>
<h4>Key information</h4>

<ul><li>The <code>&lt;polymer-element&gt;</code> element is how you define a new custom
    element in Polymer. In this case, you're creating an element called
    "post-card". </li>
<li>The <code>&lt;template&gt;</code> defines the element's internal DOM structure, or <em>shadow DOM</em>. This is where
    you'll add markup for your custom element.</li>
<li>Used inside a shadow DOM tree, the <code>:host</code> pseudo-class matches the element that <em>hosts</em>
    the tree. In this case, it matches the <code>&lt;post-card&gt;</code> element.</li>
<li>Ordinary selectors used inside the shadow DOM are
    <em>scoped</em> to the shadow DOM. The <code>.card-header</code> here only matches elements in this element's shadow DOM.</li>
</ul>
</aside>
</side-by-side>

**Note:** The `<polymer-element>` tag can include only one `<template>` tag as a _direct_ descendant.
This tag defines the shadow DOM for the element. Other `<template>` tags may be nested inside the outer
template tag.
{: .alert .alert-info }

At the end of the element definition is a `<script>` tag:

<side-by-side>
<pre>
...
  &lt;script>
  Polymer({});
  &lt;/script>
&lt;/polymer-element>
</pre>
<aside>
<h4>Key information</h4>
<ul>
<li>The <code>Polymer</code> call at the end of the file <em>registers</em> the element so
    it's recognized by the browser. You'll do more with this in a later
    step as well.</li>
</ul>
</aside>
</side-by-side>


<aside class="alert alert-info">
<p><b>Learn More:</b>
When you create an instance of <code>&lt;post-card&gt;</code>, the contents from its
shadow DOM <code>&lt;template&gt;</code> are inserted as the element's <em>shadow root</em>. These elements are
rendered in the browser, but are not included in the element's
<code>children</code> collection.</p>
<p>By default, any children added by the user don't render. For example:</p>

<pre>&lt;post-card&gt;&lt;h3&gt;Hello!&lt;/h3&gt;&lt;/post-card&gt;</pre>

<p>Creates a <code>&lt;post-card&gt;</code> with a single <code>&lt;h3&gt;</code> element as a child.
To render the <code>&lt;h3&gt;</code> inside your <code>&lt;post-card&gt;</code>, you need to add an
<em>insertion point</em>, which tells the browser where to render children in
the shadow DOM tree.</p>
</aside>

<div class="divider" layout horizontal center center-justified>
  <core-icon icon="polymer"></core-icon>
</div>

Create the card structure.

Find the `CARD CONTENTS GO HERE` comment and replace it with the `<div>` and
`<content>` tags shown below.

<side-by-side>
<pre>
&lt;/style>

<strong class="highlight nocode">&lt;div class="card-header" layout horizontal center>
  &lt;content select="img">&lt;/content>
  &lt;content select="h2">&lt;/content>
&lt;/div>
&lt;content>&lt;/content></strong>
</pre>
  <aside>
  <h4>Key information</h4>
    <ul>
    <li>The <code>layout horizontal center</code> attributes are Polymer shorthand to
    create a flexbox layout. </li>
    <li>The three <code>&lt;content&gt;</code> elements create <em>insertion points</em>. <br />
    (The shadow DOM spec calls this process of selecting nodes
    <em>distribution</em>).</li>
    <li>Any <code>&lt;img&gt;</code> children match the first <code>&lt;content&gt;</code> tag and are inserted
    here.</li>
    <li>The second <code>&lt;content&gt;</code> tag selects any <code>h2</code> children.</li>
    <li>The final <code>&lt;content&gt;</code> tag, with no <code>select</code> attribute, selects any
    nodes that haven't already been inserted. (This is probably the most
    common form of <code>&lt;content&gt;</code> element.)</li>
    </ul>
  </aside>
</side-by-side>

**Selecting content**: The `select` attribute on a `content` element accepts a [limited set of
CSS selectors](http://w3c.github.io/webcomponents/spec/shadow/#satisfying-matching-criteria).
You can only select direct children of the host node, not descendents.
{: .alert .alert-info }

<div class="divider" layout horizontal center center-justified>
  <core-icon icon="polymer"></core-icon>
</div>

Style the imported content.

There are a number of new CSS selectors to work with. The `post-card.html`
file already includes a `:host` selector, discussed earlier, to style the
top-level `<post-card>` element.

To style the children added using the `<content>` element, add the
following CSS inside the `<style>` tag after the existing rules:

<side-by-side>
<pre>.card-header {
  margin-bottom: 10px;
}<strong class="highlight nocode">
polyfill-next-selector { content: '.card-header h2'; }
.card-header ::content h2 {
  margin: 0;
  font-size: 1.8rem;
  font-weight: 300;
}
polyfill-next-selector { content: '.card-header img'; }
.card-header ::content img {
  width: 70px;
  border-radius: 50%;
  margin: 10px;
}</strong>
&lt;/style>
</pre>
  <aside>
    <h4>Key information</h4>
    <ul>
      <li>The <code>::content</code> pseudo element selects an insertion point (created by
      a <code>&lt;content&gt;</code> tag).
      Here, <code>::content h2</code> selects any <code>h2</code> that's distributed through an
      insertion point.</li>
      <li>For browsers that don't support shadow DOM natively the<br />
      <code>polyfill-next-selector</code> rule tells the shadow DOM polyfill how to
      transform the <code>::content</code> rule into a non-shadow DOM rule. For
      example, without shadow DOM, <code>post-card h2</code> matches any <code>&lt;h2&gt;</code> element
      inside the card.</li>
    </ul>
  </aside>
</side-by-side>

**Note:**
You can't style the insertion point itself, so the
<code>::content</code> pseudo element is always used with a descendent selector.
{: .alert .alert-info }

### Edit index.html

Import the new element into `index.html`.

Save the `post-card.html` file and open `index.html` in your editor. Add
the import for `post-card.html` after your existing imports:

<side-by-side>
<pre>
...
&lt;link rel="import"
  href="../components/paper-tabs/paper-tabs.html">
<strong class="highlight nocode">&lt;link rel="import" href="post-card.html"></strong>
...
</pre>
  <aside>
    <h4>Key information</h4>
    <ul>
      <li>This makes the <code>&lt;post-card&gt;</code> element available for use in <code>index.html</code>.</li>
    </ul>
  </aside>
</side-by-side>

 <div class="divider" layout horizontal center center-justified>
  <core-icon icon="polymer"></core-icon>
</div>

Add a `<post-card>` element to `index.html` directly after the
`<core-toolbar>` element:

<side-by-side>
<pre>
...
<strong class="highlight nocode">&lt;div class="container" layout vertical center>

  &lt;post-card>
    &lt;img width="70" height="70"
      src="../images/avatar-07.svg">
    &lt;h2>Another Developer&lt;/h2>
    &lt;p>I'm composing with shadow DOM!&lt;/p>
  &lt;/post-card>

&lt;/div></strong>
...
</pre>
  <aside>
    <h4>Key information</h4>
    <ul>
      <li>The child elements you specify here are <em>distributed</em> into the
          <code>&lt;post-card&gt;</code> element's insertion points.</li>
    </ul>
  </aside>
</side-by-side>

### Test your work

Save your changes and reload the page. Your application should now look like this:

<div layout vertical center>
  <img class="sample" src="/images/tutorial/step-2.png">
</div>

The card still needs a favorite button, but it's starting to take shape.

If something isn't working, check your work against the files in the `step-2` folder:

-   [`post-card.html`](https://github.com/Polymer/polymer-tutorial/blob/master/step-2/post-card.html)
-   [`index.html`](https://github.com/Polymer/polymer-tutorial/blob/master/step-2/index.html)


**Explore:** Play around with the insertion points to get a feeling for how
they work. Does anything change if you reorder the `<post-card>`'s children in
`index.html`? What if you include multiple images, or add plain text? You can
also try swapping the two `select=` attributes in `post-card.html`.
{: .alert .alert-info }


<div layout horizontal justified class="stepnav">
<a href="step-1.html">
  <paper-button><core-icon icon="arrow-back"></core-icon>Step 1: Creating the app structure</paper-button>
</a>
<a href="step-3.html">
  <paper-button raised><core-icon icon="arrow-forward"></core-icon>Step 3: Using data binding</paper-button>
</a>
</div>

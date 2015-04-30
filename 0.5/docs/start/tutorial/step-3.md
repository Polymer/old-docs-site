---
layout: default
type: start
shortname: Start
title: "Step 3: Using data binding"
subtitle: Your first Polymer application
---

<link rel="import" href="../../../elements/side-by-side.html">

<link rel="stylesheet" href="tutorial.css">


{% include toc.html %}


## Step 3: Using data binding

One post is nice, but the app looks a little empty. In this step, you'll pull data from a web service and use Polymer's data binding to render it as a series of cards.

To get the data, you'll use the `<post-service>` element provided as part of the starter app. This element provides a very simple API for an imaginary social network. In this section, you'll use the `posts` property, which returns an array of `post` objects like this:

    {
      "uid": 2,
      "text" : "Loving this Polymer thing.",
      "username" : "Rob",
      "avatar" : "../images/avatar-02.svg",
      "favorite": false
    }

In this section you'll learn about:

-   Using data binding.
-   Publishing properties.

### Edit post-list.html

Open the `post-list.html` file in your editor.

<side-by-side>
<pre>
&lt;link rel="import" href="../components/polymer/polymer.html">
&lt;link rel="import" href="../post-service/post-service.html">
&lt;link rel="import" href="post-card.html">

&lt;polymer-element name="post-list" attributes="show">
  &lt;template>
    &lt;style>
    :host {
      display: block;
      width: 100%;
    }
    post-card {
      margin-bottom: 30px;
    }
    &lt;/style>

    &lt;!-- add markup here -->
...
</pre>
  <aside>
    <h4>Key information</h4>
    <ul>
      <li>The file already includes an import for the <code>&lt;post-service&gt;</code>
      element, so it's ready to use.</li>
      <li>The <code>attributes="show"</code> attribute creates a
      <a href="../../polymer/polymer.html#published-properties">
      <em>published property</em></a> named <code>show</code>.
      </li>
    </ul>
  </aside>
</side-by-side>


A <a href="../../polymer/polymer.html#published-properties">
<em>published property</em></a> is a property that can be configured in markup using an attribute,
or connected to another property using two-way data binding. You'll use the `show` property
in a later step.

<div class="divider" layout horizontal center center-justified>
  <core-icon icon="polymer"></core-icon>
</div>

Add a `<post-service>` element inside the element's `<template>`:

<side-by-side>
<pre>
...
<strong class="highlight nocode">&lt;post-service id="service" posts="{%raw%}{{posts}}{%endraw%}">
&lt;/post-service></strong>
...
</pre>
  <aside>
  <h4>Key information</h4>
    <ul>
      <li>
        The <code>posts="{%raw%}{{posts}}{%endraw%}"</code> attribute adds a two-way data binding between
        the <code>&lt;post-service&gt;</code> element and the <code>&lt;post-list&gt;</code> element.
      </li>
    </ul>
  </aside>
</side-by-side>

The [_data binding_](../../polymer/databinding.html) links the service element's `posts` property to a local property (also called
`posts` here). Any methods you define on your custom element can access the response as `this.posts`.

<div class="divider" layout horizontal center center-justified>
  <core-icon icon="polymer"></core-icon>
</div>

Render a dynamic list of cards.

Add the following `<div>` and `<template>` tag:

<side-by-side>
{% raw %}
<pre>
...
&lt;post-service id="service" posts="{{posts}}">
&lt;/post-service>

<strong class="highlight nocode">&lt;div layout vertical center>

  &lt;template repeat="{{post in posts}}">
    &lt;post-card>
      &lt;img src="{{post.avatar}}" width="70" height="70">
      &lt;h2>{{post.username}}&lt;/h2>
      &lt;p>{{post.text}}&lt;/p>
    &lt;/post-card>
  &lt;/template>

&lt;/div></strong>
...
</pre>
{%endraw%}
<aside>
 <h4>Key information</h4>

 <ul>
   <li>This new syntax <code>repeat="{%raw%}{{post in posts}}{%endraw%}"</code>, tells the template to
   create a new instance for each item in the <code>posts</code> array.</li>
   <li>In each template instance, the individual bindings (such as
   <code>{%raw%}{{post.avatar}}{%endraw%}</code>) are replaced by the corresponding values for that
   item.</li>
 </ul>
</aside>
</side-by-side>


### Edit index.html

Import the `<post-list>` element into `index.html`.

Open `index.html` and add an import link for `post-list.html`. You can
replace the existing link for `post-card`:

<pre>
...
&lt;link rel="import" href="../components/paper-tabs/paper-tabs.html">
<strong class="highlight nocode">&lt;link rel="import" href="post-list.html"></strong>
...
</pre>

<div class="divider" layout horizontal center center-justified>
  <core-icon icon="polymer"></core-icon>
</div>

Use the `<post-list>` element.

Find the `<post-card>` element you added in the last step and replace it
with a `<post-list>`:

<pre>
...
&lt;div class="container" layout vertical center&gt;
  <strong class="highlight nocode">&lt;post-list show="all"&gt;&lt;/post-list&gt;</strong>
&lt;/div>
...
</pre>

### Test your work

Save the `index.html` file and reload the page in your browser. You should see a list of cards,
something like this:

<div layout vertical center>
  <img class="sample" src="/images/tutorial/step-3.png">
</div>

If you have any problems, check your work against the files in the `step-3` folder:

-   [`post-list.html`](https://github.com/Polymer/polymer-tutorial/blob/master/step-3/post-list.html)
-   [`index.html`](https://github.com/Polymer/polymer-tutorial/blob/master/step-3/index.html)

**Explore:** Open up `post-service.html` to see how the component works. Internally, it uses the <code>
<a href="../../elements/core-ajax.html">&lt;core-ajax&gt;</a></code> element to make HTTP requests.
{: .alert .alert-info}

<div layout horizontal justified class="stepnav">
<a href="step-2.html">
  <paper-button><core-icon icon="arrow-back"></core-icon>Step 2: Creating your own element</paper-button>
</a>
<a href="step-4.html">
  <paper-button raised><core-icon icon="arrow-forward"></core-icon>Step 4: Finishing touches</paper-button>
</a>
</div>

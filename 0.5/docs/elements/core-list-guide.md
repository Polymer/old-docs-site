---
layout: default
type: elements
shortname: Elements
title: Using core list
subtitle: Guide
---

<link rel="import" href="../../elements/side-by-side.html">

<link rel="stylesheet" href="core-list-guide.css">

{% include toc.html %}

## Introduction

{{site.project_title}}'s Core Elements collection contains
<code><a href="core-list.html">core-list</a></code>,
which displays a virtual, infinite list of homogeneous items.
A `core-list` item can contain text, images, or other kinds of elements.
In addition, an item can be composed of multiple elements.

<img src="/images/core-list/unsorted-names.png" height="280px" width="150px" style="float:left">
<img src="/images/core-list/small-images.png" height="279px" width="110px" style="float:left;margin-left:30px">
<img src="/images/core-list/multiple-elements.png" height="280px" width="265px" style="margin-left:30px">

When using a `<core-list>`, you provide a list of JavaScript objects (the data model),
and a `<template>` element that defines how to render a single item.
The `<core-list>` creates enough copies of the template to fill the viewport.
As the user scrolls, these "virtual" items are recycled to display the items in the data model.

Use `<core-list>` when working with lists large enough that
data binding (`template repeat`) is impractical.

The list automatically adjusts for items of different heights,
but care must be taken to provide the heights when the model is assigned to the item.
You can learn more in [Providing heights](#providing-heights).

As the user scrolls, the template elements are recycled.
This can cause issues with images and other data that take time to load.
See [Using core-image with core-list](#using-core-image-with-core-list)
for a solution when working with images.

## Installation

This article describes the usage of `core-list`. You can install it using Bower:

    bower install Polymer/core-list

The rest of this article assumes the components are
installed in the `bower_components` directory.

Include `core-list` in the `<head>` section of your HTML file like this:

    <link rel="import" href="bower_components/core-list/core-list.html">

## Basic usage

`core-list` renders items based on a user-supplied array of data that may be arbitrarily large. Often this data comes from a back-end database that is retrieved via AJAX.
Bind the array to the `core-list` using the required `data` attribute.
When the array changes, the `core-list` updates.
[The data model](#the-data-model) section provides more information
about the structure of the data.

`core-list` fills its viewport with items,
which display vertically by default.
The template defines the DOM tree for each item.

The following code uses a
`core-list` to display names with a simple `span` element.
This `core-list` is within an auto-binding template,
but could be inside a {{site.project_title}} element.

<pre>
&lt;template is="auto-binding" id="my-core-list"&gt;
  &lt;div class="content" flex&gt;
    &lt;core-list <strong class="highlight nocode">data="{%raw%}{{data}}{%endraw%}"</strong> flex height="30">
      &lt;template>
        &lt;div class="item">
          <strong class="highlight nocode">&lt;span class="from">{%raw%}{{model.name}}{%endraw%}&lt;/span></strong>
        &lt;/div>
      &lt;/template>
    &lt;/core-list>
  &lt;/div&gt;
&lt;/template&gt;
</pre>

### The script {#the-script}

The script for the auto-binding template generates the data model for `core-list`.

    var cl = document.querySelector('#my-core-list');
    cl.data = [{name: 'Elizabeth'}, {name: 'Jane'}, {name: 'Kitty'}, ...];

The array, `cl.data`, is bound to the `core-list`'s `data` attribute.
Here, `cl.data` is populated using a static array of maps, but could be the output
of a database or an AJAX request.

### The data model {#the-data-model}

Each list item is bound to a JavaScript object that provides the model for the data.
The model contains an index, a boolean indicating whether the
item is selected, and finally, a user model, which contains
the data specific to the item.

In the example that displays the list of names,
`model` contains only one key/value pair:
the key `name` and the value, which varies for every list item.
For example, the 4th item in the list of names might have this model:

<pre>
{
  index: 3,           // data index for this item
  selected: false,    // selection state for this item
  model: {            // user data corresponding to data[index]
    <strong class="highlight nocode">name: 'Lydia'</strong>
  }
}
</pre>

You refer to values in the model using a key:

{%raw%}
    {{model.name}}
{%endraw%}

[See the full sample](https://github.com/Polymer/docs/blob/master/0.5/samples/core-list/core-list-names/index.html) or <plunker-button src="../../samples/core-list/core-list-names/manifest.json">edit on plunker</plunker-button>

## Using core-image with core-list

Recall that just enough template elements are rendered to fill the viewport and that
these elements are recycled when the user scrolls. This can cause issues with images.
If a user is scrolling through the images very quickly, the recycled item shows a stale image while it waits for the new one to load. You can use <code><a href="core-image.html">core-image</a></code> instead of `img` to fix this problem.

Remember to install and include `core-image` in the `<head>` section as you did with `core-list`.

<img src="/images/core-list/variable-height-images.png" height="690" width="382">

This example uses a <code><a href="core-header-panel.html">core-header-panel</a></code> to provide a header above the images.
See [Using core-header-panel with core-list](#list-with-core-header-panel)
for details.
{: .alert .alert-info }

The model for the images contains
`src`, which provides the URL for the image,
and `height` and `width`, which provide the dimensions.

<pre>
{
  index: 0,           // data index for this item
  selected: false,    // selection state for this item
  model: {
    <strong class="highlight nocode">src: ...</strong>          // the source file for the image
    <strong class="highlight nocode">width: ...</strong>        // the width of the image
    <strong class="highlight nocode">height: ...</strong>       // the height of the image
  }
}
</pre>

This `core-list` uses a `<core-image>` element to display each image using the data from the model:

<pre>
&lt;core-list id="list" data="<strong class="highlight nocode">{%raw%}{{data}}{%endraw%}</strong>" flex&gt;
  &lt;template&gt;
    &lt;div class="item"&gt;
      <strong class="highlight nocode">&lt;core-image class="image" src="{%raw%}{{model.image.src}}{%endraw%}"
          width="{%raw%}{{model.image.width}}{%endraw%}" height="{%raw%}{{model.image.height}}{%endraw%}" style="background:Gray" preload&gt;&lt;/core-image&gt;</strong>
    &lt;/div&gt;
  &lt;/template&gt;
&lt;/core-list&gt;
</pre>

`core-list` automatically adjusts to accommodate images of different heights. However, when using items of different heights you must explicitly set the heights in a timely manner. The next section, [Providing heights](#providing-heights), provides details.

The `preload` attribute means that the `core-image` shows the background color or an alternate image (set with the `placeholder` attribute) until the true image is completely loaded. So instead of seeing stale images in the recycled templates, you see a background color or another image.

[See the full sample](https://github.com/Polymer/docs/blob/master/0.5/samples/core-list/core-list-images/index.html) or <plunker-button src="../../samples/core-list/core-list-images/manifest.json">edit on plunker</plunker-button>

## Essential: Providing heights {#providing-heights}

**A `core-list` must have a size so that its contents scroll when the height of the items is large enough to overflow that size.** By "must have a size", this generally means it has a `fit` or `flex` layout attribute, or has an explicit `height` set in CSS. `flex` only has meaning if its parent has either `layout horizontal` or `layout vertical`.

### Image heights

The browser must be able to determine the height of the item at the point the model is bound to the template. So `<img>` or `<core-image>` elements must have explicit heights and must not rely on loading the image to determine the height. The list will break unless you set the height of the image explicitly either:

with the CSS height attribute (as in the name example above)
within the model, or (as in the images example above)
with the `core-list` `height` property

Furthermore, custom elements must not change their height asynchronously (for example, in response to UI events, `setTimeout()`, animations, and so on).

### Setting row height

The `core-list` element has a `height` attribute
that you can use to set the approximate height, on average, of the list items in pixels.
`core-list` uses this value to determine how many elements
to render based on its viewport size.
Normally you don't need to adjust this value unless the average
size is much larger or smaller than the default of 200.
In the example above that displays names, the items' height was 30 pixels.
This example needs to use the `height` property on the `core-list`.

The basic rule is that if you have fixed-height rows, set the `height` property
of the `core-list`.  If you have variable height rows, set the `height` property
if the average height is much larger or smaller than the default of 200px.

<pre>
&lt;core-list id="list" data="{%raw%}{{data}}{%endraw%}" height="80" flex&gt;
  &lt;template&gt;
     ...
  &lt;/template&gt;
&lt;/core-list&gt;
</pre>

## Composing core-list items from multiple elements

The `core-list` in the following example includes checkboxes, select elements,
input elements along with text elements.

![Core-list that contains different kinds of elements](/images/core-list/multiple-elements.png)

Here’s the code that puts the checkbox, the text input field, and the select element in
the `core-list` template.

<pre>
&lt;input type="checkbox" checked="{%raw%}{{model.checked}}{%endraw%}"&gt;
&lt;input type="number" value="{%raw%}{{model.value}}{%endraw%}" class="narrow"&gt;
&lt;select selectedIndex="{%raw%}{{model.type}}{%endraw%}"&gt;&lt;option&gt;a&lt;/option&gt;&lt;option&gt;b&lt;/option&gt;&lt;option&gt;c&lt;/option&gt;&lt;/select&gt;
</pre>

The user data in the model mirrors the elements in the template.

<pre>
{
  index: 0,         // data index for this item
  selected: false,  // selection state for this item
  model: {
    <strong class="highlight nocode">image: ...</strong>     // the source file for the image
    <strong class="highlight nocode">name: ...</strong>      // the name generated by Faker
    <strong class="highlight nocode">id: ...</strong>        // the id of the item
    <strong class="highlight nocode">checked: ...</strong>   // true if the check box is checked
    <strong class="highlight nocode">value: ...</strong>     // numeric value in text field
    <strong class="highlight nocode">type: ...</strong>      // value of the select item
    <strong class="highlight nocode">details: ...</strong>   // the text to the right of the select item
  }
}
</pre>

[See the full sample](https://github.com/Polymer/docs/blob/master/0.5/samples/core-list/multiple-elements/index.html) or <plunker-button src="../../samples/core-list/multiple-elements/manifest.json">edit on plunker</plunker-button>

## Using core-header-panel with core-list {#list-with-core-header-panel}

A common way to provide a header with a `core-list` is to use a
<code><a href="core-header-panel.html">core-header-panel</a></code>. The `core-header-panel` has a header section and a content section. You can use a
<code><a href="core-toolbar.html">core-toolbar</a></code> to implement the header section. Let’s look at an example.

Remember to install and import the two new elements in the header of your HTML code.

    <link rel="import" href="bower_components/core-header-panel/core-header-panel.html">
    <link rel="import" href="bower_components/core-toolbar/core-toolbar.html">

Embed the `core-list` in a `core-header-panel`. Include a `core-toolbar` as well. The `core-toolbar` remains in place at the top of the viewport as the user scrolls. It has a shadow, which gives the illusion of the `core-list` items scrolling up under the toolbar.

<pre>
<strong class="highlight nocode">&lt;core-header-panel id="hPanel" flex&gt;
  &lt;core-toolbar&gt;Variable height images&lt;/core-toolbar&gt;</strong>
  &lt;core-list id="list" data="{%raw%}{{data}}{%endraw%}" flex&gt;
    ...
  &lt;/core-list&gt;
<strong class="highlight nocode">&lt;/core-header-panel&gt;</strong>
</pre>

The `core-list` in this example is contained within a {{site.project_title}} element, so the code that populates the `core-list` appears in the `ready()` method.

The highlighted line of code below is critical.
It tells the `core-list` to listen for scroll events
coming from the `core-header-panel`,
otherwise the `core-list` and the `core-header-panel` don't play well together.

<pre>
ready: function() {
  this.data = [];
  for (var i = 0; i < 100; i++) {
    this.data.push({ ... });
  }
  <strong class="highlight nocode">this.$.list.scrollTarget = this.$.hPanel.scroller;</strong>
},
</pre>

You can also set the scroll target in markup as follows:

    <core-list scrollTarget="{%raw%}{{$.hPanel.scroller}}{%endraw%}">

[See the full sample](https://github.com/Polymer/docs/blob/master/0.5/samples/core-list/core-list-images/index.html) or <plunker-button src="../../samples/core-list/core-list-images/manifest.json">edit on plunker</plunker-button>

## Summary

You can use `core-list` to display a large list of homogenous items. You must explicitly manage the heights of the items and of the `core-list` itself to get proper behavior. A `core-list` can contain many different kinds of elements. Use a `core-header-panel` along with a `core-toolbar` to provide a header. When displaying images, use `core-image` to avoid displaying stale images due to slower loading times.

## More Resources

Use these links to find the source code for the samples used in this guide:
<!-- and to run them: -->
<!-- run links broken ATM -->

* [core-list with names](https://github.com/Polymer/docs/blob/master/0.5/samples/core-list/core-list-names/index.html)

* [core-list with variable height images and core-header-panel](https://github.com/Polymer/docs/blob/master/0.5/samples/core-list/core-list-images/index.html)

* [core-list with a variety of elements](https://github.com/Polymer/docs/blob/master/0.5/samples/core-list/multiple-elements/index.html)

For more information about the core elements used in this guide,
check out the API docs:

* <a href="core-list.html">core-list</a>
* <a href="core-image.html">core-image</a>
* <a href="core-header-panel.html">core-header-panel</a>
* <a href="core-toolbar.html">core-toolbar</a>


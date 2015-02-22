---
layout: default
title: About custom elements
type: start
shortname: Platform
subtitle: Define and use new types of DOM elements in a document.

feature:
  spec: https://dvcs.w3.org/hg/webcomponents/raw-file/tip/spec/custom/index.html
  code: https://github.com/Polymer/webcomponentsjs
  summary: Enables authors to define and use new types of DOM elements in a document.

links:
- "Custom Elements - defining new elements in HTML": http://www.html5rocks.com/en/tutorials/webcomponents/customelements/
---

{% include toc.html %}

## Introduction

If HTML were reinvented tomorrow, it would provide more features
and greater capability than today.
For example, if HTML provided `<camera>`, `<carousel>`, and `<tabs>` elements,
imagine the efficiency and ease of building a photo booth app.

Fortunately, Custom Elements pave a path to {{site.project_title}}'s
"[Everything is an element](../docs/start/everything.html#everythingis)"
philosophy.
Embracing this philosophy means a web app becomes a collection of well-defined,
reusable components.

## What are Custom Elements?

Custom Elements let you define your own element types with custom tag names.
You associate JavaScript code with the custom tags and
use them as you would any standard tag.
For example, after registering a special kind of button called `super-button`,
you use it like this:

    <super-button></super-button>

As with any element, Custom Element instances can also be created in JavaScript.

    var s = document.createElement('super-button');
    s.innerHTML = "I'm super!";

**Custom Elements are true elements.**
You can use standard DOM methods on Custom Elements,
access their properties, attach event listeners, and style them using CSS
just as easily as any `div` or `span`.

### Why Custom Elements?

Custom Elements have many advantages. They:

- Reduce the amount of code you have to write.
- Express the function of the code.
- Encapsulate internal details.
- Implement APIs per element type.
- Increase productivity by letting you reuse elements.
- Use inheritance to create element tags based on other tags.

## What are {{site.project_title}} elements?

{{site.project_title}} lets you
create Custom Elements declaratively and provides special features, such as
two-way data binding, declarative event handling,
declarative inheritance, and more.

## Defining and registering a Custom Element

The Custom Elements specification defines a programmatic way to
define a Custom Element, using `document.registerElement`.

    var myTag = document.registerElement('my-tag');

However, you don't call `registerElement` directly when using Polymer.

Use the `<polymer-element>` tag to define a {{site.project_title}} element.

    <polymer-element name="hello-tag">
      <template>
        <div> Hello </div>
      </template>
      <script>
        Polymer(...);
      </script>
    </polymer-element>

The `<template>` tag defines UI for the element,
and the `Polymer()` method within the `<script>` tag registers the element.

**Note: Custom element names must always contain a dash (-).**

For more information on defining custom elements with {{site.project_title}},
see [Element declaration](../docs/polymer/polymer.html#element-declaration).

## Instantiating a {{site.project_title}} element

After registration, you can construct an instance of an element either
imperatively using `document.createElement` or declaratively as follows:

    <hello-tag></hello-tag>

If you used `extends` to create a {{site.project_title}} element that derives
from an existing DOM element
(something other than `HTMLElement`), use the `is` syntax:

    <button is="count-button"></button>

## Extending existing elements

A {{site.project_title}} element can extend another element by using the `extends` attribute
in the definition.
The parent’s properties and methods are inherited by the child element and data-bound.
The child element can override the parent's methods.

You can extend regular DOM elements such as `button` and `div` as well as Custom Elements.
Here's an example of extending a button:

    <polymer-element name="count-button" extends="button"
                     on-click="increment">
      <template>
        Increment: {{counter}}
      </template>

      <script>
        Polymer({
          counter: 0,
          increment: function(e, detail, sender) { this.counter++ }
        })
      </script>
    </polymer-element>

For more information and examples, refer to
[Extending other elements](../docs/polymer/polymer.html#extending-other-elements)

## Types of elements {#elementtypes}

You can divide elements into two categories
based on their use and behavior:

- UI elements, which render UI to the screen.
- Non-UI elements, which provide other utilities.

You can use {{site.project_title}} to create both UI and non-UI elements.

###  UI elements {#uielements}

Elements like `<select>` and `<core-selector>` are _UI elements_.
They render UI and are visible on the page.
A few other examples are [`<core-collapse>`](../components/core-docs/index.html#core-collapse),
[`<core-toolbar>`](../components/core-docs/index.html#core-toolbar),
and [`<paper-tabs>`](../components/paper-docs/index.html#paper-tabs):

    <paper-tabs selected="0">
      <paper-tab>One</paper-tab>
      <paper-tab>Two</paper-tab>
      <paper-tab>Three</paper-tab>
    </paper-tabs>

### Non-UI elements {#nonuielements}

Non-UI elements _**don't**_ render anything to the screen.
That may seem strange, but there are plenty of examples already in HTML:
`<script>`, `<style>`, and `<meta>` to name a few.
These elements serve a purpose and do their useful work without rendering UI.

Non-UI elements provide utility behind the scenes.
For example, the `<core-ajax>` tag lets you make XHR requests from markup.
Feed it some configuration attributes and listen for a response:

    <core-ajax url="http://gdata.youtube.com/feeds/api/videos/" auto
               params='{"alt":"json", "q":"chrome"}' handleAs="json"></core-ajax>
    <script>
      var ajax = document.querySelector('core-ajax');
      ajax.addEventListener('core-response', function(e) {
        console.log(this.response);
      });
    </script>

Non-UI elements like this one reduce the amount of boilerplate code you have to write.
They perform their task, get out of your way,
and hide the details of a complex API like `XMLHttpRequest`.

## Resources

- [Custom Elements](http://www.html5rocks.com/en/tutorials/webcomponents/customelements/)
  &mdash; An article by Eric Bidelman on HTML5 ROCKS.
- [Webcomponents.org](http://webcomponents.org/)
  &mdash; A website dedicated to discussing Web Components, an emerging standard, which includes Custom Elements.
- [W3C Specification](http://w3c.github.io/webcomponents/spec/custom/) &mdash; The Web Components specification.
- [Custom Elements](http://customelements.io/) &mdash; A gallery of Web Components.
- [GitHub repo](https://github.com/Polymer/webcomponentsjs) &mdash; The custom
  elements repository.

## Next steps {#nextsteps}

Learn more about shadow DOM, another building block of the Polymer library,
or read more about the Polymer core APIs.

<a href="shadow-dom.html">
   <paper-button raised><core-icon icon="arrow-forward"></core-icon>Shadow DOM</paper-button>
<a href="../docs/polymer/polymer.html">
   <paper-button raised><core-icon icon="arrow-forward"></core-icon>API Developer Guide</paper-button>

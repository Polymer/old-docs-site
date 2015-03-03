---
layout: default
title: About shadow DOM
type: start
shortname: Platform
subtitle: Define local DOM trees and control composition.

feature:
  spec: https://dvcs.w3.org/hg/webcomponents/raw-file/tip/spec/shadow/index.html
  code: https://github.com/Polymer/webcomponentsjs
  summary: "Shadow DOM is designed to provide encapsulation by hiding DOM subtrees under shadow
roots. It provides a method of establishing and maintaining functional boundaries
between DOM trees and how these trees interact with each other within a document,
thus enabling better functional encapsulation within the DOM."

links:
- "What the Heck is Shadow DOM?": http://glazkov.com/2011/01/14/what-the-heck-is-shadow-dom/
- "Web Components Explained - Shadow DOM": https://dvcs.w3.org/hg/webcomponents/raw-file/57f8cfc4a7dc/explainer/index.html#shadow-dom-section
- "HTML5Rocks - Shadow DOM 101": http://www.html5rocks.com/en/tutorials/webcomponents/shadowdom/
- "HTML5Rocks - Shadow DOM 201: CSS and Styling": http://www.html5rocks.com/en/tutorials/webcomponents/shadowdom-201/
- "HTML5Rocks - Shadow DOM 301: Advanced Concepts & DOM APIs": http://www.html5rocks.com/en/tutorials/webcomponents/shadowdom-301/

---

{% include toc.html %}

## Why Shadow DOM?

Shadow DOM separates content from presentation thereby
eliminating naming conflicts and improving code expression.

## Basic usage

The Shadow DOM spec provides a programmatic method `createShadowRoot`
for adding a shadow DOM subtree to an element.
When you define a {{site.project_title}} element,
you can specify the contents of the element's shadow DOM using a `<template>` tag:

    <polymer-element name="my-custom-element" noscript>
      <template>
        <span>People say: </span>
          <content select="q"></content> 
        <footer>sometimes</footer>
      </template>
    </polymer-element>

The `span`, `content`, and `footer` elements are encapsulated within
the custom element and hidden from the rest of the page.

## Shadow DOM subtrees

Shadow DOM allows a single node to express three subtrees: _light DOM_, _shadow DOM_, and _composed DOM_.

Together, the light DOM and shadow DOM are referred to as the _logical DOM_. Developers interact with the logical DOM. The browser uses the composed DOM to render the pixels on the screen.

**Light DOM**

The user of your custom element supplies the light DOM:

    <my-custom-element>
      <q>Hello World</q> <!-- part of my-custom-element's light DOM -->
    </my-custom-element>

The light DOM of `<my-custom-element>` is visible to the end-user of the
element as a normal subtree. The end-user can access `.childNodes`, `.children`, `.innerHTML`, or any other property or method that gives information about a node's subtree.

**Shadow DOM**

`<my-custom-element>` may define a shadow DOM by attaching a shadow root to
itself.

    #document-fragment
      <polymer-element name="my-custom-element" noscript>
        <template>
          <!-- Shadow DOM subtree -->
          <span>People say: </span>
            <content select="q"></content>
          <footer>sometimes</footer>
        </template>
      </polymer-element>

Shadow DOM is internal to the element and hidden from the end-user.
Shadow DOM nodes are not children of `<my-custom-element>`.

**Note:** Shadow roots are represented as a `#document-fragment` in DevTools.
{: .alert .alert-info }

**Composed (rendered) DOM**

The composed DOM is what the browser actually renders. For rendering, the light
DOM is distributed into the shadow DOM to produce the composed DOM. The final output
looks something like this:

    <my-custom-element>
      <span>People say: <q>Hello World</q></span>
      <footer>sometimes</footer>
    </my-custom-element>

Nodes in light DOM or shadow DOM express parent and sibling relationships that match their respective tree structures; the relationships that exist in the composed tree are not expressed anywhere in DOM. So, while the `<span>` in the final composed tree is a child of `<my-custom-element>` and the parent of `<q>`, it is actually a child of the shadow root and `<q>` is a child of `<my-custom-element>`. The two nodes are unrelated but
Shadow DOM renders them as if they are. In this way, the user can manipulate light DOM or shadow DOM directly as regular DOM subtrees, and let the system take care of keeping the render tree synchronized.

{% include other-resources.html %}

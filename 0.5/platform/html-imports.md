---
layout: default
title: About HTML imports
type: start
shortname: Platform
subtitle: Include HTML documents in other HTML documents.

feature:
  spec: https://dvcs.w3.org/hg/webcomponents/raw-file/tip/spec/imports/index.html
  code: https://github.com/Polymer/webcomponentsjs
  summary: HTML Imports are a way to include and reuse HTML documents in other HTML documents.

links:
- "HTML5Rocks - HTML Imports: #include for the web": http://www.html5rocks.com/tutorials/webcomponents/imports/
---

{% include toc.html %}

## Why HTML Imports?

HTML Imports let you include and reuse HTML documents in other HTML documents,
just as `<script>` tags let you include external Javascript in their pages.
In particular, imports let you include
custom element definitions from external URLs.

## Basic usage

For HTML imports use the `import` relation on a standard `<link>` tag, for example:

    <link rel="import" href="my-custom-element.html">

{% include other-resources.html %}

---
layout: default
title: Guide to Styling Elements

article:
  author: ebidel
  published: 2013-07-05
  #updated: 2013-07-05
  description: Learn all about how to style Polymer elements.
tags:
- CSS
---

{% include authorship.html %}

## Introduction {#intro}

http://www.html5rocks.com/tutorials/webcomponents/shadowdom-201/

## Default styles

sdf

## Inheriting and resetting styles

`.applyAuthorStyles` and `.resetStyleInheritance`

Even with the `.applyAuthorStyles` set, CSS selectors defined in the document do not cross the Shadow DOM boundary. Style rules only match when they're entirely inside or outside of the shadow tree.
{: .alert}

**Remember**: styles defined in the host document continue to apply to nodes they target, even when those nodes get distributed "inside" the Shadow DOM. Going into an insertion point doesn't change what's applied.
{: .alert .alert-info}

## Allowing users to style internals elements

custom pseudo elements

## Styling distributed nodes

`::distributed()`


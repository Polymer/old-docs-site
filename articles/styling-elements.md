---
layout: default
title: A Guide to Styling Elements

#load_polymer: true

article:
  author: ebidel
  published: 2013-07-05
  #updated: 2013-07-05
  description: Learn all about styling Polymer elements.
tags:
- CSS
---

{% include authorship.html %}

## Introduction {#intro}

This article covers many of the new CSS rules, properties, and concepts for
styling [Custom Elements](/platform/custom-elements.html). While much of it is applicable to general Web Components, it specifically focuses on:

1. How to use these new CSS features with {{site.project_title}}
2. How {{site.project_title}}'s polyfills shim certain behaviors

Many of the topics here are tightly coupled with how CSS and Shadow DOM interact with each other. If you want the dirty details on styling Shadow DOM, see my article on HTML5Rocks.com, [Shadow DOM 201 - CSS and Styling](http://www.html5rocks.com/tutorials/webcomponents/shadowdom-201/).

## Default styles

Most elements in HTML have default styling applied by the browser. For example,
`<head>` and `<title>` are `display:none`, `<div>` is `display:block`,
`<body>` has `margin:8px`, and `<ul>` has `list-style-type:disc`.

### User-defined styles

Elements _you_ create will likely need some sort of styling. As always, users
can style you from the outside:

    <style>
      x-foo {
        display: block;
      }
      x-foo:hover {
        opacity: 0;
      }
    <style>
    <x-foo></x-foo>

### Element-defined styles

It's more common for a Custom Element to define its own styles. The [`@host` at-rule](https://dvcs.w3.org/hg/webcomponents/raw-file/tip/spec/shadow/index.html#host-at-rule) allows you to target the element (the [Shadow DOM host](http://www.html5rocks.com/tutorials/webcomponents/shadowdom/#toc-hello-world) internally from within its definition:

    <polymer-element name="x-foo">
      <template>
        <style>
          @host {
            /* Three equivalent rules, in order of preference. */
            :scope { display: block; }
            * { display: block; }
            x-foo { display: block; }
          }
        </style>
      </template>
    </polymer-element>

The only selectors that work in `@host` are those targeting the host element itself. In the context of this `<x-foo>` element, the [`:scope`](http://www.w3.org/TR/selectors4/#scope-pseudo) pseudo-class, `*`, and the selector `x-foo` all refer to the element. Thus, the three examples are equivalent in this case.

#### Reacting to user states

An interesting case for `@host` is to react to different user-driven states (:hover, :focus, :active, etc.):

    <polymer-element name="x-button">
      <template>
        <style>
          @host {
            :scope {
              /* Note: by default elements are always display:inline. */
              display: block;
              opacity: 0.4;
              transition: opacity 400ms ease-in-out;
            }
            :scope:hover {
              opacity: 1;
            }
            :scope:active {
              position: relative;
              top: 3px;
              left: 3px;
            }
          }
        </style>
        ....

<polymer-element name="x-button">
  <template>
    <style>
      @host {
        :scope {
          opacity: 0.4;
          transition: opacity 400ms ease-in-out;
        }
        :scope:hover {
          opacity: 1;
        }
        :scope:active {
          position: relative;
          top: 3px;
          left: 3px;
        }
      }
    </style>
    <button></button>
  </template>
</polymer-element>
<x-button></x-button>

### Modify `@host` programmatically:

## Preventing FOUC

If you declare a custom element `<x-foo>` without registering a definition for it,
the element exists will exist as a regular `HTMLElement`. There's nothing special about `<x-foo>` until the browser registers its definition.

In certain cases, the upgrade process might take time. For example, there may be
network delay and the [HTML Import](/platform/html-imports.html) that defines
your element takes a while to fetch.



The CSS `:unresolved` pseudo class can be used to prevent [FOUC](http://en.wikipedia.org/wiki/Flash_of_unstyled_content), or Flash Of Unstyled Content.
`:unresolved` applies to elements right up until the point the `createdCallback`
is called.

http://jsbin.com/awurit/2/edit


## Inheriting and resetting styles

To take on the look and feel of the parent page, you can use Shadow DOM's `.applyAuthorStyles`.

As a convenience, {{site.project_title}} allows you to set `applyAuthorStyles` or `resetStyleInheritance` when constructing the element's `prototype`:

    Polymer('my-element', {
      applyAuthorStyles: true,
      resetStyleInheritance: true,
      ready: function() {
        ...
      },
      ...
    });

Alternatively, you can set these properties directly on the shadowRoot:

    ready: function() {
      this.shadowRoot.applyAuthorStyles = true;
      this.shadowRoot.resetStyleInheritance = true;
    }

**Gotcha**: even with `.applyAuthorStyles` set, selectors do not cross Shadow DOM boundaries. That is to say, outside styles only apply when the selector in quetion matches entirely within the shadowRoot.
{: .alert}

**Remember**: styles defined in the main document continue to apply to nodes they target, even when those nodes get distributed "inside" the Shadow DOM. Going into an insertion point doesn't change what's applied.
{: .alert .alert-info}

## Allowing users to style internals elements

custom pseudo elements

## Styling distributed nodes

    `::distributed()`

For other complex styling, {{site.project_title}} provides the `@polyfill` directive which can be placed inside a CSS comment. The selector next to `@polyfill` replaces the next selector in the `<style>` element. For example, a distributed rule can be polyfilled with careful use of selectors:

    /* @polyfill @host > div */
    ::-webkit-distributed(*) {
      color: red;
    }

Under native Shadow DOM, this rule remains as written. Under the polyfill, it becomes:

    x-foo > div {
      color: red:
    }

## Polyfill details

### Handling scoped styles

Native Shadow DOM gives us style encapsulation for free via scoped styles.
However, the polyfill does not implement CSS scoping behavior by itself. For browsers that lack native Shadow DOM, {{site.project_title}} attempts to shim
scoped styles with the following methods.

1. **Convert rules inside `@host` to rules prefixed with the element's tag name**.

      For example, this rule inside an `x-foo`:

        <polymer-element name="x-foo">
          <template>
            <style>
              @host {
                :scope {
                  display: block;
                }
              }
            </style>
          ...

      becomes:

        <polymer-element name="x-foo">
          <template>
            <style>
              x-foo {
                display: block;
              }
            </style>
          ...

1. **Prepend selectors with the element name, creating a descendent selector**. This makes sure the styling does not leak outside the element's shadowRoot.

      For example, this rule inside an `x-foo`:

        <polymer-element name="x-foo">
          <template>
            <style>
              div { ... }
            </style>
          ...

      becomes:

        <polymer-element name="x-foo">
          <template>
            <style>
              x-foo div { ... }
            </style>
          ...

### Global styles

The `polymer-scope` attribute should be set to global only for a sheet containing just rules that need to be in the global scope like `@font-face`. A global sheet will only be included in the global scope once so it's safe to use it wherever you need it.

    <link rel="stylesheet" href="sheet.css" polymer-scope="global">


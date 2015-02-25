---
layout: default
type: guide
shortname: Articles
title: A Guide to Styling Elements

article:
  author: ebidel
  published: 2013-07-11
  updated: 2014-04-11
  polymer_version: 0.2.2
  description: Learn all about how to style Polymer elements.
tags:
- CSS
---

<link rel="import" href="demos/styling/elements.html">

{% include authorship.html %}

{% include toc.html %}

This article covers many of the new CSS rules, properties, and concepts for
styling [Custom Elements](../platform/custom-elements.html). While much of it is applicable to general Web Components, it specifically focuses on:

1. How to use these new CSS features with {{site.project_title}}
2. How {{site.project_title}}'s polyfills shim certain behaviors

Many of the topics outlined in this article are closely related to how CSS and Shadow DOM interact with each other. If you want the dirty details on styling Shadow DOM, see my article on HTML5Rocks.com, [Shadow DOM 201 - CSS and Styling](http://www.html5rocks.com/tutorials/webcomponents/shadowdom-201/).

## Default styles

Most elements in HTML have default styling applied by the browser. For example,
`<head>` and `<title>` are `display: none`, `<div>` is `display: block`,
`<body>` has `margin: 8px`, and list items are `list-style-type: disc`.

### User-provided styles

As with any HTML element, users of your Custom Element can define styles on it:

    <style>
      x-foo {
        display: block;
      }
      x-foo:hover {
        opacity: 0;
      }
    </style>

    <x-foo></x-foo>

However, it's common for a Custom Element to define its own look.

### Element-defined styles

Elements _you_ create will likely need some sort of styling. `:host` and `:host(<selector>)` allows you to target and style a custom element internally from within its definition:

    <polymer-element name="x-foo" noscript>
      <template>
        <style>
          :host {
            /* Note: by default elements are always display:inline. */
            display: block;
          }
        </style>
      </template>
    </polymer-element>

`:host` refers to the custom element itself and has the lowest specificity. This allows
users to override your styling from the outside.

The more complex form of `:host` is `:host(<selector>)`. It allows you to write a
rule that targets the host if it matches `<selector>`: For example:

    <x-foo class="different"></x-foo>

matches

    :host(.different) {
      ...
    }

#### Reacting to user states

An interesting application of `:host` is for reacting to different user-driven states (:hover, :focus, :active, etc.):

    <polymer-element name="x-button" noscript>
      <template>
        <style>
          :host {
            opacity: 0.6;
            transition: opacity 400ms ease-in-out;
          }
          :host(:hover) { opacity: 1; }
          :host(:active) { ... }
        </style>
        <button><content></content></button>
      </template>
    </polymer-element>

    <x-button>x-buttonz!</x-button>

When someone mouses over `<x-button>` they'll get a sexy fade-in!

**Demo:** <x-button-example>x-buttonz!</x-button-example>

#### Theming an element

The `:host-context(<selector>)` pseudo class matches the host element if it or any of its ancestors matches `<selector>`.

**Example** - color the element if an ancestor has the `different` class:

    :host-context(.different) {
      color: red;
    }

One reason you might find `:host-context()` useful is for theming. For example, many people do theming by applying a class to `<html>` or `<body>`.

    <body class="different">
      <x-foo></x-foo>
    </body>

**Example** - theming an element by outside classes

    <polymer-element name="x-foo" noscript>
      <template>
        <style>
          :host-context(.different) { ... }
        </style>
      </template>
    </polymer-element>

    <body class="different">
      <x-foo></x-foo>
    </body>

#### Programmatically modifying styles

You can dynamically change an element's styling by, you guessed it, modifying
its `.style` property.

From the outside:

    var xFoo = document.createElement('x-foo');
    xFoo.style.background = 'blue';

From within the element:

{% raw %}
    <polymer-element name="x-foo" on-click="{{changeBg}}">
      <template>
        <style>
          :host {
            display: inline-block;
            background: red;
            color: white;
          }
        </style>
        <div>Click me</div>
      </template>
      <script>
        Polymer('x-foo', {
          changeBg: function() {
            this.style.background = 'blue';
          }
        });
      </script>
    </polymer-element>
{% endraw %}

**Demo:** <x-bgchange-example></x-bgchange-example>

If you're feeling loco, it's possible to modify the rules in an `:host`
block using CSSOM:

{% raw %}
    <polymer-element name="x-foo" on-click="{{changeBg}}">
      <template>
        <style>
          :host { background: red; }
        </style>
      </template>
      <script>
        Polymer('x-foo', {
          changeBg: function() {
            var sheet = this.shadowRoot.querySelector('style').sheet;
            // Brittle if :host isn't first in <style>.
            var hostRules = sheet.cssRules[0];
            // Append the rule to the end.
            hostRules.insertRule(':host:hover { color: white; }',
                                 hostRules.cssRules.length);
          }
        });
      </script>
    </polymer-element>
{% endraw %}

The only reason to do this would be to programmatically add/remove pseudo-class rules.
It's also worth noting that this trick doesn't work under {{site.project_title}}'s Shadow DOM polyfill.
See [issue #7](https://github.com/webcomponents/webcomponentsjs/issues/7).

## Preventing FOUC

When you declare `<x-foo>` (or any non-native HTML element), it exists
happily on the page as a regular `HTMLElement`. Only when the browser registers its definition
does `<x-foo>` become magical.

Before an element gets registered, the process of upgrading it may take more time than expected.
For example, an [HTML Import](../platform/html-imports.html) that defines your element might
be slow due to poor network conditions.

To combat these types of UX issues and mitigate things like [FOUC](http://en.wikipedia.org/wiki/Flash_of_unstyled_content), you can use the CSS `:unresolved` pseudo class. It applies to unknown elements right up until the point the lifecycle `createdCallback` is called.

**Support:** CSS `:unresolved` is supported natively in Chrome 29. If you're using
a browser where it is not available natively, use {{site.project_title}}'s [FOUC prevention](../docs/polymer/styling.html#fouc-prevention) features.
{: .alert .alert-success}

**Example:** fade in an element when it's registered

    <style>
      x-foo {
        opacity: 1;
        transition: opacity 300ms;
      }
      x-foo:unresolved {
        opacity: 0;
      }
    </style>

**Example:** using generated content to display a "loading" message

    <style>
      :unresolved {
        display: flex;
        justify-content: center;
        background: rgba(255,255,255,0.5);
        border: 1px dashed #ccc;
        border-radius: 5px;
      }
      :unresolved:after {
        padding: 15px;
        content: 'loading...';
        color: #ccc;
      }
    </style>

### Polyfilling :unresolved

{{site.project_title}} provides the `[unresolved]` attribute to polyfill the CSS
`:unresolved` pseudo class. See [FOUC prevention](../docs/polymer/styling.html#fouc-prevention). The attribute is automatically removed from elements at `polymer-ready` time, the
event that signifies all elements have been upgraded.

**Example**

    <style>
      x-foo[unresolved] {
        /* custom styling */
      }
    </style>
    <x-foo unresolved></x-foo>

## Styling internal markup {#style-shadowdom}

### From inside the element {#style-frominside}

To style the internal markup of an element, include a `<link>` or `<style>` tag
inside the topmost `<template>`:

    <polymer-element name="x-foo" noscript>
      <template>
        <style>
          p {
            padding: 5px;
          }
          #message {
            color: blue;
          }
          .important {
            font-weight: bold;
          }
        </style>
        <div id="message">I'm a status message!</div>
        <p>Web components are great</p>
        <footer class="important">That is all</footer>
      </template>
    </polymer-element>

Scoped styling is one of the many features of Shadow DOM. Styles defined inside
the shadow tree don't leak out and page styles don't bleed in.

{{site.project_title}} creates Shadow DOM from the topmost `<template>`
of your `<polymer-element>` definition, so styles defined internally to your element
are scoped to your element. There's no need to worry about duplicating an id
from the outside or using a styling rule that's too broad.

**Note** For browsers that don't support Shadow DOM natively, the polyfill
attempts to mimic scoped styling as much as possible. See the
[polyfill details on scoped styling](../docs/polymer/styling.html#polyfill-details).
{: .alert .alert-info }

If you need to style nodes distributed into your element from the user's Light DOM,
see [styling distributed nodes](#style-distributed).

#### Styling distributed nodes {#style-distributed}

`<content>` elements allow you to select nodes from the ["Light DOM"](../platform/shadow-dom.html#shadow-dom-subtrees) and render them at predefined locations in your element. The CSS `::content` pseudo-element is a way to style nodes that pass through an insertion point.

**Full example**

    <polymer-element name="x-foo" noscript>
      <template>
        <style>
          content[select="p"]::content * { /* anything distributed here */
            font-weight: bold;
          }
          polyfill-next-selector { content: 'p:first-child'; }
          ::content p:first-child {
            color: red;
          }
          polyfill-next-selector { content: 'footer > p'; }
          ::content footer > p {
            color: green;
          }
          polyfill-next-selector { content: ':host > p'; }
          ::content p { /* scope relative selector */
            color: blue;
          }
        </style>
        <content select="p"></content>
        <content></content>
      </template>
    </polymer-element>

    <!-- Children of x-foo are the Light DOM. -->
    <x-foo>
      <p>I'm red and bold</p>
      <p>I'm blue and bold</p>
      <footer>
        <p>I'm green</p>
        <span>I'm black</span>
      </footer>
    </x-foo>

**Note**: For complex styling like distribute nodes, {{site.project_title}} provides the `polyfill-*`
selectors to polyfill certain Shadow DOM features. See the [Styling reference](../docs/polymer/styling.html#directives) for more information on the directives.
{: .alert .alert-info }

**Remember:** styles defined in the main document continue to apply to the Light DOM nodes they target, even if those nodes are distributed into Shadow DOM. Going into an insertion point doesn't change what styles are applied. An example helps illustrate this point:

    <style>
      x-foo > div {
        color: green;
      }
      .red {
        color: red;
      }
    </style>

    <polymer-element name="x-foo" noscript>
      <template>
        <div class="red">Shadow DOM: shouldn't be red (under native Shadow DOM)</div>
        <content select="div"></content>
      </template>
    </polymer-element>

    <x-foo>
      <div>Light DOM: green</div>
    </x-foo>

<style>
  x-foo-example2 > div {
    color: green;
  }
  .red {
    color: red;
  }
</style>

**Demo:**

<x-foo-example2 style="margin-bottom:20px;">
  <div>Light DOM: green</div>
</x-foo-example2>

The element's Shadow DOM `<div class="red">` does not match the `.red` class.
The distributed `<div>Light DOM: green</div>` remains green because
it's logically still in the parent page and therefore matching `x-foo > div`.
It's simple being rendered elsewhere (over in Shadow DOM land).

### From outside the element {#style-fromoutside}

The `::shadow` pseudo-element and the `/deep/` combinator pierce through Shadow DOM's boundaries and allow you to style elements within different shadow trees.

#### The `::shadow` pseudo-element {#hat}

If an element has at least one shadow tree, the `::shadow` pseudo-element matches the shadow roots themselves.
For example, say you wanted to style x-foo's internal `p` element. Writing `x-foo::shadow` selects x-foo's shadow root. From there, you can write a normal descendant selector to get at the `p`:

    <style>
      x-foo::shadow p {
        color: red;
      }
      /* Equivalent to previous rule (in this case). */
      x-foo::shadow > p {
        color: red;
      }
    </style>

    <polymer-element name="x-foo" noscript>
      <template>
        <p>I am red!</p>
        <content></content>
      </template>
    </polymer-element>

    <x-foo>
      <p>I am not red (under native shadow dom).</p>
    </x-foo>

**Demo:**

<style shim-shadowdom>
  x-foo-shadow::shadow p {
    color: red;
  }
</style>

<x-foo-shadow style="margin-bottom:20px;">
  <p>I am not red (under native shadow dom).</p>
</x-foo-shadow>

In this example, `<p>I am not red (under native shadow dom)</p>` remains unstyled because the `x-foo::shadow p { ... }` rule only targets the `<p>` internal to x-foo (e.g. in its Shadow DOM). Under the polyfill, it _is_ styled red. This is because {{site.project_title}} replaces the `::shadow`, rewriting the rule to be `x-foo p`.

A more full fledged example is styling a tabs component, say `<x-tabs>`. It has `<x-panel>` children in its Shadow DOM, each of which has an `h2` heading. To style those headings from the main page, one could use the `::shadow` pseudo-element like so:

{%raw%}
    <style>
      x-tabs::shadow x-panel::shadow h2 {
        ...
      }
    </style>

    <polymer-element name="x-tabs" noscript>
      <template>
        <x-panel heading="Title">
          <p>Lorem Ipsum</p>
        </x-panel>
        ...
      </template>
    </polymer-element>

    <polymer-element name="x-panel" attributes="heading" noscript>
      <template>
        <h2>{{heading}}</h2>
        <content>No content provided.</content>
      </template>
    </polymer-element>

    <x-tabs></x-tabs>
{%endraw%}

#### The `/deep/` combinator {#cat}

The `/deep/` combinator is similar to `::shadow`, but more powerful. It completely **ignores all shadow boundaries and crosses into any number of shadow trees**.

**Example** style all `h2` elements that are descendants of an `<x-tabs>`, anywhere in a shadow tree:

    x-tabs /deep/ h2 {
      ...
    }

**Example** style all elements with the class `.library-theme`, anywhere in a shadow tree:

    body /deep/ .library-theme {
      ...
    }

## Conclusion

There are a bunch of new concepts when it comes to styling Custom Elements. What makes
things particularly interesting (and at the same time, wonky) is this Shadow DOM guy.
In web development, we're conditioned to think, "Yay! Globals everywhere!" That goes
for DOM, CSS, and JS. Not so with Custom Elements. It's a brave new world, but a powerful one
of encapsulation, puppies, and fluffy bunnies. Drink it in.

{% include disqus.html %}

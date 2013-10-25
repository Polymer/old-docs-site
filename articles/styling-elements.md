---
layout: default
title: A Guide to Styling Elements

article:
  author: ebidel
  published: 2013-07-11
  updated: 2013-10-25
  polymer_version: 0.0.20130808
  description: Learn all about how to style Polymer elements.
tags:
- CSS
---

<link rel="import" href="/articles/demos/styling/elements.html">

{% include authorship.html %}

{% include toc.html %}

This article covers many of the new CSS rules, properties, and concepts for
styling [Custom Elements](/platform/custom-elements.html). While much of it is applicable to general Web Components, it specifically focuses on:

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

**Heads up**: `@host` is going away soon in favor of `:host()`. See the [spec bug](https://www.w3.org/Bugs/Public/show_bug.cgi?id=22390).
{: .alert .alert-error}

Elements _you_ create will likely need some sort of styling.

The [`@host` at-rule](https://dvcs.w3.org/hg/webcomponents/raw-file/tip/spec/shadow/index.html#host-at-rule) allows you to target and style an element internally, from within its definition:

    <polymer-element name="x-foo">
      <template>
        <style>
          @host {
            /* Three equivalent rules, in order of preference. */
            :scope {
              display: block; /* Note: by default elements are always display:inline. */
            }
            * {
              display: block;
            }
            x-foo {
              display: block;
            }
          }
        </style>
      </template>
      <script>Polymer('x-foo');</script>
    </polymer-element>

The only selectors that work in `@host` are those targeting the host element itself,
in this case, `<x-foo>`. In the context of `@host`, you can use the [`:scope`](http://www.w3.org/TR/selectors4/#scope-pseudo) pseudo-class, `*`, or the type selector (`x-foo`)
to refer to the element. They have slightly different meanings, but for all intents
and purposes, all three are equivalent. When in doubt, use `:scope` to refer to the custom element itself.

#### Reacting to user states

An interesting application of `@host` is for reacting to different user-driven states (:hover, :focus, :active, etc.):

    <polymer-element name="x-button">
      <template>
        <style>
          @host {
            :scope {
              opacity: 0.6;
              transition: opacity 400ms ease-in-out;
            }
            :scope:hover { opacity: 1; }
            :scope:active { ... }
          }
        </style>
        <button><content></content></button>
      </template>
      <script>Polymer('x-button');</script>
    </polymer-element>

    <x-button>x-buttonz!</x-button>

When someone mouses over `<x-button>` they'll get a sexy fade-in!

**Demo:** <x-button-example>x-buttonz!</x-button-example>

#### Programmatically modifying styles

You can dynamically change an element's styling by, you guessed it, modifying 
ts `.style` property.

From the outside:

    var xFoo = document.createElement('x-foo');
    xFoo.style.background = 'blue';

From within the element:

    <polymer-element name="x-foo" on-click="{{changeBg}}">
      <template>
        <style>
          @host {
            :scope {
              display: inline-block;
              background: red;
              color: white;
            }
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

**Demo:** <x-bgchange-example></x-bgchange-example>

If you're feeling loco, it's possible to modify the rules in an `@host`
block using CSSOM:

    <polymer-element name="x-foo" on-click="{{changeBg}}">
      <template>
        <style>
          @host { :scope { background: red; } }
        </style>
      </template>
      <script>
        Polymer('x-foo', {
          changeBg: function() {
            var sheet = this.shadowRoot.querySelector('style').sheet;
            // Brittle if @host isn't first in <style>.
            var hostRules = sheet.cssRules[0];
            // Append the rule to the end.
            hostRules.insertRule(':scope:hover { color: white; }',
                                 hostRules.cssRules.length);
          }
        });
      </script>
    </polymer-element>

The only reason to do this would be to programmatically add/remove pseudo-class rules.
It's also worth noting that this trick doesn't work under {{site.project_title}}'s Shadow DOM polyfill.
See [issue #23](https://github.com/Polymer/platform/issues/23).

For more information on `@host`, see [Shadow DOM 201 - CSS and Styling](http://www.html5rocks.com/en/tutorials/webcomponents/shadowdom-201/#toc-style-host).

## Preventing FOUC

When you declare `<x-foo>` (or any non-native HTML element), it exists
happily on the page as a regular `HTMLElement`. Only when the browser registers its definition
does `<x-foo>` become magical.

Before an element gets registered, the process of upgrading it may take more time than expected.
For example, an [HTML Import](/platform/html-imports.html) that defines your element might
be slow due to poor network conditions.

To combat these types of UX issues and mitigate things like [FOUC](http://en.wikipedia.org/wiki/Flash_of_unstyled_content), you can use the CSS `:unresolved` pseudo class. It applies to unknown elements right up until the point the lifecycle `createdCallback` is called.

**Support:** CSS `:unresolved` is supported natively in Chrome 29. It has not been polyfilled.
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

### "Polyfilling" :unresolved

Until `:unresolved` is widely supported in browsers, you can use my little trick to fake the
behavior. The basic idea is to add a CSS class to the Custom Element when {{site.project_title}}'s `WebComponentsReady` event fires.

**Example:** Faking `:unresolved`:

    <style>
      x-foo:not(.resolved) { ... }
    </style>
    <x-foo></x-foo>
    <script>
      document.addEventListener('WebComponentsReady', function(e) {
        // Add .resolved to all custom elements. This is a hack until :unresolved is
        // supported in all browsers and Polymer registers elements using document.register().
        for (var name in CustomElements.registry) {
          var els = document.querySelectorAll(name + ', [is="' + name + '"]');
          [].forEach.call(els, function(el, i) {
            el.classList.add('resolved');
          });
        }
      });
    </script>

`WebComponentsReady` signifies when all elements have been upgraded.

## Inheriting / resetting outside styles

As a convenience, {{site.project_title}} allows you to set Shadow DOM's `applyAuthorStyles` and `resetStyleInheritance` properties directly when constructing the element's `prototype`.
However, please keep in mind that {{site.project_title}} does not attempt to polyfill `applyAuthorStyles` or `resetStyleInheritance`.

Take on the look and feel of the page with `applyAuthorStyles`:

    Polymer('x-foo', {
      applyAuthorStyles: true,
      //resetStyleInheritance: true,
      ready: function() { ... },
      ...
    });

Alternatively, you can set either of these at any time directly on the shadowRoot:

    ready: function() {
      this.shadowRoot.applyAuthorStyles = true;
      this.shadowRoot.resetStyleInheritance = false; // default.
    }

**Remember:** styles defined in the main document continue to apply to the Light DOM nodes they target,
even if those nodes are distributed into Shadow DOM. Basically, going into an insertion point doesn't change what styles are applied. An example helps illustrate this point:

    <style>
      x-foo > div {
        color: green;
      }
      .red {
        color: red; 
      }
    </style>

    <polymer-element name="x-foo">
      <template>
        <div class="red">Shadow DOM: red when applyAuthorStyles=true</div>
        <content select="div"></content>
      </template>
      <script>
        Polymer('x-foo', {
          applyAuthorStyles: true
        });
      </script>
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

The element's Shadow DOM `<div class="red">` matches the `.red` class when
`applyAuthorStyles` is true. When it's false, we're not "applying the authors styles"
and it doesn't match. The distributed `<div>Light DOM: green</div>` remains green because
it's logically still in the parent page and therefore matching `x-foo > div`.
It's simple being rendered elsewhere (over in Shadow DOM land).

**Gotcha**: Even with `.applyAuthorStyles` set, selectors don't cross Shadow DOM boundaries.
Styles on the outside only apply when the selector in question matches entirely
in or outside the shadowRoot. For example, `x-foo .red { color: red; }` does not
match the inner `<div class="red">`.
{: .alert .alert-info }

For more information on `applyAuthorStyles` and `resetStyleInheritance`, see [Shadow DOM 201 - CSS and Styling](http://www.html5rocks.com/tutorials/webcomponents/shadowdom-201/#toc-style-inheriting).

## Styling the internal markup {#style-shadowdom}

To style the internal markup of an element, include a `<link>` or `<style>` tag
inside the topmost `<template>`:

    <polymer-element name="x-foo">
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
      <script>Polymer('x-foo');</script>
    </polymer-element>

Scoped styling is one of the many features of Shadow DOM. Styles defined inside
the shadow tree don't leak out and page styles don't bleed in.

{{site.project_title}} creates Shadow DOM from the topmost `<template>`
of your `<polymer-element>` definition, so styles defined internally to your element
are scoped to your element. There's no need to worry about duplicating an id
from the outside or using a styling rule that's too broad.

**Note** For browsers that don't support Shadow DOM natively, the polyfill
attempts to mimic scoped styling as much as possible. See the
[polyfill details on scoped styling](#polyfilldetails).
{: .alert .alert-info }

If you need to style nodes distributed into your element from the user's Light DOM,
see [styling distributed nodes](#style-distributed).

## Defining style hooks {#style-hooks}

**Heads up:** The `pseudo` attribute and `::x-*` custom pseudo elements are 
getting replaced soon by `part` and `::part()`, respectively. See the [spec bug](https://www.w3.org/Bugs/Public/show_bug.cgi?id=22461).
{: .alert .alert-error}

Nodes in your element that contain the `pseudo` attribute can be targeted from outside CSS.
These are called [Custom pseudo elements](http://www.w3.org/TR/shadow-dom/#custom-pseudo-elements). Essentially, they give users a way to style specific pieces of your element by exposing some of its internal structure.

**Example**

    <style>
      x-foo::x-header {
        color: black;
        background: yellow;
      }
    </style>

    <polymer-element name="x-foo">
      <template>
        <h1 pseudo="x-header">I'm an x-foo!</h1>
      </template>
      <script>Polymer('x-foo');</script>
    </polymer-element>

    <x-foo></x-foo>

**Note**: the name of a custom pseudo element needs to be prefixed with "x-".
{: .alert .alert-info }

For more information on custom pseudo elements, see [Shadow DOM 201 - CSS and Styling](http://www.html5rocks.com/en/tutorials/webcomponents/shadowdom-201/#toc-custom-pseduo).

## Styling distributed nodes {#style-distributed}

**Heads up:** The `::distributed()` is being renamed soon to `::content()`.
See the [spec bug](https://www.w3.org/Bugs/Public/show_bug.cgi?id=22460).
{: .alert .alert-error}

`<content>` elements allow you to select nodes from the "Light DOM" and
render them at predefined locations in your element. The CSS `::distributed()` function
is used to style nodes that pass through one of points. It's argument is
a CSS selector to match node(s) distributed at that insertion point.

**Example**

    <polymer-element name="x-foo">
      <template>
        <style>
          content[select="p"]::-webkit-distributed(*) { /* anything distributed here */
            font-weight: bold;
          }
          ::-webkit-distributed(p:first-child) {
            color: red;
          }
          ::-webkit-distributed(footer > p) {
            color: green;
          }
          ::-webkit-distributed(> p) { /* scope relative selector */
            color: blue;
          }
        </style>
        <content select="p"></content>
        <content></content>
      </template>
      <script>Polymer('x-foo');</script>
    </polymer-element>

    <!-- Children of x-foo are the Light DOM -->
    <x-foo>
      <p>I'm red and bold</p>
      <p>I'm blue and bold</p>
      <footer>
        <p>I'm also red</p>
        <p>I'm green</p>
        <span>I'm black</span>
      </footer>
    </x-foo>

### {{site.project_title}}'s @polyfill directive

To polyfill complex styling like this, {{site.project_title}} provides the `@polyfill`
directive to be placed inside a CSS comment above your rule. The string next
to `"@polyfill"` describes a CSS selector and is used to replace the next rule
in the `<style>` element.

One use for `@polyfill` is to polyfill `::distributed()` rules. You can do this
through careful use of selectors:

    /* @polyfill @host .bar */
    ::-webkit-distributed(.bar) {
      color: red;
    }

Under native Shadow DOM the above rule remains as written. Under the polyfill, it becomes:

    x-foo .bar {
      color: red:
    }

For more information on `::distributed()`, see [Shadow DOM 201 - CSS and Styling](http://www.html5rocks.com/en/tutorials/webcomponents/shadowdom-201/#toc-style-disbtributed-nodes).

## Polyfill details {#polyfilldetails}

### Handling scoped styles

Native Shadow DOM gives us style encapsulation for free via scoped styles. For browsers
that lack native support, {{site.project_title}}'s polyfills attempt to shim _some_
of the scoping behavior.

Because polyfilling the styling behaviors of Shadow DOM is difficult, {{site.project_title}}
has opted to favor practicality and performance over correctness. For example,
the polyfill's do not protect Shadow DOM elements against document level CSS.
 
When {{site.project_title}} processes element definitions, it looks for `<style>` elements
and stylesheets. It removes these from the custom element's Shadow DOM `<template>`
and re-formulates them according to the rules below. Once this is done, a `<style>`
element is added to the main document with the reformulated rules.

#### Reformatting rules

1. **Convert rules inside `@host` to rules prefixed with the element's tag name**

      For example, this rule inside an `x-foo`:

        <polymer-element name="x-foo">
          <template>
            <style>
              @host {
                :scope { ... }
                :scope:hover { ... }
              }
            </style>
          ...

      becomes:

        <polymer-element name="x-foo">
          <template>
            <style>
              x-foo { ... }
              x-foo:hover { ... }
            </style>
          ...

1. **Prepend selectors with the element name, creating a descendent selector**.
This ensures styling does not leak outside the element's shadowRoot (e.g. upper bound encapsulation).

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

      Note, this technique does not enforce lower bound encapsulation. For that,
      you need to set `Platform.ShadowCSS.strictStyling = true`. This isn't the
      yet the default because it requires that you add the custom element's
      name as an attribute on all DOM nodes in the shadowRoot (e.g. `<span x-foo>`).

### Making styles global

Sometimes you need globals.

According to spec, certain CSS @-rules like `@keyframe` and `@font-face`
cannot be defined in a `<style scoped>`. Therefore, you need to either declare
their definitions outside the element or make them global using the
`polymer-scope="global"` attribute.

**Example:** making a stylesheet global

    <polymer-element name="x-foo">
      <template>
        <link rel="stylesheet" href="fonts.css" polymer-scope="global">
        ...
      </template>
      <script>Polymer('x-foo');</script>
    </polymer-element>

A stylesheet or `<style>` that uses the `polymer-scope="global"` attribute
is moved to the `<head>` of the main page. This happens once, and you can safely
use it wherever you need it.

**Example:** Define and use CSS animations in an element

    <polymer-element name="x-blink">
      <template>
        <style polymer-scope="global">
          @-webkit-keyframes blink {
            to { opacity: 0; }
          }
        </style>
        <style>
          @host {
            :scope {
              -webkit-animation: blink 1s cubic-bezier(1.0,0,0,1.0) infinite 1s;
            }
          }
        </style>
        ...
      </template>
      <script>Polymer('x-blink');</script>
    </polymer-element>

**Note:** `polymer-scope="global"` should only be used for stylesheets or `<style>`
that contain rules which need to be in the global scope (e.g. `@keyframe` and `@font-face`).
{: .alert .alert-error}

## Conclusion

There are a bunch of new concepts when it comes to styling Custom Elements. What makes
things particularly interesting (and at the same time, wonky) is this Shadow DOM guy.
In web development, we're conditioned to think, "Yay! Globals everywhere!" That goes
for DOM, CSS, and JS. Not so with Custom Elements. It's a brave new world, but a powerful one
of encapsulation, puppies, and fluffy bunnies. Drink it in.

{% include disqus.html %}

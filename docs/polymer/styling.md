---
layout: default
type: core
navgroup: docs
shortname: Docs
title: Styling reference
---

{% include toc.html %}

**Note:** styling {{site.project_title}} elements is no different than styling custom elements.
For a complete guide on the basics, see "[A Guide to Styling Elements](/articles/styling-elements.html)".
{: .alert }

In addition to the [standard features for styling Custom Elements](/articles/styling-elements.html), {{site.project_title}} contains extra goodies for fully controlling element styling. This document outlines those features, including FOUC prevention, the specifics on how the the Shadow DOM polyfill applies styles, and workarounds for current limitations.

## FOUC prevention

Before custom elements [upgrade](http://www.html5rocks.com/tutorials/webcomponents/customelements/#upgrades) they may display incorrectly. To help mitigate [FOUC](http://en.wikipedia.org/wiki/Flash_of_unstyled_content) issues, {{site.project_title}} provides a polyfill solution for the [`:unresolved` pseudo class](/articles/styling-elements.html#preventing-fouc). For simple apps, you can add the `unresolved` attribute to body. This initially hides the page until all elements are upgraded:

    <body unresolved>

Class name | Behavior
|-
`body[unresolved]` | Makes the body `opacity: 0; display: block; overflow: hidden`.
`[resolved]` | Fades-in the body over 200ms.
{: .table .responsive-table .fouc-table }

If you want finer control, add `unresolved` to individual elements rather
than body. This shows the entire page upfront but allows you to control unresolved
element styling yourself:

    <style>
      [unresolved] {
        opacity: 0;
        /* other custom styles for unresolved elements */
      }
    </style>
    <x-foo unresolved>If you see me, elements are upgraded!</x-foo>
    <div unresolved></div>

Upon [`polymer-ready`](/docs/polymer/polymer.html#polymer-ready) firing, {{site.project_title}} runs the following steps:

1. removes the `[unresolved]` attribute from elements that have it
2. adds the `[resolved]` attribute
3. removes `[resolved]` on the first `transitionend` event the element receives

### Unveiling elements after boot time {#unveilafterboot}

The veiling process can be used to prevent FOUC at times other than page load. To do so, apply the `[unresolved]` attribute to the desired elements and swap it out for the `[resolved]` attribute when the elements should be displayed. For example,

    element.setAttribute('unresolved', '');

    // ... some time late ...
    element.setAttribute('resolved', '');
    element.removeAttribute('unresolved');

## Polyfill styling directives {#directives}

When running under the polyfill, {{site.project_title}} has `@polyfill-*`
directives to give you more control for how Shadow DOM styling is shimmed.

### @polyfill {#at-polyfill}

The `@polyfill` directive is used to replace a native CSS selector with one that
will work under the polyfill. For example, targeting distributed nodes using `::content` only works under native Shadow DOM. Instead, you can tell {{site.project_title}} to replace said
rules with ones compatible with the polyfill.

To replace native rules, place `@polyfill` inside a CSS comment above the 
style rule you want to replace. The string next to `"@polyfill"` indicates a
CSS selector to replace the next style rule with. For example:

    /* @polyfill .bar */
    ::content .bar {
      color: red;
    }
    
    /* @polyfill :host > .bar */
    ::content .bar {
      color: blue;
    }

    /* @polyfill .container > * */
    ::content > * {
      border: 1px solid black;
    }

Under native Shadow DOM nothing changes. Under the polyfill the native selector 
s replaced with the one in the `@polyfill` comment above it:

    x-foo .bar {
      color: red;
    }
    
    x-foo > .bar {
      color: blue;
    }

    x-foo .container > * {
      border: 1px solid black;
    }


**Tip:** If you use a CSS preprocessor, be careful that it doesn't strip out the `@polyfill` comments.
{: .alert .alert-error }

### @polyfill-rule {#at-polyfill-rule}

The `@polyfill-rule` directive is used to create a style rule that should apply *only* when the Shadow DOM polyfill is in use. It's a useful catch-all when it's not possible to write a rule that can automatically morph between native Shadow DOM and polyfill Shadow DOM. Because of the simulated styling {{site.project_title}} provides, you should rarely need to use this directive.

To create a rule that only applies under the polyfill, place the `@polyfill-rule` directive entirely inside a CSS comment:

    /* @polyfill-rule .foo {
      background: red;
    } */
     
    /* @polyfill-rule :host.foo .bar {
      background: blue;
    } */

This has no effect under native Shadow DOM but under the polyfill, the comment is removed and the selector prefixed with the element name:

    x-foo .foo {
      background: red;
    }
    
    x-foo.foo .bar {
      background: blue;
    }

### @polyfill-unscoped-rule {#at-polyfill-unscoped-rule}

`@polyfill-unscoped-rule` is exactly the same as `@polyfill-rule` except that the rules inside it are not scoped by the polyfill. The rule you write is exactly what will be applied.

`@polyfill-unscoped-rule` should only be needed in rare cases. {{site.project_title}} uses CSSOM to modify styles and there are a several known rules that don't round-trip correctly via CSSOM (on some browsers). One example using CSS `calc()` in Safari. It's only in these rare cases that `@polyfill-unscoped-rule` should be used.

{%comment%}
## Making styles global

According to CSS spec, certain @-rules like `@keyframe` and `@font-face`
cannot be defined in a `<style scoped>`. Therefore, they will not work in Shadow DOM.
Instead, you'll need to declare their definitions outside the element. 

Stylesheets and `<style>` elements in an HTML import are included in the main document automatically:

    <link rel="stylesheet" href="animations.css">

    <polymer-element name="x-foo" ...>
      <template>...</template>
    </polymer-element>

Example of defining a global `<style>`:

    <style>
      @-webkit-keyframes blink {
        to { opacity: 0; }
      }
    </style>

    <polymer-element name="x-blink" ...>
      <template>
        <style>
          :host {
            -webkit-animation: blink 1s cubic-bezier(1.0,0,0,1.0) infinite 1s;
          }
        </style>
        ...
      </template>
    </polymer-element>

{{site.project_title}} also supports making a `<style>` or inline stylesheet global using the
`polymer-scope="global"` attribute.

**Example:** making a stylesheet global

    <polymer-element name="x-foo" ...>
      <template>
        <link rel="stylesheet" href="fonts.css" polymer-scope="global">
        ...
      </template>
    </polymer-element>

Stylsheets that use `polymer-scope="global"` are moved to the `<head>` of the main page. This happens once.

**Example:** Define and use CSS animations in an element

    <polymer-element name="x-blink" ...>
      <template>
        <style polymer-scope="global">
          @-webkit-keyframes blink {
            to { opacity: 0; }
          }
        </style>
        <style>
          :host {
            -webkit-animation: blink 1s cubic-bezier(1.0,0,0,1.0) infinite 1s;
          }
        </style>
        ...
      </template>
    </polymer-element>

**Note:** `polymer-scope="global"` should only be used for stylesheets or `<style>`
that contain rules which need to be in the global scope (e.g. `@keyframe` and `@font-face`).
{: .alert .alert-error}
{%endcomment%}

## Including stylesheets in an element

{{site.project_title}} allows you to include stylesheets in your `<polymer-element>` definitions, a feature not supported natively by Shadow DOM. {{site.project_title}} transmutes `<link rel="stylesheet">` stylesheets into equivalent `@import` rules. That is:

    <polymer-element name="my-element">
      <template>
        <link rel="stylesheet" href="my-element.css">
         ...
      </template>
    </polymer>

is automatically converted to:

    <polymer-element ...>
      <template>
        <style>@import "my-element.css";</style>
         ...
      </template>
    </polymer>

Where possible, we recommend explicitly using `@import` rules to include external stylesheets in an element as this avoids the above conversion step.

## Polyfill details

### Handling scoped styles

Native Shadow DOM gives us style encapsulation for free via scoped styles. For browsers
that lack native support, {{site.project_title}}'s polyfills attempt to shim _some_
of the scoping behavior.

Because polyfilling the styling behaviors of Shadow DOM is difficult, {{site.project_title}}
has opted to favor practicality and performance over correctness. For example,
the polyfill's do not protect Shadow DOM elements against document level CSS.
 
When {{site.project_title}} processes element definitions, it looks for `<style>` elements
and stylesheets. It removes these from the custom element's Shadow DOM `<template>`, rejiggers them according to the rules below, and appends a `<style>` element to the main document with the reformulated rules.

#### Reformatting rules {#reformatrules}

1. **Replace `:host`, including `:host(<compound selector>)` by prefixing with the element's tag name**

      For example, these rules inside an `x-foo`:

        <polymer-element name="x-foo">
          <template>
            <style>
              :host { ... }
              :host:hover { ... }
              :host(.foo) > .bar { ... }
            </style>
          ...

      becomes:

        <polymer-element name="x-foo">
          <template>
            <style>
              x-foo { ... }
              x-foo:hover { ... }
              x-foo.foo > .bar, .foo x-foo > bar {...}
            </style>
          ...

1. **Prepend selectors with the element name, creating a descendant selector**.
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
      you need to [forcing strict styling](#strictstyling).

1. **Replace `/shadow/` and `/shadow-deep/`** with a `<space>` character.

### Forcing strict styling {#strictstyling}

By default, {{site.project_title}} does not enforce lower bound styling encapsulation.
The lower bound is the boundary between insertion points and the shadow host's children.

You can turn lower bound encapsulation by setting `Platform.ShadowCSS.strictStyling`:

    Platform.ShadowCSS.strictStyling = true

This isn't the yet the default because it requires that you add the custom element's name as an attribute on all DOM nodes in the shadowRoot (e.g. `<span x-foo>`).

## Using Shadow DOM styling features outside of elements {#sdcss}

Under the polyfill, {{site.project_title}} automatically examines any style or link elements inside of a `<polymer-element>` in order to shim Shadow DOM CSS features and process [@polyfill styling directives](#directives). For example, if you're using `/shadow/` and `/shadow-deep/` inside an element, the selectors are rewritten so they work in unsupported browsers. See [Remoformatting rules](#reformatrules) above.

However, for performance reasons styles outside of an element are not shimmed.
Therefore, if you're using `/shadow/` and `/shadow-deep/` in your main page stylesheet, be sure to include `shim-shadowdom` on the `<style>` or `<link rel="stylesheet">` that contains these rules. The attribute instructs {{site.project_title}} to shim the styles inside.

    <link rel="stylesheet"  href="main.css" shim-shadowdom>

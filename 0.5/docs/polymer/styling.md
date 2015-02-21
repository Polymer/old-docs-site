---
layout: default
type: guide
shortname: Docs
title: Styling elements
subtitle: Guide
---

{% include toc.html %}

**Note:** styling {{site.project_title}} elements is no different than styling custom elements.
For a complete guide on the basics, see "[A Guide to Styling Elements](../../articles/styling-elements.html)".
{: .alert }

In addition to the [standard features for styling Custom Elements](../../articles/styling-elements.html), {{site.project_title}} contains extra goodies for fully controlling element styling. This document outlines those features, including Flash-of-Unstyled-Content (FOUC) prevention, the specifics on how the the Shadow DOM polyfill applies styles, and workarounds for current limitations.

## FOUC prevention

Before custom elements [upgrade](http://www.html5rocks.com/tutorials/webcomponents/customelements/#upgrades) they may display incorrectly. To help mitigate [FOUC](http://en.wikipedia.org/wiki/Flash_of_unstyled_content) issues, {{site.project_title}} provides a polyfill solution for the [`:unresolved` pseudo class](../../articles/styling-elements.html#preventing-fouc). For simple apps, you can add the `unresolved` attribute to body. This initially hides the page until all elements are upgraded:

    <body unresolved>

Class name | Behavior
|-
`body[unresolved]` | Makes the body `opacity: 0; display: block; overflow: hidden; transition: opacity ease-in 0.2s;`.
{: .table .responsive-table .fouc-table }

Upon [`polymer-ready`](polymer.html#polymer-ready) firing, {{site.project_title}} removes this
attribute and fades-in the body over 200ms.

If you want finer control, don't add `unresolved` to `body`. Instead, add it custom
elements and define your own styling. For example, this will show the entire page upfront but allow you to control/style `x-foo` before it is resolved.

    <style>
      [unresolved] {
        opacity: 0;
        /* other custom styles for unresolved elements */
      }
    </style>
    <x-foo unresolved>If you see me, elements are upgraded!</x-foo>

{{site.project_title}} will automatically remove the `unresolved` attribute
from your polymer-elements but, unlike the default `body` styling, you are responsible
for providing the styling.

### Unveiling elements after boot time {#unveilafterboot}

The veiling process can be used to prevent FOUC at times other than page load. To do so, apply the `[unresolved]` attribute to the desired elements and swap it out for the `[resolved]` attribute when the elements should be displayed. For example,

    element.setAttribute('unresolved', '');

    // ... some time later ...
    element.setAttribute('resolved', '');
    element.removeAttribute('unresolved');

## Including stylesheets in an element

{{site.project_title}} allows you to include stylesheets in your `<polymer-element>` definitions, a feature not supported natively by Shadow DOM. That is:

    <polymer-element name="my-element">
      <template>
        <link rel="stylesheet" href="my-element.css">
         ...
      </template>
      <script>
        Polymer(...);
      </script>
    </polymer-element>

{{site.project_title}} will automatically inline the `my-element.css` stylesheet using a `<style>`:

    <polymer-element ...>
      <template>
        <style>.../* Styles from my-element.css */...</style>
         ...
      </template>
      <script>
        Polymer(...);
      </script>
    </polymer-element>

Be careful to put the stylesheet inside the template. We recommend putting the `<script>` tag below the template, especially if you include a stylesheet, however note this is optional otherwise.

## Polyfill CSS selectors {#directives}

When running under the Shadow DOM polyfill, {{site.project_title}} provides special `polyfill-*`
CSS selectors to give you more control on how style rules are shimmed.

### polyfill-next-selector {#at-polyfill}

The `polyfill-next-selector` selector is used to replace a native CSS selector with one that
will work under the polyfill.

To replace native CSS style rules, place `polyfill-next-selector {}` above the
selector you need to polyfill. Inside of `polyfill-next-selector`, add a
`content` property. Its value should be a CSS selector that is roughly equivalent to
the native rule. {{site.project_title}} will use this value to shim the native selector.

For example, in earlier versions of {{site.project_title}} targeting distributed nodes using `::content` only worked under the native Shadow DOM. This is no longer the case and in polyfilled browsers the `::content` elements will be removed. Under the polyfill, the following selector:

    .foo ::content .bar {
      color: red;
    }

Becomes:

    .foo .bar {
      color: red;
    }

This means you only need `polyfill-next selector` when doing something that would not work if `::content` were removed.

For example: `::content > *` will not work in a polyfilled browser because `> *` is not a valid selector. This selector could be rewritten as follows:

    polyfill-next-selector { content: ':host > *' }
    ::content > * { }

Under native Shadow DOM nothing changes. Under the polyfill, the native selector is replaced with the one defined in its `polyfill-next-selector` predecessor.

### polyfill-rule {#at-polyfill-rule}

The `polyfill-rule` selector is useful for creating style rules that *only* apply when the Shadow DOM polyfill is in use. When you can't write a style rule that works across native and Shadow DOM polyfill, it's your solution. However, because of the style shimming {{site.project_title}} provides, you should rarely need to use this selector.

To use `polyfill-rule`, create the rule and include a list of styles. Then, add a `content` property describing the CSS selector those styles should apply to. For example:

    polyfill-rule {
      content: '.bar';
      background: red;
    }

    polyfill-rule {
      content: ':host.foo .bar';
      background: blue;
    }

These rules are a noop under native Shadow DOM. Under the polyfill, `polyfill-rule` is replaced by the selector in `content`. {{site.project_title}} also prefixes the rule with the element name.

The previous examples become:

    x-foo .bar {
      background: red;
    }

    x-foo.foo .bar {
      background: blue;
    }

### polyfill-unscoped-rule {#at-polyfill-unscoped-rule}

The `polyfill-unscoped-rule` selector is exactly the same as `polyfill-rule` except that the rules inside it are not scoped by the polyfill. The selector you write is exactly what will be applied.

    polyfill-unscoped-rule {
      content: '#menu > .bar';
      background: blue;
    }

produces:

    #menu > .bar {
      background: blue;
    }

You should only need `polyfill-unscoped-rule` in rare cases. {{site.project_title}} uses CSSOM to modify styles and there are a several known rules that don't round-trip correctly via CSSOM (on some browsers). One example using CSS `calc()` in Safari. It's only in these rare cases that `polyfill-unscoped-rule` should be used.

<!-- {%comment%}
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
 -->

## Controlling the polyfill's CSS shimming {#stylingattrs}

{{site.project_title}} provides hooks for controlling how and where the Shadow DOM polyfill
does CSS shimming.

### Ignoring styles from being shimmed {#noshim}

Inside an element, the `no-shim` attribute on a `<style>` or `<link rel="stylesheet">` instructs {{site.project_title}} to ignore the styles within. No style shimming will be performed.

    <polymer-element ...>
      <template>
        <link rel="stylesheet"  href="main.css" no-shim>
        <style no-shim>
         ...
        </style>
      ...

This can be a small performance win when you know the stylesheet(s) in question do not contain any Shadow DOM CSS features.

### Shimming styles outside of polymer-element {#sdcss}

Under the polyfill, {{site.project_title}} automatically examines any style or link elements inside of a `<polymer-element>`. This is done so Shadow DOM CSS features can be shimmed and [polyfill-*](#directives) selectors can be processed. For example, if you're using `::shadow` and `/deep/` inside an element, the selectors are rewritten so they work in unsupported browsers. See [Reformatting rules](#reformatrules) above.

However, for performance reasons styles outside of an element are not shimmed.
Therefore, if you're using `::shadow` and `/deep/` in your main page stylesheet, be sure to include `shim-shadowdom` on the `<style>` or `<link rel="stylesheet">` that contains these rules. The attribute instructs {{site.project_title}} to shim the styles inside.

    <link rel="stylesheet"  href="main.css" shim-shadowdom>

**Note:** Using `shim-shadowdow` on a large stylesheet can be a potential performance hit. Polymer XHRs the stylesheet content and shims the styles manually, at runtime. If you need to shim Shadow DOM styles in your main page stylesheet, consider separating out the Shadow DOM CSS rules from the bulk of the page CSS and use `shim-shadowdom` on the other file:

    <link rel="stylesheet"  href="main.css">
    <link rel="stylesheet"  href="main_sd.css" shim-shadowdom>
{: .alert }

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
              :host(:hover) { ... }
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

1. **Replace `::shadow` and `/deep/`** with a `<space>` character.

### Forcing strict styling {#strictstyling}

By default, {{site.project_title}} does not enforce lower bound styling encapsulation.
The lower bound is the boundary between insertion points and the shadow host's children.

You can turn lower bound encapsulation by setting `Platform.ShadowCSS.strictStyling`:

    Platform.ShadowCSS.strictStyling = true;

This isn't yet the default because it requires that you add the custom element's name as an attribute on all DOM nodes in the shadowRoot (e.g. `<span x-foo>`).


### Manually invoking the style shimmer {#manualshim}

In rare cases, you may need to shim a stylesheet yourself. {{site.project_title}}'s Shadow DOM polyfill shimmer can be run manually like so:

    <style id="newstyles">
     ...
    </style>

    var style = document.querySelector('#newstyles');

    var cssText = Platform.ShadowCSS.shimCssText(
          style.textContent, 'my-scope');
    Platform.ShadowCSS.addCssToDocument(cssText);

Running this shims the styles, scopes their rules with 'my-scope', and adds the result
to the main document.

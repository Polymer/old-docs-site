---
layout: default
title: Styling reference
---

{% include toc.html %}

**Note:** styling {{site.project_title}} elements is no different than styling custom elements.
For a complete guide, see "[A Guide to Styling Elements](/articles/styling-elements.html)".
{: .alert }

In addition to the [standard features for styling Custom Elements](/articles/styling-elements.html), {{site.project_title}} contains extra goodies for fully controlling element styling. This document outlines those features, including FOUC prevention, the specifics on how the the Shadow DOM polyfill applies styles, and workarounds for current limitations.

## FOUC prevention

Before custom elements [upgrade](http://www.html5rocks.com/en/tutorials/webcomponents/customelements/#upgrades) they may display incorrectly. To help mitigate these styling issues, {{site.project_title}} provides the `polymer-veiled` and `polymer-unveil` classes for preventing [FOUC](http://en.wikipedia.org/wiki/Flash_of_unstyled_content).

To initially hide an element, include the `polymer-veiled` class:

    <x-foo class="polymer-veiled">If you see me, elements are upgraded!</x-foo>
    <div class="polymer-veiled"></div>

Alternatively, add its selector to `Polymer.veiledElements`. Elements included in
this array will automatically get the `polymer-veiled` class applied to them at boot time:

    Polymer.veiledElements = ['x-foo', 'div'];

Class name | Behavior when applied to an element
|-
`polymer-veiled` | Makes the element `opacity: 0`.
`polymer-unveil` | Fades-in the element to `opacity: 1`.
{: .table }

### Overriding the default behavior {#overriding}

By default, `body` is included in `Polymer.veiledElements`. When [`WebComponentsReady`](/polymer.html#WebComponentsReady) is fired, {{site.project_title}} removes the `polymer-veiled` class and adds `polymer-unveil` at the first `transitionend` event the element receives.  To override this behavior (and therefore prevent the entire page from being initially hidden), set `Polymer.veiledElements` to null:
    
    Polymer.veiledElements = null;

### Unveiling elements after boot time {#unveilafterboot}

The veiling process can be used to prevent FOUC at times other than boot-up. To do so, apply the `polymer-veiled` class to the desired elements and call `Polymer.unveilElements()` when they should be displayed. For example,

    element.classList.add('polymer-veiled');
    ...
    Polymer.unveilElements();

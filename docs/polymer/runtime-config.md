---
layout: default
type: core
title: Runtime configuration
---

{% include toc.html %}

{{site.project_title}} supports runtime options that are useful for debugging
and toggling between native APIs and their polyfill counterparts.

Flags can be used in combination with each other and settable three different ways:

1. as attributes on the `<script>` tag that loads `platform.js`
2. as URL query parameter
3. directly on the `Platform.flags` object before loading `platform.js`. 

## Debug flags

To use the debugging options, you must install and use the debug version of libraries:

1. Install `polymer-dev` and `platform-dev` and then tweak the references
  - `bower install Polymer/platform-dev Polymer/polymer-dev`
  - Rewrite `platform/platform.js` to `platform-dev/platform.js` in `index.html`
  - Comment out line 6 and uncomment line 7 in [polymer.html](https://github.com/Polymer/polymer/blob/master/polymer.html)
1. Install `platform-dev` and `polymer-dev` on top of the minified versions
  - `bower install polymer=Polymer/polymer-dev platform=Polymer/platform-dev`

### debug

**Example usage**

URL param:

    http://localhost/yourapp?debug

Attribute:

    <script src="platform.js" debug></script>

Setting `Platform.flags`:

    <script>
      Platform = {flags: {debug: true}};
    </script>
    <script src="platform.js"></script>

### log

Controls console output.

Possible values:

<table class="table">
  <tr>
    <th>Value</th><th>Description</th>
  </tr>
  <tr>
    <td>bind</td><td>Setup actions performed by the data-binding engine.</td>
  </tr>
  <tr>
    <td>data</td><td>Runtime data transforms that result from bindings</td>
  </tr>
  <tr>
    <td>watch</td><td>Data change notifications</td>
  </tr>
  <tr>
    <td>events</td><td>Custom event bindings and event propagations</td>
  </tr>
  <tr>
    <td>ready</td><td>Custom element reaching a ready state</td>
  </tr>
</table>

**Example usage**

URL param:

    http://localhost/yourapp?log=bind,ready

Attribute:

    <script src="platform.js" log="bind,ready"></script>

Setting `Platform.flags`:

    <script>
      Platform = {flags: {log: 'bind,ready'}};
    </script>
    <script src="platform.js"></script>

## Configuration flags {#configuration-switches}

### register

Including `register` forces the Custom Elements polyfill in browsers that support it natively.

**Example usage**

Attribute:

    <script src="platform.js" register></script>

URL param:

    http://localhost/yourapp?register

Setting `Platform.flags`:

    <script>
      Platform = {flags: {register: true}};
    </script>
    <script src="platform.js"></script>

### shadow

Selects a Shadow DOM implementation to use: `native` for supported browsers or `polyfill`
for unsupported browsers. **Note:** if the browser supports Shadow DOM natively, the presence
of this parameter forces the native API.

Possible values:

<table class="table">
  <tr>
    <th>Value</th><th>Description</th>
  </tr>
  <tr>
    <td>native</td><td>Default. Use the native implementation of Shadow DOM if the browser supports.</td>
  </tr>
  <tr>
    <td>polyfill</td><td>Forces the Shadow DOM polyfill to be loaded using <code>platform.poly.min.js</code>. Default for browsers that do not support Shadow DOM natively.</td>
  </tr>
</table>

**Example usage**

Attribute:

    <script src="platform.js" debug shadow></script>

URL param:

    http://localhost/yourapp?debug&shadow=polyfill

Setting `Platform.flags`:

    <script>
      Platform = {flags: {shadow: 'polyfill'}};
    </script>
    <script src="platform.js"></script>

## Polyfill settings {#polyfillsettings}

Some of the polyfills support additional options to override their default behavior
or toggle experimental features.

### eager

Including `eager` as a URL param or setting the `CustomElements.flags.eager` flag
upgrades Custom Elements immediately instead of waiting for `DOMContentsLoaded` time.

The Custom Elements polyfill defers upgrading elements until `DOMContentsLoaded` time. It does this as a performance optimization. Subsequent to the initial page load, Mutation Observers are used to discover new elements. If a page is particularly complex, it can paint before custom elements have
had a chance to upgrade. Elements on the page will be displayed in their un-upgraded state, typically
resulting in FOUC. The `eager` flag can help mitigate these potential FOUC issues.

**Example usage**

    <script>
      CustomElements = {flags: {eager: true}};
    </script>
    <script src="platform.js"></script>

Or, equivalently:

    http://localhost/yourapp?eager

### Strict Shadow DOM styling

To instruct the Shadow DOM polyfill to enforce lower bound style encapsulation,
set `Platform.ShadowCSS.strictStyling`.

**Example usage**

    <script src="platform.js"></script>
    <script>
      Platform.ShadowCSS.strictStyling = true;
    </script>

**Note:** We're setting `strictStyling` after loading `platform.js`.
{: .alert .alert-info }

More information on this feature can be found in the [Styling referencee](docs/polymer/styling.html#strictstyling).

<!--
## eval

When `true`, component scripts are executed with `eval` instead of script tag injection. Default is `false`.

Example:

    <script src="platform.js" eval="true"></script>

  or

    http://localhost/polymer/toolkit-ui/getting_started/?eval

-->
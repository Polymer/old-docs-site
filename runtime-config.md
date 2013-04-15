---
layout: default
title: Runtime configuration
---

## Configuration switches

Toolkit supports runtime options that are settable as attributes on the `<script>` tag that loads `platform.js`, or as URL query parameters.

### debug

Conditionally loads a debug version of `platform.js`.

**Example**

    <script src="platform/platform.js" debug></script>

Or, equivalently:

    http://localhost/toolkitchen/toolkit/getting_started/?debug

By default a minified version of platform (`platform.min.js`) is loaded.
Using `debug` loads `platform.debug.js`.

### log

Controls console output.

**Example**

    <script src="platform/platform.js" log="bind,ready"></script>

Or, equivalently:

    http://localhost/toolkitchen/toolkit/getting_started/?log=bind,ready

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

### shadow

Selects a Shadow DOM implementation: `native` for supported browsers or `polyfill`
for unsupported browsers.

**Example**

    <script src="platform/platform.js" debug shadow="polyfill"></script>

Or, equivalently:

    http://localhost/toolkitchen/toolkit/getting_started/?debug&shadow=polyfill


Possible attribute values:

<table class="table">
  <tr>
    <th>Value</th><th>Description</th>
  </tr>
  <tr>
    <td>native</td><td>Native implementation if the browser supports it. Default if browser supports Shadow DOM.</td>
  </tr>
  <tr>
    <td>polyfill</td><td>Forces the Shadow DOM polyfill to be loaded using <code>platform.poly.min.js</code>. Default for browsers that do not support Shadow DOM natively.</td>
  </tr>
</table>

<!--
### eval

When `true`, component scripts are executed with `eval` instead of script tag injection. Default is `false`.

Example:

    <script src="platform/platform.js" eval="true"></script>

  or

    http://localhost/toolkitchen/toolkit/getting_started/?eval

-->
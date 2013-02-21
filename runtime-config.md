---
layout: default
title: Runtime configuration
pygments: true
---
### Configuration switches

Toolkit supports runtime options that are settable as attributes on the `<script>` tag that loads `platform.js`, or as URL query parameters.

#### log

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

#### shadow

Selects a Shadow DOM implementation: shim, native, or experimental polyfill for non-WebKit browsers. Note that although Chrome 25 supports Shadow DOM natively, at this time the shim implementation is required to use Toolkit components.

**Example**

    <script src="platform/platform.js" shadow="shim"></script>

Possible attribute values:

<table class="table">
  <tr>
    <th>Value</th><th>Description</th>
  </tr>
  <tr>
    <td>shim</td><td>Required for Toolkit components (default)</td>
  </tr>
  <tr>
    <td>webkit</td><td>Native webkit implementation</td>
  </tr>
  <tr>
    <td>polyfill</td><td>Experimental polyfill for non-WebKit browsers</td>
  </tr>
</table>

#### eval

When `true`, component scripts are executed with `eval` instead of script tag injection. Default is `false`.

Example:

    <script src="platform/platform.js" eval="true"></script>

  or

    http://localhost/toolkitchen/toolkit/getting_started/?eval


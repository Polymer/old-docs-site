---
title: Settings
---

<!-- toc -->

The `settings` module (`@polymer/polymer/lib/utils/settings.js`) exports setter functions for a few global configuration properties.

## Available settings

<table>
<thead>
<tr>
  <td>
    Setting
  </td>
  <td>
    Description
  </td>
</tr>
</thead>
<tbody>
  <tr>
    <td>
      <code>rootPath</code>
    </td>
    <td>
      Sets a global <code>rootPath</code> property that can be used in templates to generate URLs that
      are relative to the application root.
    </td>
  </tr>
  <tr>
    <td>
      <code>sanitizeDOMValue</code>
    </td>
    <td>
      A global callback used to sanitize any value before inserting it into the DOM.
      The callback signature is:

```js
Polymer = {
  sanitizeDOMValue: function(value, name, type, node) { ... }
}
```

Where:

-   `value` is the value to sanitize.
-   `name` is the name of an attribute or property (for example, `href`).
-   `type` indicates where the value is being inserted: one of `property`, `attribute`, or `text`.
-   `node` is the node where the value is being inserted.
    </td>
  </tr>
</tbody>
</table>

There are also a number of polyfill-specific settings. See [Polyfills](/{{{polymer_version_dir}}}/docs/polyfills) for
details.

## Setting passive touch gestures

Call `setPassiveTouchGestures(true)` to force all [event listeners for gestures](gesture-events) to be passive. Passive event listeners can't call `preventDefault` to prevent the default browser handling, so the browser can handle the native gesture without waiting for the event listener to return.

You must call `setPassiveTouchGestures` before adding any gesture event listeners—for example, by setting it in the application entrypoint, or in the constructor of your main application element (assuming that's always the first element to load).

Using passive touch gestures may improve scrolling performance, but will cause problems if any of the elements in your application depend on being able to call `preventDefault` on a gesture.

Set passive touch gestures from the app shell {.caption}

```js
import {PolymerElement} from '@polymer/polymer/polymer-element.js';
import {setPassiveTouchGestures} from '@polymer/polymer/lib/utils/settings.js';

class MyApp extends PolymerElement {
  constructor(){
    super();
    // Set passive gestures globally for all elements using Polymer Gestures
    setPassiveTouchGestures(true);
    // Set root path globally
    setRootPath("/endpoint/");
    //
  }
}
```

Set passive touch gestures from the app entrypoint {.caption}

```html
<head>
  <script type="module">
    import {setPassiveTouchGestures} from '@polymer/polymer/lib/utils/settings.js';
    setPassiveTouchGestures(true);
  </script>
  ...
</head>
```

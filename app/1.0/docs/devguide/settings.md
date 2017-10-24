---
title: Global Polymer settings
---

Document-level global Polymer settings can be set
by creating a `Polymer` object on window before importing the Polymer
library:

```
<html>
  <head>
  <meta charset="utf-8">
  <script src="components/webcomponentsjs/webcomponents-lite.js"></script>
  <script>
    /* this script must run before Polymer is imported */
    window.Polymer = {
      dom: 'shadow',
      lazyRegister: true
    };
  </script>
  <!-- import a component that relies on Polymer -->
  <link rel="import" href="elements/my-app.html">
  </head>
  <body>
  ...
```

Settings can also be switched on the URL query string:

    http://example.com/test-app/index.html?dom=shadow

Available settings are listed below.

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
      <code>disableUpgradeEnabled</code>
    </td>
    <td>
When true, allows elements to be selectively marked for deferred upgrade.
This is a lightweight feature useful for performance tuning an application, giving fine-grained
control over individual element instantiation cost.

<p>When an element is marked with the <code>disable-upgrade</code> attribute, its
<code>createdCallback</code> returns early without performing any of the normal Polymer
element initialization steps (for example, stamping the template, setting default properties,
running observers, and so on). The element behaves like an element that has not had its
definition loaded, <strong>except</strong> that it has the correct prototype (as such, methods
should not be called on the element until its <code>disable-upgrade</code> attribute has been
removed).</p>

<p>Removing the <code>disable-upgrade</code> attribute causes the element to boot up, initialize
its properties, stamp its template, and so on.</p>

<p>Note this feature is implemented as an attribute API only.  There is no corresponding
<code>disableUpgrade</code> property.  As such, any bindings should be via attribute
bindings. For example:</p>

```html
<my-element disable-upgrade$="{{!loggedIn}}"></my-element>
```

</td>
  </tr>
  <tr>
    <td>
      <code>dom</code>
    </td>
    <td>
      Controls how local DOM is rendered. Options:
      <ul>
        <li>
          "shady". All local DOM is rendered using shady DOM, even where shadow DOM is
          supported (current default).
        </li>
        <li>
          "shadow". Local DOM is rendered using shadow DOM where supported (this will be
          the default in the future).
        </li>
      </ul>
    </td>
  </tr>
  <tr>
    <td>
      <code>lazyRegister</code>
    </td>
    <td>
      Improves startup time by allowing some some registration time activities to be deferred.
      Options:
      <ul>
        <li>
          <code>true</code>. Many registration-time activities are deferred until the first instance
          of an element type is created. Defaults to <code>false</code>. (This default may change in
          the future.)
        </li>
        <li>
          "max". Defers all behavior work until first element creation. When setting
          <code>lazyRegister</code> to <code>"max"</code>, you cannot set an element's <code>is</code>
          property or create a custom constructor by defining the <code>factoryImpl</code> method.
          Polymer calls your element's <code>beforeRegister</code> to preserve the ability to define
          elements using ES6. The element's <code>beforeRegister</code> is called before the
          behavior's.
        </li>
      </ul>
    </td>
  </tr>
  <tr>
    <td>
      <code>noUrlSettings</code>
    </td>
    <td>
      When <code>true</code>, Polymer settings can only be sent from a script in the page. In
      other words, URL query parameters such as `?dom=shadow` will be ignored. Defaults to
      <code>false</code>.
    </td>
  </tr>
  <tr>
    <td>
      <code>passiveTouchGestures</code>
    </td>
    <td>
      <p>
        When <code>true</code>, Polymer gestures event listeners are all added as passive listeners,
        and can't call <code>preventDefault</code> to prevent the native browser handling. May 
        improve scroll performance. Defaults to <code>false</code>.
      <p>
        See <a href="gesture-events">Gesture events</a> for more information.
    </td>
  </tr>
  <tr>
    <td>
      <code>suppressBindingNotifications</code>
    </td>
    <td>
When <code>true</code>, disables notify effects when propagating data <em>downward</em>
through bindings. Generally these are not useful unless you are explicitly adding a binding
and a property change notification event listener on the same element:

```html
  <my-el foo="{{foo}} on-foo-changed="handleFoo"></my-el>
```

<p>With this binding, when the host changes the value of <code>foo</code>, its
<code>handleFoo</code> method is invoked to handle the change notification event. This pattern
is generally unnecessary since the host element doing the binding can use a <code>foo</code>
observer instead.</p>

<p>With <code>suppressBindingNotifications: true</code>, the event isn't fired  when the host
changes the value (but is still fired if `my-el` changes its <code>foo</code> value internally.)</p>

<p>If your code doesn't don't use this pattern, enabling this flag should improve data system
performance.</p>
    </td>
  </tr>
  <tr>
    <td>
     <code>suppressTemplateNotifications</code>
    </td>
    <td>
      When true, suppresses <code>dom-change</code> and <code>rendered-item-count</code> events from
      <code>dom-if</code>, <code>dom-repeat</code>, and <code>dom-bind</code> elements. Users can
      opt back into <code>dom-change</code> events by setting the <code>notify-dom-change</code>
      attribute (<code>notifyDomChange: true</code> property) on individual <code>dom-if</code>
      and <code>dom-repeat</code> instances.
    </td>
  </tr>
  <tr>
    <td>
      <code>useNativeCSSProperties</code>
    </td>
    <td>
      When <code>true</code>, Polymer uses native custom CSS properties if the browser supports
      them. Defaults to <code>false</code> because of Safari 9 support being buggy. See the
      <a href="/1.0/docs/release-notes#v-1-6-0">1.6.0 release notes</a>
      for more information.
    </td>
  </tr>
</tbody>
</table>




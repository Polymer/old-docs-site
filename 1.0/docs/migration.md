---
layout: default
type: about
shortname: Migration
title: Migration guide
subtitle: About this release
---

{% include toc.html %}

This guide describes the changes required to migrate a {{site.project_title}} 
element from 0.5 to 1.0.  

## Polyup Tool

We have been working on a tool called `polyup` to automatically
perform many of the changes detailed in this guide. See an interactive demo 
[here](http://polymerlabs.github.io/polyup/), and check out the list of current 
and planned upgrades that it performs on its 
[README at github](https://github.com/PolymerLabs/polyup#html).

## Migration

When migrating, the following items can be translated easily from 0.5 to 1.0:

*   [Web components polyfill library](#polyfill)
*   [Element registration](#registration)
*   [Local DOM template](#local-dom-template)
*   [Declarative event handlers](#declarative-handlers)
*   [Property definitions](#properties)
*   [Default attributes](#default-attributes)
*   [Layout attributes](#layout-attributes)
*   [Use WebComponentsReady instead of the polymer-ready event](#polymer-ready)
*   [domReady event](#domready)
*   [Gestures](#gestures)
*   [Vulcanize](#vulcanize)
*   [Element & helper method changes](#methods)

Other areas may require more changes to work correctly, either because there are
significant API changes from 0.5, feature gaps, or both. These areas include:

*   [Imperative DOM manipulation](#dom-apis)
*   [Data binding](#data-binding)
*   [Styling](#styling)
*   [Inheritance](#inheritance)

The following sections discuss the changes required to migrate your code to this 
release, starting with the simpler topics.

## Web components polyfill library {#polyfill}

{{site.project_title}} no longer requires the shadow DOM polyfill, which 
is included in `webcomponents.js`. Use the smaller `webcomponents-lite.js` library
instead:

Before:

    <script src="bower_components/webcomponentsjs/webcomponents.min.js"></script>

After: 

    <script src="bower_components/webcomponentsjs/webcomponents-lite.min.js"></script>


## Element registration {#registration}

The `<polymer-element>` tag is no longer used to define an element. In this release,
these are replaced by a `<dom-module>` element (to define local DOM and styles)
and the `Polymer` call (to register the element).

Before:

    <polymer-element name="register-me">
      <template>
        <div>Hello from my local DOM</div>
      </template>
      <script>
        Polymer();
      </script>
    </polymer-element>

After:

    <dom-module id="register-me">

      <template>
        <div>Hello from my local DOM</div>
      </template>

      <script>
        Polymer({is: "register-me"});
      </script>

    </dom-module>


In this release:

*   The element name is specified using the `is` property on the prototype (required).

*   If you supply a [local DOM template](#local-dom-template), it's wrapped in a 
    `<dom-module>` element with an ID that matches the element name.

*   {{site.project_title}} supports the `extends` keyword as in 0.5, but at this point **you
    can only extend built-in DOM elements, such as `<button>`.** For more
    information, see [Inheritance](#inheritance).

In 0.5, you can define _published properties_ and _default attributes_ by setting
attributes on the `<polymer-element>` tag. These features are now only available 
on the prototype. 

If you have default attributes on your `<polymer-element>` declaration, make a
note of them for later:

    <polymer-element name="register-me" tabindex="0">

These are now declared using the `hostAttributes` object on the prototype. For example:

    hostAttributes: {
      tabindex: 0
    }

See [Default attributes](#default-attributes) for details.

If you've published any properties using the `attributes` attribute, make a note of them:

    <polymer-element name="register-me" attributes="foo">

In general, any property _published_ in 0.5 should be declared on 
the `properties` object now. For example:

    properties: {
      foo: { type: String } 
    }

See [Declared properties](#properties) for details.

Now the `Polymer` function returns a working constructor:

    var RegisterMe = Polymer({is: "register-me"});
    var el = new RegisterMe();
    // equivalent to:
    var el = document.createElement("register-me");

## Local DOM template {#local-dom-template}

{{site.project_title}} now uses an abstract local DOM mechanism. Local DOM can
be implemented using native shadow DOM or using a lightweight alternative,
"shady DOM". {{site.project_title}} uses shady DOM by default on all browsers. You can [opt
into using native shadow DOM](devguide/settings.html) where available.

In 0.5, the local DOM template is specified as a child of the `<polymer-element>`:

    <polymer-element name="template-me" noscript>
      <template>
        <!-- Old: styles INSIDE template --> 
        <style>
          div { color: red } 
        </style>
        <div>This is local DOM</div>
      </template>
    </polymer-element>

To specify a local DOM template now, use a `dom-module` tag, with your custom element name as its `id`:

    <!-- ID attribute must match element name passed to Polymer() --> 
    <dom-module id="template-me">

      <!-- New: styles OUTSIDE of template -->
      <style>
        div { color: red } 
      </style>

      <template>
        <div>This is local DOM</div>
      </template>

      <script>
        Polymer({is: "template-me"});
      </script>

    </dom-module>


As you can see, element styles are now defined **outside** of the `<template>` tag. 

The `<script>` tag can be inside or outside of the `<dom-module>` element, but the element's 
template must be parsed before the call to `Polymer`. 

### Dependency Ordering

Any custom element that the element depends on must be registered first. That
is, if `<parent-element>` includes `<child-element>` in its local DOM, 
`<child-element>` must be registered before `<parent-element>`.


## Declarative event handlers {#declarative-handlers}

Curly brackets ({%raw%}{{}}{%endraw%}) are **not** used for
declarative event handlers in the template. 

Before:

    <input on-input="{%raw%}{{checkValue}}{%endraw%}">

After: 

    <input on-input="checkValue">

The event handler is no longer passed the third argument, `inSender`, but is still passed the first two:

*   `inEvent` is the [standard event object](http://www.w3.org/TR/DOM-Level-3-Events/#interface-Event).
*   `inDetail` is a convenience form of `inEvent.detail`.

## Declared properties {#properties}

{{site.project_title}} 0.5 has two mechanisms to publish properties &mdash; the `attributes`
attribute and the `publish` object. Either of these mechanisms can be used to
publish a property:

    <polymer-element name="publish-me" attributes="myproperty">

or:

    Polymer({
      publish: {
        myproperty: 0
      }
    });

In addition, 0.5 has separate objects for defining computed properties and
property observers (the `computed` and `observe` objects).

{{site.project_title}} now provides a single
property configuration object, the `properties` object:


    Polymer({
      is: "publish-me",
      properties: {
        prop: Number,
        observedProp: {
          type: Number,
          value: 42,
          observer: 'observedPropChanged'
        },
        computedProp: {
          type: String,
          computed: 'computeValue(prop)'
        }
      }
    });

Simple properties (like `prop` above) can be declared as
<code><var>propertyName</var>: <var>type</var></code>.

For more complicated properties, use <code><var>propertyName</var>:
<var>config</var></code>, where the <code><var>config</var></code> object can
contain the following keys:

<table>
<tr>
<th>Key</th><th>Details</th>
</tr>
<tr>
<td><code>type</code></td>
<td>
Type: constructor (one of <code>Boolean</code>, <code>Date</code>, <code>Number</code>, <code>String</code>, <code>Array</code> or <code>Object</code>)<br>

Attribute type, used for deserializing from an attribute. Unlike 0.5, the
property's type is explicit, specified using the type's constructor. See 
<a href="#attr">attribute deserialization</a> for more information.

</td>
</tr>
<tr>
<td><code>value</code></td>
<td>
Type: <code>boolean</code>, <code>number</code>, <code>string</code> or <code>function</code>.<br>

Default value for the property. If <code>value</code> is a function, the function is
invoked and the return value is used as the default value of the property. If
the default value should be an array or object unique to the instance, create
the array or object inside a function. See 
<a href="#default-values">Default values</a> for more information.
</td>
</tr>
<tr>
<td><code>reflectToAttribute</code></td>
<td>Type: <code>boolean</code><br> 

Set to <code>true</code> to cause the corresponding attribute to be set on the host node
when the property value changes. If the property value is Boolean, the attribute
is created as a standard HTML boolean attribute (set if true, not set if false).
For other property types, the attribute value is a string representation of the
property value. Equivalent to <code>reflect</code> in {{site.project_title}} 0.5.
See <a href="devguide/properties.html#attribute-reflection">Reflecting properties to attributes</a> 
in the Developer guide for more information.
</td>
</tr>
<tr>
<td><code>readOnly</code></td>
<td>Type: <code>boolean</code><br>

If <code>true</code>, the property can't be set directly by assignment or data binding. An
internal setter is generated, <code>_set<var>Prop</var></code>, where
<code><var>Prop</var></code> is the property name with the first letter
capitalized. See <a href="devguide/properties.html#read-only">Read-only properties</a> 
in the Developer guide for more information.
</td>
</tr>
<tr>
<td><code>notify</code></td>
<td>Type: <code>boolean</code><br>

If <code>true</code>, the property is available for two-way data binding. In addition, an
event, <code><var>propertyName</var>-changed</code> is fired whenever the
property changes. See <a href="devguide/properties.html#notify">Property change notification events</a> 
in the Developer guide for more information.
</td>
</tr>
<tr>
<td><code>computed</code></td>
<td>Type: <code>string</code><br>

The value is interpreted as a method name and argument list. The method is invoked
to calculate the value whenever any of the argument values changes. Computed
properties are always read-only. See <a href="#computed-properties">Computed properties</a> 
for more information.
</td>
</tr>
<tr>
<td><code>observer</code></td>
<td>Type: <code>string</code><br>

The value is interpreted as a method name to be invoked when the property value 
changes. Note that unlike in 0.5, **property change handlers must be registered 
explicitly.** The <code><var>propertyName</var>-changed</code> method will not be 
invoked automatically. For details see <a href="#observers">Property observers & changed watchers</a>.
</td>
</tr>
</table>

Any property in your element's public API should be declared in the `properties` object.

### ES5 accessors not supported

You cannot define a declared property that uses ES5 accessors. {{site.project_title}} creates 
its own accessors to monitor property changes for observers, data binding, and 
computed properties.

For some use cases, you may be able to accomplish the same thing with either 
computed properties, observers, or read-only properties.

If you don't need any of the features of declared properties, you can simply add a 
property with ES5 accessors to your prototype.

### Property name to attribute name mapping

For data binding, deserializing properties from attributes, and reflecting
properties back to attributes, Polymer maps attribute names to property
names and the reverse. 

When mapping attribute names to property names:


*   Attribute names are converted to lowercase property names. For example,
    the attribute `firstName` maps to `firstname`.

*   Attribute names with _dashes_ are converted to _camelCase_ property names 
    by capitalizing the character following each dash, then removing the dashes. 
    For example, the attribute `first-name` maps to `firstName`.

The same mappings happen in reverse when converting property names to attribute
names (for example, if a property is defined using `reflectToAttribute: true`.)

In 0.5, {{site.project_title}} attempted to map attribute names to corresponding properties.
For example, the attribute `foobar` would map to the property `fooBar` if it was
defined on the element. {{site.project_title}} **does not do this anymore** &mdash; 
attribute to property mappings are set up on the element at registration time 
based on the rules described above.

Before: 

    <polymer-element name="map-me" attributes="fooBar">
      <script>
        Polymer({
          fooBar: ""
        });
      </script>
    </polymer-element>

    <map-me foobar="test1"></map-me>  <!-- sets map-me.fooBar -->
    <map-me FOOBAR="test2"></map-me>  <!-- sets map-me.fooBar -->
    <map-me foo-bar="test3"></map-me>  <!-- no matching property to set -->


After:

    <script>
      Polymer({
        is: "map-me"
        properties: {
          fooBar: {
            type: String,
            value: ""
          }
        }
      });
    </script>

    <map-me foo-bar="test2"></map-me> <!-- sets map-me.fooBar -->
    <map-me FOO-BAR="test3"></map-me> <!-- sets map-me.fooBar -->
    <map-me foobar="test1"></map-me> <!-- no matching property, doesn't set anything on map-me -->

### Attribute deserialization {#attr}

For any property listed in the `properties` object, the user can set a value 
on the corresponding attribute to initialize the property. Deserialization works much 
like it did in 0.5 (where any property in the `publish` object 
was deserialized).

There are two differences from 0.5:

*   The `type` field is used to determine how to deserialize the attribute
    value. If no type is specified, the property takes the string value of the
    attribute. In 0.5, the type was determined implicitly, from the type of the
    default value.

*   {{site.project_title}} does not modify the string before JSON parsing `Object` and `Array`
    values. In 0.5, Polymer replaced single quotes with double quotes. This
    allowed some invalid JSON to work correctly but broke some valid JSON.

Before (reversed quotes accepted):

    <my-element foo="{ 'title': 'Persuasion', 'author': 'Austen' }"></my-element>

After (correct JSON quotes required):

    <my-element foo='{ "title": "Persuasion", "author": "Austen" }'></my-element>

### Binding to properties

In 0.5, only properties that are explicitly published can be data bound from outside the element. Now, any property is available for data binding, whether or not it is listed in the `properties` object. For more details on data binding in the this release, see [Data binding](#data-binding).

### Default values {#default-values}

In Polymer 0.5, default values can be specified multiple ways: directly on the
prototype, in the `publish` object, or in the `created` method (for objects and
arrays). Now, default values are specified on the `properties`
object, using the `value` key.

For `value`, you can provide either a default value or a function that returns
the default value. If `value` is a function, the function is invoked during the
configuration phase (after the `created` callback and before `ready`) and the
return value is used as the value of the property.

If the default value should be an array or object unique to the instance, create
the array or object inside a function.

    value: function() { return {}; },


### Computed properties {#computed-properties}

Computed properties must be moved from the `computed` object to the `properties` object. 
All computed properties are defined using a function name and one or more dependent properties,
in parentheses.

Arbitrary expressions are not supported in computed properties — they need to be moved to 
functions.

Before:

    computed: {
       product: 'multiply(x,y)',
       sum: 'x + y'
    },
    multiply: function(a, b) {
      return a * b;
    }

After:

    properties: {
      product: {
        computed: 'multiply(x,y)'
      },
      sum: {
        computed: 'add(x,y)'
      }
    },
    multiply: function(a, b) {
      return a * b;
    },
    add: function(a, b) {
      return a + b;
    }


Computed properties are always read-only (in the sense that they can't be set
directly or via data binding).  All properties can be data bound now, so
unlike 0.5, there is no need to explicitly publish a computed property.

For more information, see [Computed properties](devguide/properties.html
#computed-properties) in the Developer guide.

### Property observers & Changed watchers {#observers}

0.5 supported _implicit_ change handlers. If a property `foo` changed, the
corresponding `fooChanged` handler was called automatically. If your element
uses any <code><var>propertyName</var>Changed</code> handlers, you must
explicitly register them in the `properties` object.

Before:

    <polymer-element name="observe-prop" attributes="foo">
      <script>
        Polymer({
          foo: '',
          fooChanged: function(oldValue, newValue) {
            ...
          }
        });
      </script>
    </polymer-element>

After: 

    Polymer({
      is: "observe-prop",
      properties: {
        foo: {
          type: String,
          value: '',
          observer: 'fooChanged'
        }
      },
      fooChanged: function(newValue, oldValue) { 
        ... 
      }
    });


Note that the arguments to the observer are currently in the 
**opposite order** compared to 0.5.

The `observers` array should be used for change observers with
multiple dependencies:

    properties: {
      x: Number,
      y: Number,
      z: Number
    },
    observers: [
      "coordinatesChanged(x, y, z)"
    ]

**Note:** As in 0.5, the `observers` array is a top-level object on the
prototype: it isn't part of the `properties` object.
{: .alert .alert-info }

Unlike Polymer 0.5, observers do not support the
<code>this.$.<var>elementId</var></code> syntax for observing changes to the
properties of local DOM children. However, in some cases you can use data
binding to bind a property to the child element's property, and observe the
local property instead.

Before: 

    <polymer-element name="observe-me">
      <template>
         <my-input id="input">
      </template>
      <script>
         Polymer({
          observers: {
            'this.$.input.value': 'valueChanged'
          },
          valueChanged: function() { … } 
         });
       </script>
    </polymer-element>

After:

    <dom-module id="observe-me">

      <template>
         {%raw%}<my-input value="{{inputval}}">{%endraw%}
      </template>

      <script>
         Polymer({
          is: "observe-me",
          properties: {
            inputval: {
              observer: 'valueChanged'
            }
          },
          valueChanged: function() { … } 
         });
       </script> 

    </dom-module>


For more information, see [Property change callbacks (observers)](devguide/properties.html#change-callbacks) in the Developer guide.
       
## Default attributes {#default-attributes}

In 0.5, default attributes are defined on the `<polymer-element>` declaration:

    <polymer-element name="register-me" checked tabindex="0" role="checkbox" noscript>
    </polymer-element>

Now you define default attributes by adding a `hostAttributes` object to the prototype:

    hostAttributes: {
      checked: true,
      tabindex: 0,
      role: "checkbox"
    }

Default attributes are added to the instance at creation time. The default
attribute values are serialized based on the value type. Boolean attributes use
the standard HTML mechanism &mdash; the attribute is present if true, absent if false.
(So adding a default attribute with a value of `false` has no effect.)

Note that `hostAttributes` only specifies **_static, default_** attributes. To
set an attribute dynamically based on a property value, see 
[Reflecting properties to attributes](devguide/properties.html#attribute-reflection) 
in the Developer guide, or use `setAttribute` directly.

Also, note that the `class` attribute is ignored if it is specified in the `hostAttributes` 
object.

## Listeners {#listeners}

In 0.5 you could declare event listeners for a custom element as an attribute on the 
`polymer-element` declaration:

    <polymer-element name="magic-button" on-scroll="{{onScrollHandler}}" on-tap="{{wasTapped}}">
    </polymer-element>

Now you define these listeners on the `listeners` object on the prototype:

    listeners: {
      scroll: 'onScrollHandler',
      tap: 'wasTapped'
    }

For more info, see [Event listener setup](devguide/events.html#event-listeners) in the Developer guide.

## Layout attributes replaced by layout classes and custom properties {#layout-attributes}

The layout attributes stylesheet that's included in Polymer 0.5 has been
replaced with an optional stylesheet that uses custom properties. If your element uses
[layout attributes](https://www.polymer-project.org/0.5/docs/polymer/layout-attrs.html), 
you'll need to make some changes:

1.  Install the `iron-flex-layout` component:

        bower install --save PolymerElements/iron-flex-layout

2.  Add an import for `iron-flex-layout.html` on any element that used the layout attributes.

        <link rel="import" href="bower_components/iron-flex-layout/iron-flex-layout.html">

3.  Replace the layout attributes with custom properties, using `@apply` inside
    your element's CSS.

        @apply(--layout-horizontal);
        @apply(--layout-wrap);

Before:

    <link rel="import" href="/bower_components/polymer/polymer.html">

    {% raw %}
    <!-- layout attributes for the host defined on <polymer-element> -->
    <polymer-element name="x-profile" layout vertical>
      <template>
        <!-- layout attributes for a local DOM element -->
        <div layout horizontal center>
          <img src="{{avatarUrl}}">
          <span class="name">{{name}}</span>
        </div>
        <p>{{details}}</p>
      </template>
      <script>
        Polymer({ ... });
      </script>
    </polymer-element>
    {% endraw %}

After:

    <link rel="import" href="/bower_components/polymer/polymer.html">
    <link rel="import" href="/bower_components/iron-flex-layout/iron-flex-layout.html">

    {% raw %}
    <dom-module id="x-profile">

      <style>   
        :host {
          /* layout properties for the host element */
          @apply(--layout-vertical);
        }
        
        .header {
          /* layout properties for a local DOM element */
          @apply(--layout-horizontal);
          @apply(--layout-center);
        }
      </style>

      <template>
        <div class="header">
          <img src="{{avatarUrl}}">
          <span class="name">{{name}}</span>
        </div>
        <p>{{details}}</p>
      </template>

      <script>
        Polymer({
          is: "x-profile"
        });
      </script>

    </dom-module>
    {% endraw %}

To see the available custom layout properties, see the [`iron-flex-layout` 
source](https://github.com/PolymerElements/iron-flex-layout/blob/master/iron-flex-layout.html).
For more examples of the layout properties in use, see the 
[demo](https://elements.polymer-project.org/elements/iron-flex-layout?view=demo:demo/index.html).

### Using the layout classes directly

The layout classes can be imported and used simliar to the layout attributes. This is useful if you want to use the classes from within the main page or do not want to define a style rule just to use one of the custom properties:

Example of using the layout classes in the main page:

    <head>
      ...
      <link rel="import" href="/bower_components/iron-flex-layout/classes/iron-flex-layout.html">
    </head>
    <body class="fullbleed layout horizontal center-center">
     ...
    </body>

## Use WebComponentsReady instead of polymer-ready {#polymer-ready}

The `polymer-ready` event was supported in release 0.5 because {{site.project_title}}
elements performed some asynchronous initialization which meant that they weren't ready 
to use when the polyfill [`WebComponentsReady`](https://github.com/webcomponents/webcomponentsjs#webcomponentsready) 
event fired. This initialization is now synchronous, so the `WebComponentsReady` event 
can be used instead.

If you are **not** using the web components polyfills (for example, in a Chrome extension),
the `WebComponentsReady` event will not fire. With native HTML imports and custom elements,
elements upgrade synchronously, so the event is not required. Simply place any scripts that 
manipulate {{site.project_title}} elements at the end of the page, and all elements should 
be ready.

## domReady event {#domready}

This release doesn't support the `domReady` callback. This callback was a partial
solution to the problem of determining when sibling elements and light DOM children were ready.

A more complete solution is in progress. In the meantime, if you are using `domReady` in 
1.0 you can replace it by using the `async` method inside your `attached` callback:

    attached: function() {
       this.async(function() {
          // code that formerly resided in `domReady`
       });
    }

For more on element initialization, see: [Initialization order](devguide/registering-elements.html#initialization-order)
in the Developer guide.

## Gestures

This release includes support for a limited number of gestures, including, `tap`, `up`, `down`, and
`track`. If you are using these events using either declarative event handlers or the `listeners`
object, you shouldn't need to update anything. 

Note that `trackstart` and `trackend` are  not fired as separate events, but as `track` events with
`detail.state` set to `start` or `end`, respectively.

For more details, see [Gesture events](devguide/events.html#gestures).

## Vulcanize {#vulcanize}

The latest versions of the [`vulcanize`](https://github.com/Polymer/vulcanize) tool are updated for the new {{site.project_title}}
element format. Newer versions of vulcanize are **not** backward compatible:

* `vulcanize` versions 1.0 and higher are compatible with {{site.project_title}} 0.8+ **only**. The current version is 1.4.2.
* `vulcanize` versions below 1.0 are compatible with {{site.project_title}} 0.5 **only**. The current version is 0.7.10.

The `--csp` option to `vulcanize` is now a separate utility, [`crisper`](https://github.com/PolymerLabs/crisper). Typical usage 
is:

    vulcanize --inline-scripts --inline-css target.html | \
        crisper --html build.html --js build.js

For more details on the `vulcanize` arguments, see the [README](https://github.com/Polymer/vulcanize).

## Element & helper method changes {#methods}

Some element methods and helper methods have been renamed, moved, or changed signatures.
For a complete list of element methods, see the [API reference](http://polymer.github.io/polymer/).

### Element methods: job renamed to debounce

The `job` method in 0.5 is replaced by `debounce`. The arguments are identical.

This release includes several related methods, including methods for 
canceling a pending task, and immediately executing a pending task.
For details, see [Utility functions](devguide/utility-functions.html).

### Element methods &mdash; async

The `async` method works slightly differently than in 0.5 when called without a specified delay, like:

    this.async(doSomething);

In this release, this adds a callback to the browser's  _microtask queue_, which is
handled asynchronously, but before the next event from the event queue is
handled. If you call `async` from within the `async` callback, the second
`async` callback is called during the same task as the first callback.

In 0.5, the `async` method without a delay scheduled work using
`requestAnimationFrame`. If you call `async` from within an `async` callback,
the second `async` callback is fired during a subsequent task (in the next frame
interval). If you want this behavior, use `requestAnimationFrame` instead.

### Element methods: fire API changes

The `fire` method now takes three arguments:

    fire(type, [detail], [options]);

The `options` object can contain the following properties:

*   `node`. Node to fire the event on. Defaults to `this`.
*   `bubbles`. Whether the event should bubble. Defaults to `true`.
*   `cancelable`. Whether the event can be canceled with `preventDefault`. Defaults to `false`.

### Element methods &mdash; resolvePath renamed to resolveUrl

The `resolvePath` method in 0.5 is replaced by `resolveUrl`. The arguments are identical.

### Element methods &mdash; Polymer.import replaced by importHref

The global `Polymer.import` function is replaced by `importHref`. The
new method can be invoked from an element as `this.importHref`. Outside
an element, it can be called as as `Polymer.Base.importHref`.

## Manipulating DOM {#dom-apis}

If your element manipulates its light DOM or local DOM imperatively, or your
application manipulates the children of Polymer elements using the standard DOM
manipulation APIs, you need to use the `Polymer.dom` APIs for manipulating DOM.
In addition, if you use APIs like `querySelector` or `querySelectorAll`, you
should use the `Polymer.dom` versions, which are aware of local DOM trees. If
you do not do any imperative DOM manipulation, you can skip this section.

The `Polymer.dom` method takes a DOM node as an argument and returns a wrapper
that implements the following methods and properties.

Adding and removing children:

  * `Polymer.dom(parent).appendChild(node)`
  * `Polymer.dom(parent).insertBefore(node, beforeNode)`
  * `Polymer.dom(parent).removeChild(node)`
  * `Polymer.dom.flush()`

Parent and child accessors:

  * `Polymer.dom(parent).childNodes`
  * `Polymer.dom(node).parentNode`
  * `Polymer.dom(node).firstChild`
  * `Polymer.dom(node).lastChild`
  * `Polymer.dom(node).firstElementChild`
  * `Polymer.dom(node).lastElementChild`
  * `Polymer.dom(node).previousSibling`
  * `Polymer.dom(node).nextSibling`
  * `Polymer.dom(node).textContent`
  * `Polymer.dom(node).innerHTML`

Query selector:

  * `Polymer.dom(parent).querySelector(selector)`
  * `Polymer.dom(parent).querySelectorAll(selector)`

Content APIs:

  * `Polymer.dom(contentElement).getDistributedNodes()`
  * `Polymer.dom(node).getDestinationInsertionPoints()`

Node mutation APIs:

  * `Polymer.dom(node).setAttribute(attribute, value)`
  * `Polymer.dom(node).removeAttribute(attribute)`
  * `Polymer.dom(node).classList`


In each case, the `Polymer.dom` methods and properties behave like the standard
DOM would on a browser with native Shadow DOM support, with the following
differences:

*   The insert, append, and remove operations are transacted lazily in certain cases
    for performance. In order to interrogate the DOM (for example, offsetHeight,
    getComputedStyle, etc.) immediately after one of these operations, call
    `Polymer.dom.flush()` first.

*   Calling `append`/`insertBefore` where parent is a custom Polymer element adds
    the node to the light DOM of the element. In order to add children to the local
    DOM of a custom element, use <code><var>element</var>.root</code> as the parent,
    where <code><var>element</var></code> is the custom element you're adding to.
    The `root` property identifies the custom element's shadow root or shady root
    (depending on which system is in use in the browser).

*   Method and properties that return a list of nodes return an `Array`, not  a
    `NodeList` as in standard DOM.

Before (append to the element's light DOM):

    this.appendChild(node);

After:

    Polymer.dom(this).appendChild(node);

Before (append child to the shadow root):

    this.shadowRoot.appendChild(node);

After:

    Polymer.dom(this.root).appendChild(node);

Before (append to a container in local DOM):

    this.$.container.appendChild(node);

After:

    Polymer.dom(this.$.container).appendChild(node);

Note that `Polymer.dom` provides only a subset of the standard DOM API, so for
example `firstChild` must be replaced with `childNodes[0]`:

    Polymer.dom(this).insertBefore(node, Polymer.dom(this).childNodes[0]);

You can safely use `Polymer.dom` when manipulating any elements in
your DOM tree. When used on elements that don't have a local DOM tree,
`Polymer.dom` simply manipulates the light DOM children, just like the built-in
DOM methods.

Local DOM aware query selector:

    Polymer.dom(document).querySelectorAll(selector);

Returns all elements matching _selector_ in the main document.

### Event retargeting

Shadow DOM has a feature called "event retargeting" which changes an event's
target as it bubbles up, such that target is always in the receiving element's
light DOM.

Use `Polymer.dom(event)` to get a normalized event object that provides
equivalent target data on both shady DOM and shadow DOM. Specifically, the
normalized event has the following properties:

*   `rootTarget`: The original or root target before shadow retargeting
    `(equivalent to `event.path[0]` under shadow DOM or `event.target` under
    `shady DOM).

*   `localTarget`: Retargeted event target (equivalent to `event.target` under
    shadow DOM)   * `path`: Array of nodes through which event will pass 
    (equivalent to `event.path` under shadow DOM).


## Data binding {#data-binding}

Data binding in this release is based on generated
property accessors, generated at element registration time, which provides high
performance with minimal cost at instantiation time. The main differences in
binding are:

*   No expression or filter support. Binding is to properties or paths only. (The negation
    operator, `!`, is supported for convenience.) In many cases, computed
    properties can be used in place of complex binding expressions.

*   A binding must replace the **entire text content of a node**, or the **entire value
    of an attribute**. So string concatenation is **not** supported. For attribute
    values, you can use [computed bindings](devguide/data-binding.html#annotated-computed) 
    instead of string concatenation. For text content, you can also add additional 
    nodes (for example, wrap the binding in a `<span>` tag).

    Note that this means a node **can't include any whitespace around the binding annotation**.

Before:

    {% raw %}
    <my-foo fullname="{{firstname + ' ' + lastname}}">
      Hi, my name is {{firstname}}.
    </my-foo>
    {% endraw %}

After:

    {% raw %}
    <my-foo fullname="{{computeFullName(firstname, lastname)}}">
            Hi, my name is <span>{{firstname}}</span>.
    </my-foo>
    {% endraw %}

    ...

    computeFullName: function(first, last) {
      return first + ' ' + last;
    }

Support for repeating templates, conditional templates and autobinding templates 
is provided by [helper elements](devguide/templates.html). 

There are many subtle differences between the old and new binding systems as well.
See [Data binding](devguide/data-binding.html) in the Developer guide for 
more details on the new system.

### Property bindings {#property-bindings}

Note: Unlike 0.5, properties don't need to be explicitly published to enable
data binding. An element can bind to a property on any element in its local DOM
using the corresponding attribute name. By convention, properties not intended
for external use should be prefixed with an underscore.

Data binding is now one-way by default:  the property can be _set_ from the
outside, but does not propagate changes to the outside. For a property that can
be two-way data bound, add the `notify` property:

    Polymer({
      is: "publish-me",
      properties: {
        value: {
          type: Number,
          notify: true
        }
      }
    });

If another element includes `publish-me` in its local DOM and binds to the
`value` property, value changes are propagated upward:

    {% raw %}
    <dom-module id="binding-owner">

      <template>
        <publish-me value="{{twoway}}"></publish-me>
      </template>

      <script>
        Polymer({ is: "binding-owner" });
      </script>   

    </dom-module>

    {% endraw %}

In this example, when `publish-me.value` changes, the change is pushed up to `binding-owner.twoway`.

The element requesting the binding can explicitly specify one-way binding using square brackets: `[[]]`.

        <publish-me value="[[oneway]]"></publish-me>

To make your code more easier to read, you may want to use the
<code>[[<var>property</var>]]</code> form by default, and only use
<code>{%raw%}{{<var>property</var>}}{%endraw%}</code> for two-way bindings.
 
For more details, see [Data binding](devguide/data-binding.html) in the Developer guide.

### Attribute bindings

In 0.5, you can bind a binary attribute value like this:

    {% raw %}
    <div hidden?="{{isHidden}}">Boo!</div>
    {% endraw %}

Where the `hidden` attribute is added if, and only if, `isHidden` is truthy. 
Change this expression to 
{%raw%}<code><var>attributeName</var>$="{{<var>propertyName</var>}}"</code>.{%endraw%}

For example:

    <div hidden$="{%raw%}{{isHidden}}{%endraw%}">Boo!</div>

The new version is more general-purpose: it can handle both boolean and valued
attributes. The property value is serialized, just like it is  for reflected
properties (see [Attribute serialization](devguide/properties.html#attribute-serialization) 
in the Developer guide for details).

For example:

    {%raw%}
    <input type="checkbox" checked$="{{isComplete}}" 
        aria-label$="{{completedLabel}}">
    {%endraw%}

If `isComplete` is `true` and `completedLabel` is "Completed", this appears as:
 
    <input type="checkbox" checked aria-label="Completed">

**Note:** If you are using the <code><var>attributeName</var>$=</code> syntax with
a non-boolean property, you'll need to change your code to get the same
results. For example, use a computed binding to cast the original property to
a Boolean.
{: .alert .alert-info }

### Computed bindings

Computed properties only needed in the template can be bound directly in the
template without an intermediate property on the instance:

    <dom-module id="inline-compute">

      <template>
        ...
        <button hidden$="[[_computeButtonHidden(dirty)]]">
          Save
        </button>
      </template>

      <script>
        Polymer({
          is: "inline-compute",
          _computeButtonHidden: function(dirty) {
            return !dirty;
          },
          ...
        });
      </script>

    </dom-module>



The arguments to a computed binding are evaluated relative to the current binding scope.
For more details, see [Computed bindings](devguide/data-binding.html#annotated-computed).

### Data binding helper elements {#helper-elements}

Support for repeating templates, conditional templates and autobinding templates 
is provided by [helper elements](devguide/templates.html). 

#### Template Repeat 

The `template repeat` mechanism is replaced by the new `dom-repeat` helper element. 

**Note:** `dom-repeat` and the other helper elements described here are included as part 
of the Polymer library, and do not need to be installed or imported separately.
{: .alert .alert-info }

Pass data to the `<dom-repeat>` by specifying an `items` array, and bind to individual item properties using `item.`_propertyName_:

    {% raw %}
    <template is="dom-repeat" items="{{myData}}">
      <p>{{item.name}}</p>
    </template>
    {% endraw %}


Note that browsers that do not support templates natively don't allow
`<template>` tags inside of `<table>` or `<select>` elements.
{{site.project_title}} 0.5 provided a workaround for this using the [`template`
attribute](/0.5/docs/polymer/databinding-compat.html#elements-that-cant-
contain-a-template). There is no equivalent workaround for the new release at
this point.

If you are using `event.target.templateInstance.model` to get model information for events,
in most cases you can replace this with `event.model`. For more information, see 
[Handling events in `dom-repeat` templates](devguide/templates.html#handling-events).

For more information, see [Template repeater](devguide/templates.html#dom-repeat).

#### Autobinding templates

Autobinding templates are replaced by the new `dom-bind` helper element.

If you are relying on the `template-bound` event fired by auto-binding templates
in 0.5, note that all of the template helpers in 1.0 fire an equivalent `dom-change` event.

**Note:** `dom-bind` is included as part of the Polymer library, and does not need to be installed or imported separately.
{: .alert .alert-info }

For more information, see [Autobinding templates](devguide/templates.html#dom-bind).

#### Conditional templates {#conditional-templates}

Conditional templates (`<template if=condition>`) are replaced by the new `dom-if` helper element.


**Note:** `dom-if` is included as part of the Polymer library, and does not need to be installed or imported separately.
{: .alert .alert-info }

For more information, see [Conditional templates](devguide/templates.html#dom-if).

#### Binding to native input elements {#input-values}

Two-way binding to the values of native input elements does not work
automatically as it did in 0.5, since two-way data binding relies on
special <code><var>property</var>-changed</code> events generated by
{{site.project_title}} elements.

You can work with native input elements by specifying a custom event name
in the binding, like this:


    {% raw %}
    <!-- Listens for "change" event and sets hostValue to <input>.value -->
    <input value="{{hostValue::change}}">
    {% endraw %}

For more information, see [Two-way binding to native elements](devguide/data-binding.html#two-way-native).

### Binding to sibling elements

0.5 provided a mechanism to bind directly to properties on sibling elements, using $. For example:

    {% raw %}
    <template>
      <x-publisher id="publisher"></x-publisher>
      <x-subscriber input="{{$.publisher.output}}"></x-subscriber>
    </template>
    {% endraw %}


In most cases, this can be replaced by binding both values to a shared property:

    {% raw %}
    <template>
      <x-publisher id="publisher" output="{{data}}"></x-publisher>
      <x-subscriber input="{{data}}"></x-subscriber>
    </template>
    {% endraw %}


## Styling

Element-level styling should be placed inside the `<dom-module>` tag but **outside** the `<template>` tag. 

    <dom-module>
      <style>
        :host { display: block }
      </style>
      <template>
        ...
      </template>
    </dom-module>

External stylesheets are supported  using HTML Imports. See
[External stylesheets](devguide/styling.html#external-stylesheets) in
the Developer guide for details.

Document-level styling can be added using the `custom-style` element:

    <style is="custom-style">
      html /deep/ iron-icon { 
        color: red;
      } 
    </style>

The `custom-style` element modifies the style sheets to work with either shady DOM or
shadow DOM.  As such, it's the equivalent of the `shim-shadowdom` attribute
supported in 0.5.

In addition to shimming shadow DOM selectors (`/deep/` and `::shadow`),
`custom-style` prevents styles from leaking downward into the shady DOM trees. 

**Note: `<custom-style>` is included as part of the Polymer library, and does not
need to be installed or imported separately.
{: .alert .alert-info }

For more information on the `custom-style` element, see [Custom element for document styling](devguide/styling.html#custom-style)
in the Developer guide.

### Styling distributed children with `::content`

See [Styling local DOM](devguide/styling.html).

Styling elements distributed to content (via ::content) requires using a wrapper
element for compatibility with shady DOM.

    <style>
      .wrapper > ::content .foo {
        color: lemonchiffon;
      }
    </style>

    <template>
      <div class="wrapper">
        <content></content>
      </div>
    </template>

## Inheritance {#inheritance}

This release doesn't support inheriting from other custom elements &mdash; only from
standard DOM elements. This will be supported in a future release.

In the meantime, you can achieve many of the same results using either
composition or [mixins](devguide/registering-elements.html#prototype-mixins) to
share functionality between elements.





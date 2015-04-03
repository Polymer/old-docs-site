---
layout: default
type: guide
shortname: Migration
title: Migration guide
subtitle: Guide
---

{% include toc.html %}

This guide describes the changes required to migrate a {{site.project_title}} 
element from 0.5 to 0.8.  

When migrating to 0.8, the following items can be translated easily from 0.5 to 0.8:

*   [Web components polyfill library](#polyfill)
*   [Element registration](#registration)
*   [Local DOM template](#local-dom-template)
*   [Declarative event handlers](#declarative-handlers)
*   [Property definitions](#properties)
*   [Default attributes](#default-attributes)
*   [Layout attributes](#layout-attributes)

Other areas may require more changes to work correctly, either because there are
significant API changes from 0.5, feature gaps, or both. These areas include:

*   [Imperative DOM manipulation](#dom-apis)
*   [Data binding](#data-binding)
*   [Styling](#styling)
*   [Inheritance](#inheritance)

The following sections discuss the changes required to migrate your code from
0.5 to 0.8, starting with the simpler topics.

## Web components polyfill library {#polyfill}

{{site.project_title}} 0.8 no longer requires the shadow DOM polyfill, which 
is included in `webcomponents.js`. Use the smaller `webcomponents-lite.js` library
instead:

Before:

    <script src="bower_components/webcomponentsjs/webcomponents.min.js"></script>

After: 

    <script src="bower_components/webcomponentsjs/webcomponents-lite.min.js"></script>


## Element registration {#registration}

The `<polymer-element>` tag is no longer used to define an element. In 0.8,
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
    </dom-module>

    <script>
      Polymer({is: "register-me"});
    </script>

In 0.8:

*   The element name is specified using the `is` property on the prototype (required).

*   If you supply a [local DOM template](#local-dom-template), it's wrapped in a 
    `<dom-module>` element with an ID that matches the element name.

*   Polymer 0.8 supports the `extends` keyword as in 0.5, but at this point **you
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
the `properties` object in 0.8. For example:

    properties: {
      foo: { type: String } 
    }

See [Declared properties](#properties) for details.

In 0.8, the `Polymer` function returns a working constructor:

    var RegisterMe = Polymer({is: "register-me"});
    var el = new RegisterMe();
    // equivalent to:
    var el = document.createElement("register-me");

## Local DOM template {#local-dom-template}

0.8 replaces the shadow DOM with the abstract local DOM mechanism. Local DOM can
be implemented using native shadow DOM or using a lightweight alternative,
"shady DOM". Polymer 0.8 uses shady DOM by default on all browsers. You can opt
into using native shadow DOM where available.

In 0.5, the local DOM template is specified as a child of the `<polymer-element>`:

    <polymer-element name="template-me" noscript>
      <template>
        <!-- 0.5 styles INSIDE template --> 
        <style>
          div { color: red } 
        </style>
        <div>This is local DOM</div>
      </template>
    </polymer-element>

To specify a local DOM template in 0.8, use a `dom-module` tag, with your custom element name as its `id`:

    <!-- ID attribute must match element name passed to Polymer() --> 
    <dom-module id="template-me">
      <!-- 0.8 styles OUTSIDE of template -->
      <style>
        div { color: red } 
      </style>
      <template>
        <div>This is local DOM</div>
      </template>  
      </dom-module>
    <script>
      Polymer({is: "template-me"});
    </script>

As you can see, in 0.8, element styles are defined outside of the `<template>` tag. 

The `dom-module` must be parsed before the call to `Polymer`. 

### Dependency Ordering

Any custom element that the element depends on must be registered first. That
is, if `<parent-element>` includes `<child-element>` in its local DOM, 
`<child-element>` must be registered before `<parent-element>`.


## Declarative event handlers {#declarative-handlers}

In 0.8, curly brackets ({%raw%}{{}}{%endraw%}) are **not** used for
declarative event handlers in the template. 

Before:

    <input on-input="{%raw%}{{checkValue}}{%endraw%}">

After: 

    <input on-input="checkValue">

## Declared poperties {#properties}

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

{{site.project_title}} 0.8 replaces all of these mechanisms with a single
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

### Attribute deserialization {#attr}

For any property listed in the `properties` object, the user can set a value on the corresponding attribute to initialize the property. This works much like (where any property in the `publish` object was deserialized).

There are two differences from 0.5:

*   The `type` field is used to determine how to deserialize the attribute
    value. If no type is specified, the property takes the string value of the
    attribute. In 0.5, the type was determined implicitly, from the type of the
    default value.

*   0.8 does not modify the string before JSON parsing `Object` and `Array`
    values. In 0.5, Polymer replaced single quotes with double quotes. This
    allowed some invalid JSON to work correctly but broke some valid JSON.

Before (reversed quotes accepted):

    <my-element foo="{ 'title': 'Persuasion', 'author': 'Austen' }"></my-element>

After (correct JSON quotes required):

    <my-element foo='{ "title": "Persuasion", "author": "Austen" }'></my-element>

### Binding to properties

In 0.5, only properties that are explicitly published can be data bound from outside the element. In 0.8, any property is available for data binding, whether or not it is listed in the `properties` object. For more details on data binding in 0.8, see [Data binding](#data-binding).

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

In 0.5, Polymer attempted to map attribute names to corresponding properties.
For example, the attribute `foobar` would map to the property `fooBar` if it was
defined on the element. This **does not happen in 0.8** &mdash; attribute to property
mappings are set up on the element at registration time based on the rules
described above.

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


### Default values {#default-values}

In Polymer 0.5, default values can be specified multiple ways: directly on the
prototype, in the `publish` object, or in the `created` method (for objects and
arrays). In 0.8, default values are specified on the `properties`
object, using the `value` key.

For `value`, you can provide either a default value or a function that returns
the default value. If `value` is a function, the function is invoked during the
configuration phase (after the `created` callback and before `ready`) and the
return value is used as the value of the property.

If the default value should be an array or object unique to the instance, create
the array or object inside a function.

    value: function() { return {}; },


### Computed properties {#computed-properties}

Computed properties must be moved from the `computed` object to the `properties` object. Otherwise, they work much like computed properties in 0.5.

Before:

    computed: {
       product: 'multiply(x,y)'
    }

After:

    properties: {
      product: {
        computed: 'multiply(x,y)'
      }
    }

Computed properties are always read-only (in the sense that they can't be set
directly or via data binding).  All properties can be data bound in 0.8, so
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


Note that the arguments to the 0.8 observer are in the **opposite order** compared to 
0.5.

The `observers` object is still supported and should be used for
change observers with multiple dependencies:

    properties: {
      x: Number,
      y: Number,
      z: Number
    },
    observers: {
      "x y z": "coordinatesChanged"
    }

**Note:** As in 0.5, the `observers` object is a top-level object on the
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
    </dom-module>
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

For more information, see [Property change callbacks (observers)](devguide/properties.html#change-callbacks) in the Developer guide.
       
## Default attributes {#default-attributes}

In 0.5, default attributes are defined on the `<polymer-element>` declaration:

  <polymer-element name="register-me" checked tabindex="0" role="checkbox" noscript>
  </polymer-element>

In 0.8, define default attributes by adding a `hostAttributes` object to the prototype:

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

## Layout attributes => layout classes {#layout-attributes}

The layout attributes stylesheet that's included in Polymer 0.5 has been
replaced with an optional stylesheet that uses classes. If your element uses
[layout attributes] (https://www.polymer-project.org/0.5/docs/polymer/layout-attrs.html), 
you'll need to make some changes:

Add an import for `layout.html` on any element that used the layout attributes.
Replace the layout attributes with classes.

Before:

    <link rel="import" href="/components/polymer/polymer.html">

    <polymer-element name="x-foo" layout horizontal wrap>
      <template>
        <content></content>
      </template>
      <script>
        Polymer({ });
      </script>
    </polymer-element>

After:

    <link rel="import" href="/components/polymer/polymer.html">
    <link rel="import" href="/components/layout/layout.html">

    <dom-module id="test-element">
      <template>
        <content></content>
       </template>
    </dom-module>
    <script>
    Polymer({
      is: "x-foo",
      hostAttributes: {
        class: "layout horizontal wrap"
      }
    });
    </script>

## Manipulating DOM {#dom-apis}

If your element manipulates its light DOM or local DOM imperatively, or your
application manipulates the children of Polymer elements using the standard DOM
manipulation APIs, you need to use the `Polymer.dom` APIs for manipulating DOM.
In addition, if you use APIs like `querySelector` or `querySelectorAll`, you
should use the `Polymer.dom` versions, which are aware of local DOM trees. If
you do not do any imperative DOM manipulation, you can skip this section.

The `Polymer.dom` method takes a DOM node as an argument and returns a wrapper
that implements the following methods and properties:

* `Polymer.dom(parent).appendChild(node)`
* `Polymer.dom(parent).insertBefore(node, beforeNode)`
* `Polymer.dom(parent).removeChild(node)`
* `Polymer.dom(parent).querySelector(selector)`
* `Polymer.dom(parent).querySelectorAll(selector)`
* `Polymer.dom(parent).childNodes`
* `Polymer.dom(node).parentNode`
* `Polymer.dom(contentElement).getDistributedNodes()`
* `Polymer.dom(node).getDestinationInsertionPoints()`

In each case, the `Polymer.dom` methods and properties behave like the standard
DOM would on a browser with native Shadow DOM support, with the following
differences:

*   The insert, append, and remove operations are transacted lazily in certain cases
    for performance. In order to interrogate the DOM (for example, offsetHeight,
    getComputedStyle, etc.) immediately after one of these operations, call
    Polymer.dom.flush() first.

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

Data binding in 0.8 is simpler than in 0.5. It is based on generated
property accessors, generated at element registration time, which provides high
performance with minimal cost at instantiation time. The main differences in
binding are:

*   No expression support. Binding is to properties or paths only. (The negation
    operator, `!`, is supported for convenience.) In many cases, computed
    properties can be used in place of complex binding expressions.

*   A binding can replace the entire text content of a node, or the entire value
    of an attribute. So string concatenation is **not** supported. For attribute
    values, you can use computed properties instead of string concatenation. For
    text content, you can also add additional nodes (for example, wrap the
    binding in a `<span>` tag.

Before:

    {% raw %}
    <my-foo fullname="{{firstname + ' ' + lastname}}">
      Hi, my name is {{firstname}}.
    </my-foo>
    {% endraw %}

After:

    {% raw %}
    <my-foo fullname="{{computeFullName}}>
            Hi, my name is <span>{{firstname}}</span>.
    </my-foo>
    {% endraw %}


Support for repeating templates and autobinding templates is entirely
experimental at this point. See [Data binding gaps](#data-binding-gaps) for
details. Support for conditional templates (`<template if>`) has been removed.
See [Conditional templates](#conditional-templates) for more information and
workarounds.

There are many subtle differences between the old and new binding systems as well.
See [Data binding](devguide/data-binding.html) in the Developer guide for 
more details on the new system.

### Property bindings {#property-bindings}

Note: Unlike 0.5, 0.8 properties don't need to be explicitly published to enable
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
    </dom-module>
    <script>
      Polymer({ is: "binding-owner" });
    </script>
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

Where the `hidden` attribute is added if, and only if, `isHidden` is truthy. For
0.8, change this expression to 
{%raw%}<code><var>attributeName</var>$="{{<var>propertyName</var>}}"</code>.{%endraw%}

For example:

    <div hidden$="[[isHidden]]">Boo!</div>

The 0.8 version is more general-purpose: it can handle both boolean and valued
attributes. The property value is serialized, just like it is  for reflected
properties (see [Attribute serialization](devguide/properties.html#attribute-serialization) 
in the Developer guide for details).

For example:

    <input type="checkbox" checked$="[[isComplete]]" aria-label$="[[completedLabel]]">

If `isComplete` is `true` and `completedLabel` is "Completed", this appears as:
 
    <input type="checkbox" checked aria-label="Completed">

**Note:** If you are using the <code><var>attributeName</var>$=</code> syntax with
a non-boolean property, you'll need to change your code to get the same
results. For example, use a computed property to cast the original property to
a Boolean.
{: .alert .alert-info }

### Annotated computed properties

Computed properties only needed in the template can be bound directly in the
template without an intermediate property on the instance:

    <dom-module id="inline-compute>
      <template>
        ...
        <button hidden$="[[_computeButtonHidden(dirty)]]">
          Save
        </button>
      </template>
    </dom-module>

    <script>
      Polymer({
        is: "inline-compute",
        _computeButtonHidden: function(dirty) {
          return !dirty;
        },
        ...
      });
    </script>

### Data binding gaps {#data-binding-gaps}

Several data binding features from 0.5 are either missing or experimental in this release.

#### Template Repeat 

There is no supported replacement for template repeat at this time. You can use the experimental `<x-repeat>` as a replacement, but note that the element name and API may change.

**Note:** `<x-repeat>` and the other experimental elements described here are included as part of the Polymer library, and do not need to be installed or imported separately.
{: .alert .alert-info }

Pass data to the `<x-repeat>` by specifying an `items` array, and bind to individual item properties using `item.`_propertyName_:

    {% raw %}
    <template is="x-repeat" items="{{myData}}">
      <p>{{item.name}}</p>
    </template>
    {% endraw %}


Note that browsers that do not support templates natively don't allow `<template>` tags inside of `<table>` or `<select>` elements. {{site.project_title}} 0.5 provided a workaround for this using the [`template` attribute](/0.5/docs/polymer/databinding-compat.html#elements-that-cant-contain-a-template). There is no equivalent workaround for 0.8 at this point.

For more information, see [Template repeater](devguide/experimental.html#x-repeat)

#### Nested template scopes

Polymer 0.8 does not support nested template scopes. An `<x-repeat>` cannot
access the parent template's scope, only its own `items`. 

A solution for this issue is expected before 1.0.

#### Autobinding templates

There is no supported replacement for autobinding templates at this time. You can use the experimental `<x-autobind>` as a replacement, but note that the element name and API may change.

**Note:** `<x-autobind>` is included as part of the Polymer library, and does not need to be installed or imported separately.
{: .alert .alert-info }

#### Conditional templates {#conditional-templates}

Conditional templates (`<template if=condition>`) has proven to be mostly an anti-pattern, and there is no equivalent in 0.8. There are some valid use cases for a feature like this, however, and the team is investigating providing a solution.

In the meantime, use conditional display (`hidden`, `display: none`) instead.

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

For more information, see [Two-way binding to native elements](data-binding.html#two-way-native).

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

External stylesheets are supported _experimentally_ using HTML Imports. See
[External stylesheets](devguide/experimental.html#external-stylesheets) in
the Developer guide for details.

Document-level styling can be added using the experimental `x-style` element:

    <style is="x-style">
      html /deep/ core-icon { 
        color: red;
      } 
    </style>

The `x-style` element modifies the style sheets to work with either shady DOM or
shadow DOM.  As such, it's the equivalent of the `shim-shadowdom` attribute
supported in 0.5.

In addition to shimming shadow DOM selectors (`/deep/` and `::shadow`),
`x-style` prevents styles from leaking downward into the shady DOM trees. 


**Note: `<x-style>` is included as part of the Polymer library, and does not
need to be installed or imported separately.
{: .alert .alert-info }

For more information on the `x-style` element, see the [Developer guide](devguide/experimental.html#x-style). 

### Styling distributed children with `::content`

See [scoped styling](devguide/experimental.html#scoped-styling).

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

## Inheritance

Polymer 0.8 doesn't support inheriting from other custom elements &mdash; only from
standard DOM elements. This will be supported in a future release.

In the meantime, you can achieve many of the same results using either
composition or [mixins](devguide/registering-elements.html#prototype-mixins) to
share functionality between elements.


## Other changes

### Element Methods &mdash; async

The `async` method works slightly differently than in 0.5 when called without a specified delay, like:

    this.async(doSomething);

In 0.8, this adds a callback to the browser's  _microtask queue_, which is
handled asynchronously, but before the next event from the event queue is
handled. If you call `async` from within the `async` callback, the second
`async` callback is called during the same task as the first callback.

In 0.5, the `async` method without a delay scheduled work using
`requestAnimationFrame`. If you call `async` from within an `async` callback,
the second `async` callback is fired during a subsequent task (in the next frame
interval). If you want this behavior, use `requestAnimationFrame` instead.


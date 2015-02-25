---
layout: default
type: guide
shortname: Docs
title: API developer guide
subtitle: Guide
---

{% include toc.html %}

The {{site.project_title}} _core_ provides a thin layer of API on top of web components.
It expresses {{site.project_title}}'s opinion, provides the extra sugaring that all {{site.project_title}} elements use, and is meant to help make developing web components much easier.

## Element declaration

At the heart of {{site.project_title}} are [Custom Elements](/platform/custom-elements.html). Thus, it should be no surprise that defining a {{site.project_title}} element is similar to the way you define a standard Custom Element. The major difference is that {{site.project_title}} elements are created declaratively using `<polymer-element>`.

    <polymer-element name="tag-name" constructor="TagName">
      <template>
        <!-- shadow DOM here -->
      </template>
      <script>
        Polymer({
          // properties and methods here
        });
      </script>
    </polymer-element>

The element declaration includes:

-   The `name` attribute specifies the name of the new custom element.
-   The optional `<template>` element defines HTML content that is
    cloned into the shadow DOM of each instance of the element.
-   An inline script that _registers_ the element by calling the
    `Polymer` method and passing in the element's prototype.
    Registering the element allows it be recognized as a custom element
    by the browser.

**Note:** When the `<polymer-element>` declaration includes both `<template>` and `<script>`
elements, the `<template>` element **must come first.**
{: .alert .alert-info }

### Attributes

{{site.project_title}} reserves special attributes to be used on `<polymer-element>`:

<table class="table responsive-table attributes-table">
  <tr>
    <th>Attribute</th><th>Required?</th><th>Description</th>
  </tr>
  <tr>
    <td><code>name</code></td><td><b>required</b></td><td>Name for the custom element. Requires a "-".</td>
  </tr>
  <tr>
    <td><code>attributes</code></td><td>optional</td><td>Used to <a href="#published-properties">publish properties</a>.</td>
  </tr>
  <tr>
    <td><code>extends</code></td><td>optional</td><td>Used to <a href="#extending-other-elements">extend other elements</a>.</td>
  </tr>
  <tr>
    <td><code>noscript</code></td><td>optional</td><td>For simple elements that don't need to call <code>Polymer()</code>. See <a href="#altregistration">Element registration</a>.</td>
  </tr>
  <tr>
    <td><code>constructor</code></td><td>optional</td><td>The name of the constructor to put on the global object. Allows users to create instances of your element using the <code>new</code> operator (e.g. <code>var tagName = new TagName()</code>).</td>
  </tr>
</table>

#### Default attributes {#defaultattrs}

Other attributes you declare on `<polymer-element>` will automatically be included
on each instance of the element. For example:

    <polymer-element name="tag-name" class="active" mycustomattr>
      <template>...</template>
      <script>Polymer();</script>
    </polymer-element>

When an instance of `<tag-name>` is created, it contains `class="active" mycustomattr`
as default attributes:

    <tag-name class="active" mycustomattr></tag-name>

#### Attribute case sensitivity {#attrcase}

It's worth noting that the HTML parser considers attribute names *case insensitive*. Property names in JavaScript are however *case sensitive*.

This means that attributes can be written any way that you like, but if you look at an element's attribute list, the names will always be lowercase. Polymer is aware of this and will attempt to match the attributes to properties carefully. For example, this should work as expected:

    <name-tag nameColor="blue" name="Blue Name"></name-tag>

The fact that the `nameColor` attribute is actually lowercase in DOM can generally just be ignored.

This also means that any of the below examples will also work:

    <name-tag NaMeCoLoR="blue" name="Blue Name"></name-tag>
    <name-tag NAMECOLOR="red" name="Red Name"></name-tag>
    <name-tag NAMEcolor="green" name="Green Name"></name-tag>

### Element registration {#altregistration}

The `Polymer` method is used to register an element:

<pre>
Polymer([ <em class="nocode">tag-name</em>, ] [<em class="nocode">prototype</em>]);
</pre>

Where:

*   _tag-name_ matches the `name` attribute in the `<polymer-element>` tag.
    _tag-name_ is optional **unless the `<script>` tag that calls `Polymer`
    is placed outside the `<polymer-element>` tag.**

*   _prototype_ is the prototype for the new element.
 	See [Adding public properties and methods](#propertiesmethods).
    _prototype_ is always optional.

The simplest way to invoke `Polymer` is to place an inline script inside
your `<polymer-element>` tag:

    <polymer-element name="simple-tag">
      <template> ... </template>
      <script>Polymer();</script>
    </polymer-element>

**Note:** When the `<polymer-element>` declaration includes both `<template>` and `<script>`
elements, the `<template>` element **must come first.**
{: .alert .alert-info }

There are several alternatives to registering an element in an an inline script:

- [Separating script from markup](#separatescript).
- [Registering imperatively](#imperativeregister) using JavaScript.

#### Separating script from markup {#separatescript}

For convenient decoupling of script and markup, you don't have to inline your script.
{{site.project_title}} elements can be created by referencing an external script
which calls `Polymer`:

    <!-- 1. Script referenced inside the element definition. -->
    <polymer-element name="tag-name">
      <template>...</template>
      <script src="path/to/tagname.js"></script>
    </polymer-element>

    <!-- 2. Script comes before the element definition. -->
    <script src="path/to/tagname.js"></script>
    <polymer-element name="tag-name">
      <template>...</template>
    </polymer-element>

In case #2, where the script is invoked before the `<polymer-element>` tag,
the call to `Polymer` **must include the tag name**:

    // tagname.js
    Polymer('tag-name', ... );

For elements that don't require custom properties or methods, you can
use the `noscript` attribute:

    <!-- 3. No script -->
    <polymer-element name="tag-name" constructor="TagName" noscript>
      <template>
        <!-- shadow DOM here -->
      </template>
    </polymer-element>

The `noscript` attribute is equivalent to including:

    <script>Polymer();</script>

#### Registering imperatively {#imperativeregister}

Elements can be registered in pure JavaScript like this:

    <script>
      Polymer('name-tag', {nameColor: 'red'});
      var el = document.createElement('div');
      el.innerHTML = '\
        <polymer-element name="name-tag" attributes="name">\
          <template>\
            Hello <span style="color:{%raw%}{{nameColor}}{%endraw%}">{%raw%}{{name}}{%endraw%}</span>\
          </template>\
        </polymer-element>';
      // The custom elements polyfill can't see the <polymer-element>
      // unless you put it in the DOM.
      document.body.appendChild(el);
    </script>

    <name-tag name="John"></name-tag>

You need to add the `<polymer-element>` to the document so that the
Custom Elements polyfill picks it up.

**Important:** Since the `Polymer` call here is outside the `<polymer-element>`,
it must include the tag name argument.
{: .alert .alert-error }

### Adding public properties and methods {#propertiesmethods}

To define methods and properties on your element, pass a prototype object to `Polymer()`:

<pre>
Polymer([ <em class="nocode">tag-name</em>, ] <em class="nocode">prototype</em>);
</pre>

The following example defines a property `message`, a property `greeting`
using an ES5 getter, and a method `foo`:

    <polymer-element name="tag-name">
      <template>{{greeting}}</template>
      <script>
        Polymer({
          message: "Hello!",
          get greeting() {
            return this.message + ' there!';
          },
          foo: function() {...}
        });
      </script>
    </polymer-element>

**Note:** `this` references the custom element itself inside a {{site.project_title}} element. For example, `this.localName == 'tag-name'`.
{: .alert .alert-info }

#### Custom element prototype chain

{{site.project_title}} assembles a custom element's prototype chain. The chain includes:

-   The prototype object passed to the `Polymer` method.
-   A {{site.project_title}} base prototype that adds a set of built-in methods and properties (see [Built-in element methods](#builtin)).
-   A prototype object for the native DOM object that the custom element extends (by default, `HTMLElement`).

Avoid defining a property or method with the same name as a native DOM property or method, such as `id`, `children`, `focus`, `title` and `hidden`; the results are unpredictable.

### Adding private or static variables {#static}

If you need private state within an element, wrap your script using standard
techniques like anonymous self-calling functions:

    <polymer-element name="tag-name">
      <template>...</template>
      <script>
        (function() {
          // Run once. Private and static to the element.
          var foo_ = new Foo();

          // Run for every instance of the element that's created.
          Polymer({
            get foo() { return foo_; }
          });
        })();
      </script>
    </polymer-element>

### Supporting global variables {#global}

There are times when you may want to define properties of an application globally,
and then make them available inside all of your elements. For example:

- A single easing curve for all animations.
- Information about the currently logged-in user that you consider "global".

To achieve this, you can use the [MonoState Pattern](http://c2.com/cgi/wiki?MonostatePattern).
When defining a {{site.project_title}} element, define a closure that closes over the variables
in question, and then provide accessors on the object's prototype or copy them over to individual
instances in the `ready` callback.

    <polymer-element name="app-globals">
      <script>
      (function() {
        // these variables are shared by all instances of app-globals
        var firstName = 'John';
        var lastName = 'Smith';

        Polymer({
          ready: function() {
            // copy global values into instance properties
            this.firstName = firstName;
            this.lastName = lastName;
          }
        });
      })();
      </script>
    </polymer-element>

Then use the `<app-globals>` element as you would any other. You can access its properties
using {{site.project_title}} data binding or plain JavaScript:

    <polymer-element name="my-component">
      <template>
        <app-globals id="globals"></app-globals>
        <div id="firstname">{%raw%}{{$.globals.firstName}}{%endraw%}</div>
        <div id="lastname">{%raw%}{{$.globals.lastName}}{%endraw%}</div>
      </template>
      <script>
        Polymer({
          ready: function() {
            console.log('Last name: ' + this.$.globals.lastName);
          }
        });
      </script>
    </polymer-element>

A slight tweak of this approach lets you configure the value of the globals externally:

    <polymer-element name="app-globals" attributes="values">
      <script>
        (function() {
          var values = {};

          Polymer({
             ready: function() {
               this.values = values;
               for (var i = 0; i < this.attributes.length; ++i) {
                 var attr = this.attributes[i];
                 values[attr.nodeName] = attr.value;
               }
             }
          });
        })();
      </script>
    </polymer-element>

The main page configures the globals by passing attributes:

    <app-globals firstname="Addy" lastname="Osmani"></app-globals>

This second version of `app-globals` has a slightly different API than
the first. The global variables are properties of the `values` object instead of
direct properties of `app-globals`. Setting values using attributes imposes two
limitations: the values must be strings, and the variable names are lowercase.
(See [Attribute case sensitivity](#attrcase) for more information.)

To use this `<app-globals>` element with the previous `<my-component>` example,
you'd need to update the paths that refer to the global variables (for example
`$.globals.values.lastname` instead of `$.globals.lastName`).

### Element lifecycle methods {#lifecyclemethods}

{{site.project_title}} has first class support for the Custom Element lifecycle
callbacks, though for convenience, implements them with shorter names.

All of the lifecycle callbacks are optional:

    Polymer('tag-name', {
      created: function() { ... },
      ready: function() { ... },
      attached: function () { ... },
      domReady: function() { ... },
      detached: function() { ... },
      attributeChanged: function(attrName, oldVal, newVal) {
        //var newVal = this.getAttribute(attrName);
        console.log(attrName, 'old: ' + oldVal, 'new:', newVal);
      },
    });

Below is a table of the lifecycle methods according to the Custom Elements
[specification](https://dvcs.w3.org/hg/webcomponents/raw-file/tip/spec/custom/index.html#custom-element-lifecycle) vs. the names {{site.project_title}} uses.

Spec | {{site.project_title}} | Called when
|-
createdCallback | created | An instance of the element is created.
- | ready | The `<polymer-element>` has been fully prepared (e.g. shadow DOM created, property observers setup, event listeners attached, etc).
attachedCallback | attached | An instance of the element was inserted into the DOM.
- | domReady | Called when the element's initial set of children are guaranteed to exist. This is an appropriate time to poke at the element's parent or light DOM children. Another use is when you have sibling custom elements (e.g. they're `.innerHTML`'d together, at the same time). Before element A can use B's API/properties, element B needs to be upgraded. The `domReady` callback ensures both elements exist.
detachedCallback | detached | An instance was removed from the DOM.
attributeChangedCallback | attributeChanged | An attribute was added, removed, or updated. **Note**: [Changed watchers](#change-watchers) are often easier to use and can watch either ordinary properties or attribute changes matching [published properties](#published-properties).
{: .table .responsive-table .lifecycle-table }

### The polymer-ready event {#polymer-ready}

{{site.project_title}} parses element definitions and handles their upgrade _asynchronously_.
If you prematurely fetch the element from the DOM before it has a chance to upgrade,
you'll be working with a plain `HTMLElement`, instead of your custom element. {{site.project_title}} elements also support inline resources, such as stylesheets, that need to be loaded. These can cause [FOUC](http://en.wikipedia.org/wiki/Flash_of_unstyled_content) issues if they're not fully loaded prior to rendering an element. To avoid FOUC, {{site.project_title}} delays registering elements until stylesheets are fully loaded.

To know when elements have been registered/upgraded, and thus ready to be interacted with, use the `polymer-ready` event.

    <head>
      <link rel="import" href="path/to/x-foo.html">
    </head>
    <body>
      <x-foo></x-foo>
      <script>
        window.addEventListener('polymer-ready', function(e) {
          var xFoo = document.querySelector('x-foo');
          xFoo.barProperty = 'baz';
        });
      </script>
    </body>

## Features {#features}

### Published properties

When you _publish_ a property name, you're making that property part of the
element's "public API". Published properties have the following features:

*   Support for two-way, declarative data binding.

*   Declarative initialization using an HTML attribute with a matching name.

*   Optionally, the current value of a property can be _reflected_ back to an
    attribute with a matching name.

**Note:** Property names are case sensitive, but attribute names are not.
{{site.project_title}} matches each property name with the corresponding
attribute name, as described in [Attribute case sensitivity](#attrcase). This
means you can't publish two properties distinguished only by capitalization (for
example, `name` and `NAME`).
{: .alert .alert-info }

There are two ways to publish a property:

*   **Preferred** - Include its name in the `<polymer-element>`'s `attributes`
    attribute.
*   Include the name in a `publish` object on your prototype.

As an example, here's an element that publishes three public properties, `foo`,
`bar`, and `baz`, using the `attributes` attribute:

    <polymer-element name="x-foo" attributes="foo bar baz">
      <script>
        Polymer();
      </script>
    </polymer-element>

And here's one using the `publish` object:

    <polymer-element name="x-foo">
      <script>
        Polymer({
          publish: {
            foo: 'I am foo!',
            bar: 5,
            baz: {
              value: false,
              reflect: true
            }
          }
        });
      </script>
    </polymer-element>

Note that the `baz` property uses a different format, to enable
[attribute reflection](#attrreflection).

Generally it's preferable to use the `attributes` attribute because it's the
declarative approach and you can easily see all of the exposed properties at the
top of the element.

You should opt for the `publish` object when any of the following is true:

*   Your element has many properties and placing them all on one line feels
    unwieldy.
*   You want to define default values for properties and prefer the DRYness of
    doing it all in one place.
*   You need to reflect changes from the property value back to the corresponding
    attribute.

#### Default property values

By default, properties defined in `attributes` are initialized to `undefined`:

    <polymer-element name="x-foo" attributes="foo">
      <script>
        // x-foo has a foo property with default value of undefined.
        Polymer();
      </script>
    </polymer-element>

Specifically, {{site.project_title}} adds `foo` to the element's prototype with a value of `undefined`.

**Note:** Prior to {{site.project_title}} 0.3.5, properties were initialized to
`null` by default.
{: .alert .alert-info }

You can provide your own default values by explicitly specifying the default value on the element's `prototype`:

    <polymer-element name="x-foo" attributes="bar">
      <script>
        Polymer({
          // x-foo has a bar property with default value false.
          bar: false
        });
      </script>
    </polymer-element>

Or you can define the whole thing using the `publish` property:

    <polymer-element name="x-foo">
      <script>
        Polymer({
          publish: {
            bar: false
          }
        });
      </script>
    </polymer-element>

For property values that are objects or arrays, you should set the default value
in the `created` callback instead. This ensures that a separate object is
created for each instance of the element:

    <polymer-element name="x-default" attributes="settings">
      <script>
        Polymer({
          created: function() {
            // create a default settings object for this instance
            this.settings = {
              textColor: 'blue'
            };
          }
        });
      </script>
    </polymer-element>

#### Configuring an element via attributes

Attributes are a great way for users of your element to configure it,
declaratively. They can customize a published property by setting its initial
value as the attribute with the corresponding name:

    <x-foo name="Bob"></x-foo>

If the property value isn't a string, {{site.project_title}} tries to convert
the attribute value to the appropriate type.

The connection from attribute to property is _one way_. Changing the property
value does **not** update the attribute value, unless
[attribute reflection](#attrreflection) is enabled for the property.

**Note**: Configuring an element using an attribute shouldn't be confused with
[data binding](databinding.html). Data binding to a published property is
by-reference, meaning values are not serialized and deserialized to strings.
{: .alert .alert-info}

##### Hinting a property's type {#attrhinting}

When attribute values are converted to property values, {{site.project_title}}
attempts to convert the value to the correct type, depending on the default
value of the property.

For example, suppose an `x-hint` element has a `count` property that defaults to `0`.

    <x-hint count="7"></x-hint>

Since `count` has a Number value, {{site.project_title}} converts
the string "7" to a Number.

If a property takes an object or array, you can configure it using a
double-quoted JSON string. For example:

    <x-name fullname='{ "first": "Bob", "last": "Dobbs" }'></x-name>

This is equivalent to setting the element's `fullname` property to an object
literal in JavaScript:

    xname.fullname = { first: 'Bob', last: 'Dobbs' };

The default value can be set on the prototype itself, in
the `publish` object, or in the `created` callback. The following element
includes an unlikely combination of all three:

    <polymer-element name="hint-element" attributes="isReady items">
      <script>
        Polymer({

          // hint that isReady is a Boolean
          isReady: false,

          publish: {
            // hint that count is a Number
            count: 0
          },

          created: function() {
            // hint that items is an array
            this.items = [];
          }
        });
      </script>
    </polymer-element>

**Important:** For properties that are objects or arrays, you should always
initialize the properties in the `created` callback. If you set the default
value directly on the `prototype` (or on the `publish` object), you may run into
unexpected "shared state" across different instances of the same element.
{: .alert .alert-error }

    // Good!
    Polymer('x-foo', {
      created: function() {
        this.list = []; // Initialize and hint type to be array.
        this.person = {}; // Initialize and hint type to an object.
      }
    });

    // Bad.
    Polymer('x-foo', {
      list: [], // Don't initialize array or objects on the prototype.
      person: {}
    });

#### Property reflection to attributes {#attrreflection}

Property values can be _reflected_ back into the matching attribute. For
example, if reflection is enabled for the `name` property, setting
`this.name = "Joe"` from within an element is equivalent to  calling
`this.setAttribute('name', 'Joe')`.  The element updates the DOM accordingly:

    <x-foo name="Joe"></x-foo>

Property reflection is only useful in a few cases, so it is off by default.
You usually only need property reflection if you want to style an element based
on an attribute value.

To enable reflection, define the property in the `publish` object.
Instead of a simple value:

<pre>
<var>propertyName</var>: <var>defaultValue</var>
</pre>

Specify a reflected property using this format:

<pre>
<var>propertyName</var>: {
  <b>value:</b> <var>defaultValue</var>,
  <b>reflect:</b> <b>true</b>
}
</pre>

The property value is serialized to a string based on its data type. A
few types get special treatment:

* If the property value is an object, array, or function, the value is
  **never** reflected, whether or not `reflect` is `true`.

* If the property value is boolean, the attribute behaves like a standard
  boolean attribute: the reflected attribute appears only if the value is truthy.

Also, note that the initial value of an attribute is **not** reflected, so the
reflected attribute does not appear in the DOM unless you set it to a different value.

For example:

    <polymer-element name="disappearing-element">
      <script>
        Polymer({
          publish: {
            hidden: {
              value: false,
              reflect: true
            }
          }
        });
      </script>
    </polymer-element>

Setting `hidden = true` on a `<disappearing-element>` causes the `hidden`
attribute to be set:

    <disappearing-element hidden>Now you see me...</disappearing-element>

Attribute _reflection_ is separate from data binding. Two-way data binding is
available on published properties whether or not they're reflected. Consider the
following:

    <my-element name="{%raw%}{{someName}}{%endraw%}"></my-element>

If the `name` property is _not_ set to reflect, the `name` attribute always
shows up as `name="{%raw%}{{someName}}{%endraw%}"` in the DOM. If `name` _is_
set to reflect, the DOM attribute reflects the current value of `someName`.

### Data binding and published properties

Published properties are data-bound inside of {{site.project_title}} elements
and accessible via `{%raw%}{{}}{%endraw%}`. These bindings are by reference and
are two-way.

For example, we can define a `name-tag` element that publishes two properties,
`name` and `nameColor`.

    <polymer-element name="name-tag" attributes="name nameColor">
      <template>
        Hello! My name is <span style="color:{%raw%}{{nameColor}}{%endraw%}">{%raw%}{{name}}{%endraw%}</span>
      </template>
      <script>
        Polymer({
          nameColor: "orange"
        });
      </script>
    </polymer-element>

In this example, the published property `name` has initial value of `undefined` and `nameColor` has a value of "orange". Thus, the `<span>`'s color will be orange.

For more information see the [Data binding overview](databinding.html).

### Computed properties

Computed properties are dynamic properties that are computed
based on other property values. You can also publish a computed
property, so it can be data bound outside the element.

Computed properties are defined in the `computed` object on the
element's prototype:

<pre class="nocode">
<b>computed: {</b>
  <var>property-name</var><b>: '</b><var>expression</var><b>'
}</b>
</pre>

Each computed property is defined by a property name and a
[Polymer expression](expressions.html). The value
of the computed property is updated dynamically whenever one of
the input values in the expression changes.

In the following example, when you update the input value,
`num`, the computed property `square` updates automatically.

<link rel="import" href="../start/components/computed-property.html">

<demo-tabs selected="0">
  <demo-tab heading="square-element.html">
{% highlight html %}
<link rel="import"
      href="../bower_components/polymer/polymer.html">

{% include_external /docs/start/components/computed-property.html version_prefix:0.5 %}

{% endhighlight %}
  </demo-tab>
  <demo-tab heading="index.html">
{% highlight html %}
<!DOCTYPE html>
<html>
  <head>
    <script src="webcomponents.min.js"></script>
    <link rel="import" href="square-element.html">
  </head>
  <body>
    <square-element></square-element>
  </body>
</html>
{% endhighlight %}
  </demo-tab>
  <div class="result">
    <square-element></square-element>
  </div>
</demo-tabs>

Computed properties are read-only: for example, setting
the `square` property on `square-element` has no effect.

You can publish a computed property like any other property,
by adding it to the `attributes` list or to the `publish` object.
Any default value specified in the `publish` object is ignored.

**Limitations**: In {{site.project_title}} 0.4.0 and earlier, computed properties
couldn't be published.
For example, you couldn't bind to the `square` property on `square-element` using
 `<square-element square="{%raw%}{{value}}{%endraw%}>`.
{: .alert .alert-warning }

### Declarative event mapping

{{site.project_title}} supports declarative binding of events to methods in the component.
It uses special <code>on-<em>event</em></code> syntax to trigger this binding behavior.

    <polymer-element name="g-cool" on-keypress="{% raw %}{{keypressHandler}}{% endraw %}">
      <template>
        <button on-click="{% raw %}{{buttonClick}}{% endraw %}"></button>
      </template>
      <script>
        Polymer({
          keypressHandler: function(event, detail, sender) { ...},
          buttonClick: function(event, detail, sender) { ... }
        });
      </script>
    </polymer-element>

In this example, the `on-keypress` declaration maps the standard DOM `"keypress"` event to the `keypressHandler` method defined on the element. Similarly, a button within the element
declares a `on-click` handler for click events that calls the `buttonClick` method.
All of this is achieved without the need for any glue code.

Some things to notice:

* The value of an event handler attribute is the string name of a method on the component. Unlike traditional syntax, **you cannot put executable code in the attribute.**

* Because attributes are case-insensitive, **event names are converted to lowercase.** `on-TAP` and
  `on-tap` both add listeners for the `tap` event.

* The event handler is passed the following arguments:
  * `inEvent` is the [standard event object](http://www.w3.org/TR/DOM-Level-3-Events/#interface-Event).
  * `inDetail`: A convenience form of `inEvent.detail`.
  * `inSender`: A reference to the node that declared the handler. This is often different from `inEvent.target` (the lowest node that received the event) and `inEvent.currentTarget` (the component processing the event), so  {{site.project_title}} provides it directly.

#### Imperative event mapping

Alternatively, you can add event handlers to a {{site.project_title}} element imperatively.

**Note:** In general, the declarative form is preferred.
{: .alert .alert-info}

    <polymer-element name="g-button">
      <template>
        <button>Click Me!</button>
      </template>
      <script>
        Polymer({
          eventDelegates: {
            up: 'onTap',
            down: 'onTap'
          },
          onTap: function(event, detail, sender) {
            ...
          }
        });
      </script>
    </polymer-element>

The example adds event listeners for `up` and `down` events
to the {{site.project_title}} element called `g-button`.
The listeners are added to the host element rather than to individual
elements it contains.
These listeners handle events on the host element
in addition to events that bubble up from within it.
This code is equivalent
to adding an <code>on-<em>event</em></code>
handler directly on a `<polymer-element>`.

The relationship between the <code>on-<em>event</em></code> attribute
and the `eventDelegates` object
is analogous to the relationship between the
`attributes` attribute and the `publish` object.

The keys within the `eventDelegates` object are the event names to listen for.
The values are the callback function names, here `onTap`.
Event handler functions defined imperatively
receive the same arguments as those defined declaratively.

### Automatic node finding

Another useful feature of {{site.project_title}} is automatic node finding.
Nodes in a component's shadow DOM that are tagged with an
`id` attribute are automatically referenced in the component's `this.$` hash.

**Note:** Nodes created dynamically using data binding are _not_ added to the
`this.$` hash. The hash includes only _statically_ created shadow DOM nodes
(that is, the nodes defined in the element's outermost template).
{: .alert .alert-warning }

For example, the following defines a component whose template contains an `<input>` element whose `id` attribute is `nameInput`. The component can refer to that element with the expression `this.$.nameInput`.

    <polymer-element name="x-form">
      <template>
        <input type="text" id="nameInput">
      </template>
      <script>
        Polymer({
          logNameValue: function() {
            console.log(this.$.nameInput.value);
          }
        });
      </script>
    </polymer-element>

To locate other nodes inside the element's shadow DOM, you can create a
container element with a known ID and use `querySelector` to retrieve
descendants. For example, if your element's template looks like this:

    <template>
      <div id="container">
        <template if="{%raw%}{{some_condition}}{%endraw%}">
          <div id="inner">
           This content is created by data binding.
          </div>
        </template>
      </div>
    </template>

You can locate the inner container using:

    this.$.container.querySelector('#inner');

### Observing properties {#observeprops}

#### Changed watchers {#change-watchers}

The simplest way to observe property changes on your element is to use a changed watcher.
All properties on {{site.project_title}} elements can be watched for changes by implementing a <code><em>propertyName</em>Changed</code> handler. When the value of a watched property changes, the appropriate change handler is automatically invoked.

    <polymer-element name="g-cool" attributes="better best">
      <script>
        Polymer({
          better: '',
          best: '',
          betterChanged: function(oldValue, newValue) {
            ...
          },
          bestChanged: function(oldValue, newValue) {
            ...
          }
        });
      </script>
    </polymer-element>

In this example, there are two watched properties, `better` and `best`. The `betterChanged` and `bestChanged` function will be called whenever `better` or `best` are modified, respectively.

#### Custom property observers &mdash; the `observe` object {#observeblock}

Sometimes a [changed watcher](#change-watchers) is not enough. For more control over
property observation, {{site.project_title}} provides the `observe` object.

An `observe` object defines a custom property/observer mapping for one or more properties.
It can be used to watch for changes to nested objects or share the same callback
for several properties.

**Example:** sharing a single observer

    Polymer('x-element', {
      foo: '',
      bar: '',
      observe: {
        foo: 'validate',
        bar: 'validate'
      },
      ready: function() {
        this.foo = 'bar';
        this.bar = 'foo';
      },
      validate: function(oldValue, newValue) {
        ...
      },
    });

In the example, `validate()` is called whenever `foo` or `bar` changes.

**Example:** using automatic node finding in an `observe` object

When an element has an ID, you can use the `this.$` hash in the `observe` object to watch
a property on that element.

    <template>
      <x-foo id="foo"></x-foo>
    </template>
    ...
    Polymer('x-element', {
      observe: {
        '$.foo.someProperty': 'fooPropertyChanged'
      },
      fooPropertyChanged: function(oldValue, newValue) {
        ...
      }
    });

All property names in the `observe` object are relative to `this`, so `$.foo.someProperty`
refers to a property on the `<x-foo>` element. See the section on
[automatic node finding](#automatic-node-finding) for more infomration on the `this.$`
hash and its limitations.

**Example:** watching for changes to a nested object path

    Polymer('x-element', {
      observe: {
        'a.b.c': 'validateSubPath'
      },
      ready: function() {
        this.a = {
          b: {
            c: 'exists'
          }
        };
      },
      validateSubPath: function(oldValue, newValue) {
        var value = Path.get('a.b.c').getValueFrom(this);
        // oldValue == undefined
        // newValue == value == this.a.b.c === 'exists'
      }
    });

It's important to note that **{{site.project_title}} does not call the <code><em>propertyName</em>Changed</code> callback for properties included in the `observe` object**. Instead, the defined observer gets called.

    Polymer('x-element', {
      bar: '',
      observe: {
        bar: 'validate'
      },
      barChanged: function(oldValue, newValue) {
        console.log("I'm not called");
      },
      validate: function(oldValue, newValue) {
        console.log("I'm called instead");
      }
    });


### Firing custom events {#fire}

{{site.project_title}} core provides a convenient `fire()` method for
sending custom events. Essentially, it's a wrapper around your standard `node.dispatchEvent(new CustomEvent(...))`. In cases where you need to fire an event after microtasks have completed,
use the asynchronous version: `asyncFire()`.

Example:

{% raw %}
    <polymer-element name="ouch-button">
      <template>
        <button on-click="{{onClick}}">Send hurt</button>
      </template>
      <script>
        Polymer({
          onClick: function() {
            this.fire('ouch', {msg: 'That hurt!'}); // fire(type, detail, targetNode, bubbles?, cancelable?)
          }
        });
      </script>
    </polymer-element>

    <ouch-button></ouch-button>

    <script>
      document.querySelector('ouch-button').addEventListener('ouch', function(e) {
        console.log(e.type, e.detail.msg); // "ouch" "That hurt!"
      });
    </script>
{% endraw %}

**Tip:** If your element is within another {{site.project_title}} element, you can
use the special [`on-*`](#declarative-event-mapping) handlers to deal with the event: `<ouch-button on-ouch="{% raw %}{{myMethod}}{% endraw %}"></ouch-button>`
{: .alert .alert-success }

### Extending other elements

A {{site.project_title}} element can extend another element by using the `extends`
attribute. The parent's properties and methods are inherited by the child element
and data-bound.

    <polymer-element name="polymer-cool">
      <template>
        You are {%raw%}{{praise}}{%endraw%} <content></content>!
      </template>
      <script>
        Polymer({
          praise: 'cool'
        });
      </script>
    </polymer-element>

    <polymer-element name="polymer-cooler" extends="polymer-cool">
      <template>
        <!-- A shadow element renders the extended
             element's shadow DOM here. -->
        <shadow></shadow> <!-- "You are cool Matt" -->
      </template>
      <script>
        Polymer();
      </script>
    </polymer-element>

    <polymer-cooler>Matt</polymer-cooler>

#### Overriding a parent's methods

When you override an inherited method, you can call the parent's method with `this.super()`, and optionally pass it a list of arguments (e.g. `this.super([arg1, arg2])`). The reason the parameter is an array is so you can write `this.super(arguments)`.

{% raw %}
    <polymer-element name="polymer-cool">
      <template>
        You are {{praise}} <content></content>!
      </template>
      <script>
        Polymer({
          praise: 'cool',
          makeCoolest: function() {
            this.praise = 'the coolest';
          }
        });
      </script>
    </polymer-element>

    <polymer-element name="polymer-cooler" extends="polymer-cool"
                     on-click="{{makeCoolest}}">
      <template>
        <shadow></shadow>
      </template>
      <script>
        Polymer({
          praise: 'cool',
          makeCoolest: function() {
            this.super(); // calls polymer-cool's makeCoolest()
          }
        });
      </script>
    </polymer-element>

    <polymer-cooler>Matt</polymer-cooler>
{% endraw %}

In this example, when the user clicks on a `<polymer-cooler>` element, its
`makeCoolest()` method is called, which in turn calls the parent's version
using `this.super()`. The `praise` property (inherited from `<polymer-cool>`) is set
to "coolest".

## Built-in element methods {#builtin}

{{site.project_title}} includes a few handy methods on your element's prototype.
A few of the utility methods are documented here:

* [`onMutation`](#onMutation) can be used to set up a callback when the element's children change.
* [`async`](#asyncmethod) schedules a task to be executed after a configurable timeout, and is
  synchronized with `requestAnimationFrame`.
* [`job`](#job) can be used to debounce event handlers, ensuring that a task is executed only
  once during a given time window.

An additional instance method, [`injectBoundHTML`](databinding-advanced.html#boundhtml),
is documented in the data-binding section.

### Observing changes to light DOM children {#onMutation}

To know when light DOM children change, you can setup a Mutation Observer to
be notified when nodes are added or removed. To make this more convenient, {{site.project_title}} adds an `onMutation()` callback to every element. Its first argument is the DOM element to
observe. The second argument is a callback which is passed the `MutationObserver` and the mutation records:

    this.onMutation(domElement, someCallback);

**Example** - Observe changes to (light DOM) children elements:

    ready: function() {
      // Observe a single add/remove.
      this.onMutation(this, this.childrenUpdated);
    },
    childrenUpdated: function(observer, mutations) {
      // getDistributedNodes() has new stuff.

      // Monitor again.
      this.onMutation(this, this.childrenUpdated);
    }

### Dealing with asynchronous tasks {#asyncmethod}

Many things in {{site.project_title}} happen asynchronously. Changes are gathered up
and executed all at once, instead of executing right away. Batching
changes creates an optimization that (a) prevents duplicated work and (b) reduces unwanted [FOUC](http://en.wikipedia.org/wiki/Flash_of_unstyled_content).

[Change watchers](#change-watchers) and situations that rely on data-bindings
are examples that fit under this async behavior. For example, conditional templates may not immediately render after setting properties because changes to those renderings are saved up and performed all at once after you return from JavaScript.

To do work after changes have been processed, {{site.project_title}} provides `async()`.
It's similar to `window.setTimeout()`, but it automatically binds `this` to the correct value and is timed to `requestAnimationFrame`:

    // async(inMethod, inArgs, inTimeout)
    this.async(function() {
      this.foo = 3;
    }, null, 1000);

    // Roughly equivalent to:
    //setTimeout(function() {
    //  this.foo = 3;
    //}.bind(this), 1000);

The first argument is a function or string name for the method to call asynchronously.
The second argument, `inArgs`, is an optional object or array of arguments to
pass to the callback.

In the case of property changes that result in DOM modifications, follow this pattern:

    Polymer('my-element', {
      propChanged: function() {
        // If "prop" changing results in our DOM changing,
        // schedule an update after the new microtask.
        this.async(this.updateValues);
      },
      updateValues: function() {...}
    });

### Delaying work {#job}

Sometimes it's useful to delay a task after an event, property change, or user interaction. A common way to do this is with `window.setTimeout()`:

    this.responseChanged = function() {
      if (this.timeout1) {
        clearTimeout(this.toastTimeout1);
      }
      this.timeout1 = window.setTimeout(function() {
        ...
      }, 500);
    }

However, this is such a common pattern that {{site.project_title}} provides the `job()` utility for doing the same thing:

    this.responseChanged = function() {
      this.job('job1', function() { // first arg is the name of the "job"
        this.fire('done');
      }, 500);
    }

`job()` can be called repeatedly before the timeout but it only results in a single side-effect. In other words, if `responseChanged()` is immediately executed 250ms later, the `done` event won't fire until 750ms.

## Advanced topics {#additional-utilities}

### Life of an element's bindings {#bindings}

When you remove an element from the DOM, {{site.project_title}} asynchronously
deactivates its {%raw%}`{{}}`{%endraw%} bindings and `*Changed` methods. This helps prevent
memory leaks, ensuring the element will be garbage collected.

If you want the element to "remain active" when it's not in the `document`,
call `cancelUnbindAll()` right after you remove it. The [lifecycle methods](#lifecyclemethods)
are a good place for this:

    Polymer('my-element', {
      detached: function() {
        // Keep bindings active when this element is removed
        this.cancelUnbindAll();
      }
    });

If you explicitly call `cancelUnbindAll()`, {{site.project_title}} won't manage
the bindings automatically. It's your responsibility to manage the element's
bindings by eventually doing one of the following:

-   Adding the element back into the DOM.
-   Explicitly unbinding the element by calling the `unbindAll` or
    `asyncUnbindAll` method.

    var el = document.querySelector('my-element');
    el.parentNode.removeChild(el);

     ...
    // finished with this element, not going to reinsert it.
    el.unbindAll();

If you fail to unbind or reinsert an element, your application may leak memory.

#### Using preventDispose {#preventdispose}

To force bindings from being removed in all cases, set `.preventDispose`:

    Polymer('my-element', {
      preventDispose: true
    });

### How data changes are propagated {#flush}

Data changes in {{site.project_title}} happen almost immediately (at end of a microtask)
when `Object.observe()` is available. When it's not supported, {{site.project_title}} uses a polyfill ([observe-js](https://github.com/Polymer/observe-js)) to poll and periodically propagate data-changes throughout the system. This is done through a method called `Platform.flush()`.

#### What is `Platform.flush()`?

`Platform.flush()` is part of {{site.project_title}}'s data observation polyfill, [observe-js](https://github.com/Polymer/observe-js). It dirty check's all objects that have been observed and ensures notification callbacks are dispatched. {{site.project_title}} automatically calls `Platform.flush()` periodically, and this should be sufficient for most application workflows. However, there are times when you'll want to call `Platform.flush()` in application code.

**Note:** on platforms that support `Object.observe()` natively, `Platform.flush()` does nothing.
{: .alert .alert-info }

#### When should I call `Platform.flush()`?

Instead of waiting for the next poll interval, one can manually schedule an update by calling `Platform.flush()`. **There are very few cases where you need to call `Platform.flush()` directly.**

If it's important that a data change propagates before the next screen paint, you may
need to manually call `Platform.flush()`. Here are specific examples:

1. A property change results in a CSS class being added to a node. Often, this works out fine, but sometimes, it's important to make sure the node does not display without the styling from the added class applied to it. To ensure this, call `Platform.flush()` in the property change handler after adding the CSS class.
2. The author of a slider element wants to ensure that data can propagate from it as the user slides the slider. A user of the element, might, for example, bind the slider's value to an input and expect to see the input change while the slider is moving. To achieve this, the element author calls `Platform.flush()` after setting the element's value in the `ontrack` event handler.

**Note:** {{site.project_title}} is designed such that change notifications are asynchronous. Both `Platform.flush()` and `Object.observe()` (after which it's modeled) are asynchronous. Therefore, **`Platform.flush()` should not be used to try to enforce synchronous data notifications**. Instead, always use [change watchers](#change-watchers) to be informed about state.
{: .alert .alert-info }

### How {{site.project_title}} elements prepare themselves {#prepare}

For performance reasons, `<polymer-element>`s avoid the expense of preparing ShadowDOM, event listeners, and property observers if they're created outside the main document.
This behavior is similar to how native elements such as `<img>` and `<video>` behave.
They remain in a semi-inert state when created outside the main document (e.g. an `<img>` avoids the expense of loading its `src`).

{{site.project_title}} elements prepare themselves automatically in the following cases:

1. when they're created in a `document` that has a `defaultView` (the main document)
2. when they receive the `attached` callback
3. when they're created in the `shadowRoot` of another element that is preparing itself

In addition, if the `.alwaysPrepare` property is set to `true`, {{site.project_title}} elements
prepare themselves even when they do not satisfy the above rules.

    Polymer('my-element', {
      alwaysPrepare: true
    });

**Note:** an element's [`ready()` lifecycle callback](#lifecyclemethods) is called after an element has been prepared. Use `ready()` to know when an element is done initializing itself.
{: .alert .alert-success }

### Resolving paths of sibling elements {#resolvepath}

For the general case of element re-use and sharing, URLs in HTML Imports are meant to be relative to the location of the import. The majority of the time, the browser takes care of this for you.

However, JavaScript doesn't have a notion of a local import. Therefore, {{site.project_title}} provides a `resolvePath()` utility for converting paths relative to the import to paths relative to the document.

For example: If you know your import is in a folder containing a resource (e.g `x-foo.png`), you can get a path to `x-foo.png` which will work relative to the main document by calling `this.resolvePath('x-foo.png')`.

Visually, this might look like the following:

    index.html
    components/x-foo/
      x-foo.html
      x-foo.png

At an element level, where `this` refers to an instance of an `x-foo` created by `index.html`, `this.resolvePath('x-foo.png') === 'components/x-foo/x-foo.png'`.

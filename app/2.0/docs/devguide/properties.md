---
title: Declare Properties
---

<!-- toc -->

You can declare properties on an element to add a default value and enable various features in the
data system.

Declared properties can specify:

*   Property type.
*   Default value.
*   Property change observer. Calls a method whenever the property value changes.
*   Read-only status. Prevents accidental changes to the property value.
*   Two-way data binding support. Fires an event whenever the property value changes.
*   Computed property. Dynamically calculates a value based on other properties.
*   Property reflection to attribute. Updates the corresponding attribute value when the property
    value changes.

Many of these features are tightly integrated into the [data system](data-system), and are
documented in the data system section.

In addition, a declared property can be configured from markup using an attribute
(see [attribute deserialization](#attribute-deserialization) for details).

**In most cases, a property that's part of your element's public API should be declared in the
`properties` object.**


To declare properties, add a static `properties` getter to the element's class. The getter should
return  an object containing property declarations.

Example { .caption }

```js
class XCustom extends Polymer.Element {

  static get properties() {
    return {
      user: String,
      isHappy: Boolean,
      count: {
        type: Number,
        readOnly: true,
        notify: true
      }
    }
  }
}

customElements.define('x-custom', XCustom);
```

The `properties` object supports the following keys for each property:

<table>
<tr>
<th>Key</th><th>Details</th>
</tr>
<tr>
<td><code>type</code></td>
<td>
Type: constructor <br>

Attribute type, used for deserializing from an attribute. Polymer supports deserializing the
following types: <code>Boolean</code>, <code>Date</code>, <code>Number</code>, <code>String</code>,
<code>Array</code> and <code>Object</code>. You can add support for other types by overriding the
element's `_deserializeValue` method.

Unlike 0.5, the
property's type is explicit, specified using the type's constructor. See
<a href="#attribute-deserialization">attribute deserialization</a> for more information.

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
<a href="#configure-values">Configuring default property values</a> for more information.
</td>
</tr>
<tr>
<td><code>reflectToAttribute</code></td>
<td>Type: <code>boolean</code><br>

Set to <code>true</code> to cause the corresponding attribute to be set on the host node
when the property value changes. If the property value is Boolean, the attribute
is created as a standard HTML boolean attribute (set if true, not set if false).
For other property types, the attribute value is a string representation of the
property value. Equivalent to <code>reflect</code> in Polymer 0.5.
See <a href="#attribute-reflection">Reflecting properties to attributes</a> for
more information.
</td>
</tr>
<tr>
<td><code>readOnly</code></td>
<td>Type: <code>boolean</code><br>

If <code>true</code>, the property can't be set directly by assignment or data binding. See <a href="#read-only">Read-only properties</a>.
</td>
</tr>
<tr>
<td><code>notify</code></td>
<td>Type: <code>boolean</code><br>

If <code>true</code>, the property is available for two-way data binding. In addition, an
event, <code><var>property-name</var>-changed</code> is fired whenever the
property changes. See <a href="#notify">Property change notification events (notify)</a>
for more information.
</td>
</tr>
<tr>
<td><code>computed</code></td>
<td>Type: <code>string</code><br>

The value is interpreted as a method name and argument list. The method is invoked
to calculate the value whenever any of the argument values changes. Computed
properties are always read-only. See <a href="observers#computed-properties">Computed properties</a>
for more information.
</td>
</tr>
<tr>
<td><code>observer</code></td>
<td>Type: <code>string</code><br>

The value is interpreted as a method name to be invoked when the property value
changes. Note that unlike in 0.5, <strong>property change handlers must be registered
explicitly.</strong> The <code><var>propertyName</var>Changed</code> method will not be
invoked automatically. See <a href="observers">Property change callbacks (observers)</a>
for more information.
</td>
</tr>
</table>

## Property name to attribute name mapping {#property-name-mapping}

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

**Compatibility note:** In 0.5, Polymer attempted to map attribute names to corresponding properties.
For example, the attribute `foobar` would map to the property `fooBar` if it was
defined on the element. This **does not happen in 1.0**—attribute to property
mappings are set up on the element at registration time based on the rules
described above.
{ .alert .alert-warning }

## Attribute deserialization {#attribute-deserialization}

If a property is configured in the `properties` object, an attribute on the
instance matching the property name will be deserialized according to the type
specified and assigned to a property of the same name on the element instance.

If no other `properties` options are specified for a property, the `type`
(specified using the type constructor, e.g. `Object`, `String`, etc.) can be set
directly as the value of the property in the `properties` object; otherwise it
should be provided as the value to the `type` key in the `properties`
configuration object.


Boolean properties are set based on the _presence_ of the attribute:
if the attribute exists at all, the property is set to `true`, regardless
of the attribute _value_. If the attribute is absent, the property
gets its default value.

Example: { .caption }

```html
<script>
  class XCustom extends Polymer.Element {

    static get properties() {
      return {
        user: String,
        manager: {
          type: Boolean,
          notify: true
        }
      }
    }

    connectedCallback() {
      super.connectedCallback();
      
      // render
      this.textContent = 'Hello World, my user is ' + (this.user || 'nobody') + '.\n' +
        'This user is ' + (this.manager ? '' : 'not') + ' a manager.';
    }
  }

  customElements.define('x-custom', XCustom);
</script>

<x-custom user="Scott" manager></x-custom>
<!--
<x-custom>'s text content becomes:
Hello World, my user is Scott.
This user is a manager.
-->
```

To configure camel-case properties of elements using attributes, dash-
case should be used in the attribute name.

Example: { .caption }

```html
<script>

  class XCustom extends Polymer.Element {

    static get properties() {
      return {
        userName: String
      }
    }
  }

  customElements.define('x-custom', XCustom);
</script>

<x-custom user-name="Scott"></x-custom>
<!-- Sets <x-custom>.userName = 'Scott';  -->
```

**Note:** Deserialization occurs both at create time, and at runtime (for
example, when the attribute is changed using `setAttribute`).  However, it is
encouraged that attributes only be used for configuring properties in static
markup, and instead that properties are set directly for changes at runtime.
{.alert .alert-info}

### Configuring boolean properties

For a Boolean property to be configurable from markup, it must default to `false`. If it defaults
to `true`, you cannot set it to `false` from markup, since the presence of the attribute, with or
without a value, equates to `true`. This is the standard behavior for attributes in the web platform.

If this behavior doesn't fit your use case, you can use a string-valued or number-valued attribute
instead.

### Configuring object and array properties

For object and array properties you can pass an object or array in JSON format:

```
<my-element book='{ "title": "Persuasion", "author": "Austen" }'></my-element>
```

Note that JSON requires double quotes, as shown above.

### Custom deserializers

The type system includes built-in support for Boolean and Number values, Object and Array values
expressed as JSON, or Date objects expressed as any Date-parsable string
representation. To support other types, you can override the element's `_deserializeValue` method.


```js
_deserializeValue(value, type) {
  if (type == MyCustomType) {
    return stringToMyCustomType(value);
  } else {
    return super._deserializeValue(value, type);
  }
}
```

## Configuring default property values {#configure-values}

Default values for properties may be specified in the `properties` object using
the `value` field.  The value may either be a primitive value, or a function
that returns a value.

If you provide a function, Polymer calls the function once
_per element instance_.

When initializing a property to an object or array value, use a function to
ensure that each element gets its own copy of the value, rather than having
an object or array shared across all instances of the element.

Example: { .caption }

```js
class XCustom extends Polymer.Element {

  static get properties() {
    return {
      mode: {
        type: String,
        value: 'auto'
      },

      data: {
        type: Object,
        notify: true,
        value: function() { return {}; }
      }
    }
  }
}
```


## Property change notification events (notify) {#notify}

When a property is set to `notify: true`, an event is fired whenever the
property value changes. The event name is:

<code><var>property-name</var>-changed</code>

Where <code><var>property-name</var></code> is the dash-case version of
the property name. For example, a change to `this.firstName` fires
`first-name-changed`.

These events are used by the two-way data binding system. External
scripts can also listen for events (such as `first-name-changed`)
directly using `addEventListener`.

For more on property change notifications and the data system, see
[Data flow](data-system#data-flow).

## Read-only properties {#read-only}

When a property only "produces" data and never consumes data, this can be made
explicit to avoid accidental changes from the host by setting the `readOnly`
flag to `true` in the `properties` property definition.  In order for the
element to actually change the value of the property, it must use a private
generated setter of the convention <code>\_set<var>Property</var>(value)</code>
where <code><var>Property</var></code> is the property name, with the first character converted to uppercase (if alphabetic). For example, the setter for `oneProperty` is `setOneProperty`, and the setter
for _privateProperty is `set_privateProperty`.

```
class XCustom extends Polymer.Element {

  static get properties() {
    return {
      response: {
        type: Object,
        readOnly: true,
        notify: true
      }
    }
  }

  responseHandler(response) {
    // set read-only property
    this._setResponse(response);
  }
}
```

For more on read-only properties and data binding, see
[How data flow is controlled](data-system#data-flow-control).


## Reflecting properties to attributes  {#attribute-reflection}

In specific cases, it may be useful to keep an HTML attribute value in sync with
a property value.  This may be achieved by setting `reflectToAttribute: true` on
a property in the `properties` configuration object. This causes any observable
change to the property to trigger an update to the corresponding attribute
(as described in <a href="#property-name-mapping">Property name to attribute name mapping</a>).
Since attributes only take string values, the property value is serialized
to a string, as described in <a href="#attribute-serialization">Attribute serialization</a>.

```js
class XCustom extends Polymer.Element {

  static get properties() {
    return {
      loaded: {
        type: Boolean,
        reflectToAttribute: true
      }
    }
  }

  _onLoad() {
    this.loaded = true;
    // results in this.setAttribute('loaded', true);
  }
}
```

### Attribute serialization {#attribute-serialization}

When reflecting a property to an attribute or
[binding a property to an attribute](data-binding#attribute-binding),
the property value is _serialized_ to the attribute.

By default, values are serialized according to value's  **current type**,
_regardless of the property's `type` value_:

*   `String`. No serialization required.
*   `Date` or `Number`. Serialized using  `toString`.
*   `Boolean`. Results in a non-valued attribute to be either set (`true`) or removed (`false`).
*   `Array` or `Object`. Serialized using `JSON.stringify`.

To add custom serialization for other data types, override your element's `_serializeValue`
method.

```js
_serializeValue(value) {
  if (value instanceof MyCustomType) {
    return value.toString();
  }
  return super._serializeValue(value);
}
```

## Implicitly declared properties

A property is declared _implicitly_ if you add it to a data binding or add it as a dependency of an
observer, computed property, or computed binding.

Polymer automatically creates setters for these implicitly declared properties. However, implicitly
declared properties can't be configured from markup.

## Private and protected properties

JavaScript doesn't have any true protection for properties. By convention, Polymer elements usually
use a single underscore (`_protectedProp`) to indicate a protected property or method (intended to
be used or overridden by subclasses, but not for public use), and a double underscore
(`__privateProp`) for members that are private to the class.


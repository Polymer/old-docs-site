---
layout: default
type: guide
shortname: Docs
title: Declared properties
subtitle: Developer guide
---

{% include toc.html %}


You can declare properties on your custom element by adding them to
the `properties` object on your prototype. Adding a property to the `properties` 
object allows a user to configure the property from markup (see 
[attribute deserialization](#attribute-deserialization) for details).
**Any property that's part of your element's public API should be declared in the 
`properties` object.**

In addition, the `properties` object can be used to specify:

* Property type. 
* Default value. 
* Property change observer. Calls a method whenever the property value changes.
* Read-only status. Prevents accidental changes to the property value.
* Two-way data binding support. Fires an event whenever the property value changes.
* Computed property. Dynamically calculates a value based on other properties.
* Property reflection to attribute. Updates the corresponding attribute value when the property value changes.

Example:

    Polymer({

      is: 'x-custom',

      properties: {
        user: String,
        isHappy: Boolean,
        count: {
          type: Number,
          readOnly: true,
          notify: true
        }
      },

      ready: function() {
        this.innerHTML = 'Hello World, I am a <b>Custom Element!</b>';
      }

    });

The `properties` object supports the following keys for each property:

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
<a href="#attribute-deserialization">attribute deserialization</a> for more information.

</td>
</tr>
<tr>
<td><code>value</code></td>
<td>
Type: <code>boolean</code>, <code>number</code>, <code>string</code> or <code>function</code>.<br>

Default value for the property. If `value` is a function, the function is
invoked and the return value is used as the default value of the property. If
the default value should be an array or object unique to the instance, create
the array or object inside a function. See 
<a href="#configure-values">Configuring default property values</a> for more information.
</td>
</tr>
<tr>
<td><code>reflectToAttribute</code></td>
<td>Type: <code>boolean</code><br> 

Set to `true` to cause the corresponding attribute to be set on the host node
when the property value changes. If the property value is Boolean, the attribute
is created as a standard HTML boolean attribute (set if true, not set if false).
For other property types, the attribute value is a string representation of the
property value. Equivalent to `reflect` in {{site.project_title}} 0.5.
See <a href="#attribute-reflection">Reflecting properties to attributes</a> for
more information.
</td>
</tr>
<tr>
<td><code>readOnly</code></td>
<td>Type: <code>boolean</code><br> 

If `true`, the property can't be set directly by assignment or data binding. An
internal setter is generated, <code>_set<var>Prop</var></code>, where
<code><var>Prop</var></code> is the property name with the first letter
capitalized. See <a href="#read-only">Read-only properties</a>.
</td>
</tr>
<tr>
<td><code>notify</code></td>
<td>Type: <code>boolean</code><br> 

If `true`, the property is available for two-way data binding. In addition, an
event, <code><var>propertyName</var>-changed</code> is fired whenever the
property changes. See <a href="#notify">Property change notification events (notify)</a>
for more information.
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
invoked automatically. See <a href="#change-callbacks">Property change callbacks (observers)</a> 
for more information.
</td>
</tr>
</table>

## Property name to attribute name mapping {#property-name-mapping}

For data binding, deserializing properties from attributes, and reflecting
properties back to attributes, {{site.project_title}} maps attribute names to property
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
defined on the element. This **does not happen in 0.8** &mdash; attribute to property
mappings are set up on the element at registration time based on the rules
described above.
{: .alert .alert-info }

## Attribute deserialization {#attribute-deserialization}

If a property is configured in the `properties` object, an attribute on the
instance matching the property name will be deserialized according to the type
specified and assigned to a property of the same name on the element instance.

If no other `properties` options are specified for a property, the `type`
(specified using the type constructor, e.g. `Object`, `String`, etc.) can be set
directly as the value of the property in the `properties` object; otherwise it
should be provided as the value to the `type` key in the `properties`
configuration object.

The type system includes support for Object and Array values expressed as JSON,
or Date objects expressed as any Date-parsable string representation. Boolean
properties set based on the existence of the attribute: if the attribute exists
at all, its value is true, regardless of its string-value (and the value is only
false if the attribute does not exist).

Example:

    <script>

      Polymer({

        is: 'x-custom',

        properties: {
          user: String,
          manager: {
            type: Boolean,
            notify: true
          }
        },

        attached: function() {
          // render
          this.innerHTML = 'Hello World, my user is ' + (this.user || 'nobody') + '.\n' +
            'This user is ' + (this.manager ? '' : 'not') + ' a manager.';
        }

      });

    </script>

    <x-custom user="Scott" manager></x-custom>
    <!--
    <x-custom>'s innerHTML becomes:
    Hello World, my user is Scott.
    This user is a manager.
    -->

In order to configure camel-case properties of elements using attributes, dash-
case should be used in the attribute name.  Example:

    <script>

      Polymer({

        is: 'x-custom',

        properties: {
          userName: String
        }

      });

    </script>

    <x-custom user-name="Scott"></x-custom>
    <!-- Sets <x-custom>.userName = 'Scott';  -->


**Note:** Deserialization occurs both at create time, and at runtime (for
example, when the attribute is changed using `setAttribute`).  However, it is
encouraged that attributes only be used for configuring properties in static
markup, and instead that properties are set directly for changes at runtime. 
{: .alert .alert-info }


## Configuring default property values {#configure-values}

Default values for properties may be specified in the `properties` object using
the `value` field.  The value may either be a primitive value, or a function
that returns a value (which should be used for initializing Objects and Arrays
to avoid shared objects on instances).

Example:

    Polymer({

      is: 'x-custom',
       
      properties: {
      
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

    });


## Property change callbacks (observers) {#change-callbacks}

Custom element properties may be observed for changes by specifying `observer`
property in the `properties` for the property that gives the name of a function
to call.  When the property changes, the change handler will be called with the
new and old values as arguments.

Example:

    Polymer({

      is: 'x-custom',

      properties: {
        disabled: {
          type: Boolean,
          observer: 'disabledChanged'
        },
        highlight: {
          observer: 'highlightChanged'
        }
      },

      disabledChanged: function(newValue, oldValue) {
        this.toggleClass('disabled', newValue);
        this.highlight = true;
      },

      highlightChanged: function() {
        this.classList.add('highlight');
        setTimeout(function() {
          this.classList.remove('highlight');
        }, 300);
      }

    });

**Compatibility note:** The argument order for change handlers is currently the
**opposite** of the order used in 0.5. 
{: .alert .alert-info }

Property change observation is achieved in Polymer by installing setters on the
custom element prototype for properties with registered interest (as opposed to
observation via `Object.observe` or dirty checking, for example).

### Observing changes to multiple properties

To observe changes to a set of properties, use the `observers`
object. Specifying a space-separated list of dependent properties that
should result in a change function being called.  These observers differ from
single-property observers in that the change handler is called asynchronously.

Example:

    Polymer({

      is: 'x-custom',

      properties: {
        preload: Boolean,
        src: String,
        size: String
      },

      observers: {
        'preload src size': 'updateImage'
      },

      updateImage: function(preload, src, size) {
        // ... do work using dependent values
      }

    });

### Observing changes to sub-properties {#observing-path-changes}

You can also observe changes to object sub-properties using the 
`observers` object, by specifying a full path (`user.manager.name`) 
or partial path (`user.*`) and a function name to call.  In this case, 
the third argument to the callback indicates the path that changed. 
Note that currently the second argument (old value) is not valid.

Example:

    Polymer({

      is: 'x-custom',

      properties: {
        user: Object
      },

      observers: {
        'user.manager.*': 'userManagerChanged'
      },

      userManagerChanged: function(newValue, oldValue, path) {
        if (path) {
          // sub-property of user.manager changed
          console.log('manager ' + path.split('.').pop() + ' changed to ' + newValue);
        } else {
          // user.manager object itself changed
          console.log('new manager name is ' + newValue.name);
        }
      }

    });

To observe a change to a path (object sub-property) the value **must be changed in
one of the following ways**:

*   Using a Polymer [property binding](data-binding.html#property-binding) to another element.
*   Using the [`setPathValue`](data-binding.html#set-path) API, which provides the
    required notification to elements with registered interest.

## Property change notification events (notify) {#notify}

When a property is set to `notify: true`, an event,
<code><var>propertyName</var>-changed</code>, is fired whenever the property
value changes. These events are used by the two-way data binding system, and can
also external scripts and frameworks to respond to changes in the element.

For more on property change notifications and data binding, see  [Property
change notification and two-way binding](data-binding.html#property-notification).

## Read-only properties {#read-only}

When a property only "produces" data and never consumes data, this can be made
explicit to avoid accidental changes from the host by setting the `readOnly`
flag to `true` in the `properties` property definition.  In order for the
element to actually change the value of the property, it must use a private
generated setter of the convention <code>_set<var>Property</var>(value)</code>.

    <script>
      Polymer({

        properties: {
          response: {
            type: Object,
            readOnly: true,
            notify: true
          }
        },

        responseHandler: function(response) {
          this._setResponse(response);
        }

        ...

      });
    </script>

For more on read-only properties and data binding, see 
[Property change notification and two-way binding](data-binding.html#property-notification).

## Computed properties {#computed-properties}

Polymer supports virtual properties whose values are calculated from other
properties.

To define a computed property, add it the `properties` object with a 
`computed` key mapping to a computing function. The function is provided 
as a string with dependent properties as arguments in parenthesis. 
The function will be called once (asynchronously) for any change to 
the dependent properties.

    <dom-module id="x-custom">
      <template>
        My name is <span>{%raw%}{{fullName}}{%endraw%}</span>
      </template>
    <dom-module id="x-custom">

    <script>
      Polymer({

        is: 'x-custom',

        properties: {

          first: String,

          last: String,

          fullName: {
            type: String,
            // when `first` or `last` changes `computeFullName` is called once
            // (asynchronously) and the value it returns is stored as `fullName`
            computed: 'computeFullName(first, last)'
          } 

        },

        computeFullName: function(first, last) {
          return first + ' ' + last;
        }

        ...

      });
    </script>

Only direct properties of the element (as opposed to sub-properties of an
object) can be used as dependencies at this time.

**Note:** If you only need a computed property for a data binding, you
can declare the computed property directly in the binding. See 
[Annotated computed properties](data-binding.html#annotated-computed).
{: .alert .alert-info }

## Reflecting properties to attributes {#attribute-reflection}

In specific cases, it may be useful to keep an HTML attribute value in sync with
a property value.  This may be achieved by setting `reflectToAttribute: true` on
a property in the `properties` configuration object.  This will cause any change
to the property to be serialized out to an attribute of the same name.

    <script>
      Polymer({

        properties: {
         response: {
            type: Object,
            reflectToAttribute: true
         }
        },

        responseHandler: function(response) {
          this.response = 'loaded';
          // results in this.setAttribute('response', 'loaded');
        }

      });
    </script>

### Attribute serialization {#attribute-serialization}

When reflecting a property to an attribute or 
[binding a property to an attribute](data-binding.html#attribute-binding),
the property value is _serialized_ to the attribute.

By default, values are serialized according to value's  _current_ type
(regardless of the property's `type` value):

*   `String`. No serialization required.
*   `Date` or `Number`. Serialized using  `toString`.  
*   `Boolean`. Results in a non-valued attribute to be either set (`true`) or removed (`false`).
*   `Array` or `Object`. Serialized using `JSON.stringify`. 

To supply custom serialization for a custom element, override your element's `serialize` method.

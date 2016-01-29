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
        this.textContent = 'Hello World, I am a Custom Element!';
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
property value. Equivalent to <code>reflect</code> in {{site.project_title}} 0.5.
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
properties are always read-only. See <a href="#computed-properties">Computed properties</a> 
for more information.
</td>
</tr>
<tr>
<td><code>observer</code></td>
<td>Type: <code>string</code><br>

The value is interpreted as a method name to be invoked when the property value 
changes. Note that unlike in 0.5, <strong>property change handlers must be registered 
explicitly.</strong> The <code><var>propertyName</var>Changed</code> method will not be 
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
defined on the element. This **does not happen in 1.0**—attribute to property
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

The type system includes support for Boolean and Number values, Object and Array values 
expressed as JSON, or Date objects expressed as any Date-parsable string 
representation. 

Boolean properties are set based on the _presence_ of the attribute: 
if the attribute exists at all, the property is set to `true`, regardless 
of the attribute _value_. If the attribute is absent, the property 
gets its default value.

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
          this.textContent = 'Hello World, my user is ' + (this.user || 'nobody') + '.\n' +
            'This user is ' + (this.manager ? '' : 'not') + ' a manager.';
        }

      });

    </script>

    <x-custom user="Scott" manager></x-custom>
    <!--
    <x-custom>'s text content becomes:
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

### Configuring boolean properties

For a Boolean property to be configurable from markup, it must default to `false`. If it defaults to `true`, you cannot set it to `false` from markup, since the presence of the attribute, with or without a value, equates to `true`. This is the standard behavior for attributes in the web platform.

If this behavior doesn't fit your use case, you can use a string-valued or number-valued attribute instead.

### Configuring object and array properties

For object and array properties you can pass an object or array in JSON format: 

    <my-element book='{ "title": "Persuasion", "author": "Austen" }'></my-element>

Note that JSON requires double quotes, as shown above.

## Configuring default property values {#configure-values}

Default values for properties may be specified in the `properties` object using
the `value` field.  The value may either be a primitive value, or a function
that returns a value.

If you provide a function, {{site.project_title}} calls the function once
_per element instance_. 

When initializing a property to an object or array value, use a function to 
ensure that each element gets its own copy of the value, rather than having 
an object or array shared across all instances of the element.

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


## Property change observers {#change-callbacks}

Custom element properties may be observed for changes by specifying `observer`
property in the `properties` object for the property that gives the name of a function
to call.  When the property changes, the change handler will be called with the
new and old values as arguments.

Example:

    Polymer({

      is: 'x-custom',

      properties: {
        disabled: {
          type: Boolean,
          observer: '_disabledChanged'
        },
        highlight: {
          observer: '_highlightChanged'
        }
      },

      _disabledChanged: function(newValue, oldValue) {
        this.toggleClass('disabled', newValue);
        this.highlight = true;
      },

      _highlightChanged: function() {
        this.classList.add('highlight');
        this.async(function() {
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

### Observing changes to multiple properties {#multi-property-observers}

To observe changes to a set of properties, use the `observers`
array.  

These observers differ from single-property observers in a few ways:

*   Observers are not invoked until all dependent properties are defined (`!== undefined`).  
    So each dependent properties should have a default `value` defined in `properties` (or otherwise 
    be initialized to a non-`undefined` value) to ensure the observer is called.
*   Observers do not receive `old` values as arguments, only new values.  Only single-property 
    observers defined in the `properties` object receive both `old` and `new` values.

Example:

    Polymer({

      is: 'x-custom',

      properties: {
        preload: Boolean,
        src: String,
        size: String
      },

      observers: [
        'updateImage(preload, src, size)'
      ],

      updateImage: function(preload, src, size) {
        // ... do work using dependent values
      }

    });

In addition to properties, observers can also observe [paths to sub-properties](#observing-path-changes),
[paths with wildcards](#deep-observation), or [array changes](#array-observation).

### Observing sub-property changes {#observing-path-changes}

To observe changes in object sub-properties:

*   Define an `observers` array.
*   Add an item to the `observers` array. The item must be a method name
    followed by a comma-separated list of one or more paths. For example,
    `onNameChange(dog.name)` for one path, or 
    `onNameChange(dog.name, cat.name)` for multiple paths. Each path is a
    sub-property that you want to observe.
*   Define the method in your element prototype. When the method is called,
    the argument to the method is the new value of the sub-property.

In order for Polymer to properly detect the sub-property change, the 
sub-property must be updated in one of the following two ways:

*   Via a [property binding](data-binding.html#property-binding).
*   By calling [`set`](data-binding.html#set-path).

Example:

    <dom-module id="x-sub-property-observer">
      <template>
        <!-- Sub-property is updated via property binding. -->
        <input value="{% raw %}{{user.name::input}}{% endraw %}">
      </template>
      <script>
        Polymer({
          is: 'x-sub-property-observer',
          properties: {
            user: {
              type: Object,
              value: function() {
                return {};
              }
            }
          },
          // Each item of observers array is a method name followed by 
          // a comma-separated list of one or more paths.
          observers: [
            'userNameChanged(user.name)'
          ],
          // Each method referenced in observers must be defined in 
          // element prototype. The argument to the method is the new value
          // of the sub-property. 
          userNameChanged: function(name) {
            console.log('new name: ' + name);
          },
        });
      </script>
    </dom-module>

### Observe array mutations {#array-observation}

Use an array mutation observer to call an observer function whenever an array 
item is added or deleted via `push`, `pop`, `shift`, `unshift`, or `splice`. 
Whenever the array is mutated, the observer receives a change record 
representing the mutation as a set of array splices.

In many cases, you'll want to observe both array mutations **and** changes to 
sub-properties of array items, in which case you should use a [deep 
sub-property observer](#deep-observation).

**Never use the built-in JavaScript array methods to splice your arrays.**
Always use Polymer's [array mutation methods](#array-mutation).
These methods ensure that elements with registered interest in the array
splices are properly notified.
{: .alert .alert-info }

To create a splice observer, specify a path to an array followed by `.splices`
in your `observers` array.

    observers: [
      'usersAddedOrRemoved(users.splices)'
    ]

Your observer method should accept a single argument. When your observer method
is called, it receives a change record of the mutations that 
occurred on the array. Each change record provides the following properties:

*   `indexSplices`. The set of changes that occurred to the array, in 
     terms of array indexes. Each `indexSplices` record contains the following 
     properties:

     -   `index`. Position where the splice started.
     -   `removed`. Array of `removed` items.
     -   `addedCount`. Number of new items inserted at `index`. 

*   `keySplices`. The set of changes that occurred to the array in terms
    of array keys. Each `keySplices` record contains the following properties: 

    -   `added`. Array of added keys.
    -   `removed`. Array of removed keys. 

Example:

    Polymer({

      is: 'x-custom',

      properties: {
        users: {
          type: Array,
          value: function() {
            return [];
          }
        }
      },

      observers: [
        'usersAddedOrRemoved(users.splices)'
      ],

      usersAddedOrRemoved: function(changeRecord) {
        changeRecord.indexSplices.forEach(function(s) {
          s.removed.forEach(function(user) {
            console.log(user.name + ' was removed');
          });
          console.log(s.addedCount + ' users were added');
        }, this);
      },

      addUser: function() {
        this.push('users', {name: "Jack Aubrey"});
      }

    });

### Deep sub-property observation {#deep-observation}

To call an observer when any (deep) sub-property of an
object or array changes, specify a path with a wildcard (`*`).

When you specify a path with a wildcard, the argument passed to your
observer is a change record object with the following properties:

*   `path`. Path to the property that changed. Use this to determine whether
    a property changed, a sub-property changed, or an array was mutated.
*   `value`. New value of the path that changed.
*   `base`. The object matching the non-wildcard portion of the path. 

For array mutations, `path` is the path to the array that changed, 
followed by `.splices`. And the change record includes the `indexSplices` and 
`keySplices` properties described in 
[Observe array mutations](#array-observation).

Example:

    <dom-module id="x-deep-observer">
      <template>
        <input value="{% raw %}{{user.name.first::input}}{% endraw %}" 
               placeholder="First Name">
        <input value="{% raw %}{{user.name.last::input}}{% endraw %}" 
               placeholder="Last Name">
      </template>
      <script>
        Polymer({
          is: 'x-deep-observer',
          properties: {
            user: {
              type: Object,
              value: function() {
                return {'name':{}};
              }
            }
          },
          observers: [
            'userNameChanged(user.name.*)'
          ],
          userNameChanged: function(changeRecord) {
            console.log('path: ' + changeRecord.path);
            console.log('value: ' + changeRecord.value);
          },
        });
      </script>
    </dom-module>

#### Deep sub-property changes on array items

When a sub-property of an array is modified, `changeRecord.path` references 
the "key" of the array item that was modified, not the array index. For 
example:

    console.log(changeRecord.path); // users.#0.name

`#0` signifies the key of this example array item. All keys are prefixed 
with a number sign (`#`) by convention to distinguish them from array indexes.
Keys provide stable references to array items, regardless of any splices
(additions or removals) on the array.

If for some reason you need a reference to the index of an array item, you 
can retrieve it via the `Polymer.Collection` internal abstraction:

   var collection = Polymer.Collection.get(changeRecord.base);
   var index = changeRecord.base.indexOf(collection.getItem(key));

### Array mutation methods {#array-mutation}

When modifying arrays, a set of array mutation methods are provided on {{site.project_title}}
element prototypes which mimic `Array.prototype` methods, with the exception that
they take a `path` string as the first argument.  The `path` argument identifies
an array on the element to mutate, with the following arguments matching those
of the native `Array` methods.  

These methods perform the mutation action on
the array, and then notify other elements that may be bound to the same
array of the changes.  You must use these methods when mutating an array
to ensure that any elements watching the array (via observers, computed properties,
or data bindings) are kept in sync.

Every Polymer element has the following array mutation methods available:

* `push(path, item1, [..., itemN])`
* `pop(path)`
* `unshift(path, item1, [..., itemN])`
* `shift(path)`
* `splice(path, index, removeCount, [item1, ..., itemN])`

Example:

    <dom-module id="custom-element">
      <template>
        <template is="dom-repeat">{{users}}</template>
      </template>

      <script>
        Polymer({

          is: 'custom-element',

          addUser: function(user) {
            this.push('users', user);
          },

          removeUser: function(user) {
            var index = this.users.indexOf(user);
            this.splice('users', index, 1);
          }

        });
      </script>
    </dom-module>

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

For more on property change notifications and data binding, see 
[Property change notification and two-way 
binding](data-binding.html#property-notification).

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

      });
    </script>

For more on read-only properties and data binding, see 
[Property change notification and two-way binding](data-binding.html#property-notification).

## Computed properties {#computed-properties}

Polymer supports virtual properties whose values are calculated from other
properties.

To define a computed property, add it to the `properties` object with a 
`computed` key mapping to a computing function:

    fullName: {
      type: String,
      computed: 'computeFullName(first, last)'
    } 


The function is provided as a string with dependent properties as arguments 
in parenthesis. The function will be called once for any change to 
the dependent properties.

The computing function is not invoked until **all** dependent properties 
are defined (`!== undefined`). So each dependent properties should have a 
default `value` defined in `properties` (or otherwise be initialized to a 
non-`undefined` value) to ensure the property is computed.

**Note:** The definition of a computing function looks like the 
definition of a [multi-property observer](#multi-property-observers),
and the two act almost identically. The only difference is that the 
computed property function returns a value that's exposed as a virtual property.
{: .alert .alert-info }

    <dom-module id="x-custom">

      <template>
        My name is <span>{%raw%}{{fullName}}{%endraw%}</span>
      </template>

      <script>
        Polymer({

          is: 'x-custom',

          properties: {

            first: String,

            last: String,

            fullName: {
              type: String,
              // when `first` or `last` changes `computeFullName` is called once
              // and the value it returns is stored as `fullName`
              computed: 'computeFullName(first, last)'
            } 

          },

          computeFullName: function(first, last) {
            return first + ' ' + last;
          }

        });
      </script>

    </dom-module>

  

Arguments to computing functions may be simple properties on the element, as 
well as any of the arguments types supported by `observers`, including [paths](#observing-path-changes), 
[paths with wildcards](#deep-observation), and [paths to array splices](#array-observation).  
The arguments received by the computing function match those described in the sections referenced above.

**Note:** If you only need a computed property for a data binding, you
can use a computed binding instead. See 
[Computed bindings](data-binding.html#annotated-computed).
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

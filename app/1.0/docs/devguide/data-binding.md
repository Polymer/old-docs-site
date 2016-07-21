---
title: Data binding
---

<!-- toc -->

In its simplest form, data binding binds a property or sub-property of a custom element
(the _host element_) to a property or attribute of an element in its local DOM (the _child_
or _target element_).

The *data binding* establishes a connection between [paths](data-system#data-paths) on the
_host element_ and _target element_, allowing data changes to flow from one element to the other.

You create data bindings by adding _annotations_ to an element's local DOM template.

```
<dom-module id="host-element">
    <template>
      <target-element target-property="{{hostProperty}}"></target-element>
    </template>
</dom-module>
```

## Binding annotations {#binding-annotation}

Polymer provides two kinds of data binding delimiters:

*   One-way bindings:  (<code>[[<var>binding</var>]]</code>). One-way bindings allow only
    <strong>downward</strong> data flow.

*   Two-way or "automatic" binding annotations (<code>{{<var>binding</var>}}</code>). Automatic
    bindings allow <strong>upward and downward</strong> data flow.

See [Data flow](data-system#data-flow) for information on two-way binding and upward data flow.

The text inside the delimiters can be one of the following:

*   A property or subproperty path (`users`, `address.street`).
*   A computed binding (`_computeName(firstName, lastName, locale)`)
*   Any of the above, preceded by the negation operator (`!`).

The paths in a data binding annotation are relative to the current [data binding
scope](data-system#data-binding-scopes).

## Bind to a target property {#property-binding}

To bind to a target property, specify the attribute name that corresponds to the
property, with an [annotation](#binding-annotation) as the attribute value:

```
<target-element name="{{myName}}"></child-element>
```

This example binds the target element's `name` property to the host element's
`myName` property.

While HTML attributes are used to specify bindings, values are
assigned directly to JavaScript properties, **not** to the HTML attributes of the
elements. (There is a [special attribute binding syntax](#attribute-binding) for
those cases where you want to bind to an attribute value.)

Attribute names are mapped to property names as described in [Property name to
attribute name mapping](properties#property-name-mapping). To
bind to camel-case properties of elements, use dash-case in the attribute name.
For example:

```
<user-view first-name="{{managerName}}"></user-view>
<!-- Sets <user-view>.firstName = this.managerName; -->
```

**Some attributes are special.** When binding to `style`, `href`, `class`, `for` or
`data-*` attributes, it is recommend that you use [attribute binding](#attribute-binding)
syntax. For more information, see [Binding to native element attributes](#native-binding).
{ .alert .alert-info }


### Bind to text content

To bind to a target element's `textContent`, you can simply include the
annotation inside the target element.

```
<dom-module id="user-view">

    <template>
      <div>{{firstName}}</div>
    </template>

    <script>
      Polymer({
        is: 'user-view',
        properties: {
          firstName: String,
          lastName: String
        }
      });
    </script>

</dom-module>

<user-view first-name="Samuel" last-name="Adams"></user-view>
```

Binding to text content is always one-way, host-to-target.

### Two-way binding to non-Polymer elements {#two-way-native}

As mentioned above, Polymer uses an event naming convention to achieve two-way
binding.

To two-way bind to native elements or non-Polymer elements that _don't_
follow this event naming convention, you can specify a
custom change event name in the annotation using the following syntax:

<code><var>target-prop</var>="{{<var>hostProp</var>::<var>target-change-event</var>}}"</code>


Example: { .caption }

```

<!-- Listens for `input` event and sets hostValue to <input>.value -->
<input value="{{hostValue::input}}">

<!-- Listens for `change` event and sets hostChecked to <input>.checked -->
<input type="checkbox" checked="{{hostChecked::change}}">

<!-- Listens for `timeupdate ` event and sets hostTime to <video>.currentTime -->
<video url="..." current-time="{{hostTime::timeupdate}}">


: When binding to standard notifying properties on Polymer elements,
specifying the event name is unnecessary, as the default convention will be
to listen for `property-changed` events.  The following constructions are equivalent:


<!-- Listens for `value-changed` event -->
<my-element value="{{hostValue::value-changed}}">

<!-- Listens for `value-changed` event using Polymer convention by default -->
<my-element value="{{hostValue}}">

```

### Compound bindings {#compound-bindings}

You can combine string literals and bindings in a single property binding or
text content binding. For example:

```
<img src$="https://www.example.com/profiles/{{userId}}.jpg">

<span>Name: {{lastname}}, {{firstname}}</span>
```

Compound bindings are re-evaluated whenever the value of any of the individual
bindings changes. Undefined values are interpolated as empty strings.

You can use either one-way (`[[]]`) or automatic (`{{}}`)
binding annotations in a compound binding, but the bindings are **always
one-way, host-to-target.**

### Bind to a sub-property

Binding annotations can also include paths to sub-properties, as shown below:

```
<dom-module id="main-view">

  <template>
    <user-view first="{{user.first}}" last="{{user.last}}"></user-view>
  </template>

  <script>
    Polymer({
      is: 'main-view',
      properties: {
        user: Object
      }
    });
  </script>

</dom-module>
```



See [Binding to structured data](#path-binding) for details.




## Expressions in binding annotations

Currently there's no general support for expressions in binding annotations.
The two exceptions are:

*   Negation using `!`:

    Example:

    ```
    <template>
      <div hidden="{{!enabled}}"></div>
    </template>
    ```

*   Computed bindings, as described in
    [Computed bindings](#annotated-computed), below.


In addition, multiple binding annotations can be combined with string literals in a single [compound binding](#compound-bindings).

## Computed bindings {#annotated-computed}

For more complicated bindings, you can use a computed binding.
A computed binding is similar to a computed property: it includes a computing function
and zero or more arguments. Arguments can be dependent properties or string
or number literals.

A computed binding is useful if you don't need to expose a computed property
as part of the element's API, or use it elsewhere in the element.

**Note:** this is the only form of function allowed in binding annotations.
{ .alert .alert-info }

Example: { .caption }

```
<dom-module id="x-custom">

  <template>
    My name is <span>{{computeFullName(first, last)}}</span>
  </template>

  <script>
    Polymer({
      is: 'x-custom',
      properties: {
        first: String,
        last: String
      },
      computeFullName: function(first, last) {
        return first + ' ' + last;
      }
      ...
    });
  </script>

</dom-module>
```

In this case, the span's `textContent` property is bound to the return value
of `computeFullName`, which is recalculated whenever `first` or `last` changes.

### Dependent properties in computed bindings {#dependent-properties}

Arguments to computing functions may be _dependent properties_, which include
any of argument types supported by the `observers` object:

*   simple properties on the current scope
*   [paths to subproperties](properties#observing-path-changes)
*   [paths with wildcards](properties#deep-observation)
*   [paths to array splices](properties#array-observation)

For each type of dependent property, the argument _received_ by the computing function is the
same as that passed to an observer.

The computing function **is not called until all dependent properties are defined
(`!=undefined`)**. So each dependent properties should have a
default `value` defined in `properties` (or otherwise be initialized to a
non-`undefined` value) to ensure the function value is computed.

A computed binding's dependent properties are interpreted relative to the current
_binding scope_. For example, inside a [template repeater](templates#dom-repeat),
a dependent property could refer to the current `item`.

For an example computed binding using a path with a wildcard, see [Binding to array items](#array-binding).

### Literal arguments to computed bindings {#literals}

Arguments to computed bindings may also be string or number literals.
Strings may be  either single- or double-quoted. In an attribute or
property binding, if you use double quotes for the attribute value, use single
quotes for string literals, or the reverse.

**Commas in literal strings:** Any comma occurring in a string literal
_must_ be escaped using a backslash (`\`).
{ .alert .alert-info }

Example:  { .caption }

```
<dom-module id="x-custom">
  <template>
    <span>{{translate('Hello\, nice to meet you', first, last)}}</span>
  </template>
</dom-module>
```

Finally, if a computed binding has no dependent properties, it is only evaluated once:

```
<dom-module id="x-custom">
  <template>
    <span>{{doThisOnce()}}</span>
  </template>

  <script>
   Polymer({

     is: 'x-custom',

     doThisOnce: function() {
       return Math.random();
     }

   });
  </script>
</dom-module>
```

## Bind to array items {#array-binding}

Explicit bindings to array items by index isn't supported:

```
<!-- don't do this! -->
<span>{{array[0]}}</span>
<!-- or this! -->
<span>{{array.0}}</span>
```

You can use a computed binding to bind to a specific array item, or to a
subproperty of an array item, like `array[index].name`.

The following example shows how to access a property from an array item using a computed binding.
The computing function needs to be called if the subproperty value changes,
_or_ if the array itself is mutated, so the binding uses a wildcard path, `myArray.*`.


```
<dom-module id="bind-array-element">

  <template>
    <div>[[arrayItem(myArray.*, 0, 'name')]]</div>
    <div>[[arrayItem(myArray.*, 1, 'name')]]</div>
  </template>

  <script>
    Polymer({

      is: 'bind-array-element',

      properties: {

        myArray: {
          type: Array,
          value: [{ name: 'Bob' }, { name: 'Doug' } ]
        }
      },

      // first argument is the change record for the array change,
      // change.base is the array specified in the binding
      arrayItem: function(change, index, path) {
        // this.get(path, root) returns a value for a path
        // relative to a root object.
        return this.get(path, change.base[index]);
      },

      ready: function() {
        // mutate the array
        this.unshift('myArray', { name: 'Susan' });
        // change a subproperty
        this.set('myArray.1.name', 'Rupert');
      }
    });
  </script>

</dom-module>
```

## Annotated attribute binding {#attribute-binding}

In the vast majority of cases, binding data to other elements should use
property binding described above, where changes are propagated by setting the
new value to the JavaScript property on the element.

However, sometimes you need to set an attribute on
an element, as opposed to a property.  These include when attribute selectors
are used for CSS or for interoperability with elements that require using an
attribute-based API.

To bind to an attribute, use `$=` rather than `=`.  This
results in a call to:

<code><var>element</var>.setAttribute(<var>attr</var>, <var>value</var>);</code>

As opposed to:

<code><var>element</var>.<var>property</var> = <var>value</var>;</code>

```
<template>

  <!-- Attribute binding -->
  <my-element selected$="{{value}}"></my-element>
  <!-- results in <my-element>.setAttribute('selected', this.value); -->

  <!-- Property binding -->
  <my-element selected="{{value}}"></my-element>
  <!-- results in <my-element>.selected = this.value; -->

</template>
```

Attribute bindings are always one-way, host-to-child. Values are serialized according to
the value's _current_ type, as described for [attribute serialization](properties#attribute-serialization).

Again, as values must be serialized to strings when binding to attributes, it is
always more performant to use property binding for pure data propagation.

### Binding to native element attributes {#native-binding}

There are a handful of extremely common native element attributes which can also
be modified as properties.  Due to cross-browser limitations with the ability to
place binding braces `{{...}}` in some of these attribute values, as well as the
fact that some of these attributes map to differently named JavaScript properties, it is
recommended to always use attribute binding (using `$=`) when binding dynamic
values to these specific attributes, rather than binding to their property
names.

Normal attribute assignment to static values:

```
<!-- class -->
<div class="foo"></div>

<!-- style -->
<div style="background: red;"></div>

<!-- href -->
<a href="http://foo.com">

<!-- label for -->
<label for="bar"></label>

<!-- dataset -->
<div data-bar="baz"></div>
```

Attribute binding to dynamic values (use `$=`):

```

<!-- class -->
<div class$="{{foo}}"></div>

<!-- style -->
<div style$="{{background}}"></div>

<!-- href -->
<a href$="{{url}}">

<!-- label for -->
<label for$="{{bar}}"></label>

<!-- dataset -->
<div data-bar$="{{baz}}"></div>

```

## Moved sections

The following section have moved to [Data system concepts](data-system):

<a href="#property-notification"></a>

-   Property change notification and two-way binding—see [How data flow is
    controlled](#data-flow-control).

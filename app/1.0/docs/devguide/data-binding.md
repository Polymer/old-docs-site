---
title: Data binding
---

<!-- toc -->

A _data binding_ connects data from a custom element
(the _host element_) to a property or attribute of an element in its local DOM (the _child_
or _target element_). The host element data can be a property or sub-property represented by a
[data path](data-system#data-paths), or data generated based on one or more paths.

You create data bindings by adding annotations to an element's local DOM template.

```
<dom-module id="host-element">
    <template>
      <target-element target-property="{{hostProperty}}"></target-element>
    </template>
</dom-module>
```

Updating data bindings is a [property effect](data-system#property-effects).

## Anatomy of a data binding

A data binding appears in the local DOM template as an HTML attribute:

<pre>
<code><var>property-name</var>=<var>annotation-or-compound-binding</var></code>
<code><var>attribute-name</var>$=<var>annotation-or-compound-binding</var></code>
</pre>

The left-hand side of the binding identifies the target property or attribute.

-   Property bindings are the default. The property name is given in attribute form (dash-case not
    camelCase). For example:

    ```
    <my-element my-property="{{hostProperty}}">
    ```

    This example binds the host property `hostProperty` to the target property, `myProperty` on
    `<my-element>`.

    For more information, see [Property  name to attribute name
    mapping](#property-name-mapping).

-   To bind to an attribute instead, use the attribute name followed by `$`:

    ```
    <a href$="{{myUrl}}">
    ```

    This example binds the host property `myUrl` to the anchor element's `href` **attribute**.

The right-hand side of the binding consists of either a _binding annotation_ or a _compound binding_:

<dl>
  <dt>Binding annotation</dt>
  <dd>Text surrounded by double curly bracket (`{{ }}`) or double square bracket (`[[]]`)
      delimiters. Identifies the host data being bound. </dd>
  <dt>Compound binding</dt>
  <dd>A string literal containing one or more binding annotations.</dd>
</dl>

## Bind to a target property {#property-binding}

To bind to a target property, specify the attribute name that corresponds to the
property, with an [annotation](#binding-annotation) or [compound binding](#compound-binding)
as the attribute value:

```
<target-element name="{{myName}}"></target-element>
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

If the property being bound is an object or an array, both elements get a reference to the **same
object**. This means that either element can change the object and a true one-way binding is
impossible. For more information, see [Data flow for objects and
arrays](data-system#data-flow-objects-arrays).

### Bind to text content

To bind to a target element's `textContent`, you can simply include the
annotation or compound binding inside the target element.

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

## Bind to a target attribute {#attribute-binding}

In the vast majority of cases, binding data to other elements should use property bindings, where
changes are propagated by setting the new value to the JavaScript property on the element.

However, sometimes you need to set an attribute on an element, as opposed to a property.  For
example, when attribute selectors are used for CSS or for interoperability with elements that
require using an attribute-based API.

To bind to an attribute, use `$=` rather than `=`:

```
<div style$="color: {{myColor}};">
```

Where the attribute value is either a [binding annotation](#binding-annotation) or a [compound
binding](#compound-binding).

Attribute binding results in a call to:


```js
element.setAttribute(attr,value);
```

As opposed to:


```js
element.property = value;
```

For example:


```html
<template>
  <!-- Attribute binding -->
  <my-element selected$="{{value}}"></my-element>
  <!-- results in <my-element>.setAttribute('selected', this.value); -->

  <!-- Property binding -->
  <my-element selected="{{value}}"></my-element>
  <!-- results in <my-element>.selected = this.value; -->
</template>
```


Attribute bindings are always one-way, host-to-target. Values are serialized according to the
value's _current_ type, as described for
[attribute serialization](properties.html#attribute-serialization).

Again, as values must be serialized to strings when binding to attributes, it is always more
performant to use property binding for pure data propagation.

### Native properties that don't support property binding {#native-binding}

There are a handful of common native element properties that Polymer can't data-bind to directly,
because the binding causes issues on one or more browsers.

You need to use attribute bindings to affect the following properties:

| Attribute | Property | Notes

| `class` | `classList`, `className` | Maps to two properties with different formats.

| `style` | `style` | By specification, `style` is considered a read-only reference to a `CSSStyleDeclaration` object.

| `href` | `href` |

| `for` | `htmlFor` |

| `data-*` |  `dataset` | Custom data attributes (attribute names starting with `data-`) are stored on the `dataset` property.

| `value` | `value` | Only for `<input type="number">`.

**Note:** data binding to the `value` property doesn't work on IE for ***numeric input types***. For
this specific case, you can use one-way attribute binding to set the `value` of a numeric input. Or
use another element such as `iron-input` or `paper-input` that handles two-way binding correctly.
{.alert .alert-info }

This list includes the properties currently known to cause issues with property bindings. Other
properties may also be affected.

There are various reasons that properties can't be bound:

*   Cross-browser isssues with the ability to place binding braces `{{...}}` in some of these
    attribute values.

*   Attributes that map to differently-named JavaScript properties (such as `class`).

*   Properties with unique structures (such as `style`).

Attribute binding to dynamic values (use `$=`):


```html
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


## Binding annotations {#binding-annotation}

Polymer provides two kinds of data binding delimiters:

*   One-way bindings:  (<code>[[<var>binding</var>]]</code>). One-way bindings allow only
    <strong>downward</strong> data flow.

*   Two-way or "automatic" binding annotations (<code>{{<var>binding</var>}}</code>). Automatic
    bindings allow <strong>upward and downward</strong> data flow.

See [Data flow](data-system#data-flow) for information on two-way binding and upward data flow.

The text inside the delimiters can be one of the following:

*   A property or subproperty path (`users`, `address.street`).
*   A computed binding (`_computeName(firstName, lastName, locale)`).
*   Any of the above, preceded by the negation operator (`!`).

The paths in a data binding annotation are relative to the current [data binding
scope](data-system#data-binding-scopes).

### Bind to a host property {#host-property}

The simplest form of binding annotation uses a host property:

```
<simple-view name="{{myName}}"></simple-view>
```

If the property being bound is an object or an array, both elements get a reference to the **same
object**. This means that either element can change the object and a true one-way binding is
impossible. For more information, see [Data flow for objects and
arrays](data-system#data-flow-objects-arrays).

### Bind to a host sub-property {#path-binding}

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

Subproperty changes are not automatically [observable](data-system#observable-changes).

If the host element updates the subproperty it needs to use the `set` method, as described in
[Set a property or subproperty by path](#set-path). Or the `notifyPath` method, as described in
[Notify Polymer of a subproperty change](#notify-path).


```
//  Change a subproperty observably
this.set('name.last', 'Maturin');
```

If the binding is two-way and the target element updates the bound property, the change propagates
upward automatically.

If the subproperty being bound is an object or an array, both elements get a reference to the **same
object**. This means that either element can change the object and a true one-way binding is
impossible. For more information, see [Data flow for objects and
arrays](data-system#data-flow-objects-arrays).

### Logical not operator {#expressions-in-binding-annotations}

Binding annotations support a single logical not operator (`!`), as the first character inside
the binding delimiters:

```
<template>
  <my-page show-login="{{!isLoggedIn}}"></my-page>
</template>
```

In this example, `showLogin` is `false` if `isLoggedIn` has a truthy value.

Only a single logical not operator is supported. You can't cast a value to boolean using `!!`. For
more complicated transformations, use a [computed binding](#annotated-computed).

A binding with a logical not operator is **always one-way, host-to-target**.

### Computed bindings {#annotated-computed}

A *computed binding* is similar to a [computed property](observers#computed-properties). It's
declared inside a binding annotation.

```
<div>[[_formatName(first, last, title)]]</div>
```

The computed binding declaration includes a computing function name, followed by a list of
_dependencies_, in parenthesis.

An element can have multiple computed bindings in its template that refer to the same computing
function.

In addition to the dependency types supported by computed properties and complex observers, the
dependencies for a computed binding can include string or number literals.

A computed binding is useful if you don't need to expose a computed property as part of the
element's API, or use it elsewhere in the element. Computed bindings are also useful for filtering
or transforming values for display.

Computed bindings differ from computed properties in the following ways:

*   A computed binding's dependencies are interpreted relative to the current *binding scope*. For
    example, inside a [template repeater](templates.html#dom-repeat), a dependent property could
    refer to the current `item`.

*   A computed binding's argument list can include literal arguments.

*   A computed binding can have an *empty* argument list, in which case the computing function is
    only called once.

Example: { .caption }

```
<dom-module id="x-custom">

  <template>
    My name is <span>{{_formatName(first, last)}}</span>
  </template>

  <script>
    Polymer({
      is: 'x-custom',
      properties: {
        first: String,
        last: String
      },
      _formatName: function(first, last) {
        return first + ' ' + last;
      }
      ...
    });
  </script>

</dom-module>
```

In this case, the span's `textContent` property is bound to the return value
of `_formatName`, which is recalculated whenever `first` or `last` changes.

**Computed bindings are one way.** A computed binding is always one-way, host-to-target.
{.alert .alert-info}

#### Dependencies of computed bindings {#computed-binding-dependencies}

A computed binding's dependencies can include any of the dependency types supported by
[complex observers](observers#complex-observers):

*   Simple properties on the current scope.

*   Paths to subproperties.

*   Paths with wildcards.

*   Paths to array splices.

In addition, a computed binding can include literal arguments.

For each type of dependent property, the argument passed to the computing function is the same as
that passed to an observer.

As with observers and computed properties, the computing function **is not called until all
dependent properties are defined (`!=undefined`)**.

For an example computed binding using a path with a wildcard, see [Binding to array
items](#array-binding).

#### Literal arguments to computed bindings {#literals}

Arguments to computed bindings may be string or number literals.

Strings may be  either single- or double-quoted. In an attribute or property binding, if you use
double quotes for the attribute value, use single quotes for string literals, or the reverse.

**Commas in literal strings:** Any comma occurring in a string literal **must** be escaped using a
backslash (`\`).
{.alert .alert-info }

Example:

```html
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

## Compound bindings {#compound-bindings}

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


## Binding to arrays and array items {#array-binding}

To keep annotation parsing simple, **Polymer doesn't provide a way to bind directly to an array
item**.

```
<!-- Don't do this! -->
<span>{{array[0]}}</span>
<!-- Or this! -->
<span>{{array.0}}</span>
```


There are several ways to interact with arrays in a data binding:

*   The `dom-repeat` helper element lets you create a instance of a template for each item in an
    array. Inside a `dom-repeat` instance, you can bind to the properties of the array item.

*   The `array-selector` helper element lets you data bind to a selection from an array, where the
    selection is either a single item or a subset of the original array.

*   You can bind an individual array item using a computed binding.

Related topics:

*   [Template repeater](templates#dom-repeat)
*   [Array selector](templates#array-selector)
*   [Bind to an array item](#bind-array-item)

### Bind to an array item {#bind-array-item}

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

## Two-way bindings

Two-way bindings can propagate data changes both downward (from host to target) and upward (from
target to host). For changes to propagate upward, the you must use automatic data binding
delimiters (`{{ }}`) and the target property must be set to `notify: true`. For more information,
see [Data flow](data-system#data-flow).

When you bind an array or object property, both elements have access to the shared array or object,
and both can make changes to it. Use automatic binding delimiters to ensure that property effects
propagate upward. For more information, see [Data flow for objects and
arrays](#data-flow-objects-arrays).

### Two-way binding to a non-Polymer element {#two-way-native}

As described in [Change notification events](#change-events), Polymer uses an event naming
convention to achieve two-way binding.

To two-way bind to native elements or non-Polymer elements that _don't_ follow this event naming
convention, you can specify a custom change event name in the annotation using the following syntax:

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




## Moved sections

The following section have moved to [Data system concepts](data-system):

<a id="#property-notification"></a>

-   Property change notification and two-way binding. See [How data flow is
    controlled](#data-flow-control).

<a id="##path-binding"></a>

-   Binding to structured data. See [Observable changes](data-system#observable-changes),
    [Data paths](data-system#paths), and [Bind to a property or sub-property](#)

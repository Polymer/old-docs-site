---
layout: default
type: guide
shortname: Docs
title: Data binding
subtitle: Developer guide
---

{% include toc.html %}

Data binding binds a property or sub-property of a custom element (the _host element_) to 
a property or attribute of an element in its local DOM (the _child_ or _target element_).

A binding is created with a binding _annotation_ in the host element's local DOM template:

    <dom-module id="host-element">
        <template>
          <child-element name="{%raw%}{{myName}}{%endraw%}"></child-element>  
        </template>
    </dom-module>


## Binding annotations {#property-binding}

A binding annotation consists of a property name or subproperty name enclosed
in curly brackets (`{%raw%}{{}}{%endraw%}`) or square brackets (`[[]]`).

*  Square brackets (`[[]]`) create _one-way bindings_. Data flow is 
   downward, host-to-child, and the binding **never** modifies the host property.

*  Curly brackets ({%raw%}`{{}}`{%endraw%}) create _automatic bindings_. Data flow is 
   one-way or two-way, depending whether the target property is configured
   for two-way binding.

To bind to a child property, specify the attribute name that corresponds to the
property, with an annotation as the attribute value:

    <child-element name="{%raw%}{{myName}}{%endraw%}"></child-element>  

This example binds the child element's `name` property to the host element's
`myName` property.

While HTML attributes are used to specify bindings, values are
assigned directly to JavaScript properties, **not** to the HTML attributes of the
elements. (There is a [special attribute binding syntax](#attribute-binding) for
those cases where you want to bind to an attribute value.)

Attribute names are mapped to property names as described in [Property name to
attribute name mapping](properties.html#property-name-mapping). To
bind to camel-case properties of elements, use dash-case in the attribute name.
For example:

    {%raw%}<user-view first-name="{{managerName}}"></user-view>{%endraw%}
    <!-- Sets <user-view>.firstName = this.managerName; -->

**Some attributes are special.** When binding to `style`, `href`, `class`, `for` or
`data-*` attributes, it is recommend that you use [attribute binding](#attribute-binding) 
syntax. For more information, see [Binding to native element attributes](#native-binding). 
{: .alert .alert-info }

### Binding to text content 

To bind to a child element's `textContent`, you can simply include the
annotation inside the child element. The binding annotation must currently span
the entire  content of the tag:

    {% raw %}
    <dom-module id="user-view">
        <template>   
          First: <span>{{first}}</span><br>
          Last: <span>{{last}}</span>
        </template>
    </dom-module>
    {% endraw %}
    <script>
      Polymer({
        is: 'user-view',
        properties: {
          first: String,
          last: String
        }
      });
    </script>

    <user-view first="Samuel" last="Adams"></user-view>

String concatenation is **not** supported inside a tag:

    {% raw %}
    <!-- Not currently supported! -->
    <div>First: {{first}}</div>
    <div>Last: {{last}}</div>
    {% endraw %}

Binding to text content is always one-way, host-to-child.

### Binding to sub-properties

Binding annotations can also include paths to sub-properties, as shown below:

    <dom-module id="main-view">
      <template>
        {%raw%}<user-view first="{{user.first}}" last="{{user.last}}"></user-view>{%endraw%}
      </template>
    </dom-module>

    <script>
      Polymer({
        is: 'main-view',
        properties: {
          user: Object
        }
      });
    </script>

See [Binding to structured data](#path-binding) for details.

### Property change notification and two-way binding {#property-notification}

Polymer supports cooperative two-way binding between elements, allowing elements
that "produce" data or propagate data changes upwards to
hosts when desired.

To avoid two-way binding, use "square-brace" syntax (`[[property]]`), which 
results in only one-way (downward, host-to-child) data-binding.

To summarize, two-way data-binding is achieved when both the host and the child
agree to participate, satisfying these three conditions:

1. The host must use curly-brace `{%raw%}{{property}}{%endraw%}` syntax. (Square-brace
`[[property]]` syntax results in one-way downward binding, regardless of how the 
child property is configured.)

2. The child property being bound to must be configured with the `notify` flag
set to `true` (or otherwise send a `<property>-changed` custom event).  (If the
property being bound does not have the `notify` flag set, only one-way
(downward) binding will occur.)

3. The child property being bound to must **not** be configured with the `readOnly`
flag set to true.  (If the child property is `notify: true` and `readOnly:true`,
and the host binding uses curly-brace syntax, the binding is
one-way, **upward** (child-to-host).)

Example 1: Two-way binding

    <script>
      Polymer({
        is: 'custom-element',
        properties: {
          prop: {
            type: String,
            notify: true
          }
        }
      });
    </script>
    ...

    <!-- changes to "value" propagate downward to "prop" on child -->
    <!-- changes to "prop" propagate upward to "value" on host  -->
    <custom-element prop="{%raw%}{{value}}{%endraw%}"></custom-element>

Example 2: One-way binding (downward)

    <script>
      Polymer({
        is: 'custom-element',
        properties: {
          prop: {
            type: String,
            notify: true
          }
        }
      });
    </script>

    ...

    <!-- changes to "value" propagate downward to "prop" on child -->
    <!-- changes to "prop" are ignored by host due to square-bracket syntax -->
    <custom-element prop="[[value]]"></custom-element>

Example 3: One-way binding (downward)

    <script>

      Polymer({
        is: 'custom-element',
        properties: {
          prop: String    // no notify:true!
        }
      });

    </script>
    ...

    <!-- changes to "value" propagate downward to "prop" on child -->
    <!-- changes to "prop" are not notified to host due to notify:falsey -->
    <custom-element prop="{%raw%}{{value}}{%endraw%}"></custom-element>

Example 4: One-way binding (upward, child-to-host)

    <script>
      Polymer({
        is: 'custom-element',
        properties: {
          prop: {
              type: String,
              notify: true,
              readOnly: true
            }
        }
      });
    </script>

    ...

    <!-- changes to "value" are ignored by child due to readOnly:true -->
    <!-- changes to "prop" propagate upward to "value" on host  -->
    <custom-element prop="{%raw%}{{value}}{%endraw%}"></custom-element>

Example 5: Error / non-sensical state

    <script>
      Polymer({
        is: 'custom-element',
        properties: {
          prop: {
              type: String,
              notify: true,
              readOnly: true
            }
        }
      });
    </script>
    ...
    <!-- changes to "value" are ignored by child due to readOnly:true -->
    <!-- changes to "prop" are ignored by host due to square-bracket syntax -->
    <!-- binding serves no purpose -->
    <custom-element prop="[[value]]"></custom-element>

### Change notification protocol

When you configure a declared property with the `notify` flag set to `true`,
{{site.project_title}} propagates data changes upward by firing events:

*   When the property changes, the element fires a non-bubbling DOM
    event to indicate those changes to interested hosts. 

*   The event follows a naming convention of <code><var>property</var>-changed</code>, 
    and contains a `value` property in the `event.detail` object indicating 
    the property's new value.

When using a {{site.project_title}} element with other elements or frameworks, you can 
manually attach an <code>on-<var>property</var>-changed</code> listener to an element to
be notified of property changes, and take the necessary actions based on the new value. 

This is essentially what {{site.project_title}} does when you create a two-way data
binding.


### Two-way binding to native elements {#two-way-native}

As mentioned above, {{site.project.title}} uses an event naming convention to achieve two-way
binding. 

To two-way bind to native elements or non-Polymer elements that _don't_
follow this event naming convention, you can specify a
custom change event name in the annotation using the following syntax:

<code><var>target-prop</var>="{%raw%}{{<var>hostProp</var>::<var>target-change-event</var>}}{%endraw%}"</code>


Example:

    {% raw %}
    <!-- Listens for `input` event and sets hostValue to <input>.value -->
    <input value="{{hostValue::input}}">

    <!-- Listens for `change` event and sets hostChecked to <input>.checked -->
    <input type="checkbox" checked="{{hostChecked::change}}">

    <!-- Listens for `timeupdate ` event and sets hostTime to <video>.currentTime -->
    <video url="..." current-time="{{hostTime::timeupdate}}">
    {% endraw %}

Note: When binding to standard notifying properties on {{site.project_title}} elements,
specifying the event name is unnecessary, as the default convention will be
used.  The following constructions are equivalent:

    {% raw %}
    <!-- Listens for `value-changed` event -->
    <my-element value="{{hostValue::value-changed}}">

    <!-- Listens for `value-changed` event using Polymer convention by default -->
    <my-element value="{{hostValue}}">
    {% endraw %}


## Binding to structured data {#path-binding}

You can bind sub-properties of the host by specifying a _path_ inside 
the binding annotation.

Example:

    <template>
      <div>{{user.manager.name}}</div>
      <user-element user="{%raw%}{{user}}{%endraw%}"></user-element>
    </template>

The path syntax doesn't support array-style accessors (such as `users[0].name`). 
However, you can include indexes directly in the path (`users.0.name`).

For a path binding to update, the path value must be updated in one of the 
following ways: 

*   Using a {{site.project_title}} 
    [property binding](#property-binding) to another element.

*   Using the [`set`](#set-path) API, which
    provides the required notification to elements with registered interest.

**Note:** These requirements are identical to the requirements for 
[sub-property change observers](properties.html#observing-path-changes), which use
the same notification system.
{: .alert .alert-info }

Path bindings are distinct from property bindings in a subtle way:

*   When a **property** value changes, the host element assigns the 
    new value to the bound property property on the child element.

*   When two elements are bound to the same path of a shared object and 
    the value at that path changes, the new value is immediately visible
    to both elements, because both elements are accessing the same object.

    In this case, the element that _changed_ the path must notify the system 
    so that other elements that have registered interest in the same path 
    may take side effects. Path bindings notify the system automatically.
    Imperative code must call `set`.

**Path bindings are two-way.** There is no concept of one-way bindings for 
paths, since the data does not propagate. That is, all bindings and 
change handlers for the same path will always be notified and update when the 
value of the path changes.
{: .alert .alert-info }

### Path change notification {#set-path}

Two-way data-binding and observation of paths in Polymer is achieved using a
similar strategy to the one described above for [2-way property binding
](#property-notification): 

1.  When a sub-property of a property configured with
    `type: Object` changes, an element fires a non-bubbling `<property>-changed` DOM
    event with a `detail.path` value indicating the path on the object that changed.

2.  Elements that have registered interest in that object (either via binding or
    change handler) may then take the appropriate action.  

3.  Finally, those elements will forward the notification on to any
    children they have bound the object to, and will also fire a new
    `<property>-changed` event where `property` is the root object, to notify any
    hosts that may have bound root object down.  

This way, a notification reaches any part of the tree that has
registered interest in that path so that side effects occur.

This system "just works" to the extent that changes to object sub-properties
occur as a result of being bound to a notifying custom element property that
changed.  However, sometimes imperative code needs to change an object's sub-
properties directly.  As we avoid more sophisticated observation mechanisms such
as `Object.observe` or dirty-checking in order to achieve the best startup and
runtime performance cross-platform for the most common use cases, changing an
object's sub-properties directly requires cooperation from the user.

Specifically, Polymer provides two API's that allow such changes to be notified
to the system: `notifyPath(path, value)` and `set(path, value)`, where `path` is 
a **string** identifying the path (relative to the host element). 

Example:

    <dom-module id="custom-element">
      <template>
        <div>{%raw%}{{user.manager.name}}{%endraw%}</div>
      </template>
    </dom-module>

    <script>
      Polymer({
        is: 'custom-element',
        reassignManager: function(newManager) {
          this.user.manager = newManager;
          // Notification required for binding to update!
          this.notifyPath('user.manager', this.user.manager);
        }
      });
    </script>

Most of the time, `notifyPath` is called directly after an
assignment, so a convenience function `set` is provided that performs both
actions:

    reassignManager: function(newManager) {
      this.set('user.manager', newManager);
    }


**Note:** Paths do not support array access notation (such as `users[2]`),
but do support array indexes in dotted paths (that is, `users.2`).
{: .alert .alert-info }

## Expressions in binding annotations

Currently there's no general support for expressions in binding annotations.
The two exceptions are:

*   Negation using `!`:

    Example:

        <template>
          <div hidden="{%raw%}{{!enabled}}{%endraw%}"></div>
        </template>

*   Inline functions, as described in 
    [Inline functions](#annotated-computed), below.

## Inline function bindings {#annotated-computed}

For more complicated bindings, you can use an inline function binding.
An inline function is similar to a computed property. 

Inline functions are useful you don't need to expose a computed property
as part of the element's API, or use it elsewhere in the element, and is 
only used for downward data propagation.

Unlike a computed property, an inline function's arguments are interpreted relative to 
the current binding _scope_, which is useful inside a [template repeater](#dom-repeat).

**Note:** this is the only form of function allowed in binding annotations.
{: .alert .alert-info }

Example:

    <dom-module id="x-custom">
      <template>
        My name is <span>{%raw%}{{computeFullName(first, last)}}{%endraw%}</span>
      </template>
    <dom-module id="x-custom">

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

In this case, the span's `textContent` property is bound to the return value 
of `computeFullName`, which is recalculated whenever `first` or `last` changes.

**Note:** The inline function is not called until all dependent properties are defined 
(`!=undefined`). If one or more of the properties are optional, they should have default 
values defined in `properties` object that the value is computed.
{: .alert .alert-info }

See [Computed properties](properties.html#computed-properties) for more information.

## Annotated attribute binding {#attribute-binding}

In the vast majority of cases, binding data to other elements should use
property binding described above, where changes are propagated by setting the
new value to the JavaScript property on the element.

However, sometimes you need to set an attribute on
an element, as opposed to a property.  These include when attribute selectors
are used for CSS or for for interoperability with elements that require using an
attribute-based API.

To bind to an attribute, use `$=` rather than `=`.  This
results in in a call to <code><var>element</var>.setAttribute(<var>attr</var>, <var>value</var>);</code>, as opposed to
<var>element</var>.<var>property</var> = <var>value</var>;`.

    <template>
      {% raw %}
      <!-- Attribute binding -->
      <my-element selected$="{{value}}"></my-element>
      <!-- results in <my-element>.setAttribute('selected', this.value); -->

      <!-- Property binding -->
      <my-element selected="{{value}}"></my-element>
      <!-- results in <my-element>.selected = this.value; -->
      {% endraw %}
    </template>

Values are serialized according to the value's _current_ type, as described for 
[attribute serialization](properties.html#attribute-serialization).

Again, as values must be serialized to strings when binding to attributes, it is
always more performant to use property binding for pure data propagation.

### Binding to native element attributes {#native-binding}

There are a handful of extremely common native element attributes which can also
be modified as properties.  Due to cross-browser limitations with the ability to
place binding braces {%raw%}`{{...}}`{%endraw%} in some of these attribute values, as well as the
fact that some of these attributes map to differently named JavaScript properties, it is
recommended to always use attribute binding (using `$=`) when binding dynamic
values to these specific attributes, rather than binding to their property
names.

Normal attribute assignment to static values:

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

Attribute binding to dynamic values (use `$=`):

    {% raw %}
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
    {% endraw %}

## Data binding helper elements {#template-helpers}

{{site.project_title}} provides a set of custom elements to help with common
data binding use cases:

-   Template repeater. Creates an instance of the template's contents for each item in an array.
-   Array selector. Manages selection state for an array of structured data.
-   Conditional template. Stamps its contents if a given condition is true.
-   Auto-binding template. Allows data binding outside of a {{site.project_title}} element.

### Template repeater (dom-repeat) {#dom-repeat}

The template repeater is a specialized template that binds to an array.
It creates one instance of the template's contents for each item in the array.
It adds two properties to the binding scope for each instance:

*   `item`. The array item used to create this instance.
*   `index`. The index of `item` in the array. (The `index` value changes if 
    the array is sorted or filtered)

The template repeater is a type-extension custom element that extends the 
built-in `<template>` element, so it is written as `<template is="dom-repeat">`.

Example:

```html
<dom-module id="employee-list">

  <template>

    <div> Employee list: </div>
    <template is="dom-repeat" items="{{employees}}">
        <div>First name: <span>{{item.first}}</span></div>
        <div>Last name: <span>{{item.last}}</span></div>
    </template>

  </template>

  <script>
    Polymer({
      is: 'employee-list',
      ready: function() {
        this.employees = [
            {first: 'Bob', last: 'Smith'},
            {first: 'Sally', last: 'Johnson'},
            ...
        ];
      }
    });
  </script>

</dom-module>
```

Notifications for changes to items sub-properties are forwarded to the template
instances, which update via the normal [structured data notification system
](#path-binding).

Mutations to the `items` array itself (`push`, `pop`, `splice`, `shift`,
`unshift`) must be performed using methods provided on Polymer elements, such
that the changes are observable to any elements bound to the same array in the
tree. For example:

```
this.push('employees', { first: 'Jack', last: 'Aubrey' });
```

#### Handling events in `dom-repeat` templates

When handling events generated by a `dom-repeat` template instance, you 
frequently want to map the element firing the event to the model data that 
generated that item.  

When you add a declarative event handler **inside** the `<dom-repeat>` template,
the repeater adds a `model` property to each event sent to the listener. The `model` 
is the scope data used to generate the template instance, so the item
data is `model.item`:

    <dom-module id="simple-menu">

      <template>
        <template is="dom-repeat" id="menu" items="{{menuItems}}">
            <div>
              <span>{{item.name}}</span>
              <span>{{item.ordered}}</span> 
              <button on-click="order">Order</button>
            </div>
        </template>
      </template>

      <script>
        Polymer({
          is: 'simple-menu',
          ready: function() {
            this.menuItems = [
                { name: "Pizza", ordered: 0 },
                { name: "Pasta", ordered: 0 },
                { name: "Toast", ordered: 0 }
            ];
          },
          order: function(e) {
            var model = e.model;
            model.set('item.ordered', model.item.ordered+1);
          }
        });
      </script>

    </dom-module>

The `model` is an instance of `Polymer.Base`, so `set`, `get` and the array
manipulation methods are all available on the `model` object, and should be used
to manipulate the model.

**Note:** The `model` property is **not** added for event listeners added 
imperatively (using `addEventListener`), or listeners added to one of the
`<dom-repeat>` template's parent nodes. In these cases, you can use
the `<dom-repeat>` `modelForElement` method to retrieve the 
model data that generated a given element.
{: .alert .alert-info }


#### Filtering and sorting lists

To filter or sort the _displayed_ items in your list, specify a `filter` or 
`sort` property on the `dom-repeat` (or both):

*   `filter`. Specifies a filter callback function following the standard 
    `Array` [`filter`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter) API.
*   `sort`. Specifies a comparison function following the standard `Array` 
    [`sort`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort) API.

In both cases, the value can be either a function object, or a string identifying a 
function defined on the host element.

By default, the `filter` and `sort` functions only run when the array itself
is mutated (for example, by adding or removing items using )

To re-run the `filter` or `sort` functions when certain sub-fields
of `items` change, set the `observe` property to a space-separated list of
`item` sub-fields that should cause the list to be re-filtered or re-sorted.

For example, for a `dom-repeat` with a filter of the following:

```
isEngineer: function(item) {
    return item.type == 'engineer' || item.manager.type == 'engineer';
}
```

Then the `observe` property should be configured as follows:

```
<template is="dom-repeat" items="{{employees}}"
          filter="isEngineer" observe="type manager.type">
```

Changing a `manager.type` field should now cause the list to be re-sorted:

```
this.set('employees.0.manager.type', 'engineer');
```

#### Nesting `dom-repeat` templates

When nesting multiple `dom-repeat` templates, you may want to access data
from a parent scope. Inside a `dom-repeat`, you can access any properties available
to the parent scope unless they're hidden by a property in the current scope. 

For example, the default `item` and `index` properties added by `dom-repeat`
hide any similarly-named properties in a parent scope.

To access properties from nested `dom-repeat` templates, use the `as` attribute to 
assign a different name for the item property. Use the `index-as` attribute to assign a 
different name for the index property.

    <div> Employee list: </div>
    <template is="dom-repeat" items="{{employees}}" as="employee">
        <div>First name: <span>{{employee.first}}</span></div>
        <div>Last name: <span>{{employee.last}}</span></div>

        <div>Direct reports:</div>

        <template is="dom-repeat" items="{{employee.reports}}" as="report" index-as="report_no">
          <div><span>{{report_no}}</span>. 
               <span>{{report.first}}</span> <span>{{report.last}}</span>
          </div>
        </template>
    </template>



### Array selector (array-selector) {#array-selector}

Keeping structured data in sync requires that {{site.project_title}} understand the path
associations of data being bound.  The `array-selector` element ensures path
linkage when selecting specific items from an array. The array selector supports
either single or multiple selection.

The `items` property accepts an array of user data. Call `select(item)`
and `deselect(item)` to update the `selected` property, which may be bound to
other parts of the application. Any changes to sub-fields of the selected 
item(s) are kept in sync with items in the `items` array.  

When `multi` is false, `selected` is a property representing the last selected 
item.  When `multi` is true, `selected` is an array of selected items.

```
<dom-module id="employee-list">

  <template>

    <div> Employee list: </div>
    <template is="dom-repeat" id="employeeList" items="{{employees}}">
        <div>First name: <span>{{item.first}}</span></div>
        <div>Last name: <span>{{item.last}}</span></div>
        <button on-click="toggleSelection">Select</button>
    </template>

    <array-selector id="selector" items="{{employees}}" selected="{{selected}}" multi toggle></array-selector>

    <div> Selected employees: </div>
    <template is="dom-repeat" items="{{selected}}">
        <div>First name: <span>{{item.first}}</span></div>
        <div>Last name: <span>{{item.last}}</span></div>
    </template>

  </template>

  <script>
    Polymer({
      is: 'employee-list',
      ready: function() {
        this.employees = [
            {first: 'Bob', last: 'Smith'},
            {first: 'Sally', last: 'Johnson'},
            ...
        ];
      },
      toggleSelection: function(e) {
        var item = this.$.employeeList.itemForElement(e.target);
        this.$.selector.select(item);
      }
    });
  </script>

</dom-module>
```

### Conditional template {#dom-if}

Elements can be conditionally stamped based on a boolean property by wrapping
them in a custom `HTMLTemplateElement` type extension called `dom-if`.  The
`dom-if` template stamps its contents into the DOM only when its `if` property becomes
truthy.

If the `if` property becomes falsy again, by default all stamped elements are hidden 
(but remain in the DOM tree). This provides faster performance should the `if`
property become truthy again.  To disable this behavior, set the
`restamp` property to `true`. This results in slower `if` switching behavior as the
elements are destroyed and re-stamped each time.

The following is a simple example to show how conditional templates work. Read below for
guidance on recommended usage of conditional templates.

Example:


```
<dom-module id="user-page">

  <template>

    All users will see this:
    <div>{{user.name}}</div>

    <template is="dom-if" if="{{user.isAdmin}}">
      Only admins will see this.
      <div>{{user.secretAdminStuff}}</div>
    </template>

  </template>

  <script>
    Polymer({
      is: 'user-page',
      properties: {
        user: Object
      }
    });
  </script>

</dom-module>
```


Since it is generally much faster to hide and show elements rather than
destroy and recreate them, conditional templates are only useful to save initial
creation cost when the elements being stamped are relatively heavyweight and the
conditional may rarely (or never) be true in given usages.  Otherwise, liberal
use of conditional templates can actually *add* significant runtime performance
overhead.

Consider an app with 4 screens, plus an optional admin screen.  If most users
will use all 4 screens during normal use of the app, it is generally better to
incur the cost of stamping those elements once at startup (where some app
initialization time is expected) and simply hide/show the screens as the user
navigates through the app, rather than destroy and re-create all the elements of
each screen as the user navigates.  Using a conditional template here may be a
poor choice, since although it may save time at startup by stamping only the
first screen, that saved time gets shifted to runtime latency for each user
interaction, since the time to show the second screen will be *slower* as it
must create the second screen from scratch rather than simply showing that
screen.  Hiding/showing elements is as simple as attribute-binding to the
`hidden` attribute (e.g. `<div hidden$="{{!shouldShow}}">`), and does not
require conditional templating at all.

However, using a conditional template may be appropriate in the case of an admin
screen that's only be shown to admin users of an app.  Since most users
aren't admins, there may be performance benefits to not burdening most of
the users with the cost of stamping the elements for the admin page, especially
if it is relatively heavyweight.

### Auto-binding template {#dom-bind}

{{site.project_title}} data binding is only available in templates that are managed
by {{site.project_title}}. So data binding works inside an element's local DOM
template, but not for elements placed in the main document.

To use {{site.project_title}} bindings **without** defining a new custom element, 
use the `dom-bind` element.  This template immediately stamps its contents
into the main document. Data bindings in an auto-binding template use the template 
itself as the binding scope.
```
<!doctype html>
<html>
<head>
  <meta charset="utf-8">
  <script src="components/webcomponentsjs/webcomponents-lite.js"></script>
  <link rel="import" href="components/polymer/polymer.html">
  <link rel="import" href="components/core-ajax/core-ajax.html">

</head>
<body>

  <!-- Wrap elements with auto-binding template to -->
  <!-- allow use of Polymer bindings in main document -->
  <template is="dom-bind">

    <core-ajax url="http://..." lastresponse="{{data}}"></core-ajax>

    <template is="dom-repeat" items="{{data}}">
        <div><span>{{item.first}}</span> <span>{{item.last}}</span></div>
    </template>

  </template>

</body>
</html>
```


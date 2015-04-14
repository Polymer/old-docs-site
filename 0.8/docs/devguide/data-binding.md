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
          <child-element my-name="{%raw%}{{name}}{%endraw%}"></child-element>  
        </template>
    </dom-module>

The binding annotation consists of a property name or subproperty name enclosed
in curly brackets (`{%raw%}{{}}{%endraw%}`) or square brackets (`[[]]`).

## Annotated property binding {#property-binding}

Properties of the custom element may be bound into text content or properties of
local DOM elements using binding annotations in the template.

To bind to a child property, specify the attribute name that corresponds to the
property, with an annotation as the attribute value:


    <dom-module id="host-element">
        <template>
          <child-element my-name="{%raw%}{{name}}{%endraw%}"></child-element>  
        </template>
    </dom-module>

While HTML attributes are used to specify bindings, values are
assigned directly to JavaScript properties, **not** to the HTML attributes of the
elements. (There is a [special attribute binding syntax](#attribute-binding) for
those cases where you want to bind to an attribute value.)

Attribute names are mapped to property names as described in [Property name to
attribute name mapping](properties.html#property-name-mapping). To
bind to camel-case properties of elements, use dash-case in the attribute name.
For example:

    {%raw%}<user-view first-name="{{managerName}}"></user-view>{%endraw%}
    <!-- will set <user-view>.firstName = this.managerName; -->

**Some attributes are special.** When binding to `style`, `href`, `class`, `for` or
`data-*` attributes, it is recommend that you use [attribute binding](#attribute-binding) 
syntax. For more information, see [Binding to native element attributes](#native-binding). 
{: .alert .alert-info }

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
that "produce" data or changes to data to propagate those changes upwards to
hosts when desired.

When a Polymer elements changes a property that was configured in `properties`
with the `notify` flag set to true, it automatically fires a non-bubbling DOM
event to indicate those changes to interested hosts.  These events follow a
naming convention of <code><var>property</var>-changed</code>, and contain 
a `value` property in the `event.detail` object indicating the new value.

As such, you could attach an <code>on-<var>property</var>-changed</code> listener to an element to
be notified of changes to such properties, set the `event.detail.value` to a
property on itself, and take necessary actions based on the new value. However,
given this is a common pattern, bindings using "curly-braces" (e.g.
`{{property}}`) will automatically perform this upwards binding automatically
without the user needing to perform those tasks.  

To avoid two-way binding, use "square-brace" syntax (`[[property]]`), which 
results in only one-way (downward, host-to-child) data-binding.

To summarize, two-way data-binding is achieved when both the host and the child
agree to participate, satisfying these three conditions:

1. The host must use curly-brace `{%raw%}{{property}}{%endraw%}` syntax. (Square-brace
`[[property]]` syntax results in one-way downward binding, regardless of how the 
child property is configured.)

2. The child property being bound to must be configured with the `notify` flag
set to true (or otherwise send a `<property>-changed` custom event).  (If the
property being bound does not have the `notify` flag set, only one-way
(downward) binding will occur.)

3. The child property being bound to must **not** be configured with the `readOnly`
flag set to true.  (If the child property is `notify: true` and `readOnly:true`,
and the host binding uses curly-brace syntax, the binding will effectively be
one-way (upward, child-to-host).)

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

### Two-way binding to native elements {#two-way-native}

As mentioned above, {{site.project.title}} uses an event naming convention to achieve two-way
binding. The act of two-way binding to a property using 
<code><var>target-prop</var>="{%raw%}{{<var>hostProp</var>}}{%endraw%}"</code> 
syntax results in Polymer adding  a <code><var>target-prop</var>-changed</code>
event listener to the element. {{site.project_title}} elements use this convention to 
send change notifications for any property defined with `notify: true`.

To two-way bind to native elements or non-Polymer elements that don't
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

Note: When binding to standard notifying properties on Polymer elements,
specifying the event name is unnecessary, as the default convention will be
used.  The following constructions are equivalent:

    {% raw %}
    <!-- Listens for `value-changed` event -->
    <my-element value="{{hostValue::value-changed}}">

    <!-- Listens for `value-changed` event using Polymer convention by default -->
    <my-element value="{{hostValue}}">
    {% endraw %}


### Binding to structured data {#path-binding}

Sub-properties of the host may be two-way bound to properties of custom elements
as well by specifying the path of interest inside the binding annotation.

Example:

    <template>
      <div>{{user.manager.name}}</div>
      <user-element user="{%raw%}{{user}}{%endraw%}"></user-element>
    </template>


For a path binding to update, the path value must be updated in one of the 
following ways: 

*   Using a Polymer 
    [property binding](#property-binding) to another element.

*   Using the [`setPathValue`](#set-path) API, which
    provides the required notification to elements with registered interest.

**Note:** These requirements are identical to the requirements for 
[sub-property change observers](properties.html#observing-path-changes), which use
the same notification system.
{: .alert .alert-info }

Path bindings are distinct from property bindings in a subtle way:
when a property's value changes, an assignment must occur for the value to
propagate to the property on the element at the other side of the binding.
However, if two elements are bound to the same path of a shared object and the
value at that path changes (via a property binding or via `setPathValue`), the
value seen by both elements actually changes with no additional assignment
necessary, by virtue of it being a property on a shared object reference.  

In this case, the element that changed the path must notify the system so that other
elements that have registered interest in the same path may take side effects.

**Path bindings are two-way.** There is no concept of one-way binding in 
this case, since there is no concept of propagation. That is, all bindings and 
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
    change handler) may then take side effects based on knowledge of the path having
    changed.  
3.  Finally, those elements will forward the notification on to any
    children they have bound the object to, and will also fire a new
    `<property>-changed` event where `property` is the root object, to notify any
    hosts that may have bound root object down.  

Through this method, a notification reaches any part of the tree that has
registered interest in that path so that side effects occur.

This system "just works" to the extent that changes to object sub-properties
occur as a result of being bound to a notifying custom element property that
changed.  However, sometimes imperative code needs to "poke" at an object's sub-
properties directly.  As we avoid more sophisticated observation mechanisms such
as `Object.observe` or dirty-checking in order to achieve the best startup and
runtime performance cross-platform for the most common use cases, changing an
object's sub-properties directly requires cooperation from the user.

Specifically, Polymer provides two API's that allow such changes to be notified
to the system: `notifyPath(path, value)` and `setPathValue(path, value)`.

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

Since in the majority of cases, `notifyPath` will be called directly after an
assignment, a convenience function `setPathValue` is provided that performs both
actions:

    reassignManager: function(newManager) {
      this.setPathValue('user.manager', newManager);
    }

### Expressions in binding annotations

Currently there's no general support for expressions in binding annotations.
The two exceptions are:

*   Negation using `!`:

    Example:

        <template>
          <div hidden="{%raw%}{{!enabled}}{%endraw%}"></div>
        </template>

*   Computed properties can be defined inline, as described in 
    [Inline computed properties](#annotated-computed), below.

### Annotated computed properties {#annotated-computed}

Computed properties may be defined directly in template binding annotations.  
This is useful when the property need not be a part of the element's API or 
otherwise used by logic in the element, and is only used for downward data 
propagation.  

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

See [Computed properties](properties.html#computed-properties) for more information.

## Annotated attribute binding {#attribute-binding}

In the vast majority of cases, binding data to other elements should use
property binding described above, where changes are propagated by setting the
new value to the JavaScript property on the element.

However, there may be cases where a user actually needs to set an attribute on
an element, as opposed to a property.  These include when attribute selectors
are used for CSS or for for interoperability with elements that require using an
attribute-based API.

Polymer provides an alternate binding annotation syntax to make it explicit when
binding values to attributes is desired by using `$=` rather than `=`.  This
results in in a call to `element.setAttribute('<attr>', value);`, as opposed to
`element.property = value;`.

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

Values are serialized according to type, as described for 
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



---
layout: default
type: guide
shortname: Docs
title: Types of bindings
subtitle: Data-binding
---

{% include toc.html %}

There are several ways to bind data to a template. You can:

* Create a single instance of a template, by specifying a single object using the `bind` attribute.
* Create multiple instances of a template, by specifying an array of objects using the `repeat` attribute.
* Conditionally create an instance of a template, depending on whether the value passed to the `if` attribute is truthy.

**Note:** Binding templates only works inside {{site.project_title}} elements. For example, if a
`<template>` element is inserted directly into a page’s `<body>` tag, the `bind` attribute
doesn’t work as described here. If you need to use template binding outside of a
{{site.project_title}} element, see [Using data binding outside of a {{site.project_title}} element](databinding-advanced.html#bindingoutside).
{: .alert .alert-info }

When you use a binding _inside_ a template, you create a _node binding_, which binds a model value to a
DOM node. Node bindings are interpreted by the node, based on the element type and where the binding
occurs. See [Node bindings](#node-bindings) for details.

## Single template instances

Using the `bind` attribute, you can create a single instance of a template bound to an object.

{% raw %}
    <template>
      <template bind="{{person}}">
        This template can bind to the person object’s properties, like
        {{name}}.
      </template>
    </template>
{% endraw %}

Where `person` is an object (or more accurately, a [{{site.project_title}} expression](expressions.html) that yields an object).

Bindings inside the template are evaluated in the context of the bound object. For example,
if `person` has a property, `name`, {%raw%}`{{name}}`{%endraw%} evaluates to the value of `person.name`.

For convenience, you can also create a _named scope_ when binding an object:

{% raw %}
    <template>
      <template bind="{{person as p}}">
        This template uses a named scope to access properties, like
        {{p.name}}.
      </template>
    </template>
{% endraw %}

In this case, you can use the named scope `p` to access the properties of the `person` object.
Named scopes can be handy when nesting templates.

## Iterative templates

Iterative, or repeating, templates, generate a single template instance for each item in
an array. Each instance is bound to an item in the array.

The simplest format for a repeating template is:

{% raw %}
    <template>
      <template repeat="{{array}}">
        Creates an instance with {{}} bindings  for every element in the array collection.
      </template>
    </template>
{% endraw %}

Refer to the current item in `array` using an empty binding expression {%raw%}`{{}}`{%endraw%}, which matches
the current binding scope. Refer to a property of the current item as {%raw%}<code>{{<var>propertyname</var>}}</code>{%endraw%}.

Like the `bind` attribute, the `repeat` attribute supports named scopes:

{% raw %}
    <template>
      <template repeat="{{user in users}}">
        {{user.name}}
      </template>
    </template>
{% endraw %}

When using named scopes with the `repeat` attribute, the index value for each
item in the array is also available by using the following syntax:

{% raw %}
    <template>
      <template repeat="{{user, userIndex in users}}">
        <template repeat="{{userFile, userFileIndex in user}}">
          {{userIndex}}:{{userFileIndex}}.{{userFile}}
        </template>
      </template>
    </template>
{% endraw %}

Like the `bind` attribute, you can omit the value from the `repeat` element to inherit the
parent scope. For example, suppose you have an array of objects like this:

    this.items = [
      {name: "Milk"},
      {name: "Bread"},
      {name: "Cereal"}
    ];

You can use code like this to access both the array itself and its elements:

{% raw %}
    <template>
      <template bind="{{items}}">
        // {{length}} evaluates as items.length
        <p>Item count: {{length}}</p>
        <ul>
        <template repeat>
          // {{name}} here evaluates as the name of a single item
          <li>{{name}}</li>
        </template>
        </ul>
      </template>
    </template>
{% endraw %}

The resulting output is:

Item count: 3

*   Milk
*   Bread
*   Cereal


## Conditional templates

Conditional templates use the `if` attribute to conditionally create a template instance.

{% raw %}
    <template>
      <template if="{{conditionalValue}}">
        Binds if and only if conditionalValue is truthy.
      </template>
    </template>
{% endraw %}

The conditional template can be explicitly bound to an object using the
{%raw%}`bind={{expression}}`{%endraw%} syntax.

Where the explicit binding is omitted, a nested template can inherit the scope of
the containing template. Conditional templates are frequently used this way:

{% raw %}
    <template>
      <template bind="{{myOptions as m}}">
        <template if="{{m.showCounter}}">
          <div>Counter: {{m.counter}}</div>
        </template>
      </template>
    </template>
{% endraw %}

For more information on nesting templates, see [Expression scopes](expressions.html#expression-scopes).

You can also use `if` with the  `repeat` attribute.

{% raw %}
    <template>
      <template bind="{{myList as list}}">
        <template repeat="{{item in list.items}}" if="{{list.showItems}}">
          <li>{{item.name}}</li>
        </template>
      </template>
    </template>
{% endraw %}

## Importing templates by reference

Sometimes, you may want to reuse a template in multiple places, or reference a template generated elsewhere.
That's where the `ref` attribute comes in:

{% raw %}
    <template>
      <template id="myTemplate">
        Used by any template which refers to this one by the ref attribute
      </template>

      <template bind="{{}}" ref="myTemplate">
        When creating an instance, the content of this template will be ignored,
        and the content of #myTemplate is used instead.
      </template>
    </template>
{% endraw %}

You must include the `bind` or `repeat` attribute along with the `ref`
attribute to activate binding on the template.
(The empty binding expression used here, {%raw%}`{{}}`{%endraw%}, matches the current scope.)

### Recursive and dynamic templates

You can also use the `ref` attribute to create recursive templates
or to select templates dynamically. These features are complex and
rarely used, and are only described briefly here.

You can use the `ref` attribute to define recursive templates, such as tree structures:

{% raw %}
    <template>
      <ul>
        <template repeat="{{items}}" id="t">
          <li>{{name}}
            <ul>
              <template ref="t" repeat="{{children}}"></template>
            </ul>
          </li>
        </template>
      </ul>
    </template>
{% endraw %}

Here the innermost template is a recursive reference to the outer `template` with the ID `t`.
Instead of iterating over `items`, the innermost template iterates over the `children` property
on the current scope.

This code assumes a data structure like this:

    items: [
      {
        name: "1",
        children: [
          {
            name: "1.1",
            children: []
          }, {
            name: "1.2",
            children: [
              {
                name: "1.2.1"
                children: []
              }
            ]
          }
        ]
      }
    ]

You can also bind to the `ref` attribute _itself_, to choose templates dynamically:

{% raw %}
    <template repeat="{{node in nodes}}">
      <template bind="{{}}" ref="{{node.nodeType}}"></template>
    </template>
{% endraw %}

Here, the _value_ of `node.nodeType` is a string that identifies
the ID of the template to use.

## Node bindings

Node bindings are created for each binding in the contents of a template. A node binding creates a named relationship between a model value and a DOM node.

How nodes interpret bindings depends on the _type of element_, and the _binding name_. In {{site.project_title}}, the binding name is based on where the binding appears in the markup:

* A binding in the text content of an element, such as {%raw%}`<span>{{someText}}</span>`{%endraw%}, uses the name `textContent`.
* A binding in an element's attribute value, such as {%raw%}`<span style="{{someStyles}}">`{%endraw%} uses the name of the attribute as the name of the binding.


### Binding to text

If a binding occurs between tags, it creates a `textContent` binding to the element.

{% raw %}
    <p>This paragraph has some {{adjective}} text.</p>
{% endraw %}

All text nodes treat a `textContent` binding as a one-way binding: changing the model changes the bound node, but imperatively changing the DOM value does _not_ update the model.

### Binding to attributes

When you bind to an attribute, the binding takes the attribute's name. For example, the following binding uses the name `style`.

{% raw %}
    <span style="color: {{myColor}}">Colorful text!</span>
{% endraw %}

How these bindings work depends on the element being bound:

- For _most_ standard DOM elements, these bindings form one-way bindings to the attribute. For example, changing the `myColor` property updates the color of the element, but imperatively changing the `style` attribute _doesn't_ update the `myColor` property.

- The form input elements `input`, `option`, `select`, and `textarea` support two-way bindings for certain attributes.

- {{site.project_title}} elements support two-way bindings to published properties. If you publish a property using the `attributes` attribute or a `publish` block, it's available for two-way data binding.

- Custom elements are also free to interpret bindings in other ways. For example, a non-{{site.project_title}} element could use the underlying [Node.bind](node_bind.html) library to override the default handling of named bindings.

### Binding to input values

Two-way bindings are supported as a special case on some user input elements. Specifically, the following attributes support two-way bindings:

- `input` element: `value` and `checked` attributes.
- `option` element: `value` attribute.
- `select` element: `selectedIndex` and `value` attributes.
- `textarea` element: `value` attribute.

### Binding to {{site.project_title}} published properties

When you bind to a [published property](polymer.html#published-properties) on a {{site.project_title}} element, you get a two-way binding to the property.

In the following sample, the `intro-tag` binds to a published property on the `say-hello` element:

{% raw %}
    <!-- say-hello element publishes the 'name' property -->
    <polymer-element name="say-hello" attributes="name">
      <template>
        Hello, <b>{{name}}</b>!
      </template>
      <script>
        Polymer('say-hello', {
          ready: function() {
            this.name = 'Stranger'
          }
        });
        </script>
    </polymer-element>
    <polymer-element name="intro-tag" noscript>
      <template>
        <!-- bind yourName to the published property, name -->
        <p><say-hello name="{{yourName}}"></say-hello></p>
        <!-- bind yourName to the value attribute -->
        <p>What's your name? <input value="{{yourName}}" placeholder="Enter name..."></p>
      </template>
    </polymer-element>

    <intro-tag></intro-tag>
{% endraw %}

Here, `yourName` is bound to _both_ the `say-hello` element's `name` property and
the `input` element's `value` attribute. Both bindings are two-way, so when the user enters
a name, it's pushed into the `say-hello` element's `name` property. If you change the
value of the `name` property, the value is pushed into the `input` element.

**Note:** The `intro-tag` element doesn't define a `yourName` property. In this case, the data
binding system creates the property automatically.
{: .alert .alert-info }


#### Binding objects and arrays to published properties

Most of the examples show data binding with simple string values,
but {{site.project_title}} lets you bind references between elements
using published properties.

Let's modify the `name-tag` example to take an object instead of individual
properties.

    <polymer-element name="name-tag" attributes="person">
      <template>
        Hello! My name is <span style="color:{%raw%}{{person.nameColor}}{%endraw%}">
        {%raw%}{{person.name}}{%endraw%}</span>
      </template>
      <script>
        Polymer('name-tag', {
          created: function() {
            this.person = {
              name: "Scott",
              nameColor: "orange"
            }
          }
        });
      </script>
    </polymer-element>

Now, imagine we make a new component called `<visitor-creds>` that uses `name-tag`:

    <polymer-element name="visitor-creds">
      <template>
        <name-tag person="{%raw%}{{person}}{%endraw%}"></name-tag>
      </template>
      <script>
        Polymer('visitor-creds', {
          created: function() {
            this.person = {
              name: "Scott2",
              nameColor: "red"
            }
          }
        });
      </script>
    </polymer-element>

When an instance of `<visitor-creds>` is created, its `person` property (an object)
is also bound to `<name-tag>`'s `person` property. Now both components are using
the same `person` object.



### Conditional attributes

For boolean attributes, you can control whether or not the attribute appears using the special conditional attribute syntax:

{% raw %}
<pre class="prettyprint">
<var>attribute</var>?={{<var>boolean-expression</var>}}
</pre>
{%endraw%}

If _boolean-expression_ is truthy, _attribute_  appears in the markup; otherwise it is omitted. For example:

{% raw %}
    <span hidden?="{{isHidden}}">This may or may not be hidden.</span>
{% endraw %}

### One-time bindings

Sometimes, you may not need dynamic bindings. For these cases, there are one-time bindings.

Anywhere you use {% raw %}`{{}}`{% endraw %} in expressions, you can use double brackets
(`[[]]`) to set up a one-time binding. The binding becomes inactive after {{site.project_title}}
sets its value for the first time.

Example:

    <input type="text" value="this value is inserted once: [[ obj.value ]]">

One time bindings can potentially be a performance win if you don't need the overhead of setting up property observation.

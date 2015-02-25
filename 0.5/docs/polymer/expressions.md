---
layout: default
type: guide
shortname: Docs
title: Expressions
subtitle: Data-binding
---

{% include toc.html %}


Within a `<polymer-element>` you can use {{site.project_title}}'s [expression
library](https://github.com/polymer/polymer-expressions) to write inline expressions,
named scopes, and iterative markup, anywhere {%raw%}`{{`&nbsp;`}}`{%endraw%} bindings are used.

Expressions can also be used to define [computed properties](polymer.html#computed-properties).

## Expression syntax

{{site.project_title}} supports expressions in {%raw%}`{{}}`{%endraw%} with a strict
subset of the JavaScript language. In order to use this feature, it's
important to understand its behavior and limitations:

- The goal for inline expressions is to allow the expression of simple value
concepts and relationships. It is generally bad practice to put complex logic
into your HTML (view).
- Expressions are never run (e.g. `eval`) as page script. They cannot access any
global state (e.g. `window`). They are parsed and converted to a simple
interpreted form which is provided the present values of paths contained in
the expression.
- You can't insert HTML using expressions. To avoid XSS issues, the output of an expression
is HTML escaped before being inserted as the value of the binding.

**Note:** For the rare instance where you need to insert HTML dynamically,
see [Inserting data-bound HTML](databinding-advanced.html#boundhtml)
{: .alert alert-info }

Expressions support the following subset of JavaScript:

| Feature | Example | Explanation
|---------|
|Identifiers & paths | `foo`, `match.set.game` | These values are treated as relative to the current scope, extracted, and observed for changes. The expression is re-evaluated if one of the values in the expression changes. Changing a property value does not result in the expression being re-evaluated. For example, changing the value of `foo.bar` doesn't cause the expression `foo` to be re-evaluated.
| Array access | `foo[bar]` | Where `foo` and `bar` are identifiers or paths. The expression is re-evaluated if `foo` or `bar` changes, or if the value at `foo[bar]` changes.
| Logical not operator | `!` |
| Unary operators | `+foo`, `-bar` | Converted to `Number`. Or converted to `Number`, then negated.
| Binary operators | `foo + bar`, `foo - bar`, `foo * bar` | Supported: `+`, `-`, `*`, `/`, `%`
| Comparators | `foo < bar`, `foo != bar`, `foo == bar` | Supported: `<`, `>`, `<=`, `>=`, `==`, `!=`, `===`, `!==`
| Logical comparators | `foo && bar || baz` | Supported: `||`, `&&`
| Ternary operator | `a ? b : c` |
| Grouping (parenthesis) | `(a + b) * (c + d)` |
| Literal values | numbers, strings, `null`, `undefined` | Escaped strings and non-decimal numbers are not supported. |
| Array & Object initializers | `[foo, 1]`, `{id: 1, foo: bar}` |
| Function | `reverse(my_list)` | The expression's value is the return value of the function. The function's arguments are observed for changes, and the expression is re-evaluated whenever one of the arguments changes.
{: .first-col-nowrap .responsive-table .expressions-table }


In addition to the JavaScript portion, an expression can also include one or more _filters_, which
modify the output of the JavaScript expression. See [Filtering expressions](#filters) for
information.

## Evaluating expressions

Expressions are parsed when they're within a binding or computed property declaration:

<pre class="nocode">
{%raw%}<b>{{</b> <var>expression</var> <b>}}</b>{%endraw%}
</pre>

<pre class="nocode">
<b>[[</b> <var>expression</var> <b>]]</b>
</pre>

<pre class="nocode">
<b>computed: {</b>
  <var>property_name</var><b>: '</b><var>expression</var><b>'
}</b>
</pre>

The value of the expression is evaluated. In a binding, the result inserted as the value of the binding:

{% raw %}
    <div>Jill has {{daughter.children.length + son.children.length}} grandchildren</div>
{% endraw %}

may result in:

    <div>Jill has 100 grandchildren</div>

For standard (double-mustache) bindings and computed properties, the
expression is re-evaluated whenever the value of one or more paths
in the expression changes.

## Expression scopes {#expression-scopes}

Expressions are evaluated based on the current _scope_, which defines which identifiers and paths
are visible. The expressions in `bind`, `repeat` or `if` attributes are evaluated in the scope of
the parent template. For an element's outermost template, paths and identifiers are
interpreted relative to the element itself (so `this.prop` is available as {%raw%}`prop`{%endraw%}).

For computed properties, the scope of an expression is always the element itself.

Templates that don't include `bind` or `repeat` share the current scope.

A `bind` or `repeat` without an expression is the same as using an expression that
specifies the current scope. An empty binding expression, {%raw%}`{{}}`{%endraw%}
also specifies the current scope.

### Nested scoping rules {#nested-scoping-rules}

If a `<template>` using a named scope contains child `<template>`s,
all ancestor scopes are visible, up-to and including the first ancestor **not** using a named scope. For example:

{% raw %}
    <template>
      <!-- outermost template -- element's properties available -->
      <template bind="{{organization as organization}}">
        <!-- organization.* available -->
        <template bind="{{organization.contact as contact}}">
          <!-- organization.* & contact.* available -->
          <template bind="{{contact.address}}">
            <!-- only properties of address are available -->
            <template bind="{{streetAddress as streetAddress}}">
              <!-- streetAddress.* and properties of address are available.
                   NOT organization.* or contact.* -->
            </template>
          </template>
        </template>
      </template>
    </template>
{% endraw %}

In other words:

- If a template uses a named scope, its parent scope is visible.
- If a template uses an unnamed scope, its parent scope is _not_ visible.

## Filtering expressions {#filters}

Filters can be used to modify the output of expressions. {{site.project_title}} supports several
default filters for working with data. They're used in bindings by piping an input expression
to the filter:

<pre class="prettyprint">
{% raw %}{{ <var>expression</var> | <var>filterName</var> }}{% endraw %}
</pre>

{{site.project_title}} provides two predefined filters, `tokenList` and `styleObject`. You can also
create your own [custom filters](#custom-filters).

If your filter depends on the properties of one of the paths or identifiers in your expression,
note that the expression isn't re-evaluated when properties change. For example, if you have an
expression like:

    {% raw %}{{user | formatUserName}}{% endraw %}

The expression isn't re-evaluated when a property, such as `user.firstName` changes. If you need
the filter to be re-run when a property changes, you can include it explicitly in the expression,
like this:

    {% raw %}{{ {firstName: user.firstName, lastName: user.lastName} | formatUserName}}{% endraw %}

Since `user.firstName` and `user.lastName` are included explicitly in this expression, both
properties are observed for changes.

### tokenList

The `tokenList` filter is useful for binding to the `class` attribute. It allows you
to dynamically set/remove class names based on the object passed to it. If the object
key is truthy, the name will be applied as a class.

For example:

{% raw %}
    <div class="{{ {active: user.selected, big: user.type == 'super'} | tokenList}}">
{% endraw %}

results in the following if `user.selected == true` and `user.type == 'super'`:

    <div class="active big">

### styleObject

The `styleObject` filter converts a JSON object containing CSS styles into a string of CSS suitable for
assigning to the `style` attribute.

For simple property values {{site.project_title}} allows you to bind to the `style` attribute
directly:

{% raw %}
    <div style="color: {{color}}">{{color}}</div>
{% endraw %}

If the element's `color` property is "red", this results in the following:

    <div style="color: red">red</div>

However, if you have an object containing a set of styles as name:value pairs,
use the `styleObject` filter to transform it into the appropriate format.

{% raw %}
    <div style="{{styles | styleObject}}">...</div>
{% endraw %}

In this examples `styles` is an object of the form `{color: 'red', background: 'blue'}`, and
the output of the `styleObject` filter is a string of CSS declarations (for example,
`"color: 'red'; background: 'blue'"`).

### Writing custom filters {#custom-filters}

A filter is simply a function that transforms the input value. You can create a _custom filter_ for
your element by adding a method to the element's prototype. For example, to add a filter called
`toUpperCase` to your element:

    Polymer('greeting-tag', {
      ...
      toUpperCase: function(value) {
        return value.toUpperCase();
      },

And use the filter like this:

{% raw %}
    {{s.who | toUpperCase}}
{% endraw %}

This filter modifies values when they're being inserted into the DOM, so if `s.who` is set to `world`,
it displays as `WORLD`. You can also define a custom filter that operates when converting back from
a DOM value to the model (for example, when binding an input element value). In this case, create
the filter as an object with `toDOM` and `toModel` functions. For example, to keep your model text
in lowercase, you could modify the `toUpperCase` as follows:

    toUpperCase: {
      toDOM: function(value) {
        return value.toUpperCase();
      },
      toModel: function(value) {
        return value.toLowerCase();
      }
    }

**Note:** If the user enters text in a bound input field, the `toModel` filter is invoked before the
value stored to the model. However, `toDOM` filter is only called when the model is changed
imperatively. So the text entered by the user isn't filtered (that is, it doesn't
get capitalized). To validate or transform a value as the user types it, you can use a `on-input`
or `on-blur` event handler.
{: .alert .alert-info }

#### Filter parameters

You can pass parameters to a filter. For example:

{% raw %}
    {{myNumber | toFixed(2)}}
{% endraw %}

The code for the `toFixed` filter could look like this:

    toFixed: function(value, precision) {
      return Number(value).toFixed(precision);
    }

The parameters passed to a filter are observed for changes.

#### Chaining filters

You can also chain filters, passing the output of one filter to another:

{% raw %}
    {{myNumber | toHex | toUpperCase}}
{% endraw %}

### Writing global filters


Although {{site.project_title}} supports adding [custom filters](#custom-filters) to the element prototype,
you may want to register global filters which can be reused across multiple elements.

To register a global filter, add a custom filter to the prototype of the
`PolymerExpressions` object.

#### Examples

Let's create a filter for transforming the letters in any string to uppercase.

{% raw %}
    {{Hello Polymer | uppercase}}
{% endraw %}

To register `uppercase` as a global filter, add it to the prototype for
`PolymerExpressions` object:

{% raw %}
    PolymerExpressions.prototype.uppercase = function(input) {
      return input.toUpperCase();
    };
{% endraw %}

You can also pass parameters to global filters. Here's an example of a `startsWith`
filter that returns only those items in an array that begin with a certain letter:

{% raw %}
    {{arrayOfFriends | startsWith('M')}}
{% endraw %}

Filter definition:

{% raw %}
    PolymerExpressions.prototype.startsWith = function (input, letter) {
      return input.filter(function(item){
        return item[0] === letter;
      });
    };
{% endraw %}

A useful set of community-driven [collection](https://github.com/addyosmani/polymer-filters) of {{site.project_title}} filters is available if you need further
examples of global filters.

#### Importing global filters

To use a filter across multiple elements, define it in a script and import it at the top of your element
(after polymer.html).

    <link rel="import" href="uppercase-filter.html"/>

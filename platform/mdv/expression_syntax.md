---
layout: default
title: Polymer's Expression Syntax
subtitle: MDV
---

{% comment %}
{% include_external polymer-all/mdv/docs/expression_syntax.md %}
{% endcomment %}

{{site.project_title}} provides `ExpressionSyntax` ([source](https://github.com/Polymer/mdv/blob/stable/util/expression_syntax.js)) as an example implementation of
creating a syntax with MDV's [Pluggable Syntax API](syntax_api.html). It allows you to use
named scopes, `bind`, `repeat`, and simple inline expressions within  `<template>` bindings.

**Note:** {{site.project_title}} uses `ExpressionSyntax` under the hood. You do not
need to use it directly.  This document is provided as API reference.
{: .alert .alert-info }

## Features

### Inline expressions

The `ExpressionSyntax` allows for inline expressions within bindings which support
a strict subset of the JavaScript language. In order to use this feature, it's
important to understand its behavior and limitations:

- The goal for inline expressions is to allow the expression of simple value
concepts and relationships. It is generally bad practice to put complex logic
into your HTML (view).
- Expressions are never run (e.g. `eval`) as page script. They cannot access any
global state (e.g. `window`). They are parsed and converted to a simple
interpreted form which is provided the present values of paths contained in
the expression.

The specific subset of JavaScript which is supported is:

- Identifiers & paths, e.g. `foo`, `foo.bar.baz`. These values are treated as
relative to the local model, extracted, observed for changes and cause the
expression to be re-evaluated if one or more has changed.
- Logical not operator: `!`
- Unary operators: `+` (Convert to Number), `-` (Convert to Number and negate).
- Binary operators: `+` (Addition), `-` (Subtraction), `*` (Multiplication), `/` (Division), `%` (Modulo).
- Comparators: `<` (less than), `>` (greater than), `<=` (less than or equal), `>=` (greater then or equal), `==` (equal), `!=` (not equal), `===` (identity equally), `!==` (identity inequality)
- Logical comparators: `||` (or), `&&` (and)
- Ternary statements: `?` e.g. `a ? b : c`.
- Grouping (parenthesis): e.g. `(a + b) * (c + d)`
- Literal values: e.g. numbers, strings, `null`, `undefined`. **Note:** that escaped strings and non-decimal numbers are not supported.
- Array & Object initializers: e.g. `[foo, 1]`, `{id: 1, foo: bar}`
- Labeled statements: e.g. `foo: bar.baz; bat: boo > 2`

#### Unlabeled vs. labeled statements

Expressions are parsed when they're within a mustache ({% raw %}`{{}}`{% endraw %}).
The expression can be a single statement, or multiple labeled statements.

If the result is a _single unlabeled statement_, whenever the value of one or
more paths in the expression change, the value of the expression re-evaluated
and the result inserted as the value of the mustache:

{% raw %}
    <div>Jill has {{ daughter.children.length + son.children.length }} grandchildren</div>
{% endraw %}

may result in:

    <div>Jill has 100 grandchildren</div>

If the result is _one or more labeled statements_, the value of the mustache
will include the set of space-separated label identifiers whose corresponding expressions are truthy:

{% raw %}
    <div class="{{ active: user.selected; big: user.type == 'super' }}"> 
{% endraw %}

may result in:

    <div class="active big"> 

### Named scopes

Named scopes are useful for referencing a model value from an "outer" model "scope".
For example:

{% raw %}
    <template repeat="{{ user in users }}">
      {{ user.name }}
      <template repeat="{{ file in user.files }}">
        {{ user.name }} owners {{ file.name }}
      </template>
    </template>
{% endraw %}

The scope naming is available (but optional) inside the `template`, `bind`, and `repeat` directives.

{% raw %}
- `bind` syntax: `<template bind="{{ expression as identifier }}">`
- `repeat` syntax: `<template repeat="{{ identifier in expression }}">`
{% endraw %}

**Note:** that `expression` can be a simple identifier, a path or a full
expression (including Object and Array literals).
{: .alert .alert-info }

#### Nested scoping rules

If a `<template>` using a named scoped contains children `<template>`s,
all ancestor scopes are visible, up-to and including the first ancestor **not** using a named scope.

{% raw %}
    <template bind="{{ foo as foo }}">
      <!-- foo.* available -->
      <template bind="{{ foo.bar as bar }}">
        <!-- foo.* & bar.* available -->
        <template bind="{{ bar.bat }}">
          <!-- only properties of bat are available -->
          <template bind="{{ boo as bot }}">
            <!-- bot.* and properties of bat are available. NOT foo.* or bar.* -->
          </template>
        </template>
      </template>
    </template>
{% endraw %}

## Using a custom syntax

If you've created your own syntax, here's how to tell MDV to use it:

- Include your implementation.

      <script src="util/expression_syntax.js"></script>

- Register the syntax for use on the template element (sub-templates will inherit its use).

      templateElement.bindingDelegate = new ExpressionSyntax();

- Use the syntax in your templates

      <template bind>
        {% raw %}<template repeat="{{ user in users }}">
          {{ user.name }} <template if="{{ user.age >= 21 }}"> Can have a drink!</template>
        </template>{% endraw %}
      </template>

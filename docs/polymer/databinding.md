---
layout: default
type: core
navgroup: docs
shortname: Docs
title: Data-binding
---

## Introduction

{{site.project_title}} supports two-way data binding and uses the term to describe a way to write _dynamic_ HTML _using_ HTML. A set of platform technologies and "prollyfills" enable this behavior:

* [HTML Template element](http://www.html5rocks.com/tutorials/webcomponents/template/) (`<template>`)
* [Template Bindings](/platform/template.html) (_prollyfill_) - describes how `<template>` manages instance fragments.
* [`Node.bind()`](/platform/node_bind.html) (_prollyfill_) - describes how DOM nodes are bound to data values.
* [`Object.observe()`](http://updates.html5rocks.com/2012/11/Respond-to-change-with-Object-observe)
* [Mutation Observers](https://developer.mozilla.org/en-US/docs/DOM/MutationObserver)

When used together, these primitives extend HTML and the DOM APIs to support a sensible
separation between the UI (DOM) of application and its underlying data (model). Updates to the model are reflected in the DOM and user input into the DOM is immediately assigned to the model.

## The basics

{{site.project_title}}'s data-binding features hinge on the `<template>` element and double mustache {%raw%}`{{}}`{%endraw%} syntax.

- [Expressions](/docs/polymer/expressions.html)
- [Filters](/docs/polymer/filters.html)

### An example

There's plenty of detail, but it all hinges on the `<template>` element. Let's walk through a simple example which demonstrates the basics.

{%raw%}
    <polymer-element name="greeting-tag">
      <template>
        <ul>
          <template id="greeting" repeat="{{s in salutations}}">
            <li>{{s.what}}: <input type="text" value="{{s.who}}"></li>
          </template>
        </ul>
      </template>
      <script>
        Polymer('greeting-tag', {
          ready: function() {
            this.salutations = [
              {what: 'Hello', who: 'World'},
              {what: 'GoodBye', who: 'DOM APIs'},
              {what: 'Hello', who: 'Declarative'},
              {what: 'GoodBye', who: 'Imperative'}
            ];
          }
        });
      </script>
    </polymer-element>
{%endraw%}

{%comment%}
    <script src="platform.min.js"></script>
    <ul>
      <template id="greeting" repeat="{{ salutations }}">
        <li>{{ what }}: <input type="text" value="{{ who }}"></li>
      </template>
    </ul>
    <script>
    var t = document.getElementById('greeting');
    var model = {
      salutations: [
        { what: 'Hello', who: 'World' },
        { what: 'GoodBye', who: 'DOM APIs' },
        { what: 'Hello', who: 'Declarative' },
        { what: 'GoodBye', who: 'Imperative' }
      ]
    };
    t.model = model;

    // Needed to detect model changes if Object.observe() is not available.
    Platform.performMicrotaskCheckpoint();
    </script>
    </body>
{%endcomment%}

This example should look mostly familiar to anyone who knows HTML, but there are a couple novel things going on:

#### The `<template>` element

The [HTML Template element](http://www.html5rocks.com/tutorials/webcomponents/template/) allows you to declare chunks of inert HTML that may be cloned, activated, and used at some laster point.

If you loaded the above example without `<script src="platform.min.js"></script>`, that's about all `<template>` would do.

However, [Template Binding](/platform/template.html) teaches `<template>` some new tricks:

* Instruct DOM nodes to derive their value from JavaScript data by binding them to the data provided.
* Maintain a fragment of DOM (or "instance fragment") for each item in an array.
* Conditionally stamp out one or more instance fragments, based on whether  some data value is true or not.
* ...And lots more.

But back to the example. Our template...

{%raw%}
    <template id="greeting" repeat="{{ salutations }}">
      <li>{{ what }}: <input type="text" value="{{ who }}"></li>
    </template>
{%endraw%}

...defines what each instance will look like when stamped out. In this case, it contains a `<li>` with a text node and an `<input>` as its children. The mustaches {%raw%}`{{}}`{%endraw%} mean _"bind data here"_. The {%raw%}`repeat="{{ salutations }}"`{%endraw%} tells the template to ensure there is one instance fragment for each element in the salutations array.

In `<script>`, we create a model:

    var model = {
      salutations: [
        { what: 'Hello', who: 'World' },
        { what: 'GoodBye', who: 'DOM APIs' },
        { what: 'Hello', who: 'Declarative' },
        { what: 'GoodBye', who: 'Imperative' }
      ]
    };

Notice that this is just JavaScript data: _there's no need to import your data into special observable objects_. The template is set in motion by binding the model data to it:

    t.model = model;

Now the template is off to the races. Here's the result:

![ScreenShot](https://raw.github.com/Polymer/TemplateBinding/master/docs/images/README/output.png)

and here's what the DOM looks like:

![ScreenShot](https://raw.github.com/Polymer/TemplateBinding/master/docs/images/README/DOM.png)

You can see that the template stamped out four instances immediately following its position in the document. All nodes within an instance have a property called `templateInstance` which points to an instance descriptor. The descriptor indicates the extent (first and last nodes) of the instance, as well as the `model` data for which the instance was produced:

![ScreenShot](https://raw.github.com/Polymer/TemplateBinding/master/docs/images/README/templateInstance.png)

Now, remember we said data-binding teaches the DOM to derive its values from JavaScript data? If we change a value in our model, the DOM observes the change and updates accordingly:

![ScreenShot](https://raw.github.com/Polymer/TemplateBinding/master/docs/images/README/updateData.png)

However, the DOM doesn't just observe data in the model, if DOM elements which collect user input are bound, they _push_ the collected value into the model:

![ScreenShot](https://raw.github.com/Polymer/TemplateBinding/master/docs/images/README/input.png)

Lastly, let's look at what happens when we alter the contents of the `model.salutations` array:

![ScreenShot](https://raw.github.com/Polymer/TemplateBinding/master/docs/images/README/arrayUpdate.png)

The `<template>` is `repeat`ing which means that it ensures there is one instance for each item in the array. We removed two elements from the middle of salutations and inserted one in their place. The `<template>` responded by removing the two corresponding instances and creating a new one in the right location.

Getting the idea? Data-binding allows you author your HTML _using_ HTML which contains information about _where data goes_ and directives which _control the document's structure_ -- all depending on the data you provide it.

### Where to go from here?

If you are new to data-binding, the best to place to go is to the look at the [How-To examples](https://github.com/Polymer/TemplateBinding/tree/master/examples/how_to). These are little examples which succinctly demonstrate how to use data-binding to accomplish things that frequently are required for real web apps:

_Binding to DOM values:_

* [Binding to text values](https://github.com/Polymer/TemplateBinding/tree/master/examples/how_to/bind_to_text.html): How to insert values into the DOM that render as text.
* [Binding to attributes](https://github.com/Polymer/TemplateBinding/tree/master/examples/how_to/bind_to_attributes.html): How to insert values into element attributes
* [Conditional attributes](https://github.com/Polymer/TemplateBinding/tree/master/examples/how_to/conditional_attributes.html): How to bind to attributes such that the attribute is only present if the binding value is "truthy".
* [Binding to input elements](https://github.com/Polymer/TemplateBinding/tree/master/examples/how_to/bind_to_input_elements.html): How to bind bi-directionally with input elements.
* [Custom bindings](https://github.com/Polymer/TemplateBinding/tree/master/examples/how_to/custom_syntax.html): How to implement a custom element which has a specialized interpretation of a binding.

_Using `<template>` to produce DOM structures:_

* [Conditionals](https://github.com/Polymer/TemplateBinding/tree/master/examples/how_to/conditional_template.html): How to control whether instance fragments are produced based on the value of a binding.
* [Nested templates](https://github.com/Polymer/TemplateBinding/tree/master/examples/how_to/nested_templates.html): How to accomplish nested template production.
* [Re-using templates](https://github.com/Polymer/TemplateBinding/tree/master/examples/how_to/template_ref.html): How to define a template once and use it in more than one location.
* [Recursive templates](https://github.com/Polymer/TemplateBinding/tree/master/examples/how_to/recursive_templates.html): How to produce tree-structure DOM whose depth is dependent on the data to which it is bound.

#### Advanced Topics

<p class="alert">
  <b>IMPORTANT</b>: The advanced topics documentation have yet to be created.
</p>

* DOM Stability: {{site.project_title}} makes every effort to maintain the state of DOM nodes (event listeners, expandos, etc...). Understand why this is important and how it works.
* Imperative DOM mutation: You should rarely need to directly manipulate the DOM, but if you do, it's allowed. Learn the simple rules of how {{site.project_title}} will react if you manipulate the DOM it is managing.
* Asynchronous processing model: {{site.project_title}} responds asynchronously to changes in data and DOM. Learn why this is good and what it means for your application.
* Chained observation

---
layout: default
title: Getting started

imports:
#- toolkit-ui/elements/g-panels.html
#- toolkit-ui/elements/g-tabs.html
#- samples/components/basic-element.html
#- samples/components/tk-element.html
#- samples/components/tk-element-databinding-color.html
#- samples/components/tk-element-databinding.html
#- samples/components/tk-element-ready.html
#- samples/components/tk-element-property-public.html
#- samples/components/tk-element-property-public-publish.html
#- samples/components/tk-element-event-binding.html
#- samples/components/tk-element-public-access.html
#- samples/components/tk-node-finding.html
##- samples/components/tk-twoway-binding.html
#- samples/components/tk-binding-to-elements.html
---

{% include toc.html %}
[Custom Elements](/platform/custom-elements.html) are the core building blocks of
{{site.project_title}}-based applications. You create applications by assembling custom elements
together, either ones provided by {{site.project_title}}, ones you create yourself,
or third-party elements.

## Basics

Getting things setup is straightforward:

1. [Download the latest build](/getting-the-code.html) of {{site.project_title}}.
1. Load **polymer.min.js**.
2. Import (`<link rel="import">`) the component(s) you want to use.
3. Use the custom element in your app.

Here's a bare bones example:

    <!DOCTYPE html>
    <html>
      <head>
        <!-- 1. Load {{site.project_title}} -->
        <script src="polymer.min.js"></script>
        <!-- 2. Load a component -->
        <link rel="import" href="x-foo.html">
      </head>
      <body>
        <!-- 3. Declare the component by its tag. -->
        <x-foo></x-foo>
      </body>
    </html>

**Note:** You must run your app from a web server for the [HTML Imports](/platform/html-imports.html)
polyfill to work properly. This requirement goes away if the API is available natively.
{: .alert .alert-info }

### Creating a {{site.project_title}} element

{{site.project_title}} provides extra goodies for creating custom elements. We call these souped-up custom elements "{{site.project_title}} elements". To create one, follow these steps:

1. Load [{{site.project_title}} core](/polymer.html) (`polymer.min.js`).
1. Declare your custom element using `<polymer-element>` and call the `Polymer()` constructor.

In the following sample, we've converted a basic custom element into a {{site.project_title}} element named `tk-element`.

{% include samples/tk-element.html %}

**Reminder:** The `name` attribute is required and specifies the name of the HTML
tag you'll instantiate in markup (e.g. `<tag-name>`). It must be a "-" separated string.

### Add properties/methods to your component

If you need to add public methods/properties to your element,
include a `<script>` that calls `{{site.project_title}}('your-tagname')`.
`{{site.project_title}}(..)` is a convenience wrapper for [`document.register`](/platform/custom-elements.html#documentregister), but also endows the element with special features like
data binding and event mapping. Its first argument is the name of the element
you're creating. The second argument (optional) is an object that defines your
element's `prototype`. 

{% include samples/tk-element-proto.html %}

## Adding lifecycle methods

The [lifecycle callbacks](/polymer.html#lifecyclemethods) are special methods you
can define on your element.

For example, when an element has been registered and finished initializing itself,
it calls its `created()` method (if one has been defined). The `created` callback is
a great place to do constructor-like initialization work.

{% include samples/tk-element-created.html %}

## Declarative data binding

You can bind properties in your component using declarative data binding and the "double-mustache" syntax (`{%raw%}{{}}{%endraw%}`). The `{%raw%}{{}}{%endraw%}` is replaced by the value of the property referenced between the brackets.

{% include samples/tk-element-databinding.html %}

### Binding to markup

You can use binding expressions in most HTML markup, except for tag names themselves. In the following example, we create a new property on our component named `color` whose value is bound to the value of the `color` style applied to the custom element.

{% include samples/tk-element-databinding-color.html %}

### Binding between components and native elements ####

The following example demonstrates binding component properties to attributes of native input elements.

{% include samples/tk-binding-to-elements.html %}

**Note:** Giving `age` an initial value `25` gives {{site.project_title}}
a hint that this property is an integer.
{: .alert alert-info}

## Publishing properties

Published properties can be used to define an element's "public API". {{site.project_title}}
establishes two-way data binding for published properties and provides access
to the property's value using `{%raw%}{{}}{%endraw%}`.

_Publish_ a property by listing it in the `attributes` attribute in your `<polymer-element>`. Properties declared this way are initially `null`. To provide a more appropriate default value, include the same property name directly in your prototype (as seen below).

The following example defines two data-bound properties on the element, `owner` and `color`,
and gives them default values:

{% include samples/tk-element-property-public.html %}

Note: In this example the user overrides the defaults for `owner` and `color`
by configuring the element with initial attribute values (e.g. `<tk-element-property-public owner="Scott" color="blue">`).

[Learn more about published properties](/polymer.html#published-properties)

## Automatic node finding

Shadow DOM is a self-contained document-like subtree; id's in that subtree do not interact with id's in other trees. Each {{site.project_title}} element generates a map of id's to node references in the element's template. This map is accessible as `$` on the element. 

{% include samples/tk-node-finding.html %}

[Learn more about automatic node finding](/polymer.html#automatic-node-finding)

## Where to go from here?

Read up on [{{site.project_title}}'s core API](/polymer.html).

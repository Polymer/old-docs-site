---
layout: default
title: Getting started

components:
#- toolkit/components/g-panels.html
#- toolkit/components/g-tabs.html
#- samples/components/basic-element.html
#- samples/components/tk-element.html
#- samples/components/tk-element-databinding-color.html
#- samples/components/tk-element-databinding.html
#- samples/components/tk-element-property.html
#- samples/components/tk-element-ready.html
#- samples/components/tk-element-property-public.html
#- samples/components/tk-element-property-public-publish.html
#- samples/components/tk-element-event-binding.html
#- samples/components/tk-element-public-access.html
#- samples/components/tk-node-finding.html
##- samples/components/tk-twoway-binding.html
#- samples/components/tk-binding-to-elements.html
---

{% include outofdate.html %}

## Basics

The basics of using {{site.project_title}} are simple:

1. Load **platform.js** to shim missing platform features, such as [Shadow DOM](/platform/shadow-dom.html).
- Load components with `<link rel="import" href="/path/to/component-file.html">`
- Use the custom element in your page.

Here's a bare bones example:

    <!DOCTYPE html>
    <html>
      <head>
        <!-- 1. Shim missing platform features -->
        <script src="toolkit/platform/platform.js"></script>
        <!-- 2. Load a component -->
        <link rel="import" href="toolkit/components/g-menu-item.html">
      </head>
      <body>
        <!-- 3. Instantiate the component with its tag. -->
        <g-meu-item src="images/email.svg">Email Link</g-menu-item>
      </body>
    </html>

## Components

[Custom Elements](/platform/custom-elements.html) are the core building blocks of
Toolkit-based applications. You create applications by assembling custom elements
together, either ones provided by the Toolkit or that you create yourself.

### Creating a basic component

The platform polyfills provided by {{site.project_title}} let you load and display
custom elements. Just by loading `platform.js` you get support for these
new technologies.

{% include samples/basic-element.html %}

### Creating a Toolkit component

Toolkit provides extra goodies for creating custom elements. To create a custom
element which adds Toolkit features, two additional steps are required:

1. Load the [Toolkit kernel](/toolkit-kernel-explainer.html) (`toolkit/toolkit.js`).
- In your custom element, add a `<script>` element that calls the `Toolkit.register()` initializer. This endows the custom element with Toolkit features, such as data binding and event mapping.

In the following sample we convert our basic custom element into a Toolkit component named `tk-element`.

{% include samples/tk-element.html %}

`Toolkit.register()` takes the element it needs to register as its first argument.
In the context of `<element>`, `this` refers to the element.

{% comment %}
### Add properties to our component

The `Toolkit.register()` takes an object as a parameter whose members define the properties and methods that belong to our component.

{% include samples/tk-element-property.html %}

Now that we've added a private variable, let's add data binding to display its value in the DOM.
{% endcomment %}

## Declarative data binding

You can bind properties in your component to  Toolkit supports declarative data binding using the "double-mustache" syntax (`{%raw%}{{}}{%endraw%}`) from [Model Driven Views](/platform/mdv.html). The `{%raw%}{{}}{%endraw%}` is replaced by the value of the property referenced between the brackets.

{% include samples/tk-element-databinding.html %}

### Binding to markup

You can use binding expressions in most HTML markup, except for tag names themselves. In the following example, we create a new property on our component named `color` whose value is bound to the value of the `color` style applied to the custom element.

{% include samples/tk-element-databinding-color.html %}

### Binding between components and native elements ####

The following example demonstrates binding component properties to attributes of native input elements.

{% include samples/tk-binding-to-elements.html %}

### Adding a ready() lifecyle method ###

When a component has finished initializing itself, it calls its `ready` method, if it exists.

{% include samples/tk-element-ready.html %}

## Making properties public ###

By default, properties and methods you declare in the `component()` are in a protected scope&mdash;they aren't (directly) accessible outside of the component. Public properties can be exposed via data binding, or accessed directly on the element's JavaScript instance. 

There are two ways to make a property public:

* Add the property to the element's `attributes` attribute. This attribute takes a string of space-delimited strings that, at runtime, are converted into public properties on the component.
* Add the property to a `publish` block in the `component()` initializer object.

#### Using the "attributes" attribute

In the following example the defines an `attributes` attribute on the custom element whose value is the string `"owner color"`. 

{% include samples/tk-element-property-public.html %}

#### Using a publish block

This example is functionally equivalent to the previous version except that instead of using the `attributes` attribute to make the properties public, it moves them to the component's `publish` block.

A public property declared in the `attributes` attribute is initially set to `undefined`. You can provide a more appropriate default value to the property in the component's `publish` block, as shown below. 

{% include samples/tk-element-property-public-publish.html %}

<!-- ### Change watching

You can also 
 -->

### Accessing public properties on an component

A component's public properties can be accessed from its custom element, as shown below.

{% include samples/tk-element-public-access.html %}

<script>
window.addEventListener("WebComponentsReady", function() {
  console.log("tk-element-public-access's owner is: " + document.querySelector("tk-element-public-access").owner);
});
</script>        

### Automatic node finding

Shadow DOM is a self-contained document-like subtree; id's in that subtree do not interact with id's in other trees. Each Toolkit component generates a map of id's  to node references in the component's template. This map is accessible as `this.$` to the component. 

{% include samples/tk-node-finding.html %}
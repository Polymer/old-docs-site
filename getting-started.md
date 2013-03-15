---
layout: default
title: Getting started
pygments: true
components:
- toolkitchensink/toolkit/components/g-component.html
- samples/components/basic-element.html
- samples/components/tk-element.html
- samples/components/tk-element-databinding-color.html
- samples/components/tk-element-databinding.html
- samples/components/tk-element-property.html
- samples/components/tk-element-ready.html
- samples/components/tk-element-property-public.html
- samples/components/tk-element-property-public-publish.html
- samples/components/tk-element-event-binding.html
- samples/components/tk-element-public-access.html
- samples/components/tk-node-finding.html
- samples/components/tk-twoway-binding.html
- samples/components/tk-binding-to-elements.html
- toolkitchensink/toolkit/components/g-panels.html
- toolkitchensink/toolkit/components/g-tabs.html

---

## Basics ##

The basics of using {{site.project_title}} are simple:

1. Load **platform.js** to shim missing platform features, such as as Shadow DOM.
2. Load components with `<link rel="components" href="/path/to/component-file.html">`
3. Use component tags in HTML.

{% highlight html %}
<!DOCTYPE html>
<html>
  <head>
    <!-- 1. Shim missing platform features -->
    <script src="../platform/platform.js"></script>
    <!-- 2. Load a component -->
    <link rel="components" href="../components/g-menu-item.html">
  </head>
  <body>
    <!-- 3. Instantiate the component with its tag. -->
    <g-menu-item src="images/email.svg">Email Link</g-menu-item>
  </body>
</html>
{% endhighlight html %}

<h2> Components </h2>

Components are the core building blocks of Toolkit-based applications. You create applications by assembling components together, either ones provided by the Toolkit or that you create yourself.

<h3>Basic custom element</h3>

The platform shims provided by {{site.project_title}} lets you load and display custom elements. Just by loading `platform.js` you

{% include samples/basic-element.html %}

### Adding Toolkit features to a custom element ###

To enable a custom element with Toolkit features:

* Load the Toolkit kernel (`/toolkit/component/g-component.html`).
* Add a `<script/>` element that includes the `component()` initializer. THis endows the custom element with Toolkit features, such as data binding and event mapping.

In the following sample we convert our basic custom element into a g-component named `tk-element`.

{% include samples/tk-element.html %}

### Add properties to our component ###

The `component()` initializer takes an object as a parameter whose members define the properties and methods that belong to our component.

{% include samples/tk-element-property.html %}

Now that we've added a property we can use data binding to display its value in the DOM.

## Declarative data binding ##

You can bind properties in your component to  Toolkit supports declarative data binding using the "double-mustache" syntax (`{{"{{"}}}}`) from Model Driven Views. The `{{"{{ "}}}}` is replaced by the value of the property referenced between the brackets.

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

A public property declared in the `attributes` attribute is initially set to `undefined`. You can provide a more appropriate default value to the property in the comopnent's `publish` block, as shown below. 

{% include samples/tk-element-property-public-publish.html %}

<!-- ### Change watching ###

You can also 
 -->

### Accessing public properties on an component ###

A component's public properties can be accessed from its custom element, as shown below.

{% include samples/tk-element-public-access.html %}

<script>
window.addEventListener("WebComponentsReady", function() {
  console.log("tk-element-public-access's owner is: " + document.querySelector("tk-element-public-access").owner);
});
</script>        

### Automatic node finding ###

Shadow DOM is a self-contained document-like subtree; id‚Äôs in that subtree do not interact with id‚Äôs in other trees. Each g-component generates a map of id‚Äôs  to node references in the component‚Äôs template. This map is accessible as `this.$` to the component. 

{% include samples/tk-node-finding.html %}
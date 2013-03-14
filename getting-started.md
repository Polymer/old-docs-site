---
layout: default-with-platform
title: Getting started
pygments: true
components:
- toolkitchensink/components/g-component.html
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
- toolkit/components/g-panels.html
- toolkit/components/g-tabs.html
---

### Basics ###

The basics of using Toolkitchen are simple:

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

<h2>Components</h2>

Components are the core building blocks of Toolkit-based applications. You create applications by assembling components together, either ones provided by the Toolkit or that you create yourself.

<h3> Basic custom element </h3>

The platform features of Toolkitchen enable you to load and display custom elements. 

{% include samples/basic-element.html %}

## Custom element with Toolkit features ###

All Toolkit components are extensions of the canonical g-component (src/g-component.html). This component is also sometimes called the Toolkit kernel. The g-component is loaded with the `<link>` tag (like other components) but you don't create instances of it.

To enable a custom element with Toolkit features, you need to do two things:

* Load the Toolkit kernel (`/toolkit/component/g-component.html`). 
* Add a `<script/>` element that includes the `component()` initializer. THis endows the custom element with Toolkit features, such as data binding and event mapping.

In the following sample we convert our basic custom element into a g-component named `tk-element`.

{% include samples/tk-element.html %}

### Add a property ###

The `component()` initializer takes an object as a parameter whose members define the properties and methods that belong to our component.

{% include samples/tk-element-property.html %}

Now that we've added a property we can use data binding to display its value in the DOM.

### Adding a ready() lifecyle method ###

When a component has finished initializing itself, it calls its `ready` method, if it exists.

{% include samples/tk-element-ready.html %}

### Declarative data binding ###

Toolkit supports declarative data binding using the `{{"{{"}}}}` syntax from Model Driven Views. Data binding in Toolkit is not one-time string replacement but applies for the life of the component. Data binding is two-way.

{% include samples/tk-element-databinding.html %}

#### Binding to markup

You can use binding expressions in most HTML markup, except for tag names themselves. In the following example, we create a new property on our component named `color` whose value is bound to the value of the `color` style applied to the custom element.

{% include samples/tk-element-databinding-color.html %}

### Two-way binding between components ###

{% include samples/tk-twoway-binding.html %}

<h3>About protected and public component scopes</h3>

Components have both protected and public properties. By default, properties you define in a component() initializer are protected, meaning they are only directly accessible with...

### Making properties public ###

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

## Declarative event mapping ##

Toolkit supports scoped declarative binding. This means you can declare event handlers in markup, and the handlers will map events to the component instance receiving the event.

{% include samples/tk-element-event-binding.html %}

<!--## About 'this'  ##  TODO: Explain about this in protected scope, etc.  -->

### Automatic node finding ###

Shadow DOM is a self-contained document-like subtree; id’s in that subtree do not interact with id’s in other trees. Each g-component generates a map of id’s  to node references in the component’s template. This map is accessible as `this.$` to the component. 

{% include samples/tk-node-finding.html %}


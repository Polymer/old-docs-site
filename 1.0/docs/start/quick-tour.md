---
layout: default
type: start
shortname: Start
title: Quick tour of Polymer
subtitle: Get started
---

<style>
.learnmore {
  text-transform: uppercase;
}
</style>


{% include toc.html %}

{{site.project_title}} makes it simple to create web components, declaratively.

Custom elements can leverage {{site.project_title}}'s special features to reduce boilerplate
and make it even easier to build complex, interactive elements:

- Registering elements
- Lifecycle callbacks
- Property observation
- Local DOM template
- Data binding

In this section you can take a quick tour of the {{site.project_title}} library,
without installing anything. Click the **Edit on Plunker** button to open any
of the samples in an interactive sandbox.

See the [Developer guide](../devguide/feature-overview.html) for
detailed information on each of these features.

### Register an element {#register}

To register a new element, call the `{{site.project_title}}` function, which 
_registers_ a new element with the browser. Registering an element associates
a tag name with a prototype, so you can add properties and methods to your custom
element. The custom element's name **must contain a dash (-)**. 

The {{site.project_title}} function takes as an 
argument an object that defines your element's prototype. 

<demo-tabs selected="0" demoSrc="../../samples/start/proto-element/manifest.json">
  <demo-tab heading="proto-element.html">
{% highlight html %}
<link rel="import"
      href="bower_components/polymer/polymer.html">

{% include_external /samples/start/proto-element/proto-element.html docs-sample version_prefix:1.0 %}
{% endhighlight %}
  </demo-tab>
  <demo-tab heading="index.html">
{% highlight html %}
<!DOCTYPE html>
<html>
  <head>
    <script src="bower_components/webcomponentsjs/webcomponents-lite.min.js"></script>
    <link rel="import" href="proto-element.html">
  </head>
  <body>
    <proto-element></proto-element>
  </body>
</html>
{% endhighlight %}
  </demo-tab>
  <div class="result">
    <iframe frameborder="0" src="../../samples/start/proto-element/index.html" width="100%" height="200"></iframe>
  </div>
</demo-tabs>

This sample uses a lifecycle callback 
to add contents to the `<proto-element>` when it's initialized. 
When a custom element finishes its initialization, the `ready` lifecycle callback is called.
The `ready` callback is a great place to do constructor-like initialization work.

<p>
  <a href="../devguide/registering-elements.html">
    <paper-button>
      Learn more: element registration
    </paper-button>
  </a>
</p>

<p>
  <a href="../devguide/registering-elements.html#lifecycle-callbacks">
    <paper-button>
      Learn more: lifecycle callbacks
    </paper-button>
  </a>
</p>

### Add local DOM

Many elements include some internal DOM nodes to implement the element's UI and behavior. 
{{site.project_title}} calls this _local DOM_, and it provides an easy way to specify it:

<demo-tabs selected="0" demoSrc="../../samples/start/dom-element/manifest.json">
  <demo-tab heading="dom-element.html">
{% highlight html %}
<link rel="import"
      href="bower_components/polymer/polymer.html">

{% include_external /samples/start/dom-element/dom-element.html docs-sample version_prefix:1.0 %}
{% endhighlight %}
  </demo-tab>
  <demo-tab heading="index.html">
{% highlight html %}
<!DOCTYPE html>
<html>
  <head>
    <script src="bower_components/webcomponentsjs/webcomponents-lite.min.js"></script>
    <link rel="import" href="dom-element.html">
  </head>
  <body>
    <dom-element></dom-element>
  </body>
</html>
{% endhighlight %}
  </demo-tab>
  <div class="result">
    <iframe frameborder="0" src="../../samples/start/dom-element/index.html" width="100%" height="200"></iframe>
  </div>
</demo-tabs>

Local DOM is encapsulated inside the element. 

<p>
  <a href="../devguide/local-dom.html">
    <paper-button>
      Learn more: local DOM
    </paper-button>
  </a>
</p>

### Compose with local DOM

Local DOM lets you control _composition_. The element's children can be _distributed_
so they render as if they were inserted into the local DOM tree.

This example creates a simple tag that decorates an image by wrapping it
with a styled `<div>` tag.

<demo-tabs selected="0" demoSrc="../../samples/start/picture-frame/manifest.json">
  <demo-tab heading="picture-frame.html">
{% highlight html %}
<link rel="import"
      href="bower_components/polymer/polymer.html">

{% include_external /samples/start/picture-frame/picture-frame.html docs-sample version_prefix:1.0 %}
{% endhighlight %}
  </demo-tab>
  <demo-tab heading="index.html">
{% highlight html %}
<!DOCTYPE html>
<html>
  <head>
    <script src="bower_components/webcomponentsjs/webcomponents-lite.min.js"></script>
    <link rel="import" href="picture-frame.html">
  </head>
  <body>
    <picture-frame>
      <img src="images/p-logo.svg">
    </picture-frame>
  </body>
</html>
{% endhighlight %}
  </demo-tab>
  <div class="result">
    <iframe frameborder="0" src="../../samples/start/picture-frame/index.html" width="100%" height="100"></iframe>
  </div>
</demo-tabs>


**Note:** The CSS styles defined inside the `<dom-module>` are _scoped_ to the element's local DOM. 
So the `div` rule here only affects `<div>` tags inside `<picture-frame>`.
{: .alert .alert-info }

<p>
  <a href="../devguide/local-dom.html#dom-distribution">
    <paper-button>
      Learn more: Composition & distribution
    </paper-button>
  </a>
</p>

### Use data binding

Of course, it's not enough to have static local DOM. You usually want to have your element update
its local DOM dynamically.

Data binding is a great way to quickly propagate changes in your element and reduce boilerplate code. 
You can bind properties in your component using the "double-mustache" syntax (`{%raw%}{{}}{%endraw%}`). 
The `{%raw%}{{}}{%endraw%}` is replaced by the value of the property referenced between the brackets.


<demo-tabs selected="0" demoSrc="../../samples/start/name-tag/manifest.json">
  <demo-tab heading="name-tag.html">
{% highlight html %}
<link rel="import"
      href="bower_components/polymer/polymer.html">

{% include_external /samples/start/name-tag/name-tag.html docs-sample version_prefix:1.0 %}
{% endhighlight %}
  </demo-tab>
  <demo-tab heading="index.html">
{% highlight html %}
<!DOCTYPE html>
<html>
  <head>
    <script src="bower_components/webcomponentsjs/webcomponents-lite.min.js"></script>
    <link rel="import" href="name-tag.html">
  </head>
  <body>
    <name-tag></name-tag>
  </body>
</html>
{% endhighlight %}
  </demo-tab>
  <div class="result">
    <iframe frameborder="0" src="../../samples/start/name-tag/index.html" width="100%" height="200"></iframe>
  </div>
</demo-tabs>

<p>
  <a href="../devguide/data-binding.html">
    <paper-button>
      Learn more: data binding
    </paper-button>
  </a>
</p>


### Declare a property

Properties are an important part of an element's public API. {{site.project_title}} 
_declared properties_ support a number of common patterns for properties — setting default
values, configuring properties from markup, observing property changes, and more.

In the following example, we add a declared `owner` property with a default value, 
and configure it in `index.html`.

<demo-tabs selected="0" demoSrc="../../samples/start/configurable-name-tag/manifest.json">
  <demo-tab heading="configurable-name-tag.html">
{% highlight html %}
<link rel="import"
      href="bower_components/polymer/polymer.html">

{% include_external /samples/start/configurable-name-tag/configurable-name-tag.html docs-sample version_prefix:1.0 %}
{% endhighlight %}
  </demo-tab>
  <demo-tab heading="index.html">
{% highlight html %}
<!DOCTYPE html>
<html>
  <head>
    <script src="bower_components/webcomponentsjs/webcomponents-lite.min.js"></script>
    <link rel="import" href="configurable-name-tag.html">
  </head>
  <body>
    <!-- configure a property from markup by setting
         the corresponding attribute                 -->
    <configurable-name-tag owner="Scott"></configurable-name-tag>
  </body>
</html>
{% endhighlight %}
  </demo-tab>
  <div class="result">
    <iframe frameborder="0" src="../../samples/start/configurable-name-tag/index.html" width="100%" height="200"></iframe>
  </div>
</demo-tabs>

<p>
  <a href="../devguide/properties.html">
    <paper-button>
      Learn more: declared properties
    </paper-button>
  </a>
</p>

### Bind to a property

In addition to text content, you can bind to an element's _properties_ (using
`property-name="{%raw%}{{binding}}{%endraw%}"`). {{site.project_title}} properties 
can optionally support two-way binding. 

This example uses two-way binding: binding the value of a custom input element (`iron-input`)
to the element's `owner` property, so it's updated as the user types.

<demo-tabs selected="0" demoSrc="../../samples/start/editable-name-tag/manifest.json">
  <demo-tab heading="editable-name-tag.html">
{% highlight html %}
<link rel="import"
      href="bower_components/polymer/polymer.html">
<!-- import the iron-input custom element -->
<link rel="import"
      href="bower_components/iron-input/iron-input.html">

{% include_external /samples/start/editable-name-tag/editable-name-tag.html docs-sample version_prefix:1.0 %}
{% endhighlight %}
  </demo-tab>
  <demo-tab heading="index.html">
{% highlight html %}
<!DOCTYPE html>
<html>
  <head>
    <script src="bower_components/webcomponentsjs/webcomponents-lite.min.js"></script>
    <link rel="import" href="editable-name-tag.html">
  </head>
  <body>
    <editable-name-tag></editable-name-tag>
  </body>
</html>
{% endhighlight %}
  </demo-tab>
  <div class="result">
    <iframe frameborder="0" src="../../samples/start/editable-name-tag/index.html" width="100%" height="200"></iframe>
  </div>
</demo-tabs>

**Note:** The `is="iron-input"` attribute indicates the input is a _type-extension_ custom 
element; the element name is `iron-input`, and it _extends_ the native `<input>` element. 
{: .alert .alert-info }


## Next steps {#nextsteps}

Now that you know how to create your own elements, [Get the code](getting-the-code.html) 
to create your first {{site.project_title}} project, or dive deeper in the
[Developer guide](../devguide/feature-overview.html). 
Continue on to:

<p>
<a href="getting-the-code.html">
  <paper-button raised><core-icon icon="arrow-forward"></core-icon>Get the code</paper-button>
</a>
</p>

<p>
<a href="../devguide/feature-overview.html">
  <paper-button raised><core-icon icon="arrow-forward"></core-icon>Developer guide</paper-button>
</a>
</p>




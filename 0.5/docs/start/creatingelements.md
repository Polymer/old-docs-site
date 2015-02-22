---
layout: default
type: start
shortname: Start
title: Polymer in 10 minutes
subtitle: Creating elements
---

{% include toc.html %}

{{site.project_title}} makes it simple to create web components, declaratively.
Custom elements are defined using our custom element,  `<polymer-element>`, and can leverage
{{site.project_title}}'s special features. These features reduce boilerplate
and make it even easier to build complex, web component-based applications:

- [Two-way data binding](../polymer/databinding.html)
- [Declarative event handling](../polymer/polymer.html#declarative-event-mapping)
- [Declarative inheritance](../polymer/polymer.html#extending-other-elements)
- [Property observation](../polymer/polymer.html#observeprops)

## Setup {#basics}

### 1. Install {{site.project_title}} {#install}

Install the latest version of {{site.project_title}} as described in
[Getting the code](getting-the-code.html).

If you want to play with {{site.project_title}} without installing anything,
skip to [Using {{site.project_title}}'s features](#features). You can run and
edit the samples online using [Plunker](http://plnkr.co/).

### 2. Build a {{site.project_title}} element {#createpolyel}

{{site.project_title}} provides extra goodies for creating declarative, souped-up custom elements. We call these "{{site.project_title}} elements". From the outside they look just like any other DOM element, but inside they're filled with handy features like two-way data binding and other bits of [{{site.project_title}} magic](../polymer/polymer.html). These features make it easy to build complex components with much less code.

To create a new element:

1. Load the [{{site.project_title}} core](../polymer/polymer.html) (`polymer.html`).
2. Declare your custom element using `<polymer-element>`.

In the following example, we define a new element named `<my-element>`, save
it to a file `elements/my-element.html`, and use an HTML Import to load the `polymer.html` dependency.

**my-element.html**

    <link rel="import" href="../bower_components/polymer/polymer.html">

    <polymer-element name="my-element" noscript>
      <template>
        <span>Hello from <b>my-element</b>. This is my Shadow DOM.</span>
      </template>
    </polymer-element>

Two items to notice:

* The `name` attribute is required and **must** contain a "-". It specifies the name of the HTML tag you'll instantiate in markup (in this case `<my-element>`).

* The `noscript` attribute indicates that this is a simple element that doesn't include any script. An element declared with `noscript` is registered automatically.

#### Reusing other elements {#reuse}

By composing simple elements together we can build richer, more complex components. To reuse other elements in your `<polymer-element>`, install the element in your app:

    bower install Polymer/core-ajax

and include an import that loads the new dependency in `my-element.html`:

{%raw%}
    <link rel="import" href="../bower_components/polymer/polymer.html">
    <link rel="import" href="../bower_components/core-ajax/core-ajax.html">

    <polymer-element name="my-element" noscript>
      <template>
        <span>I'm <b>my-element</b>. This is my Shadow DOM.</span>
        <core-ajax url="http://example.com/json" auto response="{{resp}}"></core-ajax>
        <textarea value="{{resp}}"></textarea>
      </template>
    </polymer-element>
{%endraw%}

### 3. Create an app {#creatapp}

Lastly, create an `index.html` that imports your new element. Remember to include `webcomponents.min.js`
to load polyfills for the native APIs.

Here's the full example:

    <!DOCTYPE html>
    <html>
      <head>
        <!-- 1. Load platform support before any code that touches the DOM. -->
        <script src="bower_components/webcomponentsjs/webcomponents.min.js"></script>
        <!-- 2. Load the component using an HTML Import -->
        <link rel="import" href="elements/my-element.html">
      </head>
      <body>
        <!-- 3. Declare the element by its tag. -->
        <my-element></my-element>
      </body>
    </html>

**Note:** You must run your app from a web server for the [HTML Imports](../../platform/html-imports.html) to work properly. They cannot be loaded from `file://` due to the browser's security restrictions.
{: .alert .alert-info }

Your final directory structure should look something like this:

    yourapp/
      bower_components/
        webcomponentsjs/
        polymer/
        core-ajax/
      elements/
        my-element.html
      index.html

Now that you've got the basic setup, it's time to start using the features!

## Using {{site.project_title}}'s features {#features}

{{site.project_title}} provides a number of sugaring APIs for authoring
web components. Below are a few of the concepts. Consult the [API reference](../polymer/polymer.html) for
detailed information on each of these features.

### Add properties and methods {#propertiesmethods}

When you're creating a new element, you'll often need to expose a [public API](../polymer/polymer.html#published-properties) so users can configure it. To define a public API, include a `<script>` tag that calls the `{{site.project_title}}(...)` constructor.  The `{{site.project_title}}(...)` constructor is a convenience wrapper for [`document.registerElement`](../../platform/custom-elements.html#documentregister), but also endows the element with special features like data binding and event mapping. The {{site.project_title}} constructor takes as an argument an object that defines your element's prototype.

<link rel="import" href="components/proto-element/proto-element.html">

<demo-tabs selected="0" demoSrc="components/proto-element/manifest.json">
  <demo-tab heading="proto-element.html">
{% highlight html %}
<link rel="import"
      href="../bower_components/polymer/polymer.html">

{% include_relative components/proto-element/proto-element.html %}
{% endhighlight %}
  </demo-tab>
  <demo-tab heading="index.html">
{% highlight html %}
<!DOCTYPE html>
<html>
  <head>
    <script src="webcomponents.min.js"></script>
    <link rel="import" href="proto-element.html">
  </head>
  <body>
    <proto-element></proto-element>
  </body>
</html>
{% endhighlight %}
  </demo-tab>
  <div class="result">
    <proto-element></proto-element>
  </div>
</demo-tabs>

### Adding lifecycle methods

[Lifecycle callbacks](../polymer/polymer.html#lifecyclemethods) are special methods you can define on your element which fire when the element goes through important transitions.

When a custom element has been registered it calls its `created()` callback (if one has been defined). When {{site.project_title}} finishes its initialization, the `ready()` method is called.
The `ready` callback is a great place to do constructor-like initialization work.

<link rel="import" href="components/ready-element/ready-element.html">

<demo-tabs selected="0" demoSrc="components/ready-element/manifest.json">
  <demo-tab heading="ready-element.html">
{% highlight html %}
<link rel="import"
      href="../bower_components/polymer/polymer.html">

{% include_relative components/ready-element/ready-element.html  %}

{% endhighlight %}
  </demo-tab>
  <demo-tab heading="index.html">
{% highlight html %}
<!DOCTYPE html>
<html>
  <head>
    <script src="webcomponents.min.js"></script>
    <link rel="import" href="ready-element.html">
  </head>
  <body>
    <ready-element></ready-element>
  </body>
</html>
{% endhighlight %}
  </demo-tab>
  <div class="result">
    <ready-element></ready-element>
  </div>
</demo-tabs>

Learn more about all of the [lifecycle callbacks](../polymer/polymer.html#lifecyclemethods).

### Declarative data binding

Data binding is a great way to quickly propagate changes in your element and reduce boilerplate code. You can bind properties in your component using the "double-mustache" syntax (`{%raw%}{{}}{%endraw%}`). The `{%raw%}{{}}{%endraw%}` is replaced by the value of the property referenced between the brackets.

<link rel="import" href="components/name-tag/name-tag.html">

<demo-tabs selected="0" demoSrc="components/name-tag/manifest.json">
  <demo-tab heading="name-tag.html">
{% highlight html %}
<link rel="import"
      href="../bower_components/polymer/polymer.html">

{% include_external /docs/start/components/name-tag/name-tag.html version_prefix:0.5 %}
{% endhighlight %}
  </demo-tab>
  <demo-tab heading="index.html">
{% highlight html %}
<!DOCTYPE html>
<html>
  <head>
    <script src="webcomponents.min.js"></script>
    <link rel="import" href="name-tag.html">
  </head>
  <body>
    <name-tag></name-tag>
  </body>
</html>
{% endhighlight %}
  </demo-tab>
  <div class="result">
    <name-tag></name-tag>
  </div>
</demo-tabs>

Note: {{site.project_title}}'s data-binding is powered under the covers by a sub-library called [TemplateBinding](../polymer/template.html), designed for other libraries to build on top of.
{: .alert .alert-info}

#### Binding to markup

You can use binding expressions in most HTML markup, except for tag names themselves. In the following example, we create a new property on our component named `color` whose value is bound to the value of the `color` style applied to the custom element. Bindings ensure that any time a property like `color` is changed, the new value will be propagated to all binding points.

<link rel="import" href="components/fav-color/fav-color.html">

<demo-tabs selected="0" demoSrc="components/fav-color/manifest.json">
  <demo-tab heading="fav-color.html">
{% highlight html %}
<link rel="import"
      href="../bower_components/polymer/polymer.html">

{% include_external /docs/start/components/fav-color/fav-color.html version_prefix:0.5 %}
{% endhighlight %}
  </demo-tab>
  <demo-tab heading="index.html">
{% highlight html %}
<!DOCTYPE html>
<html>
  <head>
    <script src="webcomponents.min.js"></script>
    <link rel="import" href="fav-color.html">
  </head>
  <body>
    <fav-color></fav-color>
  </body>
</html>
{% endhighlight %}
  </demo-tab>
  <div class="result">
    <fav-color></fav-color>
  </div>
</demo-tabs>

#### Binding between components and built-in elements {#bindingtobuiltin}

You can use bindings with built-in elements just like you would with Polymer elements. This is a great way to leverage existing APIs to build complex components. The following example demonstrates binding component properties to attributes of native input elements.

<link rel="import" href="components/age-slider/age-slider.html">

<demo-tabs selected="0" demoSrc="components/age-slider/manifest.json">
  <demo-tab heading="age-slider.html">
{% highlight html %}
<link rel="import"
      href="../bower_components/polymer/polymer.html">

{% include_external /docs/start/components/age-slider/age-slider.html version_prefix:0.5 %}
{% endhighlight %}
  </demo-tab>
  <demo-tab heading="index.html">
{% highlight html %}
<!DOCTYPE html>
<html>
  <head>
    <script src="webcomponents.js"></script>
    <link rel="import" href="age-slider.html">
  </head>
  <body>
    <age-slider></age-slider>
  </body>
</html>
{% endhighlight %}
  </demo-tab>
  <div class="result">
    <age-slider></age-slider>
  </div>
</demo-tabs>

**Note:** Giving `age` an initial value of `25` gives {{site.project_title}}
a hint that this property is an integer.
{: .alert alert-info}

In this example, `nameChanged()` defines a property changed watcher. {{site.project_title}} will then call this method any time the `name` property is updated. Read more about [changed watchers](../polymer/polymer.html#change-watchers).

### Publishing properties {#publishing}

Published properties can be used to define an element's "public API". {{site.project_title}}
establishes two-way data binding for published properties and provides access
to the property's value using `{%raw%}{{}}{%endraw%}`.

_Publish_ a property by listing it in the `attributes` attribute in your `<polymer-element>`. Properties declared this way are initially `null`. To provide a more appropriate default value, include the same property name directly in your prototype.

The following example defines two data-bound properties on the element, `owner` and `color`,
and gives them default values:

<link rel="import" href="components/color-picker/color-picker.html">

<demo-tabs selected="0" demoSrc="components/color-picker/manifest.json">
  <demo-tab heading="color-picker.html">
{% highlight html %}
<link rel="import"
      href="../bower_components/polymer/polymer.html">

{% include_external /docs/start/components/color-picker/color-picker.html version_prefix:0.5 %}
{% endhighlight %}
  </demo-tab>
  <demo-tab heading="index.html">
{% highlight html %}
<!DOCTYPE html>
<html>
  <head>
    <script src="webcomponents.js"></script>
    <link rel="import" href="color-picker.html">
  </head>
  <body>
    <color-picker owner="Scott" color="blue"></color-picker>
  </body>
</html>
{% endhighlight %}
  </demo-tab>
  <div class="result">
    <color-picker owner="Scott" color="blue"></color-picker>
  </div>
</demo-tabs>

In this example the user overrides the defaults for `owner` and `color`
by configuring the element with initial attribute values (e.g. `<color-picker owner="Scott" color="blue">`).

**Note**: When binding  a property that takes a type other than String, it's important to [hint a property's type](..//polymer/polymer.html#attrhinting). {{site.project_title}} relies on this information to correctly serialize and de-serialize values.
{: .alert .alert-success }

[Learn more about published properties](../polymer/polymer.html#published-properties).

### Automatic node finding

The use of the `id` attribute has traditionally been discouraged as an anti-pattern because the document requires element IDs to be unique. Shadow DOM, on the other hand, is a self-contained document-like subtree; IDs in that subtree do not interact with IDs in other trees. This means the use of IDs in Shadow DOM is not only permissible, it's actually encouraged. Each {{site.project_title}} element generates a map of IDs to node references in the element's template. This map is accessible as `$` on the element and can be used to quickly select the node you wish to work with.

<link rel="import" href="components/editable-color-picker/editable-color-picker.html">

<demo-tabs selected="0" demoSrc="components/editable-color-picker/manifest.json">
  <demo-tab heading="editable-color-picker.html">
{% highlight html %}
<link rel="import"
      href="../bower_components/polymer/polymer.html">

{% include_external /docs/start/components/editable-color-picker/editable-color-picker.html version_prefix:0.5 %}
{% endhighlight %}
  </demo-tab>
  <demo-tab heading="index.html">
{% highlight html %}
<!DOCTYPE html>
<html>
  <head>
    <script src="webcomponents.js"></script>
    <link rel="import" href="editable-color-picker.html">
  </head>
  <body>
    <editable-color-picker></editable-color-picker>
  </body>
</html>
{% endhighlight %}
  </demo-tab>
  <div class="result">
    <editable-color-picker></editable-color-picker>
  </div>
</demo-tabs>

[Learn more about automatic node finding](../polymer/polymer.html#automatic-node-finding)

## Next steps {#nextsteps}

Now that you know how to create your own elements, follow the
[tutorial](tutorial/intro.html) to create your first
{{site.project_title}} app, or dive deeper and read up on
[{{site.project_title}}'s core API](../polymer/polymer.html).
Continue on to:

<a href="../polymer/polymer.html">
  <paper-button raised><core-icon icon="arrow-forward"></core-icon>API developer guide</paper-button>
</a>

<a href="tutorial/intro.html">
  <paper-button raised><core-icon icon="arrow-forward"></core-icon>Your first {{site.project_title}} app</paper-button>
</a>


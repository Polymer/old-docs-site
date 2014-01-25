---
layout: default
type: start
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

## Setup {#basics}

### 1. Install the requirements {#install}

The first step when starting a new app is to [install the latest builds](/getting-the-code.html) of `platform.js` and {{site.project_title}} into your app's root directory:

    bower install --save Polymer/platform Polymer/polymer

Bower adds a `bower_components/` folder and fills it with these packages. The `--save` flag
adds these items as dependencies in your app's bower.json.

### 2. Build a {{site.project_title}} element {#createpolyel}

{{site.project_title}} provides extra goodies for creating declarative, souped-up custom elements. We call these "{{site.project_title}} elements". To create one, follow these steps:

1. Load [{{site.project_title}} core](/docs/polymer/polymer.html) (`polymer.html`).
1. Declare your custom element using `<polymer-element>`.

In the following example, we define a new element named `<tk-element>`, save
it to a file `elements/tk-element.html`, and use an HTML Import to load the `polymer.html` dependency.

**tk-element.html**

    <link rel="import" href="../bower_components/polymer/polymer.html">

    <polymer-element name="tk-element" noscript>
      <template>
        <span>I'm <b>tk-element</b>. This is my Shadow DOM.</span>
      </template>
    </polymer-element>

**Reminder:** The `name` attribute is required and must contain a "-". It specifies the name of the HTML
tag you'll instantiate in markup (in this case `<tk-element>`).
{: .alert .alert-info }

#### Reuse other elements {#reuse}

To reuse other elements in your `<polymer-element>`, install the element in your app:

    bower install Polymer/polymer-ajax

and include an import to load the new dependency in `tk-element.html`:

{%raw%}
    <link rel="import" href="../bower_components/polymer/polymer.html">
    <link rel="import" href="../bower_components/polymer-ajax/polymer-ajax.html">

    <polymer-element name="tk-element" noscript>
      <template>
        <span>I'm <b>tk-element</b>. This is my Shadow DOM.</span>
        <polymer-ajax url="http://example.com/json" auto response="{{resp}}"></polymer-ajax>
        <textarea value="{{resp}}"></textarea>
      </template>
    </polymer-element>
{%endraw%}

### 3. Create an app {#creatapp}

Lastly, create an `index.html` that imports your new element. Include `platform.js`
to load polyfills for the native APIs. **Be sure to include this file before any code that touches the DOM.**

Here's the full example:

    <!DOCTYPE html>
    <html>
      <head>
        <!-- 1. Load platform support before any code that touches the DOM. -->
        <script src="bower_components/platform/platform.js"></script>
        <!-- 2. Load the component using an HTML Import -->
        <link rel="import" href="elements/tk-element.html">
      </head>
      <body>
        <!-- 3. Declare the element by its tag. -->
        <tk-element></tk-element>
      </body>
    </html>

**Note:** You must run your app from a web server for the [HTML Imports](/platform/html-imports.html)
polyfill to work properly. This requirement goes away when the API is available natively.
{: .alert .alert-info }

Your final directory structure should look something like this:

    yourapp/
      bower_components/
        platform/
        polymer/
      elements/
        tk-element.html
      index.html

Now that you've got the basic setup, it's time to start using the features!

## Using {{site.project_title}}'s features {#features}

{{site.project_title}} provides a number of sugaring APIs for authoring
web components. Below are a few of the concepts. Consult the [API referencee](/docs/polymer/polymer.html) for
detailed information on each of these features.

### Add properties/methods to your component

If you need to add public methods/properties to your element,
include a `<script>` that calls `{{site.project_title}}('your-tagname')`.
`{{site.project_title}}(..)` is a convenience wrapper for [`document.registerElement`](/platform/custom-elements.html#documentregister), but also endows the element with special features like
data binding and event mapping. Its first argument is the name of the element
you're creating. The second argument (optional) is an object that defines your
element's `prototype`. 

{% include samples/tk-element-proto.html %}

### Adding lifecycle methods

The [lifecycle callbacks](/docs/polymer/polymer.html#lifecyclemethods) are special methods you
can define on your element.

When a custom element has been registered it calls its `created()` callback (if one has been defined). When {{site.project_title}} finishes its initialization, the `ready()` method is called.
The `ready` callback is a great place to do constructor-like initialization work.

{% include samples/tk-element-created.html %}

### Declarative data binding

You can bind properties in your component using declarative data binding and the "double-mustache" syntax (`{%raw%}{{}}{%endraw%}`). The `{%raw%}{{}}{%endraw%}` is replaced by the value of the property referenced between the brackets.

{% include samples/tk-element-databinding.html %}

#### Binding to markup

You can use binding expressions in most HTML markup, except for tag names themselves. In the following example, we create a new property on our component named `color` whose value is bound to the value of the `color` style applied to the custom element.

{% include samples/tk-element-databinding-color.html %}

#### Binding between components and native elements

The following example demonstrates binding component properties to attributes of native input elements.

{% include samples/tk-binding-to-elements.html %}

**Note:** Giving `age` an initial value `25` gives {{site.project_title}}
a hint that this property is an integer.
{: .alert alert-info}

### Publishing properties

Published properties can be used to define an element's "public API". {{site.project_title}}
establishes two-way data binding for published properties and provides access
to the property's value using `{%raw%}{{}}{%endraw%}`.

_Publish_ a property by listing it in the `attributes` attribute in your `<polymer-element>`. Properties declared this way are initially `null`. To provide a more appropriate default value, include the same property name directly in your prototype (as seen below).

The following example defines two data-bound properties on the element, `owner` and `color`,
and gives them default values:

{% include samples/tk-element-property-public.html %}

Note: In this example the user overrides the defaults for `owner` and `color`
by configuring the element with initial attribute values (e.g. `<tk-element-property-public owner="Scott" color="blue">`).

[Learn more about published properties](/docs/polymer/polymer.html#published-properties)

### Automatic node finding

Shadow DOM is a self-contained document-like subtree; id's in that subtree do not interact with id's in other trees. Each {{site.project_title}} element generates a map of id's to node references in the element's template. This map is accessible as `$` on the element. 

{% include samples/tk-node-finding.html %}

[Learn more about automatic node finding](/docs/polymer/polymer.html#automatic-node-finding)

## Where to go from here?

Read up on [{{site.project_title}}'s core API referencee](/docs/polymer/polymer.html).

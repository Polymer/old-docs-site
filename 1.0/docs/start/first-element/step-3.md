---
layout: default
type: start
shortname: Start
title: "Step 3: Use data binding and properties"
subtitle: Build your first Polymer element
---


Right now, the element doesn't do much. In this step, you'll give it a basic
API, allowing you to configure the icon from markup, using an attribute, or
from JavaScript, using a property.

First, a bit of data binding. Find the `<iron-icon>` element and change the value of the `icon` attribute from `"polymer"` to  "`[[toggleIcon]]`".

#### icon-toggle.html
{: .caption }


<pre class="prettyprint">
&lt;!-- local DOM goes here -->
&lt;iron-icon icon="[[toggleIcon]]">
&lt;/iron-icon>
</pre>

Key information:

  * `toggleIcon` is a <em>property</em> you'll define on the toggle button element. It doesn't have a default value
yet.
  * The `icon="[[toggleIcon]]" `assignment is a <em>data binding</em>. It links your element's `toggleIcon` <em>property</em> with the `<iron-icon>`'s `icon` property.

You could now use your element and set the `toggleIcon` property in markup or using JavaScript, as shown in the following examples. <em>(You don't need to add this code to your project.)</em>

#### Example—setting the icon using markup
{: .caption }


<pre class="prettyprint">
&lt;icon-toggle toggle-icon="favorite">&lt;/icon-toggle>
</pre>


#### Example—setting the icon from JavaScript
{: .caption }


<pre class="prettyprint">
var myToggle = document.querySelector('icon-toggle');
myToggle.toggleIcon = "favorite";
</pre>


**Learn more: attribute and property names.** You'll note that the markup example
uses `toggle-icon`, not `toggleIcon`. Polymer represents camelCase property names
using dash-case attribute names. To learn more, see <a href="https://www.polymer-project.org/1.0/docs/devguide/properties.html#property-name-mapping">Property
name to attribute name mapping</a> in the Polymer library docs.
{: .alert .alert-info }

Next, add a declaration for the `toggleIcon` property.

Find the script tag and add the following `properties` object to the element's prototype:

#### icon-toggle.html
{: .caption }


<pre class="prettyprint">
&lt;script>
  Polymer({
    /* this is the element's prototype */
    is: 'icon-toggle',
    properties: {
      toggleIcon: String
    }
  });
&lt;/script>
&lt;/dom-module>
</pre>

Key information:

  * Declaring a property in the `properties` object is a good idea if the property is going to be part of your element's
public API.
  * A simple property declaration like this one just includes the type (in this
case, `String`).



**Learn more: deserializing attributes.** The declared property type affects how Polymer converts, or <em>deserializes</em>
the attribute value (always a string value) into a JavaScript property value.
The default is `String`, so the declaration of `toggleIcon` is a formality here.
To learn more, see <a href="https://www.polymer-project.org/1.0/docs/devguide/properties.html#attribute-deserialization">Attribute
deserialization</a> in the Polymer docs.
{: .alert .alert-info }

The `properties` object also supports several more features. Add the following lines to add
support for the `pressed` property:

#### icon-toggle.html
{: .caption }


<pre class="prettyprint">
  Polymer({
    /* this is the element's prototype */
    is: 'icon-toggle',
    properties: {
      toggleIcon: String,
      pressed: {
        type: Boolean,
        value: false,
        notify: true,
        reflectToAttribute: true
      }
    }
  });
</pre>

Key information:

 *   For this more complicated property, you supply a configuration object with
several fields.
*   The `value` specifies the property's [default value](https://www.polymer-project.org/1.0/docs/devguide/properties.html#configure-values).
*   The `notify` property tells Polymer to <em>generate property change events
    </em>when the property value changes. This lets the change be observed by
    other nodes.
*   The `reflectToAttribute` property tells Polymer to
    [update the corresponding attribute when the property changes](https://www.polymer-project.org/1.0/docs/devguide/properties.html#attribute-reflection).
    This lets you style the element using an attribute selector, like
    `icon-toggle[pressed]`.


**Learn more: `notify` and `reflectToAttribute`.** The `notify` and
`reflectToAttribute` properties may _sound_ similar: they both make the element's
state visible to the outside world. `reflectToAttribute` makes the
state visible **in the DOM tree**, so that it's visible to CSS and the
`querySelector` methods. `notify` **makes state changes observable outside the
element**, either using JavaScript event handlers or Polymer
<a href="https://www.polymer-project.org/1.0/docs/devguide/data-binding.html#property-notification">two-way data binding</a>.
{: .alert .alert-info }

Now your element has `pressed` and `toggleIcon` properties working.

Reload the demo, and you should see star and heart icons instead of the
hard-coded icon from the previous step:

<img src="../../../images/first-element/static-toggles.png" alt="Demo showing icon toggles with star and heart icons">


If you're curious about where the stars and hearts come from, you can take a
look at `demo/icon-toggle-demo.html`. You'll see lines like this:


<pre class="prettyprint">
&lt;icon-toggle toggle-icon="star">&lt;/icon-toggle>
&lt;icon-toggle toggle-icon="star" pressed>&lt;/icon-toggle>
</pre>

<div horizontal layout  class="stepnav">
  <a href="step-2.html">
    <paper-button raised><core-icon icon="arrow-back"></core-icon>Step 2: Add local DOM</paper-button>
  </a>
    <a href="step-4.html">
    <paper-button raised><core-icon icon="arrow-forward"></core-icon>Step 4: React to input</paper-button>
  </a>
</div>


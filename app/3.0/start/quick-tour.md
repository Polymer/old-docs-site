---
title: Try Polymer
---

<!-- toc -->

Polymer makes it simple to create web components, declaratively.

New web developers can simply add custom HTML elements on a web page with markup.
It’s just like using the HTML tags you’re already familiar with:

```html
<h1>A heading!</h1>
```

```html
<fancy-thing>A fancy thing!</fancy-thing>
```

Experienced web developers can use Polymer's special features to reduce boilerplate
and make it even easier to build complex, interactive elements. In this tour, you'll
learn how to:

- Register elements
- Use lifecycle callbacks
- Observe properties
- Create shadow DOM with templates
- Use data binding

In this section you can tour the Polymer library,
without installing anything. Click the **Edit on StackBlitz** button to open any
of the samples in an interactive sandbox.

Tap the buttons following each feature to learn more.

### Register an element {#register}

To register a new element, create an ES6 class that extends
`PolymerElement`, then call the `customElements.define` method, which
_registers_ a new element with the browser. Registering an element associates
an element name with a class, so you can add properties and methods to your custom
element. The custom element's name **must start with an ASCII letter and
contain a dash (-)**.

<demo-tabs selected="0" name="qt-1-register" editor-open-file="custom-element.js" project-path="/3.0/start/samples/custom-element">
  <paper-tab slot="tabs">custom-element.js</paper-tab>
  <div>

```js
<!-- include_file 3.0/start/samples/custom-element/custom-element.js -->
```

  </div>
  <paper-tab slot="tabs">index.html</paper-tab>
  <div>

```html
<!-- include_file 3.0/start/samples/custom-element/index.html -->
```

  </div>
</demo-tabs>

Try it out in **StackBlitz**:
* Try modifying the contents of `this.textContent`.
* If you’re familiar with your browser’s developer tools, try printing the
  custom element’s `tagName` property to the console.
  Hint: add `console.log(this.tagName);` to the constructor method!

This sample uses a lifecycle callback
to add contents to the `<custom-element>` when it's initialized.
When a custom element finishes its initialization, the `ready` lifecycle callback is called.
You can use the `ready` callback for one-time initialization work after the element is created.

<p><a href="/{{{polymer_version_dir}}}/docs/devguide/registering-elements" class="blue-button">
  Learn more: element registration
</a></p>

<p><a href="/{{{polymer_version_dir}}}/docs/devguide/registering-elements#lifecycle-callbacks" class="blue-button">
  Learn more: lifecycle callbacks
</a></p>

### Add shadow DOM

Many elements include some internal DOM nodes to implement the element's UI and behavior.
You can use Polymer's DOM templating to create a shadow DOM tree for your element.

<demo-tabs selected="0" name="qt-2-shadow-dom" editor-open-file="dom-element.js" project-path="/3.0/start/samples/dom-element">
  <paper-tab slot="tabs">dom-element.js</paper-tab>
  <div>

```js
<!-- include_file 3.0/start/samples/dom-element/dom-element.js -->
```

  </div>
  <paper-tab slot="tabs">index.html</paper-tab>
  <div>

```html
<!-- include_file 3.0/start/samples/dom-element/index.html -->
```

  </div>
</demo-tabs>

Try it out in **StackBlitz**:
* Try adding some other html elements inside the <template></template> block. For example, add `<h1>A heading!</h1>` or `<a href="stuff.html">A link!</a>`

Shadow DOM is encapsulated inside the element.

<p><a href="/{{{polymer_version_dir}}}/docs/devguide/dom-template" class="blue-button">Learn more: DOM templating</a></p>

### Compose with shadow DOM

Shadow DOM lets you control _composition_. The element's children can be _distributed_
so they render as if they were inserted into the shadow DOM tree.

This example creates a simple tag that decorates an image by wrapping it
with a styled `<div>` tag.

<demo-tabs selected="0" name="qt-3-compose" editor-open-file="picture-frame.js" project-path="/3.0/start/samples/picture-frame">
  <paper-tab slot="tabs">picture-frame.js</paper-tab>
  <div>

```js
<!-- include_file 3.0/start/samples/picture-frame/picture-frame.js -->
```

  </div>
  <paper-tab slot="tabs">index.html</paper-tab>
  <div>

```html
<!-- include_file 3.0/start/samples/picture-frame/index.html -->
```

  </div>
</demo-tabs>

Try it out in **StackBlitz**:
* Try adding a `<div>` to `index.html`; is it affected by the styles in `<picture-frame>`'s shadow DOM?
* Try adding other HTML elements to the DOM template to see how they are positioned relative to the distributed child nodes.

**Note:** The CSS styles defined inside the `<dom-module>` are _scoped_ to the element's shadow DOM.
So the `div` rule here only affects `<div>` tags inside `<picture-frame>`.
{: .alert .alert-info }

<p><a href="/3.0/docs/devguide/shadow-dom#shadow-dom-and-composition" class="blue-button">
Learn more: Composition & distribution</a></p>

### Use data binding

Of course, it's not enough to have static shadow DOM. You usually want to have your element update
its shadow DOM dynamically.

Data binding is a great way to quickly propagate changes in your element and reduce boilerplate code.
You can bind properties in your component using the "double-mustache" syntax (`{%raw%}{{}}{%endraw%}`).
The `{%raw%}{{}}{%endraw%}` is replaced by the value of the property referenced between the brackets.

<demo-tabs selected="0" name="qt-4-data-binding" editor-open-file="name-tag.js" project-path="/3.0/start/samples/name-tag">
  <paper-tab slot="tabs">name-tag.js</paper-tab>
  <div>

```js
<!-- include_file 3.0/start/samples/name-tag/name-tag.js -->
```

  </div>
  <paper-tab slot="tabs">index.html</paper-tab>
  <div>

```html
<!-- include_file 3.0/start/samples/name-tag/index.html -->
```

  </div>
</demo-tabs>

Try it out in **StackBlitz**:
* Try editing the value of the `owner` property.
* Try adding another property and binding it in your component.
  Hint: Add `this.propertyName = 'Property contents';` to the constructor
  and add something like `<p>{{propertyName}}</p>` to the element’s template.

<p><a href="/3.0/docs/devguide/data-binding" class="blue-button">
Learn more: data binding</a></p>

### Declare a property

Properties are an important part of an element's public API. Polymer
_declared properties_ support a number of common patterns for properties—setting default
values, configuring properties from markup, observing property changes, and more.

The following example declares the `owner` property from the last example.
It also shows configuring the owner property from markup in `index.html`.

<demo-tabs selected="0" name="qt-5-declare-property" editor-open-file="configurable-name-tag.js" project-path="/3.0/start/samples/configurable-name-tag">
  <paper-tab slot="tabs">configurable-name-tag.js</paper-tab>
  <div>

```js
<!-- include_file 3.0/start/samples/configurable-name-tag/configurable-name-tag.js -->
```

  </div>
  <paper-tab slot="tabs">index.html</paper-tab>
  <div>

```html
<!-- include_file 3.0/start/samples/configurable-name-tag/index.html -->
```

  </div>
</demo-tabs>

Try it out in **StackBlitz**:
* Try editing the initial value of `owner` in index.html. Observe how this sets the property directly from your HTML.

<p><a href="/3.0/docs/devguide/properties" class="blue-button">
Learn more: declared properties</a></p>

### Bind to a property

In addition to text content, you can bind to an element's _properties_ (using
`property-name="[[binding]]"`). Polymer properties
can optionally support two-way binding, using curly braces (`property-name="{{binding}}"`).

<!--

This example uses two-way binding: binding the value of a property on a parent element to a property
on the child element. When the child element updates the property, the changes are bound to the
parent element.

<demo-tabs selected="0" name="qt-6-bind-property" editor-open-file="parent-element.js" project-path="/3.0/start/samples/parent-element">
  <paper-tab slot="tabs">parent-element.js</paper-tab>
  <div>

```js
<!-- include_file 3.0/start/samples/parent-element/parent-element.js --
```

  </div>
  <paper-tab slot="tabs">child-element.js</paper-tab>
  <div>

```js
<!-- include_file 3.0/start/samples/parent-element/child-element.js --
```

  </div>
  <paper-tab slot="tabs">index.html</paper-tab>
  <div>

```html
<!-- include_file 3.0/start/samples/parent-element/index.html --
```

  </div>
</demo-tabs>

**Note:** `<child-element>` exposes its property to be used in two-way binding by setting the
`reflectToAttribute` and `notify` attributes when the property is declared.
{: .alert .alert-info }
--
<p><a href="/3.0/docs/devguide/data-binding#two-way-bindings" class="blue-button">
Learn more: Two-way binding</a></p>
-->

The following example uses two-way binding: binding the value of a custom input element (`iron-input`)
to the element's `owner` property, so it's updated as the user types.

<demo-tabs selected="0" name="qt-6-bind-property" editor-open-file="editable-name-tag.js" project-path="/3.0/start/samples/editable-name-tag">
  <paper-tab slot="tabs">editable-name-tag.js</paper-tab>
  <div>

```js
<!-- include_file 3.0/start/samples/editable-name-tag/editable-name-tag.js -->
```

  </div>
  <paper-tab slot="tabs">index.html</paper-tab>
  <div>

```html
<!-- include_file 3.0/start/samples/editable-name-tag/index.html -->
```

  </div>
</demo-tabs>

Try it out in **StackBlitz**:
* Edit the placeholder text to see two-way data binding at work.

**Note:** The `<iron-input>` element wraps a native `<input>` element and provides two-way
data binding and input validation.
{: .alert .alert-info }

<p><a href="/3.0/docs/devguide/data-binding#two-way-bindings" class="blue-button">
Learn more: Two-way binding</a></p>

### Using <dom-repeat> for template repeating

The template repeater (`<dom-repeat>`) is a specialized template that binds to an array. It creates one instance of the template's contents for each item in the array.

<demo-tabs selected="0" name="qt-7-dom-repeat" editor-open-file="employee-list.js" project-path="/3.0/start/samples/employee-list">
  <paper-tab slot="tabs">employee-list.js</paper-tab>
  <div>

```js
<!-- include_file 3.0/start/samples/employee-list/employee-list.js -->
```

  </div>
  <paper-tab slot="tabs">index.html</paper-tab>
  <div>

```html
<!-- include_file 3.0/start/samples/employee-list/index.html -->
```

  </div>
</demo-tabs>

Try it out in **StackBlitz**:
* Change the first and last names inside this.employees
* Add another employee by inserting the following item into the array definition:<br/>
  ```js
     {first: 'Shawna', last: 'Williams'}
  ```

Don't forget to make sure your commas are correct!

<p><a href="/3.0/docs/devguide/templates" class="blue-button">
Learn more: Template repeater</a></p>

## Next steps

Now that you understand these fundamental Polymer concepts, you can [build an app with App Toolbox](/3.0/start/toolbox/set-up) or see a [feature overview of the Polymer library](/3.0/docs/devguide/feature-overview).

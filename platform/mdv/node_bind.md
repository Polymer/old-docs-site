---
layout: default
title: Node.bind()
subtitle: MDV
---

{% comment %}
{% include_external polymer-all/mdv/docs/node_bind.md %}
{% endcomment %}

## Basic usage

MDV adds a `bind()` method to all DOM nodes which instructs them to bind the named
property to the data provided. For example:

    var obj = {
      path: {
        to: {
          value: 'hi'
        }
      }
    };

    var textNode = document.createTextNode('test');
    textNode.bind('textContent', obj, 'path.to.value');

...says, "Bind the value in `obj.path.to.value` to `textNode.textContent`".

When this value changes, MDV keeps `.textContent` up to date.

## Binding types

The meaning of the binding name is interpreted by the node on which `bind()` is called.

- `Text` node only handles bindings on the `textContent` property. 
- `HTMLInputElement` handles bindings on the `value` and `checked` properties as two-way.
- All other elements handle bindings to attributes. 

### Text nodes

    textNode.bind('textContent', someObj, 'path.to.value');

Instructs the `Text` node to make its `textContent` property dependent on the
value `someObj.path.to.value`.

<table class="table">
  <tr>
    <th>Case</th><th>Result</th>
  </tr>
  <tr>
    <td>Initially</td>
    <td><code>String(someObj.path.to.value)</code></td>
  </tr>
  <tr>
    <td>The value changes</td>
    <td><code>String(someObj.path.to.value)</code></td>
  </tr>
  <tr>
    <td>The path is <code>null</code>, <code>undefined</code>, or unreachable</td>
    <td><code>""</code> (the empty string)</td>
  </tr>
</table>

### Element attribute values {#attributevalues}

    myElement.bind('title', someObj, 'path.to.value');

Instructs the element to make the value its `title` attribute dependent on the value `someObj.path.to.value`.

<table class="table">
  <tr>
    <th>Case</th><th>Result</th>
  </tr>
  <tr>
    <td>Initially</td>
    <td><code>String(someObj.path.to.value)</code></td>
  </tr>
  <tr>
    <td>The value changes</td>
    <td><code>String(someObj.path.to.value)</code></td>
  </tr>
  <tr>
    <td>The path is <code>null</code>, <code>undefined</code>, or unreachable</td>
    <td><code>""</code> (the empty string)</td>
  </tr>
</table>

### Element attribute presence {#attributepresence}

    myElement.bind('hidden?', someObj, 'path.to.value');

Instructs the element add/remove its `hidden` attribute based on the truthiness of  `someObj.path.to.value`.

<table class="table">
  <tr>
    <th>Case</th><th>Result</th>
  </tr>
  <tr>
    <td>Initially</td>
    <td><code>""</code> (the empty string) if <code>someObj.path.to.value</code> is reachable and truthy</td>
  </tr>
  <tr>
    <td>The value changes</td>
    <td><code>""</code> (the empty string) if <code>someObj.path.to.value</code> is reachable and truthy</td>
  </tr>
  <tr>
    <td>Other cases</td>
    <td>The attribute is removed from the element</td>
  </tr>
</table>

### Input element `value` and `checked` properties {#inputelements}

#### value

    myValueInput.bind('value', someObj, 'path.to.value');

Instructs the `input` to ensure its `value` property is equal to `String(someObj.path.to.value)`. The **binding is two-way**. Upon binding, if the path is reachable, `value` is set to the path value. If the path is unreachable but can be made reachable by setting a single property on the final object, the property is set to `value`.

#### checked

    myCheckboxOrRadioInput.bind('checked', someObj, 'path.to.value');

Instructs the `input` to ensure its `checked` property is equal to `Boolean(someObje.path.to.value)`. The binding is two-way. Upon binding, if the path reachable, `checked` is set to the path value. If the path is unreachable but can be made reachable by setting a single property on the final object, the property is set to `checked`.

## Custom element bindings

[Custom Elements](/platform/custom-elements.html) may choose to interpret bindings
as they wish. They do this by overriding the `bind()` method.

    MyFancyHTMLWidget.prototype.bind = function(name, obj, path) {
      if (name == 'myBinding')
        // interpret the binding meaning
      else
        HTMLElement.prototype.bind.call(this, name, obj, path);
    };

If the element does not handle the binding, it should give its super class the
opportunity to by invoking its `bind()` method.

## Examples

Please refer to the [HowTo examples](https://github.com/Polymer/mdv/tree/master/examples/how_to).

## Specification

Note yet written. Please refer to the [HowTo examples](https://github.com/Polymer/mdv/tree/master/examples/how_to).


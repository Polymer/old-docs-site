---
layout: default
type: guide
shortname: Docs
title: Node.bind()
subtitle: Library

feature:
  summary: "[`Node.bind()`](https://github.com/polymer/NodeBind) is Polymer's data-binding library which allows DOM nodes to bind properties to data. Although internal in Polymer, it is also useful standalone."

---

{% include spec-header.html %}

## Learn the tech

### Why Node.bind()?

`Node.bind()` is a new method added to all DOM nodes which instructs them to bind the named
property to the data provided. These allows applications to create a data model
in JavaScript that DOM reacts to.

### Basic usage

"Bind the value in `obj.path.to.value` to a TextNode's `.textContent`":

    var obj = {
      path: {
        to: {
          value: 'hi'
        }
      }
    };

    var textNode = document.createTextNode('mytext');
    textNode.bind('textContent', new PathObserver(obj, 'path.to.value'));

When the value in `path.to.value` changes, `Node.bind()` keeps `.textContent` up to date.

## Binding types

The meaning of the binding name is interpreted by the node on which `bind()` is called.
Some elements have special properties which can be two-way data bound:

- `Text` node - only handles bindings on its `textContent` property.
- `HTMLInputElement` - handles bindings on its `value` and `checked` properties.
- `HTMLTextareaElement` - handles bindings on its `value` property.
- `HTMLSelectElement` - handles bindings on its `value` and `selectedIndex` properties.

**All other elements handle bindings to attributes**.

### Text nodes

    textNode.bind('textContent', new PathObserver(someObj, 'path.to.value'));

Instructs the `Text` node to make its `textContent` property dependent on the
value `someObj.path.to.value`.

<table class="table">
  <tr>
    <th>Case</th><th>Result</th>
  </tr>
  <tr>
    <td>Bound value is interpreted as</td>
    <td><code>String(someObj.path.to.value)</code></td>
  </tr>
  <tr>
    <td>The path is <code>null</code>, <code>undefined</code>, or unreachable</td>
    <td><code>""</code> (the empty string)</td>
  </tr>
</table>

### &lt;input> element {#inputelements}

The `<input>` element has two special properties, `value` and `checked` for two-way binding.

#### value

    myValueInput.bind('value', new PathObserver(someObj, 'path.to.value'));

Instructs the `input` to ensure its `value` property is equal to `String(someObj.path.to.value)`. Upon binding, if the path is reachable, `value` is set to the path value. If the path is unreachable but can be made reachable by setting a single property on the final object, the property is set to `value`.

#### checked

    myCheckboxOrRadioInput.bind('checked', new PathObserver(someObj, 'path.to.value'));

Instructs the `input` to ensure its `checked` property is equal to `Boolean(someObje.path.to.value)`.

<table class="table">
  <tr>
    <th>Case</th><th>Result</th>
  </tr>
  <tr>
    <td>Bound value is interpreted as</td>
    <td><code>Boolean(someObje.path.to.value)</code></td>
  </tr>
  <tr>
    <td>The path is <code>null</code>, <code>undefined</code>, or unreachable</td>
    <td><code>false</code> for <code>&lt;input type="checked"></code> and <code>&lt;input type="radio"></code>.</td>
  </tr>
</table>

### &lt;textarea> element {#textarea}

The `<textarea>` element has a special property, `value` for two-way binding.

#### value

    textarea.bind('value', new PathObserver(someObj, 'path.to.value'));

`HTMLTextAreaElement.value` mimics the behavior of `input.value` (see above).

### &lt;select> element {#select}

The `<select>` element has two special properties, `selectedIndex` and `value` for two-way binding.

#### value

    select.bind('value', new PathObserver(someObj, 'path.to.value'));

Instructs the `HTMLSelectElement` to make its `value` property dependent on the
value in `path.to.value`.

#### selectedIndex

    select.bind('selectedIndex', new PathObserver(someObj, 'path.to.value'));

Instructs the `HTMLSelectElement` to make its `selectedIndex` property dependent on the
value in `path.to.value`. Note, "`selectedIndex`" is case sensitive.

<table class="table">
  <tr>
    <th>Case</th><th>Result</th>
  </tr>
  <tr>
    <td>Bound value is interpreted as</td>
    <td><code>Number(someObj.path.to.value)</code></td>
  </tr>
  <tr>
    <td>The path is <code>null</code>, <code>undefined</code>, or unreachable</td>
    <td><code>0</code></td>
  </tr>
</table>

### Element attribute values {#attributevalues}

    myElement.bind('title', new PathObserver(someObj, 'path.to.value'));

Instructs the element to make the value its `title` attribute dependent on the value `someObj.path.to.value`.

<table class="table">
  <tr>
    <th>Case</th><th>Result</th>
  </tr>
  <tr>
    <td>Bound value is interpreted as</td>
    <td><code>String(someObj.path.to.value)</code></td>
  </tr>
  <tr>
    <td>The path is <code>null</code>, <code>undefined</code>, or unreachable</td>
    <td><code>""</code> (the empty string)</td>
  </tr>
</table>

### Element attribute presence {#attributepresence}

    myElement.bind('hidden?', new PathObserver(someObj, 'path.to.value'));

Instructs the element add/remove its `hidden` attribute based on the truthiness of  `someObj.path.to.value`.

<table class="table">
  <tr>
    <th>Case</th><th>Result</th>
  </tr>
  <tr>
    <td>Bound value is interpreted as</td>
    <td><code>""</code> (the empty string) if <code>someObj.path.to.value</code> is reachable and truthy</td>
  </tr>
  <tr>
    <td>Other cases</td>
    <td>The attribute is removed from the element</td>
  </tr>
</table>

## Custom element bindings

[Custom Elements](/platform/custom-elements.html) may choose to interpret bindings
as they wish. They do this by overriding the `bind()` method.

    MyFancyHTMLWidget.prototype.bind = function(name, observable, oneTime) {
      if (name == 'myBinding') {
        // interpret the binding meaning
        // if oneTime is false, this should return an object which
        // has a close() method.
        // this will allow TemplateBinding to clean up this binding
        // when the instance containing it is removed.
      }
      else {
         return HTMLElement.prototype.bind.call(
          this, name, observable, oneTime
        );
      }
    };

If the element does not handle the binding, it should give its super class the
opportunity to by invoking its `bind()` method.

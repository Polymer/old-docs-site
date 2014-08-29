---
layout: default
type: core
navgroup: docs
shortname: Docs
title: Node.bind()
subtitle: 库

feature:
  summary: "[`Node.bind()`](https://github.com/polymer/NodeBind) 是 Polymer 数据绑定库，该库允许把 DOM 结点的属性绑定到数据。虽然是 Polymer 内部的东西，但是也可以独立使用。"

---

{% include spec-header.html %}

## 学习这项技术

### 为什么用 Node.bind()？

`Node.bind()` 是一个 DOM 结点新增加的方法，用来将其被命名的属性绑定到提供的数据上。其允许应用程序创建一个反应在 DOM 上的 JavaScript 数据模型。

### 基本用法

"把 `obj.path.to.value` 绑定到一个文本结点的 `.textContent` 中"：

    var obj = {
      path: {
        to: {
          value: 'hi'
        }
      }
    };

    var textNode = document.createTextNode('mytext');
    textNode.bind('textContent', new PathObserver(obj, 'path.to.value'));

当 `path.to.value` 的值变化时，`Node.bind()` 会保持 `.textContent` 的更新。

## 绑定类型

绑定名称的意思是通过调用了 `bind()` 的结点解释的。有些 elements 具备特殊的可以双向绑定数据的属性：

- `Text` 结点 - 只处理 `textContent` 属性的绑定。 
- `HTMLInputElement` - 处理其 `value` 和 `checked` 属性的绑定。
- `HTMLTextareaElement` - 处理其 `value` 属性的绑定。
- `HTMLSelectElement` - 处理其 `value` 和 `selectedIndex` 属性的绑定。

**所有其它的 elements 句柄都绑定在特性上**。

### Text 结点

    textNode.bind('textContent', new PathObserver(someObj, 'path.to.value'));

构造 `Text` 结点，并使得 `textContent` 属性依赖于 `someObj.path.to.value` 的值。

<table class="table">
  <tr>
    <th>情形</th><th>结果</th>
  </tr>
  <tr>
    <td>被绑定的值被解释为</td>
    <td><code>String(someObj.path.to.value)</code></td>
  </tr>
  <tr>
    <td>其路径为 <code>null</code>、<code>undefined</code> 或不可达到</td>
    <td><code>""</code> (空字符串)</td>
  </tr>
</table>

### &lt;input> element {#inputelements}

`<input>` element 有两个特殊的属性：`value` 和 `checked` 且都是双向绑定。

#### value

    myValueInput.bind('value', new PathObserver(someObj, 'path.to.value'));

构造 `input` 来确认其 `value` 属性等同于 `String(someObj.path.to.value)`。在绑定中，如果路径是可达到的，`value` 会被设为路径的值。如果路径不可达到但是可以通过设置一个属性来解决，则属性会被设为 `value`。

#### checked

    myCheckboxOrRadioInput.bind('checked', new PathObserver(someObj, 'path.to.value'));

构造 `input` 来确认其 `checked` 属性等同于 `Boolean(someObj.path.to.value)`。

<table class="table">
  <tr>
    <th>情形</th><th>结果</th>
  </tr>
  <tr>
    <td>被绑定的值被解释为</td>
    <td><code>Boolean(someObje.path.to.value)</code></td>
  </tr>
  <tr>
    <td>其路径为 <code>null</code>、<code>undefined</code> 或不可达到</td>
    <td>对于 <code>&lt;input type="checked"></code> 和 <code>&lt;input type="radio"></code> 来说是 <code>false</code>。</td>
  </tr>
</table>

### &lt;textarea> element {#textarea}

`<textarea>` element 有一个特殊的属性：`value` 且是双向绑定的。

#### value

    textarea.bind('value', new PathObserver(someObj, 'path.to.value'));

`HTMLTextAreaElement.value` 等同于 `input.value` (如之前所述)。

### &lt;select> element {#select}

`<select>` element 有量个特殊的属性：`selectedIndex` 和 `value` 且都是双向绑定的。

#### value

    select.bind('value', new PathObserver(someObj, 'path.to.value'));

构造 `HTMLSelectElement` 来使其 `value` 属性依赖于 `puth.to.value` 的值。

#### selectedIndex

    select.bind('selectedIndex', new PathObserver(someObj, 'path.to.value'));

构造 `HTMLSelectElement` 来使其 `selecteIndex` 属性依赖于 `path.to.value` 的值。注意，“`selectedIndex`” 是大小写敏感的。

<table class="table">
  <tr>
    <th>情形</th><th>结果</th>
  </tr>
  <tr>
    <td>被绑定的值被解释为</td>
    <td><code>Number(someObj.path.to.value)</code></td>
  </tr>
  <tr>
    <td>其路径为 <code>null</code>、<code>undefined</code> 或不可达到</td>
    <td><code>0</code></td>
  </tr>
</table>

### Element 特性的 values {#attributevalues}

    myElement.bind('title', new PathObserver(someObj, 'path.to.value'));

构造 element 使其 `title` 特性依赖于 `someObj.path.to.value` 的值。

<table class="table">
  <tr>
    <th>情形</th><th>结果</th>
  </tr>
  <tr>
    <td>被绑定的值被解释为</td>
    <td><code>String(someObj.path.to.value)</code></td>
  </tr>
  <tr>
    <td>其路径为 <code>null</code>、<code>undefined</code> 或不可达到</td>
    <td><code>""</code> (空字符串)</td>
  </tr>
</table>

### Element attribute presence {#attributepresence}

    myElement.bind('hidden?', new PathObserver(someObj, 'path.to.value'));

Instructs the element add/remove its `hidden` attribute based on the truthiness of  `someObj.path.to.value`.

<table class="table">
  <tr>
    <th>情形</th><th>结果</th>
  </tr>
  <tr>
    <td>被绑定的值被解释为</td>
    <td><code>""</code> (the empty string) if <code>someObj.path.to.value</code> is reachable and truthy</td>
  </tr>
  <tr>
    <td>其它情形</td>
    <td>特性被从 element 移除</td>
  </tr>
</table>

## Custom element 绑定

[Custom Elements](/platform/custom-elements.html) 可以根据他们的意愿解释绑定。他们通过重载 `bind()` 方法来解决。

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

如果 element 没有处理绑定，它应该为其超类提供调用 `bind()` 方法的机会。

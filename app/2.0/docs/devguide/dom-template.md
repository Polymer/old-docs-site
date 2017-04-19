---
title: DOM templating
---

<!-- toc -->

Many elements use a subtree of DOM elements to implement their features. DOM templating provides an easy way to create a DOM subtree for your element.

By default, adding a DOM template to an element causes Polymer to create a shadow root for the element and clone the template into the shadow tree.

The DOM template is also processed to enable data binding and declarative event handlers.

## Specify a DOM template

To specify an element's DOM template:

1.  Create a `<dom-module>`element with an `id` attribute that matches the element's name.
2.  Create a `<template>` element inside the `<dom-module>`.

Polymer clones this template's contents into the element's local DOM.

Example: { .caption }

```html
<dom-module id="x-foo">

  <template>I am x-foo!</template>

  <script>
    class XFoo extends Polymer.Element {
      static get is() { return  'x-foo' }
    }
    customElements.define(XFoo.is, XFoo);
  </script>

</dom-module>
```

In this example, the DOM template and the JavaScript that defines the element are in the same file. You can also put these portions in separate files, but the DOM template must be parsed before the element is defined.


**Note:** Elements should generally be defined outside of the main document,
except for testing. For caveats about defining elements in the main document,
see [main document definitions](registering-elements#main-document-definitions).
{.alert .alert-info}

### URLs in templates {#urls-in-templates}

A URL in a template may be relative to an application or to a specific component. For example,
if a component includes images alongside an HTML import that defines an element, the image URL needs
to be resolved relative to the import. However, an application-specific element may need to include
links to URLs relative to the main document.

To ensure URLs resolve properly, Polymer provides two properties that can be used in data bindings:

| Property | Description |
| -------- | ----------- |
| `importPath` | A static getter on the element class that defaults to the element HTML import document URL and is overridable. It may be useful to override `importPath` when an element's template is not retrieved from a `<dom-module>` or the element is not defined using an HTML import. |
| `rootPath` | An instance property set to the value of `Polymer.rootPath` which is globally settable and defaults to the main document URL. It may be useful to set `Polymer.rootPath` to provide a stable application mount path when using client side routing. |

<b style="color: red;">[[[ Re URLS in CSS styles: Does this include only relative URLs? What if they start
with / or https://domain/....]]]</b>

URLs in styles are automatically re-written to be relative to the `importPath` property.
Any URLs outside of a `<style>` element should be bound using `importPath` or
`rootPath` where appropriate. For example:

```html
<img src$="[[importPath]]checked.jpg">
```

```html
<a href$="[[rootPath]]users/profile">View profile</a>
```

The `importPath` and `rootPath` properties are also supported in Polymer 1.9+, so they can be used
by hybrid elements.

### Provide a string template

As an alternative to specifying the element's template in markup, you can specify a string template
by creating a static `template` getter that returns the template as a string. This getter is called
_once_, when the first instance of the element is upgraded.

```js
class MyElement extends Polymer.Element {

  static get template() {
    return `<style>:host { color: blue; }</style>
       <h2>String template</h2>
       <div>I've got a string template!</div>`
  }
}
customElements.define('my-element', MyElement);
```

When using a string template, the element doesn't need to provide an `is` getter (however, the tag
name still needs to  be  passed as the first argument to `customElements.define`).

### Elements with no shadow DOM

To create an element with no shadow DOM, don't specify a DOM template (using either a `<dom-module>`
or a string template), then no shadow root is created for the element, _unless_ the element is
extending another element that defines a DOM template.

### Inherited templates

An element that extends another Polymer element can inherit its template. If the element doesn't
provide its own DOM template (using either a `<dom-module>` or a string template), Polymer uses the
same template as the superclass, if any.

If the superclass has no template, the subclass element doesn't create a shadow root.

## Static node map {#node-finding}

Polymer builds a static map of node IDs when the element initializes its DOM template, to provide
convenient access to frequently used nodes without the need to query for them manually. Any node
specified in the element's template with an `id` is stored on the `this.$` hash by `id`.

The `this.$` hash is created when the shadow DOM is initialized. In the `ready` callback, you must
call `super.ready()` before accessing `this.$`.

**Note:** Nodes created dynamically using data binding (including those in
`dom-repeat` and `dom-if` templates) are _not_ added to the
`this.$` hash. The hash includes only _statically_ created local DOM nodes
(that is, the nodes defined in the element's outermost template).
{.alert .alert-info}

Example: { .caption }

```html
<dom-module id="x-custom">

  <template>
    Hello World from <span id="name"></span>!
  </template>

  <script>
    class MyElement extends Polymer.Element {
      static get is() { return  'x-custom' }
      ready() {
        super.ready();
        this.$.name.textContent = this.tagName;
      }
    }
  </script>

</dom-module>
```

For locating dynamically-created nodes in your element's shadow DOM,
use the standard DOM `querySelector`  method.

<code>this.shadowRoot.querySelector(<var>selector</var>)</code>



## Remove empty text nodes {#strip-whitespace}


Add the `strip-whitespace` boolean attribute to a template to remove
any empty text nodes from the template's contents. This can result in a
minor performance improvement.

With empty text nodes:


```html
<dom-module id="has-whitespace">
  <template> <div>A</div> <div>B</div> </template>
  <script>
    class HasWhitespace extends Polymer.Element {
      static get is() { return  'has-whitespace' }
      ready() {
        super.ready();
        console.log(this.shadowRoot.childNodes.length); // 5
      }
    }
    customElements.define(HasWhitespace.is, HasWhitespace);
  </script>
</dom-module>
```


Without empty text nodes:


```html
<dom-module id="no-whitespace">
  <template strip-whitespace>
    <div>A</div>
    <div>B</div>
  </template>
  <script>
    class NoWhitespace extends Polymer.Element {
      static get is() { return  'no-whitespace' }
      ready() {
        super.ready();
        console.log(this.shadowRoot.childNodes.length); // 2
      }
    }
    customElements.define(NoWhitespace.is, NoWhitespace);
  </script>
</dom-module>
```

## Preserve template contents

Polymer performs one-time processing on any Polymer-managed templates, including templates nested
inside your element template. This processing removes the template's original contents (the
`content` property will be undefined). If you want  to access the contents of a nested template,
you can add the `preserve-content` attribute to the template.

This is a fairly rare use case.

<b style="color: red;">[[[ EXAMPLE OR NO EXAMPLE? This one is pretty silly, but it shows what we're talking about.
Then again, maybe it just encourages people to do something that isn't necessarily efficient.]]]</b>


```html
<dom-module id="custom-template">
  <template>
    <template id="special-template" preserve-content>
      <div>I am very special.</div>
    </template>
  </template>
  <script>
    class CustomTemplate extends Polymer.Element {
      static get is() { return  'custom-template' }
      ready() {
        super.ready();
        // retrieve the nested template
        let template = this.shadowRoot.querySelector('#special-template');

        //
        for (let i=0; i<10; i++) {
          this.shadowRoot.appendChild(document.importNode(template.content, true));
        }
      }
    }
    customElements.define(CustomTemplate.is, CustomTemplate);
  </script>
</dom-module>
```

## Customize DOM initialization

There are several points where you can customize how Polymer initializes your element's DOM. You
can customize how the shadow root is created by creating it yourself. And you can override the
`_attachDom` method to change how the the DOM tree is added to your element: for example, to
stamp into light DOM instead of shadow DOM.

### Create your own shadow root

In some cases, you may want to create your own shadow root. You can do this by creating a shadow root
before calling `super.ready()`—or before the `ready` callback, such as in the constructor.

<b style="color: red;">[[[Hey is this right? Do we have a preference here?]]]</b>

```js
constructor() {
  super();
  this.attachShadow({mode: 'open', delegatesFocus: true});
}
```

You can also override the `_attachDom` method:

```js
_attachDom(dom) {
  this.attachShadow({mode: 'open', delegatesFocus: true});
  super._attachDom(dom);
}
```

### Stamp templates in light DOM

You can customize how the DOM is stamped by overriding the `_attachDom` method. The method takes a
single argument, a `DocumentFragment` containing the DOM to be stamped. If you want to stamp the
template into light DOM, simply add an override like this:

```js
_attachDom(dom) {
  this.appendChild(dom);
}
```

When you stamp the DOM template to light DOM like this, data bindings and declarative event listeners
work as usual, but you cannot use shadow DOM features, like `<slot>` and style encapsulation. A
template stamped into light DOM shouldn't contain any `<style>` tags. Styles can be applied by an
enclosing host element, or at the document level if the element isn't used inside another element's
shadow DOM.

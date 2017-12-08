---
title: DOM templating
---

<!-- toc -->

Many elements use a subtree of DOM elements to implement their features. DOM templating provides an easy way to create a DOM subtree for your element.

By default, adding a DOM template to an element causes Polymer to create a shadow root for the element and clone the template into the shadow tree.

The DOM template is also processed to enable data binding and declarative event handlers.

## Specify a DOM template

Polymer provides three basic ways to specify a DOM template:

-   [Specify a template using the `<dom-module>` element](#dommodule). This allows you to specify the
    template entirely in markup, which is most efficient for an element defined in an HTML
    import.
-   [Provide a template by defining a template property on the constructor](#templateobject).
-   [Inherit and optionally modify a template from an existing base class](#inherited-templates).

Polymer provides a default `template` getter that retrieves a template from the element's
`<dom-module>`. You can override this getter to provide a string template or a generated template
element.

### Specify a template using the dom-module element {#dommodule}

To specify an element's DOM template using a `<dom-module>`:

1.  Create a `<dom-module>`element with an `id` attribute that matches the element's name.
2.  Create a `<template>` element inside the `<dom-module>`.
3.  Give the element a static `is` getter that matches the element's name. Polymer uses this to
    retrieve the `<dom-module>` for the element.

Polymer clones this template's contents into the element's shadow DOM.

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

### Provide a template by defining a template property on the constructor {#templateobject}

As an alternative to specifying the element's template in markup, you can define a static `template`
property. The `template` property must be an `HTMLTemplateElement`.

Polymer provides an `html` function that can be applied to a template literal to produce an 
`HTMLTemplateElement`. For example:

```js
class MyElement extends Polymer.Element {

  static get template() {
    return Polymer.html`<style>:host { color: blue; }</style>
       <h2>String template</h2>
       <div>I've got a string template!</div>`;
  }
}
customElements.define('my-element', MyElement);
```

To enable HTML code highlighting in text editors with lit-html code highlighting functionality, you
can declare a variable called `html` to hold the `Polymer.html` object, and return it from a `template` getter:

```js
const html = Polymer.html;

class MyElement extends Polymer.Element {

  static get template() {
    return html`<style>:host { color: blue; }</style>
       <h2>String template</h2>
       <div>I've got a string template!</div>`;
  }
}
customElements.define('my-element', MyElement);
```

When using a static `template` getter, the element doesn't need to provide an `is` getter.
However, the tag name still needs to  be  passed as the first argument to
`customElements.define`.

### Inherited templates {#inherited-templates}

You can inherit an existing template by extending a base class with a template. This
functionality provides for a variety of scenarios: 

* To [inherit a base class template with **no modifications**](#nomods), do not supply a
  template definition in the child class declaration.
* To [**override** a template definition](#overridebase), supply your own template definition 
  in the child class.
* To [**extend** a base class template](#extendbase), supply a template in the child class that includes
  a reference to the base class template.
* To [**insert** content from a child class into placeholders supplied by a base class](#insertcontent),
  create placeholders in the base class and supply the content with functions.

#### Inherit a base class template with no modifications {#nomods}

Base class definition { .caption }

```js
const html = Polymer.html;

class BaseClass extends Polymer.Element {
  static get template() {
    return html`This content has been inherited from BaseClass.`;
  }
}
```

Child class definition { .caption }
```js
class ChildClass extends Polymer.Element {

}
```

[See a working example in Plunker](http://plnkr.co/edit/vS99al?p=preview).

#### Override a template definition {#overridebase}

Base class definition { .caption }

```js
const html = Polymer.html;

class BaseClass extends Polymer.Element {
  static get template() {
    return html`This content has been inherited from BaseClass.`;
  }
}
```

Child class definition { .caption }
```js
const html = Polymer.html;

class ChildClass extends BaseClass {
  static get template() {
    return html`
      Base class template has been overridden. Hello from ChildClass!
      `;
  }
}
```

[See a working example in Plunker](http://plnkr.co/edit/VCwhuA?p=preview).

#### Extend a base class template {#extendbase}

Base class definition { .caption }

```js
const html = Polymer.html;

class BaseClass extends Polymer.Element {
  static get template() {
    return html`
      This content has been inherited from BaseClass.
      `;
  }
}
```

Child class definition { .caption }
```js
const html = Polymer.html;

class ChildClass extends BaseClass {
  static get template() {
    return html`
    <p>Hello, this content is in ChildClass's template.</p>
    ${super.template}
    <p>Hello again from ChildClass.</p>
    `;
  }
}
```

[See a working example in Plunker](http://plnkr.co/edit/f5utiX?p=preview).

#### Insert content from a child class into placeholders supplied by a base class {#insertcontent}

Base class definition { .caption }

```js
const html = Polymer.html;

class BaseClass extends Polymer.Element {
  static get template() {
    return html`
      <div>${this.headerTemplate}</div>
      <p>Hello this is some content</p>
      <div>${this.footerTemplate}</div>
    `;
  }
  static get headerTemplate() { return html`<h1>BaseClass: Header</h1>` }
  static get footerTemplate() { return html`<h1>BaseClass: Footer</h1>` }
}
```

Child class definition { .caption }
```js
const html = Polymer.html;

class ChildClass extends BaseClass {
    static get template() {
      return html`
        <div class="frame">${super.template}</div>
      `;
    }
    static get headerTemplate() { return html`<h2>ChildClass: Header</h2>` }
    static get footerTemplate() { return html`<h2>ChildClass: Footer</h2>` }
  }
```

[See a working example in Plunker](http://plnkr.co/edit/YQ5t5I?p=preview).

### Elements with no shadow DOM

To create an element with no shadow DOM, don't specify a DOM template (either using a `<dom-module>`
or by overriding the `template` getter), then no shadow root is created for the element.

If the element is extending another element that has a DOM template and you don't want a DOM template,
define a `template` getter that returns a falsy value.

### URLs in templates {#urls-in-templates}

A relative URL in a template may need to be relative to an application or to a specific component.
For example, if a component includes images alongside an HTML import that defines an element, the
image URL needs to be resolved relative to the import. However, an application-specific element may
need to include links to URLs relative to the main document.

By default, Polymer **does not modify URLs in templates**, so all relative URLs are treated as
relative to  the main document URL. This is because when the template content is cloned and added
to the main document, the browser evaluates the URLs  relative to the document (not to the original
location of the template).

To ensure URLs resolve properly, Polymer provides two properties that can be used in data bindings:

| Property | Description |
| -------- | ----------- |
| `importPath` | A static getter on the element class that defaults to the element HTML import document URL and is overridable. It may be useful to override `importPath` when an element's template is not retrieved from a `<dom-module>` or the element is not defined using an HTML import. |
| `rootPath` | An instance property set to the value of `Polymer.rootPath` which is globally settable and defaults to the main document URL. It may be useful to set `Polymer.rootPath` to provide a stable application mount path when using client side routing. |


Relative URLs in styles are automatically re-written to be relative to the `importPath` property.
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
any **empty** text nodes from the template's contents. This can result in a
minor performance improvement.

**What's an empty node?** `strip-whitespace` removes only text nodes that occur between
elements in the template and are _empty_ (that is, they only contain whitespace characters).
These nodes are created when two elements in the template are separated by whitespace (such as
spaces or line breaks). It doesn't remove any whitespace from inside elements.
{.alert .alert-info}

With empty text nodes:


```html
<dom-module id="has-whitespace">
  <template>
    <div>Some Text</div>
    <div>More Text</div>
  </template>
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

There are five nodes in this element's shadow tree because of the whitespace surrounding the `<div>`
elements. The five child nodes are:

  text node
  `<div>Some Text</div>`
  text node
  `<div>More Text</div>`
  text node

Without empty text nodes:


```html
<dom-module id="no-whitespace">
  <template strip-whitespace>
    <div>Some Text</div>
    <div>More Text</div>
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

Here, the shadow tree contains only the two `<div>` nodes:

`<div>Some Text</div><div>More Text</div>`

Note that the whitespace _inside_ the `<div>` elements isn't affected.

## Preserve template contents

Polymer performs one-time processing on your DOM template. For example:

-   Parsing and removing binding annotations.
-   Parsing and removing markup for declarative event listeners.
-   Caching and removing the contents of nested templates for better performance. 

This processing removes the template's original contents (the `content` property will be undefined). If you want
to access the contents of a nested template, you can add the `preserve-content` attribute to the
template.

Preserving the contents of a nested template means it **won't have any Polymer features like
data bindings or declarative event listeners.** Only use this when you want to manipulate the
template yourself, and you don't want Polymer to touch it.

This is a fairly rare use case.

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
work as usual, but you cannot use shadow DOM features, like `<slot>` and style encapsulation.

A template stamped into light DOM shouldn't contain any `<style>` tags. Styles can be applied by an
enclosing host element, or at the document level if the element isn't used inside another element's
shadow DOM.

---
title: DOM templating
---

<!-- toc -->

Many elements use a subtree of DOM elements to implement their features. DOM templating provides 
an easy way to create a DOM subtree for your element.

By default, adding a DOM template to an element causes Polymer to create a shadow root for the 
element and clone the template into the shadow tree.

The DOM template is also processed to enable data binding and declarative event handlers.

## Specify a DOM template

Polymer provides three basic ways to specify a DOM template:

-   [Use the `<dom-module>` element](#dommodule). This allows you to specify
    the template entirely in markup, which is most efficient for an element defined in an HTML
    import.
-   [Define a template property on the constructor](#templateobject).
-   [Inherit a template from another Polymer element](#inherit).

### Use the dom-module element {#dommodule}

To specify an element's DOM template using a `<dom-module>`:

1.  Create a `<dom-module>`element with an `id` attribute that matches the element's name.
2.  Create a `<template>` element inside the `<dom-module>`.
3.  Give the element a static `is` getter that matches the element's name. Polymer uses this to
    retrieve the `<dom-module>` for the element.

Polymer clones this template's contents into the element's shadow DOM.

Specify an element's DOM template using a dom-module: { .caption }

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

[See a working example in Plunker](http://plnkr.co/edit/Oasmtp?p=preview).

In the example above, the DOM template and the JavaScript that defines the element are in the same
file. You can also put these portions in separate files, but the DOM template must be parsed before
the element is defined, [as in this Plunker example](http://plnkr.co/edit/4HcxNX?p=preview).

**Note:** Elements should generally be defined outside of the main document,
except for testing. For caveats about defining elements in the main document,
see [main document definitions](registering-elements#main-document-definitions).
{.alert .alert-info}

### Define a template property on the constructor {#templateobject}

As an alternative to specifying the element's template in markup, you can define a `template`
property on the element's constructor. To create a static template getter, override Polymer's
default `template` getter. This getter is called _once_, when the first instance of the element
is upgraded.

The template getter can return either a string or an instance of `HTMLTemplateElement`. Support
for the string return value is deprecated in Polymer 2.4, and will be removed in 3.0. 

Polymer 2.4+ provides a helper function (`Polymer.html`) to generate an `HTMLTemplateElement`
instance from a JavaScript template literal.

Use Polymer.html to convert a JavaScript template literal to an HTMLTemplateElement: { .caption }

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

[See a working example in Plunker](http://plnkr.co/edit/fFTGJf?p=preview).

Some text editors support HTML code highlighting in JavaScript template literals tagged with 
a function called `html`. To enable HTML code highlighting in such text editors, declare a 
constant called `html` to hold the `Polymer.html` function. Use the `html` constant in the
template getter.

Declare a constant called html to hold the Polymer.html function: { .caption }

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

`Polymer.html` was added in release 2.4. For earlier versions, you can return a plain string:

```js
return `<div>A plain string template</div>`;
```

Returning a string is deprecated in favor of the html helper in release 2.4. Support for the string template will be removed in 3.0.

**When using a static `template` getter, the element doesn't need to provide an `is` getter.**
However, the tag name still needs to be passed as the first argument to
`customElements.define`, as in the example above.
{.alert .alert-info}

### Inherit a template from another Polymer element {#inherit}

An element that extends another Polymer element can inherit its template. If the element doesn't
provide its own DOM template (using either a `<dom-module>` or a static template object), Polymer
uses the same template as the superclass, if any.

The `Polymer.html` helper introduced in Polymer 2.4 makes template extension a little simpler, so
this section shows examples with `Polymer.html` (usable on 2.4 and later) and without (usable on
all 2.x versions).

* [Polymer 2.x: Inherit a base class template **without modifying it**](#nomods)
* [Polymer 2.x: **Override** a base class template in a child class](#overridebase)
* [Polymer 2.x: **Modify** a copy of a superclass template](#modify)
* [Polymer 2.4+: **Extend** a base class template in a child class](#extendbase)
* [Polymer 2.4+: Provide **template extension points** in a base class for content from a child class](#insertcontent)

#### Polymer 2.x: Inherit a base class template without modifying it {#nomods}

To inherit a base class template without modifying it, do not supply a template definition in the
child class declaration.

Base class definition: { .caption }

```html
<dom-module id="base-class">

  <template>This content has been inherited from BaseClass.</template>

  <script>
    class BaseClass extends Polymer.Element {
      static get is() { return  'base-class' }
    }
    customElements.define(BaseClass.is, BaseClass);
  </script>

</dom-module>
```

Child class definition: { .caption }
```html
<dom-module id="child-class">

  <script>
    class ChildClass extends BaseClass {
      static get is() { return  'child-class' }
    }
    customElements.define(ChildClass.is, ChildClass);
  </script>

</dom-module>
```

[See a working example in Plunker](http://plnkr.co/edit/vS99al?p=preview).

#### Polymer 2.x: Override a base class template in a child class {#overridebase}

To override a base class's template definition, supply your own template for your child class.

Base class definition: { .caption }

```html
<dom-module id="base-class">

  <template>This is BaseClass's template.</template>

  <script>
    class BaseClass extends Polymer.Element {
      static get is() { return  'base-class' }
    }
    customElements.define(BaseClass.is, BaseClass);
  </script>

</dom-module>
```

Child class definition: { .caption }

```js
<dom-module id="child-class">

  <template>Base class template has been overridden. Hello from ChildClass!</template>

  <script>
    class ChildClass extends BaseClass {
      static get is() { return 'child-class' }
    }
    customElements.define(ChildClass.is, ChildClass);
  </script>
</dom-module>
```

[See a working example in Plunker](http://plnkr.co/edit/VCwhuA?p=preview).

#### Polymer 2.x: Modify a copy of a superclass template {#modify}

You can modify a superclass template by defining a `template` getter that returns a modified
template element. If you're going to modify the superclass template, there are a couple of
important rules:

-   Don't modify the superclass template in place; make a copy before modifying.
-   If you're doing anything expensive, like copying or modifying an existing template,
    you should memoize the modified template so you don't have to regenerate it when the
    getter is called.

The following example shows a simple modification based on a parent template:

```js
(function() {
  let memoizedTemplate;

  class MyExtension extends MySuperClass {
    static get template() {
      if (!memoizedTemplate) {
        // create a clone of superclass template (`true` = "deep" clone)
        memoizedTemplate = MySuperClass.template.cloneNode(true);
        // add a node to the template.
        let div = document.createElement('div');
        div.textContent = 'Hello from an extended template.'
        memoizedTemplate.content.appendChild(div);
      }
      return memoizedTemplate;
    }
  }

})();
```

The following example shows how an element could wrap a superclass template with its own
template:

```html
<dom-module id="my-ext">
    <template>
      <h2>Extended template</h2>
      <!-- superclass template will go here -->
      <div id="footer">
        Extended template footer.
      </div>
    </template>
  <script>
    (function() {
      let memoizedTemplate;

      class MyExtension extends MySuperClass {

        static get is() { return 'my-ext'}
        static get template() {
          if (!memoizedTemplate) {
            // Retrieve this element's dom-module template
            memoizedTemplate = Polymer.DomModule.import(this.is, 'template');

            // Clone the contents of the superclass template
            let superTemplateContents = document.importNode(MySuperClass.template.content, true);

            // Insert the superclass contents
            let footer = memoizedTemplate.content.querySelector('#footer');
            memoizedTemplate.content.insertBefore(superTemplateContents, footer);
          }
          return memoizedTemplate;
        }
      }
      customElements.define(MyExtension.is, MyExtension);
    })();
  </script>
</dom-module>
```

#### Polymer 2.4+: Extend a base class template in a child class {#extendbase}

Polymer 2.4+ uses the functionality of embedded expressions in JavaScript template literals 
to provide convenient ways to [extend inherited templates](#inherited-templates). 

[Read more about template literals on MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals).

To extend a base class template with Polymer 2.4+, include the base class template in your child
class template literal with the expression `${super.template}`. You will also need to tag the
template literal with the `Polymer.html` function:

```js
static get template() {
  return Polymer.html`
    <p>${super.template}</p>
  `;
}
```

* The expression `${super.template}` will be interpolated and included in the template of the 
  child class. 
* Because the `template` getter is static, `${super.template}` accesses the `template` property
  on the superclass constructor.
* The `Polymer.html` function checks each expression value. If the expression is an
  `HTMLTemplateElement`, the `innerHTML` of the template is interpolated. 
* To protect against XSS vulnerabilities, `Polymer.html` only interpolates `HTMLTemplateElement`
  values. Non-template values will throw an error.

It's very simple to combine existing templates:

Base class definition: { .caption }

```js
const html = Polymer.html;

class BaseElement extends Polymer.Element {
  static get template() {
    return html`
      <p>This content has been inherited from BaseElement.</p>`
  }
}

customElements.define('base-element', BaseElement);
```

Child class definition: { .caption }

```js
const html = Polymer.html;

class ChildElement extends BaseElement {
  static get template() {
    return html`
      <p>This content is in ChildElement.</p>
      <p>${super.template}</p>
      <p>Hello again from ChildElement.</p>
      `;
  }
}

customElements.define('child-element', ChildElement);
```

[See a working example in Plunker](http://plnkr.co/edit/bM7sKB?p=preview).

#### Polymer 2.4+: Provide template extension points {#insertcontent}

Polymer 2.4 makes it easy to provide template extension points in a base class, which a child
class can then optionally override. You can provide template extension points by composing your
base class template literal with expressions-for example, `${this.headerTemplate}`. You will
also need to tag the template literals with the `Polymer.html` function:

```js
...
//create a base class template with extension points:
static get template() {
  return Polymer.html`
    <div>${this.headerTemplate}</div>
    <p>Hello this is some content</p>
    <div>${this.footerTemplate}</div>
  `;
}
//supply the default content for the expressions:
static get headerTemplate() { return Polymer.html`...` }
static get footerTemplate() { return Polymer.html`...` }
...
```

Your child class may or may not need to override this content. Here's an example in which
the child class overrides the base class content:

Base class definition: { .caption }

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

Child class definition: { .caption }
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

[See a working example in Plunker](http://plnkr.co/edit/FDnI2u?p=preview).

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

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

To specify a template, define a `template` property on the constructor. When extending an 
element, you can inherit or extend the superclass's template.

-   [Define a template property on the constructor](#templateobject).
-   [Inherit a template from another Polymer element](#inherit).

### Define a template property on the constructor {#templateobject}

To specify the element's template, define a `template` property on the element's 
constructor. For example, you can create a static `template` getter. The template
is retrieved and processed when the first instance of the element
is upgraded.

The template getter must return an instance of `HTMLTemplateElement`. Use the `html` helper function
to generate an `HTMLTemplateElement` instance from a JavaScript template literal. (You can import the `html` helper from the `polymer-element.js` module.)

Specify a template using the template getter { .caption }

```js
import {PolymerElement, html} from '@polymer/polymer/polymer-element.js';

class MyElement extends PolymerElement {

  static get template() {
    return html`<style>:host { color: blue; }</style>
       <h2>String template</h2>
       <div>This is my template!</div>`;
  }
}
customElements.define('my-element', MyElement);
```

[See a working example in Plunker](https://plnkr.co/edit/zFlQU6SzJIXxBpHs9iuU?p=preview).


## Inherit a template from another Polymer element {#inherit}

An element that extends another Polymer element can inherit its template. If the element doesn't
provide its own DOM template, Polymer uses the same template as the superclass, if any.

* [Inherit a base class template **without modifying it**](#nomods)
* [**Override** a base class template in a child class](#overridebase)
* [**Extend** a base class template in a child class](#extendbase)
* [Provide **template extension points** in a base class for content from a child class](#insertcontent)

#### Inherit a base class template without modifying it {#nomods}

To inherit a base class template without modifying it, do not supply a template definition in the
child class declaration.

Base class definition: { .caption }

```js
import {PolymerElement, html} from '@polymer/polymer/polymer-element.js';

export class BaseClass extends PolymerElement {

  static get template() { return  html`This content has been inherited from BaseClass.`; }

}
customElements.define('base-class', BaseClass);
```

Child class definition: { .caption }
```js
import {PolymerElement, html} from '@polymer/polymer/polymer-element.js';
import {BaseClass} from './base-class.js'

export class ChildClass extends BaseClass {
  // ... no template defined, child inherits
  // parent's template
}
customElements.define('child-class', ChildClass);
```

[See a working example in Plunker](http://plnkr.co/edit/pwTJi0QqoyTfjQhPbF83?p=preview).

#### Override a base class template in a child class {#overridebase}

To override a base class's template definition, supply your own template for your child class.

Base class definition: { .caption }


```js
import {PolymerElement, html} from '@polymer/polymer/polymer-element.js';

export class BaseClass extends PolymerElement {

  static get template() { 
    return  html`This content has been inherited from BaseClass.`; 
  }

}
customElements.define('base-class', BaseClass);
```

Child class definition: { .caption }
```js
import {PolymerElement, html} from '@polymer/polymer/polymer-element.js';
import {BaseClass} from './base-class.js'

export class ChildClass extends BaseClass {
    static get template() { 
      return  html`Base class template has been overridden. Hello from ChildClass!`; 
    }

}
customElements.define('child-class', ChildClass);
```

[See a working example in Plunker](https://plnkr.co/edit/RGVxfbAGbqeLYnyeBO0T?p=preview).

#### Extend a base class template in a child class {#extendbase}

You can use the functionality of embedded expressions in JavaScript template literals 
to provide convenient ways to extend [inherited templates](#inherited-templates). 

[Read more about template literals on MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals).

To extend a base class template, include the base class template in your child
class template literal with the expression `${super.template}`. You will also need to tag the
template literal with the `html` function:

```js
static get template() {
  return html`
      <p>This content is from ChildClass.</p>
      <p>${super.template}</p>
      <p>Hello again from ChildClass.</p>`;
}
```

* The expression `${super.template}` will be interpolated and included in the template of the 
  child class. 
* Because the `template` getter is static, `${super.template}` accesses the `template` property
  on the superclass constructor.
* The `html` function checks each expression value. If the expression is an
  `HTMLTemplateElement`, the `innerHTML` of the template is interpolated. 
* To protect against XSS vulnerabilities, `html` only interpolates `HTMLTemplateElement`
  values or template literals tagged with `htmlLiteral`. For information on using `htmlLiteral` to
  interpolate stings, see [Interpolating string values](#string-values).

It's very simple to combine existing templates:

Base class definition { .caption }

```js

class BaseClass extends PolymerElement {
  static get template() {
    return html`
      <p>This content has been inherited from BaseClass.</p>`
  }
}

customElements.define('base-class', BaseClass);
```

Child class definition { .caption }

```js

class ChildClass extends BaseClass {
  static get template() {
    return html`
      <p>This content is from ChildClass.</p>
      <p>${super.template}</p>
      <p>Hello again from ChildClass.</p>
      `;
  }
}

customElements.define('child-class', ChildClass);
```

[See a working example in Plunker](https://plnkr.co/edit/QZM9FD?p=preview).

#### Provide template extension points {#insertcontent}

Polymer makes it easy to provide template extension points in a base class, which a child
class can then optionally override. You can provide template extension points by composing your
base class template literal using expressions, like `${this.partialTemplate}`.

The interpolated expressions act as partial templates ("partials") that the child class can override.

```js
...
//create a base class template with extension points:
static get template() {
  return html`
    <div>${this.headerTemplate}</div>
    <p>Hello this is some content</p>
    <div>${this.footerTemplate}</div>
  `;
}
//supply the default content for the expressions:
static get headerTemplate() { return html`...` }
static get footerTemplate() { return html`...` }
...
```

The expressions must return either a template element (`HTMLTemplateElement`) as shown above, or a specially-tagged
string literal, using `htmlLiteral`:


```js
  static get stylePartial() {
    return htmlLiteral`color: red`;
  }
```

Your child class can override the extension points without changing
the main template. Here's an example in which the child class overrides the base class content:

Base class definition: { .caption }

```js
export class BaseClass extends PolymerElement {
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
export class ChildClass extends BaseClass {
    // template definition inherited from BaseClass

    // partial templates overridden by ChildClass
    static get headerTemplate() { return html`<h2>ChildClass: Header</h2>` }
    static get footerTemplate() { return html`<h2>ChildClass: Footer</h2>` }
  }
```

[See a working example in Plunker](https://plnkr.co/edit/1uEd5Vv2Ob4bGHppzCs9?p=preview).

### Elements with no shadow DOM

To create an element with no shadow DOM, don't specify a `template` getter. Then no shadow root is created for the element.

If the element extends another element that has a DOM template, it will inherit that DOM template instead. To
prevent the element from inheriting the superclass template, define a `template` getter that returns a falsy value:

```js
static get template() {
  return null;
}
```

### URLs in templates {#urls-in-templates}

**Outdated information.** This section needs to be updated after
[issue #5163](https://github.com/Polymer/polymer/issues/5163) is resolved.
{.alert .alert-warning}

A relative URL in a template may need to be relative to an application or to a specific component.
For example, if a component includes images alongside a module that defines an element, the
image URL needs to be resolved relative to the import. However, an application-specific element may
need to include links to URLs relative to the main document.

By default, Polymer **does not modify URLs in templates**, so all relative URLs are treated as
relative to  the main document URL. This is because when the template content is cloned and added
to the main document, the browser evaluates the URLs  relative to the document (not to the original
location of the template).

To ensure URLs resolve properly, Polymer provides two properties that can be used in data bindings:

| Property | Description |
| -------- | ----------- |
| `importPath` | A static getter on the element class. **To set URLs relative to the import, you must override the `importPath` getter.** |
| `rootPath` | An instance property set to the value of `Polymer.rootPath` which is globally settable and defaults to the main document URL. It may be useful to set `Polymer.rootPath` to provide a stable application mount path when using client side routing. |


Relative URLs in styles are automatically re-written to be relative to the `importPath` property.
Any URLs outside of a `<style>` element should be bound using `importPath` or
`rootPath` where appropriate. For example:

```html
// This getter must be defined for your element if  you want to use importPath
static get importPath() {
  // return the base URL for this import
  return import.meta.url;
}

static get template() {
  return html`
    <img src$="[[importPath]]checked.jpg">
  `
}
```

```html
<a href$="[[rootPath]]users/profile">View profile</a>
```

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

```js
class MyElement extends PolymerElement {
  static get template() {
    return html`Hello World from <span id="name"></span>!`;
  }
  ready() {
    super.ready();
    this.$.name.textContent = this.tagName;
  }
}
```

For locating dynamically-created nodes in your element's shadow DOM,
use the standard DOM `querySelector`  method.

<code>this.shadowRoot.querySelector(<var>selector</var>)</code>



## Remove empty text nodes {#strip-whitespace}

**Need update for 3.x.** This needs a new API parallel to `html`...
See https://github.com/Polymer/polymer/issues/4731
{.alert .alert-warning}

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
    class HasWhitespace extends PolymerElement {
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
    class NoWhitespace extends PolymerElement {
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

This processing removes the nested template's original contents (the `content` property will be undefined). If you want
to access the contents of a nested template, you can add the `preserve-content` attribute to the
template.

Preserving the contents of a nested template means it **won't have any Polymer features like
data bindings or declarative event listeners.** Only use this when you want to manipulate the
template yourself, and you don't want Polymer to touch it.

This is a fairly rare use case.

```js
class CustomTemplate extends PolymerElement {

  static get tempate() { return html`
    <template id="special-template" preserve-content>
      <div>I am very special.</div>
    </template>`
    }

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

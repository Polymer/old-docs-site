---
title: What is Polymer?
---

The Polymer library is designed to make it easier and faster
for developers to create great, reusable components for the modern web.

## Custom elements extend the web

HTML provides a set of built-in elements like `<button>`, `<form>` and
`<table>`. Each element has its own API of attributes, properties, methods, and
events. Each element has built-in styling, as well as style properties you can
override using CSS.

Anyone can use these elements to build a simple web page. But they're
limited. To build something as simple as a set of tabs, you need HTML
plus CSS and usually a script, too.

With custom elements, you can extend the vocabulary of HTML with your own elements.
Elements that provide sophisticated UI. Elements that are as easy to use as `<select>`:

```html
<my-tabstrip>
  <my-tab>
    Home
  </my-tab>
  <my-tab>
    Services
  </my-tab>
  <my-tab>
    Contact Us
  </my-tab>
<my-tabstrip>
```

## Is Polymer web components? Is it elements?

Polymer isn't either of those things. Polymer is built on top of the web components standards and it helps you build your own custom elements:

![diagram of web components stack](/images/1.0/webcomponents_stack.svg)

*   **Web components**. These standards provide the primitives you
    need to build new components. You can build your own custom elements
    using these primitives, but it can be a lot of work.

    Not all browsers support these standards yet, so the [web components polyfill
    library](http://webcomponents.org/polyfills/) fills the gaps, implementing the APIs in JavaScript.

*   **The Polymer library**. Provides a declarative syntax that
    makes it simpler to define custom elements. And it adds features like
    templating, two-way data binding and property observation to help
    you build powerful, reusable elements with less code.

*   **Custom elements**. If you don't want to write your own elements, there
    are a number of elements _built with_ Polymer that you can drop
    straight into your existing pages. These elements depend on the Polymer
    library, but you can use the elements without using Polymer directly.

    You can mix and match elements built with Polymer with other
    custom elements, as well as built-in elements.

## Get some elements

The Polymer team has written collections of elements that you can use
in your apps. You can find them on the [Element catalog](https://elements.polymer-project.org/).


## Write your own

Interested in using the Polymer library to build your own elements?

Take a quick tour of the features:

<a href="/1.0/docs/devguide/quick-tour" class="blue-button">Try Polymer</a>

Or jump straight to:

<a href="/1.0/docs/devguide/feature-overview" class="blue-button">
  Developer Guide
</a>

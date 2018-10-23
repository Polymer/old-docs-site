---
title: "Latest releases from the Polymer Project"
---

<!-- toc -->


At Google I/O we announced a lot of new products—lit-html, LitElement, PWA Starter Kit, and the Material Web Components. Since then, you may have noticed it's been a little quiet around here. We've been heads-down working on getting those new products ready for release. 

We've done a lot of incremental releases lately, so we're taking this opportunity to give an update on what we've been working on and what comes next.


## Elements 3.0 released

When we announced Polymer 3.0 at Google I/O, we had preview releases of most elements available. Since then, we have put a lot of work into ensuring all tests are passing and demos are running smoothly. 

**Two weeks ago we released official 3.0 versions of all of the Polymer elements we maintain.**

The 3.0 elements are published on npm, so you can install them using `npm install`: 

```bash
npm install @polymer/paper-button
```

The elements are all registered on [webcomponents.org](https://www.webcomponents.org/). The site was recently updated to correctly show documentation and demos from npm.

Although we are transitioning these elements to "maintenance mode" (critical bug fixes only) as we build out the next-generation Material Web Components set, this release unblocks their use in module-based apps.


## lit-html

[lit-html](https://polymer.github.io/lit-html/) is a next-generation HTML templating library that's built for speed, efficiency, and small code size. Since the preview releases discussed at Google I/O, there have been several releases focused on incorporating feedback from real-world usage.

Recent changes included in lit-html 0.12.0:



*   New syntax for property and attribute binding.
*   New directives.
*   Improved integration with ShadyDOM/Shady CSS polyfills, so you can use lit-html with Shadow DOM when targeting browsers as old as IE11.
*   Changes to the signature of the `render` function, allowing for unbound event listeners.
*   New support for setting options on event listeners. 
*   Performance improvements. Initial implementation of the [repeat](https://polymer.github.io/lit-html/guide/writing-templates.html#-repeat-items-keyfn-template-) directive was updated to use a much more efficient keyed update algorithm that minimizes unnecessary detachment and reattachment.

The only major code change planned between now and the 1.0 release is refactoring of low-level APIs used when implementing directives (for example, the `NodePart` API). Most users won't see API changes between now and 1.0.

The following sections discuss the API changes in the current release.


### Property and attribute binding

lit-html now uses an updated, more consistent template syntax for attributes and properties.Bindings now default to attribute binding, and you can use single-character prefixes to attribute names to specify property (`.`), event (`@`), and boolean attribute (`?`) bindings.


```html
<!-- attribute binding --> 
<div class=${cssClass}>

<!-- boolean attribute binding -->
<button ?disabled=${submitDisabled}>

<!-- property binding -->
<input .value=${searchText}>

<!-- event listener binding -->
<button @click=${clickHandler}>
```



###  New event options

You can now set the `capture`, `passive` and `once` options when you add an event listener. To add options, specify the handler as an object. The object should contain a `handleEvent` function and any options you want to set for the handler.


```js
const listener = {
  handleEvent(e) {
    console.log('clicked');
  }
  capture: true;
}
const button = html`<button @click=${listener}>Click Me</button>`;
```



### Default event context

You can specify a default event context, so that unbound event handlers are called with the same `this` value. This is useful so components don't need to create bound event listeners. This feature is used by LitElement, for example, so that handlers are called with the element instance as `this`.

To set the event context, pass a render options object as the third argument to `render`:


```js
// call all event handlers with the current this value
render(templateResult, destination, {eventContext: this});
```


The render options should not change between renders. 

**Breaking change.** This changes the optional third argument of `render` from a <code>[TemplateFactory](https://polymer.github.io/lit-html/api/modules/_lib_template_factory_.html#templatefactory)</code> to a <code>RenderOptions</code> object. To pass a template factory to render, add a <code>templateFactory</code> property to the options object.


```
render(templateResult, destination, {templateFactory: myTemplateFactory});
```



### New directives

Four new directives—<code>[classMap](https://polymer.github.io/lit-html/api/modules/_directives_classmap_.html#classmap)</code>, <code>[styleMap](https://polymer.github.io/lit-html/api/modules/_directives_stylemap_.html)</code>, <code>[guard](https://polymer.github.io/lit-html/guide/writing-templates.html#-guard-expression-valuefn-)</code>, and <code>[when](https://polymer.github.io/lit-html/guide/writing-templates.html#-when-condition-truetemplate-falsetemplate-)</code>—provide more control over rendering. The API for <code>guard</code> and <code>when</code> are not final, and may change some before 1.0.


## LitElement

[LitElement](https://github.com/Polymer/lit-element/blob/master/README.md) is our next-generation web components base class and is the successor to `PolymerElement`.  Since the preview release discussed at Google I/O, we've been dogfooding the element a lot (e.g. in MWC), and have made several releases incorporating feedback. 

Significant changes include:

*   Refactored [lifecycle API](https://github.com/Polymer/lit-element/blob/master/README.md#api-documentation) to be more consistent and address real-world needs.
*   Updated the docs and samples to reflect the lit-html template syntax changes.
*   Sets the lit-html `eventContext` option so that unbound class methods can be used as event listeners.

In addition, LitElement added some new decorators. Decorators are a proposed language feature currently available in TypeScript or Babel. (Note that decorators are a convenience: everything you can do with decorators you can also do without decorators.)

The current release adds the following decorators:



*   `@customElement()`. Decorates a custom element class.

    ```
	@customElement('my-element') 
	class MyElement extends LitElement { ... }
    ```


*   `@query()`. Decorates a property. Transforms the property into a getter that performs a querySelector on the element's render root.

    ```
	@query('#submit')
    submitButton?: HTMLButtonElement
    ```



*   `@queryAll()`. Decorates a property. Like @query, transforms the property into a getter that performs a querySelectorAll on the element's render root.

    ```
    @queryAll('button')`
    buttons!: NodeList
    ```

*   `@eventOptions()`. Method decorator for setting capture, passive, and once options on event listener methods:

    ```
    @eventOptions({capture: true})
    onClick(e) { ... }
    ```


At this point we consider the codebase to be stable and have no further planned breaking changes to the API, pending feedback.


## Material Web Components

[Material Web Components](https://github.com/material-components/material-components-web-components) is our next-generation element set, developed in partnership with the Material Design team at Google.

Since Google I/O, much of the work in this area has been helping inform the design of lower layers it is built from, including lit-html, LitElement, and the [Material Design Components](https://github.com/material-components/material-components-web).

Now we're shifting our focus back to implementing more of the MDC components as web components, as well as syncing with new versions of the dependencies (LitElement, lit-html, and MDC) and updating the component implementations to TypeScript.


## PWA Starter Kit

[PWA Starter Kit](https://polymer.github.io/pwa-starter-kit/) is the next generation application toolkit with docs, templates, and samples for building best-in-class applications using the the web platform.

Over the past months we've been taking lots of feedback on where the rough edges are and incorporating them into improved documentation and templates.

The last improvements we are working on include providing a TypeScript template and integrating Material Web Components into the template as they become stable.


## Wrap Up

We are in the final stretch of work to release production-ready versions of lit-html, LitElement, and PWA Starter Kit—we hope to have release candidates out in the near future, with production releases following in the next month or so.

The MWC project is progressing, and we will begin making more regular releases as the Material Components project picks up steam and and more components are added.

It's been a long haul, but we're excited to be approaching the next phase of the Polymer Project—1.0 releases for all of our next-generation products.


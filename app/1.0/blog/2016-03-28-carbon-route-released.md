---
title:  "carbon-route Beta Release"
---

We're excited to announce the beta release of the [`carbon-route`](https://github.com/polymerelements/carbon-route) element—a composable, modular web component router! To dive into this new element and see what it can do, check out the [Encapsulated Routing with Elements](https://www.polymer-project.org/1.0/articles/routing.html) article on the Polymer site and take a look at its [documentation in the Polymer Elements catalog](https://elements.polymer-project.org/browse?package=carbon-elements).

The `carbon-route` element provides a declarative, modular way for web components to interact with the URL. This beta version is complete but may still evolve based on your feedback.

Here's an example of how you can use the `carbon-route` (and its included `carbon-location`) element:

```
    <carbon-location route="{{route}}"></carbon-location>
    <carbon-route route="{{route}}" pattern="/tabs/:tabName" data="{{data}}"></carbon-route>

    <paper-tabs selected="{{data.tabName}}" attr-for-selected="key">
      <paper-tab key="foo">Foo</paper-tab>
      <paper-tab key="bar">Bar</paper-tab>
      <paper-tab key="baz">Baz!</paper-tab>
    </paper-tabs>

    <neon-animated-pages selected="{{data.tabName}}"
                         attr-for-selected="key"
                         entry-animation="slide-from-left-animation"
                         exit-animation="slide-right-animation">
      <neon-animatable key="foo">Foo Page Here</neon-animatable>
      <neon-animatable key="bar">Bar Page Goes Here</neon-animatable>
      <neon-animatable key="baz">Baz Page, the Best One of the Three</neon-animatable>
    </neon-animated-pages>
```

The `carbon-route` element is the first of the Polymer project's "carbon" product-line of components—a set designed to help encapsulate structured patterns for building large, complex applications using web components. Other elements that may fill out this product line—including i18n components—are still in their earlier stages. We'll being opening up these elements in a similar "beta" stage once they're at a point of stability to be able to receive meaningful feedback, and are targeting May to have the next handful of these components released. We'd also love to hear about the common application-level problems you run into when building web component-driven apps, that could form the basis of future carbon elements—please feel free to file issues on the [`carbon-elements` meta-repo](https://github.com/polymerelements/carbon-elements/issues) with ideas.

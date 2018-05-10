---
title: What's new in 3.0
---

<!-- toc -->

Polymer 3.0 is the latest version of the Polymer library for building web components. 

Polymer 3.0 represents a simple but important step forward from Polymer 2.x: Polymer 3.0 has moved from HTML Imports to ES6 Modules, and from Bower to npm. These changes represent a move toward the mainstream of JavaScript development, making it easier to use Polymer (and Polymer-based elements) with other popular libraries, frameworks and tools.

Here's a quick sample of defining an element in Polymer 3.0:

<demo-tabs selected="0" name="about-starter" editor-open-file="likeable-element.js" project-path="/3.0/samples/about/starter">
  <paper-tab slot="tabs">likeable-element.js</paper-tab>
  <div>

```js
<!-- include_file 3.0/samples/about/starter/likeable-element.js -->
```

  </div>
  <paper-tab slot="tabs">index.html</paper-tab>
  <div>

```html
<!-- include_file 3.0/samples/about/starter/index.html -->
```

  </div>
</demo-tabs>

**Related products.** For new development, you should also consider [LitElement](https://github.com/Polymer/lit-element/blob/master/README.md), a light, performant, next-generation base class for custom elements. For future application projects, consider starting with the [PWA starter kit](https://github.com/Polymer/pwa-starter-kit/blob/master/README.md), a next-generation Progressive Web App template that uses LitElement and Redux. Both LitElement and PWA starter kit are in preview.
{.alert .alert-tip}

## API changes 

The Polymer 3.0 API is almost 100% backward compatible with Polymer 2.x—the only changes are removing APIs related to HTML Imports (such as `importHref`), and converting Polymer's API to be module-based rather than globals-based.

[API reference](/3.0/docs/api/)

## Upgrade path

Like we did for the Polymer 1.x-to-2.0 transition, we've made a smooth upgrade path our top priority for Polymer 3.0. Polymer's API remains almost unchanged, and we're providing an upgrade tool ([polymer-modulizer](https://github.com/Polymer/polymer-modulizer)) that will automatically handle most of the work in converting your 2.x-based elements and apps to 3.0.

[Upgrade guide](upgrade)


## What's available

With the 3.0 release, we'll be updating not just the core Polymer library, but all of the various resources we provide for building elements and apps with web components:

*   The Polymer CLI and associated tools have been updated to support developing, testing and deploying projects composed of ES Modules.
*   The Polymer Starter Kit and other app and element templates included with the CLI have been converted to use modules.
*   The web component polyfills have been updated. 
*   The Polymer Elements, like the core library, have been converted to ES Modules and published to npm. **The elements are currently in pre-release, and must be installed with the @next version: \
`npm i @polymer/paper-button@next`**

    Final 3.0.0 versions of the elements will be published soon.

In sum, the goal of Polymer 3.0 is to make sure that anyone who has built elements and apps with earlier versions of Polymer (or following patterns and conventions established by Polymer) can easily move to the new version.

## Trying 3.0

The easiest way to try out Polymer is to use an online code editor. The following templates will get you started. The first two editors run code in all supported browsers:

*   [StackBlitz](https://stackblitz.com/edit/polymer-element-example?file=index.js)
*   [Glitch](https://glitch.com/edit/#!/polymer-element-example?path=index.html)

You can also use the following editors, but the code only runs on browsers that support ES6 modules:

*   [JSBin](https://jsbin.com/wuxejiz/edit?html,output)
*   [CodePen](https://codepen.io/kevinpschaaf/pen/BxdErp?editors=1000)

You can also save [this HTML file](https://gist.githubusercontent.com/kevinpschaaf/8a5acbea7b25d2bb5e82eeea2b105669/raw/c3a86872f07603e2d0ddae736687e52a5c8c499f/index.html) to a local file and run it in any browser that supports ES6 modules.</span></span>

See [Try Polymer](/3.0/start/quick-tour) to try out some of Polymer's features.
Once you're ready to try out Polymer 3.0 in a project, you can install it using npm. See [Install 3.0](/3.0/start/install-3-0) for details.</span>

---
title:  "Deprecating /deep/"
---

As you may have heard, the `/deep/` and `::shadow` combinators are [being deprecated](https://www.chromestatus.com/feature/6750456638341120), in favor of using CSS custom properties to more carefully inherit styles across shadow boundaries.

This is important, since it changes the way your app and Polymer elements are using the styles in [`paper-styles`](https://github.com/polymerelements/paper-styles) and [`iron-flex-layout`](https://github.com/polymerelements/iron-flex-layout). Both of these elements offer "mixin" and "classes" versions of all the styles: the classes version, in particular, uses the `/deep/` combinator for each of its styles, making these styles available throughout your application and within all element shadow roots. The mixin version defines [custom property mixins](https://www.polymer-project.org/1.0/docs/devguide/styling.html#custom-css-mixins), which can be selectively applied inside elements where needed.

To help transition away from using `/deep/` and `::shadow`, we’re slowly updating all our elements and their demos, and replacing the “classes” versions of all these styles with the mixin equivalents. This means that, prior to this update, if an element was using the “classes” version of `iron-flex-layout`, you would have been able to magically use any of the flex layout classes in any of your other elements, because `/deep/` made them accessible everywhere. This no longer will be the case, so after updating you might see layout issues in your application, if this was something you were accidentally relying on.

For example, the `paper-toolbar` element used to transitively import the class-based `iron-flex-layout` that used `/deep/` to pierce shadow roots. This means you could have accidentally done something like:

    <link rel=”import” href=”paper-toolbar/paper-toolbar.html”>

    <dom-module id=”my-element”>
      <template>
        <paper-toolbar>
          <div>My App</div>
        </paper-toolbar>

        <div class=”layout horizontal”><!-- this would apply the layout classes from iron-flex-layout even though I didn’t explicitly import them -->
          …
        </div>
      <template>
    </dom-module>

Our recommendation for now is to start using the mixin versions in your app as well. If after the update you’re noticing that some flex styles are no longer being applied correctly, it’s probably the case that your element needs to import ‘iron-flex-layout/iron-flex-layout.html`, and apply the correct flex mixin:

    <link rel=”import” href=”paper-toolbar/paper-toolbar.html”>
    <link rel=”import” href=”iron-flex-layout/iron-flex-layout.html”>

    <dom-module id=”my-element”>
      <template>
        <style>
           .content {
             @apply(--layout-horizontal)
            }
         </style>

        <paper-toolbar>
          <div>My App</div>
        </paper-toolbar>

        <div class=”content”>
          …
        </div>
      <template>
    </dom-module>

Of course, you can also apply the custom layout properties defined in `iron-flex-layout` to your main document, using a [`<style is="custom-style">`](https://www.polymer-project.org/1.0/docs/devguide/styling.html#custom-style) element:

    <html>
    <head>
    <link rel="import" href="iron-flex-layout/iron-flex-layout.html">

    <style is="custom-style">
      .flex-horizontal {
        @apply(--layout-horizontal);
      }
      .flexchild {
        @apply(--layout-flex);
      }
    </style>

    </head>

    <div class="flex-horizontal">
      <div>one</div>
      <div class="flexchild">two (flex)</div>
      <div>three</div>
    </div>
    </html>

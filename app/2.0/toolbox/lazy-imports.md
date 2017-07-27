---
title: Lazy Imports
---

<!-- toc -->

Normal HTML Imports are eager, meaning that they are loaded and evaluated in
order first, before any code that follows. You can get a large performance
improvement by lazily loading code at runtime, so that you only load the
minimal amount of code needed to display the current view. This is a key piece
of [the PRPL pattern](/2.0/toolbox/prpl).


Lazy imports are an optional method for adding declarative lazy-loaded imports. The Polymer CLI
can use lazy imports to provide better analysis—for example, providing appropriate lint errors for
lazy-loaded elements.

## Using lazy imports

The lazy imports mechanism is already built in to the latest version of Polymer starter kit
template.

Using lazy imports, each element with dynamic dependencies declares them explicitly, using a
`lazy-import` link, and loads them using the `importLazyGroup` method.

Follow these steps if you want to add lazy imports to an existing project.

1.  Install `lazy-imports`.

        bower install --save Polymer/lazy-imports#^2.0.0

2.  For each element that will lazily import other elements, import the lazy imports mixin (for
    class-style elements) or behavior (for hybrid elements):

    ```html
    <!-- mixin for class-style elements -->
    <link rel="import" href="../bower_components/lazy-imports-mixin.html">
    ```

    ```html
    <!-- behavior for hybrid elements -->
    <link rel="import" href="../bower_components/lazy-imports-behavior.html">
    ```


3.  Add `lazy-import` links inside the element's `<dom-module>`, but outside its
    `<template>`:

    ```html
    <!-- static dependencies are linked as usual -->
    <link rel="import" href="../bower_components/polymer/polymer-element.html">

    <dom-module id="my-app">
      <!-- lazy imports defined _inside_ the dom-module -->
      <link rel="lazy-import" group="page1" href="my-page1.html">
      <link rel="lazy-import" group="page2" href="my-page2.html">
      <link rel="lazy-import" group="page2" href="some-other-import.html">

      <template>
        ...
        <!-- imported elements are usually used somewhere in the template -->
        <my-page1></my-page1>
        <my-page2></my-page2>
        ...
      </template>
      ...
    </dom-module>
    ```

    Note that each `lazy-import` has a `group` attribute. You'll use this `group` name to load
    the import. Multiple lazy imports can have the same `group` name.

4.  Add the mixin or behavior to the element definition:

    ```js
    class MyApp extends Polymer.LazyImportsMixin(Polymer.Element) {
      static get is() { return 'my-app'}
      ...
    }
    ```

    Or:

    ```js
    Polymer({
      is: 'my-app',
      behaviors: [Polymer.LazyImportBehavior],
      ...
    });
    ```

5.  Use `importLazyGroup` to lazy-load a group of imports.

    ```js
    <!-- import all imports with `group="page2" -->
    this.importLazyGroup('page2');
    ```

Lazy imports create implicit "fragments" and can be bundled appropriately by `polymer build`. If you
define an import using lazy imports, you **don't** need to add that import to the `fragments` list
in `polymer.json`.

## Lazy loading without lazy imports

You can also lazy load without using lazy imports, using the `Polymer.importHref` method:

```js
// resolve the URL relative to the file where the current element is defined
const resolvedUrl = this.resolveUrl('lazy-load-me.html');
// import
Polymer.importHref(
  resolvedUrl,
  // success callback
  () => { console.log('successfully imported', resolvedUrl); }
  // failure callback
  () => { console.log('import failed', resolvedUrl); }
  // async import
  true);
```

When you use this method, the Polymer analyzer and linter may not be able to analyze the imported
types.

In addition, you must list your lazy-loaded imports in the `fragments` section of your `polymer.json`
file so the `polymer build` command processes them correctly:

```js
"fragments": [
  "src/my-view1.html",
  "src/my-view2.html",
  "src/lazy-load-me.html"
]
```



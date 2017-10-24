---
title:  "Shadow DOM v0 and HTML imports are changing"
---


In the near future, Chrome is rolling out two changes that may affect existing Polymer 1.x and 2.x websites:


*   Shadow-piercing selectors  will be disabled. Chrome 63 will disable the shadow-piercing selectors (/deep/ and ::shadow) in style sheets. This change only affects sites using Polymer 1.x that are using native shadow DOM.

*   HTML imports will no longer automatically style the main document. Chrome 65 will make a change to the behavior of HTML imports. Currently, styles from an HTML import are automatically applied to the main document. This behavior is going away in Chrome 65. This change affects sites using either Polymer 1.x or Polymer 2.x. 

The following sections describe these changes in more detail.

## Shadow-piercing selectors

From Chrome 63 on, the `/deep/` combinator and `::shadow` pseudo class selector won't pierce shadow roots when used in style sheets:

*   The `/deep/` combinator acts like the descendant combinator (in other words `html /deep/ div` is treated the same as `html div`). This prevents some global style sheets from breaking entirely.
*   The `::shadow` pseudo class selector doesn't match any elements.

Note `/deep/` and `::shadow` still function when used from JavaScript APIs like `querySelector` and `querySelectorAll`. 

We first posted about [moving away from /deep/](https://www.polymer-project.org/blog/2015-12-01-deprecating-deep.html) in December 2015, so hopefully this is not news to most people. This change only affects Polymer 1.x and web components v0; the web components v1 specs used in Polymer 2.x don't support `/deep/` or `::shadow `at all.

This change is already in Chrome Canary, and will roll out to the stable channel at the beginning of December. Now is the time to test your sites and make sure that they work in Canary.

If you don't have it, [get Chrome Canary here](https://www.google.com/chrome/browser/canary.html).

There are two possible ways to fix this issue:



*   Remove the use of `/deep/` and `::shadow` (recommended).

*   Use shady DOM instead of native shadow DOM.


### Removing /deep/ and ::shadow

The best fix is to eliminate any remaining use of `/deep/` and `::shadow` in your sites. The `::shadow` pseudo class has been fairly lightly used, but `/deep/` was used in the past for theming.

For example, there was a previous version of the `iron-flex-layout` import that used `/deep/`. Search for the following string:


```
iron-flex-layout/classes/iron-flex-layout.html
```


If you're using this import, you're using `/deep/` and you should replace it. The newer import, which does ***not*** use `/deep/` is:


```
iron-flex-layout/iron-flex-layout-classes.html
```


The newer import defines a set of style modules that you can import. If in doubt, just import all of the style modules. For example:


```html
<link rel="import" 
href="../bower_components/iron-flex-layout/iron-flex-layout-classes.html">

<dom-module id="my-element">
  <template>
   <style include="iron-flex iron-flex-reverse iron-flex-alignment iron-flex-factors iron-flex-positioning">
   </style>
   ...
```

Because they don't use shadow-piercing selectors, you need to import these modules into *each scope* where they're used—that is, into each element that uses the layout classes, and also at the document level if you use layout classes there.

For more details, see [Using layout classes](https://github.com/PolymerElements/iron-flex-layout/blob/master/GUIDE.md#using-layout-classes) in the `iron-flex-layout` guide.


### Using shady DOM

If you still have `/deep/` styles that you can't work around, you can work around the issue by using shady DOM instead of native shadow DOM. Using shady DOM everywhere is the *default* setting for Polymer 1.x, so you're only using native shadow DOM if you explicitly enabled it. Reverting to shady DOM will hurt performance on Chrome, so you should regard this as a last resort.

If you're not sure whether you're using native shadow DOM, check for a settings script like this:


```html
 <script src="components/webcomponentsjs/webcomponents-lite.js"></script>
  <script>
    window.Polymer = {
      dom: 'shadow',
      lazyRegister: true
    };
  </script>
```


The settings script is usually in your entrypoint, since it needs to run before you load Polymer or any Polymer element definitions.

If you have a script block like this, you can comment out the `dom: 'shadow'` line, or remove the script entirely (if that's the only setting you currently use). 

If you don't have a script block like this in your entrypoint, you're already using shady DOM. 


## HTML imports styling the main document

In current versions of Chrome, any `<style>` elements in an HTML import affect the main document. For Polymer users, this usually means components like `paper-styles`, which set custom properties using a custom style element `(<custom-style>` in Polymer 2.x, `<style is="custom-style">` in Polymer 1.x). This change ***doesn't*** affect styles defined inside a `<template>`, such as the shadow DOM template for a Polymer element. But it may affect files that you use to define themes:


```html
<!-- my-theme.html -->
<custom-style>
  <style>
    html {
      --my-theme-text-color: #339;
      --my-theme-background: #ffe;
    }
  </style>
</custom-style>
```


If you are using any HTML imports like this, you'll see a deprecation warning in the Chrome console:


```
[Deprecation] Styling master document from stylesheets defined in HTML Imports is deprecated, and is planned to be removed in M65, around March 2018. Please refer to https://goo.gl/EGXzpw for possible migration paths.
```


The good news is we already have a fix for this in the latest versions of Polymer 1.x and 2.x. The bad news is that we can't make the warning go away. (We're looking into a workaround to suppress this warning, which could be shipped in a subsequent version of Polymer.)

With the fix, the `custom-style` element moves its styles into the main document. Unfortunately, the custom style element can't do that until after the browser has parsed the HTML import and printed the warning. So you'll continue to see the warning after upgrading.

What you should do in the next month or two:



*   Ensure that you're running the latest 1.x or 2.x release (1.10.1 or newer for 1.x; 2.1.1 or newer for 2.x).

*   If you have any HTML imports that contain ordinary style tags—not wrapped in a `custom-style` element or inside a template—use a `custom-style` element instead, to ensure the styles are moved into the main document.

    You can also add code to move these styles yourself. The deprecation message includes a link to a github repo with more information and code samples: [TakayoshiKochi/deprecate-style-in-html-imports](https://github.com/TakayoshiKochi/deprecate-style-in-html-imports).


When Chrome Canary upgrades to version 65, you'll want to check your sites again to make sure that everything is working as expected.

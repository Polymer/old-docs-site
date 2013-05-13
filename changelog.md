---
layout: default
title: Changelog
---

This document lists the major changes to the entirety of the project, including polyfill repos.

## 2013-05-09 {#2013-05-09}

### Toolkit

See [all changes](https://github.com/toolkitchen/toolkit/pull/125)

#### Repository changes

* New [`toolkit-elements`](https://github.com/toolkitchen/toolkit-elements) for non-visual elements.

* Project build status: <http://build.chromium.org/p/client.toolkit/waterfall>

* Base example components [were removed](https://github.com/toolkitchen/toolkit/commit/2fdd9e0602f9162765f97985531bbb3301b12780) and separated
into their own [`toolkit-ui`](https://github.com/toolkitchen/toolkit-ui) repo.

* Tests are now being run on Browserstack ([commit](https://github.com/toolkitchen/toolkit/commit/4516edcf1f3639b0a1bb70d39a088c8f51fea1b5))

* Styling tests added for `@host` ([commit](https://github.com/toolkitchen/toolkit/commit/6f7a156bc43c60f07b16eb9443c47dceb7dbf4ad))

#### Elements and animations

* `g-overlay` element with web animations ([commit](https://github.com/toolkitchen/toolkit/commit/9f8f036cebb5ddff9849a37ddb53e62081540715))

* Added `g-fadein`, `g-fadeout` animations ([commit](https://github.com/toolkitchen/toolkit/commit/1569066b09968b41678d35df1bf67a3d8634262a))

* Added `g-shake`, a configurable shake animation ([commit](https://github.com/toolkitchen/toolkit/commit/9344922068bff938e90378e888259cc1a41bcd89))

* Added `g-tabspanel` ([commit](https://github.com/toolkitchen/toolkit/commit/9f711efcee4e3f6ef181a1cb4c2f7d9013a26b2a))

#### Features &amp; bug fixes

* Element registration now puts a `.elementElement` property on the prototpe to reference
the `<element>` ([commit](https://github.com/toolkitchen/toolkit/commit/64f7e64e4356e13fee19b89cef0bda185ebbe920))

* pseudo-scoping now works on Firefox and IE where `cssRule.selectorText` is readonly ([commit](https://github.com/toolkitchen/toolkit/commit/f96ddd200030fd8e8cf82c0dba141863e1761da2))

* Added `.unbind()` and additional machinery for MDV bindings ([commit](https://github.com/toolkitchen/toolkit/commit/197d6f3c6fe08953fd915e243ce2cf8861347ee1))

* Attributes de-serialization is more predicable. For example, numbers are treated
as numbers, srings as strings, dates as `Date`, etc. ([commit](https://github.com/toolkitchen/toolkit/commit/ef601c3f8cf77a72c3a7a60f0f5b925dd5208e36), [commit](https://github.com/toolkitchen/toolkit/commit/6f04747ecd2f281dfc08273c2f1422cf24d138a8), [commit](https://github.com/toolkitchen/toolkit/commit/ec15352311f39594f2cc43d42d40db017e9293a8))

* MDV v3 is the default now.

* MDV bindings are more comprehensive, with Node, Text, and `<input>` elements ([commit](https://github.com/toolkitchen/toolkit/commit/2e11ba658916df02c8ba87ead037ce0104a6b205)) 

* `Toolkit.getBinding(element, name)` no longer generates an exception if elemement is null [[commit](https://github.com/toolkitchen/toolkit/commit/a270417d136b6f00205ea60d451be9d296e9745d))

### Platform

#### Custom Elements

* Implement life cycle callbacks (inserted|removed|attributeChanged) using MutationObsevers.
Note: you can no longer add lifecycle callbacks to a `lifecycle` object. They must be
on the prototpye. ([commit](https://github.com/toolkitchen/CustomElements/commit/68da1e33bf5fdbab805b0d695d15729e4d379282))

* Fix for source map URLs ([commit](https://github.com/toolkitchen/CustomElements/commit/40cc09c5acbbd543d83ff8f14b568ffa5eef3878))

* `document.register()` only triggers document-wide upgrade when called after
initial load is complete ([commit](https://github.com/toolkitchen/CustomElements/commit/2c80460cba9f742e4f3fef434b225ef1829de39b))

#### HTML Imports

* Export `HTMLImports.getDocumentUrl()` method ([commit](https://github.com/toolkitchen/HTMLImports/commit/0bdff1841f151cd7479a98338a6521cba4ef9c82))

* `HTMLImports.readyTime` added for primative timing data [[commit](https://github.com/toolkitchen/HTMLImports/commit/414b70756d05fcf6b344c942163e5d6a777c4f5c))

* Caching is configurable with `.cache` [[commit](https://github.com/toolkitchen/HTMLImports/commit/4e4a2afb03803e55f5b12149ffaa5704ca50e0e6))


#### MDV

#### Shadow DOM

## 2013-04-17 {#2013-04-17}

### Toolkit

* If you're writing a [Toolkit component](/toolkit-kernel-explainer.html), there's
no longer need to include `platform.js` alongside `toolkit.js`. `toolkit.js` now loads `platform.js` under the hood. 

### Platform

#### CustomElements

* The `constructor` attribute is now supported ([commit](https://github.com/toolkitchen/CustomElements/commit/96417cf084daf1421a9786e39282206f4ef6d35e))

#### HTML Imports

* Fixed issue with imports loaded at the same url would not have the content associated with them ([commit](https://github.com/toolkitchen/HTMLImports/commit/882a9b6cc53d41d46967346b0b7e32edc4a6f7b9))

* Polyfill now correctly checks for `HTMLTemplateElement` before using it ([commit](https://github.com/toolkitchen/HTMLImports/commit/24283edea12b36ae0db0e7f928fdcb20a6e46eda))

* If `HTMLTemplateElement.bootstrap` is available, then bootstrap templates in imported documents. ([commit](https://github.com/toolkitchen/HTMLImports/commit/8c842e1c1bf3f13ca2097386886874f873e8ec0b))

## 2013-04-11 {#2013-04-11}

<p class="alert">
  <b>Notice</b>: This release contains important changes to the structure of the project.
</p>

* The `toolkit` repository now brings in the `platform` repository as a submodule.
* Until now, the _dev_ branch has been the development branch and _master_ has
been the stable release. Now, the _stable_ branch is the default "stable" codebase.
_master_ branches are the in-development tip of tree. The _stable_ branch is also
the default view on Github.

### Toolkit

* `g-component.html` no longer exists as the Tookit kernel. It has been replaced
with loading in `toolkit.js` instead.
* Added `debug` [runtime flags](/runtime-config.html) to conditionally load debug
version of `platform.js`.

## 2013-02-25 {#2013-02-25}

### Toolkit

* Changed "toolkit/src" folder name to "toolkit/components". Update your source paths accordingly.

* Introduced `selectedClass` property to g-selector component. ([commit](https://github.com/toolkitchen/toolkit/commit/a1565b536ea05cddf7a5984c15017c2bc803d1e5))

* g-selector now sends an `activate` event which is fired whenever an item is activated (can occur when the currently selected item is activated). The `select` event is fired only when the selected item changes. ([commit](https://github.com/toolkitchen/toolkit/commit/5aaddd82d89796b493726d31fb5ab2d73a7e1770))

* g-menu-button: the menu now closes in response to the selector's activate event ([commit](https://github.com/toolkitchen/toolkit/commit/5aaddd82d89796b493726d31fb5ab2d73a7e1770))

* g-selection: selecting the same item is now a no-op ([commit](https://github.com/toolkitchen/toolkit/commit/0075c4c4c39afa1235e8afd3580099f6c530a5ff))

* Added support for 2-way bindings on input elements ([commit](https://github.com/toolkitchen/toolkit/commit/16715bbb25fbb8a97455e66cd17021b7761ae0ad))

* g-ajax: Response is bindable; params can be set as json or object.

* g-panels: Added `autoselect` property that controls if keys/swipes can select panels; added `canselect` event to control if a panel can be selected.

### Platform

* Landed version 2 of the Shadow DOM shim. See the [pull request](https://github.com/toolkitchen/polyfills/pull/88) for details.

* ShadowRoot now installs shadow reference on `node.webkitShadowRoot`, as per spec. Fixes [#68](https://github.com/toolkitchen/toolkit/issues/68). ([commit](https://github.com/toolkitchen/toolkit/commit/34363b6093674956118d8d82cea389961d0e5337))

* Loader: allow stylesheets and scripts in components defined in document. ([commit](https://github.com/toolkitchen/toolkit/commit/9875a08fb3f0b153ea044d19b8b3b39cf6e3656c))

### Tools

* Shadow DOM inspector
Added a tool for inspecting Shadow DOM trees. You can invoke the tool via <code>window.sinspect(<em>node</em>)</code>, where `node` is the element to start inspecting from. If not specified then it will use `document.body`.

To use the tool, open the JavaScript console and type `sinspect()`.

**Note**: The tool opens in a pop-up window so you may have to unblock it.

![](images/changelog/sinspect-screen.png)






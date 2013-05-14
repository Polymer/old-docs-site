---
layout: default
title: Changelog
---

This document lists the major changes to the entirety of the project, including polyfill repos.

## 2013-05-13 {#2013-05-13}

**Notice**: This release contains important changes to the structure of the project.
{:.centered .alert .alert-info}

Project renamed to <https://github.com/polymer-project>

## 2013-05-09 {#2013-05-09}

### Toolkit

See the [full list of changes](https://github.com/polymer-project/toolkit/pull/125).

* Project has a build status at <http://build.chromium.org/p/client.toolkit/waterfall>
and tests are being run on Browserstack ([commit](https://github.com/polymer-project/toolkit/commit/4516edcf1f3639b0a1bb70d39a088c8f51fea1b5))

* Base example components [were removed](https://github.com/polymer-project/toolkit/commit/2fdd9e0602f9162765f97985531bbb3301b12780) and separated
into their own [`toolkit-ui`](https://github.com/polymer-project/toolkit-ui) repo,
while the [`toolkit-elements`](https://github.com/polymer-project/toolkit-elements) repo
contains non-visual elements.

* A [sandbox tool](https://github.com/polymer-project/projects/commit/02e45ebfc4815816544b608077880f949a10e8ea) was
added to projects.

**Elements and animations**

* New `g-overlay` element with web animations ([commit](https://github.com/polymer-project/toolkit/commit/9f8f036cebb5ddff9849a37ddb53e62081540715)) and `g-tabspanel` ([commit](https://github.com/polymer-project/toolkit/commit/9f711efcee4e3f6ef181a1cb4c2f7d9013a26b2a))

* Added `g-fadein`, `g-fadeout` animations ([commit](https://github.com/polymer-project/toolkit/commit/1569066b09968b41678d35df1bf67a3d8634262a)) and `g-shake`, a configurable shake animation ([commit](https://github.com/polymer-project/toolkit/commit/9344922068bff938e90378e888259cc1a41bcd89))

**Features &amp; bug fixes**

* Element registration now puts a `.elementElement` property on the prototpe to reference
the `<element>` ([commit](https://github.com/polymer-project/toolkit/commit/64f7e64e4356e13fee19b89cef0bda185ebbe920))

* pseudo-scoping now works on Firefox and IE where `cssRule.selectorText` is readonly ([commit](https://github.com/polymer-project/toolkit/commit/f96ddd200030fd8e8cf82c0dba141863e1761da2))

* Attributes de-serialization is more predicable. For example, numbers are treated
as numbers, srings as strings, dates as `Date`, etc. ([commit](https://github.com/polymer-project/toolkit/commit/ef601c3f8cf77a72c3a7a60f0f5b925dd5208e36), [commit](https://github.com/polymer-project/toolkit/commit/6f04747ecd2f281dfc08273c2f1422cf24d138a8), [commit](https://github.com/polymer-project/toolkit/commit/ec15352311f39594f2cc43d42d40db017e9293a8))

* MDV v3 is now turned on by default.

  * Added `.unbind()` and additional machinery for MDV bindings ([commit](https://github.com/polymer-project/toolkit/commit/197d6f3c6fe08953fd915e243ce2cf8861347ee1))

  * MDV bindings are more comprehensive, with Node, Text, and `<input>` elements ([commit](https://github.com/polymer-project/toolkit/commit/2e11ba658916df02c8ba87ead037ce0104a6b205)) 

* `Toolkit.getBinding(element, name)` no longer generates an exception if element is null [[commit](https://github.com/polymer-project/toolkit/commit/a270417d136b6f00205ea60d451be9d296e9745d))

### Platform

#### Custom Elements

See the [full list of changes](https://github.com/polymer-project/CustomElements/pull/25).

* Implement life cycle callbacks (inserted|removed|attributeChanged) using MutationObsevers.
**Note**: you can no longer add lifecycle callbacks to a `lifecycle` object. They must be
on the prototpye. ([commit](https://github.com/polymer-project/CustomElements/commit/68da1e33bf5fdbab805b0d695d15729e4d379282))

* `document.register()` only triggers document-wide upgrade when called after
initial load is complete ([commit](https://github.com/polymer-project/CustomElements/commit/2c80460cba9f742e4f3fef434b225ef1829de39b))

* `document.register()` tests were updated to align with spec changes ([commit](https://github.com/polymer-project/CustomElements/commit/0aabe6b5fc66e847db8fa2988519d202641e9dfb))

* Added support for native `document.webkitRegister()` (if available) ([commit](https://github.com/polymer-project/CustomElements/commit/5cb7a971135162d40fd078a9fafdc9bd2c0eb91e))

* `attributeChanged` callback only fires when attribute has actually been modified ([commit](https://github.com/polymer-project/CustomElements/commit/9f7cf5268b01c9c9568b6d239995f6b01a027012))

* `<style>` elements are now (correctly) ignored if they're in the main document ([commit](https://github.com/polymer-project/CustomElements/commit/632ef0f43a5bb693580345096c1748e27990e39f))


#### HTML Imports

See the [full list of changes](https://github.com/polymer-project/HTMLImports/pull/8)

* `HTMLImports.getDocumentUrl()` added ([commit](https://github.com/polymer-project/HTMLImports/commit/0bdff1841f151cd7479a98338a6521cba4ef9c82))

* `HTMLImports.readyTime` added for primative timing data [[commit](https://github.com/polymer-project/HTMLImports/commit/414b70756d05fcf6b344c942163e5d6a777c4f5c))

* Caching is configurable with `.cache` [[commit](https://github.com/polymer-project/HTMLImports/commit/4e4a2afb03803e55f5b12149ffaa5704ca50e0e6))

#### MDV

See the [full list of changes](https://github.com/polymer-project/mdv/pull/65)

* Now using ChangeSummary v3 ([commit](https://github.com/polymer-project/mdv/commit/a82e4f56c7fa24970c27244d623b1a10fd740822))

* Removed `.effectiveContent` API ([commit](https://github.com/polymer-project/mdv/commit/66f5ec16998ee17dcdbd20759494ddd9900470ae))

* Removed `HTMLTemplateElement.bindTree` in favor of `template.model` ([commit](https://github.com/polymer-project/mdv/commit/b31c6fc016ea81088059f0b628dc253ade201cf8))

* Exposed `HTMLTemplateElement.parseAndBind_` ([commit](hen/mdv/commit/075f5f22e0b55783e1cd1486d02f2d1002e3ef8d))

* Implemented `.getInstanceModel` for returning the model associated with a template ([commit](https://github.com/polymer-project/mdv/commit/b6af70e922c49fc6fc85e782e549831d3680712e))

#### Pointer Events / Gestures

See the full list of changes [here](https://github.com/polymer-project/PointerEvents/pull/65) and [here](https://github.com/polymer-project/PointerGestures/pull/3).

* `touch-action: user` is an alias for `touch-action: none` ([commit](https://github.com/polymer-project/PointerEvents/commit/5d3d05cadbdb9ce53749a31a3c6f424566056da6))

* Fix `pointercapture` throws on IE10 ([commit](https://github.com/polymer-project/PointerEvents/commit/d338d9fc314961650c418101d4603b2a3a8c0302))

* Expose `.clientXY`, `.pageXY`, `.screenXY` of track gestures. ([commit](https://github.com/polymer-project/PointerGestures/commit/2c25f0cc6ca6a9edd993052dc0c4b13def37005c))

#### Shadow DOM

See the [full list of changes](https://github.com/polymer-project/ShadowDOM/pull/139)

* Implemented `.querySelector|All()` and `.getElementById()` ([commit](https://github.com/polymer-project/ShadowDOM/commit/8efd247fbf52f75a4f5c07e3d939dcf4500c4f62), [commit](https://github.com/polymer-project/ShadowDOM/commit/1bc20a60860b816e070feac44863053a2c6acb9b))

* Implemented `.elementFromPoint` for `document` and ShadowRoot ([commit](https://github.com/polymer-project/ShadowDOM/commit/1a11be889a1f76ca45e09655f7e7ed5b2aeaa297))

* Wrapped `MutationRecord` interface now that Blink has it. ([commit](https://github.com/polymer-project/ShadowDOM/commit/7079f38054dad74b2c0e4e18421bd11946e9f56f))

* `document.write()` is now [overriden](https://github.com/polymer-project/ShadowDOM/commit/733b350e15ea800f95efab2caae0a4c008d07ca0) and wrapped in the polyfill ([commit](https://github.com/polymer-project/ShadowDOM/commit/07be1f387f9a099bd9a13a0edf193acbf0f5c522))

## 2013-04-17 {#2013-04-17}

### Toolkit

* If you're writing a [Toolkit component](/toolkit-kernel-explainer.html), there's
no longer need to include `platform.js` alongside `toolkit.js`. `toolkit.js` now loads `platform.js` under the hood. 

### Platform

#### CustomElements

* The `constructor` attribute is now supported ([commit](https://github.com/polymer-project/CustomElements/commit/96417cf084daf1421a9786e39282206f4ef6d35e))

#### HTML Imports

* Fixed issue with imports loaded at the same url would not have the content associated with them ([commit](https://github.com/polymer-project/HTMLImports/commit/882a9b6cc53d41d46967346b0b7e32edc4a6f7b9))

* Polyfill now correctly checks for `HTMLTemplateElement` before using it ([commit](https://github.com/polymer-project/HTMLImports/commit/24283edea12b36ae0db0e7f928fdcb20a6e46eda))

* If `HTMLTemplateElement.bootstrap` is available, then bootstrap templates in imported documents. ([commit](https://github.com/polymer-project/HTMLImports/commit/8c842e1c1bf3f13ca2097386886874f873e8ec0b))

## 2013-04-11 {#2013-04-11}

**Notice**: This release contains important changes to the structure of the project.
{:.centered .alert .alert-info}

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

* Introduced `selectedClass` property to g-selector component. ([commit](https://github.com/polymer-project/toolkit/commit/a1565b536ea05cddf7a5984c15017c2bc803d1e5))

* g-selector now sends an `activate` event which is fired whenever an item is activated (can occur when the currently selected item is activated). The `select` event is fired only when the selected item changes. ([commit](https://github.com/polymer-project/toolkit/commit/5aaddd82d89796b493726d31fb5ab2d73a7e1770))

* g-menu-button: the menu now closes in response to the selector's activate event ([commit](https://github.com/polymer-project/toolkit/commit/5aaddd82d89796b493726d31fb5ab2d73a7e1770))

* g-selection: selecting the same item is now a no-op ([commit](https://github.com/polymer-project/toolkit/commit/0075c4c4c39afa1235e8afd3580099f6c530a5ff))

* Added support for 2-way bindings on input elements ([commit](https://github.com/polymer-project/toolkit/commit/16715bbb25fbb8a97455e66cd17021b7761ae0ad))

* g-ajax: Response is bindable; params can be set as json or object.

* g-panels: Added `autoselect` property that controls if keys/swipes can select panels; added `canselect` event to control if a panel can be selected.

### Platform

* Landed version 2 of the Shadow DOM shim. See the [pull request](https://github.com/polymer-project/polyfills/pull/88) for details.

* ShadowRoot now installs shadow reference on `node.webkitShadowRoot`, as per spec. Fixes [#68](https://github.com/polymer-project/toolkit/issues/68). ([commit](https://github.com/polymer-project/toolkit/commit/34363b6093674956118d8d82cea389961d0e5337))

* Loader: allow stylesheets and scripts in components defined in document. ([commit](https://github.com/polymer-project/toolkit/commit/9875a08fb3f0b153ea044d19b8b3b39cf6e3656c))

### Tools

* Shadow DOM inspector
Added a tool for inspecting Shadow DOM trees. You can invoke the tool via <code>window.sinspect(<em>node</em>)</code>, where `node` is the element to start inspecting from. If not specified then it will use `document.body`.

To use the tool, open the JavaScript console and type `sinspect()`.

**Note**: The tool opens in a pop-up window so you may have to unblock it.

![](images/changelog/sinspect-screen.png)






---
layout: default
title: Changelog
---

This document lists the notable changes across the entirety of the project,
including polyfill repos, tools, projects, and UI elements.

{%comment%}
## 2013-08-02 {#2013-08-02}

See the [full list of changes](https://github.com/Polymer/polymer/releases/tag/v0.0.20130802).

### {{site.project_title}}

#### General

**Changes**

**Features**

#### Core

### Platform

#### Custom Elements

#### HTML Imports

#### MDV

#### Pointer Events

#### Shadow DOM

### Elements & Projects

#### polymer-elements

#### polymer-ui-elements

---
{%endcomment%}

## 2013-07-11 {#2013-07-11}

See the [full list of changes](https://github.com/Polymer/polymer/releases/tag/v0.0.20130711).

### {{site.project_title}}

#### General

All hail `<polymer-element>`!

Declaring elements is now `<polymer-element name="tag-name">` (was `<element name="tag-name">`).
Elements are now auto registered, so a script tag is no longer required:

    <polymer-element name="tag-name">
      <template>...</template>
    </polymer-element>

**Features**

More complex elements are registered with `Polymer('tag-name', {prototype})` (was `Polymer.register(this, {prototype})`). This allows for more flexible script decoupling:

1. `<script src>` works now
1. `<script>` can come before or inside the element, but not after

**Changes**

1. Script scope is no longer special (e.g. `this` no longer refers to the element).
1. Closures are not longer supported for private variables. Private vars should be done
with the standard methods like anonymous self calling functions.

#### Core

- `.resetStyleInheirtance` can now be defined on the element's prototype ([commit](https://github.com/Polymer/polymer/commit/411d53c34c9121952f0be66f761a1a1a13f8c78e))
- Shadow DOM shhim styling has been moved into platform as `ShadowCSS` ([commit](https://github.com/Polymer/polymer/commit/ae24b2a8e288747cfc178282de927d54050f9b5a))

### Platform

- Polyfill `<template>`/`<element>` styling not use `!important`. Fixes [#191](https://github.com/Polymer/polymer/issues/191).
- Add `array()` and `forEach()` to `NodeList`, `NamedNodeMap`, `HTMLCollection` ([commit](https://github.com/Polymer/platform/commit/32c1f4a7df6bce56586134908f2d98ab616e7dac))

#### Custom Elements

- Script execution is more specific to JS ([commit](https://github.com/Polymer/CustomElements/commit/bdc3139c9c0ac04dd748668d05a10625df889b3f))

#### HTML Imports

- Scripts within `<template>` content are now executed. Fixes [#22](https://github.com/Polymer/HTMLImports/issues/22).
- Non-JS script tags are no longer parsed ([commit](https://github.com/Polymer/HTMLImports/commit/0f35bd21fab3e0e9b99b525581d1135f27787dd1)) 

#### MDV

- CompoundBindings have been sped up ([commit](https://github.com/Polymer/mdv/commit/27b9cc6dfa69745aadb862780ae71b905e74014f), [commit](https://github.com/Polymer/mdv/commit/b01b4867805311f3815f4e065cea0ced5dd4d4a2))
- Binds have a more consistent API ([commit](https://github.com/Polymer/mdv/commit/95c4eca5a89ed3d04af1c6607a61f49d35d05ca6))
- Initial work on MDV benchmarking ([commit](https://github.com/Polymer/mdv/commit/79b3d33bc199315f1424ff9ef072ec44e0482668))
- Ensure `getInstanceModel()` is only called when a new instance will be created. Allows for the common case of inserting an instance via a `DocumentFragment` ([commit](https://github.com/Polymer/mdv/commit/694a4114779a9cd8ea3c915d1f5e9ec5ad6bd68c))

#### Pointer Events

- Use ES6 `Map` where available ([commit](https://github.com/Polymer/PointerEvents/commit/84ac51c69a2e53fafb7e00696917bb260d760497))
- `allShadows()` method added to find all shadow roots ([commit](https://github.com/Polymer/PointerEvents/commit/812f79efdcb5557923f7ae1ab05eaedc9971c1a6))
- Handle IE 11 use of string `.pointerType` ([commit](https://github.com/Polymer/PointerEvents/commit/0fbec53b1c2b656ea149728eab5f9e2f0c8e8410))
- Don't override native `PointerEvent` ([commit](https://github.com/Polymer/PointerEvents/commit/a38f1ab0697e186ca77e6e5c94030036d1163e34))
- Use `shadow.olderShadowRoot` when possible. Fixes [#81](https://github.com/Polymer/PointerEvents/issues/81).
- Touch will try to use `touch-action` or use the old `MutationObserver` method ([commit](https://github.com/Polymer/PointerEvents/commit/614e60b5b97373558c6fa2b5ab7310f9d156ffab))

#### Shadow DOM

- `Event.path` always originates from the target ([commit](https://github.com/Polymer/ShadowDOM/commit/9f888b01c1ae9e0c745232e1525848bcbee7d7d9))
- Fixed issue where FF24 doesn't support `document.createEvent('FocusEvent')` ([commit](https://github.com/Polymer/ShadowDOM/commit/f183806ac65097d754afa5b0e886a61d5677cb8e))

### Elements & Projects

#### polymer-elements

- Added `<polymer-overlay>` ([commit](https://github.com/Polymer/polymer-elements/commit/d3f92ce3a20da925f839e6aae56cec75c5919165))
- Added `<polymer-key-helper>` ([commit](https://github.com/Polymer/polymer-elements/commit/9f1b18741eb968b6740a3a889428151f495a2740))
- Added `<polymer-file>` ([commit](https://github.com/Polymer/polymer-elements/commit/afb5f7a006c94f4f100b6b38aa44b5973d147a0b))
- Added `<polymer-animation>` elements ([commit](https://github.com/Polymer/polymer-elements/commit/cfd4c49699b4dba01963f3169847b7d9f4150d51))
- Added `<polymer-media-query>` ([commit](https://github.com/Polymer/polymer-elements/commit/b9fccc0c6d685c38d2a43ac873636b752c64200c))
- Added `<polymer-selector>` ([commit](https://github.com/Polymer/polymer-elements/commit/f0a603467c657b98dff2240c5cf02e24fb339dfb))

#### polymer-ui-elements

- Added `<polymer-ui-accordian>` ([commit](https://github.com/Polymer/polymer-ui-elements/commit/00da2f56e1eadac5c861063ad8b31a2a4ea39319))
- Added `<polymer-ui-splitter>` ([commit](https://github.com/Polymer/polymer-ui-elements/commit/e6d8029c73720a734a157ec0b3743f47b4707eaf))
- Added responsive design to toolbar ([commit](https://github.com/Polymer/polymer-ui-elements/commit/7e856f76b93a60f5457c863d9663e4bb302a1889))

---

## 2013-06-17 {#2013-06-17}

**Notice**: This release contains important changes to the structure of the project.
{:.centered .alert .alert-info}

The repo structure was "flattened" such that `platform` and `polymer` repos no
longer contain submodules. Instead, the dependencies need to be checked out as siblings.
For example, `platform` now expects `HTMLImports`, `CustomElements`, `PointerEvents`, `MDV`, `ShadowDOM`, etc. to be siblings. `polymer` expects to be siblings with all of them. **Unless you're
working directly on {{site.project_title}}, it's safe to stick with [`polymer-all`](https://github.com/Polymer/polymer-all/tree/master).**

### {{site.project_title}}

#### General

- The [Bower component](https://github.com/components/polymer) has been updated to reflect
this release.
- {{site.project_title}}-based [TodoMVC app](http://todomvc.com/labs/architecture-examples/polymer/index.html) ([source](https://github.com/Polymer/todomvc)) was published.
- [MDV Expression Syntax](https://github.com/Polymer/mdv/blob/master/docs/expression_syntax.md) is on by default ([commit](https://github.com/Polymer/polymer/commit/5b869b5b03880435c288383a042a366314914ea7)). No changes are necessary for your current usage of templates. New features include support for inline math expressions, named scoping, and more. [Read more](https://github.com/Polymer/mdv/blob/master/docs/expression_syntax.md).
- To reduce memory leaks, **elements created 1.) in JavaScript (e.g. `document.createElement('x-foo')`) and 2.) not in the DOM will lose their bindings, asynchronously**. ([commit](https://github.com/Polymer/polymer/commit/5b869b5b03880435c288383a042a366314914ea7))
  - If you want an element to remain *active* when it's not in the `document`
  (e.g. it keeps its MDV bindings and `*Changed` methods), you must call
  `this.cancelUnbindAll()` after it's been created or removed. The `ready()` callback
  is a good place for creation time.
  - If you call `cancelUnbindAll()` and never put the element back in the DOM,
  it is your responsibility to eventually call `this.unbindAll()/asyncUnbindAll()`. Otherwise, you will leak memory.

#### Core

- Arrays and Objects are supported as attributes ([commit](https://github.com/Polymer/polymer/commit/8bdeba4ffafba4997f47387435e32c800cff8e9f))
- Polyfill support for `:scope` instead of `@host` ([commit](https://github.com/Polymer/polymer/commit/e226596c0504b651f3b1bc48093f9cd02adc247e))
- Style are correctly applied to type extension custom elements (e.g. `[is="x-foo"]`) ([commit](https://github.com/Polymer/polymer/commit/4b64c878c82a2d51b253565e988e081e09497994))
- The other lifecycle callbacks (`inserted`, `removed`, `attributeChanged`) can
  be setup in the `Polymer.register()` call in addition to `ready`. **Note**: these
  names are shorter than the spec's API.

### Platform

#### Custom Elements

See the [full list of changes](https://github.com/Polymer/CustomElements/pull/41).

- Support non-enumerable properties defined on `HTMLElement` prototypes ([commit](https://github.com/Polymer/CustomElements/commit/3f09cb9035040acb823a4561878f0bf697d2fb9a))
- Boostrap on `DOMContentLoaded` instead of `window.load`. Go immediately if
`document.readyState === 'complete'` ([commit](https://github.com/Polymer/CustomElements/commit/4ddb59a57a8ac09ef43f241aba0bbca448046105))
- `.constructor` references correct name defined in `<element>`'s `contructor` attribute ([commit](https://github.com/Polymer/CustomElements/commit/e34dc4204355bf8d01399d75b9dbc47b7a237ddc))
- Update to new source map syntax (from `//@` to `//#`) ([commit](https://github.com/Polymer/CustomElements/commit/b89e86d65218d5671aefd3770e8720cf4ed9b75f))

#### HTML Imports

See the [full list of changes](https://github.com/Polymer/HTMLImports/pull/14).

- Loading now kicks off immediately if `document.readyState === 'complete'` ([commit](https://github.com/Polymer/HTMLImports/commit/121789488287c0b59d8c546bcb9ac0e8ca686357))
- Do not load external stylesheets that are not in `<element>`. Also support external
  stylesheets inside of `<template>` ([commit](https://github.com/Polymer/HTMLImports/commit/8df92bfcb989560bae9a5b4c909ed115e0acbbe6))
- Update to new source map syntax (from `//@` to `//#`) ([commit](https://github.com/Polymer/HTMLImports/commit/cf8edfde3ba4e71454e99acf192946cc2b76fa60))

#### MDV

See the [full list of changes](https://github.com/Polymer/mdv/pull/106).

- Support binding to `HTMLSelectElement.selectedIndex` ([commit](https://github.com/Polymer/mdv/commit/53a5d78b329b9a52ad9426bbd57b9322f42f1bd2))
- `HTMLTemplateElement.createInstance()` now takes model &amp; syntax string (e.g. `template.createInstance(model, 'MDV')`) ([commit](https://github.com/Polymer/mdv/commit/22c32ebfa84b6e08341b2e1af71a25b5bee4b2be))
- Implement two-way binding to `HTMLTextArea.value` ([commit](https://github.com/Polymer/mdv/commit/55104c3fed41db04f98076f825bc32f6dfc5624f))
- Named scopes are supported (e.g. `{%raw%}<template repeat="{{item in items}}">{%endraw%}`) ([commit](https://github.com/Polymer/mdv/commit/0e98ae0b017f722030e5203d3a151f07f9f392bf)). [Read more](https://github.com/Polymer/mdv/blob/master/docs/syntax_api.md).
- Implement [MDV Syntax expressions](https://github.com/Polymer/mdv/blob/master/docs/expression_syntax.md) ([commit](https://github.com/Polymer/mdv/commit/63e8fad3cda4e4505da119577b8cb164d321bfd4))
- Allow `<template if="{%raw%}{{expr}}{%endraw%}">` to be equivalent to `<template bind if="{%raw%}{{expr}}{%endraw%}">` ([commit](https://github.com/Polymer/mdv/commit/9657f53fe38d2c87dd2b1f34398a41fafadc73b2))

#### Pointer Events

See the [full list of changes](https://github.com/Polymer/PointerEvents/pull/77).

- Split mouse/touch/MS events into their own modules ([commit](https://github.com/Polymer/PointerEvents/commit/946d643f9bc304f75fe1f4ec008ac43dee7eec2f))
- Touches that fall off the screen are handled more gracefull ([commit](https://github.com/Polymer/PointerEvents/commit/9bab6b80e74fcbbdb4145286aae264ae54175419))

#### Shadow DOM

See the [full list of changes](https://github.com/Polymer/ShadowDOM/pull/171).

- Alias `.createShadowRoot()` to `.webkitCreateShadowRoot()` ([commit](https://github.com/Polymer/ShadowDOM/commit/8645527db46c31d217ebc2fdbaaff63ce6081cf2))
- Remove `shadowRoot.insertionParent` per spec ([common](https://github.com/Polymer/ShadowDOM/commit/f798ba26e895bb65456920ea33844d1dc9960dd6))
- Implement `event.path` ([commit](https://github.com/Polymer/ShadowDOM/commit/3b1422cb6a6c7e429038168993192a4c8435035a))

### Elements & Projects

- Added `<polymer-meta>` for storing metadata ([commit](https://github.com/Polymer/polymer-elements/commit/832a45a543371b4756bd42f90f8209f420f5a83a))
- Added `<polymer-ui-ratings>` ([commit](https://github.com/Polymer/polymer-ui-elements/commit/a9a5d26992285ba9f1122541a3e8d56ded2d5c19))
- Added `<polymer-ui-toggle-button>` ([commit](https://github.com/Polymer/polymer-ui-elements/commit/5904e63b8eb9bd295a1bcd7e940870f83df4260e))
- Added `<polymer-ui-tabs>` ([commit](https://github.com/Polymer/polymer-ui-elements/commit/1812da5110df5f382ce9982ac5f297565edc1bad))


- Initial work on [Polymer Elements Playground](https://github.com/Polymer/projects/commit/1dd87c03e30ae34d1266c943c1a42466b43788f4)
- Added port of [Memory Game](https://github.com/Polymer/projects/commit/1dd6746d918c72e316fa65e2c975640da56768c7)

---

## 2013-06-05 {#2013-06-05}

### {{site.project_title}}

See the [full list of changes](https://github.com/Polymer/polymer/pull/172).

- `asend()` is deprecated. Please use [`asyncFire()`](http://www.polymer-project.org/polymer.html#fire) instead ([commit](https://github.com/Polymer/polymer/commit/3e82099fb5e65d05e730c54d6a218128523855c9))
- `asyncMethod()` now uses `requestAnimationFrame()` if no timeout duration is given ([commit](https://github.com/Polymer/polymer/commit/7fa356d7b35b3c64d523c6bb375df2b26fccf2bc))
- Support was added for `event.path` ([commit](https://github.com/Polymer/polymer/commit/37721192e54ff4f4dd9ba7b02cc00308efd9802f), [commit](https://github.com/Polymer/polymer/commit/5fdfb68b4a4a7eddea281e6404848d7d1b911c5b))
- Support for "{{site.project_title}}" custom MDV syntax ([commit](https://github.com/Polymer/polymer/commit/59af46cd6727a900a43e9990f018a014cc9ca52e), [commit](https://github.com/Polymer/polymer/commit/09badeece541a5c740c19d579acbc4b96e4afa0f), [commit](https://github.com/Polymer/polymer/commit/e5a4c5e626d1e754d45f6317da31e82c99877a34))
- More explicit anti-FOUC prevention ([commit](https://github.com/Polymer/polymer/commit/6fc9b8ce5214a8b1028c051295f743d28084ce00))
- Process of putting template content into shadowRoots was changed to prevent
  404 requests ([commit](https://github.com/Polymer/polymer/commit/bd0bd6ec6ce890839dbe56b5b18dfbcdd8eed297)). [Fixes #153](https://github.com/Polymer/polymer/issues/153)

### Platform

See the [full list of changes](https://github.com/Polymer/platform/pull/18).

#### HTML Imports

See the [full list of changes](https://github.com/Polymer/HTMLImports/pull/12).

- Use `DOMContentLoaded` instead of `window.onload` to trigger importing ([commit](https://github.com/Polymer/HTMLImports/commit/afb39f2ff3eb25962a19bdd992835b4076c24bf8))
- Added `.status === 0` check for imports to work in Cordova and across `file://` ([commit](https://github.com/Polymer/HTMLImports/commit/af76c4e5acb312dfe3db87aaf974c7397aed395b))
- Expose `HTMLImports.xhr` hook ([commit](https://github.com/Polymer/HTMLImports/commit/753e582159fb42184dcba19ea96c00e77cb55a11))

### Elements & Projects

### polymer-elements

- Added `<polymer-page>`element ([commit](https://github.com/Polymer/polymer-elements/commit/31fabe67f1ed6799f148c001f0f56cc71a5cced1]))
- Added `<polymer-view-source-link>` element ([commit](https://github.com/Polymer/polymer-elements/commit/d4c702d06348df6cdaf1c74f19ea3f8df7451c64))
- Added `<polymer-localstorage>` ([commit](https://github.com/Polymer/polymer-elements/commit/3feba7f5fb91fc819b6ddf335031c9e5dc31233f))
- Version of `<polymer-layout>` that uses CSS flexbox ([commit](https://github.com/Polymer/polymer-elements/commit/22f71e468c307c199869c5790291d25d9fe01787))
- Added `<polymer-ui-sidebar-menu>` (formerly known as ribbon) ([commit](https://github.com/Polymer/polymer-ui-elements/commit/5f889b3b98687a14e4142d202a8c931ea22b59d1))
- Added `<polymer-ui-icon>` example file ([commit](https://github.com/Polymer/polymer-ui-elements/commit/d2dc6da9ecd0fb727cb7204983c200764940fbad))


- Initial commit of Gallery ([commit](https://github.com/Polymer/projects/commit/d57bd2c9e667bde9b2488d944a119101f5105bd8]))

---

## 2013-05-15 {#2013-05-15}

This release mainly contained important platform fixes for IE and Firefox.

See the [full list of changes](https://github.com/Polymer/polymer/pull/135).

### Platform

#### Custom Elements

#### HTML Imports

#### MDV

* Correct event type for checkbox bindings ([commit](https://github.com/Polymer/mdv/commit/2c675cab75aea2ef3d1b981a616469587b9210fe)) 

#### HTML Imports

* Only enable cache busting in debug mode ([commit](https://github.com/Polymer/HTMLImports/commit/5a38cbba1e85491b6bc712fd25dec43e68409a5e))

#### Shadow DOM

* Fixed [#151](https://github.com/Polymer/ShadowDOM/pull/151) - `HTMLLegendElement` issue in FF21.

#### Pointer Events/Gestures

* Fix for `<button>` in IE ([commit](https://github.com/Polymer/PointerEvents/commit/a0e984dc5591903ba989c28fbf3d6997c5578b15))

---

## 2013-05-13 {#2013-05-13}

**Notice**: This release contains important changes to the structure of the project.
{:.centered .alert .alert-info}

Project renamed to Polymer! <https://github.com/polymer>

---

## 2013-05-09 {#2013-05-09}

### {{site.project_title}}

See the [full list of changes](https://github.com/polymer/polymer/pull/125).

* Project has a build status at <http://build.chromium.org/p/client.toolkit/waterfall>
and tests are being run on Browserstack ([commit](https://github.com/polymer/polymer/commit/4516edcf1f3639b0a1bb70d39a088c8f51fea1b5))

* Base example components [were removed](https://github.com/polymer/polymer/commit/2fdd9e0602f9162765f97985531bbb3301b12780) and separated
into their own [`toolkit-ui`](https://github.com/polymer/toolkit-ui) repo,
while the [`toolkit-elements`](https://github.com/polymer/toolkit-elements) repo
contains non-visual elements.

* A [sandbox tool](https://github.com/polymer/projects/commit/02e45ebfc4815816544b608077880f949a10e8ea) was
added to projects.

**Elements and animations**

* New `g-overlay` element with web animations ([commit](https://github.com/polymer/polymer/commit/9f8f036cebb5ddff9849a37ddb53e62081540715)) and `g-tabspanel` ([commit](https://github.com/polymer/polymer/commit/9f711efcee4e3f6ef181a1cb4c2f7d9013a26b2a))

* Added `g-fadein`, `g-fadeout` animations ([commit](https://github.com/polymer/polymer/commit/1569066b09968b41678d35df1bf67a3d8634262a)) and `g-shake`, a configurable shake animation ([commit](https://github.com/polymer/polymer/commit/9344922068bff938e90378e888259cc1a41bcd89))

**Features &amp; bug fixes**

* Element registration now puts a `.elementElement` property on the prototpe to reference
the `<element>` ([commit](https://github.com/polymer/polymer/commit/64f7e64e4356e13fee19b89cef0bda185ebbe920))

* pseudo-scoping now works on Firefox and IE where `cssRule.selectorText` is readonly ([commit](https://github.com/polymer/polymer/commit/f96ddd200030fd8e8cf82c0dba141863e1761da2))

* Attributes de-serialization is more predicable. For example, numbers are treated
as numbers, srings as strings, dates as `Date`, etc. ([commit](https://github.com/polymer/polymer/commit/ef601c3f8cf77a72c3a7a60f0f5b925dd5208e36), [commit](https://github.com/polymer/polymer/commit/6f04747ecd2f281dfc08273c2f1422cf24d138a8), [commit](https://github.com/polymer/polymer/commit/ec15352311f39594f2cc43d42d40db017e9293a8))

* MDV v3 is now turned on by default.

  * Added `.unbind()` and additional machinery for MDV bindings ([commit](https://github.com/polymer/polymer/commit/197d6f3c6fe08953fd915e243ce2cf8861347ee1))

  * MDV bindings are more comprehensive, with Node, Text, and `<input>` elements ([commit](https://github.com/polymer/polymer/commit/2e11ba658916df02c8ba87ead037ce0104a6b205)) 

* `Toolkit.getBinding(element, name)` no longer generates an exception if element is null [[commit](https://github.com/polymer/polymer/commit/a270417d136b6f00205ea60d451be9d296e9745d))

### Platform

#### Custom Elements

See the [full list of changes](https://github.com/polymer/CustomElements/pull/25).

* Implement life cycle callbacks (inserted|removed|attributeChanged) using MutationObsevers.
**Note**: you can no longer add lifecycle callbacks to a `lifecycle` object. They must be
on the prototpye. ([commit](https://github.com/polymer/CustomElements/commit/68da1e33bf5fdbab805b0d695d15729e4d379282))

* `document.register()` only triggers document-wide upgrade when called after
initial load is complete ([commit](https://github.com/polymer/CustomElements/commit/2c80460cba9f742e4f3fef434b225ef1829de39b))

* `document.register()` tests were updated to align with spec changes ([commit](https://github.com/polymer/CustomElements/commit/0aabe6b5fc66e847db8fa2988519d202641e9dfb))

* Added support for native `document.webkitRegister()` (if available) ([commit](https://github.com/polymer/CustomElements/commit/5cb7a971135162d40fd078a9fafdc9bd2c0eb91e))

* `attributeChanged` callback only fires when attribute has actually been modified ([commit](https://github.com/polymer/CustomElements/commit/9f7cf5268b01c9c9568b6d239995f6b01a027012))

* `<style>` elements are now (correctly) ignored if they're in the main document ([commit](https://github.com/polymer/CustomElements/commit/632ef0f43a5bb693580345096c1748e27990e39f))

#### HTML Imports

See the [full list of changes](https://github.com/polymer/HTMLImports/pull/8)

* `HTMLImports.getDocumentUrl()` added ([commit](https://github.com/polymer/HTMLImports/commit/0bdff1841f151cd7479a98338a6521cba4ef9c82))

* `HTMLImports.readyTime` added for primative timing data [[commit](https://github.com/polymer/HTMLImports/commit/414b70756d05fcf6b344c942163e5d6a777c4f5c))

* Caching is configurable with `.cache` [[commit](https://github.com/polymer/HTMLImports/commit/4e4a2afb03803e55f5b12149ffaa5704ca50e0e6))

#### MDV

See the [full list of changes](https://github.com/polymer/mdv/pull/65)

* Now using ChangeSummary v3 ([commit](https://github.com/polymer/mdv/commit/a82e4f56c7fa24970c27244d623b1a10fd740822))

* Removed `.effectiveContent` API ([commit](https://github.com/polymer/mdv/commit/66f5ec16998ee17dcdbd20759494ddd9900470ae))

* Removed `HTMLTemplateElement.bindTree` in favor of `template.model` ([commit](https://github.com/polymer/mdv/commit/b31c6fc016ea81088059f0b628dc253ade201cf8))

* Exposed `HTMLTemplateElement.parseAndBind_` ([commit](hen/mdv/commit/075f5f22e0b55783e1cd1486d02f2d1002e3ef8d))

* Implemented `.getInstanceModel` for returning the model associated with a template ([commit](https://github.com/polymer/mdv/commit/b6af70e922c49fc6fc85e782e549831d3680712e))

#### Pointer Events / Gestures

See the full list of changes [here](https://github.com/polymer/PointerEvents/pull/65) and [here](https://github.com/polymer/PointerGestures/pull/3).

* `touch-action: user` is an alias for `touch-action: none` ([commit](https://github.com/polymer/PointerEvents/commit/5d3d05cadbdb9ce53749a31a3c6f424566056da6))

* Fix `pointercapture` throws on IE10 ([commit](https://github.com/polymer/PointerEvents/commit/d338d9fc314961650c418101d4603b2a3a8c0302))

* Expose `.clientXY`, `.pageXY`, `.screenXY` of track gestures. ([commit](https://github.com/polymer/PointerGestures/commit/2c25f0cc6ca6a9edd993052dc0c4b13def37005c))

#### Shadow DOM

See the [full list of changes](https://github.com/polymer/ShadowDOM/pull/139)

* Implemented `.querySelector|All()` and `.getElementById()` ([commit](https://github.com/polymer/ShadowDOM/commit/8efd247fbf52f75a4f5c07e3d939dcf4500c4f62), [commit](https://github.com/polymer/ShadowDOM/commit/1bc20a60860b816e070feac44863053a2c6acb9b))

* Implemented `.elementFromPoint` for `document` and ShadowRoot ([commit](https://github.com/polymer/ShadowDOM/commit/1a11be889a1f76ca45e09655f7e7ed5b2aeaa297))

* Wrapped `MutationRecord` interface now that Blink has it. ([commit](https://github.com/polymer/ShadowDOM/commit/7079f38054dad74b2c0e4e18421bd11946e9f56f))

* `document.write()` is now [overriden](https://github.com/polymer/ShadowDOM/commit/733b350e15ea800f95efab2caae0a4c008d07ca0) and wrapped in the polyfill ([commit](https://github.com/polymer/ShadowDOM/commit/07be1f387f9a099bd9a13a0edf193acbf0f5c522))

---

## 2013-04-17 {#2013-04-17}

### Toolkit

* If you're writing a [Toolkit component](/polymer.html), there's
no longer need to include `platform.js` alongside `toolkit.js`. `toolkit.js` now loads `platform.js` under the hood. 

### Platform

#### CustomElements

* The `constructor` attribute is now supported ([commit](https://github.com/polymer/CustomElements/commit/96417cf084daf1421a9786e39282206f4ef6d35e))

#### HTML Imports

* Fixed issue with imports loaded at the same url would not have the content associated with them ([commit](https://github.com/polymer/HTMLImports/commit/882a9b6cc53d41d46967346b0b7e32edc4a6f7b9))

* Polyfill now correctly checks for `HTMLTemplateElement` before using it ([commit](https://github.com/polymer/HTMLImports/commit/24283edea12b36ae0db0e7f928fdcb20a6e46eda))

* If `HTMLTemplateElement.bootstrap` is available, then bootstrap templates in imported documents. ([commit](https://github.com/polymer/HTMLImports/commit/8c842e1c1bf3f13ca2097386886874f873e8ec0b))

---

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

---

## 2013-02-25 {#2013-02-25}

### Toolkit

* Changed "toolkit/src" folder name to "toolkit/components". Update your source paths accordingly.

* Introduced `selectedClass` property to g-selector component. ([commit](https://github.com/polymer/polymer/commit/a1565b536ea05cddf7a5984c15017c2bc803d1e5))

* g-selector now sends an `activate` event which is fired whenever an item is activated (can occur when the currently selected item is activated). The `select` event is fired only when the selected item changes. ([commit](https://github.com/polymer/polymer/commit/5aaddd82d89796b493726d31fb5ab2d73a7e1770))

* g-menu-button: the menu now closes in response to the selector's activate event ([commit](https://github.com/polymer/polymer/commit/5aaddd82d89796b493726d31fb5ab2d73a7e1770))

* g-selection: selecting the same item is now a no-op ([commit](https://github.com/polymer/polymer/commit/0075c4c4c39afa1235e8afd3580099f6c530a5ff))

* Added support for 2-way bindings on input elements ([commit](https://github.com/polymer/polymer/commit/16715bbb25fbb8a97455e66cd17021b7761ae0ad))

* g-ajax: Response is bindable; params can be set as json or object.

* g-panels: Added `autoselect` property that controls if keys/swipes can select panels; added `canselect` event to control if a panel can be selected.

### Platform

* Landed version 2 of the Shadow DOM shim. See the [pull request](https://github.com/polymer/polyfills/pull/88) for details.

* ShadowRoot now installs shadow reference on `node.webkitShadowRoot`, as per spec. Fixes [#68](https://github.com/polymer/polymer/issues/68). ([commit](https://github.com/polymer/polymer/commit/34363b6093674956118d8d82cea389961d0e5337))

* Loader: allow stylesheets and scripts in components defined in document. ([commit](https://github.com/polymer/polymer/commit/9875a08fb3f0b153ea044d19b8b3b39cf6e3656c))

### Tools

* Shadow DOM inspector
Added a tool for inspecting Shadow DOM trees. You can invoke the tool via <code>window.sinspect(<em>node</em>)</code>, where `node` is the element to start inspecting from. If not specified then it will use `document.body`.

To use the tool, open the JavaScript console and type `sinspect()`.

**Note**: The tool opens in a pop-up window so you may have to unblock it.

![](images/changelog/sinspect-screen.png)






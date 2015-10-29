---
layout: default
type: about
shortname: Docs
title: Release notes
subtitle: About this release
---

{% include toc.html %}

<style>
.breaking {
  color: red;
  text-transform: capitalize;
  }
</style>

## [Release 1.2.0](https://github.com/Polymer/polymer/tree/v1.2.0) (2015-10-22)

This release includes the following new features:

-   Compound binding support. In place of a single binding annotation, you 
    can now use a compound binding consisting of string literals and 
    binding annotations:

        <span>Name: {%raw%}{{lastname}}, {{firstname}}{%endraw%}</span>

    See [Compound bindings](devguide/data-binding.html#compound-bindings) for details.

-   New `observeNodes` method for tracking addition and removal of child 
    nodes and distributed nodes. See [Observe added and removed children](devguide/local-dom.html#observe-nodes).

-   New _effective children_ APIs that provide a composition-aware view of
    light DOM children. See [Effective children](devguide/local-dom.html#effective-children).

-   Improvements to path API. 
    [Fixes #2007](https://github.com/Polymer/polymer/issues/2007), 
    [#2509](https://github.com/Polymer/polymer/issues/2509). 
    
    *    Allows `set` to take paths with array keys, identified by 
         <code>#<var>key</var></code>.
    *    Allows `notifyPath` to take paths with array indices.
    *    Exposes public `notifySplices` API.


-   [Fixes #2582](https://github.com/Polymer/polymer/issues/2582). Fix IE10 regressions  
    in dom-repeat, dom-bind, and dom-module-inline  

-   Fix deepEqual on Safari 9 due to Safari enumeration bug.

-   Add `Polymer.dom(node).notifyObservers` method to 'kick' observers, for example, 
    when attributes change under Shadow DOM. 


## [Release 1.1.5](https://github.com/Polymer/polymer/tree/v1.1.5) (2015-10-08)

This release includes the following new features:

-   Added `isLightDescendent` and `isLocalDescendent` utility methods to 
    {{site.project_title}} elements. 

-   The `fire` method's `detail` argument can take any primitive value, not just objects.

This release fixes the following issues:

- [Fixes #2504](https://github.com/Polymer/polymer/issues/2504). Templatizer: Variables in the parent scope are not passed during initialization. 

- [Fixes #2505](https://github.com/Polymer/polymer/issues/2504). Templatizer: Changes to array/object properties from the parent scope not notified.

## [Release 1.1.4](https://github.com/Polymer/polymer/tree/v1.1.4) (2015-09-25)

This release fixes the following issues:

-   [Fixes #2452](https://github.com/Polymer/polymer/issues/2452). Work around 
    a [Chromium bug](https://code.google.com/p/chromium/issues/detail?id=529941) 
    that caused memory to leak on page refresh.

-   [Fixes #2048](https://github.com/Polymer/polymer/issues/2048). Allow multiple 
    paths to be linked using `linkPath`. 


**Web Components polyfill updated to 0.7.13.** The latest version of `webcomponents-lite.js`
fixes an issue that affected SEO of Polymer 1.x apps. 
{: .alert .alert-info }

## [Release 1.1.3](https://github.com/Polymer/polymer/tree/v1.1.3) (2015-09-04)

-   [Fixes #2403](https://github.com/Polymer/polymer/issues/2403). Fixes a regression
    that affected legacy projects using Chrome 39.

## [Release 1.1.2](https://github.com/Polymer/polymer/issues/2403) (2014-08-28)

-   [Fixes #2356](https://github.com/Polymer/polymer/issues/2356). Log a warning
    if the included style module cannot be found.
   
-   [Fixes #2357](https://github.com/Polymer/polymer/issues/2357). Styles included
    with `include=` are inserted _before_ any styles defined in the body of
    the style element.

-   [Fixes #2363](https://github.com/Polymer/polymer/issues/2363). Explicitly create 
    `Polymer` object on `window` to satisfy strict mode.

-   [Fixes #2329](https://github.com/Polymer/polymer/issues/2329). Registration changes
    to support ES6 classes.

-   [Fixes #2341](https://github.com/Polymer/polymer/issues/2341). Branch `Polymer.dom` to 
    use native dom methods under Shadow DOM for `appendChild`, `insertBefore`, `removeChild`, 
    `replaceChild`, and `cloneNode`.

-   [Fixes #2334](https://github.com/Polymer/polymer/issues/2341). When composing nodes 
    in shady DOM, check if a node is where we expect it to be before removing it from 
    its distributed position. We do this because the node may have been moved by 
    `Polymer.dom` in a way that triggered distribution of its previous location. The 
    node is already where it needs to be so removing it from its parent when it's no 
    longer distributed is destructive. 

[Release 1.1.1](https://github.com/Polymer/polymer/tree/v1.1.1) (2015-08-20)

This release fixes a serious regression in Release 1.1 related to shady DOM distribution. Related issues:

- [Fixes #2276](https://github.com/Polymer/polymer/issues/2276): DOM API fails to select an element in a `dom-repeat` in Polymer 1.1.  ([commit](https://github.com/Polymer/polymer/commit/ee61627))

- [Fixes #2311](https://github.com/Polymer/polymer/issues/2311), [#2323](https://github.com/Polymer/polymer/issues/2323): When elements are removed from their previous position when they are added elsewhere, make sure to remove them from composed, not logical parent. ([commit](https://github.com/Polymer/polymer/commit/3d93116))

- [Fixes #2253](https://github.com/Polymer/polymer/issues/2253): Refine logical tree check and populate parents of insertion points with logical info only if necessary. [Fixes #2283](https://github.com/Polymer/polymer/issues/2283): when a node is removed, we need to potentially distribute not only its host but also its parent. ([commit](https://github.com/Polymer/polymer/commit/6619f6c))


**Other fixed issues:**

- [Fixes #2263](https://github.com/Polymer/polymer/issues/2263): Ensure `custom-style` can parse variable definitions in supported selectors (e.g. /deep/) without exception due to unknown css. ([commit](https://github.com/Polymer/polymer/commit/894492b))

- `array-selector`: Add `selectedItem` property. ([commit](https://github.com/Polymer/polymer/commit/d65acd0))

- `dom-repeat`: [Fixes #2297](https://github.com/Polymer/polymer/issues/2297), Where a 
`dom-repeat` with a `sort` property threw an exception when removing 10 or more items at a time. ([commit](https://github.com/Polymer/polymer/commit/fccbd8a))

- [Fixes #2267](https://github.com/Polymer/polymer/issues/2267): Properly find dom-module for mixed case elements. ([commit](https://github.com/Polymer/polymer/commit/76c58b8))

- [Fixes #2304](https://github.com/Polymer/polymer/issues/2304): Avoid trying to read style data from imports that did not load. ([commit](https://github.com/Polymer/polymer/commit/0d1f206))

- Support for negative numbers in computed bindings. ([commit](https://github.com/Polymer/polymer/commit/fc53f50))


## [Release 1.1.0](https://github.com/Polymer/polymer/tree/v1.1.0) (2015-08-13)


**Shared style change**

This release includes support for a new style sharing mechanism. The new mechanism
should be used in place of `<link rel="import" type="css">`.

See [Shared styles and external stylesheets](devguide/styling.html#style-modules) in
the Developer guide for details.

As a result of these changes, several recommendations are changing:

*   `<link rel="import" type="css">` is deprecated and will eventually be removed. This syntax 
    allowed users to use a pure .css file, but the file is parsed as HTML which is a 
    security and performance concern.

*   We now recommend placing an element's `<style>` tag _inside_ the element's local DOM
    template, not outside. The older style is still supported, but does not perform as well
    as placing the styles inside the template.

**Fixed issues:**

- [Fixes #2251](https://github.com/Polymer/polymer/issues/2251): Resolve imported stylesheets against correct document. ([commit](https://github.com/Polymer/polymer/commit/68af666))

- Reduce `keySplices` to minimum change set before notifying. [Fixes #2261](https://github.com/Polymer/polymer/issues/2261). ([commit](https://github.com/Polymer/polymer/commit/f74d072))

- `array-selector`: Make `clearSelection` method public. ([commit](https://github.com/Polymer/polymer/commit/7497729))

- Add logical info if an element being added is an insertion point; do not add logical info for any element in a shady root. ([commit](https://github.com/Polymer/polymer/commit/45cb150))

- [Fixes #2235](https://github.com/Polymer/polymer/issues/2235). Manages logical information in shady distribution more directly by capturing it explicitly when needed and not whenever distribution is run. ([commit](https://github.com/Polymer/polymer/commit/21500fb))

- Ensure path fixup is applied correctly to styles in templates. ([commit](https://github.com/Polymer/polymer/commit/b22f3cd))

- `dom-module` no longer needs to eagerly upgrade custom elements since the web components polyfills do this automatically. ([commit](https://github.com/Polymer/polymer/commit/051e1bf))

##[v1.0.9](https://github.com/Polymer/polymer/tree/v1.0.9) (2015-08-07)

- `array-selector`. Numerous fixes around selection. Default selected to empty array. Add `isSelected` API. Add default values and update docs. ([commit](https://github.com/Polymer/polymer/commit/d4e7140), [commit](https://github.com/Polymer/polymer/commit/db9bda5), [commit](https://github.com/Polymer/polymer/commit/ca267a5), [commit](https://github.com/Polymer/polymer/commit/ba4bf38))

- [Fixes #2218](https://github.com/Polymer/polymer/issues/2218): Match style properties against scope transformed selector (not property unique selector). ([commit](https://github.com/Polymer/polymer/commit/c9e9062))

- Gestures: Make sure mouse position is not a factor for `.click()` in IE 10. ([commit](https://github.com/Polymer/polymer/commit/1a2fb4d))

- Gestures: Always trigger tap for synthetic click events. ([commit](https://github.com/Polymer/polymer/commit/1eef1a7))

- [Fixes #2193](https://github.com/Polymer/polymer/issues/2193): Implements workaround for [chromium bug #516550](https://code.google.com/p/chromium/issues/detail?id=516550) by adding `Polymer.RenderStatus.whenReady` and using it to defer `attached`. ([commit](https://github.com/Polymer/polymer/commit/2bffc4c))

- Fixes [vulcanize#209](https://github.com/Polymer/vulcanize/issues/209).
    Fixes issue where polyfilled templates may not upgrade correctly. 
    ([commit](https://github.com/Polymer/polymer/commit/d78c934))

- Use `_clientsReadied` to avoid missing attribute->property sets in ready. ([commit](https://github.com/Polymer/polymer/commit/165f716))

- Make propagation of attribute changes at configure time more efficient. ([commit](https://github.com/Polymer/polymer/commit/b269c1d))

- [Fixes #1673](https://github.com/Polymer/polymer/issues/1673): Ensure instance effects exist before marshaling attributes. ([commit](https://github.com/Polymer/polymer/commit/7c83df5))

- Custom properties: Make properties replacement robust against properties which start with a leading semicolon (`;`). ([commit](https://github.com/Polymer/polymer/commit/3ea0333))

- [Fixes #2154](https://github.com/Polymer/polymer/issues/2154): Ensure `Polymer.dom` always sees wrapped nodes when Shadow DOM polyfill is in use. ([commit](https://github.com/Polymer/polymer/commit/fc90aa0))

- Use CSS parser's property stripping code in `custom-style`. ([commit](https://github.com/Polymer/polymer/commit/756ef1b))

- Gestures: Automatically filter mouse events without the left mouse button. ([commit](https://github.com/Polymer/polymer/commit/bbc3b57))

- [Fixes #2113](https://github.com/Polymer/polymer/issues/2113): Ensure custom-style rules that use `@apply` combined with defining properties apply correctly. ([commit](https://github.com/Polymer/polymer/commit/69a4aa5))

- More loosely match expression function names. ([commit](https://github.com/Polymer/polymer/commit/6cfa759))

- Update behaviors order.  [Fixes #2144](https://github.com/Polymer/polymer/issues/2144). ([commit](https://github.com/Polymer/polymer/commit/2a51661))

- `dom-if`: Cache `style.display` & `textContent` and re-apply on true. [Fixes #2037](https://github.com/Polymer/polymer/issues/2037). ([commit](https://github.com/Polymer/polymer/commit/2611285))

- [Fixes #2118](https://github.com/Polymer/polymer/issues/2118): force element `is` to be lowercase: mixing case causes confusion and breaks style shimming for type extensions. ([commit](https://github.com/Polymer/polymer/commit/c8905f9))

- Allow array mutation APIs to accept string & negative args. [Fixes #2062](https://github.com/Polymer/polymer/issues/2062). Brings the API more in line with native Array methods. ([commit](https://github.com/Polymer/polymer/commit/7e2ceeb))

- Fix #2107: improve binding expression parser to match valid JavaScript property names. ([commit](https://github.com/Polymer/polymer/commit/7560130))

##[Release 1.0.8](https://github.com/Polymer/polymer/tree/v1.0.8) (2015-07-23)

- Gestures: Disable track gestures when scrolling. ([commit](https://github.com/Polymer/polymer/commit/ee5177d))

- [Fixes #2125](https://github.com/Polymer/polymer/issues/2125): Add a `register` method to `dom-module` to support imperative creation. ([commit](https://github.com/Polymer/polymer/commit/861f4aa))

- Gestures: Move recognizer reset into start of event flow. ([commit](https://github.com/Polymer/polymer/commit/a7495f7))

- Remove alternate calculation for `_rootDataHost` ([commit](https://github.com/Polymer/polymer/commit/26663cd))

- `dom-bind`: Don't call `dom-change` when detached. ([commit](https://github.com/Polymer/polymer/commit/bdb8fa3))

- [Fixes #1998](https://github.com/Polymer/polymer/issues/1998): add API doc for `customStyle` property. ([commit](https://github.com/Polymer/polymer/commit/91577c9))

- Handle comment nodes correctly for `textContent` and `innerHTML`. ([commit](https://github.com/Polymer/polymer/commit/6d56d2b))

- Data binding: [Fixes #2098](https://github.com/Polymer/polymer/issues/2098): Ignore undefined values as initial config ([commit](https://github.com/Polymer/polymer/commit/1a5c391))

- Data binding: Allow setting non-index array properties. [Fixes #2096](https://github.com/Polymer/polymer/issues/2096). ([commit](https://github.com/Polymer/polymer/commit/f8cad94)).

- `dom-bind`: Added `render` method to dom-bind which can be called when async imports are used; documented template render functions ([commit](https://github.com/Polymer/polymer/commit/348896a)).

- Fixes #2039: Polymer.dom.flush now triggers Custom Elements polyfill mutations and includes an api (`Polymer.dom.addDebouncer(debouncer)`) for adding debouncers which should run at flush time. Template rendering debouncers are placed in the flush list. ([commit](https://github.com/Polymer/polymer/commit/89a767c))

- [Fixes #2010](https://github.com/Polymer/polymer/issues/2010) and [#1818](https://github.com/Polymer/polymer/1818): Shady DOM mutations which trigger additional mutations are now successfully enqueued. ([commit](https://github.com/Polymer/polymer/commit/a26247b))

- `debounce` returns debouncer. ([commit](https://github.com/Polymer/polymer/commit/fb52120))


##[Release 1.0.7](https://github.com/Polymer/polymer/tree/v1.0.7) (2015-07-16)

- `dom-repeat`: Remove unnecessary keys bookkeeping. ([commit](https://github.com/Polymer/polymer/commit/3e02bfd))

- `dom-repeat`: Always use placeholders; fix insertion reference bug. ([commit](https://github.com/Polymer/polymer/commit/4a45d4f), 
    [commit](https://github.com/Polymer/polymer/commit/5eda235))

- `dom-repeat`: Fix reuse logic to handle multiple mutations in same turn. [Fixes #2009](https://github.com/Polymer/polymer/issues/2009). ([commit](https://github.com/Polymer/polymer/commit/1bf5f6d))


- Add `Polymer.instanceof` & `isInstance`. [Fixes #2083](https://github.com/Polymer/polymer/issues/2083). ([commit](https://github.com/Polymer/polymer/commit/7954f93))

- Make `Polymer.dom(element).getDistributedNodes` and `Polymer.dom(element).getDestinationInsertionPoints()` always return at least an empty array (was generating exception under Shadow DOM); make `element.getContentChildNodes` and `element.getContentChildren` always return at least an empty array when a selector is passed that does not find a `<content>` (was generating exception under Shadow DOM). ([commit](https://github.com/Polymer/polymer/commit/f966381)). [Fixes #2081](https://github.com/Polymer/polymer/issues/2081).

- [Fixes #2077](https://github.com/Polymer/polymer/issues/2077): Workaround IE text node splitting issue that can make text bindings fail. ([commit](https://github.com/Polymer/polymer/commit/312d11f))

- [Fixes #2078](https://github.com/Polymer/polymer/issues/2078): When computing custom style properties, make sure the styling scope is valid when the element is attached to a `shadowRoot` whose host is not a Polymer element. ([commit](https://github.com/Polymer/polymer/commit/fab2ed7))


## [Release 1.0.6](https://github.com/Polymer/polymer/tree/v1.0.6) (2015-07-09)

**Fixed issues:**

- Basic support for host-context [\#1895](https://github.com/Polymer/polymer/issues/1895)

- Custom property resolver tripping over some selectors? [\#1938](https://github.com/Polymer/polymer/issues/1938)

- Parsing compressed CSS does not work [\#1927](https://github.com/Polymer/polymer/issues/1927)

- Support Polymer.dom().classList.contains [\#1907](https://github.com/Polymer/polymer/issues/1907)

- Add support for :host-context [\#1900](https://github.com/Polymer/polymer/issues/1900)

- Grey overlay in mobile Safari [\#1970](https://github.com/Polymer/polymer/issues/1970)

- `node.unlisten` removes native event listeners too often [\#1988](https://github.com/Polymer/polymer/issues/1988)

- `notifyPath` doesn't return as its documentation says [\#1966](https://github.com/Polymer/polymer/issues/1966)

- "TypeError: Cannot set property 'display' of undefined" when HTML comment is present inside a dom-if template that evaluates to truthy [\#1786](https://github.com/Polymer/polymer/issues/1786)

- `dom-repeat` in a falsy `dom-if` should hide newly stamped children [\#1751](https://github.com/Polymer/polymer/issues/1751)

- Typo in Polymer.mixin API documentation [\#2001](https://github.com/Polymer/polymer/issues/2001)

- Low-level changes for `iron-list` integration (`fire` & `modelForElemennt`) [\#2003](https://github.com/Polymer/polymer/issues/2003)

- Normalized event difference with ShadowDOM and Shady [\#1921](https://github.com/Polymer/polymer/issues/1921)

- DOM API `innerHTML` adds only first element [\#1972](https://github.com/Polymer/polymer/issues/1972)

- With Polymer\#1.05-update, style-sheets and custom-style-elements are not parsed in my project anymore [\#1974](https://github.com/Polymer/polymer/issues/1974)

- Expected behavior for `importNode`, `cloneNode` [\#1888](https://github.com/Polymer/polymer/issues/1888)

- \#1.0.5 computed property function name limitations? [\#2016](https://github.com/Polymer/polymer/issues/2016)


## [Release 1.0.5](https://github.com/Polymer/polymer/tree/v1.0.5) (2015-06-25)

**Fixed issues:**

- Bindings to concrete types not propagating correctly from template to collection [\#1839](https://github.com/Polymer/polymer/issues/1839)

- Setting individual array elements not working [\#1854](https://github.com/Polymer/polymer/issues/1854)

- CustomStyle change has no effect [\#1851](https://github.com/Polymer/polymer/issues/1851)

- With Shady DOM, `<content>` doesn't get passed to another element inside dom-if [#1902](https://github.com/Polymer/polymer/issues/1902)

- Provide a convenience method for setting `customStyle` and calling `updateStyles` [\#1915](https://github.com/Polymer/polymer/issues/1915)

- If an async callback throws an error, it's never removed from the callback list [\#1759](https://github.com/Polymer/polymer/issues/1759)

- dom-if: undefined is considered falsy only once [\#1742](https://github.com/Polymer/polymer/issues/1742)

- Setting readOnly **and** computed on properties [\#1925](https://github.com/Polymer/polymer/issues/1925)

- Uncaught TypeError: this.mixin is not a function [\#1911](https://github.com/Polymer/polymer/issues/1911)

- `Polymer.Base.async` "infinite loop" condition [\#1933](https://github.com/Polymer/polymer/issues/1933)

- Custom property resolver tripping over some selectors? [\#1938](https://github.com/Polymer/polymer/issues/1938)

- Annotated attribute binding issues [\#1874](https://github.com/Polymer/polymer/issues/1874)

- Parsing compressed CSS does not work [\#1927](https://github.com/Polymer/polymer/issues/1927)


## [Release 1.0.4](https://github.com/Polymer/polymer/tree/v1.0.4) (2015-06-17)

**Fixed issues:**

- Need a way to cancel track and tap from down [#1823](https://github.com/Polymer/polymer/issues/1823)

- `array-selector` doesn't work with multi unless toggle is specified [#1810](https://github.com/Polymer/polymer/issues/1810)

- Style shim only converts a single `::shadow` or `/deep/` in a selector [#1809](https://github.com/Polymer/polymer/issues/1809)

- Incorrect style for custom CSS properties when extending a native element [#1807](https://github.com/Polymer/polymer/issues/1807)

- Unwrapped `dom-if` causes `DOMException` [#1804](https://github.com/Polymer/polymer/issues/1804)

- `dom-if` fails to add rows to a table if they contain `<content>` [#1800](https://github.com/Polymer/polymer/issues/1800)

- Data binding causes infinite loop if value is NaN [#1799](https://github.com/Polymer/polymer/issues/1799)

- Do not resolve hash-only urls used for routing [#1757](https://github.com/Polymer/polymer/issues/1757)

- Content nodes in `dom-if` template do not distribute correctly [#1753](https://github.com/Polymer/polymer/issues/1753)

- An element that uses only values supplied by variable defaults can be styled incorrectly [#1752](https://github.com/Polymer/polymer/issues/1752)

- Nested `dom-repeat` with sort attribute shows duplicate entries when adding new items. [#1744](https://github.com/Polymer/polymer/issues/1744)

- `::before` / `::after` pseudo selectors in a `custom-style` [#1668](https://github.com/Polymer/polymer/issues/1668)

- Need `Polymer.Base.unlisten` to remove the event listener [#1639](https://github.com/Polymer/polymer/issues/1639)

- `custom-style` sometimes does not apply variables [#1637](https://github.com/Polymer/polymer/issues/1637)

- `dom-if` template doesn't stamp when its content contains a wrapped insertion point [#1631](https://github.com/Polymer/polymer/issues/1631)



## Documentation updates 10 June 2015

*   Documented [extending behaviors](devguide/behaviors.html#extending).
*   Corrected [`@apply` example](migration.html#layout-attributes) in Migration guide to show only one mixin per `@apply` statement.
*   Added documentation for [custom properties API](devguide/styling.html#style-api).
*   Moved `<script>` tags inside `<dom-module>` according to latest recommendations.
*   Updated documentation on [computed bindings](devguide/data-binding.html#annotated-computed) to
    cover literal arguments and no-arg computed bindings.
*   Added notes on several more renamed element and helper methods to the [migration guide](migration.html#methods).
*   Added notes about replacing `template-bound` and `templateInstance` when using the template [helper elements](migration.html#helper-elements).
*   Updated docs on [`ready` callback](devguide/registering-elements.html#ready-method) to clarify element initialization order.
*   Added a note about replacing the [`domReady` callback](migration.html#domready).
*   Fixed some accessibility issues related to text contrast and bad alt text.

## Release 1.0.3

Release 1.0.3 includes the following bug fixes:

-   `dom-if` showing invalid HTML. [Fixes #1632.](https://github.com/Polymer/polymer/issues/1632)

-   Custom CSS property fix for IE. ([commit](https://github.com/Polymer/polymer/commit/1f3b4ea))

-   Move non-webcomponents script unresolved case to `load` instead of synchronous. ([commit](https://github.com/Polymer/polymer/commit/2258920))

-   `dom-repeat`: re-insert rows when re-attaching. [Fixes #1498](https://github.com/Polymer/polymer/issues/1498).

-   Make `__styleScoped` a one-time optimization. [Fixes #1733](https://github.com/Polymer/polymer/issues/1733).


## Release 1.0.2

Release 1.0.2 includes the following bug fix:

-   Refactor ghost click code. ([commit](https://github.com/Polymer/polymer/commit/d96917a))

## Release 1.0.1

Release 1.0.1 includes the following bug fixes:

-   Add `sourceEvent` property to `track` event. ([commit](https://github.com/Polymer/polymer/commit/bdf191b))
-   Fix tap distance check: [Fixes #1652.](https://github.com/Polymer/polymer/issues/1652)
-   Fix `element.click()` sending `tap` on IE10 [Fixes #1640.](https://github.com/Polymer/polymer/issues/1640)

## Release 1.0

Release 1.0 includes the following bug fixes since 0.9:

* Custom style system performance optimizations and parsing robustness.
* Fixed Shady DOM style scoping on IE.
* Avoid binding `undefined` string into textContent and inputs.
* Allow `behaviors` to accept nested arrays of behaviors.
* Properly update `dom-repeat` rendering following array mutations when both `sort` and `filter` are used.
* Support literal strings & numbers in inline computed functions.
* Support no-argument functions in inline computed functions.
* Update Shady DOM distribution when using `Polymer.dom(node).classList` or `Polymer.dom(node).setAttribute` on distribution candidates.
* Fixed gesture exception when dragging outside the document.
* Fix ordering of behavior application.
* Allow `dom-bind` to be imperatively created and filled with elements to be bound.
* Fixed tap not firing the first time after tracking another element.
* Fix `dom-bind` to ensure dependencies have resolved before stamping.
* Fixed certain use cases of dynamically stamping a `<content>` using `dom-if`.
* Prevent mustache content from being set to `<input>` value on IE.
* Added warnings for common user mistakes.
* Fix `dom-bind` from improperly scoping element classes.
* Allow observation and binding of `array.length`.
* Fix `:host` specificity for custom style properties.
* Added `Polymer.version` property.

### Documentation correction

The Migration guide has been updated to reflect that the 
[`iron-flex-layout`](migration.html#layout-attributes) 
custom properties are the recommended replacement for layout attributes in 
Release 1.0. The layout classes previously described 
in the Migration guide for Releases 0.8 and 0.9 will continue to work for 
now, but are deprecated.

## Release 0.9

A number of APIs changed between 0.8-rc.2 and 0.9. This section summarizes the changes.

### Element registration changes

#### <span class="breaking">breaking change:</span> Mixins replaced by behaviors

Mixins have been replaced by _behaviors_, which can define properties, add
lifecycle callbacks, observers, and event listeners.

Specify behaviors using the `behaviors` array on the prototype:

    Polymer({
      is: "enhanced-element",
      behaviors: [CoolBehavior]
    });

For details, see [Behaviors](devguide/behaviors.html).

#### <span class="breaking">breaking change:</span> constructor renamed to factoryImpl

When creating a custom constructor, the configuration function is
renamed from `constructor` to `factoryImpl`, to aid compilation tools.

#### <span class="breaking">breaking change:</span> hostAttributes changes {#host-attributes}

Static attributes defined in `hostAttributes` can now be overridden from markup.

As a part of this change, the `class` attribute can no longer be set from 
`hostAttributes`. If you need to set classes on the host, you can do so
imperatively (for example, by calling `classList.add` from the `ready` callback).

### <span class="breaking">breaking change:</span> Property observer changes

The format for property observers has changed to be more like the format for computed properties:

Before:

    observers: {
      'preload src size': 'updateImage'
    },

    updateImage: function(preload, src, size) {
      // ... do work using dependent values
    }

After:

    observers: [
      'updateImage(preload, src, size)'
    ],

    updateImage: function(preload, src, size) {
      // ... do work using dependent values
    }

Also, property observers are not invoked until **all** dependent properties are defined.
If the observer is not being invoked, make sure all dependent properties have non-`undefined`
default values set.

### Styling changes

#### Custom property support

This release includes several enhancements and changes to custom property support:

*   Custom property support is enabled for all elements. The `enableCustomStyleProperties` 
    flag is no longer required.

*   <span class="breaking">breaking change:</span> Style mixins are applied with `@apply` instead of `mixin`.

        @apply(--my-style-mixin)

*   The `var` function allows you to supply a default value, which is used if the custom
    property is not defined:

        background-color: var(--my-background, red);

*   Custom properties and mixins can be used inside a mixin.

        --foo: {
          color: var(--my-color);
          @apply(--my-theme);
        };


#### <span class="breaking">breaking change:</span> x-style renamed to custom-style

The `custom-style` element replaces the experimental `x-style` element.

Custom properties and CSS mixins can now be applied inside a `custom-style` element.

For more details, see [Custom element for document styling](devguide/styling.html#custom-style).

#### Support for :root selector

Styling now supports the [`:root` pseudo-class](https://developer.mozilla.org/en-US/docs/Web/CSS/:root)
inside `custom-style`. In the context of a `custom-style` element, the `:root` selector lets
you define a custom property that applies to all custom elements. (In 0.8, applying a property to 
all custom elements required a more expensive `*` selector.)

### Data binding changes

#### <span class="breaking">breaking change:</span> Template helper elements no longer experimental

The template helper elements are no longer experimental, and have been renamed:

*  `x-repeat` is now `dom-repeat`.
*  `x-bind` is now `dom-bind`.
*  `x-array-selector` is now `array-selector`.
*  `x-if` is now `dom-if`.

#### Nested template support

As of 0.9, nested templates can access their parent's scope. See [Nesting dom-repeat templates](devguide/templates.html#nesting-templates) for details.

#### <span class="breaking">breaking change:</span> Array mutation methods

In 0.8, an array observer was used to monitor the mutation of arrays, so adding an 
item to an array was observed automatically, but changing a value in an array item required
the `setPathValue` method (now renamed to `set`).

0.9 replaces the array observers with a set of array mutation methods. For array changes
to be observed by data bindings, computed properties, or observers, you must use the provided
helper methods: `push`, `pop`, `splice`, `shift`, and `unshift`. Like `set`, the first argument
is a string path to the array.

```
this.push('users', { first: "Stephen", last: "Maturin" });
```

### Gesture support

This release adds limited gesture support. For details, see [Gesture events](devguide/events.html#gestures).

### Content security policy (CSP) {#csp}

CSP issues in the initial release of 0.8 have been resolved. CSP still requires separate script and
HTML files.

The CSP-specific functions of [`vulcanize`](https://github.com/Polymer/vulcanize) have been 
split into a separate utility, [`crisper`](https://github.com/PolymerLabs/crisper). To prepare a site for
deployment in a CSP environment, you can use a command like this:

    vulcanize --inline-scripts --inline-css target.html | \
        crisper --html build.html --js build.js

For more details on the `vulcanize` arguments, see the [README](https://github.com/Polymer/vulcanize).

**Note:** The latest versions of `vulcanize` are **not** compatible with {{site.project_title}} 0.5.
For 0.5 projects, use `vulcanize` versions **earlier than 1.0**. `vulcanize` 0.7.10 is the latest version
supporting 0.5 projects.
{: .alert .alert-info }

### Utility functions

#### <span class="breaking">breaking change:</span> transform and translate3d API changes

The method signatures for the `transform` and `translate3d` utility methods have
changed to match the other utility methods. The `node` argument is now the last argument,
and is optional. If `node` is omitted, the methods act on `this`.

Before:

    transform(node, transform);
    translate3d(node, x, y, z);

After:

    transform(transform, node);
    translate3d(x, y, z, node);

#### <span class="breaking">breaking change:</span> fire API changes

The `fire` method now takes three arguments:

    fire(type, [detail], [options]);

The `options` object can contain the following properties:

*   `node`. Node to fire the event on. Defaults to `this`.
*   `bubbles`. Whether the event should bubble. Defaults to `true`.
*   `cancelable`. Whether the event can be canceled with `preventDefault`. Defaults to `false`.

#### New utilities

The following utility functions were added since 0.8-rc.2 _or_ were missing 
from the earlier documentation:

*   `$$`
*   `cancelAsync`
*   `debounce`
*   `cancelDebouncer`
*   `flushDebouncer`
*   `isDebouncerActive`

For details, see [Utility functions](devguide/utility-functions.html).

### Bug fixes

Release 0.9 includes a number of bug fixes. A few notable fixes are listed below.


- The `id` attribute can now be data bound. (Note that if `id` is data bound,
  the element is omitted from `this.$`.)

- Default values are now set correctly for read-only properties.

- An identifier with two dashes in the middle (`c--foo`) was improperly interpreted
  as a CSS custom property name.

- Fixed several issues with computed bindings, including one where the computing function
  was not invoked unless its dependent property was included in another binding.


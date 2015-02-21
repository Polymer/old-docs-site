---
layout: default
type: guide
shortname: Docs
title: Debugging tips and tricks
subtitle: Guide
---

{% include toc.html %}

<style>
.bookmarklet {
  background: #657CFE;
  color: white;
  border-radius: 6px;
  padding: 4px 8px 4px 4px;
}
.bookmarklet core-icon {
  margin-bottom: 2px;
}
</style>

Since the Web Components standards are relatively new, and not implemented in all browsers, debugging web components such as Polymer elements can be a challenge.

Chrome 36 and later includes native support for web components, and improved support for debugging them in Chrome DevTools. Opera 23 and later also includes native support for web components.

Many of the techniques described here can be used on browsers without native web components support, with a few adjustments. For details, see [Debugging under the polyfills](#polyfills).

## Inspecting HTML imports

To see the contents of an HTML import in the **Elements** panel, expand the `<link>` tag in the DOM tree view.
The import contents appear as a nested `#document` node.

![HTML import link expanded in DevTools Elements panel](/images/debugging/html-import.png)

To open the imported file in the **Sources** panel, click the URL in the link.

![HTML import link with URL highlighted](/images/debugging/html-import-link.png)

For elements with separate script files, the script file should be alongside the HTML file in the **Sources** panel.

You can set breakpoints in inline scripts inside an HTML import.

**Note:** For production deployment, HTML imports are usually concatenated using [vulcanize](../../articles/concatenating-web-components.html). However,
unlike JavaScript and CSS, there is no sourcemap format for HTML files, so there's no way to map vulcanized files to their non-vulcanized counterparts. As a result, it's much easier to debug non-vulcanized files.

## Inspecting custom elements

Many custom elements include shadow DOM trees. In the case of Polymer elements, anything you add to the outermost `<template>` inside the `<polymer-element>` tag is cloned into the element's shadow DOM. In DevTools, the root of the shadow tree shows up as a node named  `#shadow-root`. For example, consider the following element:

    <polymer-element name="my-element" noscript>
      <template>
        <div>This is my shadow DOM!</div>
      </template>
    </polymer-element>

    <my-element></my-element>

In Chrome, the resulting DOM tree looks like this:

![DevTools showing DOM for custom element](/images/debugging/custom-element.png)

The template contents show up inside the shadow tree, under `#shadow-root`.

On a browser that doesn't support shadow DOM, there is no `#shadow-root` node. The nodes that would be in the shadow tree appear as direct children of the custom element in the element or inspector view.

When inspecting any custom elements, you can access properties or methods on the element directly in the console:

    $0.fire('my-event');
    $0.myproperty

`$0` is a [console variable](https://developer.chrome.com/devtools/docs/commandline-api#0-4) that refers to the currently selected element. It's supported in most browsers.

On browsers without native shadow DOM, use the `wrap` function to access methods and properties on your element:

    wrap($0).fire('my-event');
    wrap($0).myproperty

For more details, see [Shadow DOM polyfill](#shadowdom).

## Hunting down unregistered elements {#unregistered}

When debugging Polymer applications, one frequent problem is unregistered elements. There are two common problems that cause unregistered elements:

-   Missing or incorrect HTML import statement for a custom element. In this case, the element
    shows up in the DOM as a simple element, with no shadow DOM. The element may still be rendered,
    but without the custom element's styling and behavior. The rest of the page should render normally.

-   Missing call to `Polymer` or an incorrect tag name in the `Polymer` call. By design, Polymer waits
    until all element definitions are complete before registering any elements. This ensures that all
    elements have been registered before the `polymer-ready` event fires, _even if some calls to `Polymer` are
    made in asynchronous scripts._

    However, if the `Polymer` call is missing for one element, none of the Polymer elements are registered.
    The `polymer-ready` event never fires, and the screen is frequently blank, since none of the Polymer elements render properly.

For example, the mismatched tag name in the following element causes Polymer to block element registration:

    <polymer-element name="broken-element">
        <template>
           <p>Always do the right thing.</p>
        </template>
        <script>
           Polymer('wrong-name', { … });
         </script>
     </polymer-element>

There are several things you can do to reduce the amount of time you spend looking for unregistered elements.

### Avoid mismatched tag names

Wherever possible, omit the tag name from the `Polymer` call. Since Polymer 0.4.0, the tag name can be omitted whenever the `<script>` tag that invokes `Polymer` is inside the `<polymer-element>` tag. Removing the duplicate tag name avoids many potential errors.

### Unregistered element bookmarklet

To quickly check whether elements are registered, you can use this bookmarklet (written by [Aleks Totic](https://twitter.com/atotic) and [Eric Bidelman](https://twitter.com/ebidel)):

<a class="bookmarklet" href="javascript:(function(){function isUnregisteredCustomElement(el){if(el.constructor==HTMLElement){console.error('Found unregistered custom element:',el);return true;}return false;}function isCustomEl(el){return el.localName.indexOf('-')!=-1||el.getAttribute('is');}var allCustomElements=document.querySelectorAll('html /deep/ *');allCustomElements=Array.prototype.slice.call(allCustomElements).filter(function(el){return isCustomEl(el);});var foundSome=false;for(var i=0,el;el=allCustomElements[i];++i){if(isUnregisteredCustomElement(el)){foundSome=true;}}if(foundSome){alert('Oops: found one or more unregistered custom elements in use! Check the console.');}else{alert('Good: All custom elements are registered :)');}})();"><core-icon icon="bookmark"></core-icon> Unregistered Elements Bookmarklet</a>

The bookmarklet checks for element that look like custom elements, but have the generic `HTMLElement` constructor. An element "looks like" a custom element if it has a dash in its name or uses the `is` attribute:

    <paper-button>Button</paper-button>
    <form is="ajax-form"></form>

Since this method doesn't use any Polymer APIs, it works for any custom element, Polymer or otherwise.

To add the bookmarklet to your browser, drag the <a class="bookmarklet" href="javascript:(function(){function isUnregisteredCustomElement(el){if(el.constructor==HTMLElement){console.error('Found unregistered custom element:',el);return true;}return false;}function isCustomEl(el){return el.localName.indexOf('-')!=-1||el.getAttribute('is');}var allCustomElements=document.querySelectorAll('html /deep/ *');allCustomElements=Array.prototype.slice.call(allCustomElements).filter(function(el){return isCustomEl(el);});var foundSome=false;for(var i=0,el;el=allCustomElements[i];++i){if(isUnregisteredCustomElement(el)){foundSome=true;}}if(foundSome){alert('Oops: found one or more unregistered custom elements in use! Check the console.');}else{alert('Good: All custom elements are registered :)');}})();"><core-icon icon="bookmark"></core-icon> Unregistered Elements Bookmarklet</a>
link to the bookmarks toolbar or Favorites bar. (The bookmarks toolbar or Favorites bar must already be displayed.)


You can see the complete code for the bookmarklet here:

[https://gist.github.com/ebidel/cea24a0c4fdcda8f8af2](https://gist.github.com/ebidel/cea24a0c4fdcda8f8af2)


Click the bookmark to check the current page for unregistered elements. The bookmarklet displays an alert showing the
page status. In the case of missing imports, more detailed information is logged to the console.

-   In the case of a missing HTML import, the bookmarklet lists the element with a missing import.

-   In the case of a missing `Polymer` call, the bookmarklet lists _all_ of the Polymer elements, since none of them are registered.
    (The next section describes how to use the new `Polymer.waitingFor` method to pinpoint exactly which element is causing the problems.)

**Note:** The bookmarklet returns false positives for tags that include a dash but _aren't_ custom elements, such as Angular directives.
{: .alert .alert-info }

### Polymer waitingFor and forceReady methods

Polymer 0.4.1 introduced a pair of new methods, `Polymer.waitingFor` and `Polymer.forceReady` that you can use to help diagnose registration problems.  The `waitingFor` method returns a list of `<polymer-element>` tags that don't have a matching `Polymer` call. In the event of a blank screen, you can run it from the console:

![DevTools console showing Polymer.waitingFor call and output](/images/debugging/waitingfor.png)

Note that `waitingFor` returns a list of _elements_, not element names.

The `waitingFor` method does not report elements that are missing HTML imports, or misspelled tags.

`Polymer.forceReady` causes Polymer to stop waiting and immediately register any elements that are ready to register.

When debugging, you could add a script that logs unregistered elements, then forces the ready state, like this:

    window.logAndContinue = function() {
        var missing = Polymer.waitingFor();
        if (missing.length) {
          missing.forEach(function(el) {
            console.warn('Waiting for: ' + el.getAttribute('name'));
          });
          console.warn('Forcing element registration.');
          Polymer.forceReady();
        }
      }

If page loading stalls, you can invoke this from the console:

    logAndContinue();

      "Waiting for: broken-element"

      "Forcing element registration."

## Inspecting data-bound nodes

When working with [data binding](databinding.html), a lot of data is available if you know where to look. The examples in this section show DevTools, but with minor modifications, will work in Firefox,

DOM nodes generated by data binding appear immediately after the generating template.

In the case of nested templates, copies of the inner templates appear in the DOM before their generated content. For example, consider the following element:

    <polymer-element name="binding-test">
      <template>
        <template repeat="{%raw%}{{item in list}}{%endraw%}">
          <p>{{item.name}}:</p>
          <ul>
            <template repeat="{%raw%}{{field in item.fields}}{%endraw%}">
              <li>{{field}}</li>
            </template>
          </ul>
        </template>
      </template>
      <script>
        Polymer({
          created: function() {
            this.list = [
              {name: 'hits', fields: [1, 2, 3]},
              {name: 'misses', fields: [7, 0, 10]}
            ];
          }
        });
      </script>
    </polymer-element>

    <binding-test></binding-test>

This generates a DOM structure like the following:

![DevTools showing DOM structure](/images/debugging/bound-dom.png)

The numbers in the diagram identify elements of the DOM structure:

1.  Root of the element's shadow DOM tree.
2.  Outer `<template repeat>`.
3.  DOM nodes generated by the outer `<template repeat>`. Highlighted box shows the nodes representing the first item.
4.  Inner `<template repeat>`. Note that one copy appears in the DOM for each item in the outer `<template repeat>`.
5.  Generated DOM nodes from the inner `<template repeat>`.

To inspect the data bound to a template:

1.  In the **Elements** panel, select the template tag in the element's shadow root.
2.  In the **Console**, type:

        $0.model

    On browsers without native shadow DOM, add the `wrap` function:

        wrap($0).model

    For a discussion of the `wrap` function, see [Shadow DOM polyfill](#shadowdom).

![DevTools console showing $0.model command and output](/images/debugging/scope-object.png)

The `model` property returns the template's scope object, which contains all the identifiers that are in scope for the current template. For the outermost template, this is the custom element itself.

To inspect the data used to **create** a generated node:

1.  In the **Elements** panel, select the generated node.
2.  In the **Console**, type:

        $0.templateInstance.model


    On browsers without native shadow DOM, add the `wrap` function:

        wrap($0).templateInstance.model

![DevTools console](/images/debugging/templateinstance-model.png)

`templateInstance.model` returns the data used to generate the DOM nodes. In this case, it includes the `item` object corresponding to the first item in the list.


## Debugging under the polyfills

The following sections provide some hints for debugging Polymer elements on browsers that don't support web components natively.

### HTML Imports polyfill

The HTML Imports polyfill loads imports using `XMLHttpRequest`. External scripts inside an import are loaded normally. Inline scripts inside an import are transformed into data URLs. Each debugger displays these data URLs differently. For example, in Safari Web Inspector, look in the **Resources** tab for URLs starting with `data:text/javascript;`.

To debug a custom element from an HTML import, find and open the corresponding script file or data URL. You can then set breakpoints, watch expressions, and so forth.

### Shadow DOM polyfill {#shadowdom}

The Shadow DOM polyfill wraps each DOM node with a wrapper object. The wrapper exposes the common DOM methods and properties while emulating the mechanics of a browser that supports shadow DOM. All of a Polymer element's methods and properties are defined on the wrapper node. This leads to two potential issues:

The debugger typically returns references to the un-wrapped native DOM nodes, so you cannot invoke the Polymer methods directly from the Console.
Some rarely-used native DOM methods and properties aren't exposed on the wrapped object.

The Shadow DOM polyfill provides `wrap` and `unwrap` functions to transform between wrapped and unwrapped nodes.

For example, when examining a Polymer element, you can use `wrap` in the console to access Polymer properties and methods:

    wrap($0).fire('my-event');
    wrap($0).myproperty

Likewise, if you encounter a native DOM property or method that's not available on the wrapped node, you can access the native node using `unwrap`.



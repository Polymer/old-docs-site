---
layout: default
type: core
navgroup: docs
shortname: Docs
title: Polymer helper functions
subtitle: Guide
---

{% include toc.html %}

The {{site.project_title}} library provides a set of helper functions on the `Polymer` object. 


## Dynamic HTML imports

The `Polymer.import` function can be used to dynamically import one or more HTML files: 

<pre>
Polymer.import(<var>urls</var>, <var>callback</var>);
</pre>

Where <var>urls</var> is an array of HTML import URLs. Loading is asynchronous.
{{site.project_title}} invokes <var>callback</var> when all imports have loaded and any
custom elements defined in the imports have been upgraded. The callback takes no arguments.

You can think of the `import` callback as equivalent to the `polymer-ready` event on page load. 
When the callback is invoked, all of the newly-imported elements are ready to use.

As on initial page load, if any element is lacking a corresponding `Polymer` call, it 
blocks registration of _all_ elements, which means the callback is never invoked. See 
[Hunting down unregistered elements](/docs/polymer/debugging.html#unregistered) for information
on diagnosing problems with element registration.

**Note:** The HTML Imports polyfill provides a related mechanism: `HTMLImports.whenImportsReady(callback)`. 
The callback is invoked when all of the imports in the document have finished loading. 
(Not including any imports added to the document _after_ calling `whenImportsReady`.)
{: .alert .alert-info }

## Mixins

The `Polymer.mixin` function copies properties from one or more _mixin_ objects to a _target_ object:

<pre>
Polymer.mixin(<var>target</var>, <var>obj1</var> [, <var>obj2</var>, ..., <var>objN</var> ] )
</pre>

You can use `mixin` to share functionality between custom elements, by creating reusable _mixin_ objects.

    var myMixin = {
      sharedMethod: function() {
        // ...
      }
    }
     
    <polymer-element name="my-element">
    <script>
      Polymer(Polymer.mixin({
        // my-element prototype
      }, myMixin));
    </script>
    </polymer-element>

The `mixin` function makes a shallow copy of the mixin objects, and doesn't attempt to merge nested objects.

Since mixin objects are ordinary JavaScript objects, you can do anything with them that you'd do with an 
ordinary object. For example, to share a mixin across multiple custom elements in separate HTML imports, you 
can use a global variable:

    window.sharedMixin = {
      // shared code
    };

## Forcing element registration  

By default, {{site.project_title}} waits until all elements are ready before registering and upgrading them.
If one `<polymer-element>` tag is missing its corresponding `Polymer` call (and doesn't have the `noscript` attribute),
it blocks all elements from registering.

The `Polymer.waitingFor` helper returns a list of `<polymer-element>` tags that are blocking registration.

`Polymer.forceReady` notifies {{site.project_title}} to register all available elements immediately, ignoring any 
incomplete elements.

For more details and example usage, see [Hunting down unregistered elements](/docs/polymer/debugging.html#unregistered).

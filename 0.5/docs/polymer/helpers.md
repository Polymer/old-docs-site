---
layout: default
type: guide
shortname: Docs
title: Polymer helper methods
subtitle: Guide
---

{% include toc.html %}

The {{site.project_title}} library provides a set of helper methods on the `Polymer` object.
These methods provide extra features that are not tied to an individual {{site.project_title}}
element, such as dynamically importing files, using mixins, and managing element registration.

## Using dynamic HTML imports

The `Polymer.import` method can be used to dynamically import one or more HTML files:

<pre>
Polymer.import(<var>urls</var>, <var>callback</var>);
</pre>

Where <var>urls</var> is an array of HTML import URLs. Loading is asynchronous.
{{site.project_title}} invokes <var>callback</var> when all imports have loaded and any
custom elements defined in the imports have been upgraded. The callback takes no arguments.

For example, if you have the following element:

`dynamic-element.html`:

    <link rel="import" href="components/polymer/polymer.html">
    <polymer-element name="dynamic-element" attributes="description">
      <template>
        <p>I'm {%raw%}{{description}}{%endraw%}, now!</p>
      </template>
      <script>
        Polymer({
          description: 'a custom element'
        });
      </script>
    </polymer-element>

You can dynamically load it like this:

`index.html`:

    <html>
      <head>
        <script src="components/webcomponentsjs/webcomponents.min.js"></script>
        <link rel="import" href="components/polymer/polymer.html">
      </head>
      <body>
        <dynamic-element>
          I'm just an unknown element.
        </dynamic-element>

        <button>Import</button>

        <script>
          var button = document.querySelector('button');
          button.addEventListener('click', function() {
            Polymer.import(['dynamic-element.html'], function() {
              document.querySelector('dynamic-element').description = 'a dynamic import';
            });
          });
        </script>
      </body>
    </html>

The `<dynamic-element>` in `index.html` is parsed as a generic `HTMLElement`.
When you click the button, the import is loaded and the `<dynamic-element>`
instance is upgraded to a custom element.

You can think of the `import` callback as equivalent to the `polymer-ready` event on page load.
When the callback is invoked, all of the newly-imported elements are ready to use.

As on initial page load, if any element is lacking a corresponding `Polymer` call, it
blocks registration of _all_ elements, which means the callback is never invoked. See
[Hunting down unregistered elements](debugging.html#unregistered) for information
on diagnosing problems with element registration.

**Note:** {{site.project_title}} provides a related mechanism: `HTMLImports.whenReady(callback)`.
The callback is invoked when all of the imports in the document have finished loading.
(Not including any imports added to the document _after_ calling `whenReady`.)
{: .alert .alert-info }

## Using mixins

The `Polymer.mixin` method copies properties from one or more _mixin_ objects to a _target_ object:

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

The `mixin` method makes a shallow copy of the mixin objects, and doesn't attempt to merge nested objects.

Since mixin objects are ordinary JavaScript objects, you can do anything with them that you'd do with an
ordinary object. For example, to share a mixin across multiple custom elements in separate HTML imports,
place the mixin in an HTML import and assign the mixin to a global variable:

`shared-mixin.html`:

    <script>
      window.sharedMixin = {
        // shared code
      };
    </script>

`client-element.html`:

    <link rel="import" href="shared-mixin.html">

    <polymer-element name="client-element">
    <script>
      Polymer(Polymer.mixin({
        // local prototype
      }, window.sharedMixin);
    </script>
    </polymer-element>

## Forcing element registration

By default, {{site.project_title}} waits until all elements are ready before registering and upgrading them.
If one `<polymer-element>` tag is missing its corresponding `Polymer` call (and doesn't have the `noscript` attribute),
it blocks all elements from registering.

The `Polymer.waitingFor` helper returns a list of `<polymer-element>` tags that are blocking registration.

`Polymer.forceReady` notifies {{site.project_title}} to register all available elements immediately, ignoring any
incomplete elements.

For more details and example usage, see [Hunting down unregistered elements](debugging.html#unregistered).

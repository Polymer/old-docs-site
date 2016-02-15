---
layout: default
type: guide
shortname: Docs
title: Styling local DOM
subtitle: Developer guide
---

{% include toc.html %}

Polymer uses [Shadow DOM styling
rules](http://www.html5rocks.com/en/tutorials/webcomponents/shadowdom-201/) for
providing scoped styling of the element's local DOM. This allows elements to
create style rules that will only apply to the element's light DOM or local
DOM, as well as advanced theming with CSS custom properties and CSS mixins.

Scoped styles should be provided via `<style>` tags placed inside the element's
local DOM `<template>`.

To place styles outside of the element, or share styles between elements, you
can create a [style module](#style-modules).

**NOTE: I think a nice introduction, without code, works a lot better. I also added a brief explanation.**

# Styling the local DOM

**NOTE: I think it's nice to introduce the "super-basic" example of shadow dom styling, without ::content**

Here is a basic example of an element that uses `<style>` to style its local
DOM. Note that any other element of class `child-element` within the page will
not be affected:


    <dom-module id="my-element">

      <template>

        <style>
          :host {
            display: block;
            border: 1px solid red;
          }
          /* In shady DOM this will become `.child-element.my-element {` */
          .child-element {
            background: yellow;
          }

        </style>

        <div class="child-element">In local DOM!</div>
        <content></content>

      </template>

      <script>
          Polymer({
              is: 'my-element'
          });
      </script>

    </dom-module>

In the page, you might have:

    <my-element>
        <!-- In shady DOM the class is "child-element style-scope my-element" -->
        <div class="child-element">In light DOM!</div>
    </my-element>

And see that only `In local DOM` has a yellow background.

**Note:**  Prior to Polymer 1.1, the recommendation was to place `<style>` tags
inside the `<dom-module>` for an element (but _outside_ the `<template>`). This
 is still supported, but is no longer recommended.
{: .alert .alert-info }

**NOTE: I like introducing what shadow DOM styling SHOULD be like, and then explain what we should do with shady DOM, and why.**

#### Shim limitations

There is no need to do any special workaround in this simple case, since shady
DOM will automatically change the style as well as the element's class to make
sure that styling in the local DOM doesn't leak out of `my-element` by adding a
required class, `my-element`, to the created element (and to the selector).


### Styling distributed children (`::content`)

In shadow DOM, you can style an element's light DOM using the `::content` pseudo element. So, you can do this:

    <dom-module id="my-element">

      <template>

        <style>
          /* WARNING: This does NOT work in shady DOM */
          ::content > .special {
            background: orange;
          }
        </style>

       <div class="special">This should not be affected</div>
       <content></content>
      </template>

      <script>
          Polymer({
              is: 'my-element'
          });
      </script>

    </dom-module>


In shadow DOM, the `.special` class will only ever affect elements in the light
DOM. So when you use your element:

    <my-element>
        <div class="special">This should be special!</div>
    </my-element>

Only `This should be special!` will have an orange background.

#### Shim limitations

Shady DOM is much more limited than shadow DOM.

Under shady DOM,  the `<content>` tag doesn't appear in the DOM tree, and styles
are rewritten to remove the `::content` pseudo-element **as well as and any
combinator immediately to the left of `::content`.** (E.g. `> :: content` where `>`
is the combinator before it).

Using shady DOM, the example above sees the style `::content > .special {`
is rewritten as `my-element > .special`. This means that the rule will not apply
just to the light DOM (as it should), but to the local DOM too (which it
shouldn't).

**NOTE: The original documentation is very confusing here, as it says that you must have a selector before `::content` (for example `:host`), but in my experience that doesn't actually do anything since BOTH `:host ::content div` and `::content div` becomes `element div` (which is obviously not enough). I wonder if adding `element` was a recent-ish addition, and earlier versions of polymer had `::content div` turn into a dangerous, leaky `div`!**

This means that if you want to target only and only the light DOM, you will need
to wrap `<content></content>` in a `div`, and target that specific `div` in your
rules:

    <dom-module id="my-element">

      <template>

        <style>
          .content-wrapper ::content > .special {
            background: orange;
          }
        </style>

        <div class=".special">I am not special!</div>
        <div class="content-wrapper"><content></content></div>

      </template>

      <script>
          Polymer({
              is: 'my-element'
          });
      </script>

    </dom-module>

In this case, the rule:

    .content-wrapper ::content > .special

Becomes:

    .content-wrapper.my-element  > .special

**NOTE: I have a bit of a problem here as the chapter hasn't yet introduced**
**custom properties, and yet it warns "Custom properties can't style distributed**
**children. I am commenting this warning out for now**

<!--
**Custom properties can't style distributed children.** The {{site.project_title}}
[custom properties]({#xscope-styling-details) shim doesn't support styling
distributed children.
{: .alert .alert-info }
-->

## Cross-scope styling {#xscope-styling}


### Background

Shadow DOM (and its approximation via Shady DOM) bring much needed benefits of
scoping and style encapsulation to web development, making it safer and easier
to reason about the effects of CSS on parts of your application.  Styles do not
leak into the local DOM from above, and styles do not leak from one local DOM
into the local DOM of other elements inside.

This is great for *protecting* scopes from unwanted style leakage.  But what
about when you intentionally want to *customize* the style of a custom element's
local DOM, as the user of an element?  This often comes up under the umbrella of
"theming".  For example a "custom-checkbox" element that may internally use a
`.checked` class can protect itself from being affected by CSS from other
components that may also happen to use a `.checked` class.  However, as the user
of the checkbox you may wish to intentionally change the color of the check to
match your product's branding, for example.  The same "protection" that Shadow
DOM provides at the same time introduces a practical barrier to "theming" use
cases.

**Deprecated shadow DOM selectors.** One solution the Shadow DOM spec authors
provided to address the theming problem was the `/deep/` combinator and `::shadow`
pseudo-element, which allowed writing rules that pierce through the Shadow DOM
encapsulation boundary. However, these proved problematic and have been deprecated.
{: .alert .alert-info }

The recommended current way of affecting the look of an element's local DOM is by using
custom CSS properties and custom CSS mixins, which offer great flexibility without
paying the price of giving up encapsulation.

### Custom CSS properties {#xscope-styling-details}

Polymer includes a shim for custom CSS properties inspired by (and compatible with)
the future W3C [CSS Custom Properties for Cascading Variables](http://dev.w3.org/csswg/css-variables/)
specification (see
[Using CSS Variables](https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_variables)
on the Mozilla Developer Network).

Rather than exposing the details of an element's internal implementation for
theming, instead an element author defines one or more custom CSS
properties as part of the element's API.

These custom properties can be defined similarly to other standard CSS properties
and will inherit from the point of definition down the composed DOM tree,
similar to the effect of `color` and `font-family`.

In the simple example below, the author of `my-toolbar` identified the need for
users of the toolbar to be able to change the color of the toolbar title.  The
author exposed a custom property called `--my-toolbar-title-color` which is
assigned to the `color` property of the selector for the title element.  Users
of the toolbar may define this variable in a CSS rule anywhere up the tree, and
the value of the property will inherit down to the toolbar where it is used if
defined, similar to other standard inheriting CSS properties.

Example:

    <dom-module id="my-toolbar">

      <template>

        <style>
          :host {
            padding: 4px;
            background-color: gray;
          }
          .title {
            color: var(--my-toolbar-title-color);
          }
        </style>

        <span class="title">{{title}}</span>

      </template>

      <script>
        Polymer({
          is: 'my-toolbar',
          properties: {
            title: String
          }
        });
      </script>

    </dom-module>

Example usage of `my-toolbar`:

    <dom-module id="my-element">

      <template>

        <style>

          /* Make all toolbar titles in this host green by default */
          :host {
            --my-toolbar-title-color: green;
          }

          /* Make only toolbars with the .warning class red */
          .warning {
            --my-toolbar-title-color: red;
          }

        </style>

        <my-toolbar title="This one is green."></my-toolbar>
        <my-toolbar title="This one is green too."></my-toolbar>

        <my-toolbar class="warning" title="This one is red."></my-toolbar>

      </template>

      <script>
        Polymer({ is: 'my-element'});
      </script>

    </dom-module>

The `--my-toolbar-title-color` property only affects the color of the title
element encapsulated in `my-toolbar`'s internal implementation.  In the future
the `my-toolbar` author can rename the `title` class or restructure the internal
details of `my-toolbar` without changing the custom property exposed to users.

You can also include a default value in the `var()` function, to use in case the
user doesn't set the custom property:

    color: var(--my-toolbar-title-color, blue);

Thus, custom CSS properties introduce a powerful way for element authors to
expose a theming API to their users in a way that naturally fits right alongside
normal CSS styling. It is,already on a standards track with support in Firefox
and planned support announced in Chrome and Safari.


### Custom CSS mixins

It may be tedious (or impossible) for an element author to predict every
CSS property that may be important for theming, let alone expose every
property individually.

The custom properties shim includes an extension that enables an element
author to define a set of CSS properties as a single custom property and
then allow all properties in the set to be applied to a specific CSS rule
in an element's local DOM. The extension enables this with a mixin capability
that is analogous to `var`, but which allows an entire set of properties
to be mixed in. This extension adheres to the
[CSS @apply rule](http://tabatkins.github.io/specs/css-apply-rule/)
proposal.

Use `@apply` to apply a mixin:

<pre>@apply(--<var>mixin-name</var>);</pre>

Defining a mixin is just like defining a custom property, but the
value is an object that defines one or more rules:

<pre><var>selector</var> {
  --<var>mixin-name</var>: {
    /* rules */
  };
}</pre>

Example:

    <dom-module id="my-toolbar">

      <template>

        <style>
          :host {
            padding: 4px;
            background-color: gray;
            /* apply a mixin */
            @apply(--my-toolbar-theme);
          }
          .title {
            @apply(--my-toolbar-title-theme);
          }
        </style>

        <span class="title">{{title}}</span>

      </template>

      <script>
        Polymer({
          is: 'my-toolbar'
        })
      </script>

    </dom-module>

Example usage of `my-toolbar`:

    <dom-module id="my-element">

      <template>

        <style>
          /* Apply custom theme to toolbars */
          :host {
            --my-toolbar-theme: {
              background-color: gray;
              border-radius: 4px;
              border: 1px solid black;
            };
            --my-toolbar-title-theme: {
              color: green;
            };
          }

          /* Make only toolbars with the .warning class red and bold */
          .warning {
            --my-toolbar-title-theme: {
              color: red;
              font-weight: bold;
            };
          }
        </style>

        <my-toolbar title="This one is green."></my-toolbar>
        <my-toolbar title="This one is green too."></my-toolbar>

        <my-toolbar class="warning" title="This one is red."></my-toolbar>

      </template>

      <script>
        Polymer({ is: 'my-element'});
      </script>

    </dom-module>


### Custom property API for {{site.project_title}} elements {#style-api}

You can directly modify a {{site.project_title}} element's custom property by
setting key-value pairs in
[`customStyle`](../../api/#Polymer.Base:property-customStyle) on the element.
This is analogous to setting `style` on an element.

Note that in shady DOM you then need to call `updateStyles()` in order for the
change to take effect. You can also pass a dictionary of property names and
values as an argumen to `updateStyles`. See the next section for details about
the shim's limitations.

To get the value of a custom property on an element, use
[`getComputedStyleValue`](../../api/#Polymer.Base:method-getComputedStyleValue){:target="_blank"}.

### Shim limitations

Cross-platform support for custom properties is provided in Polymer by a
JavaScript library that **approximates** the capabilities of the CSS Variables
specification  *for the specific use case of theming custom elements*, while
also extending it to add the capability to mixin property sets to rules as
described above. For performance reasons, {{site.project_title}} **does not
attempt to replicate all aspects of native custom properties.** The shim trades
off aspects of the full dynamism possible in CSS in the interests of
practicality and performance.

Below are current limitations of the shim. Improvements to performance and
dynamism will continue to be explored.

#### Dynamism limitations

{{site.project_title}}'s custom property shim evaluates and applies custom
property values once at element creation time.  In order to have an element (and
its subtree) re- evaluate custom property values due to dynamic changes such as
application of CSS classes, changes to the ``customStyles` object etc., call the
[`updateStyles`](../../api/#Polymer.Base:method-updateStyles){:target="_blank"}
method on the element. To update all elements on the page, you can also call
`Polymer.updateStyles`.

Example:

    <!-- this is the same my-toolbar seen earlier -->
    <dom-module id="my-toolbar">

      <template>

        <style>
          :host {
            padding: 4px;
            background-color: gray;
          }
          .title {
            color: var(--my-toolbar-title-color);
          }
        </style>

        <span class="title">{{title}}</span>

      </template>

      <script>
        Polymer({
          is: 'my-toolbar',
          properties: {
            title: String
          }
        });
      </script>

    </dom-module>


    <dom-module id="my-element">

      <template>

        <style>
          :host {
            --my-toolbar-title-color: red;
          }
        </style>

        <my-toolbar title="My awesome app"></my-toolbar>
        <button on-tap="changeTheme">Change theme</button>

      </template>

      <script>
        Polymer({
          is: 'my-element',
          changeTheme: function() {
            console.log("Currently the style is:", this.getComputedStyleValue('--my-toolbar-title-color') );
            this.customStyle['--my-toolbar-title-color'] = 'blue';
            this.updateStyles();
            console.log("After the change, the style is:", this.getComputedStyleValue('--my-toolbar-title-color') );
          }
        });
      </script>

    </dom-module>

As you can see, from this code, `my-element` needs to call `this.updateStyles`,
or the change in the `--my-toolbar-title-color` custom property won't be carried
on to `my-toolbar`

Dynamic effects **are** reflected at the point of a property's application.

For the following example, adding/removing the `urgent` class on the
`<my-toolbar>` element will have the desired effect, since the dynamism is
related to *application* of a custom property.

**NOTE: as a selector, I used `:host.urgent span.title` rather than
**:host(.urgent) span.title mainly because the :host(.selector) syntax hasn't
**been used at all in the guide before now. I hope it's OK and it's "formally"
**correct**


<dom-module id="my-toolbar">

  <template>

    <style>
      :host {
        padding: 4px;
        background-color: gray;
      }

      span.title {
        color: var(--my-toolbar-title-color)
       }

      :host.urgent span.title {
        color: var(--my-toolbar-title-color-urgent)
       }

    </style>

    <span class="title">{{title}}</span>

  </template>

  <script>
    Polymer({
      is: 'my-toolbar',
      properties: {
        title: String
      }
    });
  </script>

</dom-module>


<dom-module id="my-element">

  <template>

    <style>
      :host {
        --my-toolbar-title-color: black;
        --my-toolbar-title-color-urgent: red;
      }
    </style>

    <my-toolbar id="one" title="My awesome toolbar, normal"></my-toolbar>
    <my-toolbar id="two" title="My awesome toolbar, urgent" class="urgent"></my-toolbar>
    <button on-tap="changeTheme">Change theme</button>

  </template>

  <script>
    Polymer({
      is: 'my-element',
      changeTheme: function() {
        this.$.one.className += " urgent";
        console.log("HERE!");
      }
    });
  </script>

</dom-module>

Here, `my-toolbar` offers a really good example of how custom property values
can be used efficiently to theme an element: the selector `:host.urgent
span.title` _within_ `my-toolbar` is able to check, thanks to `:host`, if the
host element itself has a specific class assigned to it (in this case,
`urgent`). Remember that `my-element` has no access to the toolbar's local DOM.
So, it's unable to add classes to the `<span>` within the toolbar. However, by
adding a class to the _toolbar itself_ (the "host" element), and then making
sure that the toolbar's local DOM is styled according to clases added to the
host itself, will ensure encapsulation and themability.

#### Inheritance limitations

Unlike normal CSS inheritance which flows from parent to child, custom
properties in Polymer's shim can only change when inherited by a custom element
from rules that set properties in scope(s) above it, or in a `:host` rule for
that scope.  **Within a given element's local DOM scope, a custom property can
only have a single value.**  Calculating property changes within a scope would be
prohibitively expensive for the shim and is not required to achieve cross-scope
styling for custom elements, which is the primary goal of the shim.

For example:

    <dom-module id="my-element">

      <template>

        <style>
         :host {
           --custom-color: red;
         }
         .container {
           /* Setting the custom property here will not change */
           /* the value of the property for other elements in  */
           /* this scope.                                      */
           --custom-color: blue;
         }
         .child {
           /* This will be always be red. */
           color: var(--custom-color);
         }
        </style>

        <div class="container">
          <div class="child">I will be red</div>
        </div>

      </template>

      <script>
        Polymer({ is: 'my-element'});
      </script>

    </dom-module>

A more complex example that shows the difference between custom elements and normal ones:

    <my-element></my-element>

    <!-- this is the same my-toolbar seen earlier -->
    <dom-module id="my-toolbar">

      <template>

        <style>
          :host {
            padding: 4px;
            background-color: gray;
          }
          .title {
            color: var(--my-toolbar-title-color);
          }
        </style>

        <span class="title">{{title}}</span>

      </template>

      <script>
        Polymer({
          is: 'my-toolbar',
          properties: {
            title: String
          }
        });
      </script>
    </dom-module>


    <dom-module id="my-element">

      <template>

        <style>

          :host {
            --my-toolbar-title-color: red;
          }

          span {
            --my-toolbar-title-color: black;
          }

          span {
            color: var(--my-toolbar-title-color)
          }
        </style>

        <my-toolbar title="My awesome app"></my-toolbar>

        <span>I will start red, and turn blue </span>

        <button on-tap="changeTheme">Change theme</button>

      </template>

      <script>
        Polymer({
          is: 'my-element',
          changeTheme: function() {

            this.customStyle['--my-toolbar-title-color'] = 'blue';
            this.updateStyles();
          }
        });
      </script>

    </dom-module>

So, why did the `span` start as red? If the shim was limit-less, the rule
`span { --my-toolbar-title-color: black; } would have insured that the span
inherited the right value for `--my-toolbar-title-color`, and therefore started
as black.

**NOTE: This is what I made up after spending a few hours on documentation, specifications and Polymer's code. I am 98% unsure that I wrote something that makes sense. However, I really really think something along those lines would be highly beneficial to understand fully the shim's limitations. Maybe it's totally oversimplified, but at least it gives developers a sense of what's going on...**

What happened here is simple. When the CSS was parsed and the elements created:

* When `<my-element>` was instanced (thanks to `<my-element></my-element>`),
 it assigned the value `red`  to the custom property `--my-toolbar-title-color`.
 Remember that an element can only hold one value for a custom property: in
 this case, it will be `red`.

* When `<my-toolbar>` was instanced, Polymer assigned the value `red` to the
  custom property `--my-toolbar-title-color` (_within `<my-toolbar>`'s scope_).
  Since `my-toolbar` is a custom element, the shim did the hard work of
  1) resolving correctly `--custom-color` depending on CSS rules of `my-element`
  2) Assigning the correct value for `--custom-color` to `my-toolbar`'s scope.

* When `<span>` was instanced, since it was a normal (non-Polymer) element,
  Polymer didn't do anything speficic: in
   `div { color: var(--my-toolbar-title-color); }`, the custom property
   `--my-toolbar-title-color` was resolved as `red`.

**NOTE: I am not sure why having this in my-element's CSS: `my-toolbar { --my-toolbar-title-color: pink; }` WORKS, but then when I tap on the button, it fails to turn blue: http://jsbin.com/goxofe/edit . If it's a bug, please tell me and I will report it. If it's WAI, it would ne great to know why :D**

#### Styling distributed elements not supported

The custom properties shim doesn't support styling distributed elements (using ::content).

    /* Not supported */
    :host ::content div {
      --custom-color: red;
    }

This means that you will only be able to style element _within the element's
local DOM_ while using custom properties.

## Custom element for document styling (custom-style) {#custom-style}


{{site.project_title}} provides a `<style is="custom-style">` custom element
for defining styles **in the main document** that can take advantage of several
special features of Polymer's styling system:

*   Document styles defined in a `custom-style` are shimmed to ensure they do
    not leak into local DOM when running on browsers without native Shadow
    DOM.

*   Custom properties used by Polymer's
    [shim for cross-scope styling](#xscope-styling-details) may be defined in an
    `custom-style`. Use the `:root` selector to define custom properties that apply
    to all custom elements.

*   For backwards compatibility, the deprecated `/deep/` combinator and `::shadow`
    pseudo-element are shimmed on browsers without native Shadow DOM. You should avoid
    using these in new code.


Example:

    <!doctype html>
    <html>
    <head>
      <script src="components/webcomponentsjs/webcomponents-lite.js"></script>
      <link rel="import" href="components/polymer/polymer.html">

      <style is="custom-style">

        /* Will be prevented from affecting local DOM of Polymer elements */
        * {
          box-sizing: border-box;
        }

        /* Use the :root selector to define custom properties and mixins */
        /* at the document level  */
        :root {
          --my-toolbar-title-color: green;
        }

      </style>

    </head>
    <body>

        ...

    </body>
    </html>

All features of `custom-style` are available when defining styles as part of
Polymer elements (for example, in `<style>` elements within a custom element's
`<dom-module>`). The exception is the `:root` selector, which is only useful at
the document level. **The `custom-style` extension should only be used for
defining document styles, outside of a custom element's local DOM.**

## Shared styles and external stylesheets {#style-modules}

To share style declarations between elements, you can package a set
of style declarations inside a `<dom-module>` element. In this section,
a `<dom-module>` holding styles is called a _style module_ for convenience.

A style module declares a named set of style rules that can be imported into
an element definition, or into a `custom-style` element.

**Note:** Style modules were introduced in {{site.project_title}} 1.1;
they replace the experimental support for [external stylesheets](#external-stylesheets).
{: .alert .alert-info }

Define a style module inside an HTML import using the `<dom-module>`
element.

    <!-- shared-styles.html -->
    <dom-module id="shared-styles">
      <template>
        <style>
          .red { color: red; }
        </style>
      </template>
    </dom-module>

The `id` attribute specifies the name you'll use to reference
your shared styles. Style module names use the same namespace as elements,
so your style modules must have unique names.

Using the shared styles is a two-step process: you need to use a `<link>` tag
to _import_ the module, and a `<style>` tag to _include_ the styles in the correct place.

To use a style module in an element:

    <!-- import the module  -->
    <link rel="import" href="../shared-styles/shared-styles.html">
    <dom-module id="x-foo">
      <template>
        <!-- include the style module by name -->
        <style include="shared-styles"></style>
        <style>:host { display: block; }</style>
        Hi
      </template>
      <script>Polymer({is: 'x-foo'});</script>
    </dom-module>

You can also use a shared style module in a `custom-style` element.

    <!-- import the shared styles  -->
    <link rel="import" href="../shared-styles/shared-styles.html">
    <!-- include the shared styles -->
    <style is="custom-style" include="shared-styles"></style>

A single style tag can both `include` shared styles
and define local rules:

    <style include="shared-styles">
      :host { display: block; }
    </style>

(This works for both `custom-style` elements and `<style>` tags inside
custom elements.) The shared styles are applied _before_ the styles defined
inside the body of the `<style>` tag, so the shared styles can be overridden
by the styles defined in the body.

### External stylesheets (deprecated) {#external-stylesheets}

**Deprecated feature.** This experimental feature is now deprecated in favor of
[style modules](#style-modules). It is still supported, but support will
be removed in the future.
{: .alert .alert-info }

Polymer includes an experimental feature to support loading external stylesheets
that will be applied to the local DOM of an element.  This is typically
convenient for developers who like to separate styles, share common styles
between elements, or use style pre-processing tools.  The syntax is slightly
different from how stylesheets are typically loaded, as the feature leverages
HTML Imports (or the HTML Imports polyfill, where appropriate) to load the
stylesheet text such that it may be properly shimmed and/or injected as an
inline style.

To include a remote stylesheet that applies to your Polymer element's local DOM,
place a special HTML import `<link>` tag with `type="css"` in your `<dom-
module>` that refers to the external stylesheet to load.

Example:

    <dom-module id="my-awesome-button">

      <!-- special import with type=css used to load remote CSS
           Note: this style of importing CSS is deprecated -->
      <link rel="import" type="css" href="my-awesome-button.css">

      <template>
        ...
      </template>

      <script>
        Polymer({
          is: 'my-awesome-button',
          ...
        });
      </script>

    </dom-module>


## Third-party libraries that modify local DOM {#scope-subtree}

If you are using a third-party library that adds local DOM nodes to your
Polymer element, you may notice that styles on the element do not update
properly.

The correct way to add DOM nodes to a Polymer element's local DOM is via
the Polymer [DOM API](local-dom.html#dom-api). This API lets you manipulate
nodes in a way that respects the local DOM and ensures that styles are
updated properly.

When using third-party libraries that **do not use** the Polymer DOM
API, use the [`scopeSubtree`](../../api/#Polymer.Base:method-scopeSubtree){:target="_blank"}
method to apply proper CSS scoping to a node and all of its descendants.

1.  Create a container node inside your element's local DOM, and have your
    third-party library create DOM under that container node.

        <dom-module is="x-example">
          <template>
            <div id="container">
            </div>
          </template>
        </dom-module>

2.  Call `scopeSubtree` on the container node.

        ready: function() {
          this.scopeSubtree(this.$.container, true);
        }

    `containerNode` is the root node of the tree you wish to scope. Setting
    the second argument to `false` scopes the specified node and descendants
    **once.** Setting it to `true` enables a mutation observer that applies CSS
    scoping whenever `containerNode` or any of its descendants are modified.

**Not for use on {{site.project_title}} elements.** If the subtree that you scope
contains any {{site.project_title}} elements with local DOM, `scopeSubtree` will
cause the descendants' local DOM to be styled incorrectly.
{: .alert .alert-error }

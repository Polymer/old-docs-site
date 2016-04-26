---
title: Document your elements
link: documentation
---

<!-- toc -->

You can provide API docs for Polymer custom elements by writing
documentation comments in your source files. Using the `iron-component-pages` element,
you can create a simple documentation page for your elements that parses these comments
and renders the API documentation.

## Add a documentation page for an element repo

The `seed-element` repo comes with built-in documentation using
[`iron-component-page`](https://github.com/PolymerElements/iron-component-page).
If you started your element using the `seed-element` repo as a template, you
should be ready to go.

To add a documentation page to an existing project that _didn't_ start from
`seed-element`:

1.  Add `iron-component-page` to your project as a development dependency:
    
    ```
    bower install --save-dev PolymerElements/iron-component-page
    ```

2.  Create an `index.html` file in the top-level folder of the project.

3.  Copy the contents of the `index.html` file from the `seed-element` repo:

    [seed-element/index.html](https://raw.githubusercontent.com/PolymerElements/seed-element/master/index.html)

By default, `iron-component-page` assumes a single import, with a name matching
the folder name (for example, `my-element/my-element.html`).

If you want to document multiple files:

1.  Create a single file that imports all of files that you want to document:

    ```
    <!-- all-imports.html -->
    <link rel="import" href="my-element-one.html">
    <link rel="import" href="my-element-two.html">
    ```

2.  Edit `index.html`.

3.  Add a `src` attribute to the `iron-component-page` instance, specifying the
    name of your combined import file as the value:

    ```
    <iron-component-page src="all-imports.html"></iron-component-page>
    ```

## View element docs

You can use [`polyserve`](overview.html#polyserve) to preview element docs while
you're developing a component.

To view the element docs:

1.  Run `polyserve`:

        polyserve

2.  Open the element's top-level `index.html` in a browser:

        localhost:8080/components/my-element/

If everything is set  up right, you should see a documentation page for your
element, even if you haven't written any doc comments yet.

If you have multiple elements or behaviors, use the pulldown menu in the top-left
corner to choose a documentation page.

**Host your API docs.** See [Create a reusable element](../docs/start/reusableelements.html#publish)
for information on publishing an element on GitHub, and hosting its API docs
using GitHub pages.
{ .alert .alert-info }

## Write element docs

Add API docs to your element by adding inline HTML or JavaScript comments.

### Element Summaries

<p class="tldr">
  Provide a thorough overview of what the element does, and provide
  examples of common usage patterns. Format the documentation as
  markdown.
</p>

If the element declares a `<dom-module>`, write the documentation as
HTML comments **immediately** preceeding the `<dom-module>`

```
<link rel="import" href="../polymer/polymer.html">

<!--
`<awesome-sauce>` injects a healthy dose of awesome into your page.

In typical use, just slap some `<awesome-sauce>` at the top of your body:

    <body>
      <awesome-sauce></awesome-sauce>

Wham! It's all awesome now!
-->
<dom-module id="awesome-sauce">
```

Note that the doc comment should be **after** any dependencies.

If your element lacks a `<dom-module>`, write documentation as a **JavaScript comment**
immediately preceeding the `Polymer()` call:

```
/**
 * `<awesome-sauce>` injects a healthy dose of awesome into your page.
 *
 * In typical use, just slap some `<awesome-sauce>` at the top of your body:
 *
 *     <body>
 *       <awesome-sauce></awesome-sauce>
 *
 * Wham! It's all awesome now!
 */
Polymer({
  is: 'awesome-sauce',
```

You can use Markdown headings to break up long element summaries:

    ### Accessibility

Add element-level tags at the **end** of the element summary, as part
of the same comment block. Two tags are supported currently:

*   `@hero`. Specifies a hero image.

        @hero path/to/image

*   `@demo`. Specifies a demo, with optional path and description. If path and description are omitted,
    the standard demo path (`./demo/`) is assumed.

        @demo

        @demo path/to/demo1.html  Super cool demo, with sharks!
        @demo path/to/demo2.html  Even cooler demo. The sharks have lasers!

Any other tags will be ignored.

The first tag encountered in the comment block marks the end of the element
summary. **Any line starting with an at-sign (@) is interpreted as a tag.** Any
remaining non-tag comments in the comment block are ignored.

### Properties

<p class="tldr">
  Document all public properties. Docs should start with a one line
  summary. Make sure that the property's type is annotated.
</p>

For example, the most simple property documentation can be a single
line:

```js
/** Whether this element is currently awesome. */
isAwesome: Boolean,
```

If the property doesn't specify a type, or that type is not primitive,
be sure to [annotate](#type-annotation) the type properly:

```js
/**
 * Metadata describing what has been made awesome on the page.
 *
 * @type {{elements: Array<HTMLElement>, level: number}}
 */
sauce: Object,
```

Private properties should be prefixed with an underscore (`_`):

```js
/** An awesome message */
_message: String,
```

### Methods

Follow the [property guidelines](#properties). Additionally, make sure
the types for all params and return values are documented.
{ .tldr }

For example:

```js
/**
 * Applies awesomeness to `element`.
 *
 * @param {HTMLElement} element The element to be made awesome.
 * @param {number} level The numeric level of awesomeness. A value
 *     between `1` and `11`.
 * @param {Array<HTMLElements>=} refs Optional referenced elements
 *     that become awesome by proxy.
 * @return {number} The cumulative level of awesomeness.
 */
makeAwesome: function makeAwesome(element, level, refs) {
```

### Events

<p class="tldr">
  Events must be annotated explicitly with an <code>@event</code> tag.
</p>

Event properties are documented with the `@param` tag, just like method parameters.

For example:

```js
/**
 * Fired when `element` changes its awesomeness level.
 *
 * @event awesome-change
 * @param {number} newAwesome New level of awesomeness.
 */
```

### Behaviors

<p class="tldr">Like an element, but add <code>@polymerBehavior</code>.</p>

Include a behavior summary, just like an element summary, but ending with a
`@polymerBehavior` tag. The behavior name can be specified explicitly if the
doc parser can't infer it correctly.

    @polymerBehavior MyOddBehavior

Document methods, properties, etc. just like an element.

For example:

```js
/**
 * Behavior that highlights stuff.
 *
 * @polymerBehavior
 */

MyBehaviors.HighlightStuff = { ... }
```

When extending a behavior, you place the _new_ functionality
in an implementation object as described in [Extending behaviors](https://www.polymer-project.org/1.0/docs/devguide/behaviors.html#extending).

The implementation object **must** be named with the behavior name followed
by `Impl`, and it must be annotated with `@polymerBehavior` _followed by
the real behavior name_:

```js
/**
 * Extended behavior.
 *
 * @polymerBehavior SuperBehavior
 */
MyBehaviors.SuperBehaviorImpl = { ... }
```

The actual behavior is simply an array of behaviors, ending with the implementation
object. It must also be annotated with `@polymerBehavior`:

```js
/**
 * @polymerBehavior
 */
MyBehaviors.SuperBehavior = 
    [MyBehaviors.BaseBehavior, MyBehaviors.SuperBehaviorImpl]
```

The documentation system merges these declarations into a single behavior
(in this case, `MyBehaviors.SuperBehavior`).

### Custom CSS properties and mixins

Currently there is no tag for custom CSS properties and mixins. Document
properties and mixins in a table in the main element description:

    ### Styling

    `<paper-button>` provides the following custom properties and mixins
    for styling:

    Custom property | Description | Default
    ----------------|-------------|----------
    `--paper-button-ink-color` | Background color of the ripple | Based on the button's color
    `--paper-button` | Mixin applied to the button | `{}`

Be sure to place the table before any element-level tags in the element summary.

### Type Annotation

Adhere to [Closure-compatible type expressions](https://developers.google.com/closure/compiler/docs/js-for-compiler#types).
{ .tldr }

### Language

<p class="tldr">
  When in doubt, keep to the 3rd person present tense and keep it
  simple.
</p>

A few guidelines for consistency:

* Use the 3rd person for descriptions.

  * Good. "Creates a foo."
  * Avoid. "Create a foo."

  Use 2nd person ("Do this...") when you're _trying_ to be prescriptive,
  such as, "**Add** the `toolbar` attribute to the element you want
  to use as a toolbar."

* Use the present tense whenever possible.

  * Good. "Clicking the element starts an animation."
  * Avoid. "Clicking the element will start an animation."

* Start method descriptions with an active verb.

  * Good. "Starts the animation."
  * Avoid. "This method to starts the animation."

* It's OK to use a fragment, especially in a short description.

  * Good. "Item height, in pixels."
  * Avoid. "This property specifies the item height, in pixels."

  (Fragments should still start with a capital letter and
  have ending punctuation.)

The [JavaDoc Style Guide](http://www.oracle.com/technetwork/java/javase/documentation/index-137868.html#styleguide)
is a good resource on general API doc style. Most of the style rules
described there can be applied here as well.



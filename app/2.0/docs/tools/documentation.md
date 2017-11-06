---
title: Document your elements
---

<!-- toc -->

You can provide API docs for Polymer custom elements by writing
documentation comments in your source files. Using the `iron-component-pages` element,
you can create a simple documentation page for your elements that displays your comments
rendered as API documentation.

If you're publishing your element at [WebComponents.org](https://webcomponents.org), your documentation will be automatically generated. WebComponents.org uses the same underlying elements as `iron-component-pages` to render and display documentation.

## Create a documentation page for your project {#create-page}

To create a documentation page for your project:

1. [Install the Polymer CLI](polymer-cli). The Polymer CLI gives you a command-line interface to Polymer Analyzer (among other things).

2. `cd` to your project directory. This can be a custom element, a full app, or even a plain JavaScript library. Polymer Analyzer will discover all of the interesting items recursively in your project directory.

3. Analyze your project with `polymer analyze > analysis.json`. A JSON descriptor file is produced. By default `iron-component-page` will look for a file called `analysis.json` (you can override this with the `descriptor-url` property).

4. Add `iron-component-page` as a dev dependency of your project with the following command: `bower install iron-component-page --save-dev`.

5. Create an HTML file to instantiate an `iron-component-page` element (e.g. `index.html` or `docs.html`). Note that you may need to adjust your import paths depending on your project layout.
   ```
    <!doctype html>
    <html>
     <head>
       <meta charset="utf-8">
       <meta name="viewport" content="width=device-width, minimum-scale=1.0, initial-scale=1.0, user-scalable=yes">
       <script src="/bower_components/webcomponentsjs/webcomponents-loader.js"></script>
       <link rel="import" href="/bower_components/iron-component-page/iron-component-page.html">
     </head>
     <body>
       <iron-component-page></iron-component-page>
     </body>
    </html>
   ```

Serve the page using any local web server, such as `polymer serve` or `python -m SimpleHTTPServer`.

## Preview element documentation {#preview}

You can use Polymer CLI's [`polymer serve`](polymer-cli#serve) command to
preview element docs while you're developing a component.

To preview element docs:

1.  Run `polymer serve`.

2.  Open the element's top-level `index.html` in a browser:

    <pre><code>localhost:8080/components/<var>my-el</var>/</code></pre>

    Where <code><var>my-el</var></code> is the name of your element.

If everything is set  up right, you should see a documentation page for your
element, even if you haven't written any doc comments yet.

If you have multiple elements or behaviors, use the pulldown menu in the
top-left corner to choose a documentation page.

## Document an element {#document-an-element}

Add API docs to your elements by adding inline JavaScript comments.

### Create an element summary {#summary}

<p class="tldr">
  Provide a thorough overview of what the element does, and provide
  examples of common usage patterns. Format the documentation as
  markdown.
</p>

Denote your element summary by inserting a **JavaScript comment** directly preceding your class definition.
You can use Markdown headings to break up long element summaries.

  ```
    /**
     * # This is an h1 heading
     * `<awesome-sauce>` injects a healthy dose of awesome into your page.
     * ## This is an h2 heading
     * In typical use, just slap some `<awesome-sauce>` at the top of your body:
     * <body>
     *   <awesome-sauce></awesome-sauce>
     * Wham! It's all awesome now!
     * @customElement
     * @polymer
     * @demo https://path/to/awesomeness/demo/
     *
     */
    class AwesomeSauce extends Polymer.Element {
      ...
    }
  ```

Polymer custom elements should include the `@customElement` and `@polymer` tags.

The first tag encountered in the comment block marks the end of the element
summary. **Any line starting with an at-sign (@) is interpreted as a tag.** Any
remaining non-tag comments in the comment block are ignored.

### Properties {#properties}

<p class="tldr">
  Document all public properties. Docs should start with a one line
  summary. Make sure that the property's type is annotated.
</p>

Denote your property documentation with a **JavaScript comment** preceding the property declaration. The simplest property documentation can be a single
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

### Methods {#methods}

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

### Events {#events}

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

### Class mixins {#class-mixins}

<p class="tldr">Like an element, but add <code>@mixinFunction</code> and possibly @mixinClass.</p>

Include a mixin summary immediately before the mixin function declaration.
The summary is like an element summary, but must include the `@polymer` and `@mixinFunction` tags.

Document any properties, methods or events inside the mixin just like you would for an element.

For more information on mixins, see [Sharing code with class expression mixins](custom-elements#mixins)
in Custom element concepts.

```js
/*
 * This mixin lets you travel faster than light speed, almost.
 * @polymer
 * @mixinFunction
 *
MyNamespace.WarpSpeedMixin = (superclass) => class extends superclass {
  ...
}
```

If your mixin function doesn't immediately return the class, as above, you may need to
add the `@mixinClass` tag immediately before the class declaration. For example:

```js
/*
 * This mixin does something really complicated.
 * @polymer
 * @mixinFunction
 *
MyNamespace.ReallyComplicatedMixin = Polymer.dedupingMixin((superclass) =>

   // do some other stuff before creating the class...
   ...

  /*
   * @polymer
   * @mixinClass
   */
  class mixin extends superclass {
    ...
  }

  // finally, return the mixin class
  return mixin;
);
```

An element that applies a mixin should add the `@appliesMixin` tag:

```js
/*
 * An element with a mixin
 * @polymer
 * @customElement
 * @appliesMixin MyNamespace.WarpSpeedMixin
class MyMixedUpElement extends MyNamespace.WarpSpeedMixin(Polymer.Element) { ... }
```

If a mixin applies one or more mixins, it should also include the `@appliesMixin` tag.

### Behaviors {#behaviors}

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
in an implementation object as described in [Extending behaviors](/2.0/docs/devguide/behaviors#extending).

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

### Custom CSS properties and mixins {#css-mixins}

Currently there is no tag for custom CSS properties and mixins. Document
properties and mixins in a table in the main element description:

    ### Styling

    `<paper-button>` provides the following custom properties and mixins
    for styling:

    Custom property | Description | Default
    ----------------|-------------|----------
    `--paper-button-ink-color` | Background color of the ripple | Based on the button's color
    `--paper-button` | Mixin applied to the button | `{}`

### Namespaces and members of a namespace

If you declare a namespace, annotate it with the `@namespace` tag. For example:

```js
<!-- zombie-base.html -->
<script>
  // A bunch of elements, for zombies, by zombies.
  // @namespace ZombieElements
  window.ZombieElements = ZombieElements || {};

  // @memberof ZombieElements
  // @polymer 
  // @mixinFunction
  ZombieElements.ZombieMixin = (base) => class extends base {
    // braaains
  }
  // etc
</script>
```

Annotate classes, functions and values assigned to a a namespace with the `@memberof` tag:

```js
<!--conehead-zombie.html -->
<link rel="import" href="zombie-base.html">
<script>
  // A zombie with a cone on his head. Festive!
  // @polymer
  // @customElement
  // @memberof ZombieElements
  // @appliesMixin ZombieElements.ZombieMixin
  class ConeheadZombie extends ZombieMixin(Polymer.Element) {
    static get headProtection() {
      return 'cone';
    }
  }
  customElements.define('conehead-zombie', ConeheadZombie);
  ZombieElements.ConeheadZombie = ConeheadZombie;
</script>
```

### Type Annotation {#type-annotation}

Adhere to [Closure-compatible type expressions](https://developers.google.com/closure/compiler/docs/js-for-compiler#types).
{ .tldr }

## Supported JSDoc tags {#jsdoc-tags}

`<iron-component-page>` supports the following JSDoc tags:

* `@appliesMixin`
* `@customElement`
* `@demo`
* `@event`
* `@memberof`
* `@mixinClass`
* `@mixinFunction`
* `@namespace`
* `@polymer`
* `@polymerBehavior`
* `@type`

## Use consistent language and style in your docs {#language}

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



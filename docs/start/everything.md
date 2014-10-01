---
layout: default
type: concepts
navgroup: start
shortname: Concepts
title: Understanding Polymer
subtitle: The concepts and layering
---

{% include toc.html %}

{{site.project_title}} isn't like other frameworks or libraries you might have used before. To fully understand what it is, you'll need to understand {{site.project_title}}'s world-view and take a quick tour through its three conceptual layers.

## Everything is an Element: The {{site.project_title}} world-view {#everythingis}

The philosophy that "_Everything is an element_" is core to understanding {{site.project_title}}.

Ever since the beginning of the web, browsers have shipped with a default set of elements. Most of them, like `<div>`, didn't do very much. But some elements are quite powerful. Consider the humble `<select>`. We take it for granted, but it's actually pretty impressive:

- **Functional**. The browser already knows what to do with a `<select>` element. When it encounters `<select>` in markup it creates an interactive control for the user. 
- **Reusable**. The `<select>` element is a reusable package of functionality that you don’t have to implement yourself.
- **Interoperable**. Every JavaScript library knows how to interact with DOM elements.
- **Encapsulated**. It keeps its internals all tucked away, so including one won't break the rest of your page.
- **Configurable**. You can configure its behavior with HTML attributes, without using any script.
- **Programmable**. If you grab the element from the DOM it also has methods and properties for things that don't make sense in markup.
- **Event Generator**. It dispatches events to let you know when something interesting happens.
- **Composable**. Not only can you include a `<select>` inside of most other kinds of element, its behavior can also change depending on which things you put inside of it.

Elements are pretty great. They're the building blocks of the web. Unfortunately, as web apps got more complex, we collectively outgrew the basic set of elements that ships in browsers. Our solution was to replace markup with gobs of script. In that shift, we've lost the elegance of the element.

{{site.project_title}} returns to our roots. We think the answer is not gobs of script, but rather to build more powerful elements. A set of powerful new technologies called Web Components makes this possible.

That brings us back to the world-view of {{site.project_title}}: _Everything is an element_

When we say "element", we mean a real element, with all of the great properties of a built-in element. And why limit elements to UI? Some of the properties of elements are UI-specific, but most of them aren’t. Elements can serve as a generic package for reusable functionality.

The world looks different when you take this view. You take a few low-level elements, put them together, and make a larger, more powerful element with its internals safely encapsulated. You can take those elements and build even bigger and better elements. Before you know it, you'll arrive at an entirely encapsulated, reusable _app_.

In the old world, script was your concrete, and the solution to most of your problems was to use gobs of it. In the new world, elements are your bricks; script is like mortar. Select the bricks that fit your needs most closely and use only a judicious amount of mortar to hold them together. This is what we mean when we say _everything is an element_.


## Layers of {{site.project_title}}

There are three conceptual layers to {{site.project_title}}:

1. **[Using elements](/docs/start/usingelements.html)**: {{site.project_title}} provides a comprehensive set of elements--both UI and non-UI--that you can use right out of the box. You can mix and match {{site.project_title}} elements with other elements, including built-in elements and other custom elements.

1. **[Creating elements](/docs/start/creatingelements.html)**: {{site.project_title}}'s declarative syntax makes it simpler to define custom elements. Features like two-way data binding, property observation, and gesture support help you build powerful, reusable elements.

1. **[The Platform](/docs/start/platform.html)**: {{site.project_title}} is built on the latest web technologies, like Web Components and Object.observe. Not all browsers support these features yet, so {{site.project_title}}'s platform layer fills the gaps, implementing the APIs in JavaScript. At runtime, {{site.project_title}} automatically picks the fastest path -- native implementation or JavaScript.


## Next steps {#nextsteps}

Now that you've got the basic concepts of {{site.project_title}}, it's time to
start digging in a bit more. Continue on to:

<a href="/docs/start/customelements.html">
  <paper-button raised><core-icon icon="arrow-forward"></core-icon>Custom Elements 101</paper-button>
</a>
